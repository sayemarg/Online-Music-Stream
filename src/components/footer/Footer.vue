<template>
  <div class="container">
    <ul class="apps">
      <li class="apps__item">
        <a href="#"><img src="../../assets/images/get_it_on_google_play.png" alt="Google Play"></a>
      </li>
      <li class="apps__item">
        <a href="#"><img src="../../assets/images/get_it_on_app_store.png" alt="Apple Store"></a>
      </li>
    </ul>

    <ul class="links">
      <li class="links__item">
        <a href="#">Application</a>
      </li>
      <li class="links__item">
        <a href="#">Facebook</a>
      </li>
      <li class="links__item">
        <a href="#">Instagram</a>
      </li>
      <li class="links__item">
        <a href="#">Telegram</a>
      </li>
      <li class="links__item">
        <a href="#">Privacy Policy</a>
      </li>
      <li class="links__item">
        <a href="#">Terms Of Service</a>
      </li>
    </ul>

    <p class="copy-right">
      <small class="copy-right__text">&copy; 2021 SayeMarg Developed</small>
    </p>
  </div>
</template>

<script>
export default {
  name: "Footer"
}
</script>

<style scoped>
  .container {
    background-color: #030303;
    margin-bottom: 75px;
    padding: 50px;
    text-align: center;
  }

  .apps, .links {
    list-style: none;
    margin: 0 0 20px;
    padding: 0;
  }

  .apps__item, .links__item {
    display: inline-block;
    margin: 0 5px;
  }

  .apps__item:hover {
    opacity: 0.6;
  }

  .links__item a {
    color: #FFFFFF;
    text-decoration: none;
  }
  .links__item a:hover {
    color: #aaaaaa;
  }

  .copy-right {
    margin-bottom: 0;
  }
  .copy-right__text {
    color: #aaaaaa;
  }
</style>
