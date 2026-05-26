import React, { useEffect, useState } from "react";
import { usePlaylistStore } from "../store/usePlaylistStore";
import {
  BookOpen,
  Trash2,
  X,
  Plus,
  ArrowRight,
  Code2,
  Building2,
  Sparkles,
  Loader2,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import CreatePlaylistModal from "../components/CreatePlaylistModal.jsx";
import { useAuthStore } from "../store/useAuthStore.js";

import amazonIcon from "./assets/AmazonIcon.webp";
import googleIcon from "./assets/googleIcon.webp";
import microsoftIcon from "./assets/microsoftIcon.webp";

const AllPlaylistsPage = () => {
  const navigate = useNavigate();
  const { playlists, getAllPlaylists, deletePlaylist, createPlaylist } =
    usePlaylistStore();
  const { authUser, checkAuth } = useAuthStore();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlaylists = async () => {
      setLoading(true);
      await getAllPlaylists();
      setLoading(false);
    };
    fetchPlaylists();
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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--surface)]">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="w-10 h-10 text-[var(--sky-500)] animate-spin" />
          <p className="text-[var(--ink-500)] font-medium">
            Fetching playlists...
          </p>
        </div>
      </div>
    );
  }

  const companyIcons = [googleIcon, microsoftIcon, amazonIcon];

  return (
    <div className="min-h-screen pt-28 pb-16 px-6 sm:px-10 md:px-16 lg:px-24">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center md:text-left mb-12">
          <span className="inline-block text-xs uppercase tracking-[0.2em] font-semibold text-[var(--sky-600)] mb-2">
            DSA Sheets
          </span>
          <h1 className="font-jakarta text-4xl md:text-5xl font-extrabold text-[var(--ink-900)] leading-tight">
            Curated <span className="sky-gradient-text">problem sets</span>
          </h1>
          <p className="font-inter mt-3 text-base md:text-lg text-[var(--ink-500)] max-w-3xl">
            Master Data Structures & Algorithms with hand-picked sheets — from
            beginner-friendly drills to company-specific deep dives.
          </p>
        </div>

        {playlists.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-[var(--ink-200)]">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[var(--sky-50)] text-[var(--sky-500)] mb-3">
              <BookOpen className="w-7 h-7" />
            </div>
            <p className="font-jakarta font-semibold text-[var(--ink-900)] mb-1">
              No playlists yet
            </p>
            <p className="text-[var(--ink-500)] text-sm mb-5">
              Create your first curated sheet to get started.
            </p>
            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="btn-sky inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full text-sm font-semibold"
            >
              <Plus className="w-4 h-4" /> Create sheet
            </button>
          </div>
        ) : (
          <>
            {/* Your Sheets */}
            {userPlaylists.length > 0 && (
              <section className="mb-14">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-jakarta text-2xl md:text-3xl font-bold text-[var(--ink-900)] flex items-center gap-2">
                    <Code2 className="w-6 h-6 text-[var(--sky-500)]" />
                    Your Sheets
                  </h2>
                  <button
                    onClick={() => setIsCreateModalOpen(true)}
                    className="btn-sky inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold"
                  >
                    <Plus className="w-4 h-4" /> New
                  </button>
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {userPlaylists.map((playlist, index) => (
                    <div
                      key={playlist.id}
                      className="card-sky relative p-6 flex flex-col"
                    >
                      <span className="absolute top-4 right-4 inline-flex items-center gap-1 px-2.5 py-0.5 bg-[var(--sky-50)] text-[var(--sky-700)] text-[10px] font-bold rounded-full border border-[var(--sky-200)]">
                        Personal · {index + 1}
                      </span>
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[var(--sky-600)] to-[var(--sky-800)] flex items-center justify-center text-white mb-4 shadow-md">
                        <Code2 className="w-5 h-5" />
                      </div>
                      <h3 className="font-jakarta text-lg font-bold text-[var(--ink-900)] capitalize mb-2">
                        {playlist.name}
                      </h3>
                      <p className="text-sm text-[var(--ink-500)] mb-6 flex-1">
                        {playlist.description ||
                          "Your curated problems sheet."}
                      </p>
                      <div className="flex gap-2">
                        <button
                          onClick={() => navigate(`/Playlist/${playlist.id}`)}
                          className="btn-sky flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold"
                        >
                          Start <ArrowRight className="w-4 h-4" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            openModal(playlist);
                          }}
                          className="p-2 rounded-full bg-red-50 hover:bg-red-100 border border-red-200 text-red-600 transition-colors"
                          aria-label="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}

                  {/* Create card */}
                  <button
                    onClick={() => setIsCreateModalOpen(true)}
                    className="rounded-2xl border-2 border-dashed border-[var(--ink-200)] hover:border-[var(--sky-300)] hover:bg-[var(--sky-50)]/30 bg-white p-6 flex flex-col items-center justify-center text-center transition-all min-h-[220px] group"
                  >
                    <span className="w-12 h-12 rounded-xl bg-[var(--sky-50)] text-[var(--sky-500)] inline-flex items-center justify-center group-hover:scale-105 transition-transform mb-3">
                      <Plus className="w-6 h-6" />
                    </span>
                    <p className="font-jakarta font-semibold text-[var(--ink-900)]">
                      Create new sheet
                    </p>
                    <p className="text-xs text-[var(--ink-500)] mt-1">
                      Build your own curated problem set
                    </p>
                  </button>
                </div>
              </section>
            )}

            {/* Company sheets */}
            {adminPlaylists.length > 0 && (
              <section>
                <h2 className="font-jakarta text-2xl md:text-3xl font-bold text-[var(--ink-900)] mb-6 flex items-center gap-2">
                  <Building2 className="w-6 h-6 text-[var(--sky-500)]" />
                  Company Sheets
                </h2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {adminPlaylists.map((playlist, index) => {
                    const icon = companyIcons[index % companyIcons.length];
                    return (
                      <div
                        key={playlist.id}
                        className="card-sky relative p-6 flex flex-col"
                      >
                        <span className="absolute top-4 right-4 inline-flex items-center gap-1 px-2.5 py-0.5 bg-[var(--sky-50)] text-[var(--sky-700)] text-[10px] font-bold rounded-full border border-[var(--sky-200)]">
                          <Sparkles className="w-2.5 h-2.5" /> Company
                        </span>
                        <div className="w-10 h-10 rounded-xl bg-white border border-[var(--ink-200)] flex items-center justify-center mb-4 shadow-sm">
                          <img
                            src={icon}
                            alt="Company"
                            className="w-6 h-6 object-contain"
                          />
                        </div>
                        <h3 className="font-jakarta text-lg font-bold text-[var(--ink-900)] capitalize mb-2">
                          {playlist.name}
                        </h3>
                        <p className="text-sm text-[var(--ink-500)] mb-6 flex-1">
                          {playlist.description}
                        </p>
                        <div className="flex gap-2">
                          <button
                            onClick={() => navigate(`/Playlist/${playlist.id}`)}
                            className="btn-sky flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold"
                          >
                            Start <ArrowRight className="w-4 h-4" />
                          </button>
                          {isAdmin && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                openModal(playlist);
                              }}
                              className="p-2 rounded-full bg-red-50 hover:bg-red-100 border border-red-200 text-red-600 transition-colors"
                              aria-label="Delete"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>
            )}
          </>
        )}
      </div>

      {/* Delete modal */}
      {isModalOpen && selectedPlaylist && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl p-7 w-full max-w-md shadow-xl border border-[var(--ink-200)] relative">
            <button
              onClick={closeModal}
              className="absolute top-3 right-3 p-1.5 rounded-lg text-[var(--ink-500)] hover:bg-[var(--surface-container-low)]"
            >
              <X className="w-4 h-4" />
            </button>
            <div className="flex items-center gap-4 mb-5">
              <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center">
                <Trash2 className="w-6 h-6 text-red-500" />
              </div>
              <div>
                <h3 className="font-jakarta text-lg font-bold text-[var(--ink-900)]">
                  Delete playlist
                </h3>
                <p className="text-[var(--ink-500)] text-xs">
                  This action cannot be undone.
                </p>
              </div>
            </div>
            <p className="text-sm text-[var(--ink-700)] mb-7">
              Are you sure you want to delete{" "}
              <span className="font-semibold text-[var(--ink-900)]">
                "{selectedPlaylist.name}"
              </span>
              ?
            </p>
            <div className="flex justify-end gap-2">
              <button
                onClick={closeModal}
                className="btn-ghost-sky px-4 py-2 rounded-full text-sm font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirm}
                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-full text-sm font-semibold transition-colors"
              >
                Delete
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
    </div>
  );
};

export default AllPlaylistsPage;
