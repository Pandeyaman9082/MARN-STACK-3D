import { CommunicationTip, PersonalityGuide, GoogleJobGuide } from "../types";

export const communicationTips: CommunicationTip[] = [
  {
    id: "comm1",
    title: "Daily Speaking Practice",
    hinglishIntro: "English bolna koi rocket science nahi hai. Bas rozana dosto se ya khud se 15 minute mirror ke samne mirror speaking start karo.",
    keyPoints: [
      "Talk in English or simple Hinglish for 15 minutes daily about your coding goals.",
      "Record your voice notes aur suno tum kahan hesitate ho rahe ho.",
      "Don't worry about correct advanced grammar, bas flow flow banana seekho pehle."
    ],
    practiceTask: "Aaj hi ek voice note record karo: 'Why do I want to be a MERN Stack Developer?' use khud suno aur evaluate karo.",
    industryTip: "Tech startups me standard simple communication direct, honest, aur precise bolne se select hoti hai."
  },
  {
    id: "comm2",
    title: "Hinglish to English Shift",
    hinglishIntro: "Kaise thode thode karke Roman Hinglish keywords ko professional global English terms me badlein.",
    keyPoints: [
      "Hindi sentence me direct English tech words insert karein (e.g. state management, API routes).",
      "Read English tech blogs, medium tutorials, or README documentation loudly.",
      "Suno how industry giants speak on YouTube podcasts."
    ],
    practiceTask: "Describe your recent Todo project in full simple English with proper tech words.",
    industryTip: "English fluency badhne se remote clients aur overseas high-paying contracts directly close ho jate hain."
  },
  {
    id: "comm3",
    title: "Interview Speaking Tactics",
    hinglishIntro: "Coding interview me sirf solve karna kaafi nahi hota, interviewers chahte hain ki aap apne thought process ko unhe bolkar samjhayein.",
    keyPoints: [
      "Use 'Think Aloud' strategy: Jo bhi code likh rahe ho use loudly explain karte jao.",
      "Ask clarifying questions before writing code (e.g., 'Do we need to handle negative numbers in this array?').",
      "Say 'I don't know but here's how I would try to solve this' if you get stuck."
    ],
    practiceTask: "Explain the classic 'Two Sum' DSA question to a virtual teammate out loud right now.",
    industryTip: "Interviewers absolute correct answers se zyada logical problem solving and talking style ko rate karte hain."
  }
];

export const personalityGuides: PersonalityGuide[] = [
  {
    id: "pers1",
    title: "Discipline & Morning Routine",
    hinglishExplanation: "Agar life me consistency laani hai toh morning discipline build karna sabse bada secret hack hai.",
    actionPlan: [
      "Wake up early: Subah 6-7 baje uthein aur check dev blogs for 10 mins.",
      "Drink water & stretch your body before sitting on the screen chair.",
      "No direct mobile social feeds check for the first 1 hour of the day!"
    ],
    recommendedRoutine: "6:00 AM - Wake up, 6:30 AM - Quick planning of 3 core tasks, 7:00 AM - Deep Coding session for 2 hours.",
    proTips: "Subah ka dimag shaant hota hai, heavy DSA algorithms subah solve karne se retention level 2x badhta hai."
  },
  {
    id: "pers2",
    title: "Focus Improvement Techniques",
    hinglishExplanation: "Aaj kal attention span bohot chota ho gaya hai. Notification lights aur messages focus kharab kar dete hain.",
    actionPlan: [
      "Use Pomodoro Technique: 25 mins deep coding + 5 mins rest.",
      "Keep phone in another room or put it strictly on 'Do Not Disturb' state.",
      "Close useless browser tabs except the documentation pages."
    ],
    recommendedRoutine: "Set a daily 3-hour block called 'Mera Deep Work Zone' where you are completely offline from social media.",
    proTips: "Focus badhana ek muscle ki tarah hai. Shuruat me mushkil hoga, par 21 days me ye system natural ban jayega."
  }
];

export const googleJobRoadmap: GoogleJobGuide[] = [
  {
    id: "g_road1",
    title: "Google Software Engineer Career Path",
    description: "Complete guide of how to target Google L3/L4 Software Engineering roles.",
    steps: [
      "Master Data Structures & Algorithms (DSA): Focus on Arrays, HashMaps, Trees, Graphs, DP.",
      "Build outstanding full stack open-source MERN projects (Netflix/Instagram clones aren't enough, create unique utility tools!).",
      "Optimize your LinkedIn profiles with correct tags and clear project videos.",
      "Solve at least 300+ quality LeetCode problems (Easy-Medium levels focus).",
      "Get a strong referral from an active Google Engineer."
    ],
    hinglishAdvice: "Dosto, Google me resume select hona pehla step hai jo referrals aur strong active GitHub open-source contributions se aasaani se ho jata hai. Uske baad online coding tests aur 4 round technical whiteboard interview hote hain jahan dynamic programming aur graphs algorithms dhoondhe jate hain. Confidence aur system design parameters understand karna bohot beneficial hai.",
    timeline: "Target: 6 to 9 Months consistency roadmap.",
  }
];
