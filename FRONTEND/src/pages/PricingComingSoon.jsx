import React from "react";
import { motion } from "motion/react";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";

import { HomeIcon } from "lucide-react";

const handleClick = () => {
  toast.success("Notified Successfully");
};

const PricingComingSoon = () => {
  return (
    <div className="min-h-screen flex items-center justify-center sky-radial-bg text-[var(--ink-900)] p-6 relative overflow-hidden mt-14">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-center max-w-3xl z-10"
      >
        <h1 className="font-jakarta text-4xl md:text-6xl font-extrabold tracking-tight sky-gradient-text mb-6 w-full">
          Pricing will be launched soon
        </h1>
        <p className="font-inter text-lg md:text-xl text-[var(--ink-500)] mb-8">
          Empowering developers with powerful collaboration tools, real problem
          solving, and preparation for the future. Be the first to experience
          the future of coding.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={handleClick}
            className="btn-sky px-6 py-3 font-semibold cursor-pointer"
          >
            Notify Me
          </button>
          <Link
            to="/"
            className="btn-ghost-sky px-6 py-3 font-semibold cursor-pointer flex gap-2 justify-center items-center"
          >
            <HomeIcon className="w-5 h-5" />
            Back to Home
          </Link>
        </div>

        <p className="mt-8 text-sm text-[var(--ink-400)]">
          &copy; {new Date().getFullYear()} CodeLeap. All rights reserved.
        </p>
      </motion.div>
    </div>
  );
};

export default PricingComingSoon;
