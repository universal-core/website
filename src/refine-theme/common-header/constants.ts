import {
  DocumentsIcon,
  AwesomeIcon,
  ExamplesIcon,
  IntegrationsIcon,
  UseCasesIcon,
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
    isPopover: false,
    label: "Foundations",
    href: "/foundations/",
  },
  {
    isPopover: true,
    label: "Docs",
    items: [
      {
        label: "Core",
        description: "Luna and Forge, player, characters, skills, simulator and client Python.",
        link: "/docs/core/",
        icon: AwesomeIcon,
      },
      {
        label: "UCHTML",
        description: "HTML and Jinja2 rendered into native client UI: grid, templating, components.",
        link: "/docs/uchtml/",
        icon: IntegrationsIcon,
      },
      {
        label: "Building blocks",
        description: "Policies and managers, VFX materials and client widgets built on the core.",
        link: "/docs/building-blocks/",
        icon: ExamplesIcon,
      },
      {
        label: "In-game wiki",
        description: "The wiki client of UCHTML: quickstart, configuration, URLs and data.",
        link: "/docs/wiki/",
        icon: UseCasesIcon,
      },
      {
        label: "All docs",
        description: "The full reference, layer by layer.",
        link: "/docs/",
        icon: DocumentsIcon,
      },
    ],
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
  {
    isPopover: false,
    label: "Manifesto",
    href: "/manifesto/",
  },
];
