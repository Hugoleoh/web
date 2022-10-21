import Global from "@/constants/Global.js";
import Auth from "@/modules/Auth";
export default {
  async fetchUserProfile(context, payload) {
    const response = await fetch(
      Global.getServerDomain() + `/users/profile/${payload.userId}`,
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
    context.commit("setLoggedUser", responseData);
  },
};
