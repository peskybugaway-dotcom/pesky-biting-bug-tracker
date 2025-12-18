import React from "react";
import AnimatedRiskGauge from "./AnimatedRiskGauge";

export default function Dashboard() {
  return (
    <div className="p-6 space-y-6 max-w-md mx-auto">
      <div className="bg-slate-900 rounded-[2.5rem] p-8 border border-white/5 shadow-2xl text-center">
        <h2 className="text-emerald-500 font-bold text-xs uppercase tracking-[0.2em] mb-4">
          Current Risk Level
        </h2>
        
        {/* This is the Large Gauge */}
        <AnimatedRiskGauge value={3} />
        
        <div className="mt-4">
          <p className="text-white font-black text-xl uppercase italic">Extreme Activity</p>
          <p className="text-slate-400 text-xs mt-1">Mosquito & No-See-Um alert in effect.</p>
        </div>
      </div>
    </div>
  );
}
