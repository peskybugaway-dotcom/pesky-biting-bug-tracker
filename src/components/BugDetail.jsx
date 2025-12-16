import React, { useState } from "react";
import { ArrowLeft, Skull, AlertTriangle, Bug } from "lucide-react";
import RiskGauge from "./RiskGauge";

export default function BugDetail({ bug, back }) {
  const [showBitePhotos, setShowBitePhotos] = useState(false);
import React from "react";
import { ArrowLeft, AlertTriangle, Skull, Info } from "lucide-react";

export default function BugDetail({ bug, goBack }) {
  if (!bug) return null;

  const dangerIcon =
    bug.danger === "Severe" ? (
      <Skull className="w-6 h-6 text-red-400" />
    ) : bug.danger === "High" ? (
      <AlertTriangle className="w-6 h-6 text-orange-400" />
    ) : (
      <Bug className="w-6 h-6 text-yellow-300" />
    );
  const dangerColor = {
    Low: "text-green-400",
    Moderate: "text-yellow-400",
    High: "text-orange-400",
    Severe: "text-red-500"
  }[bug.danger] || "text-slate-300";

  return (
    <div className="p-6 max-w-xl mx-auto space-y-6 animate-fadeIn">
    <div className="p-6 space-y-6 max-w-xl mx-auto">

      {/* Back Button */}
      <button
        onClick={back}
        className="flex items-center gap-2 text-white bg-slate-700 hover:bg-slate-600 px-4 py-2 rounded-full shadow"
        onClick={goBack}
        className="flex items-center gap-2 text-slate-300 hover:text-white mb-4"
      >
        <ArrowLeft className="w-4 h-4" />
        Back
        <ArrowLeft /> Back
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
      {/* IMAGE */}
      <img
        src={bug.image}
        alt={bug.name}
        className="w-full h-56 object-cover rounded-lg shadow-lg"
      />

      {/* Title + Danger Badge */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-white flex items-center gap-3">
          {dangerIcon}
          {bug.name}
        </h1>
      {/* TITLE */}
      <h2 className="text-2xl font-bold text-white">{bug.name}</h2>

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
      {/* DANGER LEVEL */}
      <div className="flex items-center gap-2 text-lg">
        {bug.danger === "Severe" ? (
          <Skull className={`w-6 h-6 ${dangerColor}`} />
        ) : (
          <AlertTriangle className={`w-6 h-6 ${dangerColor}`} />
        )}

        <span className={`${dangerColor} font-semibold`}>
          Danger Level: {bug.danger}
        </span>
      </div>

      {/* Description */}
      {/* DESCRIPTION */}
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
      {bug.facts && bug.facts.length > 0 && (
        <div>
          <h3 className="text-xl font-bold text-emerald-400 mb-2">
            Did You Know?
          </h2>
          <ul className="list-disc pl-5 space-y-2 text-slate-300">
          </h3>
          <ul className="list-disc pl-6 space-y-1">
            {bug.facts.map((fact, i) => (
              <li key={i}>{fact}</li>
              <li key={i} className="text-slate-300">{fact}</li>
            ))}
          </ul>
        </div>
      )}

      {/* RECOMMENDED PRODUCTS */}
      {bug.products && (
        <div className="pesky-card p-4 space-y-3">
          <h2 className="text-lg font-semibold text-white">
      {/* PRODUCTS */}
      {bug.products && bug.products.length > 0 && (
        <div>
          <h3 className="text-xl font-bold text-emerald-400 mb-2">
            Recommended PESKY® Products
          </h2>
          <ul className="list-disc pl-5 text-emerald-300 space-y-1">
          </h3>
          <div className="space-y-1">
            {bug.products.map((p, i) => (
              <li key={i}>{p}</li>
              <div key={i} className="text-slate-200">
                • {p}
              </div>
            ))}
          </ul>
          </div>
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
      {/* WARNING BOX */}
      <div className="bg-slate-800 border border-slate-700 p-4 rounded-lg flex gap-3">
        <Info className="text-emerald-400 w-6 h-6" />
        <p className="text-slate-300 text-sm leading-relaxed">
          To reduce bites: avoid peak activity times, use PESKY® Bug Away Spray,
          wear light clothing, and reduce standing water near your home.
        </p>
      </div>
    </div>
  );
}
