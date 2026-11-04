---
title: Template context
description: The functions and namespaces every UCHTML template starts with, and how a host adds its own.
displayed_sidebar: mainSidebar
---

# Template context

Every template renders against a context dictionary. The loader fills it before each load, then merges the variables the host passes in, so a host value replaces a standard entry of the same name.

| Name | Provided by | Reference |
| --- | --- | --- |
| `fun` | the loader | below |
| `bonus` | the loader | below |
| `interfacemodule`, `i18n`, `world`, `item`, `mob`, `quest` | a client that loads game data | the [wiki data namespaces](../wiki/data-core.md) |
| any other name | the host, as `injected_variables` | |

A host adds a namespace by passing a dictionary of values or callables to `Load` or `LoadString`; a template calls them like the built-ins.

## `fun` Namespace

### fun.getv

**Name:** `getv`  

**Parameters:**
  - `key`: (String) The key to retrieve from the context.
  - `default`: (Optional) The default value to return if the key is not found.

**Return:**
  - The value associated with the key after processing by the `var` function.

**Call Example:**
```html
{% set value = fun.getv("query:example", "default_value") %}
```

### fun.getvi

**Name:** `getvi`  

**Parameters:**
  - `key`: (String) The key to retrieve from the context.
  - `default`: (Optional, default=0) The default value if the key is not found.

**Return:**
  - An integer value converted from the retrieved variable.

**Call Example:**
```html
{% set number = fun.getvi("query:number", 10) %}
```

### fun.setv

**Name:** `setv`  

**Parameters:**
  - `key`: (String) The key to set in the context.
  - `value`: The value to store; processed via the `var` function.
  - `reload`: (Boolean, default=True) Determines whether to trigger a page reload after setting the variable.

**Return:**
  - None (Updates the context and may trigger a reload).

**Call Example:**
```html
{% set _ = fun.setv("user:status", "active") %}
```

### fun.var

**Name:** `var`  

**Parameters:**
  - `data`: The data to process.
  - `default`: (Optional) A default value used if `data` is not provided.

**Return:**
  - The processed data, where:
    - If `data` is a string starting with "packed_query:", it is replaced by the named list the host configures (the [wiki](../wiki/configuration.md) reads them from `PACKED_QUERY`).
    - If `data` is a comma-separated string, it is split into a list.
    - If `default` is a list or tuple and `data` is not, `data` is converted into a list.

**Call Example:**
```html
{% set processed = fun.var("1,2,3", []) %}
```

### fun.notempty

**Name:** `notempty`  

**Parameters:**
  - `arg`: The argument to check.

**Return:**
  - A boolean value indicating whether `arg` is not `None` and has a non-zero length.

**Call Example:**
```html
{% if fun.notempty(some_list) %}
  <!-- some_list is not empty -->
{% endif %}
```

### fun.fnum

**Name:** `fnum`  

**Parameters:**
  - `n`: (Integer) The number to format.

**Return:**
  - The number as a string with `.` between groups of three digits.

**Call Example:**
```html
{{ fun.fnum(1234567) }}
```

## `bonus` Namespace

### bonus.apply_str

**Name:** `apply_str`  

**Parameters:**
  - `apply_str`: (String) The name of an apply type, as used in item prototypes.
  - `value`: The value of the bonus.

**Return:**
  - The bonus line as the item tooltip prints it, in the client language.

**Call Example:**
```html
{{ bonus.apply_str("APPLY_ATT_SPEED", 10) }}
```

## `bonus` Namespace

### bonus.apply_str

**Name:** `apply_str`  

**Parameters:**
  - `apply_str`: (String) The name of an apply type, as used in item prototypes.
  - `value`: The value of the bonus.

**Return:**
  - The bonus line as the item tooltip prints it, in the client language.

**Call Example:**
```html
{{ bonus.apply_str("APPLY_ATT_SPEED", 10) }}
```

