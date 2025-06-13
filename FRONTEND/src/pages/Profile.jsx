import React, { useEffect, useMemo } from "react";
import { User, Mail, BookOpenCheck, Trophy, Code2, Loader } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useProblemStore } from "../store/useProblemStore.js";
import UserDetailsCard from "../componenets/userDetailsCard.jsx";
import LoginHeatmap from "../componenets/LoginHeatmap.jsx";
import profile from "./assets/avatar1.webp";

import {
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const Profile = ({ user }) => {
  const { authUser, checkAuth } = useAuthStore();
  const {
    solvedProblems,
    getSolvedProblemByUser,
    getAllProblems,
    problems,
    isProblemsLoading,
  } = useProblemStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    getSolvedProblemByUser();
  }, []);

  useEffect(() => {
    getAllProblems();
  }, [getAllProblems]);

  const loginMap = authUser?.loginMap || {};

  const SolvedProblems = useMemo(() => {
    return (problems || []).filter((problem) =>
      problem.solvedBy?.some((user) => user.userId === authUser.id)
    );
  }, [problems, authUser]);

  // console.log("Streak Count: ", authUser.streakCount);
  const total = problems.length;
  const solved = solvedProblems?.length || 214;

  const easy = {
    solved: solvedProblems?.filter((p) => p.difficulty === "EASY").length || 80,
    // total: 880,
  };

  const medium = {
    solved:
      solvedProblems?.filter((p) => p.difficulty === "MEDIUM").length || 0,
    // total: 1858,
  };

  const hard = {
    solved: solvedProblems?.filter((p) => p.difficulty === "HARD").length || 0,
    // total: 842,
  };

  console.log("Soolved problems: ", solvedProblems);

  return (
    <div className="max-w-6xl mx-auto mt-25 p-6 sm:p-10 rounded-2xl shadow-md mb-6">
      <div className="flex flex-col gap-10">
        {/* TOP SECTION: Profile Info + Streak/Premium Buttons */}
        <div className="flex flex-col sm:flex-row justify-between items-center w-full gap-6 ml-4">
          {/* Avatar + Name + Email */}
          <div className="flex items-center gap-6">
            <img
              src={user?.avatar || profile}
              alt="avatar"
              className="w-24 h-24 rounded-full border-4 border-[#F4FF54] shadow-lg"
            />
            <div className="space-y-2">
              <h2 className="text-3xl font-bold">
                {authUser?.name || "John Doe"}
              </h2>
              <p className="text-gray-500 flex items-center gap-2">
                <Mail className="w-4 h-4" />
                {authUser?.email || "sanket@example.com"}
              </p>
            </div>
          </div>

          {/* Streak + Premium Buttons */}
          {authUser && (
            <div className="flex items-center gap-4 mt-4 sm:mt-0">
              <button className="bg-red-300 text-red-600 rounded-md px-2 py-2 text-lg font-semibold">
                Streak Day: {authUser.streakCount} 🔥
              </button>
              <button className="bg-yellow-300 text-yellow-700 rounded-md px-2 py-2 text-lg font-semibold mr-4">
                Longest Streak: {authUser.longestCount}
              </button>
            </div>
          )}
        </div>

        {/* BOTTOM SECTION: UserDetailsCard + Problem Counter */}
        <div className="flex flex-col lg:flex-row gap-30 mt-4">
          {/* UserDetailsCard */}
          <div className="flex-1 p-6 rounded-xl bg-zinc-900">
            <UserDetailsCard user={authUser} />
          </div>

          {/* Problem Counter Section */}
          <div className="flex flex-row items-center justify-between gap-8 rounded-xl shadow-inner p-8 pt-2 pb-2 bg-zinc-900">
            {/* Circular Progress */}
            <div className="w-48 h-48">
              <CircularProgressbarWithChildren
                value={solved}
                maxValue={total}
                styles={buildStyles({
                  pathColor: "#10B981",
                  trailColor: "#374151",
                  textColor: "#ffffff",
                })}
              >
                <div className="text-center">
                  <span className="text-2xl font-bold text-white">
                    {solved}
                    <span className="text-gray-400 text-lg">/ {total}</span>
                  </span>
                  <p className="text-lg mt-1">✔ Solved</p>
                </div>
              </CircularProgressbarWithChildren>
            </div>

            {/* Difficulty Breakdown - Same size, just beside */}
            <div className="space-y-2 text-sm">
              <div className="bg-gray-800 p-2 rounded-md flex flex-col items-center w-48 gap-0.5">
                <span className="text-emerald-400 font-semibold text-base">
                  Easy
                </span>
                <span className="text-white">{easy.solved}</span>
              </div>
              <div className="bg-gray-800 p-2 rounded-md flex flex-col items-center w-48 gap-0.5">
                <span className="text-yellow-400 font-semibold text-base">
                  Med.
                </span>
                <span className="text-white">{medium.solved}</span>
              </div>
              <div className="bg-gray-800 p-2 rounded-md flex flex-col items-center w-48 gap-0.5">
                <span className="text-red-400 font-semibold text-base">
                  Hard
                </span>
                <span className="text-white">{hard.solved}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-col-reverse">
        <LoginHeatmap loginMap={loginMap} />
      </div>

      <div>
        {isProblemsLoading ? (
          <div className="flex items-center justify-center h-screen">
            <Loader className="size-10 animate-spin" />
          </div>
        ) : (
          <div className="mt-10 text-center">
            <span className="text-2xl font-semibold text-left">
              Solved Problems
            </span>
            <div className="overflow-x-auto rounded-xl border border-zinc-700 mt-6">
              <table className="min-w-full text-sm text-left text-white mt-4">
                <thead className="bg-zinc-900 text-gray-400">
                  <tr>
                    <th className="px-4 py-5">Title</th>
                    <th className="px-4 py-5">Difficulty</th>
                    <th className="px-4 py-5">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800">
                  {solvedProblems.length ? (
                    solvedProblems.map((problem) => {
                      return (
                        <tr
                          key={problem.id}
                          className="hover:bg-zinc-800 transition"
                        >
                          <td className="px-4 py-3">
                            <span className="hover:underline text-sm font-medium cursor-pointer">
                              {problem.title}
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            <span
                              className={`px-2 py-0.5 rounded-full text-sm font-bold ${
                                problem.difficulty === "EASY"
                                  ? "bg-green-500/10 text-green-400"
                                  : problem.difficulty === "MEDIUM"
                                  ? "bg-yellow-500/10 text-yellow-400"
                                  : "bg-red-500/10 text-red-400"
                              }`}
                            >
                              {problem.difficulty}
                            </span>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td
                        colSpan={5}
                        className="text-center py-6 text-gray-500 font-semibold"
                      >
                        No Problems Found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
