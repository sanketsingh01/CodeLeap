import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { X, Sparkles } from "lucide-react";

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
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg border border-[var(--ink-200)]">
        <div className="flex justify-between items-center px-6 py-4 border-b border-[var(--ink-200)]">
          <div className="flex items-center gap-2.5">
            <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-[var(--sky-500)] to-[var(--sky-700)] flex items-center justify-center text-white">
              <Sparkles className="w-4 h-4" />
            </span>
            <h3 className="font-jakarta text-lg font-bold text-[var(--ink-900)]">
              Create new sheet
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[var(--ink-500)] hover:bg-[var(--surface-container-low)] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form
          onSubmit={handleSubmit(handleFormSubmit)}
          className="p-6 space-y-5"
        >
          <div>
            <label className="block text-sm font-medium text-[var(--ink-700)] mb-1.5">
              Sheet name
            </label>
            <input
              type="text"
              placeholder="e.g. Top Google Interview Questions"
              className="w-full px-4 py-2.5 bg-white text-[var(--ink-900)] border border-[var(--ink-200)] rounded-xl outline-none transition-all focus:border-[var(--sky-500)] focus:shadow-[0_0_0_3px_rgba(22,76,255,0.14)] placeholder-[var(--ink-400)]"
              {...register("name", { required: "Playlist name is required" })}
            />
            {errors.name && (
              <p className="text-xs text-red-500 mt-1.5">
                {errors.name.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-[var(--ink-700)] mb-1.5">
              Description
            </label>
            <textarea
              rows={4}
              placeholder="What is this sheet for?"
              className="w-full px-4 py-2.5 bg-white text-[var(--ink-900)] border border-[var(--ink-200)] rounded-xl outline-none transition-all focus:border-[var(--sky-500)] focus:shadow-[0_0_0_3px_rgba(22,76,255,0.14)] placeholder-[var(--ink-400)] resize-none"
              {...register("description")}
            />
          </div>

          {isAdmin && (
            <div className="flex items-center gap-2 bg-[var(--sky-50)] border border-[var(--sky-200)] rounded-xl px-3.5 py-3">
              <input
                type="checkbox"
                id="isPublic"
                {...register("isPublic")}
                className="w-4 h-4 accent-[var(--sky-500)]"
              />
              <label htmlFor="isPublic" className="text-sm text-[var(--ink-700)]">
                Make this sheet public (visible to everyone)
              </label>
            </div>
          )}

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
              className="btn-sky px-5 py-2 rounded-full text-sm font-semibold"
            >
              Create sheet
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePlaylistModal;
