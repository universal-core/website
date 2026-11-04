---
title: Wiki Quickstart
displayed_sidebar: mainSidebar
---

# Quickstart for Developers

This quickstart guide will help you create and deploy a new wiki page in the game’s wiki system,.

## Workspace Location
A wiki page is the file `locale/[localization]/wiki/p/<pagePath>.html` (default localization is `universal`). The client looks for it in this order:

1. The pack file, at `locale/[localization]/wiki/p/<pagePath>.html`.
2. The `client-folder`, at `[client-folder]/locale/[localization]/wiki/p/<pagePath>.html`.

The pack always wins: a page that exists in the pack is never read from the folder. During development, keep the page out of the pack and place it in the `client-folder`; for release, pack the files in a `.hpa` pack. The same order applies to the other wiki files, including [configuration and localization](./configuration.md).

:::note Example

With an URL like `wiki://p/items/details?vnum=2000` the engine reads `locale/[localization]/wiki/p/items/details.html` from the pack, and from `[client-folder]/locale/[localization]/wiki/p/items/details.html` when the pack has no such file.

:::

## Workspace setup
We encurage you to use a debug launcher to speed up development and to place all your page and config files in `[client-folder]/locale/[localization]/wiki/...`.

Before starting we strongly suggest to follow some steps to setup a profiecient working environment:

1. Download [VScode](https://code.visualstudio.com/download).
2. Install `beautiful-jinja` VScode Extension.
3. Create a folder in your `workspace` (`[client-folder]/locale/[localization]/wiki`) folder named `.vscode`.
4. Create a file name `settings.json` inside `.vscode` with the following content.
```json
{
  "html.customData": [
    "uchtml.json"
  ],
  "files.associations": {
    "*.html": "jinja-html"
  },
}
```
5. Download [uchtml.json](/assets/wiki/uchtml.json) and place it in `workspace` ([client-folder]/locale/[localization]/wiki`) folder.

This ensures suggestion and linting while writing html pages.

This quickstart guide will help you create and deploy a new wiki page in the game’s wiki system,.

---
## Your first page

### 1. **Create the `.html` file**  

In your `client-folder`, create the following folder tree named `/locale/[localization]/wiki/p` (default localization is `universal`).  
The Client folder is the folder where the launcher (**metin2client.exe/bin**) is.

Then a new `.html` file inside the `p` folder:

```
[client-folder]/locale/[localization]/wiki/p/example.html
```

And write a simple html page

```html
<main>
    Hello from example page.
    <txt align=center>We can show some fancy stuff like</txt>
    <item-card vnum="{{ fun.getv('query:vnum') }}"/>
</main>
```

---

### 2. **Opening and reloading the page**

The wiki window opens a page by URL. To reach your page, link to it from another page of the wiki (see [URL](url.md)):

```html
<txt><hyperlink url="wiki://p/example?vnum=10">Open the example</hyperlink></txt>
```

- `p/example` matches your `example.html` file.
- `?vnum=10` sets the `query:vnum` variable to `10` inside the page.

More info in the [URL](url.md) page.

:::note Testing changes

Navigating to a page reads its file again, so with the page in the `client-folder` and not in the pack, save the `.html` file and navigate to the page again to see the change. The developer buttons (Navigate, Refresh, Copy URL) are disabled in the wiki window.

:::

:::caution

A client that is not a debug client renders the wiki from compiled pages only, ignoring the `.html` file: compile the pages with the compiler tab of the [Wiki Manager](./data-generation.md) and pack the result, or test in a debug client.

:::

:::caution

Changes to [configuration, locale](./configuration.md) files, or files containing [wiki data](data-generation.md) do not refresh until client restart.

:::

### 3. **Importing templates**
There are some predefined [jinja](./jinja2.md) templates in the wiki. These templates are "lego blocks" you can reuse everywhere in the Wiki.  
For example a very common include is an `h1` which already has the right **font name**, **font size**, **text color** and **text position** and an optional `id` for [anchoring](url.md#location).

> You can fin the templates in `/locale/[localization]/wiki/templates`.

By utilizing this import we can ensure consistency of the H1 around all wiki.

- Marcro (template) file `templates/headers.html`
```
{% macro h1(title, id=None) %}
  <h1 id={{id}}>
    <txt font="Arial:15b" color="wikititle" display="relative" x=5 y=15>{{ title }}</txt>
  </h1>
{% endmacro %}
```

- Usage in your file (continuing from **1.**)

```html
{% import "templates/headers.html" as header %}

<main>
    {{ header.h1("Hello from example page", "title") }}

    <txt align=center>We can show some fancy stuff like</txt>
    <item-card vnum="{{ fun.getv('query:vnum') }}"/>
</main>
```

### 4. **Deploying to Production**  
Once you’re satisfied with the page:
- Move the `.html` file to the production environment folder:

```
locale/[localization]/wiki/p/<pagePath>.html
```

For example:
```
locale/universal/wiki/p/example.html
```

- Repack the client files and restart the game client for the changes to apply in production mode.


### 5. **Further Customization**  

Now you can enrich your page using [templating](./jinja2.md), [functions](./jinja2-context.md) and a wide collection of [ui components](./ui-components.md).  
We also suggest you to read about the [grid system](./grid-system.md) which manages component placement in the page following the same logic as plain HTML and CSS.