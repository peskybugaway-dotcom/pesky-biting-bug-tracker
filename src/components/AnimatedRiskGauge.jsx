import React from "react";

export default function AnimatedRiskGauge({ value }) {
  // Value comes from bugs.json (0-3)
  const segments = [
    { label: "Low", color: "#10b981" },     // 0
    { label: "Moderate", color: "#eab308" }, // 1
    { label: "High", color: "#f97316" },     // 2
    { label: "Severe", color: "#ef4444" }    // 3
  ];

  const current = segments[value] || segments[0];
  const radius = 80;
  const stroke = 12;
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  
  // Half circle calculation (divided by 2)
  const strokeDashoffset = (circumference / 2) - ((value / 3) * (circumference / 2));

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <div className="relative w-40 h-24 overflow-hidden">
        <svg height="160" width="160" className="absolute top-0 transform -rotate-180">
          {/* Background Track */}
          <circle
            stroke="#1e293b"
            fill="transparent"
            strokeWidth={stroke}
            strokeDasharray={circumference + ' ' + circumference}
            style={{ strokeDashoffset: circumference / 2 }}
            r={normalizedRadius}
            cx="80"
            cy="80"
          />
          {/* Progress Path */}
          <circle
            stroke={current.color}
            fill="transparent"
            strokeWidth={stroke}
            strokeDasharray={circumference + ' ' + circumference}
            style={{ 
              strokeDashoffset,
              transition: 'stroke-dashoffset 1s ease-out, stroke 0.5s ease' 
            }}
            r={normalizedRadius}
            cx="80"
            cy="80"
            strokeLinecap="round"
          />
        </svg>
        
        <div className="absolute inset-x-0 bottom-0 flex flex-col items-center">
          <span className="text-xl font-black text-white">{current.label}</span>
          <span className="text-[10px] text-slate-500 font-bold tracking-widest uppercase">Risk Level</span>
        </div>
      </div>
    </div>
  );
}
