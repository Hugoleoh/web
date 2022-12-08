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
    async createOption(option) {
      await this.$store.dispatch("createOption", option);
    },
    async editOption(option) {
      await this.$store.dispatch("editOption", option);
    },
    async deleteOption(payload) {
      await this.$store.dispatch("deleteOption", payload);
    },
  },
};
</script>
