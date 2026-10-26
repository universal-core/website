-- PALBANG (Vortice della spada): a blow from behind lands 30% harder.
local M = {}

---@type DamageNodeHandler
M.palbang = {
	damage_intent = function(intent)
		if intent:is_back_hit(35) then
			local before = intent.attack
			intent.attack = math.floor(intent.attack * 1.3)
			if is_test_server() then
				intent.caster:chat_packet(forge.sys.game.CHAT_TYPE.INFO,
					"back hit on " .. intent.victim:get_name() .. ": " .. before .. " -> " .. intent.attack)
			end
		end
	end,
}

return M
