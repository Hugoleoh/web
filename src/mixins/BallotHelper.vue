<script>
import { mapActions } from "vuex";

export default {
  methods: {
    ...mapActions({}),
    async saveBallot(ballot) {
      await this.$store.dispatch("saveBallot", ballot);
      /* const options = ballot.choices;
      await options.forEach(async (id) => {
        const vote = {
          pollId: ballot.pollId,
          name: ballot.name,
          email: ballot.email,
          voter_key: ballot.voter_key,
          optionId: id,
        };
        await this.$store.dispatch("saveBallot", vote);
      }); */
    },
  },
};
</script>
