import React, { useState, useEffect } from "react";
import BugCard from "./BugCard";
import CategoryTabs from "./CategoryTabs.jsx";
import SearchFilter from "./SearchFilter";

export default function BugEncyclopedia({ onSelectBug }) {
  const [bugs, setBugs] = useState([]);
  const [search, setSearch] = useState("");
  const [danger, setDanger] = useState("All");
  const [category, setCategory] = useState("All");

  // -----------------------------
  // LOAD bugs.json dynamically
  // -----------------------------
  useEffect(() => {
    import("../data/bugs.json").then((mod) => {
      setBugs(mod.default);
    });
  }, []);

  const categories = ["All", ...new Set(bugs.map((b) => b.category))];
  const dangerLevels = ["All", "Low", "Moderate", "High", "Severe"];

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

      <SearchFilter
        search={search}
        setSearch={setSearch}
        danger={danger}
        setDanger={setDanger}
      />

      <CategoryTabs
        categories={categories}
        active={category}
        setActive={setCategory}
      />

      <div className="grid grid-cols-1 gap-4">
        {filtered.map((bug) => (
          <BugCard key={bug.name} bug={bug} onClick={() => onSelectBug(bug)} />
        ))}
      </div>
    </div>
  );
}
