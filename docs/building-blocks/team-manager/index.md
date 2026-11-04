---
title: Team manager reference
description: API reference for PvP sessions, teams, alliances, and the attack switch.
displayed_sidebar: mainSidebar
---

# Team manager reference

The team manager keeps player teams and alliances for a PvP session, a core-local group bound to a map. It controls the client team picture and contributes to attack, buff, party, and team chat decisions. See [Policies](/foundations/policies) for the shared model and the [Policies glossary](/docs/building-blocks#policies-glossary) for terms.

## Quick start

This Lua code opens a session for two player IDs and enables attacks. Close it when the match ends.

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
    PVP.set_attacks_enabled(session, true)
    return session
end
```

The two members see each other as enemies on the bound map. Keep the returned ID and call `PVP.close_session(session)` at teardown.

## Files and setup

A [forge](/docs/core/luna-forge/setup) is a compiled script package; Luna is the scripting runtime alongside QuestManager. Register and compile your forge using your host's setup, then restart the game cores after changes. The manager is available on game cores through `forge.sys.game.pvp_team_manager` and has no config key.

Sessions live in the creating core's memory. `map_index` binds broadcasts and alliance checks to a map; `kind` labels team chat through `TEAM_CATEGORY_<KIND>` in client locale data, or displays the raw kind when the key is absent. Kinds are truncated to 31 characters. Session IDs are `uint32` starting at 1 per core, team IDs are `uint16`, and player IDs are `uint32`. Failures return `false` where specified and some write to syserr, the server error log.

## API

### `forge.sys.game.pvp_team_manager`

Every function runs synchronously on the core's main thread and returns at once. None yields, and there are no callbacks.

| Name | Signature | Returns | What it does |
| --- | --- | --- | --- |
| `create_session` | `create_session(map_index, kind)` | `number` session id, greater than 0 | Opens a session with no teams and attacks disabled. |
| `close_session` | `close_session(session_id)` | `boolean` | Clears the client picture of every member on the bound map and erases the session. `false` for an unknown id. |
| `add_team` | `add_team(session_id, team_id, initial_allies)` | `boolean` | Adds a team. `initial_allies` is an optional array of team ids. `false` for an unknown session or a team id already in use. |
| `remove_team` | `remove_team(session_id, team_id)` | `boolean` | Clears the picture of the team's members on the bound map, drops the team and every ally link to it. See the trap on members left behind. |
| `add_ally` | `add_ally(session_id, team_a, team_b)` | `boolean` | Makes two teams allies, both ways, and sends the affected pairs the "cannot attack" key. `true` and nothing done when `a == b` or already allied. `false` for an unknown session or team. |
| `remove_ally` | `remove_ally(session_id, team_a, team_b)` | `boolean` | Mirror of `add_ally`. Affected pairs get the "enemy" key. |
| `set_allies` | `set_allies(session_id, team_id, allies)` | `boolean` | Replaces a team's ally set. Compares with the previous set and updates only the pairs that changed. `allies` is required. |
| `are_allied` | `are_allied(session_id, team_a, team_b)` | `boolean` | `false` for an unknown session. In a known session, `true` when `a == b`, even for a team that does not exist; otherwise "is `b` in the ally set of `a`", which is `false` for an unknown team `a`. |
| `add_member` | `add_member(session_id, team_id, pid)` | `boolean` | Puts a player id on a team. Works for offline players. `true` and nothing done if the player is already in this session. `false` for an unknown session or team, or if the player is in another session on this core. |
| `remove_member` | `remove_member(session_id, pid)` | `boolean` | Takes the player out. When the player is on the bound map, clears the picture of that player against every other member on that map first. `false` if the session is unknown or the player is not in it. |
| `is_member` | `is_member(pid)` | `boolean` | Is the player id in any session on this core. |
| `set_attacks_enabled` | `set_attacks_enabled(session_id, enabled)` | nothing | The attack switch. A changed value is stored and the whole session is re-sent. The same value or an unknown session does nothing. |
| `broadcast_session` | `broadcast_session(session_id)` | nothing | Re-sends the full picture to every member on the bound map, as if each had just connected. |

Parameters: `session_id` is the number from `create_session`. `team_id` is a number of your choice. `pid` is a player id, `ch:get_player_id()` for a character. `enabled` is a boolean.

A team is always allied with itself, and a team id is never listed in its own ally set. Alliances are symmetric: the calls that change them change both teams.

What Lua cannot do: ask a session's verdict, ask which session or team a player id is in, and list a team's allies. `is_member` and `are_allied` are the only reads, so a script that needs "which team is this player on" keeps its own table from player id to team.

### Sessions opened in C++

Engine code uses the same manager through its singleton. A session opened in C++ has no Lua getter for its id, so a script cannot reach it by `session_id`. The owners expose these switches:

| Method | Effect |
| --- | --- |
| `LPARENA:set_attacks_enabled(enabled)` | Flips the arena's session switch, if the arena has a session. |
| `LPGWARMAP:set_attacks_enabled(enabled)` | Flips the session switch and sets the pre-engage state to the opposite. |

## The C++ registration

C++ owners drive a session with the same calls as Lua, on `CPvPTeamManager::instance()`. They keep the session id in a member and close it in their teardown. The manager has no registration list of its own: unlike the arbiter, it is asked directly.

| Call | Signature | Returns |
| --- | --- | --- |
| `CreateSession` | `CreateSession(int32_t map_index, std::string kind)` | `session_id_t` (`uint32_t`) |
| `CloseSession` | `CloseSession(session_id_t)` | `bool` |
| `AddTeam` | `AddTeam(session_id_t, team_id_t, std::set<team_id_t> initial_allies = {})` | `bool` |
| `RemoveTeam` | `RemoveTeam(session_id_t, team_id_t)` | `bool` |
| `AddAlly`, `RemoveAlly` | `(session_id_t, team_id_t a, team_id_t b)` | `bool` |
| `SetAllies` | `SetAllies(session_id_t, team_id_t, std::set<team_id_t>)` | `bool` |
| `AddMember` | `AddMember(session_id_t, team_id_t, uint32_t pid)` | `bool` |
| `RemoveMember` | `RemoveMember(session_id_t, uint32_t pid)` | `bool` |
| `SetAttacksEnabled` | `SetAttacksEnabled(session_id_t, bool)` | `void` |
| `BroadcastSession` | `BroadcastSession(session_id_t)` | `void` |
| `IsMember` | `IsMember(uint32_t pid)` | `bool` |
| `GetSession`, `GetTeam` | `GetSession(uint32_t pid)`, `GetTeam(session_id_t, uint32_t pid)` | `std::optional` |
| `AreAllied` | `(session_id_t, team_id_t, team_id_t)` or `(LPCHARACTER, LPCHARACTER)` | `bool` |
| `GetAllies` | `GetAllies(session_id_t, team_id_t)` | `std::set<team_id_t>` |
| `ResolveTeamChatTarget` | `ResolveTeamChatTarget(uint32_t pid)` | `std::optional<TeamChatTarget>` |
| `CanAttack` | `CanAttack(LPCHARACTER att, LPCHARACTER vic)` | `BattleVerdict` |
| `OnPlayerConnect`, `OnPlayerDisconnect` | `(LPCHARACTER)` | `void` |

`team_id_t` is `uint16_t` and `INVALID_SESSION` is 0. The query half (`GetSession`, `GetTeam`, `GetAllies`, `CanAttack`, the character form of `AreAllied`, `ResolveTeamChatTarget`) is C++ only. `team_id_t` is `uint16_t` and `INVALID_SESSION` is 0. The query half (`GetSession`, `GetTeam`, `GetAllies`, `CanAttack`, the character form of `AreAllied`, `ResolveTeamChatTarget`) is C++ only. The PvP arena (the native arena object, rebuilt from the mainline arena manager) opens a session with kind `ARENA` and exposes `LPARENA:set_attacks_enabled(enabled)`.

Next: [Team manager behaviour](/docs/building-blocks/team-manager/behaviour).
