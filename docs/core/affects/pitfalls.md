---
title: Affect pitfalls
description: Diagnose common registration, matching, persistence, and presentation errors.
displayed_sidebar: mainSidebar
---

# Affect pitfalls

These checks cover common symptoms when registering or using affects. For example, use exact point matching to keep both records here.

```lua
ch:add_affect(700, point.MOV_SPEED, 10, 0, 60, 0, true, true)
ch:add_affect(700, point.ATT_SPEED, 10, 0, 60, 0, true, true)
```

## Symptoms and fixes

- **`affect.add` stacks on repeated calls.** Its duplicate guard checks a different type and id space from the add, so it does not prevent ordinary quest affect duplicates. Use your own type with `add_specify` or `ch:add_affect`; identical saved records can return as one after login.
- **Configuration stops the core at boot.** A type name defined inside a handler is unknown when YAML loads. Register it at forge top level or use its numeric id; check the detailed configuration log.
- **A skill class does not make a type no-save.** Runtime macro memberships do not propagate to lists flattened from YAML. Register the behavior directly or list the id in YAML.
- **Removing a skill class leaves membership behind.** Memberships only grow; a skill refresh does not remove them. Correct the declaration before the next boot.
- **A macro typo silently matches nothing.** Registration creates unknown names and a query of an unknown name returns false. Copy the exact name from [registration](/docs/core/affects/registration).
- **`remove_good` leaves a buff, or `remove_bad` leaves a debuff.** These use dispellable and cleansable sets, respectively, not good and bad classifications. Add the type to the appropriate macro. For bleeding, use `ch:remove_damage_over_time`.
- **Two points leave only one record.** Default override matches any point. Pass `match_exact = true` through `ch:add_affect`; for broadcast types, replacing on a different point can also leave a stale viewer entry and particle. See [behavior](/docs/core/affects/behaviour).
- **A read immediately after login returns false.** Adds before the player is loaded are queued. Read after the queue has applied.
- **A source-bearing affect returns with stale time and no source.** The source is not persisted and character save skips that record. Make source-bearing types no-save.
- **A particle appears twice.** Broadcast and AFF flags draw independently. Use flag 0 for the broadcast type, or omit the type from broadcast.
- **A broadcast type has no particle or icon.** Register the effect and `AFFECT_DATA_DICT` entry in the client. The first successful registration of a key wins; correct that registration rather than adding a duplicate. See [client presentation](/docs/core/affects/client).
- **A late viewer misses an affect on a virtual character.** Replay skips virtual characters, though live adds are delivered. The viewer sees a later add.
- **Duration 0 lasts one second.** Except for chat blocks, 0 is an error and becomes 1 second. Use `remove_specify` or `ch:remove_affect` to remove it.
- **`ch:get_affect_value` returns 0.** Unknown names, `NONE`, and a real value of 0 are indistinguishable. Check presence separately; `ch:has_affect_flag` takes a flag name, not a type name.

See the [overview](/docs/core/affects/overview) and [Lua API](/docs/core/affects/lua-api) for terms and signatures.
