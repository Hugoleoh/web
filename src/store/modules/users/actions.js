import Global from "@/constants/Global.js";
export default {
  async getProfile(context) {
    const userId = context.rootGetters.userId;
    const token = context.rootGetters.token;
    const response = await fetch(
      Global.getServerDomain() + `/users/profile/${userId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      }
    );
    const responseData = await response.json();

    if (!response.ok) {
      const error = new Error(
        responseData.message || "Failed to fetch profile"
      );
      throw error;
    }
    context.commit("setUserProfile", responseData);
  },
};
