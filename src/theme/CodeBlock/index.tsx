import React from "react";
import { CodeBlock } from "./base";

/* Live/shared React sandboxes (Sandpack) are removed — a live in-browser
   web preview has no meaning for a Metin2 client/server platform. Any
   `live`/`shared` fenced block renders as a plain (Forge-styled) code block. */
export default function CodeBlockWrapper(
  props: JSX.IntrinsicAttributes & {
    live?: boolean;
    shared?: boolean;
    className?: string;
  },
): JSX.Element {
  const { live, shared, ...rest } = props;
  return <CodeBlock {...(rest as any)} />;
}
