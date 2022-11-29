<template>
  <v-toolbar class="nav-bar" app>
    <v-toolbar-title>
      <router-link to="/" style="cursor: pointer">
        <span class="text-white">
          <v-img
            src="../../assets/img/pollar_logo_transparent_pequeno.png"
            max-width="70"
            max-height="70"
          ></v-img>
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
      <v-btn v-if="isLoggedUser" color="white" @click="logout" flat
        ><span class="mr-2">
          <v-icon>mdi-logout</v-icon>
          Sair</span
        ></v-btn
      >
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
