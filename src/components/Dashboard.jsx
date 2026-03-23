import React, { useState, useEffect } from "react";
import { Thermometer, Droplets, Wind, Target, AlertTriangle, Shield, Crosshair } from "lucide-react";

export default function Dashboard() {
  const [temp, setTemp] = useState(85);
  const [humidity, setHumidity] = useState(78);
  const [wind, setWind] = useState(4);
  const [riskScore, setRiskScore] = useState(92);

  // Tactical Risk Calculation Logic
  useEffect(() => {
    let score = (temp * 0.5) + (humidity * 0.4) - (wind * 2);
    setRiskScore(Math.max(10, Math.min(99, Math.round(score))));
  }, [temp, humidity, wind]);

  const getStatus = (score) => {
    if (score > 85) return { label: "CRITICAL", color: "text-red-500", border: "border-red-500/50" };
    if (score > 60) return { label: "HIGH", color: "text-orange-500", border: "border-orange-500/50" };
    return { label: "NOMINAL", color: "text-emerald-500", border: "border-emerald-500/50" };
  };

  const status = getStatus(riskScore);

  return (
    <div className="relative min-h-screen bg-[#050707] text-[#cbd5e1] font-mono selection:bg-red-500/30">
      {/* Tactical Scanline Overlay */}
      <div className="scanline pointer-events-none fixed inset-0 z-50 opacity-[0.03]" />

      <div className="max-w-md mx-auto p-6 space-y-6 pt-10">
        
        {/* Header HUD */}
        <div className="flex justify-between items-end border-b border-white/10 pb-4">
          <div>
            <div className="flex items-center gap-2 text-red-500 text-[10px] font-bold tracking-[0.3em] mb-1">
              <Target size={12} /> SECURE FEED // LIVE
            </div>
            <h1 className="text-2xl font-black italic tracking-tighter text-white">PESKY_TACTICAL</h1>
          </div>
          <div className="text-right text-[10px] font-bold text-slate-500">
            LOC: 27.0506° N<br />NORTH PORT_FL
          </div>
        </div>

        {/* Main Risk Display */}
        <div className={`bg-slate-900/40 border-2 ${status.border} rounded-2xl p-8 relative overflow-hidden shadow-[0_0_30px_rgba(239,68,68,0.1)]`}>
          <div className="flex justify-between items-start">
            <span className="text-[10px] font-bold tracking-widest text-slate-500 uppercase">Threat Level</span>
            <AlertTriangle className={status.color} size={20} />
          </div>
          
          <div className="flex items-center justify-center py-6 gap-4">
            <div className={`text-7xl font-black italic tracking-tighter ${status.color}`}>
              {riskScore}
            </div>
            <div className="h-16 w-[2px] bg-white/10" />
            <div className="text-left">
              <div className={`text-xl font-bold leading-none ${status.color}`}>{status.label}</div>
              <div className="text-[10px] text-slate-500 font-bold mt-1 uppercase tracking-tighter">Bite Prob. Index</div>
            </div>
          </div>

          {/* Tactical Progress Bar */}
          <div className="w-full h-1 bg-slate-800 rounded-full overflow-hidden">
            <div 
              className={`h-full transition-all duration-1000 ${status.color.replace('text', 'bg')}`}
              style={{ width: `${riskScore}%` }}
            />
          </div>
        </div>

        {/* HUD Sliders */}
        <div className="bg-slate-900/20 border border-white/5 rounded-2xl p-6 space-y-8">
          
          {/* Temperature */}
          <div className="space-y-4">
            <div className="flex justify-between items-center text-[11px] font-bold uppercase tracking-widest">
              <span className="flex items-center gap-2 text-slate-400"><Thermometer size={14} /> Temp_Sens</span>
              <span className="text-red-500">{temp}°F</span>
            </div>
            <input type="range" min="60" max="100" value={temp} onChange={(e) => setTemp(e.target.value)} />
          </div>

          {/* Humidity */}
          <div className="space-y-4">
            <div className="flex justify-between items-center text-[11px] font-bold uppercase tracking-widest">
              <span className="flex items-center gap-2 text-slate-400"><Droplets size={14} /> Hum_Saturation</span>
              <span className="text-red-500">{humidity}%</span>
            </div>
            <input type="range" min="0" max="100" value={humidity} onChange={(e) => setHumidity(e.target.value)} />
          </div>

          {/* Wind */}
          <div className="space-y-4">
            <div className="flex justify-between items-center text-[11px] font-bold uppercase tracking-widest">
              <span className="flex items-center gap-2 text-slate-400"><Wind size={14} /> Vector_Vel</span>
              <span className="text-red-500">{wind} mph</span>
            </div>
            <input type="range" min="0" max="30" value={wind} onChange={(e) => setWind(e.target.value)} />
          </div>
        </div>

        {/* Bottom Action HUD */}
        <div className="bg-red-600/10 border border-red-500/20 rounded-xl p-4 flex items-center justify-between">
           <div className="flex items-center gap-3">
              <Shield className="text-red-500" size={24} />
              <div>
                 <div className="text-white font-bold text-xs uppercase tracking-tighter">Engagement Protocol</div>
                 <div className="text-red-400 text-[10px] font-bold uppercase tracking-widest">Repellent Active Recommended</div>
              </div>
           </div>
           <Crosshair className="text-red-500 animate-spin-slow" size={20} />
        </div>

      </div>
    </div>
  );
}
