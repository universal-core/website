---
title: Reactive zones
description: Mark a div as a zone so a variable change rebuilds only its children, and what the update costs.
displayed_sidebar: mainSidebar
---

# Reactive zones

A reactive zone is a `div` or `body` that rebuilds its children when a variable it watches changes, and keeps the rest of the page and its scroll position as they are. For the mechanism behind it, read [UCHTML](/foundations/uchtml/) in Foundations.

## Marking a zone

A `div` or `body` becomes a zone when the loader has reactive handling enabled and the tag has a parent, a nonempty `id` and a nonempty `reactive` attribute.

| Attribute | Requirement | Meaning |
| --- | --- | --- |
| `id` | Required | Identifies the zone in the re-rendered page. Unique within the loader. |
| `reactive` | Required | Comma-separated variable names the zone watches, without spaces. |

```html
<div id="progress-zone" reactive="step_done,step_need">
    {% set step_done = fun.getvi('step_done', 0) %}
    {% set step_need = fun.getvi('step_need', 0) %}

    <txt>Progress: {{ step_done }}/{{ step_need }}</txt>
    <progress max="{{ step_need }}" count="{{ step_done }}" />
</div>
```

Read the watched variables inside the zone with `fun.getv` or `fun.getvi`. Inside a zone every Jinja2 feature works: conditionals, loops, macros and filters.

## Updating from Python

Call `loader.SetVar("step_done", 15)` for one variable, or `loader.SetVars({"step_done": 15, "step_need": 20})` to change several with one update for all affected zones.

`reload=False` on `SetVar` updates the context and calls the variable callback without any rebuild.

## What an update does

1. The loader finds the zones watching the changed keys.
2. It renders the **whole template** again.
3. For each affected zone it finds the zone by `id` in the new result, destroys the zone's old children and builds new ones from the new result.
4. The zone root is marked dirty and its parent is told of the change.

There is no diff: the engine has a tree differ and stores virtual trees, but this path never calls it. The cost of an update therefore scales with the size of the template and of the zone, not with how much changed. A zone saves the layout and construction of the rest of the tree, not the Jinja render.

## Fallback to a full reload

The loader reloads the whole page, preserving scroll, when:

- no zone watches the changed variable;
- a zone update fails, including when its `id` is missing from the re-rendered result;
- in a batch, any changed key is unwatched or a watching zone cannot take the reactive path.

Nested zones that watch different variables update in no specified order.

## Choosing

| Use a zone for | Use a full reload for |
| --- | --- |
| Counters, progress bars, status text | Layout changes and tab switches that change the page structure |
| A list that changes inside one container | Initial load |
| Anything that updates often | Variables no zone watches (automatic) |

Keep zones small and focused on their variables. One zone around the whole page rebuilds everything and gains nothing.
