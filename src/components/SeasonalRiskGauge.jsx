import React from "react";

export default function SeasonalRiskGauge({ level = 0 }) {
  const percent = (level / 4) * 100;

  const colors = [
    "#6b7280", // 0 - none
    "#10b981", // 1 - low (green)
    "#fbbf24", // 2 - moderate (yellow)
    "#f97316", // 3 - high (orange)
    "#ef4444", // 4 - severe (red)
  ];

  return (
    <div className="flex flex-col items-center">
      <svg width="180" height="100" viewBox="0 0 180 100">
        {/* Background arc */}
        <path
          d="M10 100 A80 80 0 0 1 170 100"
          stroke="#1f2937"
          strokeWidth="14"
          fill="none"
          strokeLinecap="round"
        />

        {/* Foreground animated arc */}
        <path
          d="M10 100 A80 80 0 0 1 170 100"
          stroke={colors[level]}
          strokeWidth="14"
          fill="none"
          strokeLinecap="round"
          style={{
            strokeDasharray: "250",
            strokeDashoffset: 250 - (250 * percent) / 100,
            transition: "stroke-dashoffset 0.8s ease, stroke 0.3s ease",
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
          style={{ transition: "0.8s ease" }}
        />

        <circle cx="90" cy="100" r="6" fill="#fff" />
      </svg>

      <p className="text-slate-300 text-xs mt-1">
        Severity: <span style={{ color: colors[level] }}>{level}</span>
      </p>
    </div>
  );
}
