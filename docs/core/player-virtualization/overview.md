---
title: Player virtualization
description: Set up a virtual session and understand its boundary.
displayed_sidebar: mainSidebar
---

# Player virtualization

Player virtualization runs a character on a cached copy of its data. A virtual session is the character's time on a map registered for virtualization. A processor is the map's set of hooks that can transform that copy. See the [foundation](/foundations/player-virtualization/) for the model.

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

A player who loads onto the returned map index gets a level 30 character with an empty inventory, no quest flags and no affects. Position, exit location, playtime and the UI settings are still the real ones. When the private map is destroyed, the cache of that map is cleared and ordinary session saves stay in the cache.

## Files and setup

Use `forge.sys.game.player_virtual` from Forge Lua. Register a processor for the exact map index before a player loads; a private map has its own registration. See [Forge setup](/docs/core/luna-forge/setup).

Each map index has one processor slot. A missing hook uses passthrough, meaning the input is kept. Destroying a private map clears its cache. A base map's cache remains until `clear` or a core restart. A processor change takes effect when the core restarts.

What a processor can transform is split into [native slices](/docs/core/player-virtualization/hooks) and [custom transformers](/docs/core/player-virtualization/custom-transformers).

## The boundary

A slice is a portion of character data handled by a hook. A cache entry is the cached data for a player and map index. Saves during a virtual session go to that entry, except for the fields in the fixed overlay: the engine copies those fields from the real row over the transformed player table on every load.

**Always real**

- Location:
  - `x`, `y`, `z`, `map_index`, and exit location.
- Session and settings:
  - `playtime`, inventory lock status and password, and `jsettings`.

**Kept in the cache**

- Character data:
  - Level, experience, gold, HP, SP, stats, skills, quickslots, and parts.
  - Currencies and rank state.
- Other slices:
  - Items and their flags, quest and account flags, affects, and skill trees.
  - Pet records and forge subsystem tables.

A forge subsystem is a Forge component with its own stored table. A cache entry lasts until its private map is destroyed, `clear` runs, or the core restarts. On a cache hit, hooks do not run again and `on_player_enter` receives `fresh_hydrate` as `false`.

## Items in the stash

The stash holds items delivered by a prize commit, an explicit write of a selected result to real data. Stash rows are removed before `transform_item_load`; they are delivered on the next item load on a non-virtual map. See [the prize commit](/docs/core/player-virtualization/prize-commit).

## Blocked subsystems

- Offline shop, casual mode, matchmaking hub, and safebox are blocked.
- Drop and PvP eligibility commands are refused. The reward enabler still grants its drop and PvP affects.
- The Master Hunt hub window is closed on the client; the Master Hunt state itself is cached.
- The battle pass is never loaded or saved for a virtual character.
- The client shows the `VIRTUAL_SESSION_BLOCKED` popup for blocked operations.
- Guild skill sync is skipped. Logs are marked virtual, and rankings read the real character.

## The `questcategory.txt` rule

The tab-separated file lists quests; its optional third column is `allow_in_virtual`.

| Entry | In a virtual session |
| --- | --- |
| Listed with `0` | Dormant on gated events. |
| Listed with another value | Allowed. |
| Missing entry or third column | Allowed. |

The quest manager reads the file at startup. The gate covers login, kill, click, timer, item-use, and custom events. It does not cover NPC `chat`, `target`, receive-all item use, `info`, or `button`.

## Metrics opt-in

Virtual sessions drop metrics by default. In `metrics.yaml`, a custom metric can opt in with `allow_virtual: true`; a metric derived from a signal cannot. The code that owns the episode must push the opted-in metric. The metric is recorded under the real character's player ID. See [player metrics](/docs/core/player-metrics/declare).

```yaml
practice.won: { from: custom, agg: count, allow_virtual: true }
practice.entered: { from: custom, agg: count, allow_virtual: true }
```

## Glossary

- **Processor:** hooks registered for a map index.
- **Slice:** a portion of character data handled by a hook.
- **Cache entry:** a player and map's cached session data.
- **Passthrough:** keeping a hook's input without replacing it.
- **Stash:** item storage for delivery on a later non-virtual load.
- **Prize commit:** an explicit write of a selected result to real data.
- **Virtual session:** a character's session on a virtual map.
- **Fixed overlay:** real fields copied over the transformed player table.
- **Forge subsystem:** a Forge component with its own stored table.

Continue with [hooks and records](/docs/core/player-virtualization/hooks), [custom transformers](/docs/core/player-virtualization/custom-transformers), [the prize commit](/docs/core/player-virtualization/prize-commit), and [examples and pitfalls](/docs/core/player-virtualization/examples).
