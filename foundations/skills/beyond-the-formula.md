---
title: "Skills: beyond the formula"
sidebar_label: Beyond the formula
description: "Where a skill stops being data: Lua node handlers, ability_scaling, traits bound to affects, and the node types that stay C++. How seven and a half years of vnum branches in the damage path became eight Lua files, two dead ends on the way, and what is still in the engine."
---

A skill file describes a skill with formulas: an amount, a duration, a cost, a range. Some skills need a fact the formulas cannot name: the victim is poisoned, the caster is in stealth, the blow lands from behind, this is the last frame of a combo. Until July 2026 each of those lived as an `if (unVnum == SKILL_X)` branch inside the damage path, and every new interaction meant editing the combat hot path and recompiling the server.

Now a skill reaches past its YAML in four ways, and there is one wall. How formulas are evaluated is in [Skill formulas](/foundations/skills/formulas); what a node is and when it runs is in [Nodes and phases](/foundations/skills/nodes-and-phases).

| Way | Written in | Who decides | Lifetime |
| --- | --- | --- | --- |
| `ability_scaling` on a DAMAGE node | YAML, applied by C++ | the file | one hit |
| `handler:` naming a table in the skill's Lua file | Lua | the node | one node, one target, one cast |
| `traits:` or `counters:` on an AFFECT or TICKER node | native C++ or Lua | the trait, gated by the affect | as long as the affect |
| the node type itself | C++ | the engine | not applicable |

The test for where a thing belongs is not "is it conditional". It is whether it needs to look at something the config cannot name. `caster[adder] - victim[resist]` does not, so it is data. "From behind" does, so it is a handler. If the answer is "while this buff is up", it is a trait. If it is "when this node fires, look at", it is a handler.

## How a Lua handler loads

A node names its handler with a `handler:` key. The key is parsed on every node type. The handler itself lives in a Lua file named after the skill vnum, next to the skill's YAML in the skill configuration folder: skill 31 has `31.lua`. The file returns a table of handlers, and the node's `handler:` value names one entry.

```lua
-- AMSEOP (Tranello): back hit, stealth and dagger each raise the blow.
local M = {}

---@type DamageNodeHandler
M.amseop = {
    damage_intent = function(intent)
        local m = 1.0
        if intent:is_back_hit(35) then m = m + 0.3 end
        if intent.caster:has_affect_flag("EUNHYUNG") then m = m + 0.25 end
        if intent.caster:weapon_is("DAGGER") then m = m + 0.5 end
        intent.attack = math.floor(intent.attack * m)
    end,
}

return M
```

This is the whole file for Tranello. Each entry may implement three slots: `gate`, `damage_intent` and `applied`.

At boot, after the YAML loaded without a fault, the skill loader walks every skill and every node in all three phase lists. For each node with a `handler:` it loads the skill's Lua file on the main Lua state, the one the forges and quests share, and stores the returned table in the global `SKILL_EXTENSIONS[vnum]`. Then it looks into the named entry and sets three flags on the node, one per slot that is a function. A node with no flag set never calls into Lua.

A policy variant of a skill, a per-mode copy, is a skill in its own right. The same `<vnum>.lua` answers for it, and a node it inherited unchanged still learns whether its handler has a gate. The Ball-Em-Up arena handlers in `78.lua` are used only inside the `ballemup` variants of skill 78.

C++ holds no reference to the Lua functions. Every call looks up `SKILL_EXTENSIONS[vnum][handler][hook]` again. An earlier cut stored the protected function on the node, and references freed after the Lua state died crashed the server at shutdown.

```mermaid
flowchart TD
    Y["skill YAML: handler, ability_scaling, traits"] --> L["skill loader at boot"]
    L --> H["vnum.lua into SKILL_EXTENSIONS, flags on the node"]
    L --> A["adder and resist points stored on the DAMAGE node"]
    L --> T["trait bound to the affect the node raises"]
    H --> G["cast: gate decides per target"]
    G --> D["DAMAGE: formula, ability_scaling, damage_intent"]
    D --> R["defence and the rest of the resolver"]
    G --> P["AFFECT: affect added, applied runs"]
    P --> W["the affect gates its trait, past the cast"]
```

## What each slot sees and may change

`gate` runs for any node type, once per target, before the node does. A false verdict skips the node for that target. It is used on a CRUSH node (the Gungsin knockback) and on COLLECTOR nodes (the arena skill). Its context is a `DamageIntent` with only `caster`, `victim` and `skill` filled in. `attack` and the other fields read 0 or false.

`damage_intent` runs on DAMAGE nodes, with the hit as it stands before defence. It may change four fields: `attack`, `type`, `ignore_defense` and `damage_attribute`. Everything after it, defence, penetration, pierce, the percentage modifiers, consumes those four, so a handler shapes the blow and never edits a result. The context also carries `caster`, `victim` and `skill`, read-only, and `is_back_hit(deg)`.

`applied` runs on AFFECT nodes, once per victim, after the affect was really added. It gets `caster`, `victim`, `skill`, `affect` and `duration`, all read-only. If a stronger good affect is already on the victim the add returns early and `applied` does not fire. The rage skill uses it for the two things that must happen only when the affect lands:

```lua
local M = {}

---@type AffectNodeHandler
M.rage = {
    applied = function(ctx)
        ctx.victim:play_spawn_motion()
        forge.game.rage.consume_charge(ctx.victim)
    end,
}

return M
```

The order inside one DAMAGE hit is: trait pre hooks and bump points, the amount formula, the battle damage, the splash factor, `ability_scaling`, the bow distance falloff for ranged skills, `damage_intent`, the resolver, the skill damage shield, the damage itself, trait post hooks. Bump points and trait hooks are the traits page.

Handlers run synchronously inside the combat path, through a protected call. They are not coroutines and cannot wait.

Why before defence: a multiplier applied after defence gives `(attack - def) x m` where the skill meant `(attack x m) - def`. "+30% from behind" has to mean the blow lands harder, or the bonus shrinks against exactly the enemies it was written for.

## Ability scaling: the data sibling

Per-skill adder and resist points are not conditional, so they are not a handler. A DAMAGE node takes `ability_scaling: { adder, resist }`, two point names, and the engine does the arithmetic:

```cpp
int32_t ApplyAbilityScaling(const TDamage* dmg, int32_t dam, LPCHARACTER caster, LPCHARACTER victim)
{
    const int32_t adder  = (dmg->unAbilityAdderPoint  && caster) ? caster->GetPoint(dmg->unAbilityAdderPoint)  : 0;
    const int32_t resist = (dmg->unAbilityResistPoint && victim) ? victim->GetPoint(dmg->unAbilityResistPoint) : 0;
    return std::max<int32_t>(0, dam * (100 + adder - resist) / 100);
}
```

The result is `max(0, dam * (100 + caster adder - victim resist) / 100)` in integers, applied for every DAMAGE node so the clamp runs as the old unconditional call did. It sits right after the splash factor and before `damage_intent`. 31 skill files carry it, for example `ability_scaling: { adder: SAMYEON_ADDER, resist: SAMYEON_RESIST }` on skill 1.

It replaced a C++ map keyed by skill vnum, with the resist found by enum offset from the adder. One row of that map was keyed wrong. The Noejeon row used a point id where it needed a skill id, and the point id is 266, while Noejeon is skill 106. From October 2021 the Noejeon adder and resist applied to skill 266, a mob skill, and never to Noejeon. The July 2026 migration kept it byte for byte: skill 266 carries `NOEJEON_ADDER` and skill 106 has no `ability_scaling`. Now it is visible in a file rather than hidden in a map.

## Traits from a skill node

Anything that must outlive the cast is a trait. A node binds a trait to the affect it raises, and the trait runs as long as the affect lives. `traits:` binds by id; `counters:` binds the native `skill_ledger`. This is the whole binding for skill 64:

```yaml
traits:
- id: terror
  # `power` is the trait's name for it, `skill_power` the skill's; the constant
  # is the bridge, and it is what lets the description read the formula itself.
  constants:
    power: skill_power
  formulas:
    reduction_pct: 5+power/40
```

Both kinds ship. Eight native C++ trait ids are bound by skill nodes (`attack_buff_erosion`, `buff_def_erosion`, `dash`, `hosin_ward`, `mana_shield`, `stealth`, `terror`, `weapon_bound`), plus `skill_ledger` through `counters:`. Two Lua traits sit in the skill configuration folder, `guild_bulwark` on skill 153 and `stellar_ward` on skill 150; `thorns` sits beside them, bound by no skill file. That is 17 content skills. When no native or Lua trait of the given id is defined, the loader looks for `traits/<id>.lua` there.

This is also the answer to "is there a native handler". There is no native C++ handler slot: the invokers only look up Lua. A skill that needs C++ behaviour gets it from a native trait bound to its affect, from `ability_scaling`, or from a node type. Traits are not a skill feature that happens to exist. They serve every affect in the engine, and how they hook, bump points and the native and Lua pair are on [Traits](/foundations/traits/).

## Node types are C++ only

A node type is an entry in a compiled enum: 28 slots, four of them retired placeholders, so 24 live types. Their names sit in a compiled table, and the YAML parser turns the `type:` string into an ordinal with it. Ordinals are appended and never inserted, because the ordinal is what a trace reports and what a record is diffed on.

An unknown name refuses the skill, and a refused skill is a YAML fault, so the game core does not start. There is no registry for node types and no Lua binding that touches them. Adding one means the enum, the name table, a parse case and an execute case in each of the places that switch on the type, about 28 of them.

That wall is deliberate. A handler shapes a node's damage or gates its execution. It does not author new node types, spawn projectiles or drive multi-stage skills: those are node data. The registration picture:

| Door | C++ | Lua | What ships |
| --- | --- | --- | --- |
| node handler | none, the engine only calls Lua | `<vnum>.lua` named by `handler:` | 8 files, all Lua |
| `ability_scaling` | applied by C++ | none, a YAML field | 31 skills |
| skill-bound trait | native registration | Lua definition | 8 native ids plus `skill_ledger`, 2 Lua |
| node type | enum, parser, executor | none | 24 types |

## Backstory: seven and a half years of vnum branches

Vanilla Metin2 kept per-skill rules as vnum branches. Its splash damage functor has an `if` on `SKILL_AMSEOP` for the back-hit bonus and one on `SKILL_GUNGSIN` for the dagger. The comment above the first one is a Korean question that translates to "why is this done here??", about a stealth latch stored on the character. Beyond the functor, the vanilla server names skill constants more than 200 times across 11 files, about 70 of them as `case` labels.

In February 2019 the first version of the composable skill system began, and on 19 February the AMSEOP and GUNGSIN branches were carried into the new damage function as they were, under a comment that stayed until July 2026:

```cpp
//Some shit hardcoded for camuflage
bool bUnderEunhyung = m_pkCaster->GetAffectedEunhyung() > 0;
if(m_pkProto->unVnum == SKILL_AMSEOP)
{
    float fDelta = GetDegreeDelta(m_pkCaster->GetRotation(), pkVictim->GetRotation());
    float adjust = 1.0f;
    if(fDelta < 35.0f)
    {
        adjust += 0.3f;
    }
    if(bUnderEunhyung == true)
    {
        adjust += 0.25f;
    }

    if(m_pkCaster->GetWear(WEAR_WEAPON) && m_pkCaster->GetWear(WEAR_WEAPON)->GetSubType() == WEAPON_DAGGER)
        adjust += 0.5f;

    nAmount = (int32_t) (nAmount * adjust);
}
```

This is the AMSEOP block as it stood on the last day. The system around it was data; the exceptions were not. The chain then grew by one branch at a time:

| Date | Added to the damage path |
| --- | --- |
| February 2019 | AMSEOP and GUNGSIN, from vanilla |
| May 2021 | MARYUNG bonus against slowed targets, BIPABU +25% against burning ones |
| October 2021 | a map of adder and resist points per skill |
| August 2022 | a step table for the MARYUNG slow bonus |
| April 2026 | a second GUNGSIN block: knockback on the last frame of a ninja dagger combo |
| April 2026 | SWAERYUNG and YONGKWON +10% against PABEOP |

Per-skill state lived on the character too: a latch and a level for the stealth bonus, set and cleared in other files.

## Backstory: the modifier DSL, a first attempt that was never committed

The first answer we tried was a modifier language in the skill file: `modifiers:` with `mult`, `add`, `curve` and `when:` conditions. It looked tidy. It was a trap. Every skill we migrated needed a new grammar primitive: MARYUNG needed a `curve`, the value model needed a value-source type, adder and resist needed a percent operation and a new pipeline stage, AMSEOP needed `weapon`, `back_hit` and `stealth_cast` condition types. Not one skill fit the vocabulary that existed before it. That was the tell. We had not decoupled the content author from the engine engineer. We had relocated the hardcoding from a C++ `if` chain into a parser and an evaluator, and added a grammar that had to be maintained too.

It never reached git. Only the two documents that describe it did, which is why it is told here and not shown.

## Backstory: the handler platform, and 18 days after defence

On 20 July 2026 the handlers landed in one commit: per-node Lua handlers and `ability_scaling` together, retiring the DSL. It touched 59 files and, ignoring whitespace, added 787 lines and removed 257. The vnum branches left the damage path, along with the stealth latch on the character.

The first version had the wrong slot. It was called `on_hit`, took the hit context and returned the final damage, and it ran after defence:

```lua
-- AMSEOP (Tranello) — post-defense damage bonus.
-- Was the hardcoded pre-defense if-chain in CSkill::ProcessDamage.
local M = {}

---@type DamageNodeHandler
M.amseop = {
    on_hit = function(ctx)
        local adjust = 1.0
        if ctx:is_back_hit(35) then adjust = adjust + 0.3 end
        if ctx.caster:has_affect_flag("EUNHYUNG") then adjust = adjust + 0.25 end   -- cast from stealth
        if ctx.caster:weapon_is("DAGGER") then adjust = adjust + 0.5 end
        return math.floor(ctx.damage * adjust)
    end,
}

return M
```

For 18 days, until 7 August, the six ported bonuses applied after defence, where the old chain had applied them before. A multiplier on the surviving damage gave `(attack - def) x m` instead of `(attack x m) - def`, so each bonus was quietly smaller against armour. On 7 August the slot became `damage_intent`, carrying `attack`, `type`, `ignore_defense` and `damage_attribute`, and the bonuses moved back before defence.

A day earlier a second bug had surfaced: `has_affect` was taking an affect name and was changed to take a number, with two handler files updated to pass `affect.name_map` values.

## Backstory: a skills-only interface, then traits

Between 20 and 24 July I also explored a second route, a C++ interface for per-character skill mechanics, `ISkillMechanic`. The idea was a stateful behaviour attached to a character that intercepts engine flows at a small set of touch points, with the skill config naming the mechanic and feeding it values. It was built on 20 July and grew for two days. On 22 July the affect-driven half was removed with four of its mechanics, and the note on that commit calls what was left a skill windup, not a platform.

That day the trait system gained a native C++ backend next to the Lua one, and I steered the work to traits once I realized they superseded the interface. On 24 July the last implementer, Charge, went, and the interface, the per-character host and the affect spine went with it. The four behaviours it carried became a trait, a member of the skill class and two predicates. The work on traits is on the traits page; the lesson for this page is the boundary it settled: a skill-only hook was too narrow a place for state that outlives a cast.

## After: eight files

The six skills of the chain became six handler files, all born on 20 July and reworked on 7 August. Two more arrived as new content: the Ball-Em-Up arena handlers on skill 78 in October, and rage on skill 250, the first `applied` handler, a few days later. The slot was added the same day because an affect node needed side effects that must happen only when the affect lands. Together the eight files are 212 lines.

The Gungsin knockback, a second vnum block in the old chain, became data plus a gate: a CRUSH node with `handler: gungsin_push`, whose gate lets the push fire only on the finishing frame of the combo, inside the combo window, and never against doors, stones or meteors.

```lua
-- CRUSH gate: the knockback only fires on the combo-finisher frame (per combo
-- index) within the combo window, and never against un-pushable entities beyond
-- what ProcessCrush already skips (nomove / immune-fall / cheongeun).
local PUSH_SEQUENCE = { [0] = 3, [1] = 4, [2] = 5, [3] = 5 }

---@type DamageNodeHandler
M.gungsin_push = {
    gate = function(ctx)
        local c = ctx.caster
        local idx = math.min(3, c:get_combo_index())
        if c:get_combo_sequence() ~= PUSH_SEQUENCE[idx] then return false end
        if c:combo_interval() >= 1100 then return false end

        local v = ctx.victim
        if v:is_stone() or v:is_door() or v:is_meteor() or v:is_ai_teleport() then return false end
        return true
    end,
}
```

The damage path now holds no vnum test. Named skill constants in the game server went from 261 references in 19 files before the handlers to 85 in 15 files today. That drop spans many later changes, rage, traits and the simulator among them, and is not the handlers alone. The skill engine as a whole got larger, not smaller.

## Traps, by cause

**A handler fault does not stop the boot.** Loading returns nothing and every fault is a log line and a skipped node, so a missing file, a module that is not a table, a wrong handler name, or a table with none of the three slots leaves the node inert while the boot continues. The comment in the loader still says "hard load error"; the code does not do that. The difference from the YAML path is intentional: a config fault is a typo an author can see, a script fault is a runtime condition. A YAML fault makes the skill load fail and the game core exits. Search the log after boot for these lines:

- `declares a handler but`
- `must return a table of handlers`
- `handler '...' not found in`
- `implements none of gate, damage_intent or applied`

**A slot on the wrong node type is ignored.** Flags are set from the table whatever the node is, but `damage_intent` is called only from damage processing and `applied` only from affect processing. A `damage_intent` on an AFFECT node never runs, and nothing says so.

**A gate that returns nothing skips the node.** Only an error fails open. A `nil` return reads as false, so a gate missing its last `return true` turns the node off for every target.

```cpp
bool SkillExt_InvokeGate(uint32_t skillVnum, const char* handler, const SDamageIntentCtx& ctx)
{
    sol::protected_function fn = LookupHook(skillVnum, handler, "gate");
    if (!fn.valid())
        return true;
    sol::protected_function_result r = fn(ctx);
    if (!r.valid()) {
        sol::error e = r;
        sys_err("skill {} gate error: {}", skillVnum, e.what());
        return true;   // fail-open: a broken script never silently drops a node
    }
    return r.get<bool>();
}
```

**A gate sees no damage.** Its `DamageIntent` is built with `caster`, `victim` and `skill` only. `attack` and the rest read 0 or false.

**A failed `damage_intent` can keep half its work.** The header says a failure leaves the context untouched. The context goes in by reference and nothing restores it, so a handler that writes `intent.attack` and then errors keeps the write. Write once, at the end.

**`has_affect` takes a number, `has_affect_flag` and `get_affect_value` take names.** `has_affect("POISON")` is a type error at call time. The whole `damage_intent` fails and is logged, so the dagger bonus in the same handler is lost with it. Use `affect.name_map.POISON`.

**An intracore skill may not declare a handler.** A handler is handed `intent.caster` and an every-core cast has none. This one is a config fault, so it refuses the boot. Intracore casts are in [Skills on every core](/foundations/skills/every-core).

**Handlers are stateless on purpose, and they run per target.** A gate on a COLLECTOR runs for every collected target, so a counter kept in a gate advances per target, not per cast. Content that needs memory across hits keeps it in a Lua global, as the arena handlers do and reset from the referee. Anything that must outlive the cast is a trait.

## What is still in the engine

- Node types: 24, compiled, with no registry and no Lua door.
- Native per-skill behaviour behind traits: eight native trait ids plus `skill_ledger`. They are bound from YAML, but their code is C++.
- Vnum references: 85 named constants in 15 files, led by the skill use checks, item code and auto hunt. It undercounts literal numbers: the use check still lists sub skills 121, 122, 124 and 126 to 130 as always usable by number.
- Two skill-specific spots in the damage path that are not vnum tests: the refusal of a horse skill against a player, and the damage shield read from a point.
- The mount and horse rules in the use check, covered by [Skill policies](/foundations/skills/policies).
