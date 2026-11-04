---
title: Quest-side events and coroutines
description: Use quest hooks and owned coroutines with Forge.
displayed_sidebar: mainSidebar
---

# Quest-side events and coroutines

QuestManager runs login and `when` blocks; Luna runs parallel to QuestManager. Use hooks to call Forge methods and bridge coroutines to wait for replies.

A hook can start a player-owned coroutine:

```forge
when login begin
    local pid = pc.get_player_id()
    bridge.coro.create_with_player_owner(
        function() forge.game.visit_counter:on_login(pid) end, pid)
end
```

## Quest events

A `state` block in a `.forge` file takes any event the quest system fires. The ones a forge uses most:

| Event | Fires | Notes |
| --- | --- | --- |
| `when login` | When the player is in the game phase on a core and the quest data is loaded. | Again on every core change. It must run to the end: a block that suspends (a dialog, a wait) is closed and logged as `QUEST NOT END RUNNING on Login/Logout`. |
| `when logout` | In the disconnect sequence, after the player is saved. | The character still exists. Fires when the player leaves a core as well as on a real disconnect. |
| `when boot_init` | When the db core announces boot, before the boot data is processed. | Runs before `when boot`. |
| `when boot` | After the db core has sent its boot data. | All forges and all quest states are loaded. |
| `when <target>.<event>` | For example `when roster.changed`. | The target is the part before the dot. |

There is no local login or logout event on the event bus. The hooks are the `when` blocks of the forge file.

## Quest-thread rules

- Keep state in the forge environment; a `when` thread is collected when the block returns.
- Wait only in a bridge coroutine. A quest thread and a processor on the main thread cannot wait.
- Send through a method defined in the forge environment; a hook has no forge environment.
- Capture `pc.*` values before yielding. The current player is not preserved after resume.
- Put conditioned blocks last: matching `with` blocks return before later blocks for the same event.

## Owned waits and collection

Require `forge_helper` inside the environment. This complete forge sends a request from a player-owned coroutine and collects replies for 1,000 ms:

```forge
forge headcount begin
    environment game begin
        local helper = require("forge_helper")
        local M = {}
        function M:collect()
            local replies, ok = helper.coro.collect(1000,
                helper.sys.game.yield_p2p, "headcount", "")
            if ok then
                sys_log(0, "answers: " .. #replies)
            end
        end
        return M
    end
    state start begin
        when login begin
            local pid = pc.get_player_id()
            bridge.coro.create_with_player_owner(
                function() forge.game.headcount:collect() end, pid)
        end
    end
end
```

`with_timeout` returns on the first answer or timeout; `collect` waits the full timeout. An owner close resumes a pending wait with `(nil, false)` and removes the coroutine. Set a timeout and tie player waits to that player.

`bridge.coro.adopt()` registers the running non-main thread as a bridge coroutine. Call it only inside a non-main coroutine; on the main thread it raises `trying to adopt main thread`.

On logout, `ON_PLAYER_SAVE` fires, then `when logout` runs while the character exists, then player-owned coroutines close. See the [API reference](./api.md) for ownership and return values.

Next: [Creating bindings](./bindings.md).
