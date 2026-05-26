import React, { useState, useEffect } from "react";
import { MapPin, School, Github, Linkedin, Quote, Tag } from "lucide-react";
import { Link } from "react-router-dom";

const UserDetailsCard = ({ user }) => {
  const [userDetails, setUserDetails] = useState(() => {
    const saved = localStorage.getItem("userDetails");
    return saved ? JSON.parse(saved) : null;
  });

  const [formData, setFormData] = useState({
    location: "",
    university: "",
    github: "",
    linkedin: "",
    tags: "",
    caption: "",
  });

  const [isModalOpen, setIsModalOpen] = useState(!userDetails);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setUserDetails(formData);
    localStorage.setItem("userDetails", JSON.stringify(formData));
    setIsModalOpen(false);
  };

  return (
    <>
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
          <div className="relative bg-base-100 w-full max-w-lg rounded-2xl shadow-xl p-8">
            {/* Close Button */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-3 right-4 text-gray-400 hover:text-white text-xl"
            >
              ×
            </button>

            <h2 className="text-2xl font-bold text-[#F4FF54] mb-6 text-center">
              Complete Your Profile
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Location */}
              <div className="flex items-center bg-base-200 h-10 pl-2 rounded-lg">
                <MapPin className="text-[#F4FF54] w-5 h-5 mr-2" />
                <input
                  type="text"
                  name="location"
                  placeholder="Location"
                  value={formData.location}
                  onChange={handleChange}
                  className="w-full bg-transparent focus:outline-none text-sm"
                />
              </div>

              {/* University */}
              <div className="flex items-center bg-base-200 p-2 rounded-lg">
                <School className="text-[#F4FF54] w-5 h-5 mr-2" />
                <input
                  type="text"
                  name="university"
                  placeholder="University"
                  value={formData.university}
                  onChange={handleChange}
                  className="w-full bg-transparent focus:outline-none text-sm"
                />
              </div>

              {/* GitHub */}
              <div className="flex items-center bg-base-200 p-2 rounded-lg">
                <Github className="text-[#F4FF54] w-5 h-5 mr-2" />
                <input
                  type="text"
                  name="github"
                  placeholder="GitHub Profile"
                  value={formData.github}
                  onChange={handleChange}
                  className="w-full bg-transparent focus:outline-none text-sm"
                />
              </div>

              {/* LinkedIn */}
              <div className="flex items-center bg-base-200 p-2 rounded-lg">
                <Linkedin className="text-[#F4FF54] w-5 h-5 mr-2" />
                <input
                  type="text"
                  name="linkedin"
                  placeholder="LinkedIn Profile"
                  value={formData.linkedin}
                  onChange={handleChange}
                  className="w-full bg-transparent focus:outline-none text-sm"
                />
              </div>

              {/* Tags */}
              <div className="flex items-center bg-base-200 p-2 rounded-lg">
                <Tag className="text-[#F4FF54] w-5 h-5 mr-2" />
                <input
                  type="text"
                  name="tags"
                  placeholder="Tags (comma separated)"
                  value={formData.tags}
                  onChange={handleChange}
                  className="w-full bg-transparent focus:outline-none text-sm"
                />
              </div>

              {/* Caption */}
              <div className="flex items-center bg-base-200 p-2 rounded-lg">
                <Quote className="text-[#F4FF54] w-5 h-5 mr-2" />
                <input
                  type="text"
                  name="caption"
                  placeholder="Your coding caption..."
                  value={formData.caption}
                  onChange={handleChange}
                  className="w-full bg-transparent focus:outline-none text-sm"
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="btn bg-[#F4FF54] text-black text-lg w-full mt-4"
              >
                Save Profile
              </button>
            </form>
          </div>
        </div>
      )}

      {/* === Profile Display === */}
      {userDetails && (
        <div className="pl-6 pr-6 rounded-xl w-full max-w-md">
          <div className="text-center">
            <p className="text-sm italic mt-1 text-gray-300">
              {userDetails.caption ||
                "No matter what's the question is, the answer is Hashmap!"}
            </p>
          </div>

          <div className="mt-6 space-y-3 text-sm text-gray-300">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              <span>{userDetails.location}</span>
            </div>
            <div className="flex items-center gap-2">
              <School className="w-4 h-4" />
              <span>{userDetails.university}</span>
            </div>
            <div className="flex items-center gap-2">
              <Github className="w-4 h-4" />
              <Link
                to={userDetails.github}
                className="cursor-pointer hover:text-white"
              >
                {userDetails.github}
              </Link>
            </div>
            <div className="flex items-center gap-2">
              <Linkedin className="w-4 h-4" />
              <Link
                to={userDetails.linkedin}
                className="cursor-pointer hover:text-white"
              >
                {userDetails.linkedin}
              </Link>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mt-4">
            {userDetails.tags.split(",").map((tag, idx) => (
              <span
                key={idx}
                className="bg-gray-700 text-xs text-white px-2 py-1 rounded-full"
              >
                {tag.trim()}
              </span>
            ))}
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="btn text-green-400 bg-green-800 mt-4 rounded-md w-full"
          >
            Edit Profile
          </button>
        </div>
      )}
    </>
  );
};

export default UserDetailsCard;
