<template>
  <div>
    <carousel :images="images" :hide-on-zoom="'.hideOnZoom'">
      <div class="block-inside">
        <div class="block-title">
          <h1>Content title</h1>
          <h2>Something else</h2>
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
import carousel from './carousel.vue';
export default {
  components:{
    carousel
  },
  data () {
    return {
      new_image: '',
      images: [
        'http://res.cloudinary.com/dxn1bjdta/image/upload/c_scale,w_2588/v1473457888/pexels-photo-168766_zrbvds.jpg',
        'http://res.cloudinary.com/dxn1bjdta/image/upload/c_scale,w_2588/v1473457886/pexels-photo_f5vx33.jpg',
        'http://res.cloudinary.com/dxn1bjdta/image/upload/c_scale,w_2588/v1473457886/person-smartphone-office-table_ttiwjx.jpg',
        'http://res.cloudinary.com/dxn1bjdta/image/upload/c_scale,w_2588/v1473457885/person-hand-smartphone-technology_w0bgpf.jpg',
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
<style>
  body, html{
    height: 100%;
    width: 100%;
    max-width: 100%;
    padding: 0;
    margin: 0;
  }
  #app{
    position: relative;
    min-height: 100%;
  }
</style>
