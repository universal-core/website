import { defaultKeymap, history, historyKeymap, indentWithTab } from "@codemirror/commands";
import { cpp } from "@codemirror/lang-cpp";
import { json } from "@codemirror/lang-json";
import { python } from "@codemirror/lang-python";
import { yaml } from "@codemirror/lang-yaml";
import {
  bracketMatching,
  HighlightStyle,
  indentOnInput,
  StreamLanguage,
  type StreamParser,
  syntaxHighlighting,
} from "@codemirror/language";
import { lua } from "@codemirror/legacy-modes/mode/lua";
import {
  Annotation,
  EditorState,
  type Extension,
  RangeSetBuilder,
  StateEffect,
  StateField,
} from "@codemirror/state";
import {
  Decoration,
  type DecorationSet,
  drawSelection,
  EditorView,
  highlightActiveLine,
  highlightActiveLineGutter,
  keymap,
  lineNumbers,
} from "@codemirror/view";
import { tags as t } from "@lezer/highlight";

type LuaState = { indentDepth: number };

const QUEST_KEYWORDS = /^(quest|forge|environment|state|when|begin|with)$/;

// Quest and forge files are Lua wrapped in `quest x begin` / `forge x begin`, `environment e begin`,
// `state y begin` and `when z begin` blocks; `begin` must open an indent level or every closing
// `end` dedents too far.
const quest: StreamParser<LuaState> = {
  ...(lua as StreamParser<LuaState>),
  name: "quest",
  token(stream, state) {
    const style = lua.token(stream, state);
    const word = stream.current();
    if (style === "variable" && QUEST_KEYWORDS.test(word)) {
      if (word === "begin") state.indentDepth++;
      return "keyword";
    }
    return style;
  },
};

const luaLanguage = StreamLanguage.define(lua);
const questLanguage = StreamLanguage.define(quest);

export const languageFor = (path: string): Extension => {
  const ext = path.split(".").pop()?.toLowerCase();
  switch (ext) {
    case "quest":
    case "forge":
      return questLanguage;
    case "lua":
      return luaLanguage;
    case "py":
      return python();
    case "yml":
    case "yaml":
      return yaml();
    case "json":
      return json();
    case "c":
    case "cc":
    case "cpp":
    case "cxx":
    case "h":
    case "hpp":
      return cpp();
    default:
      return [];
  }
};

// Token colours follow forgePrism in docusaurus.config.js.
const forgeHighlight = HighlightStyle.define([
  { tag: [t.comment, t.lineComment, t.blockComment], color: "#6b6b7a", fontStyle: "italic" },
  { tag: [t.keyword, t.bool, t.null, t.atom, t.controlKeyword, t.modifier], color: "#e3799b" },
  { tag: [t.string, t.special(t.string), t.character, t.regexp], color: "#7fd1c0" },
  { tag: [t.number, t.integer, t.float], color: "#d6a8f0" },
  {
    tag: [t.function(t.variableName), t.function(t.propertyName), t.className, t.typeName],
    color: "#c9b4ff",
  },
  { tag: [t.operator, t.punctuation, t.bracket, t.separator], color: "#837f8c" },
  {
    tag: [t.propertyName, t.definition(t.propertyName), t.special(t.variableName), t.constant(t.variableName)],
    color: "#6fc0e0",
  },
  { tag: t.attributeName, color: "#8fb8e8" },
  { tag: [t.standard(t.variableName), t.namespace, t.macroName], color: "#a78bf5" },
  { tag: [t.tagName, t.labelName], color: "#b79cf2" },
  { tag: t.invalid, color: "#db7a5e" },
]);

const forgeTheme = EditorView.theme(
  {
    "&": {
      height: "100%",
      color: "#cfc8bb",
      backgroundColor: "var(--uc-bg-code)",
      fontSize: "13px",
    },
    ".cm-scroller": {
      fontFamily: "var(--uc-font-mono)",
      lineHeight: "1.6",
    },
    ".cm-content": { caretColor: "var(--uc-violet2)", padding: "12px 0" },
    ".cm-cursor, .cm-dropCursor": { borderLeftColor: "var(--uc-violet2)" },
    "&.cm-focused": { outline: "none" },
    "&.cm-focused > .cm-scroller > .cm-selectionLayer .cm-selectionBackground, .cm-selectionBackground, ::selection":
      { backgroundColor: "rgba(167, 139, 245, 0.24)" },
    ".cm-gutters": {
      backgroundColor: "var(--uc-bg-code)",
      color: "#5a554c",
      border: "none",
    },
    ".cm-lineNumbers .cm-gutterElement": { padding: "0 12px 0 16px" },
    ".cm-activeLine": { backgroundColor: "rgba(255, 255, 255, 0.025)" },
    ".cm-activeLineGutter": { backgroundColor: "transparent", color: "var(--uc-muted)" },
    ".cm-matchingBracket, &.cm-focused .cm-matchingBracket": {
      backgroundColor: "rgba(167, 139, 245, 0.2)",
      outline: "none",
    },
    ".cm-uc-changed": {
      backgroundColor: "var(--docusaurus-highlighted-code-line-bg)",
      boxShadow: "inset 2px 0 0 var(--uc-violet)",
    },
  },
  { dark: true },
);

const setChanged = StateEffect.define<number[]>();
const changedMark = Decoration.line({ class: "cm-uc-changed" });

const changedField = StateField.define<DecorationSet>({
  create: () => Decoration.none,
  update(marks, tr) {
    for (const effect of tr.effects) {
      if (!effect.is(setChanged)) continue;
      const builder = new RangeSetBuilder<Decoration>();
      const total = tr.state.doc.lines;
      [...new Set(effect.value)]
        .filter((n) => n >= 1 && n <= total)
        .sort((a, b) => a - b)
        .forEach((n) => {
          const line = tr.state.doc.line(n);
          builder.add(line.from, line.from, changedMark);
        });
      return builder.finish();
    }
    return marks.map(tr.changes);
  },
  provide: (field) => EditorView.decorations.from(field),
});

const external = Annotation.define<boolean>();

export type TutorialEditor = {
  load: (path: string, doc: string, readOnly: boolean) => void;
  sync: (doc: string) => void;
  highlight: (lines: number[]) => void;
  destroy: () => void;
};

export const createEditor = (
  parent: HTMLElement,
  onChange: (doc: string) => void,
): TutorialEditor => {
  const view = new EditorView({ parent });

  const listener = EditorView.updateListener.of((update) => {
    if (!update.docChanged) return;
    if (update.transactions.some((tr) => tr.annotation(external))) return;
    onChange(update.state.doc.toString());
  });

  return {
    load(path, doc, readOnly) {
      view.setState(
        EditorState.create({
          doc,
          extensions: [
            lineNumbers(),
            highlightActiveLineGutter(),
            highlightActiveLine(),
            history(),
            drawSelection(),
            indentOnInput(),
            bracketMatching(),
            keymap.of([...defaultKeymap, ...historyKeymap, indentWithTab]),
            syntaxHighlighting(forgeHighlight),
            forgeTheme,
            languageFor(path),
            changedField,
            EditorState.readOnly.of(readOnly),
            EditorView.editable.of(!readOnly),
            listener,
          ],
        }),
      );
    },
    sync(doc) {
      const current = view.state.doc.toString();
      if (current === doc) return;
      view.dispatch({
        changes: { from: 0, to: current.length, insert: doc },
        annotations: external.of(true),
      });
    },
    highlight(lines) {
      const effects: StateEffect<unknown>[] = [setChanged.of(lines)];
      const first = Math.min(...lines);
      if (Number.isFinite(first) && first <= view.state.doc.lines) {
        effects.push(
          EditorView.scrollIntoView(view.state.doc.line(first).from, { y: "center" }),
        );
      }
      view.dispatch({ effects });
    },
    destroy: () => view.destroy(),
  };
};
