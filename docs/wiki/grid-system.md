---
title: UCHTML Grid system
displayed_sidebar: mainSidebar
---
# UCHTML Grid system

The `UCHTML Grid System` is inspired by traditional HTML/CSS layout techniques and adapted for Metin2's native UI elements. It follows a two-pass layout process:

1. **Measure Pass**  
   Each UIElement calculates the required dimensions based on its attributes and content. Properties such as `width`, `height`, `margin`, and `padding` determine the space needed by the element and its children.

2. **Layout Pass**  
   After computing sizes, each element is positioned within its parent container. The layout process respects margins, paddings, and alignment rules, ensuring elements are placed correctly according to their defined display mode.

UIElements serve as the core building blocks by encapsulating both appearance and behavior, and they are directly mapped to native Metin2 UI components.

---

## Attributes Overview

The table below summarizes the primary attributes available in the UCHTML Grid System:

| **Attribute**      | **Type**                                   | **Allowed Values / Default**                                 | **Description**                                                                                             |
|--------------------|--------------------------------------------|--------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------|
| `id`               | String                                     | N/A                                                          | Unique identifier for the element, used for anchoring (**#** url segment).                                                    |
| `display`          | String                                     | `"block"` (default), `"flex"`, `"relative"`                  | Determines layout mode: block (vertical stacking), flex (multi-line horizontal flow), or relative (explicit positioning). |
| `margin`           | Number or CSS-like shorthand               | N/A                                                          | Sets external spacing; supports shorthand (e.g., `margin-x`, `margin-y`, `margin-top`, etc.).                 |
| `padding`          | Number or CSS-like shorthand               | N/A                                                          | Sets internal spacing; supports shorthand similar to margin.                                                 |
| `width`            | Number, `"auto"`, `"content"`, or percentage | N/A                                                          | Defines the element’s width. `"content"` defers to child elements; `"auto"` fills available space.            |
| `height`           | Number, `"auto"`, `"content"`, or percentage | N/A                                                          | Defines the element’s height. `"content"` defers to child elements; `"auto"` fills available space.            |
| `max-width` **DISABLED**        | Number or percentage string                | N/A                                                          | Maximum allowed width; clamps the computed width if exceeded.                                               |
| `max-height`       | Number or percentage string                | N/A                                                          | Maximum allowed height; clamps the computed height if exceeded.                                             |
| `align`            | String                                     | `"left"` (default), `"center"`, `"right"`                    | Horizontal alignment within the container (applies to non-flex layouts).                                      |
| `vertical-align`   | String                                     | `"top"` (default), `"center"`, `"bottom"`                    | Vertical alignment within the container (applies to non-flex layouts).                                        |
| `x`                | Number                                     | N/A                                                          | X-coordinate for positioning; used with relative display mode.                                              |
| `y`                | Number                                     | N/A                                                          | Y-coordinate for positioning; used with relative display mode.                                              |
| `spacing`          | Number                                     | N/A                                                          | Vertical gap between flex lines when using flex display mode.                                               |
| `justify-content`  | String                                     | `"flex-start"` (default), `"flex-end"`, `"center"`, `"space-between"`, `"space-around"`, `"space-evenly"` | Controls horizontal distribution in flex layout.                      |
| `align-items`      | String                                     | `"flex-start"` (default), `"flex-end"`, `"center"`, `"stretch"` | Controls vertical alignment within each flex line.                             |
| `name`             | String                                     | N/A                                                          | Optional name for the element; often used for setting window names or identifiers.                           |

---

## Display Modes

UCHTML supports three primary display modes that determine how elements are arranged and interact:

### Block Display

Elements with `display="block"` are arranged in a vertical stack. They honor margins and paddings, and the container size is influenced by the cumulative dimensions of its children.

**Example:**

```html
<!-- Block Container Example -->
<div display="block" width="auto" margin="10" padding="5">
  <!-- Child elements go here -->
</div>
```

### Flex Display

With `display="flex"`, elements are laid out horizontally in rows. Items wrap to a new line if there isn’t enough space. This mode supports additional properties such as `justify-content` and `align-items` for precise control over distribution and alignment.

### Justify-Content Values

| **Value**         | **Description**                                                                                                                                      |
|-------------------|------------------------------------------------------------------------------------------------------------------------------------------------------|
| `flex-start`      | Items align to the beginning (left) of the container. This is the default setting, placing all items flush against the start edge.                  |
| `flex-end`        | Items align to the end (right) of the container, causing leftover space to appear at the beginning (left) of the container.                         |
| `center`          | Items are centered horizontally within the container, with equal space distributed on both sides.                                                  |
| `space-between`   | Items are evenly distributed; the first item is at the start, the last at the end, and the remaining space is divided equally between the items.  |
| `space-around`    | Items are evenly distributed with equal space around them. The space on the edges is half the size of the space between items.                        |
| `space-evenly`    | Items are distributed with equal spacing between them, including equal space at the container edges.                                               |

### Align-Items Values

| **Value**         | **Description**                                                                                                                                      |
|-------------------|------------------------------------------------------------------------------------------------------------------------------------------------------|
| `flex-start`      | Items align to the top of the flex line. This is the default setting, aligning items flush with the top edge.                                       |
| `flex-end`        | Items align to the bottom of the flex line, placing them flush with the bottom edge.                                                               |
| `center`          | Items are centered vertically within the flex line, ensuring equal spacing above and below each item.                                               |
| `stretch`         | Items stretch to fill the entire height of the flex line (while respecting margins), which may override the individual height of the items.         |
  
**Example:**

In this example the **Child elements** are placed one near the other putting the same space between them. Elements in the same row are then certically aligned at the center (therefore smaller elements are in the middle of the row)

```html
<!-- Flex Container Example -->
<div display="flex" width="100%" height="auto" spacing="10" justify-content="space-evenly" align-items="center">
  <!-- Child elements go here -->
</div>
```

### Relative Display

Elements with `display="relative"` are positioned using explicit `x` and `y` coordinates. This mode allows an element to be placed independently of the normal document flow.

**Example:**

```html
<!-- Relative Positioned Element Example -->
<div display="relative" x="50" y="100" width="200" height="100">
  <!-- Content goes here -->
</div>
```

---

## Sizing: Width and Height

Sizing is a critical aspect of the grid system. UCHTML provides various methods to define an element’s dimensions:

- **Numeric Values:**  
Specify fixed sizes directly (e.g., `width="300"` sets the width to 300 pixels).

- **`auto`:**  
The element expands to fill the available space in its container, minus any margins.  
**With "available space" we mean container's specified dimension minus the space occupied by already placed elements, keep in mind that the root element has size equals to the window containing the UCHTML loader**

- **`content`:**  
The element’s size is derived from the dimensions of its child elements, allowing the container to adapt to its content.

- **Percentage Values:**  
Sizes can be expressed as a percentage (e.g., `width="50%"`) of the parent container’s dimensions. Calculations take into account the parent's size and any applied margins.

- **Max Constraints:**  
`max-width` and `max-height` restrict the computed dimensions to ensure elements do not exceed specified limits.

**Example:**

In this example the **div** will occopy half of the container width and all the remaining vertical space of the container with a max of `300`.

```html
<!-- Responsive Sizing Example -->
<div width="50%" height="auto" max-height="300" max-height="200">
  <!-- Content goes here -->
</div>
```

When using percentage values, the computed dimensions adjust dynamically based on the parent container's size and applied margins.
