---
title: Luna
description: The framework that moves whole gameplay systems out of the engine into Lua on the server and Python on the client.
---

# Luna

Luna lets a whole system (state, synchronisation between cores, a client
interface) be written in Lua on the server and Python on the client, without
engine changes. Luna runs parallel to QuestManager, which retains quest state and dispatches login, logout, and `when` blocks. The bridge runs alongside it. It is several pieces that work together; each page explains one.

| Page | What it explains |
| --- | --- |
| [The Lua bridge and the dispatch boundary](./bridge.md) | The single boundary every script call crosses, and the coroutines it owns |
| [Luna transport and protobuf](./transport.md) | One message layer for every channel, client to game to database |
| [How Forge modules work](./forge.md) | Stateful modules loaded at boot, written in the same file as their quest hooks |
| [The event bus](./event-bus.md) | Engine events delivered to Lua subscribers |
| [Luna on the Python client](./client.md) | Windows registered as handlers for server messages |
| [Quest compiler, source maps and the Lua debugger](./devtools.md) | Source maps and the embedded debugger |
| [Lua annotations and the generated stubs](./lua-annotations.md) | How the engine's Lua API is documented for the editor |
