---
title: Battle arbiter
description: How the engine asks Lua whether one character may attack another, and how to register a guard and verdict pair that answers for your event, war or map.
displayed_sidebar: mainSidebar
---

Every time the server needs to know whether character A may hurt character B, it calls one function, `battle_is_attackable`. The engine owns that question. Lua owns the answer, for the pairs you claim. You claim them by registering an arbiter: a name, a `guard` function that says "this pair is mine", and a `can_attack` function that says `Allow`, `Deny` or `Pass`.

The registry is `forge.sys.game.battle_arbiter_registry`. This is a complete arbiter, taken from the EvE classic event. It is registered when the event is set up and dropped when it is torn down:

```lua
local VERDICT = forge.sys.game.battle_arbiter_registry.BATTLE_VERDICT
eve_classic.battle_handle = forge.sys.game.battle_arbiter_registry.register(
    "eve:" .. id,
    function(att, vic) return att:get_map_index() == map_index and vic:get_map_index() == map_index end,
    function(att, vic)
        if not forge.game.ue_eve_manager:is_engaged(id) then return VERDICT.Deny end
        if att:is_pc() and vic:is_pc() and att:get_empire() ~= vic:get_empire() then
            return VERDICT.Allow
        end
        return VERDICT.Deny
    end)
```

The guard owns every pair on the event map. The verdict denies everything before the fight is engaged, allows player against player across empires afterwards, and denies the rest. The teardown hook releases it:

```lua
if eve_classic.battle_handle ~= nil then
    forge.sys.game.battle_arbiter_registry.unregister(eve_classic.battle_handle)
    eve_classic.battle_handle = nil
end
```

No C++ was touched to give that map its own combat rules. The rest of the page is what you need to know to write one that does what you meant.

## The question the engine asks

`battle_is_attackable` is the one predicate behind a lot of unrelated things. A call to it, and therefore a call to your guard, happens for:

| Decision | What it means for your arbiter |
|---|---|
| A character's basic attack and every melee hit | Each swing is asked. |
| Skill target validation for enemy-only skills | A skill flagged enemy-only is refused with `deny:enemyonly` when the answer is no. |
| Skill subject relation | Targeting classifies a target as enemy or ally through the same call. |
| Buff eligibility (`is_buffable`) | Asked as a negative: an attackable pair is never an ally. |
| Every tick of poison, fire and bleeding | If the pair is no longer attackable, the damage-over-time event ends. |
| Quest area damage and drain functions (`damage_in_map`, `damage_in_map_radius`, `damage_in_map_pct` and their drain siblings) | Asked once per entity the function visits. |
| Quest damage to a vid (`damage_to_vid`, `damage_to_vid_pct`) | Asked per call; a `Deny` makes the call do nothing. |
| Target acceptance for land-deployment presences and structures | Asked when an order picks a target. |

A second place, `on_damage`, asks after damage lands, to decide killer-mode flagging. It uses the registry differently and is covered in the next section.

The pairs are not only player against player. Mobs, NPCs, guards, doors and structures reach the same function, and so reach your guard. If you only compare map indexes, you own mob against mob on that map as well.

Two of these sites show what "the engine asks" looks like in code. The skill check:

```cpp
else if (IS_SET(unFlag, SKILL_FLAG_ALLYONLY) && !is_buffable(this, pkVictim))
    szDeny = "deny:allyonly";
else if (IS_SET(unFlag, SKILL_FLAG_ENEMYONLY) && !battle_is_attackable(this, pkVictim))
    szDeny = "deny:enemyonly";
```

And the poison tick, which kills the poison event the moment the answer turns negative:

```cpp
if (pkAttacker && !battle_is_attackable(pkAttacker, ch)) {
    ch->m_pkPoisonEvent = NULL;
    return 0;
}
```

## Where your answer sits

The engine decides in a fixed order. Your arbiter sits at step 2.

1. Absolute vetoes. Nothing overrides these: the victim is dead or an observer, the victim is a mount (`GetRider`) or a pet, either character stands on an `ATTR_BANPK` safe zone, or the attacker is stunned, dead or an observer.
2. The registry. The first arbiter that answers `Allow` or `Deny` ends the decision.
3. The session fallback in the team manager (`forge.sys.game.pvp_team_manager`), for player pairs. It returns `Pass` for anything that is not player against player, for two players outside any session, and for session members who are not both on the session's map. It returns `Deny` when exactly one side is in a session, when the two are in different sessions, when their teams are allied (a team is always allied with itself), and while the session's attacks are not enabled. Otherwise `Allow`.
4. Same party: no attack.
5. Empire no-attack flags, the xmas mob rule, the NPC skill-flag rule, mob against mob, the `IsAttackNpc` summon match, and the NPC empire and guard NPC rules.
6. Domain, hardcoded, when the domain is in the fighting state.
7. The duel and PK-mode rules in the PvP manager.

The whole function, so you can check each step against the list:

```cpp
bool battle_is_attackable(LPCHARACTER ch, LPCHARACTER victim)
{
    // --- Absolute vetoes (not overridable by competitions) ---
    if(victim->IsDead() || victim->IsObserverMode())
        return false;

    // Pet and mount are never attackable.
    if (victim->GetRider() || victim->IsPet())
        return false;

    {
        SECTREE *sectree = NULL;

        sectree = ch->GetSectree();
        if(sectree && sectree->IsAttr(ch->GetX(), ch->GetY(), ATTR_BANPK))
            return false;

        sectree = victim->GetSectree();
        if(sectree && sectree->IsAttr(victim->GetX(), victim->GetY(), ATTR_BANPK))
            return false;
    }

    if(ch->IsStun() || ch->IsDead() || ch->IsObserverMode())
        return false;

    // --- Competition arbiter chain ---
    // Each gameplay system (arena, domain, future events) registers a
    // (Guard, CanAttack) pair. First arbiter whose Guard fires returns
    // the verdict; Allow/Deny short-circuit, Pass continues. CPvPTeamManager
    // is consulted by arbiters as a building block but is NOT itself an
    // arbiter — membership alone is not the whole rule.
    switch (CBattleArbiterRegistry::instance().Resolve(ch, victim)) {
        case BattleVerdict::Allow: return true;
        case BattleVerdict::Deny:  return false;
        case BattleVerdict::Pass:  break;
    }

    // Session-level fallback — short-circuits to Pass for non-session pairs.
    switch (CPvPTeamManager::instance().CanAttack(ch, victim)) {
        case BattleVerdict::Allow: return true;
        case BattleVerdict::Deny:  return false;
        case BattleVerdict::Pass:  break;
    }

    // --- Default PvP rules (party / guild / empire) ---
    if (ch->GetParty() && ch->GetParty() == victim->GetParty())
        return false;

    if((ch->GetEmpire() == 1 && victim->IsNoAttackShinsu()) ||
        (ch->GetEmpire() == 2 && victim->IsNoAttackChunjo()) ||
        (ch->GetEmpire() == 3 && victim->IsNoAttackJinno()))
        return false;

    if(CMobVnumHelper::IsXmasRateMob(victim->GetRaceNum() && ch->GetEmpire() == victim->GetEmpire()))
        return false;

    // Check special affect needed to attack an NPC
    if(victim->IsNPC() && !victim->CanAttackMobBySkillFlag(ch))
        return false;

    //If both are monster, at least one has to be IsAttackMob
    if((victim->IsNPC() && !victim->IsNPCStrict()) && (ch->IsNPC() && !ch->IsNPCStrict()) && !(victim->IsAttackMob() || ch->IsAttackMob()))
        return false;

    // If attacker is IsAttackNpc, the victim has to match GetSummonVnum
    // If so, true, if not, false
    if(ch->IsAttackNpc())
    {
        if(ch->GetSummonVnum() == victim->GetRaceNum())
            return true; //No furter checks because the attacker is forced to attack the victim
        else
            return false;
    }
    //Start checks in the case of both NPC (generic, not strict)
    if(victim->IsNPC() && ch->IsNPC())
    {
        //If both have an empire, check not equal
        if(victim->GetEmpire() && ch->GetEmpire() && victim->GetEmpire() == ch->GetEmpire())
        {
            return false;
        }

        //No further checks GuardNPC are allowed to attack monster not of the same empire
        if(ch->IsGuardNPC() && (victim->IsMonster() || victim->IsBoss()))
            return true;
    }

    // domain checks
    CDomain * chDomain = CDomainManager::instance().GetDomainByCoords(ch);
    CDomain * victimDomain = CDomainManager::instance().GetDomainByCoords(victim);
    if (chDomain && victimDomain && victimDomain == chDomain && chDomain->GetStatus() == DOMAIN_STATUS_FIGHTING)
        return chDomain->CanAttack(ch, victim);

    return CPVPManager::instance().CanAttack(ch, victim);
}
```

Two consequences. You cannot allow an attack on a dead victim or inside a safe zone, however you answer. And everything from step 3 down is yours to override: party, empire flags, NPC rules, domain, PK mode and duels. A `Deny` beats the duel system; an `Allow` beats the party check.

What `Pass` from everything means: the server's ordinary rules, steps 3 to 7. There is no default deny. With nothing registered the registry returns `Pass` and the game behaves as if it did not exist.

### Killer mode

`on_damage` flags an attacker as a killer when same-empire players fight outside any recognized competition. It asks the registry too, but only cares about one answer:

```cpp
void on_damage(LPCHARACTER pkChr, LPCHARACTER pkVictim) {
    if (!pkChr || !pkVictim) {
        return;
    }

    if (!pkChr->IsPC() || !pkVictim->IsPC()) {
        return;
    }

    if(pkChr->GetEmpire() != pkVictim->GetEmpire()) {
        return;
    }

    // Competition arbiter chain — same dispatch as battle_is_attackable
    // but here we only care about Allow (don't flag as killer); Deny
    // and Pass mean "this attack falls under non-arbiter rules" and we
    // continue down to the 1v1 / killer-mode logic.
    if (CBattleArbiterRegistry::instance().Resolve(pkChr, pkVictim) == BattleVerdict::Allow) {
        return;
    }

    if (CPvPTeamManager::instance().CanAttack(pkChr, pkVictim) == BattleVerdict::Allow) {
        return;
    }

    // domain checks
    CDomain * chDomain = CDomainManager::instance().GetDomainByCoords(pkChr);
    CDomain * victimDomain = CDomainManager::instance().GetDomainByCoords(pkVictim);
    if (chDomain && victimDomain && victimDomain == chDomain && chDomain->GetStatus() == DOMAIN_STATUS_FIGHTING) {
        if(chDomain->CanAttack(pkChr, pkVictim)) {
            return;
        }
    }

    // pvp check
    CPVP kPVP(pkChr->GetPlayerID(), pkVictim->GetPlayerID());
    CPVP * pkPVP = CPVPManager::instance().Find(kPVP.GetCRC());

    if(pkPVP && pkPVP->IsFight()) {
        return;
    }

    if(pkVictim->IsKillerMode() || pkVictim->GetAlignment() < 0)
        return;

    pkChr->SetKillerMode(true);
}
```

`Allow` means "this is a sanctioned fight, do not flag". `Deny` and `Pass` change nothing here; the call falls through to the session check, the domain, duels and the alignment rules. The function returns before it asks the registry if either side is not a player or if the empires differ, so your arbiter has no say over killer mode for cross-empire fights or for mobs.

## Registering an arbiter

The two functions are `forge.sys.game.battle_arbiter_registry.register(name, guard, can_attack)` and `forge.sys.game.battle_arbiter_registry.unregister(handle)`.

`BATTLE_VERDICT` is on the same table, with three values: `Allow`, `Deny` and `Pass`. They are the C++ enum below, exposed as numbers in declaration order, so `Allow` is `0`. A bare `return 0` therefore means `Allow`, and `0` is not falsy in Lua. Always write the names.

```cpp
enum class BattleVerdict : uint8_t
{
    Allow,   // attack permitted
    Deny,    // attack blocked
    Pass,    // no opinion — caller falls through to the next arbiter
             // / default rules
};
```

`register` takes a name, a guard and a verdict function. It returns a handle. The name is only logged. It is never compared, so two arbiters with the same name are two arbiters. The handle is the only way to remove one: `unregister` takes the handle, not the name, and returns `true` if it found and removed an arbiter. Handles count up and are never reused, so a stale handle cannot remove somebody else's arbiter.

What the binding does, in order:

```cpp
reg.set_function("register",
    [bridge](std::string name,
             sol::protected_function guard,
             sol::protected_function can_attack,
             sol::this_environment te) -> uint64_t {

    policy::RequireCallable(guard,      kBattleAxis, "guard");
    policy::RequireCallable(can_attack, kBattleAxis, "can_attack");

    auto attack_fn = bridge->PinTypedCall<BattleVerdict, LPCHARACTER, LPCHARACTER>(
        can_attack, sol::type::number, BattleVerdict::Pass,
        std::string(kBattleAxis) + " " + name + " can_attack",
        dispatch::Kind::CALLBACK, dispatch::DeriveForgeNs(can_attack, te));

    return CBattleArbiterRegistry::instance().Register(
        name,
        policy::Guard<LPCHARACTER, LPCHARACTER>(bridge, kBattleAxis, name, guard, te),
        std::move(attack_fn));
});
```

1. Both slots must be Lua functions. Anything else throws at register time, with a message such as `battle_arbiter_registry.register: guard is not callable` (or `can_attack is not callable`).
2. `can_attack` is wrapped so that it must return a Lua number. A Lua error or any other return type becomes `Pass`.
3. `guard` is wrapped so that it must return a Lua boolean. A Lua error or any other return type becomes `false`.
4. The arbiter is appended to the registry and the handle comes back.

The wrapped functions hold your Lua functions pinned, so you may pass closures; the war referee below depends on that.

The annotation file the editor reads for this table is the whole surface in one place:

```lua
---@meta

---@class forge.sys.game.battle_arbiter_registry
forge.sys.game.battle_arbiter_registry = {}

---Verdict tribool returned by an arbiter's `can_attack`   
---falling through to default rules if no   
---arbiter produces an Allow / Deny.   
---@class forge.sys.game.battle_arbiter_registry.BATTLE_VERDICT   
---@field Allow number # Attack permitted — short-circuits to `true`   
---@field Deny number # Attack blocked — short-circuits to `false`   
---@field Pass number # No opinion — caller falls through to the next arbiter   
forge.sys.game.battle_arbiter_registry.BATTLE_VERDICT = {}

---Registers a competition arbiter — a (Guard, CanAttack) pair that participates in the `battle_is_attackable` / `on_damage` dispatch chain.   
---Registration order is dispatch order:   
---arbiters are walked in turn, and any whose `guard` returns `true` has its `can_attack` consulted.   
---The first arbiter producing `Allow` or `Deny` wins; `Pass` lets the chain continue to the next arbiter.   
---If every arbiter passes (or none guards `true`), `Resolve` returns `Pass` and the   
---caller falls through to the default rule chain.   
---   
---Guard errors fail CLOSED (the arbiter does not vote); a `can_attack`   
---error degrades to `Pass`, so one broken event script cannot deadlock combat.  
---@param name string # Logged on errors; cosmetic, duplicates allowed 
---@param guard fun(att: LPCHARACTER, vic: LPCHARACTER): boolean # Predicate that returns `true` if this arbiter owns the verdict for the (att, vic) pair 
---@param can_attack fun(att: LPCHARACTER, vic: LPCHARACTER): forge.sys.game.battle_arbiter_registry.BATTLE_VERDICT # Verdict callback, only invoked when `guard` returned `true` 
---```lua 
---function guard(att, vic) 
--- ---@param att LPCHARACTER # The attacker 
--- ---@param vic LPCHARACTER # The victim 
--- ---@return boolean # true when this arbiter wants to vote on this pair 
---end
---function can_attack(att, vic) 
--- ---@param att LPCHARACTER # The attacker 
--- ---@param vic LPCHARACTER # The victim 
--- ---@return forge.sys.game.battle_arbiter_registry.BATTLE_VERDICT # Allow / Deny / Pass 
---end 
---``` 
---@return number # Arbiter handle (`> 0` on success, `0` on registration failure) 
---@see forge.sys.game.battle_arbiter_registry.BATTLE_VERDICT 
function forge.sys.game.battle_arbiter_registry.register(name, guard, can_attack) end

---Drops a previously registered arbiter.   
---@param handle number # Handle returned by `register`   
---@return boolean # `true` if a matching arbiter was found and removed   
function forge.sys.game.battle_arbiter_registry.unregister(handle) end
```

Its `@return number # Arbiter handle (`> 0` on success, `0` on registration failure)` is optimistic: a non-callable slot throws before the registry is reached, so in practice you either get a handle or an error.

Register when the thing you are judging begins, unregister when it ends, and keep the handle in a field of your own table. Both real Lua arbiters do exactly that, and check `~= nil` before unregistering and clear the field after. Re-running a setup hook without its teardown registers a second arbiter that sits ahead of the new one and can never be removed once you lose the handle.

Do not call `register` or `unregister` from inside a guard or a verdict callback. See the traps.

## Guard and verdict

Two functions, because they answer different questions.

`guard(att, vic)` answers "is this pair mine?". It must return a boolean. `can_attack(att, vic)` answers "what do I say about it?". It is only called for pairs where the guard returned `true`, and it must return a `BATTLE_VERDICT` value. Both receive the attacker and the victim as characters, in that order.

The split keeps the cost of the common case low and the verdict simple. Scope belongs in the guard: a map, a team roster, a time window. Once you are inside the verdict you can assume the pair is yours and write the rules as a short list. A map-scoped guard is a comparison of two map indexes, which is all either real Lua arbiter does.

The guard runs for every attackability check on the server, not for the checks on your map. The registry is one global list walked on every `battle_is_attackable` call, and that call happens per attack, per damage-over-time tick, per entity in an area functor and per buff check. Each Lua guard is a crossing from C++ into Lua. Keep guards to a cheap comparison and put the work in the verdict. The record has no measurement of the cost of a Lua guard per attack, so treat this as a design rule and not as a number.

Return types are strict:

| Callback | Must return | If not |
|---|---|---|
| `guard` | a Lua boolean | treated as `false`, error logged |
| `can_attack` | a Lua number, in practice `VERDICT.Allow`, `VERDICT.Deny` or `VERDICT.Pass` | treated as `Pass`, error logged |

The wrapper that enforces this is the same for the guard on every policy axis. A guard answers a boolean and fails closed, so a broken guard never applies its rule:

```cpp
template <typename... Args>
std::function<bool(Args...)> Guard(Bridge* bridge, const char* axis,
                                   const std::string& name,
                                   const sol::protected_function& fn,
                                   const sol::this_environment& te)
{
    return bridge->PinTypedCall<bool, Args...>(
        fn, sol::type::boolean, false,
        std::string(axis) + " " + name + " guard",
        dispatch::Kind::CALLBACK, dispatch::DeriveForgeNs(fn, te));
}
```

And the generic pinned call, with its type check and its fallback value:

```cpp
std::function<Ret(Args...)> PinTypedCall(
    const sol::protected_function& fn,
    sol::type expectedType,
    Ret onError,
    std::string context = {},
    dispatch::Kind kind = dispatch::Kind::CALLBACK,
    std::string forge_ns = {})
{
    if (forge_ns.empty())
        forge_ns = dispatch::DeriveForgeNs(fn);
    auto pin = PinScoped(fn);
    return [this, pin, expectedType, onError = std::move(onError),
            context = std::move(context), kind,
            ns = std::move(forge_ns)](Args... args) -> Ret {
        sol::protected_function f =
            GetPinnedObject<sol::protected_function>(*pin);
        sol::protected_function_result result =
            Call({ ns, kind, context }, f, args...);
        auto [val, ok] =
            ValidateProcessorInvocation<Ret>(result, expectedType);
        if (!ok) {
            if (!context.empty())
                LogPinnedCallError(context);
            return onError;
        }
        return val;
    };
}
```

## Allow, Deny, Pass, and order

```cpp
BattleVerdict CBattleArbiterRegistry::Resolve(LPCHARACTER att, LPCHARACTER vic) const
{
    for (const Arbiter& a : m_arbiters) {
        if (!a.guard(att, vic)) continue;

        BattleVerdict v = a.can_attack(att, vic);
        switch (v) {
            case BattleVerdict::Allow: return BattleVerdict::Allow;
            case BattleVerdict::Deny:  return BattleVerdict::Deny;
            case BattleVerdict::Pass:  continue;   // arbiter declined this call
        }
    }
    return BattleVerdict::Pass;
}
```

That is the whole algorithm.

- Order is registration order and nothing else. There is no priority parameter. If two events can claim the same pair, the one registered first speaks first.
- Answers do not combine. The first arbiter whose guard is `true` and whose verdict is `Allow` or `Deny` ends the walk, and later arbiters are not called. There is no voting and no rule that any `Deny` wins.
- `Pass` means "this pair is mine, but I have no opinion on it now". The walk continues to the next arbiter and then to the ordinary rules. Use it when your arbiter is the right scope but a sub-case is not yours to decide, for example a team event that wants the default party and empire rules to apply to spectators.
- A guard that returns `false` is the same as not being registered for that call.

C++ arbiters registered at boot come first, and a Lua arbiter does not outrank them. At present there is one: `land_deployment`, for guild presences (the guards and structures a guild raises on its land). For any pair where either side is a guild presence it always answers `Allow` or `Deny`, so a Lua arbiter never gets to vote on those pairs. It is registered from the deployment manager's constructor:

```cpp
void CDeploymentManager::__RegisterArbiter()
{
    if (m_hArbiter || !CBattleArbiterRegistry::instance_ptr())
        return;

    m_hArbiter = CBattleArbiterRegistry::instance().Register("land_deployment",
        [](LPCHARACTER pkAtt, LPCHARACTER pkVic) -> bool {
            return (pkAtt && pkAtt->IsGuildPresence()) ||
                (pkVic && pkVic->IsGuildPresence());
        },
        [](LPCHARACTER pkAtt, LPCHARACTER pkVic) -> BattleVerdict {
            return CDeploymentManager::instance().ResolveAttack(pkAtt, pkVic);
        });
}
```

Its verdict is the pattern for a policy that must not fall through: it denies the same owner guild, lets the presence's own definition vote, and then answers `Allow` instead of `Pass`:

```cpp
BattleVerdict CDeploymentManager::ResolveAttack(LPCHARACTER pkAttacker, LPCHARACTER pkVictim)
{
    if (!pkAttacker || !pkVictim)
        return BattleVerdict::Pass;

    // A presence carries its owner's guild id, so one comparison covers guard
    // against guard, guard against member and guard against the guild itself.
    const uint32_t dwGuildID = pkAttacker->GetGuildID();

    if (dwGuildID && dwGuildID == pkVictim->GetGuildID())
        return BattleVerdict::Deny;

    // The presence's own define votes, the attacker's first when both are one.
    uint32_t dwID = 0;
    uint32_t dwVnum = 0;

    if (ResolvePresence(pkAttacker, dwID, dwVnum))
    {
        const BattleVerdict verdict = CDeploymentHooks::instance().FireCanAttack(
                dwID, dwVnum, pkAttacker, pkVictim);

        if (verdict != BattleVerdict::Pass)
            return verdict;
    }

    if (ResolvePresence(pkVictim, dwID, dwVnum))
    {
        const BattleVerdict verdict = CDeploymentHooks::instance().FireCanAttack(
                dwID, dwVnum, pkAttacker, pkVictim);

        if (verdict != BattleVerdict::Pass)
            return verdict;
    }

    // Allow rather than Pass: the default chain lets any NPC pair through, which
    // is exactly what would let a guard hit the guild that raised it.
    return BattleVerdict::Allow;
}
```

It answers `Allow` at the end on purpose. `Pass` there would hand the pair to the default NPC rules, which would let a guard hit its own guild.

### Allow has side effects

Two things follow from the answer you give, beyond whether the hit lands.

- `Allow` makes the pair un-buffable. `is_buffable` returns false for any player pair that `battle_is_attackable` accepts, unless the team manager already says they are allied; session members never reach that check. If you allow two characters to fight, you also stop them from buffing each other, unless they are allied in the team manager.
- `Deny` does not make a pair buffable. Outside a session, two players are buffable only if they are not attackable and share an empire, so denying an attack between two empires leaves them unable to buff each other. An arbiter has no way to veto or grant a buff on its own; only session membership and alliance change that, as the recipes at the end show.
- `Allow` stops killer-mode flagging for same-empire player pairs, as shown in the previous section. `Deny` does not touch killer mode at all.

The buff rule, whole:

```cpp
bool is_buffable(LPCHARACTER ch, LPCHARACTER victim)
{
    if(victim->IsDead() || ch->IsDead() || ch->IsStun() || ch->IsObserverMode())
        return false;

    // A mob buffs mobs, and only mobs. Everything below reads a player relation --
    // team, session, empire -- so a non-player caster answered "no ally exists" and
    // the four mob-cast buffs (154-157) could not reach the allies they are for.
    if(!ch->IsPC())
        return !victim->IsPC();

    if(!victim->IsPC())
        return false;

    auto& tm = CPvPTeamManager::instance();
    if(tm.AreAllied(ch, victim))
        return true;
    // Session members never fall back to empire — relational truth lives on the session.
    if(tm.IsMember(ch->GetPlayerID()) || tm.IsMember(victim->GetPlayerID()))
        return false;

    if(battle_is_attackable(ch, victim))
        return false;

    return ch->GetEmpire() == victim->GetEmpire();
}
```

## When your script breaks

A Lua error in a guard or verdict never blocks combat and never crashes the server. Each broken callback degrades to a fixed value, and the walk goes on:

- A broken guard returns `false`. The arbiter is skipped for that call. It fails closed: a guard you could not evaluate never applies its rule.
- A broken verdict returns `Pass`. The walk continues to the next arbiter and then to the ordinary rules.

"Broken" means any of: Lua threw, the function returned nothing, or it returned the wrong type (a boolean from `can_attack`, a number, nil or a userdata from `guard`). Every failure logs, on every call. Two lines come out. The first says what went wrong:

```text
Bridge::ValidateProcessorInvocation lua error: <message and traceback>
Bridge::ValidateProcessorInvocation wrong return: expected [number], got [boolean]
Bridge::ValidateProcessorInvocation wrong return: expected [boolean], got nothing
```

The second names the arbiter and the slot, built from the name you registered with:

```text
[battle_arbiter_registry eve:EVE_CLASSIC can_attack] lua callback error
[battle_arbiter_registry eve:EVE_CLASSIC guard] lua callback error
```

The check that produces the first line is this, and it tells you exactly what counts as broken:

```cpp
bool Bridge::ValidateProcessorInvocation(sol::protected_function_result& result, sol::type expected_type) {
    // Check if the function call was successful
    if (!result.valid()) {
        // Surface the Lua error (message + traceback) instead of eating it —
        // every caller (PinTypedCall, the hand-written pin helpers, the lua
        // processors, …) relies on this for diagnostics.
        sol::error err = result;
        sys_err("Bridge::ValidateProcessorInvocation lua error: {}", err.what());
        return false;
    }

    if (expected_type != sol::type::nil && result.return_count() == 0) {
        sys_err("Bridge::ValidateProcessorInvocation wrong return: expected [{}], got nothing", 
            sol::type_name(GlobalStateView(), expected_type).c_str());
        return false;
    }

    // Verify the return type if there is at least one return value
    if (result.return_count() > 0 && result.get_type(0) != expected_type) {
        sys_err("Bridge::ValidateProcessorInvocation wrong return: expected [{}], got [{}]", 
            sol::type_name(GlobalStateView(), expected_type).c_str(), sol::type_name(GlobalStateView(), result.get_type(0)).c_str());
        return false;
    }

    // If everything is valid, return true;
    return true;
}
```

Name your arbiters so you can tell them apart in that line. The name is the only handle the log gives you.

What the player experiences: the pair is decided by whatever comes next. If your arbiter was the one forbidding combat on an event map, a broken script does not mean "no combat". It means the ordinary PK, duel, party and empire rules apply for that pair. This follows from the fallback values and the order of rules above; the record has no incident of it happening.

A verdict that returns a number outside the three enum values is, by reading `Resolve`, treated as `Pass` with no log line, since no case of the switch matches and the loop continues. The enum cast is unchecked and no test covers it. Do not return anything but `VERDICT.*`.

## Traps

**A `can_attack` that returns `true` or `false` is ignored.** The verdict slot expects a number. A boolean fails the type check, the error logs, and the result is `Pass`. The arbiter never decides, and the ordinary rules apply, so on a map where you meant to deny everything, nothing is denied. Return `VERDICT.Allow` or `VERDICT.Deny`.

**A forgotten branch falls through to `Pass`, not `Deny`.** A `can_attack` that ends without a `return` returns nothing, validation fails with `got nothing`, and the answer is `Pass`. Both real arbiters finish with an explicit `return VERDICT.Deny` or `return VERDICT.Allow`. End yours the same way.

**A guard that returns a truthy non-boolean is `false`.** The guard slot expects a boolean. `return att:get_guild() and ...` yields a userdata or nil, fails validation and the guard is treated as `false`. Your arbiter silently never applies. Wrap the expression: `return x ~= nil and ...`.

**A broken arbiter opens the map to the normal rules, it does not close it.** Covered above. If your design depends on the arbiter denying combat, test it with a fresh log open and watch for the two log lines.

**The guard runs for the whole server and sees everything.** It sees mobs, NPCs, doors and structures, not only players. A guard that only checks the map owns player against mob and mob against mob on that map. The EvE classic verdict denies every non-player pair, which includes the doors it spawns. That is intended there; make sure it is intended for yours. Keep guards cheap.

**Registering or unregistering inside a callback is undefined behaviour.** The registry walks its list with a range loop while `register` appends to it and `unregister` erases from it, and either invalidates the loop. There is no re-entrancy check. Do the registration from your event's setup and teardown hooks, never from a guard or verdict. That the consequence is a crash or worse is an inference from the C++ container rules; no crash is recorded.

**Registering twice gives two arbiters.** Names are not compared. A setup hook that runs again without its teardown leaves the old arbiter first in order. If you lost its handle, nothing can remove it short of a restart. Keep the handle in one place, check it before registering, and clear it after unregistering.

**`unregister` with a stale handle returns `false`.** It logs `CBattleArbiterRegistry::Unregister : unknown handle=<n>`. Because handles are never reused, a double unregister cannot remove another script's arbiter. What `unregister(nil)` does is not established, so guard it with `~= nil` like the real scripts do.

**Non-function arguments fail at register time.** The error is `battle_arbiter_registry.register: guard is not callable` or `... can_attack is not callable`. The annotation stub promises `0` for a failed registration, but the binding checks both slots first, so you meet the Lua error instead.

**Flipping a verdict mid-fight cuts running damage-over-time.** Poison, fire and bleeding re-ask on every tick and end when the answer is no. An arbiter that starts returning `Deny`, for example one that denies before the fight is engaged, stops damage-over-time already applied by that attacker. The mechanism is proven; that authors do not expect it is an inference.

**`Allow` also makes the pair un-buffable and switches off killer mode.** See the section on order. Plan for it if your event wants allies to buff each other inside an allowed fight.

**`on_damage` never asks about cross-empire or non-player pairs.** An arbiter's influence on killer mode only exists for same-empire player pairs.

**You do not outrank C++ arbiters.** For guild presences, `land_deployment` answers first, always.

**Reload behaviour is unknown.** What happens to a Lua arbiter when quests or forge modules are reloaded was not established. Do not rely on a reload to unregister or re-register one; tear it down through your own hook.

The team manager, `forge.sys.game.pvp_team_manager`, is a building block you may call from a guard or verdict, but it is not itself an arbiter: membership alone is not the whole rule. Its session fallback (step 3) and its effect on buffs are covered above; the recipes at the end use it. The Lua surface it exposes is `add_ally`, `add_member`, `add_team`, `are_allied`, `broadcast_session`, `close_session`, `create_session`, `is_member`, `remove_ally`, `remove_member`, `remove_team`, `set_allies` and `set_attacks_enabled`. There is no `get_session` or `get_team`, and nothing that asks which session a character is in, so keep the session id yourself. A session is the way to get a fight with its own teams and no arbiter at all: sessions are keyed by player id, and `add_member` refuses a player who is already in any session.

**A session you never close keeps its players locked.** While a player is in a session, the fallback denies every attack between that player and any player outside the same session, on any map, and `is_buffable` refuses buffs to and from them. Call `close_session` in your teardown, the same way you call `unregister`.

## Two real arbiters

The EvE classic map policy is at the top of this page. It registers in the event's setup hook, stores the handle on the event's table, and unregisters in the teardown hook.

The guild war referee does the same for every war mode, with the guard and the verdict built as closures over the war object. The setup registers a death policy and a battle arbiter together, named by the war's map index:

```lua
function base_war_referee:_setup_match_handles(war)
    self.death_handle = forge.sys.game.death_manager.register(
        self:_scope_id(war),
        self:_death_guard(war),
        self:_build_death_profile(war))

    self.battle_handle = forge.sys.game.battle_arbiter_registry.register(
        self:_scope_id(war),
        self:_battle_guard(war),
        self:_battle_policy(war))

    game.disable_horse_in_map(war:get_map_index())
end
```

```lua
function base_war_referee:_scope_id(war)
    return string.format("war:%d", war:get_map_index())
end
```

Player against player is allowed only between roster members of opposing teams on the war map. Everything else (observers, same team, non-players) is denied:

```lua
function base_war_referee:_battle_guard(war)
    local map_index = war:get_map_index()
    return function(att, vic)
        return att:get_map_index() == map_index and vic:get_map_index() == map_index
    end
end

function base_war_referee:_battle_policy(war)
    local VERDICT = forge.sys.game.battle_arbiter_registry.BATTLE_VERDICT
    local ref = self
    return function(att, vic)
        if not (att:is_pc() and vic:is_pc()) then return VERDICT.Deny end
        local at = ref:_team_index_of(war, att)
        local vt = ref:_team_index_of(war, vic)
        if at < 0 or vt < 0 or at == vt then return VERDICT.Deny end
        return VERDICT.Allow
    end
end
```

The team lookup returns `-1` for a character without a guild or outside the war, which is how the verdict denies observers:

```lua
function base_war_referee:_team_index_of(war, ch)
    local g = ch:get_guild()
    if g == nil then return -1 end
    local idx = war:get_team_index(g:get_id())
    return idx ~= nil and idx or -1
end
```

The registration runs when the war is created, before the fight is engaged, because the handles must be live before engage. The war's destroy hook unregisters both handles and clears the fields.

### Two recipes

Both are assembled from the pieces above. Neither is shipped code.

**A map where two empires do not fight each other.** One arbiter, registered in the map's setup hook and unregistered in its teardown hook. The verdict passes on everything except player against player between the two empires, so mobs, the third empire and every other rule stay with the ordinary chain; denying is enough, because there is nothing to allow.

```lua
local VERDICT = forge.sys.game.battle_arbiter_registry.BATTLE_VERDICT
local registry = forge.sys.game.battle_arbiter_registry
local handle = nil

function friendly_setup(map_index, empire_a, empire_b)
    handle = registry.register(
        "friendly:" .. map_index,
        function(att, vic)
            return att:get_map_index() == map_index and vic:get_map_index() == map_index
        end,
        function(att, vic)
            if not (att:is_pc() and vic:is_pc()) then return VERDICT.Pass end
            local a, b = att:get_empire(), vic:get_empire()
            if (a == empire_a and b == empire_b) or (a == empire_b and b == empire_a) then
                return VERDICT.Deny
            end
            return VERDICT.Pass
        end)
    return handle ~= 0
end

function friendly_teardown()
    if handle ~= nil then
        registry.unregister(handle)
        handle = nil
    end
end
```

This stops hits, damage-over-time ticks and the area functions between those two empires on that map. It does not make them allies: outside a session the buff rule wants the same empire, so they still cannot buff each other. If they must buff each other, put both empires in one session as allied teams (`add_team`, `add_ally`, `add_member` for each player) and accept the session lock described under the team manager.

**A duel where only the two duelists can hit each other and outsiders can neither hit nor buff them.** Use a session and no arbiter. Sessions start with attacks disabled, so the duelists are denied until the last call opens the fight, and every step is checked so a half-built session is closed instead of leaked.

```lua
local team = forge.sys.game.pvp_team_manager
local session = 0

function duel_start(map_index, a, b)
    local sid = team.create_session(map_index, "DUEL")
    if sid == 0 then return false end
    if team.add_team(sid, 1)
        and team.add_team(sid, 2)
        and team.add_member(sid, 1, a:get_player_id())
        and team.add_member(sid, 2, b:get_player_id()) then
        team.set_attacks_enabled(sid, true)
        session = sid
        return true
    end
    team.close_session(sid)
    return false
end

function duel_end()
    if session ~= 0 then
        team.close_session(session)
        session = 0
    end
end
```

Outsiders are denied against the duelists in both directions and cannot buff them, because session members never reach the empire fallback in the buff rule. Mobs are not covered by the fallback and keep the ordinary rules against the duelists. The session string is only forwarded to the client; what the client does with a kind other than the engine's own `ARENA` and `GUILD_WAR` was not checked.
The arbiter version of the duelist rule is a guard on the map and a verdict that returns `Allow` when `att:get_player_id()` and `vic:get_player_id()` are the two duelists in either order and `Deny` otherwise. It stops the hits but not the outsiders' buffs, since an arbiter cannot change the buff rule.

## Before: hardcoded branches

Before the registry, every competition was an `if` at a fixed spot in one function. This is the shape in a vanilla Metin2 server; the guild-war branch sits before the castle and arena branches, so its position decides who wins:

```cpp
bool battle_is_attackable(LPCHARACTER ch, LPCHARACTER victim)
{
    // 상대방이 죽었으면 중단한다.
    if (victim->IsDead())
        return false;

    // 안전지대면 중단
    {
        SECTREE *sectree = NULL;

        sectree = ch->GetSectree();
        if (sectree && sectree->IsAttr(ch->GetX(), ch->GetY(), ATTR_BANPK))
            return false;

        sectree = victim->GetSectree();
        if (sectree && sectree->IsAttr(victim->GetX(), victim->GetY(), ATTR_BANPK))
            return false;
    }


    // 내가 죽었으면 중단한다.
    if (ch->IsStun() || ch->IsDead())
        return false;

    if (ch->IsPC() && victim->IsPC())
    {
        CGuild* g1 = ch->GetGuild();
        CGuild* g2 = victim->GetGuild();

        if (g1 && g2)
        {
            if (g1->UnderWar(g2->GetID()))
                return true;
        }
    }

    if (IS_CASTLE_MAP(ch->GetMapIndex()) && false==castle_can_attack(ch, victim))
            return false;

    if (CArenaManager::instance().CanAttack(ch, victim) == true)
        return true;

    if (CBattleSupremacy::instance().IsBattleSupremacyMap(ch->GetMapIndex()) && 
        CBattleSupremacy::instance().IsBattleSupremacyTarget(victim->GetRaceNum()) &&
        CBattleSupremacy::instance().IsRunning() && 
        CBattleSupremacy::instance().GetExcludedEmpire() == ch->GetEmpire())
        return false;

    return CPVPManager::instance().CanAttack(ch, victim);
}
```

Servers built on it add their own events the same way, one more branch each, in the fallback as well:

```cpp
if (CBrawl::instance().IsBrawlZone(pkChr) && CBrawl::instance().IsBrawlZone(pkVictim))
    return true;

if (CEmpireInvasion::instance().IsInvasionZone(pkChr) &&
    CEmpireInvasion::instance().IsInvasionZone(pkVictim) &&
    CEmpireInvasion::instance().IsSealVnum(pkVictim))
    return CEmpireInvasion::instance().CanAttackSeal(pkChr, pkVictim);
```

Adding a third mode meant editing that function. A pure Lua tournament could not register its own rules without a C++ patch. And the position of each branch mattered: an arena above the party check means duelists in the same party can attack each other, below it means they cannot. The choice was implicit, wherever the developer dropped the `if`.

Universal Core used to have the same shape. In April 2026 the arena branch was removed from `battle_is_attackable`, when the registry was introduced:

```diff
-   if(CPVPArenaManager::instance().IsArenaMap(ch->GetMapIndex()) == true)
-       return CPVPArenaManager::instance().CanAttack(ch, victim);
```

and from `on_damage`:

```diff
-   if(CPVPArenaManager::instance().IsArenaMap(pkChr->GetMapIndex()) == true) {
-       if(CPVPArenaManager::instance().CanAttack(pkChr, pkVictim)) {
-           return;
-       }
-   }
```

The arena first registered an arbiter of its own; in June 2026 that registration went too, and arena combat is now decided by the team manager's session fallback. The domain branch is still hardcoded: it was planned to move into the registry and never did, and the record does not say why.

The arbiter was the first of a family. The item-use policy, the death manager and the skill policy registry follow the same pattern: a name, a guard, a payload, handle-based register and unregister, registration order is resolution order, and scope is the guard.
