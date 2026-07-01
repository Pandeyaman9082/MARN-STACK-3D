import React, { useState } from "react";
import { modulesCatalog, ModuleMeta } from "../data/modulesCatalog";
import { CheckCircle2, Circle, Star, ArrowRight, Compass, ShieldCheck, Database, Layers } from "lucide-react";
import { motion } from "motion/react";

interface RoadmapVisualizerProps {
  completedModules: number[];
  bookmarks: string[];
  activeModuleId: number;
  onSelectModule: (id: number) => void;
  onToggleComplete: (id: number) => void;
}

export default function RoadmapVisualizer({
  completedModules,
  bookmarks,
  activeModuleId,
  onSelectModule,
  onToggleComplete
}: RoadmapVisualizerProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categories = ["All", "Fundamentals", "Frontend", "Backend", "DevOps & SQL"];

  const filteredModules = selectedCategory === "All"
    ? modulesCatalog
    : modulesCatalog.filter(m => m.category === selectedCategory);

  const getCategoryColor = (cat: string) => {
    switch (cat) {
      case "Fundamentals": return "border-cyan-500/40 text-cyan-400 bg-cyan-950/20";
      case "Frontend": return "border-purple-500/40 text-purple-400 bg-purple-950/20";
      case "Backend": return "border-indigo-500/40 text-indigo-400 bg-indigo-950/20";
      default: return "border-amber-500/40 text-amber-400 bg-amber-950/20";
    }
  };

  const getCategoryIcon = (cat: string) => {
    switch (cat) {
      case "Fundamentals": return <Compass className="w-4.5 h-4.5 text-cyan-400" />;
      case "Frontend": return <Layers className="w-4.5 h-4.5 text-purple-400" />;
      case "Backend": return <Database className="w-4.5 h-4.5 text-indigo-400" />;
      default: return <ShieldCheck className="w-4.5 h-4.5 text-amber-400" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Category selector tags */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold tracking-wide transition-all cursor-pointer shrink-0 border ${
              selectedCategory === cat
                ? "bg-gradient-to-r from-purple-600 to-indigo-600 border-purple-400 text-white shadow-lg shadow-purple-500/20"
                : "bg-[#0b0c16] border-purple-500/20 text-gray-400 hover:text-white"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Interactive Mindmap / Career Tree Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 max-h-[440px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-purple-950/50">
        {filteredModules.map((mod, index) => {
          const isCompleted = completedModules.includes(mod.id);
          const isActive = activeModuleId === mod.id;
          const isBookmarked = bookmarks.includes(`module-${mod.id}`);

          return (
            <div
              key={mod.id}
              onClick={() => onSelectModule(mod.id)}
              className={`p-4 rounded-2xl border text-left cursor-pointer relative overflow-hidden transition-all duration-300 flex flex-col justify-between group ${
                isActive
                  ? "bg-gradient-to-br from-[#12142d] to-[#1e1c4a] border-cyan-400 shadow-xl shadow-cyan-500/10 scale-[1.01]"
                  : "bg-[#0c0d16]/80 border-purple-500/20 hover:border-purple-400/60"
              }`}
            >
              {/* Connected node index counter */}
              <div className="absolute top-0 right-0 w-16 h-16 bg-purple-500/5 rounded-full blur-xl -z-10" />

              <div className="space-y-2.5">
                {/* Header indicators */}
                <div className="flex items-center justify-between">
                  <div className={`px-2 py-0.5 rounded-md border text-[9px] font-mono font-bold tracking-wide flex items-center gap-1 uppercase ${getCategoryColor(mod.category)}`}>
                    {getCategoryIcon(mod.category)}
                    {mod.category}
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleComplete(mod.id);
                    }}
                    className="p-1 rounded-full text-gray-500 hover:text-cyan-400 transition-colors cursor-pointer"
                  >
                    {isCompleted ? (
                      <CheckCircle2 className="w-5 h-5 text-cyan-400" />
                    ) : (
                      <Circle className="w-5 h-5 text-gray-600 hover:text-cyan-400/70" />
                    )}
                  </button>
                </div>

                {/* Module title details */}
                <div>
                  <h4 className="text-white text-xs font-bold leading-tight group-hover:text-cyan-300 transition-colors">
                    {mod.id}. {mod.title}
                  </h4>
                  <p className="text-[10px] text-gray-400 mt-1 line-clamp-2">
                    {mod.summary}
                  </p>
                </div>
              </div>

              {/* Footer status markers */}
              <div className="flex items-center justify-between border-t border-purple-500/10 pt-3 mt-3">
                <span className="text-[9px] text-gray-500 font-mono">
                  ⏳ {mod.time}
                </span>
                <span className={`text-[9px] font-bold ${
                  mod.difficulty === "Beginner" ? "text-emerald-400" :
                  mod.difficulty === "Intermediate" ? "text-amber-400" : "text-rose-400"
                }`}>
                  {mod.difficulty}
                </span>
              </div>

              {/* Connected arrow node line visualizer */}
              {index < filteredModules.length - 1 && (
                <div className="hidden lg:block absolute -right-2 top-1/2 -translate-y-1/2 text-purple-500/30">
                  <ArrowRight className="w-4 h-4 translate-x-1" />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
