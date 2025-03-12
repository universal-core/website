---
title: UCHTML Jinja2 Templating
displayed_sidebar: mainSidebar
---

# UCHTML Jinja2 Templating

## What is Jinja2?
Jinja2 is a modern, designer-friendly templating engine for Python. It is used to generate dynamic web content, such as HTML, XML, or other text-based formats. Jinja2 makes it easy to separate business logic from presentation logic by providing a rich set of features including variable interpolation, control structures, and template inheritance. In the context of UCHTML, Jinja2 works together with HTML to greatly enhance the expressivity of the system, allowing developers to embed backend functions and create reactive interfaces. For a full reference, see the [official Jinja2 documentation](https://jinja.palletsprojects.com/en/stable/templates/).

## Most Used Capabilities

### Setting Variables
Define variables within the template to be used later.

**Example:**  

```html
{% set title = "Welcome to the InGame Wiki" %}
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

## Jinja2 Templating Step-by-Step

Below is an example UCHTML page that demonstrates how Jinja2 templating is integrated into the system and the step-by-step explaination of the code.

```html
{% import "templates/headers.html" as header %}
{% import "templates/page.html" as page %}

{% set vnum = fun.getvi("query:vnum") %}
{% set tab = fun.getv("query:tab") %}
{% set can_show_stats = item.can_show_stats(vnum) %}
....

{{ page.title(["Oggetti"], item.item_name(vnum)) }}
<main>
    <filter-group type="tabs" filter-target="query:tab" width="auto" default="info">
        <filter type="tab" height="25" width="100" padding="5" filter-value="info">
            <txt color="wikititle" align="center">Informazioni</txt>
        </filter>
        {% if has_upgrade or has_epic_upgrade %}
            <filter type="tab" height="25" width="100" padding="5" filter-value="up">
                <txt color="wikititle" align="center">Miglioramento</txt>
            </filter>
        {% endif %}
        {% if fun.notempty(cubes_as_material) or fun.notempty(cubes_as_result) %}
            <filter type="tab" height="25" width="100" padding="5" filter-value="craft">
                <txt color="wikititle" align="center">Craft</txt>
            </filter>
        {% endif %}
    </filter-group>
    
    {% if tab == "info" %}
        {% if can_show_stats %}
            <item-stats width=auto vnum="{{ vnum }}" />
        {% endif %}
        <div display="flex" name="flex_outer" width="auto" justify-content="space-between">
            <div width="59%">
                {{ header.h2("Informazioni") }}
                <inline>
                    {% if is_costume %}
                        <model item-vnum="{{ vnum }}" camera-move="1" height="150" width="150" margin-right="10"/>
                    {% endif %}
                    <div width="auto">
                        <slot-item vnum="{{ vnum }}" margin-bottom="5"/>
                        <div width="auto">
                            {% if desc != "" %}
                                {{ desc }}
                            {% endif %}
                            {% if summary %}
                                <spacer />
                                {{ summary }}
                            {% endif %}
                        </div>
                    </div>
                </inline>
                {% include "p/items/templates/{}.html".format(vnum) ignore missing with context %}

                {% if fun.notempty(in_chest) %}
                    <spacer />
                    {{ header.h2("Si trova dentro le casse") }}
                    <items-grid width=auto height=32 vnums="{{ in_chest }}" />
                {% endif %}

                {% if fun.notempty(chest_content) %}
                    <spacer/>
                    <div height="200" scrollbar-gap="5">
                        <chest-content width="auto" vnum="{{ vnum }}"/>
                    </div>
                {% endif %}

                {% if fun.notempty(upgrade_for) %} 
                    <spacer/>
                    {{ header.h2("Utilizzato come oggetto da miglioramento da") }}
                    <items-grid sort-size="True" height="128" width="auto" vnums="{{ upgrade_for }}"/>
                {% endif %}
            </div>
            <div width="40%">
                {% if fun.notempty(sold_by) %}
                    {{ header.h2("Comprabile dagli NPC") }}
                    {% for seller in sold_by %}
                        <bullet-list margin-bottom="5">
                            <hmob vnum="{{ seller.npc_vnum }}"/>
                        </bullet-list>
                    {% endfor %}
                {% endif %}
                {{ header.h2("Trovabile come drop") }}
                <div height="auto" display="block">
                    <item-obtainable-from width="auto" vnum="{{ vnum }}"/>
                </div>
            </div>
        </div>
    {% endif %}

    {% if tab == "up" %}
        {% if has_upgrade %}
            <equip-up width="auto" vnum="{{ vnum }}"/>
        {% endif %}

        {% if has_epic_upgrade %}
            <equip-epic-up width="auto" vnum="{{ vnum }}"/>
        {% endif %}
    {% endif %}

    {% if tab == "craft" %}
        {% if fun.notempty(cubes_as_material) %}
            {{ header.h2("Usato come materiale nei seguenti craft") }}
            <lazy-div preload="15" display="flex" width=auto spacing="5" justify-content="space-evenly">
            {% for value in cubes_as_material %}
                {% if loop.changed(value["npc"]) %}
                    <h2 width="100%" pattern="d:/ymir work/ui/quest_re/quest_tab">Crafter <hmob vnum="{{ value.npc }}" /></h2>
                {% endif %}
                <cube-card cost="{{ value['gold'] }}" pct="{{ value['percent'] }}">
                    <cube-result vnum="{{ value['reward']['vnum'] }}" count="{{ value['reward']['count'] }}"></cube-result>
                    {% for mat in value["materials"] %}
                        <cube-material vnum="{{ mat['vnum'] }}" count="{{ mat['count'] }}"></cube-material>
                    {% endfor %}
                </cube-card>
            {% endfor %}
            </lazy-div>
        {% endif %}
    {% endif %}
</main>
```

#### 1. Template Imports

The template starts by importing external templates:

```html
{% import "templates/headers.html" as header %}
{% import "templates/page.html" as page %}
```

- **Purpose:**  
  These imports allow the template to use reusable components (macros) defined in the imported files.  
- The `header` alias is used to access header-related macros (e.g., `header.h2`).
- The `page` alias provides access to layout and title macros for setting up the page structure.


#### 2. Variable Initialization

A series of `{% set %}` statements initialize variables that hold dynamic data about an item.  
All function used here are embedded by the backend to the html page.

```html
{% set vnum = fun.getvi("query:vnum") %}
{% set tab = fun.getv("query:tab") %}
{% set can_show_stats = item.can_show_stats(vnum) %}
{% set is_costume = item.is_any_of_type(vnum, item.ITEM_TYPE_COSTUME, item.ITEM_TYPE_COSTUME_PET, item.ITEM_TYPE_COSTUME_MOUNT) %}
...
```

**Explanation:**  
- `vnum` and `tab` retrieve query parameters to determine which item is being viewed and which tab should be active.
- The following variables (e.g., `can_show_stats`, `is_costume`, `desc`, etc.) fetch various properties and related data for the item identified by `vnum`.  
- These variables drive conditional rendering later in the template, ensuring that only relevant sections are displayed.


#### 3. Dynamic Page Title Rendering

The template sets a dynamic page title using a macro from the imported `page` template:

```html
{{ page.title(["Oggetti"], item.item_name(vnum)) }}
```

**Explanation:**  
- This line calls the `page.title` macro with two parameters: a list containing the section label `"Oggetti"` and the item’s name (obtained via `item.item_name(vnum)`).
- The result is a dynamically generated title that reflects the current item.


#### 4. Main Content Structure

The main content of the page is wrapped within the `<main>` element. Inside, the template defines different sections based on the active tab.

##### 4.1. Tab Filter Group

A filter group is created to allow the user to switch between different views:

```html
<filter-group type="tabs" filter-target="query:tab" width="auto" default="info">
    <filter type="tab" height="25" width="100" padding="5" filter-value="info">
        <txt color="wikititle" align="center">Informazioni</txt>
    </filter>
    {% if has_upgrade or has_epic_upgrade %}
        <filter type="tab" height="25" width="100" padding="5" filter-value="up">
            <txt color="wikititle" align="center">Miglioramento</txt>
        </filter>
    {% endif %}
    {% if fun.notempty(cubes_as_material) or fun.notempty(cubes_as_result) %}
        <filter type="tab" height="25" width="100" padding="5" filter-value="craft">
            <txt color="wikititle" align="center">Craft</txt>
        </filter>
    {% endif %}
</filter-group>
```

**Explanation:**  
- The filter group creates tabs for "Informazioni", "Miglioramento", and "Craft".
- The "Miglioramento" tab is rendered only if the item has an upgrade.
- The "Craft" tab appears only if there is crafting-related data.
- These tabs allow users to change the `tab` query parameter, which in turn controls which content section is displayed.

##### 4.2. Conditional Rendering Based on the Active Tab

The template uses conditionals to render different content blocks depending on the value of `tab`.

##### 4.2.1. When `tab == "info"`

```html
{% if tab == "info" %}
    {% if can_show_stats %}
        <item-stats width=auto vnum="{{ vnum }}" />
    {% endif %}
    <div display="flex" name="flex_outer" width="auto" justify-content="space-between">
        <div width="59%">
            {{ header.h2("Informazioni") }}
            <inline>
                {% if is_costume %}
                    <model item-vnum="{{ vnum }}" camera-move="1" height="150" width="150" margin-right="10"/>
                {% endif %}
                <div width="auto">
                    <slot-item vnum="{{ vnum }}" margin-bottom="5"/>
                    <div width="auto">
                        {% if desc != "" %}
                            {{ desc }}
                        {% endif %}
                        {% if summary %}
                            <spacer />
                            {{ summary }}
                        {% endif %}
                    </div>
                </div>
            </inline>
            {% include "p/items/templates/{}.html".format(vnum) ignore missing with context %}
    
            {% if fun.notempty(in_chest) %}
                <spacer />
                {{ header.h2("Si trova dentro le casse") }}
                <items-grid width=auto height=32 vnums="{{ in_chest }}" />
            {% endif %}
    
            {% if fun.notempty(chest_content) %}
                <spacer/>
                <div height="200" scrollbar-gap="5">
                    <chest-content width="auto" vnum="{{ vnum }}"/>
                </div>
            {% endif %}
    
            {% if fun.notempty(upgrade_for) %} 
                <spacer/>
                {{ header.h2("Utilizzato come oggetto da miglioramento da") }}
                <items-grid sort-size="True" height="128" width="auto" vnums="{{ upgrade_for }}"/>
            {% endif %}
        </div>
        <div width="40%">
            {% if fun.notempty(sold_by) %}
                {{ header.h2("Comprabile dagli NPC") }}
                {% for seller in sold_by %}
                    <bullet-list margin-bottom="5">
                        <hmob vnum="{{ seller.npc_vnum }}"/>
                    </bullet-list>
                {% endfor %}
            {% endif %}
            {{ header.h2("Trovabile come drop") }}
            <div height="auto" display="block">
                <item-obtainable-from width="auto" vnum="{{ vnum }}"/>
            </div>
        </div>
    </div>
{% endif %}
```

**Explanation:**  
- **Item Stats:** If `can_show_stats` is true, the `<item-stats>` component is rendered.
- **Left Column (59% width):**  
  - Displays a header "Informazioni" using a macro from the `header` template.
  - If the item is a costume, a 3D model is rendered via the `<model>` tag.
  - The item details are displayed within an inline container:
    - A `<slot-item>` component shows a slot for the item.
    - Descriptive text (`desc`) and summary (`summary`) are conditionally rendered.
  - An external template is included for additional item details.
  - Additional sections (e.g., items found in chests, chest content, upgrade material) are rendered if the corresponding data is present.
- **Right Column (40% width):**  
  - Conditionally renders a list of NPC sellers.
  - Always renders a section for items obtainable as drops via `<item-obtainable-from>`.

##### 4.2.2. When `tab == "up"`

```html
{% if tab == "up" %}
    {% if has_upgrade %}
        <equip-up width="auto" vnum="{{ vnum }}"/>
    {% endif %}
    
    {% if has_epic_upgrade %}
        <equip-epic-up width="auto" vnum="{{ vnum }}"/>
    {% endif %}
{% endif %}
```

**Explanation:**  
- This block renders the upgrade section.
- If the item has a standard upgrade (`has_upgrade`), the `<equip-up>` component is displayed.
- If an epic upgrade exists (`has_epic_upgrade`), the `<equip-epic-up>` component is rendered.

##### 4.2.3. When `tab == "craft"`

```html
{% if tab == "craft" %}
    {% if fun.notempty(cubes_as_material) %}
        {{ header.h2("Usato come materiale nei seguenti craft") }}
        <lazy-div preload="15" display="flex" width=auto spacing="5" justify-content="space-evenly">
        {% for value in cubes_as_material %}
            {% if loop.changed(value["npc"]) %}
                <h2 width="100%" pattern="d:/ymir work/ui/quest_re/quest_tab">Crafter <hmob vnum="{{ value.npc }}" /></h2>
            {% endif %}
            <cube-card cost="{{ value['gold'] }}" pct="{{ value['percent'] }}">
                <cube-result vnum="{{ value['reward']['vnum'] }}" count="{{ value['reward']['count'] }}"></cube-result>
                {% for mat in value["materials"] %}
                    <cube-material vnum="{{ mat['vnum'] }}" count="{{ mat['count'] }}"></cube-material>
                {% endfor %}
            </cube-card>
        {% endfor %}
        </lazy-div>
    {% endif %}
{% endif %}
```

**Explanation:**  
- This block deals with the crafting information.
- If crafting material data (`cubes_as_material`) exists, a header is shown.
- A `<lazy-div>` container is used to efficiently load the crafting components.
- A loop iterates over `cubes_as_material`:
  - When the `npc` value changes, a header is inserted to indicate the crafter.
  - Each craft is presented within a `<cube-card>` that displays cost, reward details, and required materials.
