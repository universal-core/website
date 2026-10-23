---
title: The Lua bridge and the dispatch boundary
description: "The foundation every script runs on: the Lua state, coroutines, isolated environments, error handling, and the single C++ to Lua dispatch boundary."
---

## The Lua Bridge and sol

The `luna::Bridge` class owns the single global Lua state for the entire server process. It acts as the manager of the Lua VM, replacing the old `QuestManager` state allocation. You access the bridge and dispatch systems directly in C++ to interact with the Lua VM. Every script runs in this same Lua VM. They share C++ bindings and pass objects to each other directly. Exposing classes like `Character` and `Entity` directly to Lua lets scripts work directly on the instance using their native methods. The bridge object is exposed to Lua as a global variable named `bridge`.

C++ systems access the `luna::Bridge` instance either by receiving it as a pointer in binding registration functions, like `void RegisterBattleArbiterRegistryBindings(luna::Bridge* bridge)`, or by fetching it from the quest manager using `quest::CQuestManager::instance().GetLunaBridge()`.

The bridge exposes this state through the `sol3` library. It provides `GlobalState()` to return a mutable reference to the state. It provides `GlobalStateView()` for read-only access. You use these accessors when a C++ subsystem registers new bindings.

The `Source` struct takes the script string first and the filename second. `LoadCode` ignores `source.source` and only loads from `source.file_path` using `state.load_file`.

```cpp
// Getter for global_state, returns a reference
sol::state& GlobalState();
sol::state_view& GlobalStateView();
```

## Coroutines and Thread Management

The bridge tracks every Lua thread it spawns. When you create a coroutine using `bridge.coro.create`, the bridge allocates a thread, assigns it a unique integer ID, and stores it in an internal map. The bridge calls `CreateCoroutine` with the `run_immediately` flag set to `true`, so the coroutine starts automatically upon creation. Because coroutines start immediately, they execute synchronously up to their first yield. You cannot capture the ID returned by creation functions and use it inside the coroutine before that first yield. A script retrieves its own coroutine ID from within the coroutine by calling `bridge.coro.get_current_id()`. Central tracking lets the engine manage the lifecycle of long-running scripts.

A coroutine usually belongs to a specific entity, like a player or a quest. The bridge attributes coroutines to these entities using the `COROUTINE_OWNER` enum. This enum includes types like `PLAYER` and `QUEST`. When you create a coroutine with an owner using `bridge.coro.create_with_player_owner`, it returns the ID and the thread. If a player disconnects, the engine calls `CloseCoroByOwner` to terminate every coroutine tied to that player ID. This prevents scripts from operating on dead objects.

A script yields its thread by calling the standard Lua `coroutine.yield()` function. A script that yields to wait for an external event hangs permanently if the event never arrives. You prevent this by enabling a timeout before the yield. When a script calls `bridge.coro.enable_timout`, the bridge calls `MakeCoroutineTimeout` to record the expiration in a priority queue. The engine processes this queue periodically.

The engine passes `true, args` on a normal resume and `false, sol::nil` on a timeout. This means the boolean success flag is the first return value from `coroutine.yield()`, not the second. You check this first boolean flag after a yield to determine if the wait timed out. The arguments are the second return value.

The bridge provides `ResumeCoroutine` and `ResumeCoroutineByToken` to route completion events back to a specific coroutine. `ResumeCoroutine` takes a `uint32_t` ID and a `std::string` args. The Lua script must provide its ID to the event system before yielding. You pass the result of `bridge.coro.get_current_id()` to a C++ system or event listener. When the event occurs, the C++ system calls `ResumeCoroutine` with that ID and the argument string.

```cpp
coro.set_function("create_with_player_owner", [this](LUNA_BRIDGE_BIND_WITH_ARGS(sol::protected_function f, uint32_t player)) -> std::tuple<uint32_t, sol::thread> {
    auto result = this->CreateCoroutine(f, true, false, dispatch::DeriveForgeNs(f, te));
    auto coro_data = this->GetCoroutine(result);
    if (result != 0) {
        this->coro_owner_manager->add(COROUTINE_OWNER_PLAYER, player, result);
        return std::tuple<uint32_t, sol::thread>(result, coro_data->thread);
    }
    return std::tuple<uint32_t, sol::thread>(0, sol::thread());
});
```

```cpp
coro.set_function("enable_timout", [this](LUNA_BRIDGE_BIND_WITH_ARGS(uint64_t timout_milli)) {
    auto id = this->GetCurrentCoroutineID(ts);
    if (id == 0) {
        luaL_error(ts.lua_state(), "with_timout outside a coroutine");
        return;
    }

    this->MakeCoroutineTimeout(id, timout_milli);
});
```

## Isolated Environments

The engine runs a single Lua VM. Scripts share C++ bindings and pass objects to each other. If every script shared the same global environment, a variable declared in one script would overwrite a variable in another. The engine creates a sandboxed environment for each script using `NewIsolatedEnvironmentFromGlobal`. This lets you write Lua scripts that run independently of each other, minimizing conflicts and ensuring stability when handling multiple features or systems concurrently. Each environment is isolated, meaning it does not interfere with other scripts or the core game logic.

```cpp
sol::environment CreateSolEnvironment(sol::state_view state);
sol::environment NewIsolatedEnvironmentFromGlobal();

void IsolateEnvironmentRequire(sol::state_view &state, sol::environment& env);
sol::environment DuplicateEnvironment(sol::state_view &state, sol::environment& env);
```

This function returns a separate `sol::environment` table that acts as a private `_ENV`. Your global variables stay confined to your script. They do not pollute the primary state.

The engine uses the environment to track ownership. When a script loads, the engine injects a specific key into the environment table to identify the owning forge. This key, `FORGE_NS_KEY`, is defined in the `luna::dispatch` namespace.

```cpp
// Single source of truth for the environment key holding the forge name.
inline constexpr const char* FORGE_NS_KEY = "__forge_ns";
```

You do not pass your namespace manually when registering callbacks. Any function you define in your script carries its namespace attribution through its environment upvalue. When you pass a Lua function to a C++ system, the engine inspects the function's `_ENV` table. If it finds the `__forge_ns` key, it extracts the string and tags the execution scope. Logs and errors are attributed to your forge automatically.

## Pinning Lua Objects in C++

When you store a Lua function or table in a C++ class, you protect it from the Lua garbage collector. Callbacks are often registered from ephemeral threads. If you hold a raw `sol::protected_function` after the thread dies, the reference becomes invalid.

You pin the Lua object to the global state to hold it safely. The bridge creates a strong reference in its internal map using `sol::make_reference`. This keeps the object alive.

You manage this lifecycle using `PinScoped`. It returns a `std::shared_ptr<uint64_t>` with a custom deleter that unpins the object when destroyed. By capturing this pointer inside a `std::function`, the pin tracks the C++ callback exactly.

```cpp
// Pins a Lua callable to the global state and hands back a
// shared_ptr whose deleter unpins it. Capture the shared_ptr in a
// long-lived std::function so the pin's lifetime tracks that
// std::function exactly; fetch the callable per-invocation with
// GetPinnedObject<sol::protected_function>(*pin). Replaces the
// hand-rolled PinObject + shared_ptr<uint64_t>{ unpin-deleter }
// incantation every binding used to copy-paste.
std::shared_ptr<uint64_t> PinScoped(const sol::object& obj) {
    auto id = PinObject(obj);
    return std::shared_ptr<uint64_t>(
        new uint64_t(id),
        [this](uint64_t* p) { UnpinObject(*p); delete p; });
}
```

If you invoke `bridge->Call` manually instead of using the pin wrappers, you retrieve the pinned object using `GetPinnedObject`.

```cpp
template <typename T>
T GetPinnedObject(uint64_t id) {
    auto it = map_pinned_references.find(id);
    if (it == map_pinned_references.end()) {
        return T{};
    }
    return it->second.as<T>();
}
```

The bridge provides `PinTypedCall`, `PinTableCall`, and `PinVoidCall` to encapsulate these steps into a `std::function`. This avoids writing the boilerplate to fetch the pinned object, open a dispatch scope, validate the return type, and handle errors. `PinTableCall` and `PinVoidCall` take an optional attribution function to populate the `player_id` field in the dispatch context. This function derives the player ID from the callback arguments. `PinTypedCall` accepts any number of arguments via the `Args...` template parameter pack.

```cpp
// For a callback that returns nothing. On a Lua error or a non-nil
// return it logs and runs `onError` instead.
template <typename... Args>
std::function<void(Args...)> PinVoidCall(
    const sol::protected_function& fn,
    std::type_identity_t<std::function<void(Args...)>> onError,
    std::string context = {},
    dispatch::Kind kind = dispatch::Kind::CALLBACK,
    std::string forge_ns = {},
    std::type_identity_t<std::function<uint32_t(Args...)>> attribution = {})
```

`PinVoidCall` takes the namespace string as the fifth argument. It takes an optional attribution lambda to derive the player ID as the sixth argument.

If a Lua callback throws an error or returns the wrong type, `PinTypedCall` does not catch exceptions; `sol::protected_function` catches errors and returns a `sol::protected_function_result` which `PinTypedCall` validates. It logs the context string and returns a preconfigured fallback value. A broken event script returns the fallback and does not crash the server. `PinTableCall` handles callbacks that return a table. It returns a `std::optional<sol::table>` on success and a null option on a Lua error. The call site handles the table decoding. `PinVoidCall` handles callbacks that return nothing. On a Lua error or a non-nil return, it logs the error and runs the provided `onError` function instead.

You bind a C++ registry instance to the Lua environment by fetching the environment system table and creating a named table inside it. `GetEnvSysTable()` returns the environment-specific system table, like `forge.sys.game`, not the base `forge.sys` table. The registry is created inside this environment table. `ForgeGame` is defined inside the `luna` namespace, so you call `luna::ForgeGame::instance()`.

```cpp
auto& env_sys_table = ForgeGame::instance().GetEnvSysTable();
auto reg = env_sys_table.create_named("battle_arbiter_registry");
```

This example from the battle arbiter registry registers a combat rule callback using `forge.sys.game.battle_arbiter_registry.register`. It expects a number return type and falls back to `BattleVerdict::Pass` if the script errors. The callback takes two `LPCHARACTER` arguments, which represent the attacker and victim character instances. These character instances expose methods like `GetPlayerID()` and `PopupPacket()`. You use `PopupPacket` to send notifications directly to the player. The engine triggers this callback during the `battle_is_attackable` or `on_damage` dispatch chain.

```cpp
auto attack_fn = bridge->PinTypedCall<BattleVerdict, LPCHARACTER, LPCHARACTER>(
    can_attack, sol::type::number, BattleVerdict::Pass,
    std::string(kBattleAxis) + " " + name + " can_attack",
    dispatch::Kind::CALLBACK, dispatch::DeriveForgeNs(can_attack, te));

return CBattleArbiterRegistry::instance().Register(
    name,
    policy::Guard<LPCHARACTER, LPCHARACTER>(bridge, kBattleAxis, name, guard, te),
    std::move(attack_fn));
```

## The Dispatch Boundary

Every control transfer from C++ into Lua funnels through a single transition point. When you invoke a Lua function from C++, the bridge opens a `luna::dispatch::Scope`. This scope instruments the boundary. The engine tracks the owning forge namespace, not the exact script.

Every call into Lua is tagged with a dispatch context. This context contains the forge namespace, the kind of dispatch, a detail string for logging, and the player ID. The scope pushes this context onto a thread-local stack and pops it when the Lua execution returns.

```cpp
struct Context {
    // LIFETIME: ns/detail must outlive the Scope (registration-cached
    // std::string members, string literals, or locals of the invoking
    // C++ frame). Empty ns is reported as "global".
    std::string_view ns;
    Kind kind = Kind::CALLBACK;
    std::string_view detail;
    uint32_t player_id = 0;
};
```

The available values for `luna::dispatch::Kind` are `INPUT`, `EVENT`, `HOOK`, `COROUTINE`, `PROCESSOR`, `INVOKE`, and `CALLBACK`.

The engine extracts the namespace using `DeriveForgeNs` to attribute a call to the correct forge. This function inspects the Lua function's environment. If the environment is a valid table, it looks for the `__forge_ns` key. Lua functions that reference no global variables carry no environment upvalue and thus do not automatically carry their namespace attribution. You do not pass the namespace manually when you register a callback. If a C function or a Lua function references no globals, it carries no environment upvalue. The namespace resolves to an empty string.

The `te` parameter in the examples is a `sol::this_environment` object. The sol3 library automatically populates this object when you add it to a C++ binding signature. This lets the C++ system inspect the caller's environment. The `DeriveForgeNs` overload that takes `sol::this_environment` is a free function in the `luna::dispatch` namespace, not a member of the `luna::Bridge` class. It uses the caller's environment as a fallback to extract the namespace if the function itself lacks an environment upvalue, such as C functions.

```cpp
// Registration helper: prefer the function's own environment, fall back to
// the registering caller's. Covers no-_ENV functions and shared-lib closures.
std::string DeriveForgeNs(const sol::reference& fn, const sol::this_environment& te);
```

The bridge routes invocations through the `Call` template. This opens the scope before executing the Lua function.

```cpp
template <typename... Args>
sol::protected_function_result Call(const dispatch::Context& site,
                                    const sol::protected_function& fn,
                                    Args&&... args) {
    dispatch::Scope scope(site.ns, site.kind, site.detail, site.player_id);
    return fn(std::forward<Args>(args)...);
}
```

## The Process-Wide Observer

Every time C++ calls into Lua, it opens a dispatch scope. The game or database server hooks this boundary at boot using `luna::dispatch::SetObserver`. This observer intercepts the scope creation and sets up ambient state for the duration of the Lua call.

When a script executes, it interacts with game systems that expect an active context. The observer wires up circulation logging fallbacks (`LogManager::CircGuard`) and log origins (`LogManager::LogSmartOrigin`). Items created and logs emitted during the script execution are tagged with the script's forge namespace. You do not pass attribution data to item or logging APIs manually. You avoid manual wiring in every forge.

The `dispatch::Scope` is only active during the execution of the Lua callback. Once the callback returns, the scope is destroyed and the ambient state unwinds. If the C++ engine creates an item after the callback returns based on a returned vnum, it happens outside the scope and will not be attributed. To get automatic attribution, the Lua script must explicitly invoke the native actions, like item creation, itself during the callback execution. Returning data for C++ to act on later loses this context because the scope is already destroyed.

The observer returns an opaque token that holds the ambient state. When the dispatch scope exits, the token is destroyed and the state unwinds.

```cpp
// One observer per process, installed at boot before any forge loads.
// Returns an opaque token destroyed when the dispatch scope exits.
using Observer = std::function<std::shared_ptr<void>(const Context&)>;
void SetObserver(Observer observer);
```

## Error Attribution and Crash Breadcrumbs

When a Lua script fails or a C++ system logs an error during a callback, the engine needs to know where the failure originated. The active dispatch stack acts as a live trace. This stack feeds error attribution directly. When an error occurs, `sys_err` logs use the active scope to identify which forge and event caused the issue. You do not guess which script registered a failing callback.

If a script triggers a fatal C++ crash, the engine relies on the `LunaDispatchSanitizerDeathCallback`. When the process dies, this callback iterates through the active dispatch stack. It prints a breadcrumb trail to standard error detailing the namespace and the detail string. It also includes the player ID active at the time of the crash.

The `Context` struct comment notes that an empty namespace is reported as "global". This applies to the observer or standard logs. The sanitizer prints the raw namespace string using `%.*s`, which results in `ns=` (empty) when the namespace is empty.

The resulting crash log identifies which Lua script and player were active when the engine went down. You reproduce the state immediately.

```cpp
extern "C" void LunaDispatchSanitizerDeathCallback(void) {
    using namespace luna::dispatch;
    const size_t depth = Depth();
    if (depth == 0) {
        return;
    }
    // Contexts sit contiguously in the thread_local stack; innermost is Current().
    const Context* innermost = Current();
    for (size_t i = 0; i < depth; ++i) {
        const Context* c = innermost - (depth - 1 - i);
        std::fprintf(stderr, "==SANITIZER== luna dispatch[%zu]: %s ns=%.*s detail=%.*s player=%u\n",
                     i, KindName(c->kind),
                     (int)c->ns.size(), c->ns.data(),
                     (int)c->detail.size(), c->detail.data(),
                     c->player_id);
    }
    std::fflush(stderr);
}
```

## Common Traps and Best Practices

Holding a raw `sol::protected_function` in static storage causes a segmentation fault at program exit because its destructor tries to unreference it after the Lua state is already closed. The Lua garbage collector destroys functions created in ephemeral threads when the thread dies. Pin the Lua object to the global state using `PinObject` or `PinScoped`. This creates a strong reference in the bridge's pinned references map. Long lived C++ systems safely hold and invoke these callbacks.

Forgetting to pass the `forge_ns` when invoking Lua manually drops the attribution. The engine relies on the dispatch scope to tag logs and item circulation with the script's origin. Bypassing the bridge wrappers loses that context. You use the bridge wrappers, or pass the result of `DeriveForgeNs` to the `Call` choke point.

C functions do not have a `__forge_ns` upvalue. Lua functions carry an environment table where the engine injects the `__forge_ns` key. C functions expose an arbitrary object as their first upvalue. `DeriveForgeNs` returns an empty string for them.

```cpp
std::string DeriveForgeNs(const sol::reference& fn) {
    if (!fn.valid() || fn.get_type() != sol::type::function) {
        return {};
    }
    sol::environment env = sol::get_environment(fn);
    // C functions expose upvalue 1 (an arbitrary object) here; only a real
    // environment table can carry the forge key.
    if (!env.valid() || env.get_type() != sol::type::table) {
        return {};
    }
    sol::object v = env[FORGE_NS_KEY];
    return v.is<std::string>() ? v.as<std::string>() : std::string{};
}
```
