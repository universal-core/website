/* UniversalCore logo system — geometric marks built from primitives only.
   Exposed as window.UCLogo. Colors are passed in so the same mark works on
   either direction's palette. */
(function () {
  const OCT = "29,21.7 21.7,29 10.3,29 3,21.7 3,10.3 10.3,3 21.7,3 29,10.3";

  // Primary mark — "Core Seal": octagon ward enclosing a diamond core.
  // Two-tone: violet ward/diamond, light-blue core + nodes (accent).
  function seal(size, primary, faint, accent) {
    primary = primary || "#a78bf5"; faint = faint || "rgba(167,139,245,0.32)"; accent = accent || primary;
    const s = size || 32;
    return `<svg class="uc-mark" width="${s}" height="${s}" viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <polygon points="${OCT}" stroke="${faint}" stroke-width="1.4"/>
      <polygon points="16,6.4 25.6,16 16,25.6 6.4,16" stroke="${primary}" stroke-width="1.5"/>
      <polygon points="16,11.4 20.6,16 16,20.6 11.4,16" fill="${accent}"/>
      <circle cx="16" cy="3" r="1" fill="${accent}"/><circle cx="16" cy="29" r="1" fill="${accent}"/>
      <circle cx="3" cy="16" r="1" fill="${accent}"/><circle cx="29" cy="16" r="1" fill="${accent}"/>
    </svg>`;
  }

  // Alt — "Hex Core": hexagon with an upward node, more techy.
  function hex(size, gold, faint) {
    gold = gold || "#e3a73c"; faint = faint || "rgba(227,167,60,0.32)";
    const s = size || 32;
    return `<svg class="uc-mark" width="${s}" height="${s}" viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <polygon points="16,2.5 28,9.5 28,22.5 16,29.5 4,22.5 4,9.5" stroke="${faint}" stroke-width="1.4"/>
      <polygon points="16,9 22.9,13 22.9,21 16,25 9.1,21 9.1,13" stroke="${gold}" stroke-width="1.5"/>
      <circle cx="16" cy="17" r="2.6" fill="${gold}"/>
      <line x1="16" y1="9" x2="16" y2="2.5" stroke="${gold}" stroke-width="1.5"/>
    </svg>`;
  }

  // Alt — "Rune Stack": concentric diamonds, most ornamental.
  function rune(size, gold, faint) {
    gold = gold || "#e3a73c"; faint = faint || "rgba(227,167,60,0.32)";
    const s = size || 32;
    return `<svg class="uc-mark" width="${s}" height="${s}" viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <polygon points="16,1.5 30.5,16 16,30.5 1.5,16" stroke="${faint}" stroke-width="1.3"/>
      <polygon points="16,7 25,16 16,25 7,16" stroke="${gold}" stroke-width="1.5"/>
      <polygon points="16,12 20,16 16,20 12,16" fill="${gold}"/>
    </svg>`;
  }

  // Brand lockup (mark + wordmark) as HTML.
  function brand(markFn, primary, faint, accent) {
    return `<span class="uc-brand">${markFn(30, primary, faint, accent)}<span class="uc-brand-name">Universal<b>Core</b></span></span>`;
  }

  window.UCLogo = { seal, hex, rune, brand, OCT };
})();
