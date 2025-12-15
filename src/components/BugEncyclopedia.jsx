import React from "react";
import { Bug, AlertTriangle, Skull } from "lucide-react";

const BUGS = [
  {
    name: "Mosquito",
    type: "Flying",
    danger: "High",
    icon: <AlertTriangle className="w-6 h-6 text-orange-400" />,
    description: "Active at dusk and dawn. Loves humidity and still air."
  },
  {
    name: "No-See-Um",
    type: "Flying",
    danger: "Severe",
    icon: <Skull className="w-6 h-6 text-red-500" />,
    description: "Extremely aggressive in low wind & high moisture."
  },
  {
    name: "Horsefly",
    type: "Biting Fly",
    danger: "Moderate",
    icon: <AlertTriangle className="w-6 h-6 text-yellow-400" />,
    description: "Painful bite. Active in warm sunny conditions."
  },
  {
    name: "Fire Ant",
    type: "Ground",
    danger: "High",
    icon: <Bug className="w-6 h-6 text-red-400" />,
    description: "Aggressive stinging ant. Disturbing mounds increases attacks."
  }
];

export default function BugEncyclopedia({ onSelectBug }) {
  return (
    <div className="p-6 max-w-xl mx-auto space-y-6">
      
      <h2 className="text-2xl text-emerald-400 font-bold">
        Bug Encyclopedia
      </h2>

      <div className="grid grid-cols-1 gap-4">
        {BUGS.map((b) => (
          <div
            key={b.name}
            onClick={() => onSelectBug(b)}
            className="pesky-card p-4 flex items-start gap-4 cursor-pointer 
                       hover:bg-slate-700/60 transition"
          >
            <div className="p-2 bg-slate-700/60 rounded-lg">
              {b.icon}
            </div>

            <div className="flex-1">
              <h3 className="text-lg text-white font-semibold">{b.name}</h3>
              <p className="text-slate-300 text-sm">{b.description}</p>
            </div>

            <span className={`text-xs font-bold px-2 py-1 rounded 
              ${b.danger === "Severe" ? "bg-red-600 text-white" : ""}
              ${b.danger === "High" ? "bg-orange-500 text-white" : ""}
              ${b.danger === "Moderate" ? "bg-yellow-500 text-black" : ""}
            `}>
              {b.danger}
            </span>
          </div>
        ))}
      </div>

    </div>
  );
}
