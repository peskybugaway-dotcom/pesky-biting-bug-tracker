import React from "react";
import AnimatedRiskGauge from "./AnimatedRiskGauge";
import { AlertTriangle, MapPin, Shield } from "lucide-react";

export default function Dashboard() {
  return (
    <div className="p-4 space-y-6 max-w-xl mx-auto">
      {/* Risk Card matching your provided project style */}
      <div className="bg-slate-800/70 backdrop-blur-sm rounded-3xl shadow-2xl border border-emerald-800 p-6">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-xl font-bold text-emerald-300 flex items-center gap-2 uppercase tracking-tight">
              Current Risk Profile
            </h2>
            <div className="flex items-center gap-1.5 text-slate-400 mt-1">
              <MapPin size={12} />
              <p className="text-xs font-semibold">North Port, FL</p>
            </div>
          </div>
          <AlertTriangle className="text-orange-500" size={24} />
        </div>

        {/* Gauges Section */}
        <div className="grid grid-cols-3 gap-2">
          <div className="flex flex-col items-center p-2 bg-slate-900/40 rounded-2xl border border-white/5">
            <AnimatedRiskGauge value={3} />
            <span className="text-[10px] font-bold text-slate-400 uppercase mt-2">Mosquito</span>
          </div>
          <div className="flex flex-col items-center p-2 bg-slate-900/40 rounded-2xl border border-white/5">
            <AnimatedRiskGauge value={1} />
            <span className="text-[10px] font-bold text-slate-400 uppercase mt-2">Tick</span>
          </div>
          <div className="flex flex-col items-center p-2 bg-slate-900/40 rounded-2xl border border-white/5">
            <AnimatedRiskGauge value={2} />
            <span className="text-[10px] font-bold text-slate-400 uppercase mt-2">No-See-Um</span>
          </div>
        </div>
      </div>
      
      {/* Action Card */}
      <div className="bg-emerald-700 rounded-3xl p-6 flex items-center justify-between shadow-lg border-b-4 border-emerald-900">
        <div className="flex items-center gap-4">
          <div className="bg-emerald-600 p-3 rounded-2xl shadow-inner">
            <Shield className="text-white" size={24} />
          </div>
          <div className="text-left">
            <h3 className="text-white font-black text-sm uppercase">Extreme Activity</h3>
            <p className="text-emerald-200 text-[10px] font-medium leading-tight">Apply repellent before heading out.</p>
          </div>
        </div>
        <button className="bg-white text-emerald-800 px-5 py-2.5 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-emerald-50 transition-colors shadow-md">
          REPELLENTS
        </button>
      </div>
    </div>
  );
}
