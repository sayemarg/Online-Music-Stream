<template>
  <div class="horizontal-scroll">
    <div ref="horizontal_scroll" class="horizontal-scroll__view">
      <slot></slot>
    </div>

    <div class="horizontal-scroll-switch horizontal-scroll-switch__previous" @click="scrollHorizontal(-1)">
      <i class="fa fa-angle-left"></i>
    </div>

    <div class="horizontal-scroll-switch horizontal-scroll-switch__next" @click="scrollHorizontal(1)">
      <i class="fa fa-angle-right"></i>
    </div>
  </div>
</template>

<script>
export default {
  name: "HorizontalScroll",
  methods: {
    scrollHorizontal(step) {
      const horizontalView = this.$refs.horizontal_scroll;
      horizontalView.scrollLeft += (step * horizontalView.clientWidth);
    }
  }
}
</script>

<style scoped>
  .horizontal-scroll {
    background-color: transparent;
    padding: 0 5%;
    position: relative;
    width: 100%;
    z-index: 0;
  }

  .horizontal-scroll__view {
    overflow: scroll hidden;
    scroll-behavior: smooth;
    white-space: nowrap;
  }
  /*.horizontal-scroll__view::-webkit-scrollbar {*/
  /*  !*visibility: visible;*!*/
  /*  display: none;*/
  /*}*/

  .horizontal-scroll-switch {
    background-color: #FFFFFF;
    border-radius: 50%;
    color: #000000;
    cursor: pointer;
    height: 40px;
    line-height: 40px;
    position: absolute;
    text-align: center;
    top: 100px;
    width: 40px;
    z-index: 1;
  }

  .horizontal-scroll-switch__previous {
    left: calc(5% - 20px);
  }
  .horizontal-scroll-switch__next {
    right: calc(5% - 20px);
  }
</style>
