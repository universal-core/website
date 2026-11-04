import CodeBlock from "@theme/CodeBlock";
import clsx from "clsx";
import React, { useState } from "react";

import { POLICY } from "./code";

type State = "pass" | "skip" | "deny" | "idle";
type Case = {
  label: string;
  guard: State;
  guardNote: string;
  policy: State;
  policyNote: string;
  later: State;
  laterNote: string;
  end: "refused" | "continues";
  endNote: string;
};

const CASES: Case[] = [
  {
    label: "Item 100008 on MAP_A",
    guard: "pass",
    guardNote: "true: the map matches",
    policy: "deny",
    policyNote: '{ allowed = false, reason = "Not on this map." }',
    later: "idle",
    laterNote: "Not called. The first refusal ends the walk.",
    end: "refused",
    endNote: "Refused, and the reason appears in chat.",
  },
  {
    label: "Another item on MAP_A",
    guard: "pass",
    guardNote: "true: the map matches",
    policy: "pass",
    policyNote: "{ allowed = true }",
    later: "pass",
    laterNote:
      "Called next, in registration order. Any of them can still refuse.",
    end: "continues",
    endNote:
      "If none refuses, the use goes on, and the engine's own bans still apply after the gate.",
  },
  {
    label: "Item 100008 elsewhere",
    guard: "skip",
    guardNote: "false: not this policy's case",
    policy: "idle",
    policyNote: "Not called.",
    later: "pass",
    laterNote:
      "Called next, in registration order. Any of them can still refuse.",
    end: "continues",
    endNote:
      "If no guard matches, the engine behaves as if the list were empty.",
  },
];

function Node({
  state,
  title,
  note,
  code,
}: {
  state: State;
  title: string;
  note: string;
  code?: boolean;
}) {
  return (
    <div className={clsx("a2-pnode", `is-${state}`)}>
      <span className="a2-pnode__title">{title}</span>
      <span className={clsx("a2-pnode__note", code && "is-code")}>{note}</span>
    </div>
  );
}

export function PolicyWalk() {
  const [i, setI] = useState(0);
  const k = CASES[i];
  return (
    <div className="a2-policy">
      <div className="a2-policy__code">
        <p className="a2-file">trial_items.forge</p>
        <CodeBlock language="forge">{POLICY}</CodeBlock>
      </div>

      <div className="a2-policy__walk">
        <div className="a2-switch" role="group" aria-label="Choose an item use">
          {CASES.map((c, n) => (
            <button
              key={c.label}
              type="button"
              aria-pressed={n === i}
              onClick={() => setI(n)}
            >
              {c.label}
            </button>
          ))}
        </div>

        <div className="a2-pflow" aria-live="polite">
          <Node
            state="pass"
            title="Engine call site"
            note="A player uses an item. The generic checks run first."
          />
          <div className="a2-pregistry">
            <span className="a2-pregistry__name">
              Item use registry, walked in registration order
            </span>
            <Node
              state={k.guard}
              title="trial_items guard"
              note={k.guardNote}
            />
            <Node
              state={k.policy}
              title="trial_items policy"
              note={k.policyNote}
              code={k.policy !== "idle"}
            />
            <Node
              state={k.later}
              title="Later registrations"
              note={k.laterNote}
            />
          </div>
          <div className={clsx("a2-pend", `is-${k.end}`)}>{k.endNote}</div>
        </div>
      </div>
    </div>
  );
}
