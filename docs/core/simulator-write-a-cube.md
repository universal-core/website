---
title: Write and run a cube
description: Write a simulator cube that checks a party join policy and read its verdict.
displayed_sidebar: mainSidebar
---

# Write and run a cube

The engine is private; this is a recipe for engine holders and a reading example for everyone else.

The rule under test is an arbitrary example, chosen because the Metin2 mainline engine already enforces a same-empire and a level-gap limit on parties. The [party join policy tutorial](/tutorials/party-join-policy) lifts both on one map; the cube proves that, and only that, through the policy API and without a client. Swap in any rule of your own.

## Register the rule

The tutorial's [forge](/foundations/luna/forge) (a Lua module the server loads at boot) registers a guard that matches when both players are on the chosen map. Its verdict sets `same_empire = false` and `level_window = 0`, removing the same-empire requirement and the level-gap limit for that pair.

The cube registers the same guard and verdict through `forge.sys.game.party_join_policy` on the simulator's scratch map. This isolates the policy behavior without staging and booting the tutorial's Forge. It does not test whether that Forge loads or registers successfully.

## Choose the admission door

`sim.party_join` runs the same policy `Resolve` (the policy manager's call that matches the registered guards and returns the winning verdict) and the common admission condition (the engine's own party checks) that a direct invite runs, then creates or joins the party directly. It returns a party admission error for the cube to check.

It does not use the party finder, replay the invite dialog, or exercise the invite packet and acceptance handlers. Use a test that drives those handlers when the invitation flow itself is what you need to prove.

## Write the cube

Save this example as `open_party_cube.lua`. It is a cube written for this page.

```lua
-- The open-party cube: the rule of the party join policy tutorial, proved without a client.
--
--  O1  stock     two same-empire players 50 levels apart are refused: the stock rule is live
--  O2  policy    with the tutorial's guard and verdict registered, the same pair forms a party
--  O3  control   the same pair on a map outside the guard is still refused
--  O4  empire    players of two empires form a party under the verdict
--  O5  stock     with the policy gone, the same empire pair is refused again
--
-- Fixtures: synthetic players from sim.spawn_pc on the scratch map and on a private copy of it.

local T = { pass = 0, fail = 0, notes = {} }
local MAP = sim.map_index()
local SM = forge.sys.game.sectree_manager
local POLICY = forge.sys.game.party_join_policy
local ERR = POLICY.ERROR

local function check(cond, msg)
    if cond then T.pass = T.pass + 1 else error("CHECK FAILED: " .. msg, 2) end
end

local function test(name, fn)
    local ok, err = pcall(fn)
    if ok then
        T.notes[#T.notes + 1] = "ok    " .. name
    else
        T.fail = T.fail + 1
        T.notes[#T.notes + 1] = string.format("FAIL  %-40s %s", name, tostring(err))
    end
end

local function pc(map, x, level, empire)
    local vid = sim.spawn_pc({ map = map, x = x, y = 25600, job = "warrior", level = level })
    check(vid ~= nil and vid > 0, "spawn_pc must return a live vid")
    check(sim.set_empire(vid, empire) == empire, "the empire must be set")
    local ch = forge.sys.game.char_manager.find(vid)
    check(ch ~= nil, "char_manager.find must resolve the spawned PC")
    check(ch:get_level() == level, "the PC must have the level the face asks for")
    return { vid = vid, ch = ch, pid = ch:get_player_id() }
end

local function pair(map, leader_level, guest_level, leader_empire, guest_empire)
    return pc(map, 24000, leader_level, leader_empire), pc(map, 24100, guest_level, guest_empire)
end

local function drop(a, b)
    check(sim.destroy(a.vid) and sim.destroy(b.vid), "the fixtures must log out")
end

check(sim.party_enable(true), "PC party admission must be enabled")

test("O1 stock refuses a wide level gap", function()
    local a, b = pair(MAP, 90, 40, 1, 1)
    local err = sim.party_join(a.vid, b.vid)
    check(err == ERR.PERR_LVBOUNDARY, "the stock rule must refuse (error " .. tostring(err) .. ")")
    check(b.ch:get_party_leader_pid() == 0, "a refused guest must not be in a party")
    drop(a, b)
end)

local handle = POLICY.register("open_party_cube",
    function(leader, guest) return leader:get_map_index() == MAP and guest:get_map_index() == MAP end,
    function() return { same_empire = false, level_window = 0 } end)
check(handle > 0, "the policy must register")

test("O2 the policy admits the pair", function()
    local a, b = pair(MAP, 90, 40, 1, 1)
    local err = sim.party_join(a.vid, b.vid)
    check(err == ERR.PERR_NONE, "the policy must admit the pair (error " .. tostring(err) .. ")")
    check(b.ch:get_party_leader_pid() == a.pid, "the guest must see the leader")
    drop(a, b)
end)

test("O3 a map outside the guard keeps the stock rule", function()
    local copy = SM.create_private_map(MAP // 10000)
    check(copy and copy > 0, "the scratch map must instance")
    local a, b = pair(copy, 90, 40, 1, 1)
    local err = sim.party_join(a.vid, b.vid)
    check(err == ERR.PERR_LVBOUNDARY, "outside the guard the stock rule must refuse (error " .. tostring(err) .. ")")
    drop(a, b)
    SM.destroy_private_map(copy)
end)

test("O4 two empires form a party", function()
    local a, b = pair(MAP, 60, 60, 1, 2)
    local err = sim.party_join(a.vid, b.vid)
    check(err == ERR.PERR_NONE, "the verdict must admit two empires (error " .. tostring(err) .. ")")
    drop(a, b)
end)

check(POLICY.unregister(handle), "the policy must unregister")

test("O5 without the policy the stock rule is back", function()
    local a, b = pair(MAP, 60, 60, 1, 2)
    local err = sim.party_join(a.vid, b.vid)
    check(err == ERR.PERR_DIFFEMPIRE, "two empires must be refused again (error " .. tostring(err) .. ")")
    drop(a, b)
end)

for _, line in ipairs(T.notes) do print(line) end
print("")
print(string.format(" checks passed: %d    tests failed: %d", T.pass, T.fail))
print(T.fail == 0 and " OPEN PARTY FACES O1-O5 SOLVED" or " CUBE INCOMPLETE")
print("")
```

`sim.destroy(vid)` removes the character, which is the simulator's logout; `drop()` uses it so one face's players do not leak into the next. `pc()` makes the fixture prove it is live: it checks the VID, resolves the character, reads its level back, and checks the empire returned by `sim.set_empire`. `pair()` runs those checks for both players. The cube also checks that party admission is enabled before any face runs.

O1 establishes that the stock level rule refuses the wide gap. It checks that the guest has no party leader as well as checking the error: a refusal result alone would not prove the guest remained outside a party. O2 checks that the same levels and empire can form a party under the policy, and that the guest sees the expected leader.

O3 is a negative control while the policy is registered: the same level gap on a private map outside the guard must still be refused. O4 checks admission across empires under the verdict. After unregistering the policy, O5 checks that the stock rule refuses the same empire combination again.

## Run it and read the verdict

Add the cube to the cube runner table and run it by its registered name, or run `game_sim --script` on the file with the simulator data staged for the run. See the [simulator reference](/docs/core/simulator/) for runner options and the [verdict rules](/docs/core/simulator#verdict-rules).

Read the verdict and failure lines in the output, not the cube process exit code alone. On the passing path, expect **56 checks passed** and **0 tests failed**, followed by `OPEN PARTY FACES O1-O5 SOLVED`. Each `pair()` contributes 8 checks (4 per player), so the faces count O1 11, O2 11, O3 11 (including the private-map check), O4 10 and O5 10, which is 53; the enabled-admission, register and unregister checks outside the faces add 3. A lower total can mean that assertions did not execute.

## Diagnose a failure

A failed assertion produces a `CHECK FAILED` message in its face's `FAIL` line. `test()` catches the error so later faces can run, and the final verdict is `CUBE INCOMPLETE`. Setup checks outside a face can instead stop the driver before it prints a cube verdict.

A face that fails before cleanup can leave fixtures or a policy registered. This cube unregisters its policy after O4, even if a face fails, but an error outside the protected faces can stop execution before that point. When adapting the pattern to register policies inside faces, arrange cleanup for the failure path as well.

A refused join alone is a weak control. Establish that the stock rule refuses the intended pair, as O1 does, and check the specific error. Otherwise a disabled party system or another admission condition could make a test appear to prove the policy.

This cube needs no pulses. For a test that waits on a time-based condition, `sim.step` drives pulses but does not advance global time. Use `sim.advance_time` when the condition depends on global time.

## See also

- [Simulator reference](/docs/core/simulator/)
- [Lift the party rules on one map](/tutorials/party-join-policy)
- [Party join policy reference](/docs/building-blocks/party-join-policy)
