import {
  DocumentsIcon,
  AwesomeIcon,
  ExamplesIcon,
  IntegrationsIcon,
  TutorialIcon,
  ContributeIcon,
} from "../icons/popover";

export type NavbarPopoverItemType = {
  isPopover: true;
  label: string;
  items: {
    label: string;
    description: string;
    link: string;
    icon: React.FC;
  }[];
};

export type NavbarItemType = {
  isPopover?: false;
  label: string;
  icon?: React.FC;
  href?: string;
};

export type MenuItemType = NavbarPopoverItemType | NavbarItemType;

/* "Docs" opens a mega-menu of the platform's macro-categories.
   Links point at /docs for now — repoint to each category root as the
   documentation is authored. */
export const MENU_ITEMS: MenuItemType[] = [
  {
    isPopover: true,
    label: "Docs",
    items: [
      {
        label: "Getting Started",
        description: "Install, configure and ship your first feature.",
        link: "/docs/getting-started/quickstart",
        icon: DocumentsIcon,
      },
      {
        label: "Foundations",
        description: "The scripting core, messaging and extension model.",
        link: "/docs/",
        icon: AwesomeIcon,
      },
      {
        label: "Subsystems",
        description: "Avatars, dungeons, skills — built on the core.",
        link: "/docs/",
        icon: ExamplesIcon,
      },
      {
        label: "Declarative Config",
        description: "Drops, affects and UI as YAML + Lua.",
        link: "/docs/",
        icon: IntegrationsIcon,
      },
      {
        label: "Developer Experience",
        description: "Compiler, source maps and the remote debugger.",
        link: "/docs/",
        icon: TutorialIcon,
      },
      {
        label: "Operations",
        description: "Logging, profiling and the server backoffice.",
        link: "/docs/",
        icon: ContributeIcon,
      },
    ],
  },
  {
    isPopover: false,
    label: "Tutorial",
    href: "/tutorial/essentials/intro",
  },
  {
    isPopover: false,
    label: "Blog",
    href: "/blog",
  },
];
