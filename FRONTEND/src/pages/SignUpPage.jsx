import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";
import { Code, Eye, EyeOff, Loader2, Lock, Mail } from "lucide-react";
import { z } from "zod";
import AuthImagePattern from "../componenets/AuthImagePattern.jsx";
import { useAuthStore } from "../store/useAuthStore.js";
import google from "./assets/google.svg";

const SignUpSchema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
  name: z.string().min(3, "Name must be at least 3 characters long"),
});

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);

  const { signup, isSigninUp } = useAuthStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(SignUpSchema),
  });

  const onSubmit = async (data) => {
    try {
      await signup(data);
      console.log("SingUp data: ", data);
    } catch (error) {
      console.error("Signup failed", error);
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-1 text-white parkinsans-Regular">
      <div className="flex flex-col justify-center items-center px-6 py-12 lg:px-20">
        <div className="w-full max-w-lg space-y-10">
          <div className="text-center">
            <div className="flex flex-col items-center gap-3">
              <div className="w-14 h-14 bg-primary/20 rounded-2xl flex items-center justify-center">
                <Code className="w-7 h-7 text-[#F4FF54]" />
              </div>
              <h1 className="text-4xl font-extrabold tracking-tight">
                Welcome to Codeleap
              </h1>
            </div>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="bg-zinc-900 p-6 rounded-2xl shadow-lg space-y-6"
          >
            <div>
              <label className="block mb-2 text-sm font-medium">Name</label>
              <div className="relative">
                <Code className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-500 w-5 h-5" />
                <input
                  type="text"
                  {...register("name")}
                  className={`w-full pl-10 py-2 bg-zinc-800 text-white rounded-lg border focus:outline-none focus:ring-2 focus:ring-[#F4FF54]/50 transition ${
                    errors.name ? "border-red-500" : "border-zinc-700"
                  }`}
                  placeholder="John Doe"
                />
              </div>
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>

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
              <label className="block mb-2 text-sm font-medium">
                Set Password
              </label>
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
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-zinc-500"
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
              disabled={isSigninUp}
            >
              {isSigninUp ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" /> Loading...
                </>
              ) : (
                "Sign Up"
              )}
            </button>

            <div className="flex items-center justify-center gap-2">
              <div className="h-[1px] bg-zinc-700 w-full" />
              <span className="text-zinc-400 text-sm">or</span>
              <div className="h-[1px] bg-zinc-700 w-full" />
            </div>

            <button
              type="button"
              onClick={() =>
                (window.location.href =
                  "https://codeleap-47he.onrender.com/api/v1/auth/google")
              }
              className="w-full py-2 rounded-lg font-semibold text-white bg-blue-600 hover:bg-blue-600/80 transition flex items-center justify-center gap-2 cursor-pointer"
            >
              <img
                src={google}
                alt="Google logo"
                className="w-6 h-6 bg-white"
              />
              Continue with Google
            </button>
          </form>

          <p className="text-center text-base text-gray-400">
            Already have an account?{" "}
            <Link to="/login" className="text-[#F4FF54] hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>

      {/* <AuthImagePattern
        title={"Welcome to CodeLeap"}
        subtitle={"Create your account to explore the power of CodeLeap."}
      /> */}
    </div>
  );
};

export default SignUpPage;
