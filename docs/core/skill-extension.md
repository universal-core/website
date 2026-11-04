---
title: Skill extension reference
description: "Reference for the Lua handlers of a skill node: the gate, damage_intent and applied slots, how a handler file binds to a skill, the DamageIntent and AffectAppliedCtx fields, ability_scaling, the C++ registration table, the load errors and the traps."
displayed_sidebar: mainSidebar
---

# Skill extension reference

A skill is data: a YAML file with nodes that say who is hit, for how much, and which affect is raised. A skill extension is the part that data cannot say. A node names a **handler**, a table of Lua functions that runs for one node, one target, one cast. It can skip the node for a target, reshape the hit before defence is subtracted, or act after an affect has landed.

You reach for a handler when the rule needs to look at something the config cannot name: whether the caster stands behind the victim, which weapon is in hand, a combo frame. Uniform arithmetic stays in the YAML, and `ability_scaling` covers the adder and resist case. Anything that has to outlive the cast belongs to a [trait](/docs/core/traits), gated by the affect the skill raises. The reasoning behind the split is in [Beyond the formula](/foundations/skills/beyond-the-formula).

## Quick start

Two files next to each other in the skill config folder, `Locale/conf/skill/`. The skill file names the handler on the node, and the Lua file returns a table that holds it. This is the damage node of skill 31, whole:

```yaml
- type: DAMAGE
  id: dmg
  amountPoly: 700*skill_k+(calc_precision_rate*4)+(point_TOTAL_PHYS_ATT*1.9)
  damageType: MELEE
  ability_scaling: { adder: AMSEOP_ADDER, resist: AMSEOP_RESIST }
  handler: amseop
  collect:
    search: { radius: 130, take: 6 }
    scalePoly: '0.8'
  accept:
    of: ENEMY
```

And `31.lua`, the module the handler comes from, whole:

```lua
-- AMSEOP (Tranello): back hit, stealth and dagger each raise the blow.
local M = {}

---@type DamageNodeHandler
M.amseop = {
    damage_intent = function(intent)
        local m = 1.0
        if intent:is_back_hit(35) then m = m + 0.3 end
        if intent.caster:has_affect_flag("EUNHYUNG") then m = m + 0.25 end
        if intent.caster:weapon_is("DAGGER") then m = m + 0.5 end
        intent.attack = math.floor(intent.attack * m)
    end,
}

return M
```

Every hit of the skill is computed from the formula, scaled by the adder and resist points, and then handed to `damage_intent` with defence not yet subtracted. The function writes the new `attack` back, and defence, penetration and the percentage modifiers work on that value.

## Files and setup

| What | Where | Notes |
| --- | --- | --- |
| Skill file | `Locale/conf/skill/<vnum>.ucskill.yaml` | A node declares `handler: <name>`. |
| Handler module | `Locale/conf/skill/<vnum>.lua` | Same folder, same vnum. Returns a table whose keys are handler names. |
| Colocated trait | `Locale/conf/skill/traits/<id>.lua` | Loaded when a node binds a trait id that nothing else defines. See [Traits from a skill node](#traits-from-a-skill-node). |
| Handler stubs | `skill.lua` in the quest `meta` folder | The `DamageIntent`, `AffectAppliedCtx`, `DamageNodeHandler` and `AffectNodeHandler` classes. |

The binding is by vnum and by name, with no registration call:

- `handler:` is read on every node type, including nodes nested inside other nodes, in all three phase lists of the skill.
- The loader reads `<vnum>.lua` once per skill and stores the returned table at `SKILL_EXTENSIONS[vnum]`. Two nodes of one skill can name the same handler or different ones.
- The handler name is a key of the returned table, and its value is a table with up to three functions: `gate`, `damage_intent`, `applied`. The loader checks which of the three are functions and flags the node accordingly.
- Policy variants of a skill (the per-mode copies) answer to the same `<vnum>.lua`.

Every call looks the function up again in `SKILL_EXTENSIONS`, so C++ holds no Lua reference. Annotate the table with `---@type DamageNodeHandler` or `---@type AffectNodeHandler` and the language server checks the slot signatures against the stubs.

## Handler slots

| Slot | Signature | Returns | Node types | Runs |
| --- | --- | --- | --- | --- |
| `gate` | `gate(intent)` | `boolean`, `false` skips the node | Any node that goes through the per-target loop | Once per collected target, before the node acts on it. |
| `damage_intent` | `damage_intent(intent)` | nothing, the return value is ignored | `DAMAGE` | Once per target, after the formula and `ability_scaling`, before defence. |
| `applied` | `applied(ctx)` | nothing | `AFFECT` | Once per target, after the affect was really added. |

A slot you leave out does nothing. A handler table with none of the three logs an error at load.

**`gate`.** The argument is a `DamageIntent` with only `caster`, `victim` and `skill` filled. The numeric fields are 0 and `ignore_defense` is `false`, so a gate reads who is involved and nothing about the hit. Targets that are dead or stunned never reach the gate. Nodes that act on a place rather than on victims (the ambience effect and the ground decal) skip the per-target loop, so they never call it.

This is the shipped gate of the knockback node of skill 32, with the table it reads:

```lua
local PUSH_SEQUENCE = { [0] = 3, [1] = 4, [2] = 5, [3] = 5 }

---@type DamageNodeHandler
M.gungsin_push = {
    gate = function(ctx)
        local c = ctx.caster
        local idx = math.min(3, c:get_combo_index())
        if c:get_combo_sequence() ~= PUSH_SEQUENCE[idx] then return false end
        if c:combo_interval() >= 1100 then return false end

        local v = ctx.victim
        if v:is_stone() or v:is_door() or v:is_meteor() or v:is_ai_teleport() then return false end
        return true
    end,
}
```

**`damage_intent`.** The function edits the intent in place. It may return the intent, which changes nothing: the engine reads the fields back from the same object. The order inside one hit is trait pre hooks and bump points, the amount formula, the battle damage calculation, the splash factor, `ability_scaling`, the bow distance falloff for ranged damage, **`damage_intent`**, then the defence stage, the skill damage shield, the damage itself and the trait post hooks. On a test server every `DAMAGE` node prints its breakdown to the chat: pure damage, base after defence, percentage bonus and second type modifiers.

**`applied`.** The argument is an `AffectAppliedCtx`, all read-only. It runs only when the affect was added. When the victim already carries a stronger good affect of the same type and point, the node returns early and `applied` does not fire. This is the shipped `250.lua`, the first handler that uses the slot, whole:

```lua
local M = {}

---@type AffectNodeHandler
M.rage = {
    applied = function(ctx)
        ctx.victim:play_spawn_motion()
        forge.game.rage.consume_charge(ctx.victim)
    end,
}

return M
```

## The ctx fields

`DamageIntent` is what `gate` and `damage_intent` receive. A new one is built for each call.

| Field | Type | Access | Meaning |
| --- | --- | --- | --- |
| `caster` | `LPCHARACTER` | read-only | The attacker. |
| `victim` | `LPCHARACTER` | read-only | The target. |
| `skill` | integer | read-only | The skill vnum. |
| `attack` | integer | writable | The attack before defence. In a gate it is 0. |
| `type` | integer | writable | The `EDamageType` of the hit. |
| `ignore_defense` | boolean | writable | Skip the flat defence subtraction. |
| `damage_attribute` | integer | writable | The `SKILL_DAMAGE_ATTR_*` bits. |

`DamageIntent:is_back_hit(deg)` returns `true` when the caster strikes the victim from behind: the angle between their rotations is under `deg` degrees, and `0` or less means 35. It returns `false` when either character is missing.

The four writable fields are the part of the hit a handler is allowed to decide. Defence, penetration, pierce and the percentage modifiers consume them afterwards, so a handler shapes the blow and never edits a result. That is why the hook sits before defence: a `+30%` from behind multiplies the attack before the armour is taken off, which is how the number reads. The shipped handlers wrap their result in `math.floor`.

`AffectAppliedCtx` is what `applied` receives.

| Field | Type | Meaning |
| --- | --- | --- |
| `caster` | `LPCHARACTER` | The caster, if present. |
| `victim` | `LPCHARACTER` | The target that now carries the affect. |
| `skill` | integer | The skill vnum. |
| `affect` | integer | The affect type that was added. |
| `duration` | integer | The duration in seconds. |

The character methods a handler calls are the ones of `LPCHARACTER`. These are the ones the shipped handlers use:

| Method | Argument | Notes |
| --- | --- | --- |
| `has_affect` | an affect id | Takes a **number**: `affect.name_map.POISON`. |
| `get_affect_value` | an affect name | Takes a **name**: `"SLOW"`. Returns 0 when the affect is not there. |
| `has_affect_flag` | a flag name | Takes a **name**: `"EUNHYUNG"`. |
| `weapon_is` | a weapon type name | `"DAGGER"`. |
| `get_combo_index`, `get_combo_sequence`, `combo_interval` | none | The combo state of the caster. |

## ability_scaling

`ability_scaling` is the declarative sibling of the handler. It is a field of a `DAMAGE` node that takes two point names, and the engine applies it with no Lua involved.

```yaml
ability_scaling: { adder: SAMYEON_ADDER, resist: SAMYEON_RESIST }
```

After the splash factor, the engine scales the hit with integer arithmetic:

```text
attack = max(0, attack * (100 + caster[adder] - victim[resist]) / 100)
```

| Key | Meaning |
| --- | --- |
| `adder` | The point read on the caster. |
| `resist` | The point read on the victim. |

The clamp at 0 runs on every `DAMAGE` node, with or without the field. Without it, or with a name that does not resolve, both points read as 0 and the factor is 100 percent. 31 skill files carry the field today. Use it for a bonus that is the same arithmetic on every cast, and put a condition in a handler.

## Traits from a skill node

A node that raises an affect can bind a trait to that affect. The trait lives as long as the affect does, which a handler cannot do. This is the trait entry of skill 64:

```yaml
traits:
- id: terror
  # `power` is the trait's name for it, `skill_power` the skill's; the constant
  # is the bridge, and it is what lets the description read the formula itself.
  constants:
    power: skill_power
  formulas:
    reduction_pct: 5+power/40
```

`traits:` is always a list of entries with an `id`, and optionally `constants`, `formulas` and `params`. `counters:` on a node binds the native `skill_ledger` trait with the counter list. The loader binds the id when the trait framework already knows it, native or defined in Lua, and otherwise loads the colocated `traits/<id>.lua`, which is expected to call `forge.sys.game.traits.define`. If nothing resolves the id, the load logs `skill {} declares trait [{}] on affect {}, which resolves to no native, Lua or colocated trait` and the node gates nothing. The hooks, the ctx and the binding API are in the [traits reference](/docs/core/traits).

## C++ registration

The handler slots are Lua only. C++ calls into `SKILL_EXTENSIONS` and nothing else, so a skill that needs native behavior gets it from the other doors in the table. The table says which door is open from which side and what ships through it.

| Door | C++ | Lua | What ships |
| --- | --- | --- | --- |
| Node handler (`gate`, `damage_intent`, `applied`) | None. There is no native handler registrant. | `<vnum>.lua` returning a handler table, named by `handler:` | 8 files in the skill folder, all Lua. |
| `ability_scaling` | Applied by the engine from the two point names | None, it is a YAML field | 31 skill files. |
| Skill-bound trait | `REGISTER_NATIVE_TRAIT` at static initialisation, bound by the skill loader | `forge.sys.game.traits.define`, from a forge or a colocated `traits/<id>.lua`, bound by the skill loader | Native: `attack_buff_erosion`, `buff_def_erosion`, `dash`, `hosin_ward`, `mana_shield`, `stealth`, `terror`, `weapon_bound`, and `skill_ledger` through `counters:`. Lua: `guild_bulwark` and `stellar_ward`. |
| Node type | The node enum, the name table, a parse case and an execute case, compiled in | None | 23 types. |

The C++ door of the handler is empty: a native trait covers the stateful case, and a node type covers a new kind of action. A Lua handler cannot add a node type, spawn a projectile or drive a multi-stage skill. Those are node data. The native trait API is in the [C++ registration](/docs/core/traits#c-registration) section of the traits reference.

## Behavior

- A handler runs synchronously inside the combat path through a protected call. It cannot yield or wait.
- A `gate` runs per target. A gate on a collector, or on any node with several targets, runs once for each, so a counter in a gate advances per target and not per cast.
- A `gate` that raises an error returns `true` and the node runs: a broken script never drops a node silently.
- A `gate` that returns nothing is read as `false` and skips the node. Return `true` explicitly.
- An error in `damage_intent` or `applied` is logged and the hit goes on with whatever the intent holds.
- Handlers are meant to be stateless and scoped to one cast. State that must survive between hits goes in a Lua global, as the Ball-Em-Up handlers do, or in a trait.
- An intracore skill, one cast on every core with no performer, may not declare a handler: it has no `caster` to hand over.

## Errors

A handler fault at load never stops the game core. The node stays inert and the skill loads. A fault in the YAML itself is different: the skill table does not initialise and the core exits. A config fault is a typo an author can see, a script fault is a runtime condition.

| Log line | Cause |
| --- | --- |
| `skill {} declares a handler but {} is missing` | The skill has a `handler:` and the `<vnum>.lua` file is not in the folder. |
| `skill {} extension load error: {}` | The file did not compile or raised an error at the top level. |
| `skill {} {}.lua must return a table of handlers` | The file does not end in `return M` with a table. |
| `skill {} handler '{}' not found in {}.lua` | The name in `handler:` is not a key of the returned table. |
| `skill {} handler '{}' implements none of gate, damage_intent or applied` | The table exists but has none of the three functions. |
| `skill {} gate error: {}` | The gate raised an error. The node runs. |
| `skill {} damage_intent error: {}` | The handler raised an error. The hit is kept. |
| `skill {} applied error: {}` | The handler raised an error. The affect stays. |
| ``Skill[{}] {}: node {} declares `handler:`; an intracore cast has no caster to hand it`` | A handler on an intracore skill. This one is a config fault and refuses the load. |

## Pitfalls

**A slot on the wrong node type does nothing and says nothing.** `damage_intent` is called only from the damage node and `applied` only from the affect node. The loader flags the slots from the table and does not compare them with the node type. Put `damage_intent` on a `DAMAGE` node and `applied` on an `AFFECT` node.

**A misspelled slot name is silent next to a valid one.** The "implements none" line appears only when the table has no valid slot at all. A handler with a good `gate` and a misspelled `damage_intent` loads clean and never reshapes a hit. Read the syserr after the skills load and test every slot.

**The dagger bonus disappears with the rest of the handler.** `has_affect` was called with a name, `intent.victim:has_affect("POISON")`. It takes a number, so the call fails with a type error, the whole `damage_intent` is aborted and every bonus in it is lost. Pass `affect.name_map.POISON`. `has_affect_flag` and `get_affect_value` take names.

**A failed handler leaves half its work behind.** The intent is passed by reference and nothing restores it when the function errors. A handler that sets `intent.attack` and then raises keeps the new attack. Do the calls that can fail first and write the fields last.

**A gate counter counts targets.** The gate runs once for every collected target. A counter that is meant to count casts needs the target filtered, or belongs in a trait.

**`ability_scaling` with a mistyped point name scales nothing.** An unknown name resolves to the null point, which reads as 0, and no line is logged. Check the name against the point list.

**The gate sees no attack.** In a `gate` the intent carries `caster`, `victim` and `skill` only. A rule that depends on the hit goes in `damage_intent`.

## See also

- [Beyond the formula](/foundations/skills/beyond-the-formula): why skills split into data, handlers and traits.
- [Traits reference](/docs/core/traits): the framework a skill-bound trait runs in.
