<template>
  <div class="login-page">
    <v-container fluid class="login-page__container">
      <v-row justify="center" align="center" style="height: 100vh;">
        <v-col cols="12" md="4">
          <v-card>
            <div class="login-page__container__title">
              <span class="text-center">Авторизация</span>
            </div>

            <v-card-text class="login-page__container__text">
              <v-form ref="loginForm" v-model="valid">
                <v-text-field
                    label="Логин или телефон"
                    v-model="username"
                    :rules="[rules.required]"
                    prepend-icon="mdi-account"
                ></v-text-field>

                <v-text-field
                    label="Пароль"
                    v-model="password"
                    :type="showPassword ? 'text' : 'password'"
                    :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                    @click:append="togglePasswordVisibility"
                    :rules="[rules.required]"
                    prepend-icon="mdi-lock"
                ></v-text-field>
              </v-form>
            </v-card-text>
            <v-card-actions class="justify-center login-page__container__action">
              <v-btn class="login-page__container__action__btn" @click="login">Войти</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import {auth} from '../service'
export default {
  name: 'LoginPage',
  data() {
    return {
      username: '',
      password: '',
      showPassword: false,
      valid: false,
      rules: {
        required: value => !!value || 'Поле обязательно для заполнения'
      }
    };
  },
  methods: {
    async login(){
      if (this.$refs.loginForm.validate()) {
        const isLogin = await auth(this.username, this.password)
        if(isLogin) this.$router.push({ path: '/' });
      } else {
        console.log('Форма невалидна');
      }
    },
    togglePasswordVisibility() {
      this.showPassword = !this.showPassword;
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/variables.css';

.login-page{
  background-image: url('../assets/bg.jpeg');
  background-size: cover;
  background-position: center;

  &__container{
    background-color: rgba(0, 0, 0, 0.3);

    &__title{
      color: white;
      background-color: var(--primary-color);
      position: absolute;
      top: -19px;
      height: 55px;
      width: calc(100% - 30px);
      right: 15px;
      border-radius: 5px;

      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      span{
        font-weight: 500;
      }
    }

    &__text{
      padding-top: 70px;
      padding-bottom: 10px;
    }

    &__action {
      padding-top: 0;
      padding-bottom: 20px;
      &__btn {
        color: white;
        background-color: var(--primary-color) !important;
        width: 110px;
        box-shadow: 0px 4px 4px 0px #6AAE5E40;
      }
    }
  }
}
</style>