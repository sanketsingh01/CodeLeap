import React, { useState } from "react";
import { Plus, Minus } from "lucide-react";
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
      "Challenges are typically categorized by difficulty, topic, and type (e.g., algorithm, data structures, debugging).",
  },
  {
    question: "Can I submit my own problems?",
    answer:
      "No, therse is no option fore user to add there custom problems in the platform but, it will shown very soon!",
  },
  {
    question: "What if I get stuck?",
    answer:
      "Hints, explanations, and community discussions are available to help when you’re stuck.",
  },
];

function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => setOpenIndex(openIndex === index ? null : index);

  return (
    <section className="w-full max-w-xl mx-auto px-4 py-12 text-center mt-15">
      <h2 className="text-white text-5xl font-bold mb-6">
        Commonly Asked{" "}
        <span className="text-gradient bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-yellow-300">
          Questions
        </span>
      </h2>
      <p className="text-base text-white mb-8">
        This section addresses frequently asked questions related to coding
        challenges, guiding participants on how to tackle them effectively.
      </p>

      <div className="space-y-4 text-left">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="bg-[#F4FF54] rounded-xl px-6 py-4 transition-all duration-300"
          >
            <button
              onClick={() => toggle(index)}
              className="w-full flex justify-between items-center text-xl text-left font-semibold text-black"
            >
              <span>{faq.question}</span>
              {openIndex === index ? <Minus size={20} /> : <Plus size={20} />}
            </button>

            <AnimatePresence initial={false}>
              {openIndex === index && (
                <motion.p
                  key="content"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden mt-3 text-sm text-gray-800"
                >
                  {faq.answer}
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </section>
  );
}

export default FAQ;
