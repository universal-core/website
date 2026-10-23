import React from "react";
import clsx from "clsx";
import Link from "@docusaurus/Link";
import { useDoc } from "@docusaurus/theme-common/internal";

import { TriangleDownIcon } from "./icons/triangle-down";
import { CommonCircleChevronLeft } from "./common-circle-chevron-left";
import {
  findUnitByItemId,
  getNext,
  getPrevious,
  tutorialUnits,
  useTutorialDocs,
} from "./tutorial-utils";
import { useTutorialVisits } from "../context/tutorial-visit-context";

// A chapter counts as visited after the reader has spent this long on it.
const VISIT_AFTER_MS = 10 * 1000;

const CheckEmpty = (props: React.SVGProps<SVGSVGElement>) => (
  <svg width={24} height={24} viewBox="0 0 24 24" fill="none" aria-hidden {...props}>
    <rect width={15} height={15} x={4.5} y={4.5} rx={7.5} fill="none" stroke="currentColor" />
  </svg>
);

const CheckFilled = (props: React.SVGProps<SVGSVGElement>) => (
  <svg width={24} height={24} viewBox="0 0 24 24" fill="none" aria-hidden {...props}>
    <rect width={16} height={16} x={4} y={4} rx={8} className="fill-refine-purple" />
    <path
      d="m9 12 2 2 4-4"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  </svg>
);

const Check = ({ done }: { done: boolean }) =>
  done ? (
    <CheckFilled className="shrink-0 text-gray-100 dark:text-gray-700" />
  ) : (
    <CheckEmpty className="shrink-0 text-gray-400 dark:text-gray-500" />
  );

const NavigationDropdown = () => {
  const { metadata } = useDoc();
  const docs = useTutorialDocs();
  const { visited, setVisited } = useTutorialVisits();
  const unit = findUnitByItemId(metadata.id);

  const [open, setOpen] = React.useState(false);
  const menuRef = React.useRef<HTMLDivElement>(null);
  const buttonRef = React.useRef<HTMLButtonElement>(null);

  React.useEffect(() => {
    const onPointerDown = (event: MouseEvent) => {
      const target = event.target as Node;
      if (!menuRef.current?.contains(target) && !buttonRef.current?.contains(target)) {
        setOpen(false);
      }
    };
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  React.useEffect(() => {
    if (visited[metadata.id]) return undefined;
    const timeout = setTimeout(() => setVisited(metadata.id), VISIT_AFTER_MS);
    return () => clearTimeout(timeout);
  }, [metadata.id, visited, setVisited]);

  React.useEffect(() => setOpen(false), [metadata.id]);

  const unitDone = (items: string[]) => items.every((item) => visited[item]);

  return (
    <div className={clsx("flex-1", "relative", "flex", "min-w-0", "max-w-[384px]")}>
      <button
        type="button"
        ref={buttonRef}
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen(!open)}
        className={clsx(
          "uc-tutorial-nav__button",
          "appearance-none border-none outline-none",
          "flex-1 min-w-0",
          "py-2 tutorial-md:py-2.5",
          "pl-4 tutorial-md:pl-6 pr-3",
          "bg-gray-200 dark:bg-gray-700",
          "flex gap-2 items-center justify-start",
          "rounded-[40px]",
          "cursor-pointer",
        )}
      >
        <div
          className={clsx(
            "h-4 tutorial-md:h-5",
            "flex-1 relative",
            "text-xs tutorial-md:text-sm",
            "leading-4 tutorial-md:leading-5",
            "text-gray-800 dark:text-gray-100",
          )}
        >
          <div
            className={clsx(
              "absolute inset-0",
              "text-left text-ellipsis whitespace-nowrap overflow-hidden",
              "select-none",
            )}
          >
            {unit ? (
              <>
                <span className="font-normal">{unit.title}</span>
                <span className="text-gray-400">{" / "}</span>
              </>
            ) : null}
            <span className="font-semibold">{metadata.title}</span>
          </div>
        </div>
        <TriangleDownIcon className="w-4 h-4 shrink-0 text-gray-400" />
      </button>
      <div
        ref={menuRef}
        role="menu"
        className={clsx(
          "uc-tutorial-nav__menu",
          "absolute top-full z-20",
          "w-full h-fit overflow-auto",
          open
            ? "opacity-100 translate-y-2 max-h-[calc(100dvh-140px)]"
            : "opacity-0 -translate-y-8 max-h-0 pointer-events-none",
          "transition-all ease-in-out duration-200",
          "shadow",
          "bg-gray-100 dark:bg-gray-700",
          "rounded-[20px]",
        )}
      >
        <div className={clsx("py-6", "text-sm leading-6", "flex flex-col gap-6")}>
          {tutorialUnits.map((u) => (
            <div key={u.id} className="flex flex-col">
              <div className={clsx("py-1 px-4", "flex items-center gap-1")}>
                <Check done={unitDone(u.items)} />
                <span
                  className={clsx(
                    "font-semibold",
                    unitDone(u.items)
                      ? "text-gray-500 dark:text-gray-400"
                      : "text-gray-700 dark:text-gray-200",
                  )}
                >
                  {u.title}
                </span>
              </div>
              {u.items
                .filter((item) => docs[item])
                .map((item) => (
                  <Link
                    key={item}
                    role="menuitem"
                    to={docs[item].path}
                    className={clsx(
                      "py-1 pl-8 pr-4",
                      "flex items-center gap-1",
                      "no-underline hover:no-underline",
                      item === metadata.id && "bg-gray-200 dark:bg-gray-600",
                      "hover:bg-gray-200 dark:hover:bg-gray-600",
                      visited[item]
                        ? "text-gray-500 dark:text-gray-400"
                        : "text-gray-700 dark:text-gray-200",
                    )}
                  >
                    <Check done={!!visited[item]} />
                    <span>{docs[item].title}</span>
                  </Link>
                ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const StepLink = ({ to, direction }: { to?: string; direction: "previous" | "next" }) => (
  <Link
    to={to}
    aria-label={direction === "previous" ? "Previous chapter" : "Next chapter"}
    aria-disabled={!to}
    onClick={to ? undefined : (e) => e.preventDefault()}
    className={clsx(
      "shrink-0",
      to ? "opacity-100 cursor-pointer" : "opacity-50 cursor-not-allowed",
      "p-2 tutorial-md:p-2.5",
      "text-gray-400 hover:text-gray-300",
      "bg-gray-100 dark:bg-refine-react-dark-code",
      "rounded-full",
    )}
  >
    <CommonCircleChevronLeft
      className={clsx(
        "w-4 h-4 tutorial-md:w-5 tutorial-md:h-5",
        direction === "next" && "rotate-180",
      )}
    />
  </Link>
);

export const TutorialNavigation = () => {
  const { metadata } = useDoc();
  const docs = useTutorialDocs();
  const next = getNext(metadata.id);
  const previous = getPrevious(metadata.id);

  return (
    <div className={clsx("flex flex-1 min-w-0 items-center justify-start", "max-w-[464px]", "gap-2")}>
      <StepLink direction="previous" to={previous ? docs[previous]?.path : undefined} />
      <NavigationDropdown />
      <StepLink direction="next" to={next ? docs[next]?.path : undefined} />
    </div>
  );
};
