<template>
    <div class="user-login">
        <h1>Вход в систему</h1>
        <div class="row">
            <div class="col-lg-5">
                <p class="login-box-msg">Заполните следующие поля для входа:</p>
                <form @submit.prevent="auth">
                    <div class="form-group field-loginform-login required">
                        <label class="control-label" for="loginform-login">Телефон</label>
                        <input id="loginform-login" v-model="login" placeholder="email" class="form-control">
                        <p class="help-block help-block-error"></p>
                    </div>
                    <div class="form-group field-loginform-password required">
                        <label class="control-label" for="loginform-password">Пароль</label>
                        <input id="loginform-password" v-model="password" placeholder="password" type="password"
                               class="form-control"> (hint: password1)<br>
                        <p class="help-block help-block-error"></p>
                    </div>
                    <div class="form-group">
                        <button type="submit" class="btn btn-primary btn-flat">Войти</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
    import store from "../../../../config/store";

    export default {
        data() {
            return {
                login: '',
                password: '',
            }
        },
        methods: {
            auth() {
                store.auth.dispatch('auth', {
                    login: this.login,
                    password: this.password,
                });
            }
        }
    }
</script>
