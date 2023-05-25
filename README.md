# unplugin-vue-fontawesome

[![NPM version](https://img.shields.io/npm/v/unplugin-vue-fontawesome?color=a1b858&label=)](https://www.npmjs.com/package/unplugin-vue-fontawesome)

Automatic icon registration for [Font Awesome](https://fontawesome.com/) icons in Vue 3 components.

## Install

```bash
npm i -D unplugin-vue-fontawesome
```

<details>
<summary>Vite</summary><br>

```ts
// vite.config.ts
import FontAwesome from 'unplugin-vue-fontawesome/vite'

export default defineConfig({
  plugins: [
    FontAwesome({
      collections: 'pro',
      /* options */
    }),
  ],
})
```

Example: [`playground/`](./playground/)

<br></details>

<details>
<summary>Rollup</summary><br>

```ts
// rollup.config.js
import FontAwesome from 'unplugin-vue-fontawesome/rollup'

export default {
  plugins: [
    FontAwesome({
      collections: 'pro',
      /* options */
    }),
  ],
}
```

<br></details>

<details>
<summary>Webpack</summary><br>

```ts
// webpack.config.js
module.exports = {
  /* ... */
  plugins: [
    require('unplugin-vue-fontawesome/webpack')({
      collections: 'pro',
      /* options */
    }),
  ],
}
```

<br></details>

<details>
<summary>Nuxt</summary><br>

```ts
// nuxt.config.js
export default {
  buildModules: [
    [
      'unplugin-vue-fontawesome/nuxt',
      {
        collections: 'pro',
        /* options */
      },
    ],
  ],
}
```

> This module works for both Nuxt 2 and [Nuxt Vite](https://github.com/nuxt/vite)

<br></details>

<details>
<summary>Vue CLI</summary><br>

```ts
// vue.config.js
module.exports = {
  configureWebpack: {
    plugins: [
      require('unplugin-vue-fontawesome/webpack')({
        collections: 'pro',
        /* options */
      }),
    ],
  },
}
```

<br></details>

<details>
<summary>esbuild</summary><br>

```ts
// esbuild.config.js
import { build } from 'esbuild'
import FontAwesome from 'unplugin-vue-fontawesome/esbuild'

build({
  plugins: [FontAwesome({
    collections: 'pro',
    /* options */
  })],
})
```

<br></details>

## Usage

The plugin is intended to be used together with [@fortawesome/vue-fontawesome](https://www.npmjs.com/package/@fortawesome/vue-fontawesome)

The following kinds of icon usage are supported

```html
<!-- regular icon name -->
<FontAwesomeIcon icon="coffee" />

<!-- icon with collection as array -->
<FontAwesomeIcon :icon="['fab', 'vuejs']" />

<!-- icon with collection as string -->
<FontAwesomeIcon icon="fa-regular fa-user" />
<FontAwesomeIcon icon="fa-sharp fa-solid fa-star" />
```

## Limitations

Dynamic icons are not supported, so those have to be registered manually.

```
import { faIconName } from '@fortawesome/free-solid-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core'
library.add(faIconName)
```

*Note: It is not recommended to do this inside `<script setup>` since that will register the icons every time the component mounts.*

## Configuration

The following show the default values of the configuration

```ts
FontAwesome({
  // the fontawesome collections to use
  collections: 'free',

  // collection that is used if no collection is specified
  defaultCollection: 'solid',

  // prop names to be tested for icons
  props: ['icon'],

  // component names to be tested for icons
  components: ['icon', 'font-awesome-icon'],

  // filters for transforming targets
  include: [/\.[jt]sx?$/, /\.vue\??/],
  exclude: [/node_modules/, /\.git/],
})
```

### Collections

The following presets are available for the `collections` option:

- `free` - all free fontawesome icons, including brands
- `pro` - all pro fontawesome icons, including brands
- `free-solid` - [@fortawesome/free-solid-svg-icons](https://www.npmjs.com/package/@fortawesome/free-solid-svg-icons)
- `free-regular` - [@fortawesome/free-regular-svg-icons](https://www.npmjs.com/package/@fortawesome/free-regular-svg-icons)
- `free-brands` - [@fortawesome/free-brands-svg-icons](https://www.npmjs.com/package/@fortawesome/free-brands-svg-icons)
- `pro-solid` - [@fortawesome/pro-solid-svg-icons](https://www.npmjs.com/package/@fortawesome/pro-solid-svg-icons)
- `pro-regular` - [@fortawesome/pro-regular-svg-icons](https://www.npmjs.com/package/@fortawesome/pro-regular-svg-icons)
- `pro-light` - [@fortawesome/pro-light-svg-icons](https://www.npmjs.com/package/@fortawesome/pro-light-svg-icons)
- `pro-thin` - [@fortawesome/pro-thin-svg-icons](https://www.npmjs.com/package/@fortawesome/pro-thin-svg-icons)
- `pro-duotone` - [@fortawesome/pro-duotone-svg-icons](https://www.npmjs.com/package/@fortawesome/pro-duotone-svg-icons)
- `sharp-solid` - [@fortawesome/sharp-solid-svg-icons](https://www.npmjs.com/package/@fortawesome/sharp-solid-svg-icons)
- `sharp-regular` - [@fortawesome/sharp-regular-svg-icons](https://www.npmjs.com/package/@fortawesome/sharp-regular-svg-icons)
- `sharp-light` - [@fortawesome/sharp-light-svg-icons](https://www.npmjs.com/package/@fortawesome/sharp-light-svg-icons)
