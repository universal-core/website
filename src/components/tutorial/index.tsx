import clsx from "clsx";
import React from "react";
import {
  VscCheck,
  VscClose,
  VscDiffModified,
  VscDiscard,
  VscEye,
  VscNewFile,
} from "react-icons/vsc";
import { TutorialChromeContext } from "./chrome";
import { Editor } from "./editor";
import { FileTree } from "./file-tree";
import {
  type Action,
  ancestors,
  buildTree,
  createState,
  type Files,
  isDirty,
  normalizePath,
  parseLines,
  reducer,
  shownFiles,
} from "./state";
import "./tutorial.css";

const NARROW = "(max-width: 959px)";
const SPLIT_KEY = "uc-tutorial-split";
const SPLIT_MIN = 30;
const SPLIT_MAX = 70;

type Step = (action: Action) => void;

const TutorialContext = React.createContext<Step | null>(null);

type TutorialProps = {
  /** path -> content the reader starts with */
  files: Files;
  /** path -> content of the finished tutorial; enables Solve */
  solution?: Files;
  /** file open at start; defaults to the first path */
  active?: string;
  children?: React.ReactNode;
};

export const Tutorial = ({ files, solution, active, children }: TutorialProps) => {
  const [state, dispatch] = React.useReducer(reducer, undefined, () =>
    createState(files, solution, active),
  );
  const [collapsed, setCollapsed] = React.useState<Set<string>>(() => new Set());
  const [mode, setMode] = React.useState<"text" | "files">("text");
  const [split, setSplit] = React.useState(44);
  const root = React.useRef<HTMLDivElement>(null);
  const text = React.useRef<HTMLDivElement>(null);
  const textScroll = React.useRef(0);
  const chrome = React.useContext(TutorialChromeContext);

  const shown = shownFiles(state);
  const tree = React.useMemo(() => buildTree(Object.keys(shown)), [shown]);

  React.useEffect(() => {
    try {
      const stored = Number(window.localStorage.getItem(SPLIT_KEY));
      if (stored >= SPLIT_MIN && stored <= SPLIT_MAX) setSplit(stored);
    } catch {}
  }, []);

  React.useEffect(() => {
    if (!state.active) return;
    const open = ancestors(state.active);
    setCollapsed((prev) =>
      open.some((p) => prev.has(p)) ? new Set([...prev].filter((p) => !open.includes(p))) : prev,
    );
  }, [state.active]);

  const showMode = React.useCallback((next: "text" | "files") => {
    if (!window.matchMedia(NARROW).matches) return;
    setMode((current) => {
      if (current === next) return current;
      if (next === "files" && text.current) textScroll.current = text.current.scrollTop;
      return next;
    });
  }, []);

  // Hiding the text column on narrow screens drops its scroll position; put it back.
  React.useLayoutEffect(() => {
    if (mode === "text" && text.current) text.current.scrollTop = textScroll.current;
  }, [mode]);

  const step = React.useCallback<Step>(
    (action) => {
      dispatch(action);
      showMode("files");
    },
    [showMode],
  );

  const onResizeStart = (event: React.PointerEvent<HTMLDivElement>) => {
    const handle = event.currentTarget;
    const rect = root.current?.getBoundingClientRect();
    if (!rect) return;
    handle.setPointerCapture(event.pointerId);
    let latest = split;
    const move = (e: PointerEvent) => {
      latest = Math.min(
        SPLIT_MAX,
        Math.max(SPLIT_MIN, ((e.clientX - rect.left) / rect.width) * 100),
      );
      setSplit(latest);
    };
    const up = () => {
      handle.removeEventListener("pointermove", move);
      handle.removeEventListener("pointerup", up);
      try {
        window.localStorage.setItem(SPLIT_KEY, String(Math.round(latest)));
      } catch {}
    };
    handle.addEventListener("pointermove", move);
    handle.addEventListener("pointerup", up);
    event.preventDefault();
  };

  const activeCode = state.active !== null ? shown[state.active] : undefined;
  const highlight =
    state.highlight && state.highlight.path === state.active ? state.highlight : null;
  const dirty = isDirty(state);

  return (
    <TutorialContext.Provider value={step}>
      <div
        ref={root}
        className="uc-tutorial"
        data-mode={mode}
        style={{ "--uc-tutorial-split": `${split}%` } as React.CSSProperties}
      >
        <div className="uc-tutorial__text" ref={text}>
          <article className="uc-tutorial__article refine-prose">
            {chrome.title ? <h1>{chrome.title}</h1> : null}
            {children}
            {chrome.footer}
          </article>
        </div>

        <div
          className="uc-tutorial__handle"
          role="separator"
          aria-orientation="vertical"
          aria-valuenow={Math.round(split)}
          aria-valuemin={SPLIT_MIN}
          aria-valuemax={SPLIT_MAX}
          onPointerDown={onResizeStart}
        />

        <div className="uc-tutorial__bench not-prose">
          <div className="uc-tutorial__bar">
            <div className="uc-tutorial__tabs" role="tablist">
              {state.tabs
                .filter((path) => path in shown)
                .map((path) => (
                  <div
                    key={path}
                    className={clsx(
                      "uc-tutorial__tab",
                      path === state.active && "uc-tutorial__tab--active",
                    )}
                  >
                    <button
                      type="button"
                      role="tab"
                      aria-selected={path === state.active}
                      title={path}
                      onClick={() => dispatch({ type: "open", path })}
                    >
                      {path.split("/").pop()}
                    </button>
                    <button
                      type="button"
                      aria-label={`Close ${path}`}
                      className="uc-tutorial__tab-close"
                      onClick={() => dispatch({ type: "close", path })}
                    >
                      <VscClose />
                    </button>
                  </div>
                ))}
            </div>
            <div className="uc-tutorial__actions">
              <button
                type="button"
                title="Discard your edits and return to the current step"
                disabled={!dirty || state.solved}
                onClick={() => dispatch({ type: "reset" })}
              >
                <VscDiscard /> Reset
              </button>
              {state.solution ? (
                <button
                  type="button"
                  className={clsx(state.solved && "uc-tutorial__solve--on")}
                  aria-pressed={state.solved}
                  onClick={() => dispatch({ type: "solve" })}
                >
                  <VscCheck /> {state.solved ? "Back" : "Solve"}
                </button>
              ) : null}
            </div>
          </div>
          <div className="uc-tutorial__body">
            <nav className="uc-tutorial__files" aria-label="Files">
              <FileTree
                nodes={tree}
                active={state.active}
                collapsed={collapsed}
                onOpen={(path) => dispatch({ type: "open", path })}
                onToggle={(path) =>
                  setCollapsed((prev) => {
                    const next = new Set(prev);
                    if (!next.delete(path)) next.add(path);
                    return next;
                  })
                }
              />
            </nav>
            {state.active !== null && activeCode !== undefined ? (
              <Editor
                path={state.active}
                value={activeCode}
                readOnly={state.solved}
                highlight={highlight}
                onChange={(path, code) => dispatch({ type: "edit", path, code })}
              />
            ) : (
              <div className="uc-tutorial__empty">Pick a file on the left.</div>
            )}
          </div>
          {state.solved ? (
            <div className="uc-tutorial__status">Solution, read only</div>
          ) : null}
        </div>

        <div className="uc-tutorial__switch not-prose" role="tablist">
          <div className="uc-tutorial__switch-track">
            {(["text", "files"] as const).map((m) => (
              <button
                key={m}
                type="button"
                role="tab"
                aria-selected={mode === m}
                className={clsx(mode === m && "uc-tutorial__switch--active")}
                onClick={() => showMode(m)}
              >
                {m === "text" ? "Tutorial" : "Editor"}
              </button>
            ))}
          </div>
        </div>
      </div>
    </TutorialContext.Provider>
  );
};

type StepProps = {
  path: string;
  /** "3-5,9": lines to mark instead of the computed diff */
  lines?: string | number | number[];
  children?: React.ReactNode;
};

const StepButton = ({
  path,
  icon,
  verb,
  action,
  children,
}: {
  path: string;
  icon: React.ReactNode;
  verb: string;
  action: Action;
  children?: React.ReactNode;
}) => {
  const step = React.useContext(TutorialContext);
  return (
    <button
      type="button"
      className="uc-tutorial__step not-prose"
      disabled={!step}
      onClick={() => step?.(action)}
    >
      {icon}
      {children ?? (
        <>
          <span>{verb}</span>
          <code>{normalizePath(path)}</code>
        </>
      )}
    </button>
  );
};

export const CreateFile = ({ path, code, lines, children }: StepProps & { code: string }) => (
  <StepButton
    path={path}
    icon={<VscNewFile />}
    verb="Create"
    action={{ type: "step", path, code, lines: parseLines(lines) }}
  >
    {children}
  </StepButton>
);

export const UpdateFile = ({ path, code, lines, children }: StepProps & { code: string }) => (
  <StepButton
    path={path}
    icon={<VscDiffModified />}
    verb="Update"
    action={{ type: "step", path, code, lines: parseLines(lines) }}
  >
    {children}
  </StepButton>
);

export const ShowFile = ({ path, lines, children }: StepProps) => (
  <StepButton
    path={path}
    icon={<VscEye />}
    verb="Open"
    action={{ type: "step", path, lines: parseLines(lines) }}
  >
    {children}
  </StepButton>
);
