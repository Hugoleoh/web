export default {
  setPollNewVoter(state, payload) {
    state.selectedPollVoters.push(payload.voter);
  },
  removePollVoter(state, payload) {
    state.selectedPollVoters.splice(payload, 1);
  },
  setSelectedPollVoters(state, payload) {
    state.selectedPollVoters = payload.voters;
  },
};
