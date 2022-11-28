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
            lazy-src="https://picsum.photos/id/11/100/60"
            max-width="70"
            max-height="70"
          ></v-img>
        </span>
      </router-link>
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn color="white"
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
        prepend-icon="mdi-home"
        title="Visão geral"
        value="overview"
      ></v-list-item>

      <v-list-item
        prepend-icon="mdi-cog"
        title="Configurações"
        value="settings"
      ></v-list-item>

      <v-list-item
        prepend-icon="mdi-ballot"
        title="Cédulas"
        value="ballots"
      ></v-list-item>

      <v-list-item
        prepend-icon="mdi-account-group"
        title="Votantes"
        value="voters"
      ></v-list-item>
      <v-list-item
        prepend-icon="mdi-rocket-launch"
        title="Iniciar Votação"
        value="launch"
      ></v-list-item>
    </v-list>
  </v-navigation-drawer>

  <!-- <v-toolbar class="nav-bar" app>
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
  </v-toolbar> -->
</template>

<script>
import UserHelperVue from "@/mixins/UserHelper.vue";
export default {
  name: "PollDashboardHeader",
  mixins: [UserHelperVue],
  props: ["hasSidebar", "pollTitle"],
  data() {
    return {
      appTitle: "Pollar",
      sidebar: false,
      drawer: true,
      group: null,
      tab: "",
      items: [
        {
          title: "Foo",
          value: "foo",
        },
        {
          title: "Bar",
          value: "bar",
        },
        {
          title: "Fizz",
          value: "fizz",
        },
        {
          title: "Buzz",
          value: "buzz",
        },
      ],
    };
  },
  methods: {},
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
