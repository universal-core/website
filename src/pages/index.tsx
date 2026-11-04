import Head from "@docusaurus/Head";
import Link from "@docusaurus/Link";
import { usePluginData } from "@docusaurus/useGlobalData";
import React from "react";

import { Chain } from "../components/home/Chain";
import { CostLedger } from "../components/home/CostLedger";
import { Exploded } from "../components/home/Exploded";
import { Feature } from "../components/home/Feature";
import { PolicyWalk } from "../components/home/PolicyWalk";
import "../components/home/home.css";
import { CommonHeader } from "../refine-theme/common-header";
import { CommonLayout } from "../refine-theme/common-layout";
import { LandingFooter } from "../refine-theme/landing-footer";

const AROUND = [
  {
    name: "Luna",
    to: "/foundations/luna",
    text: "carries every forge registration across the bridge into the engine.",
  },
  {
    name: "UCHTML",
    to: "/foundations/uchtml",
    text: "renders templates against a data context into client UI.",
  },
  {
    name: "The render pipeline",
    to: "/foundations/rhi",
    text: "turns the client frame into GPU work through a render graph and an RHI.",
  },
];

const TOOLS = [
  {
    name: "A Lua debugger",
    to: "/foundations/luna/devtools",
    text: "The quest compiler emits source maps, so you set breakpoints in the source you edit while the debugger follows the chunks that run.",
  },
  {
    name: "Generated stubs",
    to: "/foundations/luna/lua-annotations",
    text: "Every binding carries a documentation comment, and generated EmmyLua stubs turn it into completion, documentation and type checking in the editor.",
  },
  {
    name: "A headless simulator",
    to: "/foundations/simulator",
    text: "Stage a world from a Lua driver, call real engine entry points and read a verdict, without a client.",
  },
];


const PATHS = [
  {
    name: "Foundations",
    to: "/foundations",
    text: "How each system works and why it is built that way. Start here if you want the model before the API.",
  },
  {
    name: "Docs",
    to: "/docs",
    text: "The API reference: registration calls, signatures, verdict tables and the traps of each framework.",
  },
  {
    name: "Tutorials",
    to: "/tutorials",
    text: "Multi-step builds with a check at each stage: forge modules, policies, traits, skills, metrics and client windows.",
  },
  {
    name: "Manifesto",
    to: "/manifesto/",
    text: "Why gameplay belongs outside the engine, argued in full.",
  },
];

type BlogPostRef = { title: string; permalink: string; state: string };

export default function Home() {
  const { posts } = usePluginData("docusaurus-plugin-content-blog") as {
    posts: BlogPostRef[];
  };
  const latest = posts.filter((p) => p.state === "live").slice(0, 5);
  return (
    <>
      <Head>
        <html data-active-page="index" />
        <title>Universal Core</title>
      </Head>
      <CommonLayout description="Universal Core turns the hardcoded Metin2 mainline engine into a foundation for gameplay written outside it.">
        <CommonHeader />
        <main className="a2">
          <section className="a2-hero">
            <div className="a2-wrap">
              <h1>You already know what one more feature costs.</h1>
            </div>
            <div className="a2-wrap a2-hero__grid">
              <div>
                <p className="a2-hero__lede">
                  If you have extended a Metin2 server, you have paid it: a C++
                  patch, a hand-written packet, a switch case, a rebuild.
                  Universal Core turns the Metin2 mainline engine into a
                  foundation where the engine holds the mechanisms and gameplay
                  lives outside it, in Lua on the server and Python on the
                  client.
                </p>
                <div className="a2-cta">
                  <Link to="/foundations" className="a2-btn a2-btn--primary">
                    Read the Foundations
                  </Link>
                  <Link to="/docs" className="a2-btn">
                    Open the docs
                  </Link>
                </div>
              </div>
              <aside className="a2-proof" aria-label="One message, two engines">
                <p className="a2-proof__row a2-proof__row--cost">
                  <b>10 places</b>
                  <span>
                    for one server-to-window message in the mainline engine
                  </span>
                </p>
                <p className="a2-proof__row a2-proof__row--uc">
                  <b>3 files</b>
                  <span>for the same message here, none of them C++</span>
                </p>
                <a href="#feature">See the three files</a>
              </aside>
            </div>
          </section>

          <section className="a2-sec a2-sec--cost" aria-labelledby="cost">
            <div className="a2-wrap">
              <div className="a2-head">
                <h2 id="cost">
                  One message from the server to a window touches ten places.
                </h2>
                <p>
                  Take the smallest feature there is: the server tells a client
                  window something. In the mainline engine the data crosses a
                  shared header, an encoder, the launcher's packet code and the
                  Python glue that forwards it. Switch the drawing to see the
                  same message here.
                </p>
              </div>
              <CostLedger />
              <p className="a2-src">
                Counted in{" "}
                <Link to="/blog/hiding-the-transport-layer">
                  Hiding the transport layer
                </Link>
                .
              </p>

              <div className="a2-more">
                <div>
                  <h3>A rule is a branch.</h3>
                  <p>
                    Whether a player may use an item, join a party or fight here
                    is a branch in C++, by map, by item, by mode. A new rule
                    means editing the function that decides, and nothing removes
                    the rule when its system ends.{" "}
                    <Link to="/foundations/policies">Policies</Link> answer this
                    one.
                  </p>
                </div>
                <div>
                  <h3>A bonus is a point.</h3>
                  <p>
                    A point holds a number, with no condition, state or moment
                    at which it applies. A conditional bonus is one more branch
                    in the damage path.{" "}
                    <Link to="/foundations/traits">Traits</Link> answer this
                    one.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="a2-sec a2-sec--arch" aria-labelledby="arch">
            <div className="a2-wrap">
              <div className="a2-head a2-head--reveal">
                <h2 id="arch">
                  The engine keeps the mechanisms. Gameplay moves out.
                </h2>
                <p>
                  The three costs have one cause: the engine holds the gameplay.
                  Take the mainline engine apart one layer at a time, and see
                  what is left in C++.
                </p>
              </div>
              <Exploded />
            </div>
          </section>

          <section className="a2-sec" aria-labelledby="policy">
            <div className="a2-wrap">
              <div className="a2-head">
                <h2 id="policy">A rule becomes a question the engine asks.</h2>
                <p>
                  Instead of a branch, the engine asks a registry. Each
                  registration has a guard that selects the cases it owns and a
                  payload that answers. Here is a complete item rule from the
                  docs; pick a case and follow the walk.
                </p>
              </div>
              <PolicyWalk />
              <p className="a2-src">
                For item use, no allow beats a deny. Eight registries share this
                shape and each resolves in its own way:{" "}
                <Link to="/foundations/policies">Policies</Link>, and the{" "}
                <Link to="/docs/building-blocks/item-use-policy/behaviour">
                  item use behaviour
                </Link>
                .
              </p>
            </div>
          </section>

          <section className="a2-sec" aria-labelledby="chain">
            <div className="a2-wrap">
              <div className="a2-head">
                <h2 id="chain">The foundations are built to meet.</h2>
                <p>
                  A policy is one framework. Follow a single skill cast and it
                  crosses five more, each handing the next something it can use.
                  Every step opens the page that explains it.
                </p>
              </div>
              <div className="a2-chain-wrap">
                <Chain />
                <aside className="a2-around">
                  <h3>Around the chain</h3>
                  <ul>
                    {AROUND.map((a) => (
                      <li key={a.name}>
                        <Link to={a.to}>{a.name}</Link> {a.text}
                      </li>
                    ))}
                  </ul>
                </aside>
              </div>
            </div>
          </section>

          <section className="a2-sec" aria-labelledby="feature">
            <div className="a2-wrap">
              <div className="a2-head">
                <h2 id="feature">One feature, end to end, in three files.</h2>
                <p>
                  Back to the message from the top of the page. On every login
                  the server sends the player's login count to a small client
                  window. This is the tutorial's code, loaded from the tutorial
                  itself.
                </p>
              </div>
              <Feature />
            </div>
          </section>

          <section className="a2-sec" aria-labelledby="tools">
            <div className="a2-wrap a2-split">
              <div>
                <h2 id="tools">Lua, treated as a real language.</h2>
                <dl className="a2-tools">
                  {TOOLS.map((t) => (
                    <div key={t.name}>
                      <dt>
                        <Link to={t.to}>{t.name}</Link>
                      </dt>
                      <dd>{t.text}</dd>
                    </div>
                  ))}
                </dl>
              </div>
              <div>
                <h2>Written while building it.</h2>
                <ul className="a2-posts">
                  {latest.map((p) => (
                    <li key={p.permalink}>
                      <Link to={p.permalink}>{p.title}</Link>
                    </li>
                  ))}
                </ul>
                <p className="a2-src">
                  <Link to="/blog">Every post</Link>, and{" "}
                  <Link to="/about">who builds Universal Core</Link>.
                </p>
              </div>
            </div>
          </section>

          <section className="a2-sec a2-sec--paths" aria-labelledby="paths">
            <div className="a2-wrap">
              <h2 id="paths">Choose where to start.</h2>
              <ul className="a2-paths">
                {PATHS.map((p) => (
                  <li key={p.name}>
                    <Link to={p.to}>
                      <span className="a2-paths__name">{p.name}</span>
                      <span className="a2-paths__text">{p.text}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </main>
        <LandingFooter />
      </CommonLayout>
    </>
  );
}
