<template>
  <v-container>
    <v-card>
      <v-card-title>
        <v-icon>mdi-refresh</v-icon>
        Duplicar Votação</v-card-title
      >
      <v-divider></v-divider>
      <v-card-text>
        <p>
          Duplicar sua votação permite que você use esta votação como base para
          uma nova votação.
        </p>
        <p>
          Depois de duplicar sua votação, verifique se as configurações foram
          copiado corretamente. O título da sua votação será
          {{ selectedPoll.title }} (CÓPIA)
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
          @click="duplicate"
        >
          Duplicar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
import UserHelperVue from "@/mixins/UserHelper.vue";
import PollHelperVue from "@/mixins/PollHelper.vue";
export default {
  name: "DuplicatePoll",
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
    async duplicate() {
      this.isLoading = true;
      try {
        await this.duplicatePoll(this.poll);
      } catch (err) {
        this.error = err.message || "Ocorreu um erro no registro";
      }
      this.isLoading = false;
      //this.$router.replace("/dashboard");
    },
  },
};
</script>
