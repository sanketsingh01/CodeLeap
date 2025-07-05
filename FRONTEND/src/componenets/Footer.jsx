import React from "react";
import { Link } from "react-router-dom";

import "../index.css";
import { FaXTwitter, FaGithub, FaDiscord, FaLinkedin } from "react-icons/fa6";
import codeleaplogo from "../assets/codeleaplogo.webp";

const Footer = () => {
  return (
    <footer className="text-white px-6 md:px-20 lg:px-36 py-12 mt-12 overflow-auto">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 raleway-font-regular">
        {/* Branding / About Section */}
        <div className="lg:col-span-2">
          <div className="flex items-center gap-2 mb-6">
            <img src={codeleaplogo} alt="Codeleap Logo" className="h-10 w-32" />
          </div>
          <p className="text-base raleway-font-regular text-[#a4a3a3]">
            Stay connected and boost your skills! We offer a wide range of
            resources to help you grow in the coding world. Don’t hesitate to
            reach out and get involved!
          </p>
        </div>

        {/* Links */}
        <div>
          <h4 className="inter-Regular font-semibold mb-3 text-xl">Links</h4>
          <ul className="space-y-2 text-base text-gray-300">
            <li>
              <Link to="/FAQ" className="hover:text-white">
                FAQs
              </Link>
            </li>
            <li>
              <Link to="/Pricing" className="hover:text-white">
                Pricing
              </Link>
            </li>
            <li>
              <Link to="/About" className="hover:text-white">
                About
              </Link>
            </li>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h4 className="inter-Regular font-semibold mb-3 text-xl">
            Resources
          </h4>
          <ul className="space-y-2 text-base text-gray-300">
            <li>
              <a href="!#" className="hover:text-white">
                Terms of Service
              </a>
            </li>
            <li>
              <a href="!#" className="hover:text-white">
                Updates
              </a>
            </li>
            <li>
              <a href="!#" className="hover:text-white">
                Blog
              </a>
            </li>
            <li>
              <a href="!#" className="hover:text-white">
                Tutorials
              </a>
            </li>
          </ul>
        </div>

        {/* Connect */}
        <div>
          <h4 className="inter-Regular font-semibold mb-3 text-xl">Connect</h4>
          <ul className="space-y-2 text-base text-gray-300">
            <li>
              <a href="!#" className="hover:text-white">
                Feedback
              </a>
            </li>
            <li>
              <a href="!#" className="hover:text-white">
                Guides
              </a>
            </li>
          </ul>
        </div>

        {/* Follow Us */}
        <div>
          <h4 className="inter-Regular font-semibold mb-3 text-xl">
            Follow Us
          </h4>
          <ul className="space-y-2 text-base text-gray-300">
            <li>
              <a
                href="https://x.com/SinghSanket78"
                target="_blank"
                className="hover:text-white"
              >
                {" "}
                X (Twitter)
              </a>
            </li>
            <li>
              <a
                href="https://discord.gg/EbhvYvCV"
                target="_blank"
                className="hover:text-white"
              >
                Discord
              </a>
            </li>
            <li>
              <a
                href="https://github.com/sanketsingh01"
                target="_blank"
                className="hover:text-white"
              >
                GitHub
              </a>
            </li>
            <li>
              <a href="#">Insights</a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="mt-12 border-t border-gray-700 pt-6 flex flex-col md:flex-row justify-between items-center text-base text-gray-400">
        <p>© Copyright 2025</p>
        <div className="flex gap-4 mt-4 md:mt-0">
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
            href="https://discord.gg/EbhvYvCV"
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
        </div>
      </div>
    </footer>
  );
};

export default Footer;
