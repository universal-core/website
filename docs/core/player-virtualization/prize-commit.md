---
title: The prize commit
description: Write selected results from a virtual session to real data.
displayed_sidebar: mainSidebar
---

# The prize commit

A virtual session runs on cached character data. A prize commit writes a selected result to real data. The stash holds committed items for delivery on a later non-virtual load. See the [overview](/docs/core/player-virtualization/overview).

## The three commits

| Function | Result |
| --- | --- |
| `commit_quest_flag(ch, key, value)` | Writes a real character quest flag. |
| `commit_account_flag(ch, key, value)` | Writes an account quest flag. |
| `commit_stash_item(ch, item, why?)` | Stages an item for later delivery. |

These functions belong to `forge.sys.game.player_virtual`. The character helper `LPCHARACTER:commit_quest_flag` and `pc.commit_quest_flag` use a commit for a virtual character and `set_quest_flag` for a real character.

## Key rules

- A flag key has the form `name.state`, split at the first `.`. Each part is at most 63 characters; longer parts are logged and dropped.
- A key without a dot has an empty state. Use the quest's name and state so the quest can read it.
- An account commit needs a character descriptor; without it the write is logged and dropped.
- Create a stash item with `forge.sys.game.item_manager.create_item`. The commit consumes the item; do not use its handle afterwards.
- The item commit returns its item ID, or `0` if the character or item is null, the item has no ID, or it already has an owner. `why` is recorded in the `STASH_COMMIT` log.

## Delivery and guarantees

The commit sends a packet to the database core and does not wait for acknowledgement. A closed database link can drop the write. A commit near a disconnect or database restart can be lost without an error on the game core. Do not rely on an acknowledgement or a logout drain.

A stash item keeps its ID and is delivered at the next real item load, after inventory placement. Delivery tries stacking, a free cell, then the ground. The player is notified when the client reaches the game phase. An account flag is visible to characters on that account on their next load.

## Read your own commit in the session

A flag commit writes to the database, not the live quest state. A read immediately after the commit still sees the old session value. If your code reads it again during the session, also set the session copy with `set_quest_flag`. That session write stays in the cache; the commit is the write intended to persist. The committed flag becomes visible on a subsequent non-virtual load.

## Glossary

- **Virtual session:** a character's session on a virtual map.
- **Prize commit:** an explicit write of a selected result to real data.
- **Stash:** item storage for delivery on a later non-virtual load.

See [hooks and records](/docs/core/player-virtualization/hooks), [custom transformers](/docs/core/player-virtualization/custom-transformers), and [examples and pitfalls](/docs/core/player-virtualization/examples).
