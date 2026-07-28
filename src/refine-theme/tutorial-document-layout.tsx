import clsx from "clsx";
import React from "react";
import TutorialItemContent from "./tutorial-item-content";

import { FULL_WIDTH_TABLE_VARIABLE_NAME } from "./common-table";
import { TutorialPaginator } from "./tutorial-paginator";

export const TutorialDocumentLayout = ({ children }) => {
  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useLayoutEffect(() => {
    const containerElement = containerRef.current;
    if (containerElement) {
      const width = containerElement.getBoundingClientRect().width;
      containerElement.style.setProperty(
        `--${FULL_WIDTH_TABLE_VARIABLE_NAME}`,
        `${width}px`,
      );
    }

    // on resize, recompute the full width table variable
    const handleResize = () => {
      const width = containerElement.getBoundingClientRect().width;
      containerElement.style.setProperty(
        `--${FULL_WIDTH_TABLE_VARIABLE_NAME}`,
        `${width}px`,
      );
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [containerRef]);

  return (
    <>
      <div
        ref={containerRef}
        className={clsx(
          "flex-1",
          "flex flex-col",
          "items-center justify-start",
          "px-4 sm:px-0 py-0",
          "relative",
          "w-full",
        )}
      >
        <div
          className={clsx("max-w-screen-content-2xl w-full", "mb-12", "mt-4")}
        >
          <div className={clsx("refine-prose")}>
            <TutorialItemContent>{children}</TutorialItemContent>
          </div>
        </div>
        <div className={clsx("max-w-screen-content-2xl", "w-full")}>
          <TutorialPaginator />
        </div>
      </div>
    </>
  );
};
