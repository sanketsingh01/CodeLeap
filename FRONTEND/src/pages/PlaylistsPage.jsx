import React, { useEffect, useState } from "react";
import { usePlaylistStore } from "../store/usePlaylistStore";
import {
  BookOpen,
  FolderOpen,
  Trash2,
  X,
  Code2Icon,
  Plus,
  CloudLightningIcon,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import CreatePlaylistModal from "../componenets/CreatePlaylistModal.jsx";
import { useAuthStore } from "../store/useAuthStore.js";

import amazonIcon from "./assets/AmazonIcon.webp";
import googleIcon from "./assets/googleIcon.webp";
import flipkartIcon from "./assets/flipkartIcon.webp";
import microsoftIcon from "./assets/microsoftIcon.webp";

const AllPlaylistsPage = () => {
  const navigate = useNavigate();
  const { playlists, getAllPlaylists, deletePlaylist, createPlaylist } =
    usePlaylistStore();

  const { authUser, checkAuth } = useAuthStore();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  useEffect(() => {
    getAllPlaylists();
  }, []);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const userPlaylists = playlists.filter((p) => !p.isPublic);
  const adminPlaylists = playlists.filter((p) => p.isPublic);

  const isAdmin = authUser?.role === "ADMIN";

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

  const handleCreatePlaylist = async (data) => {
    await createPlaylist(data);
  };

  return (
    <div className="min-h-screen py-16 px-6 bg-gradient-to-br from-black via-zinc-900 to-black text-white mt-10">
      {/* Heading */}
      <div className="flex flex-row items-center justify-center w-full mb-8 space-x-4">
        <Code2Icon className="w-12 h-12 text-white bg-base-200 rounded-xl p-2" />
        <h1 className="text-5xl font-extrabold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
          DSA Sheets
        </h1>
      </div>

      {/* Subheading */}
      <div className="text-2xl font-semibold text-center mb-12 mx-auto max-w-3xl">
        Master Data Structures & Algorithms with curated problem sets. From
        beginner-friendly challenges to advanced company-specific questions.
      </div>

      {/* If no playlists at all */}
      {playlists.length === 0 ? (
        <div className="text-center text-gray-400">
          <BookOpen className="mx-auto w-12 h-12 mb-4" />
          <p>No playlists found. Start by creating one!</p>
        </div>
      ) : (
        <>
          {/* === User Playlists === */}
          {userPlaylists.length > 0 && (
            <div className="gap-10 max-w-6xl mx-auto mb-16">
              <div className="text-4xl font-bold mb-8 text-white">
                Your Sheets
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
                {userPlaylists.map((playlist, index) => (
                  <div
                    key={playlist.id}
                    className="relative rounded-xl border border-purple-500 p-5 bg-zinc-900 hover:shadow-lg hover:scale-[1.01] transition duration-300"
                  >
                    <div className="text-lg text-white mb-4">
                      <span className="text-purple-300 text-xl">&lt;&gt;</span>
                    </div>
                    <div className="absolute top-5 right-5 bg-white text-red-500 text-xs font-bold px-3 py-1 rounded-full">
                      Playlist {index + 1}
                    </div>
                    <h2 className="text-xl font-bold text-white mb-3 capitalize">
                      {playlist.name}
                    </h2>
                    <p className="text-sm text-gray-300 mb-6">
                      {playlist.description?.toLowerCase() ===
                      "after solving this problem you can able to solve any js problem"
                        ? "after solving these problems, you'll be able to solve any js problem"
                        : playlist.description}
                    </p>
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

                {/* Create New Sheet Card */}
                <div className="relative rounded-xl border border-dashed border-zinc-500 p-5 bg-zinc-900 hover:shadow-lg hover:scale-[1.01] transition duration-300 w-[360px]">
                  <h2 className="text-xl font-bold text-white mb-3 capitalize">
                    <Plus className="w-8 h-8 text-white p-2 bg-base-300" />{" "}
                    Create New Sheet
                  </h2>
                  <p className="text-sm text-gray-300 mb-6">
                    Build your own curated problems sheet
                  </p>
                  <button
                    onClick={() => setIsCreateModalOpen(true)}
                    className="w-full border border-dashed border-zinc-500 text-zinc-500 hover:text-white font-semibold py-2 rounded-lg flex justify-center items-center gap-2 transition cursor-pointer"
                  >
                    <CloudLightningIcon className="w-5 h-5" />
                    Create
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* === Admin Public Playlists === */}
          {adminPlaylists.length > 0 && (
            <div className="gap-10 max-w-6xl mx-auto mb-16">
              <div className="text-4xl font-bold mb-8 text-white">
                Company Based Sheets
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
                {adminPlaylists.map((playlist, index) => (
                  <div
                    key={playlist.id}
                    className="relative rounded-xl border border-blue-500 p-5 bg-zinc-900 hover:shadow-lg hover:scale-[1.01] transition duration-300"
                  >
                    {/* Icons */}
                    <div className="flex items-center gap-2 mb-4">
                      {index === 0 && (
                        <img
                          src={googleIcon}
                          alt="Google"
                          className="w-6 h-6 object-contain"
                        />
                      )}
                      {index === 1 && (
                        <img
                          src={microsoftIcon}
                          alt="Microsoft"
                          className="w-6 h-6 object-contain"
                        />
                      )}
                      {index === 2 && (
                        <img
                          src={amazonIcon}
                          alt="Amazon"
                          className="w-6 h-6 object-contain"
                        />
                      )}
                      <img
                        src={flipkartIcon}
                        alt="Flipkart"
                        className="w-6 h-6 object-contain"
                      />
                      <span className="text-blue-300 text-xl ml-2">
                        &lt;/&gt;
                      </span>
                    </div>

                    <div className="absolute top-5 right-5 bg-white text-blue-600 text-xs font-bold px-3 py-1 rounded-full">
                      Company Sheet
                    </div>
                    <h2 className="text-xl font-bold text-white mb-3 capitalize">
                      {playlist.name}
                    </h2>
                    <p className="text-sm text-gray-300 mb-6">
                      {playlist.description}
                    </p>
                    <div className="mt-auto flex flex-col gap-4">
                      <button
                        onClick={() => navigate(`/Playlist/${playlist.id}`)}
                        className="w-full bg-yellow-400 text-black font-semibold py-2 rounded-lg flex justify-center items-center gap-2 hover:bg-yellow-500 transition cursor-pointer"
                      >
                        Start Learning <span className="text-lg">→</span>
                      </button>
                      {isAdmin && (
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
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}

      {/* Delete Modal */}
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

      {/* Create Playlist Modal */}
      <CreatePlaylistModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreatePlaylist}
      />
    </div>
  );
};

export default AllPlaylistsPage;
