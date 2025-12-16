import React from "react";
import { ArrowLeft, AlertTriangle, Skull, Info } from "lucide-react";

export default function BugDetail({ bug, goBack }) {
export default function BugDetail({ bug, back }) {
  if (!bug) return null;

  const dangerColor = {
    Low: "text-green-400",
    Moderate: "text-yellow-400",
    High: "text-orange-400",
    Severe: "text-red-500"
  }[bug.danger] || "text-slate-300";

  return (
    <div className="p-6 space-y-6 max-w-xl mx-auto">
    <div className="p-6 max-w-xl mx-auto space-y-6">

      {/* Back Button */}
      {/* BACK BUTTON */}
      <button
        onClick={goBack}
        className="flex items-center gap-2 text-slate-300 hover:text-white mb-4"
        onClick={back}
        className="px-4 py-2 mb-4 bg-slate-800 text-white rounded-lg hover:bg-slate-700 transition"
      >
        <ArrowLeft /> Back
        ← Back to Bug List
      </button>

      {/* IMAGE */}
      <img
        src={bug.image}
        alt={bug.name}
        className="w-full h-56 object-cover rounded-lg shadow-lg"
      />

      {/* TITLE */}
      <h2 className="text-2xl font-bold text-white">{bug.name}</h2>

      {/* DANGER LEVEL */}
      <div className="flex items-center gap-2 text-lg">
        {bug.danger === "Severe" ? (
          <Skull className={`w-6 h-6 ${dangerColor}`} />
        ) : (
          <AlertTriangle className={`w-6 h-6 ${dangerColor}`} />
        )}
      {/* HEADER */}
      <h2 className="text-2xl font-bold text-emerald-400">{bug.name}</h2>

        <span className={`${dangerColor} font-semibold`}>
          Danger Level: {bug.danger}
        </span>
      </div>
      {/* IMAGE */}
      {bug.image && (
        <img
          src={bug.image}
          alt={bug.name}
          className="w-full rounded-xl shadow-lg"
        />
      )}

      {/* DESCRIPTION */}
      <p className="text-slate-300 leading-relaxed">{bug.description}</p>
      <p className="text-slate-300">{bug.description}</p>

      {/* FACTS */}
      {bug.facts && bug.facts.length > 0 && (
      {bug.facts?.length > 0 && (
        <div>
          <h3 className="text-xl font-bold text-emerald-400 mb-2">
            Did You Know?
          </h3>
          <ul className="list-disc pl-6 space-y-1">
          <h3 className="text-lg font-semibold text-white mb-2">Did You Know?</h3>
          <ul className="list-disc list-inside text-slate-300 space-y-1">
            {bug.facts.map((fact, i) => (
              <li key={i} className="text-slate-300">{fact}</li>
              <li key={i}>{fact}</li>
            ))}
          </ul>
        </div>
      )}

      {/* PRODUCTS */}
      {bug.products && bug.products.length > 0 && (
      {bug.products?.length > 0 && (
        <div>
          <h3 className="text-xl font-bold text-emerald-400 mb-2">
            Recommended PESKY® Products
          </h3>
          <div className="space-y-1">
          <h3 className="text-lg font-semibold text-emerald-400 mb-2">Recommended PESKY® Products</h3>
          <ul className="list-disc list-inside text-slate-300 space-y-1">
            {bug.products.map((p, i) => (
              <div key={i} className="text-slate-200">
                • {p}
              </div>
              <li key={i}>{p}</li>
            ))}
          </div>
          </ul>
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
