-- AMSEOP (Tranello): back hit, stealth and dagger each raise the blow.
local M = {}

---@type DamageNodeHandler
M.amseop = {
	damage_intent = function(intent)
		local m = 1.0
		if intent:is_back_hit(35) then m = m + 0.3 end
		if intent.caster:has_affect_flag("EUNHYUNG") then m = m + 0.25 end
		if intent.caster:weapon_is("DAGGER") then m = m + 0.5 end
		intent.attack = math.floor(intent.attack * m)
	end,
}

return M
