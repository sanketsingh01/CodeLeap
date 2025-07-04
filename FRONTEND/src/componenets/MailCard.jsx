import React, { useState } from "react";
import "../index.css";
import { motion } from "motion/react";
import { toast } from "react-hot-toast";

const CommunityCard = () => {
  const [isSubscribed, setIsSubscribed] = useState(true);

  const handleClick = () => {
    if (isSubscribed) {
      setIsSubscribed(false);
      toast.success("Subscribed Successfully");
    } else {
      toast.error("Already Subscribed");
    }
  };

  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      transition={{ duration: 1, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.4 }}
      className="bg-[#131313] text-white px-4 py-10 md:px-10 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-6 mx-auto max-w-[90%] md:max-w-[1200px] mb-8 parkinsans-Regular"
    >
      {/* Left Text Section */}
      <div className="w-full md:w-1/2 text-center md:text-left">
        <h2 className="text-4xl md:text-6xl font-bold mb-4">
          Features and Offers!
        </h2>
        <p className="raleway-font-regular text-white text-base md:text-lg">
          Become part of our mailing list to get early access to new features,
          exclusive offers, and coding updates—delivered straight to your inbox.
        </p>
      </div>

      {/* Right Section */}
      <div className="w-full md:w-1/2 flex flex-col items-center md:items-end gap-4">
        {/* Input + Button */}
        <div className="w-full max-w-md space-y-3 sm:space-y-0 sm:flex sm:items-center sm:bg-black sm:rounded-full sm:p-1">
          <input
            type="email"
            placeholder="Email"
            className="w-full bg-black text-[#F4FF54] px-4 py-2 outline-none rounded-full sm:rounded-l-full sm:rounded-r-none"
          />
          <button
            onClick={() => {
              handleClick();
            }}
            className="w-full sm:w-auto bg-[#F4FF54] text-black font-semibold px-6 py-2 rounded-full sm:rounded-r-full sm:rounded-l-none hover:bg-[#f4ff54b9] cursor-pointer"
          >
            Subscribe
          </button>
        </div>

        {/* Avatars */}
        <div className="flex items-center gap-3 mt-2">
          <div className="flex -space-x-3">
            <img
              src="https://randomuser.me/api/portraits/women/44.jpg"
              className="w-10 h-10 md:w-12 md:h-12 rounded-full border-2 border-yellow-300"
              alt="User1"
            />
            <img
              src="https://randomuser.me/api/portraits/men/45.jpg"
              className="w-10 h-10 md:w-12 md:h-12 rounded-full border-2 border-yellow-300"
              alt="User2"
            />
            <img
              src="https://randomuser.me/api/portraits/women/46.jpg"
              className="w-10 h-10 md:w-12 md:h-12 rounded-full border-2 border-yellow-300"
              alt="User3"
            />
          </div>
          <span className="text-sm md:text-base text-gray-300 ml-2">
            1,200+ subscribers
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default CommunityCard;
