<template>
  <div id="app">
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
        'https://d3403zlz7k7n0t.cloudfront.net/1700/1000/1455627904-edwin-national-sweat-navy-landscape-1.jpg',
        'https://d3403zlz7k7n0t.cloudfront.net/1700/700/1455627925-edwin-national-sweat-navy-landscape-2.jpg',
        'https://d3403zlz7k7n0t.cloudfront.net/1700/700/1455627957-edwin-national-sweat-navy-landscape-3.jpg',
        'https://d3403zlz7k7n0t.cloudfront.net/1700/700/1455627980-edwin-national-sweat-navy-landscape-4.jpg'
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
