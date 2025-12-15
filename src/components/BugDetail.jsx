// src/components/BugDetail.jsx
import React from "react";

export default function BugDetail({ bug, back }) {
  if (!bug) return null;

  // STATIC COLORS (Tailwind-safe)
  const riskColors = {
    1: "rgb(234, 179, 8)",   // yellow-500
    2: "rgb(249, 115, 22)",  // orange-500
    3: "rgb(239, 68, 68)"    // red-500
  };

  return (
    <div className="p-6 space-y-6 max-w-xl mx-auto">

      {/* BACK BUTTON */}
      <button
        onClick={back}
        className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-full shadow"
      >
        ← Back
      </button>

      {/* BUG CARD */}
      <div className="pesky-card p-5 space-y-4">

        {/* IMAGE */}
        {bug.image && (
          <img
            src={bug.image}
            alt={bug.name}
            className="w-full h-48 object-cover rounded-lg"
          />
        )}

        {/* TITLE */}
        <h2 className="text-2xl font-bold text-emerald-400">{bug.name}</h2>

        {/* TYPE & DANGER */}
        <p className="text-slate-300 text-sm">
          <strong className="text-white">Type:</strong> {bug.type}
        </p>

        <p className="text-slate-300 text-sm">
          <strong className="text-white">Danger:</strong> {bug.danger}
        </p>

        {/* RISK METER (INLINE SAFE COLOR) */}
        <div className="space-y-2">
          <p className="text-white font-semibold text-sm">Risk Level</p>

          <div
            className="h-3 rounded-full shadow-inner"
            style={{ backgroundColor: riskColors[bug.riskLevel] || "gray" }}
          ></div>
        </div>

        {/* DESCRIPTION */}
        <p className="text-white leading-relaxed">{bug.description}</p>

        {/* FACTS */}
        {bug.facts && (
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-emerald-400">Did You Know?</h3>
            <ul className="list-disc list-inside text-slate-300">
              {bug.facts.map((fact, i) => (
                <li key={i}>{fact}</li>
              ))}
            </ul>
          </div>
        )}

        {/* PRODUCTS */}
        {bug.products && (
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-emerald-400">
              Recommended PESKY® Products
            </h3>
            <ul className="list-disc list-inside text-slate-300">
              {bug.products.map((prod, i) => (
                <li key={i}>{prod}</li>
              ))}
            </ul>
          </div>
        )}

        {/* BITE PHOTOS */}
        {bug.bitePhotos && (
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-emerald-400">Bite Photos</h3>
            <div className="grid grid-cols-2 gap-3">
              {bug.bitePhotos.map((src, i) => (
                <img
                  key={i}
                  src={src}
                  alt="Bite"
                  className="w-full h-24 object-cover rounded-lg"
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
