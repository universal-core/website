import React from "react";
import Link from "@docusaurus/Link";
import clsx from "clsx";

import type { NavbarItemType } from "./constants";

type NavbarItemProps = {
  item: NavbarItemType;
  variant?: "landing" | "blog";
};

export const NavbarItem: React.FC<NavbarItemProps> = ({ item }) => {
  const Icon = item.icon;

  return (
    <Link
      key={item.label}
      to={item.href}
      className={clsx(
        "inline-flex items-center gap-2",
        "px-3 py-1.5 rounded-[3px]",
        "text-[14px] font-medium leading-6",
        "text-gray-400 hover:text-gray-0",
        "hover:bg-white/[0.04]",
        "transition-colors duration-150",
        "no-underline hover:no-underline",
      )}
    >
      {item.label}
      {Icon && <Icon />}
    </Link>
  );
};
