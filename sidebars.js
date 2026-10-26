/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
module.exports = {
  mainSidebar: [
    "index",
    {
      type: "category",
      label: "Core",
      className: "category-as-header",
      link: { type: "doc", id: "core/index" },
      items: [
        "core/luna-forge",
        {
          type: "category",
          label: "UCHTML and the in-game wiki",
          link: { type: "doc", id: "wiki/index" },
          items: [
            "wiki/quickstart",
            "wiki/grid-system",
            "wiki/jinja2",
            "wiki/jinja2-context",
            "wiki/ui-components",
            "wiki/configuration",
            "wiki/url",
            "wiki/data-generation",
          ],
        },
      ],
    },
    {
      type: "category",
      label: "Building blocks",
      className: "category-as-header",
      link: { type: "doc", id: "building-blocks/index" },
      items: [
        "building-blocks/battle-arbiter",
        "building-blocks/team-manager",
        "building-blocks/death-manager",
        "building-blocks/item-use-policy",
        "building-blocks/spectator",
        "building-blocks/party-join-policy",
        "building-blocks/affects",
        "building-blocks/traits",
        "building-blocks/skill-extension",
        "building-blocks/skill-file",
        "building-blocks/skill-use-policy",
        "building-blocks/skill-descriptions",
        "building-blocks/skill-policy",
        "building-blocks/loadout-policy",
      ],
    },
  ],
};
