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
                <input type="text" :value="image" readonly class="u-full-width">
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
        'http://res.cloudinary.com/dxn1bjdta/image/upload/c_scale,w_2588/v1473457885/person-hand-smartphone-technology_w0bgpf.jpg',
        'http://res.cloudinary.com/dxn1bjdta/image/upload/c_scale,w_2588/v1473457888/pexels-photo-168766_zrbvds.jpg',
        'http://res.cloudinary.com/dxn1bjdta/image/upload/c_scale,w_2588/v1473457886/pexels-photo_f5vx33.jpg',
        'http://res.cloudinary.com/dxn1bjdta/image/upload/c_scale,w_2588/v1473457886/person-smartphone-office-table_ttiwjx.jpg',
        'http://res.cloudinary.com/dxn1bjdta/image/upload/v1473457881/pexels-photo-89955_ifoijg.jpg',
      ],
    };
  },
  methods: {
    addNewImage() {
      if (this.new_image.trim().length === 0) return;
      this.images.push(this.new_image);
      this.new_image = '';
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
