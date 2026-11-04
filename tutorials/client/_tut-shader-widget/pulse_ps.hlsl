// shaders/ui/pulse_ps.hlsl
// A filled disc with a bright rim that breathes: the rim width swings around g_RimPx with time.
//
// TexCoord is disc space (the quad is set to (-1,-1)..(1,1)), so length(TexCoord) is 1.0 at the radius.
// The rim width is in screen pixels, converted through fwidth, so it stays a readable line at any size.

cbuffer ShaderQuadCB : register(b13) {
    float g_R;
    float g_G;
    float g_B;
    float g_FillAlpha;
    float g_RimAlpha;
    float g_RimPx;          // mean rim width in screen pixels, falling INWARD from the radius
    float g_Time;           // seconds since the window opened, sent by Python every frame
    float _Pad;
    float4 _Unused[2];
};

struct PS_INPUT {
    float4 Position : SV_POSITION;
    float4 Color : COLOR0;
    float2 TexCoord : TEXCOORD0;
};

float4 main(PS_INPUT input) : SV_TARGET {
    float d = length(input.TexCoord);
    float px = max(fwidth(d), 1e-5);

    float width = g_RimPx * (1.0 + 0.6 * sin(g_Time * 4.0));
    float inside = 1.0 - smoothstep(1.0 - px, 1.0 + px, d);
    float rimEdge = 1.0 - width * px;
    float rim = inside * smoothstep(rimEdge - px, rimEdge + px, d);

    float alpha = saturate(g_FillAlpha * inside + g_RimAlpha * rim);
    if (alpha <= 0.0)
        discard;

    return float4(g_R, g_G, g_B, alpha) * input.Color;
}
