---
title: UniversalCore InGame Wiki
displayed_sidebar: mainSidebar
---

# UniversalCore InGame Wiki

UniversalCore's InGame-Wiki is a **framework** for composing Metin2 interfaces relying on a custom HTML engine name `UCHTML` coupled with `Jinja2` for templating.  
`UCHTML` allows the developer to write reactive interfaces with normal **html** and **jinja2** templating syntax, for conditional rendering, binding `tags` and `attributes` to native Metin2 interface components.

`UCHTML` implements in a seamingly complete way html's native grid system, allowing for element to be displayed as **block**, **flex** or **relative** with an expressive set of attributes to design and realize pretty complex layouts and compositions.

Thanks to **jinja** the html document is enhanced with and extendable set of functions provided by the Metin2 client backend (Launcher), allowing for responsiveness and bidirectional communication between the pages and the backend.

Because of the extension of the framework, we will split the documentation per topics:

- [`UCHTML` Grid system](./grid-system.md)
- [`UCHTML` Jinja2 Templating](./jinja2.md)
- [`UCHTML` Embedded Context](./jinja2-context.md)
- [Wiki Quickstart](./quickstart.md)
- [Wiki Configuration](./configuration.md)
- [Wiki URL](./url.md)
- [UI Component Tags](./ui-components.md)
- [Wiki Data Generation](./data-generation.md)
