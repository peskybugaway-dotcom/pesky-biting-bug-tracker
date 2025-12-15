import React from "react";

const BUGS = [
  { name: "Mosquito", type: "Flying", danger: "High", description: "Active at dusk and dawn." },
  { name: "No-See-Um", type: "Flying", danger: "Severe", description: "Very active in low wind & humidity." },
  { name: "Horsefly", type: "Biting Fly", danger: "Moderate", description: "Aggressive in sunny warm weather." },
  { name: "Fire Ant", type: "Ground", danger: "High", description: "Painful sting near disturbed mounds." }
];

export default function BugEncyclopedia({ onSelectBug }) {
  return (
    <div className="p-6 max-w-xl mx-auto space-y-6">
      <h2 className="text-2xl text-emerald-400 font-bold">Bug Encyclopedia</h2>

      {BUGS.map((b) => (
        <div
          key={b.name}
          onClick={() => onSelectBug(b)}
          className="pesky-card p-4 cursor-pointer hover:bg-slate-700/50 transition"
        >
          <h3 className="text-lg text-white font-semibold">{b.name}</h3>
          <p className="text-slate-300 text-sm">{b.description}</p>
        </div>
      ))}
    </div>
  );
}
