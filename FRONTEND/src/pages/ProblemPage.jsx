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
  BugPlayIcon,
} from "lucide-react";
import { RemoveScrollBar } from "react-remove-scroll-bar";

import { useProblemStore } from "../store/useProblemStore.js";
import { useExecutionStore } from "../store/useExecutionStore.js";
import { getLanguageId } from "../lib/lang.js";
import { useSubmissionStore } from "../store/useSubmissionStore.js";
import SubmissionResults from "../componenets/Submission.jsx";
import SubmissionList from "../componenets/SubmissionList.jsx";

const ProblemPage = () => {
  const { id } = useParams();
  const { getProblemById, problem, isProblemLoading } = useProblemStore();
  const {
    submission: submissions,
    isLoading: isSubmissionsLoading,
    getSubmissionForProblem,
    getSubmissionCountForProblem,
    submissionCount,
  } = useSubmissionStore();
  const [code, setCode] = useState("");
  const [activeTab, setActiveTab] = useState("description");
  const [selectedLanguage, setSelectedLanguage] = useState("JAVASCRIPT");
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [testCases, setTestCases] = useState([]);
  const [activeTestCase, setActiveTestCase] = useState(0);
  const [activeResultTab, setActiveResultTab] = useState("testcases");

  const { executeCode, submission, isExecuting, clearSubmission } =
    useExecutionStore();

  useEffect(() => {
    getProblemById(id);
    getSubmissionCountForProblem(id);
  }, [id]);

  // Initialize code when problem loads or language changes
  useEffect(() => {
    if (problem) {
      // Set default language to JAVASCRIPT if it exists in codeSnippet
      const availableLanguages = Object.keys(problem.codeSnippet || {});
      const defaultLanguage = availableLanguages.includes("JAVASCRIPT")
        ? "JAVASCRIPT"
        : availableLanguages[0] || "JAVASCRIPT";

      // Only update selectedLanguage if it's the initial load (when code is empty)
      if (
        !code &&
        selectedLanguage === "JAVASCRIPT" &&
        !availableLanguages.includes("JAVASCRIPT")
      ) {
        setSelectedLanguage(defaultLanguage);
      }

      // Set the code for the current language
      const currentCode = problem.codeSnippet?.[selectedLanguage] || "";
      setCode(currentCode);

      setTestCases(
        problem.testcases?.map((tc) => ({
          input: tc.input,
          output: tc.output,
        })) || []
      );
    }
  }, [problem, selectedLanguage]);

  // Separate useEffect to handle initial language setup
  useEffect(() => {
    if (problem && !code) {
      const availableLanguages = Object.keys(problem.codeSnippet || {});
      if (availableLanguages.includes("JAVASCRIPT")) {
        setSelectedLanguage("JAVASCRIPT");
      } else if (availableLanguages.length > 0) {
        setSelectedLanguage(availableLanguages[0]);
      }
    }
  }, [problem]);

  useEffect(() => {
    if (activeTab === "submissions" && id) {
      getSubmissionForProblem(id);
    }
  }, [activeTab, id]);

  useEffect(() => {
    return () => {
      setActiveResultTab("testcases");
      useExecutionStore.getState().clearSubmission();
    };
  }, [id]);

  console.log("Submission: ", submissions);

  const handleLanguageChange = (e) => {
    const language = e.target.value;
    setSelectedLanguage(language);
    setCode(problem.codeSnippet?.[language] || "");
  };

  const handleRunCode = (e) => {
    e.preventDefault();
    try {
      const language_id = getLanguageId(selectedLanguage);
      const stdin = problem.testcases.map((tc) => tc.input);
      const expected_outputs = problem.testcases.map((tc) => tc.output);

      executeCode(code, language_id, stdin, expected_outputs, id, false);
    } catch (error) {
      console.log("Error running code: ", error);
    }
  };

  const handleSubmitCode = (e) => {
    e.preventDefault();
    try {
      const language_id = getLanguageId(selectedLanguage);
      const stdin = problem.testcases.map((tc) => tc.input);
      const expected_outputs = problem.testcases.map((tc) => tc.output);

      executeCode(code, language_id, stdin, expected_outputs, id, true);
    } catch (error) {
      console.log("Error submitting code: ", error);
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
            onChange={handleLanguageChange}
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6 max-h-[600px] overflow-y-auto ">
        {/* <RemoveScrollBar /> */}
        {/* Problem Description Section */}
        <div className="bg-zinc-800 rounded-xl p-6 shadow-lg">
          <div className="relative flex justify-between mb-4 border-b border-zinc-700 pb-2 w-full">
            {["description", "submissions", "discussion", "hints"].map(
              (tab, index) => {
                const Icon =
                  tab === "description"
                    ? FileText
                    : tab === "submissions"
                    ? Code2
                    : tab === "discussion"
                    ? BookOpen
                    : Lightbulb;

                return (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`relative flex-1 text-sm text-center font-medium py-2 transition-colors duration-300 ${
                      activeTab === tab ? "text-[#F4FF54]" : "text-zinc-400"
                    }`}
                  >
                    <div className="flex justify-center items-center gap-1">
                      <Icon className="w-4 h-4" />
                      <span className="uppercase">{tab}</span>
                    </div>
                  </button>
                );
              }
            )}

            {/* Bubble underline */}
            <div
              className="absolute bottom-0 h-1 bg-[#F4FF54] rounded-full transition-all duration-300"
              style={{
                width: "25%",
                transform: `translateX(${
                  ["description", "submissions", "discussion", "hints"].indexOf(
                    activeTab
                  ) * 100
                }%)`,
              }}
            />
          </div>

          {activeTab === "description" && (
            <div className="prose prose-invert max-w-none">
              <h3 className="text-lg frot-semibold mb-1">Description:</h3>
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
            <SubmissionList
              submissions={submissions}
              isLoading={isSubmissionsLoading}
            />
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

        {/* Right Side - Code Editor and Test Cases/Results */}
        <div className="flex flex-col gap-6">
          {/* Code Editor Section */}
          <div className="bg-zinc-800 rounded-xl overflow-hidden shadow-lg flex-1">
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
                <button
                  onClick={handleSubmitCode}
                  className="btn btn-base btn-success"
                  disabled={isExecuting}
                >
                  <BugPlayIcon className="w-5 h-5 mr-1" /> Submit
                </button>
              </div>
            </div>

            <Editor
              height="400px"
              language={selectedLanguage.toLowerCase()}
              theme="vs-dark"
              value={code}
              onChange={(value) => setCode(value || "")}
              options={{ fontSize: 18, minimap: { enabled: false } }}
            />
          </div>

          {/* Test Cases and Results Section */}
          <div className="bg-zinc-800 rounded-xl shadow-lg flex-1">
            <div className="bg-zinc-700 px-4 py-2">
              <div className="flex gap-4">
                {["testcases", "results"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveResultTab(tab)}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                      activeResultTab === tab
                        ? "bg-[#F4FF54] text-black"
                        : "bg-zinc-600 text-white hover:bg-zinc-500"
                    }`}
                  >
                    {tab === "testcases" ? "Test Cases" : "Test Results"}
                  </button>
                ))}
              </div>
            </div>

            <div className="p-4 h-80 overflow-y-auto mt-2">
              {activeResultTab === "results" && submission ? (
                <SubmissionResults submission={submission} />
              ) : (
                <>
                  <div className="flex gap-3 mb-4 flex-wrap">
                    {testCases.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveTestCase(idx)}
                        className={`px-3 py-1 rounded-md text-lg font-medium transition-all cursor-pointer ${
                          activeTestCase === idx
                            ? "bg-[#F4FF54] text-black"
                            : "bg-zinc-700 text-white hover:bg-zinc-600"
                        }`}
                      >
                        Case {idx + 1}
                      </button>
                    ))}
                  </div>
                  <div className="bg-zinc-900 p-4 rounded-lg space-y-3 text-sm">
                    <div>
                      <span className="font-semibold text-emerald-400">
                        Input:
                      </span>{" "}
                      <code className="text-white bg-zinc-800 px-2 py-1 rounded">
                        {testCases[activeTestCase]?.input}
                      </code>
                    </div>
                    <div>
                      <span className="font-semibold text-blue-400">
                        Expected Output:
                      </span>{" "}
                      <code className="text-white bg-zinc-800 px-2 py-1 rounded">
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
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProblemPage;
