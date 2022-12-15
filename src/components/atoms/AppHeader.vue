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
      <!-- <v-btn v-if="isLoggedUser" color="white" @click="logout" flat
        ><span class="mr-2">
          <v-icon>mdi-logout</v-icon>
          Sair</span
        ></v-btn
      > -->
    </v-toolbar-items>
    <v-toolbar-items class="hidden-xs-only">
      <v-menu location="bottom" v-if="isLoggedUser">
        <template v-slot:activator="{ props }">
          <v-btn v-bind="props" class="text-white">
            <v-icon color="white">mdi-account</v-icon>
            <span>{{ username }}</span>
          </v-btn>
        </template>
        <v-list>
          <v-list-item class="clickable">
            <v-btn color="white" @click="userEditPage" flat
              ><span class="mr-2">
                <v-icon>mdi-card-account-details</v-icon>
                Conta</span
              ></v-btn
            >
          </v-list-item>
          <v-list-item class="clickable">
            <v-btn color="white" @click="logout" flat
              ><span class="mr-2">
                <v-icon>mdi-logout</v-icon>
                Sair</span
              ></v-btn
            >
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
    userEditPage() {
      this.$router.push({
        name: "editUser",
        params: { userId: this.loggedUser.id },
      });
    },
  },
  computed: {
    menuItems() {
      return this.isLoggedUser ? this.loggedMenuItems : this.unloggedMenuItems;
    },
    userFirstName() {
      return this.loggedUser.first_name;
    },
    username() {
      return this.loggedUser.username;
    },
  },
};
</script>

<style>
.btn-icon {
  padding-right: 0.5rem;
}
</style>
