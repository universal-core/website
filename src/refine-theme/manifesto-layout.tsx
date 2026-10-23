import Link from "@docusaurus/Link";
import { useDoc, useDocsSidebar } from "@docusaurus/theme-common/internal";
import DocItemContent from "@theme/DocItem/Content";
import clsx from "clsx";
import React from "react";

type SidebarLink = { type: string; href?: string; label?: string; docId?: string };

const useEssays = () => {
  const sidebar = useDocsSidebar();
  const { metadata } = useDoc();
  return ((sidebar?.items ?? []) as SidebarLink[]).filter(
    (item) => item.type === "link" && item.docId !== metadata.id && item.docId !== "index",
  );
};

const EssayList = () => {
  const essays = useEssays();
  if (essays.length === 0) return null;
  return (
    <ol className="uc-essay-list">
      {essays.map((essay, index) => (
        <li key={essay.href}>
          <Link to={essay.href} className="uc-essay-list__item">
            <span className="uc-essay-list__number">{String(index + 1).padStart(2, "0")}</span>
            <span className="uc-essay-list__title">{essay.label}</span>
            <span className="uc-essay-list__arrow" aria-hidden>
              →
            </span>
          </Link>
        </li>
      ))}
    </ol>
  );
};

// The manifesto is read as a long essay, not looked up like a reference page.
export const ManifestoLayout = ({ children }: React.PropsWithChildren<{}>) => {
  const { metadata, frontMatter } = useDoc();
  const isIndex = metadata.id === "index";
  const { next } = metadata;

  return (
    <article className={clsx("uc-essay", isIndex && "uc-essay--index")}>
      <header className="uc-essay__header">
        <p className="uc-essay__eyebrow">
          {isIndex ? "Universal Core" : <Link to="/manifesto/">Manifesto</Link>}
        </p>
        <h1 className="uc-essay__title">{metadata.title}</h1>
        {frontMatter.description && <p className="uc-essay__lede">{frontMatter.description}</p>}
        {!isIndex && <p className="uc-essay__byline">Luscha</p>}
      </header>
      <div className="uc-essay__body refine-prose">
        <DocItemContent>{children}</DocItemContent>
      </div>
      {isIndex ? (
        <EssayList />
      ) : (
        next && (
          <Link to={next.permalink} className="uc-essay__next">
            <span className="uc-essay__next-label">Next essay</span>
            <span className="uc-essay__next-title">{next.title}</span>
          </Link>
        )
      )}
    </article>
  );
};
