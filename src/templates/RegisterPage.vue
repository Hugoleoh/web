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
              <h3 class="text-white">Registre-se</h3>
            </v-layout>
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <p class="mb-2">Preencha seus dados:</p>
            <v-form ref="form" lazy-validation>
              <v-text-field
                v-model.trim="v$.user.username.$model"
                :error-messages="usernameErrors"
                label="Usuário"
                name="username"
                hint="Insira seu nome de usuário"
                required
                @input="v$.user.username.$touch()"
                @blur="v$.user.username.$touch()"
              ></v-text-field>
              <v-text-field
                v-model.trim="v$.user.first_name.$model"
                :error-messages="firstNameErrors"
                label="Nome"
                name="first_name"
                hint="Insira seu nome"
                required
                @input="v$.user.first_name.$touch()"
                @blur="v$.user.first_name.$touch()"
              ></v-text-field>
              <v-text-field
                v-model.trim="v$.user.last_name.$model"
                :error-messages="lastNameErrors"
                label="Sobrenome"
                name="last_name"
                hint="Insira seu sobrenome"
                required
                @input="v$.user.last_name.$touch()"
                @blur="v$.user.last_name.$touch()"
              ></v-text-field>
              <v-text-field
                v-model.trim="v$.user.email.$model"
                :error-messages="emailErrors"
                label="Email"
                name="email"
                hint="Insira seu endereço de email"
                required
                @input="v$.user.email.$touch()"
                @blur="v$.user.email.$touch()"
              ></v-text-field>
              <v-text-field
                v-model.trim="v$.user.password.$model"
                :error-messages="passwordErrors"
                :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                :type="showPassword ? 'text' : 'password'"
                name="password"
                :hint="passwordHint"
                counter
                @click:append-inner="showPassword = !showPassword"
                label="Senha"
                required
                @input="v$.user.password.$touch()"
                @blur="v$.user.password.$touch()"
              ></v-text-field>
              <v-text-field
                v-model.trim="v$.user.cpf.$model"
                :error-messages="cpfErrors"
                label="CPF"
                name="cpf"
                hint="Insira seu CPF"
                required
                @input="v$.user.cpf.$touch()"
                @blur="v$.user.cpf.$touch()"
              ></v-text-field>
            </v-form>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>
            <span class="error-text" v-if="!!error">{{ error }}</span>
            <v-btn
              elevation="2"
              class="btn-submit"
              :loading="isLoading"
              color="white"
              height="50"
              :disabled="invalid"
              @click="submit"
            >
              Cadastrar
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { useVuelidate } from "@vuelidate/core";
import { required, minLength, email } from "@vuelidate/validators";
import UserHelperVue from "@/mixins/UserHelper.vue";
import AppHeader from "@/components/atoms/AppHeader.vue";
/*
const cpfValidator = helpers.regex(
  "[0-9]{2}[.]?[0-9]{3}[.]?[0-9]{3}[/]?[0-9]{4}[-]?[0-9]{2})|([0-9]{3}[.]?[0-9]{3}[.]?[0-9]{3}[-]?[0-9]{2}"
); */

export default {
  name: "RegisterPage",
  mixins: [UserHelperVue],
  components: {
    AppHeader,
  },
  setup() {
    return { v$: useVuelidate() };
  },
  validations() {
    return {
      user: {
        username: { required },
        first_name: { required },
        last_name: { required },
        email: { required, email },
        cpf: {},
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
      user: {
        username: "",
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        cpf: "",
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
    usernameErrors() {
      const errors = [];
      if (!this.v$.user.username.$dirty) return errors;
      this.v$.user.username.required.$invalid &&
        errors.push("O campo usuário é obrigatório");
      return errors;
    },
    firstNameErrors() {
      const errors = [];
      if (!this.v$.user.first_name.$dirty) return errors;
      this.v$.user.first_name.required.$invalid &&
        errors.push("O campo nome é obrigatório");
      return errors;
    },
    lastNameErrors() {
      const errors = [];
      if (!this.v$.user.last_name.$dirty) return errors;
      this.v$.user.last_name.required.$invalid &&
        errors.push("O campo sobrenome é obrigatório");
      return errors;
    },
    emailErrors() {
      const errors = [];
      if (!this.v$.user.email.$dirty) return errors;
      this.v$.user.email.required.$invalid &&
        errors.push("O campo endereço de email é obrigatório");
      this.v$.user.email.email.$invalid &&
        errors.push("Por favor, insira um email válido");
      return errors;
    },
    passwordErrors() {
      const errors = [];
      if (!this.v$.user.password.$dirty) return errors;
      this.v$.user.password.minLength.$invalid &&
        errors.push(
          "Sua senha deve ter pelo menos " +
            this.requiredPasswordLength +
            " caracteres"
        );
      this.v$.user.password.required.$invalid &&
        errors.push("O campo senha é obrigatório");
      return errors;
    },
    cpfErrors() {
      /*  const errors = [];
      if (!this.v$.cpf.$dirty) return errors;
      this.v$.cpf.cpfValidator.$invalid &&
        errors.push("Por favor, insira um CPF válido");
      return errors; */
      return [];
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
        await this.fetchRegister(this.user);
      } catch (err) {
        this.error = err.message || "Ocorreu um erro no registro";
      }
      this.isLoading = false;
      this.clear();
    },
    clear() {
      this.v$.$reset();
      this.user = {
        username: "",
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        cpf: "",
      };
    },
  },
};
</script>

<style>
.login-card {
  margin-top: 5rem;
}
</style>
