<template>
  <AppHeader />
  <v-banner class="dashboard-banner" sticky no-gutters>
    <v-container>
      <v-row>
        <v-col cols="col-10" sm="6" xl="10" lg="9" md="8">
          <h2>
            <v-icon>mdi-card-account-details</v-icon>
            Informações de {{ loggedUser.username }}
          </h2>
          <!-- <span class="poll-title-text">
              {{ loggedUser.first_name + " " + loggedUser.last_name }}
            </span> -->
        </v-col>
      </v-row>
    </v-container>
  </v-banner>
  <v-container class="login-card">
    <v-row no-gutters>
      <v-col
        sm="12"
        xl="6"
        lg="8"
        md="10"
        offset-md="1"
        offset-lg="2"
        offset-xl="3"
        class="mb-5"
      >
        <v-form ref="form" @submit.prevent="edit" lazy-validation>
          <v-card elevation="4" light tag="section">
            <v-card-title class="nav-bar" primary-title>
              <v-layout align-center justify-space-between>
                <h3 class="text-white new-poll-title">Editar informações</h3>
              </v-layout>
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text>
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
                v-model.trim="v$.user.cpf.$model"
                :error-messages="cpfErrors"
                label="CPF"
                name="cpf"
                hint="Insira seu CPF"
                required
                @input="v$.user.cpf.$touch()"
                @blur="v$.user.cpf.$touch()"
              ></v-text-field>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                elevation="2"
                class="btn-submit"
                :loading="isEditLoading"
                color="white"
                height="50"
                type="submit"
              >
                Salvar
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-form>
      </v-col>
      <v-col
        sm="12"
        xl="6"
        lg="8"
        md="10"
        offset-md="1"
        offset-lg="2"
        offset-xl="3"
        class="mt-5"
      >
        <v-form ref="form" @submit.prevent="changeUserPassword" lazy-validation>
          <v-card elevation="4" light tag="section">
            <v-card-title class="nav-bar" primary-title>
              <v-layout align-center justify-space-between>
                <h3 class="text-white new-poll-title">Trocar senha</h3>
              </v-layout>
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text>
              <v-row>
                <v-col cols="6">
                  <v-text-field
                    v-model.trim="v$.password.current.$model"
                    :error-messages="currentPasswordErrors"
                    :append-inner-icon="
                      showCurrentPassword ? 'mdi-eye' : 'mdi-eye-off'
                    "
                    :type="showCurrentPassword ? 'text' : 'password'"
                    name="currentPassword"
                    :hint="passwordHint"
                    counter
                    @click:append-inner="
                      showCurrentPassword = !showCurrentPassword
                    "
                    label="Senha"
                    @input="v$.password.current.$touch()"
                    @blur="v$.password.current.$touch()"
                  ></v-text-field>
                </v-col>
                <v-col cols="6">
                  <v-text-field
                    v-model.trim="v$.password.new.$model"
                    :error-messages="newPasswordErrors"
                    :append-inner-icon="
                      showNewPassword ? 'mdi-eye' : 'mdi-eye-off'
                    "
                    :type="showNewPassword ? 'text' : 'password'"
                    name="newPassword"
                    :hint="passwordHint"
                    counter
                    @click:append-inner="showNewPassword = !showNewPassword"
                    label="Senha"
                    @input="v$.password.new.$touch()"
                    @blur="v$.password.new.$touch()"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                elevation="2"
                class="btn-submit"
                :loading="isPasswordLoading"
                color="white"
                height="50"
                type="submit"
              >
                Trocar senha
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-form>
      </v-col>
    </v-row>
    <v-snackbar
      v-model="snackbar"
      :color="snackbarConfig.color"
      :timeout="timeout"
      vertical
    >
      <h3 class="text-subtitle-1 pb-2">
        <v-icon>{{ snackbarConfig.icon }}</v-icon>
        {{ snackbarConfig.title }}
      </h3>
      <p>
        {{ snackbarConfig.text }}
      </p>
    </v-snackbar>
  </v-container>
</template>

<script>
import AppHeader from "@/components/atoms/AppHeader.vue";
import { useVuelidate } from "@vuelidate/core";
import { required, minLength, email } from "@vuelidate/validators";
import UserHelperVue from "@/mixins/UserHelper.vue";
export default {
  name: "EditUser",
  mixins: [UserHelperVue],
  setup() {
    return { v$: useVuelidate() };
  },
  components: { AppHeader },
  validations() {
    return {
      user: {
        first_name: { required },
        last_name: { required },
        email: { required, email },
        cpf: {},
      },
      password: {
        current: {
          required,
          minLength: minLength(this.requiredPasswordLength),
        },
        new: {
          required,
          minLength: minLength(this.requiredPasswordLength),
        },
      },
    };
  },
  data() {
    return {
      showCurrentPassword: false,
      showNewPassword: false,
      user: {
        first_name: "",
        last_name: "",
        email: "",
        cpf: "",
      },
      password: {
        current: "",
        new: "",
      },
      isEditLoading: false,
      isPasswordLoading: false,
      error: null,
      requiredPasswordLength: 6,
      snackbarConfig: {},
      snackbar: false,
    };
  },
  computed: {
    passwordHint() {
      return "Pelo menos " + this.requiredPasswordLength + " caracteres";
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
    currentPasswordErrors() {
      const errors = [];
      if (!this.v$.password.current.$dirty) return errors;
      this.v$.password.current.minLength.$invalid &&
        errors.push(
          "Sua senha deve ter pelo menos " +
            this.requiredPasswordLength +
            " caracteres"
        );
      this.v$.password.current.required.$invalid &&
        errors.push("O campo senha é obrigatório");
      return errors;
    },
    newPasswordErrors() {
      const errors = [];
      if (!this.v$.password.new.$dirty) return errors;
      this.v$.password.new.minLength.$invalid &&
        errors.push(
          "Sua senha deve ter pelo menos " +
            this.requiredPasswordLength +
            " caracteres"
        );
      this.v$.password.new.required.$invalid &&
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
    async edit() {
      this.v$.$touch();
      this.isEditLoading = true;
      try {
        await this.editUser(this.user);
        this.snackbarConfig = {
          icon: "mdi-check-circle",
          color: "success",
          title: "Sucesso",
          text: "Voto computado com sucesso!",
        };
        this.snackbar = true;
      } catch (err) {
        this.error = err.message || "Ocorreu um erro no registro";
        this.snackbarConfig = {
          icon: "mdi-close-octagon",
          color: "red",
          title: "Erro",
          text: this.error,
        };
        this.snackbar = true;
      }
      this.isEditLoading = false;
    },
    async changeUserPassword() {
      this.v$.$touch();
      this.isPasswordLoading = true;
      try {
        await this.changePassword(this.password);
        this.snackbarConfig = {
          icon: "mdi-check-circle",
          color: "success",
          title: "Sucesso",
          text: "Voto computado com sucesso!",
        };
        this.snackbar = true;
      } catch (err) {
        this.error = err.message || "Ocorreu um erro no registro";
        this.snackbarConfig = {
          icon: "mdi-close-octagon",
          color: "red",
          title: "Erro",
          text: this.error,
        };
        this.snackbar = true;
      }
      this.isPasswordLoading = false;
    },
  },
  async mounted() {
    await this.fetchLoggedUser();
    this.user.first_name = this.loggedUser.first_name;
    this.user.last_name = this.loggedUser.last_name;
    this.user.email = this.loggedUser.email;
    this.user.cpf = this.loggedUser.cpf;
  },
};
</script>

<style scoped>
.new-poll-title {
  font-weight: 500;
  margin-bottom: 0.5rem;
  font-family: inherit;
  line-height: 1.2;
}
</style>
