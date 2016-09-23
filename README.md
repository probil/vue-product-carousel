# vue-product-carousel

> Product carousel ported to Vue.js with hot image replacement, Zoom and Swipe mode

## Usage

To be able to use this component you should install it first
```bash
npm i --save vue-product-carousel
```
Then import it:
```js
import carousel from 'vue-product-carousel'
```

Use `carousel` component and pass your images as `images` prop:

```js
<template>
  <carousel :images="images">
    Sidebar content here
  </carousel>
</template>
<script>
...
data(){
  images:[
    'http://lorempixel.com/1000/1000/business/1/',
    'http://lorempixel.com/1000/1000/business/2/',
    'http://lorempixel.com/1000/1000/business/3/'
  ]
}
components:{
  carousel
}
...
</script>
...
```
Note: You will need [Babel Loader](https://github.com/babel/babel-loader) in your Webpack config file in order to support ES6 syntax inside component.

## Testing

``` bash
# install dependencies
npm install

# serve demo with hot reload at localhost:8080
npm run dev

# build demo for static using
npm run build

# build library bundle (to use as module)
npm run dist
```

For detailed explanation on how things work, consult the [docs for vue-loader](http://vuejs.github.io/vue-loader).

## Params

|  Name                | Type   | Default  | Required | Description  |
|  ---               | ---   | ---     | ---      | ---         |
|  `images`            | Array  | []       | `true`    | Array of image urls that will be used in slider |
| `body-class-on-zoom` | String | `zoom`   | `false`   | Class that will be added to the `body` while Zoom mode is active. Very useful to hide header/footer in Zoom mode. |

## Credits

- [kalicki](https://github.com/kalicki) for idea.
- [thebird](https://github.com/thebird/Swipe) for [Swipe](https://github.com/thebird/Swipe) lib
