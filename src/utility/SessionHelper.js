import Cookies from "js-cookie";

class SessionHelper {
  setAccessToken(accessToken) {
    localStorage.setItem("accessToken", accessToken);
  }

  getAccessToken() {
    return localStorage.getItem("accessToken");
  }

  setLoggedIn(value) {
    localStorage.setItem("loggedIn", value);
  }

  getLoggedIn() {
    return JSON.parse(localStorage.getItem("loggedIn")) || null;
  }

  clearSessions() {
    localStorage.clear();
    Cookies.remove("refreshToken");
    Cookies.remove("accessToken");
    window.location.href = "/";
  }
}

export const {
  setAccessToken,
  getAccessToken,
  setLoggedIn,
  getLoggedIn,
  clearSessions,
} = new SessionHelper();
