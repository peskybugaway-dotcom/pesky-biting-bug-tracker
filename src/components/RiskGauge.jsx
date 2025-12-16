import React from "react";

export default function RiskGauge({ score }) {
  const clamped = Math.min(100, Math.max(0, score));
  const angle = (clamped / 100) * 180;

  const level =
    clamped > 80 ? "Severe" :
    clamped > 60 ? "High" :
    clamped > 30 ? "Moderate" :
    "Low";

  const color =
    score > 80 ? "red" : score > 60 ? "orange" : score > 30 ? "yellow" : "green";
    level === "Severe" ? "text-red-500" :
    level === "High" ? "text-orange-400" :
    level === "Moderate" ? "text-yellow-400" :
    "text-emerald-400";

  const barColor =
    level === "Severe" ? "bg-red-600" :
    level === "High" ? "bg-orange-500" :
    level === "Moderate" ? "bg-yellow-400" :
    "bg-emerald-500";

  return (
    <div className="text-center">
      <div className="text-4xl font-bold text-emerald-300">{score}/100</div>
      <div className={`text-${color}-400 text-lg font-semibold`}>
        {color.toUpperCase()} RISK
    <div className="w-full flex flex-col items-center">
      {/* GAUGE ARC */}
      <div className="relative w-48 h-24 overflow-hidden">
        <div className="absolute inset-0 bg-slate-800 rounded-t-full border-4 border-slate-700"></div>

        <div
          className={`absolute inset-0 origin-bottom ${barColor} rounded-t-full transition-transform duration-700`}
          style={{ transform: `rotate(${angle - 180}deg)` }}
        ></div>

        {/* Bottom pivot circle */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-4 bg-slate-900 rounded-full z-10"></div>
      </div>

      {/* SCORE LABEL */}
      <div className="mt-4 text-center">
        <div className={`text-4xl font-bold ${color}`}>{level}</div>
        <div className="text-slate-300 text-sm">Risk Score: {clamped}/100</div>
      </div>
    </div>
  );
