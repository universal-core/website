---
title: Battle arbiter reference
description: Register guards and verdicts that decide whether a character may attack another.
displayed_sidebar: mainSidebar
---

# Battle arbiter reference

A battle arbiter lets you decide whether an attacker may hit a victim. A guard selects pairs and a verdict allows, denies, or passes the decision to the next rule. See [Policies](/foundations/policies) for the shared model and the [policies glossary](/docs/building-blocks#policies-glossary) for terms.

## Quick start

This forge, a Lua module loaded by Forge, denies player attacks on one map and passes other pairs to the ordinary rules.

```forge
forge no_pvp_map begin
    environment game begin
        local registry = forge.sys.game.battle_arbiter_registry
        local verdict = registry.BATTLE_VERDICT
        local MAP_A = 1
        local handle = registry.register("no_pvp_map",
            function(att, vic)
                return vic:get_map_index() == MAP_A
            end,
            function(att, vic)
                if att:is_pc() and vic:is_pc() then
                    return verdict.Deny
                end
                return verdict.Pass
            end)
        return { handle = handle }
    end
end
```

On that map the server refuses player attacks. The client can still show an attack cursor.

## Files and setup

Register in a game forge environment, quest, or callback on each game core that needs the rule. Follow the host's forge setup and restart the game cores after changes; see [Forge setup](/docs/core/luna-forge/setup). Registrations are held in memory and must be made again after a restart.

## API

### `forge.sys.game.battle_arbiter_registry`

| Name | Signature | Returns | Context | Effect |
| --- | --- | --- | --- | --- |
| `register` | `register(name, guard, can_attack)` | Positive `number` handle | Game core, outside a guard or verdict | Appends an arbiter. |
| `unregister` | `unregister(handle)` | `boolean` | Game core, outside a guard or verdict | Removes the handle; returns `false` if unknown. |
| `BATTLE_VERDICT` | Table: `Allow`, `Deny`, `Pass` | Table | Game core | Verdict constants. |

| Parameter | Type | Meaning |
| --- | --- | --- |
| `name` | `string` | Log label; duplicate names register separate arbiters. |
| `guard` | `fun(att, vic): boolean` | Selects a pair; called before the verdict. |
| `can_attack` | `fun(att, vic): number` | Returns a `BATTLE_VERDICT` value when the guard is true. |

Both arguments are character objects, attacker first. Pairs can include players, mobs, NPCs, guards, and buildings. No skill, weapon, or damage type is passed. Callbacks run synchronously on the core's main thread; do not yield or modify the registry inside them. Closures remain alive until removal.

Handles start at 1, increase per registration on a core, and are not reused. There is no priority or replace-by-name argument. A non-callable guard or verdict raises `battle_arbiter_registry.register: guard is not callable` or `battle_arbiter_registry.register: can_attack is not callable`; an error during forge loading fails the load.

| Verdict | Value | Effect |
| --- | --- | --- |
| `Allow` | 0 | Allow immediately. |
| `Deny` | 1 | Refuse immediately. |
| `Pass` | 2 | Ask the next arbiter, then the remaining combat checks. |

Use the named constants: `0` means `Allow`. A number outside 0 to 2 acts as `Pass` without a log.

### Native registration

Engine code uses the same list: `Register(std::string name, GuardFn guard, CanAttackFn can_attack)` returns a `handle_t` (`uint64_t`), and `Unregister(handle_t)` returns `bool`. `GuardFn` is `std::function<bool(LPCHARACTER att, LPCHARACTER vic)>`; `CanAttackFn` is `std::function<BattleVerdict(LPCHARACTER att, LPCHARACTER vic)>`.

Next: [Battle arbiter behaviour](/docs/building-blocks/battle-arbiter/behaviour).
