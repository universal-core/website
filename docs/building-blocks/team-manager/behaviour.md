---
title: "Team manager: behaviour"
description: Attack decisions, client synchronization, and lifetime of PvP team sessions.
displayed_sidebar: mainSidebar
---

# Team manager: behaviour

A session binds teams to a map on one game core. The [team manager API](/docs/building-blocks/team-manager) changes its state; the [Policies glossary](/docs/building-blocks#policies-glossary) defines shared terms including PK mode, duel, and killer.

## Attack decisions

After [battle arbiters](/docs/building-blocks/battle-arbiter) all pass, the session manager checks player pairs in this order:

| Pair | Verdict |
| --- | --- |
| Either side is not a player, or neither belongs to a session | `Pass` |
| Exactly one belongs to a session, or they belong to different sessions | `Deny` on any map |
| Same session, either player off its bound map | `Pass` |
| Same session, same team or allied teams | `Deny` |
| Same session, enemy teams, attacks disabled | `Deny` |
| Same session, enemy teams, attacks enabled | `Allow` |

An arbiter's `Allow` or `Deny` comes first. Absolute refusals such as a safe zone or dead target still apply. Session `Allow` beats later party, empire, and PK mode checks; `Deny` beats a duel. For same-empire players, session `Allow` does not flag the attacker as a killer.

## Client synchronization

The server sends pair keys, not verdicts. `DUEL_START` is the enemy key used by the client for targeting and the attack cursor.

| Key | Value | Client picture |
| --- | --- | --- |
| `DUEL_NONE` | 0 | Remove the pair key |
| `DUEL_CANNOTATTACK` | 1 | Visually allied, no attack cursor; ally buffs targetable |
| `DUEL_START` | 2 | Enemy, attack cursor and PvP name color |

A session member's client treats players without a key as non-attackable while it holds keys. An outsider's client applies ordinary rules, although the server refuses the pair. Every duel packet drops the receiver's target, closes the target board, and refreshes name colors. Keys clear when the client leaves the game phase.

| Moment | Synchronization |
| --- | --- |
| Login, warp onto the map, or `add_member` on the map | Team list and pair keys in both directions |
| Changed `set_attacks_enabled`, or `broadcast_session` | Full sync for every member on the map |
| Disconnect or warp away | `DUEL_NONE` for that player to other members; membership remains |
| Alliance change | Changed pairs only |
| `remove_member`, `remove_team`, or `close_session` | `DUEL_NONE` and empty team list for affected members on the map |

A character still loading is skipped; a two-way send starting there also skips the other character. Its connect sync supplies the picture. A changed attack switch updates both the server flag and client keys; an arbiter change does not synchronize keys.

## Buffs, parties, and chat

| Operation | Rule |
| --- | --- |
| Player buffs | Same-team or allied players in the same session on its map can buff across empires. Otherwise, if either is a session member, player buffs are refused on any map. Without membership, an attackable pair cannot buff and other pairs must share an empire. |
| Non-player buffs | A non-player buffs only non-players; players and non-players cannot buff each other. |
| Party invitation | After the party join policy, `PERR_ENEMY` refuses a pair if either is a member and they are not in the same session, or are not allied. Allied members must be on the bound map. |
| Adding a member | A joiner already in a party with a non-allied member of this session is removed from that party. |
| Team chat | A non-member's message is dropped. Members on the sender's own team and bound map receive it, labeled by kind; allied teams do not. |

## Lifetime and limits

Membership survives logout and leaving the bound map. The one-member rule continues to deny attacks against outsiders on every map of that core. Remove a departing player with `remove_member`, and close the session at teardown. Restarting the core clears all sessions; another core cannot see them.

Teams are allied with themselves. Alliance changes normally update both directions, but an ally ID supplied before its team exists can leave a one-sided link. Add teams first. Lua can test membership and alliances but cannot retrieve a player's team or session; keep your own mapping.

## Pitfalls

**Nobody can attack.** Sessions start with attacks disabled. Call `set_attacks_enabled(session, true)` at the start of play.

**A former participant cannot fight outsiders.** Leaving the map or disconnecting does not remove membership. Call `remove_member` when the player leaves for good.

**An alliance works in only one direction.** `initial_allies` and `set_allies` can name a team that does not exist yet. Add all teams first and use existing IDs for alliances.

**Removing a team leaves stale members.** `remove_team` clears their session index but leaves entries in the session's player-to-team table, and can send `DUEL_START` before `DUEL_NONE`. Remove every member first.

**An enemy cursor appears during warm-up.** `remove_ally` and the removed portion of `set_allies` send `DUEL_START` even with attacks disabled. Call `broadcast_session` after those changes while the switch is off.

**Targets vanish during a fight.** A full broadcast or switch change de-targets every member on the map. Use phase changes for the switch and pair updates for small changes.

**The cursor disagrees with the server.** Arbiter, PK mode, and duel changes do not resend session keys; an arbiter `Allow` can also override a closed switch. Make the arbiter pass session pairs or check the same phase.

**A player cannot be added.** A player can belong to only one session per core. Remove the player from the old session first; syserr, the server error log, can report `CPvPTeamManager::AddMember : pid=<p> already in session=<a>, refusing add to session=<b>`.

**No team picture or allied buffs appear.** Check that the session belongs to the map's core and its `map_index` matches. Broadcasts and alliance checks skip members off the bound map.

**Team chat shows the raw kind.** Add `TEAM_CATEGORY_<KIND>` to the client locale data. The label does not make chat visible to allied teams.

Next: [Team manager examples](/docs/building-blocks/team-manager/examples).
