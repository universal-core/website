import * as React from "react";
import clsx from "clsx";
import Highlight, { defaultProps } from "prism-react-renderer";
import type { Language, PrismTheme } from "prism-react-renderer";

/**
 * Read-only, syntax-highlighted code view for the static (inert) sandbox.
 * No bundler, no execution, no network — just `prism-react-renderer` with a
 * dark "Forge" theme. Used by both the tutorial two-pane editor and the docs
 * `<Sandpack>` static viewer.
 */

export const forgePrismTheme: PrismTheme = {
  plain: {
    color: "#cfc8bb",
    backgroundColor: "transparent",
  },
  styles: [
    {
      types: ["comment", "prolog", "doctype", "cdata"],
      style: { color: "#6b6b7a", fontStyle: "italic" },
    },
    {
      types: ["punctuation"],
      style: { color: "#9a9488" },
    },
    {
      types: ["operator", "entity", "url"],
      style: { color: "#9a9488" },
    },
    {
      types: ["keyword", "boolean", "tag", "selector", "atrule", "important"],
      style: { color: "#e3799b" },
    },
    {
      types: ["string", "char", "attr-value", "inserted", "regex"],
      style: { color: "#7fd1c0" },
    },
    {
      types: ["function", "function-variable", "class-name", "maybe-class-name"],
      style: { color: "#c9b4ff" },
    },
    {
      types: ["number", "constant", "symbol", "builtin"],
      style: { color: "#d6a8f0" },
    },
    {
      types: ["property", "attr-name", "variable"],
      style: { color: "#5fc4ec" },
    },
    {
      types: ["deleted"],
      style: { color: "#e3799b" },
    },
    {
      types: ["namespace"],
      style: { opacity: 0.7 },
    },
  ],
};

export const languageFromPath = (path?: string): Language => {
  const ext = (path ?? "").split(".").pop()?.toLowerCase();
  switch (ext) {
    case "ts":
      return "typescript" as Language;
    case "tsx":
      return "tsx" as Language;
    case "js":
    case "mjs":
    case "cjs":
      return "javascript" as Language;
    case "jsx":
      return "jsx" as Language;
    case "json":
      return "json" as Language;
    case "css":
      return "css" as Language;
    case "scss":
    case "sass":
      return "scss" as Language;
    case "html":
    case "htm":
      return "markup" as Language;
    case "md":
    case "mdx":
      return "markdown" as Language;
    case "yml":
    case "yaml":
      return "yaml" as Language;
    case "bash":
    case "sh":
      return "bash" as Language;
    default:
      return "tsx" as Language;
  }
};

export interface HighlightedCodeProps {
  code: string;
  path?: string;
  showLineNumbers?: boolean;
  className?: string;
}

export const HighlightedCode = ({
  code,
  path,
  showLineNumbers = true,
  className,
}: HighlightedCodeProps): JSX.Element => {
  const language = languageFromPath(path);
  const value = (code ?? "").replace(/\n+$/, "");

  return (
    <Highlight
      {...defaultProps}
      theme={forgePrismTheme}
      code={value}
      language={language}
    >
      {({ className: preClassName, tokens, getLineProps, getTokenProps }) => (
        <pre
          className={clsx(
            preClassName,
            "!m-0",
            "!bg-transparent",
            "p-4",
            "overflow-auto",
            "font-jetBrains-mono",
            "text-xs sm:text-sm",
            "leading-relaxed",
            className,
          )}
          style={{ background: "transparent" }}
        >
          {tokens.map((line, i) => (
            <div key={i} {...getLineProps({ line })} className="flex">
              {showLineNumbers ? (
                <span
                  aria-hidden
                  className={clsx(
                    "inline-block",
                    "w-8",
                    "shrink-0",
                    "pr-4",
                    "text-right",
                    "select-none",
                    "text-[#5a554c]",
                  )}
                >
                  {i + 1}
                </span>
              ) : null}
              <span className="flex-1 whitespace-pre">
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token })} />
                ))}
              </span>
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  );
};
