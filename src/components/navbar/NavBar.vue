<template>
  <div class="nav" :class="{ 'nav--scrolled': isScrolled }">
    <div class="nav__left">
        <div class="logo">
          <router-link :to="{ name: 'Home' }">
            <img class="logo__image" src="../../assets/logo.png" alt="Logo">
            <span class="logo__text">Music</span>
          </router-link>
        </div>
    </div>

    <div class="nav__right">
      <div class="account" @click="toggleForm">
        <img class="account__image" src="../../assets/images/no-photo.jpg" alt="Account">
      </div>
    </div>
    <NavBarForm :show="showForm" @hide-form="toggleForm" />

    <div class="nav--middle">
      <ul class="list">
        <li class="list__item">
          <router-link :to="{ name: 'Home' }">
            <i class="fa fa-home"></i> <span class="list__text">Home</span>
          </router-link>
        </li>
        <li class="list__item">
          <router-link to="#">
            <i class="fa fa-music"></i> <span class="list__text">PlayLists</span>
          </router-link>
        </li>
        <li class="list__item">
          <a href="http://sayemarg.ir" target="_blank">
            <i class="fa fa-globe"></i> <span class="list__text">Website</span>
          </a>
        </li>
        <li class="list__item">
          <router-link to="#">
            <i class="fa fa-search"></i> <span class="list__text">Search</span>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import NavBarForm from "@/components/navbar/NavBarForm";

export default {
  name: "NavBar",
  components: {
    NavBarForm
  },
  data() {
    return {
      isScrolled: false,
      showForm: false
    }
  },
  methods: {
    scrollNavbar() {
      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      this.isScrolled = (scrollTop > 20);
    },
    toggleForm() {
      this.showForm = !this.showForm;
    }
  },
  mounted() {
    window.addEventListener('scroll', this.scrollNavbar);
  },
  unmounted() {
    window.removeEventListener('scroll', this.scrollNavbar);
  }
}
</script>

<style scoped>
  .nav {
    background-color: #030303;
    padding: 10px;
    position: sticky;
    top: 0;
    transition: 0.3s ease-in-out;
    z-index: 4;
    /*overflow: auto;*/
  }
  .nav--scrolled {
    border-bottom: 1px solid #aaaaaa;
    padding: 5px;
  }
  /* Clear Fix */
  .nav::after {
    content: '';
    clear: both;
    display: block;
  }

  /* Logo */
  .nav__left {
    float: left;
  }
  .logo {
    display: inline-block;
  }
  .logo a {
    text-decoration: none;
  }
  .logo__image {
    border-radius: 50%;
    vertical-align: bottom;
    width: 50px;
  }
  .logo__text{
    color: #ffffff;
    font-size: 2.5em;
    font-weight: bolder;
    text-decoration: none;
  }

  /* Account */
  .nav__right {
    float: right;
  }
  .account {
    cursor: pointer;
    width: 50px;
  }

  .account__image {
    border-radius: 50%;
    width: 100%;
  }

  /* Middle List */
  .nav--middle {
    margin: 0 auto;
    width: 50%;
  }
  .list {
    list-style: none;
    margin: 0;
    padding: 0;
    text-align: center;
  }
  .list__item {
    background-color: #373737;
    display: inline-block;
    margin: 0 2px;
  }
  .list__item:first-of-type {
    border-radius: 7px 0 0 7px;
  }
  .list__item:last-of-type {
    border-radius: 0 7px 7px 0;
  }
  .list__item:hover {
    background-color: #454545;
  }
  .list__item a {
    color: #aaaaaa;
    display: inline-block;
    padding: 15px;
    text-decoration: none;
  }
  .list__item:hover a {
    color: #FFFFFF;
  }

  /* Media Query For Responsive */
  @media screen and (max-width: 992px) {
    .logo__text {
      font-size: 4vw;
    }

    .list__item a {
      padding: 15px 5px;
    }
  }

  @media screen and (max-width: 768px) {
    .list__text, .logo__text {
      display: none;
    }

    .list__item a {
      padding: 15px;
    }
  }
</style>
