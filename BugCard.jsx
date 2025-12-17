import React from "react";
import { ChevronRight, AlertTriangle, ShieldAlert, Bug } from "lucide-react";

export default function BugCard({ bug, onClick }) {
  // Safe extraction of data
  const { 
    name = "Unknown Species", 
    category = "Pest", 
    danger = "Low", 
    riskLevel = 0, 
    image = "/images/fallback-bug.png" 
  } = bug;

  // Determine colors based on risk level
  const riskColors = {
    3: "bg-red-600 text-white border-red-500/50",
    2: "bg-orange-500 text-white border-orange-400/50",
    1: "bg-yellow-500 text-black border-yellow-400/50",
    0: "bg-emerald-500 text-white border-emerald-400/50"
  };

  return (
    <div
      onClick={onClick}
      className="group relative bg-slate-900/50 backdrop-blur-md border border-slate-800 p-4 rounded-2xl cursor-pointer hover:border-emerald-500/50 hover:bg-slate-800/80 transition-all active:scale-[0.98]"
    >
      <div className="flex items-center gap-4">
        {/* 🖼️ IMAGE WITH FALLBACK */}
        <div className="relative shrink-0">
          <img
            src={image}
            alt={name}
            className="w-16 h-16 rounded-xl object-cover border-2 border-slate-700 group-hover:border-emerald-500/50 transition-colors"
            onError={(e) => {
              e.target.onerror = null; 
              e.target.src = "https://placehold.co/150x150/020617/10b981?text=PESKY";
            }}
          />
        </div>

        {/* 📝 TEXT CONTENT */}
        <div className="flex-1 min-w-0">
          <p className="text-[9px] font-black text-emerald-400 uppercase tracking-widest mb-0.5">
            {category}
          </p>
          <h3 className="text-white font-bold text-base truncate pr-2">
            {name}
          </h3>

          <div className="flex items-center gap-2 mt-1">
            <span className={`px-2 py-0.5 rounded-md text-[9px] font-black uppercase border ${riskColors[riskLevel] || riskColors[0]}`}>
              {danger} RISK
            </span>
            
            {/* MINI PROGRESS BAR */}
            <div className="h-1 w-12 bg-slate-800 rounded-full overflow-hidden">
               <div 
                 className={`h-full ${riskLevel === 3 ? 'bg-red-500' : 'bg-emerald-500'}`} 
                 style={{ width: `${(riskLevel / 3) * 100}%` }}
               />
            </div>
          </div>
        </div>

        {/* ➡️ ICON */}
        <ChevronRight className="w-5 h-5 text-slate-600 group-hover:text-emerald-400 transition-colors" />
      </div>
    </div>
  );
}
