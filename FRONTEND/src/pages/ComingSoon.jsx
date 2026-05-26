import React from "react";
import { motion } from "motion/react";
import { FaTwitter, FaLinkedin, FaGithub } from "react-icons/fa";

const ComingSoon = () => {
  return (
    <div className="min-h-screen flex items-center justify-center sky-radial-bg text-[var(--ink-900)] p-6 relative overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-center max-w-2xl z-10"
      >
        <h1 className="font-jakarta text-4xl md:text-6xl font-extrabold tracking-tight sky-gradient-text mb-6">
          CodeLeap is Launching Soon
        </h1>
        <p className="font-inter text-lg md:text-xl text-[var(--ink-500)] mb-8">
          Empowering developers with powerful collaboration tools, real problem
          solving, and preparation for the future. Be the first to experience
          the future of coding.
        </p>
        <form className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <input
            type="email"
            placeholder="Enter your email"
            className="px-4 py-3 w-full sm:w-auto rounded-xl bg-white border border-[var(--ink-200)] text-[var(--ink-900)] placeholder:text-[var(--ink-400)] focus:outline-none focus:border-[var(--sky-400)] focus:ring-2 focus:ring-[var(--sky-200)] transition"
          />
          <button className="btn-sky px-6 py-3 font-semibold transition-all duration-300 cursor-pointer">
            Notify Me
          </button>
        </form>

        <div className="flex justify-center gap-6 mt-10 text-2xl text-[var(--ink-400)]">
          <a
            href="https://x.com/SinghSanket78"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[var(--sky-600)] transition"
          >
            <FaTwitter />
          </a>
          <a
            href="https://github.com/sanketsingh01"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[var(--sky-600)] transition"
          >
            <FaGithub />
          </a>
          <a
            href="https://www.linkedin.com/in/sanket-singh-5359732b8/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[var(--sky-600)] transition"
          >
            <FaLinkedin />
          </a>
        </div>

        <p className="mt-8 text-sm text-[var(--ink-400)]">
          &copy; {new Date().getFullYear()} CodeLeap. All rights reserved.
        </p>
      </motion.div>
    </div>
  );
};

export default ComingSoon;
