import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { motion } from "motion/react";
import "../index.css";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="w-full px-36">
      {/* Navbar - Exact Modulify Style */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          type: "spring",
          stiffness: 120,
          damping: 20,
          duration: 0.7,
        }}
        className="sticky z-50 bg-black text-white py-5 px-6 flex items-center gap-6"
      >
        {/* Left - Logo */}
        <div className="flex items-center mr-8">
          <div className="h-8 w-8 bg-[#F4FF54] rounded-full mr-2"></div>
          <span className="text-xl font-bold">CodeLeap</span>
        </div>

        {/* Center - Navigation Links */}
        <div className="flex items-center space-x-6 flex-1">
          <div className="flex items-center hover:text-[#F4FF54] cursor-pointer">
            <span>Problems</span>
          </div>
          <div className="hover:text-[#F4FF54] cursor-pointer">Pricing</div>
          <div className="hover:text-[#F4FF54] cursor-pointer">FAQs</div>
          <div className="hover:text-[#F4FF54] cursor-pointer">Contact</div>
        </div>

        {/* Right - Buttons */}
        <div className="flex items-center gap-2">
          <a
            href="#"
            className="text-white hover:text-[#F4FF54] mr-4 text-base"
          >
            Sign In
          </a>
          <motion.button
            whileHover={{ scale: 1.15 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="bg-[#F4FF54] text-base text-black font-medium py-2 px-4 rounded-full hover:bg-opacity-90 cursor-pointer flex"
          >
            Register <ArrowUpRight size={25} />
          </motion.button>
        </div>
      </motion.nav>
    </div>
  );
}
