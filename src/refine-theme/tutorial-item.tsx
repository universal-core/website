import React from "react";
import clsx from "clsx";
import { DocProvider, useDoc } from "@docusaurus/theme-common/internal";
import DocItemMetadata from "@theme/DocItem/Metadata";
import MDXContent from "@theme/MDXContent";

import { CommonFooter } from "./common-footer";
import { TutorialHeader } from "./tutorial-header";
import { TutorialPaginator } from "./tutorial-paginator";
import { TutorialChromeContext } from "../components/tutorial/chrome";

const Chapter = ({ children }: React.PropsWithChildren<{}>) => {
  const { metadata } = useDoc();
  const chrome = React.useMemo(
    () => ({ title: metadata.title, footer: <TutorialPaginator /> }),
    [metadata.title],
  );
  return (
    <TutorialChromeContext.Provider value={chrome}>
      <main className={clsx("uc-tutorial-main", "flex-1 min-h-0", "flex", "w-full")}>
        <MDXContent>{children}</MDXContent>
      </main>
    </TutorialChromeContext.Provider>
  );
};

export const TutorialItem = (props) => {
  const MDXComponent = props.content;

  return (
    <DocProvider content={props.content}>
      <DocItemMetadata />
      <div className={clsx("uc-tutorial-page", "flex flex-col", "w-full")}>
        <TutorialHeader />
        <Chapter>
          <MDXComponent />
        </Chapter>
        <div className="uc-tutorial-page__footer">
          <CommonFooter />
        </div>
      </div>
    </DocProvider>
  );
};
