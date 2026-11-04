import Link from "@docusaurus/Link";
import { useDoc } from "@docusaurus/theme-common/internal";
import DocItemContent from "@theme/DocItem/Content";
import React from "react";

// The manifesto is read as one long essay, not looked up like a reference page.
export const ManifestoLayout = ({ children }: React.PropsWithChildren<{}>) => {
  const { metadata, frontMatter } = useDoc();

  return (
    <article className="uc-essay">
      <header className="uc-essay__header">
        <p className="uc-essay__eyebrow">Manifesto</p>
        <h1 className="uc-essay__title">{metadata.title}</h1>
        {frontMatter.description && <p className="uc-essay__lede">{frontMatter.description}</p>}
        <p className="uc-essay__byline">
          by <Link to="/about">Luscha</Link>
        </p>
      </header>
      <div className="uc-essay__body refine-prose">
        <DocItemContent>{children}</DocItemContent>
      </div>
      <aside className="uc-essay__author" aria-label="About the author">
        <p className="uc-essay__author-name">Written by Luscha</p>
        <p className="uc-essay__author-text">
          Who builds Universal Core, and where to find them.
        </p>
        <Link to="/about" className="uc-essay__author-link">
          About the author
        </Link>
      </aside>
    </article>
  );
};
