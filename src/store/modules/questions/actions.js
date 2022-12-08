import Global from "@/constants/Global.js";
import Auth from "@/modules/Auth";
export default {
  async createQuestion(context, payload) {
    const response = await fetch(
      Global.getServerDomain() + `/questions/create`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + Auth.getToken(),
        },
        body: JSON.stringify({
          name: payload.name,
          type: 1,
          description: payload.description,
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
    context.commit("setPollNewQuestion", responseData);
  },
  async editQuestion(context, payload) {
    const response = await fetch(
      Global.getServerDomain() + `/questions/edit/${payload.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + Auth.getToken(),
        },
        body: JSON.stringify({
          name: payload.name,
          type: 1,
          description: payload.description,
          pollId: payload.pollId,
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
    //context.commit("setPollQuestionUpdated", responseData);
  },
  async deleteQuestion(context, payload) {
    const response = await fetch(
      Global.getServerDomain() + `/questions/delete/${payload.questionId}`,
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
    //context.commit("popPollQuestion", responseData);
  },
};
