import React from "react";
import {
  CheckCircle2,
  XCircle,
  Clock,
  MemoryStick as Memory,
  Activity,
  Gauge,
} from "lucide-react";

const SubmissionResults = ({ submission }) => {
  const memoryArr = JSON.parse(submission.memory || "[]");
  const timeArr = JSON.parse(submission.time || "[]");

  const avgMemory =
    memoryArr.map(parseFloat).reduce((a, b) => a + b, 0) /
    (memoryArr.length || 1);

  const avgTime =
    timeArr.map(parseFloat).reduce((a, b) => a + b, 0) /
    (timeArr.length || 1);

  const passedTests = submission.testcases.filter((tc) => tc.passed).length;
  const totalTests = submission.testcases.length;
  const successRate = (passedTests / totalTests) * 100;
  const accepted = submission.status === "Accepted";

  return (
    <div className="space-y-5 p-2">
      {/* Status banner */}
      <div
        className={`rounded-2xl border p-5 flex items-center gap-4 ${
          accepted
            ? "bg-emerald-50 border-emerald-200"
            : "bg-red-50 border-red-200"
        }`}
      >
        <div
          className={`w-12 h-12 rounded-xl flex items-center justify-center ${
            accepted
              ? "bg-emerald-500 text-white"
              : "bg-red-500 text-white"
          }`}
        >
          {accepted ? (
            <CheckCircle2 className="w-7 h-7" />
          ) : (
            <XCircle className="w-7 h-7" />
          )}
        </div>
        <div>
          <h3
            className={`font-jakarta text-xl font-bold ${
              accepted ? "text-emerald-700" : "text-red-700"
            }`}
          >
            {submission.status}
          </h3>
          <p className="text-sm text-[var(--ink-500)]">
            {passedTests} of {totalTests} test cases passed
          </p>
        </div>
      </div>

      {/* Summary stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {[
          {
            label: "Success Rate",
            value: `${successRate.toFixed(1)}%`,
            icon: Gauge,
            color: "text-[var(--sky-600)]",
            bg: "bg-[var(--sky-50)]",
          },
          {
            label: "Avg. Runtime",
            value: `${avgTime.toFixed(3)} s`,
            icon: Clock,
            color: "text-[var(--sky-700)]",
            bg: "bg-[var(--sky-50)]",
          },
          {
            label: "Avg. Memory",
            value: `${avgMemory.toFixed(0)} KB`,
            icon: Memory,
            color: "text-amber-600",
            bg: "bg-amber-50",
          },
        ].map((card, idx) => {
          const Icon = card.icon;
          return (
            <div
              key={idx}
              className="rounded-xl border border-[var(--ink-200)] bg-white p-4"
            >
              <div className="flex items-center gap-2 mb-2">
                <span
                  className={`w-7 h-7 rounded-lg ${card.bg} ${card.color} inline-flex items-center justify-center`}
                >
                  <Icon className="w-4 h-4" />
                </span>
                <p className="text-xs font-semibold text-[var(--ink-500)] uppercase tracking-wider">
                  {card.label}
                </p>
              </div>
              <p className="font-jakarta text-lg font-bold text-[var(--ink-900)]">
                {card.value}
              </p>
            </div>
          );
        })}
      </div>

      {/* Test cases table */}
      <div className="rounded-2xl border border-[var(--ink-200)] bg-white overflow-hidden">
        <div className="px-5 py-3 border-b border-[var(--ink-200)] bg-[var(--surface-container-low)] flex items-center gap-2">
          <Activity className="w-4 h-4 text-[var(--sky-600)]" />
          <h4 className="font-jakarta font-semibold text-[var(--ink-900)]">
            Test Case Results
          </h4>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-xs uppercase text-[var(--ink-500)] tracking-wider">
                <th className="text-left py-3 px-5 font-semibold">Status</th>
                <th className="text-left py-3 px-5 font-semibold">
                  Expected
                </th>
                <th className="text-left py-3 px-5 font-semibold">Output</th>
                <th className="text-left py-3 px-5 font-semibold">Memory</th>
                <th className="text-left py-3 px-5 font-semibold">Time</th>
              </tr>
            </thead>
            <tbody>
              {submission.testcases.map((tc) => (
                <tr
                  key={tc.id}
                  className="border-t border-[var(--ink-100)] hover:bg-[var(--surface-container-low)]/60 transition-colors"
                >
                  <td className="py-3 px-5">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${
                        tc.passed
                          ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                          : "bg-red-50 text-red-700 border border-red-200"
                      }`}
                    >
                      {tc.passed ? (
                        <CheckCircle2 className="w-3.5 h-3.5" />
                      ) : (
                        <XCircle className="w-3.5 h-3.5" />
                      )}
                      {tc.passed ? "Passed" : "Failed"}
                    </span>
                  </td>
                  <td className="py-3 px-5 font-mono-code text-[var(--ink-700)] whitespace-pre-wrap">
                    {tc.expected}
                  </td>
                  <td className="py-3 px-5 font-mono-code text-[var(--ink-700)] whitespace-pre-wrap">
                    {tc.stdout || "null"}
                  </td>
                  <td className="py-3 px-5 text-[var(--ink-500)]">
                    {tc.memory}
                  </td>
                  <td className="py-3 px-5 text-[var(--ink-500)]">
                    {tc.time}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SubmissionResults;
