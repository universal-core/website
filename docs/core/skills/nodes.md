---
title: Skill nodes
description: Node types, options, affect lifetimes, and handlers in skill files.
displayed_sidebar: mainSidebar
---

# Skill nodes

A node describes one effect in a skill phase or in another node's `nodes:` list. The server supports 24 live node types. For terms such as node, affect, and poly (a formula string), see the [skill file glossary](/docs/core/skills/file). For the model and phases, see [Nodes and phases](/foundations/skills/nodes-and-phases).

This node applies damage and then attempts to slow each collected victim:

```yaml
- type: DAMAGE
  id: bolt
  amountPoly: 100+2*calc_raw_phys_att*skill_k
  damageType: MAGIC
  successPctPoly: '800'
  nodes:
  - type: SLOW
    amountPoly: '30'
    durationPoly: '5'
```

A child runs once for each victim the parent collected, seeded with that victim, and runs its own `collect:` from there. It is "for each of mine, do this", not "then also do this". Traversal descends into children only when the parent's own step returned true. What false means is per type: a failed success roll, a rejected target, a horse skill meeting a player.

## Keys any node may carry

| Key | Meaning |
| --- | --- |
| `type` | Required. An unknown or retired name fails the file. |
| `id` | Optional name. It is what `node.<id>.<stat>` and `desc.vars` refs address, and what names the node's collection ledger. It must be unique in the file, across all three phases. |
| `collect:`, `accept:` | Who the node reaches. See [Collect, accept and targets](/docs/core/skills/collect-and-triggers). |
| `targets:` | `AUTO_SHOOT` and `CONCATENATED_ATTACK` only, where it is mandatory. |
| `nodes:` | Children. Read only on the types marked in the table below; on the others it is ignored. |
| `handler:` | Names a table in the skill's Lua file. See [Handlers](#handlers). |
| `successPctPoly` | A per-mille roll: the node runs when a random number from 1 to 1000 is at most the poly. Absent means it always succeeds. Only on the types marked below. `'800'` is 80 percent. |
| `stopOnCasterDeath` | Only on the timed types. Whether the caster's death ends the run. |
| `upkeep:`, `attach:`, `traits:`, `counters:` | Only on the types that raise an affect. See [Nodes that raise an affect](#nodes-that-raise-an-affect). |

## Which type takes what

| Type | Children | Success roll | Raises an affect | Timed |
| --- | :-: | :-: | :-: | :-: |
| `DAMAGE` | yes | yes | | |
| `HEAL` | yes | yes | | |
| `AFFECT` | yes | yes | yes | |
| `CRUSH` | yes | | | |
| `PULL` | yes | yes | | |
| `TICKER` | yes | | yes | yes |
| `AUTO_SHOOT` | yes | | yes | yes |
| `CONCATENATED_ATTACK` | yes | | | yes |
| `COLLECTOR` | yes | | | |
| `FIRE`, `BLEEDING`, `POISON`, `STUN`, `SLOW` | | yes | | |
| `REMOVE_GOOD_AFFECT`, `REMOVE_BAD_AFFECT`, `REMOVE_BLEEDING` | | yes | | |
| `CUT_POINT` | | yes | | |
| `SPECIFIC_EFFECT`, `POINT_CHANGE`, `TAUNT` | | | | |
| `AMBIENCE_EFFECT`, `GROUND_DECAL`, `IMPACT_EFFECT` | | | | |

## Nodes that raise an affect

`AFFECT`, `TICKER` and `AUTO_SHOOT` all put an affect on someone, so all three take these keys.

```yaml
upkeep:
  point: SP
  amountPoly: '10'
counters:
  damage_taken: { event: DAMAGE_TAKEN, from: CASTER }
```

| Key | Meaning |
| --- | --- |
| `affect` | The affect flag the node sets. |
| `affectVnum` | The identity of the affect. Default is the skill vnum. See [Traits reference](/docs/core/traits/concepts) for binding identity. |
| `upkeep` | What the affect drains per tick while it holds. `point` is `SP` or `HP` (`HP` also marks the affect as costing health), `amountPoly` is required. An unknown point or a missing amount fails the file. |
| `attach` | `TICKER` and `AUTO_SHOOT`: `affect` gives the run and the affect one lifetime. It takes only the word `affect`. |
| `traits` | A list of `{ id:, constants:, formulas:, params: }`. The behavior this affect gates. See [Traits reference](/docs/core/traits/concepts). |
| `counters` | A map of name to `{ event:, from: }`: running totals the affect keeps. `event` is one of `DAMAGE_TAKEN`, `DAMAGE_DEALT`, `HEAL_TAKEN`, `HEAL_DONE`, `DEBUFF_TAKEN`, `DEBUFF_GIVEN`, `KILL`, `DIED`. `from` is `ANY` (default), `CASTER`, `PC` or `NON_PC`. At most 8 counters per node. Read a total as `node.<id>.<name>`. |

Inside a `traits:` entry, `constants` are polys in the node's own names, evaluated per holder. `formulas` are polys in the trait's names, stored on the binding. `params` map a name to an enum value, and the name must end in `_point` (a point), `_column` (a mob resist column) or `_affect` (an affect flag) to say which enum it reads. `trait:` in the singular, and `constants`, `formulas` or `params` outside a `traits:` entry, are errors. More on affects is in [Affects reference](/docs/core/affects/overview).

## Node types

### `DAMAGE`

| Key | Meaning |
| --- | --- |
| `amountPoly` | Required. The attack value before defence. |
| `damageType` | Required. `NORMAL` or `TRUE_DAMAGE` (the same thing, ignores flat defence), `MELEE`, `RANGE`, `MAGIC`, `SPECIALISTIC`, `SPECIAL`. |
| `damageAttribute` | `|`-joined set of `WIND`, `ELECTRIC`, `FIRE`. Only `ELECTRIC` reaches the packet. |
| `penetratePctPoly` | Per-mille roll. On success the hit ignores defence. |
| `ignoreTargetAttRatingPoly` | Per-mille roll. |
| `ability_scaling` | `{ adder:, resist: }` point names. The damage is multiplied by `100 + caster adder - victim resist` percent, floored at 0. |

A `type: HORSE` skill returns false against a player before any of it. Records `damage`.

### `HEAL`

| Key | Meaning |
| --- | --- |
| `amountPoly` | Required. Scaled by the splash modifier. |

Records `heal`.

### `AFFECT`

| Key | Meaning |
| --- | --- |
| `point` | The point the affect moves. Optional: without it the affect is a pure flag. A name no point matches fails the file. |
| `amountPoly` | Defaults to `'0'`. Scaled by the splash modifier. |
| `durationPoly` | Seconds. `0` is an infinite affect. Required unless the skill has `TOGGLE`, and always required on a child node. |
| `affect`, `affectVnum` | See above. |
| `affect_class` | List of affect macros this node's affect joins: `IS_GOOD_AFFECT`, `IS_DISPELLABLE_AFFECT`, `IS_PARTY_BUFF_AFFECT`, `IS_UNTARGETABLE_AFFECT` and the rest. Per node, so one skill can carry a good buff node and a bad debuff node. |
| `absorb` | Also apply `-amount` to the caster, with `absorbAffect` as its flag, unless the caster already carries that vnum and point. |
| `setSource` | Stamp the caster's id on the affect. |

A status effect has its own node type: `point: STUN` is not how a node stuns.

### `CRUSH`

| Key | Meaning |
| --- | --- |
| `amountPoly` | Required knockback distance. Pushes away from the caster and stops at walls. |

### `PULL`

| Key | Meaning |
| --- | --- |
| `amountPoly` | Required. Pulls the victim toward the node's centre, never past it. `collect.origin` moves the centre. Only players other than the caster are eligible; otherwise the step returns false. |

### `TICKER`

Re-runs its children on the same victim, on a clock.

| Key | Meaning |
| --- | --- |
| `countPoly` | How many ticks. Required unless `attach: affect`, where the affect ending is the other way out. |
| `delayPoly` | Required, always, even for a single tick. Seconds between ticks. |
| `delayStartPoly` | Seconds before the first tick. Default `0.1`. |
| `durationPoly` | The attached affect's own lifetime. Empty means as long as the ticks last. |
| `cooldownAfterEnd` | Start the skill's cooldown after the last tick instead of at the cast. |
| `stopOnCasterDeath` | Default `false`. |
| `anchor` | `position` freezes the seed's place at plant time and re-enters the subtree there. The victim becomes irrelevant: it may die, warp or log out and the subtree still runs. |
| `affect`, `affectVnum`, `attach`, `upkeep`, `traits`, `counters` | See above. |

A ticker needs at least one child. `anchor: position` cannot be combined with `attach: affect`. An `affect`, `affectVnum` or `durationPoly` without `attach: affect` is an error. `node.<id>.iteration` is 1 on the first tick. With `attach: affect` the lifetime is two-way: a dispel, a cleanse or the caster leaving stops the run, and the run ending removes the affect.

### `AUTO_SHOOT`

A toggle that fires at a fresh search every interval.

| Key | Meaning |
| --- | --- |
| `fly` | Required. The projectile. |
| `affect` | Required. The affect flag the toggle raises on its holder. |
| `intervalPoly` | Required. Seconds between shots, evaluated every tick. |
| `targetCountPoly` | Required. How many targets one tick takes, evaluated every tick. Write a fixed count as a constant poly. |
| `durationPoly` | Run length. `0` or empty is infinite. Required unless the skill has `TOGGLE`, and always required on a child node. |
| `targets:` | Required, with a `collect.search`. Who the shots hunt. |

The node's own `collect:` and `accept:` say who holds the toggle, normally the caster. The run and its affect share one lifetime whether or not `attach:` is written. `stopOnCasterDeath` defaults to `true`. At least one child is required.

### `CONCATENATED_ATTACK`

A chain that jumps from victim to victim.

| Key | Meaning |
| --- | --- |
| `fly` | Required. |
| `maxTarget` | Required, above 0. Total hops. |
| `targets:` | Required, with a `collect.search`. `targets.accept.ledger.max_per_victim` is how many times one victim may be hit again; `0` is unbounded. |

Live branches of one chain are capped at 64: `take: 3` over five generations would be 243 leaves, and a typo must not take a core down. `stopOnCasterDeath` defaults to `true`. At least one child is required. Inside a child, `node.<id>.iteration` counts the hop.

### `COLLECTOR`

Does nothing itself. It owns a `collect:` and `accept:` that several children share: one search, one budget, one ledger. Its step always returns true, so traversal reaches its children for each collected victim.

| Key | Meaning |
| --- | --- |
| `collect`, `accept`, `nodes` | Shared population and children; see the common keys above. |

### `POINT_CHANGE`

| Key | Meaning |
| --- | --- |
| `point` | Required point name. An unknown name fails the file. |
| `to` | `caster` or `victim` (default). |
| `amountPoly` | Required. Records `amount`. |

Write `to:`, not `on:`; YAML 1.1 treats `on` as a boolean.

### `TAUNT`

| Key | Meaning |
| --- | --- |
| `to` | `caster` (default) or `center`. Directs a monster or boss toward that target. On other victims it does nothing and returns true. |

### `CUT_POINT`

| Key | Meaning |
| --- | --- |
| `point` | `HP` or `SP` only. |
| `amountPoly` | Required; subtracted from the victim. Records `cut`. |
| `absorb` | Add the same amount to the caster. |
| `fly` | Projectile drawn from victim to caster with `absorb`. |

### `FIRE`

| Key | Meaning |
| --- | --- |
| `amountPoly` | Damage amount. An empty value loads but deals nothing. |
| `tickAmountPoly` | Default `'5'`. |
| `tickFrequencyPoly` | Default `'3'`. |

### `BLEEDING`

| Key | Meaning |
| --- | --- |
| `amountPoly` | Required damage amount. |
| `tickAmountPoly` | Default `'5'`. |
| `tickFrequencyPoly` | Default `'3'`. |

### `POISON`

| Key | Meaning |
| --- | --- |
| `successPctPoly` | Optional success roll; see common keys. |

### `STUN`

| Key | Meaning |
| --- | --- |
| `durationPoly` | Required duration. |
| `ignoreImmune` | Bypass the immunity check when true. |

### `SLOW`

| Key | Meaning |
| --- | --- |
| `amountPoly` | Required. The movement speed change is `-amount` plus the caster's slow adder. |
| `durationPoly` | Required duration. |
| `ignoreImmune` | Bypass the immunity check when true. |

### `REMOVE_GOOD_AFFECT`

| Key | Meaning |
| --- | --- |
| `successPctPoly` | Optional success roll; see common keys. |

### `REMOVE_BLEEDING`

| Key | Meaning |
| --- | --- |
| `successPctPoly` | Optional success roll; see common keys. |

### `REMOVE_BAD_AFFECT`

| Key | Meaning |
| --- | --- |
| `removeDispel` | Default `true`; `false` skips dispel-curse affects. |
| `removeCleansable` | Default `true`; `false` skips the cleansable walk, leaving only poison and fire eligible for removal. |

### `SPECIFIC_EFFECT`

| Key | Meaning |
| --- | --- |
| `effectPath` | Required. The effect file. |
| `bone` | Where it attaches. Empty means the root bone. |

## Centre-acting nodes

`AMBIENCE_EFFECT`, `GROUND_DECAL` and `IMPACT_EFFECT` act on a place, not on a victim. They run once per collected victim, at that victim's place, and once at the node's own centre when nobody was collected, which is the case they exist for. Under a `COLLECTOR` the centre is each victim's position. Under a `TICKER` with `anchor: position` it is the anchor. A centre with no map is not a location, and the node plants nothing.

### `AMBIENCE_EFFECT`

| Key | Meaning |
| --- | --- |
| `effectPath` | Required server-owned effect. |
| `soundPath` | Optional sound. |
| `ttlPoly` | Required lifetime in seconds. |

### `GROUND_DECAL`

| Key | Meaning |
| --- | --- |
| `shape` | `CIRCLE`, `CONE`, or `RECTANGLE`. `CUSTOM` fails the file. |
| `width`, `height` | Full extents in world units; default 300. |
| `rotation` | Degrees; with `attach: victim`, an offset from the victim's facing. |
| `outlinePct` | `0` fills the shape; above 0 draws a band inside the edge. |
| `coneAngle` | Cone half-angle in degrees; default 45. |
| `color` | `0xAARRGGBB`; default `0x80FF0000`. |
| `ttlPoly` | Required lifetime. |
| `timerPoly` | Client countdown; `0` means none. |
| `attach` | `victim` follows the character the centre came from. |

### `IMPACT_EFFECT`

| Key | Meaning |
| --- | --- |
| `rangePoly` | Required viewer distance gate; inside it the shake has full power. |
| `powerPoly` | Required power. |
| `durationPoly` | Required duration in seconds. |

`width` is a diameter and `search.radius` is a radius. A circle that telegraphs a `radius: 1000` blast is `width: 2000`. Nothing checks this.

## Retired names

The four retired slots are rejected as node types. Use the alternatives below.

| Name | Say instead |
| --- | --- |
| `COST` | `upkeep:` on the node that raises the affect. |
| `SPLASH` | `collect: { search: ... }`. |
| `CURSE` | A `TICKER` with `attach: affect` and `counters:`. |
| `DPS` | A `TICKER` with `attach: affect`. |

## Handlers

`handler:` names an entry in `<vnum>.lua`, which returns a table of handlers. A handler implements any of `gate`, `damage_intent` or `applied`. `gate` can veto the node, `damage_intent` reshapes a hit before defence, `applied` runs after an affect landed. A declared handler with no Lua file, a handler name the file does not contain, or a handler with none of the three functions is logged and the node stays inert.
