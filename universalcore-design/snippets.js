/* UniversalCore — code snippet library (pre-highlighted).
   window.SNIP.block({...}) renders a styled code card; the *() helpers
   return highlighted <pre> bodies for real docs samples. */
(function () {
  const P  = s => `<span class="tok-punc">${s}</span>`;
  const TAG= s => `<span class="tok-tag">${s}</span>`;
  const A  = s => `<span class="tok-attr">${s}</span>`;
  const S  = s => `<span class="tok-str">${s}</span>`;
  const J  = s => `<span class="tok-jin">${s}</span>`;
  const C  = s => `<span class="tok-com">${s}</span>`;
  const KW = s => `<span class="tok-kw">${s}</span>`;
  const FN = s => `<span class="tok-fn">${s}</span>`;
  const N  = s => `<span class="tok-num">${s}</span>`;
  const V  = s => `<span class="tok-var">${s}</span>`;
  const LT = P("&lt;"), GT = P("&gt;"), SL = P("/");

  // attr name="value" (value already-html)
  const at = (n, v) => ` ${A(n)}${P("=")}${S('"')}${v}${S('"')}`;
  const atRaw = (n, v) => ` ${A(n)}${P("=")}${S('"' + v + '"')}`;

  function block(o) {
    o = o || {};
    const dots = `<span class="uc-dots"><i style="background:#df6a5f"></i><i style="background:#e3b341"></i><i style="background:#71ad7d"></i></span>`;
    const file = o.file ? `<span class="uc-file">${o.file}</span>` : "";
    const meta = `<span class="uc-copy">${o.lang ? o.lang + " &nbsp;·&nbsp; " : ""}copy</span>`;
    return `<div class="uc-code">
      <div class="uc-code-bar">${dots}${file}${meta}</div>
      <pre>${o.body}</pre>
    </div>`;
  }

  const firstPage = () =>
`${LT}${TAG("main")}${GT}
    Hello from example page.
    ${LT}${TAG("txt")}${atRaw("align", "center")}${GT}We can show fancy stuff like${LT}${SL}${TAG("txt")}${GT}
    ${LT}${TAG("item-card")}${at("vnum", `${J("{{")} ${V("fun")}.${FN("getv")}(${S("'query:vnum'")}) ${J("}}")}`)} ${SL}${GT}
${LT}${SL}${TAG("main")}${GT}`;

  const reactive = () =>
`${LT}${TAG("div")}${atRaw("id", "progress-zone")}${at("reactive", "mh_1_done,mh_1_need")}${GT}
    ${J("{%")} ${KW("set")} done ${P("=")} ${V("fun")}.${FN("getvi")}(${S("'mh_1_done'")}, ${N("0")}) ${J("%}")}
    ${J("{%")} ${KW("set")} need ${P("=")} ${V("fun")}.${FN("getvi")}(${S("'mh_1_need'")}, ${N("0")}) ${J("%}")}

    Progress: ${J("{{")} done ${J("}}")}${P("/")}${J("{{")} need ${J("}}")}
    ${LT}${TAG("progress")}${at("max", `${J("{{")} need ${J("}}")}`)}${at("count", `${J("{{")} done ${J("}}")}`)} ${SL}${GT}
${LT}${SL}${TAG("div")}${GT}`;

  const pySetVars = () =>
`${C("# only the watching zone re-renders — scroll is kept")}
loader.${FN("SetVars")}({
    ${S('"mh_1_done"')}: ${N("15")},
    ${S('"state"')}:     ${S('"task_wip"')},
})`;

  const flex = () =>
`${LT}${TAG("div")}${at("display", "flex")}${at("width", "100%")}
${"     "}${at("justify-content", "space-evenly")}${at("align-items", "center")}${GT}
    ${J("{%")} ${KW("for")} i ${KW("in")} ${FN("range")}(${N("5")}) ${J("%}")}
        ${LT}${TAG("thin-board")}${at("width", "30")}${at("height", `${J("{{")} ${N("10")}${P("*")}(i${P("+")}${N("1")}) ${J("}}")}`)} ${SL}${GT}
    ${J("{%")} ${KW("endfor")} ${J("%}")}
${LT}${SL}${TAG("div")}${GT}`;

  const macro = () =>
`${J("{%")} ${KW("import")} ${S('"templates/headers.html"')} ${KW("as")} header ${J("%}")}

${LT}${TAG("main")}${GT}
    ${J("{{")} ${V("header")}.${FN("h1")}(${S('"Item details"')}) ${J("}}")}
    ${LT}${TAG("item-card")}${at("vnum", `${J("{{")} vnum ${J("}}")}`)} ${SL}${GT}
${LT}${SL}${TAG("main")}${GT}`;

  const url = () =>
`${V("wiki")}${P("://")}p${P("/")}items${P("/")}details${P("?")}${A("vnum")}${P("=")}${N("2000")}${P("&")}${A("tab")}${P("=")}${S("info")}${P("#")}${V("stats")}`;

  const tabs = () =>
`${LT}${TAG("filter-group")}${at("type", "tabs")}${at("filter-target", "query:tab")}${at("default", "info")}${GT}
    ${LT}${TAG("filter")}${at("type", "tab")}${at("filter-value", "info")}${GT}
        ${LT}${TAG("txt")}${at("color", "wikititle")}${at("align", "center")}${GT}Information${LT}${SL}${TAG("txt")}${GT}
    ${LT}${SL}${TAG("filter")}${GT}
    ${J("{%")} ${KW("if")} has_upgrade ${J("%}")}
    ${LT}${TAG("filter")}${at("type", "tab")}${at("filter-value", "up")}${GT}
        ${LT}${TAG("txt")}${at("color", "wikititle")}${at("align", "center")}${GT}Upgrade${LT}${SL}${TAG("txt")}${GT}
    ${LT}${SL}${TAG("filter")}${GT}
    ${J("{%")} ${KW("endif")} ${J("%}")}
${LT}${SL}${TAG("filter-group")}${GT}`;

  window.SNIP = { block, firstPage, reactive, pySetVars, flex, macro, url, tabs };
})();
