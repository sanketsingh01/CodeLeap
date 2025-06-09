import React, { useEffect, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { CheckCircle2, Circle, Loader2 } from "lucide-react";

import { usePlaylistStore } from "../store/usePlaylistStore.js";
import { useAuthStore } from "../store/useAuthStore.js";
import { useProblemStore } from "../store/useProblemStore.js";

const PlaylistDetailsPage = () => {
  const { authUser } = useAuthStore();
  const { id } = useParams();
  const { currentPlaylist, getPlaylistDetails } = usePlaylistStore();
  const { getAllProblems, problems, isProblemsLoading } = useProblemStore();

  useEffect(() => {
    getPlaylistDetails(id);
  }, [id]);

  useEffect(() => {
    getAllProblems();
  }, [getAllProblems]);

  // if (!currentPlaylist)
  //   return (
  //     <div className="text-white p-6 mt-17 flex items-center justify-center">
  //       <Loader2 className="animate-spin" /> Loading"
  //     </div>
  //   );

  // Derive the solved status based on authUser
  const solvedProblems = useMemo(() => {
    if (!authUser || !problems) return [];
    return problems.filter((problem) =>
      problem.solvedBy?.some((user) => user.userId === authUser.id)
    );
  }, [problems, authUser]);

  problems.forEach((problem) => {
    if (problem.solvedBy) console.log(problem.solvedBy);
    else console.log(null);
  });

  const problemsWithSolved = useMemo(() => {
    if (!currentPlaylist?.problems) return [];
    return currentPlaylist.problems.map((p) => ({
      ...p,
      solved: solvedProblems.some((sp) => sp.id === p.problem.id),
    }));
  }, [currentPlaylist, solvedProblems]);

  const solved = problemsWithSolved.filter((p) => p.solved).length;
  const total = problemsWithSolved.length;
  const solvedPercent = total ? Math.floor((solved / total) * 100) : 0;

  return !currentPlaylist ? (
    <div className="text-white p-6 mt-17 flex items-center justify-center">
      <Loader2 className="animate-spin" /> Loading
    </div>
  ) : (
    <div className="min-h-screen py-20 px-4 text-white mt-10">
      <div className="max-w-6xl mx-auto space-y-5">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
          <div>
            <h1 className="text-4xl font-bold">{currentPlaylist.name}</h1>
            <p className="text-gray-400 mt-2">
              {total} Problems • Last updated recently
            </p>
          </div>
          <div className="flex flex-col items-center">
            <div className="relative w-20 h-20">
              <svg
                className="absolute inset-0 w-full h-full"
                viewBox="0 0 36 36"
              >
                <path
                  className="text-zinc-700"
                  d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <path
                  className="text-yellow-500"
                  d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeDasharray={`${solvedPercent}, 100`}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center text-sm font-bold">
                {solvedPercent}%
              </div>
            </div>
            <p className="text-sm text-gray-400 mt-1">
              {solved}/{total} Solved
            </p>
          </div>
        </div>

        {/* Description */}
        {currentPlaylist.description && (
          <p className="text-gray-300 text-base leading-relaxed max-w-3xl">
            {currentPlaylist.description}
          </p>
        )}

        {/* Difficulty Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {["EASY", "MEDIUM", "HARD"].map((level) => {
            const problemsByLevel = problemsWithSolved.filter(
              (p) => p.problem?.difficulty === level
            );
            const solvedByLevel = problemsByLevel.filter((p) => p.solved);

            return (
              <div
                key={level}
                className={`p-4 rounded-xl shadow bg-zinc-900 border-l-4 ${
                  level === "EASY"
                    ? "border-cyan-400"
                    : level === "MEDIUM"
                    ? "border-yellow-400"
                    : "border-red-500"
                }`}
              >
                <h3
                  className={`text-lg font-semibold mb-2 ${
                    level === "EASY"
                      ? "text-cyan-300"
                      : level === "MEDIUM"
                      ? "text-yellow-400"
                      : "text-red-500"
                  }`}
                >
                  {level.charAt(0) + level.slice(1).toLowerCase()}
                </h3>
                <p className="text-sm text-gray-300">
                  Solved:{" "}
                  <span className="font-medium text-white">
                    {solvedByLevel.length}/{problemsByLevel.length}
                  </span>
                </p>
              </div>
            );
          })}
        </div>

        {/* Tags */}
        {currentPlaylist.tags?.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {currentPlaylist.tags.map((tag, i) => (
              <span
                key={i}
                className="bg-yellow-500/10 text-yellow-400 text-xs font-medium px-3 py-1 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Problems List */}
        <div className="flex flex-col gap-3">
          {problemsWithSolved.map((problem, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between bg-zinc-900 hover:bg-zinc-800 px-5 py-4 rounded-xl shadow transition-all group"
            >
              <div className="flex items-center gap-3">
                {problem.solved ? (
                  <CheckCircle2 className="text-green-500 w-5 h-5" />
                ) : (
                  <Circle className="text-zinc-500 w-5 h-5" />
                )}
                <span className="text-base group-hover:underline">
                  {idx + 1}.{" "}
                  <Link
                    to={`/problem/${problem.problem.id}`}
                    className="hover:underline font-medium text-sm cursor-pointer"
                  >
                    {problem.problem.title}
                  </Link>
                </span>
              </div>

              <span
                className={`text-sm font-medium ${
                  problem.problem.difficulty === "EASY"
                    ? "text-cyan-400"
                    : problem.problem.difficulty === "MEDIUM"
                    ? "text-yellow-400"
                    : "text-red-500"
                }`}
              >
                {problem.problem.difficulty}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PlaylistDetailsPage;
