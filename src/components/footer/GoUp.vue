<template>
  <div class="go-up" :class="{ 'go-up--visible': isVisible, 'go-up--playing': is_playing }" @click="scrollToTop">
    <i class="fa fa-arrow-up"></i>
  </div>
</template>

<script>
export default {
  name: "GoUp",
  props: {
    is_playing: {
      type: Boolean,
      required: true,
      default: false
    }
  },
  data() {
    return {
      isVisible: false
    }
  },
  methods: {
    scrollGoUp() {
      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      this.isVisible = (scrollTop > 20);
    },
    scrollToTop() {
      const move = {
        top: 0,
        behavior: 'smooth'
      }
      window.scrollTo(move)
    }
  },
  mounted() {
    window.addEventListener('scroll', this.scrollGoUp);
  },
  unmounted() {
    window.removeEventListener('scroll', this.scrollGoUp);
  }
}
</script>

<style scoped>
  .go-up {
    background-color: #FFFFFF;
    border: 1px solid gray;
    border-radius: 50%;
    bottom: 5%;
    cursor: pointer;
    height: 75px;
    /* Vertical Align */
    line-height: 75px;
    opacity: 0;
    position: fixed;
    right: 5%;
    text-align: center;
    transition: 0.3s ease-in-out;
    visibility: hidden;
    width: 75px;
    z-index: 3;
  }
  .go-up--visible {
    opacity: 1;
    visibility: visible;
  }
  .go-up--playing {
    bottom: 150px;
  }
</style>
