/**
 * @jest-environment node
 */
import * as fs from "fs";
import * as path from "path";

const ROOT = path.resolve(__dirname, "..");

type FrontMatter = Record<string, string | string[] | boolean | number>;

// Frontmatter is restricted to flat `key: value` lines and inline `[a, b]` lists,
// so this parser is the schema as much as the checks below are.
const parseFrontMatter = (file: string): FrontMatter => {
  const text = fs.readFileSync(file, "utf8");
  const match = text.match(/^---\n([\s\S]*?)\n---\n/);
  if (!match) throw new Error(`${file}: missing frontmatter`);

  const data: FrontMatter = {};
  for (const line of match[1].split("\n")) {
    if (!line.trim() || line.trim().startsWith("#")) continue;
    const kv = line.match(/^([a-z_]+):\s*(.*)$/);
    if (!kv) throw new Error(`${file}: frontmatter line is not flat: "${line}"`);
    const [, key, raw] = kv;
    const value = raw.replace(/^(["'])(.*)\1$/, "$2");
    if (/^\[.*\]$/.test(value)) {
      data[key] = value
        .slice(1, -1)
        .split(",")
        .map((v) => v.trim())
        .filter(Boolean);
    } else if (value === "true" || value === "false") {
      data[key] = value === "true";
    } else if (/^\d+$/.test(value)) {
      data[key] = Number(value);
    } else {
      data[key] = value;
    }
  }
  return data;
};

const walk = (dir: string): string[] =>
  fs.existsSync(dir)
    ? fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
        const full = path.join(dir, entry.name);
        if (entry.isDirectory()) return walk(full);
        return /\.mdx?$/.test(entry.name) && !entry.name.startsWith("_")
          ? [full]
          : [];
      })
    : [];

const rel = (file: string) => path.relative(ROOT, file);

const SECTION_KEYS = [
  "title",
  "description",
  "slug",
  "sidebar_label",
  "sidebar_position",
  "displayed_sidebar",
  "hide_table_of_contents",
];

const schemas: {
  dir: string;
  allowed: string[];
  required: string[];
  extra?: (file: string, fm: FrontMatter) => string[];
}[] = [
  {
    dir: "docs",
    allowed: [...SECTION_KEYS, "era"],
    required: ["title"],
    extra: (file, fm) => {
      const inGameplay =
        rel(file).startsWith("docs/gameplay/") && !file.endsWith("index.md");
      if (inGameplay && !["framework", "migrated", "legacy"].includes(fm.era as string)) {
        return ["gameplay pages need era: framework | migrated | legacy"];
      }
      if (!inGameplay && fm.era !== undefined) {
        return ["era is only valid on gameplay pages"];
      }
      return [];
    },
  },
  { dir: "manifesto", allowed: SECTION_KEYS, required: ["title"] },
  { dir: "tutorials", allowed: SECTION_KEYS, required: ["title"] },
  {
    dir: "blog",
    allowed: [
      "title",
      "description",
      "slug",
      "authors",
      "tags",
      "series",
      "image",
      "date",
      "draft",
      "hide_table_of_contents",
    ],
    required: ["title", "description", "authors", "tags"],
    extra: (_file, fm) => {
      const authors = fs.readFileSync(path.join(ROOT, "blog/authors.yml"), "utf8");
      const known = [...authors.matchAll(/^([a-z0-9_-]+):/gm)].map((m) => m[1]);
      const listed = ([] as string[]).concat(fm.authors as string | string[]);
      return listed
        .filter((a) => !known.includes(a))
        .map((a) => `unknown author "${a}"`);
    },
  },
];

describe("content frontmatter", () => {
  for (const schema of schemas) {
    const files = walk(path.join(ROOT, schema.dir));
    if (files.length === 0) continue;
    test.each(files.map((f) => [rel(f), f]))(`%s`, (_name, file) => {
      const fm = parseFrontMatter(file);
      const problems = [
        ...Object.keys(fm)
          .filter((k) => !schema.allowed.includes(k))
          .map((k) => `key "${k}" is not allowed`),
        ...schema.required
          .filter((k) => fm[k] === undefined || fm[k] === "")
          .map((k) => `missing "${k}"`),
        ...(schema.extra?.(file, fm) ?? []),
      ];
      expect(problems).toEqual([]);
    });
  }
});

// The engine repository is private: pages may quote its code, never locate it.
const DISCLOSURE = [
  {
    name: "repository path",
    pattern: /\b(Server|Client|Client-Files|Locale|Doc|Tools|Prototypes|Sql-script)\/[\w./-]+/,
  },
  { name: "engine source file", pattern: /\b[\w-]+\.(cpp|cc|cxx|h|hpp|hlsl)\b/ },
];

describe("content disclosure", () => {
  const files = ["docs", "manifesto", "tutorials", "blog"].flatMap((d) =>
    walk(path.join(ROOT, d)),
  );
  test.each(files.map((f) => [rel(f), f]))(`%s`, (_name, file) => {
    const lines = fs.readFileSync(file, "utf8").split("\n");
    const hits = lines.flatMap((line, i) =>
      DISCLOSURE.filter((d) => d.pattern.test(line)).map(
        (d) => `line ${i + 1}: ${d.name}: ${line.trim().slice(0, 80)}`,
      ),
    );
    expect(hits).toEqual([]);
  });
});
