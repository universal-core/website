---
title: Skill loadout policy reference
description: Register loadout rules, build plans, and control when skill pages and levels are refreshed.
displayed_sidebar: mainSidebar
---

# Skill loadout policy reference

A loadout rule selects skills and their positions for a character. Its guard selects characters; its builder returns a plan of pages and skills. The ordinary skill bar is the default when no plan is in force. See [skill policies](/foundations/skills/policies) and the [policy model](/foundations/policies). The [policies glossary](/docs/building-blocks#policies-glossary) defines shared terms.

## Quick start

This `.forge` file registers a rule for characters on `MAP_A`, a map index placeholder. Forge loads scripts into Luna, the parallel Lua runtime. A vnum identifies a skill.

```forge
forge example_loadout begin
    environment game begin
        local MAP_A = 1
        local handle = forge.sys.game.skill_loadout.register(
            "example_loadout",
            function(ch) return ch:get_map_index() == MAP_A end,
            function(ch)
                return {
                    pages = { { id = "ACTIVE", layout = "flat" } },
                    skills = { { page = "ACTIVE", slot = 1, vnum = 31, level = 40 } },
                }
            end)
        return { handle = handle }
    end
end
```

Save it as `example_loadout.forge` and load it as described in [Forge setup](/docs/core/luna-forge/setup). Matching characters see skill 31 at level 40 in the first active position; other pages retain their ordinary bar. Call `refresh(ch)` after a map change if the rule must be re-evaluated.

## Files and setup

- The Lua API exists on game cores. Registrations belong to the core process and are not saved; register them again after a restart.
- Register from a Forge environment or another game-core callback. Keep the returned handle to unregister the rule. See [Forge setup](/docs/core/luna-forge/setup) for loading instructions.
- Load the content library to use its plan helpers.
- The client skill window must recognize the page IDs and positions used by a plan.

## API

### `forge.sys.game.skill_loadout`

| Name | Signature | Returns | Context | What it does |
| --- | --- | --- | --- | --- |
| `register` | `register(name, guard, builder)` | `number` handle, greater than 0 | game core, outside any guard or builder | Appends a loadout rule to the end of the list and rebuilds every character online. |
| `unregister` | `unregister(handle)` | `boolean` | game core, outside any guard or builder | Removes the rule and rebuilds every character online. `true` when found, `false` for an unknown handle. |
| `refresh` | `refresh(ch)` | `boolean` | game core | Re-runs the rules for one character and pushes the difference. `true` when the plan changed. |
| `has` | `has(ch)` | `boolean` | game core | Whether a plan is in force on this character. |
| `plan` | `plan(preset)` | `PLAN` table | game core | Builds a plan procedurally. With a preset it returns a deep copy of it; without, an empty plan. |

Parameters of `register`:

| Parameter | Type | Meaning |
| --- | --- | --- |
| `name` | `string` | Cosmetic. It appears in the log lines of this rule and is never compared: duplicates are two rules. |
| `guard` | `fun(ch): boolean` | "Does this rule own this character?" Required. `true` makes the rule the loadout of `ch`. |
| `builder` | `fun(ch): PLAN` | Called when the guard returned `true`. Returns the plan as a plain table. Required. |

There is no priority parameter and no replace-by-name. A `guard` or `builder` that is not a function stops the call with `skill_loadout.register: guard is not callable` or `skill_loadout.register: builder is not callable`, before anything is registered. Inside a forge environment body that error fails the forge load, and then the game core does not start.

Handles start at 1, increase per registration, and are never reused. Both callables stay alive until `unregister`; the handle is required for removal. Lua rejects empty callables, so `register` never returns 0.

`plan(preset)` returns a table with two extra methods, `page` and `grant`. Both return the plan itself, so calls chain.

| Method | Signature | What it does |
| --- | --- | --- |
| `PLAN:page` | `page(id, opts)` | Appends a page to `pages`. `opts` is `{ layout = "flat" or "tabbed", groups = GROUP[] }`, copied. |
| `PLAN:grant` | `grant(page, slot, vnum, level)` | Appends a skill to `skills`. |

A builder can also return a plain table.

### Callback arguments

| Callable | Arguments | Notes |
| --- | --- | --- |
| `guard` | `ch` | The character being rebuilt. Players only: the engine never rebuilds a mob's loadout. |
| `builder` | `ch` | The same character. There is no table of context fields, only the character; anything more is read from it. |

### The plan

What the builder returns. Both fields are optional: a table with neither is an empty plan, which means "no loadout" and puts the character back.

| Field | Type | Meaning |
| --- | --- | --- |
| `pages` | `PAGE[]` | The pages this plan speaks for. |
| `skills` | `SKILL[]` | The skills the character holds, each at a position on a page. |

A page named in `pages` or by a skill is replaced whole on the client. Unnamed pages retain their ordinary bar, layout, and levels.

`PAGE`:

| Field | Type | Default | Meaning |
| --- | --- | --- | --- |
| `id` | `string` | none, required | `"ACTIVE"`, `"SPEC"`, `"SUPPORT"` or `"HORSE"`. An empty id refuses the whole plan. |
| `layout` | `string` | `"flat"` | `"flat"` or `"tabbed"`. Anything other than `"tabbed"` is flat. |
| `groups` | `GROUP[]` | none | The tabs. Sent only when the page is tabbed; ignored otherwise. |

`GROUP`, one tab of a tabbed page:

| Field | Type | Default | Meaning |
| --- | --- | --- | --- |
| `label` | `string` | empty | The text shown on the tab. |
| `gate_slot` | `number` | 0 | The position whose skill, when it has a level, makes the tab appear. |
| `slots` | `number[]` | none | The positions the tab windows onto. |

`SKILL`:

| Field | Type | Default | Meaning |
| --- | --- | --- | --- |
| `page` | `string` | none, required | The page id. An empty page refuses the whole plan. |
| `slot` | `number` | 0 | A 1-based position on the page, not an interface slot. Two pages may both have a position 1. |
| `vnum` | `number` | 0 | The skill. Vnum 0 refuses the whole plan. |
| `level` | `number` | 0 | 0 to 40. The stock client casts a skill only from level 1 up; the server clamps anything above 40 to 40. |

Page capacities, as positions that exist on the page:

| Page | Positions | Notes |
| --- | --- | --- |
| `ACTIVE` | 6 | |
| `HORSE` | 6 | |
| `SUPPORT` | 12 | |
| `SPEC` | 12 | Four tabs of three. A page declared flat draws only the first three. |

The server does not check capacity: unseen positions still receive levels. The client logs and skips `SPEC` position 0 or positions above 12.

### Helpers from the content library

These Lua helpers come from the content library.

| Name | Signature | What it does |
| --- | --- | --- |
| `PAGES` | table | Positions per page, `flat` and `tabbed`. A mirror of the client geometry. |
| `PAGE_DEFAULTS` | table | The ordinary `SUPPORT` and `HORSE` vnums, cell for cell. `0` is a cell left empty. |
| `next_free` | `next_free(plan, page)` | The lowest unused position on `page`, or `nil` when the page is unknown or full. |
| `PLAN:grant_next` | `grant_next(page, vnum, level)` | Grants at the first free position, declaring the page flat when it was not declared. Returns the plan, or `nil` and a log line when the page is full. |
| `PLAN:grant_default` | `grant_default(page, ch, opts)` | Lays the ordinary `SUPPORT` or `HORSE` bar onto the page. `opts.level` fixes the level, otherwise each skill keeps the level the character holds; `opts.vnums` replaces the canned list. |

Keep `PAGES` in step with the client geometry.

### C++ registration

Engine code registers on the same list through the singleton `CSkillLoadout`. The guard is a plain function, and the builder fills a plan struct instead of returning a table.

| Call | Signature | Returns |
| --- | --- | --- |
| `Register` | `Register(std::string name, GuardFn guard, BuilderFn builder)` | `handle_t` (`uint64_t`), `INVALID_HANDLE` (0) when the guard or the builder is empty |
| `Unregister` | `Unregister(handle_t)` | `bool`, `false` for an unknown handle |
| `Refresh` | `Refresh(LPCHARACTER ch, bool bForce = false)` | `bool`, `true` when the plan changed. `bForce` sends even when nothing moved. |

Types of a native registrant:

| Type | Definition |
| --- | --- |
| `GuardFn` | `std::function<bool(CHARACTER*)>` |
| `BuilderFn` | `std::function<bool(CHARACTER*, SLoadoutPlan&)>`, returns `false` when it could not build |
| `handle_t` | `uint64_t` |

A null guard or builder is refused in the server error log (`syserr`) with `skill_loadout [<name>]: needs both a guard and a builder`. Unlike the use policy, a null guard does not mean every character: both are required. The native structs are `SLoadoutPlan` (`vecPages`, `vecSkills`), `SLoadoutPage` (`strId`, `bTabbed`, `vecGroups`), `SLoadoutGroup` (`strLabel`, `unGateSlot`, `vecSlots`), and `SLoadoutSkill` (`strPage`, `unSlot`, `unVnum`, `bLevel`). Lua table parsing checks empty page IDs and vnum 0; C++ builders fill the structs without those checks. Native and Lua registrations share one list. Resolution follows registration order within a core; across forges, registration follows forge load order, which is not guaranteed.

## Resolution

On every rebuild of a character the engine walks the list in registration order and calls each guard. The first guard that returns `true` owns the character: its builder is called and the walk stops. Later rules are never asked. A character has one loadout or none. If no guard fires, the plan is empty and the character has no loadout.

The engine compares pages, groups, and skills in order. A changed plan is applied and sent to the client.

## When the plan is rebuilt

| Edge | Who is rebuilt |
| --- | --- |
| `register` | every character online |
| `unregister` | every character online, not only the holders: dropping the rule is what puts their real skills back |
| `refresh(ch)` | that character |
| The character enters the game phase | that character, forced: the plan is sent even if unchanged |

Only players are rebuilt. Map changes do not trigger a rebuild. Call `forge.sys.game.skill_loadout.refresh(ch)` when state read by a guard or builder changes.

Entry is forced because the client drops its loadout on a phase change.

## Server state and failures

The server indexes levels by vnum; the cast packet carries a vnum. Slots are client presentation.

| Part | Lives | What it is |
| --- | --- | --- |
| The levels | server | Real state of the live character. What the cast checks answer from. |
| The slots | client | Presentation, shipped to the client. Presentation sent to the client. |

Applying a plan writes each `level` onto the live character through the skill level setter, clamped to 40, and recomputes the character's points. The previous level of every vnum the plan touches is kept, on the first touch only: a second plan does not overwrite the restore point with a level the loadout itself wrote. A skill the old plan raised and the new plan does not name is put back to its kept level. Dropping the plan, by `unregister` or by a guard that stops matching, restores every kept level and clears the plan.

A plan lifts skill group and specialization membership checks for casts and learning. Other cast checks remain, followed by the [skill use policy](/docs/building-blocks/skill-use-policy).

A builder error, non-table result, empty page ID, or skill with vnum 0 or an empty page produces an empty plan. The character keeps its real skills. The server logs:

```text
skill_loadout [<name>]: builder failed for pid <player id>
```

A builder that fails does not hand the character to the next rule: the first matching guard owns it, plan or not. A guard that raises or returns anything but a boolean counts as `false`, and the next rule is tried. Both log per call, so a typo shows up as a flood.

Registration and removal write no log line of their own. An unknown handle to `unregister` returns `false` and logs nothing.

## Client updates

Every change is sent as two packets in a fixed order: the loadout first, the skill levels second. The loadout packet carries pages, groups, positions, and vnums, but no levels. The client needs the slot map before it can apply levels by vnum.

On receipt the client:

1. Wipes its whole skill slot data.
2. Lays the ordinary bar down, from its static table, for every page.
3. Calls the install routine of the character window, which empties every page the plan names and writes the plan's skills into it. A page is named when it is declared or holds a skill.

The client resolves page positions to slot indexes: `ACTIVE` starts at slot 1, `HORSE` at 9, `SUPPORT` at 101 and `SPEC` at 220. A page id it does not know is logged as `InstallSkillLoadout: no page named <page>` and a position outside the page as `InstallSkillLoadout: page <page> has no slot <position> (vnum <vnum>)`; the rest of the plan is still installed. The client reinstalls the plan when the skill group changes.

With no matching rule a character has no plan and the client uses its static table. A forced refresh still sends the empty plan and skill levels. A tabbed page shows a tab when the skill at its `gate_slot` position has a level. A flat page draws no tabs.

A character save can persist live levels written by a plan; see [examples and pitfalls](/docs/building-blocks/loadout-policy-examples).

## See also

- [Skill use policy](/docs/building-blocks/skill-use-policy) controls casts.
- [Skill policy](/docs/building-blocks/skill-policy) controls skill behavior.
- [Loadout policy](/docs/building-blocks/loadout-policy) is this reference.
- [Loadout policy examples and pitfalls](/docs/building-blocks/loadout-policy-examples) provides recipes and failure cases.
