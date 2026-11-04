import clsx from "clsx";
import React, { useState } from "react";

type Mode = "mainline" | "uc";
type Mark = {
  t: string;
  d?: string;
  kind: "cost" | "file" | "mech";
  code?: boolean;
};
type Lane = {
  name: string;
  mainline: { lang: string; rebuild?: string; marks: Mark[] };
  uc: { lang: string; marks: Mark[] };
};

const c = (t: string): Mark => ({ t, kind: "cost" });

const LANES: Lane[] = [
  {
    name: "Shared definition",
    mainline: {
      lang: "C++",
      rebuild: "both binaries",
      marks: [c("Packet header and structs")],
    },
    uc: {
      lang: "protobuf",
      marks: [
        {
          t: "login_counter.proto",
          d: "Compiled to Lua and Python, never to C++.",
          kind: "file",
          code: true,
        },
      ],
    },
  },
  {
    name: "Game server",
    mainline: {
      lang: "C++",
      rebuild: "server",
      marks: [c("Encode the packet")],
    },
    uc: {
      lang: "Lua",
      marks: [
        {
          t: "login_counter.forge",
          d: "Fills the message and sends it.",
          kind: "file",
          code: true,
        },
      ],
    },
  },
  {
    name: "Client launcher",
    mainline: {
      lang: "C++",
      rebuild: "launcher",
      marks: [
        c("Packet size table"),
        c("Dispatch switch"),
        c("Receive function"),
        c("Its declaration"),
        c("Constants exported to Python"),
      ],
    },
    uc: {
      lang: "C++, unchanged",
      marks: [
        {
          t: "Generic Luna receive",
          d: "Reads a namespace, a header and a size, and hands the rest through.",
          kind: "mech",
        },
      ],
    },
  },
  {
    name: "Client Python",
    mainline: {
      lang: "Python",
      marks: [
        c("Game window"),
        c("Interface forwarder"),
        c("The feature's own window"),
      ],
    },
    uc: {
      lang: "Python",
      marks: [
        {
          t: "uilogincounter.py",
          d: "Registers for the namespace and the header.",
          kind: "file",
          code: true,
        },
      ],
    },
  },
];

export function CostLedger() {
  const [mode, setMode] = useState<Mode>("mainline");
  return (
    <figure className={clsx("a2-ledger", `is-${mode}`)}>
      <div className="a2-switch" role="group" aria-label="Show the cost in">
        <button
          type="button"
          aria-pressed={mode === "mainline"}
          onClick={() => setMode("mainline")}
        >
          Metin2 mainline engine
        </button>
        <button
          type="button"
          aria-pressed={mode === "uc"}
          onClick={() => setMode("uc")}
        >
          Universal Core
        </button>
      </div>

      <ol className="a2-lanes" aria-live="polite">
        {LANES.map((l) => {
          const side = mode === "mainline" ? l.mainline : l.uc;
          return (
            <li key={l.name} className="a2-lane">
              <div className="a2-lane__head">
                <span className="a2-lane__name">{l.name}</span>
                <span className="a2-lane__lang">{side.lang}</span>
                {mode === "mainline" && l.mainline.rebuild && (
                  <span className="a2-rebuild">
                    Rebuild: {l.mainline.rebuild}
                  </span>
                )}
              </div>
              <div className="a2-lane__marks">
                {side.marks.map((m) => (
                  <span
                    key={m.t}
                    className={clsx("a2-mark", `a2-mark--${m.kind}`)}
                  >
                    <span className={clsx("a2-mark__t", m.code && "is-code")}>
                      {m.t}
                    </span>
                    {m.d && <span className="a2-mark__d">{m.d}</span>}
                  </span>
                ))}
              </div>
            </li>
          );
        })}
      </ol>

      <figcaption className="a2-ledger__sum">
        {mode === "mainline" ? (
          <>
            <strong>10 places</strong> for one message from the server to a
            window, counted by hand. Every C++ site means rebuilding the server,
            the launcher, or both, and the request direction adds 6 more.
          </>
        ) : (
          <>
            <strong>3 authored files</strong>, none of them C++. The launcher
            does not know what the message means. The proto compile is still a
            step, but it rebuilds neither binary.
          </>
        )}
      </figcaption>
    </figure>
  );
}
