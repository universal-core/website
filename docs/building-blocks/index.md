---
title: Building blocks
description: Policies, managers, and other gameplay building blocks.
displayed_sidebar: mainSidebar
---

# Building blocks

Building blocks provide registries and Lua interfaces for gameplay decisions. See [Policies](/foundations/policies) for the shared model.

## In this section

- Combat: [battle arbiter](/docs/building-blocks/battle-arbiter) ([behaviour](/docs/building-blocks/battle-arbiter/behaviour), [examples](/docs/building-blocks/battle-arbiter/examples)), [team manager](/docs/building-blocks/team-manager) ([behaviour](/docs/building-blocks/team-manager/behaviour), [examples](/docs/building-blocks/team-manager/examples)), [death manager](/docs/building-blocks/death-manager) ([behaviour](/docs/building-blocks/death-manager/behaviour), [examples](/docs/building-blocks/death-manager/examples)), and [spectator](/docs/building-blocks/spectator) ([behaviour](/docs/building-blocks/spectator/behaviour), [examples](/docs/building-blocks/spectator/examples)).
- Items and skills: [item use policy](/docs/building-blocks/item-use-policy) ([behaviour](/docs/building-blocks/item-use-policy/behaviour), [examples](/docs/building-blocks/item-use-policy/examples)), [skill use policy](/docs/building-blocks/skill-use-policy), [skill policy](/docs/building-blocks/skill-policy), and [loadout policy](/docs/building-blocks/loadout-policy) with [examples](/docs/building-blocks/loadout-policy-examples).
- Social: [party join policy](/docs/building-blocks/party-join-policy) ([behaviour](/docs/building-blocks/party-join-policy/behaviour), [examples](/docs/building-blocks/party-join-policy/examples)).
- Visuals: [effects and materials](/docs/building-blocks/effects-and-materials) and [`ui.ShaderQuad`](/docs/building-blocks/ui-shader-quad).

## Policies glossary

| Term | Definition |
| --- | --- |
| Guard | A callback that determines whether a registration applies to the characters involved. |
| Verdict | The result of a policy decision, such as allow, deny, or pass. |
| Registration | A named entry that adds a guard and policy callbacks to a registry. |
| Handle | The identifier returned by registration, used to unregister the entry. |
| Forge | A Lua module file (`forge ... begin`) that Luna loads and runs in a named environment; see [Forge](/docs/core/luna-forge/setup). |
| Luna and the bridge | [Luna](/foundations/luna) is a Lua runtime parallel to QuestManager; its bridge connects Lua and engine code. |
| `syserr` and `syslog` | Engine logs for errors and operational messages, respectively. |
| PK mode | A player's selected player-killing mode, used in PvP decisions. |
| Killer | The character credited with a death, when one is available. |
| Duel | A PvP contest between two players managed by the engine. |
| Session | A core-local group of PvP teams bound to a map. |
| Activity lock | A core-local marker on a player that signals an active engagement. |
| `DUEL_START` | A client duel state used to mark a pair as enemies. |
| Domain | A map-bound gameplay instance that can participate in PvP decisions. |
