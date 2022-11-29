<script>
import { mapGetters, mapActions } from "vuex";

export default {
  computed: {
    ...mapGetters({
      userPolls: "userPolls",
      selectedPoll: "selectedPoll",
    }),
  },
  methods: {
    ...mapActions({
      setPoll: "setSelectedPoll",
    }),
    async createPoll(poll) {
      await this.$store.dispatch("createPoll", poll);
    },
    async fetchUserPolls() {
      await this.$store.dispatch("fetchUserPolls");
    },
    setSelectedPoll(poll) {
      this.setPoll(poll);
    },
    async fetchPollById(id) {
      await this.$store.dispatch("fetchPollById", id);
    },
    async generateSharingURL(id) {
      await this.$store.dispatch("generatePollURL", id);
    },
  },
};
</script>
