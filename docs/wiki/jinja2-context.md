---
title: UCHTML Jinja2 Embedded Context
displayed_sidebar: mainSidebar
---
# UCHTML Jinja2 Embedded Context

This document outlines the utility functions and variables embedded by default in `UCHTML`. These functions assist with variable management and basic validations within the templating system.

## `interfacemodule` Namespace
The **interfacemodule** object provides access to all interfaceModule functions, this object is ment for advanced internal use and needs knoewldge over the Python code handling the game interface.

## `func` Namespace

### func.getv

**Name:** `getv`  

**Parameters:**
  - `key`: (String) The key to retrieve from the context.
  - `default`: (Optional) The default value to return if the key is not found.

**Return:**
  - The value associated with the key after processing by the `var` function.

**Call Example:**
```html
{% set value = fun.getv("query:example", "default_value") %}
```

### func.getvi

**Name:** `getvi`  

**Parameters:**
  - `key`: (String) The key to retrieve from the context.
  - `default`: (Optional, default=0) The default value if the key is not found.

**Return:**
  - An integer value converted from the retrieved variable.

**Call Example:**
```html
{% set number = fun.getvi("query:number", 10) %}
```

### func.setv

**Name:** `setv`  

**Parameters:**
  - `key`: (String) The key to set in the context.
  - `value`: The value to store; processed via the `var` function.
  - `reload`: (Boolean, default=True) Determines whether to trigger a page reload after setting the variable.

**Return:**
  - None (Updates the context and may trigger a reload).

**Call Example:**
```html
{% set _ = fun.setv("user:status", "active") %}
```

### func.var

**Name:** `var`  

**Parameters:**
  - `data`: The data to process.
  - `default`: (Optional) A default value used if `data` is not provided.

**Return:**
  - The processed data, where:
    - If `data` is a string starting with "packed_query:", it is unpacked using `WikiConfig.PACKED_QUERY`.
    - If `data` is a comma-separated string, it is split into a list.
    - If `default` is a list or tuple and `data` is not, `data` is converted into a list.

**Call Example:**
```html
{% set processed = fun.var("1,2,3", []) %}
```

### func.notempty

**Name:** `notempty`  

**Parameters:**
  - `arg`: The argument to check.

**Return:**
  - A boolean value indicating whether `arg` is not `None` and has a non-zero length.

**Call Example:**
```html
{% if fun.notempty(some_list) %}
  <!-- some_list is not empty -->
{% endif %}
```


# UCHTML Embedded Functions: "game-logic" Namespace

The **game-logic** namespace provides two primary objects, **mob** and **item**, for retrieving and manipulating data about non-player characters (mobs) and items, respectively. Each object offers multiple methods that return dictionaries or lists of dictionaries, enabling you to understand and integrate various game entities into your UCHTML templates.  

Below is a reference for all methods, including the dictionary schema of returned data structures where relevant.


## `mob` Namespace
These methods belong to the **mob** object. They manage data for non-player characters identified by a `vnum`.

### Constants

| Constant            | Description                   |
|---------------------|-------------------------------|
| `mob.MOB_TYPE_NPC`      | Identifies an NPC mob         |
| `mob.MOB_TYPE_MONSTER`  | Identifies a monster mob      |
| `mob.MOB_TYPE_STONE`    | Identifies a stone or ore     |
| `mob.MOB_TYPE_METEOR`   | Identifies a meteor object    |
| `mob.MOB_TYPE_BOSS`     | Identifies a boss mob         |

### mob.get_drops

**Name:** `mob.get_drops`  

**Parameters:**
  - `vnum` (int)  

**Return:**
  - A list of dictionaries representing drop data.
**Return Dictionary Schema (each element of the list):**
```json
{
  "vnum": 72701,
  "vnums": [72701, 72702], // optional
  "count": 1,
  "rarity": 10,
  "type": "drop|limit|quest|stone|kill|common|belt|thiefgloves|dungeon",
  "requirements": {
    "level_limit_min": 1,
    "level_limit_max": 120,
    "days": [],
    "time_from": 0,
    "time_to": 0,
    "max_drop": 0,
    "during_event": "",
    "during_quest": ""
  }
}
```

**Call Example:**
```html
{% set drop_list = mob.get_drops(101) %}
```

### mob.appears_in_quests

**Name:** `mob.appears_in_quests`  

**Parameters:**
  - `vnum` (int)  

**Return:**
  - A list of strings indicating the quests where the mob appears.  

**Call Example:**
```html
{% set quest_ids = mob.appears_in_quests(101) %}
```

### mob.appears_in_dungeons

**Name:** `mob.appears_in_dungeons`  

**Parameters:**
  - `vnum` (int)  

**Return:**
  - A list of dungeon identifiers (strings).  

**Call Example:**
```html
{% set dungeon_list = mob.appears_in_dungeons(101) %}
```

### mob.appears_in_raids

**Name:** `mob.appears_in_raids`  

**Parameters:**
  - `vnum` (int)  

**Return:**
  - A list of strings, each representing a raid zone.  

**Call Example:**
```html
{% set raid_ids = mob.appears_in_raids(101) %}
```

### mob.appears_in_maps

**Name:** `mob.appears_in_maps`  

**Parameters:**
  - `vnum` (int)

**Return:**
  - A list of map indexes (integers).  

**Call Example:**
```html
{% set maps = mob.appears_in_maps(101) %}
```

### mob.sells

**Name:** `mob.sells`  

**Parameters:**
  - `vnum` (int)  

**Return:**
  - A list of dictionaries describing items sold by the mob.  
**Return Dictionary Schema (each element of the list):**
```json
{
  "item_vnum": 30100,
  "count": 1
}
```

**Call Example:**
```html
{% set vendor_items = mob.sells(9003) %}
```

### mob.crafts

**Name:** `mob.crafts`  

**Parameters:**
  - `vnum` (int)

**Return:**
  - A list of cube crafts ids (integers). 

**Call Example:**
```html
{% set craft_list = mob.crafts(9003) %}
```

### mob.spawn_data

**Name:** `mob.spawn_data`  

**Parameters:**
  - `vnum` (int)  

**Return:**
  - A dictionary containing spawn details or **None** if no data is available.  
**Return Dictionary Schema:**
```json
{
  "map_index": {
    "random": false|false,
    "points": [
      {
        "x": xcoord,
        "y": ycoord,
        "time": seconds_to_respawn
      },
    ]
  }
}
```

**Call Example:**
```html
{% set spawn_info = mob.spawn_data(101) %}
```


### mob.get_mob_origin

**Name:** `mob.get_mob_origin`  

**Parameters:**
  - `vnum` (int)

**Return:**
  - A localized string describing the mob’s origin, or **None** if none is defined.  

**Call Example:**
```html
{% set origin = mob.get_mob_origin(101) %}
```

### mob.is_any_of_type

**Name:** `mob.is_any_of_type`  

**Parameters:**
  - `vnum` (int)
  - `*args`: any combination of mob-type constants (e.g. `mob.MOB_TYPE_BOSS`, `mob.MOB_TYPE_NPC`)

**Return:**
  - A boolean indicating if the mob matches **any** of the provided types.  

**Call Example:**
```html
{% if mob.is_any_of_type(101, mob.MOB_TYPE_NPC, mob.MOB_TYPE_MONSTER) %}
  <!-- do something -->
{% endif %}
```

### mob.mob_name

**Name:** `mob.mob_name`  

**Parameters:**
  - `vnum` (int)

**Return:**
  - A UTF-8 decoded string with the mob’s localized name.  

**Call Example:**
```html
{% set name = mob.mob_name(101) %}
```

## `item` Namespace

These methods belong to the **item** object and allow you to query item data by `vnum`.

## Constants

| Constant                   | Description                                 |
|----------------------------|---------------------------------------------|
| `ITEM_TYPE_WEAPON`         | Weapon-type item                            |
| `ITEM_TYPE_ARMOR`          | Armor item (body, depending on subtype)     |
| `ITEM_TYPE_HELMET`         | Helmet-type item                            |
| `ITEM_TYPE_SHIELD`         | Shield-type item                            |
| `ITEM_TYPE_EARINGS`        | Earring-type item                           |
| `ITEM_TYPE_NECK`           | Necklace-type item                          |
| `ITEM_TYPE_BRACELET`       | Bracelet-type item                          |
| `ITEM_TYPE_BOOTS`          | Boots-type item                             |
| `ITEM_TYPE_BELT`           | Belt-type item                              |
| `ITEM_TYPE_ARTIFACT`       | Artifact item                               |
| `ITEM_TYPE_SHINING`        | Shining-type item                           |
| `ITEM_TYPE_COSTUME`        | Costume item                                |
| `ITEM_TYPE_COSTUME_PET`    | Pet costume item                            |
| `ITEM_TYPE_COSTUME_MOUNT`  | Mount costume item                          |
| `ITEM_TYPE_CHEST`          | Chest/box item                              |


### item.get_base_vnum

**Name:** `item.get_base_vnum`  

**Parameters:**
  - `vnum` (int)

**Return:**
  - An integer representing the base vnum of the item. Returns `0` if none is found.  

**Call Example:**
```html
{% set base_id = item.get_base_vnum(72701) %}
```

### item.get_refine_count

**Name:** `item.get_refine_count`  

**Parameters:**
  - `vnum` (int)

**Return:**
  - An integer indicating how many times the item has been refined.  

**Call Example:**
```html
{% set refine_times = item.get_refine_count(72701) %}
```

### item.get_in_chest

**Name:** `item.get_in_chest`  

**Parameters:**
  - `vnum` (int)

**Return:**
  - A list of chest vnums (integers) that may contain this item.  

**Call Example:**
```html
{% set chest_list = item.get_in_chest(30100) %}
```

### item.get_chest_content

**Name:** `item.get_chest_content`  

**Parameters:**
  - `vnum` (int)

**Return:**
  - A dictionary describing the chest content, or **None** if the item is not a chest.  
**Return Dictionary Schema (example):**
```json
{
  "multidrop": "all" | false | number,
  "items": [
    {
      "vnum": 72702,
      "count": 1,
      "rarity": 5
    }
  ]
}
```

**Call Example:**
```html
{% set chest_data = item.get_chest_content(30100) %}
```

### item.get_item_drop_by

**Name:** `item.get_item_drop_by`  

**Parameters:**
  - `vnum` (int)

**Return:**
  - A list of dictionaries detailing which mobs drop this item.  
**Return Dictionary Schema (each element of the list):**
```json
{
  "mob_rank": "BOSS",
  "mob_vnum": 101,
  "quest": "quest_name",
  "type": "drop|limit|quest|stone|kill|common|belt|thiefgloves|dungeon",
  "rarity": 10
}
```

**Call Example:**
```html
{% set drop_data = item.get_item_drop_by(72701) %}
```

### item.get_item_sold_by

**Name:** `item.get_item_sold_by`  

**Parameters:**
  - `vnum` (int)

**Return:**
  - A list of dictionaries specifying which NPCs sell this item.  
**Return Dictionary Schema (each element):**
```json
{
  "npc_vnum": 9003
}
```

**Call Example:**
```html
{% set vendor_list = item.get_item_sold_by(72701) %}
```

### item.get_item_drop_by_mobs

**Name:** `item.get_item_drop_by_mobs`  

**Parameters:**
  - `vnum` (int)

**Return:**
  - A list of mob vnums (integers) that can drop the specified item.  

**Call Example:**
```html
{% set mob_list = item.get_item_drop_by_mobs(72701) %}
```

### item.get_in_quests

**Name:** `item.get_in_quests`  

**Parameters:**
  - `vnum` (int)

**Return:**
  - A list of dictionaries indicating quests, dungeons, or raids in which this item appears.  
**Return Dictionary Schema (each element):**
```json
{
  "type": "quest|dungeon|raid",
  "identifier": "quest_or_dungeon_name"
}
```

**Call Example:**
```html
{% set quest_info = item.get_in_quests(72701) %}
```

### item.get_reward_of

**Name:** `item.get_reward_of`  

**Parameters:**
  - `vnum` (int)

**Return:**
  - A list of dictionaries indicating which quests or activities reward this item.  
**Return Dictionary Schema (each element):**
```json
{
  "type": "quest|dungeon|raid",
  "identifier": "quest_or_dungeon_name"
}
```

**Call Example:**
```html
{% set reward_data = item.get_reward_of(72701) %}
```

### item.is_upgrade_material_for

**Name:** `item.is_upgrade_material_for`  

**Parameters:**
  - `vnum` (int)

**Return:**
  - A list of item vnums (integers) that can be upgraded using the specified item as a material.  

**Call Example:**
```html
{% set upgrade_targets = item.is_upgrade_material_for(30090) %}
```

### item.get_cubes_as_material

**Name:** `item.get_cubes_as_material`  

**Parameters:**
  - `vnum` (int)

**Return:**
  - A list of cube definitions describing how this item is used as a material in crafting. Each definition may include fields such as `"npc"`, `"reward"`, `"gold"`, `"percent"`, and `"materials"`.  

**Call Example:**
```html
{% set material_cubes = item.get_cubes_as_material(72701) %}
```

### item.get_cubes_as_result

**Name:** `item.get_cubes_as_result`  

**Parameters:**
  - `vnum` (int)

**Return:**
  - A list of cube definitions indicating how this item is produced as a result of crafting.  

**Call Example:**
```html
{% set result_cubes = item.get_cubes_as_result(72701) %}
```

### item.has_upgrade

**Name:** `item.has_upgrade`  

**Parameters:**
  - `vnum` (int)

**Return:**
  - A boolean indicating if the item is part of an upgrade chain (returns **True**) or not (returns **False**).  

**Call Example:**
```html
{% if item.has_upgrade(72701) %}
  <!-- This item has an upgrade path -->
{% endif %}
```

### item.get_upgrade_level

**Name:** `item.get_upgrade_level`  

**Parameters:**
  - `vnum` (int)

**Return:**
  - An integer denoting the item’s upgrade level (e.g., +0, +1, +2...). Returns **-1** if the item cannot be upgraded.  

**Call Example:**
```html
{% set level = item.get_upgrade_level(72701) %}
```

### item.can_show_stats

**Name:** `item.can_show_stats`  

**Parameters:**
  - `vnum` (int)

**Return:**
  - Either an integer (the item’s base vnum) if the item can display stats, or **False** if it cannot.  

**Call Example:**
```html
{% set stats_base_vnum = item.can_show_stats(72701) %}
```

### item.get_item_origin

**Name:** `item.get_item_origin`  

**Parameters:**
  - `vnum` (int)

**Return:**
  - A localized string describing the item’s origin, or **None** if none is defined.  

**Call Example:**
```html
{% set origin_string = item.get_item_origin(72701) %}
```

### item.is_any_of_type

**Name:** `item.is_any_of_type`  

**Parameters:**
  - `vnum` (int)
  - `*args`: any combination of item-type constants (e.g. `item.ITEM_TYPE_COSTUME`)  

**Return:**
  - A boolean indicating if the item matches **any** of the specified types.  

**Call Example:**
```html
{% if item.is_any_of_type(72701, item.ITEM_TYPE_COSTUME, item.ITEM_TYPE_SHIELD) %}
  <!-- It's either a costume or a shield -->
{% endif %}
```

### item.item_name

**Name:** `item.item_name`  

**Parameters:**
  - `vnum` (int)

**Return:**
  - A UTF-8 decoded string with the item’s localized name.  

**Call Example:**
```html
{% set name = item.item_name(72701) %}
```

### item.item_desc

**Name:** `item.item_desc`  

**Parameters:**
  - `vnum` (int)

**Return:**
  - A UTF-8 decoded string representing the item’s full description (with `|` replaced by newlines).  

**Call Example:**
```html
{% set description = item.item_desc(72701) %}
```

### item.item_summary

**Name:** `item.item_summary`  

**Parameters:**
  - `vnum` (int)

**Return:**
  - A UTF-8 decoded summary string for the item (often a shortened form of the description).  

**Call Example:**
```html
{% set summary_text = item.item_summary(72701) %}
```


## `world` Namespace

The **world** object provides advanced game data handling. It integrates **items**, **mobs**, and **cube** or **refine** logic to give you higher-level methods that retrieve upgrade paths, refine sets, grouped drop info, and more. Each method is outlined below, with its parameters, return values, and expected data schemas for developers.

### world.item_has_epic_upgrade

**Name:** `world.item_has_epic_upgrade`  

**Parameters:**  
  - `vnum` (int)  

**Return:**  
  - A boolean indicating whether the item or any of its upgrades has an epic refinement path.  

**Call Example:**
```html
{% if world.item_has_epic_upgrade(189) %}
  <!-- Item has epic refine path -->
{% endif %}
```

---

### world.item_get_last_refine_vnum

**Name:** `world.item_get_last_refine_vnum`  

**Parameters:**  
  - `vnum` (int)  

**Return:**  
  - An integer representing the final item vnum in the item’s upgrade sequence. Returns `0` if none is found.  

**Call Example:**
```html
{% set final_vnum = world.item_get_last_refine_vnum(189) %}
```

---

### world.item_get_dropby_grouped

**Name:** `world.item_get_dropby_grouped`  

**Parameters:**  
  - `vnum` (int)  

**Return:**  
  - A dictionary grouping drop entries by their `"type"` field. Keys are drop types, values are lists of drop data dictionaries. If the item has multiple upgrades, entries are appended with `"item_vnum"` to indicate which upgrade stage the drop pertains to.  
**Return Dictionary Schema (example):**
```json
{
  "drop": [
    {
      "mob_rank": "BOSS",
      "mob_vnum": 101,
      "quest": "quest_name",
      "type": "drop",
      "rarity": 10,
      "item_vnum": 189
    },
    {
      "mob_rank": "BOSS",
      "mob_vnum": 101,
      "quest": "quest_name",
      "type": "drop",
      "rarity": 10,
      "item_vnum": 190
    }
  ],
  "quest": [],
  "stone": []
}
```

**Call Example:**
```html
{% set drop_groups = world.item_get_dropby_grouped(189) %}
```

---

### world.item_get_sold_by_all_upgrades

**Name:** `world.item_get_sold_by_all_upgrades`  

**Parameters:**  
  - `vnum` (int)  

**Return:**  
  - A list of dictionaries describing which NPCs sell the item or any of its upgrades. Each dictionary may include an `"npc_vnum"` field.  

**Call Example:**
```html
{% set all_vendors = world.item_get_sold_by_all_upgrades(189) %}
```

---

### world.item_get_in_chests_all_upgrades

**Name:** `world.item_get_in_chests_all_upgrades`  

**Parameters:**  
  - `vnum` (int)  

**Return:**  
  - A list of chest vnums (integers). Combines all chests that contain any upgrade level of the specified item.  

**Call Example:**
```html
{% set chests = world.item_get_in_chests_all_upgrades(189) %}
```

---

### world.item_get_in_quests_all_upgrades

**Name:** `world.item_get_in_quests_all_upgrades`  

**Parameters:**  
  - `vnum` (int)  

**Return:**  
  - A list of dictionaries describing the quests, dungeons, or raids in which this item (or any of its upgrades) appears. Duplicate entries are filtered out.  
**Return Dictionary Schema (each element):**
```json
{
  "type": "quest|dungeon|raid",
  "identifier": "name_of_quest_or_dungeon"
}
```

**Call Example:**
```html
{% set quest_data = world.item_get_in_quests_all_upgrades(189) %}
```

---

### world.item_get_reward_of_all_upgrades

**Name:** `world.item_get_reward_of_all_upgrades`  

**Parameters:**  
  - `vnum` (int)  

**Return:**  
  - A list of dictionaries indicating which quests or activities reward the item or any of its upgrades. The returned list is sorted by `"type"` and `"identifier"`.  
**Return Dictionary Schema (each element):**
```json
{
  "type": "quest|dungeon|raid",
  "identifier": "quest_or_dungeon_name",
  "vnum": 189
}
```

**Call Example:**
```html
{% set rewards = world.item_get_reward_of_all_upgrades(189) %}
```

---

### world.item_is_chest

**Name:** `world.item_is_chest`  

**Parameters:**  
  - `vnum` (int)  

**Return:**  
  - Chest content data (dictionary) if the item is indeed a chest, or **None** otherwise. Equivalent to `item.item_data.get_chest_content(vnum)`.  

**Call Example:**
```html
{% if world.item_is_chest(30100) %}
  <!-- It's a chest or box -->
{% endif %}
```

---

### world.item_get_cube_as_material

**Name:** `world.item_get_cube_as_material`  

**Parameters:**  
  - `vnum` (int)
  - `group_by_npc` (bool, default=False)  

**Return:**  
  - If `group_by_npc == False`: A list of cube definitions.  
  - If `group_by_npc == True`: A dictionary grouped by the `"npc"` field.  
**Return Schema (Ungrouped):**
```json
[
  {
    "npc": 20018,
    "reward": {
      "vnum": 50821,
      "count": 1
    },
    "gold": 10000,
    "percent": 100,
    "materials": [
      {
        "vnum": 102505,
        "count": 10
      },
      {
        "vnum": 27995,
        "count": 5
      }
    ]
  },
  ...
]
```

**Return Schema (Grouped by NPC):**
```json
{
  "20018": [
    {
      "npc": 20018,
      "reward": {
        "vnum": 50821,
        "count": 1
      },
      "gold": 10000,
      "percent": 100,
      "materials": [
        {
          "vnum": 102505,
          "count": 10
        },
        {
          "vnum": 27995,
          "count": 5
        }
      ]
    },
    ...
  ],
  "20019": [
    {
      ...
    }
  ]
}
```

**Call Example:**
```html
{% set cubes = world.item_get_cube_as_material(72701, True) %}
```

---

### world.item_get_cube_as_result

**Name:** `world.item_get_cube_as_result`  

**Parameters:**  
  - `vnum` (int)
  - `group_by_npc` (bool, default=False)  

**Return:**  
  - If `group_by_npc == False`: A list of cube definitions (same schema as `item_get_cube_as_material`).  
  - If `group_by_npc == True`: A dictionary grouped by `"npc"`.  
**Return Schema (Ungrouped):**
```json
[
  {
    "npc": 20018,
    "reward": {
      "vnum": 50821,
      "count": 1
    },
    "gold": 10000,
    "percent": 100,
    "materials": [
      {
        "vnum": 102505,
        "count": 10
      },
      {
        "vnum": 27995,
        "count": 5
      }
    ]
  },
  ...
]
```

**Return Schema (Grouped by NPC):**
```json
{
  "20018": [
    {
      "npc": 20018,
      "reward": {
        "vnum": 50821,
        "count": 1
      },
      "gold": 10000,
      "percent": 100,
      "materials": [
        {
          "vnum": 102505,
          "count": 10
        },
        {
          "vnum": 27995,
          "count": 5
        }
      ]
    },
    ...
  ],
  "20019": [
    {
      ...
    }
  ]
}
```

**Call Example:**
```html
{% set cubes_result = world.item_get_cube_as_result(72701) %}
```

---

### world.mob_get_crafts

**Name:** `world.mob_get_crafts`  

**Parameters:**  
  - `vnum` (int) — The mob’s vnum.  

**Return:**  
  - A list (or map object in Python) containing cube definitions for crafts associated with the specified mob. The cube definition follows the same structure used by `cube.json`.  

**Call Example:**
```html
{% set mob_crafts = world.mob_get_crafts(9003) %}
```
