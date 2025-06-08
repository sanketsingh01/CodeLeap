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
          {playlists.map((playlist) => (
            <div
              key={playlist.id}
              onClick={() => navigate(`/Playlist/${playlist.id}`)}
              className="relative bg-zinc-800 rounded-2xl p-6 border border-zinc-700 shadow-md hover:shadow-yellow-500/20 hover:scale-[1.02] transition-all duration-300 group overflow-hidden"
            >
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  openModal(playlist);
                }}
                className="absolute top-4 right-4 text-red-500 hover:text-red-600 transition"
                title="Delete Playlist"
              >
                <Trash2 className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-4 mb-4">
                <FolderOpen className="w-9 h-9 text-yellow-400 group-hover:rotate-6 transition-transform duration-300" />
                <div>
                  <h2 className="text-xl font-semibold text-white leading-tight">
                    {playlist.name}
                  </h2>
                  <p className="text-sm text-gray-400">
                    {playlist.problems?.length || 0} Problems
                  </p>
                </div>
              </div>

              {playlist.description && (
                <p className="text-sm text-gray-300 mb-3 line-clamp-3">
                  {playlist.description}
                </p>
              )}

              {playlist.tags && playlist.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {playlist.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 rounded-full text-xs font-medium bg-yellow-400/10 text-yellow-300 border border-yellow-400/20"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
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
