---
title: Core
displayed_sidebar: mainSidebar
---

# Core

The runtime every other layer depends on. A page here never assumes you have
read a building block or a gameplay page.

| Foundation | What it is |
| --- | --- |
| Luna | The bridge between the engine and Lua or Python, and the single boundary every script call crosses |
| Forge and the quest compiler | Stateful Lua modules loaded at boot, and the compiler that builds them with source maps |
| Simulator | The real game server running headless, for agents, tests and regression gates |
| Render pipeline | The RHI, its DirectX 11 backend and the render graph (coming later) |
| UCHTML | HTML and Jinja2 templates rendered into native client UI, starting with the [in-game wiki](../wiki/) |
| Player virtualization | Temporary, isolated player state for modes that must not touch the real character |
| Observability | Logging, script error attribution, and the Lua, Python and C++ debuggers (coming later) |
