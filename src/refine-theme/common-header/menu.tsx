import React from "react";
import clsx from "clsx";

import { MENU_ITEMS, type NavbarItemType } from "./constants";
import { MegaMenu } from "./mega-menu";
import { NavbarItem } from "./navbar-item";
import { NavbarPopoverItem } from "./navbar-popover-item";

type Props = {
  variant?: "landing" | "blog";
  align?: "left" | "right";
};

export const Menu: React.FC<Props> = ({ variant = "landing", align = "left" }) => {
  return (
    <>
      {MENU_ITEMS.map((item) => {
        if (item.isPopover) {
          return (
            <NavbarPopoverItem
              key={`navbar-${item.label}`}
              item={item}
              variant={variant}
              align={align}
            >
              <MegaMenu item={item} />
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
