import React from "react";
import { Link } from "react-router-dom";
import { FaXTwitter, FaGithub, FaDiscord, FaLinkedin } from "react-icons/fa6";
import { Sparkles } from "lucide-react";
import "../index.css";

const linkGroups = [
  {
    title: "Product",
    links: [
      { label: "Problems", to: "/problems" },
      { label: "Sheets", to: "/playlists" },
      { label: "Pricing", to: "/Pricing" },
      { label: "FAQ", to: "/FAQ" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", to: "/About" },
      { label: "Blog", to: "#" },
      { label: "Updates", to: "#" },
      { label: "Tutorials", to: "#" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Terms of Service", to: "#" },
      { label: "Privacy", to: "#" },
      { label: "Feedback", to: "#" },
      { label: "Guides", to: "#" },
    ],
  },
];

const Footer = () => {
  return (
    <footer className="w-full border-t border-[var(--ink-200)] bg-[var(--surface-container-low)] text-[var(--ink-700)] px-6 md:px-12 lg:px-24 py-16 mt-8">
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-6 gap-8 lg:gap-12 font-inter">
        {/* Brand */}
        <div className="col-span-2 md:col-span-3">
          <Link to="/" className="flex items-center gap-2 group">
            <span className="relative w-9 h-9 rounded-xl bg-gradient-to-br from-[var(--sky-500)] to-[var(--sky-700)] flex items-center justify-center shadow-md shadow-sky-200">
              <Sparkles className="w-5 h-5 text-white" strokeWidth={2.4} />
            </span>
            <span className="font-jakarta text-xl font-extrabold tracking-tight">
              <span className="text-[var(--ink-900)]">code</span>
              <span className="sky-gradient-text">leap</span>
            </span>
          </Link>
          <p className="mt-4 text-sm md:text-base text-[var(--ink-500)] max-w-md leading-relaxed">
            A premium developer-productivity platform for interview prep and
            competitive programming. Curated problems, an AI partner, and a
            high-performance IDE — all in one airy workspace.
          </p>

          <div className="mt-6 flex items-center gap-2">
            {[
              { href: "https://x.com/SinghSanket78", icon: FaXTwitter },
              { href: "https://github.com/sanketsingh01", icon: FaGithub },
              { href: "https://discord.gg/EbhvYvCV", icon: FaDiscord },
              { href: "https://linkedin.com", icon: FaLinkedin },
            ].map(({ href, icon: Icon }, i) => (
              <a
                key={i}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 inline-flex items-center justify-center rounded-full border border-[var(--ink-200)] bg-white text-[var(--ink-500)] hover:text-[var(--sky-600)] hover:border-[var(--sky-300)] transition-colors"
              >
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>

        {linkGroups.map((group) => (
          <div key={group.title}>
            <h4 className="font-jakarta font-semibold text-[var(--ink-900)] mb-4 text-sm uppercase tracking-wider">
              {group.title}
            </h4>
            <ul className="space-y-2.5 text-sm">
              {group.links.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="text-[var(--ink-500)] hover:text-[var(--sky-600)] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="max-w-7xl mx-auto mt-12 pt-6 border-t border-[var(--ink-200)] flex flex-col md:flex-row justify-between items-center gap-3 text-sm text-[var(--ink-400)]">
        <p>© {new Date().getFullYear()} Codeleap. All rights reserved.</p>
        <p>Built with care for developers.</p>
      </div>
    </footer>
  );
};

export default Footer;
