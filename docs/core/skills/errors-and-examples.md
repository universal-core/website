---
title: Skill loader errors and examples
description: Skill loader diagnostics, example files, and common pitfalls.
displayed_sidebar: mainSidebar
---

# Skill loader errors and examples

A skill file that fails validation prevents the new skill table from loading. Use the log to locate the fault, then check the examples and pitfalls below. A node is one effect in a skill, and a poly is a formula string. See the [skill file glossary](/docs/core/skills/file) for these and other terms.

This server-resolved skill deals magic damage to one selected enemy:

```yaml
name: example_bolt
type: CLASS
maxLevel: 20
cooldownPoly: '10'
costType: SP
costPoly: '20'
range: 1200
useTimeout: 2500
flags: [ENEMYONLY, ATTACK_SKILL, LEVEL_UP_BY_POINT, NEED_TARGET]
client:
  job: SHAMAN
  icon: skill/shaman/jeongeop
  motionIndex: 19
resolve:
  by: server
  bound: { targets: '1', hitsPerTarget: '1' }
per_compute:
- type: DAMAGE
  id: bolt
  amountPoly: '100+60*skill_k'
  damageType: MAGIC
```

Place it in `conf/skill/<vnum>.ucskill.yaml`, substituting a numeric skill vnum (identifier). The selected target seeds `per_compute`; `ENEMYONLY` rejects a friendly target, and `NEED_TARGET` makes the client request one. Configure the icon and motion for your client.

## When loading fails

The loader reads the files in one pass and reports broken files. If any fail, it logs `There were errors when loading skill table from YAML` and discards the new table. At boot the core exits; on a proto reload the old table remains in force. Inspect the log after a reload even if the core stays up.

Skill diagnostics use `Skill[<vnum>] <name>:`; node diagnostics add `node[<n>] <TYPE>:`. The tables show representative log text. For required keys by type, see [Skill nodes](/docs/core/skills/nodes).

| Fault | Log text or cause |
| --- | --- |
| Skill directory missing | `Skill YAML directory does not exist` |
| Invalid YAML | `Skill YAML: cannot parse file` |
| Filename stem is not numeric | `cannot parse vnum from filename` |
| Missing `resolve:` or invalid `resolve.by` | `no resolve: block`, or `resolve.by must be server or client` |
| Invalid cooldown, cost, or bound formula | `syntax error cooldownPoly`, `syntax error costPoly`, or `syntax error in resolve.bound` |
| Unknown `range_bonus` or `subject` | `unknown range_bonus point`, or `unknown subject` |
| Charge declaration and dash affect disagree | `charge: true` requires an `AFFECT` node that raises `TANHWAN_DASH`; the affect also requires `charge: true` |
| Client-evaluated formula reads a server-only name | `which only the server can resolve` |
| Unknown or retired node type | `unrecognized node type` |
| Invalid node formula | `cannot analyze amountPoly`, or the corresponding `...Poly` key |
| Required node key missing | For example, `amountPoly empty`, `delayPoly empty`, or `ttlPoly is mandatory` |
| Affect has no required duration | `affect inside a non-toggable cast skil with no duration`, or `affect not in root node without douration` |
| Timed node lacks required children or targets | `a ticker with no children ticks nothing`, `should have at least one inner node`, or `a timed node must declare` targets |
| Ticker affect lacks attachment | `an affect on a ticker needs` `attach: affect` |
| Unknown node point or invalid `CUT_POINT` point | `unknown point`, or `point has to be an instant point`; `CUT_POINT` accepts HP or SP |
| Invalid `upkeep`, `counters`, `attach`, or `traits` | The diagnostic identifies the invalid field, event, or missing trait id |
| Trait constant uses a name outside the skill formula vocabulary | `which the skill poly vocabulary does not resolve` |
| Duplicate node `id` | `duplicate node id` |
| Invalid `desc.vars` | See [Skill descriptions](/docs/core/skills/descriptions) for validation rules |
| Policy id is absent from `policies.yaml` | `policy [<id>] is not declared by policies.yaml` |
| Policy restates a node's traits or counters without its own `affectVnum` | `restates traits at ... without giving that node its own affectVnum` |

## Warnings that do not stop loading

| Fault | Log text or result |
| --- | --- |
| Unknown flag | `unknown flag` |
| Unknown or non-list `weaponLimitation` | `unknown weaponLimitation`, or `weaponLimitation must be a list` |
| Unknown skill `type` | `unknown type string` |
| Unknown `collect:` or `accept:` token | For example, `unknown collect.source` or `unknown accept.of` |
| `search.radius` with `collect.from` other than `sectree` | The radius is ignored |
| Handler has no Lua file | `declares a handler but ... is missing`; the node stays inert |
| Trait id cannot be resolved | `resolves to no native, Lua or colocated trait` |

An unknown `client.job` is a separate client-side failure: the client discards that skill and logs `names an unknown type`. The server can load the same file without reporting it.

## A prerequisite visible in the client

Write both forms at the root when a requirement must be enforced by the server and shown in the client UI. The server reads only `prerequisite`; the client reads `preSkill` and `preSkillLevel`, and does not read `prerequisite`. Use the same vnum and level in both forms.

```yaml
name: example_cleave
type: CLASS
maxLevel: 20
prerequisite: { vnum: 1, level: 10 }
preSkill: 1
preSkillLevel: 10
resolve:
  by: server
per_compute:
- type: DAMAGE
  amountPoly: '100+60*skill_k'
  damageType: MELEE
```

Add the client metadata, flags, cost, and range appropriate to the skill. The flat keys set the requirement UI; they do not enforce the server requirement.

## A passive triggered by mounting

This passive applies an affect when its holder mounts and turns off on dismount. An affect is a timed or persistent status on a character. `NO_MANUAL_USE` removes the manual-use button; `NO_COOLDOWN` permits a trigger on each mount.

```yaml
name: example_mounted_bonus
type: PASSIVE
maxLevel: 20
triggersOn:
- event: RIDE
triggersOff:
- event: UNRIDE
flags: [NO_COOLDOWN, NO_MANUAL_USE]
client:
  job: HORSE
  icon: skill/common/horse/charge
resolve:
  by: server
per_compute:
- type: AFFECT
  point: MOB_CRITICAL_PCT
  amountPoly: 'min(10, skill_level)'
  durationPoly: '3600'
```

The affect has its own duration; choose one that fits the intended behavior. See [Collect, accept and triggers](/docs/core/skills/collect-and-triggers) for trigger conditions and events.

## Pitfalls

**A node does nothing and the log is quiet.** A key a node type does not read is ignored. For example, `nodes:` on `POISON` and `successPctPoly` on `TICKER` have no effect. Check the [node reference](/docs/core/skills/nodes).

**An ordered search collects nothing.** A `collect.search` with `order:` also needs `take:`. With an order, zero iterations collect nothing; without an order, zero means unbounded. `AUTO_SHOOT` targets are exempt because `targetCountPoly` supplies the count.

**An 80 percent success chance fires only 8 percent of the time.** `successPctPoly` uses per mille: use `'800'` for 80 percent. Omitting the key makes the node always succeed.

**A one-shot ticker fails validation.** `delayPoly` is required even when `countPoly` is 1. Give it the same value as `delayStartPoly`.

**An attached ticker ends before its final tick.** If its affect duration and final tick fall in the same pulse, the affect can end first and stop the run. Leave headroom or omit the affect duration.

**A decal is half the blast's size.** `width` is a diameter; `search.radius` is a radius. A radius of 1000 needs a width of 2000.

**`post_preflight:` never runs.** Triggered casts run `per_use:` and `per_compute:` only. A client-resolved cast also needs the end-of-motion packet to reach `post_preflight:`; there is no timeout for a missing packet. Put effects required for a paid cast in `per_use:`.

**An effect runs once per victim instead of once per cast.** `per_compute:` runs per seed. For a value based on the total `use.victims`, use `post_preflight:` when its completion rules fit the skill.

**A passive trigger never fires.** Only `type: PASSIVE` keeps `triggersOn`; other types drop it without a message. A trigger with no cooldown can fire on every matching event.

**The client and server disagree about a requirement.** Keep root `prerequisite.vnum` and `prerequisite.level` aligned with root `preSkill` and `preSkillLevel`. The server enforces the former; the client uses the latter for its UI. The server does not read the `client:` block.

## See also

- [Skill file and glossary](/docs/core/skills/file): setup, top-level keys, and phases.
- [Skill nodes](/docs/core/skills/nodes): node types and required keys.
- [Collect, accept and triggers](/docs/core/skills/collect-and-triggers): target selection and event conditions.
- [Skill descriptions](/docs/core/skills/descriptions): description variables and validation.
- [One file per skill](/foundations/skills/one-file): the model behind the file.
