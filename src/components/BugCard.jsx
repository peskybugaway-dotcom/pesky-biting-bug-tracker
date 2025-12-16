import React from "react";
import { AlertTriangle, ShieldAlert, Bug } from "lucide-react";
import getBugImage from "../utils/getBugImage";

// Risk colors
const riskColors = {
  0: "bg-gray-400",
  1: "bg-green-500",
  2: "bg-yellow-500",
  3: "bg-red-500",
};

export default function BugCard({ bug, onClick }) {
  const { name, category, danger, riskLevel } = bug;

  return (
    <div
      onClick={onClick}
      className="
        bg-slate-800/60 backdrop-blur-md 
        border border-slate-700 
        rounded-xl p-4 flex gap-4 items-center 
        cursor-pointer transition transform hover:scale-[1.02] hover:bg-slate-700/50
        shadow-lg
      "
    >
      {/* BUG IMAGE */}
      <img
        src={getBugImage(bug)}
        alt={name}
        className="
          w-16 h-16 rounded-lg object-cover 
          border border-slate-600 shadow-md
        "
        onError={(e) => (e.target.src = "/images/fallback-bug.png")}
      />

      {/* TEXT CONTENT */}
      <div className="flex-1">
        <h3 className="text-lg font-semibold text-white leading-tight">{name}</h3>
        <p className="text-sm text-emerald-300">{category}</p>

        {/* Danger line */}
        <div className="flex items-center gap-2 mt-1 text-sm">
          <AlertTriangle className="w-4 h-4 text-yellow-400" />
          <span className="text-slate-300">{danger} Risk</span>
        </div>

        {/* RISK BAR */}
        <div className="mt-2 w-full bg-slate-700 h-2 rounded-full overflow-hidden">
          <div
            className={`${riskColors[riskLevel]} h-full`}
            style={{ width: `${(riskLevel / 3) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* ICON */}
      <div className="text-emerald-400">
        <Bug className="w-5 h-5" />
      </div>
    </div>
  );
}
