<script>
import { mapGetters } from "vuex";
import Auth from "@/modules/Auth.js";
export default {
  computed: {
    ...mapGetters({
      loggedUserId: "userId",
      loggedUser: "loggedUser",
    }),
    isLoggedUser() {
      return Auth.isUserAuthenticated();
    },
  },
  methods: {
    async fetchLogin(credentials) {
      await this.$store.dispatch("login", credentials);
    },
    async fetchRegister(user) {
      await this.$store.dispatch("register", user);
    },
    fetchLogout() {
      this.$store.dispatch("logout");
      this.$router.replace("/");
    },
    async fetchLoggedUser() {
      await this.$store.dispatch("fetchUserProfile", {
        userId: this.loggedUserId,
      });
    },
    async editUser(user) {
      await this.$store.dispatch("editUser", {
        userId: this.loggedUserId,
        ...user,
      });
    },
    async changePassword(password) {
      await this.$store.dispatch("changePassword", {
        userId: this.loggedUserId,
        ...password,
      });
    },
  },
};
</script>
