---
title: Wiki Configuration
displayed_sidebar: mainSidebar
---

# Wiki Configuration and Localization Documentation

This documentation explains how the Wiki configuration file and the localization file work together.  
Each section includes detailed explanations and complete examples to help you understand how to customize and maintain your Wiki.

## What is YAML and Common Pitfalls

YAML is a human-friendly data serialization language commonly used for configuration files. Its are readability and ease of editing lead the choice of using it as gonfiguration language instead of `json`, but it has some pitfalls:

- **Indentation Matters:** YAML relies on correct indentation using spaces. Mixing tabs and spaces or using inconsistent indentation can lead to parsing errors.
- **Data Structure Sensitivity:** The structure (lists and dictionaries) depends entirely on indentation. A small mistake can change the hierarchy of your data.
- **Quotes and Special Characters:** Use quotes when needed, but be consistent. Improper quoting may cause errors or misinterpretation of values.

*Example of correct YAML syntax:*
```yaml
PACKED_QUERY:
  NEW_FILTER: [101, 102, 103, 104]
```  
Ensure every nested level is indented equally (usually 2 spaces) and avoid tabs.

## How Configuration Binds with Localization

The configuration file (`config.yaml`) uses keys that map directly to entries in the localization file (`locale.json`). The keys use dot notation to indicate hierarchy. For example, the locale key `"items.origin.fishing"` in the configuration corresponds to a nested entry in the localization file

*Example:*
For example `"items.origin.fishing"` key will select the string associated to the below locale tree
```json
{
    "items": {
        "origin": {
            "fishing": "Obtanable fishing"
        }
    }
}
```

## File Locations

All configuration and localization files are located within the locale directory for each supported language:
- **Configuration File:** `locale/[localization]/config.yaml`
- **Whitelists File:** `locale/[localization]/whitelists.yaml`
- **Localization File:** `locale/[localization]/locale.json`

These files are essential for the Wiki's operation and should be maintained carefully.

## Range Expansion

To keep configuration files concise, ranges can be specified instead of listing every individual number. This is supported in several sections:
- **config.yaml - PACKED_QUERY**
- **config.yaml - ITEM_ORIGIN_LOCALE_MAPPING**
- **config.yaml - MOB_ORIGIN_LOCALE_MAPPING**
- **whitelists.yaml - ITEM_WHITELIST**
- **whitelists.yaml - MOB_WHITELIST**

A range is defined with a `range` key, for example:

```yaml
- range: [10, 19]
```  
This instructs the system to expand the range into all integers from 10 to 19. This method reduces repetition and minimizes errors when listing many sequential values.  
Ranges can be combined with normal numbers:

```yaml
MOB_WHITELIST:
  - 501
  - 502
  - 504
  - 101
  - range: [102, 115]
  - 10001
```  

## config.yaml
Below the sections of `config.yaml` are explained.

### PACKED_QUERY

**What It Is and Its Purpose:**  
`PACKED_QUERY` defines groups of item or filter identifiers (vnums) used to set filter target values and URL parameters. When a template uses a value like `"packed_query:HELMETS_WARRIOR"`, the `fun.Var` function recognizes it and replaces it with a comma-separated list of numbers from the PACKED_QUERY section.

:::caution

Since `PACKED_QUERY` are expected to be lists, it is important to pass an empty array as second parameter of `fun.getv("query:vnums", [])`, to force **UCHTML** engine to return a list.

:::

**Example – Creating a New Packed Query and using it as filger:**

*Configuration (in `config.yaml`):*

```yaml
PACKED_QUERY:
  NEW_FILTER: [101, 102, 103, 104]
```  

*Usage in a Template:*

```html
<div width="auto">
    <filter-group type="buttons" default="packed_query:ARMORS_WARRIOR" align="center" filter-target="query:race">
        <filter type="button" path="d:/ymir work/ui/wiki/class_w_{}.tga" filter-value="packed_query:NEW_FILTER"/>
        <filter type="button" path="d:/ymir work/ui/wiki/class_n_{}.tga" filter-value="packed_query:OLD_FILTER"/>
    </filter-group>
</div>
<main>
    <lazy-div>
        {% for value in fun.getv("query:race", []) %}
            <item-stats width="auto" vnum="{{ value }}"/>
            <spacer height="5" />
        {% endfor %}
    </lazy-div>
</main>
```

When one of the buttons (filter) is clicked, the page puts `packed_query:NEW_FILTER` or `packed_query:OLD_FILTER` in the variable `query:race`.  
Then using `fun.getv("query:race", [])` we can unpack and use the single values to iterate over them and, for example, place an [`<item-stats>`](./ui-components.md#item-stats) for each vnum.

**Example – Using PACKED_QUERY as a Category/Hyperlink Parameter:**

*Configuration (in `config.yaml`):*
```yaml
PACKED_QUERY:
  SPECIAL_ITEMS: [201, 202, 203]
```  

*Usage in a Category Link:*
```jinja
<a href="wiki://p/items/special?vnums=packed_query:SPECIAL_ITEMS">
  Special Items
</a>
```

:::note

The hyperling will carry the information that `vnums` is the shothand for `[201, 202, 203]` and whe can later use it in a page (in this case `items/special.html`)

:::

*Usage in `items/special.html`:*

```jinja
{% set new_filter = fun.getv("query:vnums", []) %}
<lazy-div>
    {% for value in new_filter %}
        <item-stats width="auto" vnum="{{ value }}"/>
        <spacer height="5" />
    {% endfor %}
</lazy-div>
```

The for loop will iterate over **all values** defined in `config.yaml` (201, 202, 203)

### ITEM_ORIGIN_LOCALE_MAPPING & MOB_ORIGIN_LOCALE_MAPPING

**What Is It and How It Works:**  
The Mob/Item Origin sections (`ITEM_ORIGIN_LOCALE_MAPPING` and `MOB_ORIGIN_LOCALE_MAPPING`) map specific vnums to locale keys. This means that any mob or item whose vnum is listed in these mappings will have its "origin" automatically set to the corresponding localized string when using functions like `mob.get_mob_origin(vnum)` or `item.get_item_origin(vnum)`. 

Tags such as `<monster-card>` and `<chest-card>` will display this origin information.

**Example – Creating a New Origin Group:**

*Configuration (in `config.yaml`):*
```yaml
ITEM_ORIGIN_LOCALE_MAPPING:
  "items.origin.mystic": [50001, 50002, 50003]
  
MOB_ORIGIN_LOCALE_MAPPING:
  "mobs.origin.forest":
    - range: [600, 610]
``` 

*Localization (in `locale.json`):*
```json
{
    "items": {
        "origin": {
            "mystic": "Mystic Lands"
        }
    },
    "mobs": {
        "origin": {
            "forest": "Brave Forest"
        }
    }
}
```

*Expected Behavior:*  
- When `item.get_item_origin(50002)` is called, it will find the locale key `"items.origin.mystic"` and display the corresponding localized string **Mystic Lands**.
- Similarly, `mob.get_mob_origin(605)` will return the localized string for `"mobs.origin.forest"` **Brave Forest**.

### QUEST_NAMES, RAID_NAMES, DUNGEON_NAMES, MAP_INFO

These configuration sections associate identifiers with locale keys (and in the case of MAP_INFO, additional properties) to be used in hyperlink tags.

#### QUEST_NAMES
`QUEST_NAMES` Associates quest IDs with locale keys.

  *Example:*
  ```yaml
  QUEST_NAMES:
    ue_main_quest_lv10: "quest_names.ue_main_quest_lv10"
    ue_main_quest_lv25: "quest_names.ue_main_quest_lv25"
    ue_main_quest_lv40: "quest_names.ue_main_quest_lv40"
  ```
  
#### RAID_NAMES 
`RAID_NAMES` Maps raid IDs to locale keys.

  *Example:*
  ```yaml
  RAID_NAMES:
    ue_raid_solo_rounds_1: "raid_names.ue_raid_solo_rounds_1"
    ue_miliarstone_raid: "raid_names.ue_miliarstone_raid"
  ```
  
#### DUNGEON_NAMES 
`DUNGEON_NAMES` Associates dungeon IDs with locale keys.

  *Example:*
  ```yaml
  DUNGEON_NAMES:
    ue_dungeon_30min_specquest: dungeon_names.ue_dungeon_30min_specquest
    ue_dungeon_diseased_peak: dungeon_names.ue_dungeon_diseased_peak
  ```
  
#### MAP_INFO 
`MAP_INFO` Contains map IDs, each mapping to an object with a `name` (locale key) and a `path`. The `path` is used by tags like `<atlas-info>` and `<monster-spawn>` to load atlas images.

  *Example:*
  ```yaml
  MAP_INFO:
    "61":
      name: "maps.snow"
      path: map_n_snowm_01
    "63":
      name: "maps.desert"
      path: metin2_map_n_desert_01
  ```

----

*Localization (in `locale.json`) for above entries:*

```json
{
  "quest_names": {
    "ue_main_quest_lv10": "Main Quest Level 10",
    "ue_main_quest_lv25": "Main Quest Level 25",
    "ue_main_quest_lv40": "Main Quest Level 40"
  },
  "raid_names": {
    "ue_raid_solo_rounds_1": "Solo Rounds Raid",
    "ue_miliarstone_raid": "Miliarstone Raid"
  },
  "dungeon_names": {
    "ue_dungeon_30min_specquest": "30-Minute Special Quest Dungeon",
    "ue_dungeon_diseased_peak": "Diseased Peak Dungeon"
  },
  "maps": {
    "snow": "Snow Map",
    "desert": "Desert Map"
  }
}
```


### WIKI_CATEGORIES

**What It Does:**  
`WIKI_CATEGORIES` defines the navigational structure of the Wiki by creating a category-subcategory tree. Each category can have multiple subcategories, each linking to a Wiki page.

**Example – Creating a New Category-Subcategory:**

*Configuration (in `config.yaml`):*
```yaml
WIKI_CATEGORIES:
  - category: "categories.equipment"
    subcategories:
      - name: "subcategories.equipment.new_weapons"
        url: "wiki://p/items/new_weapons"
      - name: "subcategories.equipment.new_armor"
        url: "wiki://p/items/new_armors"
```

*Locale Example (in `locale.json`):*
```json
{
  "categories": {
    "equipment": "Equipment"
  },
  "subcategories": {
    "equipment": {
      "new_weapons": "New Weapons",
      "new_armor": "New Armor"
    }
  }
}
```
This configuration creates a new category called "Equipment" with subcategories "New Weapons" and "New Armor", linking to their respective Wiki pages.

### INDEXED_PAGES

**What It Does:**  
`INDEXED_PAGES` lists the Wiki pages that are indexed by the search engine. Each entry specifies a category, a title, and a URL.  
**Mobs** and **Items** are indexed automatically (following [Whitelists](#itemmob-whitelists) rules). All other custom pages like dungeons, systems, guides need to be manually indexed.  

:::caution

Page not indexed are not returned from the search bar.

:::

**Example – Adding a Document to the Search Engine:**

*Configuration (in `config.yaml`):*
```yaml
INDEXED_PAGES:
  - category: dungeon
    title: dungeon_names.new_dungeon
    url: "wiki://p/dungeons/new_dungeon"
```
This entry makes the new dungeon page searchable and categorizes it under "dungeon".

*Locale Example (in `locale.json`):*
```json
{
  "dungeon_names": {
    "new_dungeon": "A Fresh new Dungeon"
  },
}
```

### SEARCH_RESULT_CATEGORY

**What It Does:**  
`SEARCH_RESULT_CATEGORY` configures how search results are grouped and displayed. Each category has a defined color and a display name used in the search result visualization.  
The category defined in [INDEXED_PAGES](#indexed_pages) refers to this section. When a page with a given category is returned, the name of category is appended in front of the page name in the search result list.

**Example – Creating a New Search Result Category:**

*Configuration (in `config.yaml`):*
```yaml
SEARCH_RESULT_CATEGORY:
  item:
    color: fffa4834
    name: results_category.item
  dungeon:
    color: fffa4834
    name: results_category.dungeon
  new_category:
    color: ffaabbcc
    name: results_category.new_category
```
This configuration adds a new search result category called "new_category" with the specified color.

*Locale Example (in `locale.json`):*
```json
{
  "results_category": {
    "item": "Items",
    "dungeon": "Dungeon",
    "new_category": "New Sparkly Category",
  },
}
```

-----

Using the above [INDEXED_PAGES](#indexed_pages) example, the page indexed will return as:

```
[Dungeon] A Fresh new Dungeon 
```

## whitelists.yaml
## ITEM/MOB Whitelists

**What They Are:**  
Whitelists control which item and mob vnums are enabled for search and Wiki build. Only those included in the whitelist will be processed and displayed in the Wiki.

**Example – Modifying Whitelists:**

*ITEM_WHITELIST (in `whitelists.yaml`):*
```yaml
ITEM_WHITELIST:
  - 1
  - 2
  - 3
  - 4
  - 5
  - 6
  - 7
  - 8
  - 9
  - range: [10, 19]
  - 100
```

*MOB_WHITELIST (in `whitelists.yaml`):*
```yaml
MOB_WHITELIST:
  - 107
  - 109
  - 113
  - 115
  - 401
  - 402
  - 501
  - 502
  - 504
  - 101
  - range: [102, 115]
  - 404
  - 405
  - range: [191, 194]
  - range: [493, 496]
```
To add a new mob, simply add its vnum (or a range) to the corresponding list. To remove one, delete it from the list.
