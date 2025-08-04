import { create } from "zustand";
import axios from "../lib/axios.js";
import { toast } from "react-hot-toast";

export const useUserStore = create((set, get) => ({
  user: null,
  loading: false,
  checkingAuth: true,

  signup: async ({ name, email, password, confirmPassword }) => {
    set({ loading: true });

    if (password !== confirmPassword) {
      set({ loading: false });
      return toast.error("Passwords do not match");
    }

    try {
      console.log("Axios baseURL:", axios.defaults.baseURL);
      const res = await axios.post("/auth/signup", {
        name,
        email,
        password,
      });
      set({ user: res.data.user, loading: false });
    } catch (error) {
      set({ loading: false });
      console.log("Error:", error);
      toast.error(
        error.response?.data.message ||
          "An error occurred during signup, please try again."
      );
    }
  },

  login: async ({ email, password }) => {
    set({ loading: true });

    try {
      console.log("Axios baseURL:", axios.defaults.baseURL);
      const res = await axios.post("/auth/login", {
        email,
        password,
      });
      set({ user: res.data.user, loading: false });
    } catch (error) {
      set({ loading: false });
      console.log("Error:", error);
      toast.error(
        error.response?.data.message ||
          "An error occurred during signup, please try again."
      );
    }
  },
}));
