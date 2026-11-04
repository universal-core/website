---
title: Forge examples and pitfalls
description: Complete Forge patterns and common failures.
displayed_sidebar: mainSidebar
---

# Forge examples and pitfalls

These examples keep state in Forge modules and use quest hooks to enter them. Use the [API reference](./api.md) for signatures and the [Foundations page](/foundations/luna/forge/) for the model.

## Visit counter

This local counter records logins. The [quick start](./setup.md) also counts them across cores.

```forge
forge visit_counter begin
    environment game begin
        local M = { visits = 0 }
        function M:visit() self.visits = self.visits + 1 end
        return M
    end
    state start begin
        when login begin
            forge.game.visit_counter:visit()
        end
    end
end
```

## Roster

This forge stores player IDs and removes them on logout.

```forge
forge roster begin
    environment game begin
        local M = { players = {} }
        function M:enter(pid) self.players[pid] = true end
        function M:leave(pid) self.players[pid] = nil end
        return M
    end
    state start begin
        when login begin
            forge.game.roster:enter(pc.get_player_id())
        end
        when logout begin
            forge.game.roster:leave(pc.get_player_id())
        end
    end
end
```

## Cooldown store

This store asks db for a persisted flag in a player-owned coroutine.

```forge
forge cooldown_store begin
    environment game begin
        local helper = require("forge_helper")
        local M = {}
        function M:load(pid)
            local value, ok = helper.coro.with_timeout(2000,
                helper.sys.game.yield_db, "load", tostring(pid))
            if ok then sys_log(0, "cooldown: " .. value) end
        end
        return M
    end
    environment db begin
        local M = {}
        function M.load(peer, message, handler_id, receipt)
            local value = forge.sys.db.get_event_flag("cooldown_" .. message)
            forge.sys.db.answer_peer(peer, tostring(value), receipt)
        end
        forge.sys.set_peer_processor("load", M.load)
        return M
    end
    state start begin
        when login begin
            local pid = pc.get_player_id()
            bridge.coro.create_with_player_owner(
                function() forge.game.cooldown_store:load(pid) end, pid)
        end
    end
end
```

## Headcount

This boot hook initializes local state after the forges load. A login collects answers from other cores; each peer answers once with its local count.

```forge
forge headcount begin
    environment game begin
        local helper = require("forge_helper")
        local M = { count = 0 }
        function M:reset() self.count = 0 end
        function M:enter() self.count = self.count + 1 end
        function M:leave() self.count = self.count - 1 end
        function M:answer(desc, message, receipt)
            forge.sys.game.answer_p2p(desc, tostring(self.count), receipt)
        end
        function M:collect()
            local replies, ok = helper.coro.collect(1000,
                helper.sys.game.yield_p2p, "count", "")
            if ok then sys_log(0, "cores answered: " .. #replies) end
        end
        helper.sys.game.set_p2p_processor("count", M, M.answer)
        return M
    end
    state start begin
        when boot begin
            forge.game.headcount:reset()
        end
        when login begin
            local pid = pc.get_player_id()
            forge.game.headcount:enter()
            bridge.coro.create_with_player_owner(
                function() forge.game.headcount:collect() end, pid)
        end
        when logout begin
            forge.game.headcount:leave()
        end
    end
end
```

## Pitfalls

**A `when` block raises `with_timout outside a coroutine` or `Invalid coroutine_id: cannot be 0`.** The hook runs on a quest thread, not a bridge coroutine. Wrap the waiting call in `bridge.coro.create_with_player_owner(function() ... end, pid)` and do it there.

**`called from a non-forge script` when sending from a hook.** The send functions look at the environment of the calling function, and a `when` block has none. Call a forge method that does the send.

**A table you built in a `when` block is gone or invisible.** The quest thread is collected when the block returns. Declare the state in the forge environment and let the hook call into it.

**Every send fails after you required `forge_helper` in a quest or in the init script.** The main state cached the helper without a forge environment. Require it only inside `environment` blocks.

**Two forges that require the same module see different tables.** Each forge has its own module cache. Anchor shared state on `_G`, using a shared registry.

**The core does not start after you changed a forge.** An environment body returned nothing, or a body has a syntax error. A load error stops the service. Return a table from every environment, db half included.

**A forge reads `forge.game.<other>` at top level and it is nil, sometimes.** Load order is the file listing order. Do cross-forge access in methods and in `when boot`.

**A stored character pointer crashes the core or reads stale data.** Characters are raw engine objects and a forge does not check their validity. Drop them in `when logout`, check for `nil` after `find_by_pid`, and prefer storing the player id.

**A db answer is lost, or the waiting code never resumes.** A late answer after the timeout is dropped (`token invalid/expired`), a second `answer_peer` for the same receipt is dropped, and the coroutine is removed after a failed wait. Answer once, and do not wait again in the same coroutine after `ok == false`.

**A coroutine that waits on a player outlives the player.** `bridge.coro.create` has no owner. Use `create_with_player_owner`, or `add_owner`, so the disconnect closes it. Always set a timeout.

**The first `when login` block has a `with` condition and later blocks stop running.** Blocks of the same event are appended into one script, and a conditioned block ends in `return`. Put conditioned blocks last.

**Registering the same header twice does nothing and nothing says so.** The second `set_*_processor` returns `false` and logs once, and `forge_helper` throws the result away. One header, one registration.

**A compile error points at the wrong line.** For a reserved word used inside an environment body, the line is the end of the environment scan. Search the body for `quest`, `state`, `with`, `when`, `define`, `begin` used as names.

**A method named `set_state` gets its argument quoted.** The preprocessor rewrites `set_state`, `setstate` and `newstate` in the whole file, environment code included. Pick another name.

**The wrong table.** `visit_counter.fn(...)` calls a quest function from the quest table; `forge.game.visit_counter:method()` calls your module. They share a name and nothing else.

Next: [How Forge works](/foundations/luna/forge/).
