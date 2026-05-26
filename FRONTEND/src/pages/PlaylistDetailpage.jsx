import React, { useEffect, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import {
  CheckCircle2,
  Circle,
  Loader2,
  ArrowLeft,
  Sparkles,
} from "lucide-react";

import { usePlaylistStore } from "../store/usePlaylistStore.js";
import { useAuthStore } from "../store/useAuthStore.js";
import { useProblemStore } from "../store/useProblemStore.js";

const difficultyText = {
  EASY: "text-emerald-600",
  MEDIUM: "text-amber-600",
  HARD: "text-red-600",
};

const difficultyAccent = {
  EASY: "border-emerald-300 bg-emerald-50 text-emerald-700",
  MEDIUM: "border-amber-300 bg-amber-50 text-amber-700",
  HARD: "border-red-300 bg-red-50 text-red-700",
};

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

  const solvedProblems = useMemo(() => {
    if (!authUser || !problems) return [];
    return problems.filter((problem) =>
      problem.solvedBy?.some((user) => user.userId === authUser.id)
    );
  }, [problems, authUser]);

  const problemsWithSolved = useMemo(() => {
    if (!currentPlaylist?.problems) return [];
    return currentPlaylist.problems.map((p) => ({
      ...p,
      solved: solvedProblems.some((sp) => sp.id === p.problem.id),
    }));
  }, [currentPlaylist, solvedProblems]);

  const isLoading = !currentPlaylist || isProblemsLoading;

  const solved = problemsWithSolved.filter((p) => p.solved).length;
  const total = problemsWithSolved.length;
  const solvedPercent = total ? Math.floor((solved / total) * 100) : 0;

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--surface)]">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="w-10 h-10 text-[var(--sky-500)] animate-spin" />
          <p className="text-[var(--ink-500)] font-medium">
            Loading playlist...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-28 pb-16 px-6 sm:px-10 md:px-16 lg:px-24">
      <div className="max-w-6xl mx-auto space-y-8">
        <Link
          to="/playlists"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--ink-700)] hover:text-[var(--sky-600)] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          All sheets
        </Link>

        {/* Header card */}
        <div className="bg-white rounded-3xl border border-[var(--ink-200)] shadow-[var(--shadow-soft)] p-6 md:p-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-semibold text-[var(--sky-600)] bg-[var(--sky-50)] px-2.5 py-1 rounded-full">
                <Sparkles className="w-3 h-3" /> Sheet
              </span>
              <h1 className="font-jakarta text-3xl md:text-4xl font-extrabold text-[var(--ink-900)] mt-3 capitalize">
                {currentPlaylist.name}
              </h1>
              <p className="text-[var(--ink-500)] text-sm md:text-base mt-2">
                {total} problems · {solved} solved
              </p>
              {currentPlaylist.description && (
                <p className="text-[var(--ink-700)] text-sm md:text-base mt-4 max-w-2xl leading-relaxed">
                  {currentPlaylist.description}
                </p>
              )}
            </div>

            <div className="flex flex-col items-center">
              <div className="relative w-24 h-24">
                <svg
                  className="absolute inset-0 w-full h-full -rotate-90"
                  viewBox="0 0 36 36"
                >
                  <path
                    className="text-[var(--ink-100)]"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                  />
                  <path
                    className="text-[var(--sky-500)]"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeDasharray={`${solvedPercent}, 100`}
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="font-jakarta font-extrabold text-xl text-[var(--ink-900)]">
                    {solvedPercent}%
                  </span>
                </div>
              </div>
              <p className="text-xs text-[var(--ink-500)] mt-2">
                Completion
              </p>
            </div>
          </div>
        </div>

        {/* Difficulty stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {["EASY", "MEDIUM", "HARD"].map((level) => {
            const problemsByLevel = problemsWithSolved.filter(
              (p) => p.problem?.difficulty === level
            );
            const solvedByLevel = problemsByLevel.filter((p) => p.solved);
            return (
              <div
                key={level}
                className={`rounded-2xl p-5 bg-white border-l-4 shadow-[var(--shadow-soft)] ${
                  level === "EASY"
                    ? "border-emerald-400"
                    : level === "MEDIUM"
                    ? "border-amber-400"
                    : "border-red-400"
                }`}
              >
                <h3
                  className={`font-jakarta font-semibold mb-2 ${difficultyText[level]}`}
                >
                  {level.charAt(0) + level.slice(1).toLowerCase()}
                </h3>
                <p className="text-sm text-[var(--ink-500)]">
                  Solved:{" "}
                  <span className="font-jakarta font-semibold text-[var(--ink-900)]">
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
                className="bg-[var(--sky-50)] text-[var(--sky-700)] text-xs font-medium px-3 py-1.5 rounded-full border border-[var(--sky-200)]"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Problems list */}
        <div className="bg-white rounded-2xl border border-[var(--ink-200)] shadow-[var(--shadow-soft)] overflow-hidden">
          <div className="px-5 py-3 border-b border-[var(--ink-200)] bg-[var(--surface-container-low)]">
            <h3 className="font-jakarta font-semibold text-[var(--ink-900)]">
              Problems
            </h3>
          </div>
          <ul>
            {problemsWithSolved.map((problem, idx) => (
              <li
                key={idx}
                className="flex items-center justify-between px-5 py-3.5 border-t border-[var(--ink-100)] first:border-t-0 hover:bg-[var(--surface-container-low)]/60 transition-colors"
              >
                <div className="flex items-center gap-3 min-w-0">
                  {problem.solved ? (
                    <CheckCircle2 className="text-emerald-500 w-5 h-5 flex-shrink-0" />
                  ) : (
                    <Circle className="text-[var(--ink-300)] w-5 h-5 flex-shrink-0" />
                  )}
                  <span className="text-sm text-[var(--ink-500)] font-mono-code">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  <Link
                    to={`/problem/${problem.problem.id}`}
                    className="font-jakarta font-medium text-sm md:text-base text-[var(--ink-900)] hover:text-[var(--sky-600)] transition-colors truncate"
                  >
                    {problem.problem.title}
                  </Link>
                </div>
                <span
                  className={`text-[11px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full border flex-shrink-0 ${
                    difficultyAccent[problem.problem.difficulty] ||
                    "border-[var(--ink-200)] text-[var(--ink-500)] bg-[var(--surface-container-low)]"
                  }`}
                >
                  {problem.problem.difficulty}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PlaylistDetailsPage;
