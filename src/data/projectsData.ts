import { ProjectDetail } from "../types";

export const projectsList: ProjectDetail[] = [
  {
    id: "todo",
    title: "Todo App",
    description: "MERN Stack ka sabse pehla aur classic project. Isme hum fundamental CRUD operations perform karna seekhte hain.",
    difficulty: "Easy",
    techStack: ["React", "Express.js", "Node.js", "MongoDB"],
    features: [
      "Create tasks with instant priority tag labels",
      "Toggle status (Pending vs Completed) with beautiful transitions",
      "Persistent cloud database storage via MongoDB",
      "Clean Glassmorphic listing layout"
    ],
    architectureDiagram: `
      [React UI Frontend]
             |
       (Axios Requests)
             v
      [Express.js Server Routes]
             |
       (Mongoose Queries)
             v
      [MongoDB Document Collections]
    `,
    sourceCode: [
      {
        filename: "TodoModel.js",
        code: `const mongoose = require('mongoose');

const TodoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  completed: { type: Boolean, default: false },
  priority: { type: String, enum: ['Low', 'Medium', 'High'], default: 'Medium' }
}, { timestamps: true });

module.exports = mongoose.model('Todo', TodoSchema);`,
        language: "javascript"
      },
      {
        filename: "server.js",
        code: `const express = require('express');
const router = express.Router();
const Todo = require('./TodoModel');

// GET all todos
router.get('/todos', async (req, res) => {
  try {
    const todos = await Todo.find().sort({ createdAt: -1 });
    res.json(todos);
  } catch (err) {
    res.status(500).json({ error: "DB error aaya bhai!" });
  }
});

// POST new todo
router.post('/todos', async (req, res) => {
  const { title, priority } = req.body;
  try {
    const newTodo = new Todo({ title, priority });
    await newTodo.save();
    res.status(201).json(newTodo);
  } catch (err) {
    res.status(400).json({ error: "Validation fail ho gayi!" });
  }
});`,
        language: "javascript"
      }
    ],
    explanation: "Yeh app client-side aur backend connectivity samajhne ka best tarika hai. Pehle React client inputs handle karta hai, Express use API call me catch karta hai aur Mongoose database model me append kar deta hai."
  },
  {
    id: "weather",
    title: "Weather App",
    description: "External API Integration seekhne ke liye perfect project. Isme hum third-party Weather APIs se live location details fetch karte hain.",
    difficulty: "Easy",
    techStack: ["React", "CSS Grid", "OpenWeather API"],
    features: ["Search dynamic city weather", "Celsius to Fahrenheit toggle conversion", "Wind speed meter displays", "Dynamic weather icons background shift"],
    architectureDiagram: `[React UI] --(Fetch request + City)--> [OpenWeather Remote Server]`,
    sourceCode: [
      {
        filename: "WeatherPanel.jsx",
        code: `import { useState } from 'react';
export function WeatherPanel() {
  const [city, setCity] = useState('');
  const [report, setReport] = useState(null);

  const getReport = async () => {
    const res = await fetch(\`https://api.openweathermap.org/data/2.5/weather?q=\${city}&appid=MOCK_KEY\`);
    const data = await res.json();
    setReport(data);
  };
  return (
    <div>
      <input onChange={(e) => setCity(e.target.value)} placeholder="City name..." />
      <button onClick={getReport}>Check Mausam</button>
    </div>
  );
}`,
        language: "javascript"
      }
    ],
    explanation: "Is project se browser fetch handlers, JSON processing, aur external APIs keys management ki strong understanding build hoti hai."
  },
  {
    id: "movie",
    title: "Movie App",
    description: "Search filter dynamic components aur custom visual bento grids styling explore karne ka custom catalog website.",
    difficulty: "Easy",
    techStack: ["React", "Tailwind CSS", "OMDb API"],
    features: ["Search dynamic movies registry", "Save movie to Favorites listing", "Read individual rating summaries", "Category-wise infinite scroll list"],
    architectureDiagram: `[React State: query] --(OMDb HTTP API)--> [Movie Cards Renderer]`,
    sourceCode: [],
    explanation: "Isme React local state variables mapping aur debounced API handlers implement kiye jate hain taaki request rate limit exceed na ho."
  },
  {
    id: "blog",
    title: "Blog Website",
    description: "Multi-author, full-featured editorial platform jisme image uploading features aur standard markdown support present hai.",
    difficulty: "Medium",
    techStack: ["MongoDB", "Express", "React", "Node", "Multer"],
    features: ["Create blogs with real-time formatting preview", "Custom local file uploads via Multer engine", "Post Comments validation", "Author dashboard control settings"],
    architectureDiagram: `[Client Editor] --(form-data)--> [Multer Middleware] --(Save files)--> [Static Assets Folder]`,
    sourceCode: [],
    explanation: "Multer parsing aur Express static files serving routes build karne ke concepts clear karne ke liye yeh standard blog design hai."
  },
  {
    id: "chat",
    title: "Chat App",
    description: "Socket.io ka use karke instant bi-directional chatting framework jahan group messaging aur private rooms configured hain.",
    difficulty: "Medium",
    techStack: ["React", "Node.js", "Express", "Socket.io"],
    features: ["Real-time instant message relays", "Active users status tracking (Online indicators)", "Custom channel group chat rooms", "Typing indicator animation"],
    architectureDiagram: `[React Chat Client] <======(WebSockets connection)======> [Node Socket.io Broker]`,
    sourceCode: [
      {
        filename: "SocketServer.js",
        code: `const io = require('socket.io')(server, { cors: { origin: "*" } });

io.on('connection', (socket) => {
  console.log('Naya user connect hua bhai: ' + socket.id);

  socket.on('join_room', (roomName) => {
    socket.join(roomName);
  });

  socket.on('send_msg', (data) => {
    socket.to(data.room).emit('recv_msg', data);
  });
});`,
        language: "javascript"
      }
    ],
    explanation: "Socket servers HTTP models se different persistent connections operate karte hain, jisse polling delays complete eliminate ho jate hain."
  },
  {
    id: "social",
    title: "Social Media App",
    description: "Follow-unfollow mechanics, secure user timelines feed generator, likes, comments, aur cloud storage uploading platform.",
    difficulty: "Hard",
    techStack: ["MERN", "JWT", "Cloudinary", "Mongoose"],
    features: ["Dynamic user dashboard newsfeed", "Likes & comments real-time counter updates", "Followers registry matching algorithms", "Cloud hosted profile avatars"],
    architectureDiagram: `[React UI Feed] --(JWT Token)--> [Express Gateway] --(Aggregations)--> [MongoDB Feed Cluster]`,
    sourceCode: [],
    explanation: "Mongoose aggregate query lookup functions aur custom notifications triggers build karne ka absolute best industry project."
  },
  {
    id: "ecommerce",
    title: "E-Commerce Store",
    description: "Stripe secure integration, dynamic state global shopping carts, inventory counter checks, and order checkout tracking.",
    difficulty: "Hard",
    techStack: ["React", "Redux Toolkit", "Node", "Express", "MongoDB", "Stripe API"],
    features: ["Stripe secure session checkout processing", "Shopping cart state syncing with local storage memory", "Admin stock quantity edit modules", "Invoice generation system"],
    architectureDiagram: `[React cart items] --(Session payload)--> [Express Stripe Route] --(Verify payment)--> [MongoDB order logs]`,
    sourceCode: [],
    explanation: "Enterprise systems me Stripe webhooks listen karke local product inventory automatically alter karne ki industry patterns seekhein."
  },
  {
    id: "admin",
    title: "Admin Dashboard",
    description: "Recharts visual charts visualizer panels, custom table filtering rows, and dynamic user security tracking dashboards.",
    difficulty: "Medium",
    techStack: ["React", "Tailwind CSS", "Recharts", "Lucide React"],
    features: ["Live visual financial revenue charts panels", "Status user database tables tracking", "Interactive system diagnostics widget panels", "Excel spreadsheets exported logs"],
    architectureDiagram: `[Diagnostics DB Stats] --(JSON response)--> [Recharts Area & Bar visual graphs]`,
    sourceCode: [],
    explanation: "Data transformation analytics algorithms aur modular clean dashboard rails designs explore karne ka excellent system design base."
  },
  {
    id: "netflix",
    title: "Netflix Clone",
    description: "High-scale structural video trailers listing, interactive carousel animations, user profiles setups, and video streaming simulation.",
    difficulty: "Medium",
    techStack: ["React", "Tailwind CSS", "Firebase Auth", "TMDB API"],
    features: ["Dynamic banner trailers play system", "Sleek sliding carousels animations", "Multi-user login profiles modules", "Favorited list bookmarks records"],
    architectureDiagram: `[React Layout carousels] --(API request)--> [TMDB dynamic video covers databases]`,
    sourceCode: [],
    explanation: "Visual styling optimization rules, dynamic lazy loading images lists, aur dynamic trailers overlays build karne ka project."
  },
  {
    id: "linkedin",
    title: "LinkedIn Clone",
    description: "Professional networking profile timelines, connection request models, job recommendations postings, and resumes uploaded database.",
    difficulty: "Hard",
    techStack: ["MERN", "JWT Auth", "Multer", "Mongoose relations"],
    features: ["Dynamic post timeline feeds", "Connection updates routing requests", "Modern profile resumes files uploads", "Job recommendations matching engines"],
    architectureDiagram: `[Users Profiles] <===(Mongoose Reference schemas)===> [Connections DB Map]`,
    sourceCode: [],
    explanation: "Mongoose populate, nested references queries, aur deep index parameters config controls explore karne ka dynamic framework."
  },
  {
    id: "instagram",
    title: "Instagram Clone",
    description: "Image grids visual listings, swipeable dynamic stories modules, filters layouts, and double-tap heart animations.",
    difficulty: "Hard",
    techStack: ["React", "Express.js", "Cloudinary Media", "Tailwind CSS"],
    features: ["Double tap post heart visual animation", "Sleek stories feed slider layout", "Interactive camera capture browser hooks", "Profile dynamic galleries"],
    architectureDiagram: `[Browser Media Devices API] --(Capture)--> [Cloudinary Upload API] --(Save URL)--> [MERN DB]`,
    sourceCode: [],
    explanation: "Touch interactions, swipe actions, camera hardware browser triggers, and media compression on-the-fly parameters patterns."
  },
  {
    id: "youtube",
    title: "YouTube Clone",
    description: "Custom video player UI controllers, live comments list feeds, side recommended grids lists, and channels registry setups.",
    difficulty: "Hard",
    techStack: ["React", "HLS Video player", "Express.js", "MongoDB"],
    features: ["Fluid custom video player controls overlay", "Side matching recommended algorithms panel", "Dynamic channels creation registry", "Comment threads validation nested replies"],
    architectureDiagram: `[HLS Stream Parser] <---(Video chunks)--- [AWS S3 Bucket / Express router]`,
    sourceCode: [],
    explanation: "Video streaming processing, chunk uploads, HLS streams streaming, and dynamic rendering optimization setups."
  },
  {
    id: "hospital",
    title: "Hospital Management",
    description: "Doctors reservation systems, active appointments schedule grids, patients digital records vaults, and custom consulting logs.",
    difficulty: "Medium",
    techStack: ["MERN Stack", "Tailwind Grid", "Express Validator"],
    features: ["Dynamic doctor calendar reservations layout", "Secure patient dynamic charts vault", "Invoice prescriptions details generator", "Email notifications integration"],
    architectureDiagram: `[Patients Reservation Requests] --(Validation schemas)--> [Express Check] --> [Database Block]`,
    sourceCode: [],
    explanation: "Strict Express validatations, role base credentials controls (Patient vs Doctor vs Admin), and calendar mapping logic arrays."
  },
  {
    id: "school",
    title: "School Management System",
    description: "Students grading ledger maps, attendance registers, class courses timetables layouts, and teachers profile dashboard settings.",
    difficulty: "Medium",
    techStack: ["React", "Express", "Node", "MongoDB schemas"],
    features: ["Classes registers trackers database", "Student progress report card layouts generator", "Dynamic timetable schedule charts", "Teacher assignments uploads folders"],
    architectureDiagram: `[School Admin Controls] --(Class ID variables)--> [Nested Student DB arrays]`,
    sourceCode: [],
    explanation: "MongoDB array manipulations (push, pull, update dynamic elements), custom roles checks, and report generators computations."
  },
  {
    id: "food",
    title: "Food Delivery App",
    description: "Restaurant listing maps, dynamic checkout cart calculations, driver location tracking simulation, and orders billing system.",
    difficulty: "Hard",
    techStack: ["React", "Redux", "Express", "Google Maps Platform"],
    features: ["Interactive local restaurant directory grids", "Active delivery driver map tracking mockups", "Item checkout tax calculations modules", "Transactional sms updates alerts"],
    architectureDiagram: `[User coordinates] --(Google Maps API)--> [Express local store matches]`,
    sourceCode: [],
    explanation: "Location APIs maps integrations, coordinate calculations, dynamic cart state management slices, and instant payments processing."
  },
  {
    id: "uber",
    title: "Uber Clone",
    description: "Live ride coordinates mapping, price calculations matching distance matrices, driver matchings alerts, and interactive rides state history.",
    difficulty: "Hard",
    techStack: ["MERN Stack", "Socket.io", "Google Maps Platform (Places, Routes)"],
    features: ["Instant origin to destination route polyline drawings", "Distance and duration price calculations modules", "Active socket matching drivers alerts", "Secure Stripe billing gateways"],
    architectureDiagram: `[Rider Client] <===(Active Geo-coordinates)===> [Socket.io Gateway] <===> [Driver Matches Pool]`,
    sourceCode: [],
    explanation: "Hinglish guides to understand complex real-time geospatial coordinate queries (e.g. $near, $geometry) inside MongoDB databases."
  },
  {
    id: "amazon",
    title: "Amazon Clone",
    description: "Massive scale product listings grids, deep search filters, customized shopping timelines, complete admin panels, and payment checkouts.",
    difficulty: "Hard",
    techStack: ["React", "Redux Toolkit", "Node.js", "Express", "MongoDB Atlas"],
    features: ["Search indexing search parameters modules", "Admin inventory registers, dashboards", "Credit card transaction processing simulation", "Order shipment tracker details timeline"],
    architectureDiagram: `[Elastic/Standard DB Lookup] ---> [Categorized layout rendering] ---> [Redux Cart state]`,
    sourceCode: [],
    explanation: "Industrial scale MERN architectures: cache database entries, paginated routing list, security tokens authorization systems."
  },
  {
    id: "aichat",
    title: "AI Chat App",
    description: "Server-side Gemini AI API integrated conversation application which formats markdown, preserves chat histories, and answers coding questions.",
    difficulty: "Medium",
    techStack: ["React", "Node.js", "Express", "@google/genai SDK", "MongoDB"],
    features: ["Interactive typing answers streaming simulation", "MERN coding mentor pre-set configurations", "Save active chats list to history database", "Elegant dark code snippets markdown preview panels"],
    architectureDiagram: `[Client Prompts] --(Express Proxy route)--> [@google/genai server-side SDK] --(Gemini Model response)--> [Saved DB history]`,
    sourceCode: [
      {
        filename: "aiRoute.js",
        code: `const express = require('express');
const { GoogleGenAI } = require('@google/genai');
const router = express.Router();

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

router.post('/prompt', async (req, res) => {
  const { userMessage } = req.body;
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: userMessage,
    });
    res.json({ text: response.text });
  } catch (error) {
    res.status(500).json({ error: "Gemini server response error aaya!" });
  }
});`,
        language: "javascript"
      }
    ],
    explanation: "This highlights the recommended standard of securing private API credentials behind Express server endpoints, shielding keys entirely from the web browser."
  }
];
