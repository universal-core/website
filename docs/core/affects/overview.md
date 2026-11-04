---
title: Affects overview
description: Choose, register, and use a timed character affect.
displayed_sidebar: mainSidebar
---

# Affects overview

An affect is a typed record on a character with a point, value, duration, flag, and cost. Use it for a buff, debuff, item blend, or other state that must expire, persist, stack, or appear to viewers.

This forge module registers a type and grants a 10 minute movement bonus.

```lua
affect.add_name_definition("MY_BUFF", 700)
affect.add_no_save(affect.name_map.MY_BUFF)

local function grant_speed(ch, amount)
    ch:add_affect(affect.name_map.MY_BUFF, point.MOV_SPEED, amount, 0, 600, 0, true)
end

local function revoke_speed(ch)
    ch:remove_affect(affect.name_map.MY_BUFF)
end
```

Call `grant_speed(ch, 20)` with a character to increase movement speed by 20. The engine undoes the bonus on expiry; this type is not saved. Register names at the top level of a forge game environment or a module it loads. Check the id before using it; see [registration](/docs/core/affects/registration).

## Glossary

| Term | Meaning |
| --- | --- |
| Affect / type | A record on a character / its numeric kind. Multiple records can share a type. |
| Point | A character property changed by the record, such as movement speed. |
| Apply versus point | An apply id is converted to a point by some helpers. Other calls take the point directly; `apply_on` in returned data holds a point. |
| Flag / `AFF` bit | A bit number in the separate character flag channel. `0` sets no bit. |
| Macro | A named set of affect types used for classification. |
| Broadcastable | A type whose affect state is sent to characters' viewers as well as the owner. |
| No-save | A type excluded from database persistence. |
| No-clear-on-death | A type kept when death clears affects. |
| Forge | A Lua module environment that runs registration and game scripts; see [Forge setup](/docs/core/luna-forge/setup). |
| Avatar / virtual character | A character represented as virtual to the engine; late-viewer affect replay treats it differently. |
| Override | An add option that replaces a matching record instead of always appending one. |
| `match_exact` | An override option that requires the same point. |
| Source VID | The runtime character identifier associated with the source of an affect. |
| Real-time | A duration that also elapses while the player is offline. |

## Three places shape an affect

Lua registers types and adds or removes records. `affect_config.yaml` classifies types for persistence, death, broadcast, and macros. The client registers the particle and icon for types that need a visible presentation. A server affect works without a client effect.

| Material | Location or surface |
| --- | --- |
| Lua registration and use | A forge game environment, its modules, or quests; character methods need a character. |
| `affect_config.yaml`, `items_affect.yaml` | In your locale base folder. |
| `affect_class` | An `AFFECT` node in a skill file. |
| Client presentation | Client Python effect registration and `AFFECT_DATA_DICT`. |

File locations vary by codebase. Registrations and configuration load at boot.

## Find the detail you need

| Page | Contents |
| --- | --- |
| [Registration](/docs/core/affects/registration) | Id ranges, configuration, macros, item and skill declarations, load order. |
| [Lua API](/docs/core/affects/lua-api) | Functions, character methods, arguments, constants, and flags. |
| [Client](/docs/core/affects/client) | Particles, icons, client state, and events. |
| [Behaviour](/docs/core/affects/behaviour) | Lifetime, saving, override, and broadcast. |
| [Examples](/docs/core/affects/examples) | Working registration and usage patterns. |
| [Pitfalls](/docs/core/affects/pitfalls) | Symptoms, causes, and fixes. |
