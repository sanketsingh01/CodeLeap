import React, { useState, useEffect } from "react";
import {
  StarIcon,
  Twitter,
  Heart,
  MessageCircle,
  Repeat2,
  CheckCircle,
} from "lucide-react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";

const reviews = [
  {
    text: "Just discovered @CodeLeap and I'm blown away! The DSA practice interface is so clean and intuitive. Finally found a platform that makes coding challenges enjoyable.",
    name: "Sarah Chen",
    username: "@sarahbuilds",
    location: "San Francisco, CA",
    avatar: "https://avatar.iran.liara.run/public/girl?username=sarah",
    likes: 127,
    retweets: 34,
    replies: 18,
    time: "2h",
    verified: true,
  },
  {
    text: "CodeLeap has completely changed how I approach DSA prep. The Judge0 integration is seamless and the instant feedback keeps me motivated. Highly recommend!",
    name: "Dev Patel",
    username: "@devpatel_codes",
    location: "Mumbai, India",
    avatar: "https://avatar.iran.liara.run/public/boy?username=dev",
    likes: 89,
    retweets: 23,
    replies: 12,
    time: "4h",
    verified: false,
  },
  {
    text: "Been using CodeLeap for 3 months now and my problem-solving skills have improved dramatically. The progress tracking feature is a game-changer!",
    name: "Alex Rodriguez",
    username: "@alexcodes",
    location: "Austin, TX",
    avatar: "https://avatar.iran.liara.run/public/boy?username=alex",
    likes: 203,
    retweets: 67,
    replies: 29,
    time: "6h",
    verified: true,
  },
  {
    text: "As a CS student, CodeLeap has been invaluable for my studies. The categorized problems and clean UI make it so much easier to focus on learning.",
    name: "Priya Sharma",
    username: "@priya_learns",
    location: "Bangalore, India",
    avatar: "https://avatar.iran.liara.run/public/girl?username=priya",
    likes: 156,
    retweets: 41,
    replies: 22,
    time: "8h",
    verified: false,
  },
  {
    text: "CodeLeap's interface is absolutely gorgeous. But more importantly, it actually helps me understand algorithms better. The combination of great UX and solid educational content is rare.",
    name: "Marcus Johnson",
    username: "@marcusbuilds",
    location: "Seattle, WA",
    avatar: "https://avatar.iran.liara.run/public/boy?username=marcus",
    likes: 94,
    retweets: 28,
    replies: 15,
    time: "12h",
    verified: true,
  },
  {
    text: "Switched from LeetCode to CodeLeap and haven't looked back. The user experience is just so much smoother. Plus the community features make learning feel less isolating.",
    name: "Emma Wilson",
    username: "@emmacodes",
    location: "Toronto, Canada",
    avatar: "https://avatar.iran.liara.run/public/girl?username=emma",
    likes: 178,
    retweets: 52,
    replies: 31,
    time: "1d",
    verified: false,
  },
];

const TwitterCard = ({ review }) => (
  <div className="bg-black/60 backdrop-blur-sm border border-gray-800/50 rounded-2xl p-6 w-[380px] flex-shrink-0 hover:bg-black/80 transition-all duration-300">
    {/* Header */}
    <div className="flex items-start gap-3 mb-4">
      <img
        src={review.avatar || "/placeholder.svg"}
        alt={review.name}
        className="w-12 h-12 rounded-full ring-2 ring-gray-700/50 flex-shrink-0"
      />
      <div className="flex-1 min-w-0 overflow-hidden">
        <div className="flex items-center gap-2 mb-1">
          <h3 className="font-semibold text-white text-base truncate">
            {review.name}
          </h3>
          {review.verified && (
            <CheckCircle
              className="w-4 h-4 text-blue-400 flex-shrink-0"
              fill="currentColor"
            />
          )}
        </div>
        <div className="flex items-center gap-2 text-sm">
          <span className="text-gray-400 truncate">{review.username}</span>
          <span className="text-gray-500">·</span>
          <span className="text-gray-500">{review.time}</span>
        </div>
        <p className="text-gray-400 text-sm truncate">{review.location}</p>
      </div>
      <Twitter className="w-5 h-5 text-blue-400 flex-shrink-0" />
    </div>

    {/* Tweet Text */}
    <div className="mb-4">
      <p className="text-white text-base leading-relaxed break-words raleway-font-regular">
        {review.text}
      </p>
    </div>

    {/* Stars */}
    <div className="flex gap-1 mb-4">
      {[...Array(5)].map((_, i) => (
        <StarIcon
          key={i}
          className="w-4 h-4 text-amber-400 flex-shrink-0"
          fill="currentColor"
        />
      ))}
    </div>

    {/* Engagement */}
    <div className="flex items-center gap-6 text-gray-400 text-sm">
      <div className="flex items-center gap-2 hover:text-blue-400 cursor-pointer transition-colors">
        <MessageCircle className="w-4 h-4 flex-shrink-0" />
        <span>{review.replies}</span>
      </div>
      <div className="flex items-center gap-2 hover:text-green-400 cursor-pointer transition-colors">
        <Repeat2 className="w-4 h-4 flex-shrink-0" />
        <span>{review.retweets}</span>
      </div>
      <div className="flex items-center gap-2 hover:text-red-400 cursor-pointer transition-colors">
        <Heart className="w-4 h-4 flex-shrink-0" />
        <span>{review.likes}</span>
      </div>
    </div>
  </div>
);

const Reviews = () => {
  const [translateX, setTranslateX] = useState(0);
  const cardWidth = 396;

  useEffect(() => {
    const interval = setInterval(() => {
      setTranslateX((prev) => prev - 0.5);
    }, 16);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const resetPoint = -(reviews.length * cardWidth);
    if (translateX <= resetPoint) {
      setTranslateX(0);
    }
  }, [translateX, cardWidth]);

  const infiniteReviews = [...reviews, ...reviews, ...reviews];

  return (
    <div className="w-full text-white py-16 overflow-hidden parkinsans-Regular">
      {/* Header */}
      <div className="text-center mb-12 px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto"
        >
          <span className="text-[#F4FF54] text-sm font-semibold tracking-wider uppercase mb-4 block">
            WHAT DEVELOPERS ARE SAYING
          </span>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Loved by developers worldwide
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Join thousands of developers who are already using CodeLeap to
            master their coding skills
          </p>
        </motion.div>
      </div>

      {/* Infinite Carousel Container */}
      <div className="relative w-full">
        {/* Scrolling Container */}
        <div className="overflow-hidden w-full">
          <div
            className="flex gap-4"
            style={{
              transform: `translateX(${translateX}px)`,
              width: "max-content",
            }}
          >
            {infiniteReviews.map((review, index) => (
              <TwitterCard
                key={`${review.username}-${index}`}
                review={review}
              />
            ))}
          </div>
        </div>

        {/* Gradient Overlays */}
        <div className="absolute left-0 top-0 w-20 h-full bg-gradient-to-r from-[#131313] to-transparent pointer-events-none z-10" />
        <div className="absolute right-0 top-0 w-20 h-full bg-gradient-to-l from-[#131313] to-transparent pointer-events-none z-10" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="text-center mt-12 px-6"
      >
        <Link className="bg-[#F4FF54] text-black font-semibold py-3 px-8 rounded-full hover:bg-opacity-90 transition-all duration-300 shadow-lg cursor-pointer">
          Start Your Journey Today
        </Link>
      </motion.div>
    </div>
  );
};

export default Reviews;
