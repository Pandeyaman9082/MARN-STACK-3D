export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number; // index of correct option
  explanation: string; // Hinglish explanation
}

export interface ModuleDetail {
  id: number;
  title: string;
  category: "Fundamentals" | "Frontend" | "Backend" | "Advanced" | "DevOps & SQL";
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  estimatedTime: string;
  theory: string;
  hinglishExplanation: string;
  analogy: string;
  diagramAscii: string;
  practicalExample: string; // Live code explanation
  miniProject: {
    title: string;
    code: string;
    instructions: string;
  };
  interviewQs: { q: string; a: string }[];
  assignment: string;
  cheatSheet: string;
  bestPractices: string[];
  commonMistakes: string[];
  industryTips: string;
  quiz: QuizQuestion[];
}

export interface ProjectDetail {
  id: string;
  title: string;
  description: string;
  difficulty: "Easy" | "Medium" | "Hard";
  techStack: string[];
  features: string[];
  architectureDiagram: string;
  sourceCode: {
    filename: string;
    code: string;
    language: string;
  }[];
  explanation: string;
}

export interface CommunicationTip {
  id: string;
  title: string;
  hinglishIntro: string;
  keyPoints: string[];
  practiceTask: string;
  industryTip: string;
}

export interface PersonalityGuide {
  id: string;
  title: string;
  hinglishExplanation: string;
  actionPlan: string[];
  recommendedRoutine: string;
  proTips: string;
}

export interface GoogleJobGuide {
  id: string;
  title: string;
  description: string;
  steps: string[];
  hinglishAdvice: string;
  timeline: string;
}

export interface InterviewQnA {
  id: string;
  category: "JavaScript" | "React" | "Node" | "MongoDB" | "Express" | "HTML/CSS" | "Google" | "Amazon/Microsoft" | "Behavioral";
  question: string;
  answer: string; // Hinglish + English
  difficulty: "Easy" | "Medium" | "Hard";
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  iconName: string;
  xpValue: number;
  unlockedAt?: string;
}

export interface UserProgress {
  completedModules: number[];
  completedQuizzes: Record<number, number>; // moduleId -> score percentage
  bookmarks: string[]; // item IDs (module-X, project-Y, interview-Z)
  xpPoints: number;
  currentLevel: number;
  unlockedAchievements: string[];
  playgroundCode: string;
  userName: string;
  dailyStreak: number;
  lastActiveDate: string;
}
