import React, { useEffect } from "react";
import { Loader } from "lucide-react";

import { useProblemStore } from "../store/useProblemStore.js";

import { useAuthStore } from "../store/useAuthStore.js";
import ProblemsTable from "../componenets/ProblemsTable.jsx";

const ProblemsHome = () => {
  const { authUser } = useAuthStore();
  const { getAllProblems, problems, isProblemsLoading } = useProblemStore();

  useEffect(() => {
    getAllProblems();
  }, [getAllProblems]);

  if (isProblemsLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center mt-32 px-4">
      <h1 className="text-5xl md:text-6xl font-extrabold text-white animate-fade-in">
        Hi, {authUser?.name}
        <span className="block text-[#F4FF54]">Welcome to CodeLeap 🤠</span>
      </h1>
      <p className="text-xl md:text-2xl mt-6 text-gray-300 font-medium tracking-wide animate-fade-in delay-200">
        Let's start solving the best coding problems from the top
        Originization's
      </p>

      {problems.length > 0 ? (
        <ProblemsTable problems={problems} />
      ) : (
        <p className="mt-10 text-center text-lg font-semibold text-gray-500 dark:text-gray-400 z-10 border border-primary px-4 py-2 rounded-md border-dashed">
          No Problems Found
        </p>
      )}
    </div>
  );
};

export default ProblemsHome;
