import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import CodingImg1 from "../assets/CodingImg1.webp";
import CodingImg2 from "../assets/CodingImg2.webp";
import CodingImg3 from "../assets/CodingImg3.webp";
import FeatureImg3 from "../assets/FeatureImg3.webp";
import { ArrowUpRight } from "lucide-react";
import "../index.css";

export default function CodingJourney() {
  const section1Ref = useRef(null);
  const section2Ref = useRef(null);
  const section3Ref = useRef(null);
  const inView1 = useInView(section1Ref, { once: true, margin: "-100px" });
  const inView2 = useInView(section2Ref, { once: true, margin: "-100px" });
  const inView3 = useInView(section3Ref, { once: true, margin: "-100px" });

  const leftVariant = {
    hidden: { opacity: 0, x: -100 },
    visible: { opacity: 1, x: 0 },
  };

  const rightVariant = {
    hidden: { opacity: 0, x: 100 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <div className="text-white py-12 px-6 sm:px-6 md:px-10 xl:mx-36">
      <div className="max-w-6xl mx-auto space-y-24">
        <motion.div
          initial={{ opacity: 0, y: -60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.4 }}
          className="text-center"
        >
          <h1 className="text-5xl sm:text-5xl md:text-6xl font-bold text-white mb-2">
            Why{" "}
            <span className="text-gradient bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-yellow-300">
              Choose{" "}
            </span>
            <span className="text-gradient bg-clip-text">Us?</span>
          </h1>
          <div className="hidden md:block xl:block w-20 h-1 bg-gradient-to-r from-orange-400 to-yellow-300 mx-auto rounded-full mb-6"></div>
          <span className="inter-Regular text-xl sm:text-3xl font-semibold">
            CodeLeap exists because of some of the following Reasons : )
          </span>
        </motion.div>

        {/* Section 1 */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 gap-5 place-items-center h-auto md:h-96"
          ref={section1Ref}
        >
          <motion.div
            className="w-full md:w-[490px] h-auto md:h-90 order-1"
            variants={leftVariant}
            initial="hidden"
            animate={inView1 ? "visible" : "hidden"}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <img
              src={CodingImg1}
              alt="Feature Illustration"
              className="w-full h-full object-cover rounded-xl"
            />
          </motion.div>

          <motion.div
            className="w-full md:w-[490px] h-auto md:h-90 p-2 md:p-6 space-y-4 order-2"
            variants={rightVariant}
            initial="hidden"
            animate={inView1 ? "visible" : "hidden"}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
          >
            <p className="text-yellow-400 font-semibold mt-4">
              Curated Questions
            </p>
            <h2 className="parkinsans-Regular text-3xl md:text-6xl font-bold mt-2 mb-4 py-6">
              Questions from Top Companies
            </h2>
            <p className="text-white">
              Explore top curated questions from top companies to enhance coding
              skills and collaboration.
            </p>
          </motion.div>
        </div>

        {/* Section 2 */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 gap-5 place-items-center h-auto md:h-96"
          ref={section2Ref}
        >
          <motion.div
            className="w-full md:w-[490px] h-auto md:h-90 order-1 md:order-2"
            variants={rightVariant}
            initial="hidden"
            animate={inView2 ? "visible" : "hidden"}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
          >
            <img
              src={CodingImg2}
              alt="User Coding"
              className="w-full h-full object-cover rounded-xl"
            />
          </motion.div>

          <motion.div
            className="w-full md:w-[490px] h-auto md:h-90 p-2 md:p-6 space-y-6 order-2 md:order-1"
            variants={leftVariant}
            initial="hidden"
            animate={inView2 ? "visible" : "hidden"}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <h2 className="parkinsans-Regular text-6xl sm:text-7xl md:text-8xl font-bold md:mt-10">
              250+
            </h2>
            <p className="text-white text-base">
              Over 250+ programmers on our platform actively engaging with
              challenges.
            </p>
            <motion.button
              whileHover={{ scale: 1.15 }}
              transition={{ duration: 0.1, ease: "easeInOut" }}
              className="bg-[#F4FF54] text-black font-medium py-2 px-4 rounded-full flex items-center cursor-pointer transition-all duration-300"
            >
              Register
              <span className="bg-black rounded-full ml-2 flex items-center justify-center p-1 transition-all duration-300">
                <ArrowUpRight size={12} color="white" />
              </span>
            </motion.button>
          </motion.div>
        </div>

        {/* Section 3 */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 gap-5 place-items-center h-auto md:h-96"
          ref={section3Ref}
        >
          <motion.div
            className="w-full md:w-[490px] h-auto md:h-90 relative order-1"
            variants={leftVariant}
            initial="hidden"
            animate={inView3 ? "visible" : "hidden"}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <img
              src={CodingImg3}
              alt="Workspace"
              className="w-full h-full object-cover rounded-xl"
            />
            <img
              src={FeatureImg3}
              alt="Overlay"
              className="absolute w-full h-full object-cover rounded-xl -top-2"
            />
          </motion.div>

          <motion.div
            className="w-full md:w-[490px] h-auto md:h-90 p-2 md:p-6 space-y-6 order-2"
            variants={rightVariant}
            initial="hidden"
            animate={inView3 ? "visible" : "hidden"}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
          >
            <h2 className="parkinsans-Regular text-6xl sm:text-7xl md:text-8xl font-bold md:mt-8">
              30+
            </h2>
            <p className="text-white">
              More than 30+ challenges are currently active on the platform
              worldwide.
            </p>
            <button className="border border-white px-6 py-2 rounded-full hover:bg-white hover:text-black transition">
              See More
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
