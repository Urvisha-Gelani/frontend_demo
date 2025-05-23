// src/store/useUserStore.ts
import { create } from "zustand";
import axiosInstance from "../../helpers/axios/axios.config";
import { toast } from "react-toastify";

export const useJobStore = create((set, get) => ({
  jobDetail: [],
  isLoading: false,
  error: null,
  totalJobs: 0,

  jobManage: async (jobData) => {
    const { id } = jobData;
    const { isLoading } = get();
    if (isLoading) {
      return;
    }
    try {
      set({ isLoading: true, error: null });
      const method = id ? "patch" : "post";
      const apiUrl = id ? `/jobs/${id}` : "/create/jobs";
      const response = await axiosInstance[method](apiUrl, jobData);

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

  fetchJobs: async ({ page, limit }) => {
    const { isLoading } = get();
    if (isLoading) {
      return;
    }
    try {
      set({ isLoading: true, error: null });
      const response = await axiosInstance.get(
        `/jobs?page=${page}&limit=${limit}`
      );
      console.log(response, "****************");
      const totalJobs = response.headers["total-users"];
      const {
        status,
        data: { jobs },
      } = response;
      if (status === 201 || status === 200) {
        set({
          isLoading: true,
          error: null,
          jobDetail: jobs,
          totalJobs: totalJobs,
        });
        toast.success("Jobs fetched successfully");
      }
    } catch (error) {
      const { response } = error;
      const { status, data } = response;
      if (status === 422) {
        set({ error: data.message, isLoading: false });
        toast.error(data.message);
      } else {
        toast.error("Something went wrong. please try again.");
        set({ isLoading: false });
      }
      console.log("Error creating user:", error);
    } finally {
      set({ isLoading: false });
    }
  },
  deleteJob: async (id) => {
    const { isLoading } = get();
    if (isLoading) {
      return;
    }
    set({ isLoading: true, error: null });
    const { fetchJobs } = get();
    try {
      const response = await axiosInstance.delete(`/jobs/${id}`);
      console.log(response, "****************");
      const { status } = response;
      if (status === 201 || status === 200) {
        set({ isLoading: true, error: null });
        toast.success("Job deleted successfully");
      }
    } catch (error) {
      const { response } = error;
      const { status, data } = response;
      if (status === 422) {
        set({ error: data.message, isLoading: false });
        toast.error(data.message);
        fetchJobs({ page: 1, limit: 10 });
      } else {
        toast.error("Something went wrong. please try again.");
        set({ isLoading: false });
      }
      console.log("Error creating user:", error);
    } finally {
      set({ isLoading: false });
    }
  },
}));
