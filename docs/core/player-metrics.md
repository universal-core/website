---
title: Player metrics reference
description: Reference for the player metrics framework, per-character lifetime numbers declared in metrics.yaml. The 12 forge.sys.game.metrics functions, the metrics_changed event, the native signals and pushes, the metrics.yaml and achievements.yaml formats, first-declaration-wins, the metric GM command and the traps.
displayed_sidebar: mainSidebar
---

# Player metrics reference

A metric is a named per-character number (or a set of keys) that the engine keeps for the whole life of the character. It is declared in `metrics.yaml`, folded by one of five aggregations, saved under its name, and announced on the Luna event bus when it moves. The engine owns the schema, the four native signals, the filter, the save and the announcement. Everything that reads a metric, an achievement list or a codex, is a consumer written in Lua.

You reach for a metric when you need a lifetime statistic that more than one feature may read, and you do not want each feature to keep its own quest flag. The story and the mechanism are on the [Player metrics foundations page](/foundations/player-metrics/); this page is the surface.

## Quick start

Declare a metric in `metrics.yaml`, push to it from a quest, read it back from a forge. The declaration counts every kill of a stone:

```yaml
metrics:
  kill.metin:        { from: kill, where: { type: [STONE] }, agg: count }
  melt.attempts:     { from: custom, agg: count }
```

`kill.metin` has no push site: the kill signal feeds it. `melt.attempts` is `custom`, so something has to push it. This example module pushes it and logs the value:

```lua
local function on_attempt(ch)
    local metrics = forge.sys.game.metrics
    if not metrics.declared("melt.attempts") then
        return
    end
    metrics.add(ch, "melt.attempts", 1)
    sys_log(0, "melt.attempts = " .. metrics.get(ch, "melt.attempts"))
end
```

Restart the game core after editing `metrics.yaml`: the file is read once at boot. At boot the log prints `[OK] [metrics] N declared from [path], 0 refused`, then the signal mask and every metric. Within a few heartbeats of a push, `ON_METRICS_CHANGED` fires for the character.

## Files and setup

| What | Where | Notes |
| --- | --- | --- |
| Declarations | `metrics.yaml` in the locale folder | Read by the engine itself, not by a forge. Boot only: there is no reload. |
| Lua API | `forge.sys.game.metrics` | Works in forges and in `.quest` files. Generated stub: `forge.sys.game.metrics.lua` in the quest `meta` folder. |
| Predicates | global `METRIC_PREDICATES` table | Created by the engine, filled by forges at init. `metrics.yaml` names them in `where.predicate`. |
| Achievement catalog | `achievements.yaml` in the locale folder | Read by the achievement forge, not by the engine. See [achievements.yaml](#achievementsyaml). |
| Storage | tables `player_stat` (`pid`, `metric`, `value`) and `player_stat_set` (`pid`, `metric`, `key`) | The metric name is the stored key. |

Boot order matters. The forges initialise first and fill `METRIC_PREDICATES`; then the engine reads `metrics.yaml` with those predicates available; then `when boot` runs and consumers bind. A consumer that reads the registry at forge load sees it empty. Do it in `when boot`.

## Aggregations and values

Every aggregation moves one way. Nothing resets, so a threshold always means a lifetime total.

| `agg` | What a push or a signal does | Value read by `get` |
| --- | --- | --- |
| `count` | adds 1 per matching signal, or the pushed delta | the total |
| `sum` | adds the measured quantity of the signal; on every signal except `damage`, and on every `custom` metric, that is 1 or the delta, the same as `count` | the total |
| `max` | keeps the highest value seen | the highest |
| `min` | keeps the lowest value seen; it has an unset state | the lowest; `0` if never written |
| `distinct` | adds a key to a set | the size of the set |

A non-positive measured value is ignored by `sum`, `max` and `min`, not by `count`. A push that does not change the stored value returns `false` and does not wake the sweep.

## API

All functions are on `forge.sys.game.metrics`, run on the main thread and never yield, so no coroutine is needed. `ch` is a character object. Where a character may be `nil`, the call is a safe no-op.

| Function | Signature | Returns | What it does |
| --- | --- | --- | --- |
| `declare` | `declare(name, decl)` | dense id (`> 0`), or `0` | The Lua front end to the same validator `metrics.yaml` uses. Boot-once vocabulary, see [first declaration wins](#first-declaration-wins). Every refusal is logged. |
| `add` | `add(ch, name, delta?)` | `boolean`, whether the value moved | Pushes `delta` (default `1`). For `count` and `sum` it adds, for `max` and `min` it keeps the value if it is better. A negative `delta`, an unknown name and a `distinct` metric are refused with a log line. A virtual session without `allow_virtual` returns `false` with no log. |
| `add_key` | `add_key(ch, name, key)` | `boolean`, whether the set grew | Adds an integer key to a `distinct` metric. A key already present returns `false`. Private map indexes are normalised to the map (`idx / 10000` from 10000 up). At `max_keys` the key is dropped with a log line. |
| `get` | `get(ch, name)` | number | The value; the set size for `distinct`. `0` for an unwritten metric and for an unknown name, with no log. |
| `is_seeded` | `is_seeded(ch, name)` | `boolean` | The metric was ever written for this character. Use it before trusting a `0` from a `min` metric. `false` for a `nil` character or an unknown name. |
| `keys` | `keys(ch, name)` | `number[]`, ascending | The keys of a `distinct` metric. An empty table if there are none. |
| `info` | `info(name)` | `{ from, agg, allow_virtual, max_keys }` or `nil` | What the registry knows about one metric. |
| `names` | `names()` | `string[]` | Every declared name, in declaration order. |
| `declared` | `declared(name)` | `boolean` | The name was declared at boot. Use it to validate your own config: `get` cannot tell a typo from a player who has not earned it. |
| `flush` | `flush(ch)` | nothing | Publishes this character's pending changes now and drops the queue entry. The engine already calls it at the top of a disconnect. No-op when nothing is dirty. |
| `pending_save` | `pending_save(ch)` | number | How many metrics wait for the next database write. Cleared by the save, not by the sweep. |
| `report` | `report()` | `queue_depth`, `block_count` | Logs every declaration and the signal mask, and returns the dirty-queue depth and the number of characters holding a metric block. Both numbers only growing is a leak. |

### The declaration table

`declare` takes the same fields as a `metrics.yaml` entry:

```lua
local id = forge.sys.game.metrics.declare("example.boss.slain", {
    from   = "kill",
    where  = { rank = { "BOSS" } },
    agg    = "distinct",
    key    = "vnum",
    domain = { kind = "mob", max_keys = 256 },
})
```

The example is only valid in a context that runs before `metrics.yaml` is read (see the pitfall below); the shipped catalog does not use `declare`.

### The change event

`bridge.e.names.game.ON_METRICS_CHANGED` fires from the sweep, once per pass, with every character that has something to publish. Its payload type is `bridge.e.game.metrics_changed`:

| Field | Type | Meaning |
| --- | --- | --- |
| `pids` | `Array<number>` | One entry per character in this batch. |
| `counts` | `Array<number>` | How many metric names belong to `pids[i]`. |
| `metrics` | `Array<string>` | The names, concatenated in `pids` order. |

The payload carries names, not values: read the value with `get`. The publish is synchronous. The event does not report what moved while the character was offline; a consumer re-evaluates at login. How the bus works, and how to subscribe and unsubscribe, is on the [event bus page](/foundations/luna/event-bus).

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

Subscribe in `when boot`. The sweep drains the dirty queue in first-in order with a budget per heartbeat (config key `server.player.metrics_drain_size`, default 100 characters). The queue holds 8192 characters; when it is full the log says `[metrics] dirty queue full (8192), dropping pid N` and that character is not published until something moves again. A change made by a subscriber on the same character is queued for the next pass, not lost.

### Predicates

`METRIC_PREDICATES` maps a name to a function `(ch, target)` returning a boolean. `metrics.yaml` refers to it by name:

```lua
METRIC_PREDICATES.example_outlevelled = function(ch, victim)
    return victim ~= nil and ch:get_level() >= victim:get_level()
end
```

`ch` is the subject, `target` is the other side where the signal has one. Anything that is not boolean `true` is no match. A predicate must not mutate anything: the damage site is re-entrant. A predicate that raises 16 errors is disabled for the process (`[metrics] predicate NAME disabled after 16 failures`) and its metric matches nothing. Each predicate runs only after every integer operand test in the same `where` passed. The shipped ones are `in_war`, `low_hp` and `wearing_costume`.

## Native signals

A signal is a place in the engine that already has the operands in scope. C++ owns the list: a new signal is a C++ change, there is no Lua door. A metric is derived from a signal with `from:`, and may carry a `where:` filter over the signal's operands.

| Signal | Fires | Operands | Index operand | Measured value |
| --- | --- | --- | --- | --- |
| `kill` | A character kills a monster (the reward path, not for the excluded kills) or a player (the death path). | `vnum`, `type`, `rank`, `is_pc`, `empire`, `map_index`, `level_delta` | `vnum` | 1 |
| `damage` | A hit is resolved, with the damage clamped to the victim's remaining health. Hits on armada dummies are skipped. | `damage`, `type`, `skill_vnum`, `flags`, `critical`, `pierce`, `death_blow`, `rank` (the victim's) | `skill_vnum` | the damage |
| `skill` | A skill is used. | `vnum`, `level`, `grade`, `type`, `target_flags` | `vnum` | 1 |
| `item_use` | An item is used and the use succeeds. Quest items do not fire it. | `vnum` | `vnum` | 1 |

The subject of a signal must be a player. A virtual session is refused unless the metric opted in, which a signal-derived metric cannot.

A quest item does not fire `item_use`: use `when <vnum>.use` and push a `custom` metric instead.

## Native pushes and the registration table

Where C++ has no signal to offer, a cold site pushes directly. The push API is one line and has no enum, payload struct or routing entry:

```cpp
struct Metrics
{
    static bool     Add   (LPCHARACTER ch, const char* name, uint64_t delta);
    static bool     AddKey(LPCHARACTER ch, const char* name, int32_t key);
    static uint64_t Get   (LPCHARACTER ch, const char* name);
};
```

`Add` and `AddKey` log `[metrics] Add: no metric named [x]` for an unknown name. `Get` returns `0` silently. Both languages end in the same code: the same `distinct` check, the same virtual gate, the same aggregation. Which language a producer is written in is a property of the call site, not of the metric.

Native registrations:

| Site | Kind | Metric |
| --- | --- | --- |
| Kill reward path (monster victims) and player death path | signal `kill` | every `from: kill` |
| Damage resolution | signal `damage` | every `from: damage` |
| Skill use | signal `skill` | every `from: skill` |
| Item use | signal `item_use` | every `from: item_use` |
| Coin handling | push | `mh.coin.peak` |
| War plaque handling | push | `war.plaque.peak` |
| Prism handling | push | `raid.prism.peak`; no shipped achievement reads it |
| Artifact upgrade | push | `artifact.maxed` |
| Fishing catch | push twice | `fish.catch`, `fish.size.max` |
| Marriage | push, once per spouse | `marriage.count` |

The rest of the native side is plumbing, not a registration point: the sweep runs every heartbeat, the save runs beside the quest-flag save, the dirty block is published at the top of a disconnect and released on destroy, and the login packet seeds the stored values without marking them dirty. Nothing in C++ reads a metric back: every consumer is Lua. All native pushes are `custom` metrics in `metrics.yaml`; if you rename one in the file, the push logs `no metric named` and does nothing.

## `metrics.yaml`

The top level is a `metrics:` map. The key is the metric name, persistent and at most 64 characters; the value is a flow map.

| Key | Applies to | Values | Meaning |
| --- | --- | --- | --- |
| `from` | all, required | `kill`, `damage`, `skill`, `item_use`, `custom` | The signal that feeds the metric, or `custom` for a metric a call site pushes through `add` and `add_key`. |
| `agg` | all | `count` (default), `sum`, `max`, `min`, `distinct` | How values fold. See [Aggregations and values](#aggregations-and-values). |
| `where` | signal metrics only | map of operand to list; `predicate: [names]` | Filters. Operand values are token names or plain integers, interchangeably. A list passes on membership. |
| `key` | signal-derived `distinct` only | an operand name | The operand that becomes the set key. |
| `domain` | `distinct` | `{ kind: map\|mob\|item\|custom, max_keys: N }` | What the keys mean, and the storage guard. A `distinct` metric without `max_keys` is unbounded and logs a warning at boot. |
| `allow_virtual` | `custom` only | `true` | Lets a virtual session push. Default `false`. |

`where` is flat and unordered. The engine splits it into integer operand tests, which run first, and `predicate` entries, which run last and only when everything before passed. Tokens:

| Operand | Tokens |
| --- | --- |
| kill `type` | the character types (`STONE`, `BOSS`, `PC`, and the rest) |
| kill and damage `rank` | `PAWN` up to `KING` |
| damage `type` | the damage type names; quote `"TRUE"` for pure damage |
| damage `flags` | the stats flags (`CRITICAL`, `PENETRATE`, and the rest); a bit word, the list is OR-ed and the test passes when any named bit is set |
| skill `grade` | `NORMAL`, `MASTER`, `GRAND_MASTER`, `PERFECT_MASTER` |
| skill `target_flags` | the shared skill flag names; a bit word like `flags` |

Whole lines from the shipped file:

```yaml
kill.metin:        { from: kill, where: { type: [STONE] }, agg: count }
kill.dog:          { from: kill, where: { vnum: [101, 102, 103] }, agg: count }
boss.slain:        { from: kill, where: { rank: [BOSS] }, agg: distinct, key: vnum,
                     domain: { kind: mob, max_keys: 256 } }
damage.pure.in_war: { from: damage, agg: sum,
                      where: { type: ["TRUE"], predicate: [in_war] } }
map.visited:       { from: custom, agg: distinct,
                     domain: { kind: map, max_keys: 256 } }
arena.win:           { from: custom, agg: count, allow_virtual: true }
```

### First declaration wins

A name can be declared once per process. The second `declare` of a name logs `[metrics] declare: duplicate metric [name]` and returns `0`. The YAML and the Lua front end feed the same validator, so the rule is the same for both. The order of boot decides who is first: the forges run before the engine reads `metrics.yaml`.

### Refusals

Every refusal from the file makes the initialisation fail, and the game core does not start. The per-entry line names the metric; the last line is `cannot initialize metrics from %s` (the `%s` is printed literally).

| Log line | Cause |
| --- | --- |
| `[metrics] cannot read [path]: ...` | Unreadable or invalid YAML. |
| `[metrics] [path] has no `metrics:` map` | The top-level key is missing. |
| `[metrics] declare [x]: no from:` | `from` is missing, for example `form:`. |
| `[metrics] declare [x]: unknown from: [y] ...` | Not a signal and not `custom`. |
| `[metrics] declare [x]: unknown agg [y]` | Not one of the five. |
| `[metrics] declare: duplicate metric [x]` | The name is already declared. |
| `[metrics] declare [x]: signal [s] has no operand [o]` | A misspelled operand in `where` or `key`. |
| `[metrics] declare [x]: where.o carries an unknown token` | A misspelled token, or a bare `TRUE`, `FALSE`, `YES`, `NO`, `ON` or `OFF`, which YAML reads as a boolean. Quote it. |
| `[metrics] declare [x]: where.o resolved to an empty mask` / `where.o is empty` / `where.o is not a list` | A bit-word list that names nothing, an empty list, or a scalar. |
| `[metrics] declare [x]: where.predicate 'p' is not registered` | No forge put `p` into `METRIC_PREDICATES`. |
| `[metrics] declare [x]: where: filters a signal, but from: is custom` | `where` on a pushed metric. |
| `[metrics] declare [x]: key: names a signal operand, but from: is custom` | `key` on a pushed metric. |
| `[metrics] declare [x]: signal-derived distinct without key:` | A `distinct` on a signal needs `key`. |
| `[metrics] declare [x]: allow_virtual is for referee pushes, not the [s] signal` | `allow_virtual` on a signal metric. |

## `achievements.yaml`

The achievement catalog is one consumer of metrics, not part of them. The engine does not read it; the achievement forge does, in `when boot`. The same file is mirrored into the client locale folder by the packer: do not copy it by hand. The client reads `name`, `description` and `icon`; the rest is server-only.

The top level has `categories: [{ id, name, icon }]` and `achievements: [...]`.

| Key | Meaning |
| --- | --- |
| `id` | Unique and persistent. The first of a duplicate wins. |
| `name`, `description` | Key paths into the client locale file, not text. |
| `icon` | A client asset path. |
| `category` | One of the `categories` ids. |
| `subtype` | Required, free-form. The panel builds its rail from the values it finds. |
| `supersedes` | The entry this one follows. Presentation only: it never gates evaluation, so a player above two thresholds completes both steps together. |
| `hidden` | `true` hides the entry. A hidden entry may not carry a `covers` list. |
| `tasks` | A list of tasks. Every task must hold. |
| `awarded` | `true` for a fact with no number in it. The call site awards it with the forge's `award(ch, id)`. An entry carries either `tasks` or `awarded`, never both. |
| `rewards` | `[{ vnum, count }]`. |

A task is `{ metric, <one predicate>, label }`, with exactly one predicate:

| Predicate | Met when |
| --- | --- |
| `count: N` | `get` is at least `N`. |
| `at_most: N` | the metric is seeded and `get` is at most `N`. For `min` metrics. |
| `distinct: N` | the set size is at least `N`. |
| `covers: [k, ...]` | every listed key is in the set. |

`label` is a client locale key, one bar per task. Thresholds are absolute lifetime totals. Two real entries:

```yaml
tasks: [{ metric: boss.slain, distinct: 12, label: "achievement.tasks.boss_slain" }]
tasks: [{ metric: map.visited, covers: [1, 21, 41], label: "achievement.tasks.map_capitals" }]
```

An invalid entry does not stop the boot. It is dropped with a log line and the server runs on:

| Log line | Cause |
| --- | --- |
| `[achievement] x: task names undeclared metric 'm' - ignored` | A typo in a task's metric name. |
| `[achievement] x: unknown category 'c' - ignored` | `category` is not in `categories`. |
| `[achievement] x: no subtype - ignored` | `subtype` missing. |
| `[achievement] x: unusable reward - ignored` | A bad `vnum` or a `count` under 1. |
| `[achievement] x carries both awarded and tasks - ignored` | Both keys present. |
| `[achievement] x: awarded must be true - ignored` | `awarded` with another value. |
| `[achievement] x is hidden and carries a covers list - ignored` | The list would reveal the answer. |
| `[achievement] x: no usable task - ignored` | No task survived. |
| `[achievement] x: task on 'm' has no predicate` / `has a non-numeric threshold` / `has an empty covers list` | A malformed task. |
| `[achievement] duplicate id 'x' - ignored` | The first one wins. |
| `[achievement] x supersedes unknown 'y' - link dropped` | The entry is kept. |

On success the log says `[OK] [achievement] N achievements, M categories`. The forge evaluates only the achievements that read a metric named in a change event, and every achievement at login, so an achievement added over a metric that already counted is met at the next login or the next move of that metric. A new metric needs a core restart.

## The metric GM command

The achievement forge registers `/metric` as implementor routes. `<pg_name>` is the character name.

| Syntax | Reply |
| --- | --- |
| `/metric get <pg_name> <key>` | `metric NAME = V (seeded: true)` or `(seeded: false)` |
| `/metric add <pg_name> <key> <delta>` | `metric NAME += D -> V`; or `no metric named 'NAME'`, `NAME is distinct - use /metric add_key`, `NAME refused: a virtual session may not move it (allow_virtual is not set)`, `metric NAME unchanged at V - NAME did not take D` |
| `/metric add_key <pg_name> <key> <value>` | `metric NAME + key K (grew: yes or no, size N)` |
| `/metric list <pg_name> [prefix]` | every registry metric, sorted by name, then `N metric(s) matching 'prefix'` |
| `/metric pending <pg_name>` | `N metric(s) awaiting the next save` |

`<key>` is the metric name here, and `<value>` of `add_key` is the set key. There is no `/metric set` and no reload. The same forge adds `/achievement inspect|simulate|unlock|claim <pg_name> <id>`, `/achievement reset <pg_name> [ach_id]`, `/achievement list <pg_name>`, `/achievement rarity` and `/achievement recompute_rarity`.

## Behaviour

- Blocks live in the metrics manager keyed by player id, not on the character object. The save sends only the metrics changed since the last save, and for `distinct` only the keys added since.
- A stored row whose name is not declared is logged (`[metrics] load pid N: no metric named [x], row ignored`) and skipped. The name is the stored key, so renaming a metric orphans its rows: it is a data migration.
- Metrics are per game core in memory. The database row is the only shared state.
- A kill metric inherits the exclusions of the reward path, and the kill goes to one player only: the one who dealt the most damage. Helpers on the same mob count nothing. A damage metric skips armada victims.
- Pushes from a virtual session (the avatar arena, mayhem, the avatar guild war) silently return `false` unless the metric has `allow_virtual`. Everything there is granted gear, so nothing measured is a lifetime statistic; every aggregation is monotone, so a wrong write is permanent.
- Boot log: `LoadLocaleFile: Metrics: path`, `[OK] [metrics] N declared from [path], 0 refused`, then `[OK] [metrics] N declared, signal mask 0x..` and one line per metric (`[metrics]  N name from=.. agg=.. operands=.. predicates=.. max_keys=..`, with the suffix `ALLOW_VIRTUAL`). A zero signal mask means no signal site will ever fire.

## Examples

### Count the kills of one mob, then reward them

Declare the counter in `metrics.yaml` (`101` is a vnum; a list matches any of them) and restart the core:

```yaml
kill.wolf: { from: kill, where: { vnum: [101] }, agg: count }
```

Add the entry to `achievements.yaml`. `name`, `description` and the task `label` are keys; add them to the client locale file under `achievement.names`, `achievement.desc` and `achievement.tasks`, or the panel shows the raw key. `subtype` is free-form text; a missing locale entry under `achievement.subtypes` shows the id.

```yaml
- id: wolf_hunter
  name: "achievement.names.wolf_hunter"
  description: "achievement.desc.wolf_hunter"
  icon: "icon/achievement/dog_catcher.tga"
  category: combat
  subtype: monsters
  tasks: [{ metric: kill.wolf, count: 500, label: "achievement.tasks.kill_wolf" }]
  rewards: [{ vnum: 27001, count: 5 }]
```

Check it with `/metric get <pg_name> kill.wolf`, push with `/metric add <pg_name> kill.wolf 500`, then `/achievement inspect <pg_name> wolf_hunter`. A typo in the metric name drops the entry with `task names undeclared metric`; a typo in the `metrics.yaml` key stops the boot.

### Seeding existing characters

What ships: the tables are created empty (no existing character has a row), and a metric declared later starts at `0`. The achievement forge samples `level`, `gold.peak`, `playtime.minutes`, `map.visited` and adds `login.count` for every character at login, then once a minute and on level-up, so those catch up on their own. Achievements are evaluated at login, so a threshold already met is granted then.

What does not ship: any backfill of a counter such as `kill.wolf`, `fish.catch` or the death count. The only shipped backfill is a one-off statement that fills the Master Hunt codex keys from surviving mission rows. To seed anything else, insert into `player_stat` (`pid`, `metric`, `value`) or `player_stat_set` (`pid`, `metric`, `key`) yourself, with the schema named in every statement, from a source that never resets. Do it while the characters are offline: a row is read at login, and a save overwrites it from memory.

### A best run in a `max` metric

A quest keeps the current run in a flag and calls this on every kill with the run length. The metric keeps the highest value, so one push site serves every threshold. The metric is declared `kill.streak.best: { from: custom, agg: max }`.

```lua
local function push_streak(ch, run)
    return forge.sys.game.metrics.add(ch, "kill.streak.best", run)
end
```

The return is `true` only when the run beat the stored best.

### Keys of a `distinct` metric

`map.visited` counts places, not visits. Adding a key already in the set returns `false` and does not wake the sweep:

```lua
local function visit(ch, map_index)
    local metrics = forge.sys.game.metrics
    if metrics.add_key(ch, "map.visited", map_index) then
        sys_log(0, "new map, set size " .. metrics.get(ch, "map.visited"))
    end
end
```

### A referee push on a virtual session

The four arena metrics declare `allow_virtual: true` and are pushed by the arena referee, the one place that owns the virtual episode. A signal-derived metric cannot opt in.

## Pitfalls

**The game core does not start after a metric was added.** A declaration in `metrics.yaml` was refused, and every refusal fails the boot. The log line above the failure names the metric. Fix the entry; do not look at the last line, which prints a literal `%s`.

**A Lua `declare` at forge load makes the YAML entry fail and the boot with it.** Forges run before the engine reads `metrics.yaml`, so the Lua call takes the name and the YAML entry is refused as `duplicate metric`. Declare metrics in `metrics.yaml` only. The shipped catalog never calls `declare`.

**A metric declared after boot does not count for players who are already online.** Their metric block was sized before the new id existed, so the push returns `false`. It counts for blocks created later. Restart the core instead.

**A metric added in a later release starts at zero.** There is no row, so it is never seeded: the whole existing population begins at `0`, and nothing backfills it. For a history you can recompute, insert rows into `player_stat` or `player_stat_set` yourself; the engine ships no migration that does.

**`get` returns 0 for a typo.** An unknown name reads `0` with no log. Validate configuration with `declared`.

**An `at_most` task is met by everyone on day one.** A `min` metric that was never written is not zero. Check `is_seeded` first; the achievement forge does.

**A bare `TRUE` in `where` is refused.** YAML reads it as a boolean. Write `"TRUE"`.

**`sum` equals `count` on a custom metric.** Only the `damage` signal has a measured value. `damage.critical` was declared as `sum` against a hit threshold and is now `count`.

**A `distinct` metric logs for every key past `max_keys`.** The key is dropped. Size the domain for the whole range, not for today.

**A quest item does not fire `item_use`.** Push a `custom` metric from `when <vnum>.use`.

**A predicate that mutates breaks the damage site.** It must only read and return a boolean.

## See also

- [Player metrics foundations](/foundations/player-metrics/)
- [Event bus](/foundations/luna/event-bus)
- [Traits reference](/docs/core/traits)
