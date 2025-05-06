import { useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import "../index.css";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <div className="w-full px-2 md:px-36">
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          type: "spring",
          stiffness: 120,
          damping: 20,
          duration: 0.7,
        }}
        className="fixed top-0 left-0 w-full z-50 bg-black text-white py-5 px-6 xl:px-36 flex items-center justify-between"
      >
        {/* Left - Logo */}
        <Link to="/">
          <div className="flex items-center">
            <div className="h-8 w-8 bg-[#F4FF54] rounded-full mr-2"></div>
            <span className="text-xl font-bold">CodeLeap</span>
          </div>
        </Link>

        {/* Center - Nav Links (Desktop) */}
        <div className="hidden text-base md:flex items-center space-x-6 flex-1 justify-center">
          <div className="hover:text-[#F4FF54] cursor-pointer flex gap-4">
            <Link to="/">Problems</Link>
          </div>
          <div className="hover:text-[#F4FF54] cursor-pointer flex gap-4">
            <Link to="/">Pricing</Link>
          </div>
          <div className="hover:text-[#F4FF54] cursor-pointer flex gap-4">
            <Link to="/FAQ">FAQs</Link>
          </div>
          <div className="hover:text-[#F4FF54] cursor-pointer flex gap-4">
            <Link to="/">About</Link>
          </div>
        </div>

        {/* Right - Auth Buttons (Desktop) */}
        <div className="hidden md:flex items-center gap-2">
          <a
            href="#"
            className="text-white hover:text-[#F4FF54] mr-4 text-base"
          >
            Sign In
          </a>
          <motion.button
            whileHover={{ scale: 1.15 }}
            transition={{ duration: 0.2 }}
            className="bg-[#F4FF54] text-base text-black font-medium py-2 px-4 rounded-full hover:bg-opacity-90 flex"
          >
            Register{" "}
            <span className="bg-black rounded-full ml-2 flex items-center justify-center p-1 transition-all duration-300">
              <ArrowUpRight size={15} color="white" />
            </span>
          </motion.button>
        </div>

        {/* Hamburger (Mobile Only) */}
        <div className="md:hidden">
          <button onClick={toggleMenu}>
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </motion.nav>
      {/* Mobile Menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed top-[72px] left-0 w-full z-50 bg-black text-white px-6 py-4 space-y-4 md:hidden"
        >
          <div className="hover:text-[#F4FF54] cursor-pointer">
            <Link to="/">Problems</Link>
          </div>
          <div className="hover:text-[#F4FF54] cursor-pointer">
            <Link to="/">Pricing</Link>
          </div>
          <div className="hover:text-[#F4FF54] cursor-pointer">
            <Link to="/FAQ">FAQs</Link>
          </div>
          <div className="hover:text-[#F4FF54] cursor-pointer">
            <Link to="/">About</Link>
          </div>

          <a href="#" className="block hover:text-[#F4FF54]">
            Sign In
          </a>
          <button className="bg-[#F4FF54] text-black font-medium py-2 px-4 rounded-full w-full hover:bg-opacity-90 flex justify-center items-center">
            Register{" "}
            <span className="bg-black rounded-full ml-2 flex items-center justify-center p-1 transition-all duration-300">
              <ArrowUpRight size={12} color="white" />
            </span>
          </button>
        </motion.div>
      )}
    </div>
  );
}
