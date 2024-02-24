import { getAccessToken } from "./SessionHelper.js";
import Cookies from "js-cookie";
export const getBaseURL = () => {
  if (process.env.NODE_ENV === "production") {
    return "https://eshop-server-5te0.onrender.com";
  } else {
    return "http://localhost:4000";
  }
};

export const axiosHeader = () => {
  // console.log(getAccessToken(), Cookies.get('accessToken'));
  return {
    headers: { token: getAccessToken() || Cookies.get("accessToken") },
  };
};
