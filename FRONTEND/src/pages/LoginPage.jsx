import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import {
  Eye,
  EyeOff,
  Loader2,
  Lock,
  Mail,
  Sparkles,
  ArrowLeft,
  CheckCircle2,
} from "lucide-react";
import google from "./assets/google.svg";
import { z } from "zod";
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
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-[var(--surface)]">
      {/* Left: Form */}
      <div className="flex flex-col px-6 sm:px-10 lg:px-16 py-10 relative">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--ink-700)] hover:text-[var(--sky-600)] transition-colors w-fit"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to home
        </Link>

        <div className="flex-1 flex items-center">
          <div className="w-full max-w-md mx-auto space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-6">
                <span className="w-10 h-10 rounded-xl bg-gradient-to-br from-[var(--sky-500)] to-[var(--sky-700)] flex items-center justify-center shadow-md shadow-sky-200">
                  <Sparkles className="w-5 h-5 text-white" />
                </span>
                <span className="font-jakarta text-xl font-extrabold">
                  <span className="text-[var(--ink-900)]">code</span>
                  <span className="sky-gradient-text">leap</span>
                </span>
              </div>
              <h1 className="font-jakarta text-3xl md:text-4xl font-extrabold text-[var(--ink-900)]">
                Welcome back.
              </h1>
              <p className="font-inter mt-2 text-[var(--ink-500)]">
                Sign in to continue your coding journey.
              </p>
            </div>

            <div className="bg-[var(--sky-50)] border border-[var(--sky-200)] rounded-xl p-3 text-xs text-[var(--ink-700)]">
              <strong className="text-[var(--sky-700)]">Note:</strong> Our
              backend is on a free Render instance. If sign-in is slow, please
              wait 3–5 minutes.
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <div>
                <label className="block mb-1.5 text-sm font-medium text-[var(--ink-700)]">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--ink-400)] w-4 h-4" />
                  <input
                    type="email"
                    {...register("email")}
                    placeholder="you@example.com"
                    className={`w-full pl-10 pr-3 py-3 bg-white text-[var(--ink-900)] rounded-xl border outline-none transition-all placeholder-[var(--ink-400)] focus:border-[var(--sky-500)] focus:shadow-[0_0_0_4px_rgba(22,76,255,0.14)] ${
                      errors.email
                        ? "border-red-300"
                        : "border-[var(--ink-200)]"
                    }`}
                  />
                </div>
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1.5">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block mb-1.5 text-sm font-medium text-[var(--ink-700)]">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--ink-400)] w-4 h-4" />
                  <input
                    type={showPassword ? "text" : "password"}
                    {...register("password")}
                    placeholder="••••••••"
                    className={`w-full pl-10 pr-10 py-3 bg-white text-[var(--ink-900)] rounded-xl border outline-none transition-all placeholder-[var(--ink-400)] focus:border-[var(--sky-500)] focus:shadow-[0_0_0_4px_rgba(22,76,255,0.14)] ${
                      errors.password
                        ? "border-red-300"
                        : "border-[var(--ink-200)]"
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--ink-400)] hover:text-[var(--sky-600)] transition-colors cursor-pointer"
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-red-500 text-xs mt-1.5">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={isLoggingIn}
                className="btn-sky w-full py-3 rounded-xl font-semibold inline-flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isLoggingIn ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" /> Signing in...
                  </>
                ) : (
                  "Sign In"
                )}
              </button>

              <div className="relative text-center">
                <span className="absolute left-0 top-1/2 w-full border-t border-[var(--ink-200)]" />
                <span className="bg-[var(--surface)] px-3 text-xs text-[var(--ink-400)] relative font-medium uppercase tracking-wider">
                  or
                </span>
              </div>

              <a
                href="https://codeleap-47he.onrender.com/api/v1/auth/google"
                className="btn-ghost-sky w-full py-3 rounded-xl font-semibold inline-flex items-center justify-center gap-2"
              >
                <img src={google} alt="Google" className="w-5 h-5" />
                Continue with Google
              </a>
            </form>

            <p className="text-center text-sm text-[var(--ink-500)]">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="text-[var(--sky-600)] font-semibold hover:underline"
              >
                Sign up free
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Right: Gradient panel with feature highlights */}
      <div className="hidden lg:flex relative items-center justify-center overflow-hidden bg-gradient-to-br from-[var(--sky-500)] via-[var(--sky-600)] to-[var(--sky-800)] p-12">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.25),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,rgba(255,255,255,0.18),transparent_60%)]" />

        <div className="relative max-w-md text-white">
          <Sparkles className="w-8 h-8 mb-6 opacity-80" />
          <h2 className="font-jakarta text-4xl font-extrabold leading-tight">
            Practice smarter, land sooner.
          </h2>
          <p className="font-inter mt-4 text-white/90 text-lg">
            Codeleap is the airy, premium workspace developers use to ace
            interviews and ship faster.
          </p>
          <ul className="mt-8 space-y-3 text-white/90">
            {[
              "1,000+ curated problems",
              "AI Coding Partner",
              "Beautiful, high-performance IDE",
              "Daily streaks & progress tracking",
            ].map((item) => (
              <li key={item} className="flex items-center gap-2.5">
                <span className="w-5 h-5 rounded-full bg-white/20 backdrop-blur flex items-center justify-center">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
