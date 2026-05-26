import React, { useState } from "react";
import { motion } from "motion/react";
import { Check, Sparkles, ArrowRight, Zap, Users2, Crown } from "lucide-react";
import "../index.css";

const tiers = [
  {
    id: "starter",
    name: "Starter",
    description: "Everything you need to start practicing today.",
    icon: Zap,
    monthly: 0,
    yearly: 0,
    cta: "Sign up free",
    highlight: false,
    features: [
      "Access to 500+ public problems",
      "Community support",
      "Basic analytics dashboard",
      "1 private playlist",
      "Standard IDE",
    ],
  },
  {
    id: "pro",
    name: "Pro",
    description: "For developers serious about acing interviews.",
    icon: Crown,
    monthly: 19,
    yearly: 15,
    cta: "Start Pro trial",
    highlight: true,
    features: [
      "All 1,000+ premium problems",
      "AI Coding Partner (unlimited)",
      "Company-tagged problem sets",
      "Advanced analytics & heatmaps",
      "Priority email & chat support",
      "50 private playlists",
    ],
  },
  {
    id: "team",
    name: "Team",
    description: "Hiring or onboarding engineers? Codeleap scales.",
    icon: Users2,
    monthly: 49,
    yearly: 39,
    cta: "Contact sales",
    highlight: false,
    features: [
      "Everything in Pro",
      "Team dashboards & roadmaps",
      "Custom onboarding & training",
      "SSO + role-based access",
      "Dedicated success manager",
      "Unlimited private playlists",
    ],
  },
];

const Pricing = () => {
  const [billing, setBilling] = useState("monthly");

  return (
    <section className="w-full pt-32 pb-24 px-6 sm:px-10 md:px-16 lg:px-24 sky-radial-bg">
      <div className="max-w-7xl mx-auto text-center">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto"
        >
          <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-semibold text-[var(--sky-600)] bg-white border border-[var(--ink-200)] px-3 py-1.5 rounded-full">
            <Sparkles className="w-3.5 h-3.5" />
            Pricing
          </span>
          <h1 className="font-jakarta text-4xl md:text-5xl lg:text-6xl font-extrabold text-[var(--ink-900)] mt-6 leading-tight">
            Simple, transparent{" "}
            <span className="sky-gradient-text">pricing.</span>
          </h1>
          <p className="font-inter mt-4 text-base md:text-lg text-[var(--ink-500)]">
            Start free. Upgrade when you're ready. Cancel anytime — no
            questions, no friction.
          </p>
        </motion.div>

        {/* Billing toggle */}
        <div className="mt-10 inline-flex items-center bg-white border border-[var(--ink-200)] rounded-full p-1 shadow-sm">
          {[
            { id: "monthly", label: "Monthly" },
            { id: "yearly", label: "Yearly · save 20%" },
          ].map((opt) => (
            <button
              key={opt.id}
              type="button"
              onClick={() => setBilling(opt.id)}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${
                billing === opt.id
                  ? "bg-gradient-to-br from-[var(--sky-500)] to-[var(--sky-600)] text-white shadow-md"
                  : "text-[var(--ink-700)] hover:text-[var(--sky-600)]"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>

        {/* Tiered cards */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {tiers.map((tier, idx) => {
            const Icon = tier.icon;
            const price = billing === "monthly" ? tier.monthly : tier.yearly;
            return (
              <motion.div
                key={tier.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className={`relative flex flex-col text-left rounded-3xl p-7 md:p-8 transition-all ${
                  tier.highlight
                    ? "bg-white border-2 border-[var(--sky-500)] shadow-[0_20px_60px_-15px_rgba(22,76,255,0.45)] md:-translate-y-2"
                    : "bg-white border border-[var(--ink-200)] shadow-[var(--shadow-soft)] hover:border-[var(--sky-200)]"
                }`}
              >
                {/* Sky glow ring for pro */}
                {tier.highlight && (
                  <>
                    {/* decorative blue glow removed for pure white background */}
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 inline-flex items-center gap-1 px-3 py-1 text-[11px] uppercase tracking-wider font-semibold rounded-full bg-gradient-to-r from-[var(--sky-500)] to-[var(--sky-700)] text-white shadow-md">
                      <Sparkles className="w-3 h-3" /> Most Popular
                    </span>
                  </>
                )}

                <div className="flex items-center gap-3 mb-4">
                  <span
                    className={`w-11 h-11 rounded-xl flex items-center justify-center ${
                      tier.highlight
                        ? "bg-gradient-to-br from-[var(--sky-500)] to-[var(--sky-700)] text-white"
                        : "bg-[var(--sky-50)] text-[var(--sky-600)]"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </span>
                  <h3 className="font-jakarta text-2xl font-bold">
                    {tier.name}
                  </h3>
                </div>

                <p className="text-sm text-[var(--ink-500)] mb-6 min-h-[40px]">
                  {tier.description}
                </p>

                <div className="flex items-baseline gap-1 mb-6">
                  <span className="font-jakarta text-5xl md:text-6xl font-extrabold text-[var(--ink-900)]">
                    ${price}
                  </span>
                  <span className="text-[var(--ink-500)] text-sm">/month</span>
                </div>

                <button
                  className={`w-full inline-flex items-center justify-center gap-1.5 py-3 rounded-full text-sm font-semibold mb-7 transition-all ${
                    tier.highlight ? "btn-sky" : "btn-ghost-sky"
                  }`}
                >
                  {tier.cta}
                  <ArrowRight className="w-4 h-4" />
                </button>

                <ul className="space-y-3">
                  {tier.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-2.5 text-sm text-[var(--ink-700)]"
                    >
                      <span
                        className={`mt-0.5 w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 ${
                          tier.highlight
                            ? "bg-[var(--sky-500)] text-white"
                            : "bg-[var(--sky-50)] text-[var(--sky-600)]"
                        }`}
                      >
                        <Check className="w-3 h-3" strokeWidth={3} />
                      </span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>

        {/* Footer line */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mt-14 text-sm text-[var(--ink-500)]"
        >
          All plans come with a 14-day money-back guarantee. Questions?{" "}
          <a href="#" className="text-[var(--sky-600)] font-medium hover:underline">
            Contact us
          </a>
          .
        </motion.p>
      </div>
    </section>
  );
};

export default Pricing;
