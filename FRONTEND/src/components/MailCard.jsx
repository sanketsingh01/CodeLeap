import React, { useState } from "react";
import "../index.css";
import { motion } from "motion/react";
import { toast } from "react-hot-toast";
import { Mail, ArrowRight } from "lucide-react";

const CommunityCard = () => {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleClick = (e) => {
    e?.preventDefault?.();
    if (!email) {
      toast.error("Please enter your email");
      return;
    }
    if (!isSubscribed) {
      setIsSubscribed(true);
      toast.success("Subscribed successfully!");
    } else {
      toast.error("Already subscribed");
    }
  };

  return (
    <motion.div
      initial={{ scale: 0.95, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.3 }}
      className="relative max-w-6xl mx-auto mt-4 mb-20 px-4 sm:px-6"
    >
      <div className="relative rounded-3xl bg-white border border-[var(--ink-200)] shadow-[var(--shadow-soft)] overflow-hidden">
        {/* Decorative gradient strip */}
        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[var(--sky-500)] via-[var(--sky-600)] to-[var(--sky-800)]" />
        {/* decorative blue orbs removed for pure white background */}

        <div className="relative grid md:grid-cols-2 gap-8 p-8 md:p-12 lg:p-16 items-center">
          {/* Left text */}
          <div>
            <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-semibold text-[var(--sky-600)] bg-[var(--sky-50)] px-3 py-1.5 rounded-full">
              <Mail className="w-3.5 h-3.5" /> Stay in the loop
            </span>
            <h3 className="font-jakarta text-3xl md:text-4xl lg:text-5xl font-extrabold text-[var(--ink-900)] mt-4 leading-tight">
              Get product updates,
              <br />
              <span className="sky-gradient-text">in your inbox.</span>
            </h3>
            <p className="font-inter mt-4 text-[var(--ink-500)] text-base md:text-lg">
              Early access to new features, exclusive offers, and the best
              interview prep tips — delivered every other Friday.
            </p>
          </div>

          {/* Right form */}
          <div className="md:pl-8">
            <form
              onSubmit={handleClick}
              className="flex flex-col sm:flex-row gap-2 p-1.5 bg-white rounded-full border border-[var(--ink-200)] focus-within:border-[var(--sky-500)] focus-within:shadow-[0_0_0_4px_rgba(22,76,255,0.14)] transition-all"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@email.com"
                className="flex-1 bg-transparent px-5 py-3 text-[var(--ink-900)] placeholder-[var(--ink-400)] outline-none font-inter rounded-full"
              />
              <button
                type="submit"
                className="btn-sky inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-sm font-semibold"
              >
                Subscribe
                <ArrowRight size={16} />
              </button>
            </form>

            <div className="mt-4 flex items-center gap-3">
              <div className="flex -space-x-2">
                <img
                  src="https://randomuser.me/api/portraits/women/44.jpg"
                  className="w-8 h-8 rounded-full border-2 border-white"
                  alt="User1"
                />
                <img
                  src="https://randomuser.me/api/portraits/men/45.jpg"
                  className="w-8 h-8 rounded-full border-2 border-white"
                  alt="User2"
                />
                <img
                  src="https://randomuser.me/api/portraits/women/46.jpg"
                  className="w-8 h-8 rounded-full border-2 border-white"
                  alt="User3"
                />
              </div>
              <span className="text-sm text-[var(--ink-500)] font-inter">
                Join 1,200+ developers already subscribed
              </span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CommunityCard;
