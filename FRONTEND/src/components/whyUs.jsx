import React, { useRef, memo } from "react";
import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import {
  ArrowRight,
  Building2,
  Users2,
  GraduationCap,
  Sparkles,
  TrendingUp,
  CheckCircle2,
} from "lucide-react";
import "../index.css";
import { useMobile } from "./use-mobile.jsx";

const companyLogos = [
  {
    name: "Google",
    src: "https://cdn.simpleicons.org/google",
  },
  {
    name: "Meta",
    src: "https://cdn.simpleicons.org/meta",
  },
  {
    name: "Amazon",
    src: "https://cdn.simpleicons.org/amazon",
  },
  {
    name: "Microsoft",
    src: "https://cdn.simpleicons.org/microsoft",
  },
  {
    name: "Netflix",
    src: "https://cdn.simpleicons.org/netflix",
  },
  {
    name: "Apple",
    src: "https://cdn.simpleicons.org/apple",
  },
];

const MotionWrapper = memo(
  ({
    children,
    variants,
    initial,
    animate,
    transition,
    className,
    isMobile,
    ...props
  }) => {
    if (isMobile) {
      return (
        <div className={className} {...props}>
          {children}
        </div>
      );
    }
    return (
      <motion.div
        className={className}
        variants={variants}
        initial={initial}
        animate={animate}
        transition={transition}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);

const sections = [
  {
    eyebrow: "Curated Questions",
    title: "Real problems from top companies.",
    description:
      "Hand-picked questions from Google, Meta, Amazon, Apple, and 100+ companies — organised by topic, pattern, and difficulty.",
    mediaSide: "right",
    accent: "sky",
    visual: ({ accentClasses }) => (
      <div className={`w-full h-full rounded-2xl bg-white border border-[var(--ink-200)] shadow-[var(--shadow-soft)] p-6 flex flex-col`}>
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs font-semibold text-[var(--ink-500)] uppercase tracking-wider">
            Top Companies
          </span>
          <Building2 className="w-5 h-5 text-[var(--sky-500)]" />
        </div>
        <div className="grid grid-cols-2 gap-3 flex-1">
          {companyLogos.map(
            (company) => (
              <div
                key={company.name}
                className="rounded-xl border border-[var(--ink-200)] bg-[var(--surface-container-low)] px-3 py-3 flex items-center justify-center hover:border-[var(--sky-300)] transition-colors"
              >
                <img
                  src={company.src}
                  alt={`${company.name} logo`}
                  className="h-7 max-w-24 object-contain"
                  loading="lazy"
                />
              </div>
            )
          )}
        </div>
        <div className="mt-4 flex items-center gap-2 text-xs text-[var(--ink-500)]">
          <CheckCircle2 className="w-4 h-4 text-[var(--sky-500)]" />
          1,000+ tagged problems
        </div>
      </div>
    ),
  },
  {
    eyebrow: "Growing Community",
    bigNumber: "10k+",
    title: "Developers learning together every day.",
    description:
      "Join a thriving community of engineers preparing for interviews. Compare solutions, share tips, and grow faster — together.",
    cta: { label: "Join the community", to: "/signup" },
    mediaSide: "left",
    accent: "sky",
    visual: ({ accentClasses }) => (
      <div className="w-full h-full rounded-2xl bg-gradient-to-br from-[var(--sky-50)] via-white to-[var(--sky-100)]/60 border border-[var(--ink-200)] shadow-[var(--shadow-soft)] p-6 flex flex-col items-center justify-center text-center">
        <div className="relative">
          <div className="flex -space-x-3">
            {[
              "https://randomuser.me/api/portraits/women/12.jpg",
              "https://randomuser.me/api/portraits/men/22.jpg",
              "https://randomuser.me/api/portraits/women/45.jpg",
              "https://randomuser.me/api/portraits/men/65.jpg",
            ].map((src) => (
              <img
                key={src}
                src={src}
                className="w-12 h-12 rounded-full border-2 border-white shadow"
                alt="user"
              />
            ))}
            <div className="w-12 h-12 rounded-full border-2 border-white bg-[var(--sky-500)] text-white text-xs font-semibold flex items-center justify-center shadow">
              +10k
            </div>
          </div>
        </div>
        <p className="mt-5 font-jakarta text-lg font-bold text-[var(--ink-900)]">
          A community of doers
        </p>
        <p className="mt-1 text-sm text-[var(--ink-500)]">
          Streaks, leaderboards, and friendly competition.
        </p>
      </div>
    ),
  },
  {
    eyebrow: "Proven Outcomes",
    bigNumber: "92%",
    title: "of active users feel interview-ready in 30 days.",
    description:
      "Daily streaks, structured roadmaps, and an AI partner make consistent practice feel effortless and rewarding.",
    cta: { label: "Explore Problems", to: "/problems", outline: true },
    mediaSide: "right",
    accent: "sky",
    visual: ({ accentClasses }) => (
      <div className="w-full h-full rounded-2xl bg-white border border-[var(--ink-200)] shadow-[var(--shadow-soft)] p-6 flex flex-col">
        <div className="flex items-center justify-between mb-4">
          <span className="font-jakarta font-semibold text-[var(--ink-900)]">
            Your weekly progress
          </span>
          <TrendingUp className="w-5 h-5 text-emerald-500" />
        </div>
        <div className="flex h-44 items-end justify-between gap-2 mt-2">
          {[40, 65, 50, 80, 70, 90, 75].map((h, i) => (
            <div key={i} className="flex h-full flex-col items-center gap-2 flex-1">
              <div className="flex h-full w-full items-end">
                <div
                  className="w-full rounded-t-md bg-emerald-400"
                  style={{ height: `${h}%` }}
                />
              </div>
              <span className="text-[10px] text-[var(--ink-500)]">
                {["M", "T", "W", "T", "F", "S", "S"][i]}
              </span>
            </div>
          ))}
        </div>
        <div className="mt-4 grid grid-cols-3 gap-2 text-center">
          <div className="rounded-lg bg-[var(--surface-container-low)] py-2">
            <p className="font-jakarta font-bold text-[var(--ink-900)]">42</p>
            <p className="text-[10px] text-[var(--ink-500)]">Solved</p>
          </div>
          <div className="rounded-lg bg-[var(--surface-container-low)] py-2">
            <p className="font-jakarta font-bold text-[var(--ink-900)]">14d</p>
            <p className="text-[10px] text-[var(--ink-500)]">Streak</p>
          </div>
          <div className="rounded-lg bg-[var(--surface-container-low)] py-2">
            <p className="font-jakarta font-bold text-[var(--ink-900)]">Pro</p>
            <p className="text-[10px] text-[var(--ink-500)]">Tier</p>
          </div>
        </div>
      </div>
    ),
  },
];

export default function CodingJourney() {
  const isMobile = useMobile();

  const refs = [useRef(null), useRef(null), useRef(null)];
  const inViews = [
    useInView(refs[0], { once: true, margin: "-100px" }),
    useInView(refs[1], { once: true, margin: "-100px" }),
    useInView(refs[2], { once: true, margin: "-100px" }),
  ];

  const leftVariant = isMobile
    ? { hidden: { opacity: 0 }, visible: { opacity: 1 } }
    : { hidden: { opacity: 0, x: -60 }, visible: { opacity: 1, x: 0 } };
  const rightVariant = isMobile
    ? { hidden: { opacity: 0 }, visible: { opacity: 1 } }
    : { hidden: { opacity: 0, x: 60 }, visible: { opacity: 1, x: 0 } };

  return (
    <section className="w-full py-24 px-6 sm:px-10 md:px-16 lg:px-24 bg-[var(--surface)]">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, amount: 0.4 }}
          className="text-center max-w-5xl mx-auto mb-20"
        >
          <span className="inline-block text-xs uppercase tracking-[0.2em] font-semibold text-[var(--sky-600)] mb-3">
            Why Codeleap
          </span>
          <h2 className="font-jakarta text-4xl md:text-5xl lg:text-6xl font-extrabold text-[var(--ink-900)] leading-tight">
            Practice smarter,{" "}
            <span className="sky-gradient-text">land sooner.</span>
          </h2>
          <p className="font-inter mt-4 text-base md:text-lg text-[var(--ink-500)]">
            Built by engineers who have been on the other side of the table.
          </p>
        </motion.div>

        <div className="space-y-20 md:space-y-28">
          {sections.map((section, i) => {
            const Visual = section.visual;
            const mediaLeft = section.mediaSide === "left";

            return (
              <div
                key={section.title}
                ref={refs[i]}
                className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center"
              >
                <MotionWrapper
                  className={`w-full h-72 md:h-96 ${mediaLeft ? "order-1" : "order-1 md:order-2"
                    }`}
                  variants={mediaLeft ? leftVariant : rightVariant}
                  initial="hidden"
                  animate={inViews[i] ? "visible" : "hidden"}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  isMobile={isMobile}
                >
                  <Visual />
                </MotionWrapper>

                <MotionWrapper
                  className={`w-full ${mediaLeft ? "order-2" : "order-2 md:order-1"
                    }`}
                  variants={mediaLeft ? rightVariant : leftVariant}
                  initial="hidden"
                  animate={inViews[i] ? "visible" : "hidden"}
                  transition={{
                    duration: 0.6,
                    ease: "easeOut",
                    delay: isMobile ? 0 : 0.15,
                  }}
                  isMobile={isMobile}
                >
                  <p className="text-xs uppercase tracking-[0.2em] font-semibold text-[var(--sky-600)] mb-3">
                    {section.eyebrow}
                  </p>
                  {section.bigNumber && (
                    <h3 className="font-jakarta text-6xl md:text-7xl font-extrabold sky-gradient-text mb-3">
                      {section.bigNumber}
                    </h3>
                  )}
                  <h3 className="font-jakarta text-3xl md:text-4xl font-extrabold text-[var(--ink-900)] mb-4 leading-tight">
                    {section.title}
                  </h3>
                  <p className="font-inter text-base md:text-lg text-[var(--ink-500)] leading-relaxed mb-6">
                    {section.description}
                  </p>
                  {section.cta && (
                    <Link
                      to={section.cta.to}
                      className={`inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold transition-all ${section.cta.outline
                        ? "btn-ghost-sky"
                        : "btn-sky"
                        }`}
                    >
                      {section.cta.label}
                      <ArrowRight size={16} />
                    </Link>
                  )}
                </MotionWrapper>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
