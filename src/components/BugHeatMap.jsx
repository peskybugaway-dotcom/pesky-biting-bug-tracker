// src/components/BugHeatMap.jsx
import React from "react";

export default function BugHeatMap({ bug }) {
  const scale = {
    0: "bg-slate-700",
    1: "bg-green-400",
    2: "bg-yellow-400",
    3: "bg-orange-500",
    4: "bg-red-600",
  };

  const zones = bug.activityMap || {
    Florida: 4,
    Texas: 3,
    GulfCoast: 4,
    Midwest: 2,
    Northeast: 1,
    Southwest: 3,
    WestCoast: 1
  };

  return (
    <div className="pesky-card p-5 space-y-3">
      <h3 className="text-lg font-bold text-emerald-300">U.S. Activity Zones</h3>

      <div className="grid grid-cols-2 gap-3 text-white">
        {Object.entries(zones).map(([region, level]) => (
          <div key={region} className="flex items-center gap-3">
            <div className={`w-6 h-6 rounded ${scale[level]}`}></div>
            <span>{region.replace(/([A-Z])/g, " $1")}</span>
          </div>
        ))}
      </div>

      <p className="text-xs text-slate-400 mt-2">
        Higher intensity colors = higher bite probability.
      </p>
    </div>
  );
}
