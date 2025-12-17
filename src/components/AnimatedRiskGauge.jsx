import React from "react";

export default function AnimatedRiskGauge({ value }) {
  // 1. Calculate color based on risk
  const getColor = (v) => {
    if (v >= 3) return "#ef4444"; // Red
    if (v >= 2) return "#f97316"; // Orange
    return "#10b981"; // Green
  };

  // 2. Simple percentage for the width (since we'll use a flat bar first to ensure it works)
  const widthPercent = (value / 3) * 100;

  return (
    <div className="flex flex-col items-center justify-center w-24 h-14 relative">
      {/* The Half-Circle SVG */}
      <svg viewBox="0 0 100 50" className="w-full h-full overflow-visible">
        {/* Background Track */}
        <path
          d="M 10 50 A 40 40 0 0 1 90 50"
          fill="none"
          stroke="#1e293b"
          strokeWidth="10"
          strokeLinecap="round"
        />
        {/* Progress Arc (This is what was likely missing) */}
        <path
          d="M 10 50 A 40 40 0 0 1 90 50"
          fill="none"
          stroke={getColor(value)}
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray="126"
          strokeDashoffset={126 - (126 * (value / 3))}
          className="transition-all duration-1000 ease-out"
        />
      </svg>
      
      {/* The Number sitting in the center */}
      <div className="absolute bottom-0 text-white font-black text-xl">
        {value}
      </div>
    </div>
  );
}
