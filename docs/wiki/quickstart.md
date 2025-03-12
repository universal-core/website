---
title: Wiki Quickstart
displayed_sidebar: mainSidebar
---

# Quickstart for Developers

This quickstart guide will help you create and deploy a new wiki page in the game’s wiki system, as well as utilize the developer UI buttons effectively.

## Workspace Location
When the client is in **__DEBUG__** mode, the wiki will try to search the file using the following priority order:

- Development environment (`wikidev`):  `[client-folder]/locale/[localization]/wiki/...` directory.
- Production environment: Pack file at location `locale/[localization]/wiki/<pagePath>.txt` directory.
(default localization is `universal`)

This mean that when you ar using a production launcher, you have to pack the files in a `.hpa` pack, while with a debug launcher **all wiki files** (including [configurations and localization](./configuration.md)) are loaded from the folder where the launcher is.

:::note Example

With an URL like `wiki://p/items/details?vnum=2000` the engine looks first in `[client-folder]/locale/[localization]/wiki/p/items/details.html`, then in the pack `locale/[localization]/wiki/p/items/details.html`.

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

This quickstart guide will help you create and deploy a new wiki page in the game’s wiki system, as well as utilize the developer UI buttons effectively.

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

### 2. **Accessing the page via the Developer UI**

The game UI has three developer buttons: **Navigate**, **Refresh**, and **Copy URL**. Here's how to use them:

#### a) **Navigate Button**
- Clicking this button opens a popup where you can enter a full URL to load a specific wiki page.
- Enter the url to navigate to your example page

```
wiki://p/example?vnum=10
```

- Confirm the popup to navigate to the specified page.
  
:::note About The url

- `p/example` matches your `example.html` file.
- `?vnum=10` sets the `query:vnum` variable to `10` inside the page.

More info in the [URL](url.md) page.

:::

#### b) **Refresh Button**
- Use this button to reload the currently displayed wiki page.
- Useful for testing changes made in the `wikidev` folder. Save your changes, press **Refresh**, and see them applied instantly.

#### c) **Copy URL Button**
- Copies the full URL of the currently loaded wiki page to your clipboard.
- Allows you to share or reuse the page URL easily.


:::note Example **Testing changes immediately**  

When using `__DEBUG__` launchers, changes to the `.html` file are applied immediately.
- Save the `.html` file in the `wikidev` directory.
- Use the **Navigate** button to load the page or the **Refresh** button to reload the current page and see the changes.

:::

:::caution

Changes to [configuration, locale](./configuration.md) files, or files containing [wiki data](data-generation.md) do not refresh until client restart.

:::

### 3. **Importing templates**
There are some predefined [jinja](./jinja2.md) templates in the wiki. These templates are "lego blocks" you can reuse everywhere in the Wiki.  
For example a very common include is an `h1` which already has the right **font name**, **font size**, **text color** and **text position** and an optional `id` for [anchoring](url.md#location).

> You can fin the templates in `/locale/[localization]/wiki/templates`.

By utilizing this import we can ensure consistency of the H1 around all wiki.

- Marcro (template) file `templates/header.html`
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
We also suggest you to read about the [grid system](./grid-system.md) which manages component placement in the page following the same logic of vanilla html/css.