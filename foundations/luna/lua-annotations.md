---
title: Lua annotations and the generated stubs
description: How the Lua API is documented in C++ bindings and generated into EmmyLua stubs for the language server.
---

## The annotation pipeline

The engine exposes a Lua API that you document directly in the C++ bindings. You write EmmyLua annotations inside Doxygen comment blocks. This keeps the documentation close to the implementation.

This complete C++ binding documents a battle arena function.

```c++
int ba_get_points(lua_State* L)
{
  if(!lua_isnumber(L, 1))
  {
      lua_pushinteger(L, 0);
      return 1;
  }
  
  uint32_t dwPoints = CBattleArena::instance().GetPoints((int)lua_tonumber(L, 1));
  lua_pushinteger(L, dwPoints);
  return 1;
}
```

You write the documentation block to describe the binding.

```cpp
/**
* @brief Retrieves the points for a given player ID.
*
* \---\@luadoc ba
*
* \---Retrieves the points for the player with the provided player ID.
* \---\@param player_id number ID of the player whose points are to be retrieved
* \---\@return number # Number of points for the specified player
* \---\@lua ba.get_points = function (player_id) end
*/
```

The pipeline translates these blocks into standard Lua stubs. For example, a quest state binding generates this stub:

```lua
---Sets the current state of the quest to the provided state name.   
---This function updates the quest state and ensures synchronization with the running thread.   
---**Requires CurrentCharacter**   
---@param state_name string The name of the state to set for the quest   
q.set_state = function(state_name) end 

---Sets the current state of the quest to the provided state name. 
---This function updates the quest state and ensures synchronization with the running thread. 
---**Requires CurrentCharacter** 
---@param state_name string The name of the state to set for the quest 
q.setstate = function(state_name) end 
```

The extraction happens in two steps. Doxygen scans the C++ sources and outputs the comment blocks as XML. A Python script then parses that XML. The parser script searches for the `\@luadoc` marker to identify the target namespace. It strips the Doxygen escaping from the Markdown characters, groups the parsed blocks by namespace, and writes one `---@meta` EmmyLua stub file per namespace into the quest meta directory.

The editor extension and the Lua language server read these generated stubs. When you write quest scripts, the language server uses the stubs to provide autocompletion and type checking. If a C++ binding changes, regenerating the documentation updates the stubs. The editor then immediately reflects the new API surface.

## The luadoc block and escaping

You start a documentation block with the `/*! \---\@luadoc` syntax. This marker tells the parser script to process the comment as Lua documentation.

Inside this block, you must escape all Markdown characters and Doxygen commands with a backslash. You write `\@`, `\*`, `\_`, and `\--`. You must also explicitly escape table pipes as `\|` and single dashes as `\-` when formatting Markdown tables. Properly escaping these characters ensures that Doxygen does not misinterpret the text.

If you leave a Doxygen command like `@param` unescaped, Doxygen parses it as an XML element. An unescaped `@param` becomes a `<parameterlist>` XML node. The parser script expects flat text paragraphs. The parser script now uses `itertext()` to pull the text of child elements back inline, so it no longer drops the documentation, though it still prints a warning.

To catch this mistake, the parser script prints a warning when it detects an unescaped Doxygen command. It fails loudly, warning that an unescaped command inside a luadoc block is the most common way to silently corrupt the output.

The parser script splits lines on `---`, so `\---` inside a line breaks it into multiple lines. You must use the `\@\--` directive to output a literal `---` without triggering a newline. You use this directive for dashes inside Markdown tables and to document Lua callback parameters with the escaped triple dash.

```text
* \---function lua_func(lua_data: table, processed_time_milli: number)
* \--- \@\--\@param lua_data: table # Data passed during event construction, the data is a reference and can be modified inside the function
* \--- \@\--\@param processed_time_milli: number # milliseconds passed since event creation
* \---end
```

The parser script actually appends a double space to the end of lines as a hard-break heuristic.

## Namespaces and generated files

The namespace you specify in the `\@luadoc` directive dictates the name of the generated Lua stub. When you write `\@luadoc arena`, the parser script collects every block sharing that namespace and writes them into a single stub file named for it. This groups the generated documentation by system.

For standard namespaces, the parser script automatically injects a class declaration and an empty table initialization at the top of the generated file. You do not need to scaffold the base table yourself.

The parser script generates the base table and class declarations.

```python
def write_namespace_files(output_dir, namespaces):
    os.makedirs(output_dir, exist_ok=True)
    
    for key, values in namespaces.items():
        file_path = os.path.join(output_dir, f"{key}.lua")
        with open(file_path, 'w') as file:
            file.write(f"---@meta\n\n")
            if key != "global":
                file.write(f"---@class {key}\n{key} = {{}}\n\n")
            else:
                file.write("---@class Array<T>: { [integer]: T }\n\n")
            for value in values:
                for line in value['luadoc_tokens']:
                    file.write(line + '\n')
```

The `global` namespace is a special case. Functions in this namespace are exposed directly to the global Lua environment rather than living inside a table. Because of this, the parser script skips the standard class declaration and table initialization. It injects a generic `Array<T>` class definition at the top of the file to support fixed array returns. You must always document the `global` namespace, even if you only provide a dummy block, to ensure the base array type is available to the language server.

## Documenting functions and enums

You document parameters and return types using standard EmmyLua tags like `\@param` and `\@return`. At the end of the documentation block, you use the `\@lua` directive to emit the actual Lua signature. The parser script strips the directive and writes the rest of the line as normal Lua code. This is what the language server reads to understand the function signature.

To document an enum, you create a `\@class` directive matching the table name exposed to Lua. You define each value using the `\@field` directive, specifying the type and description. You use the `\@lua` directive to initialize the table in the generated stub.

When you bind a function using `sol3` lambdas, you use `LUNA_FORGE_BIND_WITH_ARGS` in the lambda's parameter list to receive the Lua state and environment as arguments from `sol3`. This macro expands to a comma-separated list that is invalid if empty. For functions without arguments, you must use `LUNA_FORGE_BIND_NO_ARGS()` instead.

When you write bindings that check argument types, you must be careful with strings. In the Lua C API, `lua_isstring` also returns true for numbers. If the first argument is a number, such as an X coordinate, it will incorrectly branch into the string logic. You must use `lua_type(L, 1) == LUA_TSTRING` to strictly check for strings.

When you deal with external functions or `sol3` bindings inside a `Register__*` function, you can document the single bindings by putting the comment block directly inside the function body. You start the block with the `/*! \---\@luadoc [namespace]` syntax.

This complete C++ registration file binds an enum and two functions, documenting each with EmmyLua annotations:

```cpp
namespace luna {
    void RegisterPrivBindings() {
        auto& env_sys_table = ForgeDB::instance().GetEnvSysTable();
        auto priv = env_sys_table.create_named("priv");

        /*! \---\@luadoc forge.sys.db.priv
        *
        * \---Enum representing privilege scope types.
        * \---\@class PRIV_SCOPE
        * \---\@field EMPIRE PRIV_SCOPE|number # Empire-wide privilege scope.
        * \---\@field GUILD PRIV_SCOPE|number # Guild privilege scope.
        * \---\@field CHARACTER PRIV_SCOPE|number # Character privilege scope.
        * \---\@lua forge.sys.db.priv.PRIV_SCOPE = {}
        */
        priv.new_enum("PRIV_SCOPE",
            "EMPIRE", PRIV_SCOPE_EMPIRE,
            "GUILD", PRIV_SCOPE_GUILD,
            "CHARACTER", PRIV_SCOPE_CHARACTER
        );

        /*! \---\@luadoc forge.sys.db.priv
         *
         * \---Gets a specific privilege.
         * \---\@param scope number 0=empire, 1=guild, 2=character
         * \---\@param scope_id number empire/guild/player id
         * \---\@param priv_id number privilege identifier
         * \---\@return table|nil {points=[{point_type, value},...], end_time}
         * \---\@lua function forge.sys.db.priv.get(scope, scope_id, priv_id) end
         */
        priv.set_function("get", [](LUNA_FORGE_BIND_WITH_ARGS(uint8_t scope, uint32_t scope_id,
                uint32_t priv_id)) -> sol::object {
            sol::state_view lua(ts);
            const TPrivData* p = CPrivManager::instance().GetPriv(scope, scope_id, priv_id);
            if (!p)
                return sol::nil;

            sol::table t = lua.create_table();
            sol::table pts = lua.create_table();
            int idx = 1;
            for (const auto& pt : p->points)
            {
                sol::table entry = lua.create_table();
                entry["point_type"] = pt.point_type;
                entry["value"] = pt.value;
                pts[idx++] = entry;
            }
            t["points"] = pts;
            t["end_time"] = (uint64_t)p->end_time_sec;
            return t;
        });

        /*! \---\@luadoc forge.sys.db.priv
         *
         * \---Gets all privileges for a scope+id.
         * \---\@param scope number 0=empire, 1=guild, 2=character
         * \---\@param scope_id number empire/guild/player id
         * \---\@return table Array of {priv_id, points=[{point_type, value},...], end_time}
         * \---\@lua function forge.sys.db.priv.get_all(scope, scope_id) end
         */
        priv.set_function("get_all", [](LUNA_FORGE_BIND_WITH_ARGS(uint8_t scope, uint32_t scope_id)) -> sol::table {
            sol::state_view lua(ts);
            sol::table result = lua.create_table();

            auto privs = CPrivManager::instance().GetAllPrivs(scope, scope_id);
            int idx = 1;
            for (const auto* p : privs)
            {
                sol::table entry = lua.create_table();
                entry["priv_id"] = p->key.priv_id;
                sol::table pts = lua.create_table();
                int pidx = 1;
                for (const auto& pt : p->points)
                {
                    sol::table ptEntry = lua.create_table();
                    ptEntry["point_type"] = pt.point_type;
                    ptEntry["value"] = pt.value;
                    pts[pidx++] = ptEntry;
                }
                entry["points"] = pts;
                entry["end_time"] = (uint64_t)p->end_time_sec;
                result[idx++] = entry;
            }
            return result;
        });
    }
}
```

## Overloads and complex types

When a C++ binding exposes multiple signatures to Lua, you document the overload by writing multiple `\@lua` directives at the end of a single `\@luadoc` block. 

The parser script reads the lines before the first `\@lua` directive and stores them as a shared preamble. If it encounters a second `\@lua` directive immediately after, with no new documentation lines between them, it automatically duplicates the shared preamble for the new signature. This generates complete EmmyLua stubs for every valid call pattern. EmmyLua requires `@param` names to match the function signature. If your overloads have different parameter names, you cannot rely on the shared preamble. You must manually duplicate the description in a new block to document the distinct parameter names and types for each overload.

The parser script re-emits the preamble only for a genuine overload: a second `\@lua` directive with no new documentation lines since the last one. If a `\@lua` directive follows its own `\@class` or `\@field` block, it keeps that block as its documentation and does not inherit the first preamble.

When a function returns multiple values, you write multiple `\@return` directives in the exact order the values are pushed to the Lua stack.

This C++ function returns four separate values. The documentation block lists each return type in order, followed by the single `\@lua` directive.

```cpp
    /**
	 * @brief Retrieves the state of a monarch based on the provided index.
	 *
	 * \---\@luadoc mgmt
	 *
	 * \---Retrieves the state information of a monarch identified by the given index.
	 * \---\@param empire number empire of the monarch (must be between 1 and 3)
	 * \---\@return string # name The name of the monarch
	 * \---\@return number # pid The player ID of the monarch
	 * \---\@return string # date The date associated with the monarch
	 * \---\@return number # money The money associated with the monarch
	 * \---\@lua mgmt.state = function(empire) end
	 */
	int mgmt_monarch_state(lua_State* L)
	{
		if( lua_isnumber(L, 1) == false )
		{
			return 0;
		}

		int idx = (int)lua_tonumber(L, 1);

		if( idx < 1 || idx > 3 )
		{
			return 0;
		}

		TMonarchInfo* info = CMonarch::instance().GetMonarch();

		lua_pushstring(L, info->name[idx]);
		lua_pushinteger(L, info->pid[idx]);
		lua_pushstring(L, info->date[idx]);
		lua_pushinteger(L, info->money[idx]);

		return 4;
	}
```

When a function returns a table or a fixed size array, you scaffold a dummy type. You define an empty `\@class` block and document its keys or indices using the `\@field` directive. For fixed arrays where each index carries a precise meaning, you write bracketed indices like `\@field [1]`.

Dummy classes often lack a `\@lua` directive because there is no Lua function signature or variable assignment to emit. The parser script normally relies on the `\@lua` directive to delimit documentation blocks and handle spacing. Without it, you use the `\@br` directive to force a newline and safely close the dummy class block.

This C++ function returns a fixed array of points for three empires. The documentation block defines the function signature first, then scaffolds the `_get_all_points_result` dummy class, documents the three fixed indices, and closes the block with `\@br`.

```cpp
    /**
    * @brief Retrieves the points for all empires in the battle arena.
    *
    * \---\@luadoc global
    *
    * \---Retrieves the points for all empires in the battle arena.
    * \---
    * \---_get_all_points_result[1] = Empire 1
    * \---_get_all_points_result[2] = Empire 2
    * \---_get_all_points_result[3] = Empire 3
    * \---Retrieves the points for all empires in the battle arena.
    * \---\@return result_points # Array of points for all empires
    * \---\@lua _get_all_points_result = function() end
    *
    * \---\@class _get_all_points_result
    * \---\@field [1] number Empire 1
    * \---\@field [2] number Empire 2
    * \---\@field [3] number Empire 3
    * \---\@br
    */
	int _get_all_points(lua_State* L)
	{		
		uint32_t * dwPoints = CBattleArena::instance().GetPointsArray();
		
		lua_newtable(L);
		{
			// Create columns and assign values
			lua_pushinteger(L, dwPoints[1]);
			lua_rawseti(L, -2, 1);
			lua_pushinteger(L, dwPoints[2]);
			lua_rawseti(L, -2, 2);
			lua_pushinteger(L, dwPoints[3]);
			lua_rawseti(L, -2, 3);
		}
		
		return 1;
	}
```

## Regenerating the documentation

You run the documentation generation script to regenerate the Lua stubs whenever you modify or remove a C++ Lua binding. The generation script runs Doxygen to extract the XML and then overwrites the existing EmmyLua files.

You run the generation script to update the stubs.

```sh
./gendocs.sh
```

The pipeline relies on a specific Doxygen configuration file. Its `FILE_PATTERNS` list filters which source files Doxygen reads: a handful of named headers and sources from the old quest API, plus wildcard patterns such as `bind_*`, `forge*`, `luna*`, `bridge*`, `event_bus*` and `hook_chain*` that cover the Luna bindings.

If you document a binding in a new C++ file, Doxygen ignores it unless the file matches an existing filter. Adding the new file to the `FILE_PATTERNS` list in the `Doxyfile` configuration is a necessary step. New files that match existing wildcard patterns do not need to be added manually. Without this step for unmatched files, the parser script never sees the annotations and the generated stub silently omits your new API.
