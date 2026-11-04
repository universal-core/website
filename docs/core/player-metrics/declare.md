---
title: Declaring metrics
description: Metric declarations, signals, filters, and validation.
displayed_sidebar: mainSidebar
---

# Declaring metrics

A declaration names a metric and defines its source and aggregation. The catalog is the collection of declarations. Put declarations in the `metrics:` map of `metrics.yaml` and restart the game core after editing it.

```yaml
metrics:
  kill.stone: { from: kill, where: { type: [STONE] }, agg: count }
  crafts.attempted: { from: custom, agg: count }
```

A signal is a native event with operands that can feed metrics. A push is a call that supplies a value or key. Signal-derived metrics use native signals; custom metrics receive pushes from either C++ or Lua. See the [overview](/docs/core/player-metrics/overview) for aggregations.

## Declaration keys

Names are persistent keys of at most 64 characters. Each value is a map with these fields:

| Key | Values | Purpose |
| --- | --- | --- |
| `from` | `kill`, `damage`, `skill`, `item_use`, `custom` | Required source. |
| `agg` | `count`, `sum`, `max`, `min`, `distinct` | Aggregation; defaults to `count`. |
| `where` | Operand lists and `predicate` | Filters a signal. |
| `key` | Signal operand name | Supplies the key for signal-derived `distinct`. |
| `domain.kind` | `map`, `mob`, `item`, `custom` | Describes distinct keys. |
| `domain.max_keys` | Integer | Limits the number of distinct keys. |
| `allow_virtual` | Boolean | Allows custom pushes during a virtual session. |

A virtual session is described in [player virtualization](/docs/core/player-virtualization/overview). `allow_virtual` defaults to `false` and is refused for signals. Enable it only when the value belongs to the session and the code that owns the episode makes the push. A distinct metric without `max_keys` is unbounded and logs a warning. Custom declarations cannot have `where` or `key`; pass the key to `add_key` instead.

## Filters and tokens

A predicate is a Lua function named in `where.predicate` that is called last, after integer operand tests. Forges register predicates in the global `METRIC_PREDICATES` table before the engine reads declarations. See [predicates](/docs/core/player-metrics/api#predicates) for the function contract.

`where` is a flat map of operand names to lists. Values can be integer operands or supported tokens. Ordinary lists test membership. `flags` and `target_flags` are bit words: the list is OR-ed and any matching bit passes.

| Operand | Token vocabulary |
| --- | --- |
| Kill `type` | Character types such as `STONE` and `PC`. |
| Kill or damage `rank` | Ranks from `PAWN` through `KING`. |
| Damage `type` | Damage types, including `"TRUE"`. |
| Damage `flags` | Stats flags such as `CRITICAL` and `PENETRATE`. |
| Skill `grade` | `NORMAL`, `MASTER`, `GRAND_MASTER`, `PERFECT_MASTER`. |
| Skill `target_flags` | Shared skill flags. |

Quote `"TRUE"` and other YAML boolean-like tokens; bare values may be parsed as booleans and refused. These complete lines show different declaration shapes:

```yaml
kill.stone: { from: kill, where: { type: [STONE] }, agg: count }
kill.boss: { from: kill, where: { rank: [BOSS] }, agg: distinct, key: vnum, domain: { kind: mob, max_keys: 256 } }
region.visited: { from: custom, agg: distinct, domain: { kind: map, max_keys: 256 } }
currency.peak: { from: custom, agg: max }
episode.won: { from: custom, agg: count, allow_virtual: true }
```

## Native signals

Only C++ emits signals. The subject must be a player. Index operands route declarations efficiently; they can also be used as filters or distinct keys.

| Signal | When it fires | Operands | Index | Value |
| --- | --- | --- | --- | --- |
| `kill` | A qualifying monster or player dies. | `vnum`, `type`, `rank`, `is_pc`, `empire`, `map_index`, `level_delta` | `vnum` | 1 |
| `damage` | A qualifying hit resolves. | `damage`, `type`, `skill_vnum`, `flags`, `critical`, `pierce`, `death_blow`, `rank` | `skill_vnum` | Clamped damage. |
| `skill` | A skill is used. | `vnum`, `level`, `grade`, `type`, `target_flags` | `vnum` | 1 |
| `item_use` | An item use succeeds. | `vnum` | `vnum` | 1 |

Damage `rank` is the target's rank. The monster kill follows the reward path and credits the player who dealt the most damage. The damage signal excludes targets such as fixed training dummies. Quest items do not emit `item_use`; push a custom metric from their use handler instead.

## Native pushes

Six native C++ push sites exist alongside the signals. They include currency-handling sites that push a peak balance, a crafting site, a catch counter, and a pair-forming site. They write custom metrics through the same aggregation and virtual-session rules as Lua. A custom metric can also be pushed by a quest or forge. An unknown name at a native push logs a refusal.

## Declaration order

The first declaration of a name wins. A duplicate returns `0` and is logged; a refused YAML entry fails boot. Forges load before `metrics.yaml`, so Lua `declare` is safe only at forge load for a name absent from that file. Prefer the file. A name declared in both places is a duplicate and fails boot.

A block is the per-character record of metric values. A metric declared after boot returns `false` from `add` and `add_key` for characters already online, with no log, because their block was sized at boot. Restart the core to establish the catalog before characters connect.

## Refusals

Every refused file entry fails initialization. Check the preceding log for the name and cause.

| Refusal | Fix |
| --- | --- |
| File unreadable or invalid | Fix the file or its YAML syntax. |
| Missing `metrics` map | Add the top-level map. |
| Missing or unknown `from` | Select a signal or `custom`. |
| Unknown `agg` | Select a supported aggregation. |
| Duplicate name | Declare the name once. |
| Unknown operand or token | Use an operand and token for that signal. |
| Empty, scalar, or invalid filter list | Supply a nonempty list of valid values. |
| Unregistered predicate | Register its name before declarations load. |
| `where` or `key` on `custom` | Remove the signal-only field. |
| Signal-derived `distinct` without `key` | Name its key operand. |
| `allow_virtual` on a signal | Use a custom declaration instead. |

The final initialization failure line can contain a literal `%s`; use the earlier diagnostic to locate the entry. The [Lua API](/docs/core/player-metrics/api) documents `declare` and push return values.
