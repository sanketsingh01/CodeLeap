import React, { useState, useEffect, useRef, useCallback } from "react";
import { useParams, Link } from "react-router-dom";
import Editor, { useMonaco } from "@monaco-editor/react";
import {
  Play,
  FileText,
  Lightbulb,
  Code2,
  Clock,
  Award,
  Target,
  Send,
  Lock,
  ChevronLeft,
  ChevronRight,
  Shuffle,
  Gem,
  Diamond,
  Leaf,
  Moon,
  Sun,
  User,
  Maximize2,
  List,
  Copy,
  Bug,
  Paperclip,
  CheckCircle,
  Briefcase,
  ChevronDown,
  Check,
} from "lucide-react";
import { toast } from "react-hot-toast";

import { useProblemStore } from "../store/useProblemStore.js";
import { useExecutionStore } from "../store/useExecutionStore.js";
import { getLanguageId } from "../lib/lang.js";
import { useSubmissionStore } from "../store/useSubmissionStore.js";
import SubmissionResults from "../components/Submission.jsx";
import SubmissionList from "../components/SubmissionList.jsx";
import AddtoPlaylist from "../components/AddtoPlaylist.jsx";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu.jsx";

const RESIZER_WIDTH = 6;
const MIN_LEFT_PANEL = 25;
const MAX_LEFT_PANEL = 65;
const MIN_EDITOR_HEIGHT = 30;
const MAX_EDITOR_HEIGHT = 85;

const ProblemPage = () => {
  const { id } = useParams();
  const { getProblemById, problem, isProblemLoading } = useProblemStore();
  const {
    submission: submissions,
    isLoading: isSubmissionsLoading,
    getSubmissionForProblem,
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
  const [isAddToPlaylistModalOpen, setIsAddToPlaylistModalOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  // Resizable layout state
  const [leftPanelWidthPercent, setLeftPanelWidthPercent] = useState(42);
  const [editorHeightPercent, setEditorHeightPercent] = useState(55);
  const [isDraggingVertical, setIsDraggingVertical] = useState(false);
  const [isDraggingHorizontal, setIsDraggingHorizontal] = useState(false);
  const mainContainerRef = useRef(null);
  const rightPanelRef = useRef(null);

  const monaco = useMonaco();

  useEffect(() => {
    if (monaco) {
      monaco.editor.defineTheme("black", {
        base: "vs-dark",
        inherit: true,
        rules: [],
        colors: {
          "editor.background": "#18181B",
        },
      });
    }
  }, [monaco]);

  const { executeCode, submission, isExecuting, clearSubmission } =
    useExecutionStore();

  useEffect(() => {
    getProblemById(id);
  }, [id, getProblemById]);

  const startCooldown = () => setCooldown(30);

  useEffect(() => {
    if (cooldown === 0) return;
    const timer = setInterval(() => {
      setCooldown((prev) => (prev <= 1 ? 0 : prev - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, [cooldown]);

  useEffect(() => {
    if (problem) {
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
      setCode(problem.codeSnippet?.[selectedLanguage] || "");
      setTestCases(
        problem.testcases?.map((tc) => ({ input: tc.input, output: tc.output })) || []
      );
    }
  }, [problem, selectedLanguage]);

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
  }, [activeTab, id, getSubmissionForProblem]);

  useEffect(() => {
    return () => {
      setActiveResultTab("testcases");
      clearSubmission();
    };
  }, [id, clearSubmission]);

  useEffect(() => {
    if (submission) setActiveResultTab("results");
  }, [submission]);

  const handleLanguageChange = (language) => {
    setSelectedLanguage(language);
    setCode(problem?.codeSnippet?.[language] || "");
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
    } catch (err) {
      console.log("Error running code:", err);
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
    } catch (err) {
      console.log("Error submitting code:", err);
    }
  };

  const handleBookmark = (problemId) => {
    setSelectedProblemId(problemId);
    setIsAddToPlaylistModalOpen(true);
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(code);
    toast.success("Code copied");
  };

  // Vertical resize: left panel vs right panel
  const handleVerticalMouseDown = useCallback((e) => {
    e.preventDefault();
    setIsDraggingVertical(true);
  }, []);

  useEffect(() => {
    if (!isDraggingVertical) return;
    const handleMove = (e) => {
      const container = mainContainerRef.current;
      if (!container) return;
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const percent = (x / rect.width) * 100;
      setLeftPanelWidthPercent(
        Math.min(MAX_LEFT_PANEL, Math.max(MIN_LEFT_PANEL, percent))
      );
    };
    const handleUp = () => setIsDraggingVertical(false);
    document.addEventListener("mousemove", handleMove);
    document.addEventListener("mouseup", handleUp);
    document.body.style.cursor = "col-resize";
    document.body.style.userSelect = "none";
    return () => {
      document.removeEventListener("mousemove", handleMove);
      document.removeEventListener("mouseup", handleUp);
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
    };
  }, [isDraggingVertical]);

  // Horizontal resize: editor vs test cases (within right panel)
  const handleHorizontalMouseDown = useCallback((e) => {
    e.preventDefault();
    setIsDraggingHorizontal(true);
  }, []);

  useEffect(() => {
    if (!isDraggingHorizontal) return;
    const handleMove = (e) => {
      const panel = rightPanelRef.current;
      if (!panel) return;
      const rect = panel.getBoundingClientRect();
      const y = e.clientY - rect.top;
      const percent = (y / rect.height) * 100;
      setEditorHeightPercent(
        Math.min(MAX_EDITOR_HEIGHT, Math.max(MIN_EDITOR_HEIGHT, percent))
      );
    };
    const handleUp = () => setIsDraggingHorizontal(false);
    document.addEventListener("mousemove", handleMove);
    document.addEventListener("mouseup", handleUp);
    document.body.style.cursor = "row-resize";
    document.body.style.userSelect = "none";
    return () => {
      document.removeEventListener("mousemove", handleMove);
      document.removeEventListener("mouseup", handleUp);
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
    };
  }, [isDraggingHorizontal]);

  if (isProblemLoading || !problem) {
    return (
      <div className="min-h-screen bg-zinc-900 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-[#F4FF54] border-t-transparent rounded-full animate-spin" />
          <p className="text-zinc-300 font-medium">Loading problem...</p>
        </div>
      </div>
    );
  }

  const getDifficultyColor = (difficulty) => {
    switch (difficulty?.toLowerCase()) {
      case "easy":
        return "bg-emerald-100 text-emerald-700 border-emerald-200";
      case "medium":
        return "bg-amber-100 text-amber-700 border-amber-200";
      case "hard":
        return "bg-red-100 text-red-700 border-red-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const leftTabs = [
    { key: "description", label: "Description", icon: FileText, locked: false },
    { key: "solutions", label: "Solutions", icon: Lock, locked: true },
    { key: "submissions", label: "Submissions", icon: Clock, locked: false },
  ];

  return (
    <div
      className={`min-h-screen flex flex-col ${darkMode ? "bg-zinc-900 text-white" : "bg-gray-200 text-gray-900"
        }`}
    >
      {/* Top bar - like reference image */}
      <header
        className={`flex-shrink-0 flex items-center justify-between px-4 py-3 ${darkMode ? "bg-zinc-800 border-zinc-700" : "bg-gray-200/60"
          }`}
      >
        <div className="flex items-center gap-3">
          <Link
            to="/problems"
            className="flex items-center gap-2 font-medium hover:opacity-80"
          >
            <span>Problem List</span>
          </Link>
          <button
            type="button"
            className="p-1.5 rounded hover:bg-black/10 dark:hover:bg-white/10"
            aria-label="Previous"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            type="button"
            className="p-1.5 rounded hover:bg-black/10 dark:hover:bg-white/10"
            aria-label="Next"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
          <button
            type="button"
            className="p-1.5 rounded hover:bg-black/10 dark:hover:bg-white/10"
            aria-label="Shuffle"
          >
            <Shuffle className="w-5 h-5" />
          </button>
        </div>

        <button
          type="button"
          onClick={handleSubmitCode}
          disabled={isExecuting || cooldown > 0}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-amber-400 hover:bg-amber-500 text-gray-900 font-semibold rounded-lg shadow disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Play className="w-4 h-4" />
          Submit
        </button>

        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5 text-sm">
            <Leaf className="w-4 h-4 text-green-600" /> 0
          </span>
          <span className="flex items-center gap-1.5 text-sm">
            <Gem className="w-4 h-4 text-purple-500" /> 75
          </span>
          <span className="flex items-center gap-1.5 text-sm">
            <Diamond className="w-4 h-4 text-amber-500" /> 0
          </span>
          <button
            type="button"
            onClick={() => setDarkMode((d) => !d)}
            className="p-2 rounded-full hover:bg-black/10 dark:hover:bg-white/10"
            aria-label="Toggle theme"
          >
            {darkMode ? (
              <Sun className="w-5 h-5" />
            ) : (
              <Moon className="w-5 h-5" />
            )}
          </button>
          <button
            type="button"
            className="p-2 rounded-full hover:bg-black/10 dark:hover:bg-white/10"
            aria-label="Profile"
          >
            <User className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Main content: resizable left | right */}
      <div
        ref={mainContainerRef}
        className="flex-1 flex min-h-0 overflow-hidden p-4"
      >
        {/* Left panel - Problem description */}
        <div
          className={`flex-shrink-0 flex flex-col min-h-0 overflow-hidden rounded-md ${darkMode ? "border border-zinc-50/20" : "shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]"}`}
          style={{ width: `${leftPanelWidthPercent}%` }}
        >
          <div
            className={`border-b ${darkMode ? "border-zinc-700 bg-zinc-800/50" : "border-gray-200 bg-white"
              }`}
          >
            <div className="flex items-center justify-between">
              <nav className="flex">
                {leftTabs.map(({ key, label, icon: Icon, locked }) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => !locked && setActiveTab(key)}
                    disabled={locked}
                    className={`flex items-center gap-2 px-5 py-3 text-sm font-medium border-b-2 transition-colors ${activeTab === key
                      ? darkMode
                        ? "text-[#F4FF54] border-[#F4FF54]"
                        : "text-amber-600 border-amber-500"
                      : locked
                        ? "text-gray-400 border-transparent cursor-not-allowed"
                        : darkMode
                          ? "text-zinc-400 border-transparent hover:text-zinc-200"
                          : "text-gray-500 border-transparent hover:text-gray-700"
                      }`}
                  >
                    <Icon className="w-4 h-4" />
                    {label}
                  </button>
                ))}
              </nav>
              <button
                type="button"
                className="p-2 mr-2 rounded hover:bg-black/5 dark:hover:bg-white/5"
                aria-label="Fullscreen"
              >
                <Maximize2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div
            className={`flex-1 overflow-y-auto p-5 ${darkMode ? "bg-zinc-900" : "bg-white"
              }`}
          >
            <h1 className="text-xl font-bold mb-3">{problem.title}</h1>
            <div className="flex flex-wrap gap-2 mb-4">
              {problem.difficulty && (
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold border ${getDifficultyColor(
                    problem.difficulty
                  )}`}
                >
                  {problem.difficulty}
                </span>
              )}
              <span
                className={`px-3 py-1 rounded-full text-xs border ${darkMode ? "bg-zinc-700 text-zinc-300" : "bg-gray-100 text-gray-600"
                  }`}
              >
                Tags
              </span>
              <span
                className={`px-3 py-1 rounded-full text-xs border flex items-center gap-1 ${darkMode ? "bg-zinc-700 text-zinc-300" : "bg-gray-100 text-gray-600"
                  }`}
              >
                <Briefcase className="w-3 h-3" />
                Companies
              </span>
              <span
                className={`px-3 py-1 rounded-full text-xs border flex items-center gap-1 ${darkMode ? "bg-zinc-700 text-zinc-300" : "bg-gray-100 text-gray-600"
                  }`}
              >
                <Lightbulb className="w-3 h-3" />
                Hints
              </span>
            </div>

            {activeTab === "description" && (
              <div
                className={`prose max-w-none text-sm leading-relaxed ${darkMode ? "prose-invert" : ""
                  }`}
              >
                <p className="whitespace-pre-wrap">{problem.description}</p>
                {problem.examples && (
                  <div className="mt-4">
                    <h3 className="font-semibold mb-2">Example 1:</h3>
                    {Object.entries(problem.examples).map(([lang, ex], idx) => (
                      <div
                        key={idx}
                        className={`rounded-lg p-4 my-2 ${darkMode ? "bg-zinc-800" : "bg-gray-100"
                          }`}
                      >
                        <div className="mb-2">
                          <span className="text-xs font-semibold uppercase text-gray-500 dark:text-zinc-400">
                            Input
                          </span>
                          <pre className="mt-1 text-sm font-mono">{ex.input}</pre>
                        </div>
                        <div>
                          <span className="text-xs font-semibold uppercase text-gray-500 dark:text-zinc-400">
                            Output
                          </span>
                          <pre className="mt-1 text-sm font-mono">{ex.output}</pre>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                {problem.constraints && (
                  <div className="mt-4">
                    <h3 className="font-semibold mb-2">Constraints</h3>
                    <code
                      className={`block p-3 rounded text-sm ${darkMode ? "bg-white" : "bg-red-400"}`}
                    >
                      {problem.constraints}
                    </code>
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
          </div>
        </div>

        {/* Vertical resizer */}
        <div
          role="separator"
          aria-label="Resize panels"
          onMouseDown={handleVerticalMouseDown}
          className={`shrink-0 w-4 flex items-center justify-center cursor-col-resize`}
        >
          <div className="w-1 h-12 rounded-full bg-gray-400 dark:bg-zinc-500" />
        </div>

        {/* Right panel - Editor + Test cases */}
        <div
          ref={rightPanelRef}
          className="flex-1 min-w-0 flex flex-col min-h-0 overflow-hidden rounded-md"
        >
          {/* Code editor section */}
          <div
            className={`flex-shrink-0 flex flex-col min-h-0 rounded-md ${darkMode ? "border border-zinc-50/20" : "shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] bg-white"}`}
            style={{ height: `${editorHeightPercent}%` }}
          >
            <div
              className={`flex items-center justify-between px-3 py-2 border-b ${darkMode ? "bg-zinc-800 border-zinc-700" : "bg-gray-100 border-gray-200"
                }`}
            >
              <div className="flex items-center gap-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button
                      type="button"
                      className={`inline-flex items-center gap-2 rounded px-3 py-1.5 text-sm font-medium cursor-pointer border outline-none focus:ring-2 focus:ring-amber-400/50 ${
                        darkMode
                          ? "bg-zinc-700 border-zinc-600 text-white hover:bg-zinc-600"
                          : "bg-white border-gray-300 text-gray-800 hover:bg-gray-50"
                      }`}
                    >
                      {selectedLanguage.charAt(0) + selectedLanguage.slice(1).toLowerCase()}
                      <ChevronDown className="h-4 w-4 opacity-70" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="start"
                    className={
                      darkMode
                        ? "bg-zinc-800 border-zinc-600 text-white"
                        : "bg-white border-gray-200"
                    }
                  >
                    {Object.keys(problem.codeSnippet || {}).map((lang) => (
                      <DropdownMenuItem
                        key={lang}
                        onSelect={() => handleLanguageChange(lang)}
                        className={
                          darkMode
                            ? "focus:bg-zinc-700 focus:text-white cursor-pointer"
                            : "focus:bg-gray-100 cursor-pointer"
                        }
                      >
                        <span className="w-4 h-4 mr-2 inline-flex items-center justify-center">
                          {selectedLanguage === lang ? (
                            <Check className="h-4 w-4" />
                          ) : null}
                        </span>
                        {lang.charAt(0) + lang.slice(1).toLowerCase()}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
                <button
                  type="button"
                  className="p-2 rounded hover:bg-black/10 dark:hover:bg-white/10"
                  aria-label="Menu"
                >
                  <List className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={handleCopyCode}
                  className="p-2 rounded hover:bg-black/10 dark:hover:bg-white/10"
                  aria-label="Copy"
                >
                  <Copy className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  className="p-2 rounded hover:bg-black/10 dark:hover:bg-white/10"
                  aria-label="Debug"
                >
                  <Bug className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  className="p-2 rounded hover:bg-black/10 dark:hover:bg-white/10"
                  aria-label="Fullscreen"
                >
                  <Maximize2 className="w-4 h-4" />
                </button>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleRunCode}
                  disabled={isExecuting || cooldown > 0}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded text-sm font-medium bg-gray-200 dark:bg-zinc-600 hover:bg-gray-300 dark:hover:bg-zinc-500 disabled:opacity-50 text-gray-800 dark:text-white"
                >
                  {isExecuting ? (
                    <span className="w-4 h-4 border-2 border-gray-500 border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <Play className="w-4 h-4" />
                  )}
                  Run
                </button>
              </div>
            </div>
            <div className="flex-1 min-h-0 py-4">
              <Editor
                language={selectedLanguage.toLowerCase()}
                theme={darkMode ? "black" : "light"}
                value={code}
                onChange={(value) => setCode(value || "")}
                options={{
                  fontSize: 14,
                  minimap: { enabled: false },
                  scrollBeyondLastLine: false,
                }}
              />
            </div>
          </div>

          {/* Horizontal resizer */}
          <div
            role="separator"
            aria-label="Resize editor and test cases"
            onMouseDown={handleHorizontalMouseDown}
            className={`shrink-0 h-4 flex items-center justify-center cursor-row-resize`}
          >
            <div className="h-1 w-12 rounded-full bg-gray-400 dark:bg-zinc-500" />
          </div>

          {/* Test cases / Submission results */}
          <div className={`flex-1 min-h-0 flex flex-col overflow-hidden rounded-md ${darkMode ? "border border-zinc-50/20" : "shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]"}`}>
            <div
              className={`flex items-center justify-between ${darkMode ? "border-zinc-700 bg-zinc-800/50" : "border-gray-200 bg-white"
                }`}
            >
              <nav className="flex">
                {[
                  { key: "testcases", label: "Test Cases", icon: Paperclip },
                  { key: "results", label: "Submission Results", icon: CheckCircle },
                ].map(({ key, label, icon: Icon }) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setActiveResultTab(key)}
                    className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${activeResultTab === key
                      ? darkMode
                        ? "text-[#F4FF54] border-[#F4FF54]"
                        : "text-amber-600 border-amber-500"
                      : darkMode
                        ? "text-zinc-400 border-transparent hover:text-zinc-200"
                        : "text-gray-500 border-transparent hover:text-gray-700"
                      }`}
                  >
                    <Icon className="w-4 h-4" />
                    {label}
                  </button>
                ))}
              </nav>
              <button
                type="button"
                className="p-2 mr-2 rounded hover:bg-black/5 dark:hover:bg-white/5"
                aria-label="Fullscreen"
              >
                <Maximize2 className="w-4 h-4" />
              </button>
            </div>

            <div
              className={`flex-1 overflow-y-auto p-4 ${darkMode ? "bg-zinc-900" : "bg-white"
                }`}
            >
              {activeResultTab === "results" ? (
                submission ? (
                  <div className="max-h-full overflow-y-auto">
                    <SubmissionResults submission={submission} />
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-8 text-center text-gray-500 dark:text-zinc-400">
                    <Play className="w-10 h-10 mb-2 opacity-50" />
                    <p>Run or submit to see results here.</p>
                  </div>
                )
              ) : (
                <div>
                  <div className="flex gap-2 mb-4 flex-wrap">
                    {testCases.map((_, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setActiveTestCase(idx)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium ${activeTestCase === idx
                          ? darkMode
                            ? "bg-[#F4FF54] text-black"
                            : "bg-amber-100 text-amber-800"
                          : darkMode
                            ? "bg-zinc-700 text-zinc-300 hover:bg-zinc-600"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                          }`}
                      >
                        Case {idx + 1}
                      </button>
                    ))}
                  </div>
                  {testCases[activeTestCase] && (
                    <div>
                      <p className="text-xs font-semibold uppercase text-gray-500 dark:text-zinc-400 mb-2">
                        Input
                      </p>
                      <pre
                        className={`p-4 rounded-lg text-sm font-mono overflow-x-auto ${darkMode ? "bg-zinc-800" : "bg-gray-100"
                          }`}
                      >
                        {testCases[activeTestCase].input}
                      </pre>
                      <p className="text-xs font-semibold uppercase text-gray-500 dark:text-zinc-400 mt-3 mb-2">
                        Expected Output
                      </p>
                      <pre
                        className={`p-4 rounded-lg text-sm font-mono overflow-x-auto ${darkMode ? "bg-zinc-800" : "bg-gray-100"
                          }`}
                      >
                        {testCases[activeTestCase].output}
                      </pre>
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
