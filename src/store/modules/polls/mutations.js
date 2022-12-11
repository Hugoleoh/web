export default {
  setUserNewPoll(state, payload) {
    state.userPolls.push(payload.poll);
  },
  setPollNewQuestion(state, payload) {
    state.selectedPoll.questions.push(payload.question);
  },
  setUserPolls(state, payload) {
    state.userPolls = payload.polls;
  },
  setSelectedPoll(state, payload) {
    state.selectedPoll = payload;
  },
  setSharingURL(state, payload) {
    state.selectedPoll.sharing_url = payload;
  },
  setQuestionNewOption(state, payload) {
    state.selectedPoll.questions.forEach((question, index) => {
      if (question.id === payload.option.questionId) {
        state.selectedPoll.questions[index].push(payload.option);
      }
    });
  },
  setShowModal(state, payload) {
    state.showModal = payload;
  },
  setStartedPoll(state) {
    state.selectedPoll.started = true;
  },
};
