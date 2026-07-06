import Link from "@docusaurus/Link";
import clsx from "clsx";
import { motion, useScroll, useTransform } from "framer-motion";
import React, { useState } from "react";

import { HamburgerIcon } from "./icons/hamburger";
import { CoreSealLogo } from "./icons/core-seal";

import { Menu } from "./common-header/menu";
import { MobileMenuModal } from "./common-header/mobile-menu-modal";
import SearchBar from "../theme/SearchBar";

type Props = {
  hasSticky?: boolean;
  trackProgress?: boolean;
  className?: string;
  variant?: "landing" | "blog";
};

export const CommonHeader = ({
  trackProgress,
  variant = "landing",
  className,
}: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { scrollYProgress } = useScroll();

  const progressPercentage = useTransform(
    scrollYProgress,
    [0.03, 0.95],
    ["0%", "100%"],
  );

  return (
    <header className={clsx("sticky", "top-0", "z-10")}>
      <div
        className={clsx(
          "absolute",
          "top-0 left-0 right-0",
          "backdrop-blur-[6px]",
          "landing-md:backdrop-blur-[12px]",
          "z-[-1]",
          "bg-gray-0 dark:bg-gray-900",
          "bg-opacity-80 dark:bg-opacity-80",
          "pointer-events-none",
          className,
        )}
        style={{
          top: "-20px",
          bottom: "-80px",
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent 0, transparent calc(0% + 20px), black calc(0% + 20px), black calc(100% - 80px), transparent calc(100% - 80px))",
          maskImage:
            "linear-gradient(to bottom, transparent 0, transparent calc(0% + 20px), black calc(0% + 20px), black calc(100% - 80px), transparent calc(100% - 80px))",
        }}
      />
      <div
        className={clsx(
          "relative",
          "z-[1]",
          "p-4",
          "landing-sm:px-8",
          "landing-md:py-5",
        )}
      >
        <div
          className={clsx(
            "mx-auto",
            "flex",
            "items-center",
            "gap-6",
            "max-w-[896px]",
            "landing-lg:max-w-[1200px]",
          )}
        >
          <Link
            to="/"
            aria-label="UniversalCore home"
            className={clsx("shrink-0", "hover:no-underline")}
          >
            <CoreSealLogo />
          </Link>

          {/* desktop nav links */}
          <nav
            className={clsx(
              "hidden landing-md:flex",
              "items-center",
              "gap-1",
              "landing-md:ml-4 landing-lg:ml-8",
            )}
          >
            <Menu variant={variant} />
          </nav>

          {/* spacer */}
          <div className="flex-1" />

          {/* right side (desktop) */}
          <div
            className={clsx(
              "hidden landing-md:flex",
              "items-center",
              "gap-2",
            )}
          >
            <SearchBar variant="landing" />
          </div>

          {/* mobile hamburger */}
          <button
            type="button"
            aria-label="Open menu"
            className={clsx(
              "text-gray-0",
              "ml-auto",
              "block landing-md:hidden",
            )}
            onClick={() => setIsModalOpen(true)}
          >
            <HamburgerIcon />
          </button>

          <MobileMenuModal
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
          />
        </div>
      </div>
      {trackProgress && (
        <div
          className={clsx(
            "w-full",
            "h-[1px]",
            "translate",
            "bg-refine-react-3 dark:bg-refine-react-7",
          )}
        >
          <motion.div
            className={clsx(
              "h-full",
              "bg-refine-react-light-link dark:bg-refine-react-dark-link",
            )}
            style={{ width: progressPercentage }}
          />
        </div>
      )}
    </header>
  );
};
