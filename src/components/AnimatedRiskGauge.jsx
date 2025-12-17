import React from "react";

export default function AnimatedRiskGauge({ value }) {
  // Map 0-3 to rotation: 0 = -90deg, 3 = 90deg
  const rotation = (value / 3) * 180 - 90;
  
  const colors = {
    3: "border-red-500 text-red-500",
    2: "border-orange-500 text-orange-500",
    1: "border-yellow-400 text-yellow-400",
    0: "border-emerald-500 text-emerald-500"
  };

  const colorClass = colors[value] || colors[0];

  return (
    <div className="flex flex-col items-center justify-center p-2">
      <div className="relative w-20 h-10 overflow-hidden">
        {/* Background Track */}
        <div className="absolute top-0 left-0 w-20 h-20 border-[8px] border-slate-800 rounded-full" />
        
        {/* Active Progress Arc */}
        <div 
          className={`absolute top-0 left-0 w-20 h-20 border-[8px] rounded-full transition-transform duration-1000 ${colorClass}`}
          style={{ 
            transform: `rotate(${rotation}deg)`,
            borderBottomColor: 'transparent',
            borderLeftColor: 'transparent'
          }}
        />
      </div>
      <div className={`mt-1 font-black text-xl ${colorClass.split(' ')[1]}`}>
        {value}
      </div>
    </div>
  );
}
