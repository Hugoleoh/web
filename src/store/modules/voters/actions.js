import Global from "@/constants/Global.js";
import Auth from "@/modules/Auth";
export default {
  async fetchPollVoters(context, payload) {
    const response = await fetch(
      Global.getServerDomain() + `/voters/${payload}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + Auth.getToken(),
        },
      }
    );
    const responseData = await response.json();

    if (!response.ok) {
      const error = new Error(
        responseData.message || "Unable to fetch user's profile"
      );
      throw error;
    }
    context.commit("setSelectedPollVoters", responseData);
  },
  async addVoter(context, payload) {
    const response = await fetch(Global.getServerDomain() + `/voters/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + Auth.getToken(),
      },
      body: JSON.stringify({
        name: payload.name,
        email: payload.email,
        vote_weight: payload.vote_weight,
        pollId: payload.pollId,
      }),
    });
    const responseData = await response.json();

    if (!response.ok) {
      const error = new Error(
        responseData.message || "Unable to fetch user's profile"
      );
      throw error;
    }
    context.commit("setPollNewVoter", responseData);
  },
  async removeVoter(context, payload) {
    const response = await fetch(
      Global.getServerDomain() + `/voters/remove/${payload.voterId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + Auth.getToken(),
        },
        body: JSON.stringify({
          pollId: payload.pollId,
          userId: Auth.getUserId(),
        }),
      }
    );
    const responseData = await response.json();

    if (!response.ok) {
      const error = new Error(
        responseData.message || "Unable to fetch user's profile"
      );
      throw error;
    }
    context.commit("removePollVoter", payload.index);
  },
  setVoterInfo(context, payload) {
    context.commit("setVoterInfo", payload);
  },
};
