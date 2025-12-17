import React, { useEffect, useState } from "react";

export default function AnimatedRiskGauge({ value = 0 }) {
  const [display, setDisplay] = useState(0);

  // Normalize 0–100 → 0–3 scale for severity color + label
  const severity = Math.min(3, Math.max(0, Math.floor((value / 100) * 3)));

  // Animate the gauge fill
  useEffect(() => {
    const timer = setTimeout(() => {
      setDisplay(value);
    }, 100);
    return () => clearTimeout(timer);
  }, [value]);

  // Convert percent to stroke amount
  const percent = Math.min(100, Math.max(0, display));
  const strokeLength = 250;
  const offset = strokeLength - (strokeLength * percent) / 100;

  // Needle angle, 0–100 mapped to -90° → +90°
  const angle = (percent / 100) * 180 - 90;

  // Severity color
  const colors = ["#10b981", "#fbbf24", "#f97316", "#ef4444"];
  const color = colors[severity];

  const labels = ["Low", "Moderate", "High", "Severe"];

  return (
    <div className="flex flex-col items-center">
      <svg width="200" height="120" viewBox="0 0 200 120">

        {/* BACK ARC */}
        <path
          d="M20 100 A80 80 0 0 1 180 100"
          stroke="#1f2937"
          strokeWidth="18"
          fill="none"
          strokeLinecap="round"
        />

        {/* PROGRESS ARC */}
        <path
          d="M20 100 A80 80 0 0 1 180 100"
          stroke={color}
          strokeWidth="18"
          fill="none"
          strokeLinecap="round"
          style={{
            strokeDasharray: strokeLength,
            strokeDashoffset: offset,
            transition: "stroke-dashoffset 1s ease, stroke 0.3s ease",
          }}
        />

        {/* NEEDLE */}
        <line
          x1="100"
          y1="100"
          x2={100 + 70 * Math.cos((Math.PI / 180) * angle)}
          y2={100 + 70 * Math.sin((Math.PI / 180) * angle)}
          stroke="#ffffff"
          strokeWidth="4"
          strokeLinecap="round"
          style={{ transition: "1s ease" }}
        />

        {/* CENTER CAP */}
        <circle cx="100" cy="100" r="6" fill="#ffffff" />
      </svg>

      {/* LABEL */}
      <p className="text-slate-300 text-sm mt-1">
        Risk:{" "}
        <span className="font-bold" style={{ color }}>
          {labels[severity]}
        </span>{" "}
        ({percent}%)
      </p>
    </div>
  );
}
