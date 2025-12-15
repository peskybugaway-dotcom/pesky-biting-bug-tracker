import React from "react";

export default function BugCard({ bug, onClick }) {
  return (
    <div
      onClick={onClick}
      className="pesky-card cursor-pointer hover:bg-slate-700/50 transition overflow-hidden"
    >
      <div className="flex gap-4">
        <img
          src={bug.image}
          alt={bug.name}
          className="w-20 h-20 object-cover rounded-lg border border-slate-700"
        />
        <div className="flex-1">
          <h3 className="text-white font-semibold">{bug.name}</h3>
          <p className="text-slate-300 text-sm">{bug.description}</p>

          <div className="mt-2 text-xs text-emerald-400">
            Danger: {bug.danger}
          </div>
        </div>
      </div>
    </div>
  );
}
