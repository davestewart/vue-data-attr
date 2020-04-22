# Vue data attribute (data-*) directive

> Vue directive to bind properties as data-* attributes

# Abstract

Binding properties as classes is the traditional way to express component state as CSS:

```html
<div class="ui-select is-focused icon-ready">
  ...
</div>
```

This directive allows component state to be expressed instead as data attributes:

```html
<div class="ui-select" data-focused="1" data-icon="ready">
  ...
</div>
```

You can then made additional choices in your CSS to style your components:

```css
.ui-select[data-focused="1"] {
  box-shadow: 0 0 0 0.25em #4a90e266;
}

.ui-select[data-icon="ready"]:before {
  content: attr(data-icon);
}
```

Attributes have the same specificity as classes, so it won't affect things like BEM. Additionally, you won't need to think of clever class-naming schemes, the data attribute just expresses what is in the component.

# Installation

Install from NPM:

```bash
# npm
npm i vue-data-attr
```

```bash
# yarn
yarn add vue-data-attr
```

# Usage

## Setup

Import and use the directive in your main application file:

```js
import Vue from 'vue'
import vdata from 'vue-data-attr'

Vue.use(vdata)
```

## Components

Usage is the same as `v-bind` - just pass in an object:

```vue
<template>
  <div class="ui-select" v-data="hooks">
    ...
  </div>
</template>

<script>
export default {
  ...
  computed: {
    hooks () {
      return {
        focused: this.hasFocus,
        icon: this.icon
      }
    }
    ...
  }
  ...
}
</script>
```

# Configuration

## Global configuration

To configure how the directive renders attributes, pass an object:

```js
Vue.use(vdata, {
  empty: true,
  bools: true,
  name: 'data-attr',
})
```

The options are as follows:

#### `empty`

Whether to render attributes for `undefined` values or empty strings `""` (defaults to `false`)

- `false` - don't render empty attributes i.e. `<span />`
- `true` - render empty attributes, i.e. `<span data-thing />`

#### `bools`

Whether to render booleans as text or numbers (defaults to `false`)

- `false` - render booleans as numbers, i.e. `<span data-focused="1" />`
- `true` - render booleans as text, i.e. `<span data-focused="true" />`

#### `name`

Register the directive under a different name (defaults to `"data"`)

- `"data-attr"` - register as `data-attr` so use in templates with `<span v-data-attr="hooks" />`


## Local configuration

You can override the `empty` and `bools` options using the directive's modifiers:

```vue
<template>
  <div class="ui-select" v-data.empty.bools="hooks">
    ...
  </div>
</template>
```

Assuming a boolean and empty value from the previous examples, the directive would render:


```html
<div class="ui-select" data-focused="true" data-icon>
  ...
</div>
```
