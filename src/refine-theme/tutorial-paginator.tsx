import React from "react";
import clsx from "clsx";
import Link from "@docusaurus/Link";
import { useDoc } from "@docusaurus/theme-common/internal";

import { ArrowLeftIcon } from "./icons/arrow-left";
import { ArrowRightIcon } from "./icons/arrow-right";
import { getNext, getPrevious, useTutorialDocs } from "./tutorial-utils";

const Card = ({
  to,
  title,
  direction,
  alone,
}: {
  to: string;
  title: string;
  direction: "previous" | "next";
  alone: boolean;
}) => (
  <Link
    to={to}
    className={clsx(
      "flex-1",
      "p-4",
      "rounded-lg",
      "border border-gray-300 dark:border-gray-600",
      "hover:bg-gray-100 hover:dark:bg-gray-700",
      "hover:no-underline",
      direction === "next" && alone && "tutorial-sm:col-start-2",
    )}
  >
    <div
      className={clsx(
        "flex-1 flex justify-center flex-col gap-2",
        direction === "previous" ? "items-start text-left" : "items-end text-right",
      )}
    >
      <div className={clsx("flex items-center gap-2", "text-base", "text-gray-800 dark:text-gray-100")}>
        {direction === "previous" ? (
          <>
            <ArrowLeftIcon className="text-gray-400 dark:text-gray-500" />
            Previous
          </>
        ) : (
          <>
            Next
            <ArrowRightIcon className="text-gray-400 dark:text-gray-500" />
          </>
        )}
      </div>
      <span className="text-base text-refine-react-light-link dark:text-refine-react-dark-link">
        {title}
      </span>
    </div>
  </Link>
);

export const TutorialPaginator = () => {
  const { metadata } = useDoc();
  const docs = useTutorialDocs();
  const previous = docs[getPrevious(metadata.id) ?? ""];
  const next = docs[getNext(metadata.id) ?? ""];

  if (!previous && !next) return null;

  return (
    <nav
      aria-label="Tutorial chapters"
      className={clsx("not-prose", "flex flex-col-reverse tutorial-sm:grid tutorial-sm:grid-cols-2", "gap-4", "w-full", "mt-12")}
    >
      {previous ? <Card to={previous.path} title={previous.title} direction="previous" alone={!next} /> : null}
      {next ? <Card to={next.path} title={next.title} direction="next" alone={!previous} /> : null}
    </nav>
  );
};
