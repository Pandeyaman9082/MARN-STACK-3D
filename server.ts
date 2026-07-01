import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Initialize GoogleGenAI client (safe lazy initialization in startServer)
  const apiKey = process.env.GEMINI_API_KEY || "";
  const ai = new GoogleGenAI({
    apiKey: apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      }
    }
  });

  // AI chat API for Hinglish MERN Mentor
  app.post("/api/ai-chat", async (req, res) => {
    try {
      const { message, contextTopic } = req.body;
      if (!message) {
        return res.status(400).json({ error: "Message is required" });
      }

      const systemInstruction = `You are the MERN Mastery 3D AI Mentor. You are a Senior Full Stack Software Engineer, UI/UX Designer, Technical Writer, Career Mentor, and friendly Communication Coach.
Your primary rule: Speak 100% in Roman Hinglish (Hindi written in English alphabet, e.g. "kaise ho", "karna hoga", "seekhte hain" mixed with English programming terms like "components", "routes", "state", "database").
Keep it extremely easy, fun, and engaging.
Always explain with:
1. Real-life example (Hinglish me)
2. Easy-to-understand analogy
3. Reusable code snippet if applicable
4. Encouraging career advice.

Example Hinglish tone:
"MERN stack ka matlab hota hai MongoDB, Express, React, aur Node.js. Agar hume isme master banna hai, toh hume pehle basics ko clear karna hoga! Chalo ek mast analogy se samjhte hain: soch lo Client-Server request bilkul ek restaurant order jaisa hai..."

Topic of discussion: ${contextTopic || "General MERN Roadmap"}`;

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: message,
        config: {
          systemInstruction: systemInstruction,
          temperature: 0.7,
        }
      });

      const replyText = response.text || "Aise lagta hai network me thoda error hai, please try again!";
      res.json({ reply: replyText });
    } catch (error: any) {
      console.error("Gemini AI Mentor Chat Error:", error);
      res.status(500).json({ error: error?.message || "Server me error aaya, try again!" });
    }
  });

  // Vite integration
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

startServer().catch((err) => {
  console.error("Server startup failed:", err);
});
