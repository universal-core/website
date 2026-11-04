---
title: Examples and pitfalls
description: Recipes and failure cases for player virtualization.
displayed_sidebar: mainSidebar
---

# Examples and pitfalls

A virtual session runs on a cached copy of the character. A processor is the set of hooks registered for a map; a cache entry holds one player and map's session data. A slice is one portion of that data. See the [overview](/docs/core/player-virtualization/overview), [hooks](/docs/core/player-virtualization/hooks), and [the prize commit](/docs/core/player-virtualization/prize-commit).

## Examples

### Keep two flags through the boundary

A rate limiter that reads its counters from quest flags reads zero in a virtual session. Pass the pair through `transform_quest_load` and drop the rest.

```lua
local processor = {}

function processor.transform_quest_load(self, ch, quests, is_account)
    if is_account then return {} end
    local kept = {}
    for _, q in ipairs(quests) do
        local name, sub = q["name"], q["state"]
        if name == "session_cap" and (sub == "cursor" or sub == "count") then
            table.insert(kept, q)
        end
    end
    return kept
end

return processor
```

`kept` holds only the records the engine gave you, so they are the right type and survive the read-back.

### Grant on entry, once

`on_player_enter` runs at every entry. A grant belongs behind the `fresh_hydrate` flag, or a reconnect grants twice.

```lua
local processor = {}

function processor.on_player_enter(self, ch, fresh_hydrate)
    if not fresh_hydrate then return end
    ch:set_quest_flag("practice_room.entered", 1)
end

return processor
```

The flag is set on the session copy. It stays in the cache and goes away with the session; it is not a commit.

### Reset on entry, one flag as the prize

A private map where every player starts at level 1 with nothing, and a win leaves one flag on the real character. The reset is a load transform: it runs once per player and map, and a relog is a cache hit that keeps the session level.

```lua
local PV = forge.sys.game.player_virtual
local SM = forge.sys.game.sectree_manager

local processor = {}

function processor.transform_player_load(self, ch, player)
    player.level = 1
    player.exp = 0
    return player
end

function processor.transform_item_load(self, ch, items)
    return {}
end

local function open_trial(base_map_index)
    local map_index = SM.create_private_map(base_map_index)
    if not map_index or map_index == 0 then return nil end
    if not PV.set_processor(map_index, processor) then
        SM.destroy_private_map(map_index)
        return nil
    end
    return map_index
end

local function award(ch)
    PV.commit_quest_flag(ch, "practice_room.cleared", 1)
end
```

`items` holds the equipped items as well as the inventory, so `{}` empties both. Call `award(ch)` from your own event (a kill, an NPC), not from a hook. The flag reaches the real row at once and a quest named `practice_room` reads it after the player's next load onto a real map.

### Install around a private map

Open the map, register the processor, and destroy the map when the match ends. Destroying a private map clears its cache and unregisters its processor.

```lua
local PV = forge.sys.game.player_virtual
local SM = forge.sys.game.sectree_manager

local function start(base_map_index, processor)
    local map_index = SM.create_private_map(base_map_index)
    if not map_index or map_index == 0 then return nil, "map_failed" end
    if not PV.set_processor(map_index, processor) then
        SM.destroy_private_map(map_index)
        return nil, "processor_failed"
    end
    return map_index
end

local function finish(map_index)
    SM.destroy_private_map(map_index)
end
```

## Pitfalls

**A hook that errors lets the real data in.** A Lua error in any transform hook falls back to passthrough: the untransformed input, real items, real flags and real affects included, is cached and used for the whole session. The only trace is one `falling back to passthrough` line in syserr. Keep hooks small, test each of them, and watch syserr for that line. A hook that is missing, or whose key is not a function, is a silent passthrough, and so is a non-table return from a vector hook: the input as you left it is used.

**A transform returns nothing and the slice is empty.** Plain Lua tables returned from a vector hook are dropped. Build entries from the records of the input, or filter the input itself.

**A counter you commit and read in the session reads the old value.** A commit writes to the database, not the session copy. Set the session copy too when your code reads it again; see [the prize commit](/docs/core/player-virtualization/prize-commit).

**Pending state vanishes on restart.** State held only in the memory of one core is lost on restart. A commit has no acknowledgement, so a design cannot wait for it to drain at logout.

**A commit seems to work and never arrives.** A quest name or state of 64 characters or more, an account flag with no descriptor, or an item that already has an owner are logged and dropped. Check syserr.

**The quest still offers a `chat` option.** `questcategory.txt` does not gate `chat`, `target`, receive-all item use, `info` and `button`. A listed quest is dormant on login, kill, click, timers, item use and custom events only.

**`set_processor` returns `false` with players inside.** A map that has a processor and active sessions refuses a new one. `unset_processor` kicks nobody, so the old processor stays with the players in it. Register before the first player loads, or wait until the map is empty.

**`clear` with players inside leaves dangling pointers.** The stub says it is refused. It is only warned. Clear a map that is empty.

**A base map you registered stays virtual.** The engine cleans only private maps. A base map keeps its cache until `clear` or a restart, and a player who logs out there keeps a stale session next time.

**A processor registered after the load does nothing.** The player is decided at the load. A processor installed once the player is on the map is seen at the next load.

**`commit_stash_item` consumes your item.** Reading the item after the call is a use after free in Lua terms. Keep the id the function returns.

**The `char_virtual` helpers are permanent on a real character.** `max_skills`, `set_specialization`, `give_blessing_progression` and the rest act on the live character. In a virtual session the cache swallows it; on a real one it sticks.

For pet caching, see [custom transformers](/docs/core/player-virtualization/custom-transformers).

## Glossary

- **Virtual session:** a character's session on a virtual map.
- **Processor:** hooks registered for a map index.
- **Cache entry:** cached session data for one player and map.
- **Slice:** a portion of character data handled by a hook.
- **Passthrough:** using a hook's input without replacing it.
- **Prize commit:** an explicit write of a selected result to real data.
- **Stash:** item storage for delivery on a later non-virtual load.
