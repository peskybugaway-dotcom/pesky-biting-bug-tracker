import React, { useEffect, useState } from "react";

export default function AnimatedRiskGauge({ value, score }) {
  // Accept either `score` (dashboard) OR `value` (bug detail)
  const input = score !== undefined ? score : value !== undefined ? value : 0;

  const [fill, setFill] = useState(0);

  // Allow input from 0–100 (dashboard) or 0–3 (bug detail)
  const normalized =
    input <= 3 ? Math.round((input / 3) * 100) : Math.max(0, Math.min(100, input));

  useEffect(() => {
    const t = setTimeout(() => setFill(normalized), 150);
    return () => clearTimeout(t);
  }, [normalized]);

  // Arc fill percent
  const percent = fill;

  // Color scale
  const color =
    percent < 25 ? "#10b981" :        // green
    percent < 50 ? "#fbbf24" :        // yellow
    percent < 75 ? "#f97316" :        // orange
                   "#ef4444";         // red

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

        {/* Animated value arc */}
        <path
          d="M10 100 A80 80 0 0 1 170 100"
          stroke={color}
          strokeWidth="18"
          fill="none"
          strokeLinecap="round"
          style={{
            strokeDasharray: "250",
            strokeDashoffset: 250 - (250 * percent) / 100,
            transition: "stroke-dashoffset 1s ease, stroke 0.3s ease",
          }}
        />

        {/* Needle */}
        <line
          x1="90"
          y1="100"
          x2={90 + 70 * Math.cos(Math.PI * (1 - percent / 100))}
          y2={100 - 70 * Math.sin(Math.PI * (1 - percent / 100))}
          stroke="#fff"
          strokeWidth="4"
          strokeLinecap="round"
          style={{ transition: "1s ease" }}
        />

        {/* Center cap */}
        <circle cx="90" cy="100" r="6" fill="#fff" />
      </svg>

      {/* Label */}
      <p className="text-slate-300 text-sm mt-1">
        Severity:{" "}
        <span className="font-semibold" style={{ color }}>
          {percent < 25
            ? "Low"
            : percent < 50
            ? "Moderate"
            : percent < 75
            ? "High"
            : "Severe"}
        </span>
      </p>
    </div>
  );
}
