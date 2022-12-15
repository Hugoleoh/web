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
  async editUser(context, payload) {
    const response = await fetch(
      Global.getServerDomain() + `/users/edit/${payload.userId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + Auth.getToken(),
        },
        body: JSON.stringify({
          first_name: payload.first_name,
          last_name: payload.last_name,
          email: payload.email,

          cpf: payload.cpf,
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
    context.commit("setLoggedUser", responseData);
  },
  async changePassword(context, payload) {
    const response = await fetch(
      Global.getServerDomain() + `/users/password/change/${payload.userId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + Auth.getToken(),
        },
        body: JSON.stringify({
          current: payload.current,
          new: payload.new,
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
  },
};
