---
title: Affect client presentation
description: Register particles and icons and read broadcast affect events.
displayed_sidebar: mainSidebar
---

# Affect client presentation

A broadcastable server type needs client registration to display a particle or icon. This registers a particle for type 700; use a path in your client pack: `playerLoad.RegisterEffect(playerLoad.EFFECT_BROADCAST_AFFECT + 700, "Bip01", "effects/my_buff.mse")`.

## Register effects and icons

`playerLoad.RegisterEffect(effect_type, bone, path)` returns `None` and raises a Python exception for invalid argument types. `playerLoad.EFFECT_BROADCAST_AFFECT` is 1000000; add the server type to it. `playerLoad.EFFECT_AFFECT` is the anchor for the separate AFF flag path.

| Asset | Behavior |
| --- | --- |
| `.mse` | One particle attached to `bone`; an empty bone uses the character origin. |
| `.msattach` | A bundle whose entries name their own bones, so the bone argument is ignored. Exit effects play when the affect ends. |

The first successful registration of a key wins. A second registration does nothing. A path that fails to load logs a client error and registers nothing, so a later corrected call can succeed.

`AFFECT_DATA_DICT` maps each type to `(title, icon, resize, description, can_be_removed_manually)`, with an optional sixth element. The owner affect bar and target board use it. A type without an entry has no icon. Keep manual removal `False` for a script type: the server honors manual cancellation only for a skill whose affect is good.

For the same type, the entry is `700: ("My buff", "icons/my_buff.sub", False, "A temporary bonus", False)`.

## Read client state and events

| Call or event | Meaning |
| --- | --- |
| `net.GetBroadcastAffectsByVID(vid)` | List of `(dwType, bApplyOn, lApplyValue, endTime)` for the character, or an empty list for an unknown VID. `endTime` is absolute server time, or 0 for infinite. |
| `BINARY_OnBroadcastAffectAdd(vid, dwType, point, value, endTime)` | A broadcast record arrives. |
| `BINARY_OnBroadcastAffectRemove(vid, dwType, point)` | A broadcast record ends. |
| `BINARY_OnBroadcastAffectPurgeVID(vid)` | All records for the character are dropped. |
| `BINARY_OnVidAffectFlag(vid, affectIndex, isSet)` | An AFF flag changes. |
| `chrmgr.HasAffectByVID(vid, index)` | Tests an AFF flag on the separate flag path. |

The target board displays remaining time as end time minus client server time, floored at 0. See [behavior](/docs/core/affects/behaviour) for delivery and late-viewer replay, and [overview](/docs/core/affects/overview) for the server side.
