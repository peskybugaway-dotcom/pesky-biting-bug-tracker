import React from "react";
import { AlertCircle, MapPin, Shield } from "lucide-react";

export default function Dashboard() {
  return (
    <div className="p-4 space-y-6 max-w-xl mx-auto">
      {/* Risk Card */}
      <div className="bg-slate-900 border border-slate-800 rounded-[2.5rem] p-8 shadow-2xl">
        <div className="flex justify-between items-start mb-8">
          <div>
            <h2 className="text-white font-black text-2xl tracking-tighter uppercase leading-none">Daily Risk</h2>
            <div className="flex items-center gap-1.5 text-emerald-400 mt-2">
              <MapPin size={10} />
              <p className="text-[10px] font-bold tracking-[0.2em] uppercase">North Port, FL</p>
            </div>
          </div>
          <div className="bg-red-500/20 p-2.5 rounded-2xl border border-red-500/30 text-red-500">
            <AlertCircle size={20} />
          </div>
        </div>

        {/* Temporary Simple Stats (No Gauges to avoid crashes) */}
        <div className="flex justify-between px-4 py-6 bg-slate-950/50 rounded-3xl border border-white/5">
          <div className="text-center">
            <div className="text-2xl font-black text-white">3</div>
            <div className="text-[8px] text-slate-500 uppercase font-bold tracking-widest">Mosquito</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-black text-white">1</div>
            <div className="text-[8px] text-slate-500 uppercase font-bold tracking-widest">Tick</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-black text-white">2</div>
            <div className="text-[8px] text-slate-500 uppercase font-bold tracking-widest">No-See-Um</div>
          </div>
        </div>
      </div>
      
      {/* Protection Card */}
      <div className="bg-emerald-600 rounded-[2rem] p-6 flex items-center justify-between shadow-xl">
        <div className="flex items-center gap-4 text-left">
          <Shield className="text-white" size={24} />
          <div>
            <h3 className="text-white font-black text-sm uppercase">Extreme Activity</h3>
            <p className="text-emerald-100 text-[10px]">Protection Recommended</p>
          </div>
        </div>
        <button className="bg-white text-emerald-700 px-4 py-2 rounded-xl font-black text-[9px] uppercase">
          REPELLENTS
        </button>
      </div>
    </div>
  );
}
