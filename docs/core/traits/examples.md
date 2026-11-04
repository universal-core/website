---
title: Trait examples and pitfalls
description: Apply small trait patterns and avoid common gate and hook mistakes.
displayed_sidebar: mainSidebar
---

# Trait examples and pitfalls

These examples define behavior. Bind each definition to an affect as shown in [binding](./binding.md).

## Reduce incoming damage

```lua
forge.sys.game.traits["define"]{
    id = "example_reduction",
    hooks = {
        on_damage_taken_final = function(ch, attacker, dam, dam_type, ctx)
            ctx.damage = ctx.damage * 0.7
        end,
    },
}
```

This transform includes damage-over-time and reflected damage. Filter `dam_type` when those should be excluded.

## Count damage and reset on a tick

```lua
forge.sys.game.traits["define"]{
    id = "example_counter",
    counters = { { name = "dealt", accumulate = "DAMAGE_DEALT_POST" } },
    hooks = {
        on_tick = function(ch, ctx)
            if ctx.counter("dealt") > 1000 then
                ctx.reset_counters()
            end
        end,
    },
}
```

The post amount is the amount handed to the victim before victim-side transforms and later critical and pierce adjustments, not necessarily health lost.

## Pitfalls

| Symptom | Cause and fix |
| --- | --- |
| Equipping a point does not activate a trait | Equipment uses `ApplyPoint`, not `AddAffect`. Add the bound affect to open the gate. |
| A bump does nothing or lasts too long | Use it only in the two damage pre hooks. Other hooks may be outside the guard or run inside one that outlives the hook. |
| A bump reaches unintended attacks | Filter `dam_type`; the same pre hooks cover melee, ranged, and skill damage. |
| A formula uses its fallback | Pass live variables such as `dam` in `vars`; check that the named formula and constants exist. |
| A restored affect has no constants | Constants are session-scoped. Use `ctx.gate_value()` for durable values or a no-save affect. |
| A hook never fires | Unknown hook names are ignored. Check the spelling and the definition's logged mask. |
| A counter stays at zero | Only the triggers listed under [automatic counters](./define.md#counters-that-fill-themselves) feed counters. Other recognized trigger names do not. |
| A Lua bind returns `0` | Define the ID before binding and check the return value. |
| A scheduled callback outlives its trait | Use `ctx.schedule`; it is cancelled on deactivation and destruction. Do not retain a ctx in an external closure. |
| A disabled trait starts running again | Opening its gate enables it. Disable it again if required. |
| A fractional cooldown lasts longer than expected | Cooldowns round up to whole seconds. |
| A teardown callback cannot use ctx functions | At character destruction `ch` remains valid, but ctx functions are inert. |

See [definition and hooks](./define.md) and [Traits foundations](/foundations/traits/).
