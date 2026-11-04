// Lists every post in blog/ with its release state, the way a production build would see it today.
const fs = require("fs");
const path = require("path");
const { releaseState } = require("../plugins/blog-release");

const dir = path.join(__dirname, "..", "blog");
const rows = fs
  .readdirSync(dir)
  .filter((f) => /\.mdx?$/.test(f))
  .map((file) => {
    const text = fs.readFileSync(path.join(dir, file), "utf8");
    const fm = (text.match(/^---\n([\s\S]*?)\n---/) || [, ""])[1];
    const field = (k) => (fm.match(new RegExp(`^${k}:\\s*(.+)$`, "m")) || [])[1];
    const date = (field("date") || file.match(/^(\d{4}-\d{2}-\d{2})/)?.[1] || "").replace(/["']/g, "");
    const draft = /^(true|yes)$/i.test((field("draft") || "").trim());
    const title = (field("title") || file).replace(/^["']|["']$/g, "");
    return { state: releaseState({ draft, date }), date, title };
  })
  .sort((a, b) => a.date.localeCompare(b.date));

for (const r of rows) console.log(`${r.state.padEnd(9)} ${r.date}  ${r.title}`);
const n = (s) => rows.filter((r) => r.state === s).length;
console.log(`\n${n("live")} live, ${n("scheduled")} scheduled, ${n("draft")} draft`);
