import React, { useEffect, useState } from "react";
import BugCard from "./BugCard";

export default function BugEncyclopedia({ onSelectBug }) {
  const [bugs, setBugs] = useState([]);
  const [search, setSearch] = useState("");
  const [danger, setDanger] = useState("All");
  const [category, setCategory] = useState("All");

  // ✅ Load bugs.json safely
  useEffect(() => {
    import("../data/bugs.json")
      .then((mod) => setBugs(mod.default))
      .catch((err) => console.error("BUG JSON LOAD ERROR:", err));
  }, []);

  const categories = ["All", ...new Set(bugs.map((b) => b.category))];
  const dangerLevels = ["All", "Low", "Moderate", "High", "Severe"];

  // --------------------------------------------------
  // FILTERING
  // --------------------------------------------------
  const filtered = bugs.filter((b) => {
    const matchesSearch =
      b.name.toLowerCase().includes(search.toLowerCase()) ||
      b.description.toLowerCase().includes(search.toLowerCase());

    const matchesDanger = danger === "All" || b.danger === danger;

    const matchesCategory = category === "All" || b.category === category;

    return matchesSearch && matchesDanger && matchesCategory;
  });

  return (
    <div className="p-6 max-w-xl mx-auto space-y-6">
      <h2 className="text-2xl text-emerald-400 font-bold">Bug Encyclopedia</h2>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search bugs..."
        className="w-full px-4 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Danger Filter */}
      <select
        className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white"
        value={danger}
        onChange={(e) => setDanger(e.target.value)}
      >
        {dangerLevels.map((d) => (
          <option key={d}>{d}</option>
        ))}
      </select>

      {/* Category Filter */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`px-3 py-1 rounded-full text-sm ${
              category === cat
                ? "bg-emerald-600 text-white"
                : "bg-slate-700 text-slate-300"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Bug Results */}
      <div className="grid grid-cols-1 gap-4">
        {filtered.map((bug) => (
          <BugCard key={bug.name} bug={bug} onClick={() => onSelectBug(bug)} />
        ))}
      </div>
    </div>
  );
}
