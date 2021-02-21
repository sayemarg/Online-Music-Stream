<template>
  <div class="error__container" v-show="errorList.length">
    <div class="error" v-for="(error, index) in errorList" :key="index">
      {{ error }}
    </div>
  </div>
</template>

<script>
export default {
  name: "ErrorList",
  data() {
    return {
      errorList: []
    }
  },
  mounted() {
    this.$bus.on('error', (message) => {
      this.errorList.push(message);
      setTimeout(() => {
        this.errorList.shift();
      }, 3000)
    })
  }
}
</script>

<style scoped>
@keyframes slide-right {
  from {
    transform: translateY(100px);
  }
  to {
    transform: translateX(0px);
  }
}

.error__container {
  align-items: center;
  background-color: transparent;
  display: flex;
  flex-flow: column nowrap;
  max-height: 70vh;
  overflow: auto;
  position: fixed;
  right: 0;
  top: 100px;
  width: 30%;
  z-index: 5;
}

.error {
  animation: slide-right 0.2s linear;
  background-color: #ff0000;
  border-radius: 5px;
  color: #ffffff;
  cursor: not-allowed;
  display: block;
  font-weight: bold;
  margin: 10px auto;
  padding: 10px 30px;
  text-align: center;
  transition: width 0.3s ease-in-out;
  width: 80%;
}

@media screen and (max-width: 992px) {
  .error__container {
    width: 50%;
  }
}
@media screen and (max-width: 768px) {
  .error__container {
    width: 100%;
  }
}
</style>
