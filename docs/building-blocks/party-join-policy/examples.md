---
title: "Party join policy: examples"
description: Small recipes for party admission and activity locks.
displayed_sidebar: mainSidebar
---

# Party join policy: examples

These recipes use the [party join policy API](/docs/building-blocks/party-join-policy). Register them from a game-core forge and restart the game cores after changes.

## Limit teams on a map

This guard selects admissions whose leader is on `MAP_A`. Remove the policy when the event ends.

```lua
local MAP_A = 1
local handle = forge.sys.game.party_join_policy.register(
    "event_teams",
    function(leader, guest)
        return leader:get_map_index() == MAP_A
    end,
    function(leader, guest)
        return { max_members = 3, same_empire = false, level_window = 0,
                 bind_to_map = true, guild_group = false }
    end)

-- At event teardown:
forge.sys.game.party_join_policy.unregister(handle)
```

## Refuse admission with a message

Add `TEAMS_LOCKED` to the client locale before registering this policy.

```lua
local MAP_A = 1
local handle = forge.sys.game.party_join_policy.register(
    "locked_teams",
    function(leader, guest)
        return leader:get_map_index() == MAP_A
    end,
    function(leader, guest)
        return { allowed = false, locale_key = "TEAMS_LOCKED" }
    end)
forge.sys.log(0, "registered, handle " .. handle)
```

## Lock a player during an activity

An activity lock prevents lobby creation and applications, but does not refuse party admission. Release the player's lock on every exit path.

```lua
local function admit(ch)
    local pid = ch:get_player_id()
    if ch:is_locked_in_activity() then
        return false
    end
    forge.sys.game.activity_lock.set(pid, true)
    return true
end

local function release(ch)
    forge.sys.game.activity_lock.set(ch:get_player_id(), false)
end
```

Next: [Party join policy reference](/docs/building-blocks/party-join-policy).
