import React from "react";
import AnimatedRiskGauge from "./AnimatedRiskGauge";
import { AlertCircle, MapPin, Shield } from "lucide-react";

export default function Dashboard() {
  return (
    <div className="p-4 pt-4 space-y-6 max-w-md mx-auto animate-in fade-in duration-700">
      {/* Risk Card */}
      <div className="bg-slate-900 border-2 border-emerald-500/20 rounded-[2.5rem] p-6 shadow-2xl">
        <div className="flex justify-between items-start mb-6">
          <div>
            <div className="flex items-center gap-1 text-emerald-500 font-bold text-[10px] uppercase tracking-widest mb-1">
              <MapPin size={10} /> North Port, FL
            </div>
            <h2 className="text-white font-black text-2xl uppercase tracking-tighter leading-none">Daily Risk</h2>
          </div>
          <AlertCircle className="text-red-500 animate-pulse" size={24} />
        </div>

        {/* The 3 Arcs Grid */}
        <div className="grid grid-cols-3 gap-2 bg-black/40 p-4 rounded-3xl border border-white/5 shadow-inner">
          <div className="text-center">
            <AnimatedRiskGauge value={3} />
            <p className="text-[8px] font-black text-slate-500 uppercase mt-1">Mosquito</p>
          </div>
          <div className="text-center">
            <AnimatedRiskGauge value={1} />
            <p className="text-[8px] font-black text-slate-500 uppercase mt-1">Tick</p>
          </div>
          <div className="text-center">
            <AnimatedRiskGauge value={2} />
            <p className="text-[8px] font-black text-slate-500 uppercase mt-1">No-See-Um</p>
          </div>
        </div>
      </div>

      {/* Action Banner */}
      <div className="bg-emerald-600 rounded-[2rem] p-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-white/20 p-2.5 rounded-2xl">
            <Shield className="text-white" size={24} />
          </div>
          <div className="text-left">
            <h3 className="text-white font-black text-xs uppercase italic">Extreme Activity</h3>
            <p className="text-emerald-100 text-[10px] font-medium leading-tight">Apply repellent now.</p>
          </div>
        </div>
        <button className="bg-white text-emerald-800 px-4 py-2 rounded-xl font-black text-[10px] uppercase">
          Repellents
        </button>
      </div>
    </div>
  );
}
