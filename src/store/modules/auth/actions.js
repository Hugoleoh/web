import Global from "@/constants/Global.js";
import Auth from "@/modules/Auth";

let timer;

export default {
  async login(context, payload) {
    return context.dispatch("auth", { ...payload, mode: "login" });
  },
  async register(context, payload) {
    return context.dispatch("auth", { ...payload, mode: "register" });
  },

  async auth(context, payload) {
    let response;
    if (payload.mode === "register") {
      response = await fetch(Global.getServerDomain() + `/auth/register`, {
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
    } else if (payload.mode === "login") {
      response = await fetch(Global.getServerDomain() + `/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          login: payload.user,
          password: payload.password,
        }),
      });
    }
    const responseData = await response.json();

    if (!response.ok) {
      const error = new Error(
        responseData.message || "Failed to authenticate. Check your data."
      );
      throw error;
    }
    Auth.authenticateUser(
      responseData.token,
      responseData.userId,
      responseData.createdAt,
      responseData.expiresIn
    );
    timer = setTimeout(function () {
      context.dispatch("autoLogout");
    }, responseData.expiresIn);
    context.commit("setUser", responseData);
  },

  tryAutoLogin(context) {
    if (Auth.isUserAuthenticated()) {
      const expiresIn = +Auth.getTokenExpiration() - Auth.getNowTime();
      if (expiresIn < 0) {
        return;
      }
      timer = setTimeout(function () {
        context.dispatch("autoLogout");
      }, expiresIn);
      context.commit("setUser", {
        token: Auth.getToken(),
        userId: Auth.getUserId(),
      });
    }
  },
  logout(context) {
    Auth.deauthenticateUser();
    clearTimeout(timer);
    context.commit("setUser", {
      userId: null,
      token: null,
    });
  },
  autoLogout(context) {
    context.dispatch("logout");
    context.commit("setAutoLogout");
  },
};
