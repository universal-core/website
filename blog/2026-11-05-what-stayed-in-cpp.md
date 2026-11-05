---
date: 2027-04-27
title: "What stayed in C++: one damage formula, one grid, one cache"
description: Three things I never moved into Lua, what each one gives Lua instead, and what it cost to keep the line where it is.
authors: luscha
tags: [engine, architecture, damage, networking]
image: /img/blog/what-stayed-in-cpp.png
slug: what-stayed-in-cpp
---

The grid that tells the server who is near whom is made of tiles of 6,400 units, each cut into cells of 50. Those two numbers are in the commit of January 2019 that first put the file in this tree, and they are the same today. Every other post in this series is about something that left C++. This one is about three things that did not, and I want to say what each of them does for Lua instead.

The rule is in the [manifesto](/manifesto/): if a piece of code is not a fundamental ground truth, it leaves the engine and comes back as a policy or a hook. I still agree with it, and I will not argue it again. What I can add is what it looks like in the code when the answer is "stays".

## The formula stayed, and the hit opened

[A point used to be a branch](/blog/a-point-was-a-branch) tells how four copies of the defence pipeline became one resolver in July 2026. The resolver is still C++, and its header says exactly where it stops:

> The resolver owns the DEFENCE-AND-CLOSING pipeline [...]. It does NOT own how much attack the caller brings. [...] That line is where the physical meaning splits: attack buffs raise the attack, defence buffs lower the defence, and only the second half is shared.

Four call sites, in the melee hit, the ranged shots and the skill damage, hand it an `SDamageIntent`. What each type does differently is not an `if` any more. It is a row in a table:

```cpp
case DAMAGE_TYPE_NORMAL:        // melee
    return { DAMAGE_CHANNEL_PHYSICAL, POINT_TOTAL_PHYS_DEF,  CLOSING_RESIST_WEAPON,
             false, /*floor*/true,  false, false, /*attMul*/true };
case DAMAGE_TYPE_MAGIC:
    return { DAMAGE_CHANNEL_MAGICAL,  POINT_ABILITY_MAGIC_DEF, CLOSING_RESIST_MAGIC,
             true, false, true, true, false };
```

Eight damage types share seven rows of eight fields. The header says why the fields exist: every one is a difference that the four copies had grown, named so that retiring it is a one-line change. The table is C++ and no script edits it.

What Lua got is the moment before the table is read. A trait subscribes to `on_damage_taken_pre` and bumps a point for this one hit, and the resolver reads the point as it always did ([Traits](/foundations/traits/) has the mechanism). The call site asks the holder's trigger mask first:

```cpp
if (pkVictim->HasTraits() &&
    pkVictim->Traits().HasSubscription(TRIG_DAMAGE_TAKEN_PRE))
    pkVictim->Traits().FireDamageTakenPre(m_me, eShotType);
```

So a hit crosses into Lua only when some active trait on that character said it wants to. The formula is the same for everyone, and the content that changes it lives in the hooks.

The second thing that stayed is the authority over who is alive. `CHARACTER::Damage` opens a guard that postpones every destroy until the function returns, and the comment on it explains why:

> Damage is re-entrant through the reflect path and carries no scoped-bump guard, so anything it calls that could destroy a character would leave the remaining two hundred lines running on freed memory.

`Dead` opens its own guard as its first statement, because the kill reward runs quest callbacks and a callback can re-enter Lua and destroy the mob that is dying. On 1 September 2026 the player metrics commit added "a whole-function pending-destroy guard on Damage so a predicate there is a bug, not a crash". The hooks fire inside this function, and it is built to survive what they do.

A hook that answers with a number shows the price. The engine knows one combat number for a structure, its hit points, and the amount it loses goes through a hook declared per structure type, `transform_damage`. C++ checks what comes back:

```cpp
// Read as a double and round here: sol's integral check is compiled
// differently in debug and release, so an optional<int> would discard
// `dam * 0.9` in one build and round it in the other. A hook that answered
// with anything but a number leaves the amount alone.
sol::optional<double> out = r;
if (!out)
    return lDam;
const long lRounded = std::lround(*out);
return lRounded < 0 ? 0 : (int32_t) lRounded;
```

After the hook returns, the caller fetches the structure record again before it touches the hit points, and a negative answer is clamped to zero. The number is Lua's to propose and C++'s to apply.

## The grid stayed, and Lua got to read it

The tile and the cell are C++ objects: a tile holds the set of entities standing in it and the list of its neighbours, and every entity keeps a map of the entities it can currently see, stamped with a generation counter. A move that crosses a tile refreshes that map, adds the entity to the view of everyone it newly sees, prunes the rest, and sends the add and remove packets.

Lua can reach the grid through a binding. `for_each_around` walks the entities in the tile and its neighbours, `find_if` stops at the first match, and the cell attributes are readable. The walk runs over a copy of the neighbourhood, taken first. The comment in the source says it is "to avoid side-effects", and it matters here: the callback is a script and it may move, kill or create entities while the engine is iterating. This is a trait tick that counts how many monsters stand near a character:

```lua
on_tick = function(ch, ctx)
    local tree = ch:get_sectree()
    if tree == nil then return end
    local count, x, y = 0, ch:get_x(), ch:get_y()
    tree:for_each_around(function(entity)
        local other = entity:as_character()
        if not is_monster(other) or other:is_dead() then return end
        local dx, dy = other:get_x() - x, other:get_y() - y
        if dx * dx + dy * dy <= 400 * 400 then count = count + 1 end
    end)
    -- five or more, and the character is besieged
end
```

The script decides what "near" means and what to do about it. It does not decide who is in the neighbourhood.

The view maps were never quiet. In June 2024 `ViewCleanup` was fixed to clean the entities of one that left a tile. In December 2025 the tile logic was removing from the client entities that were out of view, and a monster attacking a player ran back into the player's tile, so the client saw an invisible monster attacking. In March 2026 the view re-encode was made recursive because an idle player could lose it, and at the end of the month the map encoding was reworked to stop several add packets for one entity, positions arriving as NaN and players disappearing. A comment on `ViewReencode` says why it does not clean and rebuild: that floods the client with removes and adds, the client destroys and recreates the instances, "losing movement state, causing NaN".

All four fixes are C++, in a layer that Lua calls into and does not own. Twice the engine learned something new in this layer so that a script could keep the rule. A deployment is a piece of a map, not a creature, so in September 2026 deployments started to be inserted from a 5 by 5 block of tiles where everything else uses 3 by 3, "deployment-only and player-only so no mob or player reaches further than before". And in October 2026 an entity got a view anchor: a point other than its own position around which the world streams to it. The spectator mode, free or locked to a target, is built on it. Both are the engine learning a mechanism, which is the case the manifesto gives for the land system.

## The cache stayed, and Lua got the questions

The database process runs Lua too. It loads forges with the same loader as the game core, and a forge has a `db` half next to its `game` half. An item shop is one example. Its db half answers "how many coins does this account have" from the account table:

```lua
function _M.on_load_coins(peer, message, handler_id, receipt)
    local req = pb_loader.parse_string(messages.GDLoadCoins, message)
    local query_res = forge.sys.db.sql.direct_query(forge.sys.db.sql.SQL_DB_SLOT.ACCOUNT,
        string.format("SELECT cash, cash_promoter FROM account WHERE id = %d;", req.aid)
    )
    -- ...
    forge.sys.db.answer_peer(peer, res:SerializeToString(), receipt)
end
```

A peer handler, a query, an answer. That is what the Lua side of the database core offers, plus an event when a core connects.

The cache is not in that list. It is a template that holds a copy of the row, a flag that says it must be written, and the times of its last update, activity and flush, with an expiry of 300 seconds unless a subclass says otherwise. `Put` copies the row in and sets the flag. `Flush` runs the virtual `OnFlush` that writes the query and clears it. Three classes sit on it, for items, item flags and the player table, and nothing in the Lua bindings of that process names any of them.

What I can show of its rules is what the C++ had to get right. In May 2026 the player cache stamped `last_played` with `NOW()` when it flushed, so the field held the time of the last flush and not of the logout. The stamp now comes from the last `Put`, which is the real save, and the cache keeps a separate `m_lastActivityTime` that, in the words of its comment, a maintenance `Get` never bumps.

The boot snapshot is the same shape. When a core starts, the database process packs its tables into one packet: mobs, items, the refine tables, the banwords and the land tables, among others. The packet carries a version byte, and the comment next to it reads "Whenever the BOOT packet is changed, increase the number." The land section of the packet is where it shows what stays. Land keeps a state document per record that, in the words of the header that defines it, is "lua's and C++ never parses it", so it travels as a length and bytes. The size of the packet still has to be exact:

```cpp
// A state document is variable-length, so its block cannot be counted with a
// multiplication: every row costs its header plus exactly its own bytes.
size_t uiStateBytes = 0;
for (const auto & kState : m_vec_kLandState)
    uiStateBytes += sizeof(land::TLandStateHeader) + kState.second.size();
```

C++ moves the bytes and counts them. What they mean is Lua's business. The boot path also had to learn that a snapshot goes stale: land records are written while cores are up, so the comment says that the snapshot taken at db startup is "stale for every core that boots after the first", and the land tables are read again on each core boot. A late core gets the current rows, and from then on it hears every change to what it was sent.

One more commit message gives the rule in a sentence. In December 2025 the flags kept per account moved to load on demand at login, saved in the database as soon as a game changes them and broadcast to the other cores. It ends "DB is the central authority. No more GG packets and not-persisted flags". The land commit of September 2026 says the same split about the grid: "C++ owns storage, broadcast and persistence; lua owns the mechanics and what the client is told."

## What the line costs

Every seam above is a place where a script can be wrong or slow and the C++ has to carry on. [A script that waits on the server](/blog/script-waits-on-the-server) tells what a wait costs: a coroutine record, a pin and a close-by-owner path. [Debugging Lua like a first-class language](/blog/debugging-lua-first-class) is the other half of the price, because a crash that names a C++ frame has to be traced back to the script. In April 2026 every cast and call from C++ into Lua was moved to a protected call, because a release build threw a script error through the game loop.

It also costs something to keep the rest in C++. [Eleven branches, three functions, one list](/blog/eleven-branches-one-list) lists what is still hard-coded in the attack path: a zone mode with its own branch, warp permission, a part of item use. Those are branches that never moved. The three cases here are different, because each has a boundary I can draw in the code: a formula with hooks around it, a grid with a binding on it, a cache with a handler beside it. The [Foundations](/foundations/) pages describe the Lua side of each.
