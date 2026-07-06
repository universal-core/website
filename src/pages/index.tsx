import Head from "@docusaurus/Head";
import Link from "@docusaurus/Link";
import clsx from "clsx";
import React from "react";

import { CommonLayout } from "../refine-theme/common-layout";
import { CommonHeader } from "../refine-theme/common-header";
import { LandingFooter } from "../refine-theme/landing-footer";
import { CoreSealIcon } from "../refine-theme/icons/core-seal";

/* ------------------------------------------------------------------ *
 * UniversalCore landing — "Forge" language: dark, engineered, violet
 * lead + light-blue answer, terminal code, geometric marks. Content is
 * neutral/placeholder; the feeling mirrors universalcore-design.
 * ------------------------------------------------------------------ */

const ico = (d: React.ReactNode) => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.7}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {d}
  </svg>
);

const Icons = {
  arrow: ico(<path d="M5 12h14M13 6l6 6-6 6" />),
  book: ico(
    <>
      <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15H6.5A2.5 2.5 0 0 0 4 20.5z" />
      <path d="M4 20.5A2.5 2.5 0 0 1 6.5 18H20" />
    </>,
  ),
  layers: ico(
    <>
      <path d="M12 3l9 5-9 5-9-5z" />
      <path d="M3 13l9 5 9-5" />
    </>,
  ),
  bolt: ico(<path d="M13 2L4 14h6l-1 8 9-12h-6z" />),
  terminal: ico(
    <>
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <path d="M7 9l3 3-3 3M13 15h4" />
    </>,
  ),
  grid: ico(
    <>
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
    </>,
  ),
  route: ico(
    <>
      <circle cx="6" cy="18" r="2.5" />
      <circle cx="18" cy="6" r="2.5" />
      <path d="M9 18h6a3 3 0 0 0 3-3V9" />
    </>,
  ),
  pulse: ico(<path d="M3 12h4l3 8 4-16 3 8h4" />),
  spark: ico(<path d="M12 3v6M12 15v6M3 12h6M15 12h6" />),
  github: (
    <svg width="1em" height="1em" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.53 2.36 1.09 2.94.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02a9.5 9.5 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.69-4.57 4.94.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10 10 0 0 0 12 2z" />
    </svg>
  ),
};

const line = "rgba(255,255,255,0.09)";
const lineStrong = "rgba(255,255,255,0.16)";
const violetSoft = "rgba(167,139,245,0.13)";
const violetLine = "rgba(167,139,245,0.42)";

const Kicker = ({ children }: { children: React.ReactNode }) => (
  <span
    className={clsx("font-mono text-xs font-medium uppercase tracking-[1px]")}
    style={{ color: "#a78bf5" }}
  >
    <span style={{ opacity: 0.7 }}>{"// "}</span>
    {children}
  </span>
);

const PrimaryBtn = ({
  to,
  children,
}: {
  to: string;
  children: React.ReactNode;
}) => (
  <Link
    to={to}
    className={clsx(
      "inline-flex items-center gap-2",
      "px-[22px] py-3 rounded-[3px]",
      "font-semibold text-[15px] leading-none no-underline",
      "transition-transform duration-150 hover:-translate-y-[1px] hover:no-underline",
    )}
    style={{ background: "#a78bf5", color: "#1c1408", border: "1px solid #a78bf5" }}
  >
    {children}
  </Link>
);

const GhostBtn = ({
  to,
  children,
}: {
  to: string;
  children: React.ReactNode;
}) => (
  <Link
    to={to}
    className={clsx(
      "inline-flex items-center gap-2",
      "px-[22px] py-3 rounded-[3px]",
      "font-semibold text-[15px] leading-none no-underline",
      "text-gray-0 hover:no-underline hover:text-gray-0",
      "transition-colors duration-150",
    )}
    style={{ background: "transparent", border: `1px solid ${lineStrong}` }}
  >
    {children}
  </Link>
);

/* terminal-style code card */
const tok = {
  kw: "#e3799b",
  str: "#7fd1c0",
  fn: "#c9b4ff",
  num: "#d6a8f0",
  com: "#6b6b7a",
  var: "#6fc0e0",
};
const CodeCard = ({
  file,
  lang,
  children,
  live,
}: {
  file: React.ReactNode;
  lang: string;
  children: React.ReactNode;
  live?: string;
}) => (
  <div
    className="overflow-hidden rounded-[4px]"
    style={{ border: `1px solid ${line}`, background: "#0a0908" }}
  >
    <div
      className="flex items-center gap-2.5 px-3.5 font-mono text-[12.5px]"
      style={{
        height: 38,
        borderBottom: `1px solid ${line}`,
        background: "#121110",
        color: "#9a9488",
      }}
    >
      <span style={{ color: "#a78bf5", fontWeight: 700 }}>›_</span>
      <span>{file}</span>
      <span className="ml-auto text-[11px]" style={{ color: "#736d62" }}>
        {lang} · copy
      </span>
    </div>
    <pre
      className="m-0 overflow-auto px-[18px] py-4 font-mono text-[13px] leading-[1.65]"
      style={{ color: "#cfc8bb", whiteSpace: "pre" }}
    >
      {children}
    </pre>
    {live && (
      <div
        className="flex items-center gap-2.5 px-[18px] py-3.5 font-mono text-[12px]"
        style={{ borderTop: `1px solid ${line}`, background: "#121110", color: "#9a9488" }}
      >
        <span
          className="inline-block h-1.5 w-1.5 rounded-full"
          style={{ background: "#5fc4ec" }}
        />
        {live}
      </div>
    )}
  </div>
);

const Stat = ({ n, l }: { n: string; l: string }) => (
  <div>
    <div className="font-display text-[34px] font-semibold leading-none" style={{ color: "#c7b2ff" }}>
      {n}
    </div>
    <div className="mt-1 text-[13px]" style={{ color: "#9a9488" }}>
      {l}
    </div>
  </div>
);

const Feature = ({
  icon,
  title,
  body,
  meta,
}: {
  icon: React.ReactNode;
  title: string;
  body: string;
  meta: string;
}) => (
  <div
    className="relative overflow-hidden rounded-[4px] p-6"
    style={{ border: `1px solid ${line}`, background: "#121110" }}
  >
    <div
      className="mb-4 grid h-[42px] w-[42px] place-items-center rounded-[3px] text-[20px]"
      style={{ background: violetSoft, border: `1px solid ${violetLine}`, color: "#a78bf5" }}
    >
      {icon}
    </div>
    <h3 className="font-display text-[18px] font-semibold" style={{ color: "#ece8df", margin: 0 }}>
      {title}
    </h3>
    <p className="mt-2 text-[14px] leading-[1.6]" style={{ color: "#9a9488", margin: "8px 0 0" }}>
      {body}
    </p>
    <div className="mt-4 flex items-center gap-2 font-mono text-[11.5px]" style={{ color: "#736d62" }}>
      <span style={{ color: "#a78bf5" }}>{Icons.arrow}</span>
      {meta}
    </div>
  </div>
);

const C = ({ c, children }: { c: string; children: React.ReactNode }) => (
  <span style={{ color: c }}>{children}</span>
);

function Home() {
  const title = "UniversalCore";
  return (
    <>
      <Head>
        <html data-active-page="index" />
        <title>{title}</title>
        <meta property="og:title" content={title} />
      </Head>
      <CommonLayout description="An open, modular platform for building and shipping custom features — foundations, subsystems, developer experience and operations.">
        <CommonHeader />

        {/* HERO */}
        <section
          className={clsx(
            "mx-auto grid w-full max-w-[1200px] items-center gap-12 px-6",
            "grid-cols-1 landing-md:grid-cols-[1.05fr_0.95fr]",
            "pt-16 pb-14 landing-md:pt-24",
          )}
        >
          <div className="flex flex-col gap-6">
            <span
              className="inline-flex w-fit items-center gap-2 rounded-full px-3 py-1.5 text-[12.5px] font-semibold"
              style={{ background: violetSoft, border: `1px solid ${violetLine}`, color: "#c7b2ff" }}
            >
              <span style={{ color: "#5fc4ec" }}>{Icons.spark}</span> 12 years of
              engine work, now open
            </span>
            <h1
              className="font-display text-[42px] font-semibold leading-[1.04] landing-md:text-[56px]"
              style={{ color: "#ece8df", letterSpacing: "-1px", margin: 0 }}
            >
              Extend the game
              <br />
              without touching
              <br />
              the engine.
            </h1>
            <p className="max-w-[54ch] text-[19px] leading-[1.6]" style={{ color: "#9a9488" }}>
              UniversalCore turns hardcoded, recompile-required C++ systems into{" "}
              <b style={{ color: "#ece8df" }}>declarative, scriptable, observable</b>{" "}
              platforms — so you ship features in Lua, Python and YAML, not engine
              patches.
            </p>
            <div className="mt-1 flex flex-wrap gap-3.5">
              <PrimaryBtn to="/docs">Get started {Icons.arrow}</PrimaryBtn>
              <GhostBtn to="/docs">{Icons.book} Read the docs</GhostBtn>
            </div>
            <div className="mt-2 flex items-center gap-6">
              <Stat n="20+" l="subsystems" />
              <span style={{ width: 1, height: 34, background: line }} />
              <Stat n="Lua" l="+ Python + YAML" />
              <span style={{ width: 1, height: 34, background: line }} />
              <Stat n="0" l="engine edits" />
            </div>
          </div>

          <div className="self-stretch">
            <CodeCard
              file={
                <>
                  <b style={{ color: "#a78bf5" }}>features/rejoin_dungeon</b>.lua
                </>
              }
              lang="LUA"
              live="hot-reloaded in the running client · no recompile"
            >
              <C c={tok.com}>{"-- register a feature, no C++ required\n"}</C>
              <C c={tok.kw}>local </C>d <C c={tok.kw}>= </C>
              <C c={tok.var}>core</C>.<C c={tok.fn}>feature</C>{" {\n"}
              {"  id       = "}
              <C c={tok.str}>"rejoin_dungeon"</C>,{"\n"}
              {"  rejoin   = "}
              <C c={tok.kw}>true</C>,{"\n"}
              {"  on_enter = "}
              <C c={tok.kw}>function</C>(<C c={tok.var}>player</C>, <C c={tok.var}>ctx</C>){"\n"}
              {"    "}
              <C c={tok.kw}>if</C> ctx:<C c={tok.fn}>has_flag</C>(
              <C c={tok.str}>"cleared"</C>) <C c={tok.kw}>then</C>{"\n"}
              {"      "}
              <C c={tok.kw}>return</C> player:<C c={tok.fn}>teleport</C>(ctx.checkpoint){"\n"}
              {"    "}
              <C c={tok.kw}>end</C>{"\n"}
              {"    ctx:"}
              <C c={tok.fn}>spawn_wave</C>(<C c={tok.str}>"stage_1"</C>){"\n"}
              {"  "}
              <C c={tok.kw}>end</C>,{"\n"}
              {"}"}
            </CodeCard>
          </div>
        </section>

        {/* PILLARS STRIP */}
        <div
          className="flex flex-wrap items-center gap-6 px-6 py-3.5"
          style={{ borderTop: `1px solid ${line}`, borderBottom: `1px solid ${line}` }}
        >
          <div className="mx-auto flex w-full max-w-[1200px] flex-wrap items-center gap-x-8 gap-y-2">
            <span className="font-mono text-[11.5px] uppercase tracking-[1px]" style={{ color: "#736d62" }}>
              One platform, four layers
            </span>
            <div className="flex flex-1 flex-wrap items-center gap-x-7 gap-y-1" style={{ opacity: 0.85 }}>
              {["Foundations", "Subsystems", "Developer Experience", "Operations"].map(
                (n) => (
                  <span key={n} className="font-display text-[15px] font-semibold" style={{ color: "#9a9488" }}>
                    {n}
                  </span>
                ),
              )}
            </div>
          </div>
        </div>

        {/* FEATURES */}
        <section className="mx-auto w-full max-w-[1200px] px-6 pt-16 pb-5">
          <div className="mb-8 flex flex-col gap-3">
            <Kicker>The platform</Kicker>
            <h2 className="font-display text-[32px] font-semibold" style={{ color: "#ece8df", margin: 0, letterSpacing: "-0.5px" }}>
              Everything the engine never gave you.
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-[18px] landing-sm:grid-cols-2 landing-md:grid-cols-3">
            <Feature icon={Icons.layers} title="Scripting foundation" body="A first-class bridge that exposes engine primitives, event hooks and messaging to Lua and Python — write features, not patches." meta="foundations" />
            <Feature icon={Icons.grid} title="Declarative content" body="Drops, affects, skills and UI move from hardcoded C++ to YAML + Lua declarations you can read, diff and hot-reload." meta="config" />
            <Feature icon={Icons.bolt} title="Composable subsystems" body="Avatars, dungeons, skill graphs and more — each built on the same foundation, each extendable without forking the engine." meta="subsystems" />
            <Feature icon={Icons.terminal} title="Real developer UX" body="Source maps, a quest/forge compiler and a remote debugger for Lua and Python — set a breakpoint in the running client." meta="developer-experience" />
            <Feature icon={Icons.pulse} title="Built-in observability" body="Structured logs, faucet/sink profiling and a server-wide backoffice — see what your economy and players are actually doing." meta="operations" />
            <Feature icon={Icons.route} title="Clean dev APIs" body="Precise, documented, versioned interfaces with fixed extension points — so integrating a custom feature is a pleasure, not a hunt." meta="architecture" />
          </div>
        </section>

        {/* SHOWCASE */}
        <section
          className={clsx(
            "mx-auto grid w-full max-w-[1200px] items-center gap-12 px-6 py-16",
            "grid-cols-1 landing-md:grid-cols-[0.9fr_1.1fr]",
          )}
        >
          <div className="flex flex-col gap-[18px]">
            <Kicker>Declarative by default</Kicker>
            <h2 className="font-display text-[32px] font-semibold" style={{ color: "#ece8df", margin: 0, letterSpacing: "-0.5px" }}>
              Describe it. Don&apos;t hardcode it.
            </h2>
            <p className="text-[15.5px] leading-[1.72]" style={{ color: "#9a9488" }}>
              Systems that used to mean editing the engine and recompiling become
              plain declarations. Tune a drop table or an affect in YAML, wire the
              behaviour in Lua, and reload — the running client picks it up.
            </p>
            <div
              className="mt-1 flex items-start gap-3 rounded-[3px] p-3.5"
              style={{ background: "rgba(95,196,236,0.10)", border: `1px solid ${line}`, borderLeft: "3px solid #5fc4ec" }}
            >
              <span className="mt-0.5 text-[16px]" style={{ color: "#5fc4ec" }}>
                {Icons.bolt}
              </span>
              <div>
                <div className="text-[12px] font-bold uppercase tracking-[1.4px]" style={{ color: "#5fc4ec" }}>
                  Tip
                </div>
                <p className="mt-1 text-[14px] leading-[1.5]" style={{ color: "#9a9488", margin: "4px 0 0" }}>
                  Every declaration is validated on load, so a typo fails fast with a
                  source-mapped error — not a silent crash mid-raid.
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-3.5">
            <CodeCard file={<><b style={{ color: "#a78bf5" }}>drops/boss_wing</b>.yaml</>} lang="YAML">
              <C c={tok.var}>boss_wing</C>:{"\n"}
              {"  "}
              <C c={tok.var}>from</C>: <C c={tok.str}>"metin_of_rage"</C>
              {"\n"}
              {"  "}
              <C c={tok.var}>rolls</C>:{"\n"}
              {"    - "}
              <C c={tok.var}>item</C>: <C c={tok.str}>"wing_of_dawn"</C>
              {"   "}
              <C c={tok.var}>chance</C>: <C c={tok.num}>0.5</C>
              {"\n"}
              {"    - "}
              <C c={tok.var}>item</C>: <C c={tok.str}>"soul_shard"</C>
              {"     "}
              <C c={tok.var}>chance</C>: <C c={tok.num}>12.0</C>
            </CodeCard>
            <CodeCard file={<><b style={{ color: "#a78bf5" }}>affects/warmup</b>.lua</>} lang="LUA">
              <C c={tok.var}>core</C>.<C c={tok.fn}>affect</C>(<C c={tok.str}>"warmup"</C>, {"{\n"}
              {"  "}
              <C c={tok.var}>duration</C> = <C c={tok.num}>30</C>,{"\n"}
              {"  "}
              <C c={tok.fn}>apply</C> = <C c={tok.kw}>function</C>(p) p:<C c={tok.fn}>mod</C>(<C c={tok.str}>"atk_spd"</C>, <C c={tok.num}>0.15</C>) <C c={tok.kw}>end</C>,{"\n"}
              {"})"}
            </CodeCard>
          </div>
        </section>

        {/* CTA */}
        <section className="mx-auto w-full max-w-[1200px] px-6 pb-24 pt-4">
          <div
            className="flex flex-col items-start justify-between gap-6 rounded-[4px] p-10 landing-md:flex-row landing-md:items-center"
            style={{ background: violetSoft, border: `1px solid ${violetLine}` }}
          >
            <div className="flex items-center gap-5">
              <CoreSealIcon size={52} />
              <div>
                <h2 className="font-display text-[26px] font-semibold" style={{ color: "#ece8df", margin: 0 }}>
                  Read the story behind the platform.
                </h2>
                <p className="mt-1.5 text-[16px]" style={{ color: "#9a9488", margin: "6px 0 0" }}>
                  Start with the docs, or follow the build journal on the blog.
                </p>
              </div>
            </div>
            <div className="flex shrink-0 flex-wrap gap-3.5">
              <PrimaryBtn to="/docs">Quickstart {Icons.arrow}</PrimaryBtn>
              <GhostBtn to="/blog">Read the blog</GhostBtn>
            </div>
          </div>
        </section>

        <LandingFooter />
      </CommonLayout>
    </>
  );
}

export default Home;
