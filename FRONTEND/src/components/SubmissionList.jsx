import React from "react";
import {
  Clock,
  MemoryStick as Memory,
  Calendar,
  Inbox,
  CheckCircle2,
  XCircle,
} from "lucide-react";

const SubmissionList = ({ submissions, isLoading }) => {
  const safeParse = (data) => {
    try {
      return JSON.parse(data);
    } catch (error) {
      return [];
    }
  };

  const calculateAverageMemory = (memoryData) => {
    const memoryArray = safeParse(memoryData).map((m) =>
      parseFloat(m.split(" ")[0])
    );
    if (memoryArray.length === 0) return 0;
    return (
      memoryArray.reduce((acc, curr) => acc + curr, 0) / memoryArray.length
    );
  };

  const calculateAverageTime = (timeData) => {
    const timeArray = safeParse(timeData).map((t) =>
      parseFloat(t.split(" ")[0])
    );
    if (timeArray.length === 0) return 0;
    return timeArray.reduce((acc, curr) => acc + curr, 0) / timeArray.length;
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="w-8 h-8 border-2 border-[var(--sky-500)] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!submissions?.length) {
    return (
      <div className="flex flex-col items-center justify-center py-14 text-center">
        <div className="p-4 bg-[var(--sky-50)] rounded-2xl mb-4 border border-[var(--sky-200)]">
          <Inbox className="w-8 h-8 text-[var(--sky-500)]" />
        </div>
        <h3 className="font-jakarta text-lg font-semibold text-[var(--ink-900)] mb-1">
          No submissions yet
        </h3>
        <p className="text-sm text-[var(--ink-500)]">
          Submit your code to see your history here.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-2xl border border-[var(--ink-200)] bg-white">
      <table className="w-full text-sm">
        <thead>
          <tr className="text-xs uppercase tracking-wider text-[var(--ink-500)] bg-[var(--surface-container-low)]">
            <th className="py-3 px-4 text-left font-semibold">#</th>
            <th className="py-3 px-4 text-left font-semibold">Status</th>
            <th className="py-3 px-4 text-left font-semibold">Language</th>
            <th className="py-3 px-4 text-left font-semibold">
              <span className="inline-flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                Runtime
              </span>
            </th>
            <th className="py-3 px-4 text-left font-semibold">
              <span className="inline-flex items-center gap-1.5">
                <Memory className="w-3.5 h-3.5" />
                Memory
              </span>
            </th>
            <th className="py-3 px-4 text-left font-semibold">
              <span className="inline-flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                Date
              </span>
            </th>
          </tr>
        </thead>
        <tbody>
          {[...submissions].reverse().map((s, idx) => {
            const avgMemory = calculateAverageMemory(s.memory);
            const avgTime = calculateAverageTime(s.time);
            const accepted = s.status === "Accepted";

            return (
              <tr
                key={s.id}
                className="border-t border-[var(--ink-100)] hover:bg-[var(--surface-container-low)]/60 transition-colors"
              >
                <td className="py-3 px-4 text-[var(--ink-500)] font-mono-code">
                  {submissions.length - idx}
                </td>
                <td className="py-3 px-4">
                  <span
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${
                      accepted
                        ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                        : "bg-red-50 text-red-700 border border-red-200"
                    }`}
                  >
                    {accepted ? (
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    ) : (
                      <XCircle className="w-3.5 h-3.5" />
                    )}
                    {s.status}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <span className="bg-[var(--sky-50)] text-[var(--sky-700)] px-2 py-1 rounded-md text-xs font-medium border border-[var(--sky-200)]">
                    {s.language}
                  </span>
                </td>
                <td className="py-3 px-4 text-[var(--ink-700)] font-mono-code">
                  {avgTime ? `${avgTime.toFixed(0)} ms` : "N/A"}
                </td>
                <td className="py-3 px-4 text-[var(--ink-700)] font-mono-code">
                  {avgMemory ? `${avgMemory.toFixed(1)} MB` : "N/A"}
                </td>
                <td className="py-3 px-4 text-[var(--ink-500)]">
                  {new Date(s.createdAt).toLocaleDateString()}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default SubmissionList;
