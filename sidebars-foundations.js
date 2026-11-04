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
    "policies/index",
    "affects/index",
    "traits/index",
    {
      type: "category",
      label: "Skills",
      collapsed: false,
      link: { type: "doc", id: "skills/index" },
      items: [
        "skills/one-file",
        "skills/nodes-and-phases",
        "skills/beyond-the-formula",
        "skills/owners-and-cores",
        "skills/policies",
      ],
    },
    "player-metrics/index",
    "player-virtualization/index",
    "simulator/index",
    "uchtml/index",
    "rhi/index",
  ],
};
