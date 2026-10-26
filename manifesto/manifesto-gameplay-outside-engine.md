---
title: Gameplay belongs outside the engine
description: Why I stopped writing C++ subsystems and moved game rules into an embedded authoring language.
---

# Gameplay belongs outside the engine

## The belief

I believe the engine must remain a solid, lean, and tested foundation, while gameplay needs to be free, easy to author, and driven by player use cases. I am writing this to explain our architecture to my team, to provide inspiration for other server operators, and to show engine authors the practical result of this separation. The rule I introduced is strict. If a piece of code is not a fundamental ground truth, it moves out of the engine and is exposed as a pluggable policy or hook. Party join rules, warp conditions, damage modifiers, skill authoring, custom mechanics, and bonuses do not belong in the engine. The engine retains only the generic mechanisms. It defines how people author and express these concepts. Everything else lives in Lua and Forge. This works because it forces a hard boundary. The engine provides the foundation, and the scripts define the behavior.

## The pain

Building gameplay inside the engine cost me heavily in time and stability. I could not isolate or modularize things, and retiring a feature meant forgetting pieces around. When I finally removed the legacy minigame system, the architectural decay was obvious. I had to delete over 5,000 lines of C++ code across 37 files and hunt down 28 hardcoded event identifiers like `InitializeEventBlessingHalfCost` that had piled up over time. 

The old Lua integration was perfect for linear scripts but failed for stateful systems. It forced me to pollute the engine with custom C++ hooks and workarounds just to prevent undefined behavior. To stop scripters from nesting events and crashing the core, I had to add explicit C++ guards to the quest manager. Whenever a script killed all monsters in a dungeon, I had to manually set and reset an event prevention flag around the call to stop unique monster deaths from triggering nested events and corrupting the current player state. I fought the architecture constantly just to test a game rule.

## The idea

I introduced Forge and Luna to make Lua the embedded authoring language for whole stateful systems. The engine is now restricted to providing mechanisms like registries, dispatch, and transport. Party join rules, skill use and loadout, and the damage modifiers of traits are now written in Forge, on top of the checks the engine still makes. Warp permission and the item bonuses are still engine code: they are next, not done. 

Hiding the transport layer makes this separation possible. Python and Lua communicate directly using protobuf messages. The client launcher no longer intercepts and parses every packet by header to dispatch it to Python. Python windows register handlers directly, and the launcher routes the incoming protobuf messages to them. The game server and the client bypass C++ structs entirely. A new feature needs a namespace, a header, and a protobuf message. Lua calls a Forge API with the serialized message, and Python receives it. I never write C++ struct plumbing for a new feature again. When an event finishes, a script simply loads a protobuf message, populates the results, and sends it directly to the client.

## The evidence

The migration of the arena and lobby systems proves this model. Historically, the lobby manager relied on hardcoded C++ rules for each queue type. Adding a new queue meant changing the engine. I replaced those rules with Lua configurations where team sizes, flags, and queue behaviors are defined entirely in scripts without recompiling.

```lua
forge.sys.game.lobby_manager.set_proto("ARENA_DRAFT", "1V1", {
    team_count = 2,
    member_per_team = 1,
    observer_team_count = 1,
    flag = forge.sys.game.lobby_manager.LOBBY_FLAG.ENQUEABLE | forge.sys.game.lobby_manager.LOBBY_FLAG.GLOBAL,
})
```
*the code today*

The arena manager previously instantiated a single C++ arena class for all modes, implementing the lobby processor interface directly in C++ so that every new mode touched the core engine. That is gone. C++ only manages the generic arena mechanism, while a Lua factory instantiates different referees for modes like draft and mayhem. The factory checks the arena type and subtype, returning a specific referee instance like a five versus five draft or a custom base match, entirely within the script. I wrote the full story of this migration in [From messy C++ subsystems to Forge](/blog/messy-cpp-to-forge).

This separation changed how we build. I used to ship one subsystem or extension every two to three weeks. Testing it was a nightmare and debugging was even worse. Now I ship a new system every two to three days. The Avatar Builder, the Arena Mayhem mode, the character module, and the Guild War Draft all shipped within a span of nine days. The engine is barely touched for gameplay updates like quests, user interfaces, or progressions. 

The pattern successfully scaled to other massive legacy components. Achievements stopped being C++ code: they are now data read by a small C++ metrics substrate, and a new achievement ships without engine code. I retired the old implementation, removing 7 files, its database loaders, packet blocks, and 12 quest call sites without touching core engine logic. State management for guild wars followed the same path. Logic for score updates and member count handling moved out of the client and the engine, landing safely in Lua scripts.

## The cost and the limits

Moving logic across the boundary introduced new stability risks. When C++ calls Lua, a dead instance or a missing method can crash the server. In release builds, calling a function inline without protection caused the process to abort. I had to implement strict interface validation and extract methods into protected functions to route errors safely.

This architecture demands a completely different testing approach. Clunky C++ tests do not work when the gameplay lives in Lua. I rely on agentic coding, where an AI agent writes the feature and the scenarios that test it end to end. This works because Forge isolates the logic, making it deterministic with fewer edge cases. I built a dedicated game simulator on top of the Forge machinery to evaluate scenarios deterministically. As of September 2026 its metrics driver runs 58 unit tests with 275 checks and 20 config tests with 1,649 checks, without a line of new C++.

The approach fails when the engine lacks the necessary underlying mechanism. The land system was the exception to my rule. It required a heavy C++ refactor because the engine was not ready to handle spatial grid storage and broadcast. C++ had to own the storage, broadcast, and persistence of a square cell grid over maps. Only then could Lua own the mechanics and what the client is told.

## The consequence

When gameplay lives outside the engine, the core becomes a stable foundation instead of a bottleneck. Game logic turns into a fast, disposable layer that a team can rewrite without fear.
