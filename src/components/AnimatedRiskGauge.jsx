import React from "react";

export default function AnimatedRiskGauge({ value }) {
  const percentage = (Math.min(value, 3) / 3) * 100;
  // Standard SVG circle math
  const radius = 36;
  const circumference = Math.PI * radius; 
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  const getColor = (v) => {
    if (v >= 3) return "#ef4444"; // Red
    if (v >= 2) return "#f97316"; // Orange
    return "#10b981"; // Green
  };

  return (
    <div className="flex flex-col items-center justify-center w-24 h-16 relative mt-2">
      <svg viewBox="0 0 100 55" className="w-full h-full transform translate-y-1">
        {/* Gray Background Track */}
        <path
          d="M 14 50 A 36 36 0 0 1 86 50"
          fill="none"
          stroke="#1e293b"
          strokeWidth="8"
          strokeLinecap="round"
        />
        {/* Animated Progress Track */}
        <path
          d="M 14 50 A 36 36 0 0 1 86 50"
          fill="none"
          stroke={getColor(value)}
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          className="transition-all duration-1000 ease-out"
        />
      </svg>
      {/* The number centered under the arc */}
      <div className="absolute bottom-1 flex flex-col items-center">
        <span className="text-white font-black text-xl leading-none">{value}</span>
      </div>
    </div>
  );
}
