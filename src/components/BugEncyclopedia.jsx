import React from "react";

const BUGS = [
  {
    name: "Mosquito",
    type: "Flying",
    danger: "High",
    description: "Peak activity at dusk & dawn. Loves humidity.",
  },
  {
    name: "No-See-Um",
    type: "Flying",
    danger: "Severe",
    description: "Extremely aggressive in low wind & high moisture.",
  },
  {
    name: "Horsefly",
    type: "Biting Fly",
    danger: "Moderate",
    description: "Warm sunny conditions increase attacks.",
  },
  {
    name: "Fire Ant",
    type: "Ground",
    danger: "High",
    description: "Aggressive—painful sting and mound-based behavior.",
  }
];

export default function BugEncyclopedia({ onSelectBug }) {
  return (
    <div className="p-6 space-y-6 max-w-xl mx-auto">

      <h2 className="text-2xl font-bold text-emerald-400">Bug Encyclopedia</h2>

      <div className="grid grid-cols-1 gap-4">
        {BUGS.map((b) => (
          <div
            key={b.name}
            onClick={() => onSelectBug(b)}
            className="pesky-card p-4 hover:bg-slate-700/60 cursor-pointer transition"
          >
            <h3 className="text-lg font-semibold text-white">{b.name}</h3>
            <p className="text-sm text-slate-300">{b.description}</p>
          </div>
        ))}
      </div>

    </div>
  );
}
