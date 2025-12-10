import React from "react";

export default function BottomNav({ tab, setTab }) {
  const btn = (name, label) => (
    <button
      onClick={() => setTab(name)}
      className={`px-3 py-1 rounded text-sm transition ${
        tab === name
          ? "text-white font-bold border-b-2 border-emerald-500 pb-2"
          : "text-slate-300 hover:text-white"
      }`}
    >
      {label}
    </button>
  );

  return (
    <div className="fixed bottom-0 left-0 w-full bg-slate-900/80 backdrop-blur-md p-3 flex justify-around shadow-lg border-t border-slate-700">
      {btn("dashboard", "Dashboard")}
      {btn("guide", "Guide")}
      {btn("protection", "Protection")}
      {btn("map", "Map")}
      {btn("bugs", "Bugs")}

      <div className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-transparent via-emerald-500/40 to-transparent"></div>
    </div>
  );
}
