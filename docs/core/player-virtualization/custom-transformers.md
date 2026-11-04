---
title: "Player virtualization: custom transformers"
description: Virtualize data loaded outside the bulk player load with native and Forge custom transformers.
displayed_sidebar: mainSidebar
---

# Custom transformers

A custom transformer handles a slice of player data that is not in the bulk player load. A slice is a group of related player data. Use a custom transformer when a subsystem loads its own data separately; for the bulk-load slices, see [processor hooks](/docs/core/player-virtualization/hooks).

Two kinds exist: a native one, where C++ calls a processor method at its own load site (the pet), and a Forge one, where a forge module routes its database load and save through the cache (any subsystem with its own table). For the isolation model, see [player virtualization](/foundations/player-virtualization/).

## Glossary

- **Processor:** the object whose hooks transform data for a virtual map.
- **Slice:** a group of related player data handled together.
- **Virtual session:** an isolated player session backed by cached state.
- **Cache entry:** the stored virtual state for a player on a virtual map. It can contain several custom records or tables.
- **Native transformer:** a processor method called by C++ at a native load site.
- **Forge subsystem:** a Forge module that owns data and its database load and save.
- **Forge transformer:** a processor hook for a Forge subsystem's decoded table.
- **Key:** a stable string that identifies a Forge table for caching and transform dispatch.
- **Pinned table:** a Lua table retained by the bridge across coroutine boundaries until its pin is released.
- **Passthrough:** using the input without replacing it.

## Two kinds

| Kind | Loaded when | Cache holds | Hook | Registered from |
| --- | --- | --- | --- | --- |
| Native | Native load site | Native record | `transform_pet_load` | Processor |
| Forge | Module load | Pinned Lua table | `transform_forge_load` | Processor |

## Native custom transformer

The pet record is loaded on summon, outside the bulk player load. The cache holds one record per player ID and pet vnum.

1. On a virtual summon, the engine looks for the vnum in the cache entry.
2. On a hit, it summons from the cached record without calling the hook.
3. On a miss, it queries the real database. If the query fails, the summon fails and the player receives a chat message.
4. The processor transforms the record, which is appended to the cache and used for the summon. A Lua hook error is logged and falls back to the untransformed record.
5. A virtual pet save replaces or appends the record in the cache entry. The database save is suppressed.

The Lua hook receives and returns a `TPetPlayerTable`:

```lua
function processor:transform_pet_load(ch, pet)
    return pet
end
```

The corresponding C++ virtual method has this signature:

```cpp
virtual TPetPlayerTable
TransformPetLoad(LPCHARACTER ch, const TPetPlayerTable& in) { return in; }
```

A Lua hook can mutate `pet` in place or return a `TPetPlayerTable`; any other return uses the input as left.

This hook starts each summoned pet at level 1 with no experience, bonuses or skills, keeping its identity and name:

```lua
function processor:transform_pet_load(ch, pet)
    local result = TPetPlayerTable.new(pet.pid, pet.pet_vnum)
    result.id = pet.id
    result.name = pet.name
    result.level = 1
    return result
end
```
 See [processor hooks](/docs/core/player-virtualization/hooks) for the record fields and methods.

## Forge custom transformer

Use the wrappers for a Forge subsystem that stores its own protobuf table. Choose a stable key, and use the same key for load, save, and the processor hook. For multiple instances, use a key such as `name:<id>`.

1. Outside a virtual session, `with_load_cache` calls `load_fn` and decodes its response; `with_save_cache` calls `save_fn`.
2. In a virtual session, a load cache hit returns the pinned table without calling `load_fn`.
3. On a miss, `load_fn` obtains the serialized response. If it returns `nil`, the wrapper returns `nil` and caches nothing.
4. Otherwise, the wrapper decodes the response, calls `transform_forge_load`, pins the result, and returns it.
5. A virtual save decodes the serialized message and stores the table in the cache without calling `save_fn`. There is no save transform.

The bridge releases cached tables when the cache is cleared. Replacing a cached table releases its previous pin.

### Wrap the module's load and save

In this example, `messages.DGResponseLoad`, `messages.GDSave`, `load_request`, and `save_request` belong to the example `quest_log` module. Supply your module's protobuf types and request messages. The load wrapper returns a decoded table or `nil`; the save wrapper returns the result of `save_fn` outside a virtual session and `nil` inside one.

```lua
local pv = forge.sys.game.player_virtual
local key = "quest_log"

local function load_quest_log(ch, messages, load_request)
    return pv.with_load_cache(ch, key, messages.DGResponseLoad, function()
        return forge_helper.sys.game.yield_db(
            "load", load_request:SerializeToString())
    end)
end

local function save_quest_log(ch, messages, save_request)
    local msg = save_request:SerializeToString()
    return pv.with_save_cache(ch, key, messages.GDSave, msg, function()
        return forge.sys.game.send_db("save", msg)
    end)
end
```

The load closure must return the serialized response or `nil`. The save message type must decode the serialized request passed as `msg`. See [Forge setup](/docs/core/luna-forge/setup) for the module environment.

### Declare the transform

In Lua, branch on the key and return the table. This example clears the example module's `entries` field on a cache miss:

```lua
function processor:transform_forge_load(ch, key, data)
    if key == "quest_log" then
        data.entries = {}
    end
    return data
end
```

Return `data` for keys you do not handle. A non-table return uses the input table as left, including any in-place changes. A hook error is logged and falls back to the input.

For a C++ processor, register a handler per key in the constructor of your `IPlayerVirtualProcessor` subclass, for example `RegisterForgeLoadHandler("quest_log", handler)` with a handler that returns the table it was given, changed. The default `TransformForgeLoad` dispatches by key; an unregistered key is passthrough.

```cpp
using ForgeHandler = std::function<sol::table(LPCHARACTER, sol::table)>;
void RegisterForgeLoadHandler(std::string key, ForgeHandler handler)
```

### Access the cache

`forge.sys.game.player_virtual.get_forge_cache(ch, key)` returns the cached table or `nil` if there is no entry or the character is not virtual. `set_forge_cache(ch, key, value)` pins and stores a table, replacing any previous table for the key. It has no effect for a non-virtual character.

`forge.sys.game.player_virtual.transform_forge_load(ch, key, input)` dispatches the processor hook directly and returns a table. It returns the input unchanged when the character is not virtual or has no processor. The load wrapper calls it for you on a cache miss.

## Opt out instead

If a subsystem must not exist in a virtual session, skip both its load and save when `ch:is_virtual()` is true. This choice does not create a cached form of the subsystem. The battle pass does this.

## Shipped instances

- The pet is a native custom transformer.
- Character titles are the shipped instance of the cached Forge form. The `.forge` module wraps its database load in `with_load_cache` and its database save in `with_save_cache`, both with the stable key `char_title`: a virtual character reads and writes the cache, a real one goes through the database as before.

## Pitfalls

- **A hook change does not affect cached data.** The pet hook runs on a miss for each pet vnum, and the Forge hook runs on a miss for each key. A relog that hits the same cache entry does not run either hook again. A processor change takes effect when the core restarts.
- **A Forge transform does not run.** Check that the load wrapper and the processor use the same key. A key without a C++ handler, or one the Lua processor passes through, leaves the table as received.
- **There is no save transform.** A virtual save stores what the module sent. Filter on the load side, once per cache entry.
- **A load returns `nil`.** The load closure returned `nil`; nothing was cached, so a later load can try again.
- **A Forge module needs the real database during a virtual session.** The C++ `with_real_scope` facility is not bound as a Lua function. Forge code cannot use it to reach the real database from a virtual session.
