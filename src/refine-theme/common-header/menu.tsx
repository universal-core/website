import React from "react";
import clsx from "clsx";

import { MENU_ITEMS, type NavbarItemType } from "./constants";
import { MenuItem } from "./menu-item";
import { NavbarItem } from "./navbar-item";
import { NavbarPopoverItem } from "./navbar-popover-item";

type Props = {
  variant?: "landing" | "blog";
};

export const Menu: React.FC<Props> = ({ variant = "landing" }) => {
  return (
    <>
      {MENU_ITEMS.map((item) => {
        if (item.isPopover) {
          return (
            <NavbarPopoverItem
              key={`navbar-${item.label}`}
              item={item}
              variant={variant}
            >
              <div
                className={clsx(
                  "grid grid-cols-2 gap-4",
                  "p-4",
                  "w-[672px]",
                  "bg-white",
                  variant === "landing" && " dark:bg-gray-900",
                  variant === "blog" && "dark:bg-refine-react-dark-code",
                )}
              >
                {item.items.map((subItem) => (
                  <MenuItem
                    key={subItem.label}
                    item={subItem}
                    variant={variant}
                  />
                ))}
              </div>
            </NavbarPopoverItem>
          );
        }

        return (
          <NavbarItem
            key={`navbar-${item.label}`}
            item={item as NavbarItemType}
            variant={variant}
          />
        );
      })}
    </>
  );
};
