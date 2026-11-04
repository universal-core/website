---
title: Examples and pitfalls
description: Examples, initial data, and checks for player metrics.
displayed_sidebar: mainSidebar
---

# Examples and pitfalls

A metric declaration defines a per-character value. A signal is a native event with operands that can feed a metric; a push supplies a value or key directly. Start with the [overview](/docs/core/player-metrics/overview) for setup and aggregations.

```yaml
metrics:
  kill.stone: { from: kill, where: { type: [STONE] }, agg: count }
```

Restart the game core after editing `metrics.yaml`. This signal-derived counter needs no explicit push. A seeded metric is one ever written for this character; a block is the per-character record of metric values.

## Count stone kills

With the declaration above, a quest can read the counter for its current character. Put these statements in a quest login handler to print the value in a chat line:

```lua
local ch = forge.sys.game.char_manager.find_by_pid(pc.get_player_id())
local metrics = forge.sys.game.metrics
chat("Stone kills: " .. metrics.get(ch, "kill.stone"))
```

Check the same value with `/metric get <pg_name> kill.stone`. The implementor commands are registered by a forge. A qualifying kill credits the player who dealt the most damage.

## Record attempts

Declare a custom counter and call the function from the code handling an attempt:

```yaml
crafts.attempted: { from: custom, agg: count }
```

```lua
local function record_attempt(ch)
    local metrics = forge.sys.game.metrics
    if metrics.add(ch, "crafts.attempted", 1) then
        sys_log(0, "attempts = " .. metrics.get(ch, "crafts.attempted"))
    end
end
```

The return value says whether the value moved. A custom metric may also receive pushes from C++. Validate configuration with `declared` before writing if the name comes from configuration.

## Keep a best run

Declare `kill.streak.best: { from: custom, agg: max }`. Keep the active run in the calling code and push its length whenever it changes:

```lua
local function record_run(ch, run)
    return forge.sys.game.metrics.add(ch, "kill.streak.best", run)
end
```

The metric keeps the greatest value supplied. A lower value returns `false`. A zero may be the first written value, so use `is_seeded` when the distinction between unwritten and zero matters.

## Keep distinct keys

Declare a set with room for the expected key range:

```yaml
region.visited: { from: custom, agg: distinct, domain: { kind: map, max_keys: 256 } }
```

This function records a map index and logs the new set size:

```lua
local function record_region(ch, map_index)
    local metrics = forge.sys.game.metrics
    if metrics.add_key(ch, "region.visited", map_index) then
        sys_log(0, "regions = " .. metrics.get(ch, "region.visited"))
    end
end
```

A duplicate key returns `false`. `keys` returns the sorted keys. Private map indexes are normalized to their base map before insertion.

## What ships

The storage tables start empty. There is no backfill for existing characters, so an unwritten metric reads zero. To seed a history that you can derive from a reliable source, insert scalar rows by SQL into `player_stat` (`pid`, `metric`, `value`) or set rows into `player_stat_set` (`pid`, `metric`, `key`). Use the correct database schema for your installation.

Do this while the affected characters are offline. Values load into their blocks at login, and a later save can overwrite a direct database edit made while they are online. Verify the source and aggregation before inserting: totals, extremes, and set keys represent different kinds of data.

## Pitfalls

**The core refuses to start.** A declaration in `metrics.yaml` failed validation. Read the earlier diagnostic for the name and cause; the final failure can contain a literal `%s`. See [declaration refusals](/docs/core/player-metrics/declare#refusals).

**A new metric reads zero for existing characters.** No history is backfilled. An unwritten metric is not seeded; prepare offline SQL data if a trustworthy source exists.

**A typo also reads zero.** `get` returns zero for an unknown name. Use `declared` to validate names rather than treating zero as evidence that a name exists.

**A minimum of zero looks unwritten.** `get` returns zero for both cases. Check `is_seeded` before interpreting a minimum.

**A distinct set stops growing.** Once `max_keys` is reached, new keys are dropped and logged. Size the limit for the expected range and check `keys` when investigating duplicates.

**A custom sum looks like a count.** Both add the delta supplied by the caller. Choose the delta that represents the quantity you intend to store.

**A signal filter is refused.** Check its operand names and quote YAML boolean-like tokens such as `"TRUE"`. A predicate is a Lua function named in `where.predicate` that runs last; forges register predicates in the global `METRIC_PREDICATES` table.

**A virtual session cannot push.** A virtual session is described in [player virtualization](/docs/core/player-virtualization/overview). Custom declarations default to refusing its pushes; `allow_virtual` is available only for custom metrics. Use it when the code that owns the episode records that episode.

**A change event has not arrived.** A consumer is code that reads metrics or subscribes to changes. Changes enter the dirty queue, the queue of characters with unpublished changes. A sweep drains that queue each heartbeat, the periodic game-core tick, and publishes the change event. The queue has a budget and can fill; inspect `report` and the log. See the [event details](/docs/core/player-metrics/api#change-event).

**A Lua declaration is in the wrong place.** Prefer `metrics.yaml`; see [declaration order](/docs/core/player-metrics/declare#declaration-order) for boot ordering and late declarations.
