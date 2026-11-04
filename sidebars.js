/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const cat = (label, items, link) => ({
  type: "category",
  label,
  ...(link ? { link: { type: "doc", id: link } } : {}),
  items,
});

module.exports = {
  mainSidebar: [
    "index",
    {
      type: "category",
      label: "Core",
      className: "category-as-header",
      link: { type: "doc", id: "core/index" },
      items: [
        cat("Luna and Forge", [
          "core/luna-forge/setup",
          "core/luna-forge/environments",
          "core/luna-forge/api",
          "core/luna-forge/events",
          "core/luna-forge/bindings",
          "core/luna-forge/examples",
        ]),
        cat("Player", [
          cat("Player virtualization", [
            "core/player-virtualization/overview",
            "core/player-virtualization/hooks",
            "core/player-virtualization/custom-transformers",
            "core/player-virtualization/prize-commit",
            "core/player-virtualization/examples",
          ]),
          cat("Player metrics", [
            "core/player-metrics/overview",
            "core/player-metrics/api",
            "core/player-metrics/declare",
            "core/player-metrics/examples",
          ]),
        ]),
        cat("Characters", [
          cat("Affects", ["core/affects/overview", "core/affects/registration", "core/affects/lua-api", "core/affects/client", "core/affects/behaviour", "core/affects/examples", "core/affects/pitfalls"]),
          cat("Traits", ["core/traits/concepts", "core/traits/define", "core/traits/stage", "core/traits/binding", "core/traits/native", "core/traits/examples"]),
        ]),
        cat("Skills", [
          cat("Skill file", ["core/skills/nodes", "core/skills/collect-and-triggers", "core/skills/errors-and-examples"], "core/skills/file"),
          "core/skills/extension",
          "core/skills/descriptions",
        ]),
        cat("Simulator", ["core/simulator", "core/simulator-write-a-cube"]),
        cat("Client", ["core/debug-client-python", "core/client-python-imports"]),
      ],
    },
    {
      type: "category",
      label: "UCHTML",
      className: "category-as-header",
      link: { type: "doc", id: "uchtml/index" },
      items: [
        "uchtml/grid-system",
        "uchtml/jinja2",
        "uchtml/jinja2-context",
        "uchtml/reactive-zones",
        "uchtml/compiled-templates",
        cat("Tags", [
          "uchtml/components-common",
          "uchtml/components-layout",
          "uchtml/components-filters",
          "uchtml/components-text",
          "uchtml/components-widgets",
        ]),
      ],
    },
    {
      type: "category",
      label: "Building blocks",
      className: "category-as-header",
      link: { type: "doc", id: "building-blocks/index" },
      items: [
        cat("Policies and managers", [
          cat("Combat", [
            cat("Battle arbiter", ["building-blocks/battle-arbiter/behaviour", "building-blocks/battle-arbiter/examples"], "building-blocks/battle-arbiter/index"),
            cat("Team manager", ["building-blocks/team-manager/behaviour", "building-blocks/team-manager/examples"], "building-blocks/team-manager/index"),
            cat("Death manager", ["building-blocks/death-manager/behaviour", "building-blocks/death-manager/examples"], "building-blocks/death-manager/index"),
            cat("Spectator", ["building-blocks/spectator/behaviour", "building-blocks/spectator/examples"], "building-blocks/spectator/index"),
          ]),
          cat("Items and skills", [
            cat("Item use policy", ["building-blocks/item-use-policy/behaviour", "building-blocks/item-use-policy/examples"], "building-blocks/item-use-policy/index"),
            "building-blocks/skill-use-policy",
            "building-blocks/skill-policy",
            "building-blocks/loadout-policy",
            "building-blocks/loadout-policy-examples",
          ]),
          cat("Social", [cat("Party join policy", ["building-blocks/party-join-policy/behaviour", "building-blocks/party-join-policy/examples"], "building-blocks/party-join-policy/index")]),
        ]),
        cat("VFX", ["building-blocks/effects-and-materials"]),
        cat("Client widgets", ["building-blocks/ui-shader-quad"]),
      ],
    },
    {
      type: "category",
      label: "In-game wiki",
      className: "category-as-header",
      link: { type: "doc", id: "wiki/index" },
      items: [
        "wiki/quickstart",
        "wiki/configuration",
        "wiki/url",
        "wiki/data-generation",
        cat("Data namespaces", ["wiki/data-core", "wiki/data-item", "wiki/data-world"]),
        cat("Tags", ["wiki/tags-items", "wiki/tags-mobs", "wiki/tags-clients"]),
      ],
    },
  ],
};
