---
title: Jinja2 templating
description: Jinja2 syntax in UCHTML templates, with a worked page.
displayed_sidebar: mainSidebar
---

# Jinja2 templating

## What is Jinja2?
Jinja2 is a modern, designer-friendly templating engine for Python. It is used to generate dynamic web content, such as HTML, XML, or other text-based formats. Jinja2 makes it easy to separate business logic from presentation logic by providing a rich set of features including variable interpolation, control structures, and template inheritance. In the context of UCHTML, Jinja2 works together with HTML to greatly enhance the expressivity of the system, allowing developers to embed backend functions and create reactive interfaces. For a full reference, see the [official Jinja2 documentation](https://jinja.palletsprojects.com/en/stable/templates/).

## Most Used Capabilities

### Setting Variables
Define variables within the template to be used later.

**Example:**  

```html
{% set title = "Welcome to the task board" %}
```

### Expression Interpolation
Insert variable values or evaluate expressions directly into the HTML output.

**Example:**  

```html
<h1>{{ title }}</h1>
```

### Macros
Create reusable template fragments that can be invoked with different parameters.

- First you define a macro:  
```html
    `{% macro macro_name(parameters) %} ... {% endmacro %}`
```

- Tehn you can call a macro:  
```html
{{ macro_name(arguments) }}
```

**Example:**  

```html
{% macro render_header(text) %}
  <header><h1>{{ text }}</h1></header>
{% endmacro %}

{{ render_header("My Page Title") }}
```

### Include
Embed the contents of one template into another, promoting modularity.

**Example:**  
```html
{% include "templates/footer.html" %}
```

### Extend
Build upon a base template by overriding defined blocks, facilitating template inheritance.

**Example:**  

- **Base Template Example (base.html):**
```html
<head>
  <meta charset="UTF-8">
  <title>{% block title %}Default Title{% endblock %}</title>
</head>
<body>
  <main>
    {% block content %}
    <!-- Default content goes here -->
    {% endblock %}
  </main>
  <footer>
    {% block footer %}
    <p>Footer content here</p>
    {% endblock %}
  </footer>
</body>
```

```html
{% extends "base.html" %}
{% block content %}
  <p>This is my custom content.</p>
{% endblock %}
```

### Function Embedding
Invoke backend or custom Python functions within the template. Functions are passed via the template context.

```html
{% set user_name = get_user_name(user_id) %}
<p>Welcome, {{ user_name }}!</p>
```

## A worked page

A task board with two tabs. The `tab` variable comes from the host, and the filter group writes it back when the player picks a tab.

```html
{% import "templates/headers.html" as header %}

{% set tab = fun.getv("tab", "open") %}
{% set tasks = fun.getv("tasks", []) %}

<main>
    <filter-group type="tabs" filter-target="tab" width="auto" default="open">
        <filter type="tab" height="25" width="100" padding="5" filter-value="open">
            <txt align="center">Open</txt>
        </filter>
        {% if fun.notempty(tasks) %}
            <filter type="tab" height="25" width="100" padding="5" filter-value="all">
                <txt align="center">All</txt>
            </filter>
        {% endif %}
    </filter-group>

    {% if tab == "open" %}
        {{ header.h2("Open tasks") }}
        {% for task in tasks if not task.done %}
            <bullet-list margin-bottom="5">{{ task.name }}</bullet-list>
        {% else %}
            <txt>Nothing left to do.</txt>
        {% endfor %}
    {% endif %}

    {% if tab == "all" %}
        {{ header.h2("All tasks") }}
        <lazy-div preload="15" display="flex" width="auto" spacing="5">
            {% for task in tasks %}
                <txt width="48%">{{ task.name }}</txt>
            {% endfor %}
        </lazy-div>
    {% endif %}
</main>
```

| Part | What it does |
| --- | --- |
| `import ... as header` | Loads macros from another template through the loader's path resolver. `header.h2` is a macro defined there. |
| `fun.getv("tab", "open")` | Reads a variable the host or a filter group set, with a default. See the [context](./jinja2-context.md). |
| `fun.notempty(tasks)` | Shows the second tab only when there is something to list. |
| `filter-group type="tabs"` | Writes the picked `filter-value` into the variable named by `filter-target`; the page re-renders with the new value. See [filter groups](./components-filters.md). |
| `{% if tab == ... %}` | Selects the content for the active tab. Everything outside the branch is not built. |
| `lazy-div` | Queues children beyond `preload` so a long list does not freeze the client. |

Updates that should not rebuild the page belong in [reactive zones](./reactive-zones.md).
