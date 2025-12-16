import React from "react";

export default function RiskGauge({ score }) {
  const color =
    score > 80 ? "red" : score > 60 ? "orange" : score > 30 ? "yellow" : "green";

  return (
    <div className="text-center">
      <div className="text-4xl font-bold text-emerald-300">{score}/100</div>
      <div className={`text-${color}-400 text-lg font-semibold`}>
        {color.toUpperCase()} RISK
      </div>
    </div>
  );
}
