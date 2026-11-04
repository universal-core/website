---
title: Wiki Data Generation
displayed_sidebar: mainSidebar
---

# Wiki Data

Wiki pages never carry game facts by hand. Item, mob, shop, refine, cube and quest facts are generated offline from the server's own files into static JSON that the client reads from its pack. A page asks for them through the `item`, `mob`, `quest` and `world` namespaces of the [template context](../uchtml/jinja2-context.md).

The tool that generates and edits all of this is the **Wiki Manager**, a desktop application (PyQt) with one tab per task.

## Where the facts come from

The builder reads the server's side of the game:

| Source | Gives |
| --- | --- |
| `item_proto.txt`, `mob_proto.txt`, `mob_adaptive_proto.txt` in the prototypes folder | Items and mobs. |
| `group.txt`, `group_group.txt`, `cube.txt` in the server locale folder | Mob groups and crafting recipes. |
| The server locale's shop and refine data, its map folder and the regen folders for cron, domain, event and dungeon data | Shops, refines and spawns. |
| The interpreted quests | Drops, spawns, rewards and quest records that only exist inside quest scripts. |

### Interpreted quests

Quest scripts are Lua programs, so their rewards and spawns cannot be read like a table. The Wiki Manager's **Interpreter** tab reads each quest script, expands the reward tables, and asks a language model (an OpenAI-compatible chat API, configured with a provider, a model and a key in the tab) to return one JSON record for it: quest type, maps and spawns, drops, rewards, reward choices, involved mobs and items, primary NPC, minimum level, unlocked quests and questline. The prompt tells the model to leave a field out when the script does not state it and to ignore commented-out code.

The records are saved as one JSON file per quest in the interpreted quest folder. The builder reads that folder; it never calls the model. You run the interpreter again only for quests that changed, and you review the resulting records like any other generated data.

## Output Files

A build writes six files into the wiki folder (`locale/[localization]/wiki`):

| File | Holds |
| --- | --- |
| `items.json` | Items: refines, shops, drops, chests, quests, crafts. |
| `mobs.json` | Mobs: drops, spawns, shops, crafts, kill rewards. |
| `cube.json` | Crafting recipes. |
| `refine_trees.json` | Upgrade chains. |
| `refine_sets.json` | Refine material sets. |
| `quests.json` | Quest records, read through the `quest` namespace. |

and two reports into the builder's own `build` folder, `mobs_by_map.json` and `mobs_without_map.json`, which list the spawn data per map and the mobs that no map reaches.

## File Formats

### `items.json`
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
            "items": [
                {
                    "vnum": vnum,
                    "count": count,
                    "rarity": number
                }
            ]
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

### `mobs.json`
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

## Editable Files

`items_ex.json` and `mobs_ex.json` live next to the generated files and are written by hand, never by the builder. The client deep-merges them over `items.json` and `mobs.json` when it loads, so use them for data the pipeline does not capture. A rebuild overwrites `items.json` and `mobs.json`, and leaves the `_ex` files alone.

---

## Running the Pipeline

The paths of a build are the prototypes folder, the server locale folder, the interpreted quest folder and the output folder. The Wiki Manager's **Builder** tab shows the defaults and lets you override each one; the same four can be set through the environment variables `WIKI_BUILDER_PROTO_PATH`, `WIKI_BUILDER_LOCALE_PATH`, `WIKI_BUILDER_INTERPRETED_QUEST_PATH` and `WIKI_BUILDER_OUTPUT_PATH`.

1. Install the Wiki Manager requirements (PyQt, ruamel.yaml, PyYAML, lupa, and openai for the Interpreter tab) in a virtual environment.
2. Start the Wiki Manager and open the **Builder** tab.
3. Check the paths and run the builder. It runs eight numbered steps: quests, cubes, shops, refines, items, mobs, quest records, then merge and write.
4. Pack the generated files with the other wiki files.

### Configuration tabs

The other tabs edit the files described in [configuration](./configuration.md) without touching their comments: map info, quest, raid and dungeon names, packed queries, locale strings, origin mappings, indexed pages, search result categories, wiki categories and whitelists.

### Compiler tab

The **Compiler** tab compiles every `.html` and `.jinja` page under the wiki folder into a Python module named `tmpl_<hash of the page name>.py` in `wiki/tmpl`. A client that is not a debug client renders pages from these modules and never reads the `.html` source, so recompile after every page change that must reach players. **Clean + Compile** removes the existing compiled files first, which drops modules of pages you deleted.

## C++ registration

| Native registrant | What it registers |
| --- | --- |
|  |  |

The data pipeline is Python and JSON on both sides; nothing is registered in C++.
