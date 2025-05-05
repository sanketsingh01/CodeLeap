import React from "react";
import Hero from "../componenets/Hero.jsx";
import FeatureGrid from "../componenets/FeatureGrid.jsx";
import CodingJourney from "../componenets/whyUs.jsx";
import Comunitysection from "../componenets/Comunitysection.jsx";
import CommunityCard from "../componenets/MailCard.jsx";

const Home = () => {
  return (
    <div className="w-full">
      <Hero />
      <FeatureGrid />
      <CodingJourney />
      <Comunitysection />
      <CommunityCard />
    </div>
  );
};

export default Home;
