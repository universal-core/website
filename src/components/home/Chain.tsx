import Link from "@docusaurus/Link";
import React from "react";

type Link_ = {
  name: string;
  to: string;
  text: React.ReactNode;
  edge?: string;
  side?: { name: string; to: string; text: string };
};

const CHAIN: Link_[] = [
  {
    name: "Skill use policy",
    to: "/foundations/policies",
    text: "Asked before the cast. Like item use, it stops at the first refusal.",
    edge: "allowed: the skill runs",
  },
  {
    name: "Skill",
    to: "/foundations/skills",
    text: "One definition per skill, read by the game server and the client.",
    edge: "a node adds an affect",
    side: {
      name: "Player metrics",
      to: "/foundations/player-metrics",
      text: "The native skill signal counts the cast too.",
    },
  },
  {
    name: "Affect",
    to: "/foundations/affects",
    text: "A timed state on a character. For a broadcastable type, every viewer sees it with its duration.",
    edge: "the affect is the gate",
  },
  {
    name: "Trait",
    to: "/foundations/traits",
    text: "Attached while the affect lasts. A pre hook bumps a point for one damage calculation.",
    edge: "the hit lands",
  },
  {
    name: "Player metric",
    to: "/foundations/player-metrics",
    text: (
      <>
        A qualifying hit feeds the <code>damage</code> signal, and the catalog
        counts it once for every consumer.
      </>
    ),
    edge: "the heartbeat sweep publishes",
    side: {
      name: "Virtual players",
      to: "/foundations/player-virtualization",
      text: "In a virtual session the default gate refuses the count. A prize commit is the explicit write back to real data.",
    },
  },
  {
    name: "Your Lua consumer",
    to: "/foundations/player-metrics",
    text: (
      <>
        Subscribes to <code>ON_METRICS_CHANGED</code> and re-evaluates only what
        the batch touched.
      </>
    ),
  },
];

export function Chain() {
  return (
    <ol className="a2-chain">
      {CHAIN.map((n) => (
        <li key={n.name} className="a2-chain__row">
          <Link to={n.to} className="a2-cnode">
            <span className="a2-cnode__name">{n.name}</span>
            <span className="a2-cnode__text">{n.text}</span>
          </Link>
          {n.side && (
            <Link to={n.side.to} className="a2-cside">
              <span className="a2-cside__name">{n.side.name}</span>
              <span>{n.side.text}</span>
            </Link>
          )}
          {n.edge && (
            <span className="a2-cedge">
              <span>{n.edge}</span>
            </span>
          )}
        </li>
      ))}
    </ol>
  );
}
