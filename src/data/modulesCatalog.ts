export interface ModuleMeta {
  id: number;
  title: string;
  category: "Fundamentals" | "Frontend" | "Backend" | "Advanced" | "DevOps & SQL";
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  time: string;
  summary: string;
}

export const modulesCatalog: ModuleMeta[] = [
  { id: 1, title: "Computer Basics", category: "Fundamentals", difficulty: "Beginner", time: "2 hours", summary: "Computer systems, binary logic, RAM vs Hard drive ka basic concept." },
  { id: 2, title: "Internet", category: "Fundamentals", difficulty: "Beginner", time: "2 hours", summary: "DNS, IP Addresses, Client-Server model aur browser connection kaise banta hai." },
  { id: 3, title: "Git", category: "Fundamentals", difficulty: "Beginner", time: "3 hours", summary: "Local code version control, staging area, local commits aur checkpoint creation." },
  { id: 4, title: "GitHub", category: "Fundamentals", difficulty: "Beginner", time: "3 hours", summary: "Cloud hosting service, code push-pull, repositories, PRs aur team collaboration." },
  { id: 5, title: "HTML Basics", category: "Frontend", difficulty: "Beginner", time: "4 hours", summary: "Web page structure, skeleton design tags, links, images, forms aur inputs." },
  { id: 6, title: "CSS Styling", category: "Frontend", difficulty: "Beginner", time: "4 hours", summary: "Web styling, selectors, custom color styling, borders, margins aur paddings." },
  { id: 7, title: "Flexbox Layout", category: "Frontend", difficulty: "Beginner", time: "3 hours", summary: "One-dimensional page elements layout, justify, align aur elements distribution." },
  { id: 8, title: "CSS Grid Layout", category: "Frontend", difficulty: "Intermediate", time: "4 hours", summary: "Two-dimensional rows and columns layout layouts, custom template grid template areas." },
  { id: 9, title: "Tailwind CSS", category: "Frontend", difficulty: "Beginner", time: "4 hours", summary: "Utility-first design CSS framework, hover styles, dark styles, layout grids." },
  { id: 10, title: "JavaScript Beginner", category: "Fundamentals", difficulty: "Beginner", time: "5 hours", summary: "JS syntax, variables, data types, condition checks, array, object aur loop methods." },
  { id: 11, title: "Advanced JavaScript", category: "Fundamentals", difficulty: "Advanced", time: "5 hours", summary: "Closures, prototypal chain, local memory scope patterns, memory structures." },
  { id: 12, title: "DOM Manipulation", category: "Frontend", difficulty: "Intermediate", time: "4 hours", summary: "Document Object Model tree access, document selectors, event listeners hooks." },
  { id: 13, title: "ES6+ Features", category: "Fundamentals", difficulty: "Intermediate", time: "3 hours", summary: "Destructuring, arrow functions, template literals, spread/rest operator." },
  { id: 14, title: "Async JS", category: "Fundamentals", difficulty: "Intermediate", time: "5 hours", summary: "Non-blocking single thread operations, Promises chain, async await, event loop." },
  { id: 15, title: "API Integration", category: "Frontend", difficulty: "Intermediate", time: "4 hours", summary: "Fetch calls, axios commands, HTTP response codes, headers aur data loading." },
  { id: 16, title: "React Basics", category: "Frontend", difficulty: "Beginner", time: "5 hours", summary: "JSX syntax, components modularity, state memory state, props passing, Virtual DOM." },
  { id: 17, title: "React Advanced", category: "Frontend", difficulty: "Advanced", time: "5 hours", summary: "Custom React hooks, Context API providers, performance memoization methods." },
  { id: 18, title: "Redux Toolkit", category: "Frontend", difficulty: "Advanced", time: "5 hours", summary: "Global centralized state engine, slices, actions, reducers, payload selectors." },
  { id: 19, title: "React Router", category: "Frontend", difficulty: "Intermediate", time: "4 hours", summary: "Multi-page dynamic routing, routing links, parameters hooks, route guards." },
  { id: 20, title: "Next.js Basics", category: "Frontend", difficulty: "Advanced", time: "6 hours", summary: "Server-side rendering, routing structure, pre-rendering, static sites generation." },
  { id: 21, title: "Node.js Basics", category: "Backend", difficulty: "Intermediate", time: "5 hours", summary: "V8 server engine, fs, path, process life cycle control, server terminal codes." },
  { id: 22, title: "Express.js Basics", category: "Backend", difficulty: "Intermediate", time: "5 hours", summary: "Custom server server setup, request paths, route controllers, standard middlewares." },
  { id: 23, title: "MongoDB", category: "Backend", difficulty: "Intermediate", time: "5 hours", summary: "NoSQL document base database schemas, Collections document entries, indexing rules." },
  { id: 24, title: "Mongoose ODM", category: "Backend", difficulty: "Intermediate", time: "5 hours", summary: "Data validation schemas model definitions, queries builder, database connections." },
  { id: 25, title: "Authentication", category: "Backend", difficulty: "Advanced", time: "6 hours", summary: "Passwords encryption hashing, salt counters, session cookies, database checks." },
  { id: 26, title: "JWT Token Security", category: "Backend", difficulty: "Advanced", time: "5 hours", summary: "JSON Web Tokens payload structures, tokens verification, headers storage, authorization." },
  { id: 27, title: "REST API Design", category: "Backend", difficulty: "Intermediate", time: "4 hours", summary: "Standard HTTP methods GET/POST/PUT/DELETE, custom endpoints naming rules." },
  { id: 28, title: "Socket.io", category: "Backend", difficulty: "Advanced", time: "5 hours", summary: "Bi-directional real-time communication events, chat connection sockets, notifications." },
  { id: 29, title: "Cloudinary Image Upload", category: "Backend", difficulty: "Advanced", time: "4 hours", summary: "Media hosting cloud API, folders setup, uploads, responsive images retrieval." },
  { id: 30, title: "Multer Upload Middleware", category: "Backend", difficulty: "Advanced", time: "4 hours", summary: "Multipart form data parsing, local upload paths, disk files storage configurations." },
  { id: 31, title: "Payment Gateway Integration", category: "Backend", difficulty: "Advanced", time: "5 hours", summary: "Stripe and Razorpay setups, backend keys, checkout sessions, hooks webhooks." },
  { id: 32, title: "Docker Container Basics", category: "DevOps & SQL", difficulty: "Advanced", time: "5 hours", summary: "Container virtual isolation, dockerfile specifications, container builds, port mapping." },
  { id: 33, title: "Deployment Procedures", category: "DevOps & SQL", difficulty: "Intermediate", time: "4 hours", summary: "Cloud Run, Vercel, Render setups, environment variables loading controls." },
  { id: 34, title: "AWS Basics", category: "DevOps & SQL", difficulty: "Advanced", time: "5 hours", summary: "Amazon EC2 server containers, S3 static assets storage buckets, IAM security." },
  { id: 35, title: "CI/CD Automations", category: "DevOps & SQL", difficulty: "Advanced", time: "4 hours", summary: "GitHub actions, automated workflows, tests suite runner, continuous updates." },
  { id: 36, title: "System Design Basics", category: "DevOps & SQL", difficulty: "Advanced", time: "6 hours", summary: "Vertical vs Horizontal scaling scaling, Load balancers, caching redis, database replicas." },
  { id: 37, title: "DSA for Interviews", category: "Fundamentals", difficulty: "Advanced", time: "8 hours", summary: "Array, LinkedList, Stack, Queue, trees traversal algorithms, space time complexity." },
  { id: 38, title: "SQL Database Basics", category: "DevOps & SQL", difficulty: "Intermediate", time: "4 hours", summary: "Relational table schemas tables, inner joins, foreign keys, SQL select statements." },
  { id: 39, title: "TypeScript Integration", category: "Fundamentals", difficulty: "Intermediate", time: "5 hours", summary: "Strict compile-time static types, Interfaces types, parameters safe contracts." },
  { id: 40, title: "Testing Codebases", category: "DevOps & SQL", difficulty: "Advanced", time: "4 hours", summary: "Jest framework, unit testing test suites, routes assertions, integration coverage." }
];
