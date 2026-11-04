---
title: Compiled templates
description: How the loader renders from the template source in a debug client and from a compiled module in production.
displayed_sidebar: mainSidebar
---

# Compiled templates

The loader renders a template in one of two ways. A debug client parses the template source each time; a production client runs a precompiled Python module and ignores the source text.

| | Debug client | Production client |
| --- | --- | --- |
| Source file | Opened and rendered | Opened, then not used for rendering |
| Jinja environment | Fresh per render, so edits show on reload | Cached for the process |
| Compiled module | Not used | Required |

## Requirements for the compiled path

The loader takes the compiled path when all of these hold:

- the client is not a debug client;
- the host called `UseCompiledTemplate()` on the loader;
- the template path starts with the path the host's resolver returns for `""`, so the loader can derive a template name from the rest.

The module is looked up as `tmpl/tmpl_<sha1 of the template name>.py` through the host's path resolver, from the pack first. A missing module raises a template-not-found error.

## The source is always read

`Load` always opens the template file first, through the pack and then the folder, even when it will render from the module. A compiled module alone does not satisfy that read: ship the `.html` with its module. `LoadString` takes the text directly and has no such read.

## Producing the modules

Precompiling is the host's build step. The [wiki](../wiki/data-generation.md) has one in its Wiki Manager. A cached compiled environment keeps the path resolver it was created with, so a resolver changed after the first render is not seen.

## Validation

With `ENABLE_WIKI_DEV` on, the loader validates the template source before rendering. The validator strips Jinja directives and expressions, uses placeholder tags for macro boundaries, and checks the remaining HTML. Errors stop the load and log `HTML Validation Errors in template source:`. A valid source does not guarantee that every render produces the layout you meant.
