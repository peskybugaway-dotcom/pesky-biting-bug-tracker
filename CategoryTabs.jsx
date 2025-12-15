import React from "react";

export default function CategoryTabs({ categories, active, setActive }) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-2">
      {["All", ...categories].map((cat) => (
        <button
          key={cat}
          onClick={() => setActive(cat)}
          className={`px-3 py-1 text-sm rounded-full border ${
            active === cat
              ? "bg-emerald-600 text-white border-emerald-500"
              : "bg-slate-800 text-slate-300 border-slate-700"
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
