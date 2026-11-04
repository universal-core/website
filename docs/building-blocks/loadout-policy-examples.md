---
title: Skill loadout policy examples
description: Examples and pitfalls for building, refreshing, and removing skill loadout policies.
displayed_sidebar: mainSidebar
---

# Skill loadout policy examples

A loadout policy selects a plan of skill pages, positions, and levels for a character.
For registration, plan fields, and rebuild behavior, see the [loadout policy API](/docs/building-blocks/loadout-policy) and the [policy model](/foundations/policies).

A guard selects characters; a builder returns their plan. A vnum is a numeric skill identifier. For policy terms, see the [Policies glossary](/docs/building-blocks#policies-glossary). The vnums and map index in these examples are placeholders: use skills and a map available in your content. Register each example on the game cores that need it. See [Forge setup](/docs/core/luna-forge/setup) for loading a forge.

## Replace one page

This rule gives characters on map 1 one skill on `ACTIVE`. The plan names that page, so it replaces the whole page; unnamed pages keep their ordinary layout. Store the returned handle if the rule must be removed before the core stops.

```forge
forge example_one_skill begin
    environment game begin
        local MAP_A = 1
        local handle = forge.sys.game.skill_loadout.register(
            "example_one_skill",
            function(ch)
                return ch:get_map_index() == MAP_A
            end,
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

A map change alone does not rebuild the plan. Call `forge.sys.game.skill_loadout.refresh(ch)` after the map state changes so the guard is sampled again. Registration and removal also rebuild online characters.

## Copy a preset before adding skills

`plan(preset)` copies the supplied table. Each builder call can then change its own plan without changing the shared preset. This example adds a skill to every matching character and another when the character reaches level 100.

```forge
forge example_preset begin
    environment game begin
        local MAP_A = 1
        local PRESET = {
            pages = { { id = "ACTIVE", layout = "flat" } },
            skills = { { page = "ACTIVE", slot = 1, vnum = 31, level = 40 } },
        }
        local handle = forge.sys.game.skill_loadout.register(
            "example_preset",
            function(ch) return ch:get_map_index() == MAP_A end,
            function(ch)
                local plan = forge.sys.game.skill_loadout.plan(PRESET)
                plan:grant("ACTIVE", 2, 106, 40)
                if ch:get_level() >= 100 then
                    plan:page("SPEC", { layout = "flat" })
                    plan:grant("SPEC", 1, 230, 40)
                end
                return plan
            end)
        return { handle = handle }
    end
end
```

Refresh after a level or skill group change if the builder reads it; the builder runs only on rebuild.

## Give a page tabs

A tabbed `SPEC` page has groups with labels, visible positions, and a `gate_slot`. A tab appears when the skill at its gate position has a level. This plan fills the gate position of each tab.

```forge
forge example_tabs begin
    environment game begin
        local MAP_A = 1
        local handle = forge.sys.game.skill_loadout.register(
            "example_tabs",
            function(ch) return ch:get_map_index() == MAP_A end,
            function(ch)
                return {
                    pages = {
                        {
                            id = "SPEC", layout = "tabbed",
                            groups = {
                                { label = "First", gate_slot = 1, slots = { 1, 2, 3 } },
                                { label = "Second", gate_slot = 4, slots = { 4, 5, 6 } },
                            },
                        },
                    },
                    skills = {
                        { page = "SPEC", slot = 1, vnum = 230, level = 40 },
                        { page = "SPEC", slot = 4, vnum = 179, level = 40 },
                    },
                }
            end)
        return { handle = handle }
    end
end
```

The positions are relative to `SPEC`, starting at 1. Check the [API page](/docs/building-blocks/loadout-policy) for page capacities and plan fields.

## Remove a temporary rule

Keep the handle returned by `forge.sys.game.skill_loadout.register` for a temporary rule. Pass it to `forge.sys.game.skill_loadout.unregister(handle)` when the rule ends. Removal rebuilds online characters, and another matching rule can take over. Register and unregister outside guards and builders because both operations rebuild online characters.

## Pitfalls

**Granted levels are saved on a real character.** The plan writes levels to the live character, and a save writes those levels. The restore values are kept in memory; removing the plan restores them during the running session, but does not prevent a save while the plan is active. Use [player virtualization](/foundations/player-virtualization) when temporary grants must not be persisted.

**A builder produces a different plan on each rebuild.** Rebuilds compare pages, groups, and skills in order. Use stable input for any choice and sort entries before granting them; otherwise an unchanged set in a different order can cause another update to be sent.

**A bad entry drops the plan.** A page without an id, or a skill with an empty page or vnum 0, makes the Lua builder fail to produce a plan. The character keeps its real skills, and the server logs `skill_loadout [<name>]: builder failed for pid <player id>`. Check every entry before returning it.

**A later rule never runs.** Rules are tested in registration order within a core. Across forges, the order follows forge load order, which is not guaranteed. The first matching guard owns the character even if its builder fails; later rules are not tried. Make guards exclusive or control the order within one forge.

**A skill is held but has no visible cell.** The server does not enforce client page capacity. Keep positions within the page's visible range and layout; a flat `SPEC` page draws only its first three positions. The optional `grant_next` helper checks capacity when the content library provides it.

**An ordinary page disappears.** A plan replaces every page it names, whether through `pages` or a skill entry. Leave a page unnamed to keep its ordinary bar, or include all the entries you want to retain.

## See also

- [Loadout policy API](/docs/building-blocks/loadout-policy): plan fields, helpers, resolution, and rebuild behavior.
- [Loadout, use and skill policies](/foundations/skills/policies): how the policy types fit together.
- [Skill use policy](/docs/building-blocks/skill-use-policy): checks applied when a skill is used.
- [Skill policy](/docs/building-blocks/skill-policy): policies for skills.
- [Loadout policy examples](/docs/building-blocks/loadout-policy-examples): this page.
- [Forge overview and setup](/docs/core/luna-forge/setup): environments and loading.
