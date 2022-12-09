<template>
  <v-banner v-if="hasVoters" class="dashboard-banner" sticky no-gutters>
    <v-container>
      <v-row>
        <v-col cols="col-10" sm="6" xl="10" lg="9" md="8">
          <span class="poll-title-text">
            <v-chip
              label
              size="x-large"
              color="green"
              prepend-icon="mdi-account-group"
            >
              Votantes: {{ votersCount }}
            </v-chip>
          </span>
        </v-col>
        <v-col class="align-end" cols="2" sm="6" xl="2" lg="3" md="4">
          <v-btn class="grow-on-hover" color="success" elevation="2" x-large>
            <v-icon left dark>mdi-plus-box</v-icon>
            Adicionar Votante
            <form-modal @clickSave="addNewVoter">
              <template v-slot:card-title>
                <span class="text-white">Novo Votante</span>
                <v-divider></v-divider>
              </template>

              <template v-slot:card-text>
                <new-voter @changeForm="updateVoterModel"></new-voter>
              </template>
            </form-modal>
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-banner>
  <v-container>
    <v-row
      class="full-height-has-navbar justify-center"
      :class="[{ 'align-content-center': !hasVoters }]"
      no-gutters
    >
      <v-col cols="12">
        <div v-if="hasVoters">
          <v-card elevation="2" class="mb-5 mt-5" light tag="section">
            <v-card-text>
              <v-table fixed-header max-height="500px">
                <thead>
                  <tr>
                    <th class="text-left">Nome</th>
                    <th class="text-left">Chave do votante</th>
                    <th class="text-left">Email</th>
                    <th class="text-left">Peso de voto</th>
                    <th class="text-left">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(voter, index) in pollVoters" :key="index">
                    <td>{{ voter.name }}</td>
                    <td>{{ voter.voter_key }}</td>
                    <td>{{ voter.email }}</td>
                    <td>{{ voter.vote_weight }}</td>
                    <td>
                      <v-btn size="small" color="red" icon>
                        <v-tooltip activator="parent" location="start"
                          >Remover votante</v-tooltip
                        >
                        <v-icon>mdi-account-minus</v-icon>
                        <confirm-modal
                          @clickConfirm="deleteVoter(voter.id, index)"
                        >
                          <template v-slot:card-title>
                            <span class="text-white">Excluir Opção</span>
                            <v-divider></v-divider>
                          </template>
                          <template v-slot:card-text>
                            <p>
                              Realmente deseja remover este usuário dos
                              votantes?
                            </p>
                            <h3>Esta ação não pode ser desfeita.</h3>
                          </template>
                        </confirm-modal>
                      </v-btn>
                    </td>
                  </tr>
                </tbody>
              </v-table>
            </v-card-text>
          </v-card>
        </div>
        <div class="welcome-notice" v-else>
          <h1 class="welcome-title">Adicione pessoas à sua eleição</h1>
          <h2 class="welcome-subtitle">
            Vamos começar adicionando seu primeiro votante
          </h2>
          <v-btn
            class="new-poll grow-animation grow-on-hover mt-4"
            color="success"
            elevation="2"
            x-large
          >
            <v-icon left dark>mdi-plus-box</v-icon>
            Adicionar votante
            <form-modal @clickSave="addNewVoter">
              <template v-slot:card-title>
                <span class="text-white">Novo Votante</span>
                <v-divider></v-divider>
              </template>

              <template v-slot:card-text>
                <new-voter @changeForm="updateVoterModel"></new-voter>
              </template>
            </form-modal>
          </v-btn>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
/* import UserHelperVue from "@/mixins/UserHelper.vue";
import PollHelperVue from "@/mixins/PollHelper.vue"; */
import VoterHelperVue from "@/mixins/VoterHelper.vue";
import FormModal from "@/components/atoms/FormModal.vue";
import NewVoter from "../molecules/NewVoter.vue";
import ConfirmModal from "@/components/atoms/ConfirmModal.vue";
export default {
  name: "PollVoters",
  mixins: [
    //UserHelperVue,
    //PollHelperVue,
    VoterHelperVue,
  ],
  components: {
    FormModal,
    NewVoter,
    ConfirmModal,
  },
  data() {
    return {
      voter: {
        name: "",
        email: "",
        pollId: "",
      },
      error: "",
    };
  },
  computed: {
    hasVoters() {
      return this.selectedPollVoters?.length > 0 ? true : false;
    },
    pollVoters() {
      return this.selectedPollVoters;
    },
    votersCount() {
      return this.selectedPollVoters.length;
    },
    currentPollId() {
      return parseInt(this.$route.params.pollId);
    },
  },

  methods: {
    updateVoterModel(newValue) {
      this.voter = newValue;
    },
    async addNewVoter() {
      this.isLoading = true;
      try {
        this.voter.pollId = this.currentPollId;
        await this.addVoter(this.voter);
      } catch (err) {
        this.error = err.message || "Ocorreu um erro no registro";
      }
      this.isLoading = false;
    },
    async deleteVoter(voterId, index) {
      this.isLoading = true;
      try {
        const payload = {
          voterId: voterId,
          pollId: this.currentPollId,
          index: index,
        };
        await this.removeVoter(payload);
      } catch (err) {
        this.error = err.message || "Ocorreu um erro no registro";
      }
    },
  },
  async created() {
    await this.fetchPollVoters(this.currentPollId);
  },
};
</script>

<style scoped></style>
