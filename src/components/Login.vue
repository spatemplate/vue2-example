<template>
    <div class="user-login">
        <h1>Вход в систему</h1>
        <div class="row">
            <div class="col-lg-5">
                <p class="login-box-msg">Заполните следующие поля для входа:</p>
                <form @submit.prevent="login">
                    <div class="form-group field-loginform-login required">
                        <label class="control-label" for="loginform-login">Телефон</label>
                        <input id="loginform-login" v-model="email" placeholder="email" class="form-control">
                        <p class="help-block help-block-error"></p>
                    </div>
                    <div class="form-group field-loginform-password required">
                        <label class="control-label" for="loginform-password">Пароль</label>
                        <input id="loginform-password" v-model="pass" placeholder="password" type="password"
                               class="form-control"> (hint: password1)<br>
                        <p class="help-block help-block-error"></p>
                    </div>
                    <div class="form-group">
                        <button type="submit" class="btn btn-primary btn-flat">Войти</button>
                        <p v-if="error" class="error">Bad login information</p>

                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import auth from '../auth'

export default {
  data () {
    return {
      email: '',
      pass: '',
      error: false
    }
  },
  methods: {
    login () {
      auth.login(this.email, this.pass, loggedIn => {
        if (!loggedIn) {
          this.error = true
        } else {
          this.$router.replace(this.$route.query.redirect || '/')
        }
      })
    }
  }
}
</script>

<style>
.error {
  color: red;
}
</style>
