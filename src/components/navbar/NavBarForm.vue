<template>
  <div v-show="show" class="navbar-form__container" @click.self="hideForm">
    <div class="navbar-form">
      <div class="navbar-form__tabs">
        <div class="navbar-form__tab" :class="{ 'navbar-form__tab--active': selectedTab === 0 }"
             @click="changeTab(0)">SignIn</div>
        <div class="navbar-form__tab" :class="{ 'navbar-form__tab--active': selectedTab === 1 }"
             @click="changeTab(1)">SignUp</div>
      </div>

      <div class="navbar-form__form" v-show="selectedTab === 0">
        <SigningForm/>
      </div>

      <div class="navbar-form__form" v-show="selectedTab === 1">
        <SignupForm/>
      </div>
    </div>
  </div>
</template>

<script>
import SignupForm from "@/components/navbar/SignupForm";
import SigningForm from "@/components/navbar/SigningForm";

export default {
  name: "NavBarForm",
  components: {
    SignupForm,
    SigningForm,
  },
  data() {
    return {
      selectedTab: 0
    }
  },
  props: {
    show: {
      type: Boolean,
      required: true,
      default: false
    }
  },
  methods: {
    hideForm() {
      this.$emit('hide-form');
    },
    // Change Component
    changeTab(index) {
      this.selectedTab = index;
    }
  }
}
</script>

<style scoped>
  /* Full Screen Background */
  .navbar-form__container {
    background-color: rgba(0, 0, 0, 0.7);
    height: 100%;
    left: 0;
    position: fixed;
    top: 0;
    width: 100%;
  }
  /* Form Container */
  .navbar-form {
    background-color: #141414;
    border-radius: 15px;
    margin: 50px auto;
    padding: 20px;
    transition: width 0.3s linear;
    width: 60%;
  }

  /* Tabs */
  .navbar-form__tab {
    border-radius: 5px 5px 0 0;
    color: #ffffff;
    cursor: pointer;
    display: inline-block;
    padding: 10px 20px;
    text-align: center;
    transition: background-color 0.5s ease-in-out;
    width: 50%;
  }
  .navbar-form__tab:hover {
    background-color: #404040;
  }
  .navbar-form__tab--active {
    border-bottom: 2px solid #ffffff;
  }

  /* Each Form Container */
  .navbar-form__form {
    max-height: 80vh;
    overflow: scroll;
  }

  @media screen and (max-width: 992px) {
    .navbar-form {
      width: 80%;
    }
  }
</style>
