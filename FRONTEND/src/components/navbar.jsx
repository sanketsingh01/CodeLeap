import React, { useState } from "react";
import {
  ArrowUpRight,
  Menu,
  X,
  User,
  Code,
  LogOut,
} from "lucide-react";
import { motion } from "motion/react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../index.css";
import { useAuthStore } from "../store/useAuthStore.js";
import LogoutButton from "./LogoutButton.jsx";

const navItems = [
  { label: "Problems", to: "/problems" },
  { label: "Sheets", to: "/playlists" },
  { label: "Pricing", to: "/Pricing" },
  { label: "FAQ", to: "/FAQ" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { authUser } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();

  const handleRegisterClick = () => {
    navigate("/SignUp");
    setIsOpen(false);
  };

  const toggleMenu = () => setIsOpen(!isOpen);

  const isActive = (to) =>
    location.pathname.toLowerCase() === to.toLowerCase();

  return (
    <div className="w-full px-2 md:px-8 lg:px-16 xl:px-24">
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 120, damping: 20 }}
        className="fixed top-3 left-2 right-2 md:left-8 md:right-8 lg:left-16 lg:right-16 xl:left-24 xl:right-24 z-50 bg-white/80 backdrop-blur-xl border border-[var(--ink-200)] text-[var(--ink-900)] py-3 px-5 flex items-center justify-between rounded-2xl shadow-[0_8px_30px_rgba(12,26,46,0.06)] font-jakarta"
      >
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <span className="relative w-9 h-9 rounded-xl bg-gradient-to-br from-[var(--sky-500)] to-[var(--sky-700)] flex items-center justify-center shadow-md shadow-sky-200">
            <img
              src="/CodeleapFavicon.svg"
              alt="Codeleap logo"
              className="w-5 h-5 object-contain"
            />
          </span>
          <span className="text-xl font-extrabold tracking-tight">
            <span className="text-[var(--ink-900)]">codeleap</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1 flex-1 justify-center">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={`relative px-4 py-2 text-sm font-medium rounded-full transition-all ${isActive(item.to)
                ? "text-[var(--sky-600)] bg-[var(--sky-50)]"
                : "text-[var(--ink-700)] hover:text-[var(--sky-600)] hover:bg-[var(--surface-container-low)]"
                }`}
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Right - Auth */}
        <div className="hidden md:flex items-center gap-3">
          {!authUser && (
            <>
              <Link
                to="/login"
                className="text-sm font-medium text-[var(--ink-700)] hover:text-[var(--sky-600)] transition-colors px-3 py-2"
              >
                Sign In
              </Link>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleRegisterClick}
                className="btn-sky inline-flex items-center gap-1.5 text-sm font-semibold py-2 px-4 rounded-full"
              >
                Start Free
                <ArrowUpRight size={16} />
              </motion.button>
            </>
          )}

          {authUser && (
            <div className="dropdown dropdown-end">
              <label
                tabIndex={0}
                className="btn btn-ghost btn-circle avatar hover:bg-[var(--surface-container-low)] transition-colors"
              >
                <div className="w-9 h-9 rounded-full ring-2 ring-[var(--sky-200)] hover:ring-[var(--sky-400)] transition-all overflow-hidden">
                  <img
                    src={
                      authUser?.image ||
                      "https://avatar.iran.liara.run/public/boy"
                    }
                    alt="User"
                    className="object-cover w-full h-full"
                  />
                </div>
              </label>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-50 p-2 shadow-lg bg-white border border-[var(--ink-200)] rounded-2xl w-56 space-y-1"
              >
                <li className="px-2 py-2">
                  <p className="text-sm font-semibold text-[var(--ink-900)]">
                    {authUser?.name}
                  </p>
                </li>
                <li>
                  <Link
                    to="/profile"
                    className="flex items-center text-sm font-medium text-[var(--ink-700)] hover:bg-[var(--sky-50)] hover:text-[var(--sky-600)] rounded-lg transition-colors"
                  >
                    <User className="w-4 h-4 mr-2" />
                    My Profile
                  </Link>
                </li>
                {authUser?.role === "ADMIN" && (
                  <li>
                    <Link
                      to="/add-problem"
                      className="flex items-center text-sm font-medium text-[var(--ink-700)] hover:bg-[var(--sky-50)] hover:text-[var(--sky-600)] rounded-lg transition-colors"
                    >
                      <Code className="w-4 h-4 mr-2" />
                      Add Problem
                    </Link>
                  </li>
                )}
                <li>
                  <LogoutButton className="text-sm font-medium text-[var(--ink-700)] hover:bg-red-50 hover:text-red-600 rounded-lg transition-colors">
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </LogoutButton>
                </li>
              </ul>
            </div>
          )}
        </div>

        {/* Mobile hamburger */}
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="p-2 rounded-lg text-[var(--ink-700)] hover:text-[var(--sky-600)] hover:bg-[var(--surface-container-low)] transition-colors"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed top-[76px] left-2 right-2 z-50 bg-white/95 backdrop-blur-xl border border-[var(--ink-200)] text-[var(--ink-900)] px-4 py-4 space-y-1 md:hidden rounded-2xl shadow-[0_8px_30px_rgba(12,26,46,0.08)]"
        >
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              onClick={() => setIsOpen(false)}
              className={`block px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${isActive(item.to)
                ? "bg-[var(--sky-50)] text-[var(--sky-600)]"
                : "text-[var(--ink-700)] hover:bg-[var(--surface-container-low)] hover:text-[var(--sky-600)]"
                }`}
            >
              {item.label}
            </Link>
          ))}

          {!authUser && (
            <div className="pt-3 mt-3 border-t border-[var(--ink-200)] space-y-2">
              <Link
                to="/login"
                onClick={() => setIsOpen(false)}
                className="block px-3 py-2 text-sm font-medium text-[var(--ink-700)] hover:text-[var(--sky-600)] transition-colors"
              >
                Sign In
              </Link>
              <button
                className="btn-sky w-full py-2.5 px-4 rounded-full text-sm font-semibold flex justify-center items-center gap-1.5"
                onClick={handleRegisterClick}
              >
                Start Free
                <ArrowUpRight size={16} />
              </button>
            </div>
          )}

          {authUser && (
            <div className="pt-3 mt-3 border-t border-[var(--ink-200)] space-y-2">
              <div className="flex items-center gap-3 px-3">
                <div className="w-9 h-9 rounded-full ring-2 ring-[var(--sky-200)] overflow-hidden">
                  <img
                    src={
                      authUser?.image ||
                      "https://avatar.iran.liara.run/public/boy"
                    }
                    alt="User"
                    className="object-cover w-full h-full"
                  />
                </div>
                <span className="text-sm font-semibold">{authUser?.name}</span>
              </div>
              <Link
                to="/profile"
                onClick={() => setIsOpen(false)}
                className="block px-3 py-2 text-sm font-medium text-[var(--ink-700)] hover:text-[var(--sky-600)] transition-colors"
              >
                My Profile
              </Link>
              {authUser?.role === "ADMIN" && (
                <Link
                  to="/add-problem"
                  onClick={() => setIsOpen(false)}
                  className="block px-3 py-2 text-sm font-medium text-[var(--ink-700)] hover:text-[var(--sky-600)] transition-colors"
                >
                  Add Problem
                </Link>
              )}
              <LogoutButton className="block w-full text-left px-3 py-2 text-sm font-medium text-[var(--ink-700)] hover:text-red-600 transition-colors">
                Logout
              </LogoutButton>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
}
