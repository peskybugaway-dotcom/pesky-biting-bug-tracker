import React, { useEffect, useState } from "react";

export default function AnimatedRiskGauge({ value = 0 }) {
  const [fill, setFill] = useState(0);

  // Animate gauge fill
  useEffect(() => {
    const timer = setTimeout(() => {
      setFill(value);
    }, 150);
    return () => clearTimeout(timer);
  }, [value]);

  const percent = (fill / 3) * 100;

  // Color based on severity
  const color =
    fill === 0
      ? "#6b7280" // gray
      : fill === 1
      ? "#10b981" // green
      : fill === 2
      ? "#fbbf24" // yellow
      : "#ef4444"; // red

  return (
    <div className="flex flex-col items-center">
      <svg
        width="180"
        height="100"
        viewBox="0 0 180 100"
        className="overflow-visible"
      >
        {/* Background arc */}
        <path
          d="M10 100 A80 80 0 0 1 170 100"
          stroke="#1f2937"
          strokeWidth="18"
          fill="none"
          strokeLinecap="round"
        />

        {/* Animated colored arc */}
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
          style={{
            transition: "1s ease",
          }}
        />

        {/* Center */}
        <circle cx="90" cy="100" r="6" fill="#fff" />
      </svg>

      <p className="text-slate-300 text-sm mt-1">
        Severity:{" "}
        <span className="font-semibold" style={{ color }}>
          {["None", "Low", "Moderate", "High", "Severe"][value]}
        </span>
      </p>
    </div>
  );
}
