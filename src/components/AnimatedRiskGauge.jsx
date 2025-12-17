import React from "react";

export default function AnimatedRiskGauge({ value }) {
  // Normalize value to 0-3 scale, then convert to 0-100 for the project's logic
  const score = (Math.min(value, 3) / 3) * 100;
  
  // Color mapping based on your other project's logic
  const getColors = (v) => {
    if (v >= 3) return { text: "text-red-400", bg: "bg-red-500" };
    if (v >= 2) return { text: "text-orange-400", bg: "bg-orange-500" };
    if (v >= 1) return { text: "text-yellow-400", bg: "bg-yellow-500" };
    return { text: "text-emerald-400", bg: "bg-emerald-500" };
  };

  const { text, bg } = getColors(value);

  return (
    <div className="flex flex-col items-center justify-center w-24 h-16 relative mt-2">
      {/* Visual Gauge Container */}
      <div className="relative w-20 h-10 overflow-hidden">
        {/* Gray Background Track */}
        <div className="absolute w-full h-[200%] bg-slate-800 rounded-full"></div> 
        
        {/* Colored Progress (The part that moves) */}
        <div 
          className={`absolute w-full h-[200%] rounded-full origin-center transition-all duration-1000 ease-out ${bg}`}
          style={{ 
            transform: `rotate(${(score / 100) * 180 - 180}deg)`,
            top: 0
          }}
        ></div>
        
        {/* Center cutout to make it a "ring" */}
        <div className="absolute top-2 left-2 right-2 bottom-0 bg-slate-950 rounded-t-full"></div>
      </div>

      {/* The Number sitting at the bottom center */}
      <div className={`absolute bottom-0 font-black text-xl leading-none ${text}`}>
        {value}
      </div>
    </div>
  );
}
