<script>
import { mapGetters, mapActions } from "vuex";

export default {
  computed: {
    ...mapGetters({
      selectedPollVoters: "selectedPollVoters",
      voterInfo: "voterInfo",
    }),
  },
  methods: {
    ...mapActions({
      //setPoll: "setSelectedPoll",
    }),
    async addVoter(voter) {
      await this.$store.dispatch("addVoter", voter);
    },
    async removeVoter(voter) {
      await this.$store.dispatch("removeVoter", voter);
    },
    async fetchPollVoters(id) {
      await this.$store.dispatch("fetchPollVoters", id);
    },
    async verifyVoterInfo(voter) {
      this.$store.dispatch("setVoterInfo", voter);
    },
  },
};
</script>
