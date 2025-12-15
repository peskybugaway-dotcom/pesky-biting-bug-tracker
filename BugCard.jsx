import React from "react";

export default function BugCard({ bug, onClick }) {
  return (
    <div
      onClick={onClick}
      className="pesky-card p-4 cursor-pointer hover:bg-slate-700/60 transition rounded-xl"
    >
      <div className="flex items-center gap-4">
        {/* Image */}
        <img
          src={bug.image}
          alt={bug.name}
          className="w-16 h-16 rounded-lg object-cover border border-slate-600"
        />

        <div className="flex-1">
          <h3 className="text-white font-semibold text-lg">
            {bug.name}
          </h3>

          <p className="text-slate-300 text-sm">{bug.category}</p>

          <span
            className={`inline-block mt-1 px-2 py-1 rounded text-xs ${
              bug.danger === "Severe"
                ? "bg-red-600 text-white"
                : bug.danger === "High"
                ? "bg-orange-500 text-white"
                : bug.danger === "Moderate"
                ? "bg-yellow-500 text-black"
                : "bg-green-500 text-black"
            }`}
          >
            {bug.danger}
          </span>
        </div>
      </div>
    </div>
  );
}
