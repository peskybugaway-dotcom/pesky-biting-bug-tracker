import React, { useState, useMemo } from "react";
import RiskGauge from "./RiskGauge";
import PresetManager from "./PresetManager";

export default function Dashboard() {
  const [temp, setTemp] = useState(82);
  const [humidity, setHumidity] = useState(70);
  const [wind, setWind] = useState(3);

  // Presets stored locally
const [presets, setPresets] = useState(
  JSON.parse(localStorage.getItem("pesky-presets") || "[]")
);

const [showPresets, setShowPresets] = useState(false);

// Save a preset
function savePreset() {
  const name = prompt("Enter name for this location:");
  if (!name) return;

  const newPreset = { name, temp, humidity, wind };
  const updated = [...presets, newPreset];

  setPresets(updated);
  localStorage.setItem("pesky-presets", JSON.stringify(updated));
}

// Load preset
function loadPreset(index) {
  const p = presets[index];
  setTemp(p.temp);
  setHumidity(p.humidity);
  setWind(p.wind);
  setShowPresets(false);
}

// Delete preset
function deletePreset(index) {
  const updated = presets.filter((_, i) => i !== index);
  setPresets(updated);
  localStorage.setItem("pesky-presets", JSON.stringify(updated));
}

  // 🌍 Fetch weather for user's location
async function fetchWeather(setTemp, setHumidity, setWind) {
  try {
    const position = await new Promise((resolve, reject) =>
      navigator.geolocation.getCurrentPosition(resolve, reject)
    );

    const { latitude, longitude } = position.coords;

    const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,wind_speed_10m`;

    const res = await fetch(url);
    const data = await res.json();

    setTemp(Math.round(data.current.temperature_2m));
    setHumidity(Math.round(data.current.relative_humidity_2m));
    setWind(Math.round(data.current.wind_speed_10m));
  } catch (err) {
    console.error("Weather fetch failed:", err);
    alert("Could not access weather or location.");
  }
}

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
    <button
      onClick={() => fetchWeather(setTemp, setHumidity, setWind)}
      className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 rounded-full text-white shadow-lg"
    >
      Use My Location
    </button>
<div className="flex gap-3">
  <button
    onClick={savePreset}
    className="px-3 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-full text-white shadow"
  >
    Save Preset
  </button>

  <button
    onClick={() => setShowPresets(true)}
    className="px-3 py-2 bg-slate-700 hover:bg-slate-600 rounded-full text-white shadow"
  >
    Load Preset
  </button>
</div>

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

