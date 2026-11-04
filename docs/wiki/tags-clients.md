---
title: Shop and ranking tags
description: Tags used by the item shop and ranking clients.
displayed_sidebar: mainSidebar
---

# Shop and ranking tags

`item-shop-card` and `ranking-window` are data-bound tags that belong to the item shop and ranking clients rather than to the wiki.

## **`item-shop-card`**
| Attribute             | Requirement  | Default       | Constraints/Notes |
|-----------------------|--------------|---------------|-------------------|
| id                    | Required     | none             | Item shop item ID (integer). Must match an item loaded in `ItemShopStore`. |
| [*Base Attributes*](../uchtml/components-common.md#common-base-attributes)     | Optional     | none             | Inherits all common base attributes. |

Renders a full `ItemShopDisplayItem` widget (200×145) with icon, name, price, quantity selector, and purchase button. The item data is pulled from `ItemShopStore` by `id`. The purchase button calls into the host window's interface module.

:::caution

Should not contain any child elements. The item shop must be loaded (store populated) before this element renders correctly.

:::

<details><summary>Code Example</summary>

```html
<item-shop-card id="7" />
```

</details>

---

## **`ranking-window`**
| Attribute             | Requirement  | Default       | Constraints/Notes |
|-----------------------|--------------|---------------|-------------------|
| ranking-type          | Required     | none             | The ranking to subscribe to. |
| width                 | Required     | none             | Window width, or `auto`. |
| height                | Required     | none             | Window height. |
| rows                  | Optional     | `10`          | Number of rows shown. |
| show-pagination       | Optional     | `true`        | `false` hides the pagination controls. |
| more-info             | Optional     | `false`       | `true` adds a "more info" button at the bottom. |
| more-info-text        | Optional     | `More Info`   | Text of that button. |
| [*Base Attributes*](../uchtml/components-common.md#common-base-attributes)     | Optional     | none             | Inherits all common base attributes. |

A self-contained ranking ladder: it subscribes to the ranking data when it is created and unsubscribes when the element is destroyed or rebuilt.

:::caution

Should not contain any child elements.

:::

<details><summary>Code Example</summary>

```html
<ranking-window align="center" ranking-type="example_ranking" rows="2" width="auto" height="200" show-pagination="false" more-info="true"/>
```

</details>
