<template>
  <v-container>
    <v-card>
      <v-card-title class="delete-nav-bar" primary-title>
        <span class="text-white new-poll-title">
          <v-icon>mdi-delete</v-icon>
          Excluir Votação
        </span>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <p>
          Tem certeza de que deseja excluir esta eleição? Esta ação não é
          reversível.
        </p>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <span class="error-text" v-if="!!error">{{ error }}</span>
        <v-btn elevation="2" color="red" variant="flat" :loading="isLoading">
          Excluir votação
          <confirm-modal @clickConfirm="deleteSelectedPoll">
            <template v-slot:card-title>
              <span class="text-white">
                <v-icon>mdi-alert</v-icon>
                Excluir votação</span
              >
              <v-divider></v-divider>
            </template>
            <template v-slot:card-text>
              <p>Realmente deseja excluir esta votação?</p>
              <h3>
                Esta ação não pode ser desfeita, os dados desta votação estarão
                perdidos para sempre!
              </h3>
            </template>
          </confirm-modal>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
import ConfirmModal from "@/components/atoms/ConfirmModal.vue";
import UserHelperVue from "@/mixins/UserHelper.vue";
import PollHelperVue from "@/mixins/PollHelper.vue";
export default {
  name: "DeletePoll",
  mixins: [PollHelperVue, UserHelperVue],
  components: {
    ConfirmModal,
  },
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
    async deleteSelectedPoll() {
      this.isLoading = true;
      try {
        await this.deletePoll(this.poll.id);
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
.delete-nav-bar {
  background-color: red !important;
}
</style>
