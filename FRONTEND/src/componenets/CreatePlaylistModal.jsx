import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { X } from "lucide-react";

import { useAuthStore } from "../store/useAuthStore.js";

const CreatePlaylistModal = ({ isOpen, onClose, onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const { authUser, checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const isAdmin = authUser?.role === "ADMIN";

  const handleFormSubmit = async (data) => {
    await onSubmit(data);
    reset();
    onClose();
  };

  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center px-4">
      <div className="bg-zinc-900 rounded-2xl shadow-2xl w-full max-w-lg border border-zinc-700">
        {/* Modal Header */}
        <div className="flex justify-between items-center p-5 border-b border-zinc-700">
          <h3 className="text-2xl font-semibold text-white">
            Create New Sheet
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Modal Form */}
        <form
          onSubmit={handleSubmit(handleFormSubmit)}
          className="p-6 space-y-5"
        >
          {/* Playlist Name */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Sheet Name
            </label>
            <input
              type="text"
              placeholder="Enter Sheet name"
              className="w-full px-4 py-2 bg-zinc-800 text-white border border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
              {...register("name", { required: "Playlist name is required" })}
            />
            {errors.name && (
              <p className="text-sm text-red-500 mt-1">{errors.name.message}</p>
            )}
          </div>

          {/* Playlist Description */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Description
            </label>
            <textarea
              rows={4}
              placeholder="Enter Sheet description"
              className="w-full px-4 py-2 bg-zinc-800 text-white border border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
              {...register("description")}
            />
          </div>

          {/* Public Playlist Checkbox */}
          {isAdmin && (
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="isPublic"
                {...register("isPublic")}
                className="w-4 h-4 text-yellow-400 bg-zinc-800 border-zinc-700 rounded focus:ring-yellow-400"
              />
              <label htmlFor="isPublic" className="text-sm text-gray-300">
                Make this Sheet public (visible to everyone)
              </label>
            </div>
          )}

          {/* Footer Buttons */}
          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm text-gray-300 bg-zinc-700 rounded-lg hover:bg-zinc-600 transition cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-sm font-semibold bg-yellow-400 text-black rounded-lg hover:bg-yellow-300 transition cursor-pointer"
            >
              Create Sheet
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePlaylistModal;
