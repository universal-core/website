---
title: "Team manager: examples"
description: Recipes for PvP sessions, alliances, and an arena intermission.
displayed_sidebar: mainSidebar
---

# Team manager: examples

These recipes use the [team manager API](/docs/building-blocks/team-manager). A session is a core-local group of teams bound to one map; see [behaviour](/docs/building-blocks/team-manager/behaviour) for its attack and client rules.

## Open and close a match

Create the teams before adding players, and close the session if any step fails. Keep your own player-to-team mapping if you need to query it later.

```lua
local PVP = forge.sys.game.pvp_team_manager
local function open_match(map_index, pid_a, pid_b)
    local session = PVP.create_session(map_index, "MATCH")
    if session == 0 then return nil end
    if not PVP.add_team(session, 1) or not PVP.add_team(session, 2)
        or not PVP.add_member(session, 1, pid_a)
        or not PVP.add_member(session, 2, pid_b) then
        PVP.close_session(session)
        return nil
    end
    return session
end
local function start_match(session)
    PVP.set_attacks_enabled(session, true)
end
local function close_match(session)
    PVP.close_session(session)
end
```

Attacks stay disabled until `start_match`. Call `close_match` at teardown.

## Change an alliance during warm-up

Add all teams before linking them. After removing an alliance with attacks disabled, synchronize the session so the newly opposing teams do not retain an attack cursor.

```lua
local PVP = forge.sys.game.pvp_team_manager
local function open_alliance(map_index)
    local session = PVP.create_session(map_index, "MATCH")
    if session == 0 then return nil end
    if not PVP.add_team(session, 1) or not PVP.add_team(session, 2)
        or not PVP.add_team(session, 3)
        or not PVP.add_ally(session, 1, 2) then
        PVP.close_session(session)
        return nil
    end
    return session
end
local function end_alliance(session)
    if not PVP.remove_ally(session, 1, 2) then return false end
    PVP.broadcast_session(session)
    return true
end
```

The broadcast drops every member's target. Close the session when the match ends.

## Pause a PvP arena

The PvP arena (the native arena object, rebuilt from the mainline arena manager) owns its session ID. Use its switch for an intermission and again when the next round begins.

Call `arena:set_attacks_enabled(false)` to pause, then `arena:set_attacks_enabled(true)` to start the next round.

Next: [Team manager reference](/docs/building-blocks/team-manager).
