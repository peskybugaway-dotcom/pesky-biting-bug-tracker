import React, { useState, useMemo } from "react";
import AnimatedRiskGauge from "./AnimatedRiskGauge";
import PresetManager from "./PresetManager";

export default function Dashboard() {
  const [temp, setTemp] = useState(82);
  const [humidity, setHumidity] = useState(70);
  const [wind, setWind] = useState(3);

  // Load saved presets
  const [presets, setPresets] = useState(
    JSON.parse(localStorage.getItem("pesky-presets") || "[]")
  );
  const [showPresets, setShowPresets] = useState(false);

  // Save preset
  function savePreset() {
    const name = prompt("Enter name for this location:");
    if (!name) return;

    const newPreset = { name, temp, humidity, wind };
    const updated = [...presets, newPreset];

    setPresets(updated);
    localStorage.setItem("pesky-presets", JSON.stringify(updated));
  }

  // Load preset
  function loadPreset(i) {
    const p = presets[i];
    setTemp(p.temp);
    setHumidity(p.humidity);
    setWind(p.wind);
    setShowPresets(false);
  }

  // Delete preset
  function deletePreset(i) {
    const updated = presets.filter((_, idx) => idx !== i);
    setPresets(updated);
    localStorage.setItem("pesky-presets", JSON.stringify(updated));
  }

  // Fetch weather
  async function fetchWeather() {
    try {
      const pos = await new Promise((resolve, reject) =>
        navigator.geolocation.getCurrentPosition(resolve, reject)
      );

      const { latitude, longitude } = pos.coords;

      const url =
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}` +
        `&longitude=${longitude}` +
        `&current=temperature_2m,relative_humidity_2m,wind_speed_10m`;

      const res = await fetch(url);
      const data = await res.json();

      setTemp(Math.round(data.current.temperature_2m));
      setHumidity(Math.round(data.current.relative_humidity_2m));
      setWind(Math.round(data.current.wind_speed_10m));
    } catch (err) {
      alert("Unable to access weather data.");
    }
  }

  // ⭐ ORIGINAL PESKY RISK ENGINE — fixed wind direction
  const score = useMemo(() => {
    let s = 0;

    // Temperature effect
    if (temp > 92) s += 30;
    else if (temp > 80) s += 20;
    else if (temp > 70) s += 10;

    // Humidity effect
    if (humidity > 85) s += 35;
    else if (humidity > 70) s += 20;
    else if (humidity > 50) s += 10;

    // WIND FIX — correct direction
    // ✔ Calm = highest bug activity
    // ✔ Light breeze = moderate
    // ✔ Medium = lower
    // ✔ Strong wind = lowest
    if (wind <= 1) s += 30;
    else if (wind <= 4) s += 20;
    else if (wind <= 8) s += 5;
    else if (wind >= 12) s -= 20;

    return Math.min(100, Math.max(0, s));
  }, [temp, humidity, wind]);

  return (
    <div className="p-4 space-y-6 max-w-xl mx-auto">

      {/* HEADER */}
      <div className="pesky-card text-center">
        <h1 className="text-3xl font-bold text-emerald-400">
          PESKY Biting Bug Tracker
        </h1>
        <p className="text-slate-300 text-sm -mt-1">
          Real-time environment-based bite index
        </p>
      </div>

      {/* LOCATION / PRESETS */}
      <div className="pesky-card space-y-3">
        <button
          onClick={fetchWeather}
          className="w-full px-4 py-2 bg-emerald-600 hover:bg-emerald-700 
                     rounded-full text-white shadow"
        >
          Use My Location
        </button>

        <div className="flex gap-3">
          <button
            onClick={savePreset}
            className="flex-1 px-3 py-2 bg-indigo-600 hover:bg-indigo-700 
                       rounded-full text-white shadow"
          >
            Save Preset
          </button>

          <button
            onClick={() => setShowPresets(true)}
            className="flex-1 px-3 py-2 bg-slate-700 hover:bg-slate-600 
                       rounded-full text-white shadow"
          >
            Load Preset
          </button>
        </div>
      </div>

      {/* ⭐ ORIGINAL STYLE GAUGE — FIXED */}
      <div className="pesky-card flex justify-center p-6">
        <AnimatedRiskGauge value={score} />
      </div>

      {/* SLIDERS */}
      <div className="pesky-card space-y-6">
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

      {/* PRESET POPUP */}
      {showPresets && (
        <PresetManager
          presets={presets}
          loadPreset={loadPreset}
          deletePreset={deletePreset}
          close={() => setShowPresets(false)}
        />
      )}
    </div>
  );
}
