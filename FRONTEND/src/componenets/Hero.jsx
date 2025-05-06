import React from "react";
import "../../src/index.css";
import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import MagicSVG from "../assets/magic.svg";

// Add these styles to your CSS file or include them here
const gradientTextStyle = {
  background: "linear-gradient(90deg, #F4FF54 0%, #FFB800 50%, #F4FF54 100%)",
  backgroundSize: "200% auto",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
  color: "transparent",
  animation: "gradientFlow 3s linear infinite",
};

// Define the keyframes for the animation
const keyframesStyle = `
@keyframes gradientFlow {
  0% {
    background-position: 0% center;
  }
  100% {
    background-position: 200% center;
  }
}
`;

const Hero = () => {
  React.useEffect(() => {
    // Add keyframes to document when component mounts
    const style = document.createElement("style");
    style.innerHTML = keyframesStyle;
    document.head.appendChild(style);

    // Clean up function for removing the style when component unmounts
    return () => {
      document.head.removeChild(style);
    };
  }, []); // Empty dependency array means this runs once on mount

  return (
    <div
      className="w-full text-white pt-10 pb-16 flex flex-col justify-center items-center overflow-hidden px-6 sm:px-12 md:px-24 lg:px-36"
      style={{
        backgroundImage: `radial-gradient(circle, rgba(255, 255, 255, 0.2) 1px, transparent 1px)`,
        backgroundSize: "20px 20px",
        backgroundPosition: "0 0",
      }}
    >
      {/* Heading */}
      <motion.div
        className="flex flex-col items-center text-center"
        initial={{ y: -100, scale: 0.8, opacity: 0 }}
        animate={{ y: 0, scale: 1, opacity: 1 }}
        transition={{
          type: "spring",
          stiffness: 100,
          damping: 15,
          duration: 0.8,
        }}
      >
        <motion.span
          className="parkinsans-font text-5xl sm:text-5xl md:text-6xl lg:text-8xl pb-2"
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          Enhance Your
        </motion.span>
        <motion.span
          className="parkinsans-font text-5xl sm:text-5xl md:text-6xl lg:text-8xl pt-2"
          style={gradientTextStyle}
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          Coding Skills Today!
        </motion.span>
      </motion.div>

      {/* Subheading */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="pt-8 w-full sm:w-5/6 md:w-3/4 text-center px-2 sm:px-4"
      >
        <span className="inter-Regular text-base sm:text-lg md:text-xl text-white">
          Learn Coding Effectively. Master coding challenges with practical
          experience. And master in-demand programming skills through
          interactive challenges and expert-led tutorials.
        </span>
      </motion.div>

      {/* Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.0, duration: 0.6 }}
        className="pt-10 flex flex-col sm:flex-row gap-6 sm:gap-10 items-center"
      >
        <button className="parkinsans-Regular bg-black text-white py-2.5 px-6 sm:px-8 text-sm sm:text-base rounded-md border border-gray-400 hover:border-[#F4FF54] hover:shadow-[0_0_10px_2px_#F4FF54] transition-all duration-300 cursor-pointer">
          Explore More
        </button>
        <button className="parkinsans-font relative overflow-hidden bg-[#F4FF54] text-black py-2.5 px-6 sm:px-8 text-sm sm:text-base rounded-md border flex gap-1 items-center group hover:shadow-[0_0_20px_#F4FF54] transition-all duration-300">
          <span className="relative z-10 flex items-center gap-1">
            Get Started <ArrowUpRight size={20} color="black" />
          </span>
          <span className="absolute inset-0 bg-gradient-to-r from-yellow-300 via-yellow-200 to-yellow-400 opacity-0 group-hover:opacity-100 blur-lg transition-all duration-500"></span>
        </button>
      </motion.div>

      {/* Image */}
      <motion.img
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        src={MagicSVG}
        alt="Magic effect"
        className="text-white mt-3 md:mt-8 w-52 sm:w-64 md:w-72 h-auto"
      />
    </div>
  );
};

export default Hero;
