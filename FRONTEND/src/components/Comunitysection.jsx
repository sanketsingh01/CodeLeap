import React from "react";
import "../index.css";
import { FaXTwitter, FaGithub, FaDiscord, FaLinkedin } from "react-icons/fa6";
import { motion } from "motion/react";
import { Sparkles } from "lucide-react";

const socials = [
  {
    href: "https://x.com/SinghSanket78",
    icon: FaXTwitter,
    color: "hover:text-[var(--sky-500)]",
    label: "X (Twitter)",
  },
  {
    href: "https://github.com/sanketsingh01",
    icon: FaGithub,
    color: "hover:text-[var(--ink-900)]",
    label: "GitHub",
  },
  {
    href: "https://discord.gg/EbhvYvCV",
    icon: FaDiscord,
    color: "hover:text-[var(--sky-600)]",
    label: "Discord",
  },
  {
    href: "https://linkedin.com",
    icon: FaLinkedin,
    color: "hover:text-[#0a66c2]",
    label: "LinkedIn",
  },
];

const Comunitysection = () => {
  return (
    <section className="relative w-full px-4 md:px-12 xl:px-24 py-20">
      <motion.div
        initial={{ scale: 0.96, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.3 }}
        className="relative max-w-7xl mx-auto rounded-3xl overflow-hidden border border-[var(--ink-200)] shadow-[var(--shadow-soft)]"
      >
        {/* Layered gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--sky-500)] via-[var(--sky-600)] to-[var(--sky-800)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.3),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,rgba(255,255,255,0.18),transparent_60%)]" />

        {/* Floating decorations */}
        <Sparkles className="absolute top-10 right-12 w-8 h-8 text-white/50 animate-pulse" />
        <Sparkles className="absolute bottom-12 left-12 w-6 h-6 text-white/40 animate-pulse delay-300" />

        <div className="relative px-6 sm:px-10 py-20 md:py-28 text-center text-white">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            viewport={{ once: true }}
            className="inline-block text-xs uppercase tracking-[0.2em] font-semibold bg-white/15 backdrop-blur px-3 py-1.5 rounded-full mb-6"
          >
            Built with the community
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            viewport={{ once: true }}
            className="font-jakarta text-4xl sm:text-5xl md:text-7xl font-extrabold leading-tight"
          >
            Join the Codeleap
            <br />
            community
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            viewport={{ once: true }}
            className="font-inter mt-5 text-base md:text-lg text-white/90 max-w-2xl mx-auto"
          >
            Ship faster, learn together, and celebrate every PR. Follow us where
            you spend your time.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            viewport={{ once: true }}
            className="mt-10 flex flex-wrap justify-center gap-3"
          >
            {socials.map(({ href, icon: Icon, color, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className={`group inline-flex items-center gap-2 bg-white/95 text-[var(--ink-900)] px-5 py-3 rounded-full text-sm font-semibold shadow-md hover:shadow-xl hover:-translate-y-0.5 transition-all ${color}`}
              >
                <Icon className="w-5 h-5" />
                {label}
              </a>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default Comunitysection;
