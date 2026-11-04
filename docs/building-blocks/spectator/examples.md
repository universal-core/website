---
title: "Spectator policy: examples"
description: Register a spectator policy, enter locked mode, and leave a room.
displayed_sidebar: mainSidebar
---

# Spectator policy: examples

These recipes use the [spectator API](/docs/building-blocks/spectator) and its [selection and exit rules](/docs/building-blocks/spectator/behaviour).

## Register a room policy

This forge permits free viewing on map `1` and returns the viewer to the saved location on exit. Change the map index for your room.

```forge
forge watch_room begin
    environment game begin
        local policy = forge.sys.game.spectator_policy
        local ROOM_MAP = 1
        local handle = policy.register(
            "watch_room",
            function(viewer, target)
                return viewer:get_map_index() == ROOM_MAP
                    and (target == nil or target:get_map_index() == ROOM_MAP)
            end,
            function(viewer, target)
                return { allowed = target == nil }
            end,
            function(viewer) return {} end,
            function(viewer) viewer:exit_to_saved_location() end)
        return { handle = handle }
    end
end
```

The guard handles `nil` so it also matches for target-list and exit selection. The exit callback returns nothing.

## Follow a player

Given `target_pid`, the player ID of an online target on the viewer's map, enter locked mode. The active policy must allow the target.

```lua
local spectator = forge.sys.game.spectator
local ok = spectator.enter(viewer, {
    mode = spectator.MODE.LOCKED,
    target_pid = target_pid,
})
```

When a target becomes ineligible, call `spectator.invalidate(target_pid)` so locked viewers are checked on the next tick.

## Restore a viewer in place

Use `true` when there is no following warp. This does not invoke the policy's `on_leave` callback.

```lua
forge.sys.game.spectator.leave(viewer, true)
```

Next: [Spectator reference](/docs/building-blocks/spectator).
