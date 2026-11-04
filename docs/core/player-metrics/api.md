---
title: Lua API
description: Lua functions, change events, predicates, and metric commands.
displayed_sidebar: mainSidebar
---

# Lua API

The functions on `forge.sys.game.metrics` read and write per-character values. A push supplies a value or key. A declaration defines a named metric, and the catalog contains all declarations. Calls run on the main thread and do not yield.

```lua
local metrics = forge.sys.game.metrics
if metrics.declared("crafts.attempted") then
    metrics.add(ch, "crafts.attempted", 1)
    sys_log(0, "attempts = " .. metrics.get(ch, "crafts.attempted"))
end
```

Here `ch` is a character object supplied by the calling context. A seeded metric is one ever written for this character. A block is the per-character record of metric values. A virtual session is described in [player virtualization](/docs/core/player-virtualization/overview).

## Functions

| Function | Returns | Use |
| --- | --- | --- |
| `declare(name, decl)` | ID, or `0` | Declares a metric; refusals are logged. |
| `add(ch, name, delta?)` | Boolean | Pushes a delta, default `1`. |
| `add_key(ch, name, key)` | Boolean | Adds an integer key to a `distinct` metric. |
| `get(ch, name)` | Number | Reads the value or set size. |
| `is_seeded(ch, name)` | Boolean | Tests whether the metric was ever written. |
| `keys(ch, name)` | Number array | Returns distinct keys in ascending order. |
| `info(name)` | Table or `nil` | Returns source, aggregation, virtual option, and key limit. |
| `names()` | String array | Returns declared names in ID order. |
| `declared(name)` | Boolean | Tests whether the name is declared. |
| `flush(ch)` | Nothing | Publishes pending changes for the character now. |
| `pending_save(ch)` | Number | Counts metrics awaiting a database save. |
| `report()` | Two numbers | Logs declarations and returns queue depth and block count. |

`add` and `add_key` return `true` only when the stored value or set changes. A repeated key returns `false`. A virtual session without `allow_virtual` also returns `false` silently. Unknown names and wrong aggregation types are logged on pushes. `get` returns zero for an unknown or unwritten name; validate names with `declared`. `is_seeded` distinguishes an unwritten `min` from a written zero.

For a `map` domain, `add_key` normalizes private map indexes to their base index. A full set refuses new keys and logs the refusal. `pending_save` clears on save, independently of event publication. `flush` is a no-op without pending changes; the engine also flushes on disconnect.

## Declaration table

`declare` accepts the same fields as `metrics.yaml`. This example declares a signal-derived set:

```lua
local id = forge.sys.game.metrics.declare("kill.boss", {
    from = "kill",
    where = { rank = { "BOSS" } },
    agg = "distinct",
    key = "vnum",
    domain = { kind = "mob", max_keys = 256 },
})
```

Prefer `metrics.yaml`. Lua declaration is safe only at forge load, before the engine reads that file, and only for a name absent from the file. A name in both is a duplicate and fails boot. See [declaring metrics](/docs/core/player-metrics/declare) for the fields and the outcome of a late declaration.

## Change event

A consumer is code that reads metrics or subscribes to changes. A dirty queue holds characters with unpublished changes. A heartbeat is the periodic game-core tick; a sweep is the pass that drains the dirty queue each heartbeat and publishes the change event.

`bridge.e.names.game.ON_METRICS_CHANGED` publishes synchronously with a `bridge.e.game.metrics_changed` payload:

| Field | Type | Meaning |
| --- | --- | --- |
| `pids` | Number array | Character IDs in this batch. |
| `counts` | Number array | Number of names for each corresponding ID. |
| `metrics` | String array | Names concatenated in character order. |

Subscribe in `when boot`. This handler walks the names for each character:

```lua
bridge.e.subscribe(bridge.e.names.game.ON_METRICS_CHANGED, function(ev)
    local at = 1
    for i, pid in ipairs(ev.pids) do
        for j = at, at + ev.counts[i] - 1 do
            sys_log(0, "pid " .. pid .. " moved " .. ev.metrics[j])
        end
        at = at + ev.counts[i]
    end
end)
```

The payload has names rather than values. Read values with `get` when you have the character. The sweep processes the queue in order, with `server.player.metrics_drain_size` characters per heartbeat, default 100. The queue holds 8192 characters. When full, it logs the dropped ID; another change is needed to enqueue that character again. A subscriber's new push is queued for a later pass. The event does not replay offline changes, so consumers that need a complete view should read at login.

## Predicates

A predicate is a Lua function named in `where.predicate` that is called last, after integer operand tests pass. Forges register predicates in the global `METRIC_PREDICATES` table before declarations load. The function receives the subject and, where available, the target:

```lua
METRIC_PREDICATES.low_health = function(ch, target)
    return ch:get_hp_pct() < 10
end
```

Only boolean `true` matches. Predicates must read without mutating state because signal handling can be re-entrant. A predicate is disabled after 16 errors, and its metric stops matching it. Use integer filters first where possible to avoid unnecessary Lua calls.

## Implementor commands

These `/metric` implementor commands are registered by a forge. `<pg_name>` identifies a character, `<key>` is a metric name, and `<value>` is a set key.

| Command | Effect |
| --- | --- |
| `/metric get <pg_name> <key>` | Prints value and seeded state. |
| `/metric add <pg_name> <key> <delta>` | Pushes a delta and prints the result. |
| `/metric add_key <pg_name> <key> <value>` | Adds a key and prints growth and size. |
| `/metric list <pg_name> [prefix]` | Lists matching catalog names and values. |
| `/metric pending <pg_name>` | Prints the number awaiting save. |

A refused or unchanged push reports the result. There is no set command. See [examples and pitfalls](/docs/core/player-metrics/examples) for checks.
