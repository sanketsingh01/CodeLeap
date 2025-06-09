import React from "react";
import {
  CheckCircle2,
  XCircle,
  Clock,
  MemoryStick as Memory,
} from "lucide-react";

const SubmissionResults = ({ submission }) => {
  const memoryArr = JSON.parse(submission.memory || "[]");
  const timeArr = JSON.parse(submission.time || "[]");

  const avgMemory =
    memoryArr.map(parseFloat).reduce((a, b) => a + b, 0) / memoryArr.length;

  const avgTime =
    timeArr.map(parseFloat).reduce((a, b) => a + b, 0) / timeArr.length;

  const passedTests = submission.testcases.filter((tc) => tc.passed).length;
  const totalTests = submission.testcases.length;
  const successRate = (passedTests / totalTests) * 100;

  return (
    <div className="space-y-8 p-4 md:p-6 max-w-7xl mx-auto">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          {
            label: "Status",
            value: submission.status,
            color:
              submission.status === "Accepted"
                ? "text-green-600"
                : "text-red-600",
          },
          {
            label: "Success Rate",
            value: `${successRate.toFixed(1)}%`,
            color: "text-blue-600",
          },
          {
            label: "Avg. Runtime",
            value: `${avgTime.toFixed(3)} s`,
            color: "text-purple-600",
            icon: <Clock className="w-4 h-4" />,
          },
          {
            label: "Avg. Memory",
            value: `${avgMemory.toFixed(0)} KB`,
            color: "text-orange-600",
            icon: <Memory className="w-4 h-4" />,
          },
        ].map((card, idx) => (
          <div
            key={idx}
            className="bg-white dark:bg-base-200 border border-gray-200 dark:border-base-300 rounded-2xl shadow-md p-5 hover:shadow-xl transition-all duration-300"
          >
            <h3 className="text-sm font-semibold text-gray-500 mb-1 flex items-center gap-2">
              {card.icon}
              {card.label}
            </h3>
            <div className={`text-xl font-bold ${card.color}`}>
              {card.value}
            </div>
          </div>
        ))}
      </div>

      {/* Test Cases Results */}
      <div className="bg-white dark:bg-base-100 rounded-2xl shadow-xl p-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
          Test Case Results
        </h2>

        <div className="overflow-x-auto">
          <table className="table w-full table-auto text-sm">
            <thead>
              <tr className="bg-base-200 text-gray-600 dark:text-gray-300">
                <th>Status</th>
                <th>Expected Output</th>
                <th>Your Output</th>
                <th>Memory</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody>
              {submission.testcases.map((testCase) => (
                <tr key={testCase.id} className="hover:bg-base-100 transition">
                  <td>
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                        testCase.passed
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {testCase.passed ? (
                        <>
                          <CheckCircle2 className="w-4 h-4" />
                          Passed
                        </>
                      ) : (
                        <>
                          <XCircle className="w-4 h-4" />
                          Failed
                        </>
                      )}
                    </span>
                  </td>
                  <td className="font-mono whitespace-pre-wrap">
                    {testCase.expected}
                  </td>
                  <td className="font-mono whitespace-pre-wrap">
                    {testCase.stdout || "null"}
                  </td>
                  <td className="text-center">{testCase.memory}</td>
                  <td className="text-center">{testCase.time}</td>
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
