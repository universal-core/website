---
title: Why Universal Core exists
description: The idea behind Universal Core, what belongs in the engine, what belongs beside it, and why.
---

# Why Universal Core exists

## What I believe

The engine should be solid, lean and tested. Gameplay should be free, easy to author and driven by what players actually do. Everything in Universal Core follows from keeping those two apart.

My rule is blunt. If a piece of code is not a fundamental ground truth, it leaves the engine and comes back as a pluggable policy or hook. Whether a player may join a party, whether someone can warp, how a damage modifier stacks, how a skill is authored, what a bonus does: none of these belong in the Metin2 mainline engine. The engine defines how people author and express those concepts. It does not decide them.

I am writing this for three readers. My team, so we share one picture. Other server operators, who may find something to borrow. And engine authors, who may want to see where the line between engine and gameplay can sit.

## What goes wrong in the engine

The Metin2 mainline engine ships a fixed set of subsystems, and every new feature becomes another C++ subsystem next to them. Each one is a small project: write it, test it by hand, debug it in production. Nothing can be isolated or built as a module. When a feature is retired, pieces of it stay behind and rot in the tree. A new subsystem breaks an old one, and the symptom is usually a crash far from the cause.

The quest system does not help. It is made for simple quests: go there, kill this, drop that. Anything more stateful, more collaborative, more server-wide, or with a real interface, has to become C++. The scripting layer also leaks into the engine: guards so scripters cannot nest events into a crash, flags around calls that are harmless in one place and fatal in another. The engine fills with hooks shaped like the last feature that needed them.

Each hook is reasonable alone. Attack rules are open to every code path, so a seasonal event can break normal combat. Character state lives in a fixed set of flags that only a source edit can widen. Together the hooks make a system with no clear boundary: some logic is visible to the people writing content, some is hidden in C++, and nobody has an overview of how it really behaves.

Better hooks do not repair that. What has to change is what the engine is for.

## A scripting foundation

Quest scripting is short-lived by design. A script runs, yields, and is gone, all inside one shared state. A subsystem with memory, several cores and a client to talk to does not fit that shape.

So gameplay moves up from the engine to a structured and deliberately limited language. Luna is the layer that lets whole gameplay systems live in Lua on the server and Python on the client. Forge is how those systems are written: a subsystem with its own state, its own lifetime and its own boundary. The engine is left with mechanisms such as registries, dispatch and transport.

The quest system did not go away. It still runs, in parallel, and it is still the right tool when a script is tied to one player. A Forge system is the right tool for a subsystem with state, several cores and a client interface. C++ is for hot paths, and for the moments when the engine itself has to learn something new. Three tools, each with a reason.

The depth is in [Luna](/foundations/luna/).

## Hiding the transport

A scripting language does not help if every feature still needs C++ glue. In the mainline engine each new message means a struct, a packet header, a handler on the server and a parser on the client.

Universal Core hides the transport. Lua and Python exchange protobuf messages directly. The launcher routes an incoming message to the Python window that registered for it, and the server never reads a packet by header. A new feature needs a namespace, a header and a message definition. The transport is no longer something a feature author writes.

That is what lets gameplay live outside the engine in practice and not only in principle. The [blog post on the transport layer](/blog/hiding-the-transport-layer) walks through it.

## Frameworks on the foundation

On that foundation the question is no longer how to move one subsystem out. It is what shared mechanisms a whole family of features needs, built once.

**Policies.** An engine decision, such as whether an attack is allowed, is asked of a registry. C++ and Lua register answers, scoped to what they apply to. The engine keeps its own refusals, and everything contextual belongs to a policy. See [Policies](/foundations/policies/).

**Affects.** State a player can see, such as a buff, a stance or a mark, has a lifecycle and a broadcast. It does not depend on a small, fixed set of flags. See [Affects](/foundations/affects/).

**Traits.** In the mainline engine a bonus is a branch inside a function, driven by a point type. Traits are a mechanics layer gated by affects, so a bonus is a rule that applies while a condition holds. See [Traits](/foundations/traits/).

**Skills.** A skill is a tree of nodes in one file that both the server and the client read. The server runs the effect. The client presents it. See [Skills](/foundations/skills/).

None of these is a feature. They are the places where an engine decision became a thing a content author can reach.

## Playing without touching the database

Some systems need a character to exist without being real: a practice room, a preview, a simulation. [Virtual players](/foundations/player-virtualization/) isolate temporary state and commit only the results I choose into real data. A player can fight, try a build or rehearse a dungeon, and the database never notices.

[Player metrics](/foundations/player-metrics/) follow the same instinct. A measurement is declared once, counted once and persisted once, and anything that cares can read it. An achievement is then data on top of a counter, not a subsystem of its own.

Neither is a goal in itself. Each answers features that should be written without a new engine change, with a mechanism the engine offers to all of them.

## Testing without a human

When the logic lives in Lua, a deterministic test can drive it.

The [simulator](/foundations/simulator/) is an agent's entry point to the whole server: it drives the real engine from Lua, controls the world and its boundaries, and produces unit, integration and regression tests.

An AI coding agent does the work end to end. It writes the feature and the scenarios that test it. That works because Forge isolates the logic, makes it deterministic and leaves fewer edge cases. The alternative is a heavy, clunky C++ test that rarely gets written.

## The client follows

The same idea reached the client. [UCHTML](/foundations/uchtml/) renders templates into panels, supplies them with game data and updates reactive zones. A template language embeds functions and logic in the markup, and that is the part a panel needs.

The [render pipeline](/foundations/rhi/) applies the same idea at the lowest level: a render graph over a hardware interface, for performance, quality and extensibility. In the engine, a foundation is worth rebuilding when everything above it keeps asking for more.

## What it costs

Moving logic across the boundary adds risks. When C++ calls into Lua, a dead instance or a missing method can crash the server. So interfaces are validated strictly, and calls into Lua go through protected paths.

The garbage collector can also collect something a system still depends on, and the system stops without a crash. That is why objects are pinned.

Some things do not move at all. A mechanic built on a spatial grid with storage and broadcast needs C++ to own the cells, their persistence and what is sent to clients. Only then can Lua own the rules. The approach fails when the engine lacks the mechanism, and that is the signal to extend the engine.

## What it bought

A C++ subsystem is built one at a time, and testing and debugging dominate. A new system beside what exists, instead of inside it, takes a fraction of that. A queue with its own rules, or a mode that extends another, feels like writing a child class. The engine is rarely touched for quests, interfaces, upgrades or progression. Gameplay becomes a fast, disposable layer that a team can rewrite without fear, and the core stays a stable foundation instead of a bottleneck.

The posts that show the work are [From messy C++ subsystems to Forge](/blog/messy-cpp-to-forge) and [Hiding the transport layer](/blog/hiding-the-transport-layer). The [foundations](/foundations/) explain how each system works, and why.
