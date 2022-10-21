<template>
  <v-app :style="{ background: '#f6f8fa' }">
    <v-main class="pt-0">
      <router-view />
    </v-main>
    <!--    <v-scale-transition>
      <v-btn
        fab
        v-show="fab"
        v-scroll="onScroll"
        dark
        fixed
        bottom
        right
        color="secondary"
        @click="toTop"
      >
        <v-icon>mdi-arrow-up</v-icon>
      </v-btn>
    </v-scale-transition> -->
  </v-app>
</template>

<style scoped>
.v-main {
  background-attachment: fixed;
  background-position: center;
  background-size: cover;
}
</style>

<script>
export default {
  name: "App",

  data: () => ({
    fab: null,
    color: "#1e3062",
    flat: null,
  }),

  created() {
    const top = window.pageYOffset || 0;
    if (top <= 60) {
      this.color = "transparent";
      this.flat = true;
    }
    this.$store.dispatch("tryAutoLogin");
  },

  watch: {
    fab(value) {
      if (value) {
        this.color = "secondary";
        this.flat = false;
      } else {
        this.color = "transparent";
        this.flat = true;
      }
    },
    confirmAutoLogout(curValue, oldValue) {
      if (curValue && curValue !== oldValue) {
        this.$router.replace("/");
      }
    },
  },
  computed: {
    confirmAutoLogout() {
      return this.$store.getters.confirmAutoLogout;
    },
  },

  methods: {
    onScroll(e) {
      if (typeof window === "undefined") return;
      const top = window.pageYOffset || e.target.scrollTop || 0;
      this.fab = top > 60;
    },
    toTop() {
      this.$vuetify.goTo(0);
    },
  },
};
</script>
