---
title: Wiki Data Generation
displayed_sidebar: mainSidebar
---

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
            # positional per up
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
        "refine_epicization": [
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
        "refine_material": [item1, item2],
        "crafted": [
            {
                "npc": npc,
                "result": vnum,
                "gold": 100,
                "improve": {
                    "vnum": vnum,
                    "count": 20,
                    "pct": 90
                },
                "materials": [
                    {
                        "vnum": vnum,
                        "count": count
                    }
                ]
            }
        ],
        "craft_material": [result1, result2],
        "drop_by": {
            {
                "mob_rank": rank,
                "mob_vnum": vnum,
                "quest": quest,
                "type": "limit|quest|stone|kill|drop|common|belt|thiefgloves|dungeon",
                "rarity": number,
            }
        },
        "in_chest": [chest1, chest2],
        "in_quest": [
            {
                "type": "quest|dungeon|raid",
                "identifier": "name"
            }
        ],
        "chest_content": {
            "multidrop": false|"all"|number,
            "items": {
                "vnum": vnum,
                "count": count,
                "rarity": number
            }
        },
        "reward_of": [
            {
                "type": "quest|dungeon|raid",
                "identifier": "name"
            }
        ],
        "sold_by": [
            {
                "npc_vnum": vnum
            }
        ]
        "in_cube": {
            "as_material" : [cube1, cube2],
            "as_result" : [cube1, cube2],
        }
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
                "count": 1,
            }
        ]
        "crafts_cube": [cube1, cube2],
          "spawn": {
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
