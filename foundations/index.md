---
title: Foundations
slug: /
---

# Foundations

How the systems Universal Core stands on work, why they are built the way they
are, and what they replaced. Each foundation also has a reference page in the
[docs](/docs/) with its API and usage.

- [Luna](./luna/): the framework that moves whole gameplay systems into Lua
  and Python, in seven pages.
- [Policies](./policies/): the decisions the engine stopped hardcoding, one registry per decision, and
  what is still in the engine.
- [Affects](./affects/): state on a character, its lifecycle, and broadcast as the channel that shows it
  to everyone else.
- [Traits](./traits/): mechanics instead of hardcoded bonuses, with the bump point that makes a bonus
  depend on the moment.
- [Skills](./skills/one-file): one file per skill that the server and the client both read, the nodes
  a cast runs, who owns it, and how one cast reaches a map or every core, in nine pages.
- [Player metrics](./player-metrics/): one catalog of named per-character counters that C++ and Lua both
  feed, and the change event achievements and the codex listen to.
- [Virtual players](./player-virtualization/): a temporary character on a map that never writes back,
  and the prize commit as its only road to the real one.
- [The headless simulator](./simulator/): the whole game engine driven from Lua with no client, no socket and no
  database, and the two kinds of harness built on it.
- [UCHTML](./uchtml/): the client's markup engine: Jinja templates rendered into native UI, reactive zones, and the data the in-game wiki is built from.
- [Render pipeline](./rhi/): the client's frame as a graph of passes over one device interface, typed handles, a DirectX 11 backend, and the shader cache.
