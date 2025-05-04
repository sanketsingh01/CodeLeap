import React from "react";
import Navbar from "./componenets/navbar.jsx";
import Layout from "./Layout/Layout.jsx";

const App = () => {
  return (
    <div className="flex flex-col min-h-screen bg-black">
      <Navbar />
      <Layout />
    </div>
  );
};
export default App;
