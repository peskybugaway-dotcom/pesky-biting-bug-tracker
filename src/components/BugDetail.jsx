import React from "react";
import RiskGauge from "./RiskGauge";

export default function BugDetail({ bug, back }) {
  if (!bug) return null;

  return (
    <div className="p-6 max-w-xl mx-auto space-y-6">

      {/* BACK BUTTON */}
      <button
        onClick={back}
        className="px-4 py-2 bg-slate-800 text-white rounded-lg hover:bg-slate-700 transition"
      >
        ← Back to Bugs
      </button>

      {/* TITLE */}
      <h2 className="text-2xl font-bold text-emerald-400">{bug.name}</h2>

      {/* IMAGE */}
      {bug.image && (
        <img
          src={bug.image}
          alt={bug.name}
          className="w-full rounded-xl shadow-lg"
        />
      )}

      {/* DESCRIPTION */}
      <p className="text-slate-300">{bug.description}</p>

      {/* ⭐⭐⭐ RISK GAUGE (THIS MUST SHOW UP) */}
      <div className="mt-4">
        <RiskGauge level={bug.riskLevel ?? 0} />
      </div>

      {/* FACTS */}
      {bug.facts?.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-white mb-2">Did You Know?</h3>
          <ul className="list-disc list-inside text-slate-300 space-y-1">
            {bug.facts.map((f, i) => (
              <li key={i}>{f}</li>
            ))}
          </ul>
        </div>
      )}

      {/* PRODUCTS */}
      {bug.products?.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-emerald-400 mb-2">
            Recommended PESKY® Products
          </h3>
          <ul className="list-disc list-inside text-slate-300 space-y-1">
            {bug.products.map((p, i) => (
              <li key={i}>{p}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
