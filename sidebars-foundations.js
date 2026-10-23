/** @type {import("@docusaurus/plugin-content-docs").SidebarsConfig} */
module.exports = {
  foundationsSidebar: [
    "index",
    {
      type: "category",
      label: "Luna",
      collapsed: false,
      link: { type: "doc", id: "luna/index" },
      items: [
        "luna/bridge",
        "luna/transport",
        "luna/forge",
        "luna/event-bus",
        "luna/client",
        "luna/devtools",
        "luna/lua-annotations",
      ],
    },
  ],
};
