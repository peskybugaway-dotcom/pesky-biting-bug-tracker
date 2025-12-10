import React, { useState, useMemo } from "react";
import RiskGauge from "./RiskGauge";

export default function Dashboard() {
  const [temp, setTemp] = useState(82);
  const [humidity, setHumidity] = useState(70);
  const [wind, setWind] = useState(3);

  // 🌡️ REALISTIC RISK ENGINE
  const score = useMemo(() => {
    let s = 0;

    // Temperature
    if (temp > 92) s += 30;
    else if (temp > 80) s += 20;
    else if (temp > 70) s += 10;

    // Humidity
    if (humidity > 85) s += 35;
    else if (humidity > 70) s += 20;
    else if (humidity > 50) s += 10;

    // Wind speed
    if (wind < 2) s += 25;
    else if (wind < 5) s += 15;
    else if (wind > 12) s -= 20;

    return Math.max(0, Math.min(100, s));
  }, [temp, humidity, wind]);

  return (
    <div className="p-6 space-y-8">
      {/* HEADER */}
      <h1 className="text-3xl font-bold text-emerald-400">
        PESKY Biting Bug Tracker
      </h1>

      {/* RISK GAUGE */}
      <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 shadow-xl">
        <RiskGauge score={score} />
      </div>

      {/* SLIDER PANEL */}
      <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 space-y-6 shadow-xl">

        {/* Temperature */}
        <div>
          <label className="flex justify-between text-emerald-300 font-semibold mb-1">
            <span>Temperature</span>
            <span>{temp}°F</span>
          </label>
          <input
            type="range"
            min="40"
            max="105"
            value={temp}
            onChange={(e) => setTemp(Number(e.target.value))}
            className="w-full accent-emerald-500"
          />
        </div>

        {/* Humidity */}
        <div>
          <label className="flex justify-between text-emerald-300 font-semibold mb-1">
            <span>Humidity</span>
            <span>{humidity}%</span>
          </label>
          <input
            type="range"
            min="0"
            max="100"
            value={humidity}
            onChange={(e) => setHumidity(Number(e.target.value))}
            className="w-full accent-sky-400"
          />
        </div>

        {/* Wind */}
        <div>
          <label className="flex justify-between text-emerald-300 font-semibold mb-1">
            <span>Wind Speed</span>
            <span>{wind} mph</span>
          </label>
          <input
            type="range"
            min="0"
            max="25"
            value={wind}
            onChange={(e) => setWind(Number(e.target.value))}
            className="w-full accent-purple-400"
          />
        </div>
      </div>
    </div>
  );
}

