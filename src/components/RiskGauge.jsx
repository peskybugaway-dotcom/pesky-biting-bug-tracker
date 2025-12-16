import React from "react";

export default function RiskGauge({ level }) {
  const colors = ["#22c55e", "#facc15", "#f97316", "#ef4444"];
  const labels = ["Low", "Moderate", "High", "Severe"];

  const percent = (level / 3) * 100;

  return (
    <div className="w-full bg-slate-800 rounded-lg p-4 shadow-lg border border-slate-700">
      <p className="text-slate-300 text-sm mb-2 font-medium">Risk Level</p>

      <div className="relative w-full h-3 bg-slate-700 rounded-full overflow-hidden">
        <div
          className="absolute top-0 left-0 h-full transition-all duration-700"
          style={{
            width: `${percent}%`,
            backgroundColor: colors[level - 1],
          }}
        ></div>
      </div>

      <p className="text-center mt-2 text-lg font-bold"
        style={{ color: colors[level - 1] }}
      >
        {labels[level - 1]}
      </p>
    </div>
  );
}
