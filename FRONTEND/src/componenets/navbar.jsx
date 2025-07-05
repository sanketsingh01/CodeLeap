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
import codeleaplogo from "../assets/codeleaplogo.webp";
import "../index.css";

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
  const isPlaylistsPage = location.pathname === "/playlists";

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
        className="fixed top-2 left-2 md:left-36 right-2 md:right-36 z-50 bg-black/90 backdrop-blur-md border border-gray-800/50 text-white py-4 px-6 flex items-center justify-between text-center rounded-2xl shadow-lg raleway-font-regular"
      >
        <Link to="/">
          <div className="flex items-center">
            <img src={codeleaplogo} alt="Codeleap Logo" className="h-10 w-32" />
          </div>
        </Link>

        <div className="hidden text-base md:flex items-center space-x-8 flex-1 justify-center">
          <div className="hover:text-[#F4FF54] cursor-pointer flex gap-4 transition-colors duration-200">
            <Link to="/problems">Problems</Link>
          </div>
          <div className="hover:text-[#F4FF54] cursor-pointer flex gap-4 transition-colors duration-200">
            <Link to="/playlists">Sheets</Link>
          </div>
          <div className="hover:text-[#F4FF54] cursor-pointer flex gap-4 transition-colors duration-200">
            <Link to="/Pricing">Pricing</Link>
          </div>

          <div className="hover:text-[#F4FF54] cursor-pointer flex gap-4 transition-colors duration-200">
            <Link to="/FAQ">FAQ</Link>
          </div>

          <div className="hover:text-[#F4FF54] cursor-pointer flex gap-4 transition-colors duration-200">
            <Link to="/About">About</Link>
          </div>
        </div>

        {/* Right - Auth Buttons (Desktop) */}
        <div className="hidden md:flex items-center gap-2">
          {!authUser && (
            <div className="flex items-center">
              <Link
                to="/login"
                className="text-white hover:text-[#F4FF54] mr-4 text-base transition-colors duration-200"
              >
                Sign In
              </Link>
              <motion.button
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
                onClick={handleRegisterClick}
                className="bg-[#F4FF54] text-base text-black font-medium py-2 px-4 rounded-full hover:bg-opacity-90 flex items-center shadow-md"
              >
                Register{" "}
                <span className="bg-black rounded-full ml-2 flex items-center justify-center p-1 transition-all duration-300">
                  <ArrowUpRight size={15} color="white" />
                </span>
              </motion.button>
            </div>
          )}

          {authUser && (
            <div className="flex items-center gap-8 mr-6">
              <div className="dropdown dropdown-end">
                <label
                  tabIndex={0}
                  className="btn btn-ghost btn-circle avatar flex flex-row hover:bg-gray-800/50 transition-colors duration-200"
                >
                  <div className="w-10 rounded-full ring-2 ring-gray-700/50 hover:ring-[#F4FF54]/50 transition-all duration-200">
                    <img
                      src={
                        authUser?.image ||
                        "https://avatar.iran.liara.run/public/boy"
                      }
                      alt="User Avatar"
                      className="object-cover rounded-full"
                    />
                  </div>
                </label>
                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow-lg bg-black/90 backdrop-blur-md border border-gray-800/50 rounded-xl w-52 space-y-3"
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
                      className="hover:bg-[#F4FF54] hover:text-black text-base font-semibold rounded-lg transition-colors duration-200"
                    >
                      <User className="w-4 h-4 mr-2" />
                      My Profile
                    </Link>
                  </li>
                  {authUser?.role === "ADMIN" && (
                    <li>
                      <Link
                        to="/add-problem"
                        className="hover:bg-[#F4FF54] hover:text-black text-base font-semibold rounded-lg transition-colors duration-200"
                      >
                        <Code className="w-4 h-4 mr-1" />
                        Add Problem
                      </Link>
                    </li>
                  )}
                  <li>
                    <LogoutButton className="hover:bg-[#F4FF54]/80 rounded-lg transition-colors duration-200">
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
          <button
            onClick={toggleMenu}
            className="hover:text-[#F4FF54] transition-colors duration-200"
          >
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
          className="fixed top-[88px] left-2 right-2 z-50 bg-black/90 backdrop-blur-md border border-gray-800/50 text-white px-6 py-4 space-y-4 md:hidden rounded-2xl shadow-lg"
        >
          <div className="hover:text-[#F4FF54] cursor-pointer transition-colors duration-200">
            <Link to="/problems">Problems</Link>
          </div>
          <div className="hover:text-[#F4FF54] cursor-pointer transition-colors duration-200">
            <Link to="/playlists">Sheets</Link>
          </div>
          <div className="hover:text-[#F4FF54] cursor-pointer transition-colors duration-200">
            <Link to="/Pricing">Pricing</Link>
          </div>
          <div className="hover:text-[#F4FF54] cursor-pointer transition-colors duration-200">
            <Link to="/FAQ">FAQs</Link>
          </div>
          <div className="hover:text-[#F4FF54] cursor-pointer transition-colors duration-200">
            <Link to="/About">About</Link>
          </div>

          {!authUser && (
            <>
              <Link
                to="/login"
                className="block hover:text-[#F4FF54] transition-colors duration-200"
              >
                Sign In
              </Link>
              <button
                className="bg-[#F4FF54] text-black font-medium py-2 px-4 rounded-full w-full hover:bg-opacity-90 flex justify-center items-center shadow-md transition-all duration-200"
                onClick={handleRegisterClick}
              >
                Register{" "}
                <span className="bg-black rounded-full ml-2 flex items-center justify-center p-1 transition-all duration-300">
                  <ArrowUpRight size={12} color="white" />
                </span>
              </button>
            </>
          )}

          {authUser && (
            <div className="space-y-3 pt-2 border-t border-gray-800/50">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full ring-2 ring-gray-700/50">
                  <img
                    src={
                      authUser?.image ||
                      "https://avatar.iran.liara.run/public/boy"
                    }
                    alt="User Avatar"
                    className="object-cover rounded-full"
                  />
                </div>
                <span className="text-base font-semibold">
                  {authUser?.name}
                </span>
              </div>
              <Link
                to="/profile"
                className="block hover:text-[#F4FF54] transition-colors duration-200"
              >
                My Profile
              </Link>
              {authUser?.role === "ADMIN" && (
                <Link
                  to="/add-problem"
                  className="block hover:text-[#F4FF54] transition-colors duration-200"
                >
                  Add Problem
                </Link>
              )}
              <LogoutButton className="text-left hover:text-[#F4FF54] transition-colors duration-200">
                Logout
              </LogoutButton>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
}
