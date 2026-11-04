---
title: Client Python imports
description: How the client resolves packed Python modules, opens packed files, and refreshes loose modules in debugger builds.
displayed_sidebar: mainSidebar
---

# Client Python imports

The client runs Python 2.7 with a process-wide importer that resolves client modules from packed files. Debugger builds can also load loose Python modules from disk.

The installed `open` wrapper prefers a packed file when it can read one:

```python
def open(filename, mode = 'rb'):
    if pack.Exist(filename) and mode in ('r', 'rb'):
        return pack_file(filename, mode)
    else:
        return old_open(filename, mode)
```

For debugger setup and the test window workflow, see [Debug client Python](/docs/core/debug-client-python).

## Import resolution

The ordinary Python search path is empty. The hybrid importer checks the optional `rootlib` branch when enabled, then the pack importer, and falls back to the original Python importer when the pack importer returns no module. Built-in and frozen Python modules remain available through that fallback.

The pack importer lowercases a module name and replaces dots with slashes. It probes `<path>.py` and `<path>/__init__.py`; when both packed paths exist, the `.py` module takes precedence. A loaded package receives a `__path__`.

| Import | Resolution |
| --- | --- |
| `import a.b.c` | Loads the dotted module and returns the root module `a`. The child is attached to its direct parent so it can be reached through the package hierarchy. |
| `from a.b import c` | Returns `a.b`. If `c` is already an attribute, it is retained. Otherwise the importer tries the packed module `a.b.c`, then asks the original importer. |
| `from a import *` | The importer attempts the `*` item and, on fallback, copies the returned module dictionary into `a` and sets a `"*"` guard. |
| `from . import x` | The pack importer does not resolve the relative level against the caller's package. If its empty-name probe misses, the request reaches the original importer. Whether that fallback succeeds depends on package state and what the original importer can access. Use an explicit dotted package import and test it in the target client. |

The importer creates parent placeholders when needed, registers a child in `sys.modules` before executing it, and links it to its direct parent. When a packed package replaces a placeholder, its attributes are merged into the loaded package where they do not already exist.

Module names are case-insensitive in the pack importer: `uiToolTip` and `uitooltip` resolve to the same cached module object. The lowercased name is also used for pack and loose-file probes. This rule does not make Python attributes or arbitrary file paths case-insensitive.

## Injected builtins

These functions are available as Python builtins after the importer is installed.

| Signature | Behavior |
| --- | --- |
| `open(filename, mode='rb')` | Returns a `pack_file` for an existing packed path in `r` or `rb` mode. Otherwise delegates to the original `open`. |
| `pack_open(filename, mode='rb')` | Alias of the installed `open`; it can also return a disk file. |
| `new_open(filename, mode='rb')` | Alias of the installed `open`. |
| `old_open(...)` | Original Python `open`. Use it when you need to bypass the packed-file preference. |
| `execfile(fileName, dict)` | For a text file, reads through the installed `open`, compiles with an absolute filename, and executes in `dict`. Returns `None`. For `.pyc` and `.pyo`, it loads the code but does not execute it. |
| `old_execfile(...)` | Original Python 2 `execfile`. |
| `TraceError(*args)` | Formats each argument and sends it separately to `dbg.TraceError`. Returns `None`. |
| `sys_err(*args)` | Alias of `TraceError`. |
| `Tracef(*args)` | Formats each argument and sends it separately to `dbg.Tracen`, unless `__DEBUG__` is true, when it returns without sending them. |
| `LogBox(*args)` | Formats each argument and sends it separately to `dbg.LogBox`. Returns `None`. |
| `__import__(name, globals=None, locals=None, fromlist=None, level=-1)` | The installed hybrid importer. |

## Packed files

`with pack_open(...)` gives you the object returned by the wrapper: a `pack_file` for an eligible packed path, or an ordinary disk file if the wrapper falls back to `old_open`. Do not assume both objects have the same file API.

| `pack_file` operation | Behavior |
| --- | --- |
| `pack_file(filename, mode='rb')` | Loads the packed content into memory. Accepts only `r` and `rb`; text mode converts CRLF to LF. |
| `name` | The requested filename. |
| `read(len=None)` | Consumes up to `len` bytes, or the remainder when `len` is omitted. `read(0)` also consumes the remainder. |
| `readline()` | Consumes through the next LF, or consumes the remainder if there is no LF. |
| `readlines()` | Consumes the remaining lines through the iterator. |
| Iteration | Reads one line at a time until no data remains. |
| Context manager | `__enter__` returns the `pack_file`; `__exit__` does no cleanup and does not suppress exceptions. |

`pack_file` does not implement `close`, seeking, or the full file API. Direct construction for a missing packed path raises `IOError('No file or directory')`.

Packed reads accept `.py`, `.pyc`, `.json`, `.yaml`, `.html`, and `.txt` extensions, case-insensitively. A disallowed extension raises `cannot open file. not permitted`.

## Loose modules and refresh

With `PYTHON_REMOTE_DEBUGGER` enabled, a cache miss probes the lowercased loose path for `<path>.py`, then `<path>/__init__.py`, before asking the pack. These paths are relative to the process working directory. Without the debugger option, loose modules are not used.

A later import checks the modification time of a cached loose module. If it changed, the importer executes the file again in the same module dictionary. Saving a file alone does not trigger execution. If the file was deleted, the loaded module remains in place.

| Signature | Behavior |
| --- | --- |
| `system.Refresh(names, force=True)` | Visits names in the supplied order, using case-insensitive module lookups. Skips unloaded and packed modules. With `force=True`, re-executes eligible loose modules even when their modification times have not changed. Returns the original names it visited. |

Order dependencies before their consumers. A consumer that uses `from dependency import Class` must execute again after the dependency to bind the new class. A reference to the module itself continues to point to the same module object.

Refresh executes into the existing dictionary without clearing it. A name removed from the source can remain in the module, and existing instances or directly imported class objects do not become instances of a newly defined class. If a loose file has disappeared, its name can still appear in the returned list, so that list alone does not prove the source was re-executed. Compile and execution exceptions propagate to the caller.

**Do not use `import system` to reach `Refresh`.** The launcher installs the importer without registering its namespace under that name. An import can compile it a second time and fail when its builtins are a dictionary. The test window obtains `Refresh` from the installed importer's globals; use the workflow in [Debug client Python](/docs/core/debug-client-python).

## Errors and logs

| Symptom | What happens |
| --- | --- |
| `could not import module c from a.b` | The original importer returned a false-valued attribute for a non-star `from` item after the packed submodule lookup. The original importer can raise its own exception first. |
| An exception while executing a packed module | The importer re-raises it. Its own import trace is normally disabled, and the module entry is not removed by the shown execution path. |
| `IOError: No file or directory` | Direct `pack_file` construction did not find the packed path. The `open` wrapper instead falls back to disk when the packed path is absent. |
| `RELOAD: system.Refresh is unreachable -- neither sys.modules nor the builtin importer's namespace has it; nothing was re-read` | The test window could not find the refresh function. |
| `RELOAD failed:` | The test window caught a refresh exception and logs the traceback after this line. |
| `RELOAD: 6 named, none were loaded yet -- the import path will re-read them. __LOOSE__=True` | Example with 6 requested names: none was an already loaded loose module. This can occur before the first load; `__LOOSE__` also shows whether loose imports are enabled. |

## C++ registration

| Registration | Description |
| --- | --- |
