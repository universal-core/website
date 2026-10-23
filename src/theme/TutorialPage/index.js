import React from "react";
import clsx from "clsx";
import { HtmlClassNameProvider, ThemeClassNames, PageMetadata } from "@docusaurus/theme-common";
import {
  docVersionSearchTag,
  DocsVersionProvider,
  useDocRouteMetadata,
} from "@docusaurus/theme-common/internal";
import TutorialPageLayout from "@theme/TutorialPage/Layout";
import NotFound from "@theme/NotFound";
import SearchMetadata from "@theme/SearchMetadata";

export default function TutorialPage(props) {
  const { versionMetadata } = props;
  const currentDocRouteMetadata = useDocRouteMetadata(props);

  if (!currentDocRouteMetadata) {
    return <NotFound />;
  }

  return (
    <>
      <SearchMetadata
        version={versionMetadata.version}
        tag={docVersionSearchTag(versionMetadata.pluginId, versionMetadata.version)}
      />
      <PageMetadata>
        {versionMetadata.noIndex && <meta name="robots" content="noindex, nofollow" />}
      </PageMetadata>
      <HtmlClassNameProvider
        className={clsx(
          ThemeClassNames.wrapper.docsPages,
          ThemeClassNames.page.docsDocPage,
          versionMetadata.className,
          "uc-tutorial-html",
        )}
      >
        <DocsVersionProvider version={versionMetadata}>
          <TutorialPageLayout>{currentDocRouteMetadata.docElement}</TutorialPageLayout>
        </DocsVersionProvider>
      </HtmlClassNameProvider>
    </>
  );
}
