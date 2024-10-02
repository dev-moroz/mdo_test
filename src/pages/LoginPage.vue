<template>
<!--  <div>-->
<!--    <button @click="login">login</button>-->
<!--    <v-container class="d-flex justify-center align-center" style="height: 100vh;">-->
<!--&lt;!&ndash;      <v-row class="d-flex justify-center align-center">&ndash;&gt;-->
<!--&lt;!&ndash;        <v-col cols="12" style="max-width: 500px;" class="d-flex justify-center align-center">&ndash;&gt;-->
<!--          <v-card style="width: 500px;">-->
<!--            <v-card-title>-->
<!--              <h2 class="text-center">Вход</h2>-->
<!--            </v-card-title>-->

<!--            <v-card-text>-->
<!--              <v-form ref="loginForm" v-model="valid">-->
<!--                &lt;!&ndash; Логин &ndash;&gt;-->
<!--                <v-text-field-->
<!--                    label="Логин"-->
<!--                    v-model="login"-->
<!--                    :rules="[rules.required]"-->
<!--                    prepend-icon="mdi-account"-->
<!--                ></v-text-field>-->

<!--                &lt;!&ndash; Пароль с переключением видимости &ndash;&gt;-->
<!--                <v-text-field-->
<!--                    label="Пароль"-->
<!--                    v-model="password"-->
<!--                    :type="showPassword ? 'text' : 'password'"-->
<!--                    :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"-->
<!--                    @click:append="togglePasswordVisibility"-->
<!--                    :rules="[rules.required]"-->
<!--                    prepend-icon="mdi-lock"-->
<!--                ></v-text-field>-->
<!--              </v-form>-->
<!--            </v-card-text>-->

<!--            <v-card-actions>-->
<!--              <v-spacer></v-spacer>-->
<!--              <v-btn color="primary" @click="submitLogin">Войти</v-btn>-->
<!--            </v-card-actions>-->
<!--          </v-card>-->
<!--&lt;!&ndash;        </v-col>&ndash;&gt;-->
<!--&lt;!&ndash;      </v-row>&ndash;&gt;-->
<!--    </v-container>-->
<!--  </div>-->

  <v-container fluid>
    <v-row justify="center" align="center" style="height: 100vh;">
      <v-col cols="12" md="4">
        <v-card>
          <v-card-title class="headline">Login</v-card-title>
          <v-card-text>
            <v-form>
              <v-text-field
                  label="Email"
                  type="email"
                  required
              ></v-text-field>
              <v-text-field
                  label="Password"
                  type="password"
                  required
              ></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" @click="login">Login</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
// import {auth} from '../service'
export default {
  name: 'LoginPage',
  data() {
    return {
      login: '',
      password: '',
      showPassword: false, // Переключатель видимости пароля
      valid: false, // Валидация формы
      rules: {
        required: value => !!value || 'Поле обязательно для заполнения'
      }
    };
  },
  methods: {
    // async login(){
    //   const username = "79122333444"
    //   const password = "123456"
    //
    //   await auth(username, password)
    //   this.$router.push({ path: '/' });
    // },
    togglePasswordVisibility() {
      this.showPassword = !this.showPassword;
    },
    submitLogin() {
      if (this.$refs.loginForm.validate()) {
        // Здесь можно добавить логику для отправки данных на сервер
        console.log('Логин:', this.login);
        console.log('Пароль:', this.password);
      } else {
        console.log('Форма невалидна');
      }
    }
  }
}
</script>

<style scoped>

</style>