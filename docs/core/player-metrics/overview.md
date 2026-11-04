---
title: Player metrics
description: Declare, write, and read per-character metrics.
displayed_sidebar: mainSidebar
---

# Player metrics

A player metric is a named number or set of integer keys stored for each character. A declaration specifies how the value is collected and aggregated. The catalog is the collection of declared metrics. A push is a call that supplies a value or key; a signal is a native event carrying operands that can feed declarations.

## Quick start

Declare a signal counter and a custom counter in `metrics.yaml`:

```yaml
metrics:
  kill.stone: { from: kill, where: { type: [STONE] }, agg: count }
  crafts.attempted: { from: custom, agg: count }
```

A forge can push the custom counter and log its value when its code handles an attempt:

```lua
local function record_attempt(ch)
    local metrics = forge.sys.game.metrics
    metrics.add(ch, "crafts.attempted", 1)
    sys_log(0, "crafts.attempted = " .. metrics.get(ch, "crafts.attempted"))
end
```

Call `record_attempt` from the code handling the attempt. The native kill signal feeds `kill.stone`; it needs no separate push. Restart the game core after changing declarations, then use `/metric get <pg_name> kill.stone` to inspect a character.

## Glossary

| Term | Meaning |
| --- | --- |
| Declaration | A named metric's source, aggregation, and options. |
| Catalog | The collection of declared metrics. |
| Signal | A native event with operands that can feed metrics. |
| Push | A call that supplies a value or key to a metric. |
| Consumer | Code that reads metrics or subscribes to changes. |
| Seeded | The metric was ever written for this character. |
| Block | The per-character record of metric values. |
| Dirty queue | The queue of characters with unpublished changes. |
| Heartbeat | The periodic game-core tick. |
| Sweep | The pass that drains the dirty queue each heartbeat and publishes the change event. |
| Predicate | A Lua function named in `where.predicate` that is called last. |
| Virtual session | A session described in [player virtualization](/docs/core/player-virtualization/overview). |

## Files and setup

| Item | Location or purpose |
| --- | --- |
| Declarations | `metrics.yaml` in the locale folder. |
| Lua API | `forge.sys.game.metrics` in forges and quests. |
| Predicates | Forges register functions in global `METRIC_PREDICATES`. |
| Scalar storage | `player_stat` stores character, metric name, and value. |
| Set storage | `player_stat_set` stores character, metric name, and key. |

Forges load and register predicates before the engine reads `metrics.yaml`. Consumers can subscribe to the change event and inspect the catalog in `when boot`, after declarations load. A predicate is a Lua function named in `where.predicate` that runs after the integer filters. See [declaring metrics](/docs/core/player-metrics/declare) for the schema and the [Lua API](/docs/core/player-metrics/api) for subscription.

The engine reads the file at boot. Restart the game core to apply changes. Metric names are persistent storage keys; renaming one requires a data migration.

## Aggregations and values

| `agg` | Result of a matching signal or push |
| --- | --- |
| `count` | Adds one per signal or the pushed delta. |
| `sum` | Adds the measured signal value or pushed delta. |
| `max` | Keeps the highest value. |
| `min` | Keeps the lowest value. |
| `distinct` | Keeps a set of integer keys. |

`damage` supplies its measured damage; other signals supply one. A custom push supplies its delta. For `distinct`, `get` returns the set size and `keys` returns the keys. An unwritten metric reads zero, so check `is_seeded` before interpreting zero for `min`. Zero can itself be a written minimum or maximum.

The engine ignores a zero delta for `sum`. A push that leaves the value unchanged returns `false` and does not enqueue a change. The aggregations retain totals, extremes, or set membership; they do not provide a reset operation.

## Behaviour

A block is the per-character record of metric values. The engine saves changed values and newly added keys. A row with an undeclared name is logged and ignored on load. In-memory blocks belong to one game core; database rows provide persistent storage.

A virtual session is described in [player virtualization](/docs/core/player-virtualization/overview). Pushes from one return `false` unless a custom declaration opts in with `allow_virtual`. Signal-derived declarations cannot opt in. Use the option only when the value belongs to the virtual session and the code that owns the episode makes the push.

A consumer is code that reads metrics or subscribes to their change event. Changed characters enter the dirty queue, the queue of characters with unpublished changes. Each heartbeat, the periodic game-core tick, runs a sweep: the pass that drains the queue and publishes the change event. Publication and database saves have separate schedules. See [examples and pitfalls](/docs/core/player-metrics/examples) for setup checks and initial data.
