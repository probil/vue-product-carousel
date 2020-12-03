<template>
  <div>
    <ProductCarousel :images="images">
      <div class="container section">
        <div class="row">
          <!-- Main title -->
          <h2>Product Carousel</h2>
          <h6>Simple slider on Vue.js with hot image replacement, Zoom and Swipe mode</h6>
          <hr>
          <!-- /Main title -->

          <!-- Hot replacement -->
          <h4>Hot image replacement:</h4>

          <!-- Removing -->
          <div class="row" v-for="(image, index) in images" :key="index">
            <div class="nine columns">
              <label>
                <input type="text" :value="image" readonly class="u-full-width label-body">
              </label>
            </div>
            <div class="three columns">
              <button
                @click="removeImage(index)"
                class="button u-full-width button-delete"
              >X</button>
            </div>
          </div>
          <!-- /Removing -->

          <!-- Adding -->
          <div class="row">
            <div class="nine columns">
              <label>
                <input
                  v-model="new_image"
                  type="text"
                  placeholder="Add image url here..."
                  class="u-full-width"
                />
              </label>
            </div>
            <div class="three columns">
              <button
                @click="addNewImage"
                class="button button-primary u-full-width button-add"
              >
                Add
              </button>
            </div>
          </div>
          <!-- /Adding -->
          <!-- /Hot replacement -->

        </div>
      </div>
    </ProductCarousel>

    <div class="footer">
      <div class="container">
        <p>
          Footer. Will be hidden on zoom.
          Try to click on the main image to activate zoom mode &uarr;
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import ProductCarousel from './components/ProductCarousel.vue';

export default {
  components: {
    ProductCarousel,
  },
  data() {
    return {
      new_image: '',
      images: [
        'https://res.cloudinary.com/dxn1bjdta/image/upload/c_scale,w_3000,f_auto/v1606989818/vue-product-carousel/nike.jpg',
        'https://res.cloudinary.com/dxn1bjdta/image/upload/c_scale,w_3000,f_auto/v1606990043/vue-product-carousel/camera-on-tripod.jpg',
        'https://res.cloudinary.com/dxn1bjdta/image/upload/c_scale,w_3000,f_auto/v1606990558/vue-product-carousel/t-shirt.jpg',
        'https://res.cloudinary.com/dxn1bjdta/image/upload/c_scale,w_3000,f_auto/v1606989636/vue-product-carousel/brett-jordan-1dsceUpkOwI-unsplash.jpg',
        'https://res.cloudinary.com/dxn1bjdta/image/upload/c_scale,w_3000,f_auto/v1606992381/vue-product-carousel/PH167110.jpg',
      ],
    };
  },
  methods: {
    addNewImage() {
      if (this.new_image.trim().length === 0) return;
      this.images.push(this.new_image);
      this.new_image = '';
    },
    removeImage(index) {
      this.images.splice(index, 1);
    },
  },
};
</script>
<style src="skeleton/css/normalize.css"></style>
<style src="skeleton/css/skeleton.css"></style>
<style>
  body, html{
    height: 100%;
    width: 100%;
    max-width: 100%;
    padding: 0;
    margin: 0;
  }
  .footer {
    width: 100%;
    height: 50px;
    line-height: 50px;
    position: absolute;
    bottom: 0;
    left: 0;
    opacity: 1;
    overflow: hidden;
    color: #fff;
    background-color: #00897b;
    transition: all 1s ease;
  }
  body.zoom .footer{
    height: 0;
    opacity: 0;
  }

  .section{
    margin-top: 2rem;
  }

  .button-delete, .button-add{
    padding: 0;
  }
</style>
