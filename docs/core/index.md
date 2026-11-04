---
title: Core
displayed_sidebar: mainSidebar
---

# Core

The systems the engine is organized around: the runtime that scripts run on, and the
mechanics layers that combat and progression are expressed in. Building blocks plug into them.

| Foundation | What it is |
| --- | --- |
| Luna and Forge | The bridge between the engine and Lua or Python, and stateful Lua modules loaded at boot: [overview and setup](./luna-forge/setup.md), [environments and boot](./luna-forge/environments.md), [the `forge.sys` API](./luna-forge/api.md), [quest-side events and coroutines](./luna-forge/events.md), [creating bindings](./luna-forge/bindings.md), [examples and pitfalls](./luna-forge/examples.md) |
| [Simulator](./simulator.md) | The real game server running headless, for agents, tests and regression gates, and [how to write a cube](./simulator-write-a-cube.md) |
| [Render pipeline](/foundations/rhi/) | The RHI, its DirectX 11 backend and the render graph; scripts draw with it through [`ui.ShaderQuad`](../building-blocks/ui-shader-quad.md) |
| [UCHTML](../uchtml/) | HTML and Jinja2 templates rendered into native client UI; the [in-game wiki](../wiki/) is one client of it |
| Player virtualization | Temporary, isolated player state for modes that must not touch the real character: [overview](./player-virtualization/overview.md), [hooks and records](./player-virtualization/hooks.md), [custom transformers](./player-virtualization/custom-transformers.md), [prize commit](./player-virtualization/prize-commit.md), [examples](./player-virtualization/examples.md) |
| Player metrics | Named per-character counters fed by C++ and Lua, and the change event that other systems listen to: [overview](./player-metrics/overview.md), [Lua API](./player-metrics/api.md), [declaring metrics](./player-metrics/declare.md), [examples](./player-metrics/examples.md) |
| [Affects](./affects/overview.md) | State on a character, its lifecycle, and broadcast as the channel others see |
| [Traits](./traits/concepts.md) | Mechanics bound to an affect instead of hardcoded bonuses, with the bump point for conditional values |
| [Skills](./skills/file.md) | One skill file read by server and client, its [extension](./skills/extension.md) past the YAML, and its [descriptions](./skills/descriptions.md) |
| [Client Python](./debug-client-python.md) | Attach a debugger and hot-reload a window, and the [import rules](./client-python-imports.md) of the packed client |
| Observability | Logging, script error attribution, and the Lua, Python and C++ debuggers (coming later) |
