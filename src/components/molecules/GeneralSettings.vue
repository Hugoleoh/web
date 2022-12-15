<template>
  <v-container>
    <v-form ref="form" @submit.prevent="edit" lazy-validation>
      <v-card elevation="4" light tag="section">
        <v-card-title class="nav-bar" primary-title>
          <v-layout align-center justify-space-between>
            <h3 class="text-white new-poll-title">
              <v-icon> mdi-cog </v-icon> Informações gerais
            </h3>
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
          <v-textarea
            name="description"
            label="Descrição"
            v-model="v$.poll.description"
            hint="Insira uma descrição"
          ></v-textarea>
          <v-switch
            v-model="poll.privacy"
            hide-details
            inset
            color="#283e79"
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
  </v-container>
</template>

<script>
import { useVuelidate } from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import UserHelperVue from "@/mixins/UserHelper.vue";
import PollHelperVue from "@/mixins/PollHelper.vue";
export default {
  name: "GeneralSettings",
  mixins: [PollHelperVue, UserHelperVue],
  setup() {
    return { v$: useVuelidate() };
  },
  validations() {
    return {
      poll: {
        title: { required },
      },
    };
  },
  data() {
    return {
      poll: {
        title: "",
        description: "",
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
    invalid() {
      return this.v$.$invalid;
    },
  },
  methods: {
    async edit() {
      this.v$.$touch();
      this.isLoading = true;
      try {
        this.poll.id = this.selectedPoll.id;
        await this.generalEdit(this.poll);
      } catch (err) {
        this.error = err.message || "Ocorreu um erro no registro";
      }
      this.isLoading = false;
      //this.$router.replace("/dashboard");
    },
  },
  mounted() {
    this.poll = this.selectedPoll;
  },
};
</script>
