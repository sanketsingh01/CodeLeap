import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home.jsx";
import FAQ from "../pages/FAQ.jsx";
import About from "../pages/AboutUs.jsx";

const Layout = () => {
  return (
    <div className="w-full">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/FAQ" element={<FAQ />} />
        <Route path="/About" element={<About />} />
      </Routes>
    </div>
  );
};

export default Layout;
