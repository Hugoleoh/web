<template>
  <div>
    <div v-if="!isCreatePage">
      <PollDashboardHeader :poll="getSelectedPoll" />
      <v-banner class="dashboard-banner" sticky no-gutters>
        <v-container>
          <v-row>
            <v-col cols="col-10">
              <span class="poll-title-text"
                >{{ pollTitle }}
                <v-chip :color="statusColor">
                  <span>{{ pollStatus }}</span>
                </v-chip>
              </span>
            </v-col>
          </v-row>
        </v-container>
      </v-banner>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import PollDashboardHeader from "@/components/atoms/PollDashboardHeader.vue";
import UserHelperVue from "@/mixins/UserHelper.vue";
import PollHelperVue from "@/mixins/PollHelper.vue";
export default {
  components: { PollDashboardHeader },
  mixins: [UserHelperVue, PollHelperVue],
  data() {
    return {
      pollStatus: "",
    };
  },
  computed: {
    pollTitle() {
      return this.selectedPoll?.title ?? "";
    },
    isCreatePage() {
      return this.$route.name === "newPoll";
    },
    statusColor() {
      if (this.pollStatus === "Completada") {
        return "success";
      } else if (this.pollStatus === "Iniciada") {
        return "primary";
      } else {
        return "";
      }
    },
    getSelectedPoll() {
      return this.selectedPoll;
    },
  },
  async created() {
    await this.fetchLoggedUser();
    await this.fetchPollById(this.$route.params.pollId);
  },
  mounted() {
    if (this.selectedPoll.started && this.selectedPoll.finished) {
      this.pollStatus = "Completada";
    } else if (this.selectedPoll.started && !this.selectedPoll.finished) {
      this.pollStatus = "Iniciada";
    } else {
      this.pollStatus = "Construindo";
    }
  },
};
</script>

<style scoped>
.dashboard-banner {
  margin-top: 4rem;
}
.poll-title-text {
  font-size: 1.5rem;
  font-weight: bold;
}
</style>
