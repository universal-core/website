---
date: 2027-04-20
title: "The render graph: declared reads and writes decide what runs"
description: A frame used to be one function calling renderers in a fixed order. The graph schedules passes from what they declare, and its first version declared a lot and bound nothing.
authors: luscha
tags: [engine, rendering, rhi, render-graph]
image: /img/blog/render-graph.png
slug: render-graph
---

On the morning of 31 December 2025 I committed a render graph: 24 files, 4,375 added lines, and the old frame inside it as eight passes. The graph compiled and executed every frame it was switched on for. It was switched off by default, and in the passes it contained the declared render targets were never bound to anything.

It took until 10 February 2026 for a frame to actually be ordered by what its passes declared. This post is about the forty-one days in between, and about what the declarations have to carry before the graph is allowed to skip a pass.

## One function, one order

In the Metin2 mainline engine a frame is one function. It draws the sky, the map, the characters, the water and the effects in turn, and the order is the order of the lines. Nothing in the function says what a call reads or writes. A shadow map exists because some call filled it and a later call happens to sample it, and removing a call is an edit to the function, not a fact the renderer can use.

The [RHI migration](/blog/rhi-migration) put resource creation behind an interface. It did not change that: with a command buffer, a frame is still a sequence of calls, and the sequence is still the programmer's memory of what depends on what. The [render pipeline foundation](/foundations/rhi) describes the finished graph. This is how it got there.

## Passes that say what they touch

A graph pass is an execution function plus a list of resources it reads and writes. Each frame the builder code declares the passes, and a compile step turns the declarations into an execution order: it links every read to the latest earlier writer of that resource, marks as referenced everything reachable from the outputs, culls the rest, sorts what survives, and works out the first and last pass that touches each resource.

The first version already had all of that. This is the old frame's terrain step, as the first version declared it:

```cpp
m_renderGraph->AddPass("Terrain", [this, map](RHI::CommandBuffer* cmd, const RHI::PassResources& res) {
    if (map) {
        map->GetActiveEnvironment().BeginPass();
        m_pyBackground.Render();
        map->GetActiveEnvironment().EndPass();
    }
}).Read(shadowMap).WriteColor(sceneColor, 0, RHI::LoadOp::Load).WriteDepthStencil(sceneDepth, RHI::LoadOp::Load)
  .AddFlag(RHI::RGPassFlags::Legacy);
```

The body is the old code, unchanged. Everything after the closing brace is new, and it is the part the compiler reads: this pass samples the shadow map, and draws into scene color and depth on top of whatever is there.

That last clause is the one that orders a frame. Almost every pass in a forward frame writes the same two targets, and two writes do not order each other. What does is a rule in the pass builder: a color or depth write with `LoadOp::Load` also records a read of the same resource.

```cpp
PassBuilder& PassBuilder::WriteColor(RenderGraphHandle texture, uint32_t attachmentIndex,
                                      LoadOp loadOp, const ClearValue& clearValue) {
    RGResourceUsage usage = RGResourceUsage::WriteColor(texture, attachmentIndex, loadOp, clearValue);
    m_pass.m_writes.push_back(usage);

    // Also track as color attachment
    m_pass.m_colorAttachments.push_back(usage);

    // LoadOp::Load preserves existing content - add implicit read for dependency tracking
    if (loadOp == LoadOp::Load) {
        m_pass.m_reads.push_back(RGResourceUsage::ReadTexture(texture, 0));
    }

    return *this;
}
```

So a pass that loads scene color depends on whoever wrote it last, and a frame built from passes that all load it becomes a chain in declaration order. The graph did not make the passes independent. It made the dependency a fact the compiler can read, which is a smaller thing than parallelism and enough for culling and lifetimes.

## A graph that declared and bound nothing

The wrapper declared eight passes: shadow, sky, terrain, characters, water and effects, game objects, post effects, and a final one that wrote the backbuffer. Seven carried a `Legacy` flag. The last one wrote the backbuffer and carried `NoCull`.

The declarations were not connected to anything. The execute step, in that version, had a block for graphics passes that said it would set up the render targets, and the block held a comment:

```cpp
// Begin render pass for graphics passes
if (pass->GetType() == RGPassType::Graphics && !pass->GetColorAttachments().empty()) {
    // Set up render targets
    // (The actual render pass begin/end is handled in the callback for legacy mode)
}
```

Nothing was bound. The old code drew into the device it had always drawn into, and the application executed the graph with a null command buffer. The `Legacy` flag did one thing: it chose a yellow fill in the graph's debug export and a word in the list of a pass's flags. The declarations decided an order that the old function already had, and nothing else consumed them, so a wrong one cost nothing and nobody could tell whether the right ones were right.

The transient pool had a smaller version of the same gap. Sixteen minutes after the first commit I added a call at the end of execution that tells the pool a frame has finished. Without it nothing aged and nothing was trimmed. The pool keeps a returned resource for a few frames before it frees it, and a pool that is never told the frame ended never counts them.

The flag in the configuration file that turned the graph on defaulted to off. For the next forty-one days the default forward frame stayed the imperative loop, and the graph grew on the side: the spot-shadow atlas, the G-buffer, the lighting compute pass and the post-process chain were all built as passes in it.

## Making the declarations load-bearing

On 20 January the graph started to bind what the passes declared. A graphics pass with color or depth attachments gets its render targets set from the declaration, with the viewport, the load operation and the clear value, before its function runs. A compute pass gets its written textures and buffers bound as storage. The same commit made persistent textures and buffers allocate when they are declared, not when the first pass uses them.

After that a wrong declaration shows. A pass that declares the wrong target renders into it. A pass that omits a read is not ordered after the writer. A pass whose outputs nobody reads is not run at all.

On 10 February the forward frame moved into the graph. `RenderGame` became a short dispatcher that builds one of two graphs, compiles it, and executes it if compilation succeeded: the forward builder, or the deferred one when deferred lighting is on. The commit added 934 lines and removed 1,202, most of them the imperative frame leaving the application file for a file of its own. The `Legacy` flag was removed in the same commit as useless, and the next day the switch that turned the graph on went too.

Forward is the default. Deferred lighting is a setting that ships off, and since March 21 the whole deferred pipeline sits behind a compile-time guard.

## What a pass has to declare

Two rules decided most of the declarations in the forward builder.

The first is that the graph only sees resources. The distortion and glow writers collect their results in targets that those renderers own, and the scene pass draws into them while it draws scene color. None of that is a graph resource, so the graph cannot see that the pass produces anything. Passes that do work of this kind carry `SideEffects`, which tells the compiler the pass has to run whether or not any resource it declares is read. The scene, transparent, blocker and effects passes carry it.

The second is that a read is what keeps a producer alive. Culling works on resources: a pass survives if anything it writes is referenced by a pass that survives. The god-ray and volumetric passes write their own textures, and the only consumer is the post-process pass, whose function decides at run time whether to bind them. So the builder declares the reads after the pass exists, and says so:

```cpp
// The declared read is what keeps the god-ray and volumetric passes alive; without a consumer
// the graph culls them. Declared at the slots the composite binds them to.
if (needScreenSpaceComposite) {
    if (godRaysActive && godRaysHandle.IsValid())
        postProcessPass.Read(godRaysHandle, 3, RHI::ShaderStage::Pixel);
    if (volumetricActive && volumetricHandle.IsValid())
        postProcessPass.Read(volumetricHandle, 4, RHI::ShaderStage::Pixel);
}
```

If the function uses a texture the builder did not declare, the producer can be culled, even though the function samples what it wrote. If the builder declares a read the function never makes, the producer runs for nothing. The compiler checks that a read has a writer and that the graph has no cycle. It cannot check that the declaration matches the function.

Culling by resource is also coarse. A pass that writes a target any surviving pass touches survives. The ground-decal pass has no flag and still runs every frame, because the scene color it writes is referenced. When decals are switched off the pass runs and returns at its first line.

A frame is declared again every frame. The builder resets the graph, keeping the persistent resources, declares the passes for the current settings, and compiles. A persistent texture is looked up by name, and until 28 August 2026 the name was all the lookup compared. A target sized by a quality setting, a god-ray texture that halves with a preset, kept its old dimensions while the dispatch and the shader moved to the new ones, so the compute writes fell outside the texture. The lookup now compares the whole description and recreates the texture when it differs. Every scene target in the forward frame is persistent. A pass can also ask for a texture that lives for one frame and comes from the pool, and no pass in the client does.

## What it made possible

The forward builder takes a description of the frame: the output texture, whether to draw actors and effects, a hook that adds passes over the finished scene. The client leaves the output empty, which means the backbuffer. The world editor sets an offscreen texture and adds its own overlay passes. Both call the same builder, and the editor's mini-map renderer compiles a graph of its own.

A feature that needs a screen-space result adds passes to the graph and declares what they read. The compiler decides whether they run, in what order, and when their textures are no longer needed. The order of a frame can be read from its declarations, and that stopped being a convenience the day a wrong declaration started to render wrong.
