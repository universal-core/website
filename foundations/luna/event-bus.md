---
title: The event bus
description: Subscribe to engine events from Lua and raise custom events in both the game and database servers.
---

## The event bus routes local server messages

You use the event bus to react to game and database events directly from your scripts. The event bus is local to each server process. The `CallEvent` method only dispatches to local subscribers. Events marked **GAME ONLY** are available on the game server. Cross-server subscriptions are impossible. The `ON_PLAYER_P2P_LOGIN` event triggers only on the game server event bus. It is never routed to the database server.

A Lua script subscribes to a dungeon join event with a guard function.
```lua
bridge.e.subscribe(bridge.e.names.game.ON_DUNGEON_JOIN, 
    function(...) instance:on_join(...) end,
    function(...) return instance:on_join_guard(...) end
)
```

Events are strongly typed in C++ and automatically serialized to Lua tables only when a script subscribes, avoiding the cost of serialization if no script needs the data. You find the payload structure for any event by reading the LuaDoc annotations directly above the event definition in the C++ declarations. These comments define the class and fields of the event payload.

The C++ definition for the dungeon join event includes LuaDoc annotations for the payload structure.
```cpp
/**
 * \---\@luadoc bridge.e.game
 *
 * \---Event triggered when one or more pg enters a dungeon.
 * \---The event triggers on Join, not at pc LOGIN
 * \---\*\*GAME ONLY\*\*
 * \---\@class bridge.e.game.dungeon_join
 * \---\@field dungeon LPDUNGEON 
 * \---\@field pids Array<number> 
 * \---\@lua bridge.e.game.dungeon_join = {}
 * 
 */
BUSEVENTDATA_DEF(DungeonJoin, (LPDUNGEON, dungeon), (std::vector<uint32_t>, pids));
```

The `PlayerP2PLogin` event struct takes a `CCI*` pointer as its argument, not a `uint32_t`. The event payload contains a `CCI` object under the `cci` field.

The C++ definition for the player login event shows the CCI pointer field.
```cpp
/**
 * \---\@luadoc bridge.e.game
 *
 * \---Event triggered when a player is saved
 * \---\*\*GAME ONLY\*\*
 * \---\@class bridge.e.game.player_p2p_login
 * \---\@field cci CCI
 * \---\@lua bridge.e.game.player_p2p_login = {}
 * 
 */
BUSEVENTDATA_DEF(PlayerP2PLogin, (CCI*, cci));
```

## Subscribing to events binds a Lua callback

You register a listener by calling `bridge.e.subscribe`. You pass the event name and a callback function. The engine executes your function whenever the event fires, passing a table populated with the event data.

Event names are constants exposed to scripts in `bridge.e.names.game` for the game core and `bridge.e.names.db` for the database cache. The database server event bus only binds `ON_PEER_STARTUP`, `ON_EVENT_FLAG`, `ON_DB_BOOT`, `ON_PRIV_START`, and `ON_PRIV_END`, which do not include any login events.

The database event bus declares a restricted set of events.
```cpp
public:
    static const std::string ON_PEER_STARTUP;
    static const std::string ON_EVENT_FLAG;
    static const std::string ON_DB_BOOT;
    static const std::string ON_PRIV_START;
    static const std::string ON_PRIV_END;
```

A Lua script subscribes to the dungeon destroy event.
```lua
bridge.e.subscribe(bridge.e.names.game.ON_DUNGEON_DESTROY, 
    function(...) instance:on_dungeon_destroy(...) end
)
```

The function returns a numeric subscription ID. You must store this ID if you intend to remove the listener later. You stop listening by passing the ID to `bridge.e.unsubscribe`. 

The Lua binding exposes the exact signature, including the optional third argument for the guard function.

The C++ bridge binds the subscribe function to Lua.
```cpp
ebus_table.set_function("subscribe", [this](LUNA_BRIDGE_BIND_WITH_ARGS(
    const std::string& event, sol::protected_function lua_func, std::optional<sol::protected_function> guard)) -> uint64_t {
        return this->ebus->Subscribe(event, this->MakeGuardedCall(lua_func, guard,
            dispatch::Kind::EVENT, event, dispatch::DeriveForgeNs(lua_func, te)), true);
});
```

The C++ bridge binds the unsubscribe function to Lua.
```cpp
ebus_table.set_function("unsubscribe", [this](LUNA_BRIDGE_BIND_WITH_ARGS(uint64_t subscription)) -> void {
        return this->ebus->Unsubscribe(subscription);
});
```

## Triggering events dispatches payloads to subscribers

You trigger an event from C++ by calling the `CallEvent` template method on the event bus singleton. You access the event bus in arbitrary C++ code via `luna::EventBusGame::instance()`. There is no global `ebus` pointer available in arbitrary C++ code. You pass the event name and the arguments the event struct expects. The bus uses perfect forwarding to construct the event data. This dispatches the payload to all subscribers.

C++ code triggers the guild creation event using the singleton.
```cpp
luna::EventBusGame::instance().CallEvent<luna::EventBusGame::GuildCreate>(luna::EventBusGame::ON_GUILD_CREATE, pg);
```

The CallEvent template method constructs event data using perfect forwarding.
```cpp
template<typename StructType, typename... Args>
void CallEvent(const std::string& event_name, Args&&... args) {
    // Construct the event data using perfect forwarding
    std::shared_ptr<luna::EventBus::event_data> event_info = 
        std::make_shared<StructType>(std::forward<Args>(args)...);

    // Call the event with the constructed event data
    CallEvent(event_name, event_info);
}
```

Because the event bus is local to each server process, you cannot subscribe to events across servers. You call `forge.sys.game.send_p2p` to send a payload to other game cores. The engine does not have a generic `forge.sys.serialize` function. The `send_p2p` function expects a string, which you generate manually using `json.encode`, `string.format`, or a protobuf object's `:SerializeToString()` method. The `forge.sys.game.send_p2p` function sends Game-to-Game (`HEADER_GG_LUNA_MESSAGE`) packets to other game cores. It only broadcasts to other game cores, not the database server. 

Sending a message to the database server requires `forge.sys.game.send_db` (`HEADER_GD_LUNA_MESSAGE`). To register a handler on the database server for messages from the game server, you call `forge_helper.sys.db.set_peer_processor`. This function requires a `header` string as the first argument, and `self` if using `forge_helper`. The callback function receives the peer or descriptor as its first argument and the message string as its second. You parse incoming string payloads using a protobuf object's `:ParseFromString()` method. 

To broadcast a message directly to players in the game, you call `forge.sys.game.send_client` with the character object, a header string, and the message string. When your payload requires a timestamp, you generate it using `get_global_time()`.

A Lua script sends a peer-to-peer message to synchronize state.
```lua
forge.sys.game.send_p2p("sync", self:build_rejoinbale_message({rejoinable}):SerializeToString())
```

You trigger an event manually from Lua by calling `bridge.e.call` with the event name and a Lua table containing the event data. Scripts use this to raise custom events or simulate engine events. Purely Lua-based custom events cannot use arbitrary string names. The engine attempts to map them to C++ structs in `table_to_event_data` and falls back to `generic_event_data` which parses the table into an `unsorted_map`.

The C++ bridge binds the call function to Lua.
```cpp
ebus_table.set_function("call", [this](LUNA_BRIDGE_BIND_WITH_ARGS(const std::string& event_name, sol::table lua_table)) {
    return this->ebus->CallEvent(event_name, lua_table);
});
```

When an event is triggered from Lua, `bridge.e.call` calls `table_to_event_data` to serialize the table into an `event_data` object, which is then passed to `CallEvent`. The engine passes the original table directly to Lua listeners, so the types in the table do not matter for them. The engine still calls `table_to_event_data` which parses the table into an `unsorted_map`. C++ listeners receive strongly typed data.

The engine bypasses serialization when the event originates from Lua.
```cpp
if (needs_lua && !lua_table) {
    args = event_data_to_table(event_info->serialize());
} else if (lua_table) {
    args = *lua_table;
}
```

The event bus converts the Lua table to C++ event data.
```cpp
void EventBus::CallEvent(const std::string& event_name, sol::table& lua_table) {
    // if no subscription are registered for this event_name, return without spending time in deserialization/serialization
    if (subscribers.find(event_name) == subscribers.end()) return; 

    auto event_data = table_to_event_data(event_name, lua_table);
    CallEvent(event_name, event_data, &lua_table);
}
```

## Defining new events requires a C++ struct

Adding a new event means declaring the event struct, binding its name to the Lua bridge, and registering it for deserialization. This exposes the C++ state so scripts can trigger it back. There is no native `ON_GUILD_LEVEL_UP` event in the C++ bindings. To detect a guild level up natively, you must define a custom event.

You define the event struct using the `BUSEVENTDATA_DEF` macro. It takes the struct name and a list of fields. Each field is a tuple containing the C++ type and the variable name. You place the LuaDoc annotation directly above the macro.

The guild create event is defined using the BUSEVENTDATA_DEF macro.
```cpp
/**
 * \---\@luadoc bridge.e.game
 *
 * \---Event for guild creation.
 * \---\*\*GAME ONLY\*\*
 * \---\@class bridge.e.game.guild_create
 * \---\@field guild LPGUILD The guild object being created.
 * \---\@lua bridge.e.game.guild_create = {}
 * 
 */
BUSEVENTDATA_DEF(GuildCreate, (CGuild *, guild));
```

Next, you declare a constant string for the event name and bind it to the Lua bridge. You declare the constant in C++.

The event name is declared as a constant string.
```cpp
const std::string luna::EventBusGame::ON_GUILD_CREATE = "ON_GUILD_CREATE";
```

You bind the name inside the `BindEventNames` method. This step exposes the name to scripts under the `bridge.e.names` table.

The event name is bound to the Lua bridge.
```cpp
void EventBusGame::BindEventNames(sol::state_view lua) {
    sol::table e = lua["bridge"]["e"];
    sol::table names = e.create_named("names");
    sol::table game = names.create_named("game");

    game.set("ON_GUILD_CREATE", EventBusGame::ON_GUILD_CREATE);
    game.set("ON_GUILD_DISBAND", EventBusGame::ON_GUILD_DISBAND);
    game.set("ON_GUILD_ADD_MEMBER", EventBusGame::ON_GUILD_ADD_MEMBER);
    game.set("ON_GUILD_REMOVE_MEMBER", EventBusGame::ON_GUILD_REMOVE_MEMBER);
    game.set("ON_EVENT_FLAG", EventBusGame::ON_EVENT_FLAG);
    game.set("ON_DUNGEON_JOIN", EventBusGame::ON_DUNGEON_JOIN);
    game.set("ON_DUNGEON_DESTROY", EventBusGame::ON_DUNGEON_DESTROY);
    game.set("ON_ELEGIBILITY_REMOVE", EventBusGame::ON_ELEGIBILITY_REMOVE);
    game.set("ON_ELEGIBILITY_ADD", EventBusGame::ON_ELEGIBILITY_ADD);
    game.set("ON_PLAYER_SAVE", EventBusGame::ON_PLAYER_SAVE);
    game.set("ON_PLAYER_P2P_LOGIN", EventBusGame::ON_PLAYER_P2P_LOGIN);
    game.set("ON_PLAYER_P2P_LOGOUT", EventBusGame::ON_PLAYER_P2P_LOGOUT);
    game.set("ON_PRIV_START", EventBusGame::ON_PRIV_START);
    game.set("ON_PRIV_END", EventBusGame::ON_PRIV_END);
    game.set("ON_METRICS_CHANGED", EventBusGame::ON_METRICS_CHANGED);
    game.set("ON_LAND_CLAIM_RESULT", EventBusGame::ON_LAND_CLAIM_RESULT);
    game.set("ON_LAND_CELL_CHANGED", EventBusGame::ON_LAND_CELL_CHANGED);
    game.set("ON_LAND_CHANGED", EventBusGame::ON_LAND_CHANGED);
    game.set("ON_LAND_CELL_ENTERED", EventBusGame::ON_LAND_CELL_ENTERED);
    game.set("ON_LAND_WAYPOINT_CHANGED", EventBusGame::ON_LAND_WAYPOINT_CHANGED);
    game.set("ON_LAND_REFUSED", EventBusGame::ON_LAND_REFUSED);
    game.set("ON_DEPLOYMENT_CREATED", EventBusGame::ON_DEPLOYMENT_CREATED);
    game.set("ON_DEPLOYMENT_CHANGED", EventBusGame::ON_DEPLOYMENT_CHANGED);
    game.set("ON_DEPLOYMENT_REMOVED", EventBusGame::ON_DEPLOYMENT_REMOVED);
    game.set("ON_DEPLOYMENT_OWNER_CHANGED", EventBusGame::ON_DEPLOYMENT_OWNER_CHANGED);
}
```

Finally, you add a case in the `table_to_event_data` method. When a script triggers an event manually, the engine converts the provided Lua table into the corresponding C++ event struct. Matching the event name and instantiating the correct struct provides two-way routing.

The table_to_event_data method maps event names to their C++ structs.
```cpp
std::shared_ptr<luna::EventBus::event_data> EventBusGame::table_to_event_data(const std::string& event_name, const sol::table& data) {
    if (event_name == ON_GUILD_CREATE) {
        return std::make_shared<GuildCreate>(data);
    } else if (event_name == ON_GUILD_DISBAND) {
        return std::make_shared<GuildDisband>(data);
    } else if (event_name == ON_GUILD_ADD_MEMBER) {
        return std::make_shared<GuildAddMember>(data);
    } else if (event_name == ON_GUILD_REMOVE_MEMBER) {
        return std::make_shared<GuildRemoveMember>(data);
    } else if (event_name == ON_EVENT_FLAG) {
        return std::make_shared<EventFlagChange>(data);
    }  else if (event_name == ON_DUNGEON_JOIN) {
        return std::make_shared<DungeonJoin>(data);
    } else if (event_name == ON_DUNGEON_DESTROY) {
        return std::make_shared<DungeonDestroy>(data);
    } else if (event_name == ON_ELEGIBILITY_REMOVE) {
        return std::make_shared<ElegibilityRemove>(data);
    } else if (event_name == ON_ELEGIBILITY_ADD) {
        return std::make_shared<ElegibilityAdd>(data);
    } else if (event_name == ON_PLAYER_SAVE) {
        return std::make_shared<PlayerSave>(data);
    } else if (event_name == ON_PLAYER_P2P_LOGIN) {
        return std::make_shared<PlayerP2PLogin>(data);
    } else if (event_name == ON_PLAYER_P2P_LOGOUT) {
        return std::make_shared<PlayerP2PLogout>(data);
    } else if (event_name == ON_PRIV_START) {
        return std::make_shared<PrivStart>(data);
    } else if (event_name == ON_PRIV_END) {
        return std::make_shared<PrivEnd>(data);
    } else if (event_name == ON_METRICS_CHANGED) {
        return std::make_shared<MetricsChanged>(data);
    } else if (event_name == ON_LAND_CLAIM_RESULT) {
        return std::make_shared<LandClaimResult>(data);
    } else if (event_name == ON_LAND_CELL_CHANGED) {
        return std::make_shared<LandCellChanged>(data);
    } else if (event_name == ON_LAND_CHANGED) {
        return std::make_shared<LandChanged>(data);
    } else if (event_name == ON_LAND_CELL_ENTERED) {
        return std::make_shared<LandCellEntered>(data);
    } else if (event_name == ON_LAND_WAYPOINT_CHANGED) {
        return std::make_shared<LandWaypointChanged>(data);
    } else if (event_name == ON_LAND_REFUSED) {
        return std::make_shared<LandRefused>(data);
    } else if (event_name == ON_DEPLOYMENT_CREATED) {
        return std::make_shared<DeploymentCreated>(data);
    } else if (event_name == ON_DEPLOYMENT_CHANGED) {
        return std::make_shared<DeploymentChanged>(data);
    } else if (event_name == ON_DEPLOYMENT_REMOVED) {
        return std::make_shared<DeploymentRemoved>(data);
    } else if (event_name == ON_DEPLOYMENT_OWNER_CHANGED) {
        return std::make_shared<DeploymentOwnerChanged>(data);
    }

    unsorted_map map;
    // we only provide duible which is the only type which perfectly matches lua number
    luna::Bridge::table_to_unsorted_maps<double, 
        std::string, LPCHARACTER, LPDESC, LPSECTREE, LPITEM, LPDUNGEON, CGuild*, CCI*>(map, data);
    return std::make_shared<luna::EventBus::generic_event_data>(map);
}
```

## Guards evaluate in Lua before the main callback

An event with no subscribers costs nothing. The bus checks the subscriber map and returns before allocating tables or serializing data.

The CallEvent method returns early if there are no subscribers.
```cpp
void EventBus::CallEvent(const std::string& event_name, std::shared_ptr<event_data> event_info, sol::table* lua_table) {
    // if no subscription are registered for this event_name, return without spending time in deserialization/serialization
    if (subscribers.find(event_name) == subscribers.end()) return; 
    auto needs_lua = EventNeedsLua(event_name);
    sol::table args;

    if (needs_lua && !lua_table) {
        args = event_data_to_table(event_info->serialize());
    } else if (lua_table) {
        args = *lua_table;
    }

    auto it = subscribers.find(event_name);
    if (it != subscribers.end()) {
        for (const auto& [id, subscriber] : it->second) {
            if (!needs_lua) {
                auto& callback = std::get<std::function<void(std::shared_ptr<event_data>)>>(subscriber.callback);
                callback(event_info);
                continue;
            }

            if (!subscriber.need_lua) {
                // Dispatch the variant callback for event_data
                std::visit([&](auto& func) {
                    using T = std::decay_t<decltype(func)>;
                    if constexpr (std::is_same_v<T, std::function<void(std::shared_ptr<event_data>)>>) {
                        func(event_info);  // Call with event_data
                    }
                }, subscriber.callback);
            } else {
                std::visit([&](auto& func) {
                    using T = std::decay_t<decltype(func)>;
                    if constexpr (std::is_same_v<T, std::function<bool(sol::table&)>>) {
                        func(args);  // Call with sol::table
                    }
                }, subscriber.callback);
            }
        }
    }
}
```

The engine tracks how many subscribers need Lua serialization. It decrements a counter when a script unsubscribes. When that count reaches zero, the engine stops building Lua tables for that event.

The Unsubscribe method decrements the Lua subscriber count.
```cpp
// Method to unsubscribe by event name and subscription ID
void EventBus::Unsubscribe(uint64_t id) {
    for (auto it = subscribers.begin(); it != subscribers.end(); it++) {
        auto& event_name = it->first;
        auto& event_subscribers = it->second;

        // Check if the subscriber with the given ID exists
        auto sub_it = event_subscribers.find(id);
        if (sub_it != event_subscribers.end()) {
            // Check if the subscriber needs Lua before erasing
            if (sub_it->second.need_lua) {
                lua_subscriber_count[event_name]--;

                // If no more Lua subscribers, remove the entry
                if (lua_subscriber_count[event_name] == 0) {
                    lua_subscriber_count.erase(event_name);
                }
            }

            // Remove the subscriber
            event_subscribers.erase(sub_it);

            // Clean up if no more subscribers for this event
            if (event_subscribers.empty()) {
                subscribers.erase(it); // Erase and move to the next element
            }
            return;
        }
    }
}
```

You can pass an optional guard function as the third argument to `bridge.e.subscribe`. This filters events before they trigger the main callback. The guard receives the same event data table. It must return a boolean. If it returns false, the event stops there.

The engine serializes the event data into a Lua table before calling the guard function, because the guard itself is a Lua function that receives this table. Guard functions are evaluated in Lua and do not save the cost of event serialization. You must never expose or subscribe to high-frequency events like movement or combat ticks from Lua. Subscribing to coordinate changes forces the engine to allocate and serialize a Lua table for every single movement of every character on the server. This overhead occurs for every event before the guard function can filter it, and it will cripple the server. To handle high-frequency spatial filtering, the logic must remain in C++. You evaluate the specific condition, such as entering a polygon, in C++ and only trigger a Lua event when that condition is met.

This keeps the main callback clean. The dungeon rejoin system uses a guard to ignore joins on excluded maps.

A guard function filters dungeon join events based on the map index.
```lua
---@param event bridge.e.game.dungeon_join
function RejoinManager:on_join_guard(event)
    local map_index = event.dungeon:get_map_index()
    return not exclude_rejoin_map_index:contains(math.floor(map_index/10000))
end
```

## Common traps leak memory and drop data

The event bus marshals data through a per-field type probe. Nested structures force expensive shape evaluation. You use flat parallel arrays instead of nested maps for bulk events like metric changes. 

The exact integer type the engine uses natively for coordinates is `int32_t`. The event bus serialization casts data from an unsorted map against a strict list of types. `long` is not in the list, so coordinates passed as `long` would be silently dropped from the Lua table.

The serialization system casts against a strict list of supported types.
```cpp
// Register all possible casts for specific types (std::unordered_map -> sol::table)
luna::Bridge::unsorted_map_to_tables<uint8_t, uint16_t, uint32_t, 
    uint64_t, int8_t, int16_t, int32_t, int64_t, bool, float, double,
    std::string, LPCHARACTER, LPDESC, LPSECTREE, LPITEM, LPDUNGEON, CGuild*, CCI*>(lua_table, data);
```

The `ON_METRICS_CHANGED` event batches updates for multiple characters into a single publish. Instead of a nested map of character IDs to metric names, it uses three parallel arrays.

The metrics changed event uses flat parallel arrays for performance.
```cpp
/**
 * \---\@luadoc bridge.e.game
 *
 * \---Emitted once per char_metrics sweep, carrying every character whose
 * \---metrics moved since the last drain and which metrics those were.
 * \---
 * \---The payload is FLAT -- three parallel arrays, not a nested map,
 * \---because the bus marshals through a per-field type probe and a
 * \---nested structure is the expensive shape. Reassemble by walking
 * \---\`pids\` and taking \`counts[i]\` names off the front of \`metrics\`:
 * \---
 * \---\`\`\`lua
 * \---local at = 1
 * \---for i, pid in ipairs(ev.pids) do
 * \---    for _ = 1, ev.counts[i] do
 * \---        handle(pid, ev.metrics[at]); at = at + 1
 * \---    end
 * \---end
 * \---\`\`\`
 * \---
 * \---One batched publish per sweep, never one per character.
 * \---\*\*GAME ONLY\*\*
 * \---\@class bridge.e.game.metrics_changed
 * \---\@field pids Array<number> one entry per character in this batch
 * \---\@field counts Array<number> how many metric names belong to pids[i]
 * \---\@field metrics Array<string> the names, concatenated in pids order
 * \---\@lua bridge.e.game.metrics_changed = {}
 */
BUSEVENTDATA_DEF(MetricsChanged, (std::vector<uint32_t>, pids),
    (std::vector<uint32_t>, counts), (std::vector<std::string>, metrics));
```

You reassemble the payload in Lua by walking the `pids` array and taking `counts[i]` names off the front of the `metrics` array. This avoids passing a nested map across the boundary.

Failing to unsubscribe leaves the Lua callback in memory. It also forces the engine to continue serializing event data. 

A leaked subscription prevents this counter from reaching zero. The engine will allocate a Lua table and serialize the C++ struct every time the event fires, permanently. Always store the subscription ID and call `bridge.e.unsubscribe` when the listener is no longer needed.
