---
title: Affect Lua API
description: Affect functions, character methods, flags, and return values.
displayed_sidebar: mainSidebar
---

# Affect Lua API

Use `affect.*` with the current quest character, an explicit VID, or a map. Character methods use the character held by `ch`.

This call adds a 90 second bonus to a character.

```lua
ch:add_affect(700, point.ATT_SPEED, 10, 0, 90, 0, true)
```

Registration functions and `is_in_macro` require no current character. Calls without a VID or map otherwise use the current quest character. Do not call them without one: `add`, `remove`, `remove_bad`, `remove_good`, `add_collect`, `add_specialization`, `add_collect_point`, `add_specialization_point`, and `get_apply_on` dereference it without a check; other calls check and return nothing.

`affect.add`, `add_collect`, `add_specialization`, `remove_collect`, and `remove_specialization` take an apply id and convert it to a point. Other functions take a point directly. Wrong-typed arguments generally log a diagnostic and return nothing (`nil`); the `find` functions raise a Lua error.

## Current character

| Function | Returns | Behavior |
| --- | --- | --- |
| `affect.add(apply_on, value, duration)` | Nothing | Adds on the converted point with type 1000 plus the current quest index, without override. An apply below 1 or at the limit logs `apply is out of range : {}`. See [pitfalls](/docs/core/affects/pitfalls) for its duplicate guard. |
| `affect.remove(type?)` | Nothing | Removes all of a type; omitted or 0 selects the current quest type. |
| `affect.remove_bad()` | Nothing | Removes poison, fire, and `IS_CLEANSABLE_AFFECT` members. Bleeding is not a member in the shipped set. |
| `affect.remove_good()` | Nothing | Removes `IS_DISPELLABLE_AFFECT` members. |
| `affect.get_apply_on(type)` | Point or `nil` | Point of the first affect of the type. |
| `affect.has_specify(type, point_on?)` | Boolean | Tests type, on any point if omitted. |
| `affect.remove_specify(type, point_on)` | Nothing | Removes the first exact type and point match. |
| `affect.add_specify(type, point?, value?, flag?, duration?, cost?, override?, is_real_time?)` | Nothing | Adds a record. Only type is required. |

`add_specify` and `add_specify_vid` default to point `POINT_NONE`, value 0, flag `AFF_NONE`, infinite duration, cost 0, `override = true`, and `is_real_time = false`. See [override behavior](/docs/core/affects/behaviour).

## Collect and specialization

Collect uses type 515 and specialization uses type 537. Each pair below has the same behavior for its respective type. All return nothing.

| Function | Behavior |
| --- | --- |
| `affect.add_collect(apply_on, value, duration)` / `affect.add_specialization(apply_on, value, duration)` | Convert apply to point, sum with an existing value there, remove it, and add the sum with the new duration. Reject an out-of-range apply. |
| `affect.add_collect_point(point_on, value, duration)` / `affect.add_specialization_point(point_on, value, duration)` | Add directly on the point without summing; calls stack. An invalid point logs `point is out of range : {}`. |
| `affect.remove_collect(apply_on, value)` / `affect.remove_specialization(apply_on, value)` | Remove the first matching converted point and exact value. |
| `affect.remove_all_collect()` / `affect.remove_all_specialization()` | Remove every record of the respective type. |

## VID and map

| Function | Returns | Behavior |
| --- | --- | --- |
| `affect.has_specify_vid(vid, type, point?)` | Boolean | Tests a player or monster; omitted point means any. |
| `affect.remove_specify_vid(vid, type, point?)` | Nothing | Removes the first exact match with a point; omitted or 0 removes all of the type. |
| `affect.add_specify_vid(vid, type, point?, value?, flag?, duration?, cost?, override?, is_real_time?)` | Nothing | Adds to a player or monster; a point at or above the limit returns silently. |
| `affect.add_specify_map(map_index, type, point?, value?, flag?, duration?, override?, is_real_time?)` | Nothing | Adds to every player on this core's map index. There is no cost argument; override matches the exact point. |

An invalid VID logs a message containing `is not a valid VID`. The `add_specify` variants do not expose `match_exact`; the map variant always uses exact-point override.

## Find records

| Function | Returns | Matching |
| --- | --- | --- |
| `affect.find(type, apply_on?, source_vid?)` | `affect.affect_data` or `nil` | First match; omitted point and source 0 mean any. |
| `affect.find_specific(type, apply_on?, flag?, source_vid?)` | `affect.affect_data` or `nil` | First match; omitted point means `POINT_NONE`. Reserved high bits are masked when comparing flags. |
| `affect.find_all(type, apply_on?, flag?, source_vid?)` | Array of `affect.affect_data` | Every match; omitted point means any. The array can be empty. |

Each requires a numeric first argument; otherwise it raises, for example, `affect.find: expected number as first argument`. Data fields are `type`, `apply_on` (point), `value`, `flag`, `duration` (remaining seconds or infinite), `sp_cost`, `source_vid`, and boolean `is_real_time`.

## Character methods

| Method | Returns | Behavior |
| --- | --- | --- |
| `ch:add_affect(type, point, value, flag?, duration?, sp_cost?, override?, match_exact?, source_vid?, is_real_time?)` | Nothing | Adds a record. Defaults: flag 0, infinite duration, cost 0, override true, match_exact false, source 0, real-time false. |
| `ch:remove_affect(type)` | Nothing | Removes all of the type. |
| `ch:remove_damage_over_time(affect_type)` | Boolean | Removes poison, fire, or bleeding and cancels its tick event; returns false for other types. |
| `ch:remove_bad_affect(remove_dispel?)` | Number removed | Removes poison, fire, and cleansable types. With false, keeps `IS_DISPEL_CURSE_AFFECT`; default true. |
| `ch:remove_good_affect()` | Number removed | Removes dispellable types. |
| `ch:has_affect(type, point?, source_vid?)` | Boolean | Omitted point and source 0 mean any. |
| `ch:get_affect_value(name)` | Number | First value for the type name, or 0. |
| `ch:has_affect_flag(name)` | Boolean | Tests an `AFF_` bit name, not a type name. |

`party.member_has_affect(affect, apply)` tests a party member; see the party API for its context.

## Registration functions

These functions need no character and only add entries. See [registration](/docs/core/affects/registration) for load order and merging.

| Function | Returns | Behavior |
| --- | --- | --- |
| `affect.add_name_definition(name, value)` | Nothing | Adds a type name and id to the engine and `affect.name_map`. |
| `affect.add_no_save(type)` | Nothing | Excludes the type from saving. |
| `affect.add_no_clear_on_death(type)` | Nothing | Keeps the type on death. |
| `affect.add_broadcastable(type)` | Nothing | Sends the type to viewers. |
| `affect.add_to_macro(macro_name, type)` | Nothing | Adds a member, creating the macro if needed. |
| `affect.is_in_macro(macro_name, value)` | Boolean | Tests membership; an unknown macro returns false. |

## Tables, constants, and flags

- `affect.name_map` maps built-in and Lua-registered type names to ids. Some engine types are not present, so it is not an exhaustive allocation registry.
- `affect.bit_map` maps `AFF_` names to bit numbers and is the live list to consult for flag names.
- The AFF bitfield has 96 bits. Bit 0 is reserved for `AFF_NONE`, leaving 95 usable; 91 are taken and 92 to 95 are free. Flags at or below 0 or at or above 96 are rejected as bit flags; 0 is the no-flag value for an affect.
- `affect.INFINITE_AFFECT_DURATION` is `60 * 365 * 24 * 60 * 60` seconds, defined in the shared quest library wherever it is loaded.
- The range names are `SKILL_START` 1, `SKILL_END` 400, `GUILD_SKILL_START` 151, and `GUILD_SKILL_END` 160.

See [overview](/docs/core/affects/overview) for terminology and [examples](/docs/core/affects/examples) for calls in context.
