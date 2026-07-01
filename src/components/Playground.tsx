import React, { useState } from "react";
import { Play, RotateCcw, Copy, Check, Terminal, Code2, Sparkles } from "lucide-react";

interface PlaygroundProps {
  initialCode?: string;
  title?: string;
}

export default function Playground({
  initialCode = `// Hinglish Playground! Apna code likhein aur run karein.\nfunction mernLogo() {\n  const stack = ["MongoDB", "Express", "React", "Node"];\n  console.log("MERN = " + stack.join(" + "));\n  return "Balle Balle! 🚀 Let's code!";\n}\n\nmernLogo();`,
  title = "Interactive Code Playground"
}: PlaygroundProps) {
  const [code, setCode] = useState(initialCode);
  const [logs, setLogs] = useState<string[]>(["Welcome to Hinglish MERN compiler console!"]);
  const [copied, setCopied] = useState(false);

  const runCode = () => {
    const captureLogs: string[] = [];
    const originalConsoleLog = console.log;

    // Redirect console.log
    console.log = (...args) => {
      captureLogs.push(args.map(arg => typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)).join(' '));
      originalConsoleLog.apply(console, args);
    };

    try {
      // Evaluate JavaScript safely using Function
      const result = new Function(code)();
      if (result !== undefined) {
        captureLogs.push(`Return Value: ${typeof result === 'object' ? JSON.stringify(result, null, 2) : String(result)}`);
      }
    } catch (err: any) {
      captureLogs.push(`❌ Runtime Error: ${err.message}`);
    } finally {
      // Restore console.log
      console.log = originalConsoleLog;
    }

    setLogs(captureLogs.length > 0 ? captureLogs : ["Code executed successfully but printed no output. Use console.log() to print!"]);
  };

  const copyCode = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const resetCode = () => {
    setCode(initialCode);
    setLogs(["Console reset successfully. Type or edit code above!"]);
  };

  const codePresets = [
    {
      name: "ASCII Converter",
      code: `// Character ASCII binary simulation
function textToBinary(text) {
  return text.split('').map(char => {
    return char.charCodeAt(0).toString(2).padStart(8, '0');
  }).join(' ');
}
console.log("Binary representation of 'MERN':");
console.log(textToBinary("MERN"));`
    },
    {
      name: "Chai Promise",
      code: `// Simulated delay using Promise
function prepChai() {
  return new Promise((resolve) => {
    console.log("Boiling water and adding spices... ☕");
    setTimeout(() => resolve("Chai is served!"), 1500);
  });
}

prepChai().then(msg => console.log(msg));
"Process ongoing..."`
    },
    {
      name: "Closures Vault",
      code: `// Secure data closures helper
function makeVault() {
  let userPaisa = 10000;
  return {
    view: () => "Balance: " + userPaisa,
    add: (amt) => { userPaisa += amt; return "Added successfully!" }
  };
}
const vault = makeVault();
console.log(vault.view());
console.log(vault.add(4500));
console.log(vault.view());`
    }
  ];

  return (
    <div id="interactive_playground" className="bg-[#0b0c16]/90 border border-purple-500/30 rounded-2xl shadow-2xl overflow-hidden backdrop-blur-md">
      {/* Header bar */}
      <div className="px-4 py-3 bg-gradient-to-r from-purple-950/40 to-indigo-950/40 border-b border-purple-500/20 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Code2 className="w-4 h-4 text-cyan-400" />
          <span className="text-xs font-semibold text-white tracking-wide">{title}</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={copyCode}
            className="p-1.5 text-gray-400 hover:text-white rounded hover:bg-white/5 cursor-pointer transition-colors"
            title="Copy Code"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          </button>
          <button
            onClick={resetCode}
            className="p-1.5 text-gray-400 hover:text-white rounded hover:bg-white/5 cursor-pointer transition-colors"
            title="Reset to Initial Code"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Preset injection chips */}
      <div className="px-4 py-2 bg-purple-950/10 border-b border-purple-500/10 flex items-center gap-2 flex-wrap">
        <span className="text-[10px] text-purple-400 font-mono font-bold flex items-center gap-1">
          <Sparkles className="w-2.5 h-2.5" />
          Inject Presets:
        </span>
        {codePresets.map((preset, i) => (
          <button
            key={i}
            onClick={() => {
              setCode(preset.code);
              setLogs([`Injected preset: ${preset.name}. Tap 'Run Code' to execute!`]);
            }}
            className="text-[10px] px-2.5 py-0.5 bg-[#14162a] border border-cyan-500/10 hover:border-cyan-400/30 text-cyan-400 rounded-full transition-colors cursor-pointer"
          >
            {preset.name}
          </button>
        ))}
      </div>

      {/* Code Editor and Console columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 h-[340px]">
        {/* Input Textarea Area */}
        <div className="relative border-r border-purple-500/10 flex flex-col">
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="w-full flex-1 p-4 bg-transparent font-mono text-xs text-cyan-300 focus:outline-none resize-none leading-relaxed leading-5 selection:bg-purple-500/30"
            spellCheck="false"
          />
          <button
            onClick={runCode}
            className="absolute bottom-4 right-4 px-4 py-2 bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-500 hover:to-cyan-400 text-white text-xs font-semibold rounded-xl flex items-center gap-1.5 shadow-lg active:scale-95 cursor-pointer transition-transform"
          >
            <Play className="w-3.5 h-3.5" />
            Run Code
          </button>
        </div>

        {/* Live Output Log Area */}
        <div className="bg-[#05060b] flex flex-col">
          <div className="px-3 py-1.5 bg-[#08090f] border-b border-purple-500/5 flex items-center gap-1.5">
            <Terminal className="w-3 h-3 text-purple-400" />
            <span className="text-[10px] font-mono text-purple-400 tracking-wider">OUTPUT CONSOLE</span>
          </div>
          <div className="flex-1 p-4 overflow-y-auto font-mono text-[11px] text-gray-300 space-y-1.5 select-text">
            {logs.map((log, idx) => (
              <div
                key={idx}
                className={`whitespace-pre-wrap leading-relaxed ${
                  log.startsWith("❌")
                    ? "text-rose-400 bg-rose-950/10 p-1 rounded border border-rose-900/15"
                    : log.startsWith("Return Value:")
                    ? "text-emerald-400 font-semibold"
                    : "text-cyan-300/95"
                }`}
              >
                {log}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
