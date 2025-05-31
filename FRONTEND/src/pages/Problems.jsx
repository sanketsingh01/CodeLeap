import React from "react";

import { useAuthStore } from "../store/useAuthStore.js";

const ProblemsPage = () => {
  const { authUser } = useAuthStore();

  return (
    <div className="min-h-screen flex flex-col items-center mt-32 px-4">
      <h1 className="text-5xl md:text-6xl font-extrabold text-white animate-fade-in">
        Hi, {authUser?.name}
        <span className="block text-[#F4FF54]">Welcome to CodeLeap 🤠</span>
      </h1>
      <p className="text-xl md:text-2xl mt-6 text-gray-300 font-medium tracking-wide animate-fade-in delay-200">
        Let's start solving the best coding problems from the top
        Originization's
      </p>
    </div>
  );
};

export default ProblemsPage;
