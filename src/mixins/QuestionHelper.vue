<script>
import { mapGetters, mapActions } from "vuex";

export default {
  computed: {
    ...mapGetters({
      /*   userPolls: "userPolls",
      selectedPoll: "selectedPoll", */
    }),
  },
  methods: {
    ...mapActions({
      //setPoll: "setSelectedPoll",
    }),
    async createQuestion(question) {
      await this.$store.dispatch("createQuestion", question);
    },
    async editQuestion(question) {
      await this.$store.dispatch("editQuestion", question);
    },
    async deleteQuestion(payload) {
      await this.$store.dispatch("deleteQuestion", payload);
    },
  },
};
</script>
