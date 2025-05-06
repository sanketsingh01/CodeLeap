import React, { useRef } from "react";
import Comunitybg from "../assets/Comunitybg.avif";
import "../index.css";
import { FaXTwitter, FaGithub, FaDiscord, FaLinkedin } from "react-icons/fa6";
import { motion } from "motion/react";

const Comunitysection = () => {
  const ref = useRef(null);

  return (
    <div
      className="relative w-full px-2 md:px-12 xl:px-36 py-12 mt-8"
      ref={ref}
    >
      {/* Background Image with pop-out animation */}
      <motion.img
        src={Comunitybg}
        alt="Join community bg"
        className="w-full object-cover h-90 md:h-[700px] rounded-xl md:rounded-2xl xl:rounded-4xl"
        initial={{ scale: 0.8, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.4 }}
      />

      {/* Text + Icons appear after image */}
      <motion.div
        className="absolute top-2/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center w-full"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 1 }}
        viewport={{ once: true, amount: 0.4 }}
      >
        <div>
          <span className="parkinsans-font text-white text-4xl md:text-8xl font-bold">
            Join Our{" "}
          </span>
          <span className="parkinsans-font text-[#F4FF54] text-4xl md:text-8xl font-bold">
            Community
          </span>
        </div>

        {/* Social Icons */}
        <motion.div
          className="mt-8 flex justify-center gap-8 text-white text-2xl md:text-5xl"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
          viewport={{ once: true, amount: 0.4 }}
        >
          <a
            href="https://x.com/SinghSanket78"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaXTwitter className="hover:text-blue-500 transition duration-300" />
          </a>
          <a
            href="https://github.com/sanketsingh01"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGithub className="hover:text-[#F4FF54] transition duration-300" />
          </a>
          <a
            href="https://discord.gg/UCq2KhfZ"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaDiscord className="hover:text-purple-500 transition duration-300" />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedin className="hover:text-blue-500 transition duration-300" />
          </a>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Comunitysection;
