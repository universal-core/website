---
title: Player virtualization reference
description: Reference for player virtualization, a character that plays on a map from a throwaway copy of its data. The forge.sys.game.player_virtual functions, the 9 processor hooks, the transformers, the prize commit and its guarantees, the C++ registration table, the questcategory.txt rule, the metrics opt-in and the traps.
displayed_sidebar: mainSidebar
---

# Player virtualization reference

A virtualized map plays its characters from a copy. When a player loads onto such a map, the engine takes the character's real rows, runs them through a processor you registered for that map, and keeps the result in a cache in the game core. The session runs on the cache. Saves land in the cache, not in the database, and the real rows stay as they were. You reach for it when a mode needs a character that is not the player's own (a fixed level, a fixed loadout, no real items), and must not be able to damage the real one.

The mechanism, the limit it closed and the story are in the [player virtualization foundation](/foundations/player-virtualization/). The forge file layout is in the [Forge API reference](/docs/core/luna-forge). A metric from a virtual session is dropped unless it opts in, see [the metrics opt-in](#metrics-opt-in) and [player metrics](/docs/core/player-metrics).

## Quick start

This module, loaded by a forge, opens a private copy of a map where every player is level 30 with no real items, quest flags or affects. It returns the map index, or `nil` when the processor is refused.

```lua
local PV = forge.sys.game.player_virtual
local SM = forge.sys.game.sectree_manager

local processor = {}

function processor.transform_player_load(self, ch, player)
    player.level = 30
    player.exp = 0
    player.gold = 100000
    return player
end

function processor.transform_item_load(self, ch, items)
    return {}
end

function processor.transform_quest_load(self, ch, quests, is_account)
    return {}
end

function processor.transform_affect_load(self, ch, affects)
    return {}
end

local function open_room(base_map_index)
    local map_index = SM.create_private_map(base_map_index)
    if not map_index or map_index == 0 then return nil end
    if not PV.set_processor(map_index, processor) then
        SM.destroy_private_map(map_index)
        return nil
    end
    return map_index
end

local function close_room(map_index)
    PV.unset_processor(map_index)
    SM.destroy_private_map(map_index)
end
```

A player who loads onto the returned map index gets a level 30 character with an empty inventory, no quest flags and no affects. Position, exit location, playtime and the UI settings are still the real ones. When the private map is destroyed, the cache of that map is cleared and nothing was ever written to the player's rows.

## Files and setup

| What | Where | Notes |
| --- | --- | --- |
| Lua API | `forge.sys.game.player_virtual` | Called from forge Lua: the top level of a forge `environment game` block and the modules a forge loads. Generated stub: `forge.sys.game.player_virtual.lua` in the quest `meta` folder. |
| Processor | a Lua table | Any subset of the 9 hooks. A missing hook is a passthrough. |
| Quest gate | `questcategory.txt` | Optional third column, see [the questcategory.txt rule](#the-questcategorytxt-rule). Read once, when the quest manager starts. |
| Metrics | `metrics.yaml` | `allow_virtual: true` per metric, see [the metrics opt-in](#metrics-opt-in). |
| Native registrants | C++ | See [C++ registration](#c-registration). |

Virtuality is one fact: a processor is registered for the exact map index. There is no inheritance. A private map is its own slot, separate from its base map, and a base map you register stays virtual until you unregister it. The engine clears the cache of a private map by itself when the map is destroyed. The cache of a base map stays until you `clear` it or the core restarts.

There is one slot per map index, no stacking. Compose processors with Lua inheritance (`setmetatable({}, { __index = base })`), as the shipped modes do.

The player is decided at load. Register the processor before the player warps in: a processor registered after the player loaded does nothing until the next load. A warp onto a different map is a reconnect to the database side.

Forges are not reloaded. A change to a processor needs a core restart.

## API

### Functions

All 15 are on `forge.sys.game.player_virtual`. `with_real_scope`, which the stub mentions twice, is not bound: there is no such function, and `is_player_virtual` can never return `false` because of it.

| Function | Signature | Returns | What it does |
| --- | --- | --- | --- |
| `set_processor` | `set_processor(map_index, processor)` | `boolean` | Registers the Lua table as the processor of the map. `false`, with a `sys_err` line `has active sessions; refusing re-registration`, if the map has a processor and players inside. Replaces the old processor otherwise. |
| `mark_virtual` | `mark_virtual(map_index)` | `boolean` | Registers the built-in passthrough processor if none exists, so the map gets the cache and the redirected saves with no transform. `true` and no change if a processor exists. |
| `unset_processor` | `unset_processor(map_index)` | nothing | Erases the slot. Players inside keep their processor for the session; only later loads see a real map. No session check. |
| `clear` | `clear(map_index, pid?)` | nothing | Without `pid`, wipes the cache of the map. With `pid`, wipes that one entry. The stub says it is refused while sessions are active; it is not. The map form logs `called with N active session(s)` followed by `possible dangling cache pointers` and clears anyway, and the pid form clears silently. |
| `is_virtual_map` | `is_virtual_map(map_index)` | `boolean` | A processor, custom or passthrough, is registered for the map index. |
| `is_player_virtual` | `is_player_virtual(pid)` | `boolean` | The player has a virtual session on this core. `false` if the pid is not on this core. |
| `get_real_player_table` | `get_real_player_table(ch)` | `TPlayerTable` or `nil` | A copy of the player row as the database sent it, before any transform. `nil` if the character is not virtual. |
| `commit_quest_flag` | `commit_quest_flag(ch, key, value)` | nothing | Writes one quest flag to the real character. See [the prize commit](#the-prize-commit). |
| `commit_account_flag` | `commit_account_flag(ch, key, value)` | nothing | Writes one account flag. Needs a descriptor on the character. |
| `commit_stash_item` | `commit_stash_item(ch, item, why?)` | `number` | Hands an item to the real character. Returns the item id, or `0` on a refusal. Consumes the item. |
| `get_forge_cache` | `get_forge_cache(ch, key)` | `table` or `nil` | The cached table of a forge subsystem. `nil` if the character is not virtual or has no entry. |
| `set_forge_cache` | `set_forge_cache(ch, key, value)` | nothing | Replaces the cached table of a subsystem. No effect if the character is not virtual. |
| `transform_forge_load` | `transform_forge_load(ch, key, input)` | `table` | Runs `transform_forge_load` of the processor on `input`. The input unchanged if the character is not virtual or has no processor. |
| `with_load_cache` | `with_load_cache(ch, key, response_type, load_fn)` | `table` or `nil` | Load wrapper for a forge subsystem. Not virtual: decodes `load_fn()`. Virtual with an entry: the cached table, `load_fn` is not called. Virtual without one: decodes `load_fn()`, runs `transform_forge_load`, caches and returns the result. `nil` if `load_fn()` returns `nil`, and nothing is cached. |
| `with_save_cache` | `with_save_cache(ch, key, request_type, msg, save_fn)` | the result of `save_fn()`, or `nil` | Save wrapper. Not virtual: calls `save_fn()`. Virtual: decodes `msg`, stores it in the cache verbatim, and never calls `save_fn`. Filtering belongs on the load side. |

`with_load_cache` and `with_save_cache` are for a forge subsystem that keeps its own table in the database. Wrap its load and its save, and the subsystem becomes virtual on a virtual map without knowing it.

Beside the module, the character has `LPCHARACTER:is_virtual()`, and a forge extension adds `LPCHARACTER:commit_quest_flag(key, value)` and `pc.commit_quest_flag(key, value)`. A virtual character goes to the prize commit, a real one to `set_quest_flag`. A forge extension also adds helpers that act on the live character and are not gated: `get_skill_vnums`, `get_spec_skill_vnums`, `max_skills(level?)`, `set_specialization(spec, level?)`, `max_spec_skills`, `max_horse`, `give_collect_affects(up_to_level)`, `give_blessing_progression(up_to_level)` and `set_blessing_level(level)`. On a real character their effect is permanent.

### Processor hooks

A processor is a plain table with any subset of 9 functions. All are optional. The engine calls each as `fn(processor, ch, ...)`, so write `function processor.name(self, ch, ...)` or `function processor:name(ch, ...)`. Only a real function counts as a hook.

| Hook | Signature | Returns | When it runs |
| --- | --- | --- | --- |
| `transform_player_load` | `(self, ch, player: TPlayerTable)` | `TPlayerTable?` | Once per cache entry, at the first load onto the map. |
| `transform_item_load` | `(self, ch, items: TPlayerItemEx[])` | `TPlayerItemEx[]?` | Once per cache entry. The stash rows are already stripped. |
| `transform_quest_load` | `(self, ch, quests: TQuestTable[], is_account: boolean)` | `TQuestTable[]?` | Twice per cache entry: `is_account` false for the character, then true for the account. |
| `transform_affect_load` | `(self, ch, affects: TPacketAffectElement[])` | `TPacketAffectElement[]?` | Once per cache entry. |
| `transform_skill_tree_load` | `(self, ch, trees: TPlayerSkillTree[])` | `TPlayerSkillTree[]?` | Once per cache entry. |
| `transform_pet_load` | `(self, ch, pet: TPetPlayerTable)` | `TPetPlayerTable?` | Once per pet vnum, at the first summon. A resummon reuses the cached record. |
| `transform_forge_load` | `(self, ch, key: string, data: table)` | `table?` | Once per key, at the first `with_load_cache` of that subsystem. |
| `on_player_enter` | `(self, ch, fresh_hydrate: boolean)` | nothing | At every entry into the game. `fresh_hydrate` is `true` only the first time. |
| `on_player_exit` | `(self, ch)` | nothing | At every disconnect, before the saves. |

What the engine takes from a return value:

- `transform_player_load` and `transform_pet_load`: a returned record of the right type wins. Anything else, `nil` included, and the engine reads the input you changed in place.
- The vector hooks: a returned table is read back keeping only the entries that are records of the right type. A plain Lua table such as `{ name = "x", state = "y", value = 1 }` is silently dropped, so a hook that returns only such tables empties the slice. Any other return, `nil` included, uses the input array as you left it.
- `transform_forge_load`: a returned table wins, otherwise the input table as you left it.

The hooks pass or filter, in any combination. A hook can keep part of its input (filter the array, leave fields alone) or replace it. The base overlay that follows `transform_player_load` is fixed, see [the boundary](#the-boundary).

### The record types

Hooks work on records bound from the engine. The no-argument constructor form `TPlayerTable()` exists, and `TPlayerSkillTree.new()`, `TPlayerSkillTree.new(pid, type)`, `TPetPlayerTable.new()` and `TPetPlayerTable.new(pid, pet_vnum)` are documented in the stub.

| Type | Fields | Methods |
| --- | --- | --- |
| `TPlayerTable` | `id`, `name`, `job`, `voice`, `level`, `level_step`, `st`, `ht`, `dx`, `iq`, `exp`, `gold`, `x`, `y`, `z`, `map_index`, `hp`, `sp`, `random_hp`, `random_sp`, `playtime`, `stat_point`, `skill_point`, `sub_skill_point`, `horse_skill_point`, `stamina`, `skill_group`, `alignment`, `stat_reset_count`, `player_new` | `get_skill(vnum)`, `set_skill_level(vnum, level)`, `clear_skills()`, `clear_quickslots()`, `get_part(i)`, `set_part(i, v)`, `clear_parts()`, `get_specialization()` |
| `TPlayerNewTable` | `pid`, `selected_skill`, `inventory_status`, `inventory_psw`, `seventh_cool_time`, `eighth_cool_time`, `guild_coin`, `raid_prism`, `mh_coin`, `mh_level`, `jsettings` | `get_master_skill(i)`, `set_master_skill(i, v)` |
| `TPlayerItem` | `id`, `window`, `pos`, `count`, `vnum`, `abstract_grade`, `death_time`, `physical_value_grade`, `magic_value_grade`, `owner` | `get_socket(i)`, `set_socket(i, v)`, `get_attr(i)`, `set_attr(i, v)`, `clear_attrs()`, `get_real_value(i)`, `set_real_value(i, v)` |
| `TPlayerItemEx` | `item` | `flag_count()`, `get_flag(i)`, `set_flag(i, v)`, `add_flag(v)`, `clear_flags()` |
| `TItemFlagExtended` | `item_id`, `name`, `value` | none |
| `TQuestTable` | `pid`, `name`, `state`, `value` | none |
| `TPacketAffectElement` | `type`, `apply_on`, `apply_value`, `flag`, `duration`, `sp_cost`, `source_vid`, `is_real_time` | none |
| `TPlayerSkillTree` | `pid`, `type`, `active`, `remaining_time` | `get_node_level(i)`, `set_node_level(i, v)` |
| `TPetPlayerTable` | `id`, `pid`, `pet_vnum`, `exp`, `level`, `name` | `get_bonus_level(i)`, `set_bonus_level(i, v)`, `get_skill_level(i)`, `set_skill_level(i, v)` |

`set_skill_level` on a `TPlayerTable` clamps to 0 to 40 and sets the master tier at 20, 30 and 40. An out-of-range index on an item getter returns 0 and a setter does nothing. `TPetPlayerTable:set_skill_level` has no cap despite the stub. `gold` is a 64-bit value; a Lua number loses precision from 2^53. `TPlayerTable:clear_skills_keep_spec()` is a Lua extension that ships beside the engine.

## Behaviour

### The boundary

What a virtual session keeps in the cache, and what always stays real.

| Always real | Kept in the cache |
| --- | --- |
| Position (`x`, `y`, `z`, `map_index`), the exit location, `playtime`, the inventory lock status and password, and `jsettings`. The engine copies them from the database row over every transformed player table, on every load. Your hook cannot change them. | Level, experience, gold, HP, SP, stats, skills, quickslots, parts, currencies (guild coin, raid prism, master hunt coin), the master hunt rank, items with their flags, quest and account flags, affects, skill trees, pets and the forge subsystem tables. |

Everything in the right column is the copy. A save while virtual writes into the cache, never to the database, except for the left column. The cache key is the map index and the player id. It lives until the private map is destroyed, `clear` runs, or the core restarts. A relog onto the same map is a cache hit: the hooks do not run again and `on_player_enter` gets `fresh_hydrate` `false`.

### Items in the stash

The stash is where the prize commit puts items. The engine strips the stash rows from the item list before `transform_item_load`, so a processor never sees them and a virtual session never delivers them. The next load on a map that is not virtual delivers them.

### Blocked subsystems

Some subsystems write shared state that a per-player cache cannot represent. In a virtual session the engine refuses them: the offline shop, casual mode, the reward enabler, the matchmaking hub, the battle pass, master hunt and the biologist validator, the drop and PvP arena eligibility commands and the safebox. The client shows the popup text of the string `Funzione non disponibile quando utilizzi un Avatar.` on the client side. The battle pass is never loaded or saved for a virtual player. Guild skill sync is skipped. Logs are written, marked as virtual. Rankings read the real character.

### The transformers

The transformers are the hooks that start with `transform_`, and `on_player_enter` for additive grants. Each takes one slice of the character from the real data to the virtual copy. The way back is only the prize commit.

| Slice | Real to virtual (declared by) | Virtual to real |
| --- | --- | --- |
| Player table: level, stats, HP and SP, job, skill group, skills, quickslots, parts, gold, currencies | `transform_player_load`, then the fixed overlay | the overlay fields only |
| Items with their flags | `transform_item_load`, stash rows stripped before | `commit_stash_item` |
| Quest flags, character and account | `transform_quest_load(is_account)` | `commit_quest_flag`, `commit_account_flag` |
| Affects | `transform_affect_load` | none |
| Skill trees | `transform_skill_tree_load` | none |
| Pets | `transform_pet_load`, lazy, per vnum | none |
| Forge subsystem tables | `transform_forge_load(key)`, through `with_load_cache` | none; `with_save_cache` keeps the table as the forge sent it |
| Entry grants: skills, items, a pet, affects | `on_player_enter(fresh)`, additive | none |
| Last mile | `on_player_exit` | may commit |
| Metrics | none | `allow_virtual` per metric |

The shipped modes (the avatar arenas, Ball-Em-Up, the avatar guild war, the mannequin mode and battle royale) all install a Lua processor, five of six inherit one base with `setmetatable`. None passes real items, affects or ordinary quest flags. The guild war processor keeps back two flags through `transform_quest_load` so a daily cap survives the session. The hooks can pass part of their input, as that one does.

The avatar builder, which limits what a player may build inside the session, is not a transformer and is not part of this table.

### The prize commit

A virtual session cannot write to the real rows, so a result that must outlive the session goes through the commit. Three functions exist: `commit_quest_flag`, `commit_account_flag` and `commit_stash_item`.

```cpp
namespace PlayerVirtualRewards
{
    // Commits a single quest flag for the REAL character.
    // `key` is the composite "name.state" form (split on the first '.').
    void CommitQuestFlag  (LPCHARACTER ch, const std::string& key, int64_t value);

    // Commits a single account-scoped quest flag. Visible to all
    // characters on the same account on next load.
    void CommitAccountFlag(LPCHARACTER ch, const std::string& key, int64_t value);
    uint32_t CommitStashItem(LPCHARACTER ch, LPITEM staged, const char* logWhy = nullptr);
}
```

Key rules:

- The key is `name.state`, split on the first `.`. Each part must be 63 characters or fewer, otherwise the commit is dropped with a `sys_err` line `quest name too long` or `quest state too long`.
- A key with no `.` commits the whole string as the name and an empty state. A quest reads the flag under its own name and state, so commit `my_quest.prize`, not `prize`.
- `commit_account_flag` needs a descriptor. Without one it logs `has no desc` followed by `cannot resolve account id` and nothing is written.
- `commit_stash_item` takes an item you created with `forge.sys.game.item_manager.create_item`. The engine consumes it, so the Lua handle dangles afterwards: do not touch it. It returns the item id. It returns `0` when the character or item is null, the item has no id, or the item is bound to an owner (`item id N is bound to owner M` followed by `refusing`). `why` is written to the `STASH_COMMIT` log line.
- The item keeps its id from the commit to the inventory.
- A currency is a stash item. A guild coin is an item with vnum 5, converted to the point on delivery.

Delivery and guarantees:

- The commit is fire and forget. The write goes to the database core as one packet. There is no acknowledgement, no sequence number, and nothing waits for it at logout. The database core ignores the result of the quest write, and a write is dropped if the link to the database core is closed. A commit made just before a disconnect or a database restart can be lost with no error on the game core side.
- The running session is not updated. A flag goes straight to the database, not to the quest state of the live character. `get_quest_flag` right after `commit_quest_flag` still returns the old value. The flag is visible the next time the player loads onto a map that is not virtual.
- A stash item is delivered on the next real item load, after the real inventory is placed, with stacking, a free cell and a ground fallback. The player is notified once the client reaches the game phase.
- The native rate limiter commits and also sets the flag on the live character, to keep the session copy right. Do the same when your own code reads the value again in the session.
- In a session that is not virtual, a raw `commit_quest_flag` leaves the live quest state stale. The `LPCHARACTER:commit_quest_flag` helper branches on `is_virtual()` to avoid that.
- `set_quest_flag` in a virtual session writes into the cache and is discarded with it.

### The `questcategory.txt` rule

`questcategory.txt` lists the quests. The optional third column is `allow_in_virtual`.

```cpp
// Optional 3rd column: allow_in_virtual (0/1). Missing = allow.
bool allow_in_virtual = (data.size() >= 3) ? (atoi(data[2].c_str()) != 0) : true;
```

| Entry | In a virtual session |
| --- | --- |
| Listed with `0` | The quest is dormant. |
| Listed with any other value | Allowed. |
| Not listed, or no third column | Allowed. |

The file is tab-separated and read once, when the quest manager starts. A quest is blocked only when the current character is virtual and the quest is listed with `0`. The gate sits on the login, kill, click, timer, item-use and custom events. It does not sit on the NPC `chat` menu, on `target`, on the receive-all item-use event, on `info` and on `button`, so a listed quest can still offer a `chat` option to a virtual player. An unknown name logs `QUEST couldnt find QuestIndex for name Quest`. At the time of writing every row of the shipped file is `0`.

### Metrics opt-in

A virtual session drops metrics by default. A metric opts in with `allow_virtual: true` in `metrics.yaml`. A metric derived from a signal can never opt in, because a signal fires on whatever the character currently is. Four shipped metrics opt in, because the referee owns the episode and is the only thing that knows the match was real.

```yaml
arena.win:           { from: custom, agg: count, allow_virtual: true }
arena.entered:       { from: custom, agg: count, allow_virtual: true }
arena.win.nodeath:   { from: custom, agg: count, allow_virtual: true }
arena.mayhem.played: { from: custom, agg: count, allow_virtual: true }
```

An opted-in metric is written under the player id of the real character and flushed without a virtual check. An achievement may be measured and recorded in a virtual session, but its claim is refused.

### C++ registration

Lua is the door every shipped mode uses. C++ is supported and goes through the same registry: `set_processor` builds a C++ adapter around your table and calls `RegisterProcessor`. At the time of writing no C++ code registers a processor of its own, so the first row below is empty.

| Door | Signature | Registrants shipped |
| --- | --- | --- |
| `CPlayerVirtualManager::RegisterProcessor` | `bool (int32_t mapIndex, std::shared_ptr<IPlayerVirtualProcessor>)` | none in C++; the Lua `set_processor` is the only caller |
| `CPlayerVirtualManager::MarkVirtual` | `bool (int32_t mapIndex)` | none in C++; the Lua `mark_virtual` calls it, and no content calls that |
| `IPlayerVirtualProcessor::RegisterForgeLoadHandler` | `void (std::string key, ForgeHandler)` | none |
| `PlayerVirtualRewards::Commit*` | `CommitQuestFlag`, `CommitAccountFlag`, `CommitStashItem` | every write of the native rate limiter, and the GM command `/stash_item <vnum> [count]` |
| `CPlayerVirtualManager::GetRealPlayerTable` | `const TPlayerTable* (uint32_t pid)` | the rankings |

A C++ processor subclasses `IPlayerVirtualProcessor`, overrides only the hooks it needs (each has a passthrough default, so adding a hook later breaks no subclass), and registers on a map index. `RegisterForgeLoadHandler(key, handler)` adds a handler for a forge key, and the default `TransformForgeLoad` dispatches to it. A handler has the type `std::function<sol::table(LPCHARACTER, sol::table)>`.

```cpp
bool CPlayerVirtualManager::RegisterProcessor(int32_t mapIndex, std::shared_ptr<IPlayerVirtualProcessor> p)
{
    if (!p)
    {
        sys_err("CPlayerVirtualManager::RegisterProcessor null processor for mapindex {}", mapIndex);
        return false;
    }

    auto it = m_processors.find(mapIndex);
    if (it != m_processors.end() && HasActiveSessions(mapIndex))
    {
        sys_err("CPlayerVirtualManager::RegisterProcessor mapindex {} has active sessions; refusing re-registration", mapIndex);
        return false;
    }

    m_processors[mapIndex] = std::move(p);
    sys_log(0, "CPlayerVirtualManager::RegisterProcessor mapindex {}", mapIndex);
    return true;
}
```

Register before any player loads onto the map. The native side always wins on the overlay fields, the stash stripping, the save redirection and the virtual gates; a processor of either language cannot override them. The manager also exposes `UnregisterProcessor`, `GetProcessor`, `IsVirtualMapIndex`, the cache accessors `GetCache`, `SeedCache` and `ClearCache`, and the session counters.

### Registration and a failing hook

The adapter calls each Lua hook inside a protected call. When a hook raises an error, the engine does not stop the load: it uses the untransformed input, which is the real data, and logs one `sys_err` line of the form `PlayerVirtualLuaProcessor::TransformPlayerLoad Lua error: ...` followed by `falling back to passthrough` (with the name of the hook). A `transform_forge_load` error logs `PlayerVirtualLuaProcessor::TransformForgeLoad key 'K' Lua error: ...` with the key. Errors in `on_player_enter` and `on_player_exit` log `PlayerVirtualLuaProcessor::OnPlayerEnter Lua error: ...`, and the session goes on.

## Examples

### Pay a prize from a virtual session

The referee decides a winner. It stages an item, commits it, and commits a flag that the real quest logic reads on the next real login. `ch:commit_quest_flag` would branch on `is_virtual()`; the module function always commits.

```lua
local PV = forge.sys.game.player_virtual

local function pay_winner(ch)
    if not ch:is_virtual() then return false end

    local staged = forge.sys.game.item_manager.create_item(5, 10)
    if not staged then return false end

    local id = PV.commit_stash_item(ch, staged, "example_room_prize")
    if id == 0 then return false end

    PV.commit_quest_flag(ch, "example_room.won", 1)
    return true
end
```

`staged` is dangling after the commit. The coins and the flag reach the character at its next load on a map that is not virtual.

### Keep two flags through the boundary

A rate limiter that reads its counters from quest flags reads zero in a virtual session. Pass the pair through `transform_quest_load` and drop the rest.

```lua
local processor = {}

function processor.transform_quest_load(self, ch, quests, is_account)
    if is_account then return {} end
    local kept = {}
    for _, q in ipairs(quests) do
        local name, sub = q["name"], q["state"]
        if name == "example_cap" and (sub == "cursor" or sub == "count") then
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
    ch:set_quest_flag("example_room.entered", 1)
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
    PV.commit_quest_flag(ch, "example_trial.cleared", 1)
end
```

`items` holds the equipped items as well as the inventory, so `{}` empties both. Call `award(ch)` from your own event (a kill, an NPC), not from a hook. The flag reaches the real row at once and a quest named `example_trial` reads it after the player's next load onto a real map.

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

**The flag you committed reads as the old value.** The commit goes to the database, never to the running session, and nothing acknowledges it. The avatar arenas read their desertion count with `get_quest_flag` and write it with `commit_quest_flag`, and the avatar processor returns an empty quest list, so the count reads 0 and the three-desertion ban never triggers (issue #16). Set the session copy too, as the native rate limiter does, or let the value through `transform_quest_load`.

**Rewards vanish on a restart.** Battle royale keeps unpaid guild coin rewards in the memory of the host core and retries from there (issue #18). A restart loses them, and a core other than the host never pays them. Anything that must survive a restart goes through the commit, and the commit has no acknowledgement either (issue #22): a design that waits for it to drain at logout has nothing to wait on.

**A commit seems to work and never arrives.** A quest name or state of 64 characters or more, an account flag with no descriptor, or an item that already has an owner are logged and dropped. Check syserr.

**The quest still offers a `chat` option.** `questcategory.txt` does not gate `chat`, `target`, receive-all item use, `info` and `button`. A listed quest is dormant on login, kill, click, timers, item use and custom events only.

**`set_processor` returns `false` with players inside.** A map that has a processor and active sessions refuses a new one. `unset_processor` kicks nobody, so the old processor stays with the players in it. Register before the first player loads, or wait until the map is empty.

**`clear` with players inside leaves dangling pointers.** The stub says it is refused. It is only warned. Clear a map that is empty.

**A base map you registered stays virtual.** The engine cleans only private maps. A base map keeps its cache until `clear` or a restart, and a player who logs out there keeps a stale session next time.

**A processor registered after the load does nothing.** The player is decided at the load. A processor installed once the player is on the map is seen at the next load.

**`commit_stash_item` consumes your item.** Reading the item after the call is a use after free in Lua terms. Keep the id the function returns.

**The `char_virtual` helpers are permanent on a real character.** `max_skills`, `set_specialization`, `give_blessing_progression` and the rest act on the live character. In a virtual session the cache swallows it; on a real one it sticks.

**A pet transforms once per vnum.** A resummon reuses the cached record, so a change in the hook is not applied again.

## See also

- [Player virtualization](/foundations/player-virtualization/), the foundation: the limit it closed, how a load and a save are redirected, and the story.
- [Player metrics](/docs/core/player-metrics), for the `allow_virtual` flag.
- [Forge API reference](/docs/core/luna-forge)
