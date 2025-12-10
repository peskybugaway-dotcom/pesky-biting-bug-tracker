import React, { useState, useMemo } from "react";
import RiskGauge from "./RiskGauge";

export default function Dashboard() {
  const [temp, setTemp] = useState(82);
  const [humidity, setHumidity] = useState(70);
  const [wind, setWind] = useState(3);

  const score = useMemo(() => {
    let s = 0;
    if (temp > 80) s += 30;
    if (humidity > 60) s += 30;
    if (wind < 5) s += 30;
    return Math.min(100, s);
  }, [temp, humidity, wind]);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-emerald-400">
        PESKY Biting Bug Tracker
      </h1>

      <RiskGauge score={score} />

      <div className="space-y-4 bg-slate-800 p-4 rounded-xl">
        <label className="block">
          Temperature: {temp}°F
          <input
            type="range"
            min="40"
            max="100"
            value={temp}
            onChange={(e) => setTemp(Number(e.target.value))}
            className="w-full"
          />
        </label>

        <label className="block">
          Humidity: {humidity}%
          <input
            type="range"
            min="0"
            max="100"
            value={humidity}
            onChange={(e) => setHumidity(Number(e.target.value))}
            className="w-full"
          />
        </label>

        <label className="block">
          Wind: {wind} mph
          <input
            type="range"
            min="0"
            max="20"
            value={wind}
            onChange={(e) => setWind(Number(e.target.value))}
            className="w-full"
          />
        </label>
      </div>
    </div>
  );
}
