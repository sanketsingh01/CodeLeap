import React, { useState, useMemo, useEffect } from "react";
import { useAuthStore } from "../store/useAuthStore.js";
import { Link } from "react-router-dom";
import {
  Bookmark,
  PencilIcon,
  Trash,
  TrashIcon,
  Plus,
  Search,
  Loader,
  Circle,
  CheckCircle2,
  Trophy,
  TrendingUp,
  Award,
  Target,
} from "lucide-react";

import { useAction } from "../store/useAction.js";
import { usePlaylistStore } from "../store/usePlaylistStore.js";
import CreatePlaylistModal from "./CreatePlaylistModal.jsx";
import AddtoPlaylist from "./AddtoPlaylist.jsx";

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
  const [showFilters, setShowFilters] = useState(false);

  const difficulties = ["EASY", "MEDIUM", "HARD"];
  const alltags = useMemo(() => {
    if (!Array.isArray(problems)) return [];

    const tagsSet = new Set();
    problems.forEach((problem) => {
      problem.tags?.forEach((tag) => tagsSet.add(tag));
    });
    return Array.from(tagsSet);
  }, [problems]);

  // Filter problems (this already works on ALL problems, not just current page)
  const filteredProblems = useMemo(() => {
    return (problems || [])
      .filter((problem) =>
        problem.title.toLowerCase().includes(search.toLowerCase())
      )
      .filter((problem) =>
        difficulty === "ALL" ? true : problem.difficulty === difficulty
      )
      .filter((problem) =>
        selectedTag === "ALL" ? true : problem.tags?.includes(selectedTag)
      );
  }, [problems, search, difficulty, selectedTag]);

  // Reset to page 1 whenever filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [search, difficulty, selectedTag]);

  const itemsPerPage = 10;
  const totalPages = Math.ceil(filteredProblems.length / itemsPerPage);

  // Apply pagination to filtered results
  const paginatedProblems = useMemo(() => {
    return filteredProblems.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    );
  }, [filteredProblems, currentPage]);

  const solvedProblems = useMemo(() => {
    return (problems || []).filter((problem) =>
      problem.solvedBy?.some((user) => user.userId === authUser?.id)
    );
  }, [problems, authUser]);

  console.log("solvedProblems: ", solvedProblems);

  const solvedStats = useMemo(() => {
    const stats = { EASY: 0, MEDIUM: 0, HARD: 0 };
    solvedProblems.forEach((problem) => {
      stats[problem.difficulty] += 1;
    });
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
    console.log("SelectedProblems: ", selectedProblemId);
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

  return (
    <div className="w-full max-w-7xl mx-auto mt-6 p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-white">All Problems</h2>
        <button
          className="flex items-center gap-2 px-4 py-2 bg-[#F4FF54] text-black rounded-lg hover:bg-[#F4FF54]/80 transition cursor-pointer"
          onClick={() => setIsCreateModalOpen(true)}
        >
          <Plus className="w-4 h-4" />
          Create Sheet
        </button>
      </div>

      {/* Filters */}
      <div
        className={`mb-6 transition-all duration-300 ${
          showFilters ? "block" : "hidden lg:block"
        }`}
      >
        <div className="bg-gradient-to-r from-zinc-900/80 to-zinc-800/80 backdrop-blur-sm rounded-2xl p-6 border border-zinc-700/50 shadow-xl">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-zinc-400" />
              <input
                type="text"
                placeholder="Search problems..."
                className="w-full pl-12 pr-4 py-3 bg-zinc-800/80 text-white border border-zinc-600/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#F4FF54]/50 focus:border-[#F4FF54]/50 transition-all placeholder-zinc-400"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <select
              className="px-4 py-3 bg-zinc-800/80 text-white border border-zinc-600/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#F4FF54]/50 focus:border-[#F4FF54]/50 transition-all"
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
            >
              <option value="ALL">All Difficulties</option>
              {difficulties.map((d) => (
                <option key={d} value={d}>
                  {d[0] + d.slice(1).toLowerCase()}
                </option>
              ))}
            </select>

            <select
              className="px-4 py-3 bg-zinc-800/80 text-white border border-zinc-600/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#F4FF54]/50 focus:border-[#F4FF54]/50 transition-all"
              value={selectedTag}
              onChange={(e) => setSelectedTag(e.target.value)}
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
                className="px-4 py-3 bg-red-600/20 text-red-400 border border-red-500/30 rounded-xl hover:bg-red-600/30 transition-all duration-300"
              >
                Clear
              </button>
            )}
          </div>

          {/* Results summary */}
          <div className="mt-4 flex flex-wrap items-center gap-4 text-sm">
            <span className="text-zinc-300">
              Showing{" "}
              <span className="font-semibold text-[#F4FF54]">
                {filteredProblems.length}
              </span>{" "}
              problem{filteredProblems.length !== 1 ? "s" : ""}
              {hasActiveFilters && (
                <span className="text-zinc-400">
                  {" "}
                  (filtered from {problems?.length || 0} total)
                </span>
              )}
            </span>
            {hasActiveFilters && (
              <div className="flex flex-wrap gap-2">
                {search && (
                  <span className="px-2 py-1 bg-blue-500/20 text-blue-300 rounded-lg text-xs">
                    Search: "{search}"
                  </span>
                )}
                {difficulty !== "ALL" && (
                  <span className="px-2 py-1 bg-purple-500/20 text-purple-300 rounded-lg text-xs">
                    {difficulty}
                  </span>
                )}
                {selectedTag !== "ALL" && (
                  <span className="px-2 py-1 bg-green-500/20 text-green-300 rounded-lg text-xs">
                    {selectedTag}
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-2xl blur opacity-75 group-hover:opacity-100 transition-opacity"></div>
          <div className="relative bg-gradient-to-br from-green-950/80 to-green-900/60 backdrop-blur-sm p-6 rounded-2xl border border-green-500/30 shadow-xl">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 bg-green-500/20 rounded-xl flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5 text-green-400" />
              </div>
              <TrendingUp className="w-5 h-5 text-green-400 opacity-60" />
            </div>
            <h4 className="text-green-300 font-semibold text-sm uppercase tracking-wide mb-1">
              Easy Solved
            </h4>
            <p className="text-3xl font-bold text-white">{solvedStats.EASY}</p>
          </div>
        </div>

        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/20 to-amber-500/20 rounded-2xl blur opacity-75 group-hover:opacity-100 transition-opacity"></div>
          <div className="relative bg-gradient-to-br from-yellow-950/80 to-yellow-900/60 backdrop-blur-sm p-6 rounded-2xl border border-yellow-500/30 shadow-xl">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 bg-yellow-500/20 rounded-xl flex items-center justify-center">
                <Award className="w-5 h-5 text-yellow-400" />
              </div>
              <TrendingUp className="w-5 h-5 text-yellow-400 opacity-60" />
            </div>
            <h4 className="text-yellow-300 font-semibold text-sm uppercase tracking-wide mb-1">
              Medium Solved
            </h4>
            <p className="text-3xl font-bold text-white">
              {solvedStats.MEDIUM}
            </p>
          </div>
        </div>

        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-rose-500/20 rounded-2xl blur opacity-75 group-hover:opacity-100 transition-opacity"></div>
          <div className="relative bg-gradient-to-br from-red-950/80 to-red-900/60 backdrop-blur-sm p-6 rounded-2xl border border-red-500/30 shadow-xl">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 bg-red-500/20 rounded-xl flex items-center justify-center">
                <Target className="w-5 h-5 text-red-400" />
              </div>
              <TrendingUp className="w-5 h-5 text-red-400 opacity-60" />
            </div>
            <h4 className="text-red-300 font-semibold text-sm uppercase tracking-wide mb-1">
              Hard Solved
            </h4>
            <p className="text-3xl font-bold text-white">{solvedStats.HARD}</p>
          </div>
        </div>

        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-[#F4FF54]/20 to-yellow-400/20 rounded-2xl blur opacity-75 group-hover:opacity-100 transition-opacity"></div>
          <div className="relative bg-gradient-to-br from-zinc-900/80 to-zinc-800/60 backdrop-blur-sm p-6 rounded-2xl border border-[#F4FF54]/30 shadow-xl">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 bg-[#F4FF54]/20 rounded-xl flex items-center justify-center">
                <Trophy className="w-5 h-5 text-[#F4FF54]" />
              </div>
              <span className="text-xs font-semibold bg-[#F4FF54]/20 text-[#F4FF54] px-2 py-1 rounded-full">
                {solvePercentage}%
              </span>
            </div>
            <h4 className="text-[#F4FF54] font-semibold text-sm uppercase tracking-wide mb-1">
              Total Solved
            </h4>
            <p className="text-3xl font-bold text-white">{totalSolved}</p>
            <p className="text-xs text-zinc-400 mt-1">
              of {totalProblems} problems
            </p>
          </div>
        </div>
      </div>

      {/* Results summary */}
      <div className="mb-4 text-gray-400 text-sm">
        Showing {filteredProblems.length} problem
        {filteredProblems.length !== 1 ? "s" : ""}
        {(search || difficulty !== "ALL" || selectedTag !== "ALL") &&
          ` (filtered from ${problems?.length || 0} total)`}
      </div>

      {/* Table */}
      <div className="bg-gradient-to-br from-zinc-900/80 to-zinc-800/80 backdrop-blur-sm rounded-2xl border border-zinc-700/50 shadow-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gradient-to-r from-zinc-800/80 to-zinc-700/80">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-zinc-300 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-zinc-300 uppercase tracking-wider">
                  Problem
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-zinc-300 uppercase tracking-wider">
                  Tags
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-zinc-300 uppercase tracking-wider">
                  Difficulty
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-zinc-300 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-700/50">
              {paginatedProblems.length ? (
                paginatedProblems.map((problem, index) => {
                  const isSolved = problem.solvedBy?.some(
                    (user) => user.userId === authUser?.id
                  );
                  return (
                    <tr
                      key={problem.id}
                      className="hover:bg-zinc-800/50 transition-all duration-200 group"
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          {isSolved ? (
                            <div className="relative">
                              <CheckCircle2 className="text-green-400 w-6 h-6" />
                              <div className="absolute inset-0 bg-green-400/20 rounded-full animate-pulse"></div>
                            </div>
                          ) : (
                            <Circle className="text-zinc-500 w-6 h-6" />
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <Link
                          to={`/problem/${problem.id}`}
                          className="group-hover:text-[#F4FF54] font-medium text-white transition-colors duration-200 hover:underline decoration-[#F4FF54]/50"
                        >
                          {problem.title}
                        </Link>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-wrap gap-2">
                          {problem.tags?.slice(0, 3).map((tag, idx) => (
                            <span
                              key={idx}
                              className="px-3 py-1 bg-gradient-to-r from-yellow-500/10 to-amber-500/10 text-yellow-400 text-xs rounded-full border border-yellow-500/20 font-medium"
                            >
                              {tag}
                            </span>
                          ))}
                          {problem.tags?.length > 3 && (
                            <span className="px-3 py-1 bg-zinc-700/50 text-zinc-400 text-xs rounded-full">
                              +{problem.tags.length - 3}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide ${
                            problem.difficulty === "EASY"
                              ? "bg-gradient-to-r from-green-500/20 to-emerald-500/20 text-green-300 border border-green-500/30"
                              : problem.difficulty === "MEDIUM"
                              ? "bg-gradient-to-r from-yellow-500/20 to-amber-500/20 text-yellow-300 border border-yellow-500/30"
                              : "bg-gradient-to-r from-red-500/20 to-rose-500/20 text-red-300 border border-red-500/30"
                          }`}
                        >
                          {problem.difficulty}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          {authUser?.role === "ADMIN" && (
                            <>
                              <button
                                onClick={() => openConfirmModal(problem.id)}
                                className="p-2 rounded-lg bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 transition-all duration-200 group/btn"
                                title="Delete problem"
                              >
                                {isDeletingProblem ? (
                                  <Loader className="animate-spin h-4 w-4 text-red-400" />
                                ) : (
                                  <TrashIcon className="w-4 h-4 text-red-400 group-hover/btn:text-red-300" />
                                )}
                              </button>
                              <button
                                disabled
                                className="p-2 rounded-lg bg-yellow-500/20 hover:bg-yellow-500/30 border border-yellow-500/30 transition-all duration-200 opacity-50 cursor-not-allowed group/btn"
                                title="Edit problem (coming soon)"
                              >
                                <PencilIcon className="w-4 h-4 text-yellow-400" />
                              </button>
                            </>
                          )}
                          <button
                            onClick={() => handleAddToPlaylist(problem.id)}
                            className="flex items-center gap-2 px-3 py-2 bg-zinc-700/50 hover:bg-zinc-600/50 border border-zinc-600/50 rounded-lg transition-all duration-200 group/btn"
                            title="Add to playlist"
                          >
                            <Bookmark className="w-4 h-4 text-zinc-300 group-hover/btn:text-[#F4FF54]" />
                            <span className="hidden sm:inline text-xs font-medium text-zinc-300 group-hover/btn:text-[#F4FF54]">
                              Save
                            </span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={5} className="text-center py-12">
                    <div className="flex flex-col items-center gap-4">
                      <div className="w-16 h-16 bg-zinc-800 rounded-full flex items-center justify-center">
                        <Search className="w-8 h-8 text-zinc-500" />
                      </div>
                      <div>
                        <p className="text-zinc-300 font-semibold text-lg">
                          No Problems Found
                        </p>
                        <p className="text-zinc-500 text-sm mt-1">
                          Try adjusting your search or filters
                        </p>
                      </div>
                      {hasActiveFilters && (
                        <button
                          onClick={clearFilters}
                          className="px-4 py-2 bg-[#F4FF54]/20 text-[#F4FF54] rounded-lg hover:bg-[#F4FF54]/30 transition-all duration-200"
                        >
                          Clear all filters
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
        <div className="flex justify-center mt-6 gap-2">
          <button
            className="px-4 py-2 rounded-lg border border-zinc-600 hover:bg-zinc-700 transition disabled:opacity-50"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => prev - 1)}
          >
            Prev
          </button>
          <span className="px-4 py-2 text-sm bg-zinc-800 rounded-lg">
            {currentPage} / {totalPages}
          </span>
          <button
            className="px-4 py-2 rounded-lg border border-zinc-600 hover:bg-zinc-700 transition disabled:opacity-50"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((prev) => prev + 1)}
          >
            Next
          </button>
        </div>
      )}

      {showConfirmModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 animate-in fade-in duration-200">
          <div className="bg-gradient-to-br from-zinc-900 to-zinc-800 rounded-2xl p-8 w-[90%] max-w-md border border-zinc-700/50 shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-red-500/20 rounded-xl flex items-center justify-center">
                <TrashIcon className="w-6 h-6 text-red-400" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Delete Problem</h3>
                <p className="text-zinc-400 text-sm">
                  This action cannot be undone
                </p>
              </div>
            </div>

            <p className="text-zinc-300 mb-8 leading-relaxed">
              Are you sure you want to permanently delete this problem? All
              associated data will be lost.
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowConfirmModal(false)}
                className="px-6 py-3 bg-zinc-700/50 hover:bg-zinc-600/50 text-white rounded-xl transition-all duration-200 border border-zinc-600/50"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white rounded-xl transition-all duration-200 shadow-lg"
              >
                Delete Forever
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
