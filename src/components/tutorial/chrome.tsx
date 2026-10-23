import React from "react";

/** What the tutorial page puts around the workbench text: the chapter title and the paginator. */
export type TutorialChrome = {
  title?: string;
  footer?: React.ReactNode;
};

export const TutorialChromeContext = React.createContext<TutorialChrome>({});
