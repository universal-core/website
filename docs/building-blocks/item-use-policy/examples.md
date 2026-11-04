---
title: "Item use policy: examples"
description: Item allowlist, potion restriction, and recovery budget examples.
displayed_sidebar: mainSidebar
---

# Item use policy: examples

These examples register policies in a forge, a `.forge` script loaded by Luna. Replace `MAP_A` and the example item vnums with values from your game. See the [API reference](/docs/building-blocks/item-use-policy) and [behaviour](/docs/building-blocks/item-use-policy/behaviour).

### An allowlist: everything else is refused

An allowlist must refuse its fallthrough explicitly: `{}` allows. Only the listed vnums are usable on the map, and gear cannot be put on or taken off there by using it: add the equipment you want to allow.

```forge
forge item_allowlist begin
    environment game begin
        local MAP_A = 1
        local ALLOWED = { [100008] = true, [100009] = true, [100010] = true }

        local handle = forge.sys.game.item_use_policy.register(
            "item_allowlist",
            function(ch)
                return ch:get_map_index() == MAP_A
            end,
            function(ch, item)
                if ALLOWED[item:get_vnum()] then
                    return { allowed = true }
                end
                return { allowed = false, reason = "You can't use that here." }
            end)

        return { handle = handle }
    end
end
```

### Only one potion heals

A potion policy that refuses every potion but one and gives the reason. The reason matters: without it an instant potion refusal is silent and still counts as a use (see the pitfalls).

```forge
forge one_potion begin
    environment game begin
        local ONLY_POTION = 100008
        local MAP_A = 1

        local handle = forge.sys.game.item_use_policy.register_potion(
            "one_potion",
            function(ch)
                return ch:get_map_index() == MAP_A
            end,
            function(ch, item, point_type, amount)
                if item ~= nil and item:get_vnum() == ONLY_POTION then
                    return { allowed = true, amount = amount }
                end
                return { allowed = false, reason = "Only the selected potion heals here." }
            end)

        return { handle = handle }
    end
end
```

### A recovery budget per player

A budget in total HP and SP recovered, shared by instant and over-time potions, with the last drink clamped so the total lands on the cap. The refusal sets `stop = false`, so an armed auto-potion survives and only skips ticks. The policy leaves non-positive amounts alone, because the tick asks with the gap to full and that gap can be 0 or negative.

```forge
forge potion_budget begin
    environment game begin
        local MAP_A = 1
        local CAP = 10000
        local spent = {}

        local handle = forge.sys.game.item_use_policy.register_potion(
            "potion_budget",
            function(ch)
                return ch:get_map_index() == MAP_A
            end,
            function(ch, item, point_type, amount)
                if amount <= 0 then
                    return { amount = amount }
                end

                local is_hp = (point_type == point.HP or point_type == point.HP_RECOVERY)
                local key = ch:get_player_id() .. (is_hp and ":hp" or ":sp")
                local used = spent[key] or 0
                local remaining = CAP - used

                if remaining <= 0 then
                    return { allowed = false, stop = false }
                end

                local granted = math.min(amount, remaining)
                spent[key] = used + granted
                return { allowed = true, amount = granted }
            end)

        return { handle = handle }
    end
end
```

Next: [Item use policy reference](/docs/building-blocks/item-use-policy).
