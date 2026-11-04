---
title: "Death manager: examples"
description: Register and remove a death profile for an event.
displayed_sidebar: mainSidebar
---

# Death manager: examples

These recipes use the [death manager API](/docs/building-blocks/death-manager) and its [behaviour](/docs/building-blocks/death-manager/behaviour). A forge is a script container loaded by Luna; see [Forge setup](/docs/core/luna-forge/setup).

## Register for a trial map

Register when an event starts, and retain the handle for teardown. Replace `MAP_A` with the map index.

```lua
local MAP_A = 1
local function restore(ch)
    ch:restart_at_same_pos()
    ch:revive_invisible(5)
    ch:point_change(point.HP, ch:get_max_hp() - ch:get_hp())
end
local handle = forge.sys.game.death_manager.register(
    "trial", function(ch) return ch:get_map_index() == MAP_A end,
    {
        name = "trial",
        total_duration = 60,
        restart_here_available_at = 3,
        restart_town_available_at = 3,
        on_restart_here = restore,
        on_restart_town = restore,
        on_auto_town = restore,
    })
```

When the event ends, remove the registration. Players already dead retain their snapshot and callbacks.

```lua
forge.sys.game.death_manager.unregister(handle)
```

## Hide the restart screen

Use unreachable timers and empty callbacks when the event settles deaths itself. Hiding the screen alone does not disable restart commands.

```lua
local MAP_A = 1
local unreachable = 10000
local function no_restart(ch) end
local handle = forge.sys.game.death_manager.register(
    "event", function(ch) return ch:get_map_index() == MAP_A end,
    {
        name = "event",
        restart_window = false,
        total_duration = unreachable,
        restart_here_available_at = unreachable,
        restart_town_available_at = unreachable,
        on_restart_here = no_restart,
        on_restart_town = no_restart,
        on_auto_town = no_restart,
    })
```

Unregister `handle` at event teardown. Arrange a revive separately, after the death path completes.

Next: [Death manager reference](/docs/building-blocks/death-manager).
