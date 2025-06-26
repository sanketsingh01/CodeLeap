import React, { useState } from "react";
import { StarIcon, ArrowLeft, ArrowRight } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

const reviews = [
  {
    text: "CodeLeap is a game-changer! The problem-solving interface is clean, fast, and makes DSA practice incredibly engaging.",
    name: "Emily Carter",
    location: "Los Angeles, CA",
  },
  {
    text: "As a college student, CodeLeap has helped me stay consistent with DSA and track my progress daily",
    name: "Yashika",
    location: "New Delhi, INDIA",
  },
  {
    text: "I love how intuitive and smooth the platform is. Submitting code and getting instant feedback makes learning efficient.",
    name: "Aarav Mehta",
    location: "Mumbai, INDIA",
  },
  {
    text: "CodeLeap has the perfect mix of features for serious learners. The clean UI, Judge0 integration, and profile section are just top-notch.",
    name: "Rohit Sharma",
    location: "Bangalore, INDIA",
  },
];

const Reviews = () => {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const handleNext = () => {
    setDirection(1);
    setIndex((prev) => (prev + 2) % reviews.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setIndex((prev) => (prev - 2 + reviews.length) % reviews.length);
  };

  const visibleReviews = [
    reviews[index % reviews.length],
    reviews[(index + 1) % reviews.length],
  ];

  return (
    <>
      <div className="bg-[#131313] text-white font-poppins flex justify-between items-center gap-24 px-6 max-w-7xl py-8 rounded-xl">
        {/* Left text */}
        <div className="flex flex-col justify-center items-start min-w-[300px] gap-4">
          <span className="text-sm">WHAT CLIENTS ARE SAYING</span>
          <h1 className="text-4xl">Clients care is our priority</h1>
          <div className="flex justify-between mt-6 gap-12">
            <ArrowLeft
              className="w-8 h-8 cursor-pointer"
              onClick={handlePrev}
            />
            <ArrowRight
              className="w-8 h-8 cursor-pointer"
              onClick={handleNext}
            />
          </div>
        </div>

        {/* Reviews Container */}
        <div className="overflow-hidden">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={index}
              initial={{ x: direction === 1 ? 300 : -300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: direction === 1 ? -300 : 300, opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 min-w-full"
            >
              {visibleReviews.map((review, idx) => (
                <div
                  key={idx}
                  className="bg-black text-white flex flex-col items-start justify-center px-8 py-2 gap-4 w-full h-[300px] rounded-2xl"
                >
                  <span className="text-2xl">"{review.text}"</span>
                  <div className="flex justify-start">
                    {[...Array(5)].map((_, i) => (
                      <StarIcon
                        key={i}
                        className="w-4 h-4 text-amber-400"
                        fill="currentColor"
                      />
                    ))}
                  </div>
                  <span className="text-sm">
                    <span className="font-semibold">{review.name}</span> /{" "}
                    {review.location}
                  </span>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </>
  );
};

export default Reviews;
