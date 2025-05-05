import React from "react";
import "../index.css";
import { FaXTwitter, FaGithub, FaDiscord, FaLinkedin } from "react-icons/fa6";
const Footer = () => {
  return (
    <footer className="text-white px-36 py-12 mt-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-6 gap-18 ">
        {/* Branding / About Section */}
        <div className="md:col-span-2">
          <div className="flex items-center gap-2 mb-6">
            <div className="h-8 w-8 bg-[#F4FF54] rounded-full mr-2"></div>
            <span className="text-xl font-bold">CodeLeap</span>
          </div>
          <p className="text-base text-[#a4a3a3]">
            Stay connected and boost your skills! We offer a wide range of
            resources to help you grow in the coding world. Don’t hesitate to
            reach out and get involved!
          </p>
        </div>

        {/* Links */}
        <div>
          <h4 className="inter-Regular font-semibold mb-3 text-2xl">Links</h4>
          <ul className="space-y-2 text-base text-gray-300">
            <li>
              <a href="#">FAQs</a>
            </li>
            <li>
              <a href="#">Support</a>
            </li>
            <li>
              <a href="#">Privacy Policy</a>
            </li>
            <li>
              <a href="#">Contact Us</a>
            </li>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h4 className="inter-Regular font-semibold mb-3 text-2xl">
            Resources
          </h4>
          <ul className="space-y-2 text-base text-gray-300">
            <li>
              <a href="#">Terms of Service</a>
            </li>
            <li>
              <a href="#">Updates</a>
            </li>
            <li>
              <a href="#">Blog</a>
            </li>
            <li>
              <a href="#">Tutorials</a>
            </li>
          </ul>
        </div>

        {/* Connect */}
        <div>
          <h4 className="inter-Regular font-semibold mb-3 text-2xl">Connect</h4>
          <ul className="space-y-2 text-base text-gray-300">
            <li>
              <a href="#">Feedback</a>
            </li>
            <li>
              <a href="#">Guides</a>
            </li>
          </ul>
        </div>

        {/* Follow Us */}
        <div>
          <h4 className="inter-Regular font-semibold mb-3 text-2xl">
            Follow Us
          </h4>
          <ul className="space-y-2 text-base text-gray-300">
            <li>
              <a href="#">X(Twitter)</a>
            </li>
            <li>
              <a href="#">Disocrd</a>
            </li>
            <li>
              <a href="#">Github</a>
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
        </div>
      </div>
    </footer>
  );
};

export default Footer;
