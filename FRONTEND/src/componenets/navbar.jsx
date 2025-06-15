import React, { useState } from "react";
import {
  ArrowUpRight,
  Menu,
  X,
  User,
  Code,
  LogOut,
  DockIcon,
} from "lucide-react";
import { motion } from "motion/react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../index.css";
import { useAuthStore } from "../store/useAuthStore.js";
import LogoutButton from "./LogoutButton.jsx";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const { authUser } = useAuthStore();

  const navigate = useNavigate();

  const handleRegisterClick = () => {
    navigate("/SignUp");
    setIsOpen(false);
  };

  const toggleMenu = () => setIsOpen(!isOpen);

  const location = useLocation();
  const isFAQPage = location.pathname === "/FAQ";
  const isAboutPage = location.pathname === "/About";
  const isPricingPage = location.pathname === "/Pricing";
  const isProblemsPage = location.pathname === "/problems";
  const isPlaylistsPage = Location.pathname === "/playlists";

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
            <Link to="/problems">Problems</Link>
          </div>
          {!isPlaylistsPage && (
            <div className="hover:text-[#F4FF54] cursor-pointer flex gap-4">
              <Link to="/playlists">Sheets</Link>
            </div>
          )}
          {!isPricingPage && (
            <div className="hover:text-[#F4FF54] cursor-pointer flex gap-4">
              <Link to="/Pricing">Pricing</Link>
            </div>
          )}
          {!isFAQPage && (
            <div className="hover:text-[#F4FF54] cursor-pointer flex gap-4">
              <Link to="/FAQ">FAQ</Link>
            </div>
          )}
          {!isAboutPage && (
            <div className="hover:text-[#F4FF54] cursor-pointer flex gap-4">
              <Link to="/About">About</Link>
            </div>
          )}
        </div>

        {/* Right - Auth Buttons (Desktop) */}
        <div className="hidden md:flex items-center gap-2">
          {!authUser && (
            <div className="flex items-center">
              <Link
                to="/login"
                className="text-white hover:text-[#F4FF54] mr-4 text-base"
              >
                Sign In
              </Link>
              <motion.button
                whileHover={{ scale: 1.15 }}
                transition={{ duration: 0.2 }}
                onClick={handleRegisterClick}
                className="bg-[#F4FF54] text-base text-black font-medium py-2 px-4 rounded-full hover:bg-opacity-90 flex"
              >
                Register{" "}
                <span className="bg-black rounded-full ml-2 flex items-center justify-center p-1 transition-all duration-300">
                  <ArrowUpRight size={15} color="white" />
                </span>
              </motion.button>
            </div>
          )}

          {authUser && (
            <div className="flex items-center gap-8">
              <div className="dropdown dropdown-end">
                <label
                  tabIndex={0}
                  className="btn btn-ghost btn-circle avatar flex flex-row "
                >
                  <div className="w-10 rounded-full ">
                    <img
                      src={
                        authUser?.image ||
                        "https://avatar.iran.liara.run/public/boy"
                      }
                      alt="User Avatar"
                      className="object-cover"
                    />
                  </div>
                </label>
                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 space-y-3"
                >
                  {/* Admin Option */}

                  {/* Common Options */}
                  <li>
                    <p className="text-base font-semibold">{authUser?.name}</p>
                    <hr className="border-gray-200/10" />
                  </li>
                  <li>
                    <Link
                      to="/profile"
                      className="hover:bg-[#F4FF54] hover:text-black text-base font-semibold"
                    >
                      <User className="w-4 h-4 mr-2" />
                      My Profile
                    </Link>
                  </li>
                  {authUser?.role === "ADMIN" && (
                    <li>
                      <Link
                        to="/add-problem"
                        className="hover:bg-[#F4FF54] hover:text-black text-base font-semibold"
                      >
                        <Code className="w-4 h-4 mr-1" />
                        Add Problem
                      </Link>
                    </li>
                  )}
                  <li>
                    <LogoutButton className="hover:bg-[#F4FF54]/80">
                      <LogOut className="w-4 h-4 mr-2" />
                      Logout
                    </LogoutButton>
                  </li>
                </ul>
              </div>
            </div>
          )}
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
            <Link to="/Pricing">Pricing</Link>
          </div>
          <div className="hover:text-[#F4FF54] cursor-pointer">
            <Link to="/FAQ">FAQs</Link>
          </div>
          <div className="hover:text-[#F4FF54] cursor-pointer">
            <Link to="/About">About</Link>
          </div>

          <Link to="/login" className="block hover:text-[#F4FF54]">
            Sign In
          </Link>
          <button
            className="bg-[#F4FF54] text-black font-medium py-2 px-4 rounded-full w-full hover:bg-opacity-90 flex justify-center items-center"
            onClick={handleRegisterClick}
          >
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
