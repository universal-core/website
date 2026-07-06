import * as React from "react";

/**
 * Static, inert replacement for `@codesandbox/sandpack-react`'s runtime.
 *
 * A Metin2 client/server platform has nothing to execute in a browser, so the
 * live sandbox (bundler + preview iframe + code execution) is gone. What
 * remains is a purely static two-pane experience: a file tree + a read-only
 * syntax-highlighted editor. This module reproduces just enough of Sandpack's
 * `useSandpack()` surface for the reused file-explorer and the tutorial content
 * (which mutates files via `updateFile`/`addFile`/`setActiveFile`/etc.).
 *
 * No `window`/`document` access at module scope; SSR-safe. `useSandpack()`
 * called outside a provider returns an inert default instead of throwing.
 */

export type NormalizedFile = { code: string; hidden?: boolean };
export type NormalizedFiles = Record<string, NormalizedFile>;

type RawFileValue = string | { code?: string; hidden?: boolean; active?: boolean };
type RawFiles = Record<string, RawFileValue>;

export interface StaticSandpack {
  files: NormalizedFiles;
  activeFile: string;
  visibleFilesFromProps: string[];
  status: "idle";
  setActiveFile: (path: string) => void;
  openFile: (path: string) => void;
  updateFile: (
    pathOrFiles: string | RawFiles,
    code?: string,
    _shouldUpdatePreview?: boolean,
  ) => void;
  addFile: (
    pathOrFiles: string | RawFiles,
    code?: string,
    _shouldUpdatePreview?: boolean,
  ) => void;
  deleteFile: (path: string, _shouldUpdatePreview?: boolean) => void;
  resetAllFiles: () => void;
}

export interface SandpackContextValue {
  sandpack: StaticSandpack;
  listen: (callback?: unknown) => () => void;
}

const normalizePath = (path: string): string =>
  path.startsWith("/") ? path : `/${path}`;

const normalizeFiles = (raw: RawFiles | undefined): NormalizedFiles => {
  const out: NormalizedFiles = {};
  Object.keys(raw ?? {}).forEach((key) => {
    const value = (raw as RawFiles)[key];
    const path = normalizePath(key);
    if (typeof value === "string") {
      out[path] = { code: value, hidden: false };
    } else if (value && typeof value === "object") {
      out[path] = { code: value.code ?? "", hidden: !!value.hidden };
    }
  });
  return out;
};

const cloneFiles = (files: NormalizedFiles): NormalizedFiles =>
  Object.keys(files).reduce<NormalizedFiles>((acc, key) => {
    acc[key] = { ...files[key] };
    return acc;
  }, {});

const deriveActiveFile = (
  raw: RawFiles | undefined,
  normalized: NormalizedFiles,
): string => {
  // 1. First file explicitly marked `active: true`.
  const rawKeys = Object.keys(raw ?? {});
  for (const key of rawKeys) {
    const value = (raw as RawFiles)[key];
    if (value && typeof value === "object" && value.active) {
      return normalizePath(key);
    }
  }
  // 2. First non-hidden file.
  const firstVisible = Object.keys(normalized).find(
    (path) => !normalized[path].hidden,
  );
  if (firstVisible) return firstVisible;
  // 3. Anything.
  return Object.keys(normalized)[0] ?? "";
};

const inertSandpack: StaticSandpack = {
  files: {},
  activeFile: "",
  visibleFilesFromProps: [],
  status: "idle",
  setActiveFile: () => undefined,
  openFile: () => undefined,
  updateFile: () => undefined,
  addFile: () => undefined,
  deleteFile: () => undefined,
  resetAllFiles: () => undefined,
};

const inertValue: SandpackContextValue = {
  sandpack: inertSandpack,
  listen: () => () => undefined,
};

const SandpackContext = React.createContext<SandpackContextValue | null>(null);

export interface TutorialSandpackProviderProps {
  files?: RawFiles;
  activeFile?: string;
  visibleFiles?: string[];
  children?: React.ReactNode;
}

export const TutorialSandpackProvider = ({
  files: rawFiles,
  activeFile: activeFileProp,
  visibleFiles: visibleFilesProp,
  children,
}: TutorialSandpackProviderProps): JSX.Element => {
  const [initialFiles] = React.useState<NormalizedFiles>(() =>
    normalizeFiles(rawFiles),
  );
  const [files, setFiles] = React.useState<NormalizedFiles>(() =>
    cloneFiles(initialFiles),
  );
  const [activeFile, setActiveFileState] = React.useState<string>(() =>
    activeFileProp
      ? normalizePath(activeFileProp)
      : deriveActiveFile(rawFiles, initialFiles),
  );

  const visibleFilesFromProps = React.useMemo<string[]>(() => {
    if (visibleFilesProp && visibleFilesProp.length > 0) {
      return visibleFilesProp.map(normalizePath);
    }
    return Object.keys(initialFiles).filter((path) => !initialFiles[path].hidden);
  }, [initialFiles, visibleFilesProp]);

  const setActiveFile = React.useCallback((path: string) => {
    setActiveFileState(normalizePath(path));
  }, []);

  const updateFile = React.useCallback(
    (pathOrFiles: string | RawFiles, code?: string) => {
      setFiles((prev) => {
        const next = { ...prev };
        if (typeof pathOrFiles === "string") {
          const path = normalizePath(pathOrFiles);
          next[path] = { code: code ?? "", hidden: prev[path]?.hidden };
        } else if (pathOrFiles && typeof pathOrFiles === "object") {
          const incoming = normalizeFiles(pathOrFiles);
          Object.keys(incoming).forEach((path) => {
            next[path] = {
              code: incoming[path].code,
              hidden: incoming[path].hidden ?? prev[path]?.hidden,
            };
          });
        }
        return next;
      });
    },
    [],
  );

  const deleteFile = React.useCallback((path: string) => {
    const normalized = normalizePath(path);
    setFiles((prev) => {
      const next = { ...prev };
      delete next[normalized];
      return next;
    });
  }, []);

  const resetAllFiles = React.useCallback(() => {
    setFiles(cloneFiles(initialFiles));
  }, [initialFiles]);

  const sandpack = React.useMemo<StaticSandpack>(
    () => ({
      files,
      activeFile,
      visibleFilesFromProps,
      status: "idle",
      setActiveFile,
      openFile: setActiveFile,
      updateFile,
      addFile: updateFile,
      deleteFile,
      resetAllFiles,
    }),
    [
      files,
      activeFile,
      visibleFilesFromProps,
      setActiveFile,
      updateFile,
      deleteFile,
      resetAllFiles,
    ],
  );

  const value = React.useMemo<SandpackContextValue>(
    () => ({ sandpack, listen: () => () => undefined }),
    [sandpack],
  );

  return (
    <SandpackContext.Provider value={value}>
      {children}
    </SandpackContext.Provider>
  );
};

export const useSandpack = (): SandpackContextValue => {
  const ctx = React.useContext(SandpackContext);
  return ctx ?? inertValue;
};
