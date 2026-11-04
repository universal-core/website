---
title: UCHTML
description: "Reference for the UCHTML framework: templates, layout, tags, context and reactive zones."
displayed_sidebar: mainSidebar
---

# UCHTML

UCHTML renders HTML and Jinja2 templates into native client UI elements. It is a framework many clients load; the [in-game wiki](../wiki/) is a client built on it, not part of it. For why it exists and how it works, read [UCHTML](/foundations/uchtml/) in Foundations.

## Pages

| Page | What it covers |
| --- | --- |
| [Grid system](./grid-system.md) | Block, flex and relative layout, and sizing |
| [Jinja2 templating](./jinja2.md) | Template syntax and a worked page |
| [Template context](./jinja2-context.md) | `fun`, `bonus`, and how a host adds names |
| [Reactive zones](./reactive-zones.md) | Rebuilding part of a page when a variable changes |
| [Compiled templates](./compiled-templates.md) | Debug and production rendering |
| [Common attributes](./components-common.md) | Attributes every tag takes, and display flex |
| [Layout tags](./components-layout.md) | `div`, `main`, `table`, `accordion`, boards |
| [Filter groups](./components-filters.md) | Buttons, lists and tabs that set a variable |
| [Text and links](./components-text.md) | Headings, text, colors, hyperlinks |
| [Widget tags](./components-widgets.md) | Images, buttons, slots, progress, model |

## Glossary

| Term | Meaning |
| --- | --- |
| Metin2 mainline engine | The Metin2 client and server Universal Core started from. |
| Host | The window or module that creates an `HTMLLayoutLoader`, gives it a template and supplies the variables. |
| Pack | An archive the client reads files from before it looks in the client folder. |
| Client folder | The client's directory on disk. |
| Locale | A language folder under `locale/`; templates live in one. |
| `UIElement` | The loader's own tree node for one tag; leaves become real native widgets. |
| Reactive zone | A `div` that rebuilds its children when a watched variable changes. |
| `ENABLE_WIKI_DEV` | The client flag that turns on template source validation. |
