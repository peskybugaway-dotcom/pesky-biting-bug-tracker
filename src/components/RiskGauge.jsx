import React from "react";

export default function RiskGauge({ score = 0 }) {
  // Clamp score between 0–100
  const value = Math.max(0, Math.min(100, score));

  // Convert 0–100 → -90° to +90° needle rotation
  const angle = (value / 100) * 180 - 90;

  // Gauge color based on value
  const getColor = () => {
    if (value < 25) return "text-green-400";
    if (value < 50) return "text-yellow-400";
    if (value < 75) return "text-orange-400";
    return "text-red-500";
  };

  return (
    <div className="w-full flex flex-col items-center space-y-2">

      {/* TITLE */}
      <h3 className="text-white font-semibold text-lg tracking-wide">
        Current Bite Risk
      </h3>

      {/* GAUGE CONTAINER */}
      <div className="relative w-48 h-24">
        {/* Background Arc */}
        <svg viewBox="0 0 100 50" className="w-full h-full">
          <path
            d="M10 50 A40 40 0 0 1 90 50"
            fill="none"
            stroke="#334155"
            strokeWidth="10"
          />

          {/* Colored segments */}
          <path
            d="M10 50 A40 40 0 0 1 35 50"
            fill="none"
            stroke="#22c55e"
            strokeWidth="8"
          />
          <path
            d="M35 50 A40 40 0 0 1 60 50"
            fill="none"
            stroke="#eab308"
            strokeWidth="8"
          />
          <path
            d="M60 50 A40 40 0 0 1 90 50"
            fill="none"
            stroke="#f97316"
            strokeWidth="8"
          />
        </svg>

        {/* NEEDLE */}
        <div
          className="absolute left-1/2 bottom-0 w-1 h-20 bg-white origin-bottom transition-all duration-700 ease-out"
          style={{ transform: `rotate(${angle}deg)` }}
        ></div>

        {/* CENTER CAP */}
        <div className="absolute left-1/2 bottom-0 -ml-2 -mb-1 w-4 h-4 bg-white rounded-full border border-slate-600"></div>
      </div>

      {/* SCORE LABEL */}
      <div className={`text-xl font-bold ${getColor()}`}>
        {value}% Risk
      </div>

      {/* Description */}
      <p className="text-slate-400 text-sm text-center -mt-1">
        Based on temperature, humidity, and wind conditions
      </p>
    </div>
  );
}
