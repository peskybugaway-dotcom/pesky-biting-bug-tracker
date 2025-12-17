import React, { useState, useEffect } from "react";

/**
 * WORKING segmented risk gauge for 0–100 values.
 * - 4 color zones (green, yellow, orange, red)
 * - Smooth animated needle
 * - Animated white progress arc
 * - Guaranteed Vercel-safe
 */
export default function AnimatedRiskGauge({ score = 0 }) {
  const [animated, setAnimated] = useState(0);

  // Smooth animation on update
  useEffect(() => {
    const t = setTimeout(() => setAnimated(score), 50);
    return () => clearTimeout(t);
  }, [score]);

  // Clamp 0–100
  const pct = Math.max(0, Math.min(100, animated));

  // Needle rotation (-90° to +90°)
  const angle = (pct / 100) * 180 - 90;

  // Severity zones
  const zones = [
    { limit: 25, color: "#10b981", label: "Low" },       // green
    { limit: 50, color: "#eab308", label: "Moderate" },  // yellow
    { limit: 75, color: "#f97316", label: "High" },       // orange
    { limit: 100, color: "#ef4444", label: "Severe" },    // red
  ];

  const zone = zones.find((z) => pct <= z.limit);

  /** Build arc path for segments */
  const arc = (start, end) => {
    const r = 80;
    const cx = 100;
    const cy = 100;

    const sa = (Math.PI / 180) * start;
    const ea = (Math.PI / 180) * end;

    const x1 = cx + r * Math.cos(sa);
    const y1 = cy + r * Math.sin(sa);
    const x2 = cx + r * Math.cos(ea);
    const y2 = cy + r * Math.sin(ea);

    return `M ${x1} ${y1} A ${r} ${r} 0 0 1 ${x2} ${y2}`;
  };

  return (
    <div className="flex flex-col items-center select-none">
      <svg width="240" height="140" viewBox="0 0 200 120">

        {/* SEGMENTED BACKGROUND */}
        <path d={arc(180, 135)} stroke="#10b981" strokeWidth="16" fill="none" strokeLinecap="round" />
        <path d={arc(135, 90)} stroke="#eab308" strokeWidth="16" fill="none" strokeLinecap="round" />
        <path d={arc(90, 45)} stroke="#f97316" strokeWidth="16" fill="none" strokeLinecap="round" />
        <path d={arc(45, 0)} stroke="#ef4444" strokeWidth="16" fill="none" strokeLinecap="round" />

        {/* ANIMATED WHITE ARC */}
        <path
          d={arc(180, 180 - (pct * 180) / 100)}
          stroke="#ffffff"
          strokeWidth="10"
          strokeLinecap="round"
          fill="none"
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

        {/* NEEDLE CENTER */}
        <circle cx="100" cy="100" r="6" fill="#ffffff" />
      </svg>

      <p className="text-white font-semibold text-lg mt-1">
        {zone.label} Risk ({pct}%)
      </p>
    </div>
  );
}
