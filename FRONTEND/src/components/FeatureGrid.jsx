import React from "react";
import { motion } from "framer-motion";
import {
  Code2,
  Bot,
  Trophy,
  Layers,
  Flame,
  Building2,
} from "lucide-react";
import "../index.css";

const features = [
  {
    title: "Smart Practice",
    description:
      "Curated problem sets tagged by company and difficulty so you can target exactly what's next on your interview list.",
    icon: Layers,
    accent: "from-[var(--sky-500)] to-[var(--sky-400)]",
    tagBg: "bg-[var(--sky-50)] text-[var(--sky-600)]",
    tag: "Curated",
  },
  {
    title: "AI Coding Partner",
    description:
      "Ask Codeleap for hints, complexity analysis, and step-by-step debugging — right next to your editor.",
    icon: Bot,
    accent: "from-[var(--sky-600)] to-[var(--sky-800)]",
    tagBg: "bg-[var(--sky-50)] text-[var(--sky-700)]",
    tag: "AI-powered",
  },
  {
    title: "Integrated IDE",
    description:
      "A snappy Monaco-based editor with syntax highlighting, multi-language support, and zero-config test runs.",
    icon: Code2,
    accent: "from-[var(--sky-500)] to-[var(--sky-700)]",
    tagBg: "bg-[var(--sky-50)] text-[var(--sky-600)]",
    tag: "Fast",
  },
  {
    title: "Progress Tracking",
    description:
      "Daily streaks, heatmaps, and a clear analytics dashboard that turns practice into measurable progress.",
    icon: Flame,
    accent: "from-[var(--sky-400)] to-[var(--sky-600)]",
    tagBg: "bg-[var(--sky-50)] text-[var(--sky-600)]",
    tag: "Insights",
  },
  {
    title: "Company Tagging",
    description:
      "Filter by Google, Meta, Amazon, and 100+ other companies to prep for your dream role with surgical focus.",
    icon: Building2,
    accent: "from-[var(--sky-400)] to-[var(--sky-500)]",
    tagBg: "bg-[var(--sky-50)] text-[var(--sky-600)]",
    tag: "Targeted",
  },
  {
    title: "Compete & Climb",
    description:
      "Friendly leaderboards, weekly challenges, and badges that keep practice feeling like a sport — not a chore.",
    icon: Trophy,
    accent: "from-[var(--sky-700)] to-[var(--sky-500)]",
    tagBg: "bg-[var(--sky-50)] text-[var(--sky-700)]",
    tag: "Community",
  },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const FeatureGrid = () => {
  return (
    <section className="w-full py-24 px-6 sm:px-10 md:px-16 lg:px-24 bg-[var(--surface-container-low)]">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, amount: 0.4 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-block text-xs uppercase tracking-[0.2em] font-semibold text-[var(--sky-600)] mb-3">
            Everything you need
          </span>
          <h2 className="font-jakarta text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight text-[var(--ink-900)]">
            One platform.{" "}
            <span className="sky-gradient-text">Every tool.</span>
          </h2>
          <p className="font-inter mt-4 text-base md:text-lg text-[var(--ink-500)]">
            Codeleap brings together curated practice, an AI tutor, and a
            high-performance IDE so you can focus on what matters: solving
            problems.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {features.map((f) => {
            const Icon = f.icon;
            return (
              <motion.div
                key={f.title}
                variants={item}
                whileHover={{ y: -4 }}
                className="card-sky group p-6 md:p-7 flex flex-col h-full"
              >
                <div className="flex items-center justify-between mb-5">
                  <div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-br ${f.accent} flex items-center justify-center shadow-md shadow-sky-100 group-hover:scale-105 transition-transform`}
                  >
                    <Icon className="w-6 h-6 text-white" strokeWidth={2.2} />
                  </div>
                  <span
                    className={`text-[11px] font-semibold px-2.5 py-1 rounded-full ${f.tagBg}`}
                  >
                    {f.tag}
                  </span>
                </div>
                <h3 className="font-jakarta text-xl md:text-2xl font-bold text-[var(--ink-900)] mb-2">
                  {f.title}
                </h3>
                <p className="font-inter text-sm md:text-base text-[var(--ink-500)] leading-relaxed">
                  {f.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default FeatureGrid;
