<template>
  <form @submit.prevent>
    <div class="navbar-form__input-group">
      <label class="navbar-form__input-label"  for="signup_username">Username: </label>
      <input class="navbar-form__input-text" type="text" name="username"
             id="signup_username" placeholder="Enter Your Username" autocomplete="username">
    </div>
    <div class="navbar-form__input-group">
      <label class="navbar-form__input-label"  for="signup_email">Email: </label>
      <input class="navbar-form__input-text" type="email" name="email"
             id="signup_email" placeholder="Enter Your Email">
    </div>
    <div class="navbar-form__input-group">
      <label class="navbar-form__input-label"  for="signup_first_name">First Name: </label>
      <input class="navbar-form__input-text" type="text" name="first_name"
             id="signup_first_name" placeholder="Enter Your First Name">
    </div>
    <div class="navbar-form__input-group">
      <label class="navbar-form__input-label"  for="signup_last_name">Last Name: </label>
      <input class="navbar-form__input-text" type="text" name="last_name"
             id="signup_last_name" placeholder="Enter Your Last Name">
    </div>
    <div class="navbar-form__input-group">
      <label class="navbar-form__input-label"  for="signup_password1">Password: </label>
      <input class="navbar-form__input-text" type="password" name="password1"
             id="signup_password1"  placeholder="Choose A Password" autocomplete="new-password">
    </div>
    <div class="navbar-form__input-group">
      <label class="navbar-form__input-label"  for="signup_password2">Password Again: </label>
      <input class="navbar-form__input-text" type="password" name="password2"
             id="signup_password2"  placeholder="Type Your Password Again" autocomplete="new-password">
    </div>
    <div class="navbar-form__input-group">
      <button class="navbar-form__button navbar-form__button--google">
        <i class="fa fa-google"></i> Signup
      </button>
      <button class="navbar-form__button navbar-form__button--facebook">
        <i class="fa fa-facebook-square"></i> Signup
      </button>
      <button class="navbar-form__button navbar-form__button--telegram">
        <i class="fa fa-telegram"></i> Signup
      </button>
    </div>
    <div class="navbar-form__input-group">
      <button class="navbar-form__button" type="submit">Login</button>
    </div>
  </form>
</template>

<script>
export default {
  name: "SignupForm"
}
</script>
