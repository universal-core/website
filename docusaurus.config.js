/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

require("dotenv").config();


const admonitions = {
  tag: ":::",
  keywords: [
    "additional",
    "note",
    "tip",
    "info-tip",
    "info",
    "caution",
    "danger",
    "sourcecode",
    "create-example",
    "simple",
  ],
};

// UniversalCore "Forge" syntax theme — token colors from universalcore-design.
const forgePrism = {
  plain: { color: "#cfc8bb", backgroundColor: "transparent" },
  styles: [
    { types: ["comment", "prolog", "cdata"], style: { color: "#6b6b7a", fontStyle: "italic" } },
    { types: ["keyword", "boolean", "rule", "atrule", "important"], style: { color: "#e3799b" } },
    { types: ["tag", "deleted", "symbol"], style: { color: "#b79cf2" } },
    { types: ["attr-name"], style: { color: "#8fb8e8" } },
    { types: ["string", "char", "attr-value", "inserted", "url"], style: { color: "#7fd1c0" } },
    { types: ["function", "function-variable", "class-name", "maybe-class-name"], style: { color: "#c9b4ff" } },
    { types: ["number"], style: { color: "#d6a8f0" } },
    { types: ["operator", "punctuation"], style: { color: "#837f8c" } },
    { types: ["variable", "constant", "property", "parameter"], style: { color: "#6fc0e0" } },
    { types: ["selector", "builtin", "namespace"], style: { color: "#a78bf5" } },
  ],
};

/** @type {import('@docusaurus/types/src/index').DocusaurusConfig} */
const siteConfig = {
  title: "UniversalCore",
  tagline: "Extend the game without touching the engine",
  url: "http://universalcore.mentalgone.com",
  deploymentBranch: "gh-pages",
  baseUrl: "/",
  projectName: "website",
  organizationName: "universal-core",
  trailingSlash: true,
  favicon: "img/favicon.ico",
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "throw",
  presets: [
    [
      "@docusaurus/preset-classic",
      {
        docs: process.env.DISABLE_DOCS
          ? false
          : {
              path: "./docs",
              sidebarPath: require.resolve("./sidebars.js"),
              // editUrl intentionally omitted until the public repo is decided.
              showLastUpdateAuthor: true,
              showLastUpdateTime: true,
              admonitions,
              exclude: ["**/**/_*.md"],
            },
        blog: false,
        theme: {
          customCss: [
            require.resolve("./src/refine-theme/css/colors.css"),
            require.resolve("./src/refine-theme/css/fonts.css"),
            require.resolve("./src/refine-theme/css/custom.css"),
            require.resolve("./src/css/custom.css"),
            require.resolve("./src/css/split-pane.css"),
            require.resolve("./src/css/demo-page.css"),
            require.resolve("./src/refine-theme/css/forge.css"),
          ],
        },
        sitemap: {
          ignorePatterns: ["**/_*.md"],
        },
      },
    ],
  ],
  themes: [
    [
      require.resolve("@easyops-cn/docusaurus-search-local"),
      {
        hashed: true,
        language: ["en"],
        indexDocs: true,
        docsDir: ["docs", "foundations", "manifesto", "tutorials"],
        docsRouteBasePath: ["docs", "foundations", "manifesto", "tutorials"],
        indexBlog: true,
        blogDir: "blog",
        blogRouteBasePath: "blog",
        indexPages: false,
        highlightSearchTermsOnTargetPage: true,
        explicitSearchResultPath: true,
      },
    ],
  ],
  plugins: [
    async function tailwindcss() {
      return {
        name: "docusaurus-tailwindcss",
        configurePostCss(postcssOptions) {
          postcssOptions.plugins.push(require("tailwindcss"));
          postcssOptions.plugins.push(require("autoprefixer"));
          return postcssOptions;
        },
      };
    },
    function customWebpackPlugin() {
      return {
        name: "custom-webpack-plugin",
        configureWebpack(config, isServer) {
          // Return an object that merges with the existing webpack config
          return {
            resolve: {
              alias: {
                ...config.resolve?.alias,
              },
              fallback: {
                ...config.resolve?.fallback,
                buffer: require.resolve("buffer/"),
                stream: require.resolve("stream-browserify"),
              },
            },
          };
        },
      };
    },
    function fixJsxRuntimePlugin() {
      return {
        name: "fix-jsx-runtime-plugin",
        configureWebpack(config, isServer) {
          // Add or merge additional module.rules
          return {
            module: {
              rules: [
                {
                  // For .mjs or .js files, let Webpack ignore fullySpecified
                  test: /\.m?js$/,
                  resolve: {
                    fullySpecified: false,
                  },
                },
              ],
            },
          };
        },
      };
    },
    ...(process.env.DISABLE_BLOG
      ? []
      : [
          [
            "./plugins/blog-plugin.js",
            {
              blogTitle: "Blog",
              blogDescription:
                "Notes, deep dives and release notes from inside UniversalCore",
              routeBasePath: "/blog",
              postsPerPage: 12,
              blogSidebarTitle: "All posts",
              blogSidebarCount: 0,
              feedOptions: {
                type: "all",
                copyright: `Copyright © ${new Date().getFullYear()} UniversalCore.`,
              },
            },
          ],
        ]),
    [
      "@docusaurus/plugin-client-redirects",
      {
        // The docs layer "Foundations" became "Core" when Foundations became its own section.
        createRedirects(existingPath) {
          if (existingPath.startsWith("/docs/core")) {
            return [existingPath.replace("/docs/core", "/docs/foundations")];
          }
          return undefined;
        },
      },
    ],
    [
      "@docusaurus/plugin-content-docs",
      {
        id: "foundations",
        path: "foundations",
        routeBasePath: "foundations",
        sidebarPath: require.resolve("./sidebars-foundations.js"),
        admonitions,
      },
    ],
    [
      "@docusaurus/plugin-content-docs",
      {
        id: "manifesto",
        path: "manifesto",
        routeBasePath: "manifesto",
        sidebarPath: require.resolve("./sidebars-manifesto.js"),
        admonitions,
      },
    ],
    [
      "@docusaurus/plugin-content-docs",
      {
        id: "tutorials",
        path: "tutorials",
        routeBasePath: "tutorials",
        sidebarPath: require.resolve("./sidebars-tutorials.js"),
        admonitions,
      },
    ],
  ],
  themeConfig: {
    prism: {
      theme: forgePrism,
      darkTheme: forgePrism,
      magicComments: [
        // Remember to extend the default highlight class name as well!
        {
          className: "theme-code-block-highlighted-line",
          line: "highlight-next-line",
          block: { start: "highlight-start", end: "highlight-end" },
        },
        {
          className: "code-block-hidden",
          line: "hide-next-line",
          block: { start: "hide-start", end: "hide-end" },
        },
        {
          className: "theme-code-block-added-line",
          line: "added-line",
          block: { start: "added-start", end: "added-end" },
        },
        {
          className: "theme-code-block-removed-line",
          line: "removed-line",
          block: { start: "removed-start", end: "removed-end" },
        },
      ],
    },
    image: "img/uc-social.png",
    metadata: [
      {
        name: "keywords",
        content: "metin2, mmorpg, game engine, lua, server, scripting",
      },
    ],
    navbar: {
      title: "UniversalCore",
      items: [
        { to: "docs", label: "Docs", position: "left" },
        { to: "foundations", label: "Foundations", position: "left" },
        { to: "manifesto", label: "Manifesto", position: "left" },
        { to: "tutorials", label: "Tutorials", position: "left" },
        { to: "blog", label: "Blog", position: "left" },
      ],
    },
    docs: {
      sidebar: {
        autoCollapseCategories: true,
      },
    },
    colorMode: {
      defaultMode: "dark",
      disableSwitch: true,
      respectPrefersColorScheme: false,
    },
  },
  webpack: {
    jsLoader: (isServer) => ({
      loader: require.resolve("swc-loader"),
      options: {
        jsc: {
          parser: {
            syntax: "typescript",
            tsx: true,
          },
          target: "es2017",
        },
        module: {
          type: isServer ? "commonjs" : "es6",
        },
      },
    }),
  },
};

module.exports = siteConfig;
