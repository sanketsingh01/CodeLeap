import React, { useRef } from "react";
import codeleaplogo from "./assets/codeleaplogo.webp";
import CreatorImg from "./assets/Creatorimg.webp";
import { FaXTwitter, FaGithub, FaLinkedin } from "react-icons/fa6";
import akash from "./assets/akash.webp";
import mukul from "./assets/mukul.webp";
import hitesh from "./assets/hitesh.webp";
import piyush from "./assets/piyush.webp";
import tejas from "./assets/tejas.webp";
import anirudh from "./assets/anirudh.webp";
import suraj from "./assets/suraj.webp";

const mentors = [
  {
    name: "Hitesh Chaudhary",
    image: hitesh,
    social: {
      twitter: "https://x.com/Hiteshdotcom",
    },
  },
  {
    name: "Piyush Garg",
    image: piyush,
    social: {
      twitter: "https://x.com/piyushgarg_dev",
    },
  },
  {
    name: "Suraj kumar Jha",
    image: suraj,
    social: {
      twitter: "https://x.com/sigmadev234",
    },
  },
  {
    name: "Anirudh Jwala",
    image: anirudh,
    social: {
      twitter: "https://x.com/nirudhuuu",
    },
  },
  {
    name: "Akash Kadlag",
    image: akash,
    social: {
      twitter: "https://x.com/yntpdotme",
    },
  },
  {
    name: "Mukul Padwal",
    image: mukul,
    social: {
      twitter: "https://x.com/mukulpadwal",
    },
  },
  {
    name: "Tejas",
    image: tejas,
    social: {
      twitter: "https://x.com/taashuu_",
    },
  },
];

const About = () => {
  const teamSectionRef = useRef(null);
  const teamMemberRefs = useRef([]);

  return (
    <div className="w-full min-h-screen text-white mt-8 parkinsans-Regular">
      <div className="relative w-full py-18 px-4 flex flex-col items-center justify-center text-center">
        <div className="relative z-10 max-w-5xl mx-auto">
          <div className="inline-block px-4 py-2 swing-ocean-gradient-animate text-black rounded-full text-base font-semibold  bg-gradient-to-r from-orange-400 to-yellow-300 tracking-wide shadow mb-6">
            ABOUT US
          </div>
          <h1 className="text-3xl sm:text-4xl text-[#F4FF54] md:text-6xl font-bold  mb-6">
            A Product Built with Dream, Dedication & Devotion <span>💖</span>
          </h1>
          <p className="text-lg max-w-4xl mx-auto">
            From struggles to triumph, CodeLeap is a testament to the power of
            dedication and determination. My journey is a testament to the
            pursuit of excellence and the unwavering pursuit of success.
          </p>
        </div>
      </div>

      {/* Our Story Section */}
      <section className="py-10 px-4 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-10">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-8">Our Story</h2>
            <p className="text-lg mb-6">
              CodeLeap is an intuitive and modern coding platform designed to
              help learners and developers sharpen their problem-solving skills
              through hands-on coding challenges. Whether you're preparing for
              technical interviews, improving algorithmic thinking, or just love
              solving problems, CodeLeap provides the tools, challenges, and
              community you need to grow.
            </p>
            <p className="text-lg">
              In just 35 days, i transformed an idea into a working platform,
              ready to use by students and developers inn terms of all levels.
            </p>
          </div>
          <div className="rounded-2xl overflow-hidden shadow-xl">
            <img
              src={codeleaplogo}
              alt="SwingKit journey"
              className="w-full h-85 object-contain bg-black"
            />
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20 px-4 max-w-6xl mx-auto">
        <h1 className="text-3xl sm:text-4xl md:text-5xl text-[#f4ff54] text-center font-bold mb-18">
          Meet with the Creator of CodeLeap 🔥
        </h1>
        <div className="grid md:grid-cols-2 gap-10">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-8">
              Sanket Singh
            </h2>
            <p className="text-lg mb-6">
              Hi, i am Sanket Singh, the creator of CodeLeap. I am a Computer
              Science student currently in my second year. I am passionate about
              coding and I am always looking for new challenges and
              opportunities to learn and grow.
              <br /> <br /> I created this platform as challenge given by Hitesh
              Sir in the Chaicode web development Cohort 1.0 . Our Cohort
              teacher and Teaching Assistant helped me a lot in creating this
              platform.
            </p>
          </div>
          <div className="relative group rounded-2xl overflow-hidden shadow-xl">
            <img
              src={CreatorImg}
              alt="SwingKit journey"
              className="w-full h-80 object-cover"
            />

            <div
              className="absolute top-4 right-4 z-20 flex flex-col gap-2 text-base md:text-2xl 
               opacity-100 md:opacity-0 md:group-hover:opacity-100 
               transition-opacity duration-300 text-black"
            >
              <a
                href="https://x.com/SinghSanket78"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white bg-opacity-20 backdrop-blur-sm p-2 rounded-full hover:bg-opacity-40 transition-all"
              >
                <FaXTwitter className="hover:text-blue-500 transition duration-300" />
              </a>
              <a
                href="https://github.com/sanketsingh01"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white bg-opacity-20 backdrop-blur-sm p-2 rounded-full hover:bg-opacity-40 transition-all"
              >
                <FaGithub className="hover:text-purple-500 transition duration-300" />
              </a>
              <a
                href="https://www.linkedin.com/in/sanket-singh-5359732b8/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white bg-opacity-20 backdrop-blur-sm p-2 rounded-full hover:bg-opacity-40 transition-all"
              >
                <FaLinkedin className="hover:text-blue-500 transition duration-300" />
              </a>
            </div>
          </div>
        </div>
      </section>

      <section ref={teamSectionRef} className={`py-15 pb-0 px-4`}>
        <div className="max-w-6xl mx-auto text-center mb-10">
          <div className="inline-block px-4 py-2 swing-ocean-gradient-animate text-black rounded-full text-base font-semibold  bg-gradient-to-r from-orange-400 to-yellow-300 tracking-wide shadow mb-6">
            Mentors
          </div>
          <h2
            className={`text-4xl sm:text-4xl md:text-5xl text-[#F4FF54] font-bold mb-4`}
          >
            Mentorship that Guided Me
          </h2>
          <p className={`text-lg max-w-3xl mx-auto mb-12`}>
            I am deeply grateful to our mentors who not only guided us
            technically but also supported me emotionally and mentally
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {mentors.map((member, index) => (
            <div
              key={member.name}
              ref={(el) => (teamMemberRefs.current[index] = el)}
              className={`rounded-xl overflow-hidden shadow-lg relative group`}
            >
              <div className="h-100 overflow-hidden relative">
                {/* Image with zoom effect */}
                <img
                  src={member.image || "/placeholder.svg"}
                  alt={member.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />

                {/* Name and title overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent z-10">
                  <h3 className="text-xl font-bold text-white">
                    {member.name}
                  </h3>
                  <p className="text-sm text-blue-300">{member.role}</p>
                </div>

                {/* Social icons that appear on hover */}
                <div className="absolute top-4 right-4 z-20 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <a
                    href={member.social.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-black text-xl bg-opacity-20 backdrop-blur-sm p-2 rounded-full hover:bg-opacity-40 transition-all"
                  >
                    <FaXTwitter className="hover:text-blue-500 transition duration-300" />
                  </a>
                </div>
              </div>

              {/* Bio text at the bottom */}
            </div>
          ))}
        </div>
        <div className="max-w-6xl mx-auto text-center my-10">
          <p className={`text-base max-w-3xl mx-auto `}>
            Their wisdom and encouragement helped me stay on track and push
            through doubts.
          </p>
        </div>
      </section>
    </div>
  );
};

export default About;
