<template>
  <!-- <v-layout> -->
  <v-app-bar class="nav-bar" prominent>
    <v-app-bar-nav-icon
      variant="text"
      color="white"
      @click.stop="drawer = !drawer"
    ></v-app-bar-nav-icon>
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
    <v-btn color="white" @click="logout"
      ><span class="mr-2">
        <v-icon>mdi-logout</v-icon>
        Sair</span
      ></v-btn
    >
  </v-app-bar>

  <v-navigation-drawer v-model="drawer" permanent>
    <v-list-item nav :title="username" :subtitle="userFullName">
      <template v-slot:prepend>
        <v-avatar color="surface-variant"
          ><v-icon>mdi-account</v-icon>
        </v-avatar>
      </template></v-list-item
    >
    <v-divider></v-divider>
    <v-list v-model="tab">
      <v-list-item
        v-for="(item, i) in items"
        :key="i"
        :title="item.title"
        :prepend-icon="item.prepend_icon"
        :value="item.value"
        @click="changeTab(item.routeName)"
      ></v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import UserHelperVue from "@/mixins/UserHelper.vue";
export default {
  name: "PollDashboardHeader",
  mixins: [UserHelperVue],
  props: ["poll"],
  data() {
    return {
      drawer: true,
      group: null,
      tab: "",
      items: [
        {
          prepend_icon: "mdi-home",
          title: "Visão geral",
          routeName: "SelectedPoll",
          value: "overview",
        },
        {
          prepend_icon: "mdi-cog",
          title: "Configurações",
          routeName: "pollSetttings",
          value: "settings",
        },
        {
          prepend_icon: "mdi-ballot",
          title: "Cédulas",
          routeName: "pollBallots",
          value: "ballots",
        },
        {
          prepend_icon: "mdi-account-group",
          title: "Votantes",
          routeName: "pollVoters",
          value: "voters",
        },
        {
          prepend_icon: "mdi-rocket-launch",
          title: "Iniciar Votação",
          routeName: "launchPoll",
          value: "launch",
        },
      ],
    };
  },
  methods: {
    logout() {
      this.fetchLogout();
    },
    changeTab(routeName) {
      this.$router.push({
        name: routeName,
        params: { pollId: this.poll.id },
      });
    },
  },
  computed: {
    userFullName() {
      return this.loggedUser.first_name + " " + this.loggedUser.last_name;
    },
    username() {
      return this.loggedUser.username;
    },
  },

  watch: {
    group() {
      this.drawer = false;
    },
  },
};
</script>

<style>
.btn-icon {
  padding-right: 0.5rem;
}
</style>
