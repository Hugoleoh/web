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
  </v-app-bar>

  <v-navigation-drawer v-model="drawer" permanent>
    <v-list-item
      nav
      :title="username"
      :subtitle="userFullName"
      @click="userEditPage"
    >
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
    userEditPage() {
      this.$router.push({
        name: "editUser",
        params: { userId: this.loggedUser.id },
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
  mounted() {
    if (this.poll.started === true) {
      this.items.push({
        prepend_icon: "mdi-chart-donut",
        title: "Resultados",
        routeName: "resultsView",
        value: "results",
      });
      if (this.poll.finished === false) {
        this.items.push({
          prepend_icon: "mdi-flag-checkered",
          title: "Finalizar Votação",
          routeName: "closePoll",
          value: "close",
        });
      }
    } else {
      this.items.push({
        prepend_icon: "mdi-rocket-launch",
        title: "Iniciar Votação",
        routeName: "launchPoll",
        value: "launch",
      });
    }
  },
};
</script>

<style>
.btn-icon {
  padding-right: 0.5rem;
}
</style>
