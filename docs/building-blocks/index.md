---
title: Building blocks
displayed_sidebar: mainSidebar
---

# Building blocks

Subsystems that gameplay is assembled from. Most of them are a registry in the
engine with a Lua face: the engine asks a question at a fixed point, and
whatever registered for it answers.

- Affects and broadcast affects
- Traits
- The skill framework
- Policies: the [battle arbiter](./battle-arbiter.md), death, item use (potions included), spectator, party join,
  skill use, skill loadout and skill policy
- The PvP team manager, paired with the battle arbiter
- Rankings, MMR and seasons
- Drops and regens
- The event manager and the EvE engine
- Scoreboards, notifications, timers and tours
