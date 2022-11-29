<template>
  <v-container>
    <v-row
      class="full-height-has-navbar"
      :class="[{ 'align-content-center': !hasQuestions }]"
      no-gutters
    >
      <v-col
        sm="12"
        xl="4"
        lg="6"
        md="8"
        offset-md="2"
        offset-lg="3"
        offset-xl="4"
      >
        <div v-if="hasQuestions">
          <v-card elevation="4" light tag="section">
            <v-card-title class="nav-bar" primary-title>
              <v-layout align-center justify-space-between>
                <h3 class="text-white new-poll-title">Nova votação</h3>
              </v-layout>
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text> </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn elevation="2" color="white" height="50"> Novo </v-btn>
            </v-card-actions>
          </v-card>
        </div>
        <div class="welcome-notice" v-else>
          <h1 class="welcome-title">Construa sua cédula de votação</h1>
          <h2 class="welcome-subtitle">
            Vamos começar criando sua primeira questão
          </h2>
          <v-btn
            class="new-poll grow-animation grow-on-hover mt-4"
            color="success"
            elevation="2"
            x-large
            @click="newQuestion"
          >
            <v-icon left dark>mdi-plus-box</v-icon>
            Nova Questão
            <form-modal>
              <template v-slot:card-title>
                <h1>TITULO</h1>
              </template>
              <template v-slot:card-subtitle>
                <h1>SUBTITULO</h1>
              </template>
              <template v-slot:card-text>
                <h1>TEXTO</h1>
              </template>
              <template v-slot:card-actions>
                <v-btn
                  class="new-poll grow-animation grow-on-hover mt-4"
                  color="success"
                  elevation="2"
                  x-large
                  @click="newQuestion"
                ></v-btn>
              </template>
            </form-modal>
          </v-btn>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import UserHelperVue from "@/mixins/UserHelper.vue";
import PollHelperVue from "@/mixins/PollHelper.vue";
import FormModal from "@/components/atoms/FormModal.vue";
export default {
  name: "BallotOverview",
  mixins: [PollHelperVue, UserHelperVue],
  components: { FormModal },

  data() {
    return {};
  },
  computed: {
    poll() {
      return this.selectedPoll ?? {};
    },
    pollQuestions() {
      return this.poll?.questions;
    },
    hasQuestions() {
      return this.pollQuestions?.length > 0 ? true : false;
    },
  },
  methods: {
    newQuestion() {},
  },
};
</script>
