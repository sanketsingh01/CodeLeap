import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";
import { Code, Eye, EyeOff, Loader2, Lock, Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";
import google from "./assets/google.svg";

import { z } from "zod";
import AuthImagePattern from "../componenets/AuthImagePattern.jsx";
import { useAuthStore } from "../store/useAuthStore.js";

const LoginSchema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(6, "Password must be atleast of 6 characters"),
});

const LoginPage = () => {
  const navigate = useNavigate();
  const { isLoggingIn, login } = useAuthStore();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(LoginSchema),
  });

  const onSubmit = async (data) => {
    try {
      await login(data);
      // navigate("/");
    } catch (error) {
      console.error("Signup failed", error);
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-1 text-white">
      <div className="flex flex-col justify-center items-center px-6 py-12 lg:px-20">
        <div className="w-full max-w-lg space-y-10">
          <div className="text-center">
            <div className="flex flex-col items-center gap-3">
              <div className="w-14 h-14 bg-primary/20 rounded-2xl flex items-center justify-center">
                <Code className="w-7 h-7 text-[#F4FF54]" />
              </div>
              <h1 className="text-4xl font-extrabold tracking-tight">
                Welcome Back
              </h1>
              <p className="text-base text-gray-400">
                Login to your account below
              </p>
            </div>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="bg-zinc-900 p-6 rounded-2xl shadow-lg space-y-6"
          >
            <div>
              <label className="block mb-2 text-sm font-medium">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-500 w-5 h-5" />
                <input
                  type="email"
                  {...register("email")}
                  className={`w-full pl-10 py-2 bg-zinc-800 text-white rounded-lg border focus:outline-none focus:ring-2 focus:ring-[#F4FF54]/50 transition ${
                    errors.email ? "border-red-500" : "border-zinc-700"
                  }`}
                  placeholder="you@example.com"
                />
              </div>
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-500 w-5 h-5" />
                <input
                  type={showPassword ? "text" : "password"}
                  {...register("password")}
                  className={`w-full pl-10 pr-10 py-2 bg-zinc-800 text-white rounded-lg border focus:outline-none focus:ring-2 focus:ring-[#F4FF54]/50 transition ${
                    errors.password ? "border-red-500" : "border-zinc-700"
                  }`}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-zinc-500 cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-2 rounded-lg font-semibold bg-[#F4FF54] text-black hover:bg-[#F4FF54]/90 transition flex items-center justify-center gap-2 cursor-pointer"
              disabled={isLoggingIn}
            >
              {isLoggingIn ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" /> Loading...
                </>
              ) : (
                "Sign In"
              )}
            </button>

            {/* Divider */}
            <div className="relative text-center my-4">
              <span className="absolute left-0 top-1/2 w-full border-t border-zinc-700 transform -translate-y-1/2" />
              <span className="bg-zinc-900 px-2 text-sm text-gray-400 relative z-10">
                or
              </span>
            </div>

            {/* Google Sign-in */}
            <div className="flex items-center justify-center">
              <a
                href={`http://localhost:3000/api/v1/auth/google`}
                className="w-full py-2 rounded-lg font-semibold text-white bg-blue-600 hover:bg-blue-600/80 transition flex items-center justify-center gap-2 cursor-pointer"
              >
                <img
                  src={google}
                  alt="Google"
                  className="w-6 h-6 bg-white mr-2"
                />
                Continue with Google
              </a>
            </div>
          </form>

          <p className="text-center text-base text-gray-400">
            Don't have an account?{" "}
            <Link to="/signup" className="text-[#F4FF54] hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>

      {/* <AuthImagePattern
        title={"Welcome back!"}
        subtitle={
          "Sign in to continue your journey with us. Don't have an account? Create one now."
        }
      /> */}
    </div>
  );
};

export default LoginPage;
