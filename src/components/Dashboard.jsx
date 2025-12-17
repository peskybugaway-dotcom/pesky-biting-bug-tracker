import React from "react";
import AnimatedRiskGauge from "./AnimatedRiskGauge";
import { Shield, AlertCircle, MapPin } from "lucide-react";

export default function Dashboard() {
  return (
    <div className="p-6 space-y-8 max-w-xl mx-auto pb-24">
      {/* Risk Summary Card */}
      <div className="bg-slate-900/50 border border-slate-800 rounded-[2.5rem] p-8 shadow-2xl backdrop-blur-md">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-white font-black text-2xl tracking-tight">DAILY RISK</h2>
            <div className="flex items-center gap-2 text-emerald-400">
              <MapPin size={12} />
              <p className="text-[10px] font-bold tracking-widest uppercase">North Port, FL</p>
            </div>
          </div>
          <div className="bg-red-500/10 p-3 rounded-2xl border border-red-500/20">
            <AlertCircle className="text-red-500" />
          </div>
        </div>

        {/* The Half-Circle Gauges Row */}
        <div className="flex justify-around items-end gap-2">
          <AnimatedRiskGauge value={3} label="Mosquito" />
          <AnimatedRiskGauge value={1} label="Tick" />
          <AnimatedRiskGauge value={2} label="No-See-Um" />
        </div>
      </div>

      {/* Quick Protection Action */}
      <div className="bg-emerald-600 rounded-[2rem] p-6 flex items-center justify-between shadow-xl shadow-emerald-900/20">
        <div className="space-y-1">
          <h3 className="text-white font-bold text-lg">Stay Protected</h3>
          <p className="text-emerald-100 text-xs">Mosquito activity is Extreme today.</p>
        </div>
        <button className="bg-white text-emerald-700 px-6 py-3 rounded-2xl font-black text-xs hover:bg-emerald-50 transition-colors">
          REPELLENTS
        </button>
      </div>
    </div>
  );
}
