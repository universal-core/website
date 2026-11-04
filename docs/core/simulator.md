---
title: "Simulator reference: cubes, gates, and bindings"
description: Run simulator cubes and differential gates, read their verdicts, and use the simulator bindings.
displayed_sidebar: mainSidebar
---

# Simulator reference

The simulator runs game engine behavior headlessly under a Lua driver, with a staged world and observable infrastructure boundaries. Use it to test scenarios, compare behavior, and calibrate outcomes; the [simulator foundations](/foundations/simulator/) describe its design.

The engine is private.

## Running cubes

Use the cube runner with cube names to select runs. With no names, it runs the cubes in its table. `--jobs N` sets the number of parallel jobs; `--kill-orphans` requests termination of existing simulator processes. Identify those processes before using the flag: it kills them forcefully.

The runner returns:

| Exit code | Meaning |
|---|---|
| `0` | At least one cube passed, and none failed or lacked a verdict. |
| `1` | A cube failed. |
| `2` | A name is unknown, a cube is missing or has no verdict, no work was selected, or staging failed. |
| `3` | Existing simulator processes were found, or survived the requested orphan kill. |

Read each cube's verdict and failure lines from its output. The runner records the process exit code, but classifies the cube by its output. A driver error also produces a process-level exit code of `1`; that is distinct from the runner's aggregate exit code.

## Cube shape

A cube groups assertions into faces. Each face runs under `pcall`, so a failure is recorded and the remaining faces can run. Prove that the setup is live before checking its result, and include a negative control.

A cube is one Lua file with four parts: a header that lists the faces, the fixtures and the run line; two helpers, `check` (raises on a false condition) and `test` (runs a face under `pcall` and records it); the faces; and the verdict lines. Nothing in the engine asserts for you, the cube carries its own helpers.

```lua
local T = { pass = 0, fail = 0, notes = {} }

local function check(cond, msg)
    if cond then T.pass = T.pass + 1 else error("CHECK FAILED: " .. msg, 2) end
end

local function test(name, fn)
    local ok, err = pcall(fn)
    if ok then
        T.notes[#T.notes + 1] = "ok    " .. name
    else
        T.fail = T.fail + 1
        T.notes[#T.notes + 1] = string.format("FAIL  %-56s %s", name, tostring(err))
    end
end

test("A1 the setup is live", function()
    local vid = sim.spawn_pc({ job = "warrior", level = 30, x = 24000, y = 25600 })
    check(vid ~= nil and vid > 0, "spawn_pc must return a live vid")
end)

for _, line in ipairs(T.notes) do print(line) end
print("")
print(string.format(" checks passed: %d    tests failed: %d", T.pass, T.fail))
print(T.fail == 0 and " SKELETON FACES A1-A1 SOLVED" or " CUBE INCOMPLETE")
```

Start the file with a comment that lists each face on one line, the fixtures it loads, and the command that runs it. A binding that returns nothing is read back through its getter; never wrap it in `check`.

## Verdict grammar

A cube prints `checks passed: N    tests failed: N`, followed by a line ending in `SOLVED` or `CUBE INCOMPLETE`. The runner also recognizes uppercase verdict tokens ending in `_OK` or `_FAILED`, and inspects `FAIL ` lines and the `tests failed: N` count. A failure takes precedence over a success token. `tests failed: 0` can count as a pass without a token; output with no recognized verdict is reported separately.

Compare the check count with the last run. A passing verdict with fewer checks may mean that a face or assertion no longer runs.

## Binding areas

The simulator registers more than 200 bindings under `sim`. This table is an index of areas and names.

| Area | Names |
|---|---|
| World and lifecycle | `seed`, `step`, `reset`, `fork_scenario`, `child_exit`, `timeline`, `report`, `bench`, `pulse`, `log`, `map_index`, `leak_check`, `kill`, `destroy`, `sync`, `set_event_flag`, `set_quest_flag`, `quest_flag` |
| PC and party | `spawn_pc`, `pc_pos`, `pc_place`, `pc_hp`, `pc_att`, `set_empire`, `party_enable`, `party_join`, `party_link`, `party_guild_group`, `party_alive` |
| Combat and observation | `attack`, `cast_skill`, `use_skill`, `client_hit`, `mob_skill`, `mob_skill_info`, `shoot`, `affects`, `points`, `point`, `flags`, `skill_state`, `can_target` |
| Guild and empire | `guild_create`, `guild_join`, `guild_set_name`, `guild_set_skill`, `guild_gold`, `guild_war`, `empire_gold`, `intracore_deliver` |
| Footprint, land, and deployment | `footprint_new`, `footprint_apply`, `footprint_cells`, `land_register`, `land_grid`, `land_apply_cell`, `land_apply_land`, `land_land`, `deploy_proto_load`, `deploy_apply`, `deploy_get`, `deploy_process`, `unit_apply`, `unit_get` |
| Map, movement, and assets | `map_block_of`, `map_watch`, `map_request`, `input_split_probe`, `asset_png`, `asset_upload`, `client_move`, `route_search`, `route_stats` |
| Gates and passage | `gate_open`, `gate_close`, `gate_state`; passage also provides canvas and survey functions |
| Spectator | `spectator_camera`, `spectator_cycle`, `spectator_invalidate`, `spectator_state`, `spectator_metrics` |
| Wire and DB | `capture`, `packets`, `client_message`, `peer_deliver`, `peer_message`, `db_on`, `db_insert`, `db_put`, `db_delete`, `db_get`, `db_rows`, `db_forward`, `db_deliver`, `db_log`, `db_stats` |
| Codec | `struct_define`, `struct_size`, `struct_encode`, `struct_decode` |
| Forge and quest | `quest_boot`, `quest_login`, `forge_has_processor`, `quest_info` |
| Real links | `db_linked`, `db_link_stats`, `db_link_pump`, `db_link_drop`, `db_send`, `peer_count`, `p2p_send`, `p2p_stats` |
| Records and time | `bg_open`, `bg_close`, `bg_probe`, `bg_note`, `data_dir`, `advance_time` |

Selected contracts:

| Binding | Behavior |
|---|---|
| `sim.step([pulses = 1])` | Drives pulses and returns no Lua values. It does not advance global time. |
| `sim.advance_time(seconds)` | Advances global time and drives each second's pulses. Negative input raises an error. |
| `sim.spawn_pc{ x=, y=, job= \| player_file=, ... }` | Spawns a PC and returns its VID. Options include `map`, `immortal`, `bonuses`, `items`, `skill`, `buff`, and `hp`. |
| `sim.set_empire(vid, empire)` | Sets and returns the resulting empire integer. |
| `sim.party_enable(boolean)` | Sets and returns whether party admission is enabled. |
| `sim.party_join(leader_vid, guest_vid)` | Resolves policy and the common admission condition, then admits directly. Returns a numeric party admission error. It does not replay the invite dialog or acceptance path. |
| `sim.quest_boot()` | Returns `boot_init_ok, boot_ok`. A false boot-event return can mean no quest handled the event. |
| `sim.quest_login(vid)` | Establishes the quest-loaded state required for PC quest events. |
| `sim.forge_has_processor(ns, header[, kind])` | Checks for a registered processor. Kind `1` selects peer processors. |
| `sim.fork_scenario()` | Returns true in the child, allowing a scenario to run in an isolated process. |
| `sim.child_exit()` | Flushes output and exits the child. |
| `sim.client_message(vid, ns, header[, payload[, client_handler]]) -> bool` | Delivers a Luna client message. It does not carry the legacy party invite packet. |
| `sim.peer_message(peer, ns, header, payload, receipt)` | Invokes the peer processor path. |
| `sim.packets` | Reads captured packets; the DB capture cannot be drained while the in-process DB is open. |
| `sim.capture` | Controls packet capture at the simulated boundary. |

## Real and simulated boundaries

| Area | Real behavior | Simulated or selected boundary |
|---|---|---|
| Game | Engine managers, rules, quest VM, and game entry points | A Lua driver stages the world and drives the scenario. |
| Time | Engine events and character updates | The driver advances pulses and global time separately. |
| Network | Packet handling and engine writes | Captured buffers are the default; real DB and peer links are optional. |
| Database | Gameplay issues serialized requests | An in-process DB supplies configured answers, or a real headless DB link can be used. |
| Content | Forge artifacts, quest objects, and protos | The driver chooses and stages the data. |

A staged world proves behavior under that setup. It does not by itself prove that the setup represents a live world.

## Harness families

A **differential gate** starts with a manifest. The probe runner resets and stages each probe, observes before and after an action, checks liveness, and emits records. A diff report compares records and classifies changed keys against declared expectations. Keep fixture identity, build flavor, and manifest order consistent across comparable runs: the pulse count accumulates across resets. A clean diff alone does not prove a probe measured anything.

A **cube** states expected behavior as assertions. Its faces accumulate checks and failures and print a verdict. Use setup assertions and negative controls to establish that each face exercises the behavior it claims.

Calibration is another simulator use: it tunes toward an objective rather than comparing two records.

## C++ registration

The bindings are registered natively in C++. A cube uses the registered table; it does not register these bindings in Lua.

| Registrar | Area |
|---|---|
| Main simulator table | World, lifecycle, characters, combat, time, and other simulator operations |
| Wire | Packet capture and message delivery |
| Database | Simulated DB operations |
| Codec | Structure definition and encoding |
| Passage | Passage, canvas, and survey operations |

## Pitfalls

**A probe passes without measuring the behavior.** Missing SP, an uncast buff, the wrong skill class, an untriggered condition, or a damage floor can produce plausible observations. Assert the preconditions and use the probe's liveness check.

**PC quest events never reach Lua.** A spawned PC needs quest-loaded state. Call `sim.quest_login(vid)` before testing its quest events.

**A Forge table exists but its processor is absent.** Some processors register through the boot quest object. Stage both the compiled Forge artifact and quest object, call `sim.quest_boot()`, and check `sim.forge_has_processor`.

**A cooldown never expires.** `sim.step` drives pulses without moving global time. Use `sim.advance_time` for a gate based on global time.

**An affect-duration assertion has an unexpected result.** Affect durations tick once per second through the engine's own affect event as live; keep a control probe that reads the rate beside anything that depends on a duration.

**A successful land update fails its check.** `sim.land_apply_land` returns no value. Read the applied state back with `sim.land_land` and assert on that.

**DB packet capture refuses to drain.** The in-process DB needs the captured messages to answer requests. Inspect DB statistics and logs instead.

**A real DB link fails while the DB double is enabled.** Capturing an armed DB descriptor can swallow the socket handshake. Use the in-process DB or the real DB link, not both.

**A linked DB does not respond after stepping pulses.** Pulses do not wait for real socket I/O. Use `sim.db_link_pump(ms)` to pump the linked DB.

**An observation uses a stale character.** A character can be destroyed after death. Resolve it by VID each time you need it.

**Point traversal stops early.** The points table omits zero entries, so gaps can truncate array traversal. Use the named point accessor or deliberate numeric indices.

**A received-message count passes for the wrong message.** An unrelated DB or peer message can increment the generic count. Check the expected header in `by_header`.

**A party admission test claims to cover an invite.** `sim.party_join` exercises direct admission and its policy checks, but bypasses the invite and acceptance handlers. Drive and observe those handlers when the full invite path is the behavior under test.

## See also

- [Simulator foundations](/foundations/simulator/)
- [Write a simulator cube](/docs/core/simulator-write-a-cube)
