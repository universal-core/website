-- PALBANG (Vortice della spada): a blow from behind lands 30% harder.
local M = {}

---@type DamageNodeHandler
M.palbang = {
	damage_intent = function(intent)
		if intent:is_back_hit(35) then
			intent.attack = math.floor(intent.attack * 1.3)
		end
	end,
}

return M
