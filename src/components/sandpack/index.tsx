import clsx from "clsx";
import React from "react";

import { HighlightedCode } from "@site/src/sandpack-static/static-code-editor";

/**
 * Static replacement for the old live `<Sandpack>` playground used across the
 * docs. The CodeSandbox bundler + preview iframe are gone (a Metin2 platform
 * has nothing to execute in a browser); this renders a read-only, tabbed,
 * syntax-highlighted view of the provided files. The full prop surface is kept
 * so the ~130 existing `<Sandpack ... />` call sites keep compiling — display
 * flags that only made sense with a live preview are accepted and ignored.
 */

type RawFileValue = string | { code?: string; hidden?: boolean; active?: boolean };

type Props = {
  files?: Record<string, RawFileValue>;
  dependencies?: Record<string, string>;
  template?: string;
  height?: number | string;
  previewOnly?: boolean;
  showFiles?: boolean;
  showConsole?: boolean;
  hidePreview?: boolean;
  showNavigator?: boolean;
  showLineNumbers?: boolean;
  showReadOnly?: boolean;
  showOpenInCodeSandbox?: boolean;
  layout?: "row" | "col" | "col-reverse";
  className?: string;
  wrapperClassName?: string;
  startRoute?: string;
  initialPercentage?: number;
  customSetup?: unknown;
  options?: Record<string, any>;
  [key: string]: any;
};

type NormalizedFile = { code: string; hidden: boolean; active: boolean };

const normalizePath = (path: string): string =>
  path.startsWith("/") ? path : `/${path}`;

export const Sandpack = ({
  files = {},
  height = 420,
  showLineNumbers = true,
  wrapperClassName,
  className,
}: Props): JSX.Element | null => {
  const normalized = React.useMemo<Record<string, NormalizedFile>>(() => {
    const out: Record<string, NormalizedFile> = {};
    Object.keys(files ?? {}).forEach((key) => {
      const value = files[key];
      const path = normalizePath(key);
      if (typeof value === "string") {
        out[path] = { code: value, hidden: false, active: false };
      } else if (value && typeof value === "object") {
        out[path] = {
          code: value.code ?? "",
          hidden: !!value.hidden,
          active: !!value.active,
        };
      }
    });
    return out;
  }, [files]);

  const visibleFiles = React.useMemo<string[]>(() => {
    const nonHidden = Object.keys(normalized).filter(
      (path) => !normalized[path].hidden,
    );
    // Some docs mark every file hidden and relied on the (now-removed) preview.
    // Fall back to showing everything so there is always something to read.
    return nonHidden.length > 0 ? nonHidden : Object.keys(normalized);
  }, [normalized]);

  const initialActive = React.useMemo<string>(() => {
    const active = Object.keys(normalized).find(
      (path) => normalized[path].active && !normalized[path].hidden,
    );
    return active ?? visibleFiles[0] ?? Object.keys(normalized)[0] ?? "";
  }, [normalized, visibleFiles]);

  const [activeFile, setActiveFile] = React.useState(initialActive);

  React.useEffect(() => {
    setActiveFile(initialActive);
  }, [initialActive]);

  if (Object.keys(normalized).length === 0) {
    return null;
  }

  const activeCode = normalized[activeFile]?.code ?? "";
  const numericHeight =
    typeof height === "number" ? height : parseInt(String(height), 10) || 420;
  const clampedHeight = Math.min(Math.max(numericHeight, 160), 640);

  return (
    <div className={clsx("not-prose", "mb-6", "refine-wider-container", wrapperClassName)}>
      <div
        className={clsx(
          "rounded-[4px]",
          "overflow-hidden",
          "border border-solid",
          "border-gray-300 dark:border-[rgba(255,255,255,0.09)]",
          "bg-gray-0 dark:bg-[#0a0908]",
          className,
        )}
      >
        <div
          className={clsx(
            "flex items-stretch",
            "overflow-x-auto",
            "scrollbar-hidden",
            "border-b border-solid",
            "border-gray-300 dark:border-[rgba(255,255,255,0.09)]",
            "bg-gray-100 dark:bg-[#121110]",
          )}
        >
          {visibleFiles.map((path) => {
            const name = path.split("/").filter(Boolean).pop();
            const isActive = path === activeFile;
            return (
              <button
                key={path}
                type="button"
                title={name}
                onClick={() => setActiveFile(path)}
                className={clsx(
                  "appearance-none",
                  "cursor-pointer",
                  "whitespace-nowrap",
                  "px-3 py-2",
                  "text-xs",
                  "font-jetBrains-mono",
                  "bg-transparent",
                  "border-0 border-b-2 border-solid",
                  "transition-colors duration-150 ease-in-out",
                  isActive
                    ? "text-gray-800 dark:text-[#ece8df] border-refine-purple"
                    : "text-gray-500 dark:text-[#9a9488] border-transparent hover:text-gray-800 dark:hover:text-[#ece8df]",
                )}
              >
                {name}
              </button>
            );
          })}
        </div>
        <div className="overflow-auto" style={{ height: clampedHeight }}>
          <HighlightedCode
            code={activeCode}
            path={activeFile}
            showLineNumbers={showLineNumbers}
          />
        </div>
      </div>
    </div>
  );
};
