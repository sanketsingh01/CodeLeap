import React from "react";
import {
  CheckCircle2,
  XCircle,
  Clock,
  MemoryStick as Memory,
  Calendar,
} from "lucide-react";

const SubmissionList = ({ submissions, isLoading }) => {
  const safeParse = (data) => {
    try {
      return JSON.parse(data);
    } catch (error) {
      console.error("Error Parsing Data: ", data);
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
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  if (!submissions?.length) {
    return (
      <div className="text-center p-8 ">
        <div className="text-base-content/70">No Sumissions Found</div>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-zinc-700">
      <table className="table w-full text-sm text-white">
        <thead className="bg-zinc-800 text-zinc-400 uppercase text-xs">
          <tr>
            <th className="py-3 px-4">#</th>
            <th>Status</th>
            <th>Language</th>
            <th>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                Runtime
              </div>
            </th>
            <th>
              <div className="flex items-center gap-1">
                <Memory className="w-4 h-4" />
                Memory
              </div>
            </th>
            <th>
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                Date
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          {[...submissions].reverse().map((submission, index) => {
            const avgMemory = calculateAverageMemory(submission.memory);
            const avgTime = calculateAverageTime(submission.time);
            const statusColor =
              submission.status === "Accepted"
                ? "text-green-400"
                : submission.status === "Compile Error"
                ? "text-red-500"
                : "text-red-400";

            return (
              <tr
                key={submission.id}
                className="border-b border-zinc-700 hover:bg-zinc-800 transition"
              >
                <td className="py-3 px-4">{submissions.length - index}</td>
                <td className={`font-semibold ${statusColor}`}>
                  {submission.status}
                </td>
                <td>
                  <span className="bg-zinc-700 px-2 py-1 rounded text-xs">
                    {submission.language}
                  </span>
                </td>
                <td>{avgTime !== null ? `${avgTime.toFixed(0)} ms` : "N/A"}</td>
                <td>
                  {avgMemory !== null ? `${avgMemory.toFixed(1)} MB` : "N/A"}
                </td>
                <td>{new Date(submission.createdAt).toLocaleDateString()}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default SubmissionList;
