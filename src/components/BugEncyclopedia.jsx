import React, { useState, useEffect } from "react";
import BugCard from "./BugCard";
import CategoryTabs from "./CategoryTabs";
import SearchFilter from "./SearchFilter";
import getBugImage from "../utils/getBugImage";

export default function BugEncyclopedia({ onSelectBug }) {
  const [bugs, setBugs] = useState([]);
  const [search, setSearch] = useState("");
  const [danger, setDanger] = useState("All");
  const [category, setCategory] = useState("All");

  // ------------------------------------------------------------
  // LOAD BUGS FROM JSON
  // ------------------------------------------------------------
  useEffect(() => {
    import("../data/bugs.json")
      .then((mod) => setBugs(mod.default))
      .catch((err) => console.error("Failed to load bugs.json:", err));
  }, []);

  const categories = ["All", ...new Set(bugs.map((b) => b.category))];
  const dangerLevels = ["All", "Low", "Moderate", "High", "Severe"];

  // ------------------------------------------------------------
  // FILTER SYSTEM
  // ------------------------------------------------------------
  const filtered = bugs.filter((bug) => {
    const s = search.toLowerCase();
    const matchesSearch =
      bug.name.toLowerCase().includes(s) ||
      bug.description.toLowerCase().includes(s);

    const matchesDanger = danger === "All" || bug.danger === danger;
    const matchesCategory = category === "All" || bug.category === category;

    return matchesSearch && matchesDanger && matchesCategory;
  });

  return (
    <div className="p-6 max-w-xl mx-auto space-y-6">

      {/* TITLE */}
      <h2 className="text-2xl font-bold text-emerald-400">
        Bug Encyclopedia
      </h2>

      {/* SEARCH + DANGER FILTER */}
      <SearchFilter
        search={search}
        setSearch={setSearch}
        danger={danger}
        setDanger={setDanger}
      />

      {/* CATEGORY TABS */}
      <CategoryTabs
        categories={categories}
        active={category}
        setActive={setCategory}
      />

      {/* GRID OF BUG CARDS */}
      <div className="grid grid-cols-1 gap-4 pb-10">
        {filtered.map((bug) => (
          <BugCard
            key={bug.name}
            bug={{ ...bug, image: getBugImage(bug) }}
            onClick={() => onSelectBug(bug)}
          />
        ))}

        {filtered.length === 0 && (
          <p className="text-slate-400 text-center pt-10">
            No matching insects found.
          </p>
        )}
      </div>
    </div>
  );
}
