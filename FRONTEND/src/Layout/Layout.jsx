import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home.jsx";
import FAQ from "../pages/FAQ.jsx";

const Layout = () => {
  return (
    <div className="w-full">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/FAQ" element={<FAQ />} />
      </Routes>
    </div>
  );
};

export default Layout;
