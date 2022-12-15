<template>
  <v-container>
    <v-form ref="form" @submit.prevent="edit" lazy-validation>
      <v-card elevation="4" light tag="section">
        <v-card-title class="nav-bar" primary-title>
          <v-layout align-center justify-space-between>
            <h3 class="text-white new-poll-title">
              <v-icon>mdi-calendar</v-icon>
              Datas da votação
            </h3>
          </v-layout>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <v-row>
            <v-col cols="6">
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
            </v-col>
            <v-col cols="6">
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
            </v-col>
          </v-row>
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
  name: "DatesSettings",
  mixins: [PollHelperVue, UserHelperVue],
  setup() {
    return { v$: useVuelidate() };
  },
  validations() {
    return {
      poll: {
        initial_date: { required },
        end_date: { required },
      },
    };
  },
  data() {
    return {
      poll: {
        initial_date: "",
        end_date: "",
      },
      isLoading: false,
      error: null,
    };
  },
  computed: {
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
    async edit() {
      this.v$.$touch();
      this.isLoading = true;
      try {
        this.poll.id = this.selectedPoll.id;
        await this.updateDates(this.poll);
      } catch (err) {
        this.error = err.message || "Ocorreu um erro no registro";
      }
      this.isLoading = false;
      //this.$router.replace("/dashboard");
    },
  },
  mounted() {
    this.poll.initial_date = this.selectedPoll.initial_date;
    this.poll.end_date = this.selectedPoll.end_date;
  },
};
</script>
