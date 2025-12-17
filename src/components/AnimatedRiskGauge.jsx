import React from "react";

export default function AnimatedRiskGauge({ value }) {
  // Normalize value to 0-3 range
  const displayValue = Math.min(Math.max(value, 0), 3);
  const percentage = (displayValue / 3) * 100;
  
  // Math for a perfect 180-degree half-circle
  const radius = 40;
  const circumference = Math.PI * radius; 
  const dashOffset = circumference - (percentage / 100) * circumference;

  // Determine color based on risk level
  const getColor = (v) => {
    if (v >= 3) return "#ef4444"; // Red
    if (v >= 2) return "#f97316"; // Orange
    return "#10b981"; // Green
  };

  return (
    <div className="flex flex-col items-center justify-center w-24 h-16 relative">
      <svg viewBox="0 0 100 55" className="w-full h-full">
        {/* Background Track (Dark Gray) */}
        <path 
          d="M 10 50 A 40 40 0 0 1 90 50" 
          fill="none" 
          stroke="#1e293b" 
          strokeWidth="10" 
          strokeLinecap="round" 
        />
        {/* Colored Progress Bar */}
        <path
          d="M 10 50 A 40 40 0 0 1 90 50"
          fill="none"
          stroke={getColor(displayValue)}
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={dashOffset}
          style={{ transition: "stroke-dashoffset 1s ease-out" }}
        />
      </svg>
      {/* The Number in the center */}
      <div className="absolute bottom-0 text-white font-black text-lg">
        {displayValue}
      </div>
    </div>
  );
}
