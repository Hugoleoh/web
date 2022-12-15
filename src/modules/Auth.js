class Auth {
  /**
   * Authenticate a user. Save a token string in Local Storage
   *
   * @param {string} token
   */
  static authenticateUser(token, userId, createdAt, expiresIn) {
    const expirationDate = +new Date(createdAt).getTime() + expiresIn;
    localStorage.setItem("token", token);
    localStorage.setItem("userId", userId);
    localStorage.setItem("tokenExpiration", expirationDate);
  }

  /**
   * Check if a user is authenticated - check if a token is saved in Local Storage
   *
   * @returns {boolean}
   */
  static isUserAuthenticated() {
    return (
      localStorage.getItem("token") !== null && localStorage.getItem("userId")
    );
  }

  /**
   * Deauthenticate a user. Remove a token from Local Storage.
   *
   */
  static deauthenticateUser() {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("tokenExpiration");
  }
  /**
   * Get a token value.
   *
   * @returns {string}
   */

  static getToken() {
    return localStorage.getItem("token");
  }

  static getTokenExpiration() {
    return localStorage.getItem("tokenExpiration");
  }

  static getUserId() {
    return parseInt(localStorage.getItem("userId"));
  }

  static getNowTime() {
    return new Date().getTime();
  }
}

export default Auth;
