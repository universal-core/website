---
title: Foundations
displayed_sidebar: mainSidebar
---

# Foundations

The runtime every other layer depends on. A page here never assumes you have
read a building block or a gameplay page.

- **Luna**: the bridge between the engine and Lua or Python, and the single boundary every script call crosses
- **Forge and the quest compiler**: stateful Lua modules loaded at boot, and the compiler that builds them with source maps
- **Simulator**: the real game server running headless, for agents, tests and regression gates
- **Render pipeline**: the RHI, its DirectX 11 backend and the render graph
- **UCHTML**: HTML and Jinja2 templates rendered into native client UI, starting with the [in-game wiki](../wiki/)
- **Player virtualization**: temporary, isolated player state for modes that must not touch the real character
- **Observability**: logging, script error attribution, and the Lua, Python and C++ debuggers
