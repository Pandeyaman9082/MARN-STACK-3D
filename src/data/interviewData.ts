import { InterviewQnA } from "../types";

export const interviewQuestions: InterviewQnA[] = [
  {
    id: "js1",
    category: "JavaScript",
    question: "JavaScript me Closures kya hote hain aur unka use kab hota hai?",
    answer: "Closure ek function aur uske surrounding state (lexical environment) ka package hota hai. Jab ek inner function outer function ke variables ko access karta hai, toh outer function execute hone ke baad bhi inner function un variables ko yaad rakhta hai. Iska use data privacy (private variables) banane me aur function factories design karne me hota hai.",
    difficulty: "Medium"
  },
  {
    id: "js2",
    category: "JavaScript",
    question: "Difference between '==' and '===' operators?",
    answer: "'==' (Loose Equality) variable values ko compare karta hai aur compare karne se pehle implicit type casting (coercion) perform karta hai (jaise '5' == 5 will return true). Jabki '===' (Strict Equality) values aur data types dono check karta hai bina automatic casting ke (jaise '5' === 5 will return false). Always use === to prevent hidden bugs!",
    difficulty: "Easy"
  },
  {
    id: "react1",
    category: "React",
    question: "React me Virtual DOM kaise kaam karta hai aur iska kya fayda hai?",
    answer: "Virtual DOM standard DOM ka lightweight, in-memory clone hai. Jab React component me state badalti hai, toh pehle Virtual DOM tree update hota hai. React do trees ko compare karta hai (jise Diffing algorithm kehte hain) aur identify karta hai ki exactly kaunse parts badle hain. Fir sirf unhi change parts ko real DOM pe update (Patches) kiya jata hai, jisse rendering super-fast ho jati hai.",
    difficulty: "Medium"
  },
  {
    id: "react2",
    category: "React",
    question: "React Hooks ke do rules kya hain jo hume strictly follow karne chahiye?",
    answer: "Rule 1: Hooks ko hamesha component ke Top Level pe call karein. Loops, conditions, ya nested functions ke andar call mat karein taaki React har render me hooks execution order track kar sake. Rule 2: Hooks ko sirf React Functional Components ya Custom Hooks ke andar se hi call karein, regular JS functions me nahi.",
    difficulty: "Easy"
  },
  {
    id: "node1",
    category: "Node",
    question: "Node.js single-threaded hone ke baad bhi high concurrent connections kaise handle karta hai?",
    answer: "Node.js internally asynchronous, non-blocking input/output architecture aur Event Loop utilize karta hai. Jab koi heavy task (jaise database query, file reading) aata hai, toh Node use background worker threads (libuv) ko handover kar deta hai aur single main thread next client requests handle karne lagta hai. Task complete hone pe background threads callback queue me return bhejte hain, jisse non-blocking speed milti hai.",
    difficulty: "Hard"
  },
  {
    id: "node2",
    category: "Node",
    question: "Node.js me module exports aur require kya kaam karte hain?",
    answer: "Node.js me files modular hoti hain. require() ki help se hum external library packages (jaise express) ya local custom module files load/import karte hain. Aur module.exports ya exports object ki help se hum local file ke functions, variables, ya models ko doosri files me use karne ke liye expose/export karte hain.",
    difficulty: "Easy"
  },
  {
    id: "mongo1",
    category: "MongoDB",
    question: "MongoDB document databases me indexing kya hoti hai aur ye kyun important hai?",
    answer: "Indexing database queries search performance ko fast karne ka ek method hai. Bina index ke, MongoDB ko query result dhoondhne ke liye poori collection scan (collection scan) karni padti hai jo slow hoti hai. Indexing karne pe field values ka ek custom sorted tree structure banta hai jisse document direct seek ho jata hai. Iska side effect ye hai ki writes/inserts thode slow ho sakte hain aur storage zyada lagti hai.",
    difficulty: "Hard"
  },
  {
    id: "express1",
    category: "Express",
    question: "Express middlewares kya hain aur unka real usage kya hai?",
    answer: "Middleware ek function hota hai jiske pass Request object (req), Response object (res), aur next middleware function controller (next) ki access hoti hai. Ye request server endpoint pe pohochne se pehle execute hota hai. Common uses: JWT authentication token check karna, request logs print karna, incoming JSON data parse karna, aur security headers inject karna.",
    difficulty: "Medium"
  },
  {
    id: "g1",
    category: "Google",
    question: "Google Interview: Explain how you would design a rate limiter for API routes.",
    answer: "Rate limiter APIs abuse prevent karne ke liye user requests limits trigger karta hai (jaise max 100 requests per minute). Hinglish strategy: Iske liye Token Bucket ya Sliding Window algorithm use kiya jata hai. Fast cache storage like Redis use karte hain jahan client IP as key aur request count store hota hai. Har request pe counter add hoga, limit cross hone par status code 429 Too Many Requests return kar denge.",
    difficulty: "Hard"
  },
  {
    id: "hr1",
    category: "Behavioral",
    question: "Tell me about a time when you had a conflict with a team member.",
    answer: "Google/Amazon behavior strategy: Iska answer STAR method (Situation, Task, Action, Result) se dena chahiye. Hinglish Advice: 'Bhai, focus solution pe rakho, blame game pe nahi!' Situation: Ek project deadline pe humare teammates me backend schema variables ko lekar disagreement ho gaya. Action: Maine call schedule kari, dono arguments ko compare kiya aur code standardization select kiya. Result: Feature time pe deliver ho gaya aur trust build hua.",
    difficulty: "Medium"
  }
];
