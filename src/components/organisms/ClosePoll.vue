<template>
  <v-container>
    <v-card>
      <v-card-title>
        <v-icon>mdi-flag-checkered</v-icon>
        Finalizar Votação</v-card-title
      >
      <v-divider></v-divider>
      <v-card-text>
        <p>
          Finalizar esta eleição resultará no término imediato da eleição. Os
          votantes não poderão submeter novas cédulas de voto.
        </p>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <span class="error-text" v-if="!!error">{{ error }}</span>
        <v-btn
          elevation="2"
          class="btn-submit"
          :loading="isLoading"
          color="white"
          height="50"
          @click="close"
        >
          Finalizar votação
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
import UserHelperVue from "@/mixins/UserHelper.vue";
import PollHelperVue from "@/mixins/PollHelper.vue";
export default {
  name: "ClosePoll",
  mixins: [PollHelperVue, UserHelperVue],
  data() {
    return {
      isLoading: false,
      error: "",
    };
  },
  computed: {
    poll() {
      return this.selectedPoll ?? {};
    },
  },
  methods: {
    async close() {
      this.isLoading = true;
      try {
        await this.closePoll(this.poll.id);
      } catch (err) {
        this.error = err.message || "Ocorreu um erro no registro";
      }
      this.isLoading = false;
      //this.$router.replace("/dashboard");
    },
  },
};
</script>
