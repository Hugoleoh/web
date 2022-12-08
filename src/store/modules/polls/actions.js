import Global from "@/constants/Global.js";
import Auth from "@/modules/Auth";
export default {
  setSelectedPoll(context, payload) {
    context.commit("setSelectedPoll", payload);
  },
  changeShowModal(context, payload) {
    context.commit("setShowModal", payload);
  },
  async createPoll(context, payload) {
    const response = await fetch(Global.getServerDomain() + `/polls/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + Auth.getToken(),
      },
      body: JSON.stringify({
        title: payload.title,
        initial_date: payload.initial_date,
        end_date: payload.end_date,
        description: payload.description,
        privacy: payload.privacy,
        userId: Auth.getUserId(),
      }),
    });
    const responseData = await response.json();

    if (!response.ok) {
      const error = new Error(
        responseData.message || "Unable to fetch user's profile"
      );
      throw error;
    }
    context.commit("setUserNewPoll", responseData);
  },

  async fetchUserPolls(context) {
    const response = await fetch(Global.getServerDomain() + "/polls/all", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + Auth.getToken(),
      },
    });
    const responseData = await response.json();

    if (!response.ok) {
      const error = new Error(
        responseData.message || "Unable to fetch user's profile"
      );
      throw error;
    }
    context.commit("setUserPolls", responseData);
  },

  async fetchPollById(context, payload) {
    const response = await fetch(
      Global.getServerDomain() + `/polls/getPoll/${payload}`,
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
    context.dispatch("setSelectedPoll", responseData.polls);
  },

  async generatePollURL(context, payload) {
    const response = await fetch(
      Global.getServerDomain() + `/polls/generate/url/${payload}`,
      {
        method: "PATCH",
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
    context.commit("setSharingURL", responseData.url);
  },
};
