---
title: Skill collect, accept and triggers
description: Reference for skill target populations, collection limits, and trigger events and conditions.
displayed_sidebar: mainSidebar
---

# Skill collect, accept and triggers

Use `collect` to select a node's population and `accept` to filter it. A seed is the character handed to the node; a trigger subject is the character carried by an event. See the [skill file glossary](/docs/core/skills/file) for the cast and node terms used here.

This node fragment searches around its seed for up to eight enemies and collects each victim at most once per cast:

```yaml
collect:
  source: inherit
  origin: seed
  search: { radius: 2000, take: 8 }
accept:
  of: ENEMY
  ledger: { max_per_victim: 1 }
```

## Collect a population

A scalar is shorthand for the source alone, for example `collect: caster`. A search is optional; without one, the node processes its seed subject to acceptance. The search origin controls geometry, not eligibility. A formula, or poly, in `scalePoly` can use `hit_dist`, the distance from the origin.

| Key | Values | Behavior |
| --- | --- | --- |
| `collect.source` | `inherit` (default), `caster`, `position`, `trigger_subject` | Selects the source. `caster` substitutes the caster and does not search; `trigger_subject` selects the event's other character. |
| `collect.origin` | `seed` (default), `caster`, `computation_seed` | Search center: the node seed, caster, or seed of the current computation. |
| `collect.from` | `sectree` (default), `map` | Search the local spatial tree, or all characters on the map. `map` ignores `radius`. |
| `collect.scalePoly` | Formula using `hit_dist` | Scales non-seed amounts for `DAMAGE`, `HEAL`, `AFFECT`, and `PULL`. The seed has scale 1.0. |
| `collect.search.radius` | Integer | Search radius in world units. |
| `collect.search.take` | Integer | Maximum victims; `0` is unbounded. A processed seed counts toward the limit. |
| `collect.search.include_caster` | Boolean | Include the caster in the search; otherwise the search excludes the caster. |
| `collect.search.order.within` | `distance` (default), `random` | Order within each tier. |
| `collect.search.order.tiers` | List of `SELF`, `PC`, `BOSS`, `METEOR`, `STONE`, `MONSTER`, `DOOR` | Search preference in list order. Unlisted kinds sort after listed tiers. |

## Filter and limit victims

| Key | Values | Behavior |
| --- | --- | --- |
| `accept.of` | `ANY` (default), `ENEMY`, `ALLY`, `PARTY`, `TEAM`, `SELF` | Relation to the caster. `ENEMY` and `ALLY` use the owner's decision; `SELF` admits only the caster. `TEAM` behaves like `ANY`. |
| `accept.kind` | `ANY` (default), `PLAYER`, `NON_PLAYER` | Filter player characters or all non-player characters. |
| `accept.seed` | Boolean, default `true` | Set `false` to skip the seed and process only search results. |
| `accept.seed_may_be_caster` | Boolean, default `true` | Set `false` to skip the seed when it is the caster. |
| `accept.ledger.max_per_victim` | Integer, default `0` | Maximum collections of one victim by this node in a cast; `0` imposes no limit. |
| `accept.ledger.cooldown_per_victim` | Seconds, default `0` | Minimum time before this node can collect the same victim again. |

`PARTY` admits the main target and characters sharing a party with both the caster and main target, subject to map restrictions. A strict NPC is collectable only if the skill has `NPC_BUFF` and the NPC's AI accepts buffs.

`targets:` accepts the same `collect` and `accept` clauses for the second population of `AUTO_SHOOT` and `CONCATENATED_ATTACK`. The mechanic supplies its origin.

The collection ledger belongs to a node, identified by `id` or its position. It is separate from the cast's entry-point ledger: `resolve.bound` limits client claims, while `accept.ledger` limits collections by that node. The entry-point ledger is recorded but its bound is not enforced for server-resolved casts. Formula references `use.victims` and `node.<id>.victims` read the respective ledgers.

## Register triggers

A trigger runs a skill when an event occurs on its holder. This fragment turns on a passive skill when its mounted holder has at most half HP, and turns it off on dismount:

```yaml
type: PASSIVE
triggersOn:
  - event: RIDE
    conditions:
      - { type: HP_BELOW, arg: 50 }
triggersOff:
  - event: UNRIDE
```

Each entry has an `event` and an optional `conditions` list. An entry without an `event` is logged and skipped.

| Event | When it fires | Carried subject |
| --- | --- | --- |
| `RIDE`, `UNRIDE` | Holder mounts or dismounts | None |
| `HP_CHANGED` | Holder's HP changes | New HP, not a character |
| `DEAL_BUFF`, `DEAL_DEBUFF`, `DEAL_HEAL` | Holder gives a buff, debuff, or heal | Receiver |
| `RECEIVE_BUFF`, `RECEIVE_DEBUFF`, `RECEIVE_HEAL` | Holder receives one | Giver |

Use `collect: { source: trigger_subject }` to select the carried character. The skill flag `TARGET_TRIGGER_SUBJECT` instead seeds the cast on that character; the cast is skipped if the subject is absent, dead, observing, or on another map.

## Set trigger conditions

All conditions in a list must pass. For a condition with multiple arguments, `match` selects `ANY` (default) or `ALL` within that condition.

| `type` | `arg` | Passes when the holder has |
| --- | --- | --- |
| `HP_BELOW` | Percent | HP above 0 and at most the given percentage of maximum HP. |
| `HP_ABOVE` | Percent | HP above the given percentage of maximum HP. |
| `SP_BELOW` | Percent | SP at most the given percentage of maximum SP. |
| `SP_ABOVE` | Percent | SP above the given percentage of maximum SP. |
| `HAS_AFFECT` | Affect type or list of types | The specified affect, or the types selected by `match`. An affect is a state applied to a character. |
| `IS_MOUNTED` | None | A mount. |
| `LEVEL_ABOVE` | Level | A level at least equal to `arg`. |
| `LEVEL_BELOW` | Level | A level below `arg`. |

`triggersOn` is retained only for `type: PASSIVE`. The holder must have a level in the skill and the skill must be off cooldown; a charge arrival can pass the cooldown check. `triggersOff` is registered for every skill type and requires the skill to have been used.

A triggered cast pays no cost, runs `per_use` and `per_compute` once, and does not run `post_preflight`. Triggers can chain up to depth 8. Without a cooldown, each matching event can trigger another cast.

Event names and condition types are not validated at load. An event that is never fired cannot trigger the skill. An unknown condition logs `Unknown trigger condition type: <type>` when evaluated and fails.
