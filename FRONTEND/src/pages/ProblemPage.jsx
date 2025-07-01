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
  CheckCircle,
  XCircle,
  Clock,
  ArrowRight,
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
  const [cooldown, setCooldown] = useState(0);
  const [selectedProblemId, setSelectedProblemId] = useState(null);
  const [isAddToPlaylistModalOpen, setIsAddToPlaylistModalOpen] =
    useState(false);

  const { executeCode, submission, isExecuting, clearSubmission } =
    useExecutionStore();

  useEffect(() => {
    getProblemById(id);
    getSubmissionCountForProblem(id);
  }, [id]);

  const startCooldown = () => {
    setCooldown(30);
  };

  useEffect(() => {
    if (cooldown === 0) return;

    const timer = setInterval(() => {
      setCooldown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [cooldown]);

  useEffect(() => {
    if (problem) {
      // Set default language to JAVASCRIPT if it exists in codeSnippet
      const availableLanguages = Object.keys(problem.codeSnippet || {});
      const defaultLanguage = availableLanguages.includes("JAVASCRIPT")
        ? "JAVASCRIPT"
        : availableLanguages[0] || "JAVASCRIPT";

      if (
        !code &&
        selectedLanguage === "JAVASCRIPT" &&
        !availableLanguages.includes("JAVASCRIPT")
      ) {
        setSelectedLanguage(defaultLanguage);
      }

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

  useEffect(() => {
    if (submission) {
      setActiveResultTab("results");
    }
  }, [submission]);

  console.log("Submission: ", submissions);

  const handleLanguageChange = (e) => {
    const language = e.target.value;
    setSelectedLanguage(language);
    setCode(problem.codeSnippet?.[language] || "");
  };

  const handleRunCode = (e) => {
    e.preventDefault();
    if (cooldown > 0) return;

    try {
      const language_id = getLanguageId(selectedLanguage);
      const stdin = problem.testcases.map((tc) => tc.input);
      const expected_outputs = problem.testcases.map((tc) => tc.output);

      executeCode(code, language_id, stdin, expected_outputs, id, false);
      startCooldown();
    } catch (error) {
      console.log("Error running code: ", error);
    }
  };

  const handleSubmitCode = (e) => {
    e.preventDefault();
    if (cooldown > 0) return;

    try {
      const language_id = getLanguageId(selectedLanguage);
      const stdin = problem.testcases.map((tc) => tc.input);
      const expected_outputs = problem.testcases.map((tc) => tc.output);

      executeCode(code, language_id, stdin, expected_outputs, id, true);
      startCooldown();
    } catch (error) {
      console.log("Error submitting code: ", error);
    }
  };

  const handleBookmark = (problemId) => {
    setSelectedProblemId(problemId);
    console.log("Selected Problem: ", selectedProblemId);
    setIsAddToPlaylistModalOpen(true);
  };

  const handleShare = () => {
    try {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied to clipboard");
    } catch (error) {
      console.log("Failed to copy url: ", error);
      toast.error("Failed to copy url");
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
      <nav className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 py-4 border-b border-zinc-700">
        {/* Problem Title */}
        <div className="flex items-center gap-3">
          <FileText className="w-6 h-6 text-[#F4FF54]" />
          <h1 className="text-2xl font-bold tracking-wide text-white">
            {problem.title}
          </h1>
        </div>

        {/* Right Options */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Bookmark Button */}
          <button
            onClick={() => {
              handleBookmark(problem.id);
              setIsBookmarked(!isBookmarked);
            }}
            className={`rounded-lg px-3 py-2 text-sm font-medium flex items-center gap-2 transition-all ${
              isBookmarked
                ? "bg-yellow-400/20 text-yellow-300 border border-yellow-300"
                : "hover:bg-zinc-700 text-zinc-300 border border-transparent"
            }`}
          >
            <Bookmark className="w-4 h-4" />
            {isBookmarked ? "Bookmarked" : "Bookmark"}
          </button>

          {/* Share Button */}
          <button className="rounded-lg px-3 py-2 text-sm font-medium flex items-center gap-2 hover:bg-zinc-700 text-zinc-300 transition-all">
            <Share2 className="w-4 h-4" />
            Share
          </button>

          {/* Language Selector */}
          <div className="relative">
            <select
              value={selectedLanguage}
              onChange={handleLanguageChange}
              className="select select-bordered bg-zinc-800 border-zinc-600 text-white text-sm px-3 py-2 rounded-lg"
            >
              {Object.keys(problem.codeSnippet || {}).map((lang) => (
                <option key={lang} value={lang}>
                  {lang.toUpperCase()}
                </option>
              ))}
            </select>
          </div>
        </div>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
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

          <div className="max-h-96 overflow-y-auto">
            {activeTab === "description" && (
              <div className="prose prose-invert max-w-none">
                <h3 className="text-lg frot-semibold mb-1">Description:</h3>
                <p>{problem.description}</p>
                {problem.examples && (
                  <div className="mt-4">
                    <h3 className="text-lg frot-semibold mb-2">Examples:</h3>
                    {Object.entries(problem.examples).map(([lang, ex], idx) => (
                      <div
                        key={idx}
                        className="bg-zinc-700 p-4 rounded-lg mb-4"
                      >
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
        </div>

        {/* Right Side - Code Editor and Test Cases/Results */}
        <div className="flex flex-col gap-4">
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
                  disabled={isExecuting || cooldown > 0}
                >
                  {isExecuting ? (
                    "Running..."
                  ) : cooldown > 0 ? (
                    `Wait ${cooldown}s`
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
                  disabled={isExecuting || cooldown > 0}
                >
                  {isExecuting ? (
                    "Submitting..."
                  ) : cooldown > 0 ? (
                    `Wait ${cooldown}s`
                  ) : (
                    <>
                      <BugPlayIcon className="w-5 h-5 mr-1" /> Submit
                    </>
                  )}
                </button>
              </div>
            </div>

            <Editor
              height="300px"
              language={selectedLanguage.toLowerCase()}
              theme="vs-dark"
              value={code}
              onChange={(value) => setCode(value || "")}
              options={{ fontSize: 18, minimap: { enabled: false } }}
            />
          </div>

          {/* Enhanced Test Cases and Results Section */}
          <div className="bg-zinc-800 rounded-xl shadow-lg">
            {/* Stylish Tab Header */}
            <div className="bg-gradient-to-r from-zinc-700 to-zinc-600 px-4 py-3 relative">
              <div className="flex gap-2">
                {[
                  { key: "testcases", label: "Test Cases", icon: Code2 },
                  { key: "results", label: "Results", icon: CheckCircle },
                ].map(({ key, label, icon: Icon }) => (
                  <button
                    key={key}
                    onClick={() => setActiveResultTab(key)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
                      activeResultTab === key
                        ? "bg-[#F4FF54] text-black shadow-lg transform scale-105"
                        : "bg-zinc-600/50 text-white hover:bg-zinc-500/50 hover:scale-102"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {/* Content Area */}
            <div className="p-4 h-80">
              {activeResultTab === "results" && submission ? (
                <div className="h-full overflow-y-auto">
                  <SubmissionResults submission={submission} />
                </div>
              ) : (
                <div className="h-full flex flex-col">
                  {/* Enhanced Test Case Selector */}
                  <div className="flex gap-2 mb-4 pb-3 border-b border-zinc-700 flex-shrink-0">
                    <div className="flex gap-2 flex-wrap flex-1">
                      {testCases.map((_, idx) => (
                        <button
                          key={idx}
                          onClick={() => setActiveTestCase(idx)}
                          className={`px-3 py-2 rounded-lg text-sm font-semibold transition-all duration-200 flex items-center gap-2 ${
                            activeTestCase === idx
                              ? "bg-gradient-to-r from-[#F4FF54] to-yellow-300 text-black shadow-md transform scale-105"
                              : "bg-zinc-700 text-white hover:bg-zinc-600 hover:scale-102"
                          }`}
                        >
                          <div
                            className={`w-2 h-2 rounded-full ${
                              activeTestCase === idx
                                ? "bg-black/30"
                                : "bg-white/50"
                            }`}
                          />
                          Case {idx + 1}
                        </button>
                      ))}
                    </div>
                    <div className="text-sm text-zinc-400 flex items-center flex-shrink-0">
                      {testCases.length} test{testCases.length !== 1 ? "s" : ""}
                    </div>
                  </div>

                  {/* Enhanced Test Case Display */}
                  {testCases[activeTestCase] && (
                    <div className="flex-1 bg-gradient-to-br from-zinc-900 to-zinc-800 rounded-xl p-4 space-y-4 border border-zinc-700/50 overflow-y-auto">
                      {/* Input Section */}
                      <div className="group">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
                            <ArrowRight className="w-3 h-3 text-emerald-400" />
                          </div>
                          <span className="font-semibold text-emerald-400">
                            Input
                          </span>
                        </div>
                        <div className="bg-zinc-800/80 backdrop-blur-sm p-3 rounded-lg border border-emerald-500/20 group-hover:border-emerald-500/40 transition-colors">
                          <code className="text-white font-mono text-sm break-all">
                            {testCases[activeTestCase]?.input}
                          </code>
                        </div>
                      </div>

                      {/* Output Section */}
                      <div className="group">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                            <CheckCircle className="w-3 h-3 text-blue-400" />
                          </div>
                          <span className="font-semibold text-blue-400">
                            Expected Output
                          </span>
                        </div>
                        <div className="bg-zinc-800/80 backdrop-blur-sm p-3 rounded-lg border border-blue-500/20 group-hover:border-blue-500/40 transition-colors">
                          <code className="text-white font-mono text-sm break-all">
                            {testCases[activeTestCase]?.output}
                          </code>
                        </div>
                      </div>

                      {/* Explanation Section */}
                      {testCases[activeTestCase]?.explanation && (
                        <div className="group">
                          <div className="flex items-center gap-3 mb-2">
                            <div className="w-6 h-6 rounded-full bg-purple-500/20 flex items-center justify-center flex-shrink-0">
                              <Lightbulb className="w-3 h-3 text-purple-400" />
                            </div>
                            <span className="font-semibold text-purple-400">
                              Explanation
                            </span>
                          </div>
                          <div className="bg-zinc-800/80 backdrop-blur-sm p-3 rounded-lg border border-purple-500/20 group-hover:border-purple-500/40 transition-colors">
                            <p className="text-white text-sm leading-relaxed">
                              {testCases[activeTestCase].explanation}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <AddtoPlaylist
        isOpen={isAddToPlaylistModalOpen}
        onClose={() => setIsAddToPlaylistModalOpen(false)}
        problemId={selectedProblemId}
      />
    </div>
  );
};

export default ProblemPage;
