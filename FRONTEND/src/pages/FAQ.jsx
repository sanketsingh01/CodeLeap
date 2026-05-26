import React, { useState } from "react";
import { Plus, Minus, HelpCircle, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const faqs = [
  {
    question: "What are coding challenges?",
    answer:
      "Coding challenges are engaging exercises designed to enhance problem-solving and programming skills through practical applications across various levels.",
  },
  {
    question: "How are challenges categorized?",
    answer:
      "Challenges are categorized by difficulty (Easy, Medium, Hard), topic (Arrays, Trees, DP, etc.), and company tag (Google, Meta, Amazon, and more).",
  },
  {
    question: "Can I submit my own problems?",
    answer:
      "Custom problem submissions for community users are coming soon. Stay tuned — we will announce it in our newsletter.",
  },
  {
    question: "What if I get stuck?",
    answer:
      "Use the AI Coding Partner sidebar for hints, complexity analysis, and step-by-step debugging — without ever leaving the editor.",
  },
  {
    question: "Do you support multiple languages?",
    answer:
      "Yes. Our integrated IDE supports JavaScript, Python, Java, C++, Go, Rust, and more, with syntax highlighting and judge integration.",
  },
  {
    question: "Is there a free plan?",
    answer:
      "Absolutely. The Starter plan is free forever with access to 500+ public problems, the community, and basic analytics.",
  },
];

function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);
  const toggle = (index) => setOpenIndex(openIndex === index ? null : index);

  return (
    <section className="w-full pt-32 pb-24 px-6 sm:px-10 md:px-16 lg:px-24 sky-radial-bg min-h-screen">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-semibold text-[var(--sky-600)] bg-white border border-[var(--ink-200)] px-3 py-1.5 rounded-full">
            <HelpCircle className="w-3.5 h-3.5" />
            FAQ
          </span>
          <h1 className="font-jakarta text-4xl md:text-5xl lg:text-6xl font-extrabold text-[var(--ink-900)] mt-6 leading-tight">
            Frequently asked{" "}
            <span className="sky-gradient-text">questions.</span>
          </h1>
          <p className="font-inter mt-4 text-base md:text-lg text-[var(--ink-500)]">
            Everything you need to know about Codeleap. Can't find the answer?{" "}
            <a href="#" className="text-[var(--sky-600)] font-semibold hover:underline">
              Reach out to our team
            </a>
            .
          </p>
        </motion.div>

        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className={`rounded-2xl border bg-white transition-all overflow-hidden ${
                  isOpen
                    ? "border-[var(--sky-500)] shadow-[0_8px_24px_rgba(22,76,255,0.14)]"
                    : "border-[var(--ink-200)] shadow-[var(--shadow-soft)]"
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggle(index)}
                  className="w-full flex justify-between items-center px-5 sm:px-6 py-4 text-left"
                >
                  <span className="font-jakarta font-semibold text-base sm:text-lg text-[var(--ink-900)]">
                    {faq.question}
                  </span>
                  <span
                    className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                      isOpen
                        ? "bg-[var(--sky-500)] text-white"
                        : "bg-[var(--sky-50)] text-[var(--sky-600)]"
                    }`}
                  >
                    {isOpen ? <Minus size={16} /> : <Plus size={16} />}
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <p className="px-5 sm:px-6 pb-5 text-sm sm:text-base text-[var(--ink-500)] leading-relaxed">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* Contact CTA */}
        <div className="mt-12 rounded-2xl bg-gradient-to-br from-[var(--sky-500)] via-[var(--sky-600)] to-[var(--sky-800)] p-[1px] shadow-[var(--shadow-soft)]">
          <div className="rounded-[15px] bg-white px-6 py-8 sm:py-10 text-center">
            <Sparkles className="w-7 h-7 text-[var(--sky-500)] mx-auto mb-3" />
            <h3 className="font-jakarta text-2xl font-extrabold text-[var(--ink-900)] mb-2">
              Still have questions?
            </h3>
            <p className="text-[var(--ink-500)] mb-5">
              Our team typically replies within a few hours.
            </p>
            <a
              href="#"
              className="btn-sky inline-flex items-center px-6 py-2.5 rounded-full text-sm font-semibold"
            >
              Contact support
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default FAQ;
