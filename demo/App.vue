<template>
  <div>
    <carousel :images="images">
      <div class="container">
        <div class="row">
          <h2>vue-product-carousel</h2>
          <h4>Simple slider on Vue.js with hot image replacement, Zoom and Swipe mod</h4>
        </div>
      </div>
      <hr>
      <p>Hot image add test:</p>
      <input v-model="new_image" type="text" placeholder="Add image url here..." style="width: 90%">
      <br>
      <button @click="addNewImage">Add</button>
    </carousel>
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
    addNewImage(){
      if(this.new_image.trim().length === 0) return;

      this.images.push(this.new_image);
      this.new_image = '';
    }
  }
}
</script>
