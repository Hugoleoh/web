<template>
  <app-header :hasSidebar="false" />
  <v-container class="login-card">
    <v-row no-gutters>
      <!-- <v-col cols="12"> -->
      <v-col
        sm="12"
        xl="4"
        lg="6"
        md="8"
        offset-md="2"
        offset-lg="3"
        offset-xl="4"
      >
        <v-card elevation="4" light tag="section">
          <v-card-title class="nav-bar" primary-title>
            <v-layout align-center justify-space-between>
              <h3 class="text-white">Login</h3>
            </v-layout>
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <p class="mb-2">
              Faça login com seu nome de usuário ou email e senha:
            </p>
            <v-form ref="form" lazy-validation>
              <v-text-field
                v-model.trim="v$.credentials.user.$model"
                :error-messages="userErrors"
                label="Usuário"
                name="user"
                hint="Insira seu email ou usuário"
                required
                @input="v$.credentials.user.$touch()"
                @blur="v$.credentials.user.$touch()"
              ></v-text-field>
              <v-text-field
                v-model.trim="v$.credentials.password.$model"
                :error-messages="passwordErrors"
                :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                :type="showPassword ? 'text' : 'password'"
                name="password"
                :hint="passwordHint"
                counter
                @click:append-inner="showPassword = !showPassword"
                label="Senha"
                required
                @input="v$.credentials.password.$touch()"
                @blur="v$.credentials.password.$touch()"
              ></v-text-field>
            </v-form>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-btn color="#283e79" flat> Esqueceu a senha? </v-btn>
            <v-spacer></v-spacer>
            <span class="error-text" v-if="!!error">{{ error }}</span>
            <v-btn
              elevation="2"
              class="btn-submit"
              color="white"
              height="50"
              :disabled="invalid"
              @click="submit"
            >
              Entrar
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { useVuelidate } from "@vuelidate/core";
import { required, minLength } from "@vuelidate/validators";
import UserHelperVue from "@/mixins/UserHelper.vue";
import AppHeader from "@/components/atoms/AppHeader.vue";

export default {
  name: "LoginPage",
  mixins: [UserHelperVue],
  components: {
    AppHeader,
  },
  setup() {
    return { v$: useVuelidate() };
  },
  validations() {
    return {
      credentials: {
        user: { required },
        password: {
          required,
          minLength: minLength(this.requiredPasswordLength),
        },
      },
    };
  },

  data() {
    return {
      showPassword: false,
      credentials: {
        user: "",
        password: "",
      },
      isLoading: false,
      error: null,
      requiredPasswordLength: 6,
    };
  },
  computed: {
    passwordHint() {
      return "Pelo menos " + this.requiredPasswordLength + " caracteres";
    },
    userErrors() {
      const errors = [];
      if (!this.v$.credentials.user.$dirty) return errors;
      this.v$.credentials.user.required.$invalid &&
        errors.push("O campo usuário é obrigatório");
      return errors;
    },
    passwordErrors() {
      const errors = [];
      if (!this.v$.credentials.password.$dirty) return errors;
      this.v$.credentials.password.minLength.$invalid &&
        errors.push(
          "Sua senha deve ter pelo menos " +
            this.requiredPasswordLength +
            " caracteres"
        );
      this.v$.credentials.password.required.$invalid &&
        errors.push("O campo senha é obrigatório");
      return errors;
    },
    invalid() {
      return this.v$.$invalid;
    },
  },
  methods: {
    async submit() {
      this.v$.$touch();
      this.isLoading = true;
      try {
        await this.fetchLogin(this.credentials);
      } catch (err) {
        this.error = "Seu usuário ou senha estão incorretos.";
      }
      this.isLoading = false;
      this.clear();
    },
    clear() {
      this.v$.$reset();
      this.credentials.user = "";
      this.credentials.password = "";
    },
  },
};
</script>

<style>
.login-card {
  margin-top: 5rem;
}
</style>
