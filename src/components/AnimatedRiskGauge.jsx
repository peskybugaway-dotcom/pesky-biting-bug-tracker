import React from "react";

export default function AnimatedRiskGauge({ value, label }) {
  // Map 0-3 to 0-100%
  const percentage = (value / 3) * 100;
  const radius = 36;
  const circumference = Math.PI * radius; // Half circle circumference
  const dashOffset = circumference - (percentage / 100) * circumference;

  const getColor = (v) => {
    if (v >= 3) return "#ef4444"; // Red
    if (v >= 2) return "#f97316"; // Orange
    return "#10b981"; // Green
  };

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-24 h-14 overflow-hidden">
        <svg viewBox="0 0 100 50" className="w-full h-full">
          {/* Background Track */}
          <path
            d="M 10 45 A 40 40 0 0 1 90 45"
            fill="none"
            stroke="#1e293b"
            strokeWidth="8"
            strokeLinecap="round"
          />
          {/* Active Progress */}
          <path
            d="M 10 45 A 40 40 0 0 1 90 45"
            fill="none"
            stroke={getColor(value)}
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={dashOffset}
            className="transition-all duration-1000 ease-out"
          />
        </svg>
        <div className="absolute inset-x-0 bottom-0 text-center">
          <span className="text-xs font-black text-white">{value}</span>
        </div>
      </div>
      <p className="text-[8px] font-bold text-slate-500 uppercase mt-1">{label}</p>
    </div>
  );
}
