---
title: Skill policy reference
description: "Reference for forge.sys.game.skill_policy, the registry that puts a named variant of a skill in force on the characters a guard accepts: policies.yaml, register, unregister and refresh, the sampling edges, resolution order, the C++ registration and the traps."
displayed_sidebar: mainSidebar
---

# Skill policy reference

A skill policy is a rule you register from Lua that puts a named variant of a skill in force on every character a guard accepts. The variant is written in the skill's own config file, under `policies:`: a handful of overrides for damage, cost, cooldown, range, flags, animation or the tooltip. You reach for it when a map, an arena or an event needs the same skill to behave differently, and you want the numbers to live beside the skill instead of as a condition inside its formula: ten seconds less of a disguise in a duel, a longer reach for one player of a match.

Nothing here replaces Metin2 mainline engine code. It is a new capability: the skill table was the same for everyone, and now it can differ per character, per map or per mode. It is also not the [skill use policy](/docs/building-blocks/skill-use-policy). They share the guard and the handle, and they answer different questions:

| | Skill policy | Skill use policy |
| --- | --- | --- |
| Question | What does the skill do for this character? | May this cast happen? |
| Payload | A policy id declared in `policies.yaml` | A function returning a verdict table |
| Can it forbid a cast | No | Yes, deny only |
| Guard is asked | At edges: map change, register, unregister, `refresh` | On every cast and every mob skill decision |
| Result is | Cached on the character and sent to the client | Computed per call, never sent |
| Guard error | Fails closed: the policy does not apply | Skips the rule |
| Vnum filter | None, the skill file decides which skills a policy touches | Yes, optional |

For why the two are asked differently and how the loadout fits next to them, see [Loadout, use and skill policies](/foundations/skills/policies).

## Quick start

Two pieces: the id, declared once, and the override in the skill file. Skill 34 is the disguise. Its file already carries an `arena` variant that shortens the effect by ten seconds. This forge puts that variant in force on every character standing on map 1.

`Locale/conf/skill/policies.yaml` already declares the id:

```yaml
arena:
  name: In arena
  desc: I valori in vigore durante i duelli in arena.
```

`trial_map_variant.forge`:

```forge
forge trial_map_variant begin
    environment game begin
        local TRIAL_MAP = 1

        local handle = forge.sys.game.skill_policy.register(
            "trial_map_variant",
            function(ch)
                return ch:get_map_index() == TRIAL_MAP
            end,
            "arena")

        return { handle = handle }
    end
end
```

Add the file to the compiler list, compile, restart the game cores. A character that walks onto map 1 casts the disguise for ten seconds less, and the tooltip of the skill shows the variant. A character that leaves the map gets the base skill back.

## Files and setup

A skill policy has three parts, in three places.

| Part | Where | What it holds |
| --- | --- | --- |
| The id | `Locale/conf/skill/policies.yaml` | Every policy there is: its id, a `name` and a `desc`. |
| The overrides | `policies:` in the skill file, `Locale/conf/skill/<vnum>.ucskill.yaml` | Per policy id, a map of path to value patched onto a copy of that skill. |
| The rule | A forge, quest or referee on a game core | Which characters get which id, through `register`. |

- `forge.sys.game.skill_policy` exists on game cores only. A rule registered on the core that hosts one map does not apply to a map hosted elsewhere.
- Compile and register the file as for any forge, see [Forge API reference](/docs/core/luna-forge). Forges are not reloaded: after a change, restart the game cores.
- Registrations are not saved. After a restart only the rules that register again exist.
- The `name` in `policies.yaml` is what the tooltip's configuration switcher shows. The server copy is for logs and for whoever reads the file. The client reads its own translation from `skill_desc/policies.ucskilldesc.yaml`.
- The overrides are read by the server and by the client from the same skill file. They are never sent over the network: the client is told only which ids are in force.

A skill that names an undeclared id under `policies:` fails the skill load, and registering an undeclared id is refused. This is the reason the id file exists: a mistyped id fails loudly instead of granting a rule that does nothing.

**Registration order is resolution order.** Two policies that override the same skill do not combine: the one put in force by the rule registered first answers for that skill, whatever the order in `policies.yaml`. A config that wants the combination declares a third policy that says so, and one rule puts it in force.

The shipped ids:

| Id | Used by |
| --- | --- |
| `arena` | The arena duel rule, registered by the base arena referee for every duelist. |
| `ballemup`, `ballemup_r1` to `ballemup_r5` | The ball game arena: one id for the base variant and one per Launch Range step. The referee registers one rule per step and puts exactly one in force per player. |

For the syntax of the `policies:` block itself (the path grammar, deleting a key with `~`, adding a node, the check that refuses a policy restating a node's traits without its own `affectVnum`) see [Skill file reference](/docs/core/skill-file).

## API

### `forge.sys.game.skill_policy`

| Name | Signature | Returns | Context | What it does |
| --- | --- | --- | --- | --- |
| `register` | `register(name, guard, policy_id)` | `number` handle, `0` on failure | game core, outside any guard | Appends a rule, then re-samples every character. |
| `unregister` | `unregister(handle)` | `boolean` | game core, outside any guard | Drops the rule, then re-samples every character. `true` when found, `false` for an unknown handle. |
| `refresh` | `refresh(ch)` | nothing | game core | Re-samples every guard against one character and, if the answer moved, re-aims their skills and tells their client. |

Parameters of `register`:

| Parameter | Type | Meaning |
| --- | --- | --- |
| `name` | `string` | Cosmetic, logged on errors. Never compared: duplicates are allowed and they are two rules. |
| `guard` | `fun(ch): boolean` | "Does this policy apply to this character?" Required. `true` means it applies. |
| `policy_id` | `string` | The id to put in force, declared in `policies.yaml`, for example `"arena"`. |

Scope is the guard. A map rule guards on `ch:get_map_index()`, a rule for one arena on `ch:get_pvp_arena()`, a rule for one character on `ch:get_player_id()` or a quest flag, a rule for everyone returns `true`. There is no priority parameter and no replace-by-name.

A `guard` that is not a function stops the call with `skill_policy.register: guard is not callable`, before anything is registered. Inside a forge environment body that error fails the forge load, and then the game core does not start. An id that `policies.yaml` does not declare does not raise: `register` returns `0` and the engine logs the refusal, see [Behaviour](#behaviour).

Handles start at 1 and grow by one per successful registration. They are never reused. The guard stays alive until `unregister`, so closures and upvalues work.

### The ctx: what the guard receives

| Callable | Arguments | Notes |
| --- | --- | --- |
| `guard` | `ch` | The character being sampled. A player or a mob: mobs are characters too. |

There is no table of context fields and no verdict: the guard receives the character and nothing else, and returns one boolean. Anything more is read from `ch`.

### The return shape

| Call | Success | Failure |
| --- | --- | --- |
| `register` | A handle, 1 or more | `0` |
| `unregister` | `true` | `false`, the handle was not known |
| `refresh` | nothing | nothing; a nil character is ignored |

The guard returns a boolean. Anything else, and any error raised, counts as `false`: the policy does not apply to that character.

### C++ registration

Engine code registers on the same list through the singleton `CSkillPolicyRegistry`. The guard is a plain function.

| Call | Signature | Returns |
| --- | --- | --- |
| `Register` | `Register(std::string name, GuardFn guard, const std::string& policyId)` | `handle_t` (`uint64_t`), `INVALID_HANDLE` (0) when the guard is empty or the id is not declared |
| `Unregister` | `Unregister(handle_t)` | `bool`, `false` for an unknown handle |
| `Sample` | `Sample(LPCHARACTER ch) const` | `bool`, `true` when the character's list of active policies changed |

The types a native registrant uses:

```cpp
using GuardFn  = std::function<bool(CHARACTER*)>;
using handle_t = uint64_t;
```

A C++ registration refuses an empty guard with `skill_policy [<name>]: no guard, so nothing would ever decide it applies`, and an undeclared id with `skill_policy [<name>]: policy [<id>] is not declared by policies.yaml`, both in syserr. The Lua guard is a function that must exist; the C++ guard is a `std::function` that must not be empty. Native and Lua registrations share one list, and the registration order is the resolution order. `Register` and `Unregister` re-sample every character before they return.

To re-sample one character from C++ the call is `CHARACTER::RefreshSkillPolicies()`, which is what `refresh` calls.

Who registers through each door:

| Door | Registrants that ship |
| --- | --- |
| `CSkillPolicyRegistry::Register` (C++) | none in the game: only the simulator's test hook, which registers a rule matching one character so a probe can put two characters on one map under different policies |
| `forge.sys.game.skill_policy.register` (Lua) | the arena duel rule, one rule per range step in the ball game arena |

No native registrant ships: the C++ door exists and nothing in the game core uses it. The Lua binding is the only caller of `Register` outside the simulator.

## Behaviour

### Sampling

Guards are not asked per cast. The engine asks every guard at a few edges and caches the answer on the character:

| Edge | Which characters | Why it is an edge |
| --- | --- | --- |
| A character is placed on a map (`Show`) | that character, player or mob | The map changed, so a guard that reads the map has changed its answer. |
| `register` | every character | The rule set changed. |
| `unregister` | every character | The rule set changed. |
| `refresh(ch)` | that character | The content says its own condition moved. |
| Entering the game phase | that character, notification only | The client may be arriving from a map that had a policy, so the policy packet is sent even when empty. |

A guard may read anything that changes at one of these points. A guard whose ground moves silently, such as a quest flag, a count or a pickup, needs the last edge: change the state, then call `refresh` on the next line.

```forge
forge refresh_example begin
    environment game begin
        local handle = forge.sys.game.skill_policy.register(
            "awakened",
            function(ch)
                return ch:get_quest_flag("trial.awake") == 1
            end,
            "arena")

        local function awaken(ch)
            ch:set_quest_flag("trial.awake", 1)
            forge.sys.game.skill_policy.refresh(ch)
        end

        return { handle = handle, awaken = awaken }
    end
end
```

That is why a skill lookup on the attack path walks a short list of numbers and never calls Lua. A sample covers mobs too: a policy bound to a map applies to everything standing on it, with no per-spawn opt-in.

### What a sample does

For one character, the engine runs the guards in registration order and collects the ids of the rules that answered `true`. When two rules put the same id in force, such as an arena and an event inside it, the id is listed once. If the list is the same as before, nothing else happens. If it changed:

1. Every skill the character holds is re-aimed at the proto of its new variant. A running skill instance caches its proto, and the skill vnum does not change with the variant.
2. The client is told which ids are in force.

The client keeps one copy of each variant read from the same skill file, so the icon, the cooldown, the range and the description follow the policy without being asked.

### Resolution

For one skill and one character, the engine walks the ids in force, in the registration order of the rules that put them there, and takes the first policy that carries an override for that skill vnum. If none does, the character gets the base skill. Policies are not merged with one another.

Two consequences. A skill is overridden by a policy only when that skill's file lists the id under `policies:`: a rule that puts `arena` in force changes only the skills that declare an `arena` variant. And a variant is a whole skill built at load: a policy replaces the skill, it does not patch it at cast time.

### Failure direction

| What fails | Result |
| --- | --- |
| The guard raises an error or returns anything but a boolean | The rule does not apply to that character. |
| `register` with an id `policies.yaml` does not declare | Refused, returns `0`. |
| `register` with a guard that is not a function | Error raised to the caller. |
| `unregister` with an unknown handle | Returns `false`. |

A bug never grants a variant. Every failing guard logs to syserr:

```text
Bridge::ValidateProcessorInvocation lua error: <Lua error message>
Bridge::ValidateProcessorInvocation wrong return: expected [boolean], got [nil]
[skill_policy <name> guard] lua callback error
```

A refused registration logs to syserr:

```text
skill_policy [<name>]: policy [<id>] is not declared by policies.yaml
```

The guard runs synchronously on the main thread of the core, once per character per sample, and a registration samples every character. Registration is an operator-rate event, an arena opening or an event starting: do not register per player or per tick.

### Where a policy is in force

A policy reaches every place that reads the skill: casting, the attack path, cooldowns, costs, the tooltip. All of them look the skill up through the character, which returns the variant when one is in force and the base skill otherwise.

## Examples

### One variant for everyone on a map

The quick start in its general form. The guard compares one number.

```forge
forge map_variant begin
    environment game begin
        local EVENT_MAP = 1

        return {
            handle = forge.sys.game.skill_policy.register(
                "map_variant:" .. EVENT_MAP,
                function(ch) return ch:get_map_index() == EVENT_MAP end,
                "arena")
        }
    end
end
```

### A rule tied to a match

Register when the match is set up, unregister when it ends. Keep the handle and refuse to register while you hold one. Unregistering re-samples everyone, so every player of the match gets the base skill back and is told so.

```forge
forge match_variant begin
    environment game begin
        local Match = {}
        Match.__index = Match

        function Match:new(map_index)
            return setmetatable({ map_index = map_index, handle = nil }, Match)
        end

        function Match:start()
            if self.handle ~= nil then
                return false
            end
            local map_index = self.map_index
            self.handle = forge.sys.game.skill_policy.register(
                "match:" .. map_index,
                function(ch)
                    return ch:get_map_index() == map_index
                end,
                "arena")
            return self.handle ~= 0
        end

        function Match:finish()
            if self.handle == nil then
                return false
            end
            local removed = forge.sys.game.skill_policy.unregister(self.handle)
            self.handle = nil
            return removed
        end

        return { Match = Match }
    end
end
```

### One id per step of a changing value

A guard can compare a number that changes during play. The ball game arena keeps a range step per player and declares one id per step, `ballemup_r1` to `ballemup_r5`, plus a base id. It registers one rule per step, each with a guard that matches its own step, and calls `refresh` after it changes a player's step. This is the same idea in minimal form.

```forge
forge range_steps begin
    environment game begin
        local STEPS = 3
        local handles = {}

        for step = 1, STEPS do
            handles[step] = forge.sys.game.skill_policy.register(
                "range:" .. step,
                function(ch)
                    return ch:get_quest_flag("range_game.step") == step
                end,
                "ballemup_r" .. step)
        end

        local function set_step(ch, step)
            ch:set_quest_flag("range_game.step", step)
            forge.sys.game.skill_policy.refresh(ch)
        end

        return { handles = handles, set_step = set_step }
    end
end
```

Exactly one guard answers `true` for a player, so exactly one id is in force. If two did, the rule registered first would win for any skill both override.

## Pitfalls

**A skill policy changes nothing.** The rule is registered and no skill behaves differently. The id is in force, but no skill file lists it under `policies:`, so no skill has a variant to switch to. Add the override to the skill file and restart the cores.

**`register` returned `0`.** The id is not declared in `policies.yaml`, or the C++ guard was empty. The Lua call does not raise: check the handle, and read syserr for `is not declared by policies.yaml`. Keep a `0` handle out of `unregister` bookkeeping; an unknown handle only returns `false`.

**The variant did not appear after the state changed.** The guard reads something that changes without an edge, such as a quest flag or a counter. Guards are sampled only at a map change, a register or unregister, and `refresh`. Change the state, then call `forge.sys.game.skill_policy.refresh(ch)` on the next line.

**The guard calls the same costly code for everyone.** A registration or an unregistration samples every character in the core, mobs included. Keep guards to a compare or a table lookup, and register at the start and end of an event, never per player.

**Two policies on one skill do not combine.** When two ids are in force and both override the same skill, the one whose rule was registered first answers and the other is ignored for that skill. Declare a third policy that carries the combination, and put that one in force instead.

**A broken guard disables its own rule.** A guard that raises or returns a non-boolean (a vnum, `1`, an object) counts as `false` on every sample. It logs on each sample, so a typo shows up in syserr with your rule name in it. Test with syserr open.

**A rule meant for players also covers mobs.** A map rule applies to every character on the map, the monsters standing on it included. A rule that must not touch them guards with `ch:is_pc()`.

**The policy cannot forbid a cast.** It only reshapes a skill, and a variant may keep the skill's flags and cost but cannot say "not here". To refuse a cast use the [skill use policy](/docs/building-blocks/skill-use-policy).

**A per-match rule that is never unregistered keeps matching.** A guard that captures a match stays on the list, with its closure, until the core stops, and every later sample asks it. Unregister it with the thing it judges.

**Calling `register` or `unregister` from inside a guard.** Registration samples every character, which runs every guard, and that includes the one you are inside of. Register from a load, an event or a command.

**A rule registered on one core does not hold on another.** Registrations are per core process. A map hosted on another core is judged by the rules of that core.

**A policy that restates traits needs its own affect.** A variant that restates a node's traits or counters without giving the node its own `affectVnum` fails the skill load, because every binding on an affect type activates together. This is a skill file rule, see [Skill file reference](/docs/core/skill-file).

## See also

- [Loadout, use and skill policies](/foundations/skills/policies): why the skill policy is sampled while the use policy is asked per cast, and how the three registries relate.
- [Policies](/foundations/policies/): the shared shape of every guard and handle registry.
- [Skill use policy reference](/docs/building-blocks/skill-use-policy): the deny-only gate on casts.
- [Skill file reference](/docs/core/skill-file): the `policies:` block and its path grammar.
- [Item use policy reference](/docs/building-blocks/item-use-policy): the same pattern for items.
- [Forge API reference](/docs/core/luna-forge): file layout, environments and load order.
