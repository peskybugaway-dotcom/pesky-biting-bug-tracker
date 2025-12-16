import React, { useState } from "react";
import { ArrowLeft, Skull, AlertTriangle, Bug } from "lucide-react";
import RiskGauge from "./RiskGauge";

export default function BugDetail({ bug, back }) {
  const [showBitePhotos, setShowBitePhotos] = useState(false);

  if (!bug) return null;

  const dangerIcon =
    bug.danger === "Severe" ? (
      <Skull className="w-6 h-6 text-red-400" />
    ) : bug.danger === "High" ? (
      <AlertTriangle className="w-6 h-6 text-orange-400" />
    ) : (
      <Bug className="w-6 h-6 text-yellow-300" />
    );

  return (
    <div className="p-6 max-w-xl mx-auto space-y-6 animate-fadeIn">
      {/* Back Button */}
      <button
        onClick={back}
        className="flex items-center gap-2 text-white bg-slate-700 hover:bg-slate-600 px-4 py-2 rounded-full shadow"
      >
        <ArrowLeft className="w-4 h-4" />
        Back
      </button>

      {/* IMAGE BANNER */}
      <div className="w-full h-48 rounded-xl overflow-hidden border border-slate-700 shadow-lg">
        <img
          src={bug.image}
          className="w-full h-full object-cover"
          alt={bug.name}
          onError={(e) => (e.target.src = "/images/fallback.jpg")}
        />
      </div>

      {/* Title + Danger Badge */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-white flex items-center gap-3">
          {dangerIcon}
          {bug.name}
        </h1>

        <span
          className={`
          inline-block px-3 py-1 rounded-full text-sm font-semibold
          ${
            bug.danger === "Severe"
              ? "bg-red-500/20 text-red-300 border border-red-500/30"
              : bug.danger === "High"
              ? "bg-orange-500/20 text-orange-300 border border-orange-500/30"
              : "bg-yellow-500/20 text-yellow-300 border border-yellow-500/30"
          }
        `}
        >
          {bug.danger} Risk
        </span>
      </div>

      {/* Description */}
      <p className="text-slate-300 leading-relaxed">{bug.description}</p>

      {/* RISK GAUGE */}
      <div className="pesky-card p-4">
        <h2 className="text-lg font-semibold text-white mb-3">
          Bite Severity
        </h2>
        <RiskGauge level={bug.riskLevel || 1} />
      </div>

      {/* SEASONAL ACTIVITY */}
      {bug.seasonalActivity && (
        <div className="pesky-card p-4">
          <h2 className="text-lg font-semibold text-white mb-3">
            Seasonal Activity
          </h2>
          <div className="grid grid-cols-6 gap-2 text-center text-xs">
            {Object.entries(bug.seasonalActivity).map(([month, level]) => (
              <div key={month} className="space-y-1">
                <div
                  className={`h-3 rounded ${
                    level === 4
                      ? "bg-red-500"
                      : level === 3
                      ? "bg-orange-400"
                      : level === 2
                      ? "bg-yellow-300"
                      : "bg-slate-500"
                  }`}
                ></div>
                <div className="text-slate-300">{month}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* FACTS */}
      {bug.facts && (
        <div className="pesky-card p-4 space-y-3">
          <h2 className="text-lg font-semibold text-white">
            Did You Know?
          </h2>
          <ul className="list-disc pl-5 space-y-2 text-slate-300">
            {bug.facts.map((fact, i) => (
              <li key={i}>{fact}</li>
            ))}
          </ul>
        </div>
      )}

      {/* RECOMMENDED PRODUCTS */}
      {bug.products && (
        <div className="pesky-card p-4 space-y-3">
          <h2 className="text-lg font-semibold text-white">
            Recommended PESKY® Products
          </h2>
          <ul className="list-disc pl-5 text-emerald-300 space-y-1">
            {bug.products.map((p, i) => (
              <li key={i}>{p}</li>
            ))}
          </ul>
        </div>
      )}

      {/* BITE PHOTOS TOGGLER */}
      {bug.bitePhotos && (
        <div className="pesky-card p-4">
          <button
            onClick={() => setShowBitePhotos(!showBitePhotos)}
            className="pesky-btn text-sm px-3 py-1"
          >
            {showBitePhotos ? "Hide Bite Photos" : "Show Bite Photos"}
          </button>

          {showBitePhotos && (
            <div className="grid grid-cols-2 gap-3 mt-4">
              {bug.bitePhotos.map((src, i) => (
                <img
                  key={i}
                  src={src}
                  className="rounded-lg border border-slate-700 shadow"
                  alt="Bite reaction"
                  onError={(e) => (e.target.src = "/images/fallback.jpg")}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
