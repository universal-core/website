---
title: Defining a trait
description: Define hooks, counters, context, formulas, and temporary point bumps.
displayed_sidebar: mainSidebar
---

# Defining a trait

Define a trait once per process from a game Forge environment. A definition may include `gate` as shorthand for a Lua binding; otherwise bind it separately. Restart the game cores after changing a definition.

```lua
forge.sys.game.traits["define"]{
    id = "ward",
    hooks = {
        on_damage_taken_final = function(ch, attacker, dam, dam_type, ctx)
            ctx.damage = ctx.damage * 0.9
        end,
    },
}
```

## Definition fields

| Field | Type | Meaning |
| --- | --- | --- |
| `id` | string, required | The name every other call uses. |
| `gate` | `{ affect = <affect type> }`, optional | Binds to this affect immediately. Without it, the trait stays unbound until a skill node or `bind` binds it. |
| `stage` | integer, default `0` | Order among traits that share one formula position, ascending. See [stage ordering](./stage.md). |
| `counters` | list, optional | A plain string is a manual counter. `{ name = "dealt", accumulate = "DAMAGE_DEALT_POST" }` also fills itself. |
| `keep_state_on_deactivate` | boolean, default `false` | Keep `ctx.state` when the gate closes. |
| `hooks` | table, optional | The behaviour. Each hook you declare subscribes the trait to its trigger. A def with no hooks and no accumulating counters is never dispatched. |

A misspelled hook name is not an error. Only the 24 known names are read.

### Counters that fill themselves

An `accumulate` counter is incremented by the engine without a Lua call. What a counter gains per trigger is fixed by the trigger, not inferred from the value:

| Trigger | Gain per event |
| --- | --- |
| `DAMAGE_DEALT_POST`, `DAMAGE_TAKEN_POST` | the `dam` of the post hook, never below 0 (see [the post hooks](#hooks)) |
| `HEAL_DONE`, `HEAL_TAKEN` | the heal amount, never below 0 |
| `KILL`, `DIED`, `TICK_1HZ`, `SKILL_CAST`, `DEBUFF_GIVEN`, `DEBUFF_TAKEN`, `BUFF_GIVEN`, `BUFF_TAKEN` | 1 |

The other trigger names are accepted by the parser and never count, see [pitfalls](./examples.md#pitfalls). An unknown `accumulate` string logs an error and the counter is added as manual-only.

### Define errors

`define` returns `0` after the first four. The two counter errors log and go on defining.

| Log line | Cause |
| --- | --- |
| `[traits] define: missing id` | The table has no `id`. |
| `[traits] define: duplicate id [{}]` | The id is already defined in this process. |
| `[traits] define [{}]: a native trait already owns this id` | A C++ trait registered the id. |
| `[traits] define [{}]: gate is present but gate.affect is 0` | For example `affect.name_map.X` is `nil`. |
| `[traits] define [{}]: unknown accumulate [{}]` | The counter exists, manual only. |
| `[traits] define [{}]: counter without name` | That counter is skipped. |

## Trait API

Every per-character function takes a trait **name** (the `id` of the def) and resolves it to this character's binding in this order: the active binding of that def, else any node of that def, else the def's first binding. If the character has no trait data at all, the call is a no-op that returns 0, `false` or nothing.

| Function | Signature | Returns | What it does |
| --- | --- | --- | --- |
| `define` | `define(def)` | dense def id (`> 0`), or `0` on failure | Registers a def. With `gate`, it also binds at once, with no formulas. Logs `[OK] [traits] define [id] id=.. affect_gate=.. binding=.. hook_mask=0x..`. Errors are under [define errors](#define-errors). |
| `bind` | `bind(trait_id, affect_type, formulas?)` | binding id, or `0` | Gates a trait on an affect with this binding's formulas. Each formula string is analysed; a bad one logs `[traits] bind [id]: cannot analyze formula [name]: 'expr'` and is kept empty. An unknown trait id returns `0` with no log line. Binding the same (trait, affect) pair again returns the same id with the formulas replaced. |
| `unbind` | `unbind(binding_id)` | nothing | Takes the binding out of the affect index. Characters already holding it keep working until their gate closes. Binding the same pair again re-indexes it. |
| `prime_constants` | `prime_constants(ch, binding_id, values)` | nothing | Gives the character's node the constants of the binding. Only string keys with number values are kept, the rest are skipped silently. It replaces the node's whole constants map. |
| `is_active` | `is_active(ch, trait_id)` | `boolean` | The gate is open and the trait is not disabled. |
| `counter` | `counter(ch, trait_id, name)` | number | The counter value, `0` for an unknown counter, trait or character. |
| `add_counter` | `add_counter(ch, trait_id, name, delta)` | number | Adds `delta` and returns the new value. `delta` is an unsigned 64-bit value: do not use it to decrement, use `set_counter`. |
| `set_counter` | `set_counter(ch, trait_id, name, value)` | nothing | Overwrites a counter. |
| `reset_counters` | `reset_counters(ch, trait_id)` | nothing | Zeroes every counter, keeps the state. |
| `reset_state` | `reset_state(ch, trait_id)` | nothing | Only if active. Cancels schedules, clears cooldowns, zeroes counters, gives a fresh `ctx.state` and runs `on_activate` again. Constants are kept. |
| `set_cooldown` | `set_cooldown(ch, trait_id, name, seconds)` | nothing | Starts or restarts a named cooldown. The deadline is whole seconds, rounded up. |
| `cooldown_remaining` | `cooldown_remaining(ch, trait_id, name)` | number | Seconds left, `0` if expired or never set. |
| `is_on_cooldown` | `is_on_cooldown(ch, trait_id, name)` | `boolean` | `cooldown_remaining > 0`. |
| `clear_cooldown` | `clear_cooldown(ch, trait_id, name)` | nothing | Drops a cooldown at once. |
| `schedule` | `schedule(ch, trait_id, name, seconds)` | nothing | A one-shot delayed callback to `on_scheduled(ch, name, ctx)`. A pending schedule of the same name is cancelled first. The minimum delay is one pulse. |
| `cancel_scheduled` | `cancel_scheduled(ch, trait_id, name)` | nothing | No-op if none is pending. |
| `is_scheduled` | `is_scheduled(ch, trait_id, name)` | `boolean` | A schedule with this name is pending. |
| `disable` | `disable(ch, trait_id)` | nothing | Only if active. Hooks and auto-accumulation stop. State, counters and the affect stay. |
| `enable` | `enable(ch, trait_id)` | nothing | Resumes a disabled trait. |
| `is_disabled` | `is_disabled(ch, trait_id)` | `boolean` | |
| `disable_all` | `disable_all(ch)` | nothing | Disables every active trait on the character. |
| `enable_all` | `enable_all(ch)` | nothing | Enables every disabled trait on the character. |

## Hook index

Lifecycle hooks manage activation and schedules; pre hooks support point bumps; transform hooks change a value; post and event hooks observe. See [stage and positions](./stage.md) for ordering.

## Hooks

Each hook you declare adds its trigger bit to the trait's mask. `on_activate`, `on_deactivate` and `on_scheduled` add no bit. In every signature `ch` is the character the trait is attached to and `ctx` is that character's ctx for this binding. Where a character may be absent, the argument is `nil`.

| Hook | Arguments | Fires when |
| --- | --- | --- |
| `on_activate` | `(ch, ctx)` | The gate goes from closed to open. Counters are already zeroed and constants already primed. |
| `on_deactivate` | `(ch, ctx)` | The gate closes, and again when the character object is destroyed. In the destruction case the ctx functions do nothing, `ch` is still valid. |
| `on_scheduled` | `(ch, name, ctx)` | A `schedule` deadline elapsed. |
| `on_damage_dealt_pre` | `(ch, victim, dam_type, ctx)` | Before the damage formula reads the attacker's points. Bump points here. |
| `on_damage_taken_pre` | `(ch, attacker, dam_type, ctx)` | The victim side of the same moment. `attacker` can be `nil`. |
| `on_damage_dealt_post` | `(ch, victim, dam, dam_type, ctx)` | After the hit. `dam` is the amount the damage formula handed to the victim, before the victim-side transforms and the critical and pierce adjustments that follow, so it is not the health the victim lost. Observe only. |
| `on_damage_taken_post` | `(ch, attacker, dam, dam_type, ctx)` | The same for the victim. `attacker` can be `nil`. |
| `on_damage_taken_raw` | `(ch, attacker, dam, dam_type, ctx)` | Transform, before defense. |
| `on_damage_taken_final` | `(ch, attacker, dam, dam_type, ctx)` | Transform, after the damage amplifiers. |
| `on_damage_dealt_final` | `(ch, victim, dam, dam_type, ctx)` | Attacker-side transform at the same point, before the victim's final transforms. |
| `on_hit_resolved` | `(ch, attacker, dam, dam_type, damage_flag, ctx)` | The resolved hit, with the critical and pierce bits in `damage_flag`. Observe only, but `ctx.end_self()` is valid here: the trait may close its gate here. |
| `on_attack` | `(ch, ctx)` | `ch` threw an attack motion, any attack, hit or not. |
| `on_target_scan` | `(ch, finder, ctx)` returns `boolean` | `finder` is acquiring a target. Return `true` to hide `ch` from it. |
| `on_kill` | `(ch, victim, ctx)` | `ch` landed the killing blow. |
| `on_died` | `(ch, attacker, ctx)` | `ch` died. `attacker` can be `nil`. |
| `on_tick` | `(ch, ctx)` | Once a second while the gate is open. Declaring it enrols the character in the global one-second walk. |
| `on_skill_cast` | `(ch, skill_vnum, ctx)` | `ch` cast a skill that passed the validity checks, before the cooldown and cost checks, so a cast refused for cooldown or cost still fires it. Filter on `skill_vnum`. |
| `on_debuff_given` | `(ch, target, affect_type, ctx)` | `ch` landed a bad affect on `target`. |
| `on_debuff_taken` | `(ch, attacker, affect_type, ctx)` | The counterpart. `attacker` can be `nil` for quest or environment debuffs. |
| `on_buff_given` | `(ch, target, affect_type, ctx)` | `ch` applied a good affect to `target`. |
| `on_buff_taken` | `(ch, source, affect_type, ctx)` | `ch` received one. `source` can be `nil`. |
| `on_heal_done` | `(ch, target, amount, ctx)` | `ch` delivered a skill heal. Regeneration and potions have no healer and fire nothing here. |
| `on_heal_taken_pre` | `(ch, healer, amount, source, ctx)` | Transform, before a received heal lands. `source` is a `forge.sys.game.HEAL_SOURCE`, documented with the `forge.sys.game` namespace. |
| `on_heal_taken` | `(ch, healer, amount, ctx)` | `ch` gained health by any route. `healer` is always `nil`. |

`dam_type` is a `forge.sys.game.DAMAGE_TYPE` value. In a transform hook, `dam` is only a convenience copy: read and write `ctx.damage`.

The transform hooks run for every hit the victim takes, damage-over-time ticks and reflected damage included, while the two pre hooks run only at the three bump sites. Filter on `dam_type` (`POISON`, `BLEEDING`) when a reduction must not touch ticks. The `dam` of the post hooks is the amount handed to the victim, so a reduction written in a transform hook does not show in it.

Every Lua hook is called through a protected call. An error logs `[traits] <hook> [<trait id>]: <lua error>` and the engine carries on. `on_scheduled` adds `name=[<name>]` before the colon, and an `on_deactivate` that fails at character destruction is logged as `[traits] ~CCharTraits on_deactivate [<trait id>]: <lua error>`. A transform hook that errors leaves the damage or the heal unchanged. An `on_target_scan` that errors leaves the owner visible.

## Context

A ctx is built once per activation, per character and binding. Two skills that gate the same trait give a character two independent ctxs, with their own counters, cooldowns, state and numbers. A ctx kept beyond the character's life turns every function into a no-op, and the cached ctx is dropped on every activation, deactivation and `reset_state`.

### Fields

| Field | Hooks | Meaning |
| --- | --- | --- |
| `ctx.state` | all | Per-character and binding Lua scratch table. It lives until `on_deactivate`, or across gate flips with `keep_state_on_deactivate`. |
| `ctx.damage` | `on_damage_taken_raw`, `on_damage_taken_final`, `on_damage_dealt_final` | Pre-filled with the damage and read back when the hook returns. The value is rounded and clamped at 0. A non-number, or a field left untouched, leaves the damage alone. |
| `ctx.skill_vnum` | the same three transform hooks | Read-only. The skill that dealt the hit; `0` for a basic attack, a damage-over-time tick or a reflect. A cast with no performer still names its skill. |
| `ctx.amount` | `on_heal_taken_pre` | Pre-filled with the incoming heal, read back the same way as `ctx.damage`. |

### Functions

| Function | Meaning |
| --- | --- |
| `ctx.counter(name)`, `ctx.add_counter(name, delta)`, `ctx.set_counter(name, value)`, `ctx.reset_counters()` | The counter functions in the trait API, for this binding. `add_counter` returns the new value. |
| `ctx.bump_point(point, delta)` | Adds `delta` to a point of `ch`, the holder, for the rest of the damage formula. Meant for the two pre hooks only, see [bump points](#bump-points). |
| `ctx.set_cooldown`, `ctx.cooldown_remaining`, `ctx.is_on_cooldown`, `ctx.clear_cooldown` | The cooldown functions, for this binding. |
| `ctx.schedule`, `ctx.cancel_scheduled`, `ctx.is_scheduled` | The schedule functions. The framework owns the event and cancels it on deactivate and on character destruction. |
| `ctx.since_activation()` | Seconds since the gate opened. |
| `ctx.is_active()` | True inside hooks except during teardown. |
| `ctx.formula(name, fallback, vars?)` | Evaluates a named formula of this binding. See [Formulas and constants](#formulas-and-constants). |
| `ctx.constant(name, fallback)` | A number the binding froze when the affect landed. |
| `ctx.gate_value()` | The gating affect's own value. If several affects of that type are up, the first counts. |
| `ctx.end_self()` | Removes the affect that gates this trait, so the normal expiry path deactivates it. A trait never removes its own affect by hand. |

### Formulas and constants

A binding carries named formulas (strings in the formula language of the skill files) and the character's node carries constants (numbers). `ctx.formula(name, fallback, vars?)` evaluates one formula as follows:

1. All variables are cleared.
2. The node's constants are set by name.
3. `amount` is set to the gate value.
4. The names in `vars` are set.

`dam` is not special on this path. A formula that names `dam` gets it only when you pass `dam = ...` in `vars`. A name nobody supplies logs once per binding and formula, `[traits] formula [{}] on binding {} references [{}], which neither the gate's constants nor the call site supply - using the fallback`, and the call returns the fallback. A binding with no such formula, or an empty one, returns the fallback silently, so always pass a working default.

A constant is a number the binder resolved in its own vocabulary and froze when the affect landed, for example a caster's skill level. Anything you can read at hook time is a variable: pass it in `vars`, or a frozen value is used forever.

## Bump points

`ctx.bump_point(point, delta)` temporarily changes the holder's point. Use it in `on_damage_dealt_pre` or `on_damage_taken_pre`; the guard unwinds bumps when the damage computation ends. Bumps add together, and nested guards unwind independently.

| Guarded site | `dam_type` |
| --- | --- |
| Melee basic attack | `NORMAL` |
| Ranged shot or magic weapon basic attack | `NORMAL_RANGE` or `NORMAL_MAGIC` |
| Skill damage node | The node's declared type |

Filter by damage type when the bonus is limited to one delivery. A splash skill can calculate its amount once for multiple victims, so do not use a victim-dependent attacker bump for it. A bump outside a guard is ignored; a later hook can run inside a guard but its bump lasts until that guard ends. Use a transform for changing damage there.

Normal point reads include bumps. The limit-clamped reads used by skill formulas for `MOV_SPEED`, `CRITICAL_PCT`, `ATT_SPEED`, `CASTING_SPEED`, and `IQ` do not.

Next: [Stage and formula positions](./stage.md).
