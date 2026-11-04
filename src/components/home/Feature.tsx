import Link from "@docusaurus/Link";
import CodeBlock from "@theme/CodeBlock";
import clsx from "clsx";
import React, { useState } from "react";

import { FORGE, PROTO, PY } from "./code";

const STEPS = [
  {
    name: "Agree on the bytes",
    file: "protobuf/ue/login_counter.proto",
    lang: "protobuf",
    code: PROTO,
    text: "Server and client must agree on the bytes of a message. The .proto is that agreement: field names, types and field numbers. It compiles to Lua and to Python, never to C++.",
  },
  {
    name: "Send from the forge",
    file: "login_counter.forge",
    lang: "forge",
    code: FORGE,
    text: "The module keeps its counters in the process. On login, a method of the forge fills the message and sends it with a namespace and a header. The quest hooks sit in the same file.",
  },
  {
    name: "Receive in a window",
    file: "root/uilogincounter.py",
    lang: "python",
    code: PY,
    text: "A Python window registers a handler for the forge name and the header in its constructor and unregisters it on destroy. The launcher only routes the bytes.",
  },
];

export function Feature() {
  const [i, setI] = useState(0);
  const s = STEPS[i];
  return (
    <div className="a2-feature">
      <div
        className="a2-feature__rail"
        role="tablist"
        aria-label="Files of the feature"
      >
        {STEPS.map((st, k) => (
          <button
            key={st.file}
            type="button"
            role="tab"
            id={`a2-ft-${k}`}
            aria-controls="a2-fp"
            aria-selected={k === i}
            tabIndex={k === i ? 0 : -1}
            className={clsx("a2-ftab", k === i && "is-on")}
            onClick={() => setI(k)}
            onKeyDown={(e) => {
              if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
                const n =
                  (k + (e.key === "ArrowRight" ? 1 : STEPS.length - 1)) %
                  STEPS.length;
                setI(n);
                document.getElementById(`a2-ft-${n}`)?.focus();
              }
            }}
          >
            <span className="a2-ftab__n">{k + 1}</span>
            <span className="a2-ftab__name">{st.name}</span>
            <span className="a2-ftab__file">{st.file.split("/").pop()}</span>
          </button>
        ))}
      </div>
      <div
        className="a2-feature__body"
        role="tabpanel"
        id="a2-fp"
        aria-labelledby={`a2-ft-${i}`}
      >
        <div className="a2-feature__text">
          <p>{s.text}</p>
          {i < STEPS.length - 1 ? (
            <button
              type="button"
              className="a2-next"
              onClick={() => setI(i + 1)}
            >
              Next: {STEPS[i + 1].name.toLowerCase()}
            </button>
          ) : (
            <Link to="/tutorials/server-to-client-message" className="a2-next">
              Build it in the tutorial
            </Link>
          )}
        </div>
        <div className="a2-feature__code">
          <p className="a2-file">{s.file}</p>
          <CodeBlock language={s.lang}>{s.code}</CodeBlock>
        </div>
      </div>
    </div>
  );
}
