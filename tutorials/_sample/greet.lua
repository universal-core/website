greet = greet or {}

-- One place for the greeting so other quests can reuse it.
function greet.line(name)
	return string.format("Welcome back, %s.", name)
end
