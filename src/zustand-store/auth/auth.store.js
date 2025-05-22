// src/store/useUserStore.ts
import { create } from "zustand";
import axiosInstance from "../../helpers/axios/axios.config";

export const useAuthStore = create((set) => ({
  users: [],
  isLoading: false,
  error: null,

  createUser: async (userData) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.post("/register", userData);
      console.log(response, "****************");
      const { status } = response;
      if (status === 201 || status === 200) {
        set({ isLoading: true, error: null });
      }
      return response;
    } catch (error) {
      const { response } = error;
      const { status, data } = response;
      if (status === 422) {
        set({ error: data.message, isLoading: false });
      } else {
        set({ error: "Something went wrong", isLoading: false });
      }
      console.log("Error creating user:", error);
    } finally {
      set({ isLoading: false });
    }
  },
}));
