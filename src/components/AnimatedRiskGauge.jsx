import React from "react";

export default function AnimatedRiskGauge({ value }) {
  // value 0-3 (0: Low, 1: Moderate, 2: High, 3: Severe)
  const percentage = (value / 3) * 100;
  // Calculate stroke for a semi-circle (circumference / 2)
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 200) * circumference;

  const getColor = (v) => {
    if (v === 3) return "#ef4444"; // Red
    if (v === 2) return "#f97316"; // Orange
    if (v === 1) return "#eab308"; // Yellow
    return "#10b981"; // Emerald
  };

  return (
    <div className="relative flex items-center justify-center w-48 h-24 overflow-hidden">
      <svg className="w-48 h-48 -rotate-90 transform translate-y-12">
        {/* Background Track */}
        <circle
          cx="96"
          cy="96"
          r={radius}
          stroke="#1e293b"
          strokeWidth="12"
          fill="transparent"
          strokeDasharray={`${circumference / 2} ${circumference}`}
          strokeLinecap="round"
        />
        {/* Active Progress */}
        <circle
          cx="96"
          cy="96"
          r={radius}
          stroke={getColor(value)}
          strokeWidth="12"
          fill="transparent"
          strokeDasharray={`${circumference / 2} ${circumference}`}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className="transition-all duration-1000 ease-out"
        />
      </svg>
      <div className="absolute bottom-0 text-center">
        <span className="text-2xl font-black text-white">{percentage.toFixed(0)}%</span>
        <p className="text-[10px] text-slate-500 font-bold tracking-widest uppercase">Risk Factor</p>
      </div>
    </div>
  );
}
