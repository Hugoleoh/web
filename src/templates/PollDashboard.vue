<template>
  <div>
    <PollDashboardHeader :hasSidebar="true" :pollTitle="title" />
    <router-view></router-view>
  </div>
</template>

<script>
import PollDashboardHeader from "@/components/atoms/PollDashboardHeader.vue";
export default {
  components: { PollDashboardHeader },
  computed: {
    title() {
      return this.selectedPoll?.title ?? "";
    },
  },
};
</script>

<style></style>
