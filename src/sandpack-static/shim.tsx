import * as React from "react";
import clsx from "clsx";

/**
 * Drop-in shim for `@codesandbox/sandpack-react`.
 *
 * `docusaurus.config.js` aliases the `@codesandbox/sandpack-react` module to
 * this file, so every runtime import of a Sandpack value resolves here. The
 * live bundler is intentionally gone (a Metin2 platform has nothing to run in a
 * browser); only the state hook + a couple of tiny presentational helpers that
 * the reused file-explorer and old bug-report button referenced survive.
 *
 * Type-only imports (`import type { ... } from "@codesandbox/sandpack-react"`)
 * are erased by swc before they hit the bundler, but the permissive `type`
 * re-exports below keep any residual usage harmless.
 */

export { useSandpack, TutorialSandpackProvider } from "./context";
export type {
  StaticSandpack,
  SandpackContextValue,
  NormalizedFile,
  NormalizedFiles,
} from "./context";

// Sandpack's `useClassNames()` returned `sp-<name>` helper classes tied to its
// own stylesheet, which we no longer ship. Keep the call shape but only emit the
// caller-provided extra classes.
export const useClassNames =
  () =>
  (_name: string, extra: clsx.ClassValue[] = []): string =>
    clsx(...extra);

export const stackClassName = "";

type RoundedButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export const RoundedButton = ({
  children,
  className,
  type,
  ...props
}: RoundedButtonProps): JSX.Element => (
  <button
    type={type ?? "button"}
    className={clsx(
      "appearance-none",
      "border border-solid border-[rgba(255,255,255,0.09)]",
      "bg-[#121110]",
      "text-[#ece8df]",
      "rounded-[4px]",
      "p-1.5",
      "flex items-center justify-center",
      "hover:bg-[#1b1a18]",
      "transition-colors duration-150 ease-in-out",
      className,
    )}
    {...props}
  >
    {children}
  </button>
);

// Permissive type stubs so any `import type { ... }` from the old package name
// keeps compiling. All erased at build time.
export type SandpackFiles = any;
export type SandpackFile = any;
export type SandpackOptions = any;
export type SandpackInternal = any;
export type SandpackInternalOptions<A = any, B = any> = any;
export type SandpackPredefinedTemplate = any;
export type TemplateFiles<T = any> = any;
export type CodeEditorProps = any;
export type SandpackProviderProps = any;
export type SandpackSetup = any;
