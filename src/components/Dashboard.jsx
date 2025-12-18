import React, { useState, useEffect } from "react";
import AnimatedRiskGauge from "./AnimatedRiskGauge";
import { Thermometer, Droplets, Wind, MapPin } from "lucide-react";

export default function Dashboard() {
  const [temp, setTemp] = useState(85);
  const [humidity, setHumidity] = useState(75);
  const [wind, setWind] = useState(4);
  const [calculatedRisk, setCalculatedRisk] = useState(3);

  // This effect updates the gauge needle when you move the sliders
  useEffect(() => {
    // Simple logic: High temp + High humidity + Low wind = High Risk
    let risk = 1;
    if (temp > 80 && humidity > 60) risk = 3;
    else if (temp > 70 || humidity > 50) risk = 2;
    if (wind > 15) risk -= 1; // Wind blows bugs away
    setCalculatedRisk(Math.max(1, Math.min(3, risk)));
  }, [temp, humidity, wind]);

  return (
    <div className="p-4 pt-2 space-y-6 max-w-md mx-auto animate-in fade-in duration-700">
      <div className="flex justify-between items-end px-2">
        <div>
          <div className="flex items-center gap-1 text-emerald-500 font-bold text-[10px] uppercase tracking-[0.2em] mb-1">
            <MapPin size={12} strokeWidth={3} /> North Port, FL
          </div>
          <h2 className="text-white font-black text-3xl uppercase tracking-tighter italic leading-none">Status</h2>
        </div>
      </div>

      {/* Main Gauge Card */}
      <div className="bg-slate-900 border-2 border-emerald-500/10 rounded-[2.5rem] p-8 shadow-2xl relative overflow-hidden">
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-emerald-500/10 blur-[50px] rounded-full" />
        <AnimatedRiskGauge value={calculatedRisk} />
        <div className="mt-4 text-center">
          <p className="text-white font-black text-xl uppercase italic tracking-tight">
            {calculatedRisk === 3 ? "Extreme Activity" : calculatedRisk === 2 ? "High Activity" : "Moderate Activity"}
          </p>
          <p className="text-slate-500 text-[10px] uppercase font-black tracking-widest mt-1">Bite Risk Analysis</p>
        </div>
      </div>

      {/* Sliders Section */}
      <div className="bg-slate-900/40 rounded-[2rem] p-6 border border-white/5 space-y-7 shadow-inner">
        {/* Temperature */}
        <div className="space-y-3">
          <div className="flex justify-between text-[11px] font-black uppercase tracking-wider">
            <span className="flex items-center gap-2 text-slate-400"><Thermometer size={14} className="text-orange-500"/> Temperature</span>
            <span className="text-white bg-orange-500/20 px-2 py-0.5 rounded-md border border-orange-500/20">{temp}°F</span>
          </div>
          <input type="range" min="60" max="100" value={temp} onChange={(e) => setTemp(parseInt(e.target.value))}
            className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-orange-500" />
        </div>

        {/* Humidity */}
        <div className="space-y-3">
          <div className="flex justify-between text-[11px] font-black uppercase tracking-wider">
            <span className="flex items-center gap-2 text-slate-400"><Droplets size={14} className="text-blue-400"/> Humidity</span>
            <span className="text-white bg-blue-400/20 px-2 py-0.5 rounded-md border border-blue-400/20">{humidity}%</span>
          </div>
          <input type="range" min="0" max="100" value={humidity} onChange={(e) => setHumidity(parseInt(e.target.value))}
            className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-400" />
        </div>

        {/* Wind */}
        <div className="space-y-3">
          <div className="flex justify-between text-[11px] font-black uppercase tracking-wider">
            <span className="flex items-center gap-2 text-slate-400"><Wind size={14} className="text-emerald-400"/> Wind Speed</span>
            <span className="text-white bg-emerald-400/20 px-2 py-0.5 rounded-md border border-emerald-400/20">{wind} mph</span>
          </div>
          <input type="range" min="0" max="30" value={wind} onChange={(e) => setWind(parseInt(e.target.value))}
            className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-400" />
        </div>
      </div>
    </div>
  );
}
