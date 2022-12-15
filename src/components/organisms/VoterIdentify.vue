<template>
  <v-container>
    <v-row no-gutters>
      <v-col
        sm="12"
        xl="4"
        lg="6"
        md="8"
        offset-md="2"
        offset-lg="3"
        offset-xl="4"
      >
        <v-form ref="form" @submit.prevent="verifyVoter" lazy-validation>
          <v-card elevation="4" light tag="section">
            <v-card-title class="nav-bar" primary-title>
              <v-layout align-center justify-space-between>
                <h3 class="text-white new-poll-title">
                  <v-icon> mdi-ballot </v-icon> Entre para votar
                </h3>
              </v-layout>
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text>
              <v-text-field
                v-if="poll.privacy === 1"
                v-model.trim="voter.voter_key"
                label="Chave do votante"
                name="voter_key"
                hint="Insira sua chave de votante"
              ></v-text-field>
              <v-text-field
                v-else
                v-model.trim="voter.name"
                label="Nome do votante"
                name="name"
                hint="Insira sua chave de votante"
              ></v-text-field>
              <v-text-field
                label="Email do votante"
                name="email"
                hint="Insira seu email"
                v-model.trim="v$.voter.email.$model"
                @input="v$.voter.email.$touch()"
                @blur="v$.voter.email.$touch()"
                :error-messages="emailErrors"
                required
              ></v-text-field>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
              <v-spacer></v-spacer>
              <span class="error-text" v-if="!!error">{{ error }}</span>
              <v-row>
                <v-col cols="12">
                  <v-btn
                    elevation="2"
                    class="btn-submit"
                    :loading="isLoading"
                    color="white"
                    height="50"
                    :disabled="invalid"
                    type="submit"
                  >
                    Entre para votar
                  </v-btn>
                </v-col>
              </v-row>
            </v-card-actions>
          </v-card>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import PollHelperVue from "@/mixins/PollHelper.vue";
import VoterHelperVue from "@/mixins/VoterHelper.vue";
import { useVuelidate } from "@vuelidate/core";
import { required } from "@vuelidate/validators";
export default {
  name: "VoterIdentify",
  mixins: [PollHelperVue, VoterHelperVue],
  setup() {
    return { v$: useVuelidate() };
  },
  validations() {
    return {
      voter: {
        email: { required },
      },
    };
  },
  data() {
    return {
      voter: {
        name: "",
        email: "",
        voter_key: "",
      },
      error: null,
      isLoading: false,
    };
  },
  methods: {
    verifyVoter() {
      this.v$.$touch();
      this.verifyVoterInfo(this.voter);
      this.$router.push({
        name: "votingBallot",
        params: { sharing_url: this.$route.params.sharing_url },
      });
    },
  },
  computed: {
    poll() {
      return this.selectedPoll ?? {};
    },
    emailErrors() {
      const errors = [];
      if (!this.v$.voter.email.$dirty) return errors;
      this.v$.voter.email.required.$invalid &&
        errors.push("O campo email é obrigatório");
      return errors;
    },
    invalid() {
      return this.v$.$invalid;
    },
  },
};
</script>
