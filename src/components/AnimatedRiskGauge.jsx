import React from "react";

export default function AnimatedRiskGauge({ value }) {
  const getColor = (v) => {
    if (v >= 3) return "#ef4444"; // Red
    if (v >= 2) return "#f97316"; // Orange
    return "#10b981"; // Green
  };

  return (
    <div className="flex flex-col items-center justify-center w-20 h-12 relative">
      <div className="text-white font-black text-2xl z-10">{value}</div>
      <div 
        className="absolute inset-0 border-t-4 rounded-t-full opacity-50"
        style={{ borderColor: getColor(value) }}
      />
    </div>
  );
}
