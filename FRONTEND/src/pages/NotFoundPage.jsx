import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { AlertTriangle } from "lucide-react";

const NotFoundPage = () => {
  return (
    <div
      style={{
        backgroundImage: `radial-gradient(circle, rgba(255, 255, 255, 0.2) 1px, transparent 1px)`,
        backgroundSize: "20px 20px",
        backgroundPosition: "0 0",
      }}
      className="min-h-screen flex flex-col justify-center items-center px-4 font-sans text-white relative overflow-hidden"
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="z-10 text-center p-8 bg-white/5 backdrop-blur-md rounded-2xl shadow-xl max-w-md border border-white/10"
      >
        <div className="flex justify-center mb-6">
          <AlertTriangle className="w-12 h-12 text-yellow-400" />
        </div>
        <h1 className="text-5xl font-extrabold text-white mb-4">404</h1>
        <p className="text-lg text-gray-300 mb-6">
          Oops! The page you’re looking for doesn’t exist.
        </p>
        <Link to="/" className="inline-block">
          <button className="bg-[#F4FF54] text-black hover:opacity-90 transition-all px-6 py-2 rounded-full font-semibold shadow-md cursor-pointer">
            Back to Home
          </button>
        </Link>
      </motion.div>
    </div>
  );
};

export default NotFoundPage;
