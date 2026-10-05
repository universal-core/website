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
        label: "Foundations",
        description: "Luna, Forge, the simulator, the render pipeline, UCHTML.",
        link: "/docs/foundations/",
        icon: AwesomeIcon,
      },
      {
        label: "Building blocks",
        description: "Affects, traits, skills, policies, arbiters, rankings.",
        link: "/docs/building-blocks/",
        icon: ExamplesIcon,
      },
      {
        label: "Gameplay systems",
        description: "Arena, avatar, guild war and the rest, built on top.",
        link: "/docs/gameplay/",
        icon: IntegrationsIcon,
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
