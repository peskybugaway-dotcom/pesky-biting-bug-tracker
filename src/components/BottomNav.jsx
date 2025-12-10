import React from "react";

export default function BottomNav({ tab, setTab }) {
  const btn = (name, label) => (
    <button
      onClick={() => setTab(name)}
      className={`px-3 py-1 rounded ${
        tab === name
          ? "bg-emerald-600 text-white font-bold"
          : "text-slate-300 hover:text-white"
      }`}
    >
      {label}
    </button>
  );

  return (
    <div className="fixed bottom-0 left-0 w-full bg-slate-900/90 backdrop-blur p-3 flex justify-around shadow-lg border-t border-slate-700">
      {btn("dashboard", "Dashboard")}
      {btn("guide", "Guide")}
      {btn("protection", "Protection")}
      {btn("map", "Map")}
    </div>
  );
}
