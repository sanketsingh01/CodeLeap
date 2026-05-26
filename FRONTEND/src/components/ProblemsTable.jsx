import React, { useState, useMemo, useEffect } from "react";
import { useAuthStore } from "../store/useAuthStore.js";
import { Link } from "react-router-dom";
import {
  Bookmark,
  PencilIcon,
  TrashIcon,
  Plus,
  Search,
  Loader2,
  Circle,
  CheckCircle2,
  Trophy,
  TrendingUp,
  Award,
  Target,
  ChevronLeft,
  ChevronRight,
  Filter,
  X,
} from "lucide-react";

import { useAction } from "../store/useAction.js";
import { usePlaylistStore } from "../store/usePlaylistStore.js";
import CreatePlaylistModal from "./CreatePlaylistModal.jsx";
import AddtoPlaylist from "./AddtoPlaylist.jsx";

const difficultyBadge = {
  EASY: "bg-emerald-50 text-emerald-700 border-emerald-200",
  MEDIUM: "bg-amber-50 text-amber-700 border-amber-200",
  HARD: "bg-red-50 text-red-700 border-red-200",
};

const ProblemsTable = ({ problems }) => {
  const { authUser } = useAuthStore();

  const [search, setSearch] = useState("");
  const [difficulty, setDifficulty] = useState("ALL");
  const [selectedTag, setSelectedTag] = useState("ALL");
  const [currentPage, setCurrentPage] = useState(1);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [problemToDelete, setProblemToDelete] = useState(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isAddToPlaylistModalOpen, setIsAddToPlaylistModalOpen] =
    useState(false);
  const [selectedProblemId, setSelectedProblemId] = useState(null);

  const { createPlaylist } = usePlaylistStore();
  const { isDeletingProblem, onDeleteProblem } = useAction();

  const difficulties = ["EASY", "MEDIUM", "HARD"];
  const alltags = useMemo(() => {
    if (!Array.isArray(problems)) return [];
    const tagsSet = new Set();
    problems.forEach((p) => p.tags?.forEach((tag) => tagsSet.add(tag)));
    return Array.from(tagsSet);
  }, [problems]);

  const filteredProblems = useMemo(() => {
    return (problems || [])
      .filter((p) => p.title.toLowerCase().includes(search.toLowerCase()))
      .filter((p) => (difficulty === "ALL" ? true : p.difficulty === difficulty))
      .filter((p) => (selectedTag === "ALL" ? true : p.tags?.includes(selectedTag)));
  }, [problems, search, difficulty, selectedTag]);

  useEffect(() => {
    setCurrentPage(1);
  }, [search, difficulty, selectedTag]);

  const itemsPerPage = 10;
  const totalPages = Math.ceil(filteredProblems.length / itemsPerPage);
  const paginatedProblems = useMemo(() => {
    return filteredProblems.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    );
  }, [filteredProblems, currentPage]);

  const solvedProblems = useMemo(() => {
    return (problems || []).filter((p) =>
      p.solvedBy?.some((user) => user.userId === authUser?.id)
    );
  }, [problems, authUser]);

  const solvedStats = useMemo(() => {
    const stats = { EASY: 0, MEDIUM: 0, HARD: 0 };
    solvedProblems.forEach((p) => (stats[p.difficulty] += 1));
    return stats;
  }, [solvedProblems]);

  const totalSolved = solvedStats.EASY + solvedStats.MEDIUM + solvedStats.HARD;
  const totalProblems = problems?.length || 0;
  const solvePercentage = totalProblems
    ? Math.round((totalSolved / totalProblems) * 100)
    : 0;

  const openConfirmModal = (id) => {
    setProblemToDelete(id);
    setShowConfirmModal(true);
  };

  const confirmDelete = () => {
    if (problemToDelete) {
      onDeleteProblem(problemToDelete);
      setShowConfirmModal(false);
      setProblemToDelete(null);
    }
  };

  const handleAddToPlaylist = (problemId) => {
    setSelectedProblemId(problemId);
    setIsAddToPlaylistModalOpen(true);
  };

  const handleCreatePlaylist = async (data) => {
    await createPlaylist(data);
  };

  const clearFilters = () => {
    setSearch("");
    setDifficulty("ALL");
    setSelectedTag("ALL");
  };

  const hasActiveFilters =
    search || difficulty !== "ALL" || selectedTag !== "ALL";

  const stats = [
    {
      label: "Easy",
      value: solvedStats.EASY,
      icon: CheckCircle2,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
      border: "border-emerald-200",
    },
    {
      label: "Medium",
      value: solvedStats.MEDIUM,
      icon: Award,
      color: "text-amber-600",
      bg: "bg-amber-50",
      border: "border-amber-200",
    },
    {
      label: "Hard",
      value: solvedStats.HARD,
      icon: Target,
      color: "text-red-600",
      bg: "bg-red-50",
      border: "border-red-200",
    },
    {
      label: "Total Solved",
      value: totalSolved,
      icon: Trophy,
      color: "text-[var(--sky-600)]",
      bg: "bg-[var(--sky-50)]",
      border: "border-[var(--sky-200)]",
      meta: `${solvePercentage}% of ${totalProblems}`,
    },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto">
      {/* Stats grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((s) => {
          const Icon = s.icon;
          return (
            <div
              key={s.label}
              className={`relative bg-white border ${s.border} rounded-2xl p-5 shadow-[var(--shadow-soft)] hover:shadow-md transition-shadow`}
            >
              <div className="flex items-center justify-between mb-3">
                <span
                  className={`w-10 h-10 rounded-xl ${s.bg} ${s.color} inline-flex items-center justify-center`}
                >
                  <Icon className="w-5 h-5" />
                </span>
                {s.meta ? (
                  <span className="text-xs font-semibold text-[var(--ink-500)] bg-[var(--surface-container-low)] px-2 py-1 rounded-full">
                    {s.meta}
                  </span>
                ) : (
                  <TrendingUp className="w-4 h-4 text-[var(--ink-400)]" />
                )}
              </div>
              <p className="text-xs font-semibold uppercase tracking-wider text-[var(--ink-500)] mb-1">
                {s.label}
              </p>
              <p className="font-jakarta text-2xl font-extrabold text-[var(--ink-900)]">
                {s.value}
              </p>
            </div>
          );
        })}
      </div>

      {/* Toolbar */}
      <div className="bg-white border border-[var(--ink-200)] rounded-2xl p-4 mb-5 shadow-[var(--shadow-soft)]">
        <div className="flex flex-col lg:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--ink-400)]" />
            <input
              type="text"
              placeholder="Search problems..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-3 py-2.5 bg-white border border-[var(--ink-200)] rounded-xl text-sm text-[var(--ink-900)] outline-none transition-all focus:border-[var(--sky-500)] focus:shadow-[0_0_0_3px_rgba(22,76,255,0.14)] placeholder-[var(--ink-400)]"
            />
          </div>
          <select
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
            className="px-3 py-2.5 bg-[var(--surface-container-low)] border border-[var(--ink-200)] rounded-xl text-sm text-[var(--ink-900)] outline-none focus:border-[var(--sky-400)]"
          >
            <option value="ALL">All Difficulties</option>
            {difficulties.map((d) => (
              <option key={d} value={d}>
                {d[0] + d.slice(1).toLowerCase()}
              </option>
            ))}
          </select>
          <select
            value={selectedTag}
            onChange={(e) => setSelectedTag(e.target.value)}
            className="px-3 py-2.5 bg-[var(--surface-container-low)] border border-[var(--ink-200)] rounded-xl text-sm text-[var(--ink-900)] outline-none focus:border-[var(--sky-400)]"
          >
            <option value="ALL">All Tags</option>
            {alltags.map((tag) => (
              <option key={tag} value={tag}>
                {tag}
              </option>
            ))}
          </select>
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 bg-red-50 text-red-600 border border-red-200 rounded-xl text-sm font-semibold hover:bg-red-100 transition-colors"
            >
              <X className="w-4 h-4" />
              Clear
            </button>
          )}
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="btn-sky inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-semibold whitespace-nowrap"
          >
            <Plus className="w-4 h-4" />
            New Sheet
          </button>
        </div>
        <div className="mt-3 flex items-center gap-2 text-xs text-[var(--ink-500)]">
          <Filter className="w-3.5 h-3.5" />
          Showing{" "}
          <span className="font-semibold text-[var(--ink-900)]">
            {filteredProblems.length}
          </span>{" "}
          of {totalProblems} problems
        </div>
      </div>

      {/* Table */}
      <div className="bg-white border border-[var(--ink-200)] rounded-2xl shadow-[var(--shadow-soft)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="bg-[var(--surface-container-low)] text-[var(--ink-500)] text-xs uppercase tracking-wider">
                <th className="px-5 py-3.5 text-left font-semibold">Status</th>
                <th className="px-5 py-3.5 text-left font-semibold">Problem</th>
                <th className="px-5 py-3.5 text-left font-semibold">Tags</th>
                <th className="px-5 py-3.5 text-left font-semibold">
                  Difficulty
                </th>
                <th className="px-5 py-3.5 text-right font-semibold">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {paginatedProblems.length ? (
                paginatedProblems.map((problem) => {
                  const isSolved = problem.solvedBy?.some(
                    (user) => user.userId === authUser?.id
                  );
                  return (
                    <tr
                      key={problem.id}
                      className="border-t border-[var(--ink-100)] hover:bg-[var(--surface-container-low)]/50 transition-colors group"
                    >
                      <td className="px-5 py-4">
                        {isSolved ? (
                          <CheckCircle2 className="text-emerald-500 w-5 h-5" />
                        ) : (
                          <Circle className="text-[var(--ink-300)] w-5 h-5" />
                        )}
                      </td>
                      <td className="px-5 py-4">
                        <Link
                          to={`/problem/${problem.id}`}
                          className="font-jakarta font-semibold text-sm text-[var(--ink-900)] group-hover:text-[var(--sky-600)] transition-colors"
                        >
                          {problem.title}
                        </Link>
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex flex-wrap gap-1.5">
                          {problem.tags?.slice(0, 3).map((tag, idx) => (
                            <span
                              key={idx}
                              className="px-2.5 py-1 bg-[var(--sky-50)] text-[var(--sky-700)] text-[11px] rounded-full border border-[var(--sky-200)] font-medium"
                            >
                              {tag}
                            </span>
                          ))}
                          {problem.tags?.length > 3 && (
                            <span className="px-2 py-1 bg-[var(--surface-container-low)] text-[var(--ink-500)] text-[11px] rounded-full border border-[var(--ink-200)]">
                              +{problem.tags.length - 3}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        <span
                          className={`px-2.5 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wider border ${
                            difficultyBadge[problem.difficulty] ||
                            "bg-[var(--surface-container-low)] text-[var(--ink-500)] border-[var(--ink-200)]"
                          }`}
                        >
                          {problem.difficulty}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-1.5 justify-end">
                          {authUser?.role === "ADMIN" && (
                            <>
                              <button
                                onClick={() => openConfirmModal(problem.id)}
                                className="p-2 rounded-lg bg-red-50 hover:bg-red-100 border border-red-200 transition-colors"
                                title="Delete"
                              >
                                {isDeletingProblem ? (
                                  <Loader2 className="animate-spin h-3.5 w-3.5 text-red-600" />
                                ) : (
                                  <TrashIcon className="w-3.5 h-3.5 text-red-600" />
                                )}
                              </button>
                              <button
                                disabled
                                className="p-2 rounded-lg bg-amber-50 border border-amber-200 opacity-50 cursor-not-allowed"
                                title="Edit"
                              >
                                <PencilIcon className="w-3.5 h-3.5 text-amber-600" />
                              </button>
                            </>
                          )}
                          <button
                            onClick={() => handleAddToPlaylist(problem.id)}
                            className="inline-flex items-center gap-1.5 px-3 py-2 bg-[var(--surface-container-low)] hover:bg-[var(--sky-50)] hover:text-[var(--sky-600)] border border-[var(--ink-200)] hover:border-[var(--sky-300)] text-[var(--ink-700)] rounded-lg text-xs font-semibold transition-colors"
                            title="Save"
                          >
                            <Bookmark className="w-3.5 h-3.5" />
                            <span className="hidden sm:inline">Save</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={5} className="text-center py-12">
                    <div className="flex flex-col items-center gap-3">
                      <div className="w-14 h-14 bg-[var(--sky-50)] rounded-2xl flex items-center justify-center">
                        <Search className="w-7 h-7 text-[var(--sky-500)]" />
                      </div>
                      <div>
                        <p className="font-jakarta text-base font-semibold text-[var(--ink-900)]">
                          No problems found
                        </p>
                        <p className="text-[var(--ink-500)] text-sm mt-1">
                          Try adjusting your search or filters.
                        </p>
                      </div>
                      {hasActiveFilters && (
                        <button
                          onClick={clearFilters}
                          className="btn-ghost-sky inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold"
                        >
                          Clear filters
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center mt-6 gap-2">
          <button
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-medium border border-[var(--ink-200)] bg-white text-[var(--ink-700)] hover:border-[var(--sky-300)] hover:text-[var(--sky-600)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => prev - 1)}
          >
            <ChevronLeft className="w-4 h-4" /> Prev
          </button>
          <span className="px-3 py-1.5 text-sm font-medium text-[var(--ink-700)]">
            Page <span className="font-semibold">{currentPage}</span> /{" "}
            {totalPages}
          </span>
          <button
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-medium border border-[var(--ink-200)] bg-white text-[var(--ink-700)] hover:border-[var(--sky-300)] hover:text-[var(--sky-600)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((prev) => prev + 1)}
          >
            Next <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Delete confirm modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-7 w-[90%] max-w-md border border-[var(--ink-200)] shadow-2xl">
            <div className="flex items-center gap-4 mb-5">
              <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center">
                <TrashIcon className="w-6 h-6 text-red-500" />
              </div>
              <div>
                <h3 className="font-jakarta text-lg font-bold text-[var(--ink-900)]">
                  Delete problem
                </h3>
                <p className="text-[var(--ink-500)] text-xs">
                  This action cannot be undone.
                </p>
              </div>
            </div>
            <p className="text-[var(--ink-700)] mb-7 text-sm">
              Are you sure you want to permanently delete this problem? All
              associated data will be lost.
            </p>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowConfirmModal(false)}
                className="btn-ghost-sky px-4 py-2 rounded-full text-sm font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-full text-sm font-semibold transition-colors"
              >
                Delete forever
              </button>
            </div>
          </div>
        </div>
      )}

      <CreatePlaylistModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreatePlaylist}
      />

      <AddtoPlaylist
        isOpen={isAddToPlaylistModalOpen}
        onClose={() => setIsAddToPlaylistModalOpen(false)}
        problemId={selectedProblemId}
      />
    </div>
  );
};

export default ProblemsTable;
