---
title: forge.sys API reference
description: Messaging, processor registration, and coroutine APIs.
displayed_sidebar: mainSidebar
---

# forge.sys API reference

These APIs register processors, send messages, and manage waits across Forge environments. The [calling-context rules](./environments.md) determine where each operation is legal.

| Surface | What it is | Core | Use |
| --- | --- | --- | --- |
| `forge.sys` | Processor registration and logging | game and db | Handle messages and log. |
| `forge.sys.game` | Game bindings and transport | game | Send to clients, game cores, or db. |
| `forge.sys.db` | Db bindings and transport | db | Answer or send to game cores. |
| `forge_helper` | Lua wrapper | game and db | Bind methods and wait for messages. |
| `bridge.coro` | Coroutine interface | game and db | Create, own, and close coroutines. |

Require the helper inside an environment:

```lua
local forge_helper = require("forge_helper")
```

## Glossary

| Term | Meaning |
| --- | --- |
| Receipt | Token routing an answer to a waiting coroutine. |
| Owner | Type and ID controlling a coroutine's lifetime. |
| `handler_id` | Handler identifier passed to a db peer processor. |
| `client_handler` | Client window identifier. |
| Processor | Function registered to handle a message. |
| Header | String identifying a message type. |

## forge.sys

Available in both environments.

| Function | Signature | Description |
| --- | --- | --- |
| `forge.sys.set_main_processor` | `(header: string, processor: function) -> boolean` | Handle client messages with this header for this forge. Called as `processor(ch, message, client_handler)`. |
| `forge.sys.set_peer_processor` | `(header: string, processor: function) -> boolean` | Game: handle messages from other game cores, called as `processor(d, message, receipt)`. Db: handle requests from game cores, called as `processor(peer, message, handler_id, receipt)`. |
| `forge.sys.set_db_processor` | `(header: string, processor: function) -> boolean` | Game only in practice. Handle replies from the db core, called as `processor(d, message)`. |
| `forge.sys.log` | `(verbosity: number, message: string)` | Log with the prefix `[Forge-<name>]`. Verbosity 0 to 5. |
| `forge.sys.err` | `(message: string)` | Error log with the same prefix. |

Registration rules:

- The call must come from code that carries the forge environment: the environment body, or a function defined in it. Directly from a quest `when` block it fails with `Forge::SetInputHandler called from a non-forge script` and returns `false`.
- A handler is keyed by input type, forge name and header. Registering the same header twice fails with `Forge::SetInputHandler trying to double set input handler` and returns `false`.
- A `when boot` block cannot register itself, but it can call a forge method that does. The handler is anchored on the global state, not on the short-lived quest thread.
- A message with no handler logs `Forge::InvokeMainInputHandler no handler registered for forge [<name>] header [<header>]` (and the peer and db variants).
- Processors run on the main thread, not in a coroutine. A processor that has to wait must start a coroutine. The value a processor returns is ignored.
- An error in a processor is printed to the error log with a stack trace, and the server keeps running.

## forge.sys.game

Messaging functions. They are the transport; each needs a forge environment on the caller, otherwise they log `ForgeGame::Send<X>Packet called from a non-forge script` and return `false`. An empty header is refused as well.

| Function | Signature | Description |
| --- | --- | --- |
| `forge.sys.game.send_client` | `(ch: LPCHARACTER, header, message, client_handler?: number = 0, receipt?: string)` | Send to one player's client. Needs a character with a descriptor (`null ch or null desc`). The packet must fit 65535 bytes (`message of N bytes does not fit a packet`). `client_handler` selects the client window that gets the answer. |
| `forge.sys.game.send_p2p` | `(header, message, receipt?: string)` | Send to every other game core. |
| `forge.sys.game.send_desc` | `(desc: LPDESC, header, message, receipt?: string)` | Send to one game core. |
| `forge.sys.game.send_db` | `(header, message, desc_handler?: number = 0, receipt?: string)` | Send to the db core. |
| `forge.sys.game.answer_p2p` | `(desc: LPDESC, message, receipt: number)` | Answer a request that arrived with a receipt. |

`send_client` is not a chat line. It delivers a header and a payload to a handler on the client side. To put a line in the player's chat, call `ch:chat_packet(type, text)` on the character, with a type from `forge.sys.game.CHAT_TYPE` (`INFO` for a plain system line). It needs no forge environment, so a hook may call it directly.

The enums `forge.sys.game.CHAT_TYPE`, `forge.sys.game.DAMAGE_TYPE` and `forge.sys.game.WEAR` are in the same stub. Receipts go out as strings (`send_*` parses them as unsigned numbers) and arrive in processors as numbers, which `answer_p2p` and `answer_peer` take back as numbers. The namespace on the wire is the sender's forge name, so the receiving forge of the same name gets the message.

Everything else under `forge.sys.game` (for example `forge.sys.game.char_manager.find_by_pid`, which every login hook uses) is described by its own generated stub.

## forge.sys.db

Db environment only.

| Function | Signature | Description |
| --- | --- | --- |
| `forge.sys.db.broadcast_peers` | `(header, message, channel?: number = 0, except?: CPeer, except_channel?: number = 0)` | Send to all game cores, optionally one channel, optionally skipping one core. |
| `forge.sys.db.send_peer` | `(peer: CPeer, header, message, desc_handler?: number = 0)` | Send to one game core. |
| `forge.sys.db.answer_peer` | `(peer: CPeer, message, receipt: number)` | Answer a request that arrived with a receipt. Answer once: a second answer finds the receipt used and is dropped. |
| `forge.sys.db.get_event_flag` | `(flag) -> number` | Value of an event flag, 0 if unset. |
| `forge.sys.db.set_event_flag` | `(flag, value)` | Persist the flag and broadcast it to all game cores. |

`forge.sys.db.sql`, `forge.sys.db.log` and `forge.sys.db.priv` have their own stubs.

## forge_helper

A Lua module that wraps transport and coroutines. Require it inside the forge environment, never in the main state.

If the main state requires it first, every forge gets the cached copy built outside any forge environment, which has no forge name, and every send fails.

Processor registration. The helper binds `self` for you, so a processor can be a method.

| Function | Signature | Registers on |
| --- | --- | --- |
| `forge_helper.sys.game.set_main_processor` | `(header, self, processor)` | `forge.sys.set_main_processor`. Processor called `(self, ch, message, client_handler)`. |
| `forge_helper.sys.game.set_p2p_processor` | `(header, self, processor)` | `forge.sys.set_peer_processor`. Processor called `(self, d, message, receipt)`. |
| `forge_helper.sys.game.set_db_processor` | `(header, self, processor)` | `forge.sys.set_db_processor`. Processor called `(self, d, message)`. |
| `forge_helper.sys.db.set_peer_processor` | `(header, self, processor)` | `forge.sys.set_peer_processor` on the db core. Processor called `(self, peer, message, handler_id, receipt)`. |

All four drop the boolean result, so a double registration is not visible to the caller.

Waiting. A yielding function sends a message with a receipt that names the coroutine, then yields. It returns when the answer arrives, the timeout fires, or the owner is closed.

| Function | Signature | Receipt owner | Resumes on |
| --- | --- | --- | --- |
| `forge_helper.sys.game.yield_client` | `(ch, header, message, client_handler?, ...)` | `PLAYER`, the character's player id | The client's answer. |
| `forge_helper.sys.game.yield_db` | `(header, message, desc_handler?, ...)` | `PEER`, 0 | The db core's `answer_peer`. |
| `forge_helper.sys.game.yield_p2p` | `(header, message, ...)` | `PEER`, 1 | The first answer from any core. |
| `forge_helper.sys.game.yield_desc` | `(desc, header, message, ...)` | `PEER`, 1 | The answer from that core. |
| `forge_helper.sys.game.yield_auth` | `(username, password, hwid, client_ip)` | none | A JSON string with the authentication result. |

Timeouts wrap a yielding function:

| Function | Signature | Returns |
| --- | --- | --- |
| `forge_helper.coro.with_timeout` | `(timeout_ms, yielding, ...)` | `(result, ok)` as the yielding function returns them. |
| `forge_helper.coro.collect` | `(timeout_ms, yielding, ...)` | After the full timeout, `(results, true)` where `results` is an array of `{owner_type, owner_id, args}`, one per answer. Without answers, the array is empty. |

Every yielding function must run inside a bridge coroutine. See [calling context](./environments.md).

## bridge.coro

Owned coroutines. An owner is a pair `(owner_type, owner_id)`. When an owner is closed, every coroutine it holds is resumed with failure and removed.

| Function | Signature | Description |
| --- | --- | --- |
| `bridge.coro.create` | `(entry) -> id, thread` | Create a coroutine and run it right away until its first yield. Returns `0, nil` if `entry` finished without yielding or raised an error. |
| `bridge.coro.create_with_player_owner` | `(entry, player_id) -> id, thread` | Same, owned by the player. It is closed when the player disconnects. |
| `bridge.coro.adopt` | `() -> id` | Register the running non-main thread as a bridge coroutine. Fails on the main thread (`trying to adopt main thread`). |
| `bridge.coro.add_owner` | `(coroutine_id, owner_type, owner_id)` | Add an owner to a coroutine. |
| `bridge.coro.close_by_owner` | `(owner_type, owner_id)` | Close every coroutine of that owner. The generated stub lists a leading `coroutine_id`; the binding takes only the two. |
| `bridge.coro.close_by_owner_exact` | `(owners: {{owner_type, owner_id}, ...})` | Close the coroutines that have exactly this set of owners. |
| `bridge.coro.get_current_id` | `() -> number` | Id of the running bridge coroutine. 0 outside a bridge coroutine, never nil. |
| `bridge.coro.generate_receipt_token` | `(coroutine_id, owner_type, owner_id) -> string` | Token an answer must carry to resume this coroutine. A zero id raises `Invalid coroutine_id: cannot be 0`. |
| `bridge.coro.enable_timout` | `(ms)` | Arm a timeout on the running coroutine. Outside a coroutine: `with_timout outside a coroutine`. A second timeout before the resume is ignored with `coroutine [id] has already a timeout`. |
| `bridge.coro.enable_collect` | `(ms)` | Arm collect mode. Outside a coroutine: `collect outside a coroutine`. |
| `bridge.coro.COROUTINE_OWNER` | enum | `PLAYER`, `QUEST`, `PEER`, `AUTH`. The generated stub does not list `AUTH`. |

The spelling `enable_timout` (no second `e`) is the real identifier.

What the yielding code sees when it resumes:

| Cause | Values returned |
| --- | --- |
| An answer with a valid token | `(message, true)` |
| The timeout fired | `(nil, false)` |
| The owner was closed | `(nil, false)` |
| `collect`, at the timeout | `(table, true)` |

An answer must come from the owner it was issued for (`ValidateCoroReceiptToken` checks type and id). A late answer, after a timeout, is dropped and logged as `token invalid/expired`. After a timeout or a close resume the coroutine is removed, so code that waits a second time after a failed wait is not resumed again.

Next: [Quest-side events and coroutines](./events.md).
