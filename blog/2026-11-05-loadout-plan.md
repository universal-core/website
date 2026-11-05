---
date: 2027-03-30
title: A plan that keeps what it displaced
description: In the Metin2 mainline engine a character holds the skills its job and skill group list. A loadout is a plan the server resolves per character, and the part that took care was giving back what the plan had taken.
authors: luscha
tags: [engine, skills, policies, client]
image: /img/blog/loadout-plan.png
slug: loadout-plan
---

In the Metin2 mainline engine a character holds the skills its job and skill group give it. The server keeps a table of six vnums per job and group, and a cast of a class skill is refused when the vnum is not in that row. The client fills the skill window from a static table keyed on race and skill group. Nothing in either place asks what the character is doing, so a character in a mode that should hold one skill, or four borrowed ones, has no way to say so.

This post is about the registry that answers that, and mostly about its restore path. The [skill policies page](/foundations/skills/policies) describes the registry as it stands; the interesting part is what the plan has to give back.

## One plan per character

The server commit of 5 August 2026 adds `CSkillLoadout`, and its message is two sentences: it registers `(name, guard, builder)` like the policy registry and resolves one plan per character; a plan replaces the pages it names and keeps what it displaced, so dropping it restores. The client install followed 25 seconds later and the Lua helpers 12 seconds after that. Together they are 948 lines on the server, 456 in the client and 160 in the helpers.

A rule is a guard that says whether it owns the character, and a builder that returns the plan. The walk is in registration order and the first guard that fires wins:

```cpp
// First rule whose guard fires owns the answer -- registration order, like the
// battle arbiters. A character is under one loadout or none; two plans fighting
// over one slot has no meaning a player could read.
```

The rule never composes. A plan is a whole answer for the pages it names, so there is nothing to merge, and the interesting overlap is not two plans at once but one plan after another: the guard stops matching, or a different rule starts. That is where the restore path earns its place.

A plan is data, a list of pages and a list of skills, each at a position on a page:

```lua
forge.sys.game.skill_loadout.register(
    "example_loadout",
    function(ch) return ch:get_map_index() == MAP_A end,
    function(ch)
        return {
            pages = { { id = "ACTIVE", layout = "flat" } },
            skills = { { page = "ACTIVE", slot = 1, vnum = 31, level = 40 } },
        }
    end)
```

The [loadout policy reference](/docs/building-blocks/loadout-policy) has the fields and the [examples page](/docs/building-blocks/loadout-policy-examples) the recipes. What follows is the part they cannot show: the character holds that skill at level 40 on the server, and has to stop holding it later.

## Levels are on the server, slots on the client

A cast packet carries a vnum, not a slot. So the server has to hold the skill at a level for a cast to find it, and what the client draws is presentation. A plan therefore does two different things. On the server it writes a level on the live character. On the client it names a page and a position, never a slot index: positions are 1-based per page, and the client turns a page and a position into its own slot, so a plan does not have to know that the specialization page starts at slot 220.

The server side is this function, whole:

```cpp
void CHARACTER::ApplySkillLoadout(const SLoadoutPlan & c_rPlan)
{
    // What the incoming plan asks for, so anything the OLD plan raised and this one
    // does not is put back rather than left behind.
    std::set<uint32_t> setWanted;
    for (const SLoadoutSkill & c_rSkill : c_rPlan.vecSkills)
        setWanted.insert(c_rSkill.unVnum);

    for (auto it = m_mapSkillLoadoutRestore.begin(); it != m_mapSkillLoadoutRestore.end(); )
    {
        if (setWanted.count(it->first) == 0)
        {
            SetSkillLevel(it->first, it->second);
            it = m_mapSkillLoadoutRestore.erase(it);
        }
        else
            ++it;
    }

    for (const SLoadoutSkill & c_rSkill : c_rPlan.vecSkills)
    {
        // Recorded on FIRST touch only: a second plan must not overwrite the
        // restore point with a level this subsystem itself wrote.
        if (m_mapSkillLoadoutRestore.find(c_rSkill.unVnum) == m_mapSkillLoadoutRestore.end())
            m_mapSkillLoadoutRestore[c_rSkill.unVnum] = (uint8_t) GetSkillLevel(c_rSkill.unVnum);

        SetSkillLevel(c_rSkill.unVnum, c_rSkill.bLevel);
    }

    m_kSkillLoadout = c_rPlan;
    ComputePoints();
}
```

The restore map is one level per vnum, the level the character really held. Take a character with skill 31 at level 5 and skill 32 at level 0, and follow the map through three plans:

| Plan in force | Skills it names | Restore map after | Skill 31 | Skill 32 |
| --- | --- | --- | --- | --- |
| none | | empty | 5 | 0 |
| A: 31 at 40 | 31 | 31 is 5 | 40 | 0 |
| B: 31 at 20, 32 at 40 | 31, 32 | 31 is 5, 32 is 0 | 20 | 40 |
| C: 32 at 10 | 32 | 32 is 0 | 5 | 10 |
| none | | empty | 5 | 0 |

Going from A to B, 31 is already in the map, so the 5 stays; had the map been rewritten with what A wrote, dropping B would have restored 40, a level the character never earned. Going from B to C, 31 is not named any more and goes back to 5 at once, without waiting for the plan to be dropped. Dropping a plan restores every entry and clears the map.

The restore map lives in memory. A character save during a plan writes the plan's levels, and the [examples page](/docs/building-blocks/loadout-policy-examples) says so and points at [player virtualization](/foundations/player-virtualization) for grants that must not persist.

A plan also lifts the check that a class skill belongs to the character's job and group, for casts and for learning. The same commit lifts it for virtual characters in the same lines, as `IsVirtual() || HasSkillLoadout()`. Every other cast check still runs.

## The client is told twice, in order

Every change goes to the client as two packets: the plan, then the skill levels. The order is the contract. The client resolves a level by looking its vnum up in the slot table and drops it when no slot holds that vnum, so a level packet that arrives first is thrown away for every skill the plan added, and the skill is held but uncastable. The server sends them in that order after every change, and the client installs the plan from inside the packet handler instead of waiting for the window to refresh on a later frame.

The install is a replacement of the pages the plan names:

```python
def LoadoutCoveredPages():
    covered = set()
    for (pageId, tabbed, groups) in playerLoad.GetLoadoutPages():
        covered.add(pageId)
    for (page, position, vnum) in playerLoad.GetLoadoutSkills():
        covered.add(page)

    return covered
```

A page is covered when the plan declares it or puts a skill on it. The client wipes its slot table, lays the ordinary bar down for every page, then empties each covered page and writes the plan into it. A page the plan never mentions keeps its ordinary bar, so swapping the active skills and leaving the passives alone is expressed by not naming the passives. The same rule empties a page: naming it with no skills on it leaves it blank.

That makes the choice between replacing and overlaying a choice per page. Inside a covered page there is no overlay: a bar of two skills does not keep the class skills in cells three to six. Where a plan wants the ordinary bar on a page it names anyway, the forge helper `grant_default` lays the ordinary support or horse bar onto it, cell for cell, at the level the character holds. `grant_next` places a skill at the first free position, so a shared preset and later grants cannot land on the same cell.

## What undid the plan on the client

Four places on the client rebuild the slot table, and each had to be taught about the plan:

- A change of game phase drops it. The plan is cleared with the phase, otherwise it would be laid over the next map's bar. The server therefore sends it again, forced even when unchanged, as the character enters the game.
- A change of skill group wipes the slot table and rebuilds it through the ordinary install, which would erase the plan, so that path lays the plan down again.
- Specialization tabs were drawn from arithmetic: four groups at slots 220, 223, 226 and 229, each windowing onto three slots. A plan may put a specialization passive anywhere, or hold passives of several at once. A tabbed page now carries its groups, with a label, a gate position and the positions the tab shows, and a page declared flat draws no tabs. A plan that does not name the page leaves the old arithmetic in place.
- A loadout flips the horse row on or off whenever it is applied or dropped, because the horse skills leave the table with everything else. The window redraws the page either way.

A short read of the plan packet is treated as a protocol disagreement and installs nothing, never half a bar.

## A rule that can be taken away

Rules register at runtime and return a handle. Both `register` and `unregister` rebuild every character online, and `unregister` does it for everyone, not only the holders, because dropping the rule is what puts the real skills back.

A match mode registers a rule per match, with the guard "is this character in this match", and keeps the handle beside the handle of a skill policy registered at the same time. When the match is released both are unregistered, and everyone gets their own bar and levels back. The plan it builds names all four pages as flat and puts one skill on the first active position: three pages are emptied by being named, one holds the skill.

The skill policy was committed the same day and the use policy, which can only deny a cast, the next. The three registries share the shape described in the [policy model](/foundations/policies): a name, a guard, a payload, a handle. What differs is when each is sampled and what it keeps on the character, which is the subject of [the skills page](/foundations/skills/policies).

## What it cost

A builder is run again at every rebuild, and the engine compares the new plan with the one in force, in order. A builder that returns the same skills in a different order sends the client a new plan, so the order has to come from stable input. A builder that fails does not pass the character to the next rule: the first guard that fired owns it, and the character keeps its real skills. And the server does not check page capacity: a skill at a position the page never draws is held and invisible, which the helpers check and the engine does not.
