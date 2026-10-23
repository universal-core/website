import React from "react";
import ErrorBoundary from "@docusaurus/ErrorBoundary";
import Mermaid from "@theme-original/Mermaid";

// Mermaid sizes labels from text measured at render time, so it waits for the web fonts.
const useFontsReady = () => {
  const [ready, setReady] = React.useState(false);
  React.useEffect(() => {
    let live = true;
    (document.fonts?.ready ?? Promise.resolve()).then(() => live && setReady(true));
    return () => {
      live = false;
    };
  }, []);
  return ready;
};

export default function MermaidWrapper(props: { value: string }): JSX.Element {
  const ready = useFontsReady();
  return (
    // A diagram that fails to parse would otherwise take the whole page down with it.
    <ErrorBoundary
      fallback={() => (
        <pre className="mermaid-error">
          <code>{props.value}</code>
        </pre>
      )}
    >
      {ready ? <Mermaid {...props} /> : <div className="docusaurus-mermaid-container" />}
    </ErrorBoundary>
  );
}
