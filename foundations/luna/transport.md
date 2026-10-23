---
title: Luna transport and protobuf
description: How to send and receive protobuf messages across game, database, and client using the Luna transport layer.
---

## The unified transport layer

Universal Core provides one transport mechanism for every network channel. Feature code never touches the C++ network layer or defines packets manually.

You use the exact same pattern for client to game, game to game, game to database, and database to game communication. The engine handles socket transmission and buffer management.

Payloads are serialized protobuf messages. The engine routes messages using a namespace and a string header. The namespace is automatically derived from your Forge environment name. You define the message structure in a protobuf file, compile it, and pass the serialized string to the transport API.

```protobuf
syntax = "proto2";
package EveManager;

// Server -> client EvE lifecycle status. One message, three statuses.
message GCEveStatus {
    enum Status {
        NONE = 0;
        SETUP = 1;
        ENGAGE = 2;
        ENDED = 3;
    }
    required string eve_id = 1;
    required Status status = 2;
    optional int32 remain_time = 3; // seconds until the next phase transition (0 if unknown)
}

// Client -> server request to be warped into the EvE map (only honored during SETUP).
message CGParticipate {
    required string eve_id = 1;
}

```

## A complete request and response flow

In this feature, the client sends a request to claim a buff. The game parses the protobuf payload. It yields execution to ask the database. The database receives the request, performs an atomic claim, and answers the peer using the receipt token. The game coroutine resumes with the answer and sends the result back to the client.

```lua
forge vote4buff begin
    environment game begin
        local forge_helper = require("forge_helper")
        local pb_loader = require("pb_loader")
        local messages = require("ue.vote4buff_pb")

        -- Inforge usernames are alphanumeric; reject anything else so the
        -- client-supplied nickname is safe to interpolate into SQL.
        local NICKNAME_PATTERN = "^[%w_%-%. ]+$"

        -- Points granted by a successful vote redeem, mirroring the EXP / DROP
        -- / MOB cards. Built lazily so `point` is resolved at call time. Tune
        -- the values freely.
        local function vote_buff_points()
            return {
                { point_type = point.EXP_DOUBLE_BONUS, value = 10 },   -- EXP
                { point_type = point.ITEM_DROP_BONUS,  value = 10 },   -- DROP
                { point_type = point.ATTBONUS_MONSTER, value = 10 },   -- MOB
            }
        end

        ---@param ch LPCHARACTER
        ---@param ok boolean
        ---@param dur number
        ---@param reason string|nil
        local function send_result(ch, ok, dur, reason)
            local msg = pb_loader.new(messages.GCVote4BuffRedeemResult)
            msg.ok = ok
            msg.duration = dur or 0
            if reason then msg.reason = reason end
            forge.sys.game.send_client(ch, "redeem_result", msg:SerializeToString())
        end

        ---@class VoteForBuff
        local VoteForBuff = {}
        VoteForBuff.__index = VoteForBuff

        function VoteForBuff:new()
            local instance = setmetatable({}, VoteForBuff)
            forge_helper.sys.game.set_main_processor("redeem", instance, instance.on_redeem)
            return instance
        end

        --- Runs in a player-owned coroutine: claims today's vote in the db,
        --- then grants the priv until midnight. Exactly one of `nickname`
        --- or `inforge_userid` is set; the other is nil. The db handler
        --- dispatches the right column lookup based on which arrived.
        ---@param pid number
        ---@param nickname string|nil
        ---@param inforge_userid number|nil
        function VoteForBuff:do_redeem(pid, nickname, inforge_userid)
            local ch = forge.sys.game.char_manager.find_by_pid(pid)
            if ch == nil then return end

            local req = pb_loader.new(messages.GDVote4BuffClaim)
            req.pid = pid
            if nickname       ~= nil then req.nickname       = nickname       end
            if inforge_userid ~= nil then req.inforge_userid = inforge_userid end

            local res, ok = forge_helper.coro.with_timeout(2000,
                forge_helper.sys.game.yield_db, "claim", req:SerializeToString())
            if not ok then
                sys_err_v("[vote4buff] claim db timeout pid[%d] nick[%s] uid[%d]",
                    pid, nickname or "", inforge_userid or 0)
                send_result(ch, false, 0, nil)
                return
            end

            local parsed = pb_loader.parse_string(messages.DGVote4BuffClaim, res)
            if not parsed.claimed then
                send_result(ch, false, 0, nil)
                return
            end

            local dur =  24 * 60 * 60
            give_char_priv(pid, PRIV_ID.VOTE4BUFF, vote_buff_points(), dur)

            sys_log_v(0, "[vote4buff] pid[%d] claimed vote nick[%s] uid[%d] dur[%d]",
                pid, nickname or "", inforge_userid or 0, dur)
            send_result(ch, true, dur, nil)
        end

        ---@param ch LPCHARACTER
        ---@param message string
        ---@param handler_id number
        function VoteForBuff:on_redeem(ch, message, handler_id)
            local msg = pb_loader.parse_string(messages.CGVote4BuffRedeem, message)
            local nickname       = msg.nickname
            local inforge_userid = msg.inforge_userid

            -- Normalize: pb empty strings come through as "" but client may
            -- also omit; treat both as not-set.
            if nickname == "" then nickname = nil end
            if inforge_userid == 0 then inforge_userid = nil end

            -- Exactly one of the two must be set.
            local has_nick = nickname ~= nil
            local has_uid  = inforge_userid ~= nil
            if has_nick == has_uid then
                send_result(ch, false, 0, nil)
                return
            end

            -- Nickname: sanitize against the SQL-safe alphanumeric pattern.
            if has_nick and (#nickname > 30 or nil == nickname:match(NICKNAME_PATTERN)) then
                send_result(ch, false, 0, nil)
                return
            end

            local pid = ch:get_player_id()
            bridge.coro.create_with_player_owner(function()
                self:do_redeem(pid, nickname, inforge_userid)
            end, pid)
        end

        return VoteForBuff:new()
    end

    environment db begin
        local pb_loader = require("pb_loader")
        local messages = require("ue.vote4buff_pb")
        local _M = {}

        local function escape_q(s)
            return (s:gsub("'", "''"))
        end

        ---@param peer CPeer
        ---@param message string
        ---@param handler_id number
        ---@param receipt number
        function _M.on_claim(peer, message, handler_id, receipt)
            local req = pb_loader.parse_string(messages.GDVote4BuffClaim, message)
            local pid = req.pid

            local res = pb_loader.new(messages.DGVote4BuffClaim)
            res.claimed = false

            -- Match by whichever of nickname/inforge_userid the game sent.
            -- The game side already enforced exactly-one + nickname sanitize,
            -- so we just pick the column and interpolate safely.
            local where_clause
            if req.inforge_userid ~= nil and req.inforge_userid ~= 0 then
                where_clause = string.format("inforge_userid = %d", req.inforge_userid)
            elseif req.nickname ~= nil and req.nickname ~= "" then
                where_clause = string.format("inforge_username = '%s'", escape_q(req.nickname))
            else
                forge.sys.db.answer_peer(peer, res:SerializeToString(), receipt)
                return
            end

            -- 1) oldest unclaimed vote for this association cast today
            local rows = forge.sys.db.sql.direct_query(forge.sys.db.sql.SQL_DB_SLOT.ACCOUNT,
                string.format([[
                    SELECT id FROM vote4buff_vote
                    WHERE %s
                      AND claimed_by_pid IS NULL
                      AND vote_time >= UNIX_TIMESTAMP(CURDATE())
                    ORDER BY vote_time ASC
                    LIMIT 1
                ]], where_clause))

            if #rows == 0 then
                forge.sys.db.answer_peer(peer, res:SerializeToString(), receipt)
                return
            end
            local vote_id = rows[1].id

            -- 2) atomic claim, guarded on still-unclaimed (wins the race)
            forge.sys.db.sql.direct_query(forge.sys.db.sql.SQL_DB_SLOT.ACCOUNT,
                string.format([[
                    UPDATE vote4buff_vote
                    SET claimed_by_pid = %d
                    WHERE id = %d AND claimed_by_pid IS NULL
                ]], pid, vote_id))

            -- 3) confirm this pid owns the row (a racing core may have won)
            local owner = forge.sys.db.sql.direct_query(forge.sys.db.sql.SQL_DB_SLOT.ACCOUNT,
                string.format("SELECT claimed_by_pid FROM vote4buff_vote WHERE id = %d", vote_id))
            if #owner > 0 and tonumber(owner[1].claimed_by_pid) == pid then
                res.claimed = true
            end

            forge.sys.db.answer_peer(peer, res:SerializeToString(), receipt)
        end

        forge.sys.set_peer_processor("claim", _M.on_claim)

        return _M
    end
end
```

## How it works underneath

The engine intercepts packets at the standard input processors: `input_main` for client messages, `input_p2p` for peer messages, and `input_db` for database messages. When a packet arrives, the C++ layer reads the namespace and the header. It looks up the registered handler for that specific combination. The engine invokes the Lua function through the bridge.

You register these handlers using the Forge primitives. The function `forge.sys.set_main_processor` binds a standalone function to a client message header. The `forge.sys.set_peer_processor` primitive handles peer messages, and `forge.sys.set_db_processor` handles database messages. These primitives require a standalone function or closure.

When the engine executes the registered function, it passes the sender object and the serialized message. The sender is an `LPCHARACTER` for main input, an `LPDESC` for peer and database input in the game core, or a `CPeer` for peer input in the database. The engine also passes routing identifiers. A `client_handler` tracks the Python window that expects a response. A `receipt` token tracks the coroutine waiting for an answer.

The engine routes a client message to the Lua primitive in C++.

```cpp
bool ForgeGame::InvokeMainInputHandler(LPCHARACTER ch, uint32_t client_handler, const std::string& ns, const std::string& header, const std::string& message) {
    sys_log(1, "Forge::InvokeMainInputHandler message for ns[{}] header[{}], ch[{}], handler[{}]",
        ns.c_str(), header.c_str(), ptr(ch), client_handler);
    auto handler = GetInputHandler(INPUT_MAIN, ns, header);
    if (!handler.has_value()) {
        sys_err("Forge::InvokeMainInputHandler no handler registered for forge [{}] header [{}]", ns.c_str(), header.c_str());
        return false;
    }

    auto result = bridge->Call({ ns, dispatch::Kind::INPUT, header,
        ch ? ch->GetPlayerID() : 0 }, handler.value(), ch, message, client_handler);

    if (!result.valid()) {
        sys_err("Forge::InvokeMainInputHandler error calling function for header[{}] in forge [{}]", 
            header.c_str(), ns.c_str());

        return false;
    }
    return true;
}
```

Because the primitives expect a standalone function, you pass the function directly.

```lua
function EveManager:new()
    local instance = setmetatable({}, EveManager)
    instance.proto = load_protos(configuration_path)
    instance.active = nil

    forge.sys.set_main_processor("participate", on_participate)
    return instance
end
```

## Receiving messages

Most systems use the `forge_helper` wrappers to bind a class method directly to its object instance. The helper wrappers pass `self` automatically.

You register handlers based on the message origin. `forge_helper.sys.game.set_main_processor` handles client messages, passing the character, the serialized protobuf message, and the handler ID to your method. `set_p2p_processor` and `set_db_processor` handle core to core and database to core messages. The P2P processor receives the descriptor, the message, and a receipt token. The DB processor receives the descriptor and the message.

On the database side, `forge_helper.sys.db.set_peer_processor` handles incoming messages from the game cores. It receives the peer object, the message, the handler ID, and a receipt token.

```lua
---**The processor function will be invoked with character, message, and handler ID parameters.**
---@param header string # The message header that the processor function will handle
---@param self any # The instance of the class on which to call processor
---@param processor fun(ch: LPCHARACTER, message: string, handler_id: number) # The Lua function to be used as the main processor
---```lua
---function processor(ch: LPCHARACTER, message: string, handler_id: number)
--- ---@param ch LPCHARACTER # The character making the request
--- ---@param message string # The content of the message
--- ---@param handler_id number # The handler (python window) id which will handle the response (0 default)
---end
helper.sys.game.set_main_processor = function(header, self, processor) 
    forge.sys.set_main_processor(header, function(...) processor(self, ...) end)
end

---**The P2P processor function will be invoked with a descriptor and message parameters.**
---@param header string # The message header that the processor function will handle
---@param self any # The instance of the class on which to call the processor
---@param processor fun(d: LPDESC, message: string, receipt: number) # The Lua function to be used as the P2P processor
---```lua
---function processor(d: LPDESC, message: string, receipt: number)
--- ---@param d LPDESC # The core sending the message
--- ---@param message string # The content of the message
--- ---@param receipt number # If the message is a yielded request `receipt` is the token to answer with
---end
helper.sys.game.set_p2p_processor = function(header, self, processor)
    forge.sys.set_peer_processor(header, function(...) processor(self, ...) end)
end

---**The DB processor function will be invoked with a descriptor and message parameters.**
---@param header string # The message header that the processor function will handle
---@param self any # The instance of the class on which to call the processor
---@param processor fun(d: LPDESC, message: string) # The Lua function to be used as the DB processor
---```lua
---function processor(d: LPDESC, message: string)
--- ---@param d LPDESC # Descriptor representing the client which initiated the request (can be null)
--- --- (for example in a safebox load a character asks for safebox, core forwards request to db attaching client descriptor so that it can send items to client once loaded)
--- ---@param message string # The content of the message
---end
helper.sys.game.set_db_processor = function(header, self, processor)
    forge.sys.set_db_processor(header, function(...) processor(self, ...) end)
end

---**The game processor function will be invoked with a peer, message, and descriptor handler ID parameters.**
---@param header string # The message header that the processor function will handle
---@param self any # The instance of the class on which to call the processor
---@param processor fun(peer: CPeer, message: string, handler_id: number, receipt: number) # The Lua function to be used as the peer processor
---```lua
---function processor(peer: CPeer, message: string, handler_id?: number, receipt?: number)
--- ---@param peer CPeer # The core sending the message
--- ---@param message string # The content of the message
--- ---@param handler_id number # The client descriptor which initiated the request (can be 0)
--- --- (for example in a safebox load a character asks for safebox, core forwards request to db attaching client descriptor so that it can send items to client once loaded)
--- ---@param receipt number # If the message is a yielded request `receipt` is the token to answer with
---end
helper.sys.db.set_peer_processor = function(header, self, processor)
    forge.sys.set_peer_processor(header, function(...) processor(self, ...) end)
end
```

## Sending messages

Sending functions take the header and the serialized protobuf string, while functions targeting a specific client or peer also require the target object.

The game core sends messages using `forge.sys.game.send_client`, `send_p2p`, and `send_db`. To send a message to a specific client, call `send_client` with the character object.

```lua
local function send_result(ch, ok, dur, reason)
    local msg = pb_loader.new(messages.GCVote4BuffRedeemResult)
    msg.ok = ok
    msg.duration = dur or 0
    if reason then msg.reason = reason end
    forge.sys.game.send_client(ch, "redeem_result", msg:SerializeToString())
end
```

To communicate with other server components, the game core uses `send_p2p` to broadcast to all connected game cores, and `send_db` to send a payload to the database cache. Both functions take the header and the serialized message. They do not require a character object because the transport routes them at the core level.

The database cache communicates with the game cores using a different transport convention than the rest of the engine (reading from the packet start excluding the header, rather than including it). It broadcasts to all cores using `forge.sys.db.broadcast_peers` or targets a specific core with `send_peer`. The `broadcast_peers` function takes the header and the message. It accepts optional arguments to restrict the broadcast to a specific channel or exclude a specific peer. The `send_peer` function requires the `CPeer` object representing the target game core.

The `message` argument is always a serialized protobuf string. You build the message using `pb_loader.new`, populate its fields, and call `msg:SerializeToString()`. The `header` is the string the receiving end uses to find the right processor.

Functions like `send_client` and `send_db` also accept optional handler IDs. A `client_handler` routes the message to a specific registered Python window on the client. A `desc_handler` tracks the client descriptor across a database round trip. The final argument is the `receipt` token, which the receiving end uses to answer a yielded request.

## Yielding for answers

You send a request and pause execution until the answer arrives using `yield_db`, `yield_p2p`, or `yield_client`. These functions must run inside a coroutine. If you call them outside one, they raise an error.

The yielding function requests a coroutine identifier. It generates a receipt token bound to that identifier, attaches the token to the outgoing message, and yields the coroutine.

```lua
helper.sys.game.yield_db = function(header, message, desc_handler, ...)
    local coro_id = bridge.coro.get_current_id()
    if not coro_id then 
        error("yield_db outside a coroutine")
    end
    -- db is the peer 0
    local receipt = bridge.coro.generate_receipt_token(coro_id, bridge.coro.COROUTINE_OWNER.PEER, 0)
    forge.sys.game.send_db(header, message, desc_handler, receipt)
    return coroutine.yield(...)
end
```

Network requests fail. You must wrap yielding calls in `forge_helper.coro.with_timeout` to handle missing responses. The wrapper takes a timeout in milliseconds, the yielding function, and its arguments. It returns the response payload and a boolean flag. If the timeout expires before a response arrives, the flag is false. You check this flag and handle the failure.

```lua
--- Runs in a player-owned coroutine: claims today's vote in the db,
--- then grants the priv until midnight. Exactly one of `nickname`
--- or `inforge_userid` is set; the other is nil. The db handler
--- dispatches the right column lookup based on which arrived.
---@param pid number
---@param nickname string|nil
---@param inforge_userid number|nil
function VoteForBuff:do_redeem(pid, nickname, inforge_userid)
    local ch = forge.sys.game.char_manager.find_by_pid(pid)
    if ch == nil then return end

    local req = pb_loader.new(messages.GDVote4BuffClaim)
    req.pid = pid
    if nickname       ~= nil then req.nickname       = nickname       end
    if inforge_userid ~= nil then req.inforge_userid = inforge_userid end

    local res, ok = forge_helper.coro.with_timeout(2000,
        forge_helper.sys.game.yield_db, "claim", req:SerializeToString())
    if not ok then
        sys_err_v("[vote4buff] claim db timeout pid[%d] nick[%s] uid[%d]",
            pid, nickname or "", inforge_userid or 0)
        send_result(ch, false, 0, nil)
        return
    end

    local parsed = pb_loader.parse_string(messages.DGVote4BuffClaim, res)
    if not parsed.claimed then
        send_result(ch, false, 0, nil)
        return
    end

    local dur =  24 * 60 * 60
    give_char_priv(pid, PRIV_ID.VOTE4BUFF, vote_buff_points(), dur)

    sys_log_v(0, "[vote4buff] pid[%d] claimed vote nick[%s] uid[%d] dur[%d]",
        pid, nickname or "", inforge_userid or 0, dur)
    send_result(ch, true, dur, nil)
end
```

On the receiving end, the handler receives the receipt token. The database answers a yielded request using `forge.sys.db.answer_peer`. You pass the peer, the serialized message, and the exact receipt token. The engine matches the token and resumes the waiting coroutine in the game core.

```lua
---@param peer CPeer
---@param message string
---@param handler_id number
---@param receipt number
function _M.on_claim(peer, message, handler_id, receipt)
    local req = pb_loader.parse_string(messages.GDVote4BuffClaim, message)
    local pid = req.pid

    local res = pb_loader.new(messages.DGVote4BuffClaim)
    res.claimed = false

    -- Match by whichever of nickname/inforge_userid the game sent.
    -- The game side already enforced exactly-one + nickname sanitize,
    -- so we just pick the column and interpolate safely.
    local where_clause
    if req.inforge_userid ~= nil and req.inforge_userid ~= 0 then
        where_clause = string.format("inforge_userid = %d", req.inforge_userid)
    elseif req.nickname ~= nil and req.nickname ~= "" then
        where_clause = string.format("inforge_username = '%s'", escape_q(req.nickname))
    else
        forge.sys.db.answer_peer(peer, res:SerializeToString(), receipt)
        return
    end

    -- 1) oldest unclaimed vote for this association cast today
    local rows = forge.sys.db.sql.direct_query(forge.sys.db.sql.SQL_DB_SLOT.ACCOUNT,
        string.format([[
            SELECT id FROM vote4buff_vote
            WHERE %s
              AND claimed_by_pid IS NULL
              AND vote_time >= UNIX_TIMESTAMP(CURDATE())
            ORDER BY vote_time ASC
            LIMIT 1
        ]], where_clause))

    if #rows == 0 then
        forge.sys.db.answer_peer(peer, res:SerializeToString(), receipt)
        return
    end
    local vote_id = rows[1].id

    -- 2) atomic claim, guarded on still-unclaimed (wins the race)
    forge.sys.db.sql.direct_query(forge.sys.db.sql.SQL_DB_SLOT.ACCOUNT,
        string.format([[
            UPDATE vote4buff_vote
            SET claimed_by_pid = %d
            WHERE id = %d AND claimed_by_pid IS NULL
        ]], pid, vote_id))

    -- 3) confirm this pid owns the row (a racing core may have won)
    local owner = forge.sys.db.sql.direct_query(forge.sys.db.sql.SQL_DB_SLOT.ACCOUNT,
        string.format("SELECT claimed_by_pid FROM vote4buff_vote WHERE id = %d", vote_id))
    if #owner > 0 and tonumber(owner[1].claimed_by_pid) == pid then
        res.claimed = true
    end

    forge.sys.db.answer_peer(peer, res:SerializeToString(), receipt)
end
```

## Python client integration

The Python client handles feature data directly. Python receives, deserializes, and manages the protobuf messages. Python sends the messages, and Python receives the messages.

You register a Python window as a handler to receive messages directly. When the server sends a message, it includes the handler identifier. The client uses this identifier to route the payload straight to the correct window.

For the full API and window registration steps, see the [Luna client page](./client.md).

## Common tasks done right

When you yield a coroutine to wait for a database response, the network might delay or drop the message. A hanging coroutine leaks memory and leaves the player stuck. Wrap yielded requests in `forge_helper.coro.with_timeout` to enforce a time limit. The wrapper returns the payload and a boolean flag. Check the flag immediately. If it is false, the request timed out and you must abort the operation.

When saving data for a player, a direct `send_db` call risks leaking virtual player state into the real database. Virtual players exist in memory for offline systems but share the same database schema. Use `forge.sys.game.player_virtual.with_save_cache` to wrap the save operation. You pass the character, a cache key, the protobuf message type, the serialized payload, and a callback containing the actual `send_db` call. If the player is virtual, the system caches the state and skips the callback. If the character object cannot be resolved, you must skip the save entirely.

## Traps

You must never require the `forge_helper` module in the main state of your script. If you require it globally, the engine caches the helper code in the main thread before the forge environment and its namespace identifier are set. 

Because the helper binds to the underlying transport primitives at the moment it is loaded, any script calling the cached helper will fail to send messages. The transport layer will reject the calls because the environment context is missing. 

Always require the helper inside the `environment game begin` block. The module itself includes a warning about this exact trap.

```lua
--[[
    forge helper is a convinient helper module which DO NOT GETS REQUIRED BY THE MAIN STATE.
    Requiring it in the main state will "cache" the code in the main thread and any
    caller forge will use the functions initializated inthe main state, where no forge environment and
    id are set. Leading to the impossibility to send messages.
]]
```
