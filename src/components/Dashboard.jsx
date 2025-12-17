import React from "react";
import AnimatedRiskGauge from "./AnimatedRiskGauge";
import { Shield, AlertCircle, MapPin } from "lucide-react";

export default function Dashboard() {
  return (
    <div className="p-6 space-y-8 max-w-xl mx-auto">
      {/* Risk Summary Card */}
      <div className="bg-slate-900/50 border border-slate-800 rounded-[2.5rem] p-8 shadow-2xl backdrop-blur-md">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-white font-black text-2xl tracking-tight uppercase">Daily Risk</h2>
            <div className="flex items-center gap-2 text-emerald-400">
              <MapPin size={12} />
              <p className="text-[10px] font-bold tracking-widest uppercase">North Port, FL</p>
            </div>
          </div>
          <div className="bg-red-500/10 p-3 rounded-2xl border border-red-500/20">
            <AlertCircle className="text-red-500" />
          </div>
        </div>

        {/* The 3 Gauges sitting in a row */}
        <div className="flex justify-around items-end gap-2">
          <div className="text-center">
            <AnimatedRiskGauge value={3} />
            <p className="text-[10px] font-black text-slate-500 mt-2 uppercase tracking-tighter">Mosquito</p>
          </div>
          <div className="text-center">
            <AnimatedRiskGauge value={1} />
            <p className="text-[10px] font-black text-slate-500 mt-2 uppercase tracking-tighter">Tick</p>
          </div>
          <div className="text-center">
            <AnimatedRiskGauge value={2} />
            <p className="text-[10px] font-black text-slate-500 mt-2 uppercase tracking-tighter">No-See-Um</p>
          </div>
        </div>
      </div>

      {/* Action Card */}
      <div className="bg-emerald-600 rounded-[2rem] p-6 flex items-center justify-between shadow-xl">
        <div className="space-y-1">
          <h3 className="text-white font-bold text-lg leading-tight">Stay Protected</h3>
          <p className="text-emerald-100 text-xs">Activity is Extreme today.</p>
        </div>
        <button className="bg-white text-emerald-700 px-5 py-3 rounded-2xl font-black text-[10px] tracking-widest">
          REPELLENTS
        </button>
      </div>
    </div>
  );
}
