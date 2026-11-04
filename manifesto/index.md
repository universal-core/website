---
title: Why Universal Core exists
description: The idea behind Universal Core and the journey that shaped it, from patching a game engine to building gameplay beside it.
---

# Why Universal Core exists

## What I believe

The engine should be solid, lean and tested. Gameplay should be free, easy to author and driven by what players actually do. Everything in Universal Core follows from keeping those two apart.

My rule is blunt. If a piece of code is not a fundamental ground truth, it leaves the engine and comes back as a pluggable policy or hook. Whether a player may join a party, whether someone can warp, how a damage modifier stacks, how a skill is authored, what a bonus does: none of these belong in the Metin2 mainline engine. The engine defines how people author and express those concepts. It does not decide them.

I am writing this for three readers. My team, so we share one picture. Other server operators, who may find something to borrow. And engine authors, who may want to see the process that brought me here.

## Where it started

I did not start with a principle. I started by patching.

The Metin2 mainline engine ships a fixed set of subsystems, and every new feature was another C++ subsystem next to them. Each one was a small project: write it, test it by hand, debug it in production. I could not isolate anything or build it as a module. When a feature was retired I forgot pieces of it, and the leftovers rotted in the tree. A new subsystem would break an old one, and the symptom was usually a crash far from the cause.

The scripting we had did not help. The quest system was made for simple quests: go there, kill this, drop that. Anything more stateful, more collaborative, more server-wide, or with a real interface, had to become C++. Worse, the scripting layer itself leaked into the engine. I added guards so scripters could not nest events into a crash, and flags around calls that were harmless in one place and fatal in another. The engine filled with hooks shaped like the last feature that needed them.

## The first fix was never enough

Every early fix made the same move: another C++ hook, in another place. Attack rules are a good example. Any seasonal event could break normal combat, because the code path was open to everyone. Character state lived in a fixed set of flags that I had to widen by editing the source, and a new effect could not exist until I had done that work.

Each hook was reasonable alone. Together they made a system with no clear boundary. Some logic was visible to the people writing content, some was hidden in C++, and nobody had an overview of how it really behaved.

I could not repair that by writing better hooks. I had to change what the engine was for.

## A scripting foundation

The old scripting was short-lived by design. A script ran, yielded, and was gone, all inside one shared state. A subsystem with memory, several cores and a client to talk to does not fit that shape.

So I moved up from the engine to a structured and deliberately limited language. Luna is the layer that lets whole gameplay systems live in Lua on the server and Python on the client. Forge is how those systems are written: a subsystem with its own state, its own lifetime and its own boundary. The engine is left with mechanisms such as registries, dispatch and transport.

The quest system did not go away. It still runs, in parallel, and it is still the right tool when a script is tied to one player. A Forge system is the right tool for a subsystem with state, several cores and a client interface. C++ is for hot paths, and for the moments when the engine itself has to learn something new. Three tools, each with a reason.

The depth is in [Luna](/foundations/luna/), and the story of the move is in [Why quests were not enough](/blog/why-quests-were-not-enough).

## Hiding the transport

A scripting language does not help if every feature still needs C++ glue. For a long time each new message meant a struct, a packet header, a handler on the server and a parser on the client.

The fix was to hide the transport. Lua and Python exchange protobuf messages directly. The launcher routes an incoming message to the Python window that registered for it, and the server never reads a packet by header. A new feature needs a namespace, a header and a message definition. The transport is no longer something a feature author writes.

That is what lets gameplay live outside the engine in practice and not only in principle. The [blog post on the transport layer](/blog/hiding-the-transport-layer) walks through it.

## Frameworks on the foundation

Once the foundation existed, my thinking shifted. I stopped asking how to move one subsystem out. I started asking what shared mechanisms a whole family of features would need, and built those once.

**Policies.** An engine decision, such as whether an attack is allowed, is asked of a registry. C++ and Lua register answers, scoped to what they apply to. The engine keeps its own refusals, and everything contextual belongs to a policy. See [Policies](/foundations/policies/).

**Affects.** State a player can see, such as a buff, a stance or a mark, has a lifecycle and a broadcast. It no longer depends on a small, fixed set of flags. See [Affects](/foundations/affects/).

**Traits.** A bonus used to be a branch inside a function, driven by a point type. Traits are a mechanics layer gated by affects, so a bonus is a rule that applies while a condition holds. See [Traits](/foundations/traits/).

**Skills.** A skill is a tree of nodes in one file that both the server and the client read. The server runs the effect. The client presents it. See [Skills](/foundations/skills/).

None of these is a feature. They are the places where an engine decision became a thing a content author can reach.

## Playing without touching the database

Some systems need a character to exist without being real: a practice room, a preview, a simulation. [Virtual players](/foundations/player-virtualization/) isolate temporary state and commit only the results I choose into real data. A player can fight, try a build or rehearse a dungeon, and the database never notices.

[Player metrics](/foundations/player-metrics/) follow the same instinct. A measurement is declared once, counted once and persisted once, and anything that cares can read it. An achievement is then data on top of a counter, not a subsystem of its own.

Neither was a goal. Each came from a feature that wanted to be written without a new engine change, and the right answer was a mechanism the engine could offer to all of them.

## Testing without a human

When the logic lives in Lua, a deterministic test can drive it. That changed how I work.

The [simulator](/foundations/simulator/) began as a way to let an agent tune monster difficulty without me trying fights by hand. It became the agent's entry point to the whole server: it drives the real engine from Lua, controls the world and its boundaries, and produces unit, integration and regression tests.

An AI coding agent now does the work end to end. It writes the feature and the scenarios that test it. That works because Forge isolates the logic, makes it deterministic and leaves fewer edge cases. The alternative is the heavy, clunky C++ test I used to avoid writing.

## The client follows

The same idea reached the client. [UCHTML](/foundations/uchtml/) renders templates into panels, supplies them with game data and updates reactive zones. I chose a template language over BBCode because BBCode was too strict, had little support and no linters, and its parser and conditionals were hard to build. A template language embeds functions and logic in the markup, and that is the part a panel needs.

The [render pipeline](/foundations/rhi/) is the same story at the lowest level. For a long time the old pipeline stayed untouched. Moving to a render graph with a hardware interface raised performance, quality and extensibility. In the engine, a foundation is worth rebuilding when everything above it keeps asking for more.

## What it costs

Moving logic across the boundary adds risks. When C++ calls into Lua, a dead instance or a missing method can crash the server. A release build once dropped a protection the debug build had, and the failure only showed there. I now validate interfaces strictly and call into Lua through protected paths.

The garbage collector can also collect something a system still depends on, and the system stops without a crash. That is why objects are pinned. These bugs took patience to find.

Some things do not move at all. The land system needed a heavy engine refactor, because the engine had no spatial grid with storage and broadcast. C++ had to own the cells, their persistence and what is sent to clients. Only then could Lua own the mechanics. The approach fails when the engine lacks the mechanism, and I now treat that as the signal to extend the engine.

## What it bought

I used to build one subsystem at a time, and testing and debugging dominated. I now add a new system in a fraction of that, because I build beside what exists instead of inside it. A queue with its own rules, or a mode that extends another, feels like writing a child class. The engine is rarely touched for quests, interfaces, upgrades or progression. Gameplay becomes a fast, disposable layer that a team can rewrite without fear, and the core stays a stable foundation instead of a bottleneck.

The posts that show the work are [From messy C++ subsystems to Forge](/blog/messy-cpp-to-forge) and [Hiding the transport layer](/blog/hiding-the-transport-layer). The [foundations](/foundations/) explain how each system works, and why.
