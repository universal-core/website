---
title: Effects and materials
description: Author materials, extended MSE effects, and bundles for particles, ribbons, and actor surfaces.
displayed_sidebar: mainSidebar
---

# Effects and materials

A block for client-side effect authors: it changes how effects look and needs no server work.

An `.mse` effect keeps its behaviour: spawning, motion, lifetime, texture, blend mode, and animation curves. A material controls how each pixel is shaded, including gradients, emission, erosion, and glow. A group without `MaterialFile` or `Group Material` is exactly the plain effect.

## Quick start

Create this material and pack it at the path in the comment. The names are placeholders; use your own folder.

```text
// d:/ymir work/effect/my_pack/my_glow.msfvx
Group Effect
{
    Family               emissive_particle
    Emission             1.6
    Gradient             "d:/ymir work/effect/my_pack/ramps/warm.dds"
    GradientMode         replace
    GradientInput        brightness
    GradientGain         1.2
    GradientLifeShift    0.2
    Group Glow
    {
        Intensity         2.4
        Radius            1
        Color             1 0.667 0.267
        Core              2
        Streaks           6
    }
}
```

In an existing `.mse`, add this line at the root of a `Group Particle`:

```text
MaterialFile             "d:/ymir work/effect/my_pack/my_glow.msfvx"
```

The particle keeps its existing motion, texture, alpha, and blend settings. Its texture brightness selects colours from the warm ramp, and its material adds a glow. Emission above `1` reaches scene bloom when HDR and bloom are enabled; see the [render pipeline](/foundations/rhi/).

## The four file kinds

All four use the Metin2 text format: put one key or `Group Name` header on each line, braces on lines of their own, and a value after each key. Quote paths. Whole-line `//` comments are allowed; do not put a comment after a key or brace. Relative paths resolve from the file containing them, and absolute pack paths such as `d:/ymir work/...` also work.

| File | Purpose | Contract |
| --- | --- | --- |
| `.msfvx` | One material. | The root group is `Effect` for particles and effect meshes, `Trail` for ribbons, or `Surface` for actor parts. A material of the wrong kind is a load error. |
| `.msfvxp` | A parameterized material template. | `Group Params` declares slots of type `float`, `color`, `vector`, or `path`, each with a `Default`. The material body uses `$Name`; a caller supplies overrides in `Group MaterialParams`. Missing or unknown slots and values with the wrong token count are errors. |
| `.msmask` | A model’s region-mask sidecar, beside its `.gr2`. | Each `Group MaterialNN` names a `MaterialIndex` and regions, each with a texture and an `r`, `g`, `b`, or `a` channel. A model without a sidecar is unmasked. |
| `.msattach` | A bundle of effects and surface materials. | `Group Effects` contains `EffectNN` entries with `File` and optional `Bone`; `Group Materials` contains `MaterialNN` entries with `Part`, `File`, optional `Intensity`, `Tint`, and `Group Params`. Optional `Group Exit` contains one-shot effects. |

A bundle material file must be an `.msfvx` or `.msfvxp`. Its parts are `main`, `weapon`, `head`, `weapon_left`, `hair`, and `acce`. Only `MaterialNN` groups belong under `Group Materials`.

Mask regions share a vocabulary of at most 16 names. `metal`, `cloth`, `skin`, and `accent` come first; other names enter the vocabulary as sidecars use them. For example:

```text
// d:/ymir work/pc/my_model/my_model.msmask: region masks per Granny material palette index.
Group Material00
{
    MaterialIndex   0
    metal     "my_model_regions.dds" r
    cloth     "my_model_regions.dds" g
    skin      "my_model_regions.dds" b
    accent    "my_model_regions.dds" a
}
Group Material01
{
    MaterialIndex   1
    eyes      "my_model_eyes.dds" r
}
```

Material, sidecar, and bundle paths are normalized, so `..` works in them. MSE texture and mesh paths do not resolve `..`.

## Writing a material

`Group Effect` shades particles and effect meshes. Colours are `r g b` values from `0` to `1`.

| Key or group | Purpose and values |
| --- | --- |
| `Family` | Required: `legacy`, `emissive_particle`, `emissive_mesh`, or `distortion`. |
| `Emission` | Brightness multiplier, `0..64`; default `1`. |
| `Gradient` | Ramp texture path. |
| `GradientLifeShift` | Shifts the gradient input over particle life, `0..1`. |
| `GradientMode` | `multiply` or `replace`. |
| `GradientInput` | `brightness` or `alpha`. |
| `GradientGain` | Scales the gradient input, `0.1..8`. |
| `SoftDepth` | Soft depth distance, `0..1e6`. |
| `Strength`, `Chromatic`, `FadeByLife` | For `distortion`: strength `0..256`, chromatic amount `0..1`, and a boolean life fade. |
| `Group Erosion` | `Map`, `Scale`, `Scroll`, `Direction`, `DirectionWeight`, `In`, `Start`, `Softness`, `EdgeColor`, `EdgeWidth`, `EdgeIntensity`, `EdgeRamp`, `CharWidth`, and `CharColor`. |
| `Group Fresnel` | Fresnel shading; coloured Fresnel is valid only for `emissive_mesh`. |
| `Group Glow` | `Intensity`, `Radius` (`0..1`), `Color`, `Core` (`0..64`), `Streaks` (`0` or `4..8`), `StreakLength` (`0..1`), and `StreakRotation` (`-3600..3600`). |
| `Group Distort` | `Map`, `Scale`, `Scroll`, and `Amount`. |
| `Group Ramp` | `Map`, `Steps` (`0` or `2..4`), `Input value`, `LifeShift` (`-1..1`), `Contrast` (`0.01..16`), and `Range min max`. |
| `Group Mask` | `Shape` (`radial`, `vertical`, `horizontal`, `texture`, or `none`), `Softness`, and `Power`. |
| `Group Cutoff` | `Value`, `Softness`, and `LifeShift`. |
| `Group Layer00` through `Layer02` | One to three layers. Each has `Map`, `Scale`, `Scroll`, `Rotate`, `Combine`, and `Strength`. On layer 0, `Map texture` uses the element’s own texture and `Combine` is `base`; other maps are pattern paths and combine with `multiply` or `add`. |

The plain effect’s colour operation runs first. The gradient then uses `u = GradientGain × (texel brightness or alpha) − GradientLifeShift × life`, clamped to `0..1`.

| `GradientMode` | Colour result before emission |
| --- | --- |
| `multiply` | The plain colour multiplied by the gradient’s hue at `u`. |
| `replace` | The gradient colour at `u` multiplied by texel brightness; MSE colour curves are ignored for colour. |

The result is multiplied by `Emission`. Alpha remains texture alpha times particle alpha, also multiplied by erosion coverage when present. Black texels stay black.

`Group Glow` feeds selective glow, which is depth-tested and runs independently of HDR and scene bloom. See the [render pipeline](/foundations/rhi/) for how HDR, bloom, and selective glow differ.

| Material kind | Keys and groups |
| --- | --- |
| `Group Trail` | Keys include `Priority`, `Core`, `Tail`, `Ramp`, `EdgePower`, `FadePower`, `Emission`, `WidthScale`, `LifetimeScale`, `Texture`, and `Blend`. Groups include `Ramp`, `Noise`, `Dissolve`, `Flicker`, `Halo`, `Glow`, `Distortion`, `Distort`, `Erosion`, `Mask`, `Cutoff`, and layers. |
| `Group Surface` | Uses `Priority` and groups `Base`, `Reflection`, `Techniques` (`Spec`, `Rim`, `Energy`, `Irid`), `Erosion`, `Shell`, `Envelope`, `Params`, `Afterimage`, `Glow`, and `PatternNN`. `Envelope` includes `FadeInMs`, `FadeOutMs`, and `Pulse`. |

Use the world editor’s Material pane and the validator when working with the full Trail and Surface vocabulary.

## Extended `.mse`

Put material references at the root of a `Particle`, `Mesh`, or `Ribbon` group.

| Entry | Effect |
| --- | --- |
| `MaterialFile "path"` | Loads an `.msfvx` or `.msfvxp`, relative to the `.mse`. Particles and meshes need an Effect material; ribbons need a Trail material. |
| `Group MaterialParams` | Supplies template slot values. Requires `MaterialFile`; nested groups are not allowed. |
| `Group Material` | Defines an Effect material inline. Use it instead of `MaterialFile`. |
| `MaterialProfile` | Invalid. Use a material file or inline material. |
| `EmitterProperty.EmitByDistance` | With a value greater than `0`, emits one particle per that many world units travelled. A stationary emitter emits nothing. `TimeEventEmissionCountPerSecond` must still be present but is ignored in this mode; `0` disables distance emission. |

Combining `MaterialFile` with `Group Material`, or using `MaterialParams` without `MaterialFile`, is a conflict. The client logs `has conflicting material references` and renders that element as a plain effect.

| Group | Keys and behaviour |
| --- | --- |
| `Ribbon` | `MaterialFile`, `RibbonType` (`0` billboard, `1` segment), `Width`, `Lifetime`, `MinSpeed`, `SegmentStart`, `SegmentEnd`, `List TimeEventWidth`, `List TextureFiles`, `TextureMode`, `TextureTileLength`, `TextureScrollSpeed`, `TexAniType`, `TexAniDelay`, `Gravity`, and `JitterAmount`, `JitterScale`, `JitterRate`. The frame budget is about 900 ribbon segments, retained by Trail `Priority` and then camera distance. |
| `Mesh` additions | `List TimeEventScaleX`, `TimeEventScaleY`, `TimeEventScaleZ`, `TimeEventRotationZ`, `TimeEventArcHead`, `TimeEventArcTail`, `ArcSoftness`, and `TimeEventStretch`. |
| `Impact` | `Lifetime`, `FalloffRadius`, `Hitstop`, `HitstopRadius`, `ImpactFrame` (`0`, `1`, or `2`), `ImpactFrameDuration`, `TimeEventRadialBlur`, `TimeEventRadius`, `TimeEventAmplitude`, `TimeEventEdgeTint`, `EdgeTintColor`, `TimeEventDesaturate`, `TimeEventShake`, `LoopEnable`, and `Width`. `ScreenImpulse` is an alias. At most four impacts are active; reduced-flash mode halves frame strength. |
| `Environment` | `Lifetime`, `LoopEnable`, `InnerRadius`, `FalloffRadius`, `AmbientColor`, `DiffuseColor`, `FogColor`, `FogNear`, `FogFar`, `SkyColor`, and `List TimeEventWeight`. |
| `TimeBubble` | A compatibility group. |

Environment weight at the viewer is the time track multiplied by a smoothstep of XY distance from the camera’s look-at target. Channels absent from the group stay untouched. There are 16 environment slots; a seventeenth does nothing. A render configuration switch can disable the blend.

`Ribbon`, `Impact`, `TimeBubble`, and `Environment` are top-level groups alongside `Particle`, `Mesh`, and `Light`. Unknown group names are skipped, allowing a loader that does not recognize them to draw the remaining groups.

## Where an effect is attached

A material lives in the `.mse`, so anything that plays that effect also plays its materials. Effect paths registered by the engine for equipment and refine looks are outside this page; anything that names an `.mse` picks up its materials.

| Place | Reference |
| --- | --- |
| Motion event | An `.msa` effect event uses `EffectFileName`, `AttachingEnable`, `AttachingBoneName`, and `EffectPosition`; `FollowingEnable` and `IndependentFlag` are optional. |
| Fly data | `AttachFile` in an attaching-data group names the travelling effect; `BombEffect` names the hit effect. |
| Server skill nodes | `SPECIFIC_EFFECT` takes `effectPath` and `bone` (default `Bip01`); `AMBIENCE_EFFECT` takes `effectPath`, `soundPath`, and `ttlPoly`. These are server-owned and TTL-driven. `GROUND_DECAL` and `IMPACT_EFFECT` do not name effect files. |
| Server Lua | The `effect` namespace provides `ambience_effect_local`, `ambience_effect_global`, `delete_ambience_effect`, `fly_*`, and `screen_wave`; `npc.specific_effect` also plays a specific effect. |
| Broadcast affect | In the Metin2 mainline client intro script, `playerLoad.RegisterEffect(playerLoad.EFFECT_BROADCAST_AFFECT + type, bone, path)` associates a broadcastable server affect type with a path. An `.msattach` attaches as a bundle and ignores `bone`; an `.mse` plays on the bone. |
| Item | A row of the mainline `item_effect.txt` contains `vnum<TAB>bone<TAB>path`. For an `.msattach`, the bone must be `-` or empty. Bundles apply to weapon and armour items. |
| Costume shape | `AttachFile "<path>.msattach"` in an `.msm` ShapeData group attaches a bundle. |
| Map object | `AttachFile` in a `.prb` or `.prd` property applies to all instances. An `AttachFile` in an `AreaData.txt` object block applies to that instance; `""` removes the property’s attachment. Only `Part main` materials apply, and the bone is optional. |
| RHI-debug client | `app.AttachBundle(path, vid)`, `app.DetachBundle(vid)`, and `app.CosmeticAttachSurface` support inspection. |

Several `MaterialNN` entries may name the same part. Each is a separate layer in file order. A part draws at most three surface layers, selecting the highest material `Priority` first and breaking ties by attach order. The bundle loader warns once about entries that will not draw.

`Group Exit` plays when a broadcast affect actually ends, after the server removes its last affect of that type. Surface layers fade using `Envelope FadeOutMs`. An actor leaving view, deletion, or a map change is silent; items, costume shapes, and map objects ignore Exit. Each affect type, item, costume, or map object attaches and detaches its own layers.

## Check your work

| Tool | Availability and use |
| --- | --- |
| MSE validator | `validate_mse.py`, a Python script that lives in the engine repository; it is not shipped in the client or the packs, so ask whoever holds the engine to run it, or use the world editor. It needs no client. It checks `.mse`, `.msfvx`, `.msfvxp`, `.msmask`, and `.msattach` syntax, required tokens, ascending time-event keys, relevant ranges, material conflicts, and distance emission. Given a client folder it also checks referenced files. Errors produce a non-zero exit; warnings do not. |
| F11 Cosmetics panel | Available only in an RHI-debug client build (`ENABLE_RHI_DEBUG`). It can play an effect attached to a bone or at a position, attach surface layers, edit material values, show stats, and toggle enhanced effect materials for comparison. Set a source root and reload from it to see edits without packing. |
| World editor | Available only in a world-editor build (`ENABLE_WORLD_EDITOR`). The Material pane edits `.msfvx` and `.msfvxp`; templates have a text editor, Apply button, and parameter defaults. The Bundle pane edits effects, exit effects, and surface materials. The effect editor authors MSE groups, including Ribbon, Impact, TimeBubble, and material references. |
| Debug calls | `app.CosmeticPlayEffect`, `CosmeticSetMaterials`, `CosmeticReloadFrom`, `CosmeticRoundTrip`, `CosmeticTextureReport`, `CosmeticAttachSurface`, `AttachBundle`, `DetachBundle`, and the related inspection and render switches exist only in RHI-debug client builds. Unattended capture uses the separate scaling-benchmark build option. |

A player-grade client has none of these tools. Pack the folders you changed, restart the client, and look at the effect in game; check the client log for load errors.

## Behaviour

Material keys are strict. An unknown key is a load error naming the key; an invalid value reports the key and its allowed range. A failed material load leaves the element rendering as the plain effect, with an error in the client log. A bundle with more surface layers than a part can draw logs one warning naming the undrawn entries.

The client log shows these lines, with the path and key lower-cased:

```text
Cosmetic material: d:/ymir work/effect/my_pack/my_glow.msfvx: key 'emision': unknown key
Cosmetic material: d:/ymir work/effect/my_pack/my_glow.msfvx: key 'file': resource not found or malformed
Cosmetic textures: ramp 'd:/ymir work/effect/my_pack/ramps/warm.dds': missing file; neutral index 0 is used
Effect '<mse path>' has conflicting material references
```

There is no C++ registration or Lua namespace for materials: content refers to them by path.

Each distinct material and each distinct template value set is interned once into the GPU tables when referenced, with no per-frame parameter cost. Textures take a pool slot on first use:

| Texture | Pool slots | Format |
| --- | ---: | --- |
| Patterns | 32 | 256 × 256 BC5, full mip chain |
| Reflections | 16 | 256 × 256 BC1, full mip chain |
| Masks | 64 | BC3, full mip chain |
| Ramps | 64 | 256 × 1 RGBA8 |

Slot `0` is neutral. A full pool or wrong texture format logs a load error naming the file, and that texture renders neutral.

Judge an effect in LDR first. HDR and scene bloom are off by default, and emission above `1` needs both enabled to show through scene bloom. Selective `Group Glow` is independent of those settings.

## Pitfalls

**The material does not appear.** Check the client log for a missing file, wrong material kind, unknown key, invalid value, or conflicting material references. A failed material falls back to the plain effect. Pack the changed folders and restart the client before checking a player-grade build.

**A bundle fails to attach to an item.** For a bundle row in `item_effect.txt`, use `-` or an empty bone. A nonempty bone logs `bundle bone must be '-' or empty`. Bundle support there applies to weapon and armour items.

**A second registration for the same affect type changes nothing.** The first `playerLoad.RegisterEffect` call for an anchor and type wins; later calls for the same one are ignored. Edit the one line instead of adding another.

**A surface layer is missing.** A part draws at most three layers. Check the bundle warning and adjust material priorities or remove a layer.

**A gradient makes the effect flat or floods the sprite.** The gradient reads the texture’s own brightness or alpha. A pure-white texture selects one colour; measure the texture’s brightness before choosing the ramp and gain. Use `GradientInput alpha` for thin shapes, not a sprite whose alpha covers the quad.

**Smoke becomes an opaque sheet.** Keep emission near `1` on alpha-blended groups with `DestBlendType 6`. Put glow on additive groups with `DestBlendType 2`.

**A recolour looks worse than the original.** A material is not automatically an improvement to an effect that already looks good. Compare it with the plain effect and keep the original where it reads better.

**An effect is too large or appears in the wrong place.** Size new groups against the surrounding groups. Offsets are relative to the attach bone, so preview using the bone the game uses.

**Particles stop or move strangely.** Keep `AirResistance` below `1`; velocity is multiplied by `1 - r` per second. For distance emission, remember that a stationary emitter produces no particles.

**Erosion looks grainy on large smoke.** A fine noise scale can read as grain. Try a scale around `0.6` and an edge around `0.35`.

**An effect mesh renders nearly black.** Some meshes need checking before using `emissive_mesh`. Keep their MSE mesh groups on `legacy` until the result is verified.

**A referenced texture or mesh cannot be found.** MSE texture and mesh paths do not resolve `..`. Use a path that does not require it. Material, sidecar, and bundle paths do normalize `..`.

**Animation keys behave incorrectly or fail validation.** Put keys in every `TimeEvent` list in ascending order.

## See also

- [Render pipeline](/foundations/rhi/)
- [ui.ShaderQuad](/docs/building-blocks/ui-shader-quad)
