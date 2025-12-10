import React from "react";

export default function BugDetail({ bug, back }) {
  if (!bug) return null;

  return (
    <div className="p-6 space-y-4">
      <button
        onClick={back}
        className="px-3 py-1 rounded bg-slate-700 text-white hover:bg-slate-600"
      >
        ← Back
      </button>

      <div className="pesky-card">
        <h2 className="text-2xl font-bold text-emerald-400">{bug.name}</h2>

        <p className="text-sm text-slate-300 mt-2">{bug.description}</p>

        {bug.image && (
          <img
            src={bug.image}
            alt={bug.name}
            className="mt-4 rounded-lg shadow"
          />
        )}

        <div className="mt-4 space-y-1 text-slate-200">
          <p><strong>Peak Season:</strong> {bug.season}</p>
          <p><strong>Risk Level:</strong> {bug.risk}</p>
          <p><strong>Habitat:</strong> {bug.habitat}</p>
          <p><strong>Behavior:</strong> {bug.behavior}</p>
        </div>
      </div>
    </div>
  );
}
