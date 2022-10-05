<template>
  <!--   <v-navigation-drawer v-model="sidebar" app>
      <v-list>
        <v-list-tile
          v-for="item in unloggedMenuItems"
          :key="item.title"
          :to="item.path">
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>{{ item.title }}</v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer> -->

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
      <v-btn
        class="text-white"
        flat
        v-for="item in menuItems"
        :key="item.title"
        :to="item.path"
      >
        <v-icon left dark>{{ item.icon }}</v-icon>
        {{ item.title }}
      </v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
import Auth from "@/modules/Auth";
export default {
  name: "AppHeader",
  props: ["hasSidebar"],
  data() {
    return {
      appTitle: "Pollar",
      sidebar: false,
      unloggedMenuItems: [
        { title: "Home", path: "/", icon: "mdi-home" },
        { title: "Login", path: "/login", icon: "mdi-lock_open" },
        { title: "Registre-se", path: "/register", icon: "mdi-face" },
      ],
      loggedMenuItems: [
        {
          title: "Dashboard",
          path: "/dashboard",
          icon: "mdi-view-dashboard-variant",
        },
        { title: "Nome do usuário", path: "/register", icon: "mdi-account" },
      ],
    };
  },
  computed: {
    menuItems() {
      return Auth.isUserAuthenticated()
        ? this.loggedMenuItems
        : this.unloggedMenuItems;
    },
  },
};
</script>

<style></style>
