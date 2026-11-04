import Head from "@docusaurus/Head";
import Link from "@docusaurus/Link";
import React from "react";

import "../components/home/home.css";
import { CommonHeader } from "../refine-theme/common-header";
import { CommonLayout } from "../refine-theme/common-layout";
import { LandingFooter } from "../refine-theme/landing-footer";

export default function About() {
  return (
    <>
      <Head>
        <title>About | Universal Core</title>
      </Head>
      <CommonLayout description="Who builds Universal Core.">
        <CommonHeader />
        <main className="a2">
          <section className="a2-hero a2-about">
            <div className="a2-wrap">
              <h1>About</h1>
              <p className="a2-hero__lede">Universal Core is built by Luscha.</p>
              <p className="a2-src">
                This page is a placeholder; a short biography and links will
                follow. Until then, the <Link to="/manifesto/">manifesto</Link>{" "}
                tells why the project exists.
              </p>
            </div>
          </section>
        </main>
        <LandingFooter />
      </CommonLayout>
    </>
  );
}
