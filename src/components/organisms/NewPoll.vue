<template>
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
        <v-form ref="form" @submit.prevent="create" lazy-validation>
          <v-card elevation="4" light tag="section">
            <v-card-title class="nav-bar" primary-title>
              <v-layout align-center justify-space-between>
                <h3 class="text-white new-poll-title">Nova votação</h3>
              </v-layout>
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text>
              <v-text-field
                v-model.trim="v$.poll.title.$model"
                :error-messages="titleErrors"
                label="Título"
                name="title"
                hint="Insira o título da sua votação"
                required
                @input="v$.poll.title.$touch()"
                @blur="v$.poll.title.$touch()"
              ></v-text-field>
              <v-text-field
                v-model.trim="v$.poll.initial_date.$model"
                :error-messages="initialDateErrors"
                label="Data de início"
                name="initial_date"
                type="datetime-local"
                hint="Insira a data da abertura da votação"
                required
                @input="v$.poll.initial_date.$touch()"
                @blur="v$.poll.initial_date.$touch()"
              ></v-text-field>
              <v-text-field
                v-model.trim="v$.poll.end_date.$model"
                :error-messages="endDateErrors"
                label="Data de término"
                name="end_date"
                type="datetime-local"
                hint="Insira a data da término da votação"
                required
                @input="v$.poll.end_date.$touch()"
                @blur="v$.poll.end_date.$touch()"
              ></v-text-field>
              <v-textarea
                name="description"
                label="Descrição"
                v-model="v$.poll.description"
                hint="Insira uma descrição"
              ></v-textarea>
              <v-switch
                v-model="poll.privacy"
                hide-details
                color="#283e79"
                inset
                label="Eleição Privada"
              ></v-switch>
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
                type="submit"
              >
                Salvar
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { useVuelidate } from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import UserHelperVue from "@/mixins/UserHelper.vue";
import PollHelperVue from "@/mixins/PollHelper.vue";
export default {
  name: "NewPoll",
  mixins: [PollHelperVue, UserHelperVue],
  setup() {
    return { v$: useVuelidate() };
  },
  validations() {
    return {
      poll: {
        title: { required },
        initial_date: { required },
        end_date: { required },
      },
    };
  },
  data() {
    return {
      poll: {
        title: "",
        description: "",
        initial_date: "",
        end_date: "",
        privacy: null,
      },
      isLoading: false,
      error: null,
    };
  },
  computed: {
    titleErrors() {
      const errors = [];
      if (!this.v$.poll.title.$dirty) return errors;
      this.v$.poll.title.required.$invalid &&
        errors.push("O campo título é obrigatório");
      return errors;
    },
    initialDateErrors() {
      const errors = [];
      if (!this.v$.poll.initial_date.$dirty) return errors;
      this.v$.poll.initial_date.required.$invalid &&
        errors.push("O campo data de início é obrigatório");
      return errors;
    },
    endDateErrors() {
      const errors = [];
      if (!this.v$.poll.end_date.$dirty) return errors;
      this.v$.poll.end_date.required.$invalid &&
        errors.push("O campo data da término é obrigatório");
      return errors;
    },
    invalid() {
      return this.v$.$invalid;
    },
  },
  methods: {
    async create() {
      this.v$.$touch();
      this.isLoading = true;
      try {
        await this.createPoll(this.poll);
      } catch (err) {
        this.error = err.message || "Ocorreu um erro no registro";
      }
      this.isLoading = false;
      this.$router.replace("/dashboard");
    },
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
