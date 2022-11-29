<template>
  <AppHeader />
  <v-banner class="dashboard-title">
    <v-container>
      <v-row>
        <v-col cols="col-10" sm="6" xl="10" lg="9" md="8">
          <h1 class="dashboard-title">Minhas votações</h1>
        </v-col>
        <v-spacer></v-spacer>
        <v-col class="align-end" cols="2" sm="6" xl="2" lg="3" md="4">
          <v-btn
            class="grow-on-hover"
            color="success"
            elevation="2"
            x-large
            @click="newPoll"
          >
            <v-icon left dark>mdi-plus-box</v-icon>
            Nova Votação
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-banner>
  <v-container class="dashboard">
    <v-row
      class="full-height-has-navbar justify-center"
      :class="[{ 'align-content-center': !hasPolls }]"
      no-gutters
    >
      <v-spacer></v-spacer>
      <v-col cols="12">
        <div v-if="hasPolls">
          <v-card
            elevation="2"
            light
            class="mt-4"
            tag="section"
            v-for="poll in myPolls"
            :key="poll.id"
            @click="selectPoll(poll)"
          >
            <v-card-text>
              <v-row no-gutters>
                <v-col cols="6">
                  <v-row no-gutters>
                    <v-col>
                      <h3>{{ poll.title }}</h3>
                    </v-col>
                    <v-col>
                      <v-chip :color="statusColor(poll)">
                        <span>{{ pollStatus(poll) }}</span>
                      </v-chip>
                    </v-col>
                  </v-row>
                </v-col>
                <v-col cols="6">
                  <v-row no-gutters>
                    <v-col>
                      <v-row no-gutters>
                        <v-col cols="12">
                          <span>
                            <v-icon>mdi-calendar</v-icon> Data de início
                          </span>
                        </v-col>
                        <v-col cols="12">
                          <span>{{
                            $filters.formatDate(poll.initial_date)
                          }}</span>
                        </v-col>
                      </v-row>
                    </v-col>
                    <v-col>
                      <v-row no-gutters>
                        <v-col cols="12">
                          <span>
                            <v-icon>mdi-calendar</v-icon>
                            Data de término
                          </span>
                        </v-col>
                        <v-col cols="12">
                          <span>{{ $filters.formatDate(poll.end_date) }}</span>
                        </v-col>
                      </v-row>
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </div>
        <div class="welcome-notice" v-else>
          <h1 class="welcome-title">Seja bem-vindo ao Pollar</h1>
          <h2 class="welcome-subtitle">
            Vamos começar criando sua primeira votação
          </h2>
          <v-btn
            class="new-poll grow-animation grow-on-hover mt-4"
            color="success"
            elevation="2"
            x-large
            @click="newPoll"
          >
            <v-icon left dark>mdi-plus-box</v-icon>
            Nova Votação
          </v-btn>
        </div>
      </v-col>
      <v-spacer></v-spacer>
    </v-row>
  </v-container>
</template>

<script>
import AppHeader from "@/components/atoms/AppHeader.vue";
import UserHelperVue from "@/mixins/UserHelper.vue";
import PollHelperVue from "@/mixins/PollHelper.vue";
export default {
  name: "AppDashboard",
  mixins: [UserHelperVue, PollHelperVue],
  components: { AppHeader },
  methods: {
    newPoll() {
      this.$router.push("/poll/create");
    },
    selectPoll(poll) {
      this.setSelectedPoll(poll);
      this.$router.push({ name: "SelectedPoll", params: { pollId: poll.id } });
    },
    pollStatus(poll) {
      if (poll.started && poll.finished) {
        return "Completada";
      } else if (poll.started && !poll.finished) {
        return "Iniciada";
      } else {
        return "Construindo";
      }
    },
    statusColor(poll) {
      const status = this.pollStatus(poll);
      if (status === "Completada") {
        return "success";
      } else if (status === "Iniciada") {
        return "primary";
      } else {
        return "";
      }
    },
  },
  computed: {
    myPolls() {
      return this.userPolls;
    },
    hasPolls() {
      return this.myPolls.length > 0;
    },
  },
  async created() {
    await this.fetchLoggedUser();
    await this.fetchUserPolls();
  },
};
</script>

<style>
.dashboard {
  align-content: center;
  align-items: center;
}
.dashboard-title {
  align-items: center;
}
.new-poll {
  height: 3rem !important;
  width: 30%;
  font-size: 1rem;
}

.v-banner--density-default .v-banner-actions {
  margin: unset !important;
}
</style>
