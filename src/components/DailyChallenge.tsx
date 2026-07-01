import React, { useState, useEffect } from "react";
import { Award, CheckCircle2, AlertCircle, HelpCircle, Flame, Calendar, Sparkles, RefreshCw, Trophy, ArrowRight, Share2 } from "lucide-react";
import { modulesList } from "../data/modulesData";
import { modulesCatalog } from "../data/modulesCatalog";
import { QuizQuestion } from "../types";

interface DailyChallengeProps {
  xpPoints: number;
  onAwardXP: (amount: number) => void;
}

// Custom supplementary quiz questions representing various modules in our 40-module catalog
const supplementaryQuestions: { moduleTitle: string; category: string; quiz: QuizQuestion }[] = [
  {
    moduleTitle: "Git",
    category: "Fundamentals",
    quiz: {
      id: "dc_git_1",
      question: "Git me change list ko direct dynamic staging area me add karne ke liye kaunsi command use hoti hai?",
      options: ["git add .", "git commit -m", "git push origin", "git init"],
      correctAnswer: 0,
      explanation: "git add . command se current directory ke saare modifications staging area me stage ho jaate hain, taaki unhe agle commit me save kiya ja sake."
    }
  },
  {
    moduleTitle: "Flexbox Layout",
    category: "Frontend",
    quiz: {
      id: "dc_flex_1",
      question: "Flexbox layout me items ko main axis ke along distribute karne ke liye kaunsi CSS property use hoti hai?",
      options: ["align-items", "justify-content", "flex-direction", "grid-gap"],
      correctAnswer: 1,
      explanation: "justify-content property horizontal alignment ya main-axis par items ki spacing/distribution ko define karti hai."
    }
  },
  {
    moduleTitle: "Tailwind CSS",
    category: "Frontend",
    quiz: {
      id: "dc_tailwind_1",
      question: "Tailwind CSS me responsive screen sizes ko manage karne ke liye kaunsa prefix default use hota hai?",
      options: ["md:", "desktop:", "screen-md:", "min-width:"],
      correctAnswer: 0,
      explanation: "md:, lg:, sm: jaise responsive screen prefixes Tailwind CSS me utility-first media queries create karne ke liye use kiye jaate hain."
    }
  },
  {
    moduleTitle: "React Router",
    category: "Frontend",
    quiz: {
      id: "dc_router_1",
      question: "React Router v6 me current route parameters ko read karne ke liye kaunsa dynamic hook use hota hai?",
      options: ["useRouteMatch", "useParams", "useLocation", "useNavigate"],
      correctAnswer: 1,
      explanation: "useParams() hook dynamic URL path segment parameters ko retrieve karke key-value object form me access deta hai."
    }
  },
  {
    moduleTitle: "Redux Toolkit",
    category: "Frontend",
    quiz: {
      id: "dc_redux_1",
      question: "Redux Toolkit me actions aur reducers ko easily simplify karne ke liye kya construct use kiya jata hai?",
      options: ["createSlice", "createStore", "applyMiddleware", "connectDispatch"],
      correctAnswer: 0,
      explanation: "createSlice function state, reducers aur actions generator ko ek single modular scope structure me collect karti hai."
    }
  },
  {
    moduleTitle: "Express.js Basics",
    category: "Backend",
    quiz: {
      id: "dc_express_1",
      question: "Express JS application me incoming request body (JSON format) ko parse karne ke liye kya compile middleware build in hai?",
      options: ["express.parse()", "express.json()", "bodyParser.urlencoded()", "express.router()"],
      correctAnswer: 1,
      explanation: "express.json() ek built-in middleware function hai jo incoming incoming requests ko parse karke req.body object set karta hai."
    }
  },
  {
    moduleTitle: "JWT Token Security",
    category: "Backend",
    quiz: {
      id: "dc_jwt_1",
      question: "JWT (JSON Web Token) signatures ka main purpose client side security me kya represent karta hai?",
      options: ["Payload encryption securely", "Data integrity and authenticity verification", "Session database reduction", "Password decryption key"],
      correctAnswer: 1,
      explanation: "JWT signatures guarantee dete hain ki client ke pass payload change nahi hua hai (Integrity verification mechanism)."
    }
  },
  {
    moduleTitle: "MongoDB",
    category: "Backend",
    quiz: {
      id: "dc_mongo_1",
      question: "MongoDB kis type ka database system classify kiya jata hai?",
      options: ["Relational Database (SQL)", "NoSQL Document-based Store", "Graph Network Memory", "Simple CSV Flat Storage"],
      correctAnswer: 1,
      explanation: "MongoDB ek advanced Document database hai jisme record entries JSON-like format documents (BSON) collections me store hote hain."
    }
  },
  {
    moduleTitle: "Docker Container Basics",
    category: "DevOps & SQL",
    quiz: {
      id: "dc_docker_1",
      question: "Docker images ke behavior instruction code ko run sequence script define karne ke liye kaunsi file banti hai?",
      options: ["Docker.json", "Dockerfile", "docker-compose.yml", "DockerRun.config"],
      correctAnswer: 1,
      explanation: "Dockerfile text instructions file hai jo Docker container create karne ka environment blueprint steps construct karta hai."
    }
  },
  {
    moduleTitle: "SQL Database Basics",
    category: "DevOps & SQL",
    quiz: {
      id: "dc_sql_1",
      question: "SQL database tables me do related tables ko filter match data ke basis par query link karne ke liye kya use hota hai?",
      options: ["UNION MATCH", "JOIN statement", "FOREIGN REFERENCE", "CONCAT_TABLES"],
      correctAnswer: 1,
      explanation: "JOIN statements (jaise INNER JOIN, LEFT JOIN) different tables ke matching values ke standard keys relation use karke records combine karte hain."
    }
  },
  {
    moduleTitle: "TypeScript Integration",
    category: "Fundamentals",
    quiz: {
      id: "dc_ts_1",
      question: "TypeScript variable declarations me strict dynamic types lock lagane ke liye kis keyword structure syntax ko support kiya jata hai?",
      options: ["interface & type", "proto definitions", "struct modules", "restrict class"],
      correctAnswer: 0,
      explanation: "interface aur type keywords TS schemas declarations properties strict safety check enforce karne ke liye compile level par use hote hain."
    }
  },
  {
    moduleTitle: "AWS Basics",
    category: "DevOps & SQL",
    quiz: {
      id: "dc_aws_1",
      question: "AWS me static assets (Images, Videos, Frontend builds) host karne ke liye kaunsi dedicated cloud bucket storage use hoti hai?",
      options: ["EC2 Instance Container", "Simple Storage Service (S3)", "RDS Database Replica", "Lambda Cloud Function"],
      correctAnswer: 1,
      explanation: "Amazon S3 (Simple Storage Service) advanced scale web buckets provide karta hai static images aur general assets hosting ke liye."
    }
  }
];

export default function DailyChallenge({ xpPoints, onAwardXP }: DailyChallengeProps) {
  // Aggregate all possible questions
  const [allChallenges, setAllChallenges] = useState<{ moduleTitle: string; category: string; quiz: QuizQuestion }[]>([]);
  const [currentChallenge, setCurrentChallenge] = useState<{ moduleTitle: string; category: string; quiz: QuizQuestion } | null>(null);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isChecked, setIsChecked] = useState(false);
  const [isPracticeMode, setIsPracticeMode] = useState(false);
  const [claimedToday, setClaimedToday] = useState(false);
  const [streakCount, setStreakCount] = useState(3);
  const [feedbackMsg, setFeedbackMsg] = useState("");
  const [showXPNotification, setShowXPNotification] = useState(false);

  // Generate localized seed index based on current calendar date
  const getTodaySeedIndex = (totalSize: number) => {
    if (totalSize === 0) return 0;
    const today = new Date();
    const dateNum = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();
    return dateNum % totalSize;
  };

  useEffect(() => {
    // Collect challenges from primary modulesList + supplementary ones
    const list: { moduleTitle: string; category: string; quiz: QuizQuestion }[] = [];

    // Add from primary data
    modulesList.forEach((m) => {
      if (m.quiz && m.quiz.length > 0) {
        m.quiz.forEach((q) => {
          list.push({
            moduleTitle: m.title,
            category: m.category,
            quiz: q
          });
        });
      }
    });

    // Add from supplementary
    supplementaryQuestions.forEach((s) => {
      list.push(s);
    });

    setAllChallenges(list);

    // Check if challenge is already completed today via localstorage
    const todayStr = new Date().toDateString();
    const lastClaimDate = localStorage.getItem("mern_mastery_last_claim_date");
    if (lastClaimDate === todayStr) {
      setClaimedToday(true);
    }

    const savedStreak = localStorage.getItem("mern_mastery_daily_streak_count");
    if (savedStreak) {
      setStreakCount(parseInt(savedStreak, 10));
    }
  }, []);

  // Pick default daily or random practice question
  useEffect(() => {
    if (allChallenges.length === 0) return;

    if (!isPracticeMode) {
      // Pick based on today's calendar seed
      const seedIdx = getTodaySeedIndex(allChallenges.length);
      setCurrentChallenge(allChallenges[seedIdx]);
    } else {
      // Practice mode picks absolute random question
      const randomIdx = Math.floor(Math.random() * allChallenges.length);
      setCurrentChallenge(allChallenges[randomIdx]);
    }
    // Reset state on question swap
    setSelectedOption(null);
    setIsChecked(false);
    setFeedbackMsg("");
  }, [allChallenges, isPracticeMode]);

  const handleOptionSelect = (optionIdx: number) => {
    if (isChecked) return; // cannot change once validated
    setSelectedOption(optionIdx);
  };

  const handleVerify = () => {
    if (selectedOption === null || !currentChallenge) return;
    setIsChecked(true);

    const isCorrect = selectedOption === currentChallenge.quiz.correctAnswer;
    if (isCorrect) {
      setFeedbackMsg("🎉 Bahut badiya! Aapka answer bilkul sahi hai!");
      if (!isPracticeMode && !claimedToday) {
        // Trigger rewards!
        onAwardXP(250);
        setClaimedToday(true);
        const newStreak = streakCount + 1;
        setStreakCount(newStreak);
        setShowXPNotification(true);

        const todayStr = new Date().toDateString();
        localStorage.setItem("mern_mastery_last_claim_date", todayStr);
        localStorage.setItem("mern_mastery_daily_streak_count", String(newStreak));
        setTimeout(() => setShowXPNotification(false), 3000);
      }
    } else {
      setFeedbackMsg("❌ Oops! Yeh sahi answer nahi hai. Dobara koshish karein!");
    }
  };

  const handleNextPracticeQuestion = () => {
    if (allChallenges.length === 0) return;
    const randomIdx = Math.floor(Math.random() * allChallenges.length);
    setCurrentChallenge(allChallenges[randomIdx]);
    setSelectedOption(null);
    setIsChecked(false);
    setFeedbackMsg("");
  };

  if (!currentChallenge) {
    return (
      <div className="flex items-center justify-center p-12 text-gray-400">
        <RefreshCw className="w-6 h-6 animate-spin text-purple-400 mr-2" />
        <span>Loading Today's Challenge...</span>
      </div>
    );
  }

  // Generate calendar days checklist
  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const todayDayIdx = new Date().getDay();

  return (
    <div id="daily_challenge_hub" className="bg-[#0b0c16]/95 border border-purple-500/20 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden backdrop-blur-md space-y-6">
      {/* Glow Effects */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-purple-500/5 rounded-full blur-3xl -z-10" />

      {/* Floating XP Rewards Popup */}
      {showXPNotification && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 px-6 py-4 bg-gradient-to-r from-amber-500 to-yellow-500 text-black font-extrabold rounded-2xl shadow-3xl flex items-center gap-2 z-50 animate-bounce scale-105 border-2 border-yellow-300">
          <Trophy className="w-6 h-6 animate-pulse" />
          <span className="text-sm font-sans tracking-tight">CONGRATS! +250 XP earned for today! 🚀</span>
        </div>
      )}

      {/* Header bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-purple-500/10 pb-5">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-500/10 border border-amber-500/30 text-amber-400 rounded-lg text-[10px] font-mono font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            Super Bonus Challenge
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center gap-2">
            <Trophy className="w-6 h-6 text-amber-400" />
            MERN Daily Quiz Challenge
          </h2>
          <p className="text-xs text-gray-400">
            Har din ek random module ka complex quiz solve karein aur <strong className="text-amber-400">+250 XP</strong> bonus claim karein!
          </p>
        </div>

        {/* Challenge mode toggle */}
        <div className="flex items-center bg-black/40 border border-purple-500/10 p-1.5 rounded-2xl gap-1 shrink-0">
          <button
            onClick={() => setIsPracticeMode(false)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              !isPracticeMode
                ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md"
                : "text-gray-400 hover:text-white"
            }`}
          >
            Today's Official
          </button>
          <button
            onClick={() => setIsPracticeMode(true)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              isPracticeMode
                ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md"
                : "text-gray-400 hover:text-white"
            }`}
          >
            Practice Mode
          </button>
        </div>
      </div>

      {/* Gamified stats bar (Calendar/Streak) */}
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 bg-purple-950/10 border border-purple-500/10 rounded-2xl p-4">
        {/* Streak details */}
        <div className="sm:col-span-4 flex items-center gap-3 border-b sm:border-b-0 sm:border-r border-purple-500/10 pb-3 sm:pb-0 sm:pr-4">
          <div className="w-12 h-12 rounded-xl bg-orange-600/10 border border-orange-500/20 flex items-center justify-center text-orange-400">
            <Flame className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <span className="text-[10px] font-mono text-purple-400 block uppercase">Challenge Streak</span>
            <strong className="text-lg text-white font-sans">{streakCount} Days Active</strong>
          </div>
        </div>

        {/* Weekly calendar checkboxes */}
        <div className="sm:col-span-8 flex items-center justify-between sm:pl-4 overflow-x-auto gap-2">
          {weekdays.map((day, idx) => {
            const isToday = idx === todayDayIdx;
            const isPastCompleted = idx < todayDayIdx; // mockup simulation for past days of current week
            return (
              <div key={day} className="flex flex-col items-center gap-1 shrink-0">
                <span className={`text-[9px] font-mono font-bold ${isToday ? "text-cyan-400" : "text-gray-500"}`}>{day}</span>
                <div className={`w-7 h-7 rounded-lg flex items-center justify-center border text-[10px] font-mono font-bold ${
                  isToday && claimedToday
                    ? "bg-amber-500/10 border-amber-500 text-amber-400"
                    : isPastCompleted
                    ? "bg-cyan-950/20 border-cyan-500/30 text-cyan-400"
                    : isToday
                    ? "border-cyan-400/50 text-cyan-300 animate-pulse bg-white/5"
                    : "border-white/5 text-gray-600 bg-black/10"
                }`}>
                  {isPastCompleted || (isToday && claimedToday) ? "✓" : "?"}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Active Question Module Card */}
      <div className="bg-[#0c0d16] border border-purple-500/15 rounded-3xl p-5 sm:p-6 space-y-5 relative">
        <div className="absolute top-4 right-4 text-[9px] font-mono text-cyan-400 font-bold bg-cyan-950/40 px-2.5 py-1 rounded-full border border-cyan-500/10 uppercase">
          {currentChallenge.category} • Module: {currentChallenge.moduleTitle}
        </div>

        <div className="space-y-1">
          <span className="text-[10px] font-mono text-purple-400 uppercase tracking-wider block">QUESTION</span>
          <h3 className="text-xs sm:text-sm font-bold text-white font-sans leading-relaxed">
            {currentChallenge.quiz.question}
          </h3>
        </div>

        {/* Answer Options Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {currentChallenge.quiz.options.map((option, idx) => {
            const isSelected = selectedOption === idx;
            const isCorrect = idx === currentChallenge.quiz.correctAnswer;
            let btnStyle = "bg-white/5 border-purple-500/10 hover:bg-white/10 text-gray-300 hover:border-purple-500/30";

            if (isChecked) {
              if (isCorrect) {
                btnStyle = "bg-emerald-950/30 border-emerald-500 text-emerald-400";
              } else if (isSelected) {
                btnStyle = "bg-rose-950/30 border-rose-500 text-rose-400";
              } else {
                btnStyle = "bg-black/20 border-white/5 text-gray-600";
              }
            } else if (isSelected) {
              btnStyle = "bg-cyan-950/30 border-cyan-400 text-cyan-300";
            }

            return (
              <button
                key={idx}
                disabled={isChecked}
                onClick={() => handleOptionSelect(idx)}
                className={`p-4 rounded-2xl border text-xs text-left cursor-pointer transition-all duration-200 relative group overflow-hidden ${btnStyle}`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-6 h-6 rounded-lg flex items-center justify-center font-mono font-bold text-[10px] border ${
                    isSelected
                      ? "border-cyan-400 text-cyan-300"
                      : "border-gray-700 text-gray-400 group-hover:border-purple-400"
                  }`}>
                    {String.fromCharCode(65 + idx)}
                  </div>
                  <span className="flex-1 font-sans">{option}</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Action button bar */}
        <div className="flex flex-col sm:flex-row items-center gap-3 pt-3">
          {!isChecked ? (
            <button
              onClick={handleVerify}
              disabled={selectedOption === null}
              className={`w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 shadow-lg shadow-purple-900/20 transition-all ${
                selectedOption === null ? "opacity-50 cursor-not-allowed" : "cursor-pointer active:scale-95"
              }`}
            >
              <CheckCircle2 className="w-4 h-4" />
              Verify My Answer
            </button>
          ) : (
            <div className="w-full sm:w-auto flex gap-3">
              {isPracticeMode ? (
                <button
                  onClick={handleNextPracticeQuestion}
                  className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 cursor-pointer shadow-lg active:scale-95 transition-transform"
                >
                  <RefreshCw className="w-4 h-4" />
                  Try Next Practice Question
                </button>
              ) : (
                <div className="text-xs font-mono text-cyan-400 bg-cyan-950/20 border border-cyan-500/20 px-4 py-3 rounded-xl">
                  {claimedToday ? "🎉 Today's Official Challenge Completed! Claimed +250 XP." : "✓ Challenge solved."}
                </div>
              )}
            </div>
          )}

          {selectedOption === null && !isChecked && (
            <span className="text-[10px] text-gray-500 font-mono flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5" />
              Option select karein fir verify button tap karein
            </span>
          )}
        </div>

        {/* Feedback Section */}
        {isChecked && (
          <div className={`p-4 rounded-2xl border transition-all space-y-2 ${
            selectedOption === currentChallenge.quiz.correctAnswer
              ? "bg-emerald-950/15 border-emerald-500/20 text-emerald-300"
              : "bg-rose-950/15 border-rose-500/20 text-rose-300"
          }`}>
            <span className="text-[10px] font-mono font-black uppercase tracking-wider block">EXPLANATION (HINGLISH)</span>
            <p className="text-xs sm:text-sm font-sans italic">
              {feedbackMsg}
            </p>
            <p className="text-xs text-gray-300 leading-relaxed font-sans pt-1">
              📚 {currentChallenge.quiz.explanation}
            </p>
          </div>
        )}
      </div>

      {/* Bonus tips footer info */}
      <div className="border border-purple-500/10 bg-purple-950/5 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-gray-400">
        <span className="flex items-center gap-1.5">
          <Award className="w-4.5 h-4.5 text-amber-400" />
          Keep learning every single day! Continuous consistency raises your MERN specialist levels fast.
        </span>
        <button
          onClick={() => {
            navigator.clipboard.writeText("https://mern-mastery-3d.com/daily-challenge");
            alert("Daily Challenge link copied to clipboard! Share it with your friends! 🚀");
          }}
          className="text-cyan-400 font-bold hover:text-cyan-300 transition-colors flex items-center gap-1 cursor-pointer shrink-0"
        >
          <Share2 className="w-3.5 h-3.5" />
          Invite Coding Friends
        </button>
      </div>
    </div>
  );
}
