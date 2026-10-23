export type Files = Record<string, string>;

export type Highlight = { path: string; lines: number[]; seq: number };

export type TutorialState = {
  /** Files as the last step left them; Reset restores this. */
  base: Files;
  /** Working copy: `base` plus whatever the reader typed. */
  files: Files;
  solution?: Files;
  solved: boolean;
  active: string | null;
  tabs: string[];
  highlight: Highlight | null;
};

export type Action =
  | { type: "step"; path: string; code?: string; lines?: number[] }
  | { type: "edit"; path: string; code: string }
  | { type: "open"; path: string }
  | { type: "close"; path: string }
  | { type: "reset" }
  | { type: "solve" };

export const normalizePath = (path: string) =>
  path.trim().replace(/^\.?\/+/, "");

export const normalizeFiles = (files: Files = {}): Files =>
  Object.fromEntries(
    Object.entries(files).map(([path, code]) => [normalizePath(path), code]),
  );

export const shownFiles = (state: TutorialState): Files =>
  state.solved && state.solution ? state.solution : state.files;

export const isDirty = (state: TutorialState) => {
  const a = Object.keys(state.files);
  const b = Object.keys(state.base);
  return a.length !== b.length || a.some((k) => state.files[k] !== state.base[k]);
};

export const createState = (
  files: Files,
  solution?: Files,
  active?: string,
): TutorialState => {
  const base = normalizeFiles(files);
  const first = active ? normalizePath(active) : Object.keys(base).sort()[0];
  return {
    base,
    files: { ...base },
    solution: solution ? normalizeFiles(solution) : undefined,
    solved: false,
    active: first ?? null,
    tabs: first ? [first] : [],
    highlight: null,
  };
};

const withTab = (tabs: string[], path: string) =>
  tabs.includes(path) ? tabs : [...tabs, path];

const focus = (state: TutorialState, files: Files): Pick<TutorialState, "active" | "tabs"> => {
  const tabs = state.tabs.filter((t) => t in files);
  if (state.active && state.active in files) {
    return { active: state.active, tabs: withTab(tabs, state.active) };
  }
  const active = tabs[0] ?? Object.keys(files).sort()[0] ?? null;
  return { active, tabs: active ? withTab(tabs, active) : tabs };
};

export const reducer = (state: TutorialState, action: Action): TutorialState => {
  const seq = (state.highlight?.seq ?? 0) + 1;

  switch (action.type) {
    case "step": {
      const path = normalizePath(action.path);
      if (action.code === undefined) {
        if (!(path in shownFiles(state))) return state;
        return {
          ...state,
          active: path,
          tabs: withTab(state.tabs, path),
          highlight: action.lines ? { path, lines: action.lines, seq } : null,
        };
      }
      const lines = action.lines ?? changedLines(state.base[path], action.code);
      return {
        ...state,
        base: { ...state.base, [path]: action.code },
        files: { ...state.files, [path]: action.code },
        solved: false,
        active: path,
        tabs: withTab(state.tabs, path),
        highlight: { path, lines, seq },
      };
    }
    case "edit": {
      if (state.solved || state.files[action.path] === action.code) return state;
      return {
        ...state,
        files: { ...state.files, [action.path]: action.code },
        highlight: state.highlight?.path === action.path ? null : state.highlight,
      };
    }
    case "open":
      return { ...state, active: action.path, tabs: withTab(state.tabs, action.path) };
    case "close": {
      const index = state.tabs.indexOf(action.path);
      const tabs = state.tabs.filter((t) => t !== action.path);
      if (state.active !== action.path) return { ...state, tabs };
      return { ...state, tabs, active: tabs[Math.max(0, index - 1)] ?? null };
    }
    case "reset": {
      const files = { ...state.base };
      return { ...state, files, ...focus(state, files), highlight: null };
    }
    case "solve": {
      if (!state.solution) return state;
      const solved = !state.solved;
      const next = { ...state, solved };
      const files = shownFiles(next);
      const view = focus(state, files);
      const lines =
        solved && view.active
          ? changedLines(state.files[view.active], files[view.active])
          : [];
      return {
        ...next,
        ...view,
        highlight: view.active && lines.length ? { path: view.active, lines, seq } : null,
      };
    }
  }
};

/**
 * 1-based line numbers of `next` that are not in `prev`. Common prefix and
 * suffix are trimmed first; the remaining middle gets an LCS only while it is
 * small enough, otherwise the whole middle counts as changed.
 */
export const changedLines = (prev: string | undefined, next: string): number[] => {
  if (prev === undefined || prev === next) return [];
  const a = prev.split("\n");
  const b = next.split("\n");

  let start = 0;
  while (start < a.length && start < b.length && a[start] === b[start]) start++;
  let endA = a.length;
  let endB = b.length;
  while (endA > start && endB > start && a[endA - 1] === b[endB - 1]) {
    endA--;
    endB--;
  }

  const midA = a.slice(start, endA);
  const midB = b.slice(start, endB);
  const range = (from: number, to: number) =>
    Array.from({ length: to - from }, (_, i) => from + i + 1);

  if (midA.length === 0) return range(start, endB);
  if (midA.length * midB.length > 250_000) return range(start, endB);

  const table = Array.from({ length: midA.length + 1 }, () =>
    new Uint16Array(midB.length + 1),
  );
  for (let i = midA.length - 1; i >= 0; i--) {
    for (let j = midB.length - 1; j >= 0; j--) {
      table[i][j] =
        midA[i] === midB[j]
          ? table[i + 1][j + 1] + 1
          : Math.max(table[i + 1][j], table[i][j + 1]);
    }
  }

  const changed: number[] = [];
  let i = 0;
  let j = 0;
  while (j < midB.length) {
    if (i < midA.length && midA[i] === midB[j]) {
      i++;
      j++;
    } else if (i < midA.length && table[i + 1][j] >= table[i][j + 1]) {
      i++;
    } else {
      changed.push(start + j + 1);
      j++;
    }
  }
  return changed;
};

/** "3-5, 9" -> [3, 4, 5, 9] */
export const parseLines = (lines?: string | number | number[]): number[] | undefined => {
  if (lines === undefined || lines === "") return undefined;
  if (typeof lines === "number") return [lines];
  if (Array.isArray(lines)) return lines;
  return lines.split(",").flatMap((part) => {
    const [from, to] = part.split("-").map((n) => Number.parseInt(n, 10));
    if (Number.isNaN(from)) return [];
    const last = Number.isNaN(to) || to === undefined ? from : to;
    return Array.from({ length: Math.max(0, last - from + 1) }, (_, k) => from + k);
  });
};

export type TreeNode = {
  name: string;
  path: string;
  children?: TreeNode[];
};

export const buildTree = (paths: string[]): TreeNode[] => {
  const root: TreeNode = { name: "", path: "", children: [] };
  for (const path of paths) {
    const parts = path.split("/");
    let node = root;
    parts.forEach((name, i) => {
      const isFile = i === parts.length - 1;
      const nodePath = parts.slice(0, i + 1).join("/");
      let child = node.children!.find((c) => c.name === name && !c.children === isFile);
      if (!child) {
        child = isFile ? { name, path: nodePath } : { name, path: nodePath, children: [] };
        node.children!.push(child);
      }
      node = child;
    });
  }
  const sort = (nodes: TreeNode[]): TreeNode[] =>
    nodes
      .sort((x, y) =>
        !!x.children === !!y.children
          ? x.name.localeCompare(y.name)
          : x.children
          ? -1
          : 1,
      )
      .map((n) => (n.children ? { ...n, children: sort(n.children) } : n));
  return sort(root.children!);
};

export const ancestors = (path: string) => {
  const parts = path.split("/");
  return parts.slice(0, -1).map((_, i) => parts.slice(0, i + 1).join("/"));
};
