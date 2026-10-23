import React from "react";
import clsx from "clsx";
import Link from "@docusaurus/Link";
import SearchBar from "@theme/SearchBar";

import { CommonHamburgerIcon } from "./common-hamburger-icon";
import { CoreSealLogo } from "./icons/core-seal";
import { Menu } from "./common-header/menu";
import { MobileMenuModal } from "./common-header/mobile-menu-modal";
import { TutorialNavigation } from "./tutorial-navigation";

const Header = () => {
  const [menuOpen, setMenuOpen] = React.useState(false);

  return (
    <div className={clsx("w-full", "flex items-center", "mx-auto", "gap-6")}>
      <div
        className={clsx(
          "flex-1 min-w-0",
          "flex justify-start items-center",
          "gap-6 tutorial-md:gap-12",
          "max-w-[656px]",
        )}
      >
        <Link to="/" aria-label="UniversalCore home" className="hover:no-underline shrink-0">
          <CoreSealLogo />
        </Link>
        <div className={clsx("hidden tutorial-sm:flex", "flex-1 min-w-0")}>
          <TutorialNavigation />
        </div>
      </div>
      <div
        className={clsx(
          "flex-shrink-0 ml-auto",
          "tutorial-lg:flex-1",
          "flex justify-end items-center",
          "gap-2",
        )}
      >
        <nav className={clsx("hidden tutorial-lg:flex items-center gap-1", "mr-2")}>
          <Menu variant="landing" align="right" />
        </nav>
        <SearchBar />
        <CommonHamburgerIcon
          onClick={() => setMenuOpen(true)}
          active={menuOpen}
          className="flex tutorial-lg:!hidden"
        />
      </div>
      <MobileMenuModal isModalOpen={menuOpen} setIsModalOpen={setMenuOpen} />
    </div>
  );
};

const MobileNavigation = () => (
  <div className={clsx("flex tutorial-sm:hidden", "pt-3", "w-full")}>
    <TutorialNavigation />
  </div>
);

export const TutorialHeader = React.memo(function TutorialHeaderComponent() {
  return (
    <div
      className={clsx(
        "uc-tutorial-header",
        "flex items-center justify-center flex-col",
        "z-10 shrink-0",
        "py-3 px-4 tutorial-md:px-6",
        "bg-gray-0 dark:bg-gray-900",
        "border-b border-gray-300 dark:border-gray-700",
      )}
    >
      <Header />
      <MobileNavigation />
    </div>
  );
});
