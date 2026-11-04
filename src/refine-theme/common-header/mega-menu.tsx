import React from "react";
import Link from "@docusaurus/Link";
import clsx from "clsx";

import type { MegaGroup, MegaLink, NavbarPopoverItemType } from "./constants";

const Group: React.FC<{ group: MegaGroup }> = ({ group }) => (
  <div>
    <div className="px-3 pb-2 text-[12px] font-medium text-gray-500">
      {group.title}
    </div>
    <ul className="m-0 list-none p-0">
      {group.items.map((it) => (
        <li key={it.link}>
          <Link
            to={it.link}
            className={clsx(
              "block rounded-[4px] px-3 py-2 no-underline",
              "transition-colors duration-150",
              "hover:bg-white/[0.05]",
            )}
          >
            <span className="block text-[14px] font-semibold text-gray-0">
              {it.label}
            </span>
            <span className="mt-0.5 block text-[12.5px] leading-snug text-gray-400">
              {it.description}
            </span>
          </Link>
        </li>
      ))}
    </ul>
  </div>
);

const Footer: React.FC<{ links: MegaLink[] }> = ({ links }) => (
  <div
    className={clsx(
      "flex flex-wrap gap-x-6 gap-y-2",
      "border-t border-gray-700",
      "px-6 py-3",
      "text-[13px]",
    )}
  >
    {links.map((l) => (
      <Link key={l.link} to={l.link} className="no-underline group">
        <span className="font-medium text-gray-100 group-hover:text-gray-0">
          {l.label}
        </span>
        <span className="text-gray-500">, {l.description}</span>
      </Link>
    ))}
  </div>
);

export const MegaMenu: React.FC<{
  item: NavbarPopoverItemType;
  stacked?: boolean;
}> = ({ item, stacked }) => (
  <div>
    <div
      className={clsx(
        stacked
          ? "flex flex-col gap-5 py-3"
          : "grid w-[880px] grid-cols-3 gap-6 p-4 pt-5",
      )}
    >
      {item.columns.map((col, i) => (
        <div key={i} className="flex flex-col gap-5">
          {col.map((g) => (
            <Group key={g.title} group={g} />
          ))}
        </div>
      ))}
    </div>
    <Footer links={item.footer} />
  </div>
);
