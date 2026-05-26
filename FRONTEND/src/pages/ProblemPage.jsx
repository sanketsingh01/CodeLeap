import React, { useState, useEffect, useRef, useCallback } from "react";
import { useParams, Link } from "react-router-dom";
import Editor, { useMonaco } from "@monaco-editor/react";
import {
  Play,
  FileText,
  Lightbulb,
  Clock,
  Send,
  Lock,
  ChevronLeft,
  ChevronRight,
  Shuffle,
  Gem,
  Flame,
  Diamond,
  Moon,
  Sun,
  User,
  Maximize2,
  Copy,
  Paperclip,
  CheckCircle,
  Briefcase,
  ChevronDown,
  Check,
  Sparkles,
  Bot,
  X,
  RefreshCw,
  Tag,
  PanelRightClose,
  PanelRightOpen,
  ArrowLeft,
  Bookmark,
  Loader2,
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

const MIN_LEFT_PANEL = 22;
const MAX_LEFT_PANEL = 55;
const MIN_RIGHT_PANEL = 18;
const MAX_RIGHT_PANEL = 42;
const MIN_EDITOR_HEIGHT = 30;
const MAX_EDITOR_HEIGHT = 80;

const SAMPLE_AI_MESSAGES = [
  {
    role: "assistant",
    content:
      "Hi! I'm Codeleap AI. Ask me for hints, complexity analysis, or help debugging your solution.",
  },
];

const QUICK_ACTIONS = [
  { label: "Give me a hint", icon: Lightbulb, prompt: "Give me a subtle hint without spoiling the solution." },
  { label: "Explain approach", icon: Sparkles, prompt: "Explain a clean approach for this problem." },
  { label: "Analyze complexity", icon: Bot, prompt: "What's the time and space complexity of my solution?" },
];

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
  const [testCases, setTestCases] = useState([]);
  const [activeTestCase, setActiveTestCase] = useState(0);
  const [activeResultTab, setActiveResultTab] = useState("testcases");
  const [cooldown, setCooldown] = useState(0);
  const [selectedProblemId, setSelectedProblemId] = useState(null);
  const [isAddToPlaylistModalOpen, setIsAddToPlaylistModalOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  // AI sidebar state
  const [aiOpen, setAiOpen] = useState(true);
  const [aiMessages, setAiMessages] = useState(SAMPLE_AI_MESSAGES);
  const [aiInput, setAiInput] = useState("");

  // Resizable layout: left | center | right
  const [leftPanelWidthPercent, setLeftPanelWidthPercent] = useState(34);
  const [rightPanelWidthPercent, setRightPanelWidthPercent] = useState(26);
  const [editorHeightPercent, setEditorHeightPercent] = useState(60);
  const [isDraggingLeft, setIsDraggingLeft] = useState(false);
  const [isDraggingRight, setIsDraggingRight] = useState(false);
  const [isDraggingHorizontal, setIsDraggingHorizontal] = useState(false);

  const mainContainerRef = useRef(null);
  const centerPanelRef = useRef(null);

  const monaco = useMonaco();

  useEffect(() => {
    if (!monaco) return;
    // Light theme tuned to Luminous Sky
    monaco.editor.defineTheme("luminous-light", {
      base: "vs",
      inherit: true,
      rules: [
        { token: "comment", foreground: "94a3b8", fontStyle: "italic" },
        { token: "keyword", foreground: "164cff", fontStyle: "bold" },
        { token: "string", foreground: "0e3fd9" },
        { token: "number", foreground: "1144e8" },
        { token: "type", foreground: "0e3fd9" },
      ],
      colors: {
        "editor.background": "#ffffff",
        "editor.foreground": "#0c1a2e",
        "editorLineNumber.foreground": "#cbd5e1",
        "editorLineNumber.activeForeground": "#164cff",
        "editor.lineHighlightBackground": "#fafafa",
        "editor.selectionBackground": "#dbeafe",
        "editorCursor.foreground": "#164cff",
        "editorIndentGuide.background1": "#e2e8f0",
      },
    });

    monaco.editor.defineTheme("luminous-dark", {
      base: "vs-dark",
      inherit: true,
      rules: [
        { token: "comment", foreground: "64748b", fontStyle: "italic" },
        { token: "keyword", foreground: "164cff", fontStyle: "bold" },
        { token: "string", foreground: "0e3fd9" },
        { token: "number", foreground: "1144e8" },
      ],
      colors: {
        "editor.background": "#0c1a2e",
        "editor.foreground": "#ffffff",
        "editorLineNumber.foreground": "#334155",
        "editorLineNumber.activeForeground": "#164cff",
        "editor.lineHighlightBackground": "#102137",
      },
    });
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
    if (!problem) return;
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
      problem.testcases?.map((tc) => ({
        input: tc.input,
        output: tc.output,
      })) || []
    );
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
    e?.preventDefault?.();
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
    e?.preventDefault?.();
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
    toast.success("Code copied to clipboard");
  };

  const handleResetCode = () => {
    setCode(problem?.codeSnippet?.[selectedLanguage] || "");
    toast.success("Code reset");
  };

  const handleAiSend = (text) => {
    const content = (text ?? aiInput).trim();
    if (!content) return;
    setAiMessages((prev) => [
      ...prev,
      { role: "user", content },
      {
        role: "assistant",
        content:
          "I'm a UI demo for the AI Coding Partner. Hook me up to your favourite model to get hints, complexity analysis, and debugging help right here.",
      },
    ]);
    setAiInput("");
  };

  // Left resizer
  const handleLeftMouseDown = useCallback((e) => {
    e.preventDefault();
    setIsDraggingLeft(true);
  }, []);

  // Right resizer
  const handleRightMouseDown = useCallback((e) => {
    e.preventDefault();
    setIsDraggingRight(true);
  }, []);

  // Horizontal resizer
  const handleHorizontalMouseDown = useCallback((e) => {
    e.preventDefault();
    setIsDraggingHorizontal(true);
  }, []);

  // Combined mouse handler for left/right vertical resizing
  useEffect(() => {
    if (!isDraggingLeft && !isDraggingRight) return;
    const handleMove = (e) => {
      const container = mainContainerRef.current;
      if (!container) return;
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const percent = (x / rect.width) * 100;
      if (isDraggingLeft) {
        const maxAllowed = 100 - rightPanelWidthPercent - 12;
        setLeftPanelWidthPercent(
          Math.min(
            Math.min(MAX_LEFT_PANEL, maxAllowed),
            Math.max(MIN_LEFT_PANEL, percent)
          )
        );
      } else if (isDraggingRight) {
        const fromRightPercent = 100 - percent;
        const maxAllowed = 100 - leftPanelWidthPercent - 12;
        setRightPanelWidthPercent(
          Math.min(
            Math.min(MAX_RIGHT_PANEL, maxAllowed),
            Math.max(MIN_RIGHT_PANEL, fromRightPercent)
          )
        );
      }
    };
    const handleUp = () => {
      setIsDraggingLeft(false);
      setIsDraggingRight(false);
    };
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
  }, [isDraggingLeft, isDraggingRight, leftPanelWidthPercent, rightPanelWidthPercent]);

  // Horizontal resize
  useEffect(() => {
    if (!isDraggingHorizontal) return;
    const handleMove = (e) => {
      const panel = centerPanelRef.current;
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
      <div className="min-h-screen bg-[var(--surface)] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="w-10 h-10 text-[var(--sky-500)] animate-spin" />
          <p className="text-[var(--ink-500)] font-medium">
            Loading problem...
          </p>
        </div>
      </div>
    );
  }

  const getDifficultyBadge = (difficulty) => {
    switch (difficulty?.toLowerCase()) {
      case "easy":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case "medium":
        return "bg-amber-50 text-amber-700 border-amber-200";
      case "hard":
        return "bg-red-50 text-red-700 border-red-200";
      default:
        return "bg-[var(--sky-50)] text-[var(--sky-700)] border-[var(--sky-200)]";
    }
  };

  const leftTabs = [
    { key: "description", label: "Description", icon: FileText, locked: false },
    { key: "solutions", label: "Solutions", icon: Lock, locked: true },
    { key: "submissions", label: "Submissions", icon: Clock, locked: false },
  ];

  // Theme classes
  const isDark = darkMode;
  const themeBg = isDark ? "bg-[var(--ink-900)]" : "bg-[var(--surface)]";
  const themePanel = isDark
    ? "bg-[#102137] border-white/10"
    : "bg-white border-[var(--ink-200)]";
  const themeText = isDark ? "text-[var(--surface)]" : "text-[var(--ink-900)]";
  const themeMuted = isDark ? "text-[var(--ink-400)]" : "text-[var(--ink-500)]";
  const themeHeaderBg = isDark
    ? "bg-[#102137]/60 border-white/10"
    : "bg-white/80 border-[var(--ink-200)]";
  const themeChip = isDark
    ? "bg-white/5 text-[var(--ink-400)] border-white/10"
    : "bg-[var(--surface-container-low)] text-[var(--ink-500)] border-[var(--ink-200)]";
  const themeCodeBlock = isDark
    ? "bg-[#0c1a2e] border-white/10 text-[var(--surface)]"
    : "bg-[var(--surface-container-low)] border-[var(--ink-200)] text-[var(--ink-900)]";

  return (
    <div className={`h-screen flex flex-col ${themeBg} ${themeText} font-inter overflow-hidden`}>
      {/* Top bar */}
      <header
        className={`flex-shrink-0 flex items-center justify-between px-4 lg:px-6 py-3 border-b ${themeHeaderBg} backdrop-blur-xl`}
      >
        {/* Left cluster */}
        <div className="flex items-center gap-2">
          <Link
            to="/problems"
            className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              isDark
                ? "text-[var(--surface)] hover:bg-white/10"
                : "text-[var(--ink-700)] hover:bg-[var(--surface-container-low)]"
            }`}
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Problem List</span>
          </Link>
          <div className="hidden md:flex items-center gap-1">
            <button
              type="button"
              className={`p-1.5 rounded-md transition-colors ${
                isDark ? "hover:bg-white/10" : "hover:bg-[var(--surface-container-low)]"
              }`}
              aria-label="Previous"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              className={`p-1.5 rounded-md transition-colors ${
                isDark ? "hover:bg-white/10" : "hover:bg-[var(--surface-container-low)]"
              }`}
              aria-label="Next"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
            <button
              type="button"
              className={`p-1.5 rounded-md transition-colors ${
                isDark ? "hover:bg-white/10" : "hover:bg-[var(--surface-container-low)]"
              }`}
              aria-label="Shuffle"
            >
              <Shuffle className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Center: Submit */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleRunCode}
            disabled={isExecuting || cooldown > 0}
            className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold transition-all disabled:opacity-60 disabled:cursor-not-allowed ${
              isDark
                ? "bg-white/10 hover:bg-white/15 text-[var(--surface)]"
                : "bg-[var(--surface-container-low)] hover:bg-[var(--surface-container)] text-[var(--ink-700)] border border-[var(--ink-200)]"
            }`}
          >
            {isExecuting ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Play className="w-4 h-4" />
            )}
            Run
          </button>
          <button
            type="button"
            onClick={handleSubmitCode}
            disabled={isExecuting || cooldown > 0}
            className="btn-sky inline-flex items-center gap-1.5 px-5 py-2 rounded-lg text-sm font-semibold disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isExecuting ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Send className="w-4 h-4" />
            )}
            Submit
          </button>
        </div>

        {/* Right cluster */}
        <div className="flex items-center gap-2 lg:gap-4">
          <div className="hidden sm:flex items-center gap-3">
            <span
              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${
                isDark
                  ? "bg-orange-500/10 text-orange-400"
                  : "bg-orange-50 text-orange-600"
              }`}
              title="Daily streak"
            >
              <Flame className="w-3.5 h-3.5" /> 12
            </span>
            <span
              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${
                isDark
                  ? "bg-[var(--sky-500)]/10 text-[var(--sky-300)]"
                  : "bg-[var(--sky-50)] text-[var(--sky-600)]"
              }`}
              title="Gems"
            >
              <Gem className="w-3.5 h-3.5" /> 75
            </span>
            <span
              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${
                isDark
                  ? "bg-[var(--sky-700)]/10 text-[var(--sky-300)]"
                  : "bg-[var(--sky-50)] text-[var(--sky-700)]"
              }`}
              title="Diamonds"
            >
              <Diamond className="w-3.5 h-3.5" /> 3
            </span>
          </div>

          <button
            type="button"
            onClick={() => setAiOpen((v) => !v)}
            className={`p-2 rounded-lg transition-colors ${
              isDark ? "hover:bg-white/10" : "hover:bg-[var(--surface-container-low)]"
            }`}
            aria-label="Toggle AI panel"
          >
            {aiOpen ? (
              <PanelRightClose className="w-4 h-4" />
            ) : (
              <PanelRightOpen className="w-4 h-4" />
            )}
          </button>
          <button
            type="button"
            onClick={() => setDarkMode((d) => !d)}
            className={`p-2 rounded-lg transition-colors ${
              isDark ? "hover:bg-white/10" : "hover:bg-[var(--surface-container-low)]"
            }`}
            aria-label="Toggle theme"
          >
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
          <button
            type="button"
            className={`p-2 rounded-lg transition-colors ${
              isDark ? "hover:bg-white/10" : "hover:bg-[var(--surface-container-low)]"
            }`}
            aria-label="Profile"
          >
            <User className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Main 3-pane container */}
      <div
        ref={mainContainerRef}
        className="flex-1 flex min-h-0 overflow-hidden p-3 gap-0"
      >
        {/* Pane 1: Problem description */}
        <div
          className={`flex-shrink-0 flex flex-col min-h-0 overflow-hidden rounded-xl border ${themePanel} shadow-[var(--shadow-soft)]`}
          style={{ width: `${leftPanelWidthPercent}%` }}
        >
          {/* Tabs */}
          <div
            className={`border-b ${
              isDark ? "border-white/10" : "border-[var(--ink-200)]"
            }`}
          >
            <div className="flex items-center justify-between px-2">
              <nav className="flex">
                {leftTabs.map(({ key, label, icon: Icon, locked }) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => !locked && setActiveTab(key)}
                    disabled={locked}
                    className={`flex items-center gap-1.5 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                      activeTab === key
                        ? isDark
                          ? "text-[var(--sky-300)] border-[var(--sky-400)]"
                          : "text-[var(--sky-600)] border-[var(--sky-500)]"
                        : locked
                        ? `${themeMuted} border-transparent cursor-not-allowed opacity-50`
                        : `${themeMuted} border-transparent hover:text-[var(--sky-600)]`
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {label}
                  </button>
                ))}
              </nav>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => handleBookmark(id)}
                  className={`p-2 rounded-md transition-colors ${
                    isDark ? "hover:bg-white/10" : "hover:bg-[var(--surface-container-low)]"
                  }`}
                  aria-label="Bookmark"
                >
                  <Bookmark className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  className={`p-2 rounded-md transition-colors ${
                    isDark ? "hover:bg-white/10" : "hover:bg-[var(--surface-container-low)]"
                  }`}
                  aria-label="Fullscreen"
                >
                  <Maximize2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-5">
            {activeTab === "description" && (
              <>
                <h1 className="font-jakarta text-2xl font-extrabold mb-3 leading-tight">
                  {problem.title}
                </h1>
                <div className="flex flex-wrap gap-2 mb-5">
                  {problem.difficulty && (
                    <span
                      className={`px-2.5 py-1 rounded-full text-xs font-semibold border ${getDifficultyBadge(
                        problem.difficulty
                      )}`}
                    >
                      {problem.difficulty}
                    </span>
                  )}
                  <span className={`px-2.5 py-1 rounded-full text-xs border inline-flex items-center gap-1 ${themeChip}`}>
                    <Tag className="w-3 h-3" /> Tags
                  </span>
                  <span className={`px-2.5 py-1 rounded-full text-xs border inline-flex items-center gap-1 ${themeChip}`}>
                    <Briefcase className="w-3 h-3" /> Companies
                  </span>
                  <span className={`px-2.5 py-1 rounded-full text-xs border inline-flex items-center gap-1 ${themeChip}`}>
                    <Lightbulb className="w-3 h-3" /> Hints
                  </span>
                </div>

                <div className="prose max-w-none">
                  <p className={`text-[15px] leading-relaxed whitespace-pre-wrap ${themeText}`}>
                    {problem.description}
                  </p>

                  {problem.examples && (
                    <div className="mt-6">
                      <h3 className="font-jakarta font-semibold text-base mb-3">
                        Examples
                      </h3>
                      {Object.entries(problem.examples).map(([lang, ex], idx) => (
                        <div
                          key={idx}
                          className={`rounded-xl border p-4 my-3 ${themeCodeBlock}`}
                        >
                          <div className="text-xs font-semibold uppercase tracking-wider mb-1 text-[var(--sky-600)]">
                            Example {idx + 1}
                          </div>
                          <div className="mb-2">
                            <span className={`text-[11px] font-semibold uppercase tracking-wider ${themeMuted}`}>
                              Input
                            </span>
                            <pre className="mt-1 text-sm font-mono-code">
                              {ex.input}
                            </pre>
                          </div>
                          <div>
                            <span className={`text-[11px] font-semibold uppercase tracking-wider ${themeMuted}`}>
                              Output
                            </span>
                            <pre className="mt-1 text-sm font-mono-code">
                              {ex.output}
                            </pre>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {problem.constraints && (
                    <div className="mt-6">
                      <h3 className="font-jakarta font-semibold text-base mb-3">
                        Constraints
                      </h3>
                      <code
                        className={`block p-3 rounded-xl text-sm font-mono-code border ${themeCodeBlock}`}
                      >
                        {problem.constraints}
                      </code>
                    </div>
                  )}
                </div>
              </>
            )}

            {activeTab === "submissions" && (
              <SubmissionList
                submissions={submissions}
                isLoading={isSubmissionsLoading}
              />
            )}

            {activeTab === "solutions" && (
              <div className="text-center py-14">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-[var(--sky-50)] text-[var(--sky-500)] mb-3">
                  <Lock className="w-6 h-6" />
                </div>
                <p className="font-jakarta font-semibold">
                  Solutions are unlocked with Pro
                </p>
                <p className={`text-sm mt-1 ${themeMuted}`}>
                  Upgrade to view curated, optimal solutions.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Left resizer */}
        <div
          role="separator"
          aria-label="Resize left panel"
          onMouseDown={handleLeftMouseDown}
          className="shrink-0 w-2 flex items-center justify-center cursor-col-resize group"
        >
          <div
            className={`w-0.5 h-12 rounded-full transition-colors ${
              isDark
                ? "bg-white/15 group-hover:bg-[var(--sky-400)]"
                : "bg-[var(--ink-200)] group-hover:bg-[var(--sky-500)]"
            }`}
          />
        </div>

        {/* Pane 2: Editor + Tests */}
        <div
          ref={centerPanelRef}
          className="flex-1 min-w-0 flex flex-col min-h-0 overflow-hidden gap-0"
        >
          {/* Editor section */}
          <div
            className={`flex-shrink-0 flex flex-col min-h-0 rounded-xl border overflow-hidden ${themePanel} shadow-[var(--shadow-soft)]`}
            style={{ height: `${editorHeightPercent}%` }}
          >
            {/* Editor toolbar */}
            <div
              className={`flex items-center justify-between px-3 py-2 border-b ${
                isDark
                  ? "bg-[#0c1a2e]/80 border-white/10"
                  : "bg-[var(--surface-container-low)] border-[var(--ink-200)]"
              }`}
            >
              <div className="flex items-center gap-1.5">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button
                      type="button"
                      className={`inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-semibold cursor-pointer border outline-none transition-colors ${
                        isDark
                          ? "bg-white/5 border-white/10 text-[var(--surface)] hover:bg-white/10"
                          : "bg-white border-[var(--ink-200)] text-[var(--ink-700)] hover:border-[var(--sky-300)]"
                      }`}
                    >
                      {selectedLanguage.charAt(0) +
                        selectedLanguage.slice(1).toLowerCase()}
                      <ChevronDown className="h-3.5 w-3.5 opacity-70" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="start"
                    className={
                      isDark
                        ? "bg-[#102137] border-white/10 text-[var(--surface)]"
                        : "bg-white border-[var(--ink-200)]"
                    }
                  >
                    {Object.keys(problem.codeSnippet || {}).map((lang) => (
                      <DropdownMenuItem
                        key={lang}
                        onSelect={() => handleLanguageChange(lang)}
                        className={
                          isDark
                            ? "focus:bg-white/10 cursor-pointer text-xs"
                            : "focus:bg-[var(--sky-50)] focus:text-[var(--sky-700)] cursor-pointer text-xs"
                        }
                      >
                        <span className="w-4 h-4 mr-1.5 inline-flex items-center justify-center">
                          {selectedLanguage === lang ? (
                            <Check className="h-3.5 w-3.5" />
                          ) : null}
                        </span>
                        {lang.charAt(0) + lang.slice(1).toLowerCase()}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <div className="flex items-center gap-0.5">
                <button
                  type="button"
                  onClick={handleResetCode}
                  className={`p-1.5 rounded-md transition-colors ${
                    isDark
                      ? "hover:bg-white/10 text-[var(--ink-400)]"
                      : "hover:bg-white text-[var(--ink-500)]"
                  }`}
                  aria-label="Reset"
                  title="Reset code"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={handleCopyCode}
                  className={`p-1.5 rounded-md transition-colors ${
                    isDark
                      ? "hover:bg-white/10 text-[var(--ink-400)]"
                      : "hover:bg-white text-[var(--ink-500)]"
                  }`}
                  aria-label="Copy"
                  title="Copy code"
                >
                  <Copy className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  className={`p-1.5 rounded-md transition-colors ${
                    isDark
                      ? "hover:bg-white/10 text-[var(--ink-400)]"
                      : "hover:bg-white text-[var(--ink-500)]"
                  }`}
                  aria-label="Fullscreen"
                  title="Fullscreen"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Monaco */}
            <div className="flex-1 min-h-0">
              <Editor
                language={selectedLanguage.toLowerCase()}
                theme={isDark ? "luminous-dark" : "luminous-light"}
                value={code}
                onChange={(value) => setCode(value || "")}
                options={{
                  fontSize: 14,
                  fontFamily: "'Parkinsans', system-ui, sans-serif",
                  fontLigatures: true,
                  minimap: { enabled: false },
                  scrollBeyondLastLine: false,
                  padding: { top: 14, bottom: 14 },
                  smoothScrolling: true,
                  cursorBlinking: "smooth",
                  renderLineHighlight: "all",
                  scrollbar: { verticalScrollbarSize: 8, horizontalScrollbarSize: 8 },
                }}
              />
            </div>
          </div>

          {/* Horizontal resizer */}
          <div
            role="separator"
            aria-label="Resize editor and test cases"
            onMouseDown={handleHorizontalMouseDown}
            className="shrink-0 h-2 flex items-center justify-center cursor-row-resize group"
          >
            <div
              className={`h-0.5 w-12 rounded-full transition-colors ${
                isDark
                  ? "bg-white/15 group-hover:bg-[var(--sky-400)]"
                  : "bg-[var(--ink-200)] group-hover:bg-[var(--sky-500)]"
              }`}
            />
          </div>

          {/* Test cases / submissions results */}
          <div
            className={`flex-1 min-h-0 flex flex-col overflow-hidden rounded-xl border ${themePanel} shadow-[var(--shadow-soft)]`}
          >
            <div
              className={`flex items-center justify-between border-b px-2 ${
                isDark
                  ? "border-white/10 bg-[#0c1a2e]/80"
                  : "border-[var(--ink-200)] bg-[var(--surface-container-low)]"
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
                    className={`flex items-center gap-1.5 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                      activeResultTab === key
                        ? isDark
                          ? "text-[var(--sky-300)] border-[var(--sky-400)]"
                          : "text-[var(--sky-600)] border-[var(--sky-500)]"
                        : `${themeMuted} border-transparent hover:text-[var(--sky-600)]`
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {label}
                  </button>
                ))}
              </nav>
            </div>

            <div className="flex-1 overflow-y-auto p-4">
              {activeResultTab === "results" ? (
                submission ? (
                  <SubmissionResults submission={submission} />
                ) : (
                  <div className={`flex flex-col items-center justify-center py-10 text-center ${themeMuted}`}>
                    <div className="w-12 h-12 rounded-xl bg-[var(--sky-50)] text-[var(--sky-500)] flex items-center justify-center mb-3">
                      <Play className="w-6 h-6" />
                    </div>
                    <p className="font-jakarta font-semibold text-[var(--ink-900)] dark:text-[var(--surface)]">
                      Run your code to see results
                    </p>
                    <p className={`text-sm mt-1 ${themeMuted}`}>
                      Hit Run or Submit at the top to test your solution.
                    </p>
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
                        className={`px-3.5 py-1.5 rounded-full text-xs font-semibold border transition-colors ${
                          activeTestCase === idx
                            ? "bg-[var(--sky-500)] text-white border-[var(--sky-500)] shadow-sm"
                            : isDark
                            ? "bg-white/5 text-[var(--ink-400)] border-white/10 hover:bg-white/10"
                            : "bg-white text-[var(--ink-700)] border-[var(--ink-200)] hover:border-[var(--sky-300)]"
                        }`}
                      >
                        Case {idx + 1}
                      </button>
                    ))}
                  </div>
                  {testCases[activeTestCase] && (
                    <div className="space-y-3">
                      <div>
                        <p className={`text-[11px] font-semibold uppercase tracking-wider mb-1.5 ${themeMuted}`}>
                          Input
                        </p>
                        <pre
                          className={`p-3 rounded-xl text-sm font-mono-code overflow-x-auto border ${themeCodeBlock}`}
                        >
                          {testCases[activeTestCase].input}
                        </pre>
                      </div>
                      <div>
                        <p className={`text-[11px] font-semibold uppercase tracking-wider mb-1.5 ${themeMuted}`}>
                          Expected Output
                        </p>
                        <pre
                          className={`p-3 rounded-xl text-sm font-mono-code overflow-x-auto border ${themeCodeBlock}`}
                        >
                          {testCases[activeTestCase].output}
                        </pre>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right resizer + Pane 3 (AI) */}
        {aiOpen && (
          <>
            <div
              role="separator"
              aria-label="Resize right panel"
              onMouseDown={handleRightMouseDown}
              className="shrink-0 w-2 flex items-center justify-center cursor-col-resize group"
            >
              <div
                className={`w-0.5 h-12 rounded-full transition-colors ${
                  isDark
                    ? "bg-white/15 group-hover:bg-[var(--sky-400)]"
                    : "bg-[var(--ink-200)] group-hover:bg-[var(--sky-500)]"
                }`}
              />
            </div>

            {/* Pane 3: AI sidebar */}
            <aside
              className={`flex-shrink-0 flex flex-col min-h-0 overflow-hidden rounded-xl border ${themePanel} shadow-[var(--shadow-soft)]`}
              style={{ width: `${rightPanelWidthPercent}%` }}
            >
              {/* AI header */}
              <div
                className={`flex items-center justify-between px-4 py-3 border-b ${
                  isDark ? "border-white/10" : "border-[var(--ink-200)]"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-[var(--sky-500)] to-[var(--sky-700)] flex items-center justify-center shadow-md shadow-sky-200">
                    <Sparkles className="w-4 h-4 text-white" />
                  </span>
                  <div>
                    <p className="font-jakarta font-semibold text-sm">
                      Ask Codeleap
                    </p>
                    <p className={`text-[10px] uppercase tracking-wider ${themeMuted}`}>
                      AI Coding Partner
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setAiOpen(false)}
                  className={`p-1.5 rounded-md transition-colors ${
                    isDark ? "hover:bg-white/10" : "hover:bg-[var(--surface-container-low)]"
                  }`}
                  aria-label="Close AI"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {aiMessages.map((m, i) => (
                  <div
                    key={i}
                    className={`flex ${
                      m.role === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[88%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed ${
                        m.role === "user"
                          ? "bg-gradient-to-br from-[var(--sky-500)] to-[var(--sky-600)] text-white rounded-br-md"
                          : isDark
                          ? "bg-white/5 text-[var(--surface)] border border-white/10 rounded-bl-md"
                          : "bg-[var(--surface-container-low)] text-[var(--ink-700)] border border-[var(--ink-200)] rounded-bl-md"
                      }`}
                    >
                      {m.content}
                    </div>
                  </div>
                ))}
              </div>

              {/* Quick actions */}
              <div
                className={`px-3 py-2 border-t ${
                  isDark ? "border-white/10" : "border-[var(--ink-200)]"
                }`}
              >
                <div className="flex flex-wrap gap-1.5">
                  {QUICK_ACTIONS.map((qa) => {
                    const Icon = qa.icon;
                    return (
                      <button
                        key={qa.label}
                        type="button"
                        onClick={() => handleAiSend(qa.prompt)}
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-[11px] font-semibold border transition-colors ${
                          isDark
                            ? "bg-white/5 border-white/10 text-[var(--ink-400)] hover:text-[var(--sky-300)] hover:border-[var(--sky-400)]"
                            : "bg-white border-[var(--ink-200)] text-[var(--ink-700)] hover:border-[var(--sky-300)] hover:text-[var(--sky-600)]"
                        }`}
                      >
                        <Icon className="w-3 h-3" />
                        {qa.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Input */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleAiSend();
                }}
                className={`p-3 border-t ${
                  isDark ? "border-white/10" : "border-[var(--ink-200)]"
                }`}
              >
                <div
                  className={`flex items-center gap-2 p-1.5 rounded-full border transition-all ${
                    isDark
                      ? "bg-white/5 border-white/10 focus-within:border-[var(--sky-400)]"
                      : "bg-white border-[var(--ink-200)] focus-within:border-[var(--sky-500)] focus-within:shadow-[0_0_0_4px_rgba(22,76,255,0.14)]"
                  }`}
                >
                  <input
                    type="text"
                    value={aiInput}
                    onChange={(e) => setAiInput(e.target.value)}
                    placeholder="Ask anything..."
                    className={`flex-1 bg-transparent px-3 py-1.5 outline-none text-sm ${
                      isDark
                        ? "placeholder-[var(--ink-500)] text-[var(--surface)]"
                        : "placeholder-[var(--ink-400)] text-[var(--ink-900)]"
                    }`}
                  />
                  <button
                    type="submit"
                    className="btn-sky w-8 h-8 rounded-full inline-flex items-center justify-center"
                    aria-label="Send"
                  >
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>
              </form>
            </aside>
          </>
        )}
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
