import React, { useEffect, useState } from "react";

export default function AnimatedRiskGauge({ value = 0 }) {
  // Animated progress value
  const [progress, setProgress] = useState(0);

  // Animate after mount/update
  useEffect(() => {
    const t = setTimeout(() => setProgress(value), 100);
    return () => clearTimeout(t);
  }, [value]);

  // Clamp 0–100
  const pct = Math.max(0, Math.min(100, progress));

  // Convert 0–100 → -90° to +90°
  const angle = (pct / 100) * 180 - 90;

  // Severity bands
  const severityIndex = Math.min(3, Math.floor((pct / 100) * 4));
  const severityLabels = ["Low", "Moderate", "High", "Severe"];
  const severityColors = ["#10b981", "#fbbf24", "#f97316", "#ef4444"];
  const severity = severityLabels[severityIndex];
  const color = severityColors[severityIndex];

  // Segment path helper (center: 100,100 radius: 80)
  function arc(startAngle, endAngle) {
    const r = 80;
    const cx = 100;
    const cy = 100;

    const start = {
      x: cx + r * Math.cos((Math.PI / 180) * startAngle),
      y: cy + r * Math.sin((Math.PI / 180) * startAngle),
    };
    const end = {
      x: cx + r * Math.cos((Math.PI / 180) * endAngle),
      y: cy + r * Math.sin((Math.PI / 180) * endAngle),
    };

    return `M ${start.x} ${start.y} A ${r} ${r} 0 0 1 ${end.x} ${end.y}`;
  }

  return (
    <div className="flex flex-col items-center">
      <svg width="220" height="130" viewBox="0 0 220 130">

        {/* BACKGROUND COLOR SEGMENTS */}
        {/* Green 0–25% */}
        <path
          d={arc(180, 135)}
          stroke="#10b981"
          strokeWidth="16"
          fill="none"
          strokeLinecap="round"
        />

        {/* Yellow 25–50% */}
        <path
          d={arc(135, 90)}
          stroke="#eab308"
          strokeWidth="16"
          fill="none"
          strokeLinecap="round"
        />

        {/* Orange 50–75% */}
        <path
          d={arc(90, 45)}
          stroke="#f97316"
          strokeWidth="16"
          fill="none"
          strokeLinecap="round"
        />

        {/* Red 75–100% */}
        <path
          d={arc(45, 0)}
          stroke="#ef4444"
          strokeWidth="16"
          fill="none"
          strokeLinecap="round"
        />

        {/* PROGRESS ARC (white overlay) */}
        <path
          d={arc(180, 180 - (pct * 180) / 100)}
          stroke="#ffffff"
          strokeWidth="10"
          fill="none"
          strokeLinecap="round"
          style={{
            transition: "1s ease",
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
          {severity}
        </span>{" "}
        ({pct}%)
      </p>
    </div>
  );
}
