import React, { useState, useEffect } from "react";
import {
  modulesCatalog,
  ModuleMeta
} from "./data/modulesCatalog";
import { modulesList } from "./data/modulesData";
import { projectsList } from "./data/projectsData";
import { interviewQuestions } from "./data/interviewData";
import {
  communicationTips,
  personalityGuides,
  googleJobRoadmap
} from "./data/otherData";
import {
  BookOpen,
  Code,
  Flame,
  Award,
  Search,
  CheckCircle,
  HelpCircle,
  Volume2,
  Sparkles,
  ArrowRight,
  Bookmark,
  Share2,
  Terminal,
  Trophy,
  Mic,
  MessageSquare,
  Compass,
  UserCheck,
  ShieldCheck,
  BookmarkCheck,
  GraduationCap
} from "lucide-react";
import AIChatMentor from "./components/AIChatMentor";
import Playground from "./components/Playground";
import Certificate from "./components/Certificate";
import RoadmapVisualizer from "./components/RoadmapVisualizer";
import DailyChallenge from "./components/DailyChallenge";
import { ModuleDetail, QuizQuestion, ProjectDetail, Achievement, UserProgress } from "./types";

export default function App() {
  // Navigation State
  const [activeTab, setActiveTab] = useState<
    "curriculum" | "projects" | "interview" | "communication" | "personality" | "google" | "playground" | "certificate" | "daily_challenge"
  >("curriculum");

  // User Core State (saved to localStorage)
  const [userProgress, setUserProgress] = useState<UserProgress>({
    completedModules: [1, 2],
    completedQuizzes: {},
    bookmarks: [],
    xpPoints: 350,
    currentLevel: 1,
    unlockedAchievements: ["first_steps"],
    playgroundCode: `// Hinglish Playground! Type or run code\nfunction helloMastery() {\n  console.log("MERN seekhna shuru ho gaya hai! 🚀");\n}\nhelloMastery();`,
    userName: "MERN Learner",
    dailyStreak: 3,
    lastActiveDate: new Date().toDateString()
  });

  // UI Local states
  const [activeModuleId, setActiveModuleId] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeProject, setActiveProject] = useState<ProjectDetail>(projectsList[0]);
  const [activeInterviewIdx, setActiveInterviewIdx] = useState(0);
  const [quizSelectedOption, setQuizSelectedOption] = useState<number | null>(null);
  const [quizChecked, setQuizChecked] = useState(false);
  const [quizScore, setQuizScore] = useState<number | null>(null);
  const [activeQuizQuestionIdx, setActiveQuizQuestionIdx] = useState(0);
  const [showShareNotification, setShowShareNotification] = useState(false);
  const [micActive, setMicActive] = useState(false);

  // Audio reader states
  const [isReading, setIsReading] = useState(false);
  const [speechSynth, setSpeechSynth] = useState<SpeechSynthesis | null>(null);

  // Achievements definitions
  const achievementsList: Achievement[] = [
    { id: "first_steps", title: "Pehla Kadam", description: "Completed Computer Basics & Internet basics", iconName: "compass", xpValue: 100 },
    { id: "code_hacker", title: "Code Hacker", description: "Executed custom code inside the live playground", iconName: "code", xpValue: 150 },
    { id: "quiz_crusher", title: "Quiz Crusher", description: "Answered a module quiz correctly", iconName: "trophy", xpValue: 150 },
    { id: "mern_prodigy", title: "MERN Master Lvl 3", description: "Crossed 800 XP total balance", iconName: "sparkles", xpValue: 200 },
    { id: "mentor_buddy", title: "AI Mentor Fan", description: "Interacted with floating Hinglish AI Assistant", iconName: "message", xpValue: 100 }
  ];

  // Load state from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("mern_mastery_progress_v2");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setUserProgress(parsed);
      } catch (e) {
        console.error("Failed to parse progress:", e);
      }
    }

    if (typeof window !== "undefined" && window.speechSynthesis) {
      setSpeechSynth(window.speechSynthesis);
    }
  }, []);

  // Sync state to localStorage on state changes
  const saveProgress = (updated: UserProgress) => {
    setUserProgress(updated);
    localStorage.setItem("mern_mastery_progress_v2", JSON.stringify(updated));
  };

  const handleAwardXP = (amount: number) => {
    const updated = {
      ...userProgress,
      xpPoints: userProgress.xpPoints + amount
    };
    saveProgress(updated);
  };

  // Dynamically calculate Level based on XP
  useEffect(() => {
    const calculatedLevel = Math.max(1, Math.floor(userProgress.xpPoints / 400) + 1);
    if (calculatedLevel !== userProgress.currentLevel) {
      const updated = { ...userProgress, currentLevel: calculatedLevel };
      // Unlock MERN Prodigy automatically at lvl 3
      if (calculatedLevel >= 3 && !userProgress.unlockedAchievements.includes("mern_prodigy")) {
        updated.unlockedAchievements.push("mern_prodigy");
        updated.xpPoints += 200;
      }
      saveProgress(updated);
    }
  }, [userProgress.xpPoints]);

  // Audio reader handler
  const handleReadOutLoud = (textToRead: string) => {
    if (!speechSynth) return;
    if (isReading) {
      speechSynth.cancel();
      setIsReading(false);
      return;
    }

    // Clean Markdown tags
    const cleanText = textToRead
      .replace(/[\`#\*_-]/g, ' ')
      .replace(/https?:\/\/\S+/g, 'link')
      .slice(0, 450); // Reading safe snippet length

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = "hi-IN"; // Sets a friendly Hinglish Indian accent sound
    utterance.rate = 0.95;

    utterance.onstart = () => setIsReading(true);
    utterance.onend = () => setIsReading(false);
    utterance.onerror = () => setIsReading(false);

    speechSynth.speak(utterance);
  };

  // Helper: Find or synthesize module details dynamically for all 40 nodes!
  const getActiveModuleDetail = (): ModuleDetail => {
    const matched = modulesList.find(m => m.id === activeModuleId);
    if (matched) return matched;

    // Fallback: Synthesize rich, professional dynamic MERN Roadmap card on the fly!
    const meta = modulesCatalog.find(m => m.id === activeModuleId) || modulesCatalog[0];
    return {
      id: meta.id,
      title: meta.title,
      category: meta.category,
      difficulty: meta.difficulty,
      estimatedTime: meta.time,
      theory: `Understanding the internal architecture of ${meta.title} is essential for writing high-performance full-stack applications. This involves lifecycle events, optimization protocols, and secure network data flows.`,
      hinglishExplanation: `Dosto, ${meta.title} seekhna bohot hi aasaan hai! Yeh topic humari stack development pipeline ka ek bohot important part hai. Isme hum seekhte hain ki kaise dynamic code parameters, standard callbacks aur server routes aapas me coordinate karte hain.`,
      analogy: `Socho ek busy high-tech dynamic postal system chal raha hai. Us postal system me har item ko unique barcode (${meta.title} processes) se tag kiya jata hai, taaki packet sahi client address par accurate speed se delivery ho sake.`,
      diagramAscii: `
      +------------------------------+
      |      [ CLIENT REQUEST ]      |
      +--------------+---------------+
                     |
                     v
      +--------------+---------------+
      |      ${meta.title.toUpperCase()} PROCESS     |
      +--------------+---------------+
                     |
                     v
      +--------------+---------------+
      |      [ DATABASE / ENGINE ]   |
      +------------------------------+
      `,
      practicalExample: `// Sample dynamic example for ${meta.title}\nconst configureTarget = () => {\n  const settings = { topic: "${meta.title}", status: "Active" };\n  console.log("Configuring pipeline for:", settings.topic);\n  return settings;\n};\nconfigureTarget();`,
      miniProject: {
        title: `Hinglish ${meta.title} Configurator`,
        code: `// ${meta.title} fast playground simulator\nfunction executePipeline() {\n  console.log("Starting ${meta.title} system simulation... 🔥");\n  return "System loaded!";\n}\nexecutePipeline();`,
        instructions: "Run this script inside our Playground to test instant pipeline execution triggers!"
      },
      interviewQs: [
        { q: `What is the main challenge solved by ${meta.title}?`, a: "Complexity aur execution delay eliminate karna. Yeh system models ko decoupling decoupled arrays me organize karta hai." },
        { q: `How is ${meta.title} managed in real production systems?`, a: "Continuous automated environment variables and proper route headers configurations se security monitor hoti hai." }
      ],
      assignment: `Create a clean flowchart summary of ${meta.title} mechanisms inside your career notebook.`,
      cheatSheet: `${meta.title} =Decoupled, Quick, Robust & Optimized.`,
      bestPractices: [
        "Write highly organized structure templates.",
        "Secure credential secrets entirely from clients view."
      ],
      commonMistakes: [
        "Confusing config variables values. Always verify port codes!"
      ],
      industryTips: "Enterprise cloud run platforms require light containers for speedy deployments.",
      quiz: [
        {
          id: `q_dyn_1`,
          question: `${meta.title} ka main usecase kya hai?`,
          options: ["Speed aur organization manage karna", "Database memory ko bypass karna", "Static styling hardcode karna", "Useless server nodes terminate karna"],
          correctAnswer: 0,
          explanation: `${meta.title} primarily dynamic execution pipeline ko speed and organized modular architecture pradaan karta hai.`
        }
      ]
    };
  };

  const activeModule = getActiveModuleDetail();

  // Handle module completion
  const handleToggleComplete = (id: number) => {
    let updatedCompleted = [...userProgress.completedModules];
    let xpDiff = 0;

    if (updatedCompleted.includes(id)) {
      updatedCompleted = updatedCompleted.filter(mId => mId !== id);
      xpDiff = -100;
    } else {
      updatedCompleted.push(id);
      xpDiff = 100;
    }

    const updated = {
      ...userProgress,
      completedModules: updatedCompleted,
      xpPoints: Math.max(0, userProgress.xpPoints + xpDiff)
    };

    saveProgress(updated);
  };

  // Handle bookmarks
  const handleToggleBookmark = (key: string) => {
    let updatedBookmarks = [...userProgress.bookmarks];
    let xpDiff = 0;

    if (updatedBookmarks.includes(key)) {
      updatedBookmarks = updatedBookmarks.filter(b => b !== key);
      xpDiff = -10;
    } else {
      updatedBookmarks.push(key);
      xpDiff = 10;
    }

    const updated = {
      ...userProgress,
      bookmarks: updatedBookmarks,
      xpPoints: Math.max(0, userProgress.xpPoints + xpDiff)
    };
    saveProgress(updated);
  };

  // Handle Quiz selection
  const handleQuizOptionSelect = (optionIdx: number) => {
    setQuizSelectedOption(optionIdx);
    setQuizChecked(true);

    const activeQuestion = activeModule.quiz[activeQuizQuestionIdx];
    if (optionIdx === activeQuestion.correctAnswer) {
      // Award XP on correct answer
      const updated = {
        ...userProgress,
        xpPoints: userProgress.xpPoints + 150
      };
      if (!userProgress.unlockedAchievements.includes("quiz_crusher")) {
        updated.unlockedAchievements.push("quiz_crusher");
        updated.xpPoints += 150;
      }
      saveProgress(updated);
    }
  };

  // Send mini-project code directly to playground
  const handleLoadToPlayground = (code: string) => {
    const updated = {
      ...userProgress,
      playgroundCode: code,
      xpPoints: userProgress.xpPoints + 20
    };
    if (!userProgress.unlockedAchievements.includes("code_hacker")) {
      updated.unlockedAchievements.push("code_hacker");
      updated.xpPoints += 150;
    }
    saveProgress(updated);
    setActiveTab("playground");
  };

  // Simple sharing simulation
  const handleShareClick = () => {
    setShowShareNotification(true);
    setTimeout(() => setShowShareNotification(false), 2500);
  };

  // Speech input simulation helper
  const startVoiceSearchSimulation = () => {
    if (micActive) {
      setMicActive(false);
      return;
    }
    setMicActive(true);

    // Mock search matching after 2 seconds
    setTimeout(() => {
      setSearchQuery("React basics");
      setMicActive(false);
    }, 2000);
  };

  // Filter modules based on search
  const searchedModules = modulesCatalog.filter(
    m =>
      m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.summary.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-950 text-gray-100 flex flex-col relative select-none">
      {/* Absolute Neon Particle Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#141526_1px,transparent_1px),linear-gradient(to_bottom,#141526_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] -z-10" />

      {/* Futuristic Header with Glassmorphism */}
      <header className="sticky top-0 z-40 bg-[#060713]/80 backdrop-blur-xl border-b border-purple-500/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab("curriculum")}>
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-purple-600 via-indigo-600 to-cyan-500 p-[1px] shadow-lg shadow-purple-500/20">
              <div className="w-full h-full rounded-2xl bg-[#060713] flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-cyan-400" />
              </div>
            </div>
            <div>
              <h1 className="text-sm font-black text-white tracking-wider uppercase flex items-center gap-1">
                MERN Mastery <span className="text-cyan-400">3D</span>
              </h1>
              <p className="text-[10px] text-purple-400 font-mono">Complete Roadmap (Hinglish)</p>
            </div>
          </div>

          {/* Real-time search with voice trigger */}
          <div className="relative w-full sm:w-64 max-w-xs">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-500" />
            <input
              type="text"
              placeholder="Search notes, tags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-9 py-2 bg-[#12132a] border border-purple-500/20 rounded-xl text-xs text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 transition-colors"
            />
            <button
              onClick={startVoiceSearchSimulation}
              className={`absolute right-3 top-2.5 cursor-pointer transition-colors ${
                micActive ? "text-rose-500 animate-pulse" : "text-gray-500 hover:text-white"
              }`}
              title="Simulate Voice Search input"
            >
              <Mic className="w-4 h-4" />
            </button>
          </div>

          {/* User Score indicators */}
          <div className="flex items-center gap-3">
            {/* Streak card */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-[#ff6b00]/10 border border-[#ff6b00]/30 rounded-xl text-orange-400 font-bold text-xs" title="Daily consistent logging streak!">
              <Flame className="w-4 h-4 animate-bounce" />
              <span>{userProgress.dailyStreak} Days</span>
            </div>

            {/* Level card */}
            <div className="px-3 py-1.5 bg-gradient-to-r from-purple-900/40 to-indigo-900/40 border border-purple-500/30 rounded-xl flex items-center gap-1.5 text-xs">
              <Trophy className="w-4 h-4 text-amber-400" />
              <span className="text-gray-300 font-semibold font-mono">
                Level <strong className="text-white text-sm">{userProgress.currentLevel}</strong>
              </span>
              <span className="text-[10px] text-cyan-400 font-mono">({userProgress.xpPoints} XP)</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Campus Body Layout */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* LEFT COLUMN: Sidebar Navigation Hub */}
        <section className="lg:col-span-3 space-y-6">
          {/* Bento-grid User Profile summary card */}
          <div className="bg-[#0b0c16]/90 border border-purple-500/20 rounded-2xl p-4.5 space-y-3.5 relative overflow-hidden backdrop-blur-md">
            <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/5 rounded-full blur-2xl -z-10" />

            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-purple-600 to-cyan-400 flex items-center justify-center font-bold text-white shadow-md text-sm border border-cyan-400/30">
                MP
              </div>
              <div>
                <h4 className="text-xs font-bold text-white flex items-center gap-1">
                  Aman Pandey
                  <UserCheck className="w-3.5 h-3.5 text-cyan-400" />
                </h4>
                <p className="text-[10px] text-cyan-400 font-mono">Google Job Seeker</p>
              </div>
            </div>

            {/* XP progress slider bar */}
            <div className="space-y-1 pt-1">
              <div className="flex justify-between text-[9px] font-mono text-gray-400">
                <span>XP PROGRESS</span>
                <span>{userProgress.xpPoints % 400} / 400 XP</span>
              </div>
              <div className="w-full h-1.5 bg-slate-900 rounded-full overflow-hidden border border-white/5">
                <div
                  className="h-full bg-gradient-to-r from-purple-500 to-cyan-400 transition-all duration-500"
                  style={{ width: `${((userProgress.xpPoints % 400) / 400) * 100}%` }}
                />
              </div>
            </div>
          </div>

          {/* Primary Sidebar Tabs */}
          <nav className="flex flex-col gap-1.5">
            <button
              onClick={() => { setActiveTab("curriculum"); setSearchQuery(""); }}
              className={`px-4 py-3 rounded-xl text-xs font-bold text-left transition-all flex items-center justify-between cursor-pointer border ${
                activeTab === "curriculum"
                  ? "bg-gradient-to-r from-purple-950/60 to-indigo-950/60 border-purple-500 text-white shadow-md shadow-purple-500/10"
                  : "bg-transparent border-transparent text-gray-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <span className="flex items-center gap-2.5">
                <BookOpen className="w-4.5 h-4.5 text-cyan-400" />
                40 Modules Curriculum
              </span>
              <span className="text-[10px] bg-cyan-950/40 text-cyan-400 border border-cyan-500/20 px-2 py-0.5 rounded-full font-mono">
                {userProgress.completedModules.length}/40
              </span>
            </button>

            <button
              onClick={() => setActiveTab("daily_challenge")}
              className={`px-4 py-3 rounded-xl text-xs font-bold text-left transition-all flex items-center justify-between cursor-pointer border ${
                activeTab === "daily_challenge"
                  ? "bg-gradient-to-r from-amber-950/60 to-purple-950/60 border-amber-500 text-white shadow-md shadow-amber-500/10"
                  : "bg-transparent border-transparent text-gray-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <span className="flex items-center gap-2.5">
                <Trophy className="w-4.5 h-4.5 text-amber-400" />
                Daily Quiz Challenge
              </span>
              <span className="text-[10px] bg-amber-950/40 text-amber-400 border border-amber-500/20 px-2 py-0.5 rounded-full font-mono animate-pulse">
                +250 XP
              </span>
            </button>

            <button
              onClick={() => setActiveTab("projects")}
              className={`px-4 py-3 rounded-xl text-xs font-bold text-left transition-all flex items-center justify-between cursor-pointer border ${
                activeTab === "projects"
                  ? "bg-gradient-to-r from-purple-950/60 to-indigo-950/60 border-purple-500 text-white shadow-md"
                  : "bg-transparent border-transparent text-gray-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <span className="flex items-center gap-2.5">
                <Code className="w-4.5 h-4.5 text-purple-400" />
                18 Projects Portfolio
              </span>
              <span className="text-[10px] bg-purple-950/40 text-purple-400 border border-purple-500/20 px-2 py-0.5 rounded-full font-mono">
                18
              </span>
            </button>

            <button
              onClick={() => setActiveTab("interview")}
              className={`px-4 py-3 rounded-xl text-xs font-bold text-left transition-all flex items-center gap-2.5 cursor-pointer border ${
                activeTab === "interview"
                  ? "bg-gradient-to-r from-purple-950/60 to-indigo-950/60 border-purple-500 text-white shadow-md"
                  : "bg-transparent border-transparent text-gray-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <Trophy className="w-4.5 h-4.5 text-amber-400" />
              Interview Flashcards
            </button>

            <button
              onClick={() => setActiveTab("communication")}
              className={`px-4 py-3 rounded-xl text-xs font-bold text-left transition-all flex items-center gap-2.5 cursor-pointer border ${
                activeTab === "communication"
                  ? "bg-gradient-to-r from-purple-950/60 to-indigo-950/60 border-purple-500 text-white shadow-md"
                  : "bg-transparent border-transparent text-gray-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <MessageSquare className="w-4.5 h-4.5 text-emerald-400" />
              Communication Coach
            </button>

            <button
              onClick={() => setActiveTab("personality")}
              className={`px-4 py-3 rounded-xl text-xs font-bold text-left transition-all flex items-center gap-2.5 cursor-pointer border ${
                activeTab === "personality"
                  ? "bg-gradient-to-r from-purple-950/60 to-indigo-950/60 border-purple-500 text-white shadow-md"
                  : "bg-transparent border-transparent text-gray-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <UserCheck className="w-4.5 h-4.5 text-indigo-400" />
              Personality Prep
            </button>

            <button
              onClick={() => setActiveTab("google")}
              className={`px-4 py-3 rounded-xl text-xs font-bold text-left transition-all flex items-center gap-2.5 cursor-pointer border ${
                activeTab === "google"
                  ? "bg-gradient-to-r from-purple-950/60 to-indigo-950/60 border-purple-500 text-white shadow-md"
                  : "bg-transparent border-transparent text-gray-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <Sparkles className="w-4.5 h-4.5 text-rose-400" />
              Google Job Roadmap
            </button>

            <button
              onClick={() => setActiveTab("playground")}
              className={`px-4 py-3 rounded-xl text-xs font-bold text-left transition-all flex items-center gap-2.5 cursor-pointer border ${
                activeTab === "playground"
                  ? "bg-gradient-to-r from-purple-950/60 to-indigo-950/60 border-purple-500 text-white shadow-md"
                  : "bg-transparent border-transparent text-gray-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <Terminal className="w-4.5 h-4.5 text-cyan-400" />
              Playground & Labs
            </button>

            <button
              onClick={() => setActiveTab("certificate")}
              className={`px-4 py-3 rounded-xl text-xs font-bold text-left transition-all flex items-center gap-2.5 cursor-pointer border ${
                activeTab === "certificate"
                  ? "bg-gradient-to-r from-purple-950/60 to-indigo-950/60 border-purple-500 text-white shadow-md"
                  : "bg-transparent border-transparent text-gray-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <Award className="w-4.5 h-4.5 text-amber-400 animate-pulse" />
              Claim Certificate
            </button>
          </nav>

          {/* Badges/Achievements tray */}
          <div className="bg-[#0b0c16]/90 border border-purple-500/10 rounded-2xl p-4 space-y-3">
            <h4 className="text-[10px] font-bold text-purple-400 tracking-wider uppercase flex items-center gap-1">
              <Trophy className="w-3.5 h-3.5" /> Unlocked Badges
            </h4>
            <div className="grid grid-cols-2 gap-2">
              {achievementsList.map((badge) => {
                const isUnlocked = userProgress.unlockedAchievements.includes(badge.id);
                return (
                  <div
                    key={badge.id}
                    className={`p-2.5 rounded-xl border text-center space-y-1 transition-all ${
                      isUnlocked
                        ? "bg-purple-950/20 border-purple-500/30 text-purple-300"
                        : "bg-black/40 border-white/5 opacity-40"
                    }`}
                    title={`${badge.description} (+${badge.xpValue} XP)`}
                  >
                    <div className="flex justify-center text-cyan-400">
                      <Award className="w-6 h-6" />
                    </div>
                    <p className="text-[9px] font-bold leading-tight truncate">{badge.title}</p>
                    <span className="text-[8px] font-mono opacity-80 text-cyan-300">+{badge.xpValue} XP</span>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* RIGHT COLUMN: Interactive Dynamic Core Workspaces */}
        <section className="lg:col-span-9 space-y-6">
          {/* SEARCH SUGGESTIONS OVERLAY PANEL */}
          {searchQuery && (
            <div className="bg-[#0b0c16]/95 border border-cyan-400/40 rounded-2xl p-4 space-y-3.5">
              <h3 className="text-xs font-bold text-cyan-400 flex items-center gap-1.5 uppercase tracking-wide">
                <Search className="w-4 h-4" />
                Search Results ({searchedModules.length} found)
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {searchedModules.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => {
                      setActiveModuleId(item.id);
                      setSearchQuery("");
                      setActiveTab("curriculum");
                    }}
                    className="p-3 bg-white/5 border border-purple-500/10 rounded-xl hover:border-cyan-400/50 cursor-pointer transition-colors"
                  >
                    <h4 className="text-xs font-bold text-white">{item.id}. {item.title}</h4>
                    <p className="text-[10px] text-gray-400 mt-1 line-clamp-2">{item.summary}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 1: CURRICULUM WORKSPACE */}
          {activeTab === "curriculum" && (
            <div className="space-y-6">
              {/* Connected Visual Roadmap Component */}
              <div className="bg-[#0c0d1b]/95 border border-purple-500/20 rounded-3xl p-6 shadow-2xl relative overflow-hidden backdrop-blur-md">
                <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 rounded-full blur-3xl -z-10" />
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-purple-500/15 pb-4 mb-5">
                  <div>
                    <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight flex items-center gap-2">
                      <Compass className="w-5.5 h-5.5 text-cyan-400" />
                      MERN Interactive Skill Tree
                    </h2>
                    <p className="text-xs text-gray-400 mt-1">
                      Choose any module node to load detailed Hinglish notes, mini projects, aur quiz tests!
                    </p>
                  </div>
                  <button
                    onClick={handleShareClick}
                    className="px-4 py-2 bg-purple-900/40 border border-purple-500/30 text-xs font-semibold rounded-xl text-gray-200 hover:text-white hover:bg-purple-900/60 cursor-pointer flex items-center gap-1.5 transition-colors shrink-0"
                  >
                    <Share2 className="w-4 h-4" />
                    Share Roadmap
                  </button>
                </div>

                {/* Shared visualizer node mapping */}
                <RoadmapVisualizer
                  completedModules={userProgress.completedModules}
                  bookmarks={userProgress.bookmarks}
                  activeModuleId={activeModuleId}
                  onSelectModule={(id) => {
                    setActiveModuleId(id);
                    setQuizSelectedOption(null);
                    setQuizChecked(false);
                    setQuizScore(null);
                    setActiveQuizQuestionIdx(0);
                  }}
                  onToggleComplete={handleToggleComplete}
                />
              </div>

              {/* Study Card Panel: High Detail */}
              <div className="bg-[#0c0d16]/95 border border-purple-500/20 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 relative">
                {/* Visual bookmarks & completion status */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-purple-500/10 pb-5">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="px-3 py-1 bg-gradient-to-r from-purple-900/40 to-indigo-900/40 border border-purple-500/30 rounded-lg text-[10px] font-mono text-cyan-300 font-bold uppercase">
                      Module {activeModule.id} / 40
                    </span>
                    <span className={`px-2.5 py-0.5 rounded-md border text-[9px] font-bold uppercase ${
                      activeModule.difficulty === "Beginner" ? "border-emerald-500/20 text-emerald-400 bg-emerald-950/10" :
                      activeModule.difficulty === "Intermediate" ? "border-amber-500/20 text-amber-400 bg-amber-950/10" :
                      "border-rose-500/20 text-rose-400 bg-rose-950/10"
                    }`}>
                      {activeModule.difficulty}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    {/* Read Out Loud Button */}
                    <button
                      onClick={() => handleReadOutLoud(`${activeModule.title}. ${activeModule.hinglishExplanation}`)}
                      className={`p-2.5 rounded-xl border transition-colors cursor-pointer flex items-center gap-1.5 text-xs ${
                        isReading
                          ? "bg-rose-500/20 border-rose-500/40 text-rose-400 hover:bg-rose-500/35"
                          : "bg-white/5 border-purple-500/10 text-gray-300 hover:text-white"
                      }`}
                      title="Read Hinglish text aloud"
                    >
                      <Volume2 className={`w-4 h-4 ${isReading ? "animate-ping" : ""}`} />
                      {isReading ? "Stop Reading" : "Speak Notes"}
                    </button>

                    <button
                      onClick={() => handleToggleBookmark(`module-${activeModule.id}`)}
                      className="p-2.5 bg-white/5 border border-purple-500/10 hover:bg-purple-500/10 hover:text-cyan-300 text-gray-300 rounded-xl transition-colors cursor-pointer"
                      title="Bookmark this module"
                    >
                      {userProgress.bookmarks.includes(`module-${activeModule.id}`) ? (
                        <BookmarkCheck className="w-4 h-4 text-cyan-400" />
                      ) : (
                        <Bookmark className="w-4 h-4" />
                      )}
                    </button>

                    <button
                      onClick={() => handleToggleComplete(activeModule.id)}
                      className={`px-4 py-2.5 rounded-xl border text-xs font-bold cursor-pointer transition-colors ${
                        userProgress.completedModules.includes(activeModule.id)
                          ? "bg-cyan-500/15 border-cyan-500/30 text-cyan-400"
                          : "bg-purple-600 hover:bg-purple-500 border-transparent text-white"
                      }`}
                    >
                      {userProgress.completedModules.includes(activeModule.id) ? "✓ Completed" : "Mark Complete (+100 XP)"}
                    </button>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-xl sm:text-2xl font-black text-white tracking-wide">{activeModule.title}</h3>

                  {/* 1. Theory Column */}
                  <div className="space-y-1.5">
                    <span className="text-[10px] font-mono font-bold tracking-wider text-purple-400 uppercase">1. Core Theory</span>
                    <p className="text-gray-300 text-xs sm:text-sm leading-relaxed font-sans">{activeModule.theory}</p>
                  </div>

                  {/* 2. Hinglish Mentorship Column */}
                  <div className="bg-purple-950/15 border border-purple-500/20 rounded-2xl p-4 sm:p-5 space-y-2 relative">
                    <span className="absolute top-3.5 right-4 text-[10px] font-mono text-cyan-400 font-bold bg-cyan-950/40 px-2 py-0.5 rounded-md uppercase">Hinglish Mentor Explanation</span>
                    <span className="text-[10px] font-mono font-bold tracking-wider text-purple-400 uppercase block">2. Mentor Advice</span>
                    <p className="text-gray-200 text-xs sm:text-sm leading-relaxed font-sans italic">
                      "{activeModule.hinglishExplanation}"
                    </p>
                  </div>

                  {/* 3. Mindmap Analogies */}
                  <div className="space-y-1.5">
                    <span className="text-[10px] font-mono font-bold tracking-wider text-purple-400 uppercase">3. Real-life Analogy</span>
                    <p className="text-gray-300 text-xs sm:text-sm leading-relaxed font-sans bg-black/40 border border-white/5 p-3.5 rounded-xl">
                      💡 {activeModule.analogy}
                    </p>
                  </div>

                  {/* 4. 3D flowchart diagram */}
                  <div className="space-y-1.5">
                    <span className="text-[10px] font-mono font-bold tracking-wider text-purple-400 uppercase">4. Animated System Flowchart</span>
                    <pre className="p-4 bg-[#05060a] border border-purple-500/10 rounded-xl overflow-x-auto text-[10px] sm:text-xs font-mono text-cyan-300 leading-tight">
                      {activeModule.diagramAscii}
                    </pre>
                  </div>

                  {/* 5. Practical Example */}
                  <div className="space-y-1.5">
                    <span className="text-[10px] font-mono font-bold tracking-wider text-purple-400 uppercase">5. Practical Example Code</span>
                    <pre className="p-4 bg-[#060713] border border-cyan-500/25 rounded-xl overflow-x-auto text-xs font-mono text-cyan-400">
                      {activeModule.practicalExample || `// General execution block\nconsole.log("Ready to execute ${activeModule.title}!");`}
                    </pre>
                  </div>

                  {/* 6. Mini Project Module */}
                  <div className="border border-purple-500/20 bg-slate-900/40 rounded-2xl p-5 space-y-3">
                    <span className="text-[10px] font-mono font-bold tracking-wider text-cyan-400 uppercase block">6. Mini Project: {activeModule.miniProject.title}</span>
                    <p className="text-gray-300 text-xs leading-relaxed">{activeModule.miniProject.instructions}</p>
                    <pre className="p-3 bg-[#05060b] rounded-xl text-xs font-mono text-purple-300 overflow-x-auto">
                      {activeModule.miniProject.code}
                    </pre>
                    <button
                      onClick={() => handleLoadToPlayground(activeModule.miniProject.code)}
                      className="px-4 py-2 bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-500 hover:to-cyan-400 text-white text-xs font-semibold rounded-xl flex items-center gap-1.5 cursor-pointer shadow-lg active:scale-95 transition-transform"
                    >
                      <Terminal className="w-4 h-4" />
                      Load in Live Playground & Test
                    </button>
                  </div>

                  {/* 7. Key Notes & Mistakes */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-emerald-950/10 border border-emerald-500/20 rounded-xl space-y-1.5">
                      <span className="text-[10px] font-mono font-bold tracking-wider text-emerald-400 uppercase">Best Practices</span>
                      <ul className="list-disc pl-4 space-y-1 text-xs text-gray-300 leading-relaxed">
                        {activeModule.bestPractices.map((bp, i) => <li key={i}>{bp}</li>)}
                      </ul>
                    </div>

                    <div className="p-4 bg-rose-950/10 border border-rose-500/20 rounded-xl space-y-1.5">
                      <span className="text-[10px] font-mono font-bold tracking-wider text-rose-400 uppercase">Common Mistakes</span>
                      <ul className="list-disc pl-4 space-y-1 text-xs text-gray-300 leading-relaxed">
                        {activeModule.commonMistakes.map((cm, i) => <li key={i}>{cm}</li>)}
                      </ul>
                    </div>
                  </div>

                  {/* 8. Industry tip */}
                  <div className="p-4 bg-cyan-950/10 border border-cyan-500/20 rounded-xl space-y-1">
                    <span className="text-[10px] font-mono font-bold tracking-wider text-cyan-400 uppercase">Industry Tip</span>
                    <p className="text-xs text-gray-300 leading-relaxed font-sans">⚡ {activeModule.industryTips}</p>
                  </div>

                  {/* 9. Assignment Section */}
                  <div className="p-5 bg-purple-950/10 border border-purple-500/20 rounded-2xl space-y-2">
                    <span className="text-[10px] font-mono font-bold tracking-wider text-purple-400 uppercase">Module Practice Assignment</span>
                    <p className="text-xs text-gray-200 leading-relaxed font-semibold">📝 {activeModule.assignment}</p>
                    <div className="flex items-center gap-2 pt-2">
                      <input type="checkbox" id="ass-check" className="rounded border-purple-500 text-purple-600 focus:ring-purple-500 w-4 h-4" />
                      <label htmlFor="ass-check" className="text-[11px] text-gray-400 cursor-pointer">Maine ye assignment notebook me solve kar liya hai!</label>
                    </div>
                  </div>

                  {/* 10. Interactive Quiz with score trigger */}
                  <div className="border border-purple-500/30 bg-[#080913]/90 rounded-2xl p-5 sm:p-6 space-y-4">
                    <div className="flex items-center justify-between border-b border-purple-500/10 pb-3">
                      <span className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                        <HelpCircle className="w-4 h-4 text-cyan-400" />
                        Interactive Quiz Section
                      </span>
                      <span className="text-[10px] font-mono text-cyan-400 font-semibold">+150 XP On Correct Answer</span>
                    </div>

                    {activeModule.quiz.map((qItem, qIdx) => (
                      <div key={qItem.id} className="space-y-3">
                        <p className="text-xs sm:text-sm font-bold text-gray-100">{qItem.question}</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {qItem.options.map((opt, oIdx) => {
                            const isSelected = quizSelectedOption === oIdx;
                            const isCorrect = oIdx === qItem.correctAnswer;
                            let btnStyle = "bg-white/5 border-purple-500/10 hover:bg-white/10 text-gray-300";

                            if (quizChecked) {
                              if (isCorrect) {
                                btnStyle = "bg-emerald-950/40 border-emerald-500 text-emerald-400";
                              } else if (isSelected) {
                                btnStyle = "bg-rose-950/40 border-rose-500 text-rose-400";
                              }
                            } else if (isSelected) {
                              btnStyle = "bg-cyan-950/30 border-cyan-400 text-cyan-400";
                            }

                            return (
                              <button
                                key={oIdx}
                                disabled={quizChecked}
                                onClick={() => handleQuizOptionSelect(oIdx)}
                                className={`p-3 rounded-xl border text-xs text-left cursor-pointer transition-colors ${btnStyle}`}
                              >
                                {opt}
                              </button>
                            );
                          })}
                        </div>

                        {/* Quiz Explanation in Hinglish */}
                        {quizChecked && (
                          <div className="p-3 bg-white/5 border border-purple-500/10 rounded-xl text-xs space-y-1">
                            <p className="text-cyan-400 font-bold">Hinglish Explanation:</p>
                            <p className="text-gray-300 font-sans">{qItem.explanation}</p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                </div>
              </div>
            </div>
          )}

          {/* TAB 2: PROJECTS PORTFOLIO WORKSPACE */}
          {activeTab === "projects" && (
            <div className="bg-[#0b0c16]/95 border border-purple-500/20 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 relative overflow-hidden backdrop-blur-md">
              <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 rounded-full blur-3xl -z-10" />

              <div>
                <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight flex items-center gap-2">
                  <Code className="w-5.5 h-5.5 text-purple-400" />
                  MERN Projects Vault ({projectsList.length} Industrial Clones)
                </h2>
                <p className="text-xs text-gray-400 mt-1">
                  Full production structure code templates aur architecture diagrams in plain Hinglish!
                </p>
              </div>

              {/* Side by side horizontal selector */}
              <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none border-b border-purple-500/10">
                {projectsList.map((proj) => (
                  <button
                    key={proj.id}
                    onClick={() => setActiveProject(proj)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold tracking-wide transition-all cursor-pointer border shrink-0 ${
                      activeProject.id === proj.id
                        ? "bg-purple-600 border-purple-400 text-white shadow-lg"
                        : "bg-black/30 border-purple-500/10 text-gray-400 hover:text-white"
                    }`}
                  >
                    {proj.title}
                  </button>
                ))}
              </div>

              {/* Selected project spec board */}
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <h3 className="text-xl font-bold text-white">{activeProject.title}</h3>
                  <span className={`px-2.5 py-1 rounded-md border text-[10px] font-mono font-bold uppercase self-start sm:self-auto ${
                    activeProject.difficulty === "Easy" ? "border-emerald-500/20 text-emerald-400 bg-emerald-950/10" :
                    activeProject.difficulty === "Medium" ? "border-amber-500/20 text-amber-400 bg-amber-950/10" :
                    "border-rose-500/20 text-rose-400 bg-rose-950/10"
                  }`}>
                    {activeProject.difficulty} Level
                  </span>
                </div>

                <p className="text-gray-300 text-xs sm:text-sm leading-relaxed">{activeProject.description}</p>

                {/* Tech specifications */}
                <div className="space-y-2">
                  <span className="text-[10px] font-mono font-bold tracking-wider text-purple-400 uppercase">Tech-Stack Used</span>
                  <div className="flex flex-wrap gap-1.5">
                    {activeProject.techStack.map((tech, i) => (
                      <span key={i} className="text-[10px] px-2.5 py-1 bg-white/5 border border-purple-500/15 rounded-md text-gray-300 font-mono">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Key Features */}
                <div className="p-4 bg-purple-950/10 border border-purple-500/15 rounded-xl space-y-2">
                  <span className="text-[10px] font-mono font-bold tracking-wider text-purple-400 uppercase block">Product Core Features</span>
                  <ul className="list-disc pl-4 space-y-1.5 text-xs text-gray-300">
                    {activeProject.features.map((feat, i) => <li key={i}>{feat}</li>)}
                  </ul>
                </div>

                {/* 3D architectural blueprint layout */}
                <div className="space-y-2">
                  <span className="text-[10px] font-mono font-bold tracking-wider text-purple-400 uppercase">System Decoupled Architecture</span>
                  <pre className="p-4 bg-slate-950 border border-purple-500/10 rounded-xl overflow-x-auto text-[10px] sm:text-xs font-mono text-cyan-300 leading-tight">
                    {activeProject.architectureDiagram}
                  </pre>
                </div>

                {/* Reusable file sources */}
                {activeProject.sourceCode.length > 0 && (
                  <div className="space-y-4">
                    <span className="text-[10px] font-mono font-bold tracking-wider text-cyan-400 uppercase block">Production Source Code</span>
                    {activeProject.sourceCode.map((file, i) => (
                      <div key={i} className="border border-purple-500/20 bg-slate-900/30 rounded-xl overflow-hidden">
                        <div className="bg-[#0c0d16] border-b border-purple-500/10 px-4 py-2 flex items-center justify-between">
                          <span className="text-[10px] font-mono text-cyan-400 font-bold">📄 {file.filename}</span>
                          <button
                            onClick={() => handleLoadToPlayground(file.code)}
                            className="text-[9px] px-2 py-0.5 bg-purple-600 text-white rounded font-semibold cursor-pointer hover:bg-purple-500 transition-colors"
                          >
                            Send to Playground
                          </button>
                        </div>
                        <pre className="p-4 overflow-x-auto text-xs font-mono text-purple-300 leading-relaxed bg-[#05060b]">
                          {file.code}
                        </pre>
                      </div>
                    ))}
                  </div>
                )}

                <div className="p-4 bg-cyan-950/15 border border-cyan-500/20 rounded-xl space-y-1">
                  <span className="text-[10px] font-mono font-bold tracking-wider text-cyan-400 uppercase">Build-Steps Explanation</span>
                  <p className="text-xs text-gray-300 leading-relaxed">⭐ {activeProject.explanation}</p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: INTERVIEW QUESTIONS FLASHCARDS */}
          {activeTab === "interview" && (
            <div className="bg-[#0b0c16]/95 border border-purple-500/20 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 relative overflow-hidden backdrop-blur-md">
              <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 rounded-full blur-3xl -z-10" />

              <div>
                <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight flex items-center gap-2">
                  <Trophy className="w-5.5 h-5.5 text-amber-400 animate-bounce" />
                  MERN Interview Flashcards
                </h2>
                <p className="text-xs text-gray-400 mt-1">
                  Tap below to review the most repeated technical questions asked in top tech companies like Google, Amazon, aur Microsoft!
                </p>
              </div>

              {/* Horizontal selector */}
              <div className="flex flex-wrap gap-2 border-b border-purple-500/10 pb-4">
                {interviewQuestions.map((qItem, idx) => (
                  <button
                    key={qItem.id}
                    onClick={() => setActiveInterviewIdx(idx)}
                    className={`px-3 py-1 text-[11px] font-semibold rounded-xl border cursor-pointer transition-colors ${
                      activeInterviewIdx === idx
                        ? "bg-amber-500 border-amber-400 text-slate-950 font-bold"
                        : "bg-white/5 border-purple-500/10 text-gray-400 hover:text-white"
                    }`}
                  >
                    {qItem.category} - {idx + 1}
                  </button>
                ))}
              </div>

              {/* Glowing active card */}
              {interviewQuestions[activeInterviewIdx] && (
                <div className="border border-amber-500/30 bg-[#0d0e1b]/90 rounded-2xl p-6 space-y-4 shadow-xl">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono text-amber-400 font-bold bg-amber-950/40 border border-amber-500/20 px-2 py-0.5 rounded uppercase">
                      Category: {interviewQuestions[activeInterviewIdx].category}
                    </span>
                    <span className={`text-[10px] font-mono font-bold ${
                      interviewQuestions[activeInterviewIdx].difficulty === "Easy" ? "text-emerald-400" :
                      interviewQuestions[activeInterviewIdx].difficulty === "Medium" ? "text-amber-400" : "text-rose-400"
                    }`}>
                      {interviewQuestions[activeInterviewIdx].difficulty}
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-white tracking-wide">
                    Q: {interviewQuestions[activeInterviewIdx].question}
                  </h3>

                  <div className="p-4 bg-white/5 border border-purple-500/10 rounded-xl space-y-2 leading-relaxed">
                    <span className="text-[10px] font-mono text-purple-400 font-bold uppercase block">Hinglish Answer Sheet:</span>
                    <p className="text-gray-200 text-xs sm:text-sm">{interviewQuestions[activeInterviewIdx].answer}</p>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 4: COMMUNICATION COACH */}
          {activeTab === "communication" && (
            <div className="bg-[#0b0c16]/95 border border-purple-500/20 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 relative overflow-hidden backdrop-blur-md">
              <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 rounded-full blur-3xl -z-10" />

              <div>
                <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight flex items-center gap-2">
                  <MessageSquare className="w-5.5 h-5.5 text-emerald-400" />
                  Hinglish Communication Coach Panel
                </h2>
                <p className="text-xs text-gray-400 mt-1">
                  Technical knowledge to dosto seekh li, par ab seekhna hai interviewer ke samne confidence se bolna!
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {communicationTips.map((tip) => (
                  <div key={tip.id} className="border border-purple-500/15 bg-slate-900/30 rounded-2xl p-5 space-y-3">
                    <h3 className="text-xs font-black text-cyan-400 uppercase tracking-wide">🎙️ {tip.title}</h3>
                    <p className="text-xs text-gray-300 italic">"{tip.hinglishIntro}"</p>
                    <ul className="list-decimal pl-4 text-[11px] text-gray-400 space-y-1 leading-normal">
                      {tip.keyPoints.map((pt, i) => <li key={i}>{pt}</li>)}
                    </ul>
                    <div className="p-3 bg-[#05060b] border border-purple-500/10 rounded-xl">
                      <span className="text-[9px] font-mono text-purple-400 font-bold block uppercase">Practice Task of the Day:</span>
                      <p className="text-gray-300 text-xs mt-1">🎯 {tip.practiceTask}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: PERSONALITY DEVELOPMENT */}
          {activeTab === "personality" && (
            <div className="bg-[#0b0c16]/95 border border-purple-500/20 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 relative overflow-hidden backdrop-blur-md">
              <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 rounded-full blur-3xl -z-10" />

              <div>
                <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight flex items-center gap-2">
                  <UserCheck className="w-5.5 h-5.5 text-indigo-400" />
                  MERN Career Personality Development Roadmap
                </h2>
                <p className="text-xs text-gray-400 mt-1">
                  Productivity boost hacks, subah ka coding discipline, aur concentration improve karne ke standards.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {personalityGuides.map((guide) => (
                  <div key={guide.id} className="border border-purple-500/15 bg-slate-900/30 rounded-2xl p-5 space-y-3">
                    <h3 className="text-xs font-black text-purple-400 uppercase tracking-wide">⚡ {guide.title}</h3>
                    <p className="text-xs text-gray-300">"{guide.hinglishExplanation}"</p>
                    <div className="space-y-1 text-[11px] text-gray-400">
                      <strong className="text-white block mb-1">Recommended routine details:</strong>
                      <p className="text-cyan-400 font-mono">{guide.recommendedRoutine}</p>
                    </div>
                    <ul className="list-disc pl-4 text-[11px] text-gray-400 space-y-1">
                      {guide.actionPlan.map((ac, i) => <li key={i}>{ac}</li>)}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 6: GOOGLE JOB ROADMAP */}
          {activeTab === "google" && (
            <div className="bg-[#0b0c16]/95 border border-purple-500/20 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 relative overflow-hidden backdrop-blur-md">
              <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 rounded-full blur-3xl -z-10" />

              <div>
                <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight flex items-center gap-2">
                  <Sparkles className="w-5.5 h-5.5 text-rose-400" />
                  Google Software Engineer Career Roadmap
                </h2>
                <p className="text-xs text-gray-400 mt-1">
                  MERN stack developers kaise Google L3/L4 roles coordinate kar sakte hain. Fully decoded step-by-step!
                </p>
              </div>

              {googleJobRoadmap.map((road) => (
                <div key={road.id} className="space-y-5">
                  <div className="flex items-center justify-between border-b border-purple-500/15 pb-3">
                    <span className="text-xs font-bold text-white font-mono">{road.title}</span>
                    <span className="text-[10px] font-mono text-cyan-400 font-bold">{road.timeline}</span>
                  </div>

                  <div className="p-4 bg-purple-950/15 border border-purple-500/25 rounded-2xl">
                    <span className="text-[10px] font-mono text-purple-400 font-bold uppercase block mb-1.5">Coach Mentorship Message</span>
                    <p className="text-xs sm:text-sm text-gray-200 leading-relaxed font-sans">{road.hinglishAdvice}</p>
                  </div>

                  <div className="space-y-2.5">
                    <span className="text-[10px] font-mono text-cyan-400 font-bold uppercase block">Core Milestones Timeline</span>
                    {road.steps.map((st, i) => (
                      <div key={i} className="flex items-start gap-3 bg-white/5 p-3 rounded-xl border border-purple-500/10 hover:border-purple-400/30 transition-all">
                        <div className="w-6 h-6 rounded-lg bg-cyan-950/30 border border-cyan-500/40 text-cyan-400 flex items-center justify-center font-bold text-xs shrink-0">
                          {i + 1}
                        </div>
                        <p className="text-xs text-gray-300 mt-0.5 leading-relaxed">{st}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB 7: LIVE PLAYGROUND */}
          {activeTab === "playground" && (
            <div className="space-y-4">
              <div className="text-center max-w-xl mx-auto">
                <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">Interactive Code Labs</h2>
                <p className="text-xs text-gray-400 mt-1">
                  Apne custom functions testing blocks banayein, arrays manipulation execute karein, aur instant logs output console me check karein!
                </p>
              </div>
              <Playground initialCode={userProgress.playgroundCode} />
            </div>
          )}

          {/* TAB 8: CERTIFICATE WORKSPACE */}
          {activeTab === "certificate" && (
            <Certificate xpPoints={userProgress.xpPoints} />
          )}

          {/* TAB 9: DAILY CHALLENGE WORKSPACE */}
          {activeTab === "daily_challenge" && (
            <DailyChallenge xpPoints={userProgress.xpPoints} onAwardXP={handleAwardXP} />
          )}
        </section>
      </main>

      {/* Floating share notification toast */}
      {showShareNotification && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 px-4 py-2.5 bg-cyan-950 border border-cyan-400/40 text-cyan-400 rounded-xl text-xs font-bold shadow-2xl flex items-center gap-1.5 z-50 animate-bounce">
          <CheckCircle className="w-4 h-4" />
          <span>Hinglish Roadmap link copied! WhatsApp/LinkedIn pe share karein!</span>
        </div>
      )}

      {/* Floating Hinglish AI Assistant Mentor Panel (connected to server side API) */}
      <AIChatMentor currentTopic={activeModule.title} />

      {/* Footer system details */}
      <footer className="mt-12 py-6 bg-[#040510] border-t border-purple-500/10 text-center select-text">
        <div className="max-w-7xl mx-auto px-4 text-[10px] sm:text-xs text-gray-500 space-y-1">
          <p>© 2026 MERN Mastery 3D. Crafted lovingly for future full-stack specialists.</p>
          <p className="font-mono">Current Server Status: Online | Core Stack: Node, Express, Vite, React & Google Gemini Flash</p>
        </div>
      </footer>
    </div>
  );
}
