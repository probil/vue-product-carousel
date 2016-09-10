<template>
  <div class="vue-product-carousel" :class="{'zoomed':isZoomed}">
    <div class="block-image">

      <!-- Main image -->
      <a href="#" class="main-image responsive-image"
         @click="toggleZoom"
         @mousemove="onMouseMove"
         :class="{'background-loading':bgLoading}"
         :style="mainImageStyle"
      ></a>
      <!-- /Main image -->

      <!-- Slides preview -->
      <div id="product-slider" class="block-image-carousel swipe" ref="swipe-wrap">
        <div class="swipe-wrap">
          <div v-for="(image, index) in images">
            <a @click.prevent="onSlideClick(index)"
               :style="bgi(image)"
               :class="{
                  'selected'          : index === next,
                  'background-loading': itemsBgLoading
                 }"
               href="#" class="swipe-thumbnail"
            ></a>
          </div>
        </div>
      </div>
      <!-- /Slides preview -->

      <!-- Swipe dots (for mobile) -->
      <div class="swipe-dots">
        <a v-for="(image, index) in images"
           @click.prevent="onSlideClick(index)"
           :class="{'selected': index === next}"
           href="#" class="btn-swipe"
        >{{index}}</a>
      </div>
      <!-- /Swipe dots (for mobile) -->

    </div>
    <div class="block-details">

      <!-- Main text content -->
      <slot></slot>
      <!-- /Main text content -->

    </div>
  </div>
</template>
<script type="text/babel">
import Swipe from './vendor/swipe'

export default {
  swipe: null,
  props: {
    images: {
      type     : Array,
      required : true,
      'default': []
    },
    bodyClassOnZoom: {
      type     : String,
      required : false,
      'default': 'zoom'
    }
  },
  data(){
    return {
      // is Zoom mode active
      isZoomed      : false,
      // background position in Zoom mode
      positionY     : 50,
      // current slide id
      current       : 0,
      // next slide id
      next          : 0,
      // main image loading status
      bgLoading     : true,
      // image pagination loading status
      itemsBgLoading: true,
      // is Swipe mode active
      swipeActive   : false
    }
  },
  computed:{
    /**
     * Computed current slide image
     * @returns {?String}
     */
    currentSlide(){
      return this.images[this.current];
    },

    /**
     * Computed zoom style for zoom mode
     * @returns {{backgroundPosition: string}}
     */
    currentZoomStyle(){
      return {
        backgroundPosition: `50% ${this.positionY}%`
      }
    },

    /**
     * Computed styles of main image
     */
    mainImageStyle(){
      return Object.assign({}, this.currentZoomStyle, this.bgi(this.currentSlide));
    }
  },
  methods: {
    /**
     * Adds or removes body class based on zoom mode
     */
    updateBodyClass(){
      // don't do anything if not class defined
      if(!this.bodyClassOnZoom) return;

      let body = document.querySelector('body');

      this.isZoomed
        ? body.classList.add(this.bodyClassOnZoom)
        : body.classList.remove(this.bodyClassOnZoom)
    },


    /**
     * Toggles Zoom mode
     */
    toggleZoom(){
      this.isZoomed = !this.isZoomed;

      // add class to body if needed
      this.updateBodyClass();
    },

    /**
     * Calc position percentage
     * @returns {Number}
     */
    map(value, start1, stop1, start2, stop2) {
      return start2 + (stop2 - start2) * ((value - start1) / (stop1 - start1));
    },

    /**
     * Fires on mouse move in Zoom mode
     */
    onMouseMove(e){
      // prevent to call in non-zoom mode
      if(!this.isZoomed) return;

      this.positionY = this.map( e.clientY, 0, window.innerHeight, 0, 100 );
    },

    /**
     * Fires on slide change in Swipe mode
     * @param {Number} index Changed slide index
     */
    onSwipe(index){
      this.next = index;
      this.smoothChange();
    },

    /**
     * Shortcut for Background Image in css
     */
    bgi(url){
      return {
        backgroundImage: `url('${url}')`
      }
    },

    /**
     * Fires on next slide click
     */
    onSlideClick(index){
      // prevent change if slide already correct
      if(this.current === index || this.next === index) return;

      this.next = index;
      this.smoothChange();

      // call slide in swipe mode (if needed)
      if(this.swipeActive) {
        this.$options.swipe.slide(index, 400);
      }
    },

    /**
     * Makes smooth change for current slide
     */
    smoothChange(){
      this.bgLoading = true;
      setTimeout(() => {
        this.current = this.next;
        this.bgLoading = false
      }, 400)
    },

    /**
     * Makes smooth change for preview icons
     */
    smoothChangeItems(){
      this.itemsBgLoading = true;
      setTimeout(() => {
        this.itemsBgLoading = false;
      }, 400)
    },

    /**
     * Activates Swipe mode (if possible)
     */
    activateSwipe(){
      // prevent Swipe mode on big screens
      if (window.innerWidth > 1024) return;

      // use Swipe lib and save instance to $options
      this.$options.swipe = new Swipe(this.$refs.swipeWrap, {
        speed          : 400,
        continuous     : true,
        disableScroll  : false,
        stopPropagation: false,
        callback       : this.onSwipe
      });
      this.swipeActive = true;
    }
  },
  watch: {
    isZoomed(status){
      // if zoom disabled -> move background back to center
      if(!status) { this.positionY = 50;}
    },
    images(){
      // on images change -> gracefully move to the first slide
      this.onSlideClick(0);
    }
  },

  /**
   * Fires on component ready state
   */
  mounted(){
    this.smoothChange();
    this.smoothChangeItems();
    this.activateSwipe();
  }
}
</script>
<style>
  .vue-product-carousel {
    position: absolute;
    left: 0;
    right: 0;
    height: 100%;
    transform: translate3d(0px, 0px, 0px);
    background-color: #F3F3F3;
    overflow: hidden;  }
  .vue-product-carousel .block-image {
    position: absolute;
    right: 33.3%;
    left: 0;
    height: 100%;
    transition: right 0.3s ease-in-out; }
  .vue-product-carousel .block-image .swipe-dots {
    display: none; }
  .vue-product-carousel .block-image .main-image {
    display: block;
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: 100%;
    background: no-repeat 50% 50%;
    background-size: cover;
    cursor: url(img/cursor-zoom-plus.png) 22 22, auto;
    transition: opacity 0.4s ease-out;  }
  .vue-product-carousel .block-image .main-image.background-loading {
    opacity: 0;  }
  .vue-product-carousel .block-image .block-image-carousel {
    position: absolute;
    top: 0;
    left: 40px;
    overflow: visible;
    transform: translateX(0);
    transition: transform 0.3s ease-in-out; }
  .vue-product-carousel .block-image .block-image-carousel .swipe-wrap {
    height: auto;
    position: absolute;
    top: 50%;
    left: 0;
    transform: translateY(-50%); }
  .vue-product-carousel .block-image .block-image-carousel a {
    display: block;
    width: 43px;
    height: 55px;
    margin-bottom: 14px;
    opacity: 0.5;
    background: no-repeat center center;
    background-size: cover;
    transition: opacity 0.4s ease-out; }
  .vue-product-carousel .block-image .block-image-carousel a.selected,
  .vue-product-carousel .block-image .block-image-carousel a:hover {
    opacity: 1; }
  .vue-product-carousel .block-image .block-image-carousel:last-child a {
    margin-bottom: 0; }
  .vue-product-carousel .block-image .block-image-carousel a.background-loading {
    opacity: 0; }
  .vue-product-carousel .block-details {
    float: right;
    width: 33.33%;
    height: 100%;
    background: #fff;
    overflow-y: auto;
    border-left: 1px solid #E1E1E1;
    transform: translateX(0);
    transition: transform 0.3s ease-in-out; }
  .vue-product-carousel.zoomed .block-image {
    right: 0 !important; }
  .vue-product-carousel.zoomed .block-image .main-image {
    cursor: url(img/cursor-close.png) 22 22, auto; }
  .vue-product-carousel.zoomed .block-image .block-image-carousel{
    -moz-transform: translateX(-500px);
    -ms-transform: translateX(-500px);
    -webkit-transform: translateX(-500px);
    transform: translateX(-500px); }
  .vue-product-carousel.zoomed .block-details {
    transform: translateX(100%); }

  .vue-product-carousel .swipe, .swipe-wrap {
    visibility: visible;
    height: 100%;  }
  .vue-product-carousel .swipe-wrap > div {
    float: left;
    width: 100%;
    position: relative;  }

  @media screen and (max-width: 1279px) {
    .vue-product-carousel .block-image {
      right: 33.33%; }
    .vue-product-carousel .block-details {
      width: 33.33%; } }
  @media screen and (max-width: 1023px) {
    .vue-product-carousel {
      position: static;
      left: 0;
      right: 0;
      height: auto;
      transform: none; }
    .vue-product-carousel .block-image {
      position: static;
      right: 0;
      height: 650px;
      background: #fff; }
    .vue-product-carousel .block-image .main-image{
      display: none; }
    .vue-product-carousel .block-image .block-image-carousel {
      overflow: hidden;
      position: relative;
      top: auto;
      left: auto;
      width: 100%;
      height: 583px; }
    .vue-product-carousel .block-image .block-image-carousel .swipe-wrap {
      position: relative;
      top: auto;
      left: auto;
      transform: none;
      height: 100%;
      width: 100%; }
    .vue-product-carousel .block-image .block-image-carousel .swipe-wrap > div {
      height: 100%; }
    .vue-product-carousel .block-image .block-image-carousel a {
      width: 100%;
      height: 100%;
      opacity: 1; }
    .vue-product-carousel .block-image .swipe-dots {
      display: block;
      padding: 25px 0;
      margin: 0 80px;
      width: auto;
      z-index: 10;
      text-align: center;
      border-bottom: 1px solid #E1E1E1; }
    .vue-product-carousel .block-image .swipe-dots .btn-swipe {
      display: inline-block;
      text-indent: -5000px;
      overflow: hidden;
      height: 10px;
      width: 10px;
      border-radius: 10px;
      border: 1px solid #1e2226;
      margin: 0 2px; }
    .vue-product-carousel .block-image .swipe-dots .btn-swipe.selected,
    .vue-product-carousel .block-image .swipe-dots .btn-swipe:hover {
      background: #1e2226; }
    .vue-product-carousel .block-details {
      position: static;
      left: 0;
      top: 0;
      width: 100%; }

  }
  @media screen and (max-width: 640px) {
    .vue-product-carousel .block-image .swipe-dots {
      margin: 0 25px; }
  }
</style>
