<template>
  <div>
    <PollDashboardHeader />
    <router-view></router-view>
  </div>
</template>

<script>
import PollDashboardHeader from "@/components/atoms/PollDashboardHeader.vue";
export default {
  components: { PollDashboardHeader },
};
</script>

<style></style>
