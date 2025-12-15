import React from "react";
import { ArrowLeft } from "lucide-react";

export default function BugDetail({ bug, back }) {
  if (!bug) return null;

  return (
    <div className="p-6 max-w-xl mx-auto space-y-6">
      
      {/* Back Button */}
      <button
        onClick={back}
        className="flex items-center gap-2 px-4 py-2 bg-slate-700 
                   hover:bg-slate-600 rounded-full text-white transition"
      >
        <ArrowLeft className="w-4 h-4" />
        Back
      </button>

      {/* Bug Card */}
      <div className="pesky-card p-6 space-y-4">

        {/* Title + Icon */}
        <div className="flex items-center gap-3">
          <div className="p-2 bg-slate-700/60 rounded-lg">
            {bug.icon || null}
          </div>
          <h2 className="text-3xl font-bold text-emerald-400">{bug.name}</h2>
        </div>

        {/* Optional Image */}
        {bug.image && (
          <img
            src={bug.image}
            alt={bug.name}
            className="w-full rounded-lg shadow-lg border border-slate-700"
          />
        )}

        {/* Danger Level */}
        <span
          className={`
            inline-block text-xs font-bold px-3 py-1 rounded-full 
            ${bug.danger === "Severe" ? "bg-red-600 text-white" : ""}
            ${bug.danger === "High" ? "bg-orange-500 text-black" : ""}
            ${bug.danger === "Moderate" ? "bg-yellow-500 text-black" : ""}
            ${bug.danger === "Low" ? "bg-green-500 text-white" : ""}
          `}
        >
          Danger: {bug.danger}
        </span>

        {/* Type */}
        <p className="text-slate-300 text-sm">
          Type: <span className="text-white">{bug.type}</span>
        </p>

        {/* Description */}
        <p className="text-white leading-relaxed">{bug.description}</p>
      </div>
    </div>
  );
}
