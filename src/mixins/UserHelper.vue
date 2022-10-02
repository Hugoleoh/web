<script>
import { mapGetters } from "vuex";

//import Auth from "../modules/Auth.js";
export default {
  computed: {
    ...mapGetters({
      loggedUserId: "userId",
    }),
  },
  methods: {
    /* ...mapActions([
      "fetchUserProfile",
      "fetchLogin",
      "fetchRegister",
    ]), */
    async fetchLogin(credentials) {
      await this.$store.dispatch("login", credentials);
    },
    async fetchRegister(user) {
      await this.$store.dispatch("register", user);
    },
  },
};
</script>
