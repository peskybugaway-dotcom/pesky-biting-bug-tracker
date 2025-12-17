import React, { useState } from "react";
import { ArrowLeft } from "lucide-react";
import getBugImage from "../utils/getBugImage";
import AnimatedRiskGauge from "./AnimatedRiskGauge";
import SeasonalRiskGauge from "./SeasonalRiskGauge"; // ✅ NEW interactive gauge

export default function BugDetail({ bug, back }) {
  if (!bug) return null;

  const {
    name,
    description,
    facts = [],
    products = [],
    bitePhotos = [],
    seasonalActivity = {},
  } = bug;

  // ⭐ Interactive seasonal month state
  const [activeMonth, setActiveMonth] = useState("Jan");

  // ⭐ Convert bug.riskLevel (0–3) → gauge score (0–100)
  const gaugeScore = Math.round((bug.riskLevel / 3) * 100);

  const months = Object.keys(seasonalActivity);

  return (
    <div className="p-6 pb-24 space-y-6 max-w-xl mx-auto">

      {/* BACK BUTTON */}
      <button
        onClick={back}
        className="flex items-center gap-2 text-emerald-400 hover:text-emerald-300 transition"
      >
        <ArrowLeft className="w-5 h-5" />
        <span className="font-medium">Back to Bug List</span>
      </button>

      {/* HERO IMAGE */}
      <img
        src={getBugImage(bug)}
        alt={name}
        className="w-full h-56 object-cover rounded-xl border border-slate-700 shadow-lg"
        onError={(e) => (e.target.src = "/images/fallback-bug.png")}
      />

      {/* TITLE */}
      <h1 className="text-2xl font-bold text-white">{name}</h1>
      <p className="text-slate-300">{description}</p>

      {/* BITE SEVERITY GAUGE */}
      <div className="mt-6">
        <h3 className="text-white font-semibold mb-2">Bite Severity</h3>
        <AnimatedRiskGauge score={gaugeScore} />
      </div>

      {/* ⭐ NEW INTERACTIVE SEASONAL ACTIVITY ⭐ */}
      <div className="mt-8">
        <h3 className="text-white font-semibold mb-3">Seasonal Activity</h3>

        {/* Month selector */}
        <div className="grid grid-cols-6 gap-2 mb-4">
          {months.map((m) => (
            <button
              key={m}
              onClick={() => setActiveMonth(m)}
              className={`
                px-2 py-1 rounded text-xs transition
                ${activeMonth === m 
                  ? "bg-emerald-600 text-white" 
                  : "bg-slate-700 text-slate-300"}
              `}
            >
              {m}
            </button>
          ))}
        </div>

        {/* Interactive gauge changes when month is tapped */}
        <div className="flex justify-center">
          <SeasonalRiskGauge level={seasonalActivity[activeMonth]} />
        </div>
      </div>

      {/* FACTS */}
      {facts.length > 0 && (
        <div>
          <h3 className="text-white font-semibold mb-2">Did You Know?</h3>
          <ul className="list-disc list-inside space-y-1 text-slate-300">
            {facts.map((fact, i) => (
              <li key={i}>{fact}</li>
            ))}
          </ul>
        </div>
      )}

      {/* BITE PHOTOS */}
      {bitePhotos.length > 0 && (
        <div>
          <h3 className="text-white font-semibold mb-2">Bite Examples</h3>
          <div className="flex gap-3 overflow-x-auto pb-2">
            {bitePhotos.map((src, i) => (
              <img
                key={i}
                src={src}
                alt="bite example"
                className="h-24 w-24 object-cover rounded-lg border border-slate-700 shadow-md"
                onError={(e) => (e.target.src = "/images/fallback-bite.png")}
              />
            ))}
          </div>
        </div>
      )}

      {/* PRODUCTS */}
      {products.length > 0 && (
        <div>
          <h3 className="text-white font-semibold mb-2">
            Recommended PESKY® Products
          </h3>
          <div className="flex flex-wrap gap-2">
            {products.map((p, i) => (
              <span
                key={i}
                className="px-3 py-1 bg-emerald-600/20 text-emerald-300 border border-emerald-500 rounded-full text-sm"
              >
                {p}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
