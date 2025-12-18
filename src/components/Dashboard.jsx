import React, { useState } from "react";
import AnimatedRiskGauge from "./AnimatedRiskGauge";
import { Thermometer, Droplets, Wind, Clock, MapPin } from "lucide-react";

export default function Dashboard() {
  // Slider States
  const [temp, setTemp] = useState(82);
  const [humidity, setHumidity] = useState(70);
  const [wind, setWind] = useState(5);
  const [time, setTime] = useState("7:00 PM");

  return (
    <div className="p-4 space-y-6 max-w-md mx-auto animate-in fade-in duration-700">
      {/* Header Section */}
      <div className="flex justify-between items-center px-2">
        <div>
          <div className="flex items-center gap-1 text-emerald-500 font-bold text-[10px] uppercase tracking-widest">
            <MapPin size={10} /> North Port, FL
          </div>
          <h2 className="text-white font-black text-2xl uppercase tracking-tighter italic">Daily Risk</h2>
        </div>
        <div className="bg-slate-900 px-3 py-1 rounded-full border border-white/10 text-[10px] text-slate-400 font-bold uppercase">
          Live Data
        </div>
      </div>

      {/* Main Gauge Card */}
      <div className="bg-slate-900 border-2 border-emerald-500/20 rounded-[2.5rem] p-8 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 blur-3xl rounded-full" />
        <AnimatedRiskGauge value={3} />
        <div className="mt-4 text-center">
          <p className="text-white font-black text-xl uppercase italic">Extreme Activity</p>
          <p className="text-slate-400 text-[10px] uppercase font-bold tracking-widest mt-1">Mosquito & No-See-Um Alert</p>
        </div>
      </div>

      {/* Weather Sliders Section */}
      <div className="bg-slate-900/50 rounded-[2rem] p-6 border border-white/5 space-y-6">
        <h3 className="text-slate-500 font-black text-[10px] uppercase tracking-[0.2em] px-1">Weather Conditions</h3>
        
        {/* Temperature Slider */}
        <div className="space-y-3">
          <div className="flex justify-between text-[10px] font-black uppercase italic">
            <span className="flex items-center gap-1 text-slate-300"><Thermometer size={12}/> Temp</span>
            <span className="text-emerald-400">{temp}°F</span>
          </div>
          <input 
            type="range" min="60" max="100" value={temp} 
            onChange={(e) => setTemp(e.target.value)}
            className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
          />
        </div>

        {/* Humidity Slider */}
        <div className="space-y-3">
          <div className="flex justify-between text-[10px] font-black uppercase italic">
            <span className="flex items-center gap-1 text-slate-300"><Droplets size={12}/> Humidity</span>
            <span className="text-emerald-400">{humidity}%</span>
          </div>
          <input 
            type="range" min="0" max="100" value={humidity} 
            onChange={(e) => setHumidity(e.target.value)}
            className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
          />
        </div>

        {/* Wind Slider */}
        <div className="space-y-3">
          <div className="flex justify-between text-[10px] font-black uppercase italic">
            <span className="flex items-center gap-1 text-slate-300"><Wind size={12}/> Wind</span>
            <span className="text-emerald-400">{wind} MPH</span>
          </div>
          <input 
            type="range" min="0" max="30" value={wind} 
            onChange={(e) => setWind(e.target.value)}
            className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
          />
        </div>

        {/* Time Display */}
        <div className="pt-2 flex items-center justify-center gap-2 text-slate-500 font-black text-[10px] uppercase">
          <Clock size={12} /> Last Updated: {time}
        </div>
      </div>
    </div>
  );
}
