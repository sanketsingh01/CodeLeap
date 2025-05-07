import React from "react";
import { motion } from "framer-motion";
import FeatureImg1 from "../assets/FeatureImg1.avif";
import FeatureImg2 from "../assets/FeatureImg2.avif";
import FeatureImg3 from "../assets/FeatureImg3.avif";
import Icon1 from "../assets/Icon1.svg";
import Icon2 from "../assets/Icon2.svg";
import Icon3 from "../assets/Icon3.svg";
import "../index.css";

const features = [
  {
    title: "Coding Challenges",
    description:
      "Engage with a variety of coding challenges tailored to different skill levels and topics.",
    icon: Icon1,
    type: "text",
  },
  { image: FeatureImg1, type: "image" },
  {
    title: "Practice - Problems",
    description:
      "Access a wide range of practice problems designed to sharpen your coding skills effectively.",
    icon: Icon2,
    type: "text",
  },
  { image: FeatureImg2, type: "image" },
  {
    title: "Leaderboard Ranking",
    description:
      "Compete with peers on the leaderboard and track your progress in real-time, with daily new challenges",
    icon: Icon3,
    type: "text",
  },
  { image: FeatureImg3, type: "image" },
];

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.3,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 50 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const FeatureGrid = () => {
  return (
    <div className="flex items-center justify-center p-6 min-h-screen">
      <div className="flex flex-col w-full max-w-6xl mt-4">
        <motion.div
          initial={{ opacity: 0, y: -60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.4 }}
          className="mb-8 text-center"
        >
          <h1 className="text-5xl md:text-6xl xl:text-6xl font-bold text-white mb-2">
            Key{" "}
            <span className="text-gradient bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-yellow-300">
              Features
            </span>
          </h1>
          <div className="w-25 h-1 bg-gradient-to-r from-orange-400 to-yellow-300 mx-auto rounded-full"></div>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full bg-[#121212] p-4 sm:p-6 lg:p-10 rounded-2xl"
        >
          {features.map((itemData, idx) => (
            <motion.div key={idx} variants={item} className="w-full">
              {itemData.type === "text" ? (
                <div className="bg-black text-white rounded-2xl p-4 sm:p-6 flex flex-col justify-between shadow-md h-auto md:h-72 w-full">
                  <div className="text-3xl mb-2 border border-gray-800 w-14 h-14 flex items-center justify-center rounded-xl text-center">
                    <img src={itemData.icon} alt="IconImg" className="w-8" />
                  </div>
                  <h2 className="parkinsans-Regular text-4xl font-bold mb-2">
                    {itemData.title}
                  </h2>
                  <p className="inter-Regular text-[#7E7E7D]">
                    {itemData.description}
                  </p>
                </div>
              ) : (
                <img
                  src={itemData.image}
                  alt={`feature-${idx}`}
                  className="bg-black rounded-2xl w-full h-52 sm:h-64 md:h-72 object-cover"
                />
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default FeatureGrid;
