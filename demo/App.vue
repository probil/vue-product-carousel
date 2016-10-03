<template>
  <div>
    <carousel :images="images">
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
          <div class="row" v-for="(image, index) in images">
            <div class="nine columns">
              <input type="text" :value="image" readonly class="u-full-width">
            </div>
            <div class="three columns">
              <button @click="removeImage(index)" class="button u-full-width button-delete">X</button>
            </div>
          </div>
          <!-- /Removing -->

          <!-- Adding -->
          <div class="row">
            <div class="nine columns">
              <input v-model="new_image" type="text" placeholder="Add image url here..." class="u-full-width">
            </div>
            <div class="three columns">
              <button @click="addNewImage" class="button button-primary u-full-width button-add">Add</button>
            </div>
          </div>
          <!-- /Removing -->
          <!-- /Hot replacement -->

        </div>
      </div>
    </carousel>

    <div class="footer">
      <div class="container">
        <p>
          Footer. Will be hidden on zoom. Try to click on the main image to activate zoom mode &uarr;
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import carousel from '../src/carousel.vue';
export default {
  components:{
    carousel
  },
  data () {
    return {
      new_image: '',
      images: [
        'http://res.cloudinary.com/dxn1bjdta/image/upload/c_scale,w_2588/v1473457885/person-hand-smartphone-technology_w0bgpf.jpg',
        'http://res.cloudinary.com/dxn1bjdta/image/upload/c_scale,w_2588/v1473457888/pexels-photo-168766_zrbvds.jpg',
        'http://res.cloudinary.com/dxn1bjdta/image/upload/c_scale,w_2588/v1473457886/pexels-photo_f5vx33.jpg',
        'http://res.cloudinary.com/dxn1bjdta/image/upload/c_scale,w_2588/v1473457886/person-smartphone-office-table_ttiwjx.jpg',
        'http://res.cloudinary.com/dxn1bjdta/image/upload/v1473457881/pexels-photo-89955_ifoijg.jpg'
      ]
    }
  },
  methods: {

    /**
     * Adds image from text field to the list
     */
    addNewImage(){
      if(this.new_image.trim().length === 0) return;

      this.images.push(this.new_image);

      // clean field
      this.new_image = '';
    },

    /**
     * Deletes image by index
     * @param {Number} index
     */
    removeImage(index){
      let aggree = true;

      // ask user before deleting the last one
      if (this.images.length === 1) {
        aggree = confirm(`Are you sure? It's the last one.`)
      }

      if (aggree) {
        this.images.splice(index, 1);
      }
    }
  }
}
</script>
