<template>
  <v-container>
    <v-row>
      <v-col cols="8">
        <v-row>
          <v-col cols="6">
            <v-card elevation="1" light tag="section">
              <v-card-title>
                <v-layout align-center justify-space-between>
                  <span>
                    <v-icon>mdi-calendar</v-icon>
                    Data de início
                  </span>
                </v-layout>
              </v-card-title>
              <v-divider></v-divider>
              <v-card-text>
                <span class="card-text">
                  {{ $filters.extendedDate(selectedPoll.initial_date) }}
                </span>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="6">
            <v-card elevation="1" light tag="section">
              <v-card-title>
                <v-layout align-center justify-space-between>
                  <span>
                    <v-icon>mdi-calendar</v-icon>
                    Data de Término
                  </span>
                </v-layout>
              </v-card-title>
              <v-divider></v-divider>
              <v-card-text>
                <span class="card-text">
                  {{ $filters.extendedDate(selectedPoll.end_date) }}
                </span>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="12">
            <v-card elevation="1" light tag="section">
              <v-card-title>
                <v-layout align-center justify-space-between>
                  <span>
                    <v-icon>mdi-lock</v-icon>
                    Privacidade da votação
                  </span>
                </v-layout>
              </v-card-title>
              <v-divider></v-divider>
              <v-card-text>
                <v-chip :color="privacy.color">
                  <span class="card-text"> {{ privacy.name }} </span>
                </v-chip>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="12">
            <v-card elevation="1" light tag="section">
              <v-card-title>
                <v-layout align-center justify-space-between>
                  <span>
                    <v-icon>mdi-web</v-icon>
                    URL da Votação
                  </span>
                </v-layout>
              </v-card-title>
              <v-divider></v-divider>
              <v-card-text>
                <v-row no-gutters>
                  <v-col cols="9">
                    <v-text-field
                      v-model="sharing_url"
                      label="URL compartilhável"
                      name="sharing_url"
                      readonly
                    ></v-text-field>
                  </v-col>
                  <v-col cols="1">
                    <v-btn class="copy-button" @click="copyText">
                      <v-icon>mdi-content-copy</v-icon>
                      <v-tooltip activator="parent" location="bottom"
                        >Copiar link</v-tooltip
                      >
                    </v-btn>
                  </v-col>
                  <v-col cols="2">
                    <v-btn class="copy-button" @click="generateURL">
                      <span>Gerar Link</span>
                      <v-tooltip activator="parent" location="bottom"
                        >Gerar link compartilhável</v-tooltip
                      >
                    </v-btn>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="4">
        <v-card color="#283e79" theme="dark" class="mx-auto mb-4" width="400">
          <v-card-title>
            <h2>
              <v-icon> mdi-account-group </v-icon>
            </h2>
          </v-card-title>
          <v-card-text class="side-card-text">
            <h3>0</h3>
            <span class="card-text"> Votantes </span>
          </v-card-text>
        </v-card>
        <v-card color="#0bacfa" theme="dark" class="mx-auto mb-4" width="400">
          <v-card-title>
            <h2>
              <v-icon> mdi-help-circle </v-icon>
            </h2>
          </v-card-title>
          <v-card-text class="side-card-text">
            <h3>{{ questionsCount }}</h3>
            <span class="card-text"> Questões </span>
          </v-card-text>
        </v-card>
        <v-card color="#25b17d" theme="dark" class="mx-auto mb-4" width="400">
          <v-card-title>
            <h2>
              <v-icon> mdi-ballot</v-icon>
            </h2>
          </v-card-title>
          <v-card-text class="side-card-text">
            <h3>{{ optionsCount }}</h3>
            <span class="card-text"> Opções </span>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import UserHelperVue from "@/mixins/UserHelper.vue";
import PollHelperVue from "@/mixins/PollHelper.vue";
import Global from "@/constants/Global";
export default {
  name: "ViewPoll",
  mixins: [PollHelperVue, UserHelperVue],

  data() {
    return {
      sharing_url: "",
    };
  },
  computed: {
    questionsCount() {
      return this.selectedPoll.questions?.length;
    },
    optionsCount() {
      let options_count = 0;
      this.selectedPoll.questions?.forEach((question) => {
        options_count += question.options.length;
      });
      return options_count;
    },
    privacy() {
      let privacy = {
        name: "",
        color: "",
      };
      if (this.selectedPoll?.privacy == 0) {
        privacy.name = "PÚBLICA";
        privacy.color = "green";
      } else {
        privacy.name = "PRIVADA";
        privacy.color = "red";
      }
      return privacy;
    },
  },
  methods: {
    copyText() {
      navigator.clipboard.writeText(this.sharing_url);
    },
    async generateURL() {
      await this.generateSharingURL(this.selectedPoll.id);
      this.sharing_url =
        Global.getFrontDomain() + "/" + this.selectedPoll.sharing_url;
    },
  },
  created() {
    setTimeout(() => {
      this.sharing_url = this.selectedPoll.sharing_url
        ? Global.getFrontDomain() + "/" + this.selectedPoll.sharing_url
        : "";
    }, 300);
  },
};
</script>

<style scoped>
.new-poll-title {
  font-weight: 500;
  margin-bottom: 0.5rem;
  font-family: inherit;
  line-height: 1.2;
}
.copy-button {
  height: 3.5rem;
}
.card-text {
  font-size: 1rem;
}
.side-card-text {
  text-align: end;
  font-size: 2rem;
}
</style>
