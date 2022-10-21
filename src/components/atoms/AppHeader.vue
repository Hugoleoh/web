<template>
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
        <v-icon :class="item.iconClass" left dark>{{ item.icon }}</v-icon>
        {{ item.title }}
      </v-btn>
      <v-menu
        transition="slide-y-transition"
        bottom
        offset-y
        v-if="isLoggedUser"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            class="text-white"
            v-bind="attrs"
            v-on="on"
            @click="logout"
            flat
          >
            <v-icon left dark class="btn-icon">mdi-account</v-icon>
            {{ userFirstName }}
          </v-btn>
        </template>
        <v-list>
          <v-list-item>
            <v-list-item-title>Meu Perfil</v-list-item-title>
          </v-list-item>
          <v-list-item>
            <v-list-item-title>Sair</v-list-item-title>
            <v-list-item-action>
              <v-btn flat @click="logout"></v-btn>
            </v-list-item-action>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
import UserHelperVue from "@/mixins/UserHelper.vue";
export default {
  name: "AppHeader",
  mixins: [UserHelperVue],
  props: ["hasSidebar"],
  data() {
    return {
      appTitle: "Pollar",
      sidebar: false,
      unloggedMenuItems: [
        { title: "Home", path: "/", icon: "mdi-home", iconClass: "btn-icon" },
        {
          title: "Login",
          path: "/login",
          icon: "mdi-lock-open",
          iconClass: "btn-icon",
        },
        {
          title: "Registre-se",
          path: "/register",
          icon: "mdi-face",
          iconClass: "btn-icon",
        },
      ],
      loggedMenuItems: [
        {
          title: "Dashboard",
          path: "/dashboard",
          icon: "mdi-view-dashboard-variant",
          iconClass: "btn-icon",
        },
      ],
    };
  },
  methods: {
    logout() {
      this.fetchLogout();
    },
  },
  computed: {
    menuItems() {
      return this.isLoggedUser ? this.loggedMenuItems : this.unloggedMenuItems;
    },
    userFirstName() {
      return this.loggedUser.first_name;
    },
  },
};
</script>

<style>
.btn-icon {
  padding-right: 0.5rem;
}
</style>
