---
title: Registering native traits
description: Register a C++ trait and bind it to an affect.
displayed_sidebar: mainSidebar
---

# Registering native traits

A native trait is a stateless `INativeTrait` singleton. Register its class with `REGISTER_NATIVE_TRAIT`; hook macros declare the override and its trigger bit together. Per-character data belongs to the trait node, reached through `ctx.pkTraits` and `ctx.bindingId`.

## Registration and binding

| Operation | Interface |
| --- | --- |
| Identity, order, counters | `TRAIT_ID`, `TRAIT_STAGE`, `TRAIT_COUNTERS` |
| Hooks | `TRAIT_ON_*` macros; targeting uses `TRAIT_BLOCKS_TARGETING` |
| Register | `REGISTER_NATIVE_TRAIT(Class)` at static initialization |
| Bind | `CCharTraitsManager::instance().BindTrait(id, affect, formulas, &created)` |
| Unbind | `UnbindTrait(binding_id)` |
| Prime constants | `ch->Traits().PrimeConstants(binding, values)` |

Registration defines behavior; it does not open a gate. The skill loader binds native traits through `BindTrait`. Lua `forge.sys.game.traits.bind` is the second binding door. See [binding](./binding.md).

`BindTrait` resolves native IDs before Lua definitions, returns `0` for an unknown ID, and reuses a binding for the same ID and affect type, replacing formulas. `created` distinguishes a new binding from a reused one; only release a binding your code created. Duplicate native IDs are rejected. A registration without hooks is logged.

Native hooks are `const`. `ctx.Formula`, `ctx.Constant`, `ctx.GateValue()`, and `ctx.EndSelf()` access binding data. Native `ctx.Formula` supplies `dam` from `ctx.iDamage` in a transform and zero elsewhere. Transform contexts carry mutable `ctx.iDamage`, `ctx.iDamageType`, and `ctx.wSkillVnum`.

## Native point limits

`TRAIT_POINT_LIMIT` supplies an upper cap for a point while the trait is active. Return `0` for no opinion. The highest claim wins; stage does not order this operation. It cannot lower a cap and has no context or Lua equivalent.

See [formula positions](./stage.md) for the positions reachable from Lua.
