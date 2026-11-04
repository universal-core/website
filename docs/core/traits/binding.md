---
title: Binding a trait
description: Bind a definition to an affect and supply formulas and constants.
displayed_sidebar: mainSidebar
---

# Binding a trait

A binding connects a trait definition to an [affect](/docs/core/affects/overview) type. A definition can have several bindings. Every binding for a type opens when any caller adds an affect of that type, and closes when the last affect of that type is removed.

## Binding doors

| Door | How |
| --- | --- |
| Skill loader | A C++ loader reads `traits:` entries on an affect-raising skill node. |
| Lua | `forge.sys.game.traits.bind(id, affect_type, formulas)`; `define` with `gate` calls this as shorthand. |

A skill, a mode, or a consumable item that adds the bound affect can open the gate. Equipping gear cannot: equipment applies points through `ApplyPoint`, not `AddAffect`. A point with the same number as an affect type is not a gate.

## Bind from Lua

The example binds a named formula, then primes its constant immediately before adding the affect. Choose an unused affect ID; see [affect type IDs](/docs/core/affects/registration#choose-a-type-id).

```lua
local traits = forge.sys.game.traits
traits["define"]{
    id = "ward",
    hooks = {
        on_damage_taken_final = function(ch, attacker, dam, dam_type, ctx)
            local pct = ctx.formula("reduction", 0, { dam = ctx.damage })
            pct = math.max(0, math.min(pct, 100))
            ctx.damage = ctx.damage * (1 - pct / 100)
        end,
    },
}
affect.add_name_definition("EXAMPLE_WARD", 3901)
affect.add_no_save(affect.name_map.EXAMPLE_WARD)
local binding = traits.bind("ward", affect.name_map.EXAMPLE_WARD,
    { reduction = "power*5" })
local function apply_ward(ch, power)
    if binding == 0 then return false end
    ch:remove_affect(affect.name_map.EXAMPLE_WARD)
    traits.prime_constants(ch, binding, { power = power })
    ch:add_affect(affect.name_map.EXAMPLE_WARD, point.NONE, 0, 0, 600, 0, true)
    return true
end
```

## Bind from a skill node

A node that raises an affect takes a list of entries. The gate is its `affect`, or the skill vnum if none is named.

```yaml
- type: AFFECT
  id: example_node
  traits:
    - id: ward
      constants: { power: skill_level }
      formulas: { reduction: "power*5" }
  point: PHYSICAL_RESISTANCE
```

`params` names end in `_point`, `_column`, or `_affect` and resolve to enum integers. Constants must use the skill formula vocabulary. Use `traits:` as a list, never singular `trait:`; put constants, formulas, and params inside each entry.

## Lifetime and values

- Formulas and constants are frozen for a character's node at the gate. The skill loader primes constants before adding the affect; Lua can do the same with `prime_constants`.
- Remove an old affect before priming: closing its gate clears constants. Reapplying an active affect normally renews duration without another activation.
- Closing the gate clears counters, cooldowns, schedules, and constants; state is cleared unless `keep_state_on_deactivate` is set. Activation resets counters and enables the trait.
- Constants are session-scoped. A restored affect opens without them; use the affect value through `ctx.gate_value()` for durable data, or use a no-save affect.
- Rebinding the same trait and affect pair replaces formulas and returns the same binding ID. `unbind` removes it from the affect index; existing active nodes continue until their gate closes.
- `bind` returns `0` for an unknown ID. Definitions must exist before a Lua bind. If several affects share a type, `gate_value()` reads the first one.

For the C++ registration interface, see [native traits](./native.md).
