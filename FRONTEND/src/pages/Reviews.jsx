import React, { useState, useEffect } from "react";
import {
  StarIcon,
  Heart,
  MessageCircle,
  Repeat2,
  CheckCircle,
  Quote,
} from "lucide-react";
import { FaXTwitter } from "react-icons/fa6";
import { motion } from "motion/react";
import { Link } from "react-router-dom";

import SarahImg from "./assets/sarah.webp";
import devImg from "./assets/dev.webp";
import alexImg from "./assets/alex.webp";
import priyaImg from "./assets/priya.webp";
import marcusImg from "./assets/marcus.webp";
import emmaImg from "./assets/emma.webp";

const reviews = [
  {
    text: "Just discovered Codeleap and I'm blown away. The DSA practice interface is so clean and intuitive — finally a platform that makes coding challenges enjoyable.",
    name: "Sarah Chen",
    username: "@sarahbuilds",
    location: "San Francisco, CA",
    avatar: SarahImg,
    likes: 127,
    retweets: 34,
    replies: 18,
    time: "2h",
    verified: true,
  },
  {
    text: "Codeleap has completely changed how I approach DSA prep. The Judge0 integration is seamless and the instant feedback keeps me motivated.",
    name: "Dev Patel",
    username: "@devpatel_codes",
    location: "Mumbai, India",
    avatar: devImg,
    likes: 89,
    retweets: 23,
    replies: 12,
    time: "4h",
    verified: false,
  },
  {
    text: "Three months on Codeleap and my problem-solving has improved dramatically. The progress tracking is a game-changer.",
    name: "Alex Rodriguez",
    username: "@alexcodes",
    location: "Austin, TX",
    avatar: alexImg,
    likes: 203,
    retweets: 67,
    replies: 29,
    time: "6h",
    verified: true,
  },
  {
    text: "As a CS student, Codeleap has been invaluable. The categorized problems and the calm UI make it so much easier to focus.",
    name: "Priya Sharma",
    username: "@priya_learns",
    location: "Bangalore, India",
    avatar: priyaImg,
    likes: 156,
    retweets: 41,
    replies: 22,
    time: "8h",
    verified: false,
  },
  {
    text: "The interface is gorgeous. But more importantly, it actually helps me understand algorithms better.",
    name: "Marcus Johnson",
    username: "@marcusbuilds",
    location: "Seattle, WA",
    avatar: marcusImg,
    likes: 94,
    retweets: 28,
    replies: 15,
    time: "12h",
    verified: true,
  },
  {
    text: "Switched from LeetCode to Codeleap and haven't looked back. The experience is just so much smoother.",
    name: "Emma Wilson",
    username: "@emmacodes",
    location: "Toronto, Canada",
    avatar: emmaImg,
    likes: 178,
    retweets: 52,
    replies: 31,
    time: "1d",
    verified: false,
  },
];

const TweetCard = ({ review }) => (
  <div className="bg-white rounded-2xl border border-[var(--ink-200)] shadow-[var(--shadow-soft)] hover:shadow-[0_12px_32px_rgba(22,76,255,0.14)] hover:border-[var(--ink-200)] transition-all duration-300 p-6 w-[360px] flex-shrink-0">
    {/* Header */}
    <div className="flex items-start gap-3 mb-4">
      <img
        src={review.avatar || "/placeholder.svg"}
        alt={review.name}
        className="w-11 h-11 rounded-full ring-2 ring-[var(--sky-100)] flex-shrink-0 object-cover"
      />
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5">
          <h3 className="font-jakarta font-semibold text-[var(--ink-900)] text-sm truncate">
            {review.name}
          </h3>
          {review.verified && (
            <CheckCircle
              className="w-4 h-4 text-[var(--sky-500)] flex-shrink-0"
              fill="currentColor"
            />
          )}
        </div>
        <div className="flex items-center gap-1.5 text-xs">
          <span className="text-[var(--ink-500)] truncate">
            {review.username}
          </span>
          <span className="text-[var(--ink-400)]">·</span>
          <span className="text-[var(--ink-400)]">{review.time}</span>
        </div>
      </div>
      <FaXTwitter className="w-4 h-4 text-[var(--ink-400)] flex-shrink-0 mt-1" />
    </div>

    {/* Stars */}
    <div className="flex gap-0.5 mb-3">
      {[...Array(5)].map((_, i) => (
        <StarIcon
          key={i}
          className="w-4 h-4 text-amber-400"
          fill="currentColor"
        />
      ))}
    </div>

    {/* Text */}
    <p className="text-[var(--ink-700)] text-[15px] leading-relaxed font-inter mb-5">
      {review.text}
    </p>

    {/* Engagement */}
    <div className="flex items-center gap-6 text-[var(--ink-500)] text-xs pt-3 border-t border-[var(--ink-100)]">
      <div className="flex items-center gap-1.5 hover:text-[var(--sky-500)] cursor-pointer transition-colors">
        <MessageCircle className="w-4 h-4" />
        <span>{review.replies}</span>
      </div>
      <div className="flex items-center gap-1.5 hover:text-emerald-500 cursor-pointer transition-colors">
        <Repeat2 className="w-4 h-4" />
        <span>{review.retweets}</span>
      </div>
      <div className="flex items-center gap-1.5 hover:text-[var(--sky-600)] cursor-pointer transition-colors">
        <Heart className="w-4 h-4" />
        <span>{review.likes}</span>
      </div>
    </div>
  </div>
);

const Reviews = () => {
  const [translateX, setTranslateX] = useState(0);
  const cardWidth = 376;

  useEffect(() => {
    const interval = setInterval(() => {
      setTranslateX((prev) => prev - 0.5);
    }, 16);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const resetPoint = -(reviews.length * cardWidth);
    if (translateX <= resetPoint) setTranslateX(0);
  }, [translateX, cardWidth]);

  const infiniteReviews = [...reviews, ...reviews, ...reviews];

  return (
    <section className="w-full py-24 overflow-hidden bg-[var(--surface-container-low)]">
      {/* Header */}
      <div className="text-center mb-14 px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          <span className="inline-block text-xs uppercase tracking-[0.2em] font-semibold text-[var(--sky-600)] mb-3">
            Social proof
          </span>
          <h2 className="font-jakarta text-4xl md:text-5xl lg:text-6xl font-extrabold text-[var(--ink-900)] leading-tight">
            Loved by developers{" "}
            <span className="sky-gradient-text">worldwide</span>
          </h2>
          <p className="font-inter mt-4 text-base md:text-lg text-[var(--ink-500)] max-w-2xl mx-auto">
            Join thousands of engineers who are already shipping faster and
            interviewing smarter with Codeleap.
          </p>
        </motion.div>
      </div>

      {/* Carousel */}
      <div className="relative w-full">
        <div className="overflow-hidden w-full">
          <div
            className="flex gap-4 py-2 px-2"
            style={{
              transform: `translateX(${translateX}px)`,
              width: "max-content",
            }}
          >
            {infiniteReviews.map((review, index) => (
              <TweetCard
                key={`${review.username}-${index}`}
                review={review}
              />
            ))}
          </div>
        </div>

        <div className="absolute left-0 top-0 w-24 h-full bg-gradient-to-r from-[var(--surface-container-low)] to-transparent pointer-events-none z-10" />
        <div className="absolute right-0 top-0 w-24 h-full bg-gradient-to-l from-[var(--surface-container-low)] to-transparent pointer-events-none z-10" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center mt-14 px-6"
      >
        <Link
          to="/signup"
          className="btn-sky inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-base font-semibold"
        >
          Start Your Journey
        </Link>
      </motion.div>
    </section>
  );
};

export default Reviews;
