<template>
  <div>
    <div v-if="!isCreatePage">
      <PollDashboardHeader />
      <v-banner :sticky="sticky" no-gutters>
        <v-container>
          <v-row>
            <v-col cols="col-10">
              <h1 class="dashboard-title">{{ title }}</h1>
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
  computed: {
    title() {
      return this.selectedPoll?.title ?? "";
    },
    isCreatePage() {
      return this.$route.name === "newPoll";
    },
  },
  async created() {
    await this.fetchLoggedUser();
    if (!this.selectedPoll) {
      await this.fetchPollById(this.$route.params.pollId);
    }
  },
};
</script>

<style></style>
