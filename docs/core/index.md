---
title: Core
displayed_sidebar: mainSidebar
---

# Core

The systems the engine is organized around: the runtime that scripts run on, and the
mechanics layers that combat and progression are expressed in. Building blocks plug into them.

| Foundation | What it is |
| --- | --- |
| Luna | The bridge between the engine and Lua or Python, and the single boundary every script call crosses |
| Forge and the quest compiler | Stateful Lua modules loaded at boot, and the compiler that builds them with source maps |
| [Simulator](./simulator.md) | The real game server running headless, for agents, tests and regression gates, and [how to write a cube](./simulator-write-a-cube.md) |
| [Render pipeline](/foundations/rhi/) | The RHI, its DirectX 11 backend and the render graph, and the [`ui.ShaderQuad`](./ui-shader-quad.md) window that scripts draw with a pixel shader |
| [Effects and materials](./effects-and-materials.md) | Per-pixel materials for `.mse` effects and actor surfaces, in the Metin2 text language, and the bundles that attach them |
| UCHTML | HTML and Jinja2 templates rendered into native client UI, starting with the [in-game wiki](../wiki/) |
| Player virtualization | Temporary, isolated player state for modes that must not touch the real character |
| [Player metrics](./player-metrics.md) | Named per-character counters fed by C++ and Lua, and the change event that achievements and other systems listen to |
| [Traits](./traits.md) | Mechanics bound to an affect instead of hardcoded bonuses, with the bump point for conditional values |
| [Skills](./skill-file.md) | One skill file read by server and client, its [extension](./skill-extension.md) past the YAML, and its [descriptions](./skill-descriptions.md) |
| [Client Python](./debug-client-python.md) | Attach a debugger and hot-reload a window, and the [import rules](./client-python-imports.md) of the packed client |
| Observability | Logging, script error attribution, and the Lua, Python and C++ debuggers (coming later) |
