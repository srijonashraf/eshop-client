import create from "zustand";
import axios from "axios";
import { getEmail, setEmail, unauthorized } from "../utility/Utility.js";
import { setAccessToken } from "../utility/SessionHelper.js";
import { axiosHeader, getBaseURL } from "../utility/FunctionHelper.js";

const BaseUrl = getBaseURL();

const UserStore = create((set) => ({
  LoginFormData: { email: "" },
  LoginFormOnChange: (name, value) => {
    set((state) => ({
      LoginFormData: {
        ...state.LoginFormData,
        [name]: value,
      },
    }));
  },
  UserOTPRequest: async (email) => {
    set({ isFormSubmit: true });
    let res = await axios.get(`${BaseUrl}/api/v1/UserOTP/${email}`);
    setEmail(email);
    set({ isFormSubmit: false });
    return res.data["status"] === "success";
  },

  OTPFormData: { otp: "" },
  OTPFormOnChange: (name, value) => {
    set((state) => ({
      OTPFormData: {
        ...state.OTPFormData,
        [name]: value,
      },
    }));
  },
  VerifyLoginRequest: async (otp) => {
    set({ isFormSubmit: true });
    let email = getEmail();
    let res = await axios.get(`${BaseUrl}/api/v1/VerifyOTP/${email}/${otp}`);
    set({ isFormSubmit: false });
    setAccessToken(res.data.token);
    return res.data["status"] === "success";
  },

  isFormSubmit: false,

  ProfileForm: {
    avatar: "",
    mobile: "",
    name: "",
    password: "",
  },
  ProfileFormChange: (name, value) => {
    set((state) => ({
      ProfileForm: {
        ...state.ProfileForm,
        [name]: value,
      },
    }));
  },

  ProfileDetails: null,
  ProfileDetailsRequest: async () => {
    try {
      let res = await axios.get(
        `${BaseUrl}/api/v1/ProfileDetails`,
        axiosHeader()
      );
      
      if (res.data.status === "success") {
        set({ ProfileDetails: res.data.data });
        set({ ProfileForm: res.data.data });
      } else {
        set({ ProfileDetails: [] });
      }
    } catch (e) {
      unauthorized(e.response.status);
    }
  },

  ProfileSaveRequest: async (PostBody) => {
    try {
      set({ ProfileDetails: null });
      let res = await axios.post(
        `${BaseUrl}/api/v1/UpdateProfile`,
        PostBody,
        axiosHeader()
      );
      return res.data["status"] === "success";
    } catch (e) {
      unauthorized(e.response.status);
    }
  },
}));

export default UserStore;
