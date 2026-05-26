import React from "react";
import codeleaplogo from "./assets/codeleaplogo.webp";
import CreatorImg from "./assets/Creatorimg.webp";
import { FaXTwitter, FaGithub, FaLinkedin } from "react-icons/fa6";
import { Sparkles, Heart, Users2 } from "lucide-react";
import { motion } from "motion/react";
import akash from "./assets/akash.webp";
import mukul from "./assets/mukul.webp";
import hitesh from "./assets/hitesh.webp";
import piyush from "./assets/piyush.webp";
import tejas from "./assets/tejas.webp";
import anirudh from "./assets/anirudh.webp";
import suraj from "./assets/suraj.webp";

const mentors = [
  { name: "Hitesh Chaudhary", image: hitesh, social: { twitter: "https://x.com/Hiteshdotcom" } },
  { name: "Piyush Garg", image: piyush, social: { twitter: "https://x.com/piyushgarg_dev" } },
  { name: "Suraj Kumar Jha", image: suraj, social: { twitter: "https://x.com/sigmadev234" } },
  { name: "Anirudh Jwala", image: anirudh, social: { twitter: "https://x.com/nirudhuuu" } },
  { name: "Akash Kadlag", image: akash, social: { twitter: "https://x.com/yntpdotme" } },
  { name: "Mukul Padwal", image: mukul, social: { twitter: "https://x.com/mukulpadwal" } },
  { name: "Tejas", image: tejas, social: { twitter: "https://x.com/taashuu_" } },
];

const About = () => {
  return (
    <div className="w-full min-h-screen pt-28 pb-16">
      {/* Hero */}
      <section className="relative px-6 sm:px-10 md:px-16 lg:px-24 py-16 sky-radial-bg">
        <div className="absolute inset-0 dotted-bg opacity-40 -z-0" />
        <div className="relative max-w-5xl mx-auto text-center">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[var(--ink-200)] text-xs uppercase tracking-[0.2em] font-semibold text-[var(--sky-600)] shadow-sm"
          >
            <Sparkles className="w-3.5 h-3.5" /> About Codeleap
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-jakarta text-4xl md:text-5xl lg:text-6xl font-extrabold mt-6 leading-tight text-[var(--ink-900)]"
          >
            A product built with{" "}
            <span className="sky-gradient-text">dream, dedication & devotion</span>
            <Heart className="inline w-7 h-7 md:w-9 md:h-9 text-[var(--sky-500)] ml-2 -mt-2" />
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-inter mt-6 text-base md:text-lg text-[var(--ink-500)] max-w-3xl mx-auto"
          >
            From scratch to a polished platform in 35 days. Codeleap is a
            testament to the power of consistency, mentorship, and a community
            that believes in building together.
          </motion.p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 px-6 sm:px-10 md:px-16 lg:px-24">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[var(--sky-600)]">
              Our Story
            </span>
            <h2 className="font-jakarta text-3xl md:text-4xl font-extrabold text-[var(--ink-900)] mt-3 mb-5 leading-tight">
              Designed for developers, by developers.
            </h2>
            <div className="space-y-4 text-[var(--ink-500)] text-base md:text-lg leading-relaxed">
              <p>
                Codeleap is an intuitive, modern coding platform designed to
                help learners and developers sharpen their problem-solving
                skills through hands-on practice. Whether you're preparing for
                interviews, improving algorithmic thinking, or just love
                solving problems — Codeleap gives you the tools, the curation,
                and the community to grow.
              </p>
              <p>
                In just 35 days, an idea became a working platform used by
                students and developers at every level.
              </p>
            </div>
          </div>
          <div className="relative rounded-3xl overflow-hidden border border-[var(--ink-200)] bg-gradient-to-br from-[var(--sky-50)] to-[var(--surface-container-low)] shadow-[var(--shadow-soft)] aspect-[5/4] flex items-center justify-center">
            <div className="absolute inset-0 bg-white" />
            <img
              src={codeleaplogo}
              alt="Codeleap logo"
              className="relative w-2/3 max-w-xs object-contain"
            />
          </div>
        </div>
      </section>

      {/* Creator */}
      <section className="py-20 px-6 sm:px-10 md:px-16 lg:px-24 bg-[var(--surface-container-low)]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[var(--sky-700)]">
              Meet the Creator
            </span>
            <h2 className="font-jakarta text-3xl md:text-5xl font-extrabold text-[var(--ink-900)] mt-3 leading-tight">
              The person behind <span className="sky-gradient-text">Codeleap</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="font-jakarta text-2xl md:text-3xl font-bold text-[var(--ink-900)] mb-4">
                Sanket Singh
              </h3>
              <p className="text-base md:text-lg text-[var(--ink-500)] leading-relaxed mb-6">
                I'm Sanket Singh, a CS student currently in my second year and
                the creator of Codeleap. I'm passionate about building
                developer-first tools and learning out loud.
                <br />
                <br />
                Codeleap was born from a challenge in the Chaicode Web
                Development Cohort 1.0. Our cohort teachers and TAs were
                instrumental in making this platform what it is today.
              </p>
              <div className="flex gap-2">
                {[
                  { href: "https://x.com/SinghSanket78", Icon: FaXTwitter },
                  { href: "https://github.com/sanketsingh01", Icon: FaGithub },
                  { href: "https://www.linkedin.com/in/sanket-singh-5359732b8/", Icon: FaLinkedin },
                ].map(({ href, Icon }, i) => (
                  <a
                    key={i}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-white border border-[var(--ink-200)] text-[var(--ink-500)] hover:text-[var(--sky-600)] hover:border-[var(--sky-300)] transition-colors shadow-sm"
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>
            <div className="relative rounded-3xl overflow-hidden border border-[var(--ink-200)] shadow-[var(--shadow-soft)] aspect-[4/5]">
              <img
                src={CreatorImg}
                alt="Sanket Singh"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
            </div>
          </div>
        </div>
      </section>

      {/* Mentors */}
      <section className="py-20 px-6 sm:px-10 md:px-16 lg:px-24">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-semibold text-[var(--sky-600)]">
              <Users2 className="w-3.5 h-3.5" /> Mentors
            </span>
            <h2 className="font-jakarta text-3xl md:text-5xl font-extrabold text-[var(--ink-900)] mt-3 leading-tight">
              Mentorship that <span className="sky-gradient-text">shaped us</span>
            </h2>
            <p className="font-inter mt-4 text-base md:text-lg text-[var(--ink-500)] max-w-3xl mx-auto">
              We're deeply grateful to our mentors who guided us technically
              and supported us emotionally throughout this journey.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {mentors.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                viewport={{ once: true }}
                className="card-sky group overflow-hidden p-0"
              >
                <div className="relative h-72 overflow-hidden">
                  <img
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/70 to-transparent">
                    <h3 className="font-jakarta text-lg font-semibold text-white">
                      {member.name}
                    </h3>
                  </div>
                  <a
                    href={member.social.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute top-3 right-3 w-9 h-9 inline-flex items-center justify-center rounded-full bg-white/95 backdrop-blur text-[var(--ink-700)] opacity-0 group-hover:opacity-100 transition-all hover:text-[var(--sky-600)]"
                  >
                    <FaXTwitter className="w-4 h-4" />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>

          <p className="text-center mt-10 text-[var(--ink-500)] max-w-2xl mx-auto">
            Their wisdom and encouragement helped us stay on track and push
            through doubts.
          </p>
        </div>
      </section>
    </div>
  );
};

export default About;
