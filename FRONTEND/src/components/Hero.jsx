import React from "react";
import "../index.css";
import { motion } from "motion/react";
import { ArrowRight, Play, Sparkles, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import { LogoCloud } from "./logo-cloud";


const Hero = () => {
  return (
    <section className="relative w-full overflow-hidden pt-32 pb-10 px-6 sm:px-10 md:px-16 lg:px-24">

      <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
        {/* pill box */}
        <div className="flex justify-center">
          <div className="rounded-lg px-4 py-1 bg-yellow-300 border-2">Built for true learners</div>
        </div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.6 }}
          className="mt-5 text-5xl sm:text-6xl md:text-7xl lg:text-[70px] font-extrabold leading-[1.05] tracking-tight text-[var(--ink-900)] max-w-5xl"
        >
          Ace your next{" "}
          <span className="sky-gradient-text animate-shine">tech interview</span>
          <br className="hidden sm:block" />
          with confidence and clarity.
        </motion.h1>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="font-inter mt-6 text-base sm:text-lg md:text-xl text-[var(--ink-500)] max-w-4xl"
        >
          Codeleap is a premium developer-productivity platform built for
          interview prep and competitive programming. Curated problem sets, a
          high-performance IDE, and an AI partner — all in one airy workspace.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.6 }}
          className="mt-10 flex flex-col sm:flex-row gap-3 items-center"
        >
          <Link
            to="/signup"
            className="btn-sky inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-base font-semibold"
          >
            Start Free
            <ArrowRight size={18} />
          </Link>
          <Link
            to="/problems"
            className="btn-ghost-sky inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-base font-semibold"
          >
            <Play size={16} className="text-[var(--sky-500)]" />
            Explore Problems
          </Link>
        </motion.div>

        {/* Micro feature list */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-[var(--ink-500)]"
        >
          {["No credit card", "Free forever plan", "1000+ problems"].map(
            (item) => (
              <span key={item} className="inline-flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[var(--sky-500)]" />
                {item}
              </span>
            )
          )}
        </motion.div>

        {/* Product mockup */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="relative mt-16 w-full max-w-6xl"
        >

          {/* IDE mockup card */}
          <div className="relative rounded-2xl bg-white border border-(--ink-200) shadow-(--hero-shadow) overflow-hidden">
            {/* Mockup top bar */}
            <div className="flex items-center gap-2 px-4 py-3 bg-[var(--surface-container-low)] border-b border-[var(--ink-200)]">
              <span className="w-3 h-3 rounded-full bg-red-400" />
              <span className="w-3 h-3 rounded-full bg-amber-400" />
              <span className="w-3 h-3 rounded-full bg-emerald-400" />
              <div className="ml-3 px-3 py-1 rounded-md bg-white border border-[var(--ink-200)] text-xs text-[var(--ink-500)] font-mono-code">
                codeleap.dev / problem / two-sum
              </div>
            </div>

            {/* Mockup body: 3-pane */}
            <div className="grid grid-cols-12 min-h-[320px] md:min-h-[420px] text-left">
              {/* Left: problem */}
              <div className="col-span-12 md:col-span-4 border-r border-[var(--ink-200)] p-5 bg-white">
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-2 py-0.5 text-[10px] font-semibold rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                    Easy
                  </span>
                  <span className="px-2 py-0.5 text-[10px] font-semibold rounded-full bg-[var(--sky-50)] text-[var(--sky-600)] border border-[var(--sky-200)]">
                    Arrays
                  </span>
                </div>
                <h3 className="font-jakarta text-lg font-bold text-[var(--ink-900)] mb-2">
                  1. Two Sum
                </h3>
                <p className="text-xs text-[var(--ink-500)] leading-relaxed">
                  Given an array of integers <code className="font-mono-code text-[var(--sky-600)]">nums</code> and an integer{" "}
                  <code className="font-mono-code text-[var(--sky-600)]">target</code>, return indices of the two numbers such that they
                  add up to target.
                </p>
                <div className="mt-4 p-3 rounded-lg bg-[var(--surface-container-low)] text-[11px] font-mono-code text-[var(--ink-700)]">
                  Input: nums = [2,7,11,15], target = 9
                  <br />
                  Output: [0,1]
                </div>
              </div>

              {/* Center: editor */}
              <div className="hidden md:block col-span-5 bg-[#0c1a2e] text-[var(--sky-100)] p-5 font-mono-code text-[12px] leading-6">
                <div className="flex items-center gap-2 mb-3 text-[11px] text-[var(--ink-400)]">
                  <span className="px-2 py-0.5 rounded bg-[var(--sky-500)]/20 text-[var(--sky-300)]">
                    JavaScript
                  </span>
                  <span>main.js</span>
                </div>
                <pre className="whitespace-pre-wrap">
                  {`function twoSum(nums, target) {
  const seen = new Map();
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (seen.has(complement)) {
      return [seen.get(complement), i];
    }
    seen.set(nums[i], i);
  }
}`}
                </pre>
                <div className="mt-4 px-2 py-1.5 rounded bg-emerald-500/10 text-emerald-300 text-[11px] inline-flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  All 23 test cases passed · 64ms
                </div>
              </div>

              {/* Right: AI panel */}
              <div className="hidden md:block col-span-3 border-l border-[var(--ink-200)] p-4 bg-[var(--surface-container-low)]">
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-7 h-7 rounded-lg bg-gradient-to-br from-[var(--sky-500)] to-[var(--sky-700)] flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-white" />
                  </span>
                  <span className="font-jakarta font-semibold text-sm text-[var(--ink-900)]">
                    Ask Codeleap
                  </span>
                </div>
                <div className="space-y-2">
                  <div className="bg-white rounded-xl px-3 py-2 text-[11px] text-[var(--ink-700)] border border-[var(--ink-200)] shadow-sm">
                    Try a hash map for O(n) lookups instead of nested loops.
                  </div>
                  <div className="bg-white rounded-xl px-3 py-2 text-[11px] text-[var(--ink-700)] border border-[var(--ink-200)] shadow-sm">
                    Time: O(n) · Space: O(n)
                  </div>
                  <div className="mt-3 px-3 py-2 rounded-full bg-white border border-[var(--ink-200)] text-[11px] text-[var(--ink-400)]">
                    Ask anything...
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Trusted by */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="mt-18 w-full max-w-4xl"
        >
          <div className="w-full">
            <h2 className="mb-5 text-center">
              <span className="block font-medium text-2xl text-muted-foreground">
                Trusted by Engineers
              </span>
              <span className="font-black text-2xl text-primary tracking-tight md:text-3xl">
                Preparing for
              </span>
            </h2>
            <div className="relative mx-auto max-w-3xl *:border-y-0">
              <div className="pointer-events-none absolute -top-px left-1/2 h-px w-screen -translate-x-1/2" />
              <LogoCloud />
              <div className="pointer-events-none absolute -bottom-px left-1/2 h-px w-screen -translate-x-1/2 " />
            </div>
          </div>

        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
