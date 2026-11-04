---
title: "Data namespace: item"
description: Reference for the item namespace of the wiki template context.
displayed_sidebar: mainSidebar
---

# Data namespace: item

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
**Return Dictionary Schema (each element):** same as `item.get_in_quests`.

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
