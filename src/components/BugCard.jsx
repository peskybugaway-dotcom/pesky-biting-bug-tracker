import React from "react";

export default function BugCard({ bug, onClick }) {
  return (
    <div
      className="pesky-card p-4 hover:bg-slate-700/50 transition cursor-pointer"
      onClick={onClick}
    >
      <h3 className="text-lg font-semibold text-white">{bug.name}</h3>
      <p className="text-sm text-slate-300">{bug.description}</p>
    </div>
  );
}
