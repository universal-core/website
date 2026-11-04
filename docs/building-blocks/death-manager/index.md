---
title: Death manager reference
description: Register death profiles, callbacks, and revive operations for players.
displayed_sidebar: mainSidebar
---

# Death manager reference

The death manager selects a profile for a dying player and controls restart timers and callbacks. Monsters keep their own timers. For the shared policy model, see [Policies](/foundations/policies).

A [forge](/docs/core/luna-forge/setup) supplies Lua code to the game core; Luna is the Lua runtime that runs alongside QuestManager. The [bridge](/foundations/luna/bridge) calls Lua from the engine and reports callback failures. See the [Policies glossary](/docs/building-blocks#policies-glossary) for shared terms.

## Quick start

`trial_room.forge` makes the trial map a place where a dead player stands up on the spot after 3 seconds of waiting, with full health, instead of walking back from the empire town. Every other map is left to the defaults.

```forge
forge trial_room begin
    environment game begin
        local MAP_A = 1

        local function stand_up(ch)
            ch:restart_at_same_pos()
            ch:revive_invisible(5)
            ch:point_change(point.HP, ch:get_max_hp() - ch:get_hp())
        end

        local handle = forge.sys.game.death_manager.register(
            "trial_room",
            function(ch) return ch:get_map_index() == MAP_A end,
            {
                name = "trial_room",
                total_duration = 60,
                restart_here_available_at = 3,
                restart_town_available_at = 3,
                on_restart_here = stand_up,
                on_restart_town = stand_up,
                on_auto_town = stand_up,
            })

        forge.sys.log(0, "registered, handle " .. handle)
        return { handle = handle }
    end
end
```

Compile and register the forge, then restart the game cores. The syslog shows `[OK] CDeathManager::Register : [trial_room] handle=<n>`. A player who dies on the trial map sees the restart screen, can press "restart here" after 3 seconds and is back on their feet where they fell. If they do nothing, the same callback runs when the 60 second timer ends.

## Files and setup

Register a profile in a forge, Lua module, or quest on each game core that needs it. A profile has no separate file or config key. Compile and register the forge as required by your host, then restart the game cores after changes. Registrations are local to one core and are not saved across restarts.

## API

### `forge.sys.game.death_manager`

| Name | Signature | Returns | Context | What it does |
| --- | --- | --- | --- | --- |
| `register` | `register(name, guard, profile)` | `number` handle, greater than 0 | game core, outside any guard or callback | Appends a profile to the end of the list. |
| `unregister` | `unregister(handle)` | `boolean` | game core, outside any guard or callback | Removes the profile. `true` when found, `false` for an unknown handle. |

`register` parameters:

| Parameter | Type | Meaning |
| --- | --- | --- |
| `name` | `string` | Labels the guard in the log and the registration line. Never compared: duplicates are allowed and they are two profiles. |
| `guard` | `fun(ch: LPCHARACTER): boolean` | "Is this death mine?" Called with the character that just died. Must return a boolean. |
| `profile` | `table` | The profile fields below. |

Handles start at 1 and grow by one per registration on that core. They are never reused. There is no priority parameter and no replace-by-name. `register` either returns a handle or raises an error, so the `0` the stub documents for a failed registration does not occur from Lua.

### Profile fields

The profile is strict: seven fields are required and a missing one stops `register` at once, not at the first death.

| Field | Type | Required | Meaning |
| --- | --- | --- | --- |
| `name` | `string` | yes | Labels the revive callbacks and `on_dead` in the log, and appears in the `DEAD_EVENT_CREATE` line with `profile=<name>`. Shipped content passes the same string as the register `name`. |
| `total_duration` | `number` | yes | Seconds from the death until the master timer fires `on_auto_town`. |
| `restart_here_available_at` | `number` | yes | Seconds after the death before `/restart_here` is accepted. |
| `restart_town_available_at` | `number` | yes | Seconds after the death before `/restart_town` is accepted. |
| `on_restart_here` | `fun(ch)` | yes | Runs on `/restart_here`. |
| `on_restart_town` | `fun(ch)` | yes | Runs on `/restart_town`. |
| `on_auto_town` | `fun(ch)` | yes | Runs when the master timer expires. |
| `restart_window` | `boolean` | no, default `true` | `false` closes the stock restart screen right after the death. Only `false` turns it off. |
| `on_dead` | `fun(ch, killer)` | no | Runs once after the death sequence is created. `killer` is `nil` when there is none. |

Errors raised by `register`:

```text
death_manager.register: guard is not callable
death_manager.register: profile [<name>] missing field [<key>]
death_manager.register: on_dead is not callable
```

`<name>` in the second line is the register `name`, not `profile.name`. The three revive callbacks are fetched without a callable check: a value that is not a function registers fine and fails at the first restart (see the pitfalls).

### The callbacks

| Slot | Called when | Return | On a Lua error or a returned value |
| --- | --- | --- | --- |
| `guard(ch)` | the player dies, synchronously inside the death | boolean | logged, counts as `false`: the profile does not apply |
| `on_dead(ch, killer)` | at the end of the death sequence, before the dead packet | nothing | logged only |
| `on_restart_here(ch)` | the player sends `/restart_here` and the cooldown passed | nothing | logged, then the stock restart-here runs |
| `on_restart_town(ch)` | the player sends `/restart_town` and the cooldown passed | nothing | logged, then the stock restart-town runs |
| `on_auto_town(ch)` | the master timer reaches `total_duration` | nothing | logged, then the stock restart-town runs |

- They run synchronously on the core's main thread. Return at once. Do not yield: defer a delayed action with `forge.sys.game.event.create` and look the character up again by player id when it fires.
- The three revive callbacks and `on_dead` must return nothing. A returned value counts as an error. For a restart callback the stock callback then runs after yours; for `on_dead` it is logged only.
- `guard` must return a Lua boolean. Anything else, nothing, or a Lua error counts as `false`.

Failures go to syserr, the server error log, so a broken profile floods the log:

```text
Bridge::ValidateProcessorInvocation lua error: <Lua error message>
Bridge::ValidateProcessorInvocation wrong return: expected [boolean], got nothing
Bridge::ValidateProcessorInvocation wrong return: expected [<type>], got [<type>]
[death_manager <name> guard] lua callback error
[death_manager <profile.name> on_restart_here] lua callback error
```

Registration and removal are logged to syslog; an unknown handle goes to syserr:

```text
[OK] CDeathManager::Register : [<name>] handle=<n>
[OK] CDeathManager::Unregister : [<name>] handle=<n>
CDeathManager::Unregister : unknown handle=<n>
```

### Native registration

Engine code shares the registry with Lua. The native API exposes these calls:

| Call | Signature | Returns | Meaning |
| --- | --- | --- | --- |
| `Register` | `Register(std::string name, GuardFn guard, DeathProfile profile)` | `handle_t` (`uint64_t`) | Registers a fixed profile copied onto the player. |
| `Register` | `Register(std::string name, GuardFn guard, ProfileFn dynamic_profile)` | `handle_t` | Resolves a profile per death; Lua cannot call this overload. |
| `Unregister` | `Unregister(handle_t)` | `bool` | Removes the registration; false for an unknown handle. |

`GuardFn` is `std::function<bool(CHARACTER*)>` and `ProfileFn` is `std::function<DeathProfile(CHARACTER*)>`. `INVALID_HANDLE` is 0 for a null guard or profile function. `DeathProfile` fields are `name`, `totalDuration`, `restartHereAvailableAt`, `restartTownAvailableAt`, `restartWindow`, `onDead`, `onRestartHere`, `onRestartTown`, and `onAutoTown`. `restartWindow` defaults to `true`.

### The revive functions

Three functions outside the namespace belong to this system. None calls a profile callback.

| Name | Signature | What it does |
| --- | --- | --- |
| `pc.revive` | `pc.revive()` | Revives the current quest character in place. Shield is always 5 seconds. Requires a current character. |
| `LPCHARACTER:revive` | `ch:revive(shield_time?)` | The same for any character. `shield_time` defaults to 5 and `0` skips the shield and its countdown, while revive invisibility still lasts 5 seconds. |
| `pc.enable_revive_event` | `pc.enable_revive_event(enable)` | Switches the whole death sequence on or off for the current quest character. Default `true`. |

Both revive functions close the restart window, stand the character up, apply the optional shield, clear the attackers, count a dungeon revive, cancel the death timer and drop the profile snapshot. Then they set health to a quarter of the maximum and give 5 seconds of revive invisibility, whatever `shield_time` says. Content that wants more health sets it afterwards. Neither checks that the character is dead.

`pc.enable_revive_event(false)` makes the death skip the whole sequence: no profile is resolved, no timer starts, `on_dead` does not run, and `/restart_here` and `/restart_town` return without a message. A non-boolean argument logs `QUEST enable_revive_event call error : wrong argument: bool enable`. 

`LPCHARACTER:restart_at_same_pos()` is not a revive: it refreshes the view and does not move a dead character out of the dead state. Inside `on_restart_*` the character is already standing, which is why shipped callbacks use `restart_at_same_pos`, `revive_invisible` and `point_change` there.

Next: [Death manager behaviour](/docs/building-blocks/death-manager/behaviour).
