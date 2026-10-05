/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
module.exports = {
  mainSidebar: [
    "index",
    {
      type: "category",
      label: "Foundations",
      className: "category-as-header",
      link: { type: "doc", id: "foundations/index" },
      items: [
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
      items: [],
    },
    {
      type: "category",
      label: "Gameplay systems",
      className: "category-as-header",
      link: { type: "doc", id: "gameplay/index" },
      items: [],
    },
  ],
};
