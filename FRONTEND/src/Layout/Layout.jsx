import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { Loader } from "lucide-react";

import Home from "../pages/Home.jsx";
import FAQ from "../pages/FAQ.jsx";
import About from "../pages/AboutUs.jsx";
import PricingComingSoon from "../pages/PricingComingSoon.jsx";
import LoginPage from "../pages/LoginPage.jsx";
import SignUpPage from "../pages/SignUpPage.jsx";
import ProblemsHome from "../pages/Problems.jsx";
import AddProblem from "../pages/AddProblem.jsx";
import ProblemPage from "../pages/ProblemPage.jsx";
import AllPlaylistsPage from "../pages/PlaylistsPage.jsx";
import PlaylistDetailpage from "../pages/PlaylistDetailpage.jsx";
import Profile from "../pages/Profile.jsx";
import NotFoundPage from "../pages/NotFoundPage.jsx";
import AdminRoute from "../componenets/AdminRoute.jsx";

import { useAuthStore } from "../store/useAuthStore.js";

const Layout = () => {
  const { authUser, checkAuth, isCheckingAuth, refreshToken } = useAuthStore();
  const [authError, setAuthError] = useState(false);

  useEffect(() => {
    const runAuthCheck = async () => {
      try {
        await checkAuth();
      } catch (err) {
        console.error("Auth check failed:", err);
        setAuthError(true);
      }
    };

    runAuthCheck();

    const interval = setInterval(() => {
      refreshToken().catch(() => setAuthError(true));
    }, 1000 * 60 * 3);

    return () => clearInterval(interval);
  }, [checkAuth, refreshToken]);

  // 1. Still checking
  if (isCheckingAuth && !authUser && !authError) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );
  }

  // 2. Backend unreachable
  if (authError) {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-center px-4">
        <h2 className="text-2xl font-bold mb-4">⚠️ Backend Unavailable</h2>
        <p className="mb-6 text-gray-300">
          Our servers are currently unreachable. Please try again later.
        </p>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700"
        >
          Retry
        </button>
      </div>
    );
  }

  // 3. Normal app
  return (
    <div className="w-full">
      <Toaster />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/FAQ" element={<FAQ />} />
        <Route path="/About" element={<About />} />
        <Route path="/Pricing" element={<PricingComingSoon />} />
        <Route path="/Playlist/:id" element={<PlaylistDetailpage />} />
        <Route path="/profile" element={<Profile />} />
        <Route
          path="/playlists"
          element={authUser ? <AllPlaylistsPage /> : <Navigate to="/login" />}
        />
        <Route
          path="/problems"
          element={authUser ? <ProblemsHome /> : <Navigate to="/login" />}
        />
        <Route
          path="/login"
          element={!authUser ? <LoginPage /> : <Navigate to="/problems" />}
        />
        <Route
          path="/signup"
          element={!authUser ? <SignUpPage /> : <Navigate to="/" />}
        />
        <Route
          path="/problem/:id"
          element={authUser ? <ProblemPage /> : <Navigate to="/login" />}
        />
        <Route element={<AdminRoute />}>
          <Route
            path="/add-problem"
            element={authUser ? <AddProblem /> : <Navigate to="/" />}
          />
        </Route>
        <Route path="/404" element={<NotFoundPage />} />
        <Route path="*" element={<Navigate to="/404" />} />
      </Routes>
    </div>
  );
};

export default Layout;
