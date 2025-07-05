import React from "react";
import { motion } from "motion/react";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";

import { HomeIcon } from "lucide-react";

const handleClick = () => {
  if (true) toast.success("Notified Successfully");
};
const PricingComingSoon = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-zinc-800 to-black text-white p-6 relative overflow-hidden mt-14">
      {/* Background Blurs */}
      <div className="absolute w-96 h-96 bg-pink-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse top-[-10rem] left-[-10rem]"></div>
      <div className="absolute w-96 h-96 bg-yellow-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse bottom-[-10rem] right-[-10rem]"></div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-center max-w-3xl z-10 parkinsans-Regular"
      >
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight bg-gradient-to-r from-yellow-400 via-pink-500 to-red-500 bg-clip-text text-transparent mb-6 w-full">
          Pricing will be launched soon
        </h1>
        <p className="text-lg md:text-xl text-zinc-300 mb-8">
          Empowering developers with powerful collaboration tools, Real problem
          solving and preparing for the future. Be the first to experience the
          future of coding.
        </p>
        <div className="flex flex-col items-center gap-3">
          <button
            onClick={handleClick}
            className="bg-yellow-400 hover:bg-yellow-300 text-black px-6 py-3 rounded-lg font-semibold transition-all duration-300 shadow-md cursor-pointer"
          >
            Notify Me
          </button>
          <Link
            to="/"
            className="bg-yellow-400 hover:bg-yellow-300 text-black px-6 py-3 rounded-lg font-semibold transition-all duration-300 shadow-md cursor-pointer flex gap-2 justify-center items-center"
          >
            <HomeIcon className="w-5 h-5" />
            Back to Home
          </Link>
        </div>

        <p className="mt-8 text-sm text-zinc-500">
          &copy; {new Date().getFullYear()} CodeLeap. All rights reserved.
        </p>
      </motion.div>
    </div>
  );
};

export default PricingComingSoon;
