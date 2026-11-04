---
title: Creating bindings
description: Expose C++ functions and objects to Forge Lua.
displayed_sidebar: mainSidebar
---

# Creating bindings

A binding exposes a C++ function or object to Forge Lua. Register it on the core that needs it; the two cores are separate binaries.

## What a binding is and where it lives

| Core | Root table | Registration |
| --- | --- | --- |
| game | `forge.sys.game` | `ForgeGame::instance().GetEnvSysTable()` |
| db | `forge.sys.db` | `ForgeDB::instance().GetEnvSysTable()` |

Registration code runs once when its core starts. A binding exists only on the core that registers it; game bindings do not exist on db. Quest-side libraries such as `pc` and `npc` use older registration and are out of scope.

## Glossary

| Term | Meaning |
| --- | --- |
| Binding | C++ registration exposing a function or type to Lua. |
| Usertype | A C++ type exposed as a Lua object. |
| Namespace table | A Lua table grouping bindings for an area. |
| Stub | Generated Lua declarations for editors and docs. |
| Marshalling | Converting arguments and returns between Lua and C++. |

## Register a namespace

Write `void luna::Register<Area>Bindings()`, declare it `extern` in the game's Forge declarations, and add one call in game Forge initialization after the built-in `forge.sys.game.send_*` functions. Db areas use the same shape and are called at the end of db Forge initialization. Some registration functions take `luna::Bridge*` for event-bus or hook access.

```cpp
extern void RegisterActivityLockBindings();
```

```cpp
RegisterActivityLockBindings();
```

The first line is the declaration, the second the call in the flat list of area registrations.

Inside the function, obtain the root table and use `create_named("activity_lock")` to make `forge.sys.game.activity_lock`. A new area needs the function, declaration, and call; registration is not automatic.

## A function

Use `table.set_function("name", lambda)`. A pure binding can take only its real parameters.

| Macro | Lambda parameters | Use |
| --- | --- | --- |
| `LUNA_FORGE_BIND_NO_ARGS()` | `sol::this_state ts, sol::this_environment te` | Access state or environment without real arguments. |
| `LUNA_FORGE_BIND_WITH_ARGS(args...)` | `sol::this_state ts, args..., sol::this_environment te` | Access them with real arguments; environment is last. |

Use `ts` to build Lua tables. Use `te` to identify the calling forge, as send and registration functions do when they reject calls without a forge environment.

## Argument and return marshalling

| Direction | Supported values |
| --- | --- |
| Arguments | Integers, floats, `bool`, `std::string`, `const char*`, `sol::optional<T>` for nil or absent arguments, `sol::table`, `sol::object`, `sol::protected_function`, and registered usertype pointers. |
| Returns | Scalars, strings, `sol::table`, usertype pointers, `sol::object`, or nothing. Use `sol::nil` for nil. |

Build a return table with `sol::state_view lua(ts)` and `lua.create_table()`. The db core uses `CPeer*` and has no character types.

## Objects and enums

| Operation | Form |
| --- | --- |
| Object | `lua.new_usertype<T>("LPNAME", "field", sol::readonly(&T::member), "method", &T::Method)` |
| Enum | `table.new_enum("NAME", "KEY", VALUE)` exposes `forge.sys.game.<ns>.NAME.KEY`. |

Use `sol::readonly` for fields scripts must not write.

## Naming

Choose snake_case Lua names in `set_function`; they are not derived from C++ names. The namespace table groups an area.

## Documenting it: generated Lua stubs

Place a documentation comment above each `set_function` or `new_usertype`. It starts with `/*!` and an escaped `---@luadoc <namespace>` line; the namespace selects the stub file, and the `global` namespace must exist. Use EmmyLua description, `@param`, `@return`, and `@lua` lines; classes use `@class`, `@field`, and an `@lua NAME = {}` declaration, and enums use `@class ns.ENUM` and `@field KEY number`.

Escape each dash and at sign in the triple-dash directive, and escape Markdown characters in the block: at signs, stars, backticks, underscores, double dashes, and angle brackets. Re-run the docs generator from the Server folder after changing a comment; add a source to the Doxygen filter if needed. The resulting `---@meta` stubs serve the Lua language server and docs, not the running server; an undocumented binding works but is invisible to editors.

## Errors and pointers

A C++ exception or sol2 argument conversion failure becomes a Lua error logged with its message; the server keeps running. Validate input in the binding and use `sys_err` plus false or nil for invalid values. Usertype pointers are raw engine pointers: check for nil and do not keep them.

## Worked example

The smallest complete area in the engine is a lock registry with three functions: a namespace table, one doc comment and one lambda per function.

```cpp
void RegisterActivityLockBindings() {
    auto& env_sys_table = ForgeGame::instance().GetEnvSysTable();
    auto reg = env_sys_table.create_named("activity_lock");

    /*! \---\@luadoc forge.sys.game.activity_lock
    *
    * \---Sets or removes a process-local activity lock by player id.
    * \---\@param pid number
    * \---\@param locked boolean
    * \---\@lua function forge.sys.game.activity_lock.set(pid, locked) end
    */
    reg.set_function("set", [](uint32_t dwPID, bool bLocked) {
        CActivityLock::instance().Set(dwPID, bLocked);
    });

    /*! \---\@luadoc forge.sys.game.activity_lock
    *
    * \---Checks whether a player id is explicitly locked.
    * \---\@param pid number
    * \---\@return boolean
    * \---\@lua function forge.sys.game.activity_lock.is_set(pid) end
    */
    reg.set_function("is_set", [](uint32_t dwPID) {
        return CActivityLock::instance().IsSet(dwPID);
    });

    /*! \---\@luadoc forge.sys.game.activity_lock
    *
    * \---Clears every explicit activity lock.
    * \---\@lua function forge.sys.game.activity_lock.clear() end
    */
    reg.set_function("clear", []() {
        CActivityLock::instance().Clear();
    });
}
```

Reading it:

- `create_named("activity_lock")` makes `forge.sys.game.activity_lock`; the Lua names are the strings given to `set_function`.
- `uint32_t` and `bool` parameters marshal from a Lua number and boolean. `is_set` returns the `bool` as a Lua boolean; the other two return nothing.
- Each comment names the stub file in its `luadoc` line and gives the Lua declaration in its `lua` line, so the editor shows `forge.sys.game.activity_lock.set(pid, locked)`.
- The function is declared `extern` in the game Forge declarations and called once in the flat registration list, as shown above.

From a forge on the game core:

```lua
forge.sys.game.activity_lock.set(1001, true)
sys_log(0, "locked: " .. tostring(forge.sys.game.activity_lock.is_set(1001)))
forge.sys.game.activity_lock.clear()
```

## Worked example: exposing a C++ object

A usertype hands Lua a pointer to an engine object. The map registry does this for a sectree map: `RegisterSectreeMapBindings` makes a `sectree_map` namespace and declares `LPSECTREE_MAP` with one method.

```cpp
lua.new_usertype<SECTREE_MAP>("LPSECTREE_MAP",
    sol::constructors<>(),
    /*! \---\@luadoc sectree_map
    *
    * \---Retrieves the settings of the map.
    * \---\@return sectree_map.MAP_SETTINGS
    * \---\@lua function LPSECTREE_MAP:get_settings() end
    */
    "get_settings", [](LUNA_FORGE_BIND_WITH_ARGS(SECTREE_MAP& map)) -> sol::table {
        sol::state_view lua(ts);
        sol::table t = lua.create_table();
        t["index"] = map.m_setting.iIndex;
        t["width"] = map.m_setting.iWidth;
        return t;
    });
```

- `lua` is the global state, so the type name is global; the area table only holds functions that return the pointer.
- `sol::constructors<>()` forbids creating the object from Lua. Scripts only receive pointers produced by C++, here `forge.sys.game.sectree_manager.get_map(map_index)`, which returns nil for an unknown map.
- The first parameter of a method is the object itself, taken by reference. The macro still appends the environment; Lua calls `map:get_settings()` with the colon.
- The returned table is built per call; nothing keeps a reference to the engine object.

Check it from a forge on the game core:

```lua
local map = forge.sys.game.sectree_manager.get_map(1)
if map then sys_log(0, "width: " .. map:get_settings().width) end
```

The binding is loaded when this logs a width and the core prints no registration error at start. After regenerating the stubs, the editor should also offer `get_settings` on `LPSECTREE_MAP` values. Nothing here needs an engine tool: build and restart the core as for any C++ change.

Next: [Forge examples and pitfalls](./examples.md).
