import React from "react";

export default function SearchFilter({ search, setSearch, danger, setDanger }) {
  return (
    <div className="flex gap-3">
      <input
        type="text"
        placeholder="Search bugs..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="flex-1 px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white"
      />

      <select
        value={danger}
        onChange={(e) => setDanger(e.target.value)}
        className="px-2 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white"
      >
        <option value="All">All Danger</option>
        <option value="Low">Low</option>
        <option value="Moderate">Moderate</option>
        <option value="High">High</option>
        <option value="Severe">Severe</option>
      </select>
    </div>
  );
}
