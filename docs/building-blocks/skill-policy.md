---
title: Skill policy reference
description: Register and refresh named skill variants for characters on a game core.
displayed_sidebar: mainSidebar
---

# Skill policy reference

A skill policy puts a named skill variant in force on characters accepted by a guard. Declare the variant in the skill configuration, then register a rule that selects its policy ID. For the shared model, see [Policies](/foundations/policies); for terms such as forge, Luna, the bridge, and syserr, see the [Policies glossary](/docs/building-blocks#policies-glossary).

## Quick start

Declare `ward` in `policies.yaml` and add a `ward` override under `policies:` in the relevant skill file. This forge selects it for characters on a map:

```forge
forge map_variant begin
    environment game begin
        local MAP_A = 1
        local handle = forge.sys.game.skill_policy.register(
            "map_variant",
            function(ch) return ch:get_map_index() == MAP_A end,
            "ward")
        return { handle = handle }
    end
end
```

Register the forge using your host's setup and restart the game cores. Characters on `MAP_A` receive the variant for skills that declare `ward`; characters leaving the map receive the applicable remaining variant or the base skill.

## Files and setup

| Part | Configuration | Purpose |
| --- | --- | --- |
| Policy IDs | `Locale/conf/skill/policies.yaml` | Declare each ID with a `name` and `desc`. |
| Skill variants | `policies:` in `Locale/conf/skill/<vnum>.ucskill.yaml` | Map each declared ID to overrides for that skill. |
| Rule | A forge, quest, or referee on a game core | Register the guard and policy ID. |
| Client text | `skill_desc/policies.ucskilldesc.yaml` | Translate the policy name shown in the tooltip configuration switcher. |

For example, declare an ID before referencing it in a skill or rule:

```yaml
ward:
  name: Ward
  desc: Values used on the trial map.
```

Follow your host's forge compilation and registration setup, then restart the game cores after changes. Registrations are per core and are not saved across restarts; register them again on every core that needs them. See [Forge setup](/docs/core/luna-forge/setup).

The server and client read the overrides from the skill file. The server sends active IDs to the client, not the overrides. An undeclared ID in a skill's `policies:` block fails skill loading; registration of an undeclared ID is refused. For path syntax, deletion with `~`, added nodes, and `affectVnum` requirements, see the [Skill file reference](/docs/core/skill-file).

## Lua API

`forge.sys.game.skill_policy` is available on game cores. Call registration and unregistration outside guards.

| Call | Returns | Effect |
| --- | --- | --- |
| `register(name, guard, policy_id)` | Number handle, or `0` on failure | Append a rule and sample every character on the core. |
| `unregister(handle)` | Boolean | Remove the rule and sample every character; `false` means the handle is unknown. |
| `refresh(ch)` | Nothing | Sample one character; a nil character is ignored. |

| `register` parameter | Type | Meaning |
| --- | --- | --- |
| `name` | `string` | Label used in errors. Duplicate names create separate rules. |
| `guard` | `fun(ch): boolean` | Return `true` to apply the policy to this character. |
| `policy_id` | `string` | ID declared in `policies.yaml`, such as `"ward"`. |

The guard receives one character, player or mob. Read any further state from `ch`, for example `ch:get_map_index()`, `ch:get_player_id()`, or a quest flag. A non-boolean return or an error counts as `false`. There is no priority parameter or replacement by name. Handles start at 1, increase for successful registrations, and are not reused; the guard and its captured values remain alive until unregistration.

A non-callable Lua guard raises `skill_policy.register: guard is not callable` before registration. In a forge environment body, that error fails the forge load and the core does not start. An undeclared ID instead returns `0` and logs the refusal.

## Native API

Native code uses `CSkillPolicyRegistry` and shares the registration list with Lua.

| Call | Returns | Effect |
| --- | --- | --- |
| `Register(std::string name, GuardFn guard, const std::string& policyId)` | `handle_t` (`uint64_t`), or `INVALID_HANDLE` (`0`) | Register a rule and sample every character. An empty guard or undeclared ID is refused. |
| `Unregister(handle_t)` | `bool` | Remove a rule and sample every character; `false` means the handle is unknown. |
| `Sample(LPCHARACTER ch) const` | `bool` | Sample one character; `true` means its active policy list changed. |
| `CHARACTER::RefreshSkillPolicies()` | Nothing | Refresh one character, as the Lua `refresh` call does. |

`GuardFn` is `std::function<bool(CHARACTER*)>`. Refused native registrations report either `skill_policy [<name>]: no guard, so nothing would ever decide it applies` or `skill_policy [<name>]: policy [<id>] is not declared by policies.yaml` to syserr. No native registration ships in the game core.

## Sampling and resolution

Guards are sampled at these edges, rather than on each cast:

| Edge | Scope |
| --- | --- |
| Character placed on a map (`Show`) | That character, including mobs. |
| `register` or `unregister` | Every character on the core. |
| `refresh(ch)` | The supplied character. |
| Entering the game phase | Send the character's policy packet, even if the list is empty. |

Change a condition that has no automatic sampling edge, such as a quest flag, then call `refresh(ch)`. Guards run synchronously on the core's main thread, so keep them inexpensive and register at event or match boundaries, not per player or tick.

A sample collects IDs from guards returning `true`, in registration order, with duplicate IDs listed once. If the list changes, held skills are redirected to their variants and the client receives the IDs. A running skill instance caches its proto; the skill vnum stays the same. The client reads its copies of variants from the skill file, so the displayed icon, cooldown, range, and description follow the selected variant.

For each skill, the first active ID with an override in that skill's `policies:` block wins. If none has an override, the base skill is used. Variants do not merge: declare a separate ID containing the combined overrides when needed. Registration order is the order within one core; across forges it follows forge load order, which is not guaranteed. Do not rely on the order of entries in `policies.yaml`.

## Failures and lifetime

| Condition | Result |
| --- | --- |
| Guard raises or returns a non-boolean | The rule does not apply to that character; the failure is logged to syserr. |
| `register` receives an undeclared ID | Returns `0` and logs `skill_policy [<name>]: policy [<id>] is not declared by policies.yaml`. |
| Lua `register` receives a non-function guard | Raises `skill_policy.register: guard is not callable`. |
| Native `Register` receives an empty guard | Returns `INVALID_HANDLE` and logs the refusal. |
| `unregister` receives an unknown handle | Returns `false`. |

Guard failures can include `Bridge::ValidateProcessorInvocation lua error: <Lua error message>`, `Bridge::ValidateProcessorInvocation wrong return: expected [boolean], got [nil]`, and `[skill_policy <name> guard] lua callback error`. A rule remains registered, including its closure, until it is unregistered or the core stops. Keep its handle with the object that owns the rule and unregister it when that object ends.

## Refresh after a state change

This rule selects `rage` using a quest flag and refreshes the character after changing it. Declare `rage` and its skill overrides first.

```forge
forge state_variant begin
    environment game begin
        local handle = forge.sys.game.skill_policy.register(
            "state_variant",
            function(ch) return ch:get_quest_flag("trial.awake") == 1 end,
            "rage")

        local function awaken(ch)
            ch:set_quest_flag("trial.awake", 1)
            forge.sys.game.skill_policy.refresh(ch)
        end

        return { handle = handle, awaken = awaken }
    end
end
```

## Register for a match

Keep the successful handle for the match lifetime. This example returns functions that start and finish a map-scoped rule; declare `ward` and its overrides first.

```forge
forge match_variant begin
    environment game begin
        local handle = nil
        local function start(map_index)
            if handle then return false end
            local registered = forge.sys.game.skill_policy.register(
                "match_variant",
                function(ch) return ch:get_map_index() == map_index end,
                "ward")
            if registered == 0 then return false end
            handle = registered
            return true
        end
        local function finish()
            if not handle then return false end
            local removed = forge.sys.game.skill_policy.unregister(handle)
            handle = nil
            return removed
        end
        return { start = start, finish = finish }
    end
end
```

Unregistration samples every character on that core. Each affected character receives its remaining applicable variant or the base skill, and the client receives the changed list of IDs.

## Pitfalls

**The skill does not change.** An active ID only affects skills that declare an override for it. Add the ID under the skill's `policies:` block and restart the cores.

**A changed flag has no effect.** A flag change does not sample guards by itself. Call `refresh(ch)` after changing it.

**A map rule affects mobs.** Guards receive all characters, including mobs. Add `ch:is_pc()` to the guard if only players should match.

**Two variants do not combine.** The first active ID with an override for the skill wins. Declare a separate combined variant and select that ID.

**A rule continues after a match ends.** The closure stays registered until removed. Store a successful handle and call `unregister(handle)` at teardown; do not retain `0` as a successful handle.

**A guard causes repeated sampling.** Calling `register` or `unregister` from a guard samples all characters and invokes guards again. Make those calls from setup, an event, or a command instead.

**A cast must be refused.** A skill policy selects a variant; use the [skill use policy](/docs/building-blocks/skill-use-policy) to deny a cast.

## See also

- [Skill policy](/docs/building-blocks/skill-policy) and [skill use policy](/docs/building-blocks/skill-use-policy).
- [Loadout policy](/docs/building-blocks/loadout-policy) and [loadout policy examples](/docs/building-blocks/loadout-policy-examples).
- [Loadout, use and skill policies](/foundations/skills/policies).
