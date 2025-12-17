import React, { useEffect, useState } from "react";

export default function AnimatedRiskGauge({ value, score }) {
  // Accept BOTH props for compatibility
  const raw = score ?? value ?? 0;

  // Always convert 0–100 safely
  const safeValue = Math.max(0, Math.min(100, raw));

  const [fill, setFill] = useState(0);

  // Animate needle
  useEffect(() => {
    const t = setTimeout(() => setFill(safeValue), 120);
    return () => clearTimeout(t);
  }, [safeValue]);

  // Angle: -90° → +90° semicircle
  const angle = (fill / 100) * 180 - 90;

  // Colors
  const zoneColor =
    fill < 25 ? "#10b981" :     // green
    fill < 50 ? "#eab308" :     // yellow
    fill < 75 ? "#f97316" :     // orange
               "#ef4444";       // red

  return (
    <div className="flex flex-col items-center">
      <svg width="180" height="100" viewBox="0 0 180 100">
        {/* Background arc */}
        <path
          d="M10 100 A80 80 0 0 1 170 100"
          stroke="#1f2937"
          strokeWidth="18"
          fill="none"
          strokeLinecap="round"
        />

        {/* Colored segments */}
        <path d="M10 100 A80 80 0 0 1 55 100" stroke="#10b981" strokeWidth="12" fill="none" />
        <path d="M55 100 A80 80 0 0 1 100 100" stroke="#eab308" strokeWidth="12" fill="none" />
        <path d="M100 100 A80 80 0 0 1 145 100" stroke="#f97316" strokeWidth="12" fill="none" />
        <path d="M145 100 A80 80 0 0 1 170 100" stroke="#ef4444" strokeWidth="12" fill="none" />

        {/* Needle */}
        <line
          x1="90"
          y1="100"
          x2={90 + 70 * Math.cos((angle * Math.PI) / 180)}
          y2={100 - 70 * Math.sin((angle * Math.PI) / 180)}
          stroke="#ffffff"
          strokeWidth="4"
          strokeLinecap="round"
          style={{ transition: "transform 0.7s ease", transformOrigin: "center" }}
        />

        {/* Center cap */}
        <circle cx="90" cy="100" r="6" fill="#ffffff" />
      </svg>

      <p className="text-slate-300 text-sm mt-1">
        Risk Level: <span style={{ color: zoneColor }}>{Math.round(fill)}%</span>
      </p>
    </div>
  );
}
