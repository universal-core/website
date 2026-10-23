import React from "react";
import { FooterDiscordIcon } from "./icons/footer-discord";
import { FooterGithubIcon } from "./icons/footer-github";

export const menuItems = [
  {
    label: "Read",
    items: [
      { label: "Manifesto", href: "/manifesto/" },
      { label: "Foundations", href: "/foundations/" },
      { label: "Blog", href: "/blog" },
    ],
  },
  {
    label: "Build",
    items: [
      { label: "Documentation", href: "/docs/" },
      { label: "Tutorials", href: "/tutorials/" },
    ],
  },
  {
    label: "Community",
    items: [
      // TODO: point at the real community links once disclosure is decided.
      { label: "GitHub", href: "#" },
      { label: "Discord", href: "#" },
    ],
  },
];

export const secondaryMenuItems: { label: string; href: string }[] = [];

export const footerDescription =
  "A Metin2-lineage MMORPG engine where gameplay lives in Lua and Forge, not in engine patches.";

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
