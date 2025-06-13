import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";

export const useProblemStore = create((set) => ({
  problems: [],
  problem: null,
  solvedProblems: [],
  isProblemsLoading: false,
  isProblemLoading: false,

  getAllProblems: async () => {
    try {
      set({ isProblemsLoading: true });

      const response = await axiosInstance.get("/problems/get-all-problems");
      //   console.log(response.data.Data);

      set({ problems: response.data.Data });
    } catch (error) {
      console.error("Error while fetching all problems", error);
      toast.error("Error while fetching all problems");
    } finally {
      set({ isProblemsLoading: false });
    }
  },

  getProblemById: async (id) => {
    try {
      set({ isProblemLoading: true });

      const response = await axiosInstance.get(`/problems/get-problem/${id}`);
      console.log(response);
      console.log(response.data.Data);

      set({ problem: response.data.Data });
      toast.success(response.data.message);
    } catch (error) {
      console.error("Error getting all problems", error);
      toast.error("Error in fetching problems");
    } finally {
      set({ isProblemLoading: false });
    }
  },

  getSolvedProblemByUser: async () => {
    try {
      const response = await axiosInstance.get("/problems/get-solved-problems");

      set({ solvedProblems: response.data.Data });
    } catch (error) {
      console.error("Error getting all solved problems", error);
      toast.error("Error in fetching solved problems");
    }
  },
}));
