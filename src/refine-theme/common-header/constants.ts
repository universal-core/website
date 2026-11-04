export type MegaLink = {
  label: string;
  description: string;
  link: string;
};

export type MegaGroup = { title: string; items: MegaLink[] };

export type NavbarPopoverItemType = {
  isPopover: true;
  label: string;
  href: string;
  columns: MegaGroup[][];
  footer: MegaLink[];
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
    href: "/docs/",
    columns: [
      [
        {
          title: "Write gameplay in Lua",
          items: [
            {
              label: "Luna and Forge",
              description: "Modules, environments, bindings and engine events.",
              link: "/docs/core/luna-forge/setup",
            },
            {
              label: "Skills",
              description: "One file per skill: nodes, phases, triggers, descriptions.",
              link: "/docs/core/skills/file",
            },
            {
              label: "Traits",
              description: "Conditional mechanics in place of hardcoded points.",
              link: "/docs/core/traits/concepts",
            },
            {
              label: "Affects",
              description: "Timed state on a character, and what the client shows.",
              link: "/docs/core/affects/overview",
            },
            {
              label: "Player metrics",
              description: "Declare a counter once, read it everywhere.",
              link: "/docs/core/player-metrics/overview",
            },
            {
              label: "Virtual players",
              description: "Characters on a cached copy, transformers, the prize commit.",
              link: "/docs/core/player-virtualization/overview",
            },
          ],
        },
      ],
      [
        {
          title: "Set the rules",
          items: [
            {
              label: "Policies",
              description: "Item use, skill use, loadouts and party join, answered by registries.",
              link: "/docs/building-blocks/",
            },
            {
              label: "Combat and death",
              description: "Battle arbiter, teams, the death manager and spectators.",
              link: "/docs/building-blocks/battle-arbiter/",
            },
          ],
        },
        {
          title: "Test without a client",
          items: [
            {
              label: "Simulator",
              description: "A Lua driver stages a world and reads the outcome.",
              link: "/docs/core/simulator",
            },
          ],
        },
      ],
      [
        {
          title: "Build the client",
          items: [
            {
              label: "UCHTML",
              description: "HTML and Jinja2 rendered into native client windows.",
              link: "/docs/uchtml/",
            },
            {
              label: "Client Python",
              description: "Attach a debugger, and how imports resolve.",
              link: "/docs/core/debug-client-python",
            },
            {
              label: "Effects and materials",
              description: "Per-pixel shading for .mse effects, no server work.",
              link: "/docs/building-blocks/effects-and-materials",
            },
            {
              label: "ui.ShaderQuad",
              description: "A window drawn by your own pixel shader.",
              link: "/docs/building-blocks/ui-shader-quad",
            },
          ],
        },
      ],
    ],
    footer: [
      {
        label: "All docs",
        description: "the reference, layer by layer",
        link: "/docs/",
      },
      {
        label: "Your first Forge module",
        description: "a six-step tutorial",
        link: "/tutorials/first-forge-module",
      },
      {
        label: "In-game wiki",
        description: "a client built on UCHTML",
        link: "/docs/wiki/",
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
