/* UniversalCore docs — page templates part 2: blog index, blog post,
   interactive tutorial (faithful to the Docusaurus tutorial tracker:
   unit tabs · progress rings · current-launcher card · parameter
   resolution dropdowns · checklist). Extends window.UCP. */
(function () {
  const S = window.SNIP, P = window.UCP, I = P.I;
  const kicker = P.kicker, nav = P.nav, footer = P.footer;

  const POSTS = [
    ["Reactive zones: updates 100× faster", "Engine", "How a 6-line attribute turned full page reloads into sub-millisecond patches.", "LM", "Luca M.", "8 min", "engine"],
    ["The UCHTML grid, explained", "Design", "Two passes, three display modes, and why it feels like CSS but isn't.", "Rd", "Radu D.", "11 min", "design"],
    ["From .hpa packs to live reload", "Workflow", "Setting up a debug launcher so saving a file refreshes the client instantly.", "SK", "Sora K.", "6 min", "workflow"],
    ["Item tooltips with one tag", "Recipes", "Composing a full item card — stats, drops, upgrades — from the embedded context.", "LM", "Luca M.", "7 min", "recipes"],
    ["Macros are lego blocks", "Recipes", "Reusable headers, cards and layouts that keep every wiki page consistent.", "Rd", "Radu D.", "5 min", "recipes"],
    ["A tour of filter-group", "Components", "Tabs, button rows and lists that drive query variables without a line of Python.", "SK", "Sora K.", "9 min", "components"],
  ];

  function card(p) {
    return `<a href="#" class="uc-post-card" style="text-decoration:none">
      <div class="uc-shot"><div class="uc-shot-cap"><b>cover</b>1200×630 · ${p[1].toLowerCase()}</div></div>
      <div class="pc-body">
        <div style="display:flex;gap:8px;align-items:center"><span class="uc-badge">${p[1]}</span><span class="uc-tag">${p[5]}</span></div>
        <h3>${p[0]}</h3>
        <p class="uc-p" style="font-size:13.5px;flex:1">${p[2]}</p>
        <div class="uc-author" style="margin-top:4px">
          <span class="uc-avatar">${p[3]}</span>
          <span class="uc-mono" style="font-size:11.5px;color:var(--muted)">${p[4]}</span>
          <span class="uc-mono" style="font-size:11.5px;color:var(--faint);margin-left:auto">Jan 2026</span>
        </div>
      </div>
    </a>`;
  }

  /* ============================================================
     BLOG INDEX
     ============================================================ */
  function blogIndex(dir) {
    const chips = ["All", "Engine", "Components", "Recipes", "Workflow", "Design"];
    return `<div class="uc-site">
      ${nav(dir, "blog")}
      <section style="padding:54px 56px 30px;border-bottom:1px solid var(--line)">
        <div style="display:flex;flex-direction:column;gap:14px;max-width:720px">
          ${kicker("The journal")}
          <h1 class="uc-h1" style="font-size:46px">Notes from inside the engine.</h1>
          <p class="uc-lead">Deep dives, recipes and release notes from the people building UniversalCore.</p>
        </div>
        <div style="display:flex;gap:9px;margin-top:26px">
          ${chips.map((c, i) => `<span class="${i === 0 ? "uc-badge" : "uc-tag"}" style="cursor:pointer;${i === 0 ? "" : "padding:5px 13px"}">${c}</span>`).join("")}
        </div>
      </section>

      <!-- FEATURED -->
      <section style="padding:34px 56px 10px">
        <a href="#" style="display:grid;grid-template-columns:1.1fr 1fr;gap:30px;border:1px solid var(--gold-line);border-radius:var(--radius);overflow:hidden;background:var(--gold-soft);text-decoration:none;align-items:stretch">
          <div class="uc-shot" style="border:none;border-radius:0;min-height:300px"><div class="uc-shot-cap"><b>featured cover</b>1600×900 · in-game capture</div></div>
          <div style="padding:36px 38px;display:flex;flex-direction:column;gap:16px;justify-content:center">
            <div style="display:flex;gap:8px;align-items:center"><span class="uc-badge">${I.spark} Featured</span><span class="uc-tag">release</span></div>
            <h2 class="uc-h2" style="font-size:30px">UniversalCore 2.4 — reactive zones, lazy grids &amp; a faster validator</h2>
            <p class="uc-p">The biggest release yet. Re-render a single zone in under a millisecond, stream huge item grids without freezing the client, and catch template errors before they ship.</p>
            <div class="uc-author" style="margin-top:6px">
              <span class="uc-avatar">LM</span>
              <span class="uc-mono" style="font-size:12px;color:var(--muted)">Luca M. · core maintainer</span>
              <span class="uc-mono" style="font-size:12px;color:var(--faint);margin-left:14px">${I.clock} 12 min</span>
            </div>
          </div>
        </a>
      </section>

      <!-- GRID -->
      <section style="padding:30px 56px 60px">
        <div style="display:flex;align-items:baseline;justify-content:space-between;margin-bottom:20px">
          <h2 class="uc-h2" style="font-size:22px">Latest</h2>
          <a href="#" class="uc-mono" style="font-size:12.5px;color:var(--gold2);text-decoration:none">View all ${I.arrow}</a>
        </div>
        <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:20px">
          ${POSTS.map(card).join("")}
        </div>
      </section>
      ${footer(dir)}
    </div>`;
  }

  /* ============================================================
     BLOG POST
     ============================================================ */
  function blogPost(dir) {
    return `<div class="uc-site">
      ${nav(dir, "blog")}
      <article>
        <!-- HERO -->
        <header style="max-width:760px;margin:0 auto;padding:50px 32px 30px;text-align:center;display:flex;flex-direction:column;gap:18px;align-items:center">
          <div style="display:flex;gap:8px;align-items:center"><span class="uc-badge">Engine</span><span class="uc-tag">deep dive</span></div>
          <h1 class="uc-h1" style="font-size:46px">Reactive zones: how we made updates 100× faster</h1>
          <p class="uc-lead" style="text-align:center">Full page reloads were costing us 100ms and the player's scroll position. Here's the six-line fix that changed how UniversalCore renders.</p>
          <div class="uc-author" style="margin-top:6px">
            <span class="uc-avatar">LM</span>
            <div style="text-align:left"><div style="color:var(--text);font-weight:600;font-size:14px">Luca M.</div><div class="uc-mono" style="font-size:11.5px;color:var(--faint)">Jan 14, 2026 · 8 min read</div></div>
          </div>
        </header>
        <div class="uc-shot" style="max-width:980px;margin:0 auto 44px;height:380px;border-radius:var(--radius)"><div class="uc-shot-cap"><b>cover image</b>1960×760 · before / after benchmark</div></div>

        <!-- BODY -->
        <div style="max-width:720px;margin:0 auto;padding:0 32px 40px;display:flex;flex-direction:column;gap:22px">
          <p class="uc-p" style="font-size:17px;line-height:1.8">Every quest tracker, shop counter and progress bar in the client used to trigger a <strong>full template re-render</strong>. For a single number ticking up, that meant re-measuring and re-laying-out the entire page — and the player would watch their scroll jump back to the top.</p>

          <h2 class="uc-h2" style="font-size:26px;margin-top:14px">The idea: watch, don't reload</h2>
          <p class="uc-p" style="font-size:17px;line-height:1.8">A reactive zone is just a <code>&lt;div&gt;</code> with two attributes: an <code>id</code> and a <code>reactive</code> list of variable names. When the backend changes one of those variables, we re-render only that zone — and restore scroll automatically.</p>

          ${S.block({ file: "<b>mission</b>.html", lang: "UCHTML", body: S.reactive() })}

          <p class="uc-p" style="font-size:17px;line-height:1.8">From Python, you don't think about zones at all. Call <code>SetVar</code> or <code>SetVars</code> and the engine figures out which zones to patch, rendering the template exactly once.</p>

          ${S.block({ file: "<b>mission</b>.py", lang: "Python", body: S.pySetVars() })}

          <blockquote style="border-left:3px solid var(--gold);padding:6px 20px;margin:8px 0;font-family:var(--font-display);font-size:21px;font-style:italic;color:var(--text);line-height:1.5">"A progress counter went from ~100ms per tick to under one. The page stopped flickering, and players stopped losing their place."</blockquote>

          <div class="uc-tip"><span class="uc-adm-ico" style="color:var(--accent2);font-size:16px">${I.bolt}</span><div><div class="uc-adm-title">Tip</div><span class="uc-p" style="font-size:14px">Keep zones small and focused. One giant reactive zone wrapping the whole page defeats the purpose.</span></div></div>

          <h2 class="uc-h2" style="font-size:26px;margin-top:14px">The numbers</h2>
          <p class="uc-p" style="font-size:17px;line-height:1.8">Across the common cases, the difference is hard to overstate — and scroll preservation is something a full reload simply can't offer.</p>
          <div style="border:1px solid var(--line);border-radius:var(--radius);overflow:hidden">
          <table class="uc-table">
            <thead><tr><th>Scenario</th><th>Full reload</th><th>Reactive zone</th></tr></thead>
            <tbody>
              <tr><td>Counter update</td><td>~100 ms</td><td>&lt; 1 ms</td></tr>
              <tr><td>Text change</td><td>~100 ms</td><td>&lt; 1 ms</td></tr>
              <tr><td>List of 20 items</td><td>~100 ms</td><td>~5 ms</td></tr>
            </tbody>
          </table>
          </div>
        </div>

        <!-- AUTHOR -->
        <div style="max-width:720px;margin:0 auto;padding:0 32px 50px">
          <div style="border:1px solid var(--line);border-radius:var(--radius);background:var(--bg2);padding:22px;display:flex;gap:16px;align-items:center">
            <span class="uc-avatar" style="width:48px;height:48px;font-size:16px">LM</span>
            <div style="flex:1"><div style="color:var(--text);font-weight:600;font-family:var(--font-display);font-size:17px">Luca M.</div><p class="uc-p" style="font-size:13.5px;margin-top:3px">Core maintainer of UniversalCore. Writes about rendering, tooling and the Metin2 client internals.</p></div>
            <a href="#" class="uc-btn-ghost" style="font-size:13px;padding:9px 16px">Follow</a>
          </div>
        </div>
      </article>
      ${footer(dir)}
    </div>`;
  }

  /* ============================================================
     INTERACTIVE TUTORIAL — narrative (left) + editable VFS (right)
     ============================================================ */
  const folderIco = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>`;
  const fileIco = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M14 3v5h5"/><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/></svg>`;
  const plusIco = `<svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg>`;

  function tutorial(dir) {
    // --- right: virtual file system at the current step ---
    // [label, depth, kind(folder|file), active, modified]
    const tree = [
      ["locale", 0, "folder"],
      ["universal", 1, "folder"],
      ["wiki", 2, "folder"],
      ["p", 3, "folder"],
      ["mission.html", 4, "file", true, true],
      ["templates", 3, "folder"],
      ["headers.html", 4, "file"],
      ["mission.py", 3, "file"],
    ];
    const ftrow = (n) => `<div class="uc-ftrow ${n[2]} ${n[3] ? "is-active" : ""}" style="padding-left:${8 + n[1] * 14}px">${n[2] === "folder" ? folderIco : fileIco}${n[0]}${n[4] ? '<span class="moddot"></span>' : ""}</div>`;

    const tabs = [["mission.html", true, true], ["headers.html", false], ["mission.py", false]];
    const tab = (t) => `<div class="uc-ide-tab ${t[1] ? "is-active" : ""}">${fileIco}${t[0]}${t[2] ? '<span class="moddot"></span>' : ""}</div>`;

    const code = S.reactive();
    const nLines = code.split("\n").length;
    const cursorLine = 1; // editing the opening <div ...> line
    const gutter = Array.from({ length: nLines }, (_, i) => i + 1)
      .map((n) => (n === cursorLine ? `<b>${n}</b>` : `${n}`)).join("\n");
    const codeWithCaret = code.replace("\n", '<span class="uc-caret"></span>\n');

    // --- left: guided actions ---
    const action = (state, ico, t, d, k) => `<button class="uc-action ${state}">
      <span class="a-ico">${ico}</span>
      <span class="a-main"><span class="a-t">${t}</span><span class="a-d">${d}</span></span>
      ${k ? `<span class="a-k">${k}</span>` : ""}
    </button>`;

    return `<div class="uc-site">
      ${nav(dir, "tutorials")}
      <div class="uc-tut2" style="height:760px">
        <!-- LEFT: narrative -->
        <section class="uc-narr">
          <div class="uc-step-meta">
            ${kicker("Reactive zones")}
            <div class="uc-step-nav"><button>${I.chev}</button><button>${I.chev}</button></div>
          </div>
          <h1 class="uc-h1" style="font-size:30px;letter-spacing:-1px">Mark a reactive zone</h1>
          <p class="uc-p" style="font-size:15px">Right now the mission file renders once and never changes. Let's turn the progress block into a <strong>reactive zone</strong> so the backend can patch just those numbers.</p>
          <p class="uc-p" style="font-size:15px">Give the wrapping <code>&lt;div&gt;</code> an <code>id</code> and a <code>reactive</code> list of the variables it watches, then read them with <code>fun.getvi</code>. Follow the steps — each one edits the file on the right.</p>

          <div class="uc-actions">
            ${action("is-done", I.check, "Create p/mission.html", "new file in locale/universal/wiki/p", "done")}
            ${action("is-done", I.check, "Wrap the progress in a &lt;div&gt;", "group the markup to patch together", "done")}
            ${action("", plusIco, "Add id + reactive attributes", "name the variables the zone watches", "apply")}
            ${action("", "&lt;/&gt;", "Fetch with fun.getvi", "read mh_1_done and mh_1_need", "")}
          </div>

          <div class="uc-solvebar">
            <button class="uc-btn">${I.spark} Solve</button>
            <button class="uc-btn-ghost" style="padding:11px 18px">Reset</button>
            <span class="spacer"></span>
            <span class="uc-stepcount">Step 2 / 5</span>
          </div>
        </section>

        <!-- RIGHT: editable virtual file system -->
        <section class="uc-ide">
          <div class="uc-ide-tabs">${tabs.map(tab).join("")}</div>
          <div class="uc-ide-body">
            <aside class="uc-filetree">
              <div class="uc-ft-cap">${folderIco} project</div>
              ${tree.map(ftrow).join("")}
            </aside>
            <div class="uc-ed-wrap">
              <div class="uc-ed-gutter">${gutter}</div>
              <div class="uc-ed-code">${codeWithCaret}</div>
            </div>
          </div>
          <div class="uc-statusbar">
            <span>UCHTML</span><span>Ln ${cursorLine}, Col 38</span>
            <span class="spacer" style="flex:1"></span>
            <span class="ok"><span class="uc-pill-dot"></span>saved · ready</span>
          </div>
        </section>
      </div>
    </div>`;
  }

  Object.assign(window.UCP, { blogIndex, blogPost, tutorial });
})();
