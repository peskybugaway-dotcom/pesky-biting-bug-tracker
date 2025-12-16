import React from "react";
import { AlertTriangle, Skull, Bug } from "lucide-react";

export default function BugCard({ bug, onClick }) {
  // Pick icon based on danger level
  const dangerIcon =
    bug.danger === "Severe" ? (
      <Skull className="w-5 h-5 text-red-400" />
    ) : bug.danger === "High" ? (
      <AlertTriangle className="w-5 h-5 text-orange-400" />
    ) : (
      <Bug className="w-5 h-5 text-yellow-300" />
    );

  return (
    <div
      onClick={onClick}
      className="
        group pesky-card cursor-pointer p-4 rounded-xl
        bg-slate-800/70 border border-slate-700
        hover:bg-slate-700/70 hover:border-emerald-400
        transition-all duration-300 flex gap-4 items-center
      "
    >
      {/* Thumbnail */}
      <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 border border-slate-600 group-hover:border-emerald-400 transition">
        <img
          src={bug.image}
          alt={bug.name}
          className="w-full h-full object-cover"
          onError={(e) => (e.target.src = "/images/fallback.jpg")}
        />
      </div>

      {/* Text */}
      <div className="flex-1">
        <h3 className="text-white font-semibold text-md flex items-center gap-2">
          {dangerIcon}
          {bug.name}
        </h3>
        <p className="text-slate-300 text-sm mt-1 line-clamp-2">
          {bug.description}
        </p>

        {/* Danger Badge */}
        <span
          className={`
            inline-block mt-2 px-2 py-0.5 rounded-full text-xs font-semibold
            ${
              bug.danger === "Severe"
                ? "bg-red-500/20 text-red-300 border border-red-500/30"
                : bug.danger === "High"
                ? "bg-orange-500/20 text-orange-300 border border-orange-500/30"
                : "bg-yellow-500/20 text-yellow-300 border border-yellow-500/30"
            }
          `}
        >
          {bug.danger} Risk
        </span>
      </div>
    </div>
  );
}
