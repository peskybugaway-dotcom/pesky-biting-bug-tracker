import React from "react";

export default function AnimatedRiskGauge({ value }) {
  // Logic: 0 is Low, 1 is Moderate, 2 is High, 3 is Severe
  const score = (Math.min(value, 3) / 3) * 100;
  
  const getStyle = (v) => {
    if (v >= 3) return { text: "text-red-500", bg: "bg-red-500", label: "Severe" };
    if (v >= 2) return { text: "text-orange-500", bg: "bg-orange-500", label: "High" };
    if (v >= 1) return { text: "text-yellow-400", bg: "bg-yellow-400", label: "Moderate" };
    return { text: "text-emerald-500", bg: "bg-emerald-500", label: "Low" };
  };

  const theme = getStyle(value);

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-24 h-12 overflow-hidden">
        {/* Background Track (The dark gray arc) */}
        <div className="absolute w-24 h-24 border-[10px] border-slate-800 rounded-full"></div>
        
        {/* Progress Fill (The colored arc) */}
        <div 
          className={`absolute w-24 h-24 border-[10px] border-t-transparent border-l-transparent rounded-full transition-all duration-1000 ease-out ${theme.bg.replace('bg-', 'border-')}`}
          style={{ 
            transform: `rotate(${(score / 100) * 180 - 135}deg)`,
            borderColor: 'transparent transparent currentColor currentColor'
          }}
        ></div>
        
        {/* The Number in the center */}
        <div className={`absolute bottom-0 left-0 right-0 text-center font-black text-2xl tracking-tighter ${theme.text}`}>
          {value}
        </div>
      </div>
      <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest mt-2">
        {theme.label}
      </span>
    </div>
  );
}
