---
title: Skill extension reference
description: Bind Lua handlers to skill nodes and use their gate, damage intent, and affect callbacks.
displayed_sidebar: mainSidebar
---

# Skill extension reference

A skill extension binds Lua functions to a skill node. Use a handler to filter targets, change a damage intent before defense, or act after an affect is added. For the terms used here, see the [Skills glossary](/docs/core/skills/file); for the model, see [Beyond the formula](/foundations/skills/beyond-the-formula).

## Quick start

In `conf/skill/100.ucskill.yaml`, add a handler name to a `DAMAGE` node:

```yaml
- type: DAMAGE
  id: damage
  amountPoly: '100*skill_k'
  damageType: MELEE
  handler: example_cleave
  accept:
    of: ENEMY
```

In `conf/skill/100.lua`, return a table with that name:

```lua
local M = {}

---@type DamageNodeHandler
M.example_cleave = {
    damage_intent = function(intent)
        if intent:is_back_hit(35) then
            intent.attack = math.floor(intent.attack * 1.3)
        end
    end,
}

return M
```

The handler increases the attack for a back hit before defense is subtracted. The YAML excerpt is a node in a skill's phase list, not a complete skill file; see the [skill file reference](/docs/core/skills/file) for the surrounding file.

## Files and binding

| Item | Location or shape | Purpose |
| --- | --- | --- |
| Skill file | `conf/skill/<vnum>.ucskill.yaml` | A node declares `handler: <name>`. |
| Handler module | `conf/skill/<vnum>.lua` | Returns a table keyed by handler name. |
| Handler annotations | Quest metadata stubs | Define `DamageIntent`, `AffectAppliedCtx`, `DamageNodeHandler`, and `AffectNodeHandler` for the language server. |

The skill file and module share a folder and vnum, the numeric skill identifier. The loader reads the module once per skill and stores its table in `SKILL_EXTENSIONS[vnum]`. Each call looks up the function there again. Nodes in any phase, including nested nodes, can name handlers; multiple nodes can share a name. Policy variants use the same module.

Annotate a handler with `---@type DamageNodeHandler` or `---@type AffectNodeHandler` to check its slot signatures against the stubs. A handler table must contain at least one recognized function.

## Handler slots

| Slot | Signature | Return | When it runs |
| --- | --- | --- | --- |
| `gate` | `gate(intent)` | Boolean; `false` skips the node for the target | Before the node acts on each collected target in the per-target loop. |
| `damage_intent` | `damage_intent(intent)` | Ignored | For a `DAMAGE` node, after formula and scaling, before defense. |
| `applied` | `applied(ctx)` | Ignored | For an `AFFECT` node, after the affect is added. |

Omitted slots do nothing. A slot on an incompatible node type is not called. Place effects that bypass the per-target loop do not call `gate`. Dead or stunned targets do not reach the gate.

A gate receives a `DamageIntent` with only `caster`, `victim`, and `skill` populated. Its numeric fields are 0 and `ignore_defense` is `false`. Return `true` explicitly to let the node proceed:

```lua
local M = {}

---@type DamageNodeHandler
M.example_gate = {
    gate = function(intent)
        return intent:is_back_hit(35)
    end,
}

return M
```

A `damage_intent` function changes the object in place. The engine reads that same object after the call. An `applied` function receives read-only context and runs only if the affect was added. For example, a stronger good affect of the same type and point can cause the node to return before the callback.

## Damage intent

`DamageIntent` is created for each `gate` or `damage_intent` call.

| Field | Type | Access | Meaning |
| --- | --- | --- | --- |
| `caster` | `LPCHARACTER` | Read-only | The attacker. |
| `victim` | `LPCHARACTER` | Read-only | The target. |
| `skill` | integer | Read-only | The skill vnum. |
| `attack` | integer | Writable | Attack before defense; 0 in a gate. |
| `type` | integer | Writable | The hit's `EDamageType`. |
| `ignore_defense` | boolean | Writable | Skip flat defense subtraction. |
| `damage_attribute` | integer | Writable | The `SKILL_DAMAGE_ATTR_*` bits. |

`intent:is_back_hit(deg)` returns whether the angle between caster and victim rotations is less than `deg` degrees. A value of 0 or less uses 35 degrees. It returns `false` if either character is missing.

The damage handler runs after the amount formula, battle damage calculation, splash factor, `ability_scaling`, and ranged bow distance falloff. Defense and later damage modifiers consume the edited fields afterward. Use `math.floor` when assigning a fractional calculation to `attack`.

## Affect callback context

`AffectAppliedCtx` is passed to `applied`. Its fields are read-only.

| Field | Type | Meaning |
| --- | --- | --- |
| `caster` | `LPCHARACTER` | The caster, if present. |
| `victim` | `LPCHARACTER` | The target carrying the added affect. |
| `skill` | integer | The skill vnum. |
| `affect` | integer | The affect type added. |
| `duration` | integer | Duration in seconds. |

## Ability scaling

A `DAMAGE` node can declare `ability_scaling` to scale its attack using points on the caster and victim. Use point names defined by your host:

```yaml
ability_scaling: { adder: EXAMPLE_ADDER, resist: EXAMPLE_RESIST }
```

| Key | Point read from |
| --- | --- |
| `adder` | Caster |
| `resist` | Victim |

After the splash factor, the engine uses integer arithmetic:

```text
attack = max(0, attack * (100 + caster[adder] - victim[resist]) / 100)
```

The clamp to 0 applies to every `DAMAGE` node. Without the field, or when a point name does not resolve, the corresponding points read as 0. An unknown point name does not produce a log line. Check both names against the host's point list.

## Extension boundaries

| Extension | Interface | Use |
| --- | --- | --- |
| Node handler | Lua module named by the skill vnum | Gate a target, edit a damage intent, or react to an added affect. |
| `ability_scaling` | YAML field on a `DAMAGE` node | Apply the adder and resist calculation. |
| Skill-bound trait | `traits:` on a node | Bind behavior with the lifetime of an affect. See the [traits reference](/docs/core/traits/concepts). |
| Node type | Native registration and implementation | Add a kind of node action. There are 24 live node types. |

Handlers are Lua functions; there is no native handler registration. A Lua handler cannot add a node type. An intracore skill, which runs on each core without a performer, cannot declare a handler because there is no caster to pass to it.

## Runtime behavior

- Handlers run synchronously in the combat path through a protected call. They cannot yield or wait.
- A gate runs once per collected target, not once per cast. A gate error is logged and the node runs. A gate that returns nothing is read as `false` and skips the node.
- Errors in `damage_intent` and `applied` are logged; the hit or affect continues. Changes made to an intent before an error remain in place. Make calls that can fail before writing the fields.
- Handler state is scoped to the call unless you explicitly store it elsewhere. For behavior tied to an affect's lifetime, see the [traits reference](/docs/core/traits/concepts).
- A handler load fault does not stop the core; the affected handler is unavailable. Invalid skill YAML can prevent the skill table from initializing.

## Errors

| Log line | Cause or result |
| --- | --- |
| `skill {} declares a handler but {} is missing` | The module for the skill vnum is missing. |
| `skill {} extension load error: {}` | The module failed to compile or raised a top-level error. |
| `skill {} {}.lua must return a table of handlers` | The module did not return a table. |
| `skill {} handler '{}' not found in {}.lua` | The named handler is not a key of the returned table. |
| `skill {} handler '{}' implements none of gate, damage_intent or applied` | The handler has no recognized function. |
| `skill {} gate error: {}` | The gate failed; the node runs. |
| `skill {} damage_intent error: {}` | The callback failed; the hit continues. |
| `skill {} applied error: {}` | The callback failed; the affect remains. |
| ``Skill[{}] {}: node {} declares `handler:`; an intracore cast has no caster to hand it`` | An intracore skill declares a handler; loading is refused. |

## Pitfalls

- A misspelled slot beside a valid slot loads without the "implements none" error. Test each callback.
- A gate cannot inspect the computed attack: its numeric intent fields are 0. Use `damage_intent` for a rule based on the hit.
- `has_affect` takes a numeric affect id, while `has_affect_flag` and `get_affect_value` take names. A type error aborts the callback; earlier intent edits remain.
- `damage_intent` only runs on `DAMAGE` nodes and `applied` only on `AFFECT` nodes. The loader does not check slot compatibility with the node type.
