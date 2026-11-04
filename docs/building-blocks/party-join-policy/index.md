---
title: Party join policy reference
description: API reference for party admission policies and the activity lock.
displayed_sidebar: mainSidebar
---

# Party join policy reference

A party join policy decides the admission rules for a leader and guest. Register one from a forge, a compiled Lua unit, when a map or event needs different party limits. See [Policies](/foundations/policies) for the shared model and the [Policies glossary](/docs/building-blocks#policies-glossary) for terminology.

## Quick start

This forge allows parties of three on a map, regardless of empire or level difference.

```forge
forge event_teams begin
    environment game begin
        local MAP_A = 1
        local handle = forge.sys.game.party_join_policy.register(
            "event_teams",
            function(leader, guest)
                return leader:get_map_index() == MAP_A
                    and guest:get_map_index() == MAP_A
            end,
            function(leader, guest)
                return { max_members = 3, same_empire = false, level_window = 0 }
            end)
        return { handle = handle }
    end
end
```

The registration log includes `[OK] party_join_policy [event_teams]: handle=<n>`.

## Files and setup

Register the policy in a forge on each game core that needs it. Follow [Forge setup](/docs/core/luna-forge/setup) for the host's compile and registration steps; restart the game cores after changes. For a refusal message, add its `locale_key` to the client locale.

## API

### `forge.sys.game.party_join_policy`

| Name | Signature | Returns | Context | Effect |
| --- | --- | --- | --- | --- |
| `register` | `register(name, guard, policy)` | positive `number` handle | game core | Appends a policy. |
| `unregister` | `unregister(handle)` | `boolean` | game core | Removes it; returns `false` for an unknown handle. |
| `ERROR` | table | admission codes | any | Constants for simulator assertions; no live Lua function returns them. |

| Parameter | Type | Meaning |
| --- | --- | --- |
| `name` | `string` | Log name; duplicates are allowed and do not replace a policy. |
| `guard` | `fun(leader, guest): boolean` | Selects the pair. |
| `policy` | `fun(leader, guest): table` | Returns a verdict when the guard matches. |

Both callbacks receive characters and run synchronously on the game thread. Both must be functions; otherwise registration raises `party_join_policy.register: guard is not callable` or `party_join_policy.register: policy is not callable`. Handles start at 1, increase per registration, and are not reused.

### Verdict fields

Each field is optional; missing or wrong-typed fields use the default. The generated Lua stub offers only `max_members`, `same_empire`, and `level_window`.

| Field | Type | Default | Effect |
| --- | --- | --- | --- |
| `allowed` | `boolean` | `true` | `false` refuses admission before stock checks. |
| `locale_key` | `string` | empty | Client locale key shown over the character on policy refusal. |
| `max_members` | `number` | `8` | Cap including the leader; `0` or a value above 8 becomes 8. |
| `same_empire` | `boolean` | `true` | `false` skips the empire check. |
| `level_window` | `number` | `30` | Maximum level difference; `0` disables the limit. |
| `bind_to_map` | `boolean` | `false` | A newly created party lives on the leader's map and core. |
| `guild_group` | `boolean` | `true` | `false` prevents a newly created party from becoming a guild group. |

`bind_to_map` and `guild_group` are stored when a party is created; the other fields are resolved for each admission.

### Admission codes

`forge.sys.game.party_join_policy.ERROR` contains `PERR_NONE`, `PERR_SERVER`, `PERR_DUNGEON`, `PERR_OBSERVER`, `PERR_LVBOUNDARY`, `PERR_LOWLEVEL`, `PERR_HILEVEL`, `PERR_ALREADYJOIN`, `PERR_PARTYISFULL`, `PERR_POLICY`, `PERR_DIFFEMPIRE`, `PERR_PVP_ARENA`, and `PERR_ENEMY`. The admission check does not produce `PERR_LOWLEVEL`, `PERR_HILEVEL`, or `PERR_PVP_ARENA`; a level refusal produces `PERR_LVBOUNDARY`.

### C++ registration

The native singleton `CPartyJoinPolicy` uses the same list. Keep the handle for teardown.

| Call | Signature | Returns |
| --- | --- | --- |
| `Register` | `Register(std::string name, GuardFn guard, PolicyFn policy)` | `handle_t` (`uint64_t`); `INVALID_HANDLE` (`0`) if `policy` is empty |
| `Unregister` | `Unregister(handle_t)` | `bool`; `false` for an unknown handle |
| `Resolve` | `Resolve(CHARACTER* leader, CHARACTER* guest) const` | `PartyJoinVerdict` |

`GuardFn` is `std::function<bool(CHARACTER*, CHARACTER*)>` and `PolicyFn` is `std::function<PartyJoinVerdict(CHARACTER*, CHARACTER*)>`. An empty C++ guard matches every pair; Lua requires a guard. `PartyJoinVerdict` contains `allowed`, `strLocaleKey`, `max_members`, `same_empire`, `level_window`, `bind_to_map`, and `guild_group`, with the defaults above. Its `kStockMaxMembers` is 8; `strLocaleKey` corresponds to Lua's `locale_key`.

### `forge.sys.game.activity_lock`

An activity lock marks a player as committed to an activity; see the [Policies glossary](/docs/building-blocks#policies-glossary). It is scoped to a core and does not itself refuse party admission.

| Name | Signature | Returns | Context | Effect |
| --- | --- | --- | --- | --- |
| `set` | `set(pid, locked)` | nothing | game core | Adds or removes the player ID. |
| `is_set` | `is_set(pid)` | `boolean` | game core | Tests only the explicit lock set. |
| `clear` | `clear()` | nothing | game core | Removes all explicit locks on the core. |
| `is_locked_in_activity` | `character:is_locked_in_activity()` | `boolean` | character | Tests the explicit lock and engine activity participation. |

Next: [Party join policy behaviour](/docs/building-blocks/party-join-policy/behaviour).
