import React from "react";
import "../index.css";
import { motion } from "motion/react";

const CommunityCard = () => {
  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      transition={{ duration: 1, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.4 }}
      className=" bg-[#131313] text-white p-10 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-6 mx-36 mb-8"
    >
      {/* Left Text Section */}
      <div className="md:w-1/2 text-center md:text-left">
        <h2 className="inter-bold text-6xl font-bold mb-4">
          Features and Offers!
        </h2>
        <p className="inter-Regular text-white">
          Become part of our mailing list to get early access to new features,
          exclusive offers, and coding updates—delivered straight to your inbox.
        </p>
      </div>

      <div className="md:w-1/2 flex flex-col items-center md:items-end gap-4">
        {/* Input + Button */}
        <div className="flex rounded-full bg-black p-1 w-full max-w-md">
          <input
            type="email"
            placeholder="Email"
            className="bg-transparent text-[#F4FF54] px-4 py-2 outline-none w-full rounded-full"
          />
          <button className="bg-[#F4FF54] text-black font-semibold px-6 py-2 rounded-full">
            Subscribe
          </button>
        </div>

        <div className="flex items-center gap-3 mt-2">
          {/* Example avatars */}
          <div className="flex -space-x-3">
            <img
              src="https://randomuser.me/api/portraits/women/44.jpg"
              className="w-12 h-12 rounded-full border-2 border-yellow-300"
              alt="User1"
            />
            <img
              src="https://randomuser.me/api/portraits/men/45.jpg"
              className="w-12 h-12 rounded-full border-2 border-yellow-300"
              alt="User2"
            />
            <img
              src="https://randomuser.me/api/portraits/women/46.jpg"
              className="w-12 h-12 rounded-full border-2 border-yellow-300"
              alt="User3"
            />
          </div>
          <span className="ml-2 text-base text-gray-300">
            1,200+ subscribers
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default CommunityCard;
