import React from "react";
import AnimatedRiskGauge from "./AnimatedRiskGauge";
import { AlertCircle, MapPin } from "lucide-react";

export default function Dashboard() {
  return (
    <div className="p-4 space-y-6 max-w-xl mx-auto">
      <div className="bg-slate-900/80 border border-white/5 rounded-[2.5rem] p-6 shadow-2xl backdrop-blur-md">
        <div className="flex justify-between items-start mb-8">
          <div>
            <h2 className="text-white font-black text-2xl tracking-tighter uppercase">Daily Risk</h2>
            <div className="flex items-center gap-1.5 text-emerald-400 mt-1">
              <MapPin size={10} className="fill-emerald-400/20" />
              <p className="text-[10px] font-bold tracking-[0.2em] uppercase">North Port, FL</p>
            </div>
          </div>
          <div className="bg-red-500/20 p-2.5 rounded-2xl border border-red-500/30">
            <AlertCircle size={20} className="text-red-500" />
          </div>
        </div>

        {/* The row of gauges */}
        <div className="flex justify-between items-end gap-1 px-2">
          <div className="flex flex-col items-center">
            <AnimatedRiskGauge value={3} />
            <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest mt-3">Mosquito</span>
          </div>
          <div className="flex flex-col items-center">
            <AnimatedRiskGauge value={1} />
            <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest mt-3">Tick</span>
          </div>
          <div className="flex flex-col items-center">
            <AnimatedRiskGauge value={2} />
            <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest mt-3">No-See-Um</span>
          </div>
        </div>
      </div>
      
      {/* Action Card */}
      <div className="bg-emerald-600 rounded-[2rem] p-5 flex items-center justify-between shadow-lg shadow-emerald-900/40">
        <div>
          <h3 className="text-white font-black text-sm uppercase tracking-tight">Extreme Activity</h3>
          <p className="text-emerald-100 text-[10px] font-medium opacity-90">Protection is highly recommended.</p>
        </div>
        <button className="bg-white text-emerald-700 px-4 py-2.5 rounded-xl font-black text-[9px] tracking-widest uppercase shadow-sm active:scale-95 transition-transform">
          Repellents
        </button>
      </div>
    </div>
  );
}
