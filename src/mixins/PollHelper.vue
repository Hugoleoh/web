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
      setShowModal: "changeShowModal",
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
    async fetchPollBySharingURL(sharing_url) {
      await this.$store.dispatch("fetchPollBySharingURL", sharing_url);
    },
    async generateSharingURL(id) {
      await this.$store.dispatch("generatePollURL", id);
    },
    async launchPoll(id) {
      await this.$store.dispatch("launchPoll", id);
    },
    async updateDates(poll) {
      await this.$store.dispatch("updateDates", poll);
    },
    async generalEdit(poll) {
      await this.$store.dispatch("generalEdit", poll);
    },
    async deletePoll(id) {
      await this.$store.dispatch("deletePoll", id);
    },
    async closePoll(id) {
      await this.$store.dispatch("closePoll", id);
    },
    async duplicatePoll(poll) {
      let copy = { ...poll };
      copy.title = poll.title + " (CÓPIA)";
      copy.sharing_url = null;
      await this.$store.dispatch("createPoll", copy);
    },
  },
};
</script>
