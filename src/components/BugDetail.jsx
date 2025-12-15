import React, { useState } from "react";

export default function BugDetail({ bug, back }) {
  const [showBitePhotos, setShowBitePhotos] = useState(false);

  if (!bug) return null;

  const dangerColors = {
    Low: "bg-green-500",
    Moderate: "bg-yellow-400",
    High: "bg-orange-500",
    Severe: "bg-red-600"
  };

  const months = Object.keys(bug.seasonalActivity || {});

  return (
    <div className="max-w-xl mx-auto pb-24">
      {/* BACK BUTTON */}
      <button
        onClick={back}
        className="mt-4 ml-4 px-3 py-2 bg-slate-800 border border-slate-600 text-white rounded-lg"
      >
        ← Back
      </button>

      {/* HERO IMAGE */}
      {bug.image && (
        <img
          src={bug.image}
          alt={bug.name}
          className="w-full h-56 object-cover rounded-xl shadow-lg mt-4"
        />
      )}

      {/* HEADER */}
      <div className="p-6 space-y-3">
        <h1 className="text-3xl font-bold text-emerald-300">{bug.name}</h1>
        <p className="text-slate-300 text-sm">{bug.type}</p>

        {/* Danger Meter */}
        <div className="mt-2">
          <p className="text-slate-300 text-sm mb-1">Danger Level:</p>
          <div className="w-full h-3 bg-slate-700 rounded-full">
            <div
              className={`h-3 rounded-full ${dangerColors[bug.danger]}`}
              style={{ width: `${bug.riskLevel * 33}%` }}
            ></div>
          </div>
        </div>

        <p className="text-slate-200 leading-relaxed">{bug.description}</p>
      </div>

      {/* DID YOU KNOW */}
      {bug.facts && (
        <div className="mx-4 p-4 bg-[#253027] border border-[#344337] rounded-xl text-slate-200">
          <h2 className="text-emerald-300 font-bold mb-2">Did You Know?</h2>
          <ul className="list-disc list-inside space-y-1 text-slate-300">
            {bug.facts.map((fact, index) => (
              <li key={index}>{fact}</li>
            ))}
          </ul>
        </div>
      )}

      {/* SEASONAL ACTIVITY */}
      {bug.seasonalActivity && (
        <div className="mx-4 mt-6">
          <h2 className="text-emerald-300 font-bold mb-2">Seasonal Activity</h2>
          <div className="grid grid-cols-12 gap-1">
            {months.map((m, i) => {
              const lv = bug.seasonalActivity[m];
              const intensity = ["bg-slate-700","bg-green-600","bg-yellow-500","bg-orange-500","bg-red-600"][lv];

              return (
                <div key={i} className="text-center">
                  <div className={`h-6 w-full rounded ${intensity}`}></div>
                  <p className="text-[10px] text-slate-400 mt-1">{m}</p>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* PRODUCT RECOMMENDATIONS */}
      {bug.products && (
        <div className="mx-4 mt-6 p-4 bg-[#253027]/60 border border-[#3a4b41] rounded-xl">
          <h2 className="text-emerald-300 font-bold mb-2">Recommended PESKY Products</h2>
          <ul className="list-disc list-inside text-slate-300">
            {bug.products.map((p, i) => (
              <li key={i}>{p}</li>
            ))}
          </ul>
        </div>
      )}

      {/* BITE PHOTOS */}
      <div className="mx-4 my-6">
        <button
          onClick={() => setShowBitePhotos(!showBitePhotos)}
          className="px-4 py-2 bg-slate-800 border border-slate-600 text-white rounded-lg"
        >
          {showBitePhotos ? "Hide Bite Photos" : "Show Bite Photos"}
        </button>

        {showBitePhotos && bug.bitePhotos && (
          <div className="grid grid-cols-1 gap-2 mt-3">
            {bug.bitePhotos.map((src, i) => (
              <img
                key={i}
                src={src}
                alt="Bite"
                className="w-full h-40 object-cover rounded-xl shadow-md"
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
