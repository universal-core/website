---
date: 2027-04-13
title: "From template to widget: a page that is compiled, and a window that is a tag"
description: A UCHTML page used to parse its template source on every render. Production now runs a precompiled module and debug keeps the source path, and the same markup can hold a hand-built window as a tag.
authors: luscha
tags: [engine, uchtml, client, ui]
slug: template-to-widget
image: /img/blog/template-to-widget.png
---

In the Metin2 mainline engine a window is three things written by hand: a layout, client logic and a data interface. UCHTML moved the layout into a template, and that moved a cost with it. Until 14 March 2026 every render of a page created a Jinja environment, parsed the template source, compiled it and only then ran it. The client had that one path, for editing and for play alike.

## Two paths, one switch

The commit of that day adds support for compiled pages and 8,654 lines, of which 8,041 are generated modules. The code that matters is the render function. It reads `__DEBUG__` and the template name:

```python
global _compiled_env
use_compiled = not __DEBUG__ and self.template_name is not None

if use_compiled:
    # Production: cached Environment + pre-compiled templates
    if _compiled_env is None:
        _compiled_env = Environment(loader=CompiledLoader(self.path_resolver))
    template = _compiled_env.get_template(self.template_name)
else:
    d = self.document.decode("utf-8")
    env = Environment(loader=InMemoryLoader(self.path_resolver))
    template = env.from_string(d)
```

The debug branch is the old behaviour, kept on purpose: a fresh environment each time is what makes an edit show on the next render. The production branch keeps one environment for the process and never looks at the template text. The [compiled templates reference](/docs/uchtml/compiled-templates) has the table of what each client does.

The host opts in. The loader gets a `UseCompiledTemplate()` call, and the in-game wiki, the only host that makes it, calls it when the client is not a debug client. The loader then turns a path under its template root into a template name, and that name is the key.

## A module named by the hash of its name

The production loader does not parse anything. It builds a file name from the template name, reads that file from the pack and runs it:

```python
@staticmethod
def get_template_key(name):
    return "tmpl_" + sha1(name.encode("utf-8")).hexdigest()

def load(self, environment, name, globals=None):
    key = self.get_template_key(name)
    full_path = self.path_resolver("tmpl/" + key + ".py")

    try:
        code = pack_open(full_path, "r").read()
    except:
        raise TemplateNotFound(name)

    ns = {"__file__": full_path}
    exec(compile(code, full_path, "exec"), ns)

    return environment.template_class.from_module_dict(
        environment, ns, globals)
```

The module is the output of Jinja's own compiler, so it is a Python file that defines the template's render function, and `from_module_dict` turns the executed namespace back into a template object. Nothing downstream changes: the rendered text goes to the same HTML parser and the same element tree.

Every module sits in one flat folder, whatever the nesting of the template folder, and the file name carries no trace of the page it came from.

## The build step runs the client's own Jinja

The modules are produced by a tab in the wiki's manager tool. It is a desktop tool in Python 3, and the template engine it has to use is the copy vendored into the client, so it adds the client's Jinja folder to its import path and compiles with that. It writes each module with a `from __future__ import unicode_literals` line first, because the client runs Python 2.7.

Importing a Python 2.7 era Jinja under a newer interpreter did not work as shipped, and the same commit patches five vendored files. Two regular expressions had their `(?u)` flag at the end, where Python 3.11 and later reject it, so the flag moved to the front. The imports of `Mapping` and its relatives in four modules now try `collections.abc` first and fall back to `collections`. 

The tab describes what it saves with a number: "Compiled templates skip the ~300ms parse+compile step at runtime." That is the tool's own wording.

## What the production path trades

Three things follow from the code, and each can bite.

The source is still read. The loader opens the template file before it renders, even when it will use the module, so a page needs both its `.html` and its module in the pack. A module alone fails.

The cached environment keeps the path resolver it was created with. A resolver changed after the first render is not seen, because the environment was built once.

The compiled path never runs in a debug client. A missing or stale module therefore shows up as a template-not-found error in a production client, and a debug client never shows it. The module is generated output, so a template edited without a rebuild keeps rendering its old self.

The same commit adds a small timing decorator for the embedded Python and puts it on the render function, the loader's string load, a table row add and `SetVar`, each with a threshold of a few milliseconds, so a slow call writes a line to the log.

## A window inside a tag

The other direction is older. On 24 January 2026 I added a `<ranking-window>` tag, a ladder with pagination that a page places like any other element:

```html
<ranking-window ranking-type="example_ranking" rows="10" width="340" height="305" />
```

The window behind it was already hand-built. The tag is a wrapper that subscribes to the ranking data when it is created, forwards the binary callbacks to the window and unsubscribes when it is destroyed, so a page can drop the ladder in without knowing any of that. A new tag costs three registrations: a branch in the loader that builds the element from the tag name, an entry in the validator that lists the attributes it accepts and which are required, and an entry in the schema file the editor reads for completion. The commit that added the ranking window is 408 lines, 229 of them the wrapper. The [client tags reference](/docs/wiki/tags-clients) lists the attributes.

## What it made possible

A page is now an authored file in the folder and a module in the pack, and which one runs depends on one setting. Authors still see an edit on the next render, and production does not parse the source it ships. The tag route goes the other way: a hand-built window does not have to be rewritten as markup to appear inside a page, it needs a wrapper and three entries. Neither route lets the page see inside the other. The compiled module is generated output of a particular Jinja, and the tag's window keeps its own lifetime.
