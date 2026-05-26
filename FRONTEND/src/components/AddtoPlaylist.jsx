import React, { useEffect, useState } from "react";
import { X, Plus, Loader2, Bookmark } from "lucide-react";
import { usePlaylistStore } from "../store/usePlaylistStore.js";
import { useAuthStore } from "../store/useAuthStore.js";

const AddtoPlaylist = ({ isOpen, onClose, problemId }) => {
  const { playlists, getAllPlaylists, addProblemToPlaylist, isLoading } =
    usePlaylistStore();
  const { authUser, checkAuth } = useAuthStore();
  const [selectedPlaylist, setSelectedPlaylist] = useState("");
  const [tags, setTags] = useState("");

  useEffect(() => {
    if (isOpen) {
      getAllPlaylists();
    }
  }, [isOpen]);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedPlaylist) return;
    await addProblemToPlaylist(selectedPlaylist, [problemId]);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg border border-[var(--ink-200)]">
        <div className="flex justify-between items-center px-6 py-4 border-b border-[var(--ink-200)]">
          <div className="flex items-center gap-2.5">
            <span className="w-8 h-8 rounded-lg bg-[var(--sky-50)] text-[var(--sky-600)] flex items-center justify-center">
              <Bookmark className="w-4 h-4" />
            </span>
            <h3 className="font-jakarta text-lg font-bold text-[var(--ink-900)]">
              Add to sheet
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[var(--ink-500)] hover:bg-[var(--surface-container-low)] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div>
            <label className="block text-sm font-medium text-[var(--ink-700)] mb-1.5">
              Select sheet
            </label>
            <select
              className="w-full px-4 py-2.5 bg-[var(--surface-container-low)] text-[var(--ink-900)] border border-[var(--ink-200)] rounded-xl outline-none focus:border-[var(--sky-400)]"
              value={selectedPlaylist}
              onChange={(e) => setSelectedPlaylist(e.target.value)}
              disabled={isLoading}
            >
              <option value="">Choose a sheet</option>
              {playlists
                .filter(
                  (p) =>
                    authUser?.role === "ADMIN" ||
                    p.createdBy === authUser?.id
                )
                .map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-[var(--ink-700)] mb-1.5">
              Add tags (comma-separated)
            </label>
            <input
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              className="w-full px-4 py-2.5 bg-[var(--surface-container-low)] text-[var(--ink-900)] border border-[var(--ink-200)] rounded-xl outline-none focus:border-[var(--sky-400)] placeholder-[var(--ink-400)]"
              placeholder="e.g. dp, sorting, array"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="btn-ghost-sky px-4 py-2 rounded-full text-sm font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-sky px-5 py-2 rounded-full text-sm font-semibold inline-flex items-center gap-1.5 disabled:opacity-60 disabled:cursor-not-allowed"
              disabled={!selectedPlaylist || isLoading}
            >
              {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Plus className="w-4 h-4" />
              )}
              Add to sheet
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddtoPlaylist;
