import React from "react";
import Hero from "../componenets/Hero.jsx";
import FeatureGrid from "../componenets/FeatureGrid.jsx";
import CodingJourney from "../componenets/whyUs.jsx";

const Home = () => {
  return (
    <div className="w-full">
      <Hero />
      <FeatureGrid />
      <CodingJourney />
    </div>
  );
};

export default Home;
