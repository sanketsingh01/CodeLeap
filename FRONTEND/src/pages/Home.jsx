import React from "react";
import Hero from "../components/Hero.jsx";
import FeatureGrid from "../components/FeatureGrid.jsx";
import CodingJourney from "../components/whyUs.jsx";
import Comunitysection from "../components/Comunitysection.jsx";
import CommunityCard from "../components/MailCard.jsx";
import Reviews from "./Reviews.jsx";

const Home = () => {
  return (
    <div className="w-full flex flex-col items-center parkinsans-Regular">
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
