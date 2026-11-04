---
title: Spectator policy and spectator manager reference
description: Manager, policy, and client APIs for free and locked spectator cameras.
displayed_sidebar: mainSidebar
---

# Spectator policy and spectator manager reference

The spectator manager moves a viewer's camera in free or locked mode; the spectator policy decides who can watch and supplies targets and exit handling. Use them for viewers in a match or room. For the shared model, see [Policies](/foundations/policies) and the [policies glossary](/docs/building-blocks#policies-glossary).

## Quick start

`watch_room.forge` lets any player on one map take a free camera, with no targets to lock on. A viewer who leaves is sent back to the place they came from.

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
            function(viewer)
                return {}
            end,
            function(viewer)
                viewer:exit_to_saved_location()
            end)

        forge.sys.log(0, "registered, handle " .. handle)
        return { handle = handle }
    end
end
```

Compile the forge and restart the game cores. A game master standing on map 1 types `/spectate free`: the body disappears, the camera detaches and moves with W, A, S and D. A player of any level can send `/observer_exit` (the client's "exit observer" button does) and returns to the saved location. From a script, the same entry is `forge.sys.game.spectator.enter(ch, { mode = forge.sys.game.spectator.MODE.FREE })`.

## Files and setup

Register a policy in a forge, a Lua script loaded by Forge, in the game environment. Compile it as required by your host and restart the game cores after changes; see [Forge setup](/docs/core/luna-forge/setup). The APIs run synchronously on the game thread, and registrations and viewer state are held per core in memory.

## The spectator manager API

### `forge.sys.game.spectator`

| Name | Signature | Returns | What it does |
| --- | --- | --- | --- |
| `enter` | `enter(ch, options)` | `boolean` | Starts spectating. `false` is a refusal. |
| `set_target` | `set_target(ch, target_pid)` | `boolean` | Sets the target by player id. In locked mode it also moves the camera. |
| `set_mode` | `set_mode(ch, mode)` | `boolean` | Switches between `MODE.FREE` and `MODE.LOCKED`. `MODE.NONE` returns `false`: use `leave`. |
| `leave` | `leave(ch, restore_here)` | nothing | Ends spectating. `restore_here` is a boolean, see below. |
| `invalidate` | `invalidate(target_pid)` | nothing | Marks every viewer locked on that player id: the next manager tick asks the policy again. |
| `is_spectating` | `is_spectating(ch)` | `boolean` | Whether the character has a spectator state. |
| `get_target` | `get_target(ch)` | `number` | The player id of the locked target, or 0. |
| `MODE` | table with `NONE`, `FREE`, `LOCKED` | | The values 0, 1 and 2. |

All calls are synchronous and run on the game thread. Targets are player ids, never VIDs: use `target:get_player_id()`.

`enter` options:

| Field | Type | Meaning |
| --- | --- | --- |
| `mode` | `number` | `MODE.FREE` or `MODE.LOCKED`. A missing `mode` is `MODE.NONE` and `enter` refuses. |
| `target_pid` | `number?` | Player id of the target. Required for `MODE.LOCKED`. |
| `x`, `y` | `number?` | World coordinates where a free camera starts. Both or neither: only one of them makes `enter` return `false`. Without them the free camera starts at the body. |

`enter` refuses, returning `false`, when:

1. the character is missing, has no connection, is not a player, or has no player id, or the mode is neither free nor locked;
2. the mode is locked and `target_pid` is not an online player;
3. a target was given and is not natively valid (see below), which refuses before the policy is asked and with no chat line, or the policy refuses (see "How the policy is asked"). A refusal that carries a `locale_key` is sent to the viewer as an info chat line;
4. the free start point cannot be placed on the map: it is clamped into the map rectangle, then moved to the nearest walkable cell, and a failure refuses.

A `target_pid` that is an online player is passed to the policy as the target even in free mode, though a free viewer stores no target. If the body stands on a cell nobody can walk on, `enter` first moves it to the nearest walkable one, and refuses when that fails. On success the character stops, becomes hidden and immune (observer mode), the camera anchors on the target in locked mode or on the start point in free mode, and the client is told. Calling `enter` for a player who is already spectating replaces their state.

`set_target` returns `false` when the character is not spectating, the target is not online, or the policy refuses (with the chat line). In locked mode the camera jumps to the target. In free mode it only stores the target, so that a following `set_mode(ch, MODE.LOCKED)` uses it. `set_mode` to locked with no valid stored target cycles forward to the first allowed one, and when there is none it reverts to free and returns `false`. `set_mode` to free drops the target and keeps the last camera position.

`leave(ch, restore_here)`:

| `restore_here` | Result |
| --- | --- |
| `true` | The body becomes visible where it stands. |
| `false` | The body stays hidden and immune, for a warp that follows at once. |

The second argument is required. Always write it.

### `forge.sys.game.spectator_policy`

| Name | Signature | Returns | What it does |
| --- | --- | --- | --- |
| `register` | `register(name, guard, can_watch, targets, on_leave)` | `number` handle, greater than 0 | Appends a policy to the end of the list. `on_leave` is optional. |
| `unregister` | `unregister(handle)` | `boolean` | Removes the policy. `true` when found, `false` for an unknown handle. |

`register` parameters:

| Parameter | Type | Meaning |
| --- | --- | --- |
| `name` | `string` | Shown in log lines and errors. Never compared: duplicates are two policies. |
| `guard` | `fun(viewer, target): boolean` | "Is this viewer mine?" `target` may be `nil`, including when the guard selects a policy for target cycling or exit. |
| `can_watch` | `fun(viewer, target): table` | "May this viewer watch this target?" Returns a verdict table. `target` may be `nil`, including when the guard selects a policy for target cycling or exit. |
| `targets` | `fun(viewer): table` | The cycle order. An array of character objects or player ids. |
| `on_leave` | `fun(viewer)` | Optional. Takes over the whole exit when the viewer leaves with `/observer_exit`. |

The verdict table has two fields: `allowed` (`boolean`, true to allow) and `locale_key` (`string`, a message for the viewer). A field that is missing or of the wrong type keeps its default, and the default of `allowed` is `false`. A verdict of `{}` refuses.

A `guard`, `can_watch` or `targets` that is not a function, or an `on_leave` that is given and is not one, stops the call with `spectator_policy.register: <slot> is not callable`, where `<slot>` is the parameter name. Inside a forge environment body that error fails the forge load. Handles grow by one per registration and are never reused.

## Native registration API

Engine code can register on the same list with `CSpectatorPolicy::instance().Register` and remove a handle with `Unregister`. A native guard may be empty to match every viewer; an empty watch or targets function refuses registration with handle `0`. Native target callbacks return player IDs.

```cpp
using GuardFn = std::function<bool(CHARACTER*, CHARACTER*)>;
using WatchFn = std::function<SpectatorVerdict(CHARACTER*, CHARACTER*)>;
using TargetsFn = std::function<std::vector<uint32_t>(CHARACTER*)>;
using LeaveFn = std::function<void(CHARACTER*)>;
using handle_t = uint64_t;
handle_t Register(std::string name, GuardFn guard, WatchFn watch, TargetsFn targets,
    LeaveFn on_leave = {});
```

## Client API

The client Python hook is `BINARY_SpectatorState(mode, targetVID, targetPID, targetX, targetY, anchorX, anchorY)`.

| Python call | Purpose |
| --- | --- |
| `net.SendSpectatorModePacket(mode)` | Asks for free or locked. |
| `net.SendSpectatorTargetPacket(direction)` | Asks for the next (1) or previous (-1) target. |
| `player.IsSpectating()` | Whether the client is in a spectator state. |
| `player.GetSpectatorMode()` | The current mode. |
| `player.GetSpectatorTarget()` | The target's VID. |
| `player.SPECTATOR_MODE_NONE`, `player.SPECTATOR_MODE_FREE`, `player.SPECTATOR_MODE_LOCKED` | The mode values. |

The standard exit observer button sends `/observer_exit`. Game masters at high wizard level can use `/spectate <name>`, `/spectate free`, `/spectate off`, or the `/observer` alias.

Next: [Spectator behaviour](/docs/building-blocks/spectator/behaviour).
