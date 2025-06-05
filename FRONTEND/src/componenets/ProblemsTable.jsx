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
} from "lucide-react";
const ProblemsTable = ({ problems }) => {
  const { authUser } = useAuthStore();

  const [search, setSearch] = useState("");
  const [difficulty, setDifficulty] = useState("ALL");
  const [selectedTag, setSelectedTag] = useState("ALL");
  const [currentPage, setCurrentPage] = useState(1);

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

  const handleDelete = (id) => {};

  const handleAddToPlaylist = (id) => {};

  return (
    <div className="w-full max-w-7xl mx-auto mt-6 p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-white">All Problems</h2>
        <button className="flex items-center gap-2 px-4 py-2 bg-[#F4FF54] text-black rounded-lg hover:bg-[#F4FF54]/80 transition cursor-pointer">
          <Plus className="w-4 h-4" />
          Create Playlist
        </button>
      </div>

      {/* Filters */}
      <div className="grid md:grid-cols-4 sm:grid-cols-2 gap-4 mb-6">
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
                      <input
                        type="checkbox"
                        checked={isSolved}
                        readOnly
                        className="checkbox checkbox-sm"
                      />
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
                              onClick={() => handleDelete(problem.id)}
                              className="p-1 rounded bg-red-500 hover:bg-red-600 cursor-pointer"
                            >
                              <TrashIcon className="w-6 h-6 text-white" />
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
      </div>
    </div>
  );
};

export default ProblemsTable;
