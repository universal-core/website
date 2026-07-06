import React from "react";
import clsx from "clsx";

import { TutorialDocumentLayout } from "./tutorial-document-layout";
import { TutorialFileExplorer } from "./tutorial-file-explorer";
import { useTutorialLayout } from "../context/tutorial-layout-context";

import {
  TutorialSandpackProvider,
  useSandpack,
} from "../sandpack-static/context";
import { HighlightedCode } from "../sandpack-static/static-code-editor";

/**
 * Static two-pane tutorial view.
 *
 * The live CodeSandbox bundler/preview has been removed — a Metin2
 * client/server platform has nothing to execute in a browser. What remains is a
 * narrative pane (the MDX children) beside a right pane holding a read-only file
 * tree + syntax-highlighted editor, plus the optional "Solve" toggle. State is
 * sourced from the static `TutorialSandpackProvider`; the content files keep
 * mutating it through the same `useSandpack()` API as before.
 */

type SandpackProps = {
  startRoute?: string;
  showOpenInCodeSandbox?: boolean;
  showNavigator?: boolean;
  showLineNumbers?: boolean;
  initialPercentage?: number;
  dependencies?: Record<string, string>;
  height?: number;
  previewOnly?: boolean;
  layout?: "row" | "col" | "col-reverse";
  className?: string;
  wrapperClassName?: string;
  showFiles?: boolean;
  showReadOnly?: boolean;
  showConsole?: boolean;
  hidePreview?: boolean;
  parentResizing?: boolean;
  template?: string;
  customSetup?: unknown;
  files?: Record<string, any>;
  options?: {
    activeFile?: string;
    visibleFiles?: string[];
    showLineNumbers?: boolean;
    [key: string]: any;
  };
  [key: string]: any;
};

type Props = React.PropsWithChildren<
  SandpackProps & {
    contentOnly?: boolean;
    contentPercentage?: number;
    finalFiles?: Record<string, any>;
  }
>;

const maxPercentage = 70;

export const TutorialSandpack = ({
  children,
  contentOnly,
  finalFiles,
  files,
  options,
  showFiles = true,
  ...sandpackProps
}: Props) => {
  const { contentPercentage, setContentPercentage } = useTutorialLayout();
  const [resizing, setResizing] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);

  const [mobileVisiblePanel, setMobileVisiblePanel] = React.useState<
    "editor" | "tutorial"
  >("tutorial");

  React.useEffect(() => {
    const handleMouseUp = () => setResizing(false);
    window.addEventListener("mouseup", handleMouseUp);
    return () => window.removeEventListener("mouseup", handleMouseUp);
  }, []);

  React.useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!resizing) return;
      const containerRect = containerRef.current?.getBoundingClientRect();
      if (!containerRect) return;

      const newContentPercentage = Math.min(
        maxPercentage,
        Math.max(
          100 - maxPercentage,
          ((e.clientX - containerRect.left) / containerRect.width) * 100,
        ),
      );
      setContentPercentage(newContentPercentage);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [resizing, setContentPercentage]);

  React.useEffect(() => {
    const currentCursor = document.body.style.cursor;
    document.body.style.cursor = resizing ? "col-resize" : "auto";
    return () => {
      document.body.style.cursor = currentCursor;
    };
  }, [resizing]);

  return (
    <TutorialSandpackProvider
      files={files}
      activeFile={options?.activeFile}
      visibleFiles={options?.visibleFiles}
    >
      <div
        className={clsx(
          "h-[calc(100dvh-112px-57px)]",
          "tutorial-sm:h-[calc(100dvh-64px-57px)]",
          "flex-1",
          "flex",
          "!w-full",
          "items-stretch",
          "justify-start",
          "bg-gray-100 dark:bg-refine-tutorial-dark-bg",
        )}
        ref={containerRef}
      >
        <div
          className={clsx(
            "overflow-hidden",
            "border-r",
            "border-r-gray-300 dark:border-r-gray-700",
            "bg-gray-0 dark:bg-gray-800",
            mobileVisiblePanel === "editor" && "max-w-0 tutorial-md:max-w-none",
            mobileVisiblePanel === "tutorial" &&
              "min-w-full tutorial-md:min-w-0",
          )}
          style={{
            width: contentOnly
              ? "100%"
              : `calc(${contentPercentage}% - (0.625rem / 2))`,
          }}
        >
          <div
            className={clsx(
              "w-full",
              "max-h-full",
              "h-full",
              "overflow-scroll",
              "px-6 tutorial-sm:px-8",
              "pb-6",
            )}
          >
            <TutorialDocumentLayout>
              <div>{children}</div>
            </TutorialDocumentLayout>
          </div>
        </div>
        <button
          type="button"
          className={clsx(
            contentOnly ? "hidden" : "hidden tutorial-md:flex",
            "w-2",
            "appearance-none",
            "outline-none",
            "bg-gray-100 dark:bg-refine-tutorial-dark-bg",
            "border-0",
            "cursor-col-resize",
            "items-center justify-center",
          )}
          onMouseDown={(event) => {
            setResizing(true);
            event.preventDefault();
          }}
        >
          <ResizeHandleIcon
            className={clsx("w-1", "text-gray-400", "dark:text-gray-700")}
          />
        </button>
        <div
          className={clsx(
            contentOnly ? "hidden" : "",
            "overflow-hidden",
            mobileVisiblePanel === "tutorial" &&
              "max-w-0 tutorial-md:max-w-none",
            mobileVisiblePanel === "editor" && "min-w-full tutorial-md:min-w-0",
          )}
          style={{
            width: `calc(${100 - contentPercentage}% - (0.625rem / 2))`,
          }}
        >
          <SandpackRightSide showFiles={showFiles} finalFiles={finalFiles} />
        </div>
      </div>
      <div
        className={clsx(
          "flex tutorial-md:hidden",
          "p-2",
          "w-full",
          "border-t",
          "border-t-gray-300 dark:border-t-gray-700",
          "justify-center",
        )}
      >
        <div
          className={clsx(
            "rounded-[40px]",
            "p-1",
            "gap-1",
            "flex",
            "items-center",
            "justify-center",
            "bg-gray-100 dark:bg-gray-700",
            "text-sm",
          )}
        >
          <button
            type="button"
            onClick={() => setMobileVisiblePanel("tutorial")}
            className={clsx(
              "appearance-none",
              "outline-none",
              "border-none",
              "w-[166px]",
              "p-1.5",
              "rounded-[32px]",
              "text-center",
              mobileVisiblePanel !== "tutorial" &&
                "text-gray-500 dark:text-gray-400",
              mobileVisiblePanel === "tutorial" && [
                "text-gray-800 dark:text-gray-100",
                "bg-gray-0 dark:bg-gray-600",
                "shadow-[0px_1px_0px_0px_#E3E4E5] dark:shadow-[0px_-1px_0px_0px_#667084]",
              ],
              "transition-colors",
              "ease-in-out",
              "duration-200",
            )}
          >
            Tutorial
          </button>
          <button
            type="button"
            onClick={() => setMobileVisiblePanel("editor")}
            className={clsx(
              contentOnly ? "hidden" : "",
              "appearance-none",
              "outline-none",
              "border-none",
              "w-[166px]",
              "p-1.5",
              "rounded-[32px]",
              "text-center",
              mobileVisiblePanel !== "editor" &&
                "text-gray-500 dark:text-gray-400",
              mobileVisiblePanel === "editor" && [
                "text-gray-800 dark:text-gray-100",
                "bg-gray-0 dark:bg-gray-600",
                "shadow-[0px_1px_0px_0px_#E3E4E5] dark:shadow-[0px_-1px_0px_0px_#667084]",
              ],
              "transition-colors",
              "ease-in-out",
              "duration-200",
            )}
          >
            Editor
          </button>
        </div>
      </div>
    </TutorialSandpackProvider>
  );
};

const SandpackRightSide = ({
  showFiles = true,
  finalFiles,
}: {
  showFiles?: boolean;
  finalFiles?: Record<string, any>;
}) => {
  return (
    <div className={clsx("w-full", "h-full", "flex", "flex-col")}>
      <div
        className={clsx(
          "not-prose",
          "w-full",
          "animate-reveal",
          "!h-full",
          "!overflow-hidden",
        )}
      >
        <div
          className={clsx(
            "flex",
            "flex-col",
            "h-full",
            "!py-2",
            "!pr-2",
            "bg-gray-100 dark:bg-refine-tutorial-dark-bg",
          )}
        >
          <div
            className={clsx(
              "bg-gray-0 dark:bg-[#0a0908]",
              "overflow-hidden",
              "rounded-[4px]",
              "border border-gray-300 dark:border-[rgba(255,255,255,0.09)]",
              "flex",
              "relative",
              "h-full",
            )}
          >
            {showFiles ? (
              <TutorialFileExplorer
                autoHiddenFiles={true}
                hasSolve={!!finalFiles}
              />
            ) : null}
            {finalFiles ? <SolveButton finalFiles={finalFiles} /> : null}
            <StaticEditor />
          </div>
        </div>
      </div>
    </div>
  );
};

const StaticEditor = () => {
  const { sandpack } = useSandpack();
  const { files, activeFile } = sandpack;
  const file = activeFile ? files[activeFile] : undefined;

  return (
    <div
      className={clsx(
        "w-full",
        "h-full",
        "overflow-auto",
        "bg-gray-0 dark:bg-[#0a0908]",
      )}
    >
      {file ? (
        <HighlightedCode code={file.code} path={activeFile} showLineNumbers />
      ) : (
        <div
          className={clsx(
            "p-4",
            "text-sm",
            "font-jetBrains-mono",
            "text-gray-500 dark:text-[#9a9488]",
          )}
        >
          Select a file to view its contents.
        </div>
      )}
    </div>
  );
};

export const SolveButton = ({
  finalFiles,
}: {
  finalFiles: Record<string, any>;
}) => {
  const { sandpack } = useSandpack();
  const [solved, setSolved] = React.useState(false);

  const onClick = () => {
    if (solved) {
      sandpack?.resetAllFiles();
    } else {
      sandpack?.updateFile(finalFiles);
    }
    setSolved((p) => !p);
  };

  return (
    <div
      className={clsx(
        "absolute",
        "left-0",
        "bottom-0",
        "w-40",
        "px-4",
        "pb-4",
        "flex",
        "items-center",
        "justify-center",
      )}
    >
      <button
        type="button"
        onClick={onClick}
        className={clsx(
          "appearance-none",
          "focus:outline-none",
          "border-none",
          "relative",
          "p-2",
          "flex",
          "justify-center",
          "items-center",
          "text-[13px] font-semibold",
          "border border-solid",
          solved && [
            "text-gray-100",
            "bg-gray-800 dark:bg-gray-800",
            "border-gray-700",
            "hover:bg-gray-700",
          ],
          !solved && [
            "text-[#1c1408]",
            "bg-refine-purple dark:bg-refine-purple",
            "border-refine-purple",
            "hover:brightness-110",
          ],
          "active:brightness-90",
          "rounded-[4px]",
          "group/solve-button",
          "w-full",
          "transition-[filter,color,background-color] duration-200 ease-in-out",
        )}
      >
        <ResetIcon
          className={clsx(
            solved ? "scale-100" : "scale-0",
            "absolute",
            "top-1/2",
            "left-2",
            "-translate-y-1/2",
            "transition-transform duration-200 ease-in-out",
          )}
        />
        <span className={clsx("transition-colors duration-200 ease-in-out")}>
          {solved ? "Reset" : "Solve"}
        </span>
        <ChevronRightIcon
          className={clsx(
            solved ? "scale-0" : "scale-100",
            "absolute",
            "top-1/2",
            "right-2",
            "-translate-y-1/2",
            "transition-transform duration-200 ease-in-out",
          )}
        />
      </button>
    </div>
  );
};

const ResizeHandleIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={4}
    height={21}
    viewBox="0 0 4 21"
    fill="none"
    {...props}
  >
    <g fill="currentColor" strokeWidth={0}>
      <path d="M4 2a2 2 0 1 1-4 0 2 2 0 0 1 4 0ZM4 10a2 2 0 1 1-4 0 2 2 0 0 1 4 0ZM2 20a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
    </g>
  </svg>
);

const ChevronRightIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    viewBox="0 0 16 16"
    fill="none"
    {...props}
  >
    <path
      fill="currentColor"
      d="M6.646 5.854a.5.5 0 1 1 .708-.708l2.5 2.5a.5.5 0 0 1 0 .708l-2.5 2.5a.5.5 0 0 1-.708-.708L8.793 8 6.646 5.854Z"
    />
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16Zm0-1A7 7 0 1 0 8 1a7 7 0 0 0 0 14Z"
      clipRule="evenodd"
    />
  </svg>
);

const ResetIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    viewBox="0 0 16 16"
    fill="none"
    {...props}
  >
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M1.993 4.403A6.996 6.996 0 0 1 8 1a6.995 6.995 0 0 1 5.923 3.267.5.5 0 0 0 .845-.534A7.995 7.995 0 0 0 8 0a7.999 7.999 0 0 0-8 8 .5.5 0 0 0 .724.447l3-1.5a.5.5 0 0 0 .118-.812L1.993 4.403Zm13.77 3.172A.5.5 0 0 1 16 8a8 8 0 0 1-8 8 7.995 7.995 0 0 1-6.768-3.733.5.5 0 1 1 .845-.534A6.995 6.995 0 0 0 8 15a6.996 6.996 0 0 0 6.007-3.403l-1.849-1.732a.5.5 0 0 1 .118-.812l3-1.5a.5.5 0 0 1 .487.022Z"
      clipRule="evenodd"
    />
  </svg>
);
