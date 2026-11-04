---
title: Stage and formula positions
description: Order trait callbacks and choose where they act.
displayed_sidebar: mainSidebar
---

# Stage and formula positions

A stage orders traits at a staged formula position. Each transform receives the previous transform's output. Declare `stage` on a Lua definition or `TRAIT_STAGE(n)` on a native trait; the default is `0`.

## Ordering a chain

This invented chain shares one final damage position:

| Stage | Trait | Order |
| --- | --- | --- |
| 0 | `ward_a` | First |
| 10 | `ward_b` | Second |
| 20 | `bonus_c` | Third |

Native and Lua traits interleave in ascending stage order. Within a stage, character nodes run in creation order. A trait attached during dispatch does not run in that round. Target scanning stops when a trait hides the owner.

Stage applies to `on_damage_taken_raw`, `on_damage_taken_final`, `on_damage_dealt_final`, `on_heal_taken_pre`, `on_hit_resolved`, `on_attack`, and `on_target_scan`. Other hooks ignore stage: native nodes run first, then Lua nodes, each in node order.

## Positions

| Position | Lua hook | Effect |
| --- | --- | --- |
| Attacker damage intent | `on_damage_dealt_pre` | Bump points inside the guard. |
| Victim damage intent | `on_damage_taken_pre` | Bump points inside the guard. |
| Before defense | `on_damage_taken_raw` | Change `ctx.damage`. |
| After amplifiers, attacker | `on_damage_dealt_final` | Change `ctx.damage` before victim transforms. |
| After amplifiers, victim | `on_damage_taken_final` | Change `ctx.damage`. |
| Resolved hit | `on_hit_resolved` | Observe damage and flags; may end the gate. |
| Attack motion | `on_attack` | Observe; may end the gate. |
| Target acquisition | `on_target_scan` | Return true to hide the holder. |
| Received heal | `on_heal_taken_pre` | Change `ctx.amount`. |
| Point limit | None | Native-only `TRAIT_POINT_LIMIT` raises an upper cap. |

The damage intent hooks are guarded bump sites, but are not stage ordered. Lua reaches the other positions in the table except point limit. Transform damage is rounded and clamped at zero. See [hooks](./define.md#hooks) and [native registration](./native.md).
