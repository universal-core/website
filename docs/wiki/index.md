---
title: In-game wiki
description: "The in-game wiki, a client built on UCHTML: quickstart, configuration, URLs, generated data and its tags."
displayed_sidebar: mainSidebar
---

# In-game wiki

The in-game wiki is a client built on [UCHTML](../uchtml/): pages are templates, and the facts they show are generated offline from the server's files. The framework pages (layout, Jinja2, generic tags) live under UCHTML; these pages cover what the wiki adds.

| Page | What it covers |
| --- | --- |
| [Quickstart](./quickstart.md) | Create and open a page |
| [Configuration](./configuration.md) | `config.yaml`, whitelists and locale binding |
| [URL format](./url.md) | `wiki://` addresses, query parameters and location |
| [Data generation](./data-generation.md) | The Wiki Manager and its outputs |
| [Data namespaces: i18n, quest, mob](./data-core.md) | Template functions for names, quests and mobs |
| [Data namespace: item](./data-item.md) | Template functions for items |
| [Data namespace: world](./data-world.md) | Higher-level item, mob, cube and refine queries |
| [Item and equipment tags](./tags-items.md) | Data-bound item, equipment and cube tags |
| [Monster and chest tags](./tags-mobs.md) | Data-bound monster and chest tags |
| [Shop and ranking tags](./tags-clients.md) | Tags for the item shop and ranking clients |
