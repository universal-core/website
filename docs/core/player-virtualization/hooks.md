---
title: Hooks and records
description: Functions, hooks, and records for player virtualization.
displayed_sidebar: mainSidebar
---

# Hooks and records

A processor is a set of hooks registered for a map. A virtual session uses a cached copy of a character's data; a cache entry holds that copy for one player and map. A slice is one portion of that data. Start with the [overview](/docs/core/player-virtualization/overview).

## Functions

These functions are on `forge.sys.game.player_virtual`.

| Function | Signature | Returns | What it does |
| --- | --- | --- | --- |
| `set_processor` | `set_processor(map_index, processor)` | `boolean` | Registers or replaces a map processor. |
| `mark_virtual` | `mark_virtual(map_index)` | `boolean` | Registers a passthrough processor if absent. |
| `unset_processor` | `unset_processor(map_index)` | nothing | Removes the registration for later loads. |
| `clear` | `clear(map_index, pid?)` | nothing | Clears a map cache or one player entry. |
| `is_virtual_map` | `is_virtual_map(map_index)` | `boolean` | Tests whether a processor is registered. |
| `is_player_virtual` | `is_player_virtual(pid)` | `boolean` | Tests for a session on this core. |
| `get_real_player_table` | `get_real_player_table(ch)` | `TPlayerTable` or `nil` | Copies the real player row before transformation. |
| `commit_quest_flag` | `commit_quest_flag(ch, key, value)` | nothing | Writes one real character flag. |
| `commit_account_flag` | `commit_account_flag(ch, key, value)` | nothing | Writes one real account flag. |
| `commit_stash_item` | `commit_stash_item(ch, item, why?)` | `number` | Consumes an item for delivery. |
| `get_forge_cache` | `get_forge_cache(ch, key)` | `table` or `nil` | Gets a cached subsystem table. |
| `set_forge_cache` | `set_forge_cache(ch, key, value)` | nothing | Replaces a cached subsystem table. |
| `transform_forge_load` | `transform_forge_load(ch, key, input)` | `table` | Runs the subsystem load transform. |
| `with_load_cache` | `with_load_cache(ch, key, response_type, load_fn)` | `table` or `nil` | Loads through the subsystem cache. |
| `with_save_cache` | `with_save_cache(ch, key, request_type, msg, save_fn)` | the result of `save_fn()`, or `nil` | Saves through the subsystem cache. |

`clear` also clears active entries, so use it only when the affected players are gone. `unset_processor` does not remove the processor from active sessions. See [custom transformers](/docs/core/player-virtualization/custom-transformers) for the cache wrappers and [the prize commit](/docs/core/player-virtualization/prize-commit) for commit guarantees.

The character exposes `LPCHARACTER:is_virtual()`; `LPCHARACTER:commit_quest_flag(key, value)` and `pc.commit_quest_flag(key, value)` choose the commit for a virtual character and `set_quest_flag` for a real one.

## Processor hooks

A Lua processor is a table of optional functions. The engine calls each as `fn(processor, ch, ...)`. Passthrough means keeping the input when a hook is absent or does not replace it. The stash is storage for items awaiting delivery on a non-virtual load.

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

The hooks pass or filter, in any combination. A hook can keep part of its input (filter the array, leave fields alone) or replace it. The base overlay that follows `transform_player_load` is fixed, see [the boundary](/docs/core/player-virtualization/overview#the-boundary).

## Record types

Hooks work on records bound from the engine. The no-argument constructor form `TPlayerTable()` exists, and `TPlayerSkillTree.new()`, `TPlayerSkillTree.new(pid, type)`, `TPetPlayerTable.new()` and `TPetPlayerTable.new(pid, pet_vnum)` also exist.

| Type | Fields | Methods |
| --- | --- | --- |
| `TPlayerTable` | `id`, `name`, `job`, `voice`, `level`, `level_step`, `st`, `ht`, `dx`, `iq` | `get_skill(vnum)`, `set_skill_level(vnum, level)`, `clear_skills()` |
| `TPlayerTable` | `exp`, `gold`, `x`, `y`, `z`, `map_index`, `hp`, `sp`, `random_hp`, `random_sp` | `clear_quickslots()`, `get_part(i)`, `set_part(i, v)` |
| `TPlayerTable` | `playtime`, `stat_point`, `skill_point`, `sub_skill_point`, `horse_skill_point`, `stamina`, `skill_group`, `alignment`, `stat_reset_count`, `player_new` | `clear_parts()`, `get_specialization()` |
| `TPlayerNewTable` | `pid`, `selected_skill`, `inventory_status`, `inventory_psw`, `seventh_cool_time`, `eighth_cool_time`, `guild_coin`, `raid_prism`, `mh_coin`, `mh_level`, `jsettings` | `get_master_skill(i)`, `set_master_skill(i, v)` |
| `TPlayerItem` | `id`, `window`, `pos`, `count`, `vnum`, `abstract_grade`, `death_time`, `physical_value_grade`, `magic_value_grade`, `owner` | `get_socket(i)`, `set_socket(i, v)`, `get_attr(i)`, `set_attr(i, v)`, `clear_attrs()`, `get_real_value(i)`, `set_real_value(i, v)` |
| `TPlayerItemEx` | `item` | `flag_count()`, `get_flag(i)`, `set_flag(i, v)`, `add_flag(v)`, `clear_flags()` |
| `TItemFlagExtended` | `item_id`, `name`, `value` | none |
| `TQuestTable` | `pid`, `name`, `state`, `value` | none |
| `TPacketAffectElement` | `type`, `apply_on`, `apply_value`, `flag`, `duration`, `sp_cost`, `source_vid`, `is_real_time` | none |
| `TPlayerSkillTree` | `pid`, `type`, `active`, `remaining_time` | `get_node_level(i)`, `set_node_level(i, v)` |
| `TPetPlayerTable` | `id`, `pid`, `pet_vnum`, `exp`, `level`, `name` | `get_bonus_level(i)`, `set_bonus_level(i, v)`, `get_skill_level(i)`, `set_skill_level(i, v)` |

`set_skill_level` on a `TPlayerTable` clamps to 0 to 40 and sets the master tier at 20, 30 and 40. An out-of-range index on an item getter returns 0 and a setter does nothing. `TPetPlayerTable:set_skill_level` has no cap despite the stub. `gold` is a 64-bit value; a Lua number loses precision from 2^53. `TPlayerTable:clear_skills_keep_spec()` is a Lua extension that ships beside the engine.

## Transformers

The fixed overlay copies real fields over the transformed player table. A forge subsystem is a Forge component with its own stored table.

| Slice | Real to virtual | Virtual to real |
| --- | --- | --- |
| Player table | `transform_player_load`, then fixed overlay | Overlay fields only |
| Items and flags | `transform_item_load` | `commit_stash_item` |
| Quest and account flags | `transform_quest_load` | Flag commits |
| Affects | `transform_affect_load` | None |
| Skill trees | `transform_skill_tree_load` | None |
| Pets and forge subsystem tables | [Custom transformers](/docs/core/player-virtualization/custom-transformers) | None |
| Entry grants | `on_player_enter` | None |
| Exit | `on_player_exit` | May commit |
| Metrics | None | `allow_virtual` per metric |

## C++ registration

Subclass `IPlayerVirtualProcessor` and override the hooks you need; defaults are passthrough. Register it for the map index with `CPlayerVirtualManager::RegisterProcessor` before players load. `CPlayerVirtualManager::MarkVirtual` installs a passthrough processor if none exists. Registration refuses replacement while that map has active sessions. The native fixed overlay always wins over processor changes to its fields. See [custom transformers](/docs/core/player-virtualization/custom-transformers) for Forge handlers.

## A failing hook

A Lua hook runs in a protected call. A transform error logs the hook name and `falling back to passthrough`, then uses the untransformed input. Entry and exit errors are logged and the session continues. A missing hook or a value that is not a function silently uses passthrough.

## Glossary

- **Processor:** hooks registered for a map index.
- **Slice:** a portion of character data handled by a hook.
- **Cache entry:** cached session data for one player and map.
- **Passthrough:** using the input without replacing it.
- **Stash:** item storage for delivery on a later non-virtual load.
- **Prize commit:** an explicit write of a selected result to real data.
- **Virtual session:** a character's session on a virtual map.
- **Fixed overlay:** real fields copied over the transformed player table.
- **Forge subsystem:** a Forge component with its own stored table.

See [examples and pitfalls](/docs/core/player-virtualization/examples).
