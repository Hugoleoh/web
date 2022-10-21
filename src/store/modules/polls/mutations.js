export default {
  setUserNewPoll(state, payload) {
    state.userPolls.push(payload.poll);
  },
  setUserPolls(state, payload) {
    state.userPolls = payload.polls;
  },
};
