import { ModuleDetail } from "../types";

export const modulesList: ModuleDetail[] = [
  {
    id: 1,
    title: "Computer Basics",
    category: "Fundamentals",
    difficulty: "Beginner",
    estimatedTime: "2 hours",
    theory: "Understanding how computer memory, CPU, and input/output systems work together. Computers use binary code (0 and 1) to represent instructions and data, executing operations in nanoseconds.",
    hinglishExplanation: "Computer ek aisi machine hai jo instructions ko binary code (0 aur 1) me convert karke run karti hai. CPU computer ka dimaag (Brain) hota hai, RAM temporary storage (yaani rough book) hai jahan active kaam hota hai, aur Hard Drive long-term shelf jaisi hai jahan files store rehti hain.",
    analogy: "Mano tum ek kitchen me cook ho! CPU ho tum (cook), RAM hai tumhara cutting board (jahan tum abhi vegetables kaat rahe ho), aur Hard disk hai tumhara refrigerator (jahan sara ration safe rehta hai).",
    diagramAscii: `
      +-----------------------------------------+
      |               [ INPUTS ]                |
      |          (Keyboard / Mouse)             |
      +-------------------+---------------------+
                          |
                          v
      +-------------------+---------------------+
      |      +------------+------------+        |
      |      |           CPU           |        |
      |      |   (Processing Engine)   |        |
      |      +------------+------------+        |
      |                   ^                     |
      |                   | (Active Task)       |
      |                   v                     |
      |      +------------+------------+        |
      |      |           RAM           |        |
      |      |     (Temporary Rough)   |        |
      |      +-------------------------+        |
      +-------------------+---------------------+
                          |
                          v
      +-------------------+---------------------+
      |              [ OUTPUT ]                 |
      |               (Monitor)                 |
      +-----------------------------------------+
    `,
    practicalExample: "Binary code representation. Char 'A' computer ke liye 65 (decimal) hota hai jo binary me 01000001 banta hai. JavaScript me hum ise console.log('A'.charCodeAt(0).toString(2)) se dekh sakte hain.",
    miniProject: {
      title: "Hinglish ASCII Converter",
      code: `// Simple conversion helper
function textToBinary(text) {
  return text.split('').map(char => {
    return char.charCodeAt(0).toString(2).padStart(8, '0');
  }).join(' ');
}
console.log("Binary of MERN:", textToBinary("MERN"));`,
      instructions: "Run this inside your browser console. It will take any normal word and turn it into the raw binary form that computers actually read! Isn't it magical?"
    },
    interviewQs: [
      { q: "What is the difference between RAM and ROM?", a: "RAM temporary memory hai jo volatile hoti hai (power off toh data loss). ROM permanent memory hai jo computer ko boot up karne ke instructions hold karti hai." },
      { q: "How does CPU execute code?", a: "CPU Fetch-Decode-Execute cycle follow karta hai. Instruction memory se Fetch hota hai, use machine code me Decode kiya jata hai, fir computer logic circuits dwara Execute hota hai." }
    ],
    assignment: "Write a small list of 5 daily items you use (like Phone, Calculator, Watch) and write whether they have volatile (RAM) or non-volatile storage inside them.",
    cheatSheet: "CPU = Action Brain, RAM = Fast & Temporary, SSD/HDD = Slow & Permanent.",
    bestPractices: [
      "Always understand how binary data works to design optimal data structures.",
      "Manage memory efficiently by dereferencing unused variables in high-level code."
    ],
    commonMistakes: [
      "Confusing storage space with memory. RAM badhane se storage nahi badhti, processing multitasking badhti hai!"
    ],
    industryTips: "Production environments me low-level computer logic ko samajhne se runtime latency issues solve karne me help milti hai.",
    quiz: [
      {
        id: "q1_1",
        question: "Computer memory ka kaunsa part volatile (temporary) hota hai?",
        options: ["RAM", "ROM", "Hard Disk", "CD-ROM"],
        correctAnswer: 0,
        explanation: "RAM volatile memory hai. Computer switch off hote hi RAM ka sara data delete ho jata hai."
      },
      {
        id: "q1_2",
        question: "CPU ka full form kya hai?",
        options: ["Computer Processing Unit", "Central Processing Unit", "Core Power Unit", "Central Program Unit"],
        correctAnswer: 1,
        explanation: "Central Processing Unit hi computer ka main component hai jo calculations aur program execution handle karta hai."
      }
    ]
  },
  {
    id: 2,
    title: "Internet",
    category: "Fundamentals",
    difficulty: "Beginner",
    estimatedTime: "2 hours",
    theory: "The Internet is a global network of interconnected computers communicating via IP addresses, DNS lookup, and HTTP/TCP protocols.",
    hinglishExplanation: "Internet duniye ke lakho computers ka ek aapas me connected jaal hai. Jab tum browser me 'google.com' likhte ho, toh ek Request bhejte ho. DNS Server is address ko IP Address (jaise 142.250.190.46) me convert karta hai jo ki us server ka digital phone number hai, aur vahan se files leakar computer screen par display karta hai.",
    analogy: "Mano tum ek relative ko letter bhej rahe ho. Relative ka naam hai 'google.com' (domain name), postman jo address book check karta hai vo hai 'DNS' server, aur permanent address (IP address) milne par letter pohoch jata hai.",
    diagramAscii: `
      [Browser Client] ----(google.com)----> [DNS Server]
            ^                                      |
            |                                      v
            +---(Return Index.html)--- [Web Server: 142.250.x.x]
    `,
    practicalExample: "Browser developers console me network tab open karke page reload karo, vahan tum actual request URLs, status codes (200 OK, 404 Not Found) dekh sakte ho.",
    miniProject: {
      title: "Hinglish IP Simulator",
      code: `const dnsRegistry = {
  "google.com": "142.250.190.46",
  "mastery3d.com": "104.244.42.1"
};
function resolveDNS(domain) {
  return dnsRegistry[domain] || "404 Destination Not Found";
}
console.log("Resolving google.com:", resolveDNS("google.com"));`,
      instructions: "Try calling resolveDNS with different mock domains in your custom playground."
    },
    interviewQs: [
      { q: "What is a DNS?", a: "DNS ka full form Domain Name System hai. Ye human-readable domain names (jaise facebook.com) ko machine-readable IP addresses me translate karta hai." },
      { q: "What happens when you enter a URL in the browser?", a: "DNS resolution hota hai, TCP connection establish hota hai, HTTP/HTTPS Request server ko jati hai, server Response bhejta hai, aur browser page render karta hai." }
    ],
    assignment: "Open command prompt/terminal aur 'ping google.com' command run karo, note down the response latency time in milliseconds.",
    cheatSheet: "HTTP = Rules of Communication, DNS = Address book, IP = Machine Address.",
    bestPractices: [
      "Use HTTPS instead of HTTP for encrypting transmitted data over the internet.",
      "Optimize static asset sizes to make your website load faster across different networks."
    ],
    commonMistakes: [
      "Thinking the internet and World Wide Web (WWW) are the exact same thing. Internet network infra hai, WWW is standard rules and pages accessed through it!"
    ],
    industryTips: "DNS propagation can take up to 24-48 hours when you map a new domain. Always keep this buffer time in mind for deployment.",
    quiz: [
      {
        id: "q2_1",
        question: "Domain names ko IP addresses me translate kaun karta hai?",
        options: ["HTTP", "DNS", "FTP", "SSL"],
        correctAnswer: 1,
        explanation: "Domain Name System (DNS) humare readable names ko numeric IP address me badalta hai."
      }
    ]
  },
  {
    id: 3,
    title: "Git Basics",
    category: "Fundamentals",
    difficulty: "Beginner",
    estimatedTime: "3 hours",
    theory: "Git is a local distributed version control system that tracks modifications in source code files over time.",
    hinglishExplanation: "Git ek software hai jo tumhari files ka track record (version control) rakhta hai. Ye bilkul ek 'Time Machine' jaisa hai. Jab tum coding karte ho, aur code perfect chalta hai, tum use 'commit' (save point) kar dete ho. Agar future me koi error aaya, toh tum pichle kisi commit pe vaapas jaa sakte ho bina code kharab kiye.",
    analogy: "Mano tum ek game khel rahe ho aur checkpoint pe save kar lete ho. checkpoint_1 (commit 1) pe tumne player ko talwar di, checkpoint_2 (commit 2) pe player ne shield li. Agar boss fight me player har gaya, toh tum checkpoint_1 ya checkpoint_2 se restart kar sakte ho.",
    diagramAscii: `
      Working Directory -> (git add) -> Staging Area -> (git commit) -> Local Repo
    `,
    practicalExample: "Terminal me run karo:\ngit init\ngit add index.html\ngit commit -m 'Initial setup in Hinglish'",
    miniProject: {
      title: "Simple Local Tracker",
      code: `const gitHistory = [];
function makeCommit(message, codeState) {
  gitHistory.push({ id: gitHistory.length + 1, message, codeState, timestamp: new Date() });
}
makeCommit("Initial commit", "<h1>Hello</h1>");
makeCommit("Added theme", "<h1>Hello</h1><p>Dark mode active</p>");
console.log("Git History Log:", gitHistory);`,
      instructions: "Run this code to see how git stacks commits as sequential history checkpoints!"
    },
    interviewQs: [
      { q: "What is the staging area in Git?", a: "Staging area ek temporary zone hai jahan hum files ko collect karte hain (using git add) commit karne se pehle. Ye hume select karne deta hai ki kaunse changes save honge." },
      { q: "What does git init do?", a: "Ye ek empty directory me '.git' folder create karta hai jo saare changes track karna start kar deta hai." }
    ],
    assignment: "Create a directory on your machine, initialize it with Git, and make 3 separate commits.",
    cheatSheet: "git init = Start tracking, git add = Stage files, git commit -m = Save checkpoint.",
    bestPractices: [
      "Write concise, imperative commit messages (e.g., 'feat: add login page' instead of 'login page added').",
      "Always check git status before staging changes to avoid accidental commits."
    ],
    commonMistakes: [
      "Committing sensitive files like .env or node_modules. Always use .gitignore to block them."
    ],
    industryTips: "Small and frequent commits are much easier to debug and revert than giant monolithic commits.",
    quiz: [
      {
        id: "q3_1",
        question: "Git me change list ko staging area me add karne ke liye kaunsi command use hoti hai?",
        options: ["git init", "git add", "git commit", "git push"],
        correctAnswer: 1,
        explanation: "'git add <filename>' or 'git add .' ka use changes ko stage karne ke liye hota hai."
      }
    ]
  },
  {
    id: 4,
    title: "GitHub",
    category: "Fundamentals",
    difficulty: "Beginner",
    estimatedTime: "3 hours",
    theory: "GitHub is a cloud-based hosting service for Git repositories, enabling code sharing, collaboration, and pull requests.",
    hinglishExplanation: "Git humare local computer pe chalta hai, lekin GitHub ek cloud website hai jahan hum apne code ko upload (push) kar sakte hain taaki poori duniya use dekh sake aur aapas me milkar bade products bana sakein.",
    analogy: "Mano Git hai tumhari personal diary jise tum ghar pe likhte ho, aur GitHub hai vo online blog jahan tum apni diary posts share karte ho taaki baaki log padh sakein aur comments kar sakein.",
    diagramAscii: `
      [Local Git Repo] --(git push origin main)--> [Cloud GitHub Repo]
    `,
    practicalExample: "github.com par account banayein, naya repo create karein, aur local repo se push karein command:\ngit remote add origin <url>\ngit push -u origin main",
    miniProject: {
      title: "GitHub Fetcher Simulation",
      code: `async function getGitHubProfile(username) {
  try {
    const res = await fetch("https://api.github.com/users/" + username);
    const data = await res.json();
    return \`User \${data.name} has \${data.public_repos} public repositories!\`;
  } catch(e) {
    return "Error fetching user.";
  }
}
getGitHubProfile("octocat").then(console.log);`,
      instructions: "Try changing the username to your real GitHub profile name to pull real-time data from GitHub's server!"
    },
    interviewQs: [
      { q: "What is the difference between Git and GitHub?", a: "Git ek command-line version control tool hai jo locally chalta hai. GitHub ek cloud platform hai jo remote repos host karta hai aur collaboration features deta hai." },
      { q: "What is a Pull Request (PR)?", a: "PR tab create kiya jata hai jab hum apne code branches ko main branch me merge karna chahte hain. Isse doosre developers humare changes review karte hain." }
    ],
    assignment: "Create a GitHub account, make a repository named 'MERN-Mastery-Journey' and push your first project file inside it.",
    cheatSheet: "git push = Upload, git pull = Download latest, git clone = Copy whole project cloud to local.",
    bestPractices: [
      "Keep your GitHub profile neat with a professional README and clean description.",
      "Never share or commit raw API tokens or credentials inside public repos."
    ],
    commonMistakes: [
      "Pushing straight to main branch in a professional team. Always use features branches and make Pull Requests!"
    ],
    industryTips: "Open Source contributions on GitHub can drastically boost your resume and help you get remote jobs globally.",
    quiz: [
      {
        id: "q4_1",
        question: "Local changes ko online GitHub server pe bhejne ke liye kaunsi command use hoti hai?",
        options: ["git pull", "git merge", "git push", "git clone"],
        correctAnswer: 2,
        explanation: "'git push' command local computer se cloud (remote) repository me commits send karti hai."
      }
    ]
  },
  {
    id: 5,
    title: "HTML",
    category: "Frontend",
    difficulty: "Beginner",
    estimatedTime: "4 hours",
    theory: "HTML (HyperText Markup Language) is the standard markup language for creating web pages, providing structure through elements and tags.",
    hinglishExplanation: "HTML humari website ka 'Skeleton' (Haddi ka dhancha) hai. Iska koi look ya style nahi hota, par ye decide karta hai ki heading kahan hogi, paragraph kahan hoga, button kahan dikhega aur image kahan load hogi.",
    analogy: "Socho ek house build ho raha hai. HTML us ghar ke walls (diwaarein) aur concrete pillars hain, jinke upar hi poora ghar tikta hai.",
    diagramAscii: `
      <html>
        <head> (Metadata) </head>
        <body>
          <h1> Header Title </h1>
          <p> Paragraph Content </p>
          <button> Click Me </button>
        </body>
      </html>
    `,
    practicalExample: "<!DOCTYPE html>\n<html>\n<body>\n  <h1>MERN Mastery</h1>\n  <p>Learn Node & React!</p>\n</body>\n</html>",
    miniProject: {
      title: "Hinglish Resume Page",
      code: `// Custom template for testing rendering
const htmlTemplate = \`
<div>
  <h1>Aman Pandey</h1>
  <h3>MERN Developer Journey</h3>
  <p>Currently mastering full stack components in Hinglish!</p>
</div>
\`;
console.log("Synthesized Structure:", htmlTemplate);`,
      instructions: "Create a standard .html file with these tags to see a fully structural CV on your browser."
    },
    interviewQs: [
      { q: "What is semantic HTML?", a: "Semantic HTML me tags ka specific meaning hota hai (jaise <header>, <article>, <section>, <footer>) jo browsers aur search engines (SEO) ko structure samajhne me madad karte hain, bajay generic <div> use karne ke." },
      { q: "What is difference between block and inline elements?", a: "Block elements (<p>, <div>, <h1>) poori width block karte hain aur new line se start hote hain. Inline elements (<span>, <a>, <strong>) sirf utni space lete hain jitna unka text hota hai." }
    ],
    assignment: "Create a simple page containing 1 Heading, 1 Paragraph, 1 ordered list of your top 3 MERN libraries, and 1 Hyperlink to google.com.",
    cheatSheet: "<a> = link, <img> = image, <p> = paragraph, <div> = container block.",
    bestPractices: [
      "Always include alt attributes on image tags for accessibility.",
      "Use modern semantic tags instead of nesting divs inside divs."
    ],
    commonMistakes: [
      "Forgetting to close HTML tags (e.g., writing <p>Hello without closing </p>). This can break downstream CSS structures!"
    ],
    industryTips: "Clean semantic HTML structure is extremely important for screen readers used by visually challenged users.",
    quiz: [
      {
        id: "q5_1",
        question: "Semantic HTML tag kaunsa hai?",
        options: ["<div>", "<span>", "<header>", "<br>"],
        correctAnswer: 2,
        explanation: "<header> ek semantic tag hai, kyunki ye browser ko batata hai ki is section me header content hai."
      }
    ]
  },
  {
    id: 6,
    title: "CSS Basics",
    category: "Frontend",
    difficulty: "Beginner",
    estimatedTime: "4 hours",
    theory: "CSS (Cascading Style Sheets) designs and styles HTML elements by modifying properties like color, layout, margins, and borders.",
    hinglishExplanation: "HTML agar skeleton hai toh CSS website ka 'Paint, Fashion, aur Design' hai. Ye colors, fonts, backgrounds, aur layout alignments control karta hai taaki website beautiful aur premium lage.",
    analogy: "Mano ghar ke HTML pillars khade ho chuke hain. Ab hum plaster laga rahe hain, sky blue paint kar rahe hain, aur colorful lights fit kar rahe hain. Ye sara decor CSS hai.",
    diagramAscii: `
      Selector {
        Property: Value;  (e.g. color: blue;)
      }
    `,
    practicalExample: "h1 {\n  color: #a855f7;\n  font-size: 24px;\n  font-family: 'Inter', sans-serif;\n}",
    miniProject: {
      title: "Neon Card Generator",
      code: `const styleCard = {
  background: "#12131a",
  border: "1px solid #a855f7",
  boxShadow: "0 0 15px rgba(168, 85, 247, 0.5)",
  color: "#ffffff",
  padding: "20px"
};
console.log("Card Applied Styles Object:", styleCard);`,
      instructions: "Apply these CSS values to a div to generate a futuristic glass-glowing card!"
    },
    interviewQs: [
      { q: "What is Box Model in CSS?", a: "CSS Box Model me har element ek rectangular box hota hai. Isme content, padding (content ke aaspas ki space), border (boundary line), aur margin (border ke bahar ki empty space) shamil hote hain." },
      { q: "What is CSS Specificity?", a: "Specificity decide karta hai ki kaunsa style rule apply hoga jab multiple selectors same property target karte hain. Order: Inline style > ID > Class > Tag." }
    ],
    assignment: "Create a simple login form with a styled submit button that glows with neon purple border shadow when hovered.",
    cheatSheet: "Margin = Outer space, Padding = Inner space, Border = Outermost line, Color = Font shade.",
    bestPractices: [
      "Use custom properties (variables) for consistent color palettes across your projects.",
      "Understand the cascade hierarchy to prevent stylesheet conflicts."
    ],
    commonMistakes: [
      "Mixing up padding and margin. Margin element ko doosre elements se door dhakelta hai, padding element ke andar ka volume badhati hai!"
    ],
    industryTips: "For full responsive control, design standard desktop-first or mobile-first breakpoints clearly.",
    quiz: [
      {
        id: "q6_1",
        question: "Box model ka innermost component kaunsa hota hai?",
        options: ["Margin", "Padding", "Border", "Content"],
        correctAnswer: 3,
        explanation: "Box model me sabse pehle Content hota hai, uske upar Padding, fir Border, aur end me Margin aata hai."
      }
    ]
  },
  {
    id: 10,
    title: "JavaScript Beginner",
    category: "Fundamentals",
    difficulty: "Beginner",
    estimatedTime: "5 hours",
    theory: "JavaScript is a high-level, single-threaded, interpreted programming language used for dynamic interactivity.",
    hinglishExplanation: "HTML aur CSS se page toh ban gaya, lekin vo 'static' hai. Website me life laane ke liye (jaise button pe click karne par dark mode hona, forms check karna) hum JavaScript ka use karte hain. JS website ka brain aur nerve system hai.",
    analogy: "Mano ghar ban gaya HTML se, decorative painting ho gayi CSS se. Ab hum light swith ko click karte hain toh bulp jalta hai, aur geyser chal jata hai - ye action JS hai.",
    diagramAscii: `
      Variables -> Functions -> Conditionals -> Loops -> Dynamic Actions
    `,
    practicalExample: "let user = 'Aman';\nif (user === 'Aman') {\n  console.log('Welcome to MERN Journey!');\n}",
    miniProject: {
      title: "Hinglish Bill Calculator",
      code: `function calculateTotal(itemsSum, taxPercent) {
  let tax = (itemsSum * taxPercent) / 100;
  let finalBill = itemsSum + tax;
  return "Bhai, total bill hua: " + finalBill + " Rupees!";
}
console.log(calculateTotal(500, 18));`,
      instructions: "Test the calculator function inside the browser console to calculate MERN hosting costs!"
    },
    interviewQs: [
      { q: "What is difference between let, const and var?", a: "var function-scoped hota hai aur re-declare ho sakta hai. let aur const block-scoped (curly braces) hote hain. const ki value re-assign nahi ho sakti." },
      { q: "What is data type coercion?", a: "Coercion matlab automatic type conversion. Jaise '5' + 5 karne par JS automatic doosre 5 ko string bana ke result '55' de deta hai." }
    ],
    assignment: "Create a function in JS that takes a temperature in Celsius and prints whether it's 'Thandi' (< 15), 'Garmi' (> 35) or 'Mast Weather'.",
    cheatSheet: "let = reassignable, const = immutable reference, function = reusable block of code.",
    bestPractices: [
      "Always use const by default unless you explicitly need to re-assign variable values.",
      "Write clear variable names instead of cryptic short letters like x, y, or a."
    ],
    commonMistakes: [
      "Using double equals (==) instead of strict triple equals (===). == is relaxed and does automatic casting, which can lead to buggy checks!"
    ],
    industryTips: "Clean clean syntax is highly regarded in peer code reviews. Avoid polluting the global scope with random variables.",
    quiz: [
      {
        id: "q10_1",
        question: "Strict equality check ke liye kaunsa operator use hota hai?",
        options: ["=", "==", "===", "!="],
        correctAnswer: 2,
        explanation: "=== use karne se code values aur unki data types dono check karta hai bina automatic casting ke."
      }
    ]
  },
  {
    id: 11,
    title: "Advanced JavaScript",
    category: "Fundamentals",
    difficulty: "Advanced",
    estimatedTime: "5 hours",
    theory: "Advanced JavaScript topics include closures, prototypical inheritance, scope chain, lexical environments, and memory optimization.",
    hinglishExplanation: "JS ke deeper concepts jaise Closures (ek function ke andar doosra function variable reference yaad rakhta hai) aur Prototypes (Objects ke default features properties transfer karne ke liye) advanced concepts hain, jo complex app state manage karne me kaam aate hain.",
    analogy: "Mano tumhare paas ek high-tech smart fridge hai. Us fridge me self-learning capabilities hain jo uski prototype properties se milti hain, aur memory locks closures ki tarah secure rehte hain.",
    diagramAscii: `
      Lexical Scope [ outerVar ] ---> Inner Function [ closure access ]
    `,
    practicalExample: "function outer() {\n  let counter = 0;\n  return function inner() {\n    counter++;\n    return counter;\n  };\n}",
    miniProject: {
      title: "Hinglish Secret Counter",
      code: `function createVault() {
  let secretBalance = 1000;
  return {
    checkPaisa: function() { return "Balance: " + secretBalance; },
    addPaisa: function(amount) { secretBalance += amount; }
  };
}
const myBank = createVault();
myBank.addPaisa(500);
console.log(myBank.checkPaisa());`,
      instructions: "Run this code block to verify that direct access to secretBalance is blocked except through closure functions!"
    },
    interviewQs: [
      { q: "What is a Closure?", a: "Closure ek function aur uske lexical scope environment ka combination hai. Isse inner function outer variables ko access kar sakta hai unke khatam hone ke baad bhi." },
      { q: "What is Prototypal Inheritance?", a: "JS me objects ke paas ek prototype chain hoti hai. Agar koi property object me nahi milti, toh browser use prototype stack me upar dhoondhta hai jab tak null na mil jaye." }
    ],
    assignment: "Create a memoized factorial function using closures to store cached inputs.",
    cheatSheet: "Closure = Remember outer vars, Prototype = Default template methods for objects.",
    bestPractices: [
      "Avoid memory leaks by detaching unused closures or event listeners.",
      "Never mutate the built-in global prototypes of arrays or elements."
    ],
    commonMistakes: [
      "Creating infinite closure loops inside heavy arrays which consumes RAM unnecessarily."
    ],
    industryTips: "Mastering closures and functional programming principles is incredibly useful for React State architectures.",
    quiz: [
      {
        id: "q11_1",
        question: "Closures functions ko kis cheez ki access dete hain?",
        options: ["Strict databases", "Lexical scope environment variables", "Global CSS classes", "Hardware CPU registers"],
        correctAnswer: 1,
        explanation: "Closures humare function ko un variables ki access deta hai jo uske immediate lexical environment me defined the."
      }
    ]
  },
  {
    id: 14,
    title: "Async JS",
    category: "Fundamentals",
    difficulty: "Intermediate",
    estimatedTime: "5 hours",
    theory: "Asynchronous JavaScript manages heavy long-running operations (like network fetch or filesystem read) concurrently without blocking the main execution thread, using Callbacks, Promises, and async/await.",
    hinglishExplanation: "JS ek single-threaded language hai yaani ek time pe ek hi line execute ho sakti hai. Socho agar server call hone me 5 seconds lag rahe hain, toh kya page freeze hona chahiye? Nahi! Hum asynchrous requests use karte hain. JS server request ko background me bhej deta hai, aur jab response aata hai, tab response callback queue se pop hokar perform hota hai.",
    analogy: "Restaurant me waiter table pe order lene aaya. Waiter ne order kitchen (server) ko diya aur tab tak doosri table pe order lene gaya (Non-blocking). Jab khana ready hua, usne deliver kar diya. Aisa nahi hua ki waiter kitchen ke gate pe khade ho kar tab tak wait kare jab tak khana na ban jaye (Blocking).",
    diagramAscii: `
      [Main Thread Code] --------(Fetch Server API API)--------> [Background Web APIs]
              |                                                           |
              v                                                           v
      (Continue running UI) <---(Callback Queue / Event Loop) <--- [Response complete]
    `,
    practicalExample: "async function fetchUser() {\n  let response = await fetch('https://api.github.com');\n  let data = await response.json();\n  console.log(data);\n}",
    miniProject: {
      title: "Hinglish Chai Promise Sim",
      code: `function makeChai() {
  return new Promise((resolve, reject) => {
    console.log("Chai banni start ho gayi hai...");
    setTimeout(() => {
      resolve("Garam Chai ready hai bhai! ☕");
    }, 2000);
  });
}
async function deliverOrder() {
  const result = await makeChai();
  console.log(result);
}
deliverOrder();`,
      instructions: "Copy and run this Chai promise chain to simulate server response delays in a beautiful interactive console!"
    },
    interviewQs: [
      { q: "What is Event Loop?", a: "Event loop JS engine ka background keeper hai. Ye continuously monitor karta hai Call Stack aur Callback Queue ko. Jab Stack empty ho jata hai, tab callback tasks ko execution ke liye bhejta hai." },
      { q: "Difference between Promise.all and Promise.race?", a: "Promise.all saare promises resolve hone ka wait karta hai aur array deta hai. Promise.race jo sabse jaldi (fastest) promise settle hoga uska output deta hai." }
    ],
    assignment: "Create a simulated promise flow that resolves random user details after 1 second, or rejects if network failure occurs.",
    cheatSheet: "Promise = Future result, await = Wait for result, Event Loop = Background manager.",
    bestPractices: [
      "Always wrap async/await codes inside try-catch blocks to prevent server process crash.",
      "Execute parallel calls via Promise.all if they do not depend on each other to boost page speed."
    ],
    commonMistakes: [
      "Using await without declaring 'async' keyword in the parent function wrapper. This will throw syntax parsing errors!"
    ],
    industryTips: "Real-time chat apps use socket servers to instantly resolve actions instead of continuous polling over async connections.",
    quiz: [
      {
        id: "q14_1",
        question: "Promise reject hone pe error catch karne ke liye kya use hota hai?",
        options: ["then", "catch", "finally", "await"],
        correctAnswer: 1,
        explanation: "Promise failure handle karne ke liye '.catch()' or try-catch block ka execute hona zaroori hai."
      }
    ]
  },
  {
    id: 16,
    title: "React Basics",
    category: "Frontend",
    difficulty: "Beginner",
    estimatedTime: "5 hours",
    theory: "React is a declarative component-based JavaScript UI library utilizing Virtual DOM, components, props, and declarative rendering.",
    hinglishExplanation: "React ek custom frontend library hai. Isme hum website ko modular components (jaise Navbar, Footer, InputCard) me break down karte hain. React ek state management system use karta hai, jisse dynamic user action hone pe poora page reload nahi hota, sirf vahi specific component re-render hota hai.",
    analogy: "Lego bricks jaisa hai React! Socho ek bada lego airport banana hai. Hum chote brick components banate hain - planes, windows, runway, gates - aur unhe aapas me connect karke beautiful layout ready karte hain.",
    diagramAscii: `
      State Change -> Virtual DOM updates -> Diffing Algorithm -> Real DOM Patched (Super Fast)
    `,
    practicalExample: "import { useState } from 'react';\nexport function Counter() {\n  const [count, setCount] = useState(0);\n  return <button onClick={() => setCount(count + 1)}>Count: {count}</button>;\n}",
    miniProject: {
      title: "Task list Component",
      code: `import { useState } from 'react';
export function SimpleTasks() {
  const [tasks, setTasks] = useState(["Master React", "Create Roadmap"]);
  return (
    <div>
      {tasks.map((t, i) => <p key={i}>📌 {t}</p>)}
    </div>
  );
}`,
      instructions: "Try pasting this React functional snippet into App.tsx to see instant modular rendering of lists."
    },
    interviewQs: [
      { q: "What is Virtual DOM?", a: "Virtual DOM standard DOM ka lightweight in-memory clone hai. React components change hone pe is clone ko update karta hai, do Virtual DOM trees ko compare (Diffing) karta hai, aur efficient patches update karta hai real screen par." },
      { q: "What are props in React?", a: "Props inputs hote hain jo hum parent component se child component me custom parameters pass karne ke liye send karte hain (read-only)." }
    ],
    assignment: "Create a simple React card component that receives title, image source, and rating as props, styling it with modern hover card attributes.",
    cheatSheet: "useState = Component memory state, props = input properties, Virtual DOM = Speed enhancer.",
    bestPractices: [
      "Keep components lightweight and extract nested visual layers into separate subfiles.",
      "Always include unique 'key' props when looping elements using array map."
    ],
    commonMistakes: [
      "Mutating state array or objects directly like 'state.push(item)'. Always use setters with spread operator: 'setState([...state, item])'!"
    ],
    industryTips: "React developers are in extremely high demand globally. Always focus on clean state structure for big projects.",
    quiz: [
      {
        id: "q16_1",
        question: "React component me dynamic local data store karne ke liye kya use karte hain?",
        options: ["props", "HTML attributes", "state", "global CSS"],
        correctAnswer: 2,
        explanation: "State hi component ki dynamic memory memory hai jise modify karne se screen automatic update hoti hai."
      }
    ]
  },
  {
    id: 21,
    title: "Node.js Basics",
    category: "Backend",
    difficulty: "Intermediate",
    estimatedTime: "5 hours",
    theory: "Node.js is an open-source, cross-platform JavaScript runtime environment executing JS code server-side on Google's V8 engine.",
    hinglishExplanation: "Browser se bahar (server side pe) JavaScript ko run karne ke liye hum Node.js ka use karte hain. Node.js chrome ke super fast V8 engine par banaya gaya hai. Iski help se hum computer ke file system ko access kar sakte hain, servers chala sakte hain, aur database connections create kar sakte hain.",
    analogy: "Mano JavaScript ek behtareen music player software hai jo pehle sirf Apple devices (Browser) me chalta tha. Node.js ne ise Windows aur Linux (Server machines) par bhi install karke run karne ka license de diya.",
    diagramAscii: `
      [Chrome V8 Engine] + [Node C++ APIs (fs, path, network)] = Server-Side JavaScript Runtime
    `,
    practicalExample: "const fs = require('fs');\nfs.writeFileSync('secret.txt', 'Hinglish is awesome!');\nconsole.log(fs.readFileSync('secret.txt', 'utf8'));",
    miniProject: {
      title: "Hinglish Log File System",
      code: `const fs = require('fs');
function saveLog(message) {
  const timestamp = new Date().toISOString();
  fs.appendFileSync('activity_log.txt', \`[\${timestamp}] \${message}\\n\`);
  console.log("Log saved!");
}
saveLog("User visited Server Dashboard");`,
      instructions: "Run this script using Node locally to see your logs successfully writing to a physical text file!"
    },
    interviewQs: [
      { q: "Is Node.js single-threaded or multi-threaded?", a: "Node.js single-threaded hota hai (using Event Loop) but it uses internal worker threads (libuv) for executing complex background processes (disk, cryptography, net queries) parallelly." },
      { q: "What is NPM?", a: "NPM (Node Package Manager) JavaScript packages registry aur client tool hai jo hume millions of free codes and libraries (like express, mongoose) import-install karne me help karta hai." }
    ],
    assignment: "Create a command line node script that prints all environmental variables present in process.env.",
    cheatSheet: "node <file> = Run local file, fs = file system controller, process = process variables.",
    bestPractices: [
      "Use asynchronous (non-blocking) fs methods instead of synchronous blocking variants in heavy request routes.",
      "Check node version across deployment servers to prevent compatibility errors."
    ],
    commonMistakes: [
      "Assuming client window or document variables exist in Node.js. Browser components like window/document are undefined on the server-side Node engine!"
    ],
    industryTips: "Production environments require clean process monitoring tools like PM2 to auto-restart Node servers on crash alerts.",
    quiz: [
      {
        id: "q21_1",
        question: "NodeJS me runtime environments environment variable access karne ke liye kya use hota hai?",
        options: ["window.env", "process.env", "sys.getEnv()", "global.env"],
        correctAnswer: 1,
        explanation: "process.env ke pass process lifecycle lifecycle runtime settings aur configurations stored rehte hain."
      }
    ]
  },
  {
    id: 23,
    title: "MongoDB",
    category: "Backend",
    difficulty: "Intermediate",
    estimatedTime: "5 hours",
    theory: "MongoDB is a document-oriented NoSQL database that stores data in JSON-like flexible documents (BSON) using dynamic schemas.",
    hinglishExplanation: "MongoDB ek modern NoSQL database hai jo traditional SQL tables (Rows aur Columns) ke badle flexible documents (JSON formats) me data store karta hai. Iska schema fix nahi hota, yaani aap kisi bhi document me aasaani se naye fields add kar sakte hain bina database crash kiye.",
    analogy: "Mano standard SQL database ek strict, formal bank register hai jahan pehle se columns banaye hain (Account, Name, Date). Agar bina space ka column aaya, page cancel! MongoDB ek loose file drawer folder jaisa hai, jisme tum alag-alag letters (JSON documents) thodi different layout me bhi safe rakh sakte ho.",
    diagramAscii: `
      [Database] -> [Collections (e.g. Users)] -> [Documents (JSON Objects: { name: 'Aman', age: 24 })]
    `,
    practicalExample: "{\n  \"_id\": \"64fae120c15\",\n  \"name\": \"Aman\",\n  \"email\": \"aman@mastery.com\",\n  \"skills\": [\"React\", \"Node\"]\n}",
    miniProject: {
      title: "Hinglish JSON Parser DB Simulator",
      code: `const mockDb = [];
function insertUser(name, roles) {
  const newUser = { id: Date.now(), name, roles, createdAt: new Date() };
  mockDb.push(newUser);
  return "Document Added Successfully! Total users: " + mockDb.length;
}
console.log(insertUser("Vikram", ["Frontend", "Git"]));
console.log(JSON.stringify(mockDb, null, 2));`,
      instructions: "See how document insertion builds dynamic trees inside your database state!"
    },
    interviewQs: [
      { q: "What is the difference between SQL and NoSQL?", a: "SQL strict schemas, relations, tables, and rows use karta hai (e.g., PostgreSQL). NoSQL flexible documents, key-values, or graphs use karta hai (e.g., MongoDB) jo horizontally scalable hote hain." },
      { q: "What is BSON in MongoDB?", a: "BSON ka matlab Binary JSON hai. MongoDB internally JSON documents ko compressed binary format me compile karta hai fast retrieval, index calculations, aur numeric operations ke liye." }
    ],
    assignment: "Model a basic database collection schema for an e-commerce Product, specifying variable types for price, stock, ratings, and tags.",
    cheatSheet: "Collection = Table, Document = Row, BSON = Binary JSON.",
    bestPractices: [
      "Add indexes on frequently queried fields to drastically boost lookup speed.",
      "Limit embedded arrays inside documents to prevent reaching the maximum 16MB limit."
    ],
    commonMistakes: [
      "Leaving MongoDB default port 27017 open without authentication password controls. Secure your server connections!"
    ],
    industryTips: "Enterprise cloud systems prefer MongoDB Atlas cluster clusters for persistent autoscaling replication.",
    quiz: [
      {
        id: "q23_1",
        question: "MongoDB me dynamic documents documents kis format me internally store kiye jaate hain?",
        options: ["XML", "BSON", "SQL Rows", "CSV Files"],
        correctAnswer: 1,
        explanation: "MongoDB BSON (Binary JSON) format utilize karta hai fast serialization processing ke liye."
      }
    ]
  }
];
