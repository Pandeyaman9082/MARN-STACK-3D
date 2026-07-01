import React, { useState, useEffect, useRef } from "react";
import { Send, MessageSquare, X, Sparkles, Volume2, VolumeX, Bot, User, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface Message {
  sender: "user" | "mentor";
  text: string;
  timestamp: string;
}

interface AIChatMentorProps {
  currentTopic?: string;
}

export default function AIChatMentor({ currentTopic = "General MERN Stack" }: AIChatMentorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [synth, setSynth] = useState<SpeechSynthesis | null>(null);
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Load standard welcome message
  useEffect(() => {
    setMessages([
      {
        sender: "mentor",
        text: `Namaste dev! Main hoon aapka 3D MERN AI Mentor. 🚀 Mujhe MERN stack ya coding career me koi bhi sawal poochiye (jaise: "What is MVC architecture?" ya "How to get a job at Google?"). Main aapko 100% Hinglish me mast analogise ke sath samjhaunga!`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);

    if (typeof window !== "undefined" && window.speechSynthesis) {
      setSynth(window.speechSynthesis);
    }
  }, []);

  // Auto-scroll messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  // Handle message send
  const handleSendMessage = async (textToSend?: string) => {
    const text = textToSend || inputText;
    if (!text.trim() || isLoading) return;

    // Stop speaking old things
    if (synth) synth.cancel();
    setIsSpeaking(false);

    const userMsg: Message = {
      sender: "user",
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputText("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/ai-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text, contextTopic: currentTopic })
      });

      if (!response.ok) {
        throw new Error("Server response error aaya!");
      }

      const data = await response.json();
      const mentorMsg: Message = {
        sender: "mentor",
        text: data.reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages((prev) => [...prev, mentorMsg]);

      // Speak if enabled
      if (voiceEnabled && synth) {
        speakResponse(data.reply);
      }
    } catch (err: any) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        {
          sender: "mentor",
          text: "Bhai, connectivity me thoda issue hai lagta hai. Apne environment me check karein ki Gemini API key set hai ki nahi Settings > Secrets panel me!",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  // HTML cleanup helper for speaking
  const speakResponse = (text: string) => {
    if (!synth) return;
    synth.cancel(); // Clear any ongoing speech

    // Clean markdown, symbols & emojis for better pronunciation
    const cleanedText = text
      .replace(/[\`#\*_]/g, '')
      .replace(/https?:\/\/\S+/g, 'link')
      .slice(0, 300); // Speaking first 300 chars to avoid infinite loops

    const utterance = new SpeechSynthesisUtterance(cleanedText);
    utterance.lang = "hi-IN"; // Set Hindi for smooth Hinglish accent reading!
    utterance.rate = 1.0;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    synth.speak(utterance);
  };

  const handleSpeechToggle = () => {
    if (isSpeaking && synth) {
      synth.cancel();
      setIsSpeaking(false);
    } else {
      setVoiceEnabled(!voiceEnabled);
    }
  };

  const clearChat = () => {
    if (synth) synth.cancel();
    setIsSpeaking(false);
    setMessages([
      {
        sender: "mentor",
        text: "Chat history clear ho gayi hai. Chalo naya topic seekhte hain! 🎓 Ask me anything about MERN.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  const suggestionChips = [
    "Express me route middleware kya hai?",
    "MongoDB cluster atlas set up kaise karein?",
    "Virtual DOM step by step samjhao.",
    "Google interview ke liye kitne months chahiye?"
  ];

  return (
    <>
      {/* Floating launcher badge */}
      <motion.button
        id="ai_chat_launcher"
        className="fixed bottom-6 right-6 z-50 p-4 bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 text-white rounded-full shadow-2xl hover:scale-110 active:scale-95 flex items-center gap-2 font-semibold cursor-pointer border border-cyan-400/30"
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
      >
        <MessageSquare className="w-6 h-6 animate-pulse" />
        <span className="hidden sm:inline text-sm tracking-wide">MERN AI Mentor</span>
        {/* Glow pulsing ring */}
        <span className="absolute inset-0 rounded-full bg-cyan-400/20 animate-ping -z-10" />
      </motion.button>

      {/* Floating Chat Drawer with glassmorphism */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="ai_chat_drawer"
            className="fixed bottom-24 right-4 sm:right-6 w-[92vw] sm:w-[440px] h-[600px] z-50 bg-[#0c0d16]/95 backdrop-blur-xl border border-purple-500/30 rounded-3xl shadow-3xl overflow-hidden flex flex-col"
            initial={{ opacity: 0, y: 100, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.9 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            {/* Header */}
            <div className="p-4 bg-gradient-to-r from-purple-900/60 via-indigo-900/60 to-cyan-900/40 border-b border-purple-500/20 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-purple-500/20 flex items-center justify-center border border-purple-500/40">
                  <Bot className="w-5 h-5 text-cyan-400" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-sm tracking-wide flex items-center gap-1.5">
                    Hinglish MERN Mentor
                    <span className="flex h-2 w-2 relative">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                  </h3>
                  <p className="text-[11px] text-gray-400">Powered by Gemini 3.5 Flash</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {/* Voice toggle button */}
                <button
                  className={`p-2 rounded-lg transition-colors cursor-pointer ${
                    voiceEnabled ? "bg-cyan-500/20 text-cyan-400 hover:bg-cyan-500/35" : "text-gray-400 hover:bg-white/5"
                  }`}
                  onClick={handleSpeechToggle}
                  title={voiceEnabled ? "Speech is active. Click to mute." : "Speech is muted. Click to enable speech synthesis."}
                >
                  {voiceEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                </button>

                <button
                  onClick={clearChat}
                  className="p-2 text-gray-400 hover:text-rose-400 hover:bg-white/5 rounded-lg cursor-pointer transition-colors"
                  title="Clear conversation history"
                >
                  <Trash2 className="w-4 h-4" />
                </button>

                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg cursor-pointer transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Context bar */}
            <div className="bg-purple-950/20 px-4 py-1.5 border-b border-purple-500/10 flex items-center justify-between">
              <span className="text-[11px] font-mono text-cyan-400/90 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-purple-400" />
                Topic Context: {currentTopic}
              </span>
              {isSpeaking && (
                <span className="text-[10px] text-emerald-400 flex items-center gap-1">
                  <span className="flex gap-0.5 items-end h-2.5">
                    <span className="w-0.5 bg-emerald-400 animate-bounce h-2" style={{ animationDelay: '0.1s' }} />
                    <span className="w-0.5 bg-emerald-400 animate-bounce h-3" style={{ animationDelay: '0.3s' }} />
                    <span className="w-0.5 bg-emerald-400 animate-bounce h-1.5" style={{ animationDelay: '0.5s' }} />
                  </span>
                  AI speaking...
                </span>
              )}
            </div>

            {/* Messages box */}
            <div className="flex-1 p-4 overflow-y-auto space-y-4 scrollbar-thin scrollbar-thumb-purple-900/40">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`flex gap-2.5 max-w-[85%] items-start ${
                      msg.sender === "user" ? "flex-row-reverse" : "flex-row"
                    }`}
                  >
                    {/* Avatar */}
                    <div
                      className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 border text-xs ${
                        msg.sender === "user"
                          ? "bg-purple-600/20 border-purple-500/40 text-purple-300"
                          : "bg-cyan-600/20 border-cyan-500/40 text-cyan-300"
                      }`}
                    >
                      {msg.sender === "user" ? <User className="w-3.5 h-3.5" /> : <Bot className="w-3.5 h-3.5" />}
                    </div>

                    {/* Chat Bubble with futuristic feel */}
                    <div
                      className={`p-3 rounded-2xl text-xs leading-relaxed ${
                        msg.sender === "user"
                          ? "bg-gradient-to-r from-purple-800/40 to-indigo-800/40 border border-purple-500/30 text-white rounded-tr-none"
                          : "bg-[#14162a]/90 border border-cyan-500/20 text-gray-100 rounded-tl-none font-sans"
                      }`}
                    >
                      <p className="whitespace-pre-line">{msg.text}</p>
                      <div
                        className={`text-[9px] mt-1.5 text-right opacity-60 ${
                          msg.sender === "user" ? "text-purple-300" : "text-cyan-300"
                        }`}
                      >
                        {msg.timestamp}
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex justify-start">
                  <div className="flex gap-2.5 max-w-[85%] items-start">
                    <div className="w-7 h-7 rounded-lg bg-cyan-600/20 border border-cyan-500/40 text-cyan-300 flex items-center justify-center">
                      <Bot className="w-3.5 h-3.5" />
                    </div>
                    <div className="p-3 bg-[#14162a]/90 border border-cyan-500/20 rounded-2xl rounded-tl-none flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                      <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                      <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick chips container */}
            {messages.length < 3 && (
              <div className="px-4 py-2 bg-black/30 border-t border-purple-500/10">
                <p className="text-[10px] text-purple-400 font-semibold mb-1.5">Mera dimaag test karo! Tap any question:</p>
                <div className="flex flex-wrap gap-1.5">
                  {suggestionChips.map((chip, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSendMessage(chip)}
                      className="text-[10px] px-2.5 py-1 bg-white/5 border border-purple-500/20 rounded-full text-gray-300 hover:text-white hover:bg-purple-500/20 cursor-pointer transition-all"
                    >
                      {chip}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input field */}
            <div className="p-3 bg-black/40 border-t border-purple-500/20 flex gap-2">
              <input
                type="text"
                placeholder="Ask me in Hinglish..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSendMessage();
                }}
                className="flex-1 px-4 py-2.5 bg-white/5 border border-purple-500/30 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-400 transition-colors placeholder-gray-500"
              />
              <button
                onClick={() => handleSendMessage()}
                disabled={!inputText.trim() || isLoading}
                className="p-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 disabled:opacity-50 text-white rounded-xl shadow-lg transition-all cursor-pointer flex items-center justify-center shrink-0"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
