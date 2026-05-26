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
import { TestimonialsSection } from "@/components/testimonials-section";

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

const Reviews = () => {

  return (
    <section className="w-full py-12 overflow-hidden bg-surface-low">
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

      <div className="min-h-screen place-content-center">
        <TestimonialsSection />
      </div>

    </section>
  );
};

export default Reviews;
