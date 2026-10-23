---
title: Documentation
slug: /
displayed_sidebar: mainSidebar
---

# Documentation

Universal Core is a Metin2-lineage MMORPG engine. The engine owns mechanism:
networking, combat resolution, persistence, rendering. Gameplay rules live in Lua
and Forge modules on top of a small set of engine registries, so a new mode or
system does not need an engine patch.

The documentation follows that split in three layers. Read them in order the
first time; later, jump straight to the page you need.

| Layer | What it covers |
| --- | --- |
| [Core](./core/) | The runtime everything else stands on: Luna, Forge and its compiler, the headless simulator, the render pipeline, UCHTML, player virtualization, observability |
| [Building blocks](./building-blocks/) | Subsystems gameplay is assembled from: affects, traits, skills, policies, the battle arbiter, the death manager, teams, rankings, events |
| [Gameplay systems](./gameplay/) | Features a player sees, each marked as framework-native, migrated, or legacy |
