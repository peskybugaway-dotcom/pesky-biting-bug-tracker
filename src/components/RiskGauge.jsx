import React from "react";
import { AlertTriangle, ShieldAlert, Skull } from "lucide-react";

export default function RiskGauge({ score }) {
  const clamped = Math.min(100, Math.max(0, score));
  const angle = (clamped / 100) * 180;
export default function RiskGauge({ level }) {
  // level 0–3
  const gaugeLevels = [
    { label: "None", color: "bg-slate-500", icon: <ShieldAlert /> },
    { label: "Low", color: "bg-green-500", icon: <ShieldAlert /> },
    { label: "Moderate", color: "bg-yellow-500", icon: <AlertTriangle /> },
    { label: "High", color: "bg-orange-500", icon: <AlertTriangle /> },
    { label: "Severe", color: "bg-red-600", icon: <Skull /> },
  ];

  const level =
    clamped > 80 ? "Severe" :
    clamped > 60 ? "High" :
    clamped > 30 ? "Moderate" :
    "Low";

  const color =
    level === "Severe" ? "text-red-500" :
    level === "High" ? "text-orange-400" :
    level === "Moderate" ? "text-yellow-400" :
    "text-emerald-400";

  const barColor =
    level === "Severe" ? "bg-red-600" :
    level === "High" ? "bg-orange-500" :
    level === "Moderate" ? "bg-yellow-400" :
    "bg-emerald-500";
  const item = gaugeLevels[level] ?? gaugeLevels[0];

  return (
    <div className="w-full flex flex-col items-center">
      {/* GAUGE ARC */}
      <div className="relative w-48 h-24 overflow-hidden">
        <div className="absolute inset-0 bg-slate-800 rounded-t-full border-4 border-slate-700"></div>
    <div className="p-4 bg-slate-800 rounded-xl shadow-lg border border-slate-700">
      <h3 className="text-lg font-semibold text-white mb-3">Bite Risk Level</h3>

      {/* Gauge Bar */}
      <div className="relative w-full h-3 bg-slate-700 rounded-full overflow-hidden">
        <div
          className={`absolute inset-0 origin-bottom ${barColor} rounded-t-full transition-transform duration-700`}
          style={{ transform: `rotate(${angle - 180}deg)` }}
        ></div>

        {/* Bottom pivot circle */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-4 bg-slate-900 rounded-full z-10"></div>
          className={`h-full ${item.color} transition-all duration-700`}
          style={{ width: `${(level / 3) * 100}%` }}
        />
      </div>

      {/* SCORE LABEL */}
      <div className="mt-4 text-center">
        <div className={`text-4xl font-bold ${color}`}>{level}</div>
        <div className="text-slate-300 text-sm">Risk Score: {clamped}/100</div>
      <div className="flex items-center gap-2 mt-3">
        <div className={`p-2 rounded-full ${item.color}`}>
          {item.icon}
        </div>
        <span className="text-white font-semibold text-lg">{item.label}</span>
      </div>
    </div>
  );
