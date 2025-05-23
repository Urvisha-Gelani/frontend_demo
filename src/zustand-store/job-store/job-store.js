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
    const { isLoading, jobDetail } = get();
    if (isLoading) return;

    try {
      set({ isLoading: true, error: null });
      const method = id ? "patch" : "post";
      const apiUrl = id ? `/jobs/${id}` : "/create/jobs";
      const response = await axiosInstance[method](apiUrl, jobData);
      const { data, status } = response;

      if (status === 201 || status === 200) {
        let updatedJobs;
        if (id) {
          updatedJobs = jobDetail.map((job) => (job.id === id ? data : job));
          toast.success("Job updated successfully");
        } else {
          updatedJobs = [data, ...jobDetail];
          toast.success("Job created successfully");
        }
        set({
          jobDetail: updatedJobs,
          totalJobs: updatedJobs.length,
          isLoading: false,
        });
      }
      return response;
    } catch (error) {
      const { response } = error;
      const { status, data } = response || {};
      if (status === 422) {
        set({ error: data.message, isLoading: false });
        toast.error(data.message);
      } else {
        set({ error: "Something went wrong", isLoading: false });
        toast.error("Something went wrong. Please try again.");
      }
      console.error("Error managing job:", error);
    } finally {
      set({ isLoading: false });
    }
  },

  fetchJobs: async ({ page, limit }) => {
    const { isLoading } = get();
    if (isLoading) return;
    try {
      set({ isLoading: true, error: null });
      const response = await axiosInstance.get(
        `/jobs?page=${page}&limit=${limit}`
      );
      const totalJobs = response.headers["total-users"];
      const {
        status,
        data: { jobs },
      } = response;

      if (status === 201 || status === 200) {
        set({
          isLoading: false,
          error: null,
          jobDetail: jobs,
          totalJobs: totalJobs,
        });
        toast.success("Jobs fetched successfully");
      }
    } catch (error) {
      const { response } = error;
      const { status, data } = response || {};
      if (status === 422) {
        set({ error: data.message, isLoading: false });
        toast.error(data.message);
      } else {
        toast.error("Something went wrong. Please try again.");
        set({ isLoading: false });
      }
      console.error("Error fetching jobs:", error);
    }
  },

  deleteJob: async (id) => {
    const { isLoading, jobDetail } = get();
    if (isLoading) return;

    try {
      set({ isLoading: true, error: null });
      const response = await axiosInstance.delete(`/jobs/${id}`);
      const { status } = response;

      if (status === 201 || status === 200) {
        const updatedJobs = jobDetail.filter((job) => job.id !== id);
        set({
          jobDetail: updatedJobs,
          totalJobs: updatedJobs.length,
          isLoading: false,
        });
        toast.success("Job deleted successfully");
      }
    } catch (error) {
      const { response } = error;
      const { status, data } = response || {};
      if (status === 422) {
        set({ error: data.message, isLoading: false });
        toast.error(data.message);
      } else {
        toast.error("Something went wrong. Please try again.");
        set({ isLoading: false });
      }
      console.error("Error deleting job:", error);
    } finally {
      set({ isLoading: false });
    }
  },
}));
