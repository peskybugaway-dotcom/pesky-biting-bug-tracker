import React from "react";
import RiskGauge from "./RiskGauge";
import getBugImage from "../utils/getBugImage";

export default function BugDetail({ bug, back }) {
  if (!bug) return null;

  const image = getBugImage(bug);

  const months = Object.keys(bug.seasonalActivity || {});
  const values = Object.values(bug.seasonalActivity || {});

  return (
    <div className="p-6 space-y-6 max-w-xl mx-auto">

      {/* BACK BUTTON */}
      <button
        onClick={back}
        className="px-4 py-2 bg-slate-800 text-slate-200 rounded-lg border border-slate-700 hover:bg-slate-700"
      >
        ← Back to Bug List
      </button>

      {/* IMAGE */}
      <img
        src={image}
        alt={bug.name}
        className="w-full h-60 object-cover rounded-xl shadow-lg border border-slate-700"
      />

      {/* TITLE */}
      <h1 className="text-2xl font-bold text-emerald-400">{bug.name}</h1>

      <p className="text-slate-300">{bug.description}</p>

      {/* RISK GAUGE */}
      <RiskGauge level={bug.riskLevel} />

      {/* FACTS */}
      {bug.facts && (
        <div className="bg-slate-800 p-4 rounded-lg border border-slate-700">
          <h3 className="text-lg font-bold text-emerald-400 mb-2">Did You Know?</h3>
          <ul className="list-disc pl-6 text-slate-300 space-y-1">
            {bug.facts.map((f, i) => (
              <li key={i}>{f}</li>
            ))}
          </ul>
        </div>
      )}

      {/* SEASONAL ACTIVITY */}
      <div className="bg-slate-800 p-4 rounded-lg border border-slate-700">
        <h3 className="text-lg font-bold text-emerald-400 mb-2">Seasonal Activity</h3>

        <div className="grid grid-cols-12 gap-1">
          {months.map((m, i) => (
            <div key={m} className="flex flex-col items-center">
              <div
                className="w-3 rounded"
                style={{
                  height: `${values[i] * 15}px`,
                  backgroundColor: values[i] > 3 ? "#ef4444" : "#f59e0b",
                }}
              ></div>
              <p className="text-[9px] mt-1 text-slate-300">{m}</p>
            </div>
          ))}
        </div>
      </div>

      {/* BITE PHOTOS */}
      {bug.bitePhotos?.length > 0 && (
        <div className="bg-slate-800 p-4 rounded-lg border border-slate-700">
          <h3 className="text-lg font-bold text-emerald-400 mb-2">Bite Appearance</h3>

          <div className="grid grid-cols-2 gap-3">
            {bug.bitePhotos.map((src, i) => (
              <img
                key={i}
                src={src}
                alt="bite"
                className="w-full h-28 object-cover rounded-lg border border-slate-700"
              />
            ))}
          </div>
        </div>
      )}

      {/* RECOMMENDED PRODUCTS */}
      <div className="bg-slate-800 p-4 rounded-lg border border-slate-700">
        <h3 className="text-lg font-bold text-emerald-400 mb-2">Recommended PESKY® Products</h3>

        <ul className="list-disc pl-6 text-slate-300 space-y-1">
          {bug.products.map((p, i) => (
            <li key={i}>{p}</li>
          ))}
        </ul>
      </div>

      <div className="pb-10"></div>
    </div>
  );
}
