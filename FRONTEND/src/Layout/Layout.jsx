import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Home from "../pages/Home.jsx";
import FAQ from "../pages/FAQ.jsx";
import About from "../pages/AboutUs.jsx";
import Pricing from "../pages/Pricing.jsx";
import LoginPage from "../pages/LoginPage.jsx";
import SignUpPage from "../pages/SignUpPage.jsx";
import ProblemsHome from "../pages/Problems.jsx";
import { useAuthStore } from "../store/useAuthStore.js";
import { Loader } from "lucide-react";
import AdminRoute from "../componenets/AdminRoute.jsx";
import AddProblem from "../pages/AddProblem.jsx";
import ProblemPage from "../pages/ProblemPage.jsx";
import AllPlaylistsPage from "../pages/PlaylistsPage.jsx";
import PlaylistDetailpage from "../pages/PlaylistDetailpage.jsx";
import Profile from "../pages/Profile.jsx";
import NotFoundPage from "../pages/NotFoundPage.jsx";
import PricingComingSoon from "../pages/PricingComingSoon.jsx";

const Layout = () => {
  const { authUser, checkAuth, isCheckingAuth, refreshToken } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    checkAuth();

    const interval = setInterval(() => {
      refreshToken();
    }, 1000 * 60 * 3);

    return () => clearInterval(interval);
  }, []);

  if (isCheckingAuth && !authUser) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );
  }
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
