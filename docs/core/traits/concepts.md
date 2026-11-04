---
title: Trait concepts
description: Choose a trait and follow its gate, hooks, and state.
displayed_sidebar: mainSidebar
---

# Trait concepts

A trait gives a character behavior while a bound [affect](/docs/core/affects/overview) is present. Use one for a condition, a counter, or a change at a formula position. For an unconditional flat point bonus, use an affect point.

A definition describes behavior. A binding associates that definition with an affect type and formulas. Adding an affect of that type opens the gate; removing the last one closes it. See [Traits foundations](/foundations/traits/) for the model.

## Glossary

| Term | Meaning |
| --- | --- |
| Definition | The trait's ID, hooks, stage, and counter declarations. |
| Binding | An association between a definition and an affect type, with named formulas. |
| Gate | The presence of an affect of a bound type on a character. |
| Hook | A callback invoked for a subscribed event or position. |
| Transform hook | A hook that can change the damage or heal being computed. |
| Observer hook | A hook that observes an event without changing its computed value. |
| `ctx` | The per-character, per-binding context for state and operations. |
| Stage | Ascending order among traits at a staged formula position. |
| Formula position | A point in an engine calculation or decision where traits participate. |
| Bump point | Temporarily add to a character point during a guarded damage computation. |
| Trigger mask | Bits identifying the events a trait subscribes to. |
| Forge | The environment that loads and runs the Lua definition. |
| Native trait | A C++ implementation registered with the native registry. |
| Lua trait | A definition and hooks registered through Forge Lua. |

## Where to go next

- [Define a trait](./define.md): hooks, context, counters, and bumps.
- [Stage and formula positions](./stage.md): ordering and reachable positions.
- [Bind a trait](./binding.md): connect a definition to an affect.
- [Register a native trait](./native.md): C++ registration and point limits.
- [Examples and pitfalls](./examples.md): small recipes and common traps.
