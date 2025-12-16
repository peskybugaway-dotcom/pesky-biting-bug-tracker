import React from "react";
import { AlertTriangle, ShieldAlert, Skull } from "lucide-react";

export default function RiskGauge({ level }) {
  // level 0–3
  const gaugeLevels = [
    { label: "None", color: "bg-slate-500", icon: <ShieldAlert /> },
    { label: "Low", color: "bg-green-500", icon: <ShieldAlert /> },
    { label: "Moderate", color: "bg-yellow-500", icon: <AlertTriangle /> },
    { label: "High", color: "bg-orange-500", icon: <AlertTriangle /> },
    { label: "Severe", color: "bg-red-600", icon: <Skull /> },
  ];

  const item = gaugeLevels[level] ?? gaugeLevels[0];

  return (
    <div className="p-4 bg-slate-800 rounded-xl shadow-lg border border-slate-700">
      <h3 className="text-lg font-semibold text-white mb-3">Bite Risk Level</h3>

      {/* Gauge Bar */}
      <div className="relative w-full h-3 bg-slate-700 rounded-full overflow-hidden">
        <div
          className={`h-full ${item.color} transition-all duration-700`}
          style={{ width: `${(level / 3) * 100}%` }}
        />
      </div>

      <div className="flex items-center gap-2 mt-3">
        <div className={`p-2 rounded-full ${item.color}`}>
          {item.icon}
        </div>
        <span className="text-white font-semibold text-lg">{item.label}</span>
      </div>
    </div>
  );
}
