---
title: Skills
description: The shared skill model and a guide to its foundations.
---

A skill in Universal Core has one YAML definition, read by the game server and the client. In the Metin2 mainline engine, separate records can give the two sides different values. A shared definition keeps the values together, while each side reads the parts it needs.

The server runs a skill's effect tree during a cast; the client uses the file for presentation and its own checks. Sharing a file does not mean both sides have the same state. Deploy the same skill files to both, and account for values the client cannot compute when writing descriptions.

## The Skills pages

- [One file per skill](/foundations/skills/one-file): how the server and client load the definition and what each reads.
- [Nodes and phases](/foundations/skills/nodes-and-phases): how a cast runs effects and selects targets.
- [Beyond the formula](/foundations/skills/beyond-the-formula): formulas and the ways a skill can extend its behavior.
- [Owners and cores](/foundations/skills/owners-and-cores): who owns a cast and how its effects reach across game processes.
- [Policies](/foundations/skills/policies): rules for skill variants, use, and loadouts.

For the keys and examples, see the [skill file reference](/docs/core/skills/file).

## Glossary

| Term | Meaning |
| --- | --- |
| Definition and binding | A definition describes a skill or a named rule. A binding connects that definition to where it applies, such as a trigger event or a policy registration. |
| vnum | The numeric identifier of a skill; its YAML filename uses this number. |
| Node | One typed effect or operation in a skill's tree. A node can have children that run for targets it reaches. |
| Phase | A stage of a cast that runs a list of nodes: once per use, once per computation, or after the cast's victims are known. |
| Poly | A formula expression evaluated to a number, using variables supplied by the evaluation context. |
| `skill_k` | A formula variable for the skill's power, expressed on a fractional scale. |
| `use.victims` | A formula variable counting distinct victims recorded by the cast's entrypoint ledger. |
| `hit_dist` | The distance from the search center to a candidate, available when a node evaluates distance scaling. |
| Anchor | A position at which a timed effect stays and from which its position-seeded searches run. |
| Sector tree | The spatial partition used to find nearby entities; a normal search takes candidates from the performer's sector and neighboring sectors. |
| Subject | The character, guild, or empire that owns the skill's cast and supplies its owner-specific state. The performer is the character executing it. |
| Core | A running game server process that hosts part of the game world. |
| Mesh | The network connecting game cores so they can exchange server-to-server messages. |
| Intracore | A skill mode that authorizes a cast on one core and executes it on each core without a performer. |
| Policy | A registered rule that selects a skill variant, restricts use, or supplies a loadout. Resolution follows registration order. |
| Forge | The system for loading and managing Lua modules; skill policies can register through it. See [Forge](/foundations/luna/forge). |
| Luna | A Lua runtime alongside QuestManager, with engine bindings available to scripts. See [Luna](/foundations/luna). |
