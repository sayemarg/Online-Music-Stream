<template>
  <form @submit.prevent>
    <div class="navbar-form__input-group">
      <label class="navbar-form__input-label" for="signing_username">Username: </label>
      <input class="navbar-form__input-text" type="text" name="username"
             id="signing_username" placeholder="Enter Your Username" autocomplete="username">
    </div>
    <div class="navbar-form__input-group">
      <label class="navbar-form__input-label" for="signing_password">Password: </label>
      <input class="navbar-form__input-text" type="password" name="password"
             id="signing_password"  placeholder="Enter Your Password" autocomplete="current-password">
    </div>
    <div class="navbar-form__input-group">
      <button class="navbar-form__button navbar-form__button--google">
        <i class="fa fa-google"></i> Signing
      </button>
      <button class="navbar-form__button navbar-form__button--facebook">
        <i class="fa fa-facebook-square"></i> Signing
      </button>
      <button class="navbar-form__button navbar-form__button--telegram">
        <i class="fa fa-telegram"></i> Signing
      </button>
    </div>
    <div class="navbar-form__input-group">
      <button class="navbar-form__button" type="submit">Login</button>
    </div>
  </form>
</template>

<script>
export default {
  name: "SigningForm"
}
</script>

<style>
/* Form Styles */
.navbar-form__input-group {
  margin: 20px;
}
.navbar-form__input-label {
  color: #ffffff;
  display: inline-block;
  text-align: center;
  width: 20%;
}
.navbar-form__input-text {
  background-color: #707070;
  border: none;
  border-radius: 5px;
  color: #EEF0F2;
  display: inline-block;
  font-weight: bold;
  padding: 10px;
  width: 80%;
}
.navbar-form__input-text::placeholder {
  color: #aaaaaa;
  font-weight: bold;
}
.navbar-form__input-text:focus {
  border: 1px solid #ffffff;
  padding: 9px;
}
.navbar-form__button {
  border: none;
  border-radius: 15px;
  cursor: pointer;
  display: block;
  margin: 10px auto;
  padding: 10px;
  transition: background-color 0.1s ease-in-out, width 0.3s ease-in-out;
  width: 50%;
}
.navbar-form__button[type="submit"] {
  width: 100%;
  margin-bottom: 0;
}
.navbar-form__button[type="submit"]:active {
  background-color: #aaaaaa;
}
.navbar-form__button--google {
  background-color: #D54836;
  color: #ffffff;
}
.navbar-form__button--google:active {
  background-color: #a7382a;
}
.navbar-form__button--facebook {
  background-color: #4064AC;
  color: #ffffff;
}
.navbar-form__button--facebook:active {
  background-color: #2c4577;
}
.navbar-form__button--telegram {
  background-color: #33A8DA;
  color: #ffffff;
}
.navbar-form__button--telegram:active {
  background-color: #25586e;
}

@media screen and (max-width: 768px) {
  .navbar-form__input-label {
    display: block;
    text-align: left;
    width: 100%;
  }
  .navbar-form__input-text {
    display: block;
    width: 100%;
  }
  .navbar-form__button {
    width: 100%;
  }
}
</style>
