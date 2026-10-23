import {
  DocumentsIcon,
  AwesomeIcon,
  ExamplesIcon,
  IntegrationsIcon,
  TutorialIcon,
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

export const MENU_ITEMS: MenuItemType[] = [
  {
    isPopover: true,
    label: "Docs",
    items: [
      {
        label: "Overview",
        description: "How the documentation is organised, layer by layer.",
        link: "/docs/",
        icon: DocumentsIcon,
      },
      {
        label: "Core",
        description: "Forge modules, UCHTML and the in-game wiki.",
        link: "/docs/core/",
        icon: AwesomeIcon,
      },
      {
        label: "Building blocks",
        description: "Policies and arbiters built on the core.",
        link: "/docs/building-blocks/",
        icon: ExamplesIcon,
      },
      {
        label: "In-game wiki",
        description: "UCHTML pages, Jinja2 context and component tags.",
        link: "/docs/wiki/",
        icon: TutorialIcon,
      },
    ],
  },
  {
    isPopover: false,
    label: "Foundations",
    href: "/foundations/",
  },
  {
    isPopover: false,
    label: "Manifesto",
    href: "/manifesto/",
  },
  {
    isPopover: false,
    label: "Tutorials",
    href: "/tutorials/",
  },
  {
    isPopover: false,
    label: "Blog",
    href: "/blog",
  },
];
