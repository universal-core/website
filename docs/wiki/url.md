---
title: Wiki Url Format
displayed_sidebar: mainSidebar
---

# Url Format

Each page in the wiki is addressed by a URL following the pattern:

```
wiki://p/[pagePath]?param1=value1&param2=value2#location
```

p/[pagePath]: The logical path of the page inside the wiki’s structure.  
This represents where the corresponding `.html` file for that page is located inside the game client in the folder locale/[localization]/wiki. 

For example, if [pagePath] is `items/details`, the wiki tries to load `locale/[localization]/wiki/p/items/details.html`.

## Query parameters

Query parameters are the part of the url after **?**.

In the page url

```
wiki://p/items/belt?vnum=100
```
`?vnum=100` is the query parameter and allows you to dynamically select data to be displayed. 

These parameter are enbedded in the document using [jinja2-context](./jinja2-context.md) and cane be retrieved inside page using [fun.getv](./jinja2-context.md#funcgetv)(query:vnum) or [fun.getvi](./jinja2-context.md#funcgetvi)(query:vnum).

## Location

Location is the string after **#**.

It tells **UCHTML** where to scroll the target page after load.  
It works together with [Grid System's **id** attribute](./grid-system.md#attributes-overview): you can create an **anchor** using `id` attribute in any html tag you want, and it becomes a possible "target" for location.

**Example**

`items/belt.html`
```html
<div>
  Some data on top
</div>
<img id=foo path="some path">
```


```
wiki://p/items/belt#foo
```

When the page load, it will automatically scroll to the `<img>`.