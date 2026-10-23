---
title: Quest compiler, source maps and the Lua debugger
description: How to compile quests and forge scripts with source maps, configure the embedded LRDB server, and attach the VS Code debugger.
---

## The compilation pipeline

QC parses and compiles your quest and forge scripts into the format expected by the game environment. The engine compiles quests using a custom parser that requires a specific syntax. You define a quest with `quest NAME begin`, followed by states like `state start begin`, and conclude with `end` statements. You comment out lines using `--`, as the compiler processes Lua syntax.

The compiler supports a `define` preprocessor to replace identifiers globally. You use this for constants like virtual numbers or map indices.

```lua
define MIN_PCT 1
define MAX_PCT 10000

define MOB_RANGE_LVL 15

define DROP_TYPE_INVENTORY 1
define DROP_TYPE_GROUND 3
define DROP_TYPE_GROUND_WITH_OWNERSHIP 4

define MSG_TYPE_INFO 1
define MSG_TYPE_NOTICE_ALL 2

quest ue_flowers_spec_drop begin
    state start begin
        function fnc_drop(drop_type)
            if ue_flowers_spec_drop.fnc_drop_list==nil then
                ue_flowers_spec_drop.fnc_drop_list = {
                    [DROP_TYPE_INVENTORY] = pc.give_item2,
                    --[DROP_TYPE_INVENTORY_WITH_DICE] = pc.give_item2_with_dice,
                    [DROP_TYPE_GROUND] = game.drop_item,
                    [DROP_TYPE_GROUND_WITH_OWNERSHIP] = game.drop_item_with_ownership,
                    --[DROP_TYPE_GROUND_WITH_OWNERSHIP_AND_DICE] = game.drop_item_with_ownership_and_dice,
                }
            end
            return ue_flowers_spec_drop.fnc_drop_list[drop_type] or ue_flowers_spec_drop.fnc_drop_list[DROP_TYPE_GROUND_WITH_OWNERSHIP]
        end
        function fnc_msg(msg_type)
            if ue_flowers_spec_drop.fnc_msg_list==nil then
                ue_flowers_spec_drop.fnc_msg_list = {
                    [MSG_TYPE_INFO] = syschat,
                    [MSG_TYPE_NOTICE_ALL] = notice_all,
                    [MSG_TYPE_BIG_NOTICE_ALL] = big_notice_all,
                }
            end
            return ue_flowers_spec_drop.fnc_msg_list[msg_type] or ue_flowers_spec_drop.fnc_msg_list[MSG_TYPE_BIG_NOTICE_ALL]
        end
    end
end
```

The engine needs to know where compiled Lua instructions came from. You generate JSON source maps by passing the `--source_map_out` and `--source_map_cwd` flags to QC. The compiler outputs a JSON file for each script. These maps link the compiled scripts back to the original source lines. Only the VS Code extension reads these JSON files; the game server does not read them or track original source lines at runtime. The extension translates line numbers before communicating with the engine's debug server. The `SourceMap` struct belongs to the quest compiler, not the game server.

You generate the maps from the command line.

```bash
qc --files=quests/quest1.qst --out_quest=compiled/quests --source_map_out=compiled/sourcemaps
```

The `--source_map_cwd` flag sets the base path used in the source maps for the original source files. You set this to the exact local workspace path where the debugger will run. The quest compiler, not the debugger, uses the `--source_map_cwd` argument to set the base path for the source maps it generates. You use `--remote_cwd` to specify the remote current working directory in environments where paths differ between compilation and deployment.

## Enabling the embedded LRDB debugger

Both the game and database servers embed an LRDB debug server. You enable this listener in their configuration files. The engine initializes the debug server at your specified port during boot. The default port is 0, which tells the operating system to assign a random ephemeral port. You cannot attach a debugger to port 0. You must configure a specific non-zero port in the server configuration, such as 9000, and use that same port in your `launch.json` file.

The game server reads its configuration from `server.xml`. The `<lrdb>` node sits inside the `<server>` root, next to the other server settings:

```xml
<server>
    <lrdb>
        <enabled>true</enabled>
        <port>9000</port>
    </lrdb>
</server>
```

The database server uses flat keys in its configuration file:

```text
LRDB_ENABLED = true
LRDB_PORT = 9001
```

Each server needs its own port. Use the same number in the matching `launch.json` configuration.

The client also supports remote debugging for its Python side. Building the client with the `PYTHON_REMOTE_DEBUGGER` CMake option freezes the `ptvsd` package into the client's standard library and makes the client start a `ptvsd` listener during boot, on the first free local port from 3000 to 3049. You do not import `ptvsd` or call `enable_attach` yourself; you attach VS Code's Python debugger to that port.

A debugger build also changes how the client finds its modules. Normally every import is answered from the packed client files, so a module edited on disk is invisible. In a debugger build, a `.py` file beside the executable is loaded instead of the packed module with the same name, and it is re-read into the same module object when its modification time changes. You edit a window's code, save, and the running client picks it up. A client built without the option never looks at loose files.

## The VS Code extension and launch.json

The Universal Core VS Code extension provides the `uc-lrdb` debugger type. It builds on the `vscode-lrdb` extension to support remote debugging with the source maps generated by QC. The extension injects a custom plugin automatically into the "Lua by sumneko" language server. You only need to install the "Lua by sumneko" extension. You do not need to configure `Lua.workspace.library` to point to a stubs directory. The engine provides EmmyLua meta files in `Locale/italy/quest/meta/`. This provides full support for Lua syntax and semantics within `.quest` files.

You install the extension manually from a `.vsix` file. You open the Command Palette in Visual Studio Code. Run the "Extensions: Install from VSIX" command and select the downloaded file. For more advanced Lua configurations, you refer to the Lua Language Server documentation.

You configure the debugger in your workspace using `launch.json`. Set the configuration type to `uc-lrdb`. The debugger needs to find the mapping files. You set `sourceMapPaths` to the directory containing your generated source maps. This path must match the directory specified by the `--source_map_out` flag during compilation.

The `pathMappings` array translates remote execution paths to your local workspace. When the server executes a script, it reports the remote path. The debugger uses this array to match a `remoteRoot` to a `localRoot` on your machine. The standard remote path for quests is specified as `locale/` in the path mappings. Skill prototypes are mounted outside the locale directory. The game loads their colocated Lua files by the relative path `conf/skill`. You map the remote root `conf/` to your local root `${workspaceFolder}/conf`. Breakpoints then hit the correct local source file.

```json
{
    "version": "0.2.0",
    "inputs": [
        {
            "id": "debuggerPort",
            "type": "promptString",
            "description": "Enter the Debugger Port to attach to",
            "default": "0"
        },
        {
            "id": "debuggerAddress",
            "type": "promptString",
            "description": "Enter the Debugger Address to attach to",
            "default": "localhost"
        }
    ],
    "configurations": [
        {
            "type": "uc-lrdb",
            "request": "attach",
            "name": "Attach",
            "host": "${input:debuggerAddress}",
            "port": "${input:debuggerPort}",
            "cwd": "${workspaceFolder}",
            "stopOnEntry": false,
            "sourceMapPaths": "${workspaceFolder}/.lua_sourcemap",
            "pathMappings": [
                {
                    // Skill protos are mounted somewhere else entirely
                    // (Locale/conf/skill -> /app/share/conf/skill), and the game
                    // loads their colocated Lua by the relative path "conf/skill",
                    // so those chunks are named conf/skill/<vnum>.lua and
                    // conf/skill/traits/<id>.lua - never locale/*.
                    "localRoot": "${workspaceFolder}/conf",
                    "remoteRoot": "conf/"
                },
                {
                    "localRoot": "${workspaceFolder}",
                    "remoteRoot": "locale/"
                }
            ],
        },
        {
            "type": "uc-lrdb",
            "request": "attach",
            "name": "Compile current & attach",
            "host": "${input:debuggerAddress}",
            "port": "${input:debuggerPort}",
            "cwd": "${workspaceFolder}",
            "stopOnEntry": false,
            "sourceMapPaths": "${workspaceFolder}/.lua_sourcemap",
            "pathMappings": [
                {
                    // Skill protos are mounted somewhere else entirely
                    // (Locale/conf/skill -> /app/share/conf/skill), and the game
                    // loads their colocated Lua by the relative path "conf/skill",
                    // so those chunks are named conf/skill/<vnum>.lua and
                    // conf/skill/traits/<id>.lua - never locale/*.
                    "localRoot": "${workspaceFolder}/conf",
                    "remoteRoot": "conf/"
                },
                {
                    "localRoot": "${workspaceFolder}",
                    "remoteRoot": "locale/"
                }
            ],
            "preLaunchTask": "WSL QC ONE",
        },
        {
            "type": "uc-lrdb",
            "request": "attach",
            "name": "Recompile all & attach",
            "host": "${input:debuggerAddress}",
            "port": "${input:debuggerPort}",
            "stopOnEntry": false,
            "cwd": "${workspaceFolder}",
            "sourceMapPaths": "${workspaceFolder}/.lua_sourcemap",
            "pathMappings": [
                {
                    // Skill protos are mounted somewhere else entirely
                    // (Locale/conf/skill -> /app/share/conf/skill), and the game
                    // loads their colocated Lua by the relative path "conf/skill",
                    // so those chunks are named conf/skill/<vnum>.lua and
                    // conf/skill/traits/<id>.lua - never locale/*.
                    "localRoot": "${workspaceFolder}/conf",
                    "remoteRoot": "conf/"
                },
                {
                    "localRoot": "${workspaceFolder}",
                    "remoteRoot": "locale/"
                }
            ],
            "preLaunchTask": "WSL QC ALL",
        },
    ]
}
```

## A complete debugging session

A debugging session connects the compiler output to the running server. You start by compiling the source files with QC. You pass the `--source_map_cwd` flag and set it to the folder where the debugger runs. The generated JSON source maps then align with your local workspace.

You launch the game or database server. The server reads its configuration and sets up a debug server at the enabled LRDB port. You open Visual Studio Code. You trigger the `uc-lrdb` launch configuration to attach the debugger. The extension connects to the configured host and port.

You write a minimal functional quest with a trigger to test breakpoints. You use the `ue_event_ten_chests` quest to verify debugger desync behavior. For example, you use the `when login begin` syntax to make the quest executable:

```lua
when login with pc.getf("masou_chests","attempts") > 0 and not forge.game.ue_event_manager:is_open("EVENT_TEN_CHESTS") begin
    pc.setf("masou_chests","attempts", 0)
end
```

You place a breakpoint in your original source file. When the server executes the compiled Lua script, the debugger intercepts the execution. It reads the JSON source maps. These maps translate the running compiled code back to your original source lines. Execution pauses exactly where you set the breakpoint.

## Common tasks done right

You pass the `--dry` flag to QC to check syntax without writing output files. This validates the script logic. Run `qc --dry --files=quests/quest1.qst` to catch errors early. You enable verbose output with `--verbose` to print detailed information to `stdout` during compilation.

To compile multiple files at once, you provide a comma-separated list to the `--files` argument. Passing a text file containing the paths to `--do_file` handles larger updates.

```bash
qc --do_file=do_file.txt --out_quest=compiled/quests
```

You target specific forge environments by passing the `--forge_envs` flag. Specify the output paths for each environment using `--out_forge_{name}`.

```bash
qc --files=forges/forge1.forge --forge_envs=db,game --out_forge_db=compiled/forge/db --out_forge_game=compiled/forge/game
```

Stale source maps break debugging. You automate recompilation before attaching the debugger by setting a `preLaunchTask` in your `launch.json`. The debugger then reads mapping data that matches the running code.

You use specific trigger syntax, like interacting with an NPC, or API functions, like checking for an item, to make the quest work. You define the interaction trigger using the `when` keyword combined with the NPC virtual number and the `.take` event.

```lua
when NPC_CHEST_ALIVE_VNUM.take with item.vnum == CHEST_KEY begin
    local item_id = item.get_id()
    local pct = number(1,1000)
    local pct_success = 1
    local pid = pc.get_player_id()
    pc.setf("masou_chests","attempts", pc.getf("masou_chests","attempts") + 1)
    if (pct <= pct_success) then
        forge.sys.game.log.char_log(pid, "EVENT_TEN_CHESTS_OPEN_SUCC")
        local vid_to_reset = npc.get_vid()
        local chest_number_spawn = ue_event_ten_chests.vid_to_number_map:get(vid_to_reset)
        --with vid and number we can have both event flags

        --the event flag with the vid as value
        local npc_event_flag_vid_string_full = EVENT_FLAG_VID_STRING_BASE..chest_number_spawn
        --the event flag to reset so it won't be spawned in case of a server restart 
        local npc_event_flag_string_full = EVENT_FLAG_STRING_BASE..chest_number_spawn
        local event_chest_ch = forge.sys.game.char_manager.find(game.get_event_flag(npc_event_flag_vid_string_full))
        if event_chest_ch ~= nil then
            forge.sys.game.char_manager.destroy_character(event_chest_ch)
        end
        local item_vnum_body = special.ten_chests_common_item_reward[pc.get_sex()]['body']['vnum']
        local item_count_body = special.ten_chests_common_item_reward[pc.get_sex()]['body']['count']
        local item_vnum_head = special.ten_chests_common_item_reward[pc.get_sex()]['head']['vnum']
        local item_count_head = special.ten_chests_common_item_reward[pc.get_sex()]['head']['count']

        pc.give_item2(item_vnum_head, item_count_head)
        pc.give_item2(item_vnum_body, item_count_body)
        game.set_event_flag(npc_event_flag_string_full, 0)
        game.set_event_flag(npc_event_flag_vid_string_full, 0)

        local old_remain = game.get_event_flag(EVENT_FLAG_STRING_CHESTS_REMAIN)
        game.set_event_flag(EVENT_FLAG_STRING_CHESTS_REMAIN, old_remain - 1)
        --we can't use get_event_flag, the value has not been updated yet
        local new_remain = old_remain - 1
        local attempts = pc.getf("masou_chests","attempts")
        if attempts == 1 then
            notice_multiline(string.format(locale.events.ten_chests_open_notice_s, pc.get_name(), pc.getf("masou_chests","attempts"), new_remain), notice_all)
        else
            notice_multiline(string.format(locale.events.ten_chests_open_notice, pc.get_name(), pc.getf("masou_chests","attempts"), new_remain), notice_all)
        end
        pc.setf("masou_chests","attempts", 0)
        --if it will ever be available
        --[[
            local event_chest_open = forge.sys.game.char_manager.spawn_mob(NPC_CHEST_ALIVE_VNUM, EVENT_MAP_INDEX, base_pos.x + coords_table[i]['x'], base_pos.y + coords_table[i]['y'], 0, false, 270, true)
            local event_chest_vid_open = event_chest_open:get_vid()
            --let's save the vid to the event flag
            game.set_event_flag(npc_event_flag_vid_string_full, event_chest_vid_open)
            --let's save to a map vid -> number id
            ue_event_ten_chests.vid_to_number_map:set(event_chest_vid_open, chest_number_spawn)                 
        ]]--
        if new_remain < 1 then
            forge.game.ue_event_manager:close("EVENT_TEN_CHESTS")
        end
    else
        forge.sys.game.log.char_log(pid, "EVENT_TEN_CHESTS_OPEN_FAIL")
        syschat(locale.events.ten_chests_open_fail)
        ue.give_special_reward("ten_chests_event_rewards")
    end
    pc.remove_item_with_id(item_id,1)
end
```

## Traps and limitations

The LRDB debugger opens a network port that accepts remote connections. Because this grants remote access to the running game state, you must never enable the debugger on a production server. The same holds on the client: the `PYTHON_REMOTE_DEBUGGER` option also forces the client's process hardening off, so a debugger build must never ship.

Editing a `.quest` file without recompiling leaves its source map stale. The server keeps running the old compiled code and the debugger keeps translating with the old map. Lines added or removed above a breakpoint shift it, so the debugger stops, and error traces point, at the wrong place; edits below a breakpoint leave it where it was. Reloading the script does not help, because it reloads the same compiled code. Recompile, then reattach.

Incorrect path mappings in `launch.json` prevent the debugger from resolving remote execution paths to your local workspace. You map the remote root exactly as the server reports it, such as `locale/` for quests or `conf/` for skill prototypes.

The quest compiler offers limited error recovery. QC exits immediately on the first critical error it encounters. You fix syntax errors sequentially.

The compiler warns about CRC conflicts for state names. State names are hashed using standard CRC32. The compiler stores state names in a `std::set<std::string>` called `define_state_name_set`, which deduplicates identical names before CRC generation. Duplicate state names in a quest are deduplicated by the parser, so a CRC conflict only happens when two distinct state names hash to the same CRC32 value. To see the warning on purpose, use two state names that really collide, such as `plumless` and `buckeroo`. When a collision occurs, QC resolves it by incrementing the CRC value until it finds an empty slot in the `crc_set`. State indices may differ at compile time. The compiler prints `WARN: state CRC conflict occur! state index may differ in compile time.`

```cpp
if (crc_set.find(crc) == crc_set.end()) {
    crc_set.emplace(crc);
} else {
    ++crc;
    while (crc_set.find(crc) != crc_set.end())
        ++crc;
    printf("WARN: state CRC conflict occur! state index may differ in compile time.\n");
    crc_set.emplace(crc);
}
```
