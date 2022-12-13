<template>
  <v-container>
    <v-row no-gutters align-content="center">
      <v-col
        sm="12"
        xl="6"
        lg="8"
        md="8"
        offset-md="2"
        offset-lg="2"
        offset-xl="3"
      >
        <v-card>
          <v-card-title>
            <p>Mais detalhes sobre a votação</p>
          </v-card-title>
          <v-card-text>
            <p>{{ poll.description }}</p>
          </v-card-text>
        </v-card>
        <v-card
          elevation="2"
          class="mb-5 mt-5"
          light
          tag="section"
          v-for="(question, i) in pollQuestions"
          :key="i"
        >
          <v-toolbar class="nav-bar">
            <v-toolbar-title
              ><v-layout align-center justify-space-between>
                <h3 class="text-white">{{ question.name }}</h3>
              </v-layout>
            </v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>

          <v-card-text>
            <v-card variant="outlined">
              <v-card-title>
                <p>Descrição</p>
              </v-card-title>
              <v-card-text>
                <p>{{ question.description }}</p>
              </v-card-text>
            </v-card>

            <v-radio-group v-model="choice[i]">
              <v-radio
                v-for="option in question.options"
                color="#283e79"
                :key="option.id"
                :value="option.id"
              >
                <template v-slot:label>
                  <v-card class="mt-1" width="-webkit-fill-available">
                    <v-toolbar color="white">
                      <v-toolbar-title
                        ><v-layout align-center justify-space-between>
                          <p class="option-text">{{ option.name }}</p>
                        </v-layout>
                      </v-toolbar-title>
                      <v-spacer></v-spacer>
                      <v-btn color="#283e79" icon>
                        <v-icon>mdi-information</v-icon>
                        <simple-modal>
                          <template v-slot:card-title>
                            <span class="text-white">Detalhes da opção</span>
                            <v-chip class="ma-2" color="white" label>
                              <v-icon start icon="mdi-check-circle"></v-icon>
                              Opção padrão
                            </v-chip>
                            <v-divider></v-divider>
                          </template>
                          <template v-slot:card-text>
                            <option-details
                              :option="option"
                              :question-name="question.name"
                            ></option-details>
                          </template>
                        </simple-modal>
                      </v-btn>
                    </v-toolbar>
                  </v-card>
                </template>
              </v-radio>
            </v-radio-group>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col
        sm="12"
        xl="6"
        lg="8"
        md="8"
        offset-md="2"
        offset-lg="2"
        offset-xl="3"
      >
        <v-card>
          <v-card-text>
            <v-btn
              color="success"
              variant="flat"
              size="x-large"
              width="-webkit-fill-available"
              @click="submitBallot"
              >Submeter cédula</v-btn
            >
          </v-card-text>
        </v-card>
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
import PollHelperVue from "@/mixins/PollHelper.vue";
import VoterHelperVue from "@/mixins/VoterHelper.vue";
import BallotHelperVue from "@/mixins/BallotHelper.vue";
import SimpleModal from "@/components/atoms/SimpleModal.vue";
import OptionDetails from "@/components/molecules/OptionDetails.vue";
export default {
  name: "VotingBallot",
  mixins: [PollHelperVue, VoterHelperVue, BallotHelperVue],
  components: {
    SimpleModal,
    OptionDetails,
  },
  data() {
    return {
      choice: [],
      snackbarConfig: {},
      error: null,
      isLoading: false,
      timeout: 2000,
      snackbar: false,
    };
  },
  methods: {
    async submitBallot() {
      const vote = {
        optionId: this.choice,
        pollId: this.poll.id,
        ...this.voterInfo,
      };
      this.isLoading = true;
      console.log(vote);
      try {
        await this.saveBallot(vote);
        this.snackbarConfig = {
          icon: "mdi-check-circle",
          color: "success",
          title: "Sucesso",
          text: "Voto computado com sucesso!",
        };
        this.snackbar = true;
        this.$router.push({
          name: "votingSuccess",
          params: { sharing_url: this.$route.params.sharing_url },
        });
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
      this.isLoading = false;
    },
  },
  computed: {
    poll() {
      return this.selectedPoll ?? {};
    },
    pollQuestions() {
      return this.poll?.questions;
    },
    validVoter() {
      return this.voterInfo.email ? true : false;
    },
  },
  created() {
    if (!this.validVoter) {
      this.$router.replace({
        name: "voterIdentify",
        params: this.$route.params.sharing_url,
      });
    }
  },
};
</script>

<style scoped>
.option-text {
  font-size: 0.875rem;
  font-weight: 500;
}
</style>
<style>
.v-label {
  opacity: unset !important;
}
</style>
