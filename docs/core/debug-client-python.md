---
title: Attach a debugger to client Python and hot-reload a window
description: Attach an editor to the client, load a sandbox window, and refresh its loose Python modules in dependency order.
displayed_sidebar: mainSidebar
---

# Attach a debugger to client Python and hot-reload a window

Use a debugger build to attach your editor to the client's Python process and reload a UI window without restarting the client. The [development tools foundation](/foundations/luna/devtools) describes the debugger and loose-file mechanism; the [client Python imports reference](/docs/core/client-python-imports) covers the import rules.

This attach configuration maps your workspace source to the client directory. Replace both placeholders and set the port to the listener's port.

```json
{
    // Use IntelliSense to learn about possible attributes.
    // Hover to view descriptions of existing attributes.
    // For more information, visit: https://go.microsoft.com/fwlink/?linkid=830387
    "version": "0.2.0",
    "configurations": [
        {
            "name": "Root Debugger",
            "type": "debugpy",
            "request": "attach",
            "connect": {
                "host": "localhost",
                "port": 3000
            },
            "pathMappings": [
                {
                    "localRoot": "${workspaceFolder}/[rel_path_to_root]",
                    "remoteRoot": "[abs_path_to_client_folder]"
                }
            ],
        },
    ]
}
```

## Prepare a debugger client

Use a client built with the CMake option `PYTHON_REMOTE_DEBUGGER` enabled. It defaults to off. The option includes the Python debugger and enables loose Python files; a release client built without it has no debugger and does not load those overrides. The option also disables hardening, so do not ship that build.

The client runs Python 2.7; a Python 3 port is not on the roadmap.

Start the client with its working directory set to the client directory beside the executable. Put the loose Python files you want to test there, using their module paths. Make them available before their first import: a module already loaded from the pack does not become loose just because a matching file appears later. Restart the client if necessary.

## Set up the sandbox window

The UI agent skill prescribes a loose `uiTest.py` in the client directory and test layouts under `uiscript/`. Give `uiTest.py` a `TestWindow` attribute that names the window class to instantiate; the skill's sandbox pattern ends with `TestWindow = _Sandbox`.

In a debugger build, `constInfo.IS_TESTING_GUI` is enabled. At login, the client enables outlines and opens the test board. Its module field defaults to `uiTest`; use **Load** or F10 to load it. The entry file is read from the process working directory, so it must be loose there.

Add a `RELOAD` tuple to the entry file for the loose modules that make up your window. This excerpt shows the ordering pattern: dependencies come first, and the window that consumes them comes last.

```python
RELOAD = (
    "land.palette",      # imports nothing of ours
    "land.data",         # imports palette
    "land.deployments",  # imports data
    "land.uitowns",        # imports deployments, hands out TownDetail
    "land.uioverview",     # imports a NAME from towns, so it comes after it
    "land.uiguildland",   # the window itself, so it comes last
)
```

Replace those names with your own dependency chain. Include a consumer after any module from which it imports a class or other name. The sandbox reloads the named modules in tuple order before it instantiates `TestWindow`.

The previous window is hidden and, if it has `Destroy`, destroyed before replacement. Implement `Destroy` to release the handlers and children your window owns.

## Attach from the editor

Start the debugger client, then attach the editor's Python debugger to `localhost`. The client attempts ports 3000 through 3049. Set `connect.port` to the actual listener's port; the loop suppresses errors and does not stop after a successful attempt, so do not assume the listener is always on 3000.

Set `localRoot` to your workspace's Python source directory and `remoteRoot` to the absolute client directory. The mapping translates the client-side filenames into files where your editor can place breakpoints.

Startup does not wait for an attachment. For a breakpoint during early startup, the source has a commented `wait_for_attach()` call that you can enable in a debugger build.

## Edit and reload the window

Edit and save the loose subject modules, then press F10 or **Load** on the test board. The sandbox reloads resources, executes the test entry file, refreshes its `RELOAD` tuple, and creates and shows a new window.

`system.Refresh(names, force=True)` visits the names in order and re-executes loaded loose modules. Its default forced refresh also re-executes a consumer whose own file has not changed, allowing it to bind names from a refreshed dependency. Unloaded and packed modules are skipped. A returned name means the module was visited; if its loose file has disappeared, it does not prove that the source was re-executed.

A later import of a cached loose module also checks its modification time. When it has changed, the client re-reads the file into the **same module object**. Saving alone does not schedule that check. Names removed from the source can remain in the module dictionary, and existing window instances do not turn into instances of a newly defined class. Use the sandbox to replace the window.

The layout loader has a separate rule: it tries the packed layout first and falls back to the loose file on an exception when testing is enabled. A successfully loaded packed layout can therefore shadow a loose layout at the same path. Use a distinct test layout path or avoid that collision.

## Use the Python stubs

The client-native Python stubs are in `Client-Files/root/stubs/*.pyi`. Use them in your editor to discover the C++ modules and their bindings. They are references for typing and completion, and can be incomplete or stale; check the native registration tables when a stub disagrees with behavior.

For example, the `pack.Reload` stub declares an argument, while the sandbox calls it without one. Resource reload is separate from re-executing the Python modules in `RELOAD`.

## Pitfalls

**A window still uses an old class.** `from x import Thing` binds the class object. Re-executing `x` creates a new class but does not update that binding in its consumer. Put `x` before the consumer in `RELOAD`, refresh both, and instantiate the window again.

**Importing `system` to reach `Refresh` executes a second copy.** The launcher executes the module without necessarily registering that execution under `sys.modules["system"]`. A later `import system` can execute another copy and fail while accessing builtins. Use the sandbox's existing refresh discovery and `RELOAD` tuple.

**An import traceback can surface as an access violation.** Check `syserr.txt` for the Python traceback when a native call fails during an import. The loading worker checks its import result and prints the exception before aborting, but other native import paths need not have the same checks.

**The sandbox cannot load the entry file.** Check that `uiTest.py` is loose in the client's working directory and that its module field names the file without `.py`. A missing `TestWindow` also prevents the sandbox from instantiating the window.

## C++ registration

This recipe adds no C++ registration.

| Registration | Purpose |
| --- | --- |
