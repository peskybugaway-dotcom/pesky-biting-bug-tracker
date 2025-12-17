import React from "react";

export default function AnimatedRiskGauge({ value }) {
  const percentage = (value / 3) * 100;
  const radius = 40;
  const circumference = Math.PI * radius; // 180 degrees
  const dashOffset = circumference - (percentage / 100) * circumference;

  const getColor = (v) => {
    if (v >= 3) return "#ef4444"; // Severe
    if (v >= 2) return "#f97316"; // High
    return "#10b981"; // Low/Mod
  };

  return (
    <div className="relative flex flex-col items-center justify-center w-32 h-20 overflow-hidden">
      <svg viewBox="0 0 100 60" className="w-full h-full">
        <path
          d="M 10 50 A 40 40 0 0 1 90 50"
          fill="none"
          stroke="#1e293b"
          strokeWidth="10"
          strokeLinecap="round"
        />
        <path
          d="M 10 50 A 40 40 0 0 1 90 50"
          fill="none"
          stroke={getColor(value)}
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={dashOffset}
          style={{ transition: 'stroke-dashoffset 1s ease-out' }}
        />
      </svg>
      <div className="absolute bottom-1 text-center">
        <span className="text-xl font-black text-white">{value}</span>
      </div>
    </div>
  );
}
