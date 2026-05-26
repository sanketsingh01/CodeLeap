import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Compass, ArrowLeft, Sparkles } from "lucide-react";

const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center px-4 sky-radial-bg relative overflow-hidden">
      <div className="absolute inset-0 dotted-bg opacity-50 -z-0" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 text-center p-10 bg-white rounded-3xl shadow-[var(--shadow-soft)] max-w-md border border-[var(--ink-200)]"
      >
        <div className="flex justify-center mb-6">
          <span className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[var(--sky-500)] to-[var(--sky-700)] flex items-center justify-center shadow-md shadow-sky-200">
            <Compass className="w-8 h-8 text-white" />
          </span>
        </div>
        <h1 className="font-jakarta text-6xl font-extrabold sky-gradient-text mb-2">
          404
        </h1>
        <p className="font-jakarta text-xl font-bold text-[var(--ink-900)] mb-2">
          Lost in space
        </p>
        <p className="text-[var(--ink-500)] mb-7">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="flex flex-col sm:flex-row gap-2 justify-center">
          <Link
            to="/"
            className="btn-sky inline-flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-full text-sm font-semibold"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to home
          </Link>
          <Link
            to="/problems"
            className="btn-ghost-sky inline-flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-full text-sm font-semibold"
          >
            <Sparkles className="w-4 h-4 text-[var(--sky-500)]" />
            Explore problems
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default NotFoundPage;
