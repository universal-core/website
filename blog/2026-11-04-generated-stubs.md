---
date: 2027-03-23
title: A stub is a second copy of the binding
description: A binding gives an editor nothing to read, so the Lua surface is described twice, in C++ and in a stub. Every way the two copies drifted apart, and what made the stub generated output.
authors: luscha
tags: [lua, tooling, luna, stubs]
image: /img/blog/generated-stubs.png
slug: generated-stubs
---

A Lua function the engine exposes is a C function and a row in a registration table. Nothing in either tells an editor what the function takes or returns, so in the Metin2 mainline engine a script author writes against it blind. [Debugging Lua like a first-class language](/blog/debugging-lua-first-class) tells the day the stubs began: the comment above each binding, the Doxygen run, the 37 files of the first pass. This post starts after that, with the thing that run created: a second description of every binding, in a different file, that nothing forces to agree with the first.

## A schema is free, a binding has none

Nine days before that pipeline, on 20 September 2024, I had already generated EmmyLua. The protobuf generator I added for Lua 5.3 writes a `---@class` for every message and a `---@field` for every field, straight from the `.proto`. A message has a schema, so its stub cannot disagree with it.

A binding has no schema. The signature lives in the C++ lambda or the registration row, and the only place to say what the Lua side sees is prose I write next to it. The comment above the binding is that prose, and the stub is generated from it. So the stub is a copy of a copy: the comment copies what the code does, and the file the editor reads copies the comment. Four things went wrong between those steps, and they are the reason the stubs are generated and never edited.

## A stub that lost its signatures

For a long time the generator was quiet when it failed. This is how `building.lua` looked until 11 June 2026:

```lua
---Retrieves the price, owner guild ID, and minimum required guild gold for a specific piece of land.   
---If the land ID is invalid or not found, it returns default large integer values (1000000000) as placeholders.   
---  
---Assigns a guild as the owner of an unowned piece of land.   
---This will fail if the land is already owned, the specified guild already owns other land, or the IDs are invalid.   
---  
```

Two descriptions, no function between them and no parameters. The source comment had them all. What it lacked was an escape: the comment lines read `\---@param land_id number ...`, with no backslash before the `@`. Doxygen knows `@param` as its own command and turns it into a structured child of the paragraph, and the first version of the parser read only the text before that child. Everything from the first bare command onward vanished from the stub, and the editor offered four building functions it could not complete.

The fix on 11 June was in two places. The parser now flattens every paragraph, child text included, and prints a warning that names the file and the offending command when it meets one. And the comments in that file got their missing backslashes, which brought back the signatures of `get_land_info`, `set_land_owner`, `has_land` and `get_empty_land_count`. The same commit changed when an overload inherits the preamble: a second `@lua` line repeats the documentation above it only when no new documentation has come since the previous one, so a `@class` block before a signature keeps its own.

## A file list that went stale

The generator does not read the engine, it reads the files a pattern names, and a binding in a file the pattern does not name is invisible. By 29 July 2026 the table of character point names had moved out of the constants file. The pattern still named only the old one, so the run wrote an empty `point.lua` and quest authors lost every `POINT` name in their completion. The commit that fixed it added the new file to the pattern and regenerated.

Nothing complained: an empty file is a valid output, and the run ended as if it had succeeded.

## Bindings that outran their stubs

The stubs are made by a script I run by hand, in a container, from the server tree. No workflow in the repository runs it, so a binding and its stub land together only when the script ran before the commit. Twice it did not:

- The skill policy registry went in on 5 August 2026 at 14:10 with its comments. Its stub, `forge.sys.game.skill_policy.lua`, was committed at 23:20 the same night, in a commit titled as a regeneration that also touched the traits stub.
- `land.send_army` was bound on 28 September 2026. Its stub arrived on 20 October, in a commit whose subject says the stubs for `land.send_army` and `deployment.army_frame` follow their bindings. That is 22 days with no stub for a working call.

## Names copied from the wrong place

The client has the same pipeline for its C++ Python modules, with one difference in what the comment holds: the signature is written in Python, inside the comment. On 9 March 2025 the stubs for the window module were wrong. They named `GetWndWidth`, `GetWndHeight`, `GetWndLocalPosition` and `GetWndGlobalPosition`, which are the names of the C++ functions without their `wndMgr` prefix. The module registers them as `GetWindowWidth`, `GetWindowHeight`, `GetWindowLocalPosition` and `GetWindowGlobalPosition`. The commit renamed the four in the comments and in the stubs.

A script that followed the stub called a function the module does not have.

## What I settled on

A stub is never edited. If it is wrong, the comment is wrong, or the file pattern, or the script did not run, and the fix goes there before the file is regenerated. The parser warns on a bare command instead of dropping what follows it. And the stub travels in the same commit as its binding: the party join policy, the death profiles and the activity lock reached the engine on 20 October 2026 with their stubs.

What the stub carries is more than a name. The comment above the skill policy registration holds the whole contract: that a policy's scope is its `guard` predicate, that guards are sampled when a character shows, when a rule is registered or removed, and on `refresh`, that an undeclared `policy_id` is refused, and that a Lua error in the guard fails closed. A script author reads that on hover, at the call. The [Lua annotations page](/foundations/luna/lua-annotations) lists the escaping and the filter rules a new binding has to follow, and [Creating bindings](/docs/core/luna-forge/bindings) shows the comment form.

There are 109 stub files in the server's `meta` folder today. A new namespace gets one by a comment above a binding and one run of the script. The cost stays: until the script has run, the editor describes the server as it was.
