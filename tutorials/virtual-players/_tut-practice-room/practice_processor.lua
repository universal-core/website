local INFO = forge.sys.game.CHAT_TYPE.INFO

---@type forge.sys.game.player_virtual.Processor
local processor = {}

---@param ch LPCHARACTER
---@param player TPlayerTable
---@return TPlayerTable
function processor.transform_player_load(self, ch, player)
    player.level = 30
    player.exp   = 0
    player.gold  = 0
    return player
end

---@param ch LPCHARACTER
---@param items TPlayerItemEx[]
---@return TPlayerItemEx[]
function processor.transform_item_load(self, ch, items)
    return {}
end

---@param ch LPCHARACTER
---@param quests TQuestTable[]
---@param is_account boolean
---@return TQuestTable[]
function processor.transform_quest_load(self, ch, quests, is_account)
    return {}
end

---@param ch LPCHARACTER
---@param affects TPacketAffectElement[]
---@return TPacketAffectElement[]
function processor.transform_affect_load(self, ch, affects)
    return {}
end

---@param ch LPCHARACTER
---@param fresh boolean
function processor.on_player_enter(self, ch, fresh)
    if not fresh then return end
    ch:chat_packet(INFO, "[Practice room] Level 30, no gold, no items. Hunt the dog.")
end

return processor
