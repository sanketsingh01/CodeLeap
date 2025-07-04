import React from "react";
import Hero from "../componenets/Hero.jsx";
import FeatureGrid from "../componenets/FeatureGrid.jsx";
import CodingJourney from "../componenets/whyUs.jsx";
import Comunitysection from "../componenets/Comunitysection.jsx";
import CommunityCard from "../componenets/MailCard.jsx";
import Reviews from "./Reviews.jsx";

const Home = () => {
  return (
    <div className="w-full flex flex-col items-center">
      <Hero />
      <FeatureGrid />
      <CodingJourney />
      <Reviews />
      <Comunitysection />
      <CommunityCard />
    </div>
  );
};

export default Home;
