---
title: Item use policy reference
description: Register item and potion gates, inspect verdict fields, and use the native registration API.
displayed_sidebar: mainSidebar
---

# Item use policy reference

Item use policies refuse item use or potion recovery; potion policies can also adjust recovery amounts. Use them for rules scoped by character, map, or event. See [Policies](/foundations/policies) for the shared model and the [Policies glossary](/docs/building-blocks#policies-glossary) for terms.

## Quick start

This forge (a `.forge` script loaded by Luna, the Lua runtime) refuses item `100008` on a trial map. Replace `MAP_A` with your map index.

```forge
forge trial_items begin
    environment game begin
        local MAP_A = 1
        local handle = forge.sys.game.item_use_policy.register(
            "trial_items",
            function(ch) return ch:get_map_index() == MAP_A end,
            function(ch, item)
                if item:get_vnum() == 100008 then
                    return { allowed = false, reason = "Not on this map." }
                end
                return { allowed = true }
            end)
        return { handle = handle }
    end
end
```

A matching item use is refused and the reason appears in chat.

## Files and setup

Register a policy in a forge, quest, or event callback on each game core that needs it. Follow the host's [Forge setup](/docs/core/luna-forge/setup) to compile and register the script; restart the game cores after changes. Registrations live in the core's Lua state and must be registered again after a restart.

## API

### `forge.sys.game.item_use_policy`

| Name | Signature | Returns | Context | What it does |
| --- | --- | --- | --- | --- |
| `register` | `register(name, guard, policy)` | `number` handle, greater than 0 | game core, outside any guard or policy | Appends an item gate to the end of the item list. |
| `register_potion` | `register_potion(name, guard, policy)` | `number` handle, greater than 0 | game core, outside any guard or policy | Appends a potion gate to the end of the potion list. |
| `unregister` | `unregister(handle)` | `boolean` | game core, outside any guard or policy | Removes the policy. `true` when found, `false` for an unknown handle. |

Parameters of `register` and `register_potion`:

| Parameter | Type | Meaning |
| --- | --- | --- |
| `name` | `string` | Shown in the log lines of this policy. Never compared: duplicates are allowed and they are two policies. |
| `guard` | `fun(ch): boolean` | "Does this policy apply to this character?" Called for every check of its kind, before `policy`. |
| `policy` | `fun(ch, item): table` for `register`, `fun(ch, item, point, amount): table` for `register_potion` | Called only when `guard` returned `true`. Returns a verdict table. |

Scope is the guard and nothing else. A map rule guards on `ch:get_map_index()`, a rule for one character on `ch:get_player_id()`, a rule for everyone returns `true`. There is no priority parameter and no replace-by-name. A `guard` or `policy` that is not a function stops the call with `item_use_policy.register: guard is not callable` or `item_use_policy.register: policy is not callable`; `register_potion` raises the same text. Inside a forge environment body that error fails the forge load, and then the game core does not start. From Lua, `register` never returns 0.

Both callables stay alive until `unregister`, so closures and upvalues work.

### Item verdict

The `forge.sys.game.item_use_policy.ITEM_USE_VERDICT` table is returned by the `register` policy.

| Field | Type | Meaning |
| --- | --- | --- |
| `allowed` | `boolean` | `false` refuses the use. Anything else, including a missing field, allows it. |
| `reason` | `string` | Chatted to the player on a refusal. Missing or empty gives `You can't use this item.` |

### Potion verdict

The `forge.sys.game.item_use_policy.POTION_VERDICT` table is returned by the `register_potion` policy. The policy receives `point`, the `point` constant being restored, and `amount`, the recovery already scaled by the policies before it.

| Field | Type | Meaning |
| --- | --- | --- |
| `allowed` | `boolean` | `false` refuses the recovery. Anything else allows it. |
| `amount` | `number` | The recovery to apply. Missing leaves the `amount` you received unchanged. Return a whole number. |
| `reason` | `string` | Chatted to the player on a refusal. Missing or empty means a silent refusal. Never shown on an allowed verdict. |
| `stop` | `boolean` | On a refused auto-potion tick: `true` switches the auto-potion off, `false` only skips this tick. Missing means `true`. Ignored on manual drinking and on arming. |

The `point` values a policy sees:

| `point` | When |
| --- | --- |
| `point.HP`, `point.SP` | instant potions |
| `point.HP_RECOVERY`, `point.SP_RECOVERY` | over-time potions, arming an auto-potion, and every auto-potion tick |

### C++ registration

Engine code registers on the same two lists through the singleton `CItemUsePolicy`. The guard and the policy are plain functions of the character and the item, and the verdict is a struct, not a table.

| Call | Signature | Returns | Native registrants |
| --- | --- | --- | --- |
| `RegisterItemUse` | `RegisterItemUse(std::string name, GuardFn guard, ItemUseFn policy)` | `handle_t` (`uint64_t`), `0` for a null function | none |
| `RegisterPotion` | `RegisterPotion(std::string name, GuardFn guard, PotionFn policy)` | `handle_t` (`uint64_t`), `0` for a null function | none |
| `Unregister` | `Unregister(handle_t)` | `bool`, `false` for an unknown handle | not applicable |

The native callback types are:

```cpp
using GuardFn   = std::function<bool(CHARACTER*)>;
using ItemUseFn = std::function<ItemUseVerdict(CHARACTER*, LPITEM)>;
// point: the POINT_* being restored. amount: the recovery amount, fed
// in already-chained from prior policies.
using PotionFn  = std::function<PotionVerdict(CHARACTER*, LPITEM, int point, int amount)>;
using handle_t  = uint64_t;
```

```cpp
struct ItemUseVerdict
{
    bool        allowed = true;
    std::string reason;            // chatted to the player on deny ("" => generic text)
};

struct PotionVerdict
{
    bool        allowed = true;
    int         amount  = 0;       // possibly-scaled recovery amount (valid when allowed)
    std::string reason;
    bool        stop    = true;    // on auto-tick deny: tear down vs deny-only
};
```

A C++ policy returns its struct directly. The decoding rules below apply to Lua verdicts only. In particular the Lua side seeds `amount` from the input, and a C++ potion policy gets no such help: a `PotionVerdict` with `amount` left at 0 recovers nothing, so copy the incoming `amount` into it. Native and Lua registrations share one list per kind.

Next: [Item use policy behaviour](/docs/building-blocks/item-use-policy/behaviour).
