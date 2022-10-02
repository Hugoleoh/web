import Global from "@/constants/Global.js";

export default {
  async login(context, payload) {
    const response = await fetch(Global.getServerDomain() + `/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        login: payload.user,
        password: payload.password,
      }),
    });
    const responseData = await response.json();

    if (!response.ok) {
      const error = new Error(
        responseData.message || "Failed to authenticate. Check your data."
      );
      throw error;
    }
    context.commit("setUser", responseData);
  },
  async register(context, payload) {
    const response = await fetch(Global.getServerDomain() + `/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: payload.username,
        first_name: payload.first_name,
        last_name: payload.last_name,
        email: payload.email,
        password: payload.password,
        cpf: payload.cpf,
      }),
    });
    const responseData = await response.json();

    if (!response.ok) {
      const error = new Error(
        responseData.message || "Failed to authenticate. Check your data."
      );
      throw error;
    }
    context.commit("setUser", responseData);
  },
};
