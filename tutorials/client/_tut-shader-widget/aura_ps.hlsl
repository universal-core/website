// shaders/ui/aura_ps.hlsl
// One deployment aura as the AREA it covers: a filled disc with a bright rim just inside it.
//
// TexCoord is disc space -- the quad is set to (-1,-1)..(1,1), so length(TexCoord) is 1.0 exactly
// at the radius whatever the zoom. The rim's width is given in SCREEN pixels and converted through
// fwidth, so it stays one readable line at every zoom instead of thinning away as the map shrinks.

cbuffer ShaderQuadCB : register(b13) {
    float g_R;
    float g_G;
    float g_B;
    float g_FillAlpha;
    float g_RimAlpha;
    float g_RimPx;          // rim width in screen pixels, falling INWARD from the radius
    float2 _Pad;
    float4 _Unused[2];
};

struct PS_INPUT {
    float4 Position : SV_POSITION;
    float4 Color : COLOR0;
    float2 TexCoord : TEXCOORD0;
};

float4 main(PS_INPUT input) : SV_TARGET {
    float d = length(input.TexCoord);
    float px = max(fwidth(d), 1e-5);            // one screen pixel, measured in d

    float inside = 1.0 - smoothstep(1.0 - px, 1.0 + px, d);
    float rimEdge = 1.0 - g_RimPx * px;
    float rim = inside * smoothstep(rimEdge - px, rimEdge + px, d);

    float alpha = saturate(g_FillAlpha * inside + g_RimAlpha * rim);
    if (alpha <= 0.0)
        discard;

    return float4(g_R, g_G, g_B, alpha) * input.Color;
}
