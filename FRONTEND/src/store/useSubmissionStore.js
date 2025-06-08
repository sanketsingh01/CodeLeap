import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";

export const useSubmissionStore = create((set) => ({
  isLoading: false,
  submissions: [],
  submission: null,
  submissionCount: null,

  getAllSubmissions: async () => {
    try {
      set({ isLoading: true });
      const reposne = await axiosInstance.get(
        "/submission/get-all-submissions"
      );
      set({ submissions: reposne.data.Data });
      toast.success(reposne.data.message);
    } catch (error) {
      console.error("Error fetching all submissions: ", error);
      toast.error("Error in fecting all submissions");
    } finally {
      set({ isLoading: false });
    }
  },

  getSubmissionForProblem: async (problemId) => {
    try {
      const resposne = await axiosInstance.get(
        `/submission/get-submission/${problemId}`
      );
      set({ submission: resposne.data.Data });
    } catch (error) {
      console.error("Error fecthing submission for problem: ", error);
      toast.error("Error in fecting submission for problem");
    }
  },

  getSubmissionCountForProblem: async (problemId) => {
    try {
      const resposne = await axiosInstance.get(
        `/submission/get-submission-count/${problemId}`
      );
      set({ submissionCount: resposne.data.Data });
    } catch (error) {
      console.error("Error fetching count for problem: ", error);
      toast.error("Error fetching count for problem");
    }
  },
}));
