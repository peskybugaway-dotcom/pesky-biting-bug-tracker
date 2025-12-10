import React from "react";

export default function BugDetail({ bug, back }) {
  if (!bug) return null;

  return (
    <div className="p-6 space-y-4 max-w-xl mx-auto">
      <button
        onClick={back}
        className="px-3 py-1 bg-slate-700 text-white rounded-full"
      >
        ← Back
      </button>

      <div className="pesky-card p-6 space-y-3">
        <h2 className="text-3xl font-bold text-emerald-400">
          {bug.name}
        </h2>

        <p className="text-slate-300 text-sm">
          Type: <span className="text-white">{bug.type}</span>
        </p>

        <p className="text-slate-300 text-sm">
          Danger Level:
          <span className="text-red-400 font-semibold"> {bug.danger}</span>
        </p>

        <p className="text-white text-md leading-relaxed">
          {bug.description}
        </p>
      </div>
    </div>
  );
}
