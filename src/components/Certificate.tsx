import React, { useState, useRef } from "react";
import { Download, Award, Sparkles, User, ShieldCheck } from "lucide-react";

interface CertificateProps {
  xpPoints: number;
}

export default function Certificate({ xpPoints }: CertificateProps) {
  const [studentName, setStudentName] = useState("");
  const [issued, setIssued] = useState(false);
  const certRef = useRef<HTMLDivElement>(null);

  const issueCertificate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentName.trim()) return;
    setIssued(true);
  };

  const handlePrint = () => {
    window.print();
  };

  // Generate a mock unique credentials key
  const credentialId = `MM3D-${Math.floor(100000 + Math.random() * 900000)}`;
  const issueDate = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <div className="bg-[#0b0c16]/95 border border-purple-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden backdrop-blur-md">
      {/* Absolute glow grids */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-3xl -z-10" />

      <div className="text-center max-w-xl mx-auto mb-6">
        <div className="inline-flex p-3 bg-purple-600/10 border border-purple-500/30 rounded-2xl mb-3 text-purple-400">
          <Award className="w-6 h-6 animate-pulse" />
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">MERN Mastery Certificate Generator</h2>
        <p className="text-xs text-gray-400 mt-1">
          Complete the modules, earn XP points, aur apna premium shareable certificate generate karein!
        </p>
      </div>

      {!issued ? (
        <form onSubmit={issueCertificate} className="max-w-md mx-auto space-y-4">
          <div className="relative">
            <User className="absolute left-3.5 top-3.5 w-4 h-4 text-gray-400" />
            <input
              type="text"
              required
              placeholder="Apna Pura Naam Likhye (e.g. Aman Pandey)"
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white/5 border border-purple-500/30 rounded-xl text-xs text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 transition-colors"
            />
          </div>

          <div className="bg-purple-950/20 border border-purple-500/10 rounded-xl p-3 text-center">
            <span className="text-[10px] text-purple-300 font-mono">
              ⚡ CURRENT BALANCE: <strong className="text-cyan-300">{xpPoints} XP</strong> (Required: any amount of effort!)
            </span>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-500 hover:to-cyan-400 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 shadow-lg transition-transform hover:scale-[1.02] cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" />
            Generate My Certificate
          </button>
        </form>
      ) : (
        <div className="space-y-6">
          {/* Certificate Print-Ready Outer container */}
          <div
            ref={certRef}
            className="border-8 border-double border-purple-500/40 p-4 sm:p-8 rounded-2xl bg-gradient-to-br from-[#0a0c1a] via-[#10122e] to-[#040510] text-center space-y-6 shadow-3xl select-none relative"
          >
            {/* Hologram visual label badge */}
            <div className="absolute top-4 right-4 border border-cyan-500/20 px-2 py-0.5 rounded text-[8px] font-mono text-cyan-400 tracking-wider">
              VERIFIED SECURE CREDENTIAL
            </div>

            <div className="space-y-1.5">
              <span className="text-[10px] tracking-[0.25em] font-mono text-purple-400 uppercase">Certificate of Mastery</span>
              <h3 className="text-xl sm:text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-cyan-300 to-indigo-300 tracking-wide font-sans leading-tight">
                MERN STACK MASTER SPECIALIST
              </h3>
            </div>

            <p className="text-gray-400 text-[10px] italic">Yeh pramaanit kiya jata hai ki</p>

            <div className="py-2 border-b border-purple-500/20 max-w-xs sm:max-w-md mx-auto">
              <span className="text-lg sm:text-2xl font-serif font-bold text-white tracking-wide block">
                {studentName}
              </span>
            </div>

            <p className="text-gray-300 text-[10.5px] max-w-md mx-auto leading-relaxed">
              ne "<strong>MERN Mastery 3D</strong>" curriculum ke sabhi dynamic modules (Theory, Analogies, Codes, Interview Qs) safaltapoorvak complete kar liye hain aur full stack developer journey par vijay paayi hai.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-4 text-left max-w-sm mx-auto border-t border-purple-500/10">
              <div className="space-y-0.5">
                <span className="text-[8px] uppercase text-gray-500 block">Issue Date</span>
                <span className="text-[10px] font-mono text-cyan-400 font-semibold">{issueDate}</span>
              </div>
              <div className="space-y-0.5 text-right">
                <span className="text-[8px] uppercase text-gray-500 block">Credential ID</span>
                <span className="text-[10px] font-mono text-cyan-400 font-semibold">{credentialId}</span>
              </div>
            </div>

            {/* Signature & Seal Row */}
            <div className="flex items-center justify-between pt-4 max-w-sm mx-auto">
              <div className="text-left space-y-1">
                <div className="text-[11px] font-serif italic text-purple-300 tracking-wide font-semibold">Aman Pandey</div>
                <div className="h-[1px] w-20 bg-purple-500/20" />
                <span className="text-[7.5px] text-gray-500 block uppercase">Lead Senior MERN Mentor</span>
              </div>

              {/* Glowing visual medal seal */}
              <div className="relative flex items-center justify-center">
                <Award className="w-10 h-10 text-cyan-400" />
                <div className="absolute inset-0 bg-cyan-400/20 rounded-full blur animate-ping" />
              </div>

              <div className="text-right space-y-1">
                <div className="text-[11px] font-serif italic text-cyan-300 tracking-wide font-semibold">Gemini AI Engine</div>
                <div className="h-[1px] w-20 bg-cyan-500/20 ml-auto" />
                <span className="text-[7.5px] text-gray-500 block uppercase">AI Technical Director</span>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="flex flex-col sm:flex-row gap-2.5 max-w-sm mx-auto">
            <button
              onClick={handlePrint}
              className="flex-1 py-2.5 bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <Download className="w-4 h-4" />
              Print / Save PDF
            </button>
            <button
              onClick={() => setIssued(false)}
              className="flex-1 py-2.5 bg-white/5 border border-purple-500/20 hover:bg-white/10 text-gray-300 font-semibold text-xs rounded-xl transition-colors cursor-pointer"
            >
              Issue Another Name
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
