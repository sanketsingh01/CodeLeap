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
import { FeatureSection } from "./feature-section";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};


const FeatureGrid = () => {
  return (
    <section className="w-full py-10 px-6 sm:px-10 md:px-16 lg:px-24 bg-[var(--surface-container-low)]">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, amount: 0.4 }}
          className="text-center max-w-4xl mx-auto mb-16"
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
          className="place-content-center p-4"
        >
          <FeatureSection />
        </motion.div>
      </div>
    </section>
  );
};

export default FeatureGrid;
