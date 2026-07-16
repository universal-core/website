import React from "react";
import clsx from "clsx";

import SearchBar from "../theme/SearchBar";

import { CommonHamburgerIcon } from "./common-hamburger-icon";
import { DocSearchButton } from "./doc-search-button";
import { TutorialNavigation } from "./tutorial-navigation";
import { Dialog, Transition } from "@headlessui/react";
import { CoreSealLogo } from "./icons/core-seal";
import { Menu } from "./common-header/menu";

import Link from "@docusaurus/Link";

export const HEADER_HEIGHT = 65;

const TutorialModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  return (
    <Transition appear show={isOpen} as={React.Fragment}>
      <Dialog as="div" className="relative z-mobileNavbar" onClose={onClose}>
        <Transition.Child
          as={React.Fragment}
          enter="ease-out duration-75"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-75"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-0 dark:bg-gray-900" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-start justify-center">
            <Transition.Child
              as={React.Fragment}
              enter="ease-out duration-75"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-75"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Panel
                className={clsx("w-full h-[100dvh]", "flex flex-col", "px-2")}
              >
                <div
                  className={clsx(
                    "py-4",
                    "px-2",
                    "w-full h-16",
                    "flex items-center justify-between",
                  )}
                >
                  <Link to="/" className="hover:no-underline">
                    <CoreSealLogo />
                  </Link>
                  <div className={clsx("flex items-center gap-4")}>
                    <CommonHamburgerIcon onClick={onClose} active={true} />
                  </div>
                </div>

                <div
                  className={clsx(
                    "relative",
                    "w-full max-w-[480px]",
                    "flex",
                    "flex-col",
                    "mx-auto",
                    "rounded-lg",
                    "border border-gray-300 dark:border-gray-600",
                    "flex flex-col gap-0",
                  )}
                >
                  <div
                    className={clsx(
                      "flex items-center justify-between",
                      "gap-10",
                      "px-4",
                      "py-4",
                      "border-b border-b-gray-200 dark:border-b-gray-600",
                    )}
                  >
                    <Link
                      to="/"
                      className={clsx(
                        "text-sm",
                        "no-underline",
                        "hover:no-underline",
                        "font-semibold",
                        "text-gray-800 dark:text-gray-100",
                      )}
                    >
                      Home
                    </Link>
                  </div>
                  <div
                    className={clsx(
                      "flex items-center justify-between",
                      "gap-10",
                      "px-4",
                      "py-4",
                    )}
                  >
                    <Link
                      to="/docs"
                      className={clsx(
                        "text-sm",
                        "no-underline",
                        "hover:no-underline",
                        "font-semibold",
                        "text-gray-800 dark:text-gray-100",
                      )}
                    >
                      Documentation
                    </Link>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

const Header = () => {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

  return (
    <div className={clsx("w-full", "flex", "items-center", "mx-auto", "gap-6")}>
      <div
        className={clsx(
          "flex-1",
          "flex",
          "justify-start",
          "items-center",
          "gap-6",
          "tutorial-md:gap-12",
          "max-w-[656px]",
        )}
      >
        <Link to="/" aria-label="UniversalCore home" className="hover:no-underline shrink-0">
          <CoreSealLogo />
        </Link>
        <div className={clsx("hidden", "tutorial-sm:flex", "flex-1")}>
          <TutorialNavigation />
        </div>
      </div>
      <div
        className={clsx(
          "flex-shrink-0",
          "ml-auto",
          "tutorial-lg:flex-1",
          "flex",
          "justify-end",
          "items-center",
          "gap-2",
        )}
      >
        <nav
          className={clsx(
            "hidden tutorial-lg:flex items-center gap-1",
            "mr-2",
          )}
        >
          <Menu variant="landing" />
        </nav>
        <div
          className={clsx("hidden tutorial-md:flex items-center justify-start")}
        >
          <SearchBar />
        </div>

        <div className={clsx("tutorial-md:hidden flex")}>
          <SearchBar
            CustomButton={React.forwardRef<
              HTMLButtonElement,
              React.PropsWithChildren<{}>
            >(function CustomButton(props, ref) {
              return <DocSearchButton ref={ref} {...props} iconOnly />;
            })}
          />
        </div>

        <CommonHamburgerIcon
          onClick={() => setIsSidebarOpen(true)}
          active={isSidebarOpen}
          className="flex tutorial-md:!hidden"
        />
      </div>
      <TutorialModal
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />
    </div>
  );
};

export const MobileNavigation = () => {
  return (
    <div
      className={clsx(
        "flex tutorial-sm:hidden",
        "pt-4",
        "w-full",
        "max-w-[464px]",
      )}
    >
      <TutorialNavigation />
    </div>
  );
};

export const TutorialHeader = React.memo(function TutorialHeaderComponent() {
  return (
    <div
      className={clsx(
        "flex items-center justify-center",
        "flex-col",
        "z-10",
        "sticky",
        "top-0",
        "py-4 pb-[15px] tutorial-sm:pt-[15px] tutorial-sm:pb-[16px] px-4 tutorial-md:px-6 tutorial-md:pt-[11px] tutorial-md:pb-[10px]",
        "bg-gray-0 dark:bg-gray-900",
        "border-b border-gray-300 dark:border-gray-700",
      )}
    >
      <Header />
      <MobileNavigation />
    </div>
  );
});
