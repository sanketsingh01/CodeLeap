import React, { useEffect } from "react";
import { Loader2, Inbox } from "lucide-react";

import { useProblemStore } from "../store/useProblemStore.js";
import { useAuthStore } from "../store/useAuthStore.js";
import ProblemsTable from "../components/ProblemsTable.jsx";

const ProblemsHome = () => {
  const { authUser } = useAuthStore();
  const { getAllProblems, problems, isProblemsLoading } = useProblemStore();

  useEffect(() => {
    getAllProblems();
  }, [getAllProblems]);

  if (isProblemsLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[var(--surface)]">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="w-10 h-10 text-[var(--sky-500)] animate-spin" />
          <p className="text-[var(--ink-500)] font-medium">
            Loading problems...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full pt-28 pb-16 px-6 sm:px-10 md:px-16 lg:px-24">
      <div className="max-w-7xl mx-auto">
        <div className="text-center md:text-left mb-10">
          <span className="inline-block text-xs uppercase tracking-[0.2em] font-semibold text-[var(--sky-600)] mb-2">
            Practice Hub
          </span>
          <h1 className="font-jakarta text-4xl md:text-5xl font-extrabold text-[var(--ink-900)] leading-tight">
            Hi, {authUser?.name || "developer"}
            <span className="block sky-gradient-text">
              Welcome to Codeleap.
            </span>
          </h1>
          <p className="font-inter text-base md:text-lg text-[var(--ink-500)] mt-4 max-w-2xl">
            Curated problems from top companies. Filter by difficulty, topic,
            or company tag to start practising smarter.
          </p>
        </div>

        {problems.length > 0 ? (
          <ProblemsTable problems={problems} />
        ) : (
          <div className="text-center py-16 bg-white rounded-2xl border border-[var(--ink-200)] shadow-[var(--shadow-soft)]">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[var(--sky-50)] text-[var(--sky-500)] mb-3">
              <Inbox className="w-7 h-7" />
            </div>
            <p className="font-jakarta font-semibold text-[var(--ink-900)] mb-1">
              No problems found
            </p>
            <p className="text-[var(--ink-500)] text-sm">
              Check back soon — new problems are added every week.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProblemsHome;
