import React, { useState, useEffect } from "react";
import { useParams, Link, useFetcher } from "react-router-dom";
import Editor from "@monaco-editor/react";
import {
  Play,
  FileText,
  MessageSquare,
  Lightbulb,
  Bookmark,
  Share2,
  BookOpen,
  Terminal,
  Code2,
} from "lucide-react";

import { useProblemStore } from "../store/useProblemStore.js";
import { useExecutionStore } from "../store/useExecutionStore.js";
import { getLanguageId } from "../lib/lang.js";
import SubmissionResults from "../componenets/Submission.jsx";

const ProblemPage = () => {
  const { id } = useParams();
  const { getProblemById, problem, isProblemLoading } = useProblemStore();
  const [code, setCode] = useState("");
  const [activeTab, setActiveTab] = useState("description");
  const [selectedLanguage, setSelectedLanguage] = useState("javascript");
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [testCases, setTestCases] = useState([]);
  const [activeTestCase, setActiveTestCase] = useState(0);

  const { executeCode, submission, isExecuting } = useExecutionStore();

  const submissionCount = 10;

  useEffect(() => {
    getProblemById(id);
  }, [id]);

  useEffect(() => {
    if (problem) {
      setCode(problem.codeSnippet?.[selectedLanguage] || "");

      setTestCases(
        problem.testcases?.map((tc) => ({
          input: tc.input,
          output: tc.output,
        })) || []
      );
    }
  }, [problem, selectedLanguage]);

  console.log("Problem: ", problem);
  const handleLanguageChange = (e) => {
    const language = e.target.value;
    setSelectedLanguage(language);
    setCode(problem.codeSnippet?.[language] || "");
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "description":
        return (
          <div className="prose max-w-none">
            <p className="text-lg mb-6">{problem.description}</p>

            {problem.examples && (
              <>
                <h3 className="text-xl font-bold mb-4">Examples:</h3>
                {Object.entries(problem.examples).map(
                  ([lang, example], idx) => (
                    <div
                      key={lang}
                      className="bg-base-200 p-6 rounded-xl mb-6 font-mono"
                    >
                      <div className="mb-4">
                        <div className="text-indigo-300 mb-2 text-base font-semibold">
                          Input:
                        </div>
                        <span className="bg-black/90 px-4 py-1 rounded-lg font-semibold text-white">
                          {example.input}
                        </span>
                      </div>
                      <div className="mb-4">
                        <div className="text-indigo-300 mb-2 text-base font-semibold">
                          Output:
                        </div>
                        <span className="bg-black/90 px-4 py-1 rounded-lg font-semibold text-white">
                          {example.output}
                        </span>
                      </div>
                      {example.explanation && (
                        <div>
                          <div className="text-emerald-300 mb-2 text-base font-semibold">
                            Explanation:
                          </div>
                          <p className="text-base-content/70 text-lg font-sem">
                            {example.explanation}
                          </p>
                        </div>
                      )}
                    </div>
                  )
                )}
              </>
            )}

            {problem.constraints && (
              <>
                <h3 className="text-xl font-bold mb-4">Constraints:</h3>
                <div className="bg-base-200 p-6 rounded-xl mb-6">
                  <span className="bg-black/90 px-4 py-1 rounded-lg font-semibold text-white text-lg">
                    {problem.constraints}
                  </span>
                </div>
              </>
            )}
          </div>
        );
      case "submissions":
        // return (
        //   <SubmissionsList
        //     submissions={submissions}
        //     isLoading={isSubmissionsLoading}
        //   />
        // );
        return (
          <div className="p-4 text-center text-base-content/70">
            No Submissions yet
          </div>
        );
      case "discussion":
        return (
          <div className="p-4 text-center text-base-content/70">
            No discussions yet
          </div>
        );
      case "hints":
        return (
          <div className="p-4">
            {problem?.hints ? (
              <div className="bg-base-200 p-6 rounded-xl">
                <span className="bg-black/90 px-4 py-1 rounded-lg font-semibold text-white text-lg">
                  {problem.hints}
                </span>
              </div>
            ) : (
              <div className="text-center text-base-content/70">
                No hints available
              </div>
            )}
          </div>
        );
      default:
        return null;
    }
  };
  const handleRunCode = (e) => {
    e.preventDefault();
    try {
      const language_id = getLanguageId(selectedLanguage);
      const stdin = problem.testcases.map((tc) => tc.input);
      const expected_outputs = problem.testcases.map((tc) => tc.output);
      executeCode(code, language_id, stdin, expected_outputs, id);
    } catch (error) {
      console.log("Error running code: ", error);
    }
  };

  if (isProblemLoading || !problem) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="min-h-screen text-white mt-20 px-6">
      <nav className="flex items-center justify-between py-4 border-b border-zinc-700">
        <div className="flex items-center gap-2">
          {/* <Link to="/" className="text-indigo-400 flex items-center gap-1">
            <Home className="w-5 h-5" /> <ChevronRight className="w-4 h-4" />
          </Link> */}
          <h1 className="text-xl font-bold">{problem.title}</h1>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsBookmarked(!isBookmarked)}
            className="btn btn-ghost"
          >
            <Bookmark
              className={`w-5 h-5 ${isBookmarked ? "text-yellow-400" : ""}`}
            />
          </button>
          <button className="btn btn-ghost">
            <Share2 className="w-5 h-5" />
          </button>
          <select
            value={selectedLanguage}
            onChange={(e) => setSelectedLanguage(e.target.value)}
            className="select select-bordered select-base w-40 bg-zinc-800 border-zinc-600 text-white"
          >
            {Object.keys(problem.codeSnippet || {}).map((lang) => (
              <option key={lang} value={lang}>
                {lang.toUpperCase()}
              </option>
            ))}
          </select>
        </div>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        {/* Problem Description Section */}
        <div className="bg-zinc-800 rounded-xl p-6 shadow-lg">
          <div className="flex gap-6 mb-4 border-b border-zinc-700 pb-2 w-full">
            {["description", "submissions", "discussion", "hints"].map(
              (tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex gap-2 items-center uppercase tracking-wide font-semibold text-sm text-center ${
                    activeTab === tab ? "text-[#F4FF54]" : "text-zinc-400"
                  }`}
                >
                  <FileText className="w-4 h-4" />
                  {tab}
                </button>
              )
            )}
          </div>

          {activeTab === "description" && (
            <div className="prose prose-invert max-w-none">
              <p>{problem.description}</p>
              {problem.examples && (
                <div className="mt-4">
                  <h3 className="text-lg frot-semibold mb-2">Examples:</h3>
                  {Object.entries(problem.examples).map(([lang, ex], idx) => (
                    <div key={idx} className="bg-zinc-700 p-4 rounded-lg mb-4">
                      <p>
                        <strong>Input:</strong> <code>{ex.input}</code>
                      </p>
                      <p>
                        <strong>Output:</strong> <code>{ex.output}</code>
                      </p>
                      {ex.explanation && (
                        <p>
                          <strong>Explanation:</strong> {ex.explanation}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              )}
              {problem.constraints && (
                <div className="mt-4">
                  <h3>Constraints:</h3>
                  <p>
                    <code>{problem.constraints}</code>
                  </p>
                </div>
              )}
            </div>
          )}

          {activeTab === "submissions" && (
            // return (
            //   <SubmissionsList
            //     submissions={submissions}
            //     isLoading={isSubmissionsLoading}
            //   />
            // );
            <div className="p-4 text-center text-base-content/70">
              No Submissions yet
            </div>
          )}

          {activeTab === "discussion" && (
            <div className="p-4 text-center text-base-content/70">
              No discussions yet
            </div>
          )}

          {activeTab === "hints" && (
            <div className="p-4">
              {problem?.hints ? (
                <div className="bg-base-200 p-6 rounded-xl">
                  <span className="bg-black/90 px-4 py-1 rounded-lg font-semibold text-white text-lg">
                    {problem.hints}
                  </span>
                </div>
              ) : (
                <div className="text-center text-base-content/70">
                  No hints available
                </div>
              )}
            </div>
          )}
        </div>

        {/* Code Editor Section */}
        <div className="bg-zinc-800 rounded-xl overflow-hidden shadow-lg">
          <div className="bg-zinc-700 px-4 py-2 flex justify-between items-center">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <Terminal className="w-5 h-5" /> Code Editor
            </h2>
            <div className="flex gap-2">
              <button
                onClick={handleRunCode}
                className="btn btn-base bg-[#F4FF54] text-black hover:bg-[#F4FF54]/80"
                disabled={isExecuting}
              >
                {isExecuting ? (
                  "Running..."
                ) : (
                  <>
                    <Play className="w-4 h-4 mr-1" />
                    Run Code
                  </>
                )}
              </button>
              <button className="btn btn-base btn-success">Submit</button>
            </div>
          </div>

          <Editor
            height="500px"
            language={selectedLanguage.toLowerCase()}
            theme="vs-dark"
            value={code}
            onChange={(value) => setCode(value || "")}
            options={{ fontSize: 18, minimap: { enabled: false } }}
          />
        </div>
      </div>

      {/* Submission Results */}
      <div className="mt-6">
        <div className="bg-zinc-800 rounded-xl p-6">
          {submission ? (
            <SubmissionResults submission={submission} />
          ) : (
            <div>
              <h3 className="text-lg font-semibold mb-4">Test Cases</h3>

              {/* Tabbed Test Cases */}
              <div className="flex gap-2 mb-4 flex-wrap">
                {testCases.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveTestCase(idx)}
                    className={`px-4 py-1 rounded-full text-sm font-medium transition-all ${
                      activeTestCase === idx
                        ? "bg-[#F4FF54] text-black"
                        : "bg-zinc-700 text-white hover:bg-zinc-600"
                    }`}
                  >
                    Test Case {idx + 1}
                  </button>
                ))}
              </div>
              <div className="bg-zinc-900 p-4 rounded-lg space-y-2 text-sm">
                <div>
                  <span className="font-semibold text-emerald-400">Input:</span>{" "}
                  <code className="text-white">
                    {testCases[activeTestCase]?.input}
                  </code>
                </div>
                <div>
                  <span className="font-semibold text-blue-400">
                    Expected Output:
                  </span>{" "}
                  <code className="text-white">
                    {testCases[activeTestCase]?.output}
                  </code>
                </div>
                {testCases[activeTestCase]?.explanation && (
                  <div>
                    <span className="font-semibold text-pink-400">
                      Explanation:
                    </span>{" "}
                    <span className="text-white">
                      {testCases[activeTestCase].explanation}
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProblemPage;
