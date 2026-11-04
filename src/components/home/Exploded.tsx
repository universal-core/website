import Link from "@docusaurus/Link";
import clsx from "clsx";
import React, { useEffect, useRef, useState } from "react";

type Step = { id: string; title: string; body: React.ReactNode };

const STEPS: Step[] = [
  {
    id: "mono",
    title: "The mainline engine is one block",
    body: (
      <>
        Packets, rule branches, hardcoded points and the QuestManager are
        compiled into the same C++. A feature has nowhere else to land, so every
        feature is an engine change.
      </>
    ),
  },
  {
    id: "engine",
    title: "The mechanisms stay in C++",
    body: (
      <>
        <Link to="/foundations/policies">Registries</Link> that ask for
        decisions, <Link to="/foundations/luna/event-bus">an event bus</Link>{" "}
        that delivers engine events to Lua subscribers, and{" "}
        <Link to="/foundations/luna/transport">one transport</Link> for every
        channel between client, game cores and database.
      </>
    ),
  },
  {
    id: "luna",
    title: "Luna runs beside the QuestManager",
    body: (
      <>
        The QuestManager keeps quest state, login and logout events and the{" "}
        <code>when</code> blocks. Luna does not replace it.{" "}
        <Link to="/foundations/luna/bridge">The bridge</Link> is the single
        boundary every script call crosses, with coroutines of its own.
      </>
    ),
  },
  {
    id: "forge",
    title: "Forge modules hold the gameplay",
    body: (
      <>
        A <Link to="/foundations/luna/forge">forge</Link> is a stateful module
        loaded at boot and kept for the whole process, written in the same file
        as its quest hooks.
      </>
    ),
  },
  {
    id: "frameworks",
    title: "Frameworks take rules from both sides",
    body: (
      <>
        Policies, affects, traits, skills, virtual players and player metrics.
        Each one is a mechanism in the engine that accepts registrations from
        C++ and from Lua, so a rule sits beside the system that owns it.
      </>
    ),
  },
  {
    id: "client",
    title: "The client is the other end of the transport",
    body: (
      <>
        Python windows{" "}
        <Link to="/foundations/luna/client">register as handlers</Link> for
        server messages. <Link to="/foundations/uchtml">UCHTML</Link> renders
        templates into client UI, and{" "}
        <Link to="/foundations/rhi">the render pipeline</Link> carries a frame
        through a render graph and an RHI to DirectX 11.
      </>
    ),
  },
  {
    id: "sim",
    title: "The simulator is the same server, built twice",
    body: (
      <>
        <Link to="/foundations/simulator">The headless simulator</Link> is the
        game server built a second time from the same sources. It boots without
        a socket, a database or a disk map, and a Lua driver calls real engine
        entry points.
      </>
    ),
  },
];

const ORDER = ["engine", "luna", "forge", "frameworks", "client", "sim"];

function Plate({
  id,
  at,
  shown,
  active,
  className,
  children,
}: {
  id: string;
  at: number;
  shown: boolean;
  active: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={clsx(
        "a2-plate",
        `a2-plate--${id}`,
        shown && "is-shown",
        active && "is-active",
        className,
      )}
      data-at={at}
    >
      {children}
    </div>
  );
}

export function Exploded() {
  const [step, setStep] = useState(0);
  const refs = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") {
      setStep(STEPS.length - 1);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting)
            setStep(Number((e.target as HTMLElement).dataset.step));
        }
      },
      { rootMargin: "-62% 0px -34% 0px" },
    );
    refs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  const cur = STEPS[step].id;
  const reached = (id: string) => step >= ORDER.indexOf(id) + 1;
  const plate = (id: string) => ({
    id,
    at: ORDER.indexOf(id),
    shown: reached(id),
    active: cur === id,
  });

  return (
    <div className="a2-explode">
      <div className="a2-stage-wrap">
        <div className={clsx("a2-stage", `at-${cur}`)} aria-hidden="true">
          <div className={clsx("a2-mono", step === 0 && "is-shown")}>
            <span className="a2-mono__name">Metin2 mainline engine</span>
            <span className="a2-mono__bits">
              <i>packets</i>
              <i>switch cases</i>
              <i>branches by map</i>
              <i>hardcoded points</i>
              <i>QuestManager</i>
              <i>branches by item</i>
            </span>
          </div>

          <div className={clsx("a2-ghost", reached("sim") && "is-shown")}>
            <span>Simulator: the same server, built twice</span>
          </div>

          <Plate {...plate("frameworks")}>
            <b>Gameplay frameworks</b>
            <span className="a2-chips">
              <i>policies</i>
              <i>affects</i>
              <i>traits</i>
              <i>skills</i>
              <i>virtual players</i>
              <i>player metrics</i>
            </span>
          </Plate>
          <Plate {...plate("forge")}>
            <b>Forge modules</b>
            <span className="a2-plate__note">Lua, loaded at boot</span>
          </Plate>
          <div
            className={clsx(
              "a2-plate",
              "a2-plate--qm",
              reached("luna") && "is-shown",
              cur === "luna" && "is-active",
            )}
          >
            <b>QuestManager</b>
            <span className="a2-plate__note">quests, as before</span>
          </div>
          <Plate {...plate("luna")}>
            <b>Luna bridge</b>
            <span className="a2-plate__note">parallel to the QuestManager</span>
          </Plate>
          <Plate {...plate("engine")}>
            <b>C++ engine</b>
            <span className="a2-chips a2-chips--mech">
              <i>registries</i>
              <i>event bus</i>
              <i>transport</i>
            </span>
          </Plate>

          <div className={clsx("a2-wire", reached("client") && "is-shown")}>
            <span>Luna transport</span>
          </div>
          <Plate {...plate("client")}>
            <b>Client</b>
            <span className="a2-chips">
              <i>Python windows</i>
              <i>UCHTML</i>
              <i>render graph and RHI</i>
            </span>
          </Plate>
        </div>
        <div className="a2-rail" aria-hidden="true">
          {STEPS.map((s, i) => (
            <i key={s.id} className={clsx(i <= step && "is-on")} />
          ))}
        </div>
      </div>

      <ol className="a2-steps">
        {STEPS.map((s, i) => (
          <li
            key={s.id}
            data-step={i}
            ref={(el) => {
              refs.current[i] = el;
            }}
            className={clsx("a2-step", i === step && "is-on")}
          >
            <h3>{s.title}</h3>
            <p>{s.body}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}
