import React from "react";
import Navbar from "./componenets/navbar.jsx";
import Layout from "./Layout/Layout.jsx";
import Footer from "./componenets/Footer.jsx";

const App = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-black via-zinc-800 to-black text-white">
      <Navbar />
      <Layout />
      <Footer />
    </div>
  );
};
export default App;
