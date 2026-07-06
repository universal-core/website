/* UniversalCore docs — page templates (structure only; .ucd-a / .ucd-b
   wrappers supply the theme). Each builder takes dir ('a'|'b').
   window.UCP collects everything. */
(function () {
  const S = window.SNIP, L = window.UCLogo;
  const GOLD = { a: "#e3a73c", b: "#a78bf5" };
  const FAINT = { a: "rgba(227,167,60,0.32)", b: "rgba(167,139,245,0.34)" };
  const BLUE = { a: "#74b083", b: "#5fc4ec" };
  const markFor = (dir) => L.seal(30, GOLD[dir], FAINT[dir], BLUE[dir]);

  /* ---------- icons (functional, stroke-based) ---------- */
  const I = {};
  const svg = (b, sw) => `<svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${sw || 1.7}" stroke-linecap="round" stroke-linejoin="round">${b}</svg>`;
  I.search = svg(`<circle cx="11" cy="11" r="7"/><path d="M21 21l-4-4"/>`);
  I.github = `<svg width="1em" height="1em" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.53 2.36 1.09 2.94.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02a9.5 9.5 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.69-4.57 4.94.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10 10 0 0 0 12 2z"/></svg>`;
  I.book = svg(`<path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15H6.5A2.5 2.5 0 0 0 4 20.5z"/><path d="M4 20.5A2.5 2.5 0 0 1 6.5 18H20"/>`);
  I.layers = svg(`<path d="M12 3l9 5-9 5-9-5z"/><path d="M3 13l9 5 9-5"/>`);
  I.bolt = svg(`<path d="M13 2L4 14h6l-1 8 9-12h-6z"/>`);
  I.route = svg(`<circle cx="6" cy="18" r="2.5"/><circle cx="18" cy="6" r="2.5"/><path d="M9 18h6a3 3 0 0 0 3-3V9"/>`);
  I.terminal = svg(`<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M7 9l3 3-3 3M13 15h4"/>`);
  I.grid = svg(`<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>`);
  I.puzzle = svg(`<path d="M9 4h6v3a2 2 0 1 0 4 0V4h1v6h3a2 2 0 1 1 0 4h-3v6H9v-3a2 2 0 1 0-4 0v3H4v-6H1a2 2 0 1 1 0-4h3V4h5z"/>`);
  I.arrow = svg(`<path d="M5 12h14M13 6l6 6-6 6"/>`);
  I.chev = svg(`<path d="M9 6l6 6-6 6"/>`);
  I.check = svg(`<path d="M4 12l5 5L20 6"/>`, 2);
  I.cube = svg(`<path d="M12 3l8 4.5v9L12 21l-8-4.5v-9z"/><path d="M4 7.5l8 4.5 8-4.5M12 12v9"/>`);
  I.clock = svg(`<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>`);
  I.hash = svg(`<path d="M4 9h16M4 15h16M10 3L8 21M16 3l-2 18"/>`);
  I.spark = svg(`<path d="M12 3v6M12 15v6M3 12h6M15 12h6"/>`, 1.8);
  I.copy = svg(`<rect x="9" y="9" width="11" height="11" rx="2"/><path d="M5 15V5a2 2 0 0 1 2-2h8"/>`);
  I.play = svg(`<path d="M7 4v16l13-8z"/>`);
  I.menu = svg(`<path d="M4 12h16M4 6h16M4 18h16"/>`);
  I.globe = svg(`<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18 14 14 0 0 1 0-18z"/>`);

  /* ---------- shared chrome ---------- */
  function nav(dir, active) {
    const link = (label, href, key) =>
      `<a href="${href}" class="${active === key ? "is-active" : ""}">${label}</a>`;
    return `<nav class="uc-nav">
      ${L.brand(L.seal, GOLD[dir], FAINT[dir], BLUE[dir])}
      <div class="uc-navlinks">
        ${link("Docs", "#", "docs")}
        ${link("Components", "#", "components")}
        ${link("Tutorials", "#", "tutorials")}
        ${link("Blog", "#", "blog")}
      </div>
      <div class="uc-nav-spacer"></div>
      <div class="uc-search"><span style="font-size:14px">${I.search}</span> Search the docs <span class="uc-kbd">⌘K</span></div>
      <span class="uc-ver">v2.4</span>
      <span class="uc-icon-btn" style="font-size:17px">${I.github}</span>
    </nav>`;
  }

  function footer(dir) {
    const col = (h, items) =>
      `<div class="ft-col"><b>${h}</b>${items.map((i) => `<a href="#">${i}</a>`).join("")}</div>`;
    return `<footer class="uc-footer">
      <div style="max-width:280px;display:flex;flex-direction:column;gap:12px">
        ${L.brand(L.seal, GOLD[dir], FAINT[dir], BLUE[dir])}
        <p class="uc-p" style="font-size:13.5px">A framework for composing reactive Metin2 interfaces with <b>UCHTML</b> &amp; Jinja2.</p>
        <span class="uc-mono" style="font-size:11.5px;color:var(--faint)">© 2026 UniversalCore · MIT</span>
      </div>
      <div class="ft-links">
        ${col("Engine", ["Grid system", "Jinja2 templating", "Embedded context", "Reactive zones"])}
        ${col("Reference", ["UI components", "URL routing", "Configuration", "Data generation"])}
        ${col("Community", ["Discord", "GitHub", "Changelog", "Showcase"])}
      </div>
    </footer>`;
  }

  const kicker = (t) => `<span class="uc-kicker">${t}</span>`;

  /* ============================================================
     LANDING
     ============================================================ */
  function landing(dir) {
    const feat = (ico, title, body, meta) => `<div class="uc-feature">
      <div class="uc-feat-ico" style="font-size:20px">${ico}</div>
      <h3>${title}</h3><p>${body}</p>
      <div class="uc-feat-meta">${I.arrow} ${meta}</div>
    </div>`;
    const stat = (n, l) => `<div class="uc-stat"><div class="n">${n}</div><div class="l">${l}</div></div>`;

    return `<div class="uc-site">
      ${nav(dir, "")}
      <!-- HERO -->
      <section style="display:grid;grid-template-columns:1.05fr 0.95fr;gap:54px;padding:72px 56px 60px;align-items:center">
        <div style="display:flex;flex-direction:column;gap:24px">
          <span class="uc-badge">${I.spark} Now shipping reactive zones · v2.4</span>
          <h1 class="uc-h1">Build in-game interfaces<br>like you build the web.</h1>
          <p class="uc-lead">UniversalCore brings a real HTML engine — <b style="color:var(--text)">UCHTML</b> — and Jinja2 templating to the Metin2 client. Write reactive wikis, shops and quests with grid layouts, components and a live backend context.</p>
          <div style="display:flex;gap:14px;margin-top:4px">
            <a class="uc-btn" href="#">Get started ${I.arrow}</a>
            <a class="uc-btn-ghost" href="#">${I.book} Read the docs</a>
          </div>
          <div style="display:flex;gap:26px;margin-top:10px;align-items:center">
            ${stat("3", "display modes")}
            <span style="width:1px;height:34px;background:var(--line)"></span>
            ${stat("40+", "component tags")}
            <span style="width:1px;height:34px;background:var(--line)"></span>
            ${stat("100×", "faster updates")}
          </div>
        </div>
        <div class="uc-code" style="align-self:stretch">
          <div class="uc-code-bar">
            <span class="uc-dots"><i style="background:#df6a5f"></i><i style="background:#e3b341"></i><i style="background:#71ad7d"></i></span>
            <span class="uc-file"><b>p/items/details</b>.html</span>
            <span class="uc-copy">UCHTML</span>
          </div>
          <pre>${S.macro()}</pre>
          <div style="border-top:1px solid var(--line);padding:14px 18px;display:flex;align-items:center;gap:10px;background:var(--bg2)">
            <span class="uc-pill-dot"></span>
            <span class="uc-mono" style="font-size:12px;color:var(--muted)">rendered live in the client · press Refresh to reload</span>
          </div>
        </div>
      </section>

      <!-- TRUST STRIP -->
      <div style="padding:14px 56px;border-top:1px solid var(--line);border-bottom:1px solid var(--line);display:flex;align-items:center;gap:26px">
        <span class="uc-mono" style="font-size:11.5px;color:var(--faint);letter-spacing:1px;text-transform:uppercase">Powering interfaces for</span>
        <div style="display:flex;gap:30px;flex:1;align-items:center;opacity:0.8">
          ${["AuroraMT2", "Eclipse2", "Ymir Reborn", "OldSchool99", "Valyria"].map((n) => `<span style="font-family:var(--font-display);font-size:16px;color:var(--muted);font-weight:600">${n}</span>`).join("")}
        </div>
      </div>

      <!-- FEATURES -->
      <section style="padding:64px 56px 20px">
        <div style="display:flex;flex-direction:column;gap:12px;margin-bottom:34px">
          ${kicker("The framework")}
          <h2 class="uc-h2">Everything the client never gave you.</h2>
        </div>
        <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:18px">
          ${feat(I.grid, "Grid system", "Block, flex and relative layout with margins, padding, percentages and a familiar two-pass measure &amp; layout — mapped to native UI.", "grid-system")}
          ${feat(I.layers, "Jinja2 templating", "Macros, includes, inheritance and expression interpolation. Compose pages from reusable lego-block templates.", "jinja2")}
          ${feat(I.bolt, "Reactive zones", "Mark a zone, list its variables, call SetVars from Python — only that zone re-renders. Scroll is preserved.", "reactive-zones")}
          ${feat(I.puzzle, "40+ components", "Tables, carousels, accordions, filter groups, item cards, 3D model slots — all driven by simple tags.", "ui-components")}
          ${feat(I.route, "URL routing", "wiki:// links with path, query and #anchors. Navigate, Refresh and Copy-URL dev tools built in.", "url")}
          ${feat(I.terminal, "Embedded context", "Call into the launcher backend — fun.getv, item.*, mob data — straight from your templates.", "context")}
        </div>
      </section>

      <!-- SHOWCASE -->
      <section style="display:grid;grid-template-columns:0.9fr 1.1fr;gap:48px;padding:60px 56px;align-items:center">
        <div style="display:flex;flex-direction:column;gap:18px">
          ${kicker("Reactive zones")}
          <h2 class="uc-h2">Update one counter, not the whole page.</h2>
          <p class="uc-p">A <code>&lt;div reactive&gt;</code> watches the variables you name. When the backend changes them, UniversalCore re-renders just that zone — 10–100× faster than a full reload, with no flicker and no lost scroll position.</p>
          <div class="uc-tip"><span class="uc-adm-ico" style="color:var(--accent2);font-size:16px">${I.bolt}</span><div><div class="uc-adm-title">Tip</div><span class="uc-p" style="font-size:14px">Batch related updates with <code>SetVars()</code> for a single render pass across every affected zone.</span></div></div>
        </div>
        <div style="display:flex;flex-direction:column;gap:14px">
          ${S.block({ file: "<b>mission</b>.html", lang: "UCHTML", body: S.reactive() })}
          ${S.block({ file: "<b>mission</b>.py", lang: "Python", body: S.pySetVars() })}
        </div>
      </section>

      <!-- CTA -->
      <section style="padding:18px 56px 72px">
        <div style="border:1px solid var(--gold-line);border-radius:var(--radius);background:var(--gold-soft);padding:44px 48px;display:flex;justify-content:space-between;align-items:center;gap:30px">
          <div style="display:flex;flex-direction:column;gap:10px">
            <h2 class="uc-h2">Ship your first page in five minutes.</h2>
            <p class="uc-p" style="font-size:16px">A debug launcher, a folder and one <code>.html</code> file. That's the whole setup.</p>
          </div>
          <div style="display:flex;gap:14px;flex:0 0 auto">
            <a class="uc-btn" href="#">Quickstart ${I.arrow}</a>
            <a class="uc-btn-ghost" href="#">${I.github} Star on GitHub</a>
          </div>
        </div>
      </section>
      ${footer(dir)}
    </div>`;
  }

  /* ============================================================
     DOCS ARTICLE
     ============================================================ */
  function docs(dir) {
    const sb = (cap, items) => `<div class="uc-sb-group">
      <div class="uc-sb-cap">${cap}</div>
      ${items.map(([t, on]) => `<a class="uc-sb-link ${on ? "is-active" : ""}" href="#"><span class="uc-sb-dot"></span>${t}</a>`).join("")}
    </div>`;
    const toc = (items) => items.map(([t, sub, on]) => `<a class="${sub ? "sub" : ""} ${on ? "is-active" : ""}" href="#">${t}</a>`).join("");

    return `<div class="uc-site">
      ${nav(dir, "docs")}
      <div class="uc-docs">
        <!-- SIDEBAR -->
        <aside class="uc-sidebar">
          ${sb("Getting started", [["Overview", false], ["Quickstart", false], ["Configuration", false]])}
          ${sb("UCHTML engine", [["Grid system", true], ["Jinja2 templating", false], ["Embedded context", false], ["URL routing", false]])}
          ${sb("Reference", [["UI components", false], ["Reactive zones", false], ["Data generation", false]])}
        </aside>

        <!-- ARTICLE -->
        <article class="uc-article">
          <div class="uc-breadcrumb">UCHTML engine ${I.chev} <b>Grid system</b></div>
          <h1 class="uc-h1" style="font-size:42px;margin-bottom:16px">Grid system</h1>
          <p class="uc-lead" style="font-size:18px;margin-bottom:26px">The UCHTML grid is inspired by HTML/CSS layout and adapted for Metin2's native UI. It runs a two-pass process: a <b style="color:var(--text)">measure</b> pass, then a <b style="color:var(--text)">layout</b> pass.</p>
          <div style="display:flex;gap:10px;margin-bottom:34px">
            <span class="uc-tag">block</span><span class="uc-tag">flex</span><span class="uc-tag">relative</span>
          </div>

          <h2 class="uc-h2" style="margin-bottom:14px;display:flex;align-items:center;gap:10px"><span class="uc-seal-wrap" style="font-size:16px;color:var(--gold)">${I.hash}</span>Display modes</h2>
          <p class="uc-p" style="margin-bottom:18px">Every element picks one of three display modes. <code>block</code> stacks children vertically, <code>flex</code> flows them horizontally with wrapping, and <code>relative</code> positions them with explicit <code>x</code>/<code>y</code> coordinates.</p>

          ${S.block({ file: "flex layout", lang: "UCHTML", body: S.flex() })}

          <div class="uc-note" style="margin:20px 0"><span class="uc-adm-ico" style="color:var(--gold);font-size:16px">${I.book}</span><div><div class="uc-adm-title">Note</div><span class="uc-p" style="font-size:14px">In flex mode, items wrap to a new line when they run out of room. Use <code>spacing</code> to set the vertical gap between lines.</span></div></div>

          <h2 class="uc-h2" style="margin:34px 0 14px;display:flex;align-items:center;gap:10px"><span class="uc-seal-wrap" style="font-size:16px;color:var(--gold)">${I.hash}</span>Attributes</h2>
          <p class="uc-p" style="margin-bottom:18px">These attributes are available on every element in the grid system.</p>
          <div style="border:1px solid var(--line);border-radius:var(--radius);overflow:hidden;margin-bottom:24px">
          <table class="uc-table">
            <thead><tr><th style="width:130px">Attribute</th><th style="width:150px">Values</th><th>Description</th></tr></thead>
            <tbody>
              <tr><td><code>display</code></td><td>block · flex · relative</td><td>Layout mode for the element and its children.</td></tr>
              <tr><td><code>width</code></td><td>number · auto · content · %</td><td><code>auto</code> fills available space; <code>content</code> defers to children.</td></tr>
              <tr><td><code>justify-content</code></td><td>flex-start … space-evenly</td><td>Horizontal distribution within a flex line.</td></tr>
              <tr><td><code>align-items</code></td><td>flex-start · center · stretch</td><td>Vertical alignment of items within each line.</td></tr>
              <tr><td><code>spacing</code></td><td>number</td><td>Gap between wrapped flex lines.</td></tr>
            </tbody>
          </table>
          </div>

          <div class="uc-caution"><span class="uc-adm-ico" style="color:var(--rose);font-size:16px">${I.spark}</span><div><div class="uc-adm-title">Caution</div><span class="uc-p" style="font-size:14px"><code>max-width</code> is currently disabled. Use a fixed width or a percentage with <code>max-height</code> instead.</span></div></div>

          <!-- pager -->
          <div style="display:flex;justify-content:space-between;gap:16px;margin-top:40px">
            <a href="#" style="flex:1;border:1px solid var(--line);border-radius:var(--radius);padding:16px 18px;text-decoration:none"><div class="uc-mono" style="font-size:11px;color:var(--faint)">← Previous</div><div style="color:var(--text);font-weight:600;margin-top:4px;font-family:var(--font-display)">Configuration</div></a>
            <a href="#" style="flex:1;border:1px solid var(--line);border-radius:var(--radius);padding:16px 18px;text-decoration:none;text-align:right"><div class="uc-mono" style="font-size:11px;color:var(--faint)">Next →</div><div style="color:var(--gold2);font-weight:600;margin-top:4px;font-family:var(--font-display)">Jinja2 templating</div></a>
          </div>
        </article>

        <!-- TOC -->
        <aside class="uc-toc">
          <div class="uc-toc-cap">On this page</div>
          ${toc([["Display modes", false, true], ["Block", true, false], ["Flex", true, false], ["Relative", true, false], ["Attributes", false, false], ["Sizing", false, false]])}
          <div style="margin-top:26px;border-top:1px solid var(--line);padding-top:18px;display:flex;flex-direction:column;gap:10px">
            <a href="#" class="uc-mono" style="font-size:12px;color:var(--muted);text-decoration:none;display:flex;align-items:center;gap:7px">${I.github} Edit this page</a>
            <span class="uc-mono" style="font-size:11px;color:var(--faint)">Updated 3 days ago</span>
          </div>
        </aside>
      </div>
      ${footer(dir)}
    </div>`;
  }

  window.UCP = { nav, footer, kicker, I, GOLD, FAINT, BLUE, markFor, landing, docs };
})();
