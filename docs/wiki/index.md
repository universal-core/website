---
title: Wiki
displayed_sidebar: mainSidebar
---
# Documentation

## Index

- [Documentation](#documentation)
  - [Index](#index)
  - [Introduction](#introduction)
  - [Quickstart for Developers](#quickstart-for-developers)
    - [1. **Create the `.txt` file**](#1-create-the-txt-file)
    - [2. **Accessing the page via the Developer UI**](#2-accessing-the-page-via-the-developer-ui)
      - [a) **Navigate Button**](#a-navigate-button)
        - [b) **Refresh Button**](#b-refresh-button)
        - [c) **Copy URL Button**](#c-copy-url-button)
    - [3. **Testing changes immediately**](#3-testing-changes-immediately)
    - [4. **Deploying to Production**](#4-deploying-to-production)
    - [5. **Further Customization**](#5-further-customization)
  - [Wiki Configuration](#wiki-configuration)
    - [PACKED\_QUERY](#packed_query)
    - [ITEM\_ORIGIN\_LOCALE\_MAPPING](#item_origin_locale_mapping)
    - [MOB\_ORIGIN\_LOCALE\_MAPPING](#mob_origin_locale_mapping)
    - [QUEST\_NAMES](#quest_names)
    - [RAID\_NAMES](#raid_names)
    - [DUNGEON\_NAMES](#dungeon_names)
    - [MAP\_NAMES](#map_names)
    - [WIKI\_CATEGORIES](#wiki_categories)
    - [INDEXED\_PAGES](#indexed_pages)
    - [SEARCH\_RESULT\_CATEGORY](#search_result_category)
    - [ITEM\_WHITELIST](#item_whitelist)
    - [MOB\_WHITELIST](#mob_whitelist)
- [Wiki Data](#wiki-data)
    - [Output Files](#output-files)
    - [File Formats](#file-formats)
      - [`items.json`](#itemsjson)
      - [`mobs.json`](#mobsjson)
    - [Editable Files](#editable-files)
  - [Running the Pipeline](#running-the-pipeline)
    - [Setup Environment](#setup-environment)
    - [Running the Script](#running-the-script)
    - [Freeze Dependencies](#freeze-dependencies)
  - [Page Urls](#page-urls)
    - [Devmode](#devmode)
      - [Example:](#example)
    - [Custom query param: packed\_query](#custom-query-param-packed_query)
  - [Grid System](#grid-system)
    - [Display Modes Summary](#display-modes-summary)
    - [Structural Elements](#structural-elements)
    - [Examples](#examples)
      - [Example 1: Simple HEADER and BODY](#example-1-simple-header-and-body)
      - [Example 2: Nested BODY elements with Flex Layout](#example-2-nested-body-elements-with-flex-layout)
      - [Example 3: Using Block Display](#example-3-using-block-display)
  - [Variable and Function Embedding](#variable-and-function-embedding)
    - [Embedded Functions](#embedded-functions)
    - [Embedded Variables](#embedded-variables)
      - [Example 1](#example-1)
      - [Example 2](#example-2)
- [BBCodes](#bbcodes)
  - [Universally available attributes](#universally-available-attributes)
      - [About `width` and `height`](#about-width-and-height)
  - [Grid BBCode](#grid-bbcode)
    - [`[header]`](#header)
      - [Parameters:](#parameters)
      - [Example:](#example-1)
    - [`[body]`](#body)
      - [Parameters:](#parameters-1)
      - [Example:](#example-2)
    - [`[inline]`](#inline)
      - [Parameters:](#parameters-2)
      - [Example:](#example-3)
    - [`[template]`](#template)
      - [Parameters:](#parameters-3)
      - [Example:](#example-4)
    - [`$template_resolve` Function](#template_resolve-function)
      - [Syntax:](#syntax)
    - [Example with `$template_resolve`](#example-with-template_resolve)
      - [Code:](#code)
      - [Explanation:](#explanation)
    - [Practical Use Case](#practical-use-case)
- [Documentation for Document Flow Control BBCodes](#documentation-for-document-flow-control-bbcodes)
  - [Control BBCode](#control-bbcode)
    - [`[if]`](#if)
      - [Parameters:](#parameters-4)
      - [Example:](#example-5)
      - [Explanation:](#explanation-1)
    - [`[elseif]`](#elseif)
      - [Parameters:](#parameters-5)
      - [Example:](#example-6)
      - [Explanation:](#explanation-2)
    - [`[else]`](#else)
      - [Parameters:](#parameters-6)
      - [Example:](#example-7)
      - [Explanation:](#explanation-3)
    - [`[extractor]`](#extractor)
      - [Parameters:](#parameters-7)
      - [Example:](#example-8)
      - [Explanation:](#explanation-4)
    - [`[foreach]`](#foreach)
      - [Parameters:](#parameters-8)
      - [Variable Construction:](#variable-construction)
      - [Example (List):](#example-list)
      - [Example (Dictionary):](#example-dictionary)
      - [Example (Accessing Deeply Nested Dictionary Values):](#example-accessing-deeply-nested-dictionary-values)
      - [Example (Nested Dictionary):](#example-nested-dictionary)
- [Hyperlink BBCode](#hyperlink-bbcode)
  - [`[WIKI_HYPERLINK]`](#wiki_hyperlink)
  - [`[WIKI_ITEM]`](#wiki_item)
  - [`[WIKI_MOB]`](#wiki_mob)
  - [`[WIKI_RAID]`](#wiki_raid)
  - [`[WIKI_DUNGEON]`](#wiki_dungeon)
  - [`[WIKI_QUEST]`](#wiki_quest)
  - [`[WIKI_MAP]`](#wiki_map)
- [Table BBCodes](#table-bbcodes)
    - [`[table]`](#table)
    - [`[tr]`](#tr)
    - [`[th]`](#th)
    - [`[td]`](#td)
    - [**Advanced Example**](#advanced-example)
- [Basic Graphic BBCodes](#basic-graphic-bbcodes)
    - [Plain Text (Default Case)](#plain-text-default-case)
    - [`[text]`](#text)
    - [`[c]`](#c)
    - [`[img]`](#img)
    - [`[divider]`](#divider)
    - [`[spacer]`](#spacer)
    - [`[h1]`](#h1)
    - [`[h2]`](#h2)
    - [`[list_item]`](#list_item)
    - [`[item_slot]`](#item_slot)
    - [`[skill_slot]`](#skill_slot)
      - [Skill grade-level conversion](#skill-grade-level-conversion)
    - [`[card_slot]`](#card_slot)
- [Filter BBCodes Documentation](#filter-bbcodes-documentation)
  - [Filter Control BBCodes](#filter-control-bbcodes)
    - [`[filter_group]`](#filter_group)
      - [Parameters:](#parameters-9)
      - [Example:](#example-9)
      - [Explanation:](#explanation-5)
    - [`[filter]`](#filter)
      - [Types:](#types)
      - [Example 1: Button Filter](#example-1-button-filter)
      - [Example 2: Dynamic Button Filter](#example-2-dynamic-button-filter)
      - [Example 3: List Filter](#example-3-list-filter)
- [Game-Related BBCode Documentation](#game-related-bbcode-documentation)
  - [Overview](#overview)
    - [Game-Related BBCode Types](#game-related-bbcode-types)
    - [`[item_stats]`](#item_stats)
    - [`[equip_epic_up]`](#equip_epic_up)
    - [`[equip_up]`](#equip_up)
    - [`[item_details]`](#item_details)
    - [`[item_obtainable_from]`](#item_obtainable_from)
    - [`[chest_content]`](#chest_content)
    - [`[items_grid]`](#items_grid)
    - [`[mob_details]`](#mob_details)
    - [`[chest_details]`](#chest_details)
    - [`[mob_info]`](#mob_info)
    - [`[mob_drop]`](#mob_drop)
    - [`[render_target]`](#render_target)
- [Equip-Related BBCodes](#equip-related-bbcodes)
    - [`[multi_equip_window]`](#multi_equip_window)
      - [Parameters:](#parameters-10)
      - [Example:](#example-10)
      - [Explanation:](#explanation-6)
    - [`[equip_window]`](#equip_window)
      - [Parameters:](#parameters-11)
      - [Example:](#example-11)
      - [Explanation:](#explanation-7)
    - [`[equip_part]`](#equip_part)
      - [Parameters:](#parameters-12)
      - [Slot Index Reference:](#slot-index-reference)
      - [Example:](#example-12)
      - [Explanation:](#explanation-8)
      - [Extended Example with Multiple Equip Parts:](#extended-example-with-multiple-equip-parts)
      - [Explanation:](#explanation-9)

## Introduction

This package provides the backend and frontend logic to render an **in-game wiki** for an online game. The wiki system can display various types of structured information, such as **items**, **monsters**, **quests**, **dungeons**, and more. Developers can navigate through pages using **custom URLs**, and each page can be composed of multiple layout elements defined with a **grid system**. This system uses concepts similar to **HTML** and **CSS** layout (such as "body" elements instead of "div" and "header" elements), while offering custom **bbcode-like tags** to control structure, formatting, and embedding of dynamic data.

The wiki is more than a static display: it allows **full-text search** and the **embedding of dynamic content**. This dynamic content includes **variables** and **functions** that can be embedded directly into text lines, allowing context-sensitive information without separate logic. As you display, for example, an item name or rarity, you can rely on embedded functions (`$item_name(...)`) and variables (`#sys:item_type_weapon`) to automatically fetch and show the correct data.


## Quickstart for Developers

This quickstart guide will help you create and deploy a new wiki page in the game’s wiki system, as well as utilize the developer UI buttons effectively.

---

### 1. **Create the `.txt` file**  
   In your `client-folder`, create a folder named `wikidev`. The Client folder is the folder where the launcher (**metin2client.exe/bin**) is.  
   Then a new `.txt` file inside the `wikidev` folder:
   
   ```
   [client-folder]/wikidev/<pagePath>.txt
   ```
   
   For example, if you want to create a new page for item details:
   
   ```
   [client-folder]/wikidev/items/details.txt
   ```

   Inside this file, you can use BBCodes and embedded variables/functions as described in the documentation. A simple example:
   
   ```
   [body]
   [h2 text="Item Details"]
   [item_details vnum=#query:vnum]
   [/body]
   ```

---

### 2. **Accessing the page via the Developer UI**

The game UI has three developer buttons: **Navigate**, **Refresh**, and **Copy URL**. Here's how to use them:

#### a) **Navigate Button**
- Clicking this button opens a popup where you can enter a full URL to load a specific wiki page.
- Enter a URL in the following format:

```
wiki://p/<pagePath>?param1=value1&param2=value2
```

For example:
```
wiki://p/items/details?vnum=10
```

- `p/items/details` matches your `items/details.txt` file.
- `?vnum=10` sets the `#query:vnum` variable to `10` inside the page.
- Confirm the popup to navigate to the specified page.

##### b) **Refresh Button**
- Use this button to reload the currently displayed wiki page.
- Useful for testing changes made in the `wikidev` folder. Save your changes, press **Refresh**, and see them applied instantly.

##### c) **Copy URL Button**
- Copies the full URL of the currently loaded wiki page to your clipboard.
- Allows you to share or reuse the page URL easily.

---

### 3. **Testing changes immediately**  
   When using `wikidev`, changes to the `.txt` file are applied immediately. Steps:
   - Save the `.txt` file in the `wikidev` directory.
   - Use the **Navigate** button to load the page or the **Refresh** button to reload the current page and see the changes.

---

### 4. **Deploying to Production**  
   Once you’re satisfied with the page:
   - Move the `.txt` file to the production environment folder:
   
     ```
     locale/[localization]/wiki/p/<pagePath>.txt
     ```
     
     For example:
     ```
     locale/universal/wiki/p/items/details.txt
     ```
   
   - Repack the client files and restart the game client for the changes to apply in production mode.

---

### 5. **Further Customization**  
   - Use embedded variables (e.g., `#query:vnum`) to dynamically change displayed data.
   - Use embedded functions (e.g., `$item_name(#query:vnum)`) to fetch data directly.
   - Utilize BBCodes (`[body]`, `[header]`, `[item_details]`, etc.) to structure and format your page.

## Wiki Configuration

This section provides an in-depth overview of the **uiwiki_config.py** file and its role in controlling various aspects of the wiki’s behavior.  
The **uiwiki_config.py** script contains dictionaries and lists that map in-game data (items, mobs, maps, etc.) to human-readable names and logical groupings. By adjusting these dictionaries, you can change how the wiki interprets and displays game content, as well as how queries and categories are resolved.

The goal is to give you a clear understanding of what each configuration dictionary does, the format it uses, and how you can leverage it to shape the wiki’s output. Most of these dictionaries are used internally by the wiki engine but can be customized to fit the server’s unique content and presentation needs.

### PACKED_QUERY

**Description**:  
This dictionary defines named lists of item or mob IDs that can be referenced in page URLs via [`packed_query:`](#custom-query-param-packed_query). Instead of writing long lists of IDs in the URL, you can store them here and reference them by a single keyword.

**Format**:  
```py
PACKED_QUERY = {
    "KEY": [ID1, ID2, ...],  
    "OTHER_KEY": list(range(START, END))
}
```

**Usage**:  
By adding `?vnums=packed_query:KEY` to your URL, the wiki expands `KEY` into the full list of IDs defined here, making it easier to handle large sets of vnums.

**Example**:  
If you define:
```py
PACKED_QUERY = {
    "BOSS_CHEST_VNUMS": [50070, 50076, 50075]
}
```
Then using `?vnums=packed_query:BOSS_CHEST_VNUMS` in your URL automatically replaces `#query:vnums` with `50070,50076,50075`.

---

### ITEM_ORIGIN_LOCALE_MAPPING

**Description**:  
This maps localization keys to lists of item IDs that share a common origin or theme.   
The keys are used to search the localization key in **locale_game.txt**

**Format**:  
```py
ITEM_ORIGIN_LOCALE_MAPPING = {
    "WIKI_CHESTINFO_ORIGIN_XXXX": [ITEM_IDs...]
}
```

**Example**:  
```py
ITEM_ORIGIN_LOCALE_MAPPING = {
    "WIKI_CHESTINFO_ORIGIN_FISHING": [90588, 30397, 27987]
}
```
This means all these item vnums are considered part of the “fishing” origin category.  
**`WIKI_CHESTINFO_ORIGIN_FISHING`** must be defined in **locale_game.txt** to localize the origin.

---

### MOB_ORIGIN_LOCALE_MAPPING

**Description**:  
Similar to ITEM_ORIGIN_LOCALE_MAPPING, but for mobs. It maps locale strings to lists of mob IDs that belong to specific places, events, or categories.  
The keys are used to search the localization key in **locale_game.txt**

**Format**:  
```py
MOB_ORIGIN_LOCALE_MAPPING = {
    "WIKI_MONSTERINFO_ORIGIN_XXXX": [MOB_IDs...]
}
```

**Example**:  
```py
MOB_ORIGIN_LOCALE_MAPPING = {
    "WIKI_MONSTERINFO_ORIGIN_DESERT": [2104, 2105, 2106]
}
```
All these mob IDs are considered to originate from the “desert” environment.  
**`WIKI_MONSTERINFO_ORIGIN_DESERT`** must be defined in **locale_game.txt** to localize the origin.

---

### QUEST_NAMES

**Description**:  
Maps quest identifiers (keys) to their human-readable names.

**Format**:  
```py
QUEST_NAMES = {
    "quest_key": "Localized Quest Name"
}
```

**Example**:  
```py
QUEST_NAMES = {
    "Q_SLAY_DRAGONS": "Slay the Dragons!" # or localeInfo.bla
}
```
The wiki replaces references to `Q_SLAY_DRAGONS` with “Slay the Dragons!” in pages.

---

### RAID_NAMES

**Description**:  
Maps raid identifiers to their localized names.

**Format**:  
```py 
RAID_NAMES = {
    "raid_key": "Raid Name"
}
```

**Example**:  
```py 
RAID_NAMES = {
    "RAID_FIRE_TEMPLE": "Temple of Flame" # or localeInfo.bla
}
```
Any reference to `RAID_FIRE_TEMPLE` becomes “Temple of Flame” in the wiki.

---

### DUNGEON_NAMES

**Description**:  
Maps dungeon identifiers to localized dungeon names.

**Format**:  
```py
DUNGEON_NAMES = {
    "dungeon_key": "Dungeon Name" # or localeInfo.bla
}
```

**Usage**:  
Ensures that dungeons appear with proper names rather than raw IDs.

**Example**:  
```py
DUNGEON_NAMES = {
    "DUN_MYSTIC_CAVE": "Mystic Cave" # or localeInfo.bla
}
```
Referenced as “Mystic Cave” in the wiki.

---

### MAP_NAMES

**Description**:  
A dictionary that maps map IDs (as strings) to localized map names.  
**Keys must always be strings**

**Format**:  
```py
MAP_NAMES = {
    "map_id": localeInfo.MAP_XXXX
}
```

**Example**:  
```py
MAP_NAMES = {
    "61": localeInfo.MAP_SNOW
}
```
This ID is shown as the “Snow” map.

---

### WIKI_CATEGORIES

**Description**:  
A nested structure defining main categories and subcategories for navigation. Each category has a display name and contains subcategories, each with a URL.

**Format**:  
```py
WIKI_CATEGORIES = 
[
  [CategoryName, [
    [SubcategoryName, "wiki://p/..."],
    ...
  ]],
  ...
]
```

**Example**:  
```py
WIKI_CATEGORIES = 
[
  ["Equipment", [
    ["Weapons", "wiki://p/items/weapons"],
    ["Armor", "wiki://p/items/armors"]
  ]]
]
```
Shows an “Equipment” category with “Weapons” and “Armor” subcategories.

---

### INDEXED_PAGES

**Description**:  
A list of dictionaries that predefine certain pages with categories and titles for the search engine to quickly index.

**Format**:  
```py
INDEXED_PAGES = [
    {
    "category": "string",
    "title": "string",
    "url": "wiki://..."
    }
]
```

**Example**:  
```py
INDEXED_PAGES = [
    {
        "category": "dungeon",
        "title": "Haunted Mines",
        "url": "wiki://p/dungeons/haunted_mines"
    }
]
```
This ensures the “Haunted Mines” dungeon is known to the search engine.

---

### SEARCH_RESULT_CATEGORY

**Description**:  
Defines the styling and localized names for various search result categories, mapping each category to a dictionary containing its hexadecimal color code and localized name.

**Format**:  
```bbcode
SEARCH_RESULT_CATEGORY = {
    "category": {"color": "hexColorCode", "name": localeInfo.LocalizedName}
}
```

**Example**:  
```bbcode
SEARCH_RESULT_CATEGORY = {
    "item": {"color": "fffa4834", "name": localeInfo.WIKI_RESULT_CATEGORY_ITEM},
    "system": {"color": "ff3473fa", "name": localeInfo.WIKI_RESULT_CATEGORY_SYSTEM},
    "nonplayer": {"color": "ffa237db", "name": localeInfo.WIKI_RESULT_CATEGORY_NONPLAYER}
}
```

---

### ITEM_WHITELIST

**Description**:  
A list of item IDs considered “allowed” or highlighted. The wiki might use this to filter.

**Format**:  
```py
ITEM_WHITELIST = [ID1, ID2, ...]
```

**Example**:  
```py
ITEM_WHITELIST = [1, 2, 3, 4, 5]
```

---

### MOB_WHITELIST

**Description**:  
Similar to [ITEM_WHITELIST](#item_whitelist) but for mobs. A list of mob IDs that should be allowed.

**Format**:  
```
```py 
MOB_WHITELIST = [ID1, ID2, ...]
```

**Example**:  
```py 
MOB_WHITELIST = [8010, 8011]
```

# Wiki Data

This section explains the functionality of the Wiki Data pipeline, which loads game settings data from various sources (e.g., prototypes, quests, configurations) and generates static assets for the wiki. These assets are saved in the `locale/[localization]/wiki` directory and can be customized via `.devops/wiki_builder/config.py`.

---

### Output Files

The pipeline generates the following static files:
- `items.json`
- `mobs.json`
- `refine_trees.json`
- `refine_sets.json`

### File Formats

#### `items.json`
```json
{
    "vnum": {
        "base_vnum": vnum1,
        "refine_count": count,
        "refine": [
            {
                "to": vnum,
                "npc": npc,
                "type": "normal",
                "set": {
                    "flag": flag,
                    "cost": cost,
                    "cost2": cost2,
                    "items": [
                        {
                            "vnum": vnum,
                            "count": count,
                            "flag": flag,
                            "argument": argument
                        }
                    ]
                }
            }
        ],
        "refine_tree": [
            [
                {
                    "to": vnum,
                    "npc": npc,
                    "type": "normal",
                    "set": {
                        "flag": flag,
                        "cost": cost,
                        "cost2": cost2,
                        "items": [
                            {
                                "vnum": vnum,
                                "count": count,
                                "flag": flag,
                                "argument": argument
                            }
                        ]
                    }
                }
            ]
        ],
        "refine_epicization": [...],
        "refine_material": [item1, item2],
        "crafted": [...],
        "craft_material": [result1, result2],
        "drop_by": {...},
        "in_chest": [...],
        "in_quest": [...],
        "chest_content": {...},
        "reward_of": [...],
        "sold_by": [...]
    }
}
```

#### `mobs.json`
```json
{
    "vnum": {
        "map_indexes": [map1, map2],
        "drops": [
            {
                "vnum": vnum,
                "vnums": [vnum],
                "count": count,
                "rarity": number,
                "type": "limit|quest|stone|kill|drop|common|belt|thiefgloves|dungeon",
                "requirements": {
                    "level_limit_min": 1,
                    "level_limit_max": 2,
                    "days": [],
                    "time_from": 3,
                    "time_to": 4,
                    "max_drop": 0,
                    "during_event": "",
                    "during_quest": ""
                }
            }
        ],
        "appears_in_quests": ["quest1"],
        "appears_in_dungeons": ["dungeon1"],
        "appears_in_raids": ["raid"],
        "sells": [
            {
                "item_vnum": vnum,
                "count": 1
            }
        ]
    }
}
```

### Editable Files

In the same folder, the pipeline also produces:
- `items_ex.json`
- `mobs_ex.json`

These files are designed for manual edits. Developers can add data not captured by the pipeline. Direct edits to `items.json` or `mobs.json` will be overwritten during subsequent pipeline runs, so use the `_ex.json` files for modifications.

---

## Running the Pipeline

### Setup Environment

1. **Install a Virtual Environment**:
   - Navigate to the root directory:
     ```bash
     cd ./
     ```
   - Create a virtual environment:
     ```bash
     python -m venv venv
     ```

2. **Activate the Virtual Environment**:
   - On **Windows**:
     ```bash
     .\venv\Scripts\activate
     ```
   - On **macOS/Linux**:
     ```bash
     source venv/bin/activate
     ```

3. **Install Dependencies**:
   - Navigate to `.devops/wiki_builder`:
     ```bash
     cd .devops/wiki_builder
     ```
   - Install requirements:
     ```bash
     pip install -r requirements.txt
     ```
   - Return to the root directory:
     ```bash
     cd ../../
     ```

### Running the Script

1. Use the provided scripts to run the pipeline from the root directory (`./`):
   - **Windows**: `run-wiki-builder.bat`
   - **Linux/Mac**: `run-wiki-builder.sh`

2. Make the bash script executable:
   ```bash
   chmod +x run-wiki-builder.sh
   ```

### Freeze Dependencies

If you install or update dependencies, remember to update `requirements.txt`:
1. Activate the virtual environment.
2. Navigate to `.devops/wiki_builder`:
   ```bash
   cd .devops/wiki_builder
   ```
3. Freeze the dependencies:
   ```bash
   pip freeze > requirements.txt
   ```
4. Return to the root directory:
   ```bash
   cd ../../
   ```

---


## Page Urls

Each page in the wiki is addressed by a **URL** following the pattern:

```
wiki://p/<pagePath>?param1=value1&param2=value2
```

- **`p/<pagePath>`**: The logical path of the page inside the wiki’s structure. This represents where the corresponding **.txt file** for that page is located inside the game client in the folder `locale/[localization]/wiki`. For example, if `<pagePath>` is `items/details`, the wiki tries to load `locale/[localization]/wiki/p/items/details.txt`.
- **Query parameters**: Such as `?vnum=100`, allow you to dynamically select data to be displayed. These become [embedded variables](#variable-and-function-embedding) (e.g., `#query:vnum`) that can be used inside templates.

### Devmode

when the client is in **__DEBUG__** mode, the wiki will try to search the file using the following priority order:

- Development environment (`wikidev`):  `[client-folder]/wikidev/<pagePath>.txt` directory.
- Production environment: `locale/[localization]/wiki/<pagePath>.txt`(default is `universal`) directory.  

#### Example:
Use URLs like `wiki://p/items/details?vnum=2000` to load a page. The engine looks first in `[client-folder]/wikidev/p/items/details.txt`, then in `locale/[localization]/wiki/p/items/details.txt`.

### Custom query param: packed_query

If a query parameter starts with `packed_query:`, it references a pre-defined array of vnums or IDs from a [configuration dictionary](#packed_query). For example, `?vnums=packed_query:BOSS_CHEST_VNUMS` might expand into a list of chest item IDs. This expansion happens before rendering the template, so that `#query:vnums` contains the entire list instead of just a single value.

## Grid System

The wiki layout is built using special bbcode tags that form a grid-like structure.

### Display Modes Summary

| Display Mode | Behavior |
|--------------|-------|
| **default**  | BODY takes the available space and stacks elements top-to-bottom.                             |
| **flex**     | Arranges child elements horizontally. When space runs out, elements wrap to a new line.       |
| **absolute** | Positions child elements at exact coordinates, ignoring normal flow.                          |
| **block**    | Stretches BODY vertically to match the parent’s height, useful for full-height columns.       |

### Structural Elements

| Element      | Description |
|--------------|---|
| **HEADER**   | A top-level element that must appear **outside and before any BODY**. Typically used for page titles, navigation, or a short introduction. |
| **BODY**     | A container element that holds content. If not otherwise specified, a BODY tries to **occupy all remaining space** after the HEADER. BODY elements can be nested, allowing complex layouts. |
| **TEMPLATE** | A special type of BODY that loads content from another file. Templates can be considered **reusable components**. |

### Examples

#### Example 1: Simple HEADER and BODY

```
+------------------------------------------------+
|                    HEADER                      |
+------------------------------------------------+
|                  BODY (auto)                   |
+------------------------------------------------+
```

Here, the HEADER is always on top of the page. The BODY below automatically expands to fill the remaining space.

#### Example 2: Nested BODY elements with Flex Layout

```
+------------------------------------------------+
|                  HEADER                        |
+------------------------------------------------+
|                  BODY (flex)                   |
|  +-------------------------+-----------------+ |
|  |        BODY (flex)     |   BODY (flex)   |  |
|  |  (occupies 50% width)  | (occupies 50%)  |  |
|  +-------------------------+-----------------+ |
+------------------------------------------------+
```

#### Example 3: Using Block Display

```
+------------------------------------------------------+
|                       HEADER                         |
+------------------------------------------------------+
|                       BODY (auto)                    |
|  +-------------------------+----------------------+  |
|  | BODY (block)            |  BODY (block)        |  |
|  | matches parent height   | matches parent       |  |
|  |                         | height               |  |
|  +-------------------------+----------------------+  |
+------------------------------------------------------+
```

## Variable and Function Embedding

The wiki system supports embedding of **variables** and **functions** directly into **text** and **BBCode attributes**. You can reference **variables** with a `#` prefix and **functions** with a `$` prefix. These can appear anywhere in text lines, including in plain text, and they will be expanded at runtime to their appropriate values.

- **Variables** (e.g., `#sys:item_type_weapon`) can be used to insert dynamic values like item types, monster IDs, etc.
- **Functions** (e.g., `$mob_name(100)`) dynamically fetch data, like a monster’s name from its ID.

**When used as BBcode attributes, is better to wrap functions and variables in `""` to facilitate parsing**  

### Embedded Functions

Below is a table of all currently available embedded functions. These functions can be invoked by using the `$` prefix, followed by the function name and arguments. For example: `$mob_name(100)`.  
**You can use `variables and functions` as function parameters**

| Function Name | Description | Arguments | Returns |
|---|---|--------------------------------|----------------------|
| `$mob_name` | Returns the name of the specified mob (monster/NPC). | vnum (int) | Mob name (string) |
| `$mob_get_drops` | Retrieves a list of items that a specified mob can drop. | vnum (int) | List of item vnums |
| `$mob_get_appears_in_quests` | Returns a list of quests in which the specified mob appears. | vnum (int) | List of quest IDs |
| `$mob_get_appears_in_dungeons`   | Returns a list of dungeons in which the specified mob appears. | vnum (int) | List of dungeon IDs |
| `$mob_get_appears_in_raids` | Returns a list of raids in which the specified mob appears. | vnum (int) | List of raid IDs |
| `$mob_get_appears_in_maps` | Returns a list of maps in which the specified mob appears. | vnum (int) | List of map IDs |
| `$mob_sells` | Returns a list of item sold by the npv. | list(dict) | List item_sold information |
| `$mob_is_any_of_type` | Checks if the mob matches any of the specified mob types. | vnum (int), *types (string...) | Boolean (True/False) |
| `$item_name` | Retrieves the name of the specified item. | vnum (int) | Item name (string) |
| `$item_desc` | Retrieves the description of the specified item. | vnum (int) | Item description (string) |
| `$item_summary` | Retrieves a short summary/tooltip text for the specified item. | vnum (int) | Item summary (string) |
| `$item_is_any_of_type` | Checks if the item matches any of the specified item types. | vnum (int), *types (string...) | Boolean (True/False) |
| `$item_get_drop_by` | Returns a list of mobs that can drop the specified item. | vnum (int) | List of mob vnums |
| `$item_get_chest_content` | Returns the list of items contained in a specified chest. | vnum (int) | List of item vnums |
| `$item_get_in_chests` | Returns the list of chests that can contain the specified item. | vnum (int) | List of chest vnums |
| `$item_get_in_chests_all_upgrades` | Returns a list of chests that contain any upgrade level of the specified item. | vnum (int) | List of chest vnums |
| `$item_get_in_quests` | Returns a list of quests in which the specified item appears. | vnum (int) | List of quest IDs |
| `$item_get_in_quests_all_upgrades` | Returns quests for all upgrade levels of the specified item. | vnum (int) | List of quest IDs |
| `$item_get_reward_of` | Returns a list of quests that reward the specified item. | vnum (int) | List of quest IDs |
| `$item_get_reward_of_all_upgrades` | Returns quests that reward any upgrade level of the specified item. | vnum (int) | List of quest IDs |
| `$item_get_sold_by_all_upgrades` | Returns a list of dict containing information about npc selling the item. | list(dict) | List selling_npc info |
| `$item_has_upgrade` | Checks if the item has any upgrades available. | vnum (int) | Boolean (True/False) |
| `$item_has_epic_upgrade` | Checks if the item has an epic upgrade. | vnum (int) | Boolean (True/False) |
| `$item_get_upgrade_level` | Returns the current upgrade level of the specified item. | vnum (int) | Upgrade level (int) |
| `$item_is_upgrade_material_for`  | Checks if the specified item can be used as upgrade material for another. | vnum (int), *args | Boolean (True/False) |
| `$item_can_show_stats` | Checks if the specified item can display its stats. | vnum (int) | Boolean (True/False) |
| `$template_exists` | Check If a given template exists | template path (string) | Boolean (True/False) |
| `$template_resolve` | Formats the template string with all parameters passed after the first.<br></br>See [\[template\]](#template) | String, *args | Resolved template string |

### Embedded Variables

Below is a table of all currently available embedded variables. These variables can be inserted anywhere in your text as `#variableName` and will be replaced at runtime:

| Variable                 | Description                 | Value Type    |
|--------------------------|-----------------------------|---------------|
| `#sys:mob_type_npc`        | Represents NPC mob type  | Integer/Enum  |
| `#sys:mob_type_monster`    | Represents monster mob type | Integer/Enum|
| `#sys:mob_type_stone`      | Represents stone mob type | Integer/Enum  |
| `#sys:mob_type_chakra`     | Represents chakra/meteor mob type | Integer/Enum |
| `#sys:mob_type_boss`       | Represents boss mob type  | Integer/Enum  |
| `#sys:item_type_weapon`    | Represents weapon item type | Integer/Enum |
| `#sys:item_type_armor`     | Represents armor item type | Integer/Enum |
| `#sys:item_type_helmet`    | Represents helmet item type | Integer/Enum |
| `#sys:item_type_shield`    | Represents shield item type | Integer/Enum |
| `#sys:item_type_earings`   | Represents earrings item type | Integer/Enum |
| `#sys:item_type_neck`      | Represents necklace item type | Integer/Enum |
| `#sys:item_type_bracalet`  | Represents bracelet item type | Integer/Enum |
| `#sys:item_type_boots`     | Represents boots item type   | Integer/Enum |
| `#sys:item_type_belt`      | Represents belt item type  | Integer/Enum |
| `#sys:item_type_artifact`  | Represents artifact item type | Integer/Enum |
| `#sys:item_type_costume`   | Represents costume item type | Integer/Enum |
| `#sys:item_type_shining`   | Represents shining item type | Integer/Enum |
| `#sys:item_type_costume_pet` | Represents costume pet item type | Integer/Enum |
| `#sys:item_type_costume_mount` | Represents costume mount item type | Integer/Enum |
| `#sys:item_type_chest`     | Represents chest item type | Integer/Enum |

All these variables and functions can be placed in text or attributes, and they will be replaced and evaluated at runtime, providing dynamic, context-sensitive information.

#### Example 1
For a clearer example, consider the following snippet from a template file (`p/items/details.txt`):

```  
[HEADER]
    [TEXT align=center]Item Details[/TEXT]
[HEADER]
[BODY]

You need #sys:item_type_armor of rarity $item_get_upgrade_level(#query:vnum)

[/BODY]
```

**How this works:**

- **`#sys:item_type_armor`** is a variable that might resolve to `"Armor"`.
- **`#query:vnum`** is a variable holding the item’s unique number (e.g., `2000`), which comes from the page URL query.
- **`$item_get_upgrade_level(#query:vnum)`** is a function call that, given the `vnum` (e.g., `2000`), might return `"5"`.

So, if the URL is:

```
wiki://p/items/details?vnum=2000
```

Then the line inside the BODY becomes:

`"You need Armor of rarity 5"`

All of these substitutions happen automatically at render time, ensuring the displayed content is current and dynamic.

#### Example 2
Consider the following snippet of a template (`p/mobs/details.txt`):

```  
[HEADER]
    [H2 text="#sys:mob_name"]
[HEADER]
[BODY display="$mob_get_display_mode(#query:vnum)"]

This mob, #sys:mob_name, appears in #sys:mob_zone_count different zones!

[/BODY]
```

**How this works:**

- **`#sys:mob_name`** is a variable referenced directly in the HEADER’s text attribute. When the page renders, this attribute is resolved into something like `"Dark Orc Shaman"`.
- **`display="$mob_get_display_mode(#query:vnum)"`** is a function call as an attribute. It passes the queried monster’s vnum (from the URL query parameters) to `$mob_get_display_mode`, which might return `"flex"` or `"block"` depending on conditions. The BODY then adopts that display mode at runtime.

For example, if the URL is:

```
wiki://p/mobs/details?vnum=4500
```

and `$mob_get_display_mode(4500)` returns `"flex"`, and `#sys:mob_name` is `"Dark Orc Shaman"`, then the template above effectively becomes:

- HEADER text: `"Dark Orc Shaman"`
- BODY display: `"flex"`

and the text inside the BODY might appear as:

`"This mob, Dark Orc Shaman, appears in 3 different zones!"`

All attributes and inline texts are evaluated and replaced with their corresponding dynamic values before rendering.

# BBCodes

## Universally available attributes

All bbcode tags share a common set of attributes that control their layout, positioning, and behavior. Below is a table of universally available attributes:

| Attribute | Description | Example |
|---|----|----|
| `width` | Sets the width of the element. Can be a fixed value (e.g., `200`), a percentage of the parent (`50%`) or `auto`.<br></br>If omitted, it gets the parent's width.<br></br>If `auto` the body will adjust it's width to fit all children | `width="50%"` |
| `height` | Sets the height of the element. Can be a fixed value (e.g., `200`) or `auto`.<br></br>If omitted, it gets the parent's height.<br></br>If `auto` the body will adjust it's height to fit all children | `height="auto"` |
| `align` | Controls horizontal alignment. Possible values: `left` (default), `center`, `right`. | `align="center"` |
| `vertical_align`| Controls vertical alignment. For example, `vertical_align="center"` centers child elements vertically if applicable. | `vertical_align="center"` |
| `margin_left` / `margin_right` / `margin_top` / `margin_bottom` | Adds spacing around the element. Useful when you want to offset elements within a body. | `margin_left="10"` |
| `padding_left` / `padding_right` / `padding_top` / `padding_bottom` | Adds inner spacing within elements like BODY or TEMPLATE. | `padding_top="5"` |
| `x`, `y` | Used when `display="absolute"`. Sets the exact position inside the parent. | `x="100" y="50"` |
| `display` | Controls layout mode: can be `flex`, `absolute`, `block`, or default. `flex` arranges children horizontally, `block` stretches the element, `absolute` allows positioning by `x`, `y`. | `display="flex"` |

#### About `width` and `height`

If not differently specified, all components will try to occupy all the available width and height.  
With **available** we mean all the space of the parent container (in case of top level **BODY**, it will try to occupy the whole wiki window **minus** the space occupied by the **HEADER**).

Additionally its important to keep in mind that **height=auto** and **width=auto** tags **DO NOT HAVE** an height/width set before all children are placed. Therefore children of an `auto` size **MUST** specify that size in order to become visible.

| Property | Default value | Children constraints |
| --- | --- | --- | 
| `height` | Parent's height **wiki's window** | Must specify an `height` (can be **auto**).<br></br>Can't have **..%** height. |
| `width` | Parent's width **wiki's window** | Must specify an `width` (can be **auto**).<br></br>Can't have **..%** width. |

**Important! `display=flex`, `display=block` and `padding_*` are only available to (`[body]`, `[header]`, `[foreach]`)**

These attributes can be combined. For example, a BODY could be declared as:

```
[body height="auto" align="center" display="flex" margin_top="10"]
```

This line would create a body that spans the entire available width, automatically adjusts its height, centers its content horizontally, arranges child elements in a flex layout, and adds a 10px top margin.

## Grid BBCode

Refer to [Structural ELements](#structural-elements) for the grid system.  

| **BBCode**    | **Parameters** | **Description** |
|---------------|---|------|
| **`[header]{content}[/header]`** | All [above attributes](#universally-available-attributes)<br></br>`content` (mandatory): The content displayed within the header block. | Defines a header block, typically used for page titles or filter section headings. |
| **`[body]{content}[/body]`**   | All [above attributes](#universally-available-attributes)<br></br>`content` (mandatory)<br></br>`name` (optional): The content displayed within the body block.<br></br>`min_height` (optional)<br></br>`max_height` (optional) | Represents a primary content container with flexible layout options. |
| **`[inline]{content}[/inline]`**   | A shortcut for **[BODY display=flex height=auto**] | The behaviour is the same as a flex **BODY** |
| **`[template]`** | All [above attributes](#universally-available-attributes)<br></br>`path` (mandatory): pathurl of the template txt file.<br></br>`name` (optional) | Embeds a predefined template with dynamic variable support. |

------

### `[header]`
The `[header]` BBCode defines a section intended for high-level headings or titles. It can contain styled text, images, or other elements to highlight critical parts of the page.

#### Parameters:
- All [above attributes](#universally-available-attributes).
- **`content`** (mandatory): Content within the header. This can include other BBCodes, text, or styled elements.

#### Example:
``` 
[header]
  Welcome to the Wiki!
[/header]
```

This creates a full-width header with the text "Welcome to the Wiki!".

---

### `[body]`
The `[body]` BBCode serves as the primary container for page elements. It uses a flexible grid system to arrange its child components, supporting `flex`, `block` or `absolute` layouts.

#### Parameters:
- All [above attributes](#universally-available-attributes).
- **`name`** (optional): Name of the body, for debugging purpose and order.
- **`spacing`** (optional): Adds spacing between child elements if `display:flex` is used.
- **`content`** (mandatory): Nested child elements. This can include other `[body]` blocks for nesting, text, or media elements.
- **`min_height`** (optional): The component will have an height > `min_height` regardless of the content height.
- **`max_height`** (optional): The component with height `auto` will have height maximum equal to `max_height`.

#### Example:
```
[body height=auto spacing=10 display=flex]
  [body width=50%]
    Content on the left.
  [/body]
  [body width=50%]
    Content on the right.
  [/body]
[/body]
```

This creates a two-column layout with equal-width containers, each with a 10px spacing.

### `[inline]`
The `[inline]` BBCode serves as a shorcut for for **[BODY display=flex height=auto**].  
You can still use all **BODY**'s attributes.

#### Parameters:
- All [above attributes](#universally-available-attributes).
- **`name`** (optional): Name of the body, for debugging purpose and order.
- **`spacing`** (optional): Adds spacing between child elements if `display:flex` is used.
- **`content`** (mandatory): Nested child elements. This can include other `[body]` blocks for nesting, text, or media elements.
- **`min_height`** (optional): The component will have an height > `min_height` regardless of the content height.
- **`max_height`** (optional): The component with height `auto` will have height maximum equal to `max_height`.

#### Example:
```
[inline]
  [body width=50%]
    Content on the left.
  [/body]
  [body width=50%]
    Content on the right.
  [/body]
[/inline]
```

This creates a two-column layout with equal-width containers, each with a 10px spacing.


---

### `[template]`
The `[template]` BBCode embeds predesigned templates into the page, allowing for modular and reusable components. Variables and padding options can further customize the embedded content.  
Often used in combination with `$template_resolve` function which dynamically constructs the template path. It accepts a format string and any number of arguments to replace placeholders within the string.

#### Parameters:
- All [above attributes](#universally-available-attributes).
- **`name`** (optional): Name of the body, for debugging purpose and order.
- **``path`** (mandatory): pathurl of the template txt file.

#### Example:
```
[template path="templates/example" width=100% height=200 padding_top=10 padding_bottom=10]
```

This includes a reusable template located at `templates/example` with a 200px height and padding applied to the top and bottom.

### `$template_resolve` Function

#### Syntax:
``` 
$template_resolve(format_string, arg1, arg2, ...)
```

- **`format_string`**: A template string containing placeholders (e.g., `{}`) to be replaced with the provided arguments.
- **`arg1, arg2, ...`**: Arguments to replace placeholders in the format string.


### Example with `$template_resolve`

The following example demonstrates embedding a template dynamically resolved using `$template_resolve`:

#### Code:
```
[template path="$template_resolve(test_landing{}_{}, 2, test)" height=400 width=#self:body_width]
```

#### Explanation:
**`$template_resolve(test_landing{}_{}, 2, test)`**:
   - Constructs the template path by replacing `{}` with the arguments `2` and `test`.
   - The resulting path becomes `test_landing2_test`.

### Practical Use Case

The above example embeds the `test_landing2_test` template into the page, which is dynamically determined at runtime. This allows developers to reuse and customize templates efficiently without hardcoding paths.  
By combining `[template]` with `$template_resolve`, developers can build flexible and scalable wiki pages that adapt to different contexts and data.

# Documentation for Document Flow Control BBCodes

This section describes the document flow control BBCodes used in the wiki system, detailing their parameters and usage with examples.

## Control BBCode

| BBCode | Parameters | Description |
|--------------|---|---|
| `[if]`       | `variable` (mandatory)<br></br>`op` (mandatory)<br></br>`value` (mandatory) | Conditional rendering based on variable comparison. |
| `[elseif]`   | `variable` (mandatory)<br></br>`op` (mandatory)<br></br>`value` (mandatory) | Conditional rendering, executed if the previous `[if]` or `[elseif]` condition fails. |
| `[else]`     | - | Fallback rendering executed if all previous `[if]` and `[elseif]` conditions fail. |
| `[foreach]`  | All [above attributes](#universally-available-attributes)<br></br>`values` (mandatory)<br></br>`lazy` (optional)<br></br>`name` (optional)<br></br>`min_height` (optional)<br></br>`max_height` (optional) | Iterates over a list or dictionary to render child elements for each item. |
| `[extractor]`| `from` (mandatory)<br></br>`target` (mandatory)<br></br>`split` (optional)<br></br>`cast` (optional)<br></br>`property` (optional) | Extracts and transforms data from a source into a specific format or structure. |

---

### `[if]`

#### Parameters:
- **`variable`** (mandatory): The variable to evaluate.
- **`op`** (mandatory): The comparison operator (`EQ`, `NEQ`, `GT`, `GTE`, `LT`, `LTE`).
- **`value`** (mandatory): The value to compare the variable against.

#### Example:
```
[if variable="#user_level" op="GTE" value="10"]
Welcome, advanced user!
[/if]
```

#### Explanation:
- Checks if `#user_level` is greater than or equal to 10.
- Displays "Welcome, advanced user!" if the condition is true.

---

### `[elseif]`

#### Parameters:
- **`variable`** (mandatory): The variable to evaluate.
- **`op`** (mandatory): The comparison operator (`EQ`, `NEQ`, `GT`, `GTE`, `LT`, `LTE`).
- **`value`** (mandatory): The value to compare the variable against.

#### Example:
```
[if variable="#user_level" op="GTE" value="10"]
Welcome, advanced user!
[elseif variable="#user_level" op="GTE" value="5"]
Welcome, intermediate user!
[/if]
```

#### Explanation:
- The first condition checks if `#user_level` is greater than or equal to 10.
- If not, the second condition checks if `#user_level` is greater than or equal to 5 and renders accordingly.

---

### `[else]`

#### Parameters:
- **None**

#### Example:
```
[if variable="#user_level" op="GTE" value="10"]
Welcome, advanced user!
[elseif variable="#user_level" op="GTE" value="5"]
Welcome, intermediate user!
[else]
Welcome, beginner!
[/if]
```

#### Explanation:
- Executes if none of the previous `[if]` or `[elseif]` conditions are true.

---

### `[extractor]`

#### Parameters:
- **`from`** (mandatory): The source to extract data from. This can be a direct value or a packed query reference (`packed_query:<query>`).
- **`target`** (mandatory): The target where the extracted data will be placed.
- **`split`** (optional): A delimiter for splitting string data into a list.
- **`property`** (optional): A specific property to extract from each dictionary.
- **`cast`** (optional): Specifies the type to cast extracted values (e.g., `int`).

#### Example:
```
[extractor from="#data_source" target="#parsed_data" split="," property="name" cast="int"]
```

#### Explanation:
- Extracts data from `#data_source`.
- Splits the data by `,` and converts it to strings.
- Places the result in `#parsed_data`.

---

### `[foreach]`

#### Parameters:
- All [above attributes](#universally-available-attributes)
- **`name`** (optional): Name of the body, for debugging purpose and order.
- **`values`** (mandatory): A list or dictionary of values to iterate over.
- **`lazy`** (optional): Determines whether to load elements lazily. Default is `0`.
- **`min_height`** (optional): The component will have an height > `min_height` regardless of the content height.
- **`max_height`** (optional): The component with height `auto` will have height maximum equal to `max_height`.

#### Variable Construction:
- **List Case**:
  - For each iteration, the variable `#foreach.value` is set to the current item in the list.
  - Index-based variables are also available: `#foreach.i` for the current iteration index (starting from `0`).

- **Dictionary Case**:
  - For each iteration, the variable `#foreach.key` is set to the current dictionary key, and `#foreach.value` is set to the corresponding value.
  - When dealing with nested properties, you can access deeper levels using dotted notation like `#foreach.value.subkey`.
- For nested dictionaries within the value, variables are created with a dotted structure such as `#foreach.value.nestedkey`.

#### Example (List):
```
[foreach values="#user_items"]
    Item: [text value=#foreach.value]
[/foreach]
```

**Explanation**:
- Iterates over the `#user_items` list.
- For each item, `#foreach.value` holds the current list element, which is rendered in the text.

#### Example (Dictionary):
```
[foreach values="#user_data"]
    [text value=#foreach.key]: [text value=#foreach.value]
[/foreach]
```

**Explanation**:
- Iterates over the `#user_data` dictionary.
- For each key-value pair, `#foreach.key` holds the current key and `#foreach.value` holds the associated value, both of which are rendered in the text.

#### Example (Accessing Deeply Nested Dictionary Values):
```
[foreach values="#complex_data"]
    Entity: [text value=#foreach.key]
    Nested Value: [text value=#foreach.value.details.type]
    Other Info: [text value=#foreach.value.details.level]
[/foreach]
```

**Explanation**:
- Iterates over `#complex_data`, where `#foreach.key` represents the entity's name, and `#foreach.value` is a dictionary with additional details.
- The nested dictionary values are accessed using a dotted notation, such as `#foreach.value.details.type` and `#foreach.value.details.level`.

#### Example (Nested Dictionary):
```
[foreach values="#game_data"]
  Character: [text value=#foreach.key]
  [foreach values=#foreach.value.items]
    Stat: [text value=#foreach.key], Value: [text value=#foreach.value]
  [/foreach]
[/foreach]
```

**Explanation**:
- The outer loop iterates over `#game_data`, where each key is a character name, and the value is a nested dictionary of stats.
- The inner loop iterates over the nested dictionary (`#foreach.value.items`) for each character, exposing each stat name as `#foreach.key` and its value as `#foreach.value`.

# Hyperlink BBCode

Below is a comprehensive summary of the BBCodes used for hyperlinks in the wiki system. Each BBCode enables dynamic linking to various game-related entities like items, mobs, raids, dungeons, quests, and maps.

| **BBCode**           | **Parameters**                   | **Description**                                                                 |
|-----------------------|-----------------------------------|---------------------------------------------------------------------------------|
| `[WIKI_HYPERLINK]{content}[/WIKI_HYPERLINK]`    | `url` (mandatory), `content` (mandatory) | Creates a clickable hyperlink with custom text pointing to a specified URL.     |
| `[WIKI_ITEM]`         | `vnum` (mandatory)              | Generates a hyperlink for an item based on its VNUM (unique item identifier).    |
| `[WIKI_MOB]`          | `vnum` (mandatory)              | Creates a hyperlink for a mob (monster/NPC) based on its VNUM.                  |
| `[WIKI_RAID]`         | `id` (mandatory)                | Generates a hyperlink pointing to a raid page, using the raid's unique ID.      |
| `[WIKI_DUNGEON]`      | `id` (mandatory)                | Creates a hyperlink for a dungeon, using the dungeon's unique ID.               |
| `[WIKI_QUEST]`        | `id` (mandatory)                | Links to a specific quest based on its unique ID.                               |
| `[WIKI_MAP]`          | `id` (mandatory)                | Generates a hyperlink for a map using its unique ID.                            |


## `[WIKI_HYPERLINK]`
This BBCode creates a clickable hyperlink with customizable text pointing to a specified URL.  
**WIKI_HYPERLINK cannot be used in an `h2` text attribute**

**Parameters**:
- `url` (mandatory): The target URL of the hyperlink.
- `{content}` (mandatory): The text displayed as the hyperlink.

**Example**:
```
[WIKI_HYPERLINK url="wiki://p/items/details?vnum=2000"]Item Details[/WIKI_HYPERLINK]
```

---

## `[WIKI_ITEM]`
This BBCode generates a hyperlink to an item using its VNUM (unique item identifier).

**Parameters**:
- `vnum` (mandatory): The unique identifier of the item.

**Example**:
```
[WIKI_ITEM vnum=10023]
```

---

## `[WIKI_MOB]`
This BBCode creates a hyperlink to a mob (monster/NPC) based on its VNUM.

**Parameters**:
- `vnum` (mandatory): The unique identifier of the mob.

**Example**:
```
[WIKI_MOB vnum=30011]
```

---

## `[WIKI_RAID]`
This BBCode generates a hyperlink pointing to a specific raid page, using the raid's unique ID.

**Parameters**:
- `id` (mandatory): The unique identifier of the raid.

**Example**:
```
[WIKI_RAID id="fire_temple"]
```

---

## `[WIKI_DUNGEON]`
This BBCode creates a hyperlink for a dungeon using its unique ID.

**Parameters**:
- `id` (mandatory): The unique identifier of the dungeon.

**Example**:
```
[WIKI_DUNGEON id="mystic_cave"]
```

---

## `[WIKI_QUEST]`
This BBCode links to a specific quest based on its unique ID.

**Parameters**:
- `id` (mandatory): The unique identifier of the quest.

**Example**:
```
[WIKI_QUEST id="slay_dragons"]
```

---

## `[WIKI_MAP]`
This BBCode generates a hyperlink for a map using its unique ID.

**Parameters**:
- `id` (mandatory): The unique identifier of the map.

**Example**:
```
[WIKI_MAP id="snow_realm"]
```

# Table BBCodes

The table below summarizes the table-related BBCodes available in the system, their parameters, and usage. These codes allow you to create structured tabular data, define rows and cells, and control cell width and alignment.

| **BBCode**   | **Parameters** | **Description** |
|--------------|----------------|------------------|
| `[table]{content}[/table]`   | All [above attributes](#universally-available-attributes)<br></br>**`content`** (mandatory): Table content. | Defines a table layout. The table must contain at least one `[tr]` (table row). |
| `[tr]{content}[/tr]`      | **`content`** (mandatory): Row content. | Defines a table row. It must contain at least one `[td]` or `[th]`. |
| `[th]{content}[/th]`      | **`width`** (mondatory): Column width in percentage (e.g., `34%`).<br></br>**`content`** (mandatory): Table Header content. | Defines a table header cell. The width specified for a `[th]` applies to all columns of the same index unless overridden by `[td]`. |
| `[td]{content}[/td]`      | **`width`** (optional): Column width in percentage (e.g., `34%`).<br></br>**`content`** (mandatory): Table Data content. | Defines a table data cell for normal content. If a `[td]` has a width set, it will override the `[th]` width for that specific column in that row. |

---

### `[table]`

Defines a table structure.

**Parameters**:
- All [above attributes](#universally-available-attributes)

**Example**:
```bbcode
[TABLE width=100%]
[TR]
[TH width=30%]Header 1[/TH]
[TH width=30%]Header 2[/TH]
[TH width=30%]Header 3[/TH]
[/TR]
[TR]
[TD]Cell 1[/TD]
[TD]Cell 2[/TD]
[TD width=15%]Cell 3 (Overridden Width)[/TD]
[TD width=15%]Cell 4 (Overridden Width)[/TD]
[/TR]
[/TABLE]
```
This creates a table where the first 2 row’s column widths are set by `[th]`, but the second row has its 3rd and 4th column widths overridden by `[td]`.

---

### `[tr]`

Defines a row inside a table.  
Is important to know that the row will force all `TR` and `TD` to **not exceed** its width. Therefore when the division is not perfect (like 3 columns) it is possible to set the last one to be slightly wider (34%) and the row will take care of the exact width.

**Parameters**:
- *(No specific parameters)*

**Example**:
```bbcode
[TR]
[TD]Row 1, Cell 1[/TD]
[TD]Row 1, Cell 2[/TD]
[TD]Row 1, Cell 3[/TD]
[/TR]
```

---

### `[th]`

Defines a table header cell. The width specified for a `[th]` is applied to all columns with the same index unless overridden by `[td]` in specific rows.
The content of the header can be **any other BB-Code** (for advanced header you can use [BODY](#body) as well).

**Parameters**:
- `width` (mondatory): Defines the column width **as a percentage**.

**Example**:
```bbcode
[TH width=30%]Column Header[/TH]
```
The header text is centered with a width of 30%. If this is the first column, all rows without an overriding `[td]` width will also have 30% width for this column.  

---

### `[td]`

Defines a table data cell. If a `[td]` width is specified, it overrides the `[th]` width for that specific column in that row.  
The content of the data can be **any other BB-Code** (for advanced usage you can use [BODY](#body) as well).

**Parameters**:
- `width` (optional): Defines the cell width **as a percentage**.

**Example**:
```bbcode
[TD width=50%]This cell takes 50% of the row width.[/TD]
```

This creates a table cell that takes up 50% of the row width, regardless of the `[th]` width setting for this column.

---

### **Advanced Example**

```bbcode
[TABLE width=100%]
[TR]
[TH width=30%]Column 1[/TH]
[TH width=30%]Column 2[/TH]
[TH width=30%]Column 3[/TH]
[/TR]
[TR]
[TD]Default Width[/TD]
[TD width=15%]Override 1[/TD]
[TD width=15%]Override 2[/TD]
[/TR]
[TR]
[TD width=100%]Full-width row[/TD]
[/TR]
[/TABLE]
```
This creates a table where:
- The first row's column widths are set to 30% each by `[th]`.
- The second row overrides the widths of the second and third columns with `[td width=15%]`.
- The third row has a single cell spanning the entire table width.



# Basic Graphic BBCodes

The table below summarizes the basic graphic-related BBCodes available in the system, their parameters, and usage. These codes are used to add visual elements such as images, headers, lists, and more to the wiki layout.

| **BBCode**   | **Parameters** | **Description** |
|--------------|----------------|------------------|
| Plain Text   | *(No BBCode, default case)* | Displays plain text as it appears in the input. |
| `[text]{content}[/text]` | All [above attributes](#universally-available-attributes)<br></br>**`content`** (mandatory): Text content. **Content can only be play text, hyperlinks and [C], not other components.<br></br>**`color`** (optional): Hex color code.<br></br>**`font_size`** (optional): Size of the font.<br></br>**`font_name`** (optional): Font name. | Displays a text block with optional styling. |
| `[c]{content}[/c]` | **`color`** (mandatory): A hex color code, which can be 8 characters for **ARGB** color (e.g., `FF0000` or `FF0000FF`).<br></br>**`content`** (mandatory): The inline text to colorize. | Adds inline color to a text snippet using the provided hex color code. |
| `[img]` | All [above attributes](#universally-available-attributes)<br></br>**`path`** (mandatory): File path to the image | Adds an image to the page. |
| `[divider]` | None | Adds a horizontal divider to separate sections visually. |
| `[spacer]` | None | Adds vertical space between elements. |
| `[h1]{content}[/h1]` | All [above attributes](#universally-available-attributes)<br></br>**`content`** (mandatory): the content to put in the h1 | Creates a large header (level 1) for the page. |
| `[h2]` | All [above attributes](#universally-available-attributes)<br></br>**`text`** (mandatory): Subtitle text. | Creates a medium-sized header (level 2) for the page. |
| `[list_item]{content}[/list_item]` | All [above attributes](#universally-available-attributes)<br></br>**`content`** (mandatory): the content to put as bullet point. | Creates a bullet point for a list. |
| `[item_slot]` | All [above attributes](#universally-available-attributes)<br></br>**`vnum`** (mandatory): Item number.<br></br>**`count`** (optional): Number of items to display. | Displays an item with its icon and optional count. |
| `[skill_slot]` | All [above attributes](#universally-available-attributes)<br></br>**`vnum`** (mandatory): Skill vnum.<br></br>**`grade`** (mandatory): Skill grade.<br></br>**`level`** (mandatory): Skill level. | Displays skill with given level and grade. |
| `[card_slot]` | All [above attributes](#universally-available-attributes)<br></br>**`image`** (mandatory): Path to the image.<br></br>**`level`** (optional): Level to show.<br></br>**`tooltip_text`** (optional): String to show as tooltip when cursor hovers the slot. | Displays a slot with the given image and level. |

---

### Plain Text (Default Case)

Displays plain text without requiring a BBCode.

**Parameters**:
- *(No specific parameters)*

**Example**:
```bbcode
Welcome to the wiki!
```

---

### `[text]`

Displays a text block with optional styling.  
The content can only be **plain text**, an **hyperlink** or a **[C]** tag

**Parameters**:
- All [above attributes](#universally-available-attributes)
- `content` (mandatory): Text content.
- `color` (optional): A hex color code, which can be 8 characters for **ARGB** color (e.g., `FF0000` or `FFFF0000`).
- `font_size` (optional): Size of the font.
- `font_name` (optional): Font name.

**Example**:
```bbcode
[text value="Welcome to the wiki!" color="ffFF0000" font_size=20 font_name="Arial"]
```
Displays the text "Welcome to the wiki!" in red (`FF0000`), with a font size of 20px and the font "Arial".

---

### `[c]`

Adds inline color to a text snippet using a hex color code.

**Parameters**:
- `color` (mandatory): A hex color code, which can be 8 characters for **ARGB** color (e.g., `FF0000` or `FFFF0000`).
- `content` (mandatory): The inline text to colorize.

**Example**:
```bbcode
[C color=FFFF0000]This text is red.[/C]
```
The text "This text is red." will appear in red (`FF0000`).

---

### `[img]`

Adds an image to the page.

**Parameters**:
- All [above attributes](#universally-available-attributes)
- `path` (mandatory): File path to the image.

**Example**:
```bbcode
[img path="images/example.jpg"]
```
The image at `images/example.jpg` is displayed.

---

### `[divider]`

Adds a horizontal divider to separate content.

**Parameters**:
- All [above attributes](#universally-available-attributes)

**Example**:
```bbcode
[divider]
```
Inserts a visual divider line to break up sections of the page.

---

### `[spacer]`

Adds vertical space between elements.

**Parameters**:
- *(No specific parameters)*

**Example**:
```bbcode
[spacer]
Adds a vertical gap between two elements on the page.
```

---

### `[h1]`

Creates a large header (level 1) for the page.

**Parameters**:
- All [above attributes](#universally-available-attributes)
- `content` (mandatory): The content to put in the header.

**Example**:
```bbcode
[h1]
    [text vertical_align=center margin_left=5]Main Section[/text]
[/h1]
```
Creates a header with the text "Main Section" vertically centered with 5px margin left and a width of 800px.

---

### `[h2]`

Creates a medium-sized header (level 2) for subsections.

**Parameters**:
- All [above attributes](#universally-available-attributes)
- `text` (mandatory): Subtitle text.

**Example**:
```bbcode
[h2 text="Subsection"]
```
Creates a smaller header with the text "Subsection" and a width of 600px.

---

### `[list_item]`

Adds a bullet point for a list.

**Parameters**:
- All [above attributes](#universally-available-attributes)
- `content` (mandatory): The content to put as a bullet point.

**Example**:
```bbcode
[list_item]
    This is a bullet point
[/list_item]
```
Displays a list item with the text "This is a bullet point" and a width of 400px.

---

### `[item_slot]`

Displays an item with its icon and optional count.

**Parameters**:
- All [above attributes](#universally-available-attributes)
- `vnum` (mandatory): Item number.
- `count` (optional): Item count.

**Example**:
```bbcode
[item_slot vnum=1001 count=3]
```
Displays an item with the item number `1001` and a count of `3`.

---

### `[skill_slot]`

Displays a skill icon with level.

**Parameters**:
- All [above attributes](#universally-available-attributes)
- `vnum` (mandatory): Skill vnum.
- `grade` (mandatory): Skill grade.
- `level` (mandatory): Skill level.

#### Skill grade-level conversion

| Grade value | Conventional Level |
| - | - |
| `0` | **1-20** | 
| `1` | **M1-M20** | 
| `2` | **G1-G20** | 
| `3` | **P** | 

**Example**:
```bbcode
[skill_slot vnum=3 grade=1 level=17]
```
Displays the skill 3 with grade 1 and level 17 (**M17**)

---

### `[card_slot]`

Displays a card slot with optional level.  
This kind of slot is useful for these icons which are not [**Skill**](#skill_slot) nor [**Items**](#item_slot) like **Pet skills**, **Skill Tree nodes**...


**Parameters**:
- All [above attributes](#universally-available-attributes)
- `image` (mandatory): Path to the image.
- `level` (optional): Level to show.
- `tooltip_text` (optional): String to show as tooltip when cursor hovers the slot.


**Example**:
```bbcode
[card_slot image="d:/ymir work/ui/skill/pet/pet_skill_4.sub" level=39 tooltip_text="Pet skill #4"]
```
Displays the **Pet Skill 4** at level **39**, when the cursor goes over the slot a tooltip with **"Pet skill #4"** appears.

# Filter BBCodes Documentation

This section documents the `filter_group` and `filter` BBCodes used to create dynamic filter elements in the wiki. These elements allow developers to provide users with filtering options for various data or components.

---

## Filter Control BBCodes

| BBCode           | Parameters                  | Description                                                                 |
|------------------|-----------------------------|-----------------------------------------------------------------------------|
| **`filter_group`** | All [above attributes](#universally-available-attributes)<br></br>`type` (mandatory) | Specifies the filter group type (`buttons` or `list`). |
|                  | `filter_target` (mandatory) | The target variable to set when a filter is selected. |
|                  | `default` (optional)        | Specifies the default filter index. |
| **`filter`**     | All [above attributes](#universally-available-attributes)<br></br>`type` (mandatory) | Specifies the filter type (`button`, `dynamic_button`, `item`). |
|                  | `path` (mandatory for `button`) | Defines the image path for visual button states (`normal`, `hover`, `selected`). |
|                  | `filter_value` (mandatory)  | The value to set in the target variable when the filter is selected. |
|                  | `text` (mandatory for `dynamic_button` and `item`) | Specifies the display text of the filter button or list item. |
|                  | `tooltip_text` (optional for `dynamic_button` and `button`) | Tooltip string shown on cursor over. |


### `[filter_group]`

The `filter_group` BBCode defines a container for a collection of filters. It acts as the parent for individual `filter` elements and determines the overall behavior and appearance of the filter set.

#### Parameters:
- All [above attributes](#universally-available-attributes)
- **`type`**: Determines the filter group layout:
  - `buttons`: Renders the filters as buttons.
  - `list`: Renders the filters as a dropdown list.
- **`filter_target`**: Specifies the target variable that will store the selected filter value.
- **`default`** (optional): Defines the default filter index (zero-based) if no filter is selected.

#### Example:

```
[filter_group type="buttons" filter_target="#category" default=0]
    [filter type="button" path="d:/path/to/filter_{}.png" filter_value="value1"]
    [filter type="button" path="d:/path/to/filter_{}.png" filter_value="value2"]
[/filter_group]
```  

#### Explanation:
- Creates a filter group with two buttons.
- The first button (`value1`) is selected by default (`default=0`).
- The `filter_target` is set to `#category` with the value of the selected button.

---

### `[filter]`

The `filter` BBCode represents an individual filter option within a `filter_group`. Its behavior and appearance depend on the `type` parameter.

#### Types:
1. **`button`**:
    - **`type`**: Must be set to `"button"` for this filter type.
    - **`path`** (mandatory): A string containing the path to the image files for the button states. The `{}` placeholder is used to dynamically replace the state name (e.g., `normal`, `hover`, `selected`) when loading the corresponding image.
    - **`filter_value`** (mandatory): The value to set in the target variable when the button is clicked.
    - **`tooltip_text`** (optional): String enclosed in **""** which appears when the cursor is over the button.
2. **`dynamic_button`**:
    - **`type`**: Must be set to `"dynamic_button"` for this filter type.
    - **`height`** (mandatory): Specifies the button's height in pixels.
    - **`width`** (mandatory): Specifies the button's width in pixels.
    - **`text`** (mandatory): The text displayed on the button.
    - **`filter_value`** (mandatory): The value to set in the target variable when the button is clicked.
    - **`tooltip_text`** (optional): String enclosed in **""** which appears when the cursor is over the button.
3. **`item`**:
    - **`type`**: Must be set to `"item"` for this filter type.
    - **`text`** (mandatory): The label displayed in the dropdown list for this item.
    - **`filter_value`** (mandatory): The value to set in the target variable when the item is selected.

#### Example 1: Button Filter

```bbcode
[filter_group type="buttons" filter_target="#selection"]
    [filter type="button" path="d:/path/to/state_{}.png" filter_value="option1" tooltip_text="Option 1"]
    [filter type="button" path="d:/path/to/state_{}.png" filter_value="option2" tooltip_text="Option 2"]
[/filter_group]
```  

**Explanation**:
- Defines a button-based filter group.
- Each button uses the specified path to load images for `normal`, `hover`, and `selected` states.
- When a button is clicked, the `#selection` variable is updated with the corresponding `filter_value`.

---

#### Example 2: Dynamic Button Filter

```bbcode
[filter_group type="buttons" filter_target="#difficulty"]
    [filter type="dynamic_button" width=100 height=50 text="Easy" filter_value="easy" tooltip_text="Easy Mode"]
    [filter type="dynamic_button" width=100 height=50 text="Hard" filter_value="hard"]
[/filter_group]
```  

**Explanation**:
- Creates a filter group with dynamic text-based buttons.
- Each button is 100px wide and 50px high, displaying `Easy` or `Hard` as text.
- When a button is clicked, the `#difficulty` variable is updated with the corresponding `filter_value`.

---

#### Example 3: List Filter

```bbcode
[filter_group type="list" filter_target="#sortOrder"]
    [filter type="item" text="Ascending" filter_value="asc"]
    [filter type="item" text="Descending" filter_value="desc"]
[/filter_group]
```  

**Explanation**:
- Defines a dropdown list with two selectable options: `Ascending` and `Descending`.
- When an option is selected, the `#sortOrder` variable is updated with the corresponding `filter_value`.

# Game-Related BBCode Documentation

## Overview
This section documents the BBCode tags designed for game-related data display. These tags help present items, monsters, chests, and more within the wiki interface.

---

### Game-Related BBCode Types

| **BBCode Type**         | **Parameters**                                                                                   | **Description**                                                                                       |
|--------------------------|---------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------|
| **`item_stats`**         | All [above attributes](#universally-available-attributes)<br></br>`vnum` (mandatory)  | Displays the stats of an item identified by its VNUM. |
| **`equip_epic_up`**      | All [above attributes](#universally-available-attributes)<br></br>`vnum` (mandatory) | Displays the epic upgrade options for the specified equipment VNUM. |
| **`equip_up`**           | All [above attributes](#universally-available-attributes)<br></br>`vnum` (mandatory)  | Displays upgrade options for equipment. |
| **`item_details`**       | All [above attributes](#universally-available-attributes)<br></br>`vnum` (mandatory) | Displays detailed information about an item. |
| **`item_obtainable_from`** | All [above attributes](#universally-available-attributes)<br></br>`vnum` (mandatory)  | Displays where an item can be obtained (e.g., drops or chests). |
| **`chest_content`**      | All [above attributes](#universally-available-attributes)<br></br>`vnum` (mandatory)  | Displays the contents of a chest identified by its VNUM. |
| **`items_grid`**         | All [above attributes](#universally-available-attributes)<br></br>`vnums` (mandatory)  | Displays a grid of multiple items identified by their VNUMs. |
| **`mob_details`**        | All [above attributes](#universally-available-attributes)<br></br>`vnum` (mandatory)<br></br>`show_drop` (optional): Sets the default detail view to **Drop** | Displays detailed information about a monster. |
| **`chest_details`**      | All [above attributes](#universally-available-attributes)<br></br>`vnum` (mandatory) | Displays detailed information about a chest. |
| **`mob_info`**           | All [above attributes](#universally-available-attributes)<br></br>`vnum` (mandatory)  | Displays general information about a monster. |
| **`mob_drop`**           | All [above attributes](#universally-available-attributes)<br></br>`vnum` (mandatory)  | Displays drop information for a monster. |
| **`render_target`**      | All [above attributes](#universally-available-attributes)<br></br>Either `mob_vnum` or `item_vnum`<br></br>`camera_move` (optional, default `0`) | Displays a 3D render of a monster or item.                                                          |


### `[item_stats]`
Displays the stats of an item identified by its VNUM.

**Parameters**:
- All [above attributes](#universally-available-attributes)
- **`vnum`** (mandatory): The unique identifier for the item.

**Example**:
```bbcode
[item_stats vnum=10023 width=300 height=150]
```

**Explanation**:
- Displays stats for the item with VNUM `10023` in a 300x150 pixel area.

---

### `[equip_epic_up]`
Displays the epic upgrade options for an equipment item.

**Parameters**:
- All [above attributes](#universally-available-attributes)
- **`vnum`** (mandatory): The unique identifier for the equipment.

**Example**:
```bbcode
[equip_epic_up vnum=20345]
```

**Explanation**:
- Displays available epic upgrades for the equipment with VNUM `20345`.

---

### `[equip_up]`
Displays upgrade options for a piece of equipment.

**Parameters**:
- All [above attributes](#universally-available-attributes)
- **`vnum`** (mandatory): The unique identifier for the equipment.

**Example**:
```bbcode
[equip_up vnum=20345 width=200 height=100]
```

**Explanation**:
- Shows upgrade options for equipment with VNUM `20345` in a 200x100 pixel area.

---

### `[item_details]`
Displays detailed information about an item.

**Parameters**:
- All [above attributes](#universally-available-attributes)
- **`vnum`** (mandatory): The unique identifier for the item.

**Example**:
```bbcode
[item_details vnum=10023]
```

**Explanation**:
- Displays all detailed stats and attributes for the item with VNUM `10023`.

---

### `[item_obtainable_from]`
Displays where an item can be obtained.

**Parameters**:
- All [above attributes](#universally-available-attributes)
- **`vnum`** (mandatory): The unique identifier for the item.

**Example**:
```bbcode
[item_obtainable_from vnum=10023 width=400 height=200]
```

**Explanation**:
- Lists all possible sources (monsters, chests, etc.) for obtaining the item with VNUM `10023`.

---

### `[chest_content]`
Displays the contents of a chest.

**Parameters**:
- All [above attributes](#universally-available-attributes)
- **`vnum`** (mandatory): The unique identifier for the chest.

**Example**:
```bbcode
[chest_content vnum=50001 width=400 height=300]
```

**Explanation**:
- Displays the items inside the chest with VNUM `50001`.

---

### `[items_grid]`
Displays a grid of items.

**Parameters**:
- All [above attributes](#universally-available-attributes)
- **`height`** (mandatory): The height specified as number.
- **`vnums`** (mandatory): A list of vnums or a list of pairs [vnum, count].

`vnums` can be stored in a `variable` using **[EXTRACT]** as well.

**Example**:
```bbcode
[items_grid vnums="[10023,10024,10025]" width=600 height=400]
```

**Explanation**:
- Displays a grid containing items with VNUMs `10023`, `10024`, and `10025`.

```bbcode
[items_grid vnums="[[10023, 1],[10024, 10],[10025, 4]]" width=600 height=400]
```

**Explanation**:
- Displays a grid containing items with VNUMs `10023`x1, `10024`x10, and `10025`x4.


---

### `[mob_details]`
Displays detailed information about a monster.

**Parameters**:
- **`vnum`** (mandatory): The unique identifier for the monster.
- **`show_drop`** (optiona): [1 or 0] If **1** the default detail view is set to **drop**.

**Example**:
```bbcode
[mob_details vnum=30011]
```

**Explanation**:
- Shows stats, abilities, and other detailed information about the monster with VNUM `30011`.

---

### `[chest_details]`
Displays detailed information about a chest.

**Parameters**:
- All [above attributes](#universally-available-attributes)
- **`vnum`** (mandatory): The unique identifier for the chest.

**Example**:
```bbcode
[chest_details vnum=50001]
```

**Explanation**:
- Displays all relevant details for the chest with VNUM `50001`.

---

### `[mob_info]`
Displays general information about a monster.

**Parameters**:
- All [above attributes](#universally-available-attributes)
- **`height`** (mandatory): The height specified as number.
- **`vnum`** (mandatory): The unique identifier for the monster.

**Example**:
```bbcode
[mob_info vnum=30011 width=400 height=250]
```

**Explanation**:
- Displays general information about the monster with VNUM `30011`.

---

### `[mob_drop]`
Displays drop information for a monster.

**Parameters**:
- All [above attributes](#universally-available-attributes)
- **`vnum`** (mandatory): The unique identifier for the monster.

**Example**:
```bbcode
[mob_drop vnum=30011 width=350 height=200]
```

**Explanation**:
- Lists all possible item drops for the monster with VNUM `30011`.

---

### `[render_target]`
Displays a 3D render of a monster or item.

**Parameters**:
- All [above attributes](#universally-available-attributes)
- **`height`** (mandatory): The height specified as number.
- **`mob_vnum`** (optional): The VNUM of the monster to render.
- **`item_vnum`** (optional): The VNUM of the item to render.
- **`camera_move`** (optional, default `0`): Allows camera movement if set to `1`.

**Example**:
```bbcode
[render_target width=300 height=300 mob_vnum=30011 camera_move=1]
```

**Explanation**:
- Renders a 3D view of the monster with VNUM `30011` in a 300x300 pixel area, allowing camera movement.

# Equip-Related BBCodes

This section documents the BBCodes used for representing and displaying equipment systems in the wiki. These codes allow developers to define, organize, and display equipment items in structured containers.

| **BBCode**           | **Parameters** | **Description** |
|-----------------------|--------|----------|
| **`multi_equip_window`** | All [above attributes](#universally-available-attributes) | Represents a container for multiple `equip_window` elements, arranged in a flexible layout. |
| **`equip_window`**    | All [above attributes](#universally-available-attributes) | Represents a container for individual equipment parts, organized into slots. |
| **`equip_part`**      | **`slot`** (mandatory)<br></br>**`vnum`** (mandatory)<br></br>**`attrs`** (optional)<br></br>**`values`** (optional)<br></br>**`sockets`** (optional) | Represents an individual equipment item in a specific slot. |

### `[multi_equip_window]`

The `[multi_equip_window]` BBCode defines a container for multiple `equip_window` elements. It allows grouping equipment windows in a flexible layout.

#### Parameters:
- All [above attributes](#universally-available-attributes)

#### Example:

```
[multi_equip_window align=center]
    [equip_window]
        [equip_part slot=1 vnum=109 attrs="[(1, 10, 4999, 0)]"]
        [equip_part slot=4 vnum=5009 attrs="[(1, 10, 4999, 0)]" sockets="[(0, 28043)]" values="[(0,100)]"]
    [/equip_window]
    [equip_window]
        [equip_part slot=8 vnum=5009 attrs="[(1, 10, 4999, 0)]" sockets="[(0, 28043)]" values="[(1,50)]"]
    [/equip_window]
[/multi_equip_window]
```

#### Explanation:
- A `multi_equip_window` contains two `equip_window` elements.
- The first `equip_window` has two equipment parts in slots 1 and 4.
- The second `equip_window` has one equipment part in slot 8.

---

### `[equip_window]`

The `[equip_window]` BBCode represents a single container for equipment items, organized by slots. This is used to define the layout of equipment parts.

#### Parameters:
- All [above attributes](#universally-available-attributes)

#### Example:

```
[equip_window]
    [equip_part slot=1 vnum=109 attrs="[(1, 10, 4999, 0)]"]
    [equip_part slot=4 vnum=5009 attrs="[(1, 10, 4999, 0)]" sockets="[(0, 28043)]" values="[(0,100)]"]
[/equip_window]
```

#### Explanation:
- The `equip_window` contains two equipment parts: one in slot 1 and another in slot 4.

---

### `[equip_part]`

The `[equip_part]` BBCode represents an individual piece of equipment placed in a specific slot. This BBCode supports additional attributes for item customization.

#### Parameters:
- **`slot`** (mandatory): The slot number where the equipment is placed. See the slot table below for details.
- **`vnum`** (mandatory): The unique identifier of the equipment item.
- **`attrs`** (optional): A list of attributes assigned to the item. Each attribute is defined as a tuple `(index, type, value, lock)`:
  - **`index`**: The index of the attribute (0 = first, 1 = second, ... until attr max num).
  - **`type`**: The APPLY_TYPE of the attribute.
  - **`value`**: The value of the attribute.
  - **`lock`**: 1 for "locked" attribute and 0 for normal.
- **`values`** (optional): A list of specific values assigned to the item. Each value is defined as a tuple `(index, amount)`:
  - **`index`**: The index of the value for weapon and armor base stats (the total stats is computed adding the "up" valueN in theproto).
    - Index 0 = Base Magic Attack Power
    - Index 1 = Base Physical Attack Power
    - Index 2 = Base Physical Defense
    - Index 3 = Base Magic Defense
  - **`amount`**: The specific amount for the value.
- **`sockets`** (optional): A list of socket data for the item. Each socket is defined as a tuple `(index, value)`:
  - **`index`**: The index of the socket (0, 1, 2 for stones and refined material).
  - **`value`**: The value or ID associated with the socket content (for stones and refined material, use their vnum).

#### Slot Index Reference:
Each slot corresponds to a specific part of the equipment layout:

| **Slot** | **Description**     |
|----------|---------------------|
| 0        | Armor               |
| 1        | Helmet              |
| 2        | Boots               |
| 3        | Wrist/Bracelet      |
| 4        | Weapon              |
| 5        | Necklace            |
| 6        | Earring             |
| 7        | Shield              |
| 8        | Slot Item 1         |
| 9        | Slot Item 2         |
| 10       | Slot Item 3         |
| 11       | Artifacts           |
| 13       | Belt                |

#### Example:

```
[equip_part slot=4 vnum=5009 attrs="[(1, 10, 4999, 0)]" sockets="[(0, 28043)]" values="[(0,100)]"]
```

#### Explanation:
- The equipment part is placed in slot 4.
- It has the VNUM `5009`.
- Attributes include a single entry `(0, 10, 5000, 0)`.
- The item has a socket with type `0` and value `28043`.
- The item also has a value `(0, 100)`.

#### Extended Example with Multiple Equip Parts:

```
[equip_window]
    [equip_part slot=1 vnum=109 attrs="[(1, 10, 4999, 0)]"]
    [equip_part slot=4 vnum=5009 attrs="[(1, 10, 4999, 0)]" sockets="[(0, 28043)]" values="[(0,100)]"]
    [equip_part slot=8 vnum=7009 attrs="[(1, 15, 2500, 10)]" sockets="[(1, 28044)]" values="[(2,50)]"]
[/equip_window]
```

#### Explanation:
- The `equip_window` contains three `equip_part` elements.
- Slot 1 contains an item with VNUM `109`.
- Slot 4 contains an item with VNUM `5009` and additional attributes, sockets, and values.
- Slot 8 contains an item with VNUM `7009` with different attributes, sockets, and values.

---
