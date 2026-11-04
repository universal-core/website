-- Avatar Fun virtualization processor — the player_virtual hooks that hydrate a
-- duelist as a clean level-120 avatar (free gear, maxed skills, blessing) and
-- strip persistent meta-state at load. Set on the arena's map via
-- forge.sys.game.player_virtual.set_processor in the referee's on_arena_created.

local avatar_configs = require("avatar_builder.configs")

---@type forge.sys.game.player_virtual.Processor
local processor = {}

---@param ch LPCHARACTER
---@param player TPlayerTable
---@return TPlayerTable
function processor.transform_player_load(self, ch, player)
    player.level = 120
    player.st    = 95
    player.ht    = 95
    player.dx    = 95
    player.iq    = 95
    player.hp    = 7385
    player.sp    = 2938
    player:clear_quickslots()
    player:clear_skills()
    player:clear_parts()
    return player
end

---@param ch LPCHARACTER
---@param items TPlayerItemEx[]
---@return TPlayerItemEx[]
function processor.transform_item_load(self, ch, items)
    return {}
end

---@param ch LPCHARACTER
---@param pet TPetPlayerTable
---@return TPetPlayerTable
function processor.transform_pet_load(self, ch, pet)
    pet.level = 120
    pet.exp   = 0
    for i = 0, 2 do pet:set_bonus_level(i, 60) end       -- PET_EXPABLE_BONUS_MAX_NUM
    for i = 0, 11 do pet:set_skill_level(i, 20) end      -- PET_SKILL_MAX_NUM
    return pet
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
---@param trees TPlayerSkillTree[]
---@return TPlayerSkillTree[]
function processor.transform_skill_tree_load(self, ch, trees)
    local spec_sk = TPlayerSkillTree.new(ch:get_player_id(), 1)
    spec_sk.active = false
    spec_sk.remaining_time = 60*60
    spec_sk:set_node_level(2, 5)
    spec_sk:set_node_level(4, 5)
    spec_sk:set_node_level(5, 5)
    spec_sk:set_node_level(7, 5)
    spec_sk:set_node_level(8, 5)
    spec_sk:set_node_level(9, 5)
    spec_sk:set_node_level(10, 5)
    spec_sk:set_node_level(12, 5)
    spec_sk:set_node_level(13, 5)
    spec_sk:set_node_level(15, 5)
    spec_sk:set_node_level(16, 5)
    spec_sk:set_node_level(17, 5)
    spec_sk:set_node_level(18, 5)
    spec_sk:set_node_level(19, 5)
    spec_sk:set_node_level(20, 5)
    spec_sk:set_node_level(21, 5)
    spec_sk:set_node_level(22, 5)
    return {spec_sk}
end

---@param ch LPCHARACTER
---@param key string
---@param data table
---@return table
---Forge-subsystem load filter. Strips persistent character meta-state at
---hydrate time so the player enters a clean session:
---  * char_title : all owned/selected titles + badges cleared.
---  * master_hunt: all hunter state cleared (tasks, map levels, …).
---Other keys passthrough. Saves are NOT transformed — with_save_cache
---redirects virtual writes into the per-pid cache, leaving the real DB row
---untouched.
function processor.transform_forge_load(self, ch, key, data)
    if key == "char_title" then
        data.owned_titles    = {}
        data.owned_badges    = {}
        data.selected_title  = 0
        data.selected_badge0 = 0
        data.selected_badge1 = 0
        data.selected_badge2 = 0
        data.title_color     = 0
        return data
    elseif key == "master_hunt" then
        return {}
    end
    return data
end

---Appearance / gear / skills hydration. Extracted so subclasses
---(guild_war/avatar/virtual_processor.lua) can inherit the body without
---also inheriting the avatar_builder context tag.
---When the avatar builder config_id's character module is enabled,
---skip skills/spec/collect — the user paints them via the builder.
---@param ch LPCHARACTER
---@param config_id string
function processor:_apply_avatar_appearance(ch, config_id)
    ch:give_blessing_progression(120)
    ch:set_blessing_level(40)
    ch:set_skill_level(132, 40)
    ch:with_questmanager(function()
        blessing.set_available_count(7)
        blessing.set_selectable_count(4)
        -- Pre-activate with 24h + bonuses 1,5,6,7 (UI top-to-bottom).
        pc.setf("ue_blessing","remain_time", 86400)
        pc.setf("ue_blessing","selected_bonuses", 0x71)
        blessing.activate()
    end)

    local cfg    = avatar_configs.get(config_id)
    local crules = cfg and avatar_configs.get_character_rules(cfg) or { enabled = false }
    if not crules.enabled then
        ch:max_skills()
        ch:max_spec_skills()
    end
    
    ch:give_collect_affects(120)

    ch:set_skill_level(121, 40)
    ch:set_skill_level(122, 2)

    ch:auto_give_item_and_use(50881, 1)
    ch:auto_give_item_and_use(50892, 1)
    ch:auto_give_item_and_use(50893, 1)
    ch:auto_give_item_and_use(50894, 1)
    ch:auto_give_item_and_use(50895, 1)
    ch:auto_give_item_and_use(72734, 1)
    ch:auto_give_item_and_use(72738, 1)

    ch:auto_give_item_and_summon_pet(90100, 1)
    -- ch:auto_give_item_and_equip(72702, 1)
end

---@param ch LPCHARACTER
---@param fresh boolean
function processor.on_player_enter(self, ch, fresh)
    if not fresh then return end
    if ch:is_observer_mode() then
        -- unsummon pet
        forge.sys.game.pet_manager.unsummon(ch)
        return
    end
    self:_apply_avatar_appearance(ch, "avatar_arena")
    forge.game.avatar_builder:push_force(ch, "avatar_arena")
end

return processor
