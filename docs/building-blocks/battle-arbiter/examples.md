---
title: "Battle arbiter: examples"
description: Small battle arbiter recipes for map rules and event lifetime.
displayed_sidebar: mainSidebar
---

# Battle arbiter: examples

These recipes use the [battle arbiter API](/docs/building-blocks/battle-arbiter). Read [behaviour](/docs/building-blocks/battle-arbiter/behaviour) for dispatch order and failure handling. A forge is a Lua module loaded by Forge; see the [policies glossary](/docs/building-blocks#policies-glossary).

## Deny combat between two empires

This forge denies player attacks between empires 1 and 2 on `MAP_A`. Other pairs pass to the remaining rules.

```forge
forge friendly_empires begin
    environment game begin
        local registry = forge.sys.game.battle_arbiter_registry
        local verdict = registry.BATTLE_VERDICT
        local MAP_A = 1
        local handle = registry.register("friendly_empires",
            function(att, vic)
                return att:get_map_index() == MAP_A and vic:get_map_index() == MAP_A
            end,
            function(att, vic)
                if not (att:is_pc() and vic:is_pc()) then return verdict.Pass end
                local a, b = att:get_empire(), vic:get_empire()
                if (a == 1 and b == 2) or (a == 2 and b == 1) then
                    return verdict.Deny
                end
                return verdict.Pass
            end)
        return { handle = handle }
    end
end
```

## Register and remove an event rule

This module exposes setup and teardown functions. Call them when your event starts and ends; the guard limits the rule to the supplied map.

```forge
forge event_rule begin
    environment game begin
        local registry = forge.sys.game.battle_arbiter_registry
        local verdict = registry.BATTLE_VERDICT
        local handle = nil
        local event = {}
        function event.start(map_index)
            if handle ~= nil then return false end
            handle = registry.register("event_rule",
                function(att, vic)
                    return att:get_map_index() == map_index and vic:get_map_index() == map_index
                end,
                function(att, vic)
                    if att:is_pc() and vic:is_pc() then return verdict.Deny end
                    return verdict.Pass
                end)
            return true
        end
        function event.stop()
            if handle == nil then return false end
            local removed = registry.unregister(handle)
            handle = nil
            return removed
        end
        return event
    end
end
```

Next: [Battle arbiter reference](/docs/building-blocks/battle-arbiter).
