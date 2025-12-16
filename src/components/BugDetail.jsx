import React from "react";
import { ArrowLeft, AlertTriangle, Bug } from "lucide-react";
import getBugImage from "../utils/getBugImage";
import AnimatedRiskGauge from "./AnimatedRiskGauge";

  <AnimatedRiskGauge value={bug.riskLevel} />
</div>

const riskColors = {
  0: "bg-gray-400",
  1: "bg-green-500",
  2: "bg-yellow-500",
  3: "bg-red-500",
};

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

  const months = Object.keys(seasonalActivity);
  const values = Object.values(seasonalActivity);

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

    {/* ANIMATED RISK GAUGE */}
<div className="mt-6">
  <h3 className="text-white font-semibold mb-2 flex items-center gap-2">
    Bite Severity
  </h3>

  <AnimatedRiskGauge value={bug.riskLevel} />
</div>


        <div className="bg-slate-800 h-3 rounded-full overflow-hidden border border-slate-600">
          <div
            className={`${riskColors[bug.riskLevel]} h-full transition-all`}
            style={{ width: `${(bug.riskLevel / 3) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* SEASONAL ACTIVITY MINI CHART */}
      <div>
        <h3 className="text-white font-semibold mb-2">Seasonal Activity</h3>
        <div className="grid grid-cols-12 gap-1 text-center">
          {months.map((m, i) => (
            <div key={i}>
              <div
                className={`
                  h-6 rounded 
                  ${values[i] === 0 && "bg-slate-700"}
                  ${values[i] === 1 && "bg-green-600"}
                  ${values[i] === 2 && "bg-yellow-500"}
                  ${values[i] === 3 && "bg-orange-500"}
                  ${values[i] === 4 && "bg-red-600"}
                `}
              ></div>
              <span className="text-[10px] text-slate-400">{m}</span>
            </div>
          ))}
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
                onError={(e) =>
                  (e.target.src = "/images/fallback-bite.png")
                }
              />
            ))}
          </div>
        </div>
      )}

      {/* PRODUCTS */}
      {products.length > 0 && (
        <div>
          <h3 className="text-white font-semibold mb-2">Recommended PESKY® Products</h3>
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
