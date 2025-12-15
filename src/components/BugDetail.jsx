import React from "react";

export default function BugDetail({ bug, back }) {
  if (!bug) return null;

  const riskColors = ["green", "yellow", "orange", "red"];

  return (
    <div className="p-6 max-w-xl mx-auto space-y-6">
      <button
        onClick={back}
        className="px-3 py-1 bg-slate-700 rounded-full text-white"
      >
        ← Back
      </button>

      {/* IMAGE HEADER */}
      <img
        src={bug.image}
        alt={bug.name}
        className="w-full h-52 object-cover rounded-xl border border-slate-700"
      />

      {/* TITLE */}
      <h1 className="text-3xl text-emerald-400 font-bold">{bug.name}</h1>

      {/* DESCRIPTION */}
      <p className="text-slate-300 leading-relaxed">{bug.description}</p>

      {/* RISK LEVEL */}
      <div className="space-y-2">
        <h3 className="text-white font-semibold">Risk Level</h3>
        <div
          className={`h-3 rounded-full bg-${riskColors[bug.riskLevel]}-500`}
        ></div>
      </div>

      {/* FACTS */}
      {bug.facts && (
        <div>
          <h3 className="text-white font-semibold mb-2">Did You Know?</h3>
          <ul className="list-disc pl-6 text-slate-300 space-y-1">
            {bug.facts.map((f, i) => (
              <li key={i}>{f}</li>
            ))}
          </ul>
        </div>
      )}

      {/* PRODUCTS */}
      {bug.products && (
        <div>
          <h3 className="text-white font-semibold mb-2">
            Recommended PESKY® Products
          </h3>
          <ul className="pl-4 text-emerald-300 space-y-1">
            {bug.products.map((p, i) => (
              <li key={i}>• {p}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
