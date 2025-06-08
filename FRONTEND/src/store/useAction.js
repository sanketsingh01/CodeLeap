import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";

export const useAction = create((set) => ({
  isDeletingProblem: false,

  onDeleteProblem: async (id) => {
    try {
      set({ isDeletingProblem: true });

      const response = await axiosInstance.delete(
        `/problems/delete-problem/${id}`
      );
      toast.success(response.data.message);
    } catch (error) {
      console.error("Error deleting prroblem: ", error);
      toast.error("Error in deleting problem");
    } finally {
      set({ isDeletingProblem: false });
    }
  },
}));
