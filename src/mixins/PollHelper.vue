<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters({
      userPolls: "userPolls",
    }),
  },
  methods: {
    async createPoll(poll) {
      await this.$store.dispatch("createPoll", poll);
    },
    async fetchUserPolls() {
      await this.$store.dispatch("fetchUserPolls");
    },
  },
};
</script>
