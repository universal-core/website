import React from "react";
import { FooterDiscordIcon } from "./icons/footer-discord";
import { FooterGithubIcon } from "./icons/footer-github";

export const menuItems = [
  {
    label: "Resources",
    items: [
      {
        label: "Getting Started",
        href: "/docs/getting-started/quickstart",
      },
      {
        label: "Tutorial",
        href: "/tutorial/essentials/intro",
      },
      {
        label: "Blog",
        href: "/blog",
      },
    ],
  },
  {
    label: "Project",
    items: [
      {
        label: "Documentation",
        href: "/docs/",
      },
      {
        label: "Contributing",
        href: "/docs/guides-concepts/contributing/",
      },
    ],
  },
  {
    label: "Community",
    items: [
      // TODO: point at the real community links once disclosure is decided.
      {
        label: "GitHub",
        href: "#",
      },
      {
        label: "Discord",
        href: "#",
      },
    ],
  },
];

export const secondaryMenuItems = [
  {
    label: "Privacy Policy",
    href: "/privacy-policy",
  },
];

export const footerDescription =
  "An open, modular platform for building and shipping custom features — foundations, subsystems, developer experience and operations.";

export const socialLinks = [
  {
    icon: FooterGithubIcon,
    // TODO: real repo URL once disclosure is decided.
    href: "#",
  },
  {
    icon: FooterDiscordIcon,
    href: "#",
  },
];
