import SearchBar from "@theme/SearchBar";
import clsx from "clsx";
import Link from "@docusaurus/Link";
import React, { useState } from "react";
import { CommonHamburgerIcon } from "./common-hamburger-icon";
import { DocSearchButton } from "./doc-search-button";
import { DocSidebarModal } from "./doc-sidebar-modal";
import { DocVersionDropdown } from "./doc-version-dropdown";
import { CoreSealLogo } from "./icons/core-seal";
import { Menu } from "./common-header/menu";

export const HEADER_HEIGHT = 65;

const Desktop = () => {
  return (
    <div className={clsx("w-full", "hidden lg:flex items-center gap-6", "mx-auto")}>
      <Link
        to="/"
        aria-label="UniversalCore home"
        className={clsx("shrink-0", "hover:no-underline")}
      >
        <CoreSealLogo />
      </Link>

      <nav className={clsx("hidden lg:flex items-center gap-1")}>
        <Menu variant="landing" />
      </nav>

      <div className="flex-1" />

      <div className={clsx("flex items-center gap-3")}>
        <SearchBar />
        <DocVersionDropdown />
      </div>
    </div>
  );
};

export const Mobile = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div
      className={clsx("w-full", "flex lg:hidden items-center justify-between")}
    >
      <Link to="/" aria-label="UniversalCore home" className="hover:no-underline">
        <CoreSealLogo />
      </Link>
      <div className={clsx("flex items-center gap-4")}>
        <SearchBar
          CustomButton={React.forwardRef<
            HTMLButtonElement,
            React.PropsWithChildren<{}>
          >(function CustomButton(props, ref) {
            return <DocSearchButton ref={ref} {...props} iconOnly />;
          })}
        />
        <CommonHamburgerIcon
          onClick={() => setIsSidebarOpen(true)}
          active={isSidebarOpen}
        />
      </div>
      <DocSidebarModal
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />
    </div>
  );
};

export const DocHeader = () => {
  return (
    <div
      className={clsx(
        "flex items-center",
        "h-16",
        "z-10",
        "sticky",
        "top-0",
        "py-4 sm:py-3 px-4 sm:px-6",
        "bg-gray-0 dark:bg-gray-900",
        "border-b border-gray-300 dark:border-gray-700",
      )}
    >
      <Desktop />
      <Mobile />
    </div>
  );
};
