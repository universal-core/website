---
title: Skill file overview
description: Skill file setup, root keys, client fields, and cast phases.
displayed_sidebar: mainSidebar
---

# Skill file overview

A skill file defines a skill's costs, targeting, presentation, and effect nodes. The server and client read the same YAML file. For the model behind it, see [Skills](/foundations/skills).

## Quick start

Save this example as `conf/skill/1.ucskill.yaml` and make the same file available to the client:

```yaml
name: example_cleave
type: CLASS
maxLevel: 40
costType: SP
costPoly: '40'
cooldownPoly: '15'
range: 450
flags: [ENEMYONLY, ATTACK_SKILL, NEED_TARGET]
client:
  job: WARRIOR
  icon: skill/example_cleave
  motionIndex: 1
resolve:
  by: client
  bound: { targets: '5', hitsPerTarget: '1' }
per_compute:
- type: DAMAGE
  id: damage
  amountPoly: '100'
  damageType: MELEE
  accept: { of: ENEMY }
```

Supply an icon and a motion that sends skill hits in your client. The server accepts up to five distinct targets and one hit per target for a cast; each accepted hit runs the damage node. See [descriptions](/docs/core/skills/descriptions) for the player-facing name and tooltip.

## Glossary

| Term | Meaning |
| --- | --- |
| Policy | A registered rule or variant selected for a skill. |
| Handle | An identifier returned when a rule is registered, used to refer to that registration. |
| Vnum | The numeric identifier of a skill. |
| Poly | A formula string evaluated using named values. |
| Intracore | A cast authorized on one core and executed on every core without a performer. |
| Subject | The character, guild, or empire that owns a cast. |
| Anchor | The position or entity used as a reference for a node's target search. |
| Node | An effect in a phase or in another node's children. |
| Phase | A list of nodes run at a particular point in a cast. |
| Core | A running game server process. |

## Files and setup

| Item | Location or purpose |
| --- | --- |
| Skill file | `conf/skill/<vnum>.ucskill.yaml`, one file per vnum. The filename supplies the vnum; there is no root `vnum` key. |
| Handler | `conf/skill/<vnum>.lua`, for handlers named by nodes. See [extensions](/docs/core/skills/extension). |
| Policy IDs | `conf/skill/policies.yaml` declares IDs accepted under `policies`. |
| Description | `desc` declares variables; client description files provide the text. See [descriptions](/docs/core/skills/descriptions). |

The server ignores names without the `.ucskill.yaml` suffix. Deploy the same skill files to the client pack at `locale/universal/skill`. The client looks for vnums 1 through 1000; a character can hold skill vnums up to 399. The server reads the folder as a whole at boot and on a proto reload. A boot load failure stops initialization; a failed reload keeps the old table. See [errors and examples](/docs/core/skills/errors-and-examples).

## Top-level keys

Root keys are optional except for `resolve`. Values under `client` are presentation fields. A poly is a formula, and quoted strings keep YAML from interpreting the expression as another type.

### Identity

| Key | Type | Meaning |
| --- | --- | --- |
| `name` | string | Internal name, up to 64 characters, also used in logs. Player-facing text comes from the description file. |
| `type` | enum | `CLASS`, `SPECIALIZATION`, `HORSE`, `SUPPORT`, `GUILD`, `PASSIVE`, or `MOB`. An unknown value is logged and becomes no type. `PASSIVE` enables `triggersOn`; the client uses `HORSE` to identify a horse skill. |
| `maxLevel` | integer | Highest skill level. |
| `levelLimit` | integer | Character level required by the server. |
| `prerequisite` | map | Server requirement: `{vnum: <skill>, level: <n>}`. The server enforces this field. |
| `preSkill`, `preSkillLevel` | integers | Flat root fields read by the client to show its requirement UI. For a requirement that must also appear in that UI, write both these fields and the matching `prerequisite` map. The client does not read `prerequisite`; the server enforces only `prerequisite`. |
| `subject` | enum | Cast owner: `character`, `guild`, or `empire`. Defaults to `guild` for `type: GUILD`, otherwise `character`. An unknown value fails loading. |
| `intracore` | boolean | Authorize on the originating core and execute on every core without a performer. Requires a guild or empire subject. |

### Cost and cooldown

| Key | Type | Meaning |
| --- | --- | --- |
| `costType` | enum | `SP`, `HP`, or `SUBJECT_GOLD`. Absent or empty means no cost; `costPoly` is then not read. |
| `costPoly` | poly | Cost amount. |
| `cooldownPoly` | poly | Cooldown in seconds. |

Cost and cooldown are evaluated before a victim is hit, with caster values. The client evaluates them too. `SUBJECT_GOLD` charges the guild or empire subject; it is invalid for a character subject. `SP` and `HP` costs are invalid for guild and empire subjects.

### Reach and delivery

| Key | Type | Meaning |
| --- | --- | --- |
| `range` | integer | Use range. `0` is unbounded. |
| `range_bonus` | point name | The point value multiplied by 100 extends server reach. An unknown name fails loading. |
| `useTimeout` | integer | How long a use stays in flight, in milliseconds; also the charge windup window. |
| `weaponLimitation` | list | `SWORD`, `DAGGER`, `BOW`, `TWO_HANDED`, `BELL`, `FAN`, or `DOUBLE_SWORD`, an alias of `DAGGER`. Empty or absent allows any weapon. Invalid entries are logged. |
| `shoot` | boolean | The hit arrives on a shoot packet. |
| `charge` | boolean | The press starts a dash and arrival lands the hit, within `useTimeout`. |
| `skillshot` | boolean | Client-side motion hitbox targeting without a distance check. |

The server allows `range + 300`, plus `range_bonus * 100`, for latency slack. Range gates a use; it does not collect targets. A splash has its own radius. A charge requires an `AFFECT` node that raises `TANHWAN_DASH`; that affect also requires `charge: true`. Put the dash in `per_use`. See [nodes](/docs/core/skills/nodes).

### Resolve

```yaml
resolve:
  by: client
  bound: { targets: '5', hitsPerTarget: '1' }
```

| Key | Meaning |
| --- | --- |
| `by` | Required: `server` selects victims, or `client` supplies them through hit packets. Missing or unknown values fail loading. |
| `bound.targets` | Poly limiting distinct victims per cast. `0` or empty is unbounded. |
| `bound.hitsPerTarget` | Poly limiting hits per victim. `0` or empty is unbounded. |

The bound limits client claims at the entry point. A node can also have its own ledger limit; see [collect, accept, and triggers](/docs/core/skills/collect-and-triggers). With server resolution the bound is still evaluated and `use.bound.targets` can read it.

### Flags

Write flags as a list under `flags`. Unknown names are logged and skipped; an absent list sets no flags.

| Flag | Read by | Meaning |
| --- | --- | --- |
| `SELFONLY`, `OTHERONLY`, `NPCONLY`, `PCONLY` | Server | Restrict the victim of a use. |
| `ALLYONLY`, `ENEMYONLY` | Both | Restrict the victim; the client also avoids offering the wrong target. |
| `NPC_BUFF` | Both | Allow an NPC target if its AI accepts buffs. |
| `TOGGLE` | Server | Mark a toggle and relax duration checks for `AFFECT` and `AUTO_SHOOT`. |
| `NO_COOLDOWN` | Server | Do not apply a cooldown after use. |
| `PERSISTENT_COOLDOWN` | Server | Keep cooldown across relog. |
| `TARGET_TRIGGER_SUBJECT` | Server | Aim a triggered cast at the event's other party. |
| `ATTACK_SKILL` | Both | Mark an attack and enforce attack restrictions. |
| `LEVEL_UP_BY_POINT` | Both | Allow raising the skill with a point. |
| `NO_MANUAL_USE` | Client | Do not offer manual casting. This is separate from `type: PASSIVE`. |
| `NEED_TARGET`, `SEARCH_TARGET`, `NEED_CORPSE`, `CAN_USE_FOR_ME`, `CAN_CHANGE_DIRECTION`, `STANDING_SKILL`, `MOVING_SKILL`, `AFFECT_TOGGLED`, `FAN_RANGE`, `CIRCLE_RANGE` | Client | Control how the interface turns a press into a cast. |

Victim flags govern the target of a use. A node's `accept` filters the targets that node reaches.

### Other root keys

| Key | Meaning |
| --- | --- |
| `triggersOn`, `triggersOff` | Trigger configuration. See [collect, accept, and triggers](/docs/core/skills/collect-and-triggers). |
| `desc` | Description variables under `vars`. Invalid entries fail loading. See [descriptions](/docs/core/skills/descriptions). |
| `policies` | Map of policy IDs to paths and values patched onto a copy of the skill. Each ID must be declared in `policies.yaml`. Policies resolve in registration order. |
| `per_use`, `per_compute`, `post_preflight` | Phase lists containing nodes. |

There is no root `nodes` list. Put nodes in a phase; a node may also contain child `nodes`.

### Client block

| Key | Meaning |
| --- | --- |
| `job` | Skill list: `WARRIOR`, `ASSASSIN`, `SURA`, `SHAMAN`, `SPEC`, `RAGE`, `ACTIVE`, `SUPPORT`, `GUILD`, `HORSE`, `PASSIVE`, or `NONE`. Case does not matter. An unknown value makes the client drop the skill. |
| `icon` | Path under the image root. |
| `motionIndex` | Motion; an empty string means no motion. |
| `gradeCount` | Number of grade variants; default `4`. |
| `minPgLevel` | Character level required by the interface. |
| `motionLoopCount` | Poly for the motion loop count. |

The client also reads root fields including `range`, `range_bonus`, `skillshot`, costs, cooldown, `maxLevel`, flags, weapon limitations, `charge`, `type`, `subject`, `preSkill`, `preSkillLevel`, `desc`, `policies`, and `resolve.bound.targets`. A mob skill can omit `client`.

## Intracore constraints

An intracore cast has no performer. The loader rejects these shapes:

| Refused shape | Reason |
| --- | --- |
| `character` subject | Character state is not present on every core. |
| `per_use` | It needs a caster seed. |
| No `per_compute` nodes | There is no effect to execute. |
| Top-level node without `collect.search`, or with `collect.from`, `collect.origin`, `collect.scalePoly`, or a caster source | There is no seed or performer to supply a center. |
| Top-level node with `of: SELF`, `of: PARTY`, or without explicit `ALLY` or `ENEMY` | The relation needs a performer or roster side. |
| `handler`, `damageType: RANGE`, `absorb`, or `to: caster` | Each requires a performer's body. |

`post_preflight` remains available. For target selection, see [collect, accept, and triggers](/docs/core/skills/collect-and-triggers).

## Phases

Each phase is an optional sequence. Node IDs share a counter across phases, so a poly in one phase can refer to a node in another.

| Phase | When it runs | Seed |
| --- | --- | --- |
| `per_use` | Once per cast, before computation. | Caster. Its nodes can still search for other targets. |
| `per_compute` | Once per seed. | One victim. Resolution determines how seeds arrive. |
| `post_preflight` | Once after all victims are known. | Caster. `use.victims` is available here. |

With `resolve.by: server`, traversal runs `per_compute` and then `post_preflight`. With `resolve.by: client`, each accepted hit packet runs `per_compute`; the end-of-motion packet runs `post_preflight`. The server counts victims in its own ledger. A triggered cast runs `per_use` and `per_compute` once and does not run `post_preflight`.

A client hit packet is checked for resolution mode, a prior press, polymorph, victim flags, a victim, range, and the resolve bound. For node types and child execution, see [nodes](/docs/core/skills/nodes); for failures, see [errors and examples](/docs/core/skills/errors-and-examples).
