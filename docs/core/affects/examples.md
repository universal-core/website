---
title: Affect examples
description: Register, apply, inspect, and remove affect types from Lua.
displayed_sidebar: mainSidebar
---

# Affect examples

Register names and behavior at the top level of a forge game environment or a module it loads. This example allocates a small block and assigns separate rules.

```lua
local AFFECTS = { MY_BUFF = 700, MY_MARK = 701, MY_GLOW = 702 }
for name, id in pairs(AFFECTS) do
    affect.add_name_definition(name, id)
    affect.add_no_save(id)
end
affect.add_no_clear_on_death(AFFECTS.MY_BUFF)
affect.add_broadcastable(AFFECTS.MY_MARK)
affect.add_broadcastable(AFFECTS.MY_GLOW)
```

Check your allocation first using [registration](/docs/core/affects/registration). Each following example is independent and registers its own type.

## Start, refresh, and stop

Default override refreshes the existing record. A nonpositive input removes it instead of adding a zero-duration affect.

```lua
local MY_STATE = 703
affect.add_name_definition("MY_STATE", MY_STATE)
affect.add_broadcastable(MY_STATE)
affect.add_no_save(MY_STATE)

local function start_state(ch, seconds)
    if seconds <= 0 then
        ch:remove_affect(MY_STATE)
        return
    end
    ch:add_affect(MY_STATE, point.NONE, 0, 0, seconds, 0, true)
end

local function stop_state(ch)
    ch:remove_affect(MY_STATE)
end
```

## Keep two points on one type

`match_exact` lets each point keep its own record. The guard avoids adding either record again while the type is present.

```lua
local MY_BONUS = 704
affect.add_name_definition("MY_BONUS", MY_BONUS)

local function grant_bonus(ch, move_bonus, attack_bonus)
    if ch:is_dead() or ch:has_affect(MY_BONUS) then
        return
    end
    ch:add_affect(MY_BONUS, point.MOV_SPEED, move_bonus, 0, affect.INFINITE_AFFECT_DURATION, 0, true, true)
    ch:add_affect(MY_BONUS, point.ATT_SPEED, attack_bonus, 0, affect.INFINITE_AFFECT_DURATION, 0, true, true)
end
```

## Give a visible timed buff

This saved type lasts 90 seconds and refreshes on another add. Flag 0 avoids a second particle through the AFF channel.

```lua
local MY_VISIBLE_BUFF = 705
affect.add_name_definition("MY_VISIBLE_BUFF", MY_VISIBLE_BUFF)
affect.add_broadcastable(MY_VISIBLE_BUFF)

local function give_buff(ch, attack_speed)
    ch:add_affect(MY_VISIBLE_BUFF, point.ATT_SPEED, attack_speed, 0, 90, 0, true)
end
```

Register type 705's effect and icon on the [client](/docs/core/affects/client) to show them.

## Keep a debuff until removed

This infinite debuff survives death and is saved. Removing it undoes the point change.

```lua
local MY_DEBUFF = 706
affect.add_name_definition("MY_DEBUFF", MY_DEBUFF)
affect.add_no_clear_on_death(MY_DEBUFF)

local function apply_debuff(ch)
    ch:add_affect(MY_DEBUFF, point.MOV_SPEED, -30)
end

local function lift_debuff(ch)
    if not ch:has_affect(MY_DEBUFF) then
        return false
    end
    ch:remove_affect(MY_DEBUFF)
    return true
end
```

For the current quest character, `affect.remove(affect.name_map.MY_DEBUFF)` also removes it. To make `remove_bad` remove it, register it in `IS_CLEANSABLE_AFFECT`.

## Inspect another character and a duration

The VID helper accepts players and monsters; `find` reads the current character.

```lua
local function slow_target(vid, seconds)
    if affect.has_specify_vid(vid, affect.name_map.SLOW) then
        return
    end
    affect.add_specify_vid(vid, affect.name_map.SLOW, point.MOV_SPEED, -30, 0, seconds)
end

local function seconds_left(affect_type)
    local data = affect.find(affect_type)
    if data == nil then
        return 0
    end
    return data.duration
end
```

See the [Lua API](/docs/core/affects/lua-api) for defaults and the [overview](/docs/core/affects/overview) for terminology.
