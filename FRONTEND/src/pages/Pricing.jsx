import React, { useState } from "react";
import "../index.css";

const Pricing = () => {
  const [isAnnual, setIsAnnual] = useState(false);

  const toggleBilling = (type) => {
    setIsAnnual(type === "annual");
  };

  const prices = {
    free: "$0",
    pro: "$39",
    enterprise: "$249",
  };

  const features = {
    free: [
      "✓ Access to public code snippets",
      "✓ Community support",
      "✓ 1 private project",
      "✓ Basic analytics dashboard",
    ],
    pro: [
      "✓ 1M API calls/year",
      "✓ Priority email & chat support",
      "✓ 50 private projects",
      "✓ Team collaboration tools",
    ],
    enterprise: [
      "✓ Unlimited API calls",
      "✓ Dedicated success manager",
      "✓ Unlimited private projects",
      "✓ Custom onboarding & training",
    ],
  };

  return (
    <div className="w-full max-w-7xl mx-auto text-center px-4 sm:px-6 mb-8 md:mb-12 lg:mb-16 mt-30 text-white">
      <h1 className="inter-bold text-4xl md:text-6xl font-bold mb-5">
        Pricing
      </h1>
      <span className="inter-Regular text-lg md:text-xl">
        Get started with a CodeLeap Subscription that works for you.
      </span>

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 w-full max-w-7xl mx-auto px-4 sm:px-6 mb-12 sm:mb-16 mt-8">
        {/* Free Plan */}
        <div className="border border-gray-200 rounded-lg p-6 sm:p-8 flex flex-col bg-gradient-to-r from-orange-400 to-yellow-300 tracking-wide shadow">
          <h2 className="inter-bold text-2xl sm:text-4xl font-bold mb-1">
            Free
          </h2>
          <p className="inter-Regular text-gray-600 mb-4 sm:mb-6">
            For individual coders
          </p>
          <div className="flex items-end mb-4 sm:mb-6">
            <span className="text-4xl sm:text-5xl md:text-6xl font-bold">
              {prices.free}
            </span>
            <span className="mb-1 ml-1">/month</span>
          </div>
          <ul className="inter-Regular space-y-3 sm:space-y-4 mb-6 sm:mb-8 flex-grow text-base sm:text-xl">
            {features.free.map((point, index) => (
              <li key={index} className="flex items-start">
                {point}
              </li>
            ))}
          </ul>
          <button className="w-full bg-black text-white py-3 sm:py-4 font-medium rounded-md uppercase text-sm cursor-pointer">
            Sign up free
          </button>
        </div>

        {/* Pro Plan */}
        <div className="border border-gray-200 rounded-lg p-6 sm:p-8 flex flex-col text-white bg-gradient-to-r from-orange-400 to-yellow-300 tracking-wide shadow">
          <h2 className="inter-bold text-2xl sm:text-4xl font-bold mb-1">
            Pro
          </h2>
          <p className="inter-Regular text-gray-600 mb-4 sm:mb-6">
            For growing developers
          </p>
          <div className="flex items-end mb-4 sm:mb-6">
            <span className="text-4xl sm:text-5xl md:text-6xl font-bold text-[#F4FF54]">
              {prices.pro}
            </span>
            <span className="mb-1 ml-1" style={{ color: "#F4FF54" }}>
              /month
            </span>
          </div>
          <ul className="inter-Regular space-y-3 sm:space-y-4 mb-6 sm:mb-8 flex-grow text-base sm:text-xl">
            {features.pro.map((point, index) => (
              <li key={index} className="flex items-start">
                {point}
              </li>
            ))}
          </ul>
          <button className="w-full text-black py-3 sm:py-4 font-medium rounded-md uppercase text-sm bg-[#F4FF54] cursor-pointer">
            Start Now
          </button>
        </div>

        {/* Enterprise Plan */}
        <div className="border border-gray-200 rounded-lg p-6 sm:p-8 flex flex-col bg-gradient-to-r from-orange-400 to-yellow-300 tracking-wide shadow">
          <h2 className="inter-bold text-2xl sm:text-4xl font-bold mb-1">
            Enterprise
          </h2>
          <p className="inter-Regular text-gray-600 mb-4 sm:mb-6">
            For organizations
          </p>
          <div className="flex items-end mb-4 sm:mb-6">
            <span className="text-4xl sm:text-5xl md:text-6xl font-bold">
              {prices.enterprise}
            </span>
            <span className="mb-1 ml-1">/month</span>
          </div>
          <ul className="inter-Regular space-y-3 sm:space-y-4 mb-6 sm:mb-8 flex-grow text-base sm:text-xl">
            {features.enterprise.map((point, index) => (
              <li key={index} className="flex items-start">
                {point}
              </li>
            ))}
          </ul>
          <button className="w-full bg-black text-white py-3 sm:py-4 font-medium rounded-md uppercase text-sm cursor-pointer">
            Contact sales
          </button>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
