import Global from "@/constants/Global.js";
import Auth from "@/modules/Auth";
export default {
  async createOption(context, payload) {
    const response = await fetch(Global.getServerDomain() + `/options/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + Auth.getToken(),
      },
      body: JSON.stringify({
        name: payload.name,
        type: 1,
        description: payload.description,
        questionId: payload.questionId,
        pollId: payload.pollId,
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
    context.commit("setQuestionNewOption", responseData);
  },
  async editOption(context, payload) {
    const response = await fetch(
      Global.getServerDomain() + `/options/edit/${payload.id}`,
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
          questionId: payload.questionId,
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
    //context.commit("setPollOptionUpdated", responseData);
  },
  async deleteOption(context, payload) {
    const response = await fetch(
      Global.getServerDomain() + `/options/delete/${payload.optionId}`,
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
    //context.commit("popPolloption", responseData);
  },
};
