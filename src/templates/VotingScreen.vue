<template>
  <v-toolbar class="nav-bar" app>
    <v-toolbar-title>
      <span class="text-white">
        <v-img
          src="../assets/img/pollar_logo_transparent_pequeno.png"
          max-width="70"
          max-height="70"
        ></v-img>
      </span>
    </v-toolbar-title>
  </v-toolbar>
  <v-banner class="dashboard-title">
    <v-container>
      <v-row align-content="center">
        <v-col cols="12">
          <h1 class="poll-title">{{ poll.title }}</h1>
        </v-col>
      </v-row>
    </v-container>
  </v-banner>

  <router-view></router-view>
</template>

<script>
import PollHelperVue from "@/mixins/PollHelper.vue";
import VoterHelperVue from "@/mixins/VoterHelper.vue";
export default {
  name: "VotingScreen",
  mixins: [PollHelperVue, VoterHelperVue],
  data() {
    return {};
  },
  computed: {
    poll() {
      return this.selectedPoll;
    },
  },
  created() {
    this.fetchPollBySharingURL(this.$route.params.sharing_url);
  },
};
</script>

<style scoped>
.poll-title {
  text-align: center;
}
</style>
