<template>
  <v-container class="login-card">
    <v-row no-gutters>
      <!-- <v-col cols="12"> -->
      <v-col> </v-col>
    </v-row>
  </v-container>
</template>

<script>
import UserHelperVue from "@/mixins/UserHelper.vue";
import PollHelperVue from "@/mixins/PollHelper.vue";
export default {
  name: "ViewPoll",
  mixins: [PollHelperVue, UserHelperVue],

  data() {
    return {};
  },
  computed: {},
  methods: {},
};
</script>

<style scoped>
.new-poll-title {
  font-weight: 500;
  margin-bottom: 0.5rem;
  font-family: inherit;
  line-height: 1.2;
}
</style>
