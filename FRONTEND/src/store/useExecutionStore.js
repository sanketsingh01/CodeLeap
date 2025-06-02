import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";

export const useExecutionStore = create((set) => ({
  isExecuting: false,
  submission: null,

  executeCode: async (
    sourceCode,
    language_id,
    stdin,
    expectedOutputs,
    problemId
  ) => {
    try {
      set({ isExecuting: true });
      console.log(
        "SUbmission Data: ",
        JSON.stringify({
          sourceCode,
          language_id,
          stdin,
          expectedOutputs,
          problemId,
        })
      );

      const response = await axiosInstance.post("/execute-code", {
        sourceCode,
        language_id,
        stdin,
        expectedOutputs,
        problemId,
      });

      set({ submission: response.data.Data });
      toast.success(response.data.message);
    } catch (error) {
      console.log("Error while executing code: ", error);
      toast.error("Error while executing code");
    } finally {
      set({ isExecuting: false });
    }
  },
}));
