import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home.jsx";

const Layout = () => {
  return (
    <div className="w-full">
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
};

export default Layout;
