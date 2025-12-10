import React, { useState } from "react";
import { Map } from "lucide-react";

export default function MapView() {
  const MONTHS = [
    "January","February","March","April","May","June",
    "July","August","September","October","November","December"
  ];

  const REGION_MONTHLY = {
    January:{ West:"low", Midwest:"low", SouthEast:"low", Northeast:"low", Texas:"low", Florida:"low" },
    February:{ West:"low", Midwest:"low", SouthEast:"low", Northeast:"low", Texas:"low", Florida:"low" },
    March:{ West:"low", Midwest:"low", SouthEast:"moderate", Northeast:"low", Texas:"low", Florida:"moderate" },
    April:{ West:"moderate", Midwest:"low", SouthEast:"high", Northeast:"low", Texas:"moderate", Florida:"high" },
    May:{ West:"moderate", Midwest:"moderate", SouthEast:"severe", Northeast:"moderate", Texas:"moderate", Florida:"severe" },
    June:{ West:"moderate", Midwest:"high", SouthEast:"severe", Northeast:"high", Texas:"severe", Florida:"severe" },
    July:{ West:"high", Midwest:"severe", SouthEast:"severe", Northeast:"high", Texas:"severe", Florida:"severe" },
    August:{ West:"moderate", Midwest:"high", SouthEast:"severe", Northeast:"moderate", Texas:"high", Florida:"severe" },
    September:{ West:"moderate", Midwest:"moderate", SouthEast:"high", Northeast:"moderate", Texas:"moderate", Florida:"high" },
    October:{ West:"low", Midwest:"moderate", SouthEast:"moderate", Northeast:"moderate", Texas:"moderate", Florida:"moderate" },
    November:{ West:"low", Midwest:"low", SouthEast:"low", Northeast:"low", Texas:"low", Florida:"low" },
    December:{ West:"low", Midwest:"low", SouthEast:"low", Northeast:"low", Texas:"low", Florida:"low" },
  };

  const COLORS = {
    low: "fill-emerald-600",
    moderate: "fill-yellow-500",
    high: "fill-orange-500",
    severe: "fill-red-600",
  };

  const [month, setMonth] = useState("July");
  const regions = {
    West: "M20 20 L80 20 L80 80 L20 80 Z",
    Midwest: "M85 20 L145 20 L145 80 L85 80 Z",
    SouthEast: "M150 80 L210 80 L210 140 L150 140 Z",
    Northeast: "M150 20 L210 20 L210 60 L150 60 Z",
    Texas: "M85 80 L145 80 L145 140 L85 140 Z",
    Florida: "M215 100 L250 100 L250 140 L215 140 Z",
  };

  const data = REGION_MONTHLY[month];

  return (
    <div className="space-y-6 p-4 max-w-xl mx-auto">
      
      {/* TITLE */}
      <div className="pesky-card p-4">
        <h2 className="pesky-title flex gap-2 items-center">
          <Map className="w-6 h-6" /> Monthly Biting Bug Hotspots
        </h2>
      </div>

      {/* MONTH BUTTONS */}
      <div className="pesky-card p-4 flex flex-wrap gap-2">
        {MONTHS.map((m) => (
          <button
            key={m}
            onClick={() => setMonth(m)}
            className={`px-3 py-1 rounded-full text-sm font-semibold transition ${
              month === m
                ? "bg-indigo-600 text-white"
                : "bg-slate-700 text-slate-300 hover:bg-slate-600"
            }`}
          >
            {m}
          </button>
        ))}
      </div>

      {/* MAP */}
      <div className="pesky-card p-4 flex justify-center">
        <svg viewBox="0 0 260 160" className="w-full max-w-xl">
          <text x="130" y="12" textAnchor="middle" fill="#94a3b8" fontSize="10">
            U.S. Bug Activity Map (Illustrative)
          </text>

          {Object.entries(regions).map(([name, d]) => {
            const risk = data[name];
            const color = COLORS[risk];

            return (
              <g key={name}>
                <path
                  d={d}
                  className={`${color} opacity-80 stroke-slate-800`}
                  strokeWidth="2"
                />
              </g>
            );
          })}
        </svg>
      </div>

      {/* LEGEND */}
      <div className="pesky-card p-4 flex justify-around text-sm text-slate-300">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-red-600"></div> Severe
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-orange-500"></div> High
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-yellow-500"></div> Moderate
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-emerald-600"></div> Low
        </div>
      </div>
    </div>
  );
}
