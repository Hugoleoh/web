<template>
  <v-container>
    <v-row>
      <v-col
        sm="12"
        xl="8"
        lg="8"
        md="8"
        offset-md="2"
        offset-lg="2"
        offset-xl="2"
      >
        <v-card>
          <v-card-title>
            <v-icon>mdi-check</v-icon>
            Verifique os detalhes da sua Votação</v-card-title
          >
          <v-divider></v-divider>
          <v-card-text>
            <v-table>
              <tbody>
                <tr>
                  <td><h3>Título</h3></td>
                  <td>{{ poll.title }}</td>
                </tr>
                <tr>
                  <td><h3>Descrição</h3></td>
                  <td>{{ poll.description }}</td>
                </tr>
                <tr>
                  <td><h3>Data de início</h3></td>
                  <td>{{ $filters.formatDate(poll.initial_date) }}</td>
                </tr>
                <tr>
                  <td><h3>Data de término</h3></td>
                  <td>{{ $filters.formatDate(poll.end_date) }}</td>
                </tr>
                <tr>
                  <td><h3>Privacidade</h3></td>
                  <td>{{ privacy }}</td>
                </tr>
              </tbody>
            </v-table>
            <v-alert
              type="info"
              variant="outlined"
              v-if="pastInitialDate"
              class="mb-2"
              >A data de início está configurada para uma data no passado. Como
              resultado, ela será modificada automaticamente para horário em que
              a votação for lançada.</v-alert
            >
            <v-alert type="error" variant="outlined" v-if="pastEndDate"
              >A data de término está configurada para uma data no passado. Para
              lançar a votação altere-a para uma data futura;</v-alert
            >
          </v-card-text>
        </v-card>
      </v-col>
      <v-col
        sm="12"
        xl="8"
        lg="8"
        md="8"
        offset-md="2"
        offset-lg="2"
        offset-xl="2"
      >
        <v-card>
          <v-card-title>
            <v-icon>mdi-check</v-icon>
            Verifique os detalhes da sua cédula de votação
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <v-alert type="warning" variant="outlined"
              >Você não poderá de alterar a cédula de votação após o início da
              votação. Isto é para manter a integridade da votação para o
              votantes.</v-alert
            >
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
                <p>{{ question.description }}</p>
                <v-divider></v-divider>
                <v-card
                  v-for="option in question.options"
                  :key="option.id"
                  class="mt-1"
                >
                  <v-toolbar>
                    <v-toolbar-title
                      ><v-layout align-center justify-space-between>
                        <span class="option-text"
                          ><v-icon class="mr-2"
                            >mdi-checkbox-marked-circle</v-icon
                          >{{ option.name }}</span
                        >
                      </v-layout>
                    </v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-btn variant="outlined" color="#283e79">
                      Detalhes
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
              </v-card-text>
            </v-card>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-row no-gutters>
              <v-col cols="12">
                <v-checkbox
                  v-model="termAccept"
                  color="info"
                  value="info"
                  hide-details
                >
                  <template v-slot:label>
                    <span
                      >Eu entendo que eu poderei alterar minha cédula de votação
                      depois que a votação iniciar.</span
                    >
                  </template>
                </v-checkbox>
              </v-col>
              <v-col cols="12">
                <v-btn
                  class="grow-animation grow-on-hover mb-2"
                  variant="flat"
                  color="success"
                  elevation="2"
                  large
                  :disabled="!termAccept || pastEndDate"
                  @click="launch"
                >
                  <v-icon>mdi-rocket-launch</v-icon>
                  Iniciar votação
                </v-btn>
              </v-col>
            </v-row>
          </v-card-actions>
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
import UserHelperVue from "@/mixins/UserHelper.vue";
import PollHelperVue from "@/mixins/PollHelper.vue";
import SimpleModal from "@/components/atoms/SimpleModal.vue";
import OptionDetails from "@/components/molecules/OptionDetails.vue";
export default {
  name: "LaunchPoll",
  mixins: [UserHelperVue, PollHelperVue],
  components: {
    SimpleModal,
    OptionDetails,
  },
  data() {
    return {
      termAccept: false,
      snackbar: false,
      error: "",
      timeout: 2000,
      snackbarConfig: {
        icon: "",
        color: "red",
        title: "Erro",
        text: "",
      },
    };
  },
  methods: {
    async launch() {
      this.isLoading = true;
      try {
        await this.launchPoll(this.poll.id);
        this.snackbarConfig = {
          icon: "mdi-check-circle",
          color: "success",
          title: "Sucesso",
          text: "Votação iniciada com sucesso!",
        };
        this.snackbar = true;
        /* this.$router.push({
          name: "SelectedPoll",
          params: { pollId: this.poll.id },
        }); */
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
    privacy() {
      return this.selectedPoll.privacy ? "Privada" : "Pública";
    },
    pastInitialDate() {
      return new Date(this.poll.initial_date) < Date.now();
    },
    pastEndDate() {
      return new Date(this.poll.end_date) < Date.now();
    },
  },
};
</script>

<style scoped>
.option-text {
  font-size: 0.875rem;
}
</style>
