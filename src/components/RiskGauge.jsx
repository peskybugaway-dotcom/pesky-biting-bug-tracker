import React from "react";

export default function RiskGauge({ score = 0 }) {
  // Clamp score between 0–100
  const value = Math.max(0, Math.min(100, score));

  // 0–100 mapped to -90° → +90° (half circle)
  const angle = (value / 100) * 180 - 90;

  // Color of the **label text only**, NOT the arc
  const labelColor =
    value < 25 ? "text-green-400" :
    value < 50 ? "text-yellow-400" :
    value < 75 ? "text-orange-400" :
                 "text-red-500";

  return (
    <div className="w-full flex flex-col items-center space-y-2">

      {/* TITLE */}
      <h3 className="text-white font-semibold text-lg">Current Bite Risk</h3>

      {/* GAUGE */}
      <div className="relative w-48 h-24">

        {/* STATIC BACK ARC (full semicircle) */}
        <svg viewBox="0 0 100 50" className="w-full h-full">
          {/* Background arc */}
          <path
            d="M10 50 A40 40 0 0 1 90 50"
            fill="none"
            stroke="#334155"
            strokeWidth="10"
          />

          {/* Green 0–25 */}
          <path
            d="M10 50 A40 40 0 0 1 32 50"
            fill="none"
            stroke="#22c55e"
            strokeWidth="8"
          />

          {/* Yellow 25–50 */}
          <path
            d="M32 50 A40 40 0 0 1 54 50"
            fill="none"
            stroke="#eab308"
            strokeWidth="8"
          />

          {/* Orange 50–75 */}
          <path
            d="M54 50 A40 40 0 0 1 72 50"
            fill="none"
            stroke="#f97316"
            strokeWidth="8"
          />

          {/* Red 75–100 */}
          <path
            d="M72 50 A40 40 0 0 1 90 50"
            fill="none"
            stroke="#ef4444"
            strokeWidth="8"
          />
        </svg>

        {/* NEEDLE */}
        <div
          className="absolute left-1/2 bottom-0 w-1 h-20 bg-white origin-bottom 
                     transition-all duration-700 ease-out"
          style={{ transform: `rotate(${angle}deg)` }}
        />

        {/* CENTER CAP */}
        <div
          className="absolute left-1/2 bottom-0 -ml-2 -mb-1 w-4 h-4 rounded-full 
                     bg-white border border-slate-600"
        />
      </div>

      {/* SCORE LABEL */}
      <div className={`text-xl font-bold ${labelColor}`}>
        {value}% Risk
      </div>

      <p className="text-slate-400 text-sm">Based on weather factors</p>
    </div>
  );
}
