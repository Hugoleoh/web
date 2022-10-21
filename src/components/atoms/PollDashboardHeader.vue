<template>
  <v-navigation-drawer v-model="sidebar" app>
    <v-list>
      <v-list-tile
        v-for="item in unloggedMenuItems"
        :key="item.title"
        :to="item.path"
      >
        <v-list-tile-action>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>{{ item.title }}</v-list-tile-content>
      </v-list-tile>
    </v-list>
  </v-navigation-drawer>

  <v-toolbar class="nav-bar" app>
    <span class="hidden-sm-and-up">
      <v-toolbar-side-icon @click="sidebar = !sidebar"> </v-toolbar-side-icon>
    </span>
    <v-toolbar-title>
      <router-link to="/" style="cursor: pointer">
        <span class="text-white">
          <v-icon dark>mdi-ballot</v-icon>
          {{ appTitle }}
        </span>
      </router-link>
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items class="hidden-xs-only">
      <h4>{{ pollTitle }}</h4>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
import UserHelperVue from "@/mixins/UserHelper.vue";
export default {
  name: "PollDashboardHeader",
  mixins: [UserHelperVue],
  props: ["hasSidebar"],
  data() {
    return {
      appTitle: "Pollar",
      sidebar: false,
    };
  },
  methods: {},
  computed: {
    pollTitle() {
      return "Poll de teste";
    },
  },
};
</script>

<style>
.btn-icon {
  padding-right: 0.5rem;
}
</style>
