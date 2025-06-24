import { useEffect, useMemo } from "react";
import {
  Mail,
  BookOpenCheck,
  Trophy,
  Code2,
  Loader,
  Calendar,
  Flame,
  Target,
  Award,
  Languages,
  Clock,
  TrendingUp,
} from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useProblemStore } from "../store/useProblemStore.js";
import { useSubmissionStore } from "../store/useSubmissionStore.js";
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

  const { isLoading, submissions, getAllSubmissions } = useSubmissionStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    getSolvedProblemByUser();
  }, []);

  useEffect(() => {
    getAllProblems();
  }, [getAllProblems]);

  useEffect(() => {
    getAllSubmissions();
  }, []);

  console.log("Submissions: ", submissions);

  const loginMap = authUser?.loginMap || {};

  const SolvedProblems = useMemo(() => {
    return (problems || []).filter((problem) =>
      problem.solvedBy?.some((user) => user.userId === authUser.id)
    );
  }, [problems, authUser]);

  const languageFrequency = useMemo(() => {
    const frequencyMap = {};
    submissions.forEach((submission) => {
      const language = submission.language;
      if (language) {
        frequencyMap[language] = (frequencyMap[language] || 0) + 1;
      }
    });
    return frequencyMap;
  }, [submissions]);

  const total = problems.length;
  const solved = solvedProblems?.length || 0;

  const easy = {
    solved: solvedProblems?.filter((p) => p.difficulty === "EASY").length || 0,
  };

  const medium = {
    solved:
      solvedProblems?.filter((p) => p.difficulty === "MEDIUM").length || 0,
  };

  const hard = {
    solved: solvedProblems?.filter((p) => p.difficulty === "HARD").length || 0,
  };

  const languagesUsed = useMemo(() => {
    return Object.keys(languageFrequency).sort(
      (a, b) => languageFrequency[b] - languageFrequency[a]
    );
  }, [languageFrequency]);

  const mostUsedLanguage = useMemo(() => {
    return languagesUsed[0] || "N/A";
  }, [languagesUsed]);

  const averageTime = "12 min";
  const totalSubmissions = submissions.length;
  const successRate = Math.round((solved / total) * 100);
  let rank = "Beginner";
  if (successRate >= 0 && successRate <= 20) {
    rank = "Beginner";
  } else if (successRate > 20 && successRate <= 60) {
    rank = "Intermediate";
  } else if (successRate > 60 && successRate <= 95) {
    rank = "Expert";
  } else {
    rank = "Master";
  }

  const difficultyStats = [
    {
      name: "Easy",
      solved: easy.solved,
      color: "bg-emerald-500",
      bgColor: "bg-emerald-100",
      textColor: "text-emerald-600",
    },
    {
      name: "Medium",
      solved: medium.solved,
      color: "bg-yellow-500",
      bgColor: "bg-yellow-100",
      textColor: "text-yellow-600",
    },
    {
      name: "Hard",
      solved: hard.solved,
      color: "bg-red-500",
      bgColor: "bg-red-100",
      textColor: "text-red-600",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8 mt-20">
      {/* Header Section */}
      <div className="bg-[#131313] dark:from-gray-900 dark:to-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
        <div className="p-8">
          <div className="flex flex-col lg:flex-row items-center gap-8">
            {/* Profile Info */}
            <div className="flex items-center gap-6">
              <div className="relative">
                <img
                  src={authUser?.image || profile}
                  alt="Profile"
                  className="w-24 h-24 rounded-full border-4 border-blue-500 shadow-lg object-cover"
                />
              </div>
              <div className="space-y-2">
                <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  {authUser?.name || "John Doe"}
                </h1>
                <p className="text-gray-600 dark:text-gray-400 flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  {authUser?.email || "sanket@example.com"}
                </p>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 mt-1">
                  <Trophy className="w-4 h-4 mr-2" />
                  {rank}
                </span>
              </div>
            </div>

            {/* Streak Cards */}
            <div className="flex flex-col sm:flex-row gap-4 ml-auto">
              <div className="bg-gradient-to-r from-orange-100 to-red-100 dark:from-orange-900/20 dark:to-red-900/20 border border-orange-200 rounded-lg shadow-sm">
                <div className="p-4 text-center">
                  <div className="flex items-center justify-center gap-2 mb-1">
                    <Flame className="w-5 h-5 text-orange-500" />
                    <span className="font-semibold text-orange-700 dark:text-orange-300">
                      Current Streak
                    </span>
                  </div>
                  <p className="text-2xl font-bold text-orange-600">
                    {authUser?.streakCount || 0}
                  </p>
                </div>
              </div>

              <div className="bg-gradient-to-r from-yellow-100 to-amber-100 dark:from-yellow-900/20 dark:to-amber-900/20 border border-yellow-200 rounded-lg shadow-sm">
                <div className="p-4 text-center">
                  <div className="flex items-center justify-center gap-2 mb-1">
                    <Award className="w-5 h-5 text-yellow-600" />
                    <span className="font-semibold text-yellow-700 dark:text-yellow-300">
                      Best Streak
                    </span>
                  </div>
                  <p className="text-2xl font-bold text-yellow-600">
                    {authUser?.longestCount || 0}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Statistics Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Progress Overview */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700 bg-[#131313]">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Target className="w-5 h-5" />
              Progress Overview
            </h3>
          </div>
          <div className="p-6 space-y-6 bg-[#131313]">
            <div className="flex items-center justify-center ">
              <div className="w-40 h-40">
                <CircularProgressbarWithChildren
                  value={solved}
                  maxValue={total}
                  styles={buildStyles({
                    pathColor: "#3b82f6",
                    trailColor: "#e5e7eb",
                    textColor: "#1f2937",
                  })}
                >
                  <div className="text-center">
                    <span className="text-3xl font-bold text-green-600">
                      {solved}
                    </span>
                    <p className="text-base text-gray-500">of {total}</p>
                    <p className="text-base text-gray-500">solved</p>
                  </div>
                </CircularProgressbarWithChildren>
              </div>
            </div>

            <div className="space-y-3">
              {difficultyStats.map((stat) => (
                <div key={stat.name} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className={`font-medium ${stat.textColor}`}>
                      {stat.name}
                    </span>
                    <span className="font-bold">{stat.solved}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`${stat.color} h-2 rounded-full transition-all duration-300`}
                      style={{
                        width: `${(stat.solved / Math.max(solved, 1)) * 100}%`,
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Additional Statistics */}
        <div className="lg:col-span-2 space-y-6">
          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 ">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
              <div className="p-4 text-center bg-[#131313]">
                <Code2 className="w-8 h-8 mx-auto mb-2 text-blue-500" />
                <p className="text-2xl font-bold">{languagesUsed.length}</p>
                <p className="text-sm text-gray-500">Languages</p>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
              <div className="p-4 text-center bg-[#131313]">
                <Clock className="w-8 h-8 mx-auto mb-2 text-green-500 " />
                <p className="text-2xl font-bold">{averageTime}</p>
                <p className="text-sm text-gray-500">Avg Time</p>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
              <div className="p-4 text-center bg-[#131313]">
                <TrendingUp className="w-8 h-8 mx-auto mb-2 text-purple-500" />
                <p className="text-2xl font-bold">{totalSubmissions}</p>
                <p className="text-sm text-gray-500">Submissions</p>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
              <div className="p-4 text-center bg-[#131313]">
                <BookOpenCheck className="w-8 h-8 mx-auto mb-2 text-orange-500" />
                <p className="text-2xl font-bold">{successRate}%</p>
                <p className="text-sm text-gray-500">Success Rate</p>
              </div>
            </div>
          </div>

          {/* Languages Used */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700 bg-[#131313]">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Languages className="w-5 h-5" />
                Programming Languages
              </h3>
            </div>
            <div className="p-6 bg-[#131313]">
              <div className="flex flex-wrap gap-2">
                {languagesUsed.map((language, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 border border-gray-300 dark:border-gray-600"
                  >
                    {language}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
            <div className="p-4 text-center bg-[#131313] rounded-xl">
              <Code2 className="w-8 h-8 mx-auto mb-2 text-indigo-500" />
              <p className="text-2xl font-bold">{mostUsedLanguage}</p>
              <p className="text-sm text-gray-500">Most Used</p>
            </div>
          </div>
        </div>
      </div>

      {/* Activity Heatmap */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700 bg-[#131313]">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Activity Heatmap
          </h3>
        </div>
        <div className="p-6 bg-[#131313]">
          <LoginHeatmap loginMap={loginMap} />
        </div>
      </div>

      {/* Solved Problems Table */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700 bg-[#131313]">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <BookOpenCheck className="w-5 h-5" />
            Solved Problems ({solved})
          </h3>
        </div>
        <div className="p-6 bg-[#131313] rounded-xl">
          {isProblemsLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader className="w-8 h-8 animate-spin" />
            </div>
          ) : (
            <div className="rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 dark:bg-gray-700">
                    <tr>
                      <th className="px-4 py-3 text-left font-semibold text-gray-900 dark:text-gray-100">
                        Title
                      </th>
                      <th className="px-4 py-3 text-left font-semibold text-gray-900 dark:text-gray-100">
                        Difficulty
                      </th>
                      <th className="px-4 py-3 text-left font-semibold text-gray-900 dark:text-gray-100">
                        Status
                      </th>
                      <th className="px-4 py-3 text-left font-semibold text-gray-900 dark:text-gray-100">
                        Date
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {solvedProblems.length ? (
                      solvedProblems.map((problem) => (
                        <tr key={problem.id} className="transition-colors">
                          <td className="px-4 py-3">
                            <span className="font-medium text-gray-900 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer transition-colors">
                              {problem.title}
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            <span
                              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                problem.difficulty === "EASY"
                                  ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/20 dark:text-emerald-400"
                                  : problem.difficulty === "MEDIUM"
                                  ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400"
                                  : "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400"
                              }`}
                            >
                              {problem.difficulty}
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400 border border-green-200 dark:border-green-800">
                              ✓ Solved
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            <span className="font-medium text-gray-900 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer transition-colors">
                              {new Date(
                                problem.updatedAt || problem.createdAt
                              ).toLocaleDateString()}
                            </span>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan={3}
                          className="text-center py-12 text-gray-500"
                        >
                          <BookOpenCheck className="w-12 h-12 mx-auto mb-4 opacity-50" />
                          <p className="text-lg font-medium">
                            No problems solved yet
                          </p>
                          <p className="text-sm">
                            Start solving problems to see them here!
                          </p>
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
    </div>
  );
};

export default Profile;
