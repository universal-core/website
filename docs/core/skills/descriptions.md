---
title: Skill descriptions reference
description: Author skill description sentences and variables, and understand how the client renders their values.
displayed_sidebar: mainSidebar
---

# Skill descriptions reference

A skill description combines localized text with values read from the skill configuration. The client renders the text; the server validates the variables and supplies values that require server state. See the [Skills glossary](/docs/core/skills/file) for terms used here and [Skill descriptions](/foundations/skills/one-file) for the model.

## Quick start

In the skill config `conf/skill/100.ucskill.yaml`, add a description variable that refers to a node with ID `hit` and an `amountPoly` field:

```yaml
desc:
  vars:
    damage: { ref: node.hit.amountPoly }
```

In the client locale sentence file `skill_desc/100.ucskilldesc.yaml`, use that variable:

```yaml
name: Example strike
description: |-
  Deals $damage damage.
```

The tooltip replaces `$damage` with the evaluated number. A poly is a formula expression; the [formula reference](/foundations/skills/beyond-the-formula) explains its vocabulary.

## Files and loading

| File | Side | Purpose |
| --- | --- | --- |
| `conf/skill/<vnum>.ucskill.yaml` | Server and client | Skill configuration, including `desc.vars`. Keep the client copy in sync with the server. |
| `skill_desc/<vnum>.ucskilldesc.yaml` | Client locale | Skill name, description and optional policy-specific text. |
| `skill_desc/policies.ucskilldesc.yaml` | Client locale | Display labels for policy IDs. |
| `conf/skill/policies.yaml` | Server and client | Declares policy IDs. |
| `locale_game.txt` | Client locale | Formula-name and tooltip labels. |

The client loads configs before descriptions. It looks for sentence files numbered 1 through 1000 and skips missing files. A sentence file with no matching config is skipped. Loading fails if no configs or no description files load. No description compilation step is required.

## Sentence file

A sentence file accepts these keys; other keys are ignored. A policy is a named configuration variant; see [Skill policies](/foundations/skills/policies).

| Key | Meaning |
| --- | --- |
| `name` | Player-facing name. An empty value keeps the config name. |
| `description` | Player-facing text. An empty value leaves no text. A block scalar preserves line breaks. |
| `policies.<id>.name` | Name for a variant; absent means the base name. |
| `policies.<id>.description` | Text for a variant; absent means the base text, evaluated against the variant config. |

### Tokens and markup

| Text | Result |
| --- | --- |
| `$name` | Value of `desc.vars.name`. A name starts with a letter or `_` and continues with letters, digits or `_`. |
| `|cAARRGGBB` ... `|r` | Client color markup followed by a reset. |
| `%` | A literal percent sign, including after a variable. |

Replacement uses declared names longest first. Text immediately following a name can be consumed as part of a replacement: `$costs` with a declared `cost` prints the cost followed by `s`. An undeclared token remains visible and is logged.

### Policy labels

The label file maps each policy ID to a `name`:

```yaml
example_policy:
  name: Example configuration
```

The switcher uses `SKILL_POLICY_BASE` for the base configuration. A missing label falls back to the policy ID. A policy-specific sentence needs a corresponding declared policy and a variant in the skill config.

## Description variables

`desc.vars` maps each token name to a source and optional transformations. Each variable has exactly one of `ref` or `value`.

| Key | Value | Meaning |
| --- | --- | --- |
| `ref` | Path to a scalar poly | Read a formula from the skill config. |
| `value` | Plain number | State a constant; expressions that read names are refused. |
| `with` | Map of name to number | Pin names read by a referenced poly. Requires `ref`. |
| `delta_at` | Map of name to number | Evaluate the referenced poly at the given value and at zero, then subtract. Requires `ref`. |
| `as` | Poly | Transform the result after the source values are evaluated. |

A constant duplicates a number rather than tracking another source. Keep it synchronized when that source changes.

### Reference paths

| Shape | Target |
| --- | --- |
| `node.<id>.<field>` | Field of a node identified by `id`. |
| `node.<id>.nodes.<child>.<field>` | Field of a child node. |
| `node.<id>.traits.<trait>.formulas.<name>` | Formula attached to a node; see the [traits reference](/docs/core/traits/concepts). |
| `resolve.bound.targets`, `resolve.bound.hitsPerTarget` | Resolve bounds. |
| `cooldownPoly` | Example of a skill-level field. |

Segments after the node ID are YAML keys. A path must end at a scalar that parses as a poly. Trait constants are substituted before the formula is evaluated.

### Pins and rates

`with` and `delta_at` must name a value the referenced poly actually reads. The same name cannot appear in both maps. A pin applies to the displayed value and formula. `delta_at` gives a rate only if the poly is linear in that name; choose a unit large enough that truncation does not erase the result.

For a poly that reads `victim_point_MAX_HP`, these variables describe its value at zero and its change per 100 points:

```yaml
desc:
  vars:
    base: { ref: node.heal.amountPoly, with: { victim_point_MAX_HP: 0 } }
    per100: { ref: node.heal.amountPoly, delta_at: { victim_point_MAX_HP: 100 } }
```

### Transforming a value

`as` runs once after all source values are evaluated. `value` means the variable's own source result; a sibling name reads that sibling's source result, before its own `as`. An expression cannot name its own variable or read another `as` result.

```yaml
desc:
  vars:
    drop: { ref: node.drain.amountPoly, as: '0-value' }
```

This displays a negative amount as a positive drop.

### Names a poly can read

| Name | Client | Server | Description rule |
| --- | --- | --- | --- |
| `skill_level`, `skill_k`, `skill_power`, `skill_spec` | Yes | Yes | No pin needed. |
| `calc_missing_hp`, `calc_missing_sp`, `calc_precision_rate`, `calc_raw_phys_att`, `calc_raw_magic_att`, `calc_raw_adaptive_att`, `calc_total_adaptive_att` | Yes | Yes | No pin needed. |
| `point_<NAME>` | Yes | Yes | No pin needed for character points. |
| `quest_flag.<flag>` | No | Yes | Unpinned flags make the variable server-resolved; a pin keeps it local. |
| `subject_level`, `subject_member_count`, `subject_gold`, `subject_flag.<flag>` | No | Yes | Pin unless the variable is server-resolved. |
| `calc_horse_level`, `calc_hp_without_defensor`, `calc_def_penetration`, `is_mental`, `is_archer`, `is_assassin` | No | Yes | Pin unless the variable is server-resolved. |
| `victim_is_self`, `victim_calc_*`, `victim_point_<NAME>` | No | Yes | Pin unless the variable is server-resolved. |
| `node.*`, `self.*`, `use.*` | No | Cast state | Pin for a description. |
| Unresolved names | No | No | Pin or use `delta_at`. |

A pin or `delta_at` supplies its name to both evaluators. Unknown names are rejected even in server-resolved variables.

## Client rendering

The client evaluates source polys with pins, applies each `as`, then substitutes tokens longest first. Displayed numbers are signed whole numbers, truncated toward zero. A negative value retains its sign.

| Python call | Result or behavior |
| --- | --- |
| `skill.GetDescription(vnum, level, power[, mode])` | Rendered string. `power` is the tooltip efficiency as a float. An unknown skill raises an exception. Requests server values on each call when needed. |
| `skill.HasFormulas(vnum)` | `1` if a variable has `as` or a poly that reads a name, otherwise `0`. |
| `skill.GetSkillName(vnum)` | Player-facing skill name. |
| `skill.GetPolicyCount(vnum)` | Number of configurations, including the base. |
| `skill.GetPolicyInfo(vnum, index)` | `(id, label)`; index 0 is the base with empty strings. An out-of-range index raises an exception. |
| `skill.GetActivePolicyIndex(vnum)` | Index of the first active policy in server registration order, or 0 for the base. |
| `skill.SetPreviewPolicy(vnum, index)` | Preview the indexed configuration. |
| `skill.ClearPreviewPolicy()` | Clear the preview. |

The optional rendering mode controls each token:

| Mode | Output |
| --- | --- |
| `skill.DESC_PLAIN` | Number; the default. |
| `skill.DESC_EXPANDED` | Number and, where applicable, `(= formula)`. |
| `skill.DESC_SYMBOLIC` | Formula alone. |

Expanded mode omits the formula for a constant poly and for a `delta_at` variable. Pinned names print as numbers. Formula output uses `{p:<pointType>}` for points and `{s:<name>}` for other names; `*` prints as ` x `. `LocalizeSkillFormula` turns these markers into display words. For a string marker it looks up `SKILLVAR_<NAME>` in `locale_game.txt`, uppercasing the name and replacing dots with underscores. An unknown name displays as itself.

The tooltip displays plain values by default and expanded values while SHIFT is held. SHIFT+TAB cycles configurations when more than one is available. The tooltip opens on the active configuration; a preview selects another until cleared.

## Server-resolved values

A variable is server-resolved when its poly reads an unpinned `quest_flag.<flag>`. The client requests values with the skill vnum and level on each description call for a skill with such variables. The server clamps the level to the skill maximum and evaluates the variables for the caster under the active policy.

The exchange follows this order:

1. The client renders with unread flags at zero while it waits.
2. The server sends values multiplied by 1000 as 32-bit integers. Both sides sort server-resolved variables by name, so the reply is positional.
3. The client drops a reply with an unexpected value count. When accepted values change, it calls `BINARY_SkillDescValuesUpdated` on the game window to redraw the tooltip.

Keep client and server configs synchronized: a count mismatch drops the reply. A pin on the flag prevents that flag from requiring a server value.

## Validation and errors

The server validates every base configuration and policy variant. A bad variable fails the skill table load. At boot this stops the game core; on reload the previous table remains live. Server messages identify the skill and variable.

| Problem | Fix |
| --- | --- |
| Both or neither of `ref` and `value` | Supply exactly one source. |
| `with` without `ref`, or a nonconstant `value` | Pin a reference, or use a plain numeric value. |
| Reference does not resolve to a scalar poly | Check the node ID, path and target value. |
| Unknown or client-unavailable name | Pin it, use `delta_at`, or use a server-resolved variable where applicable. |
| Pin or rate name is absent from the poly | Match the name read by the referenced poly. |
| Same name is pinned and used in `delta_at` | Use one operation for that name. |
| Invalid `as`, self-reference or unknown sibling | Correct the expression; use `value` for its own source. |

The client logs missing or unused sentence variables, missing configs, unresolved references, undeclared policies, missing labels, unknown active policies, mismatched server value counts and invalid sentence YAML. Missing variables remain literal in the text; unused variables are still evaluated. An unresolved client reference is dropped. A missing policy label displays its ID.

## See also

- [Skill file and glossary](/docs/core/skills/file): config keys and terminology.
- [Skill policies](/foundations/skills/policies): variants and policy selection.
- [Skill formulas](/foundations/skills/beyond-the-formula): formula vocabulary and evaluation.
