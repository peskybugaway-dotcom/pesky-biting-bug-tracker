import React from "react";
import { ArrowLeft } from "lucide-react";

/* -----------------------------------------------------------
   RISK COLORS
----------------------------------------------------------- */
const riskColors = {
  Severe: "bg-red-600",
  High: "bg-orange-500",
  Moderate: "bg-yellow-400",
  Low: "bg-emerald-500",
};

/* -----------------------------------------------------------
   TIME OF DAY CHART (0 = none, 3 = max activity)
----------------------------------------------------------- */
const defaultActivity = {
  mosquito: [1, 3, 2, 1],       // Dawn, Day, Dusk, Night
  noseeum: [2, 1, 3, 3],
  horsefly: [0, 3, 1, 0],
  fireant: [1, 2, 1, 0],
  bitingfly: [0, 3, 1, 0],
  midge: [1, 1, 3, 2],
  tick: [0, 2, 2, 1],
};

/* -----------------------------------------------------------
   PESKY PRODUCT RECOMMENDATIONS
----------------------------------------------------------- */
const productRecommendations = {
  mosquito: ["PESKY® Bug Away Spray", "PESKY® Area Defense"],
  noseeum: ["PESKY® Bug Away Spray (Heavy Duty)", "PESKY® Area Defense"],
  bitingfly: ["PESKY® Bug Away Spray"],
  midge: ["PESKY® Bug Away Spray"],
  fireant: ["PESKY® Ant Defense", "PESKY® Area Defense"],
  tick: ["PESKY® Bug Away Spray", "PESKY® Area Defense"],
};

/* -----------------------------------------------------------
   MINI MAP REGIONS (shown as highlight)
----------------------------------------------------------- */
const regionMap = {
  mosquito: ["SE", "Gulf", "Midwest"],
  noseeum: ["Florida", "Gulf Coast", "Caribbean"],
  bitingfly: ["Everywhere warm"],
  midge: ["Coastal regions"],
  fireant: ["South", "Southeast"],
  tick: ["North", "Midwest", "East"],
};

/* -----------------------------------------------------------
   DID YOU KNOW FACTS
----------------------------------------------------------- */
const funFacts = {
  mosquito: "Only female mosquitoes bite — males feed on nectar!",
  noseeum: "No-see-ums can pass through standard window screens.",
  bitingfly: "Horseflies can detect movement from over 100ft away.",
  midge: "No-see-ums are related to mosquitoes but much smaller.",
  fireant: "Fire ants form living rafts during floods.",
  tick: "Ticks are not insects — they are arachnids.",
};

export default function BugDetail({ bug, back }) {
  if (!bug) return null;

  // Normalize type for lookup
  const key = bug.type.toLowerCase().includes("mosquito")
    ? "mosquito"
    : bug.type.toLowerCase().includes("midge")
    ? "midge"
    : bug.type.toLowerCase().includes("fly")
    ? "bitingfly"
    : bug.type.toLowerCase().includes("ant")
    ? "fireant"
    : bug.type.toLowerCase().includes("tick")
    ? "tick"
    : "mosquito";

  const chart = defaultActivity[key] || [1, 1, 1, 1];
  const products = productRecommendations[key] || [];
  const regions = regionMap[key] || [];
  const fact = funFacts[key] || "";

  return (
    <div className="p-6 max-w-xl mx-auto space-y-6">

      {/* Back Button */}
      <button
        onClick={back}
        className="flex items-center gap-2 px-4 py-2 bg-slate-700 
                   hover:bg-slate-600 rounded-full text-white transition"
      >
        <ArrowLeft className="w-4 h-4" />
        Back
      </button>

      {/* Main Card */}
      <div className="pesky-card p-6 space-y-6">

        {/* Title + Icon */}
        <div className="flex items-center gap-3">
          <div className="p-2 bg-slate-700/60 rounded-lg">
            {bug.icon || null}
          </div>
          <h2 className="text-3xl font-bold text-emerald-400">{bug.name}</h2>
        </div>

        {/* Image */}
        {bug.image && (
          <img
            src={bug.image}
            alt={bug.name}
            className="w-full rounded-lg shadow-lg border border-slate-700"
          />
        )}

        {/* Danger Badge */}
        <span
          className={`
            inline-block text-xs font-bold px-3 py-1 rounded-full 
            ${riskColors[bug.danger] || "bg-gray-500"} text-black
          `}
        >
          Danger: {bug.danger}
        </span>

        {/* Description */}
        <p className="text-white leading-relaxed">{bug.description}</p>
      </div>

      {/* TIME OF DAY ACTIVITY CHART */}
      <div className="pesky-card p-5">
        <h3 className="text-lg font-bold text-emerald-300 mb-3">
          Activity by Time of Day
        </h3>

        <div className="grid grid-cols-4 gap-4 text-center text-white">
          {["Dawn", "Day", "Dusk", "Night"].map((label, i) => (
            <div key={label}>
              <div
                className="mx-auto w-6 rounded bg-emerald-500"
                style={{ height: `${chart[i] * 20}px` }}
              />
              <p className="text-xs mt-2">{label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* RECOMMENDED PRODUCTS */}
      <div className="pesky-card p-5">
        <h3 className="text-lg font-bold text-emerald-300 mb-3">
          Recommended PESKY® Products
        </h3>

        <ul className="space-y-2 text-white">
          {products.map((p) => (
            <li key={p}>• {p}</li>
          ))}
        </ul>
      </div>

      {/* REGION DISTRIBUTION MAP (simple version) */}
      <div className="pesky-card p-5">
        <h3 className="text-lg font-bold text-emerald-300 mb-3">
          Common Regions
        </h3>

        <p className="text-slate-300 text-sm">
          {regions.join(", ")}
        </p>
      </div>

      {/* FUN FACT */}
      <div className="pesky-card p-5 bg-amber-500/20 border-amber-400/40">
        <h3 className="text-lg font-bold text-amber-300 mb-2">Did You Know?</h3>
        <p className="text-white">{fact}</p>
      </div>
    </div>
  );
}
