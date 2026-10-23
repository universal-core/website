import React from "react";
import type { TutorialEditor } from "./codemirror";

type Props = {
  path: string;
  value: string;
  readOnly: boolean;
  highlight: { lines: number[]; seq: number } | null;
  onChange: (path: string, code: string) => void;
};

/**
 * CodeMirror is imported on mount so it never runs during SSR and only ships
 * with pages that use a tutorial; until then the file renders as plain text.
 */
export const Editor = ({ path, value, readOnly, highlight, onChange }: Props) => {
  const host = React.useRef<HTMLDivElement>(null);
  const [editor, setEditor] = React.useState<TutorialEditor | null>(null);

  const latest = React.useRef({ path, value, onChange });
  latest.current = { path, value, onChange };

  React.useEffect(() => {
    let live = true;
    let created: TutorialEditor | null = null;
    import("./codemirror").then(({ createEditor }) => {
      if (!live || !host.current) return;
      created = createEditor(host.current, (code) =>
        latest.current.onChange(latest.current.path, code),
      );
      setEditor(created);
    });
    return () => {
      live = false;
      created?.destroy();
    };
  }, []);

  React.useEffect(() => {
    editor?.load(path, latest.current.value, readOnly);
  }, [editor, path, readOnly]);

  React.useEffect(() => {
    editor?.sync(value);
  }, [editor, value]);

  React.useEffect(() => {
    editor?.highlight(highlight?.lines ?? []);
  }, [editor, path, readOnly, highlight]);

  return (
    <div className="uc-tutorial__editor">
      {editor ? null : <pre className="uc-tutorial__fallback">{value}</pre>}
      <div ref={host} className="uc-tutorial__cm" />
    </div>
  );
};
