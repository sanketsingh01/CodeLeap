import React from "react";
import { useLocation } from "react-router-dom";
import Navbar from "./componenets/navbar.jsx";
import Footer from "./componenets/Footer.jsx";
import Layout from "./Layout/Layout.jsx";

const App = () => {
  const location = useLocation();
  const hideHeaderFooterRoutes = ["/login", "/signup"];

  const shouldHideHeaderFooter = hideHeaderFooterRoutes.includes(
    location.pathname.toLowerCase()
  );

  const shouldhidefooter = /^\/problem\/[^/]+$/.test(
    location.pathname.toLowerCase()
  );

  const shouldhidefooter1 = /^\/profile/.test(location.pathname.toLowerCase());

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-black via-zinc-800 to-black text-white">
      {!shouldHideHeaderFooter && <Navbar />}
      <Layout />
      {!(shouldHideHeaderFooter || shouldhidefooter || shouldhidefooter1) && (
        <Footer />
      )}
    </div>
  );
};

export default App;
