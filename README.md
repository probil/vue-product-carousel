# Vue Product Carousel

> Simple product carousel with hot image replacement, Zoom and Swipe mode

## Usage

To be able to use this component you should install it first
```bash
npm i --save vue-product-carousel
```
Then import it:
```js
import ProductCarousel from 'vue-product-carousel'
```

Use `ProductCarousel` component and pass your images as `images` prop:

```vue
<template>
  <ProductCarousel :images="images">
    Sidebar content here
  </ProductCarousel>
</template>
<script>
export default {
  components: {
    ProductCarousel,
  },
  data() {
    images: [
      'http://lorempixel.com/1000/1000/business/1/',
      'http://lorempixel.com/1000/1000/business/2/',
      'http://lorempixel.com/1000/1000/business/3/',
    ]
  },
}
</script>
```

## Scripts

``` bash
# installs dependencies
npm install

# serves demo with hot reloading
npm run serve

# builds demo
npm run build:demo

# builds lib
npm run build:lib

# lints and fixes files
npm run lint
```

## Params

|  Name                | Type   | Default  | Required | Description  |
|  ---               | ---   | ---     | ---      | ---         |
|  `images`            | Array  | []       | `true`    | Array of image urls that will be used in slider |
| `body-class-on-zoom` | String | `zoom`   | `false`   | Class that will be added to the `body` while Zoom mode is active. Very useful to hide header/footer in Zoom mode. |

## Credits

- [kalicki](https://github.com/kalicki) for idea.
- [thebird](https://github.com/thebird/Swipe) for [Swipe](https://github.com/thebird/Swipe) lib
