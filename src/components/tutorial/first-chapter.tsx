import React from "react";
import { Redirect } from "@docusaurus/router";
import { tutorialUnits, useTutorialDocs } from "@site/src/refine-theme/tutorial-utils";

/** Sends the tutorials landing route to the first chapter of the first unit. */
export const FirstChapter = () => {
  const docs = useTutorialDocs();
  const first = tutorialUnits.flatMap((unit) => unit.items).find((id) => docs[id]);
  return first ? <Redirect to={docs[first].path} /> : null;
};
