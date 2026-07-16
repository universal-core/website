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
import { MobileMenuModal } from "./common-header/mobile-menu-modal";

export const HEADER_HEIGHT = 65;

type Variant = "docs" | "tutorial";

const Desktop = ({ variant }: { variant: Variant }) => {
  return (
    <div className={clsx("w-full", "hidden lg:flex items-center gap-6", "mx-auto")}>
      <Link
        to="/"
        aria-label="UniversalCore home"
        className={clsx("shrink-0", "hover:no-underline")}
      >
        <CoreSealLogo />
      </Link>

      <div className="flex-1" />

      {/* Nav on the right, matching the tutorial header. */}
      <nav className={clsx("hidden lg:flex items-center gap-1")}>
        <Menu variant="landing" />
      </nav>

      <div className={clsx("flex items-center gap-3")}>
        <SearchBar />
        {/* Version dropdown only makes sense on the versioned docs instance. */}
        {variant === "docs" && <DocVersionDropdown />}
      </div>
    </div>
  );
};

const Mobile = ({ variant }: { variant: Variant }) => {
  const [isOpen, setIsOpen] = useState(false);

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
          onClick={() => setIsOpen(true)}
          active={isOpen}
        />
      </div>
      {/* Tutorial has no docs sidebar → use the standard nav menu instead of
          DocSidebarModal (which calls useDocsSidebar and would throw). */}
      {variant === "tutorial" ? (
        <MobileMenuModal isModalOpen={isOpen} setIsModalOpen={setIsOpen} />
      ) : (
        <DocSidebarModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
      )}
    </div>
  );
};

export const DocHeader = ({ variant = "docs" }: { variant?: Variant }) => {
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
      <Desktop variant={variant} />
      <Mobile variant={variant} />
    </div>
  );
};
