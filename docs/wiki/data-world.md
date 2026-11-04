---
title: "Data namespace: world"
description: Reference for the world namespace of the wiki template context.
displayed_sidebar: mainSidebar
---

# Data namespace: world

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
**Return Schema (Ungrouped and Grouped by NPC):** same as `world.item_get_cube_as_material`.

**Call Example:**
```html
{% set cubes_result = world.item_get_cube_as_result(72701) %}
```

---

### world.mob_get_crafts

**Name:** `world.mob_get_crafts`  

**Parameters:**  
  - `vnum` (int): The mob’s vnum.  

**Return:**  
  - A list (or map object in Python) containing cube definitions for crafts associated with the specified mob. The cube definition follows the same structure used by `cube.json`.  

**Call Example:**
```html
{% set mob_crafts = world.mob_get_crafts(9003) %}
```
