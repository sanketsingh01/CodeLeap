import React, { useEffect, useState } from "react";
import { usePlaylistStore } from "../store/usePlaylistStore";
import { BookOpen, FolderOpen, Trash2, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

const AllPlaylistsPage = () => {
  const navigate = useNavigate();
  const { playlists, getAllPlaylists, deletePlaylist } = usePlaylistStore();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);

  useEffect(() => {
    getAllPlaylists();
  }, []);

  const openModal = (playlist) => {
    setSelectedPlaylist(playlist);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedPlaylist(null);
    setIsModalOpen(false);
  };

  const handleDeleteConfirm = async () => {
    await deletePlaylist(selectedPlaylist.id);
    closeModal();
  };

  return (
    <div className="min-h-screen py-16 px-6 bg-gradient-to-br from-black via-zinc-900 to-black text-white mt-16">
      <h1 className="text-4xl font-extrabold text-center mb-16 bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
        Your Playlists
      </h1>

      {playlists.length === 0 ? (
        <div className="text-center text-gray-400">
          <BookOpen className="mx-auto w-12 h-12 mb-4" />
          <p>No playlists found. Start by creating one!</p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto">
          {playlists.map((playlist, index) => (
            <div
              key={playlist.id}
              className="relative rounded-xl border border-purple-500 p-5 bg-zinc-900 hover:shadow-lg hover:scale-[1.01] transition duration-300"
            >
              {/* Left Chevron Icon */}
              <div className="text-lg text-white mb-4">
                <span className="text-purple-300 text-xl">&lt;&gt;</span>
              </div>

              {/* Playlist Badge */}
              <div className="absolute top-5 right-5 bg-white text-red-500 text-xs font-bold px-3 py-1 rounded-full">
                Playlist {index + 1}
              </div>

              {/* Title */}
              <h2 className="text-xl font-bold text-white mb-3 capitalize">
                {playlist.name}
              </h2>

              {/* Description */}
              <p className="text-sm text-gray-300 mb-6">
                {playlist.description?.toLowerCase() ===
                "after solving this problem you can able to solve any js problem"
                  ? "after solving these problems, you'll be able to solve any js problem"
                  : playlist.description}
              </p>

              {/* Buttons */}
              <div className="mt-auto flex flex-col gap-4">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/Playlist/${playlist.id}`);
                  }}
                  className="w-full bg-yellow-400 text-black font-semibold py-2 rounded-lg flex justify-center items-center gap-2 hover:bg-yellow-500 transition cursor-pointer"
                >
                  Start Learning <span className="text-lg">→</span>
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    openModal(playlist);
                  }}
                  className="w-full bg-yellow-400 text-black font-semibold py-2 rounded-lg flex justify-center items-center gap-2 hover:bg-yellow-500 transition cursor-pointer"
                >
                  <Trash2 className="w-5 h-5" />
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {isModalOpen && selectedPlaylist && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-zinc-900 rounded-xl p-6 w-full max-w-md shadow-lg border border-zinc-700 relative">
            <button
              onClick={closeModal}
              className="absolute top-3 right-3 text-gray-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
            <h2 className="text-lg font-bold mb-4 text-white">
              Delete Playlist
            </h2>
            <p className="text-sm text-gray-300 mb-6">
              Are you sure you want to delete{" "}
              <span className="text-yellow-400 font-semibold">
                "{selectedPlaylist.name}"
              </span>
              ? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={closeModal}
                className="px-4 py-2 bg-zinc-700 hover:bg-zinc-600 rounded-lg text-sm text-white"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirm}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-sm text-white"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllPlaylistsPage;
