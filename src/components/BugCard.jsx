import React, { useState } from "react";
import { AlertTriangle, ShieldAlert, Bug, ChevronRight } from "lucide-react";

// Risk styles for dynamic coloring
const riskStyles = {
  0: { bg: "bg-slate-400", text: "text-slate-400", icon: <Bug className="w-4 h-4" /> },
  1: { bg: "bg-emerald-500", text: "text-emerald-400", icon: <ShieldAlert className="w-4 h-4" /> },
  2: { bg: "bg-amber-500", text: "text-amber-400", icon: <AlertTriangle className="w-4 h-4" /> },
  3: { bg: "bg-red-500", text: "text-red-500", icon: <AlertTriangle className="w-4 h-4" /> },
};

export default function BugCard({ bug, onSelect }) {
  const { name, category, danger, riskLevel, image } = bug;
  
  // Safeguard against missing risk levels
  const style = riskStyles[riskLevel] || riskStyles[0];

  return (
    <div
      onClick={() => onSelect(bug)}
      className="
        group relative overflow-hidden
        bg-slate-900/40 backdrop-blur-md 
        border border-slate-800/50 
        rounded-2xl p-4 flex gap-4 items-center 
        cursor-pointer transition-all duration-300
        hover:border-slate-600 hover:bg-slate-800/60
        hover:shadow-[0_0_20px_rgba(16,185,129,0.1)]
        active:scale-[0.98]
      "
    >
      {/* 🖼️ BUG THUMBNAIL */}
      <div className="relative shrink-0">
        <img
          src={image}
          alt={name}
          className="
            w-16 h-16 rounded-xl object-cover 
            border-2 border-slate-800 shadow-lg
            group-hover:border-emerald-500/50 transition-colors
          "
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "https://via.placeholder.com/150?text=Bug";
          }}
        />
      </div>

      {/* 📝 TEXT CONTENT */}
      <div className="flex-1 min-w-0">
        <p className="text-[9px] font-black text-emerald-400 uppercase tracking-[0.2em] mb-0.5">
          {category}
        </p>
        
        <h3 className="text-sm font-bold text-white leading-tight truncate pr-4">
          {name}
        </h3>

        {/* Danger Status */}
        <div className={`flex items-center gap-1.5 mt-1 text-[10px] font-bold ${style.text}`}>
          {style.icon}
          <span className="uppercase tracking-wider">{danger} Risk</span>
        </div>

        {/* 📊 MINI RISK BAR */}
        <div className="mt-2.5 w-full bg-slate-800/50 h-1 rounded-full overflow-hidden">
          <div
            className={`${style.bg} h-full transition-all duration-1000 ease-out`}
            style={{ 
                width: `${Math.max(10, (riskLevel / 3) * 100)}%`,
                boxShadow: `0 0 8px ${style.bg.replace('bg-', '')}` 
            }}
          ></div>
        </div>
      </div>

      {/* ➡️ ACTION ICON */}
      <div className="text-slate-700 group-hover:text-emerald-400 transition-colors">
        <ChevronRight className="w-5 h-5" />
      </div>
    </div>
  );
}
