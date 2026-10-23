# Writing an interactive tutorial

Files starting with `_` (and folders starting with `_`) are not published, so
this guide and `_sample.mdx` stay out of the site.

Tutorials are grouped in units. Each chapter lives in its unit's folder
(`tutorials/<unit>/<id>.mdx`, its code in `tutorials/<unit>/_<id>/`), and
`tutorials.json` at the site root lists the units and their chapters in reading
order. A page that is not in `tutorials.json` is built but cannot be reached from
the tutorial navigation. `/tutorials/` redirects to the first chapter. `uced
publish` places the files and adds the chapter to `tutorials.json` from the
inventory's `unit` (and `unit_title` for a new unit).

A tutorial page is an app, not a doc page: the header carries the previous and
next arrows and the Unit / Chapter menu (a chapter is marked visited after ten
seconds on it), the text scrolls in its own column on the left, and the
workbench fills the rest of the screen: a file tree, tabs and an editor
(CodeMirror). Nothing runs in the browser. The reader follows the text, presses
step buttons that write files into the workbench, and can type in the editor.
Typing only changes the copy in the browser tab.

## The components

```mdx
import { Tutorial, CreateFile, UpdateFile, ShowFile } from "@site/src/components/tutorial";
```

`<Tutorial files={...} solution={...} active="path">` wraps the whole text.

- `files`: map of path to content the reader starts with. Folders come from
  the paths (`quest/lib/greet.lua`).
- `solution` (optional): map of path to content of the finished tutorial. It
  adds a **Solve** button that shows these files read-only; pressing it again
  brings back the reader's own files.
- `active` (optional): file open at start. Defaults to the first path.

Inside it, the step buttons:

- `<CreateFile path="..." code={...} />` adds a file and opens it.
- `<UpdateFile path="..." code={...} />` replaces a file with the full new
  content, opens it and marks the lines that changed since the previous step.
  Always pass the whole file, not a fragment.
- `<ShowFile path="..." lines="3-5,9" />` opens a file and marks lines without
  changing it.

`CreateFile` and `UpdateFile` also take `lines` to mark specific lines instead
of the computed diff. Any of the three takes children to replace the default
button label.

**Reset** throws away the reader's edits and returns every file to what the last
step left. A step button always overwrites the file it writes, edits included.

Languages are picked by extension: `.lua`, `.forge` and `.quest` (Lua, with the
quest block keywords), `.py`, `.yml`/`.yaml`, `.json`, and C/C++ headers and
sources. Anything else shows as plain text.

## Where the code lives

Keep each file of the tutorial as a real file in an underscore folder next to
the page, and import it as text with `raw-loader`. The file stays readable and
highlighted in your own editor, and blank lines in the code cannot break the MDX
parser (MDX 1 ends a JSX block at a blank line, so long template literals inside
props are fragile).

```
tutorials/forge-basics/
  hello-quest.mdx
  _hello-quest/
    hello-start.quest
    hello-final.quest
    greet.lua
```

```mdx
---
title: Hello quest
slug: /hello-quest
---

import { Tutorial, CreateFile, UpdateFile } from "@site/src/components/tutorial";
import helloStart from "!!raw-loader!./_hello-quest/hello-start.quest";
import helloFinal from "!!raw-loader!./_hello-quest/hello-final.quest";
import greet from "!!raw-loader!./_hello-quest/greet.lua";

export const start = { "quest/hello.quest": helloStart };
export const solution = { "quest/hello.quest": helloFinal, "quest/lib/greet.lua": greet };

<Tutorial files={start} solution={solution}>

Move the greeting into its own module.

<CreateFile path="quest/lib/greet.lua" code={greet} />

Then call it from the login trigger.

<UpdateFile path="quest/hello.quest" code={helloFinal} />

</Tutorial>
```

Rules that keep the page working:

- Leave a blank line after `<Tutorial ...>` and before `</Tutorial>`, or the
  text inside is not parsed as Markdown.
- Keep each `export const` free of blank lines.
- Give the page an absolute `slug` (`slug: /first-forge-module`): a relative one
  resolves under the unit folder and changes the URL.
- Do not put a `# Title` inside `<Tutorial>`; the layout renders the frontmatter
  title at the top of the text column, and the previous/next cards at the end.
- Tables in the text column are shown one row per block (first cell above the
  rest), since the column is too narrow for side-by-side cells.
- The disclosure check in `test/content.test.ts` reads the `.mdx` page, not the
  imported files, but a path like `something.cpp` written in the text still
  fails it. Name files by what they do in the content tree.

On screens narrower than 960px the two columns become a **Tutorial** / **Editor**
bar at the bottom; a step button switches to the editor on its own.
