import React, { Fragment, useState } from "react";
import { useLocation } from "@docusaurus/router";
import { Popover, Transition } from "@headlessui/react";
import clsx from "clsx";

import { ChevronDownIcon } from "../icons/chevron-down";
import type { NavbarPopoverItemType } from "./constants";

type NavbarPopoverItemProps = {
  item: NavbarPopoverItemType;
  variant?: "landing" | "blog";
};

export const NavbarPopoverItem: React.FC<NavbarPopoverItemProps> = ({
  item,
  children,
}) => {
  const [isShowing, setIsShowing] = useState(false);
  const timeoutRef = React.useRef(null);
  const timeoutEnterRef = React.useRef(null);
  const location = useLocation();

  React.useEffect(() => {
    setIsShowing(false);
  }, [location]);

  return (
    <Popover
      id={`popover-${item.label}`}
      key={item.label}
      className={clsx("relative", "inline-flex items-center")}
      onMouseEnter={() => {
        timeoutEnterRef.current = setTimeout(() => setIsShowing(true), 150);
        clearTimeout(timeoutRef.current);
      }}
      onMouseLeave={() => {
        timeoutRef.current = setTimeout(() => setIsShowing(false), 150);
        clearTimeout(timeoutEnterRef.current);
      }}
    >
      {() => (
        <>
          <Popover.Button
            className={clsx(
              "inline-flex items-center gap-1",
              "px-3 py-1.5 rounded-[3px]",
              "text-[14px] font-medium leading-6",
              "outline-none",
              "transition-colors duration-150",
              "text-gray-400 hover:text-gray-0 hover:bg-white/[0.04]",
              isShowing && "text-gray-0 bg-white/[0.04]",
            )}
          >
            {item.label}
            <ChevronDownIcon
              aria-hidden="true"
              className={clsx(
                "transition-transform duration-150 ease-out",
                "text-gray-500",
                isShowing && "rotate-180 text-gray-300",
              )}
            />
          </Popover.Button>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-150"
            enterFrom="opacity-0 translate-y-2"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-2"
            show={isShowing}
          >
            <Popover.Panel
              static
              className={clsx("absolute", "z-50", "left-0", "top-full", "pt-3")}
            >
              <div
                className={clsx(
                  "overflow-hidden",
                  "rounded-[6px]",
                  "border border-gray-700",
                  "bg-gray-900",
                  "dark:shadow-menu-dark shadow-menu-light",
                )}
              >
                {children}
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
};
