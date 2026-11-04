---
title: Skill use policy reference
description: Register deny-only rules for player skill casts and mob skill decisions.
displayed_sidebar: mainSidebar
---

# Skill use policy reference

A skill use policy adds refusals to player skill casts and mob skill decisions. Register a guard, a verdict callback, and an optional skill vnum filter to restrict skills for a map, character, or event. Native checks still apply; see [Policies](/foundations/policies) for the shared model and [skill policies](/foundations/skills/policies) for the three skill registries. The [Policies glossary](/docs/building-blocks#policies-glossary) defines terms used here.

## Quick start

This forge registers a rule that refuses skills 1, 2, and 3 on `MAP_A`:

```forge
forge trial_map_skills begin
    environment game begin
        local MAP_A = 1
        local handle = forge.sys.game.skill_use_policy.register(
            "trial_map_skills",
            function(ch) return ch:get_map_index() == MAP_A end,
            function(ch, vnum)
                return { allowed = false, locale_key = "CANNOT_SKILL_NOT_ALLOWED" }
            end,
            { 1, 2, 3 })
        return { handle = handle }
    end
end
```

Compile and register the forge using your host's setup, then restart the game cores. A matching player cast is refused with the localized message; other maps and skills are unaffected. The log reports `[OK] skill_use_policy [trial_map_skills]: handle=<n>`.

## Files and setup

A forge is a compiled script unit running in Luna, the Lua runtime alongside QuestManager. Follow [Forge setup](/docs/core/luna-forge/setup) for the host's compilation and registration steps. Restart the game cores after changes.

The API exists on game cores. Each core owns its registrations in memory; a restart removes them, so register again at boot or forge load. For a temporary rule, retain its handle and unregister it when its scope ends. Register on every core that needs the rule.

A `locale_key` must exist in the client locale file `locale_game.txt`. An unknown key is displayed literally and logged as unregistered. A missing or empty key makes a refusal silent.

## Lua API

`forge.sys.game.skill_use_policy` exposes these functions on a game core. Call them outside guards and policies.

| Function | Signature | Return | Effect |
| --- | --- | --- | --- |
| `register` | `register(name, guard, policy, vnums)` | Positive numeric handle | Append a rule. |
| `unregister` | `unregister(handle)` | `boolean` | Remove the rule; `false` means the handle was unknown. |

| `register` argument | Type | Meaning |
| --- | --- | --- |
| `name` | `string` | Label used in logs. Names are not unique and do not replace existing rules. |
| `guard` | `fun(ch): boolean` | Required. Decide whether the rule applies to the performer. Called after the vnum filter. |
| `policy` | `fun(ch, vnum): table` | Required. Return a verdict when the filter matches and the guard returns `true`. |
| `vnums` | `number[]`, optional | Skill vnums to match. Omitted or `{}` matches every skill. |

`ch` is the performer, a player or a mob; `vnum` is the player skill vnum or the vnum in the mob's skill entry. Read any other context from `ch`. Scope a rule with the guard, for example with `ch:get_map_index()`, `ch:get_player_id()`, or `ch:is_pc()`.

A non-callable guard or policy raises `skill_use_policy.register: guard is not callable` or `skill_use_policy.register: policy is not callable` before registration. An error in a forge environment body fails its load and prevents the game core from starting. Handles start at 1, increase with each registration, and are not reused. The callbacks and their captured values remain alive until removal.

### Verdict fields

| Field | Type | Default | Effect |
| --- | --- | --- | --- |
| `allowed` | `boolean` | `true` | Only `false` refuses the skill. |
| `locale_key` | `string` | empty | Message shown over the performer on a player refusal; empty means silent. |

Missing fields and fields of the wrong type keep their defaults. For example, `{}`, `{ allowed = nil }`, `{ allowed = 0 }`, and `{ allowed = "no" }` all allow. An allowed verdict never displays `locale_key`.

## Native API

Native code uses the same list through `CSkillUsePolicy`.

| Call | Signature | Return |
| --- | --- | --- |
| `Register` | `Register(std::string name, std::vector<uint32_t> vecVnums, GuardFn guard, SkillUseFn policy)` | `handle_t` (`uint64_t`); `INVALID_HANDLE` (0) for an empty policy |
| `Unregister` | `Unregister(handle_t)` | `bool`; `false` for an unknown handle |
| `Resolve` | `Resolve(CHARACTER* ch, uint32_t unVnum) const` | `std::optional<SkillUseVerdict>`: empty when no rule matched, otherwise a denying or default allowing verdict |

An empty `vecVnums` matches every skill; an empty native guard matches every character. A Lua guard is required. An empty native policy logs `skill_use_policy [<name>]: needs a policy` to syserr, the server error log. The native types are `GuardFn = std::function<bool(CHARACTER*)>`, `SkillUseFn = std::function<SkillUseVerdict(CHARACTER*, uint32_t)>`, and `handle_t = uint64_t`. `SkillUseVerdict` contains `bool allowed`, defaulting to `true`, and `std::string strLocaleKey`, defaulting to empty.

A native callback returns the struct directly; Lua verdict decoding does not apply to it. Native and Lua registrations share resolution order.

## Resolution and failures

On one core, rules run in registration order. Across forges, that order follows forge load order, which is not guaranteed. For each rule the engine checks the vnum filter, then the guard, then the policy. The first `allowed = false` stops the walk. No match or no denial allows the skill; an allowing verdict cannot override another rule's denial.

Guards and policies run synchronously on the core's main thread. Return promptly and do not yield. The [bridge](/docs/building-blocks#policies-glossary) invokes the Lua callbacks and validates their returns.

| Failure | Result |
| --- | --- |
| Guard raises or returns a non-boolean | Skip that rule for the call. |
| Policy raises, returns no value, or returns a non-table | Allow. |
| Unknown handle passed to `unregister` | Return `false` and log `skill_use_policy: unknown handle=<n>`. |

Callback failures log to syserr, including `[skill_use_policy <name>] lua callback error` or `[skill_use_policy <name> guard] lua callback error`. Return validation can also log `Bridge::ValidateProcessorInvocation` errors. Registration and removal log `[OK] skill_use_policy [<name>]: handle=<n>` and `[OK] skill_use_policy [<name>]: dropped handle=<n>`.

## Where the engine asks

The engine consults the policy after the relevant native checks. The result depends on the call site:

| Call site | Timing | On refusal |
| --- | --- | --- |
| Player starts a cast | After native checks pass | Stop the cast, reset the client skill cooldown, and show `locale_key`. |
| Player attack packet carrying a skill | Before processing the attack, after the checks | Drop the packet and show `locale_key`. |
| Game master command to max skills | Once for each of 400 vnums | Skip refused skills; show no message. |
| Mob skill decision | After the cooldown check and coin flip | Skip that skill for this decision and try the next; ignore `locale_key`. |
| `ch:can_use_mob_skill(idx)` | The same mob decision | Return `false`. |

The check can be speculative. Return a locale key instead of sending a message inside the callback, or probes and the game master command can produce repeated messages. The mob decision draws its random value before consulting the policy, so the policy does not change that draw sequence.

## Native checks

A policy adds refusals and cannot override a native refusal. Checks include:

| Check | Refusal |
| --- | --- |
| Dead or stunned | Any cast by a dead or stunned character. |
| Subject authority | A guild, empire, or other owner-kind skill the caster cannot use; see [Owners](/foundations/skills/owners). |
| Skill group | A class skill outside the character's job and skill group, except for a virtual character or a character with a loadout in force. |
| Riding | Horse skills when not riding or the horse cannot use them, and the horse frontal skill below horse grade 4. Class skills are not refused merely because the character is mounted. |
| Fishing rod or pick | Class, specialization, and horse skills with either tool in hand. |
| `weaponLimitation` | A skill with a weapon restriction when the weapon is missing or has the wrong type. |
| Safe zone | An attack skill inside a no-PK area. |

Sub skills 121, 122, 124, and 126 to 130, horse summon, and casts whose subject is not the character pass the native checks and still reach the policy. Checks concerning the performer's own body are skipped for a cast the performer does not own.

## Examples

### Refuse skills while mounted

This rule covers every skill for player characters who are riding:

```forge
forge no_mounted_skills begin
    environment game begin
        return {
            handle = forge.sys.game.skill_use_policy.register(
                "no_mounted_skills",
                function(ch) return ch:is_pc() and ch:is_riding() end,
                function() return { allowed = false, locale_key = "CANNOT_SKILL_NOT_ALLOWED" } end)
        }
    end
end
```

This also refuses horse skills. To spare them, pass a list of class skill vnums as the fourth argument.

### Gate a skill on a charge

This rule checks one skill and allows it when the character has enough charge:

```forge
forge charge_gate begin
    environment game begin
        local RAGE = 100
        return {
            handle = forge.sys.game.skill_use_policy.register(
                "rage:charge",
                function() return true end,
                function(ch, vnum)
                    if ch:get_quest_flag("charge_gate.charge") < 100 then
                        return { allowed = false, locale_key = "CANNOT_SKILL_NOT_ALLOWED" }
                    end
                    return { allowed = true }
                end,
                { RAGE })
        }
    end
end
```

For a temporary match rule, register at setup, store the handle, and call `unregister(handle)` at teardown. Avoid registering again while the handle is still held.

## Pitfalls

**A rule runs for more skills than intended.** Omitted or empty `vnums` matches every skill. List the relevant vnums; to match none, do not register the rule.

**A player rule affects mobs.** Mob decisions use the same list and pass the mob as `ch`. Guard with `ch:is_pc()` or use an appropriate vnum list.

**A refusal has no readable message.** Supply a `locale_key` present in the client locale. Mob decisions ignore the key.

**A broken callback allows a skill.** An invalid guard skips its rule, while an invalid policy permits the call. Inspect syserr and test both matching and non-matching cases.

**A second registration leaves an unwanted rule active.** Names do not replace rules, and overwriting a handle loses the means to remove that registration. Store each handle and unregister it when its scope ends.

**A rule changes the registry while it is being walked.** Do not register or unregister from a guard or policy. Make those calls from a load, event, or command instead.

**A rule works on only one core.** Registrations are per core. Register the rule on each core that hosts characters it must govern.

## See also

- [Skill use policy](/docs/building-blocks/skill-use-policy) and [skill policy](/docs/building-blocks/skill-policy): related skill policy references.
- [Loadout policy](/docs/building-blocks/loadout-policy) and [loadout policy examples](/docs/building-blocks/loadout-policy-examples): loadout rules and recipes.
- [Loadout, use and skill policies](/foundations/skills/policies): how the skill registries relate.
- [Policies](/foundations/policies): the shared policy model.
