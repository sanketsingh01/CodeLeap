import React, { useState, useMemo } from "react";
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

  const difficulties = ["EASY", "MEDIUM", "HARD"];
  const alltags = useMemo(() => {
    if (!Array.isArray(problems)) return [];

    const tagsSet = new Set();
    problems.forEach((problem) => {
      problem.tags?.forEach((tag) => tagsSet.add(tag));
    });
    return Array.from(tagsSet);
  }, [problems]);

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

  const itemsPerPage = 10;
  const totalPages = Math.ceil(filteredProblems.length / itemsPerPage);
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
      <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-4 mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-500" />
          <input
            type="text"
            placeholder="Search problems"
            className="pl-10 pr-4 py-2 w-full bg-zinc-800 text-white border border-zinc-700 rounded-lg focus:outline-none"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <select
          className="bg-zinc-800 text-white border border-zinc-700 rounded-lg px-4 py-2"
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
          className="bg-zinc-800 text-white border border-zinc-700 rounded-lg px-4 py-2"
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
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="p-4 bg-green-900 text-green-300 rounded-lg">
          <h4 className="text-lg font-bold">Easy Solved</h4>
          <p className="text-2xl">{solvedStats.EASY}</p>
        </div>
        <div className="p-4 bg-yellow-900 text-yellow-300 rounded-lg">
          <h4 className="text-lg font-bold">Medium Solved</h4>
          <p className="text-2xl">{solvedStats.MEDIUM}</p>
        </div>
        <div className="p-4 bg-red-900 text-red-300 rounded-lg">
          <h4 className="text-lg font-bold">Hard Solved</h4>
          <p className="text-2xl">{solvedStats.HARD}</p>
        </div>
        <div className="p-4 bg-zinc-800 text-white rounded-lg">
          <h4 className="text-lg font-bold">Total Solved</h4>
          <p className="text-2xl">
            {solvedStats.EASY + solvedStats.MEDIUM + solvedStats.HARD}
          </p>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg border border-zinc-700">
        <table className="min-w-full text-sm text-left text-white">
          <thead className="bg-zinc-900 text-gray-400">
            <tr>
              <th className="px-4 py-3">Solved</th>
              <th className="px-4 py-3">Title</th>
              <th className="px-4 py-3">Tags</th>
              <th className="px-4 py-3">Difficulty</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800">
            {paginatedProblems.length ? (
              paginatedProblems.map((problem) => {
                const isSolved = problem.solvedBy?.some(
                  (user) => user.userId === authUser?.id
                );
                return (
                  <tr key={problem.id} className="hover:bg-zinc-800 transition">
                    <td className="px-4 py-3">
                      {isSolved ? (
                        <CheckCircle2 className="text-green-500 w-5 h-5" />
                      ) : (
                        <Circle className="text-zinc-500 w-5 h-5" />
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <Link
                        to={`/problem/${problem.id}`}
                        className="hover:underline font-medium text-sm cursor-pointer"
                      >
                        {problem.title}
                      </Link>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex flex-wrap gap-1">
                        {problem.tags?.map((tag, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-0.5 bg-yellow-500/10 text-yellow-400 text-sm rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-4 py-4">
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
                    <td className="px-4 py-3">
                      <div className="flex flex-wrap gap-2">
                        {authUser?.role === "ADMIN" && (
                          <>
                            <button
                              onClick={() => openConfirmModal(problem.id)}
                              className="p-1 rounded bg-red-500 hover:bg-red-600 cursor-pointer"
                            >
                              {isDeletingProblem ? (
                                <Loader className="animate-spin h-4 w-4" />
                              ) : (
                                <TrashIcon className="w-6 h-6 text-white" />
                              )}
                            </button>
                            <button
                              disabled
                              className="p-1 rounded bg-yellow-500 hover:bg-yellow-600 cursor-pointer"
                            >
                              <PencilIcon className="w-6 h-6 text-white" />
                            </button>
                          </>
                        )}
                        <button
                          onClick={() => handleAddToPlaylist(problem.id)}
                          className="px-2 py-1 flex items-center gap-1 border border-zinc-600 rounded hover:bg-zinc-700 cursor-pointer"
                        >
                          <Bookmark className="w-6 h-6" />
                          <span className="hidden sm:inline text-sm">Save</span>
                        </button>
                      </div>
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

      {/* Pagination */}
      <div className="flex justify-center mt-6 gap-2">
        <button
          className="btn btn-sm btn-outline"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => prev - 1)}
        >
          Prev
        </button>
        <span className="btn btn-ghost btn-sm">
          {currentPage} / {totalPages}
        </span>
        <button
          className="btn btn-sm btn-outline"
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((prev) => prev + 1)}
        >
          Next
        </button>

        {showConfirmModal && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-zinc-900 rounded-lg p-6 w-[90%] max-w-md border border-zinc-700 text-white">
              <h3 className="text-xl font-semibold mb-4">Delete Problem?</h3>
              <p className="text-zinc-400 mb-6">
                Are you sure you want to delete this problem? This action cannot
                be undone.
              </p>
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setShowConfirmModal(false)}
                  className="px-4 py-2 bg-zinc-700 hover:bg-zinc-600 rounded"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded"
                >
                  Yes, Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

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
