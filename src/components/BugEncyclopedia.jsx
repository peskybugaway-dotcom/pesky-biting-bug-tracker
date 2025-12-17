import React, { useState } from "react";
import BugCard from "./BugCard";

// ------------------------------------------------------------
// MASTER BUG LIST (Hard-coded for your current system)
// ------------------------------------------------------------
const BUGS = [
  // ------------------------------------------------------------
  // MOSQUITOES
  // ------------------------------------------------------------
  {
    name: "Aedes Aegypti (Yellow Fever Mosquito)",
    type: "Mosquito",
    category: "Mosquitoes",
    danger: "Severe",
    riskLevel: 3,
    image: "https://i.imgur.com/J1v7C3d.jpeg",
    description:
      "Aggressive day-biting mosquito. Transmits Dengue, Zika, Yellow Fever. Thrives around homes and standing water.",
    facts: [
      "Prefers biting humans over animals.",
      "Lays eggs in tiny containers that hold water."
    ],
    products: ["PESKY® Bug Away Spray"]
  },

  {
    name: "No-See-Um (Ceratopogonidae)",
    type: "Biting Midge",
    category: "No-See-Ums",
    danger: "Severe",
    riskLevel: 3,
    image: "https://i.imgur.com/isM4Q3d.jpeg",
    description:
      "Extremely small and aggressive. Causes intense welts and thrives in coastal humidity.",
    facts: ["Most active at dawn/dusk.", "Avoids windy conditions."],
    products: ["PESKY® No-See-Um Defense", "PESKY® Bug Away Spray"]
  },

  {
    name: "Sand Fly",
    type: "Midge",
    category: "No-See-Ums",
    danger: "High",
    riskLevel: 2,
    image: "https://i.imgur.com/mqUFD1Z.jpeg",
    description:
      "Night-active biting midges that swarm in humid areas. Silent flyers.",
    facts: ["Peak summertime activity.", "Highly attracted to sweat."],
    products: ["PESKY® Bug Away Spray"]
  },

  // ------------------------------------------------------------
  // ★★★ NEW: YELLOW FLY ★★★
  // ------------------------------------------------------------
  {
    name: "Yellow Fly (Diachlorus ferrugatus)",
    type: "Biting Fly",
    category: "Flies",
    danger: "High",
    riskLevel: 3,
    image: "https://i.imgur.com/2zQyC9z.jpeg", // safe placeholder, not removed by Imgur
    description:
      "Extremely painful biter found in humid wooded areas of the Southeast U.S. Aggressive, persistent, and highly attracted to motion.",
    facts: [
      "Peak season: May–July.",
      "Females require blood for egg development.",
      "One of Florida’s most feared biting insects."
    ],
    products: ["PESKY® Bug Away Spray", "PESKY® Cooling Relief Gel"]
  }
];

export default function BugEncyclopedia({ onSelectBug }) {
  const [search, setSearch] = useState("");
  const [danger, setDanger] = useState("All");
  const [category, setCategory] = useState("All");

  const categories = ["All", ...new Set(BUGS.map((b) => b.category))];
  const dangerLevels = ["All", "Low", "Moderate", "High", "Severe"];

  // ---------------------------
  // FILTERING LOGIC
  // ---------------------------
  const filtered = BUGS.filter((b) => {
    const matchesSearch =
      b.name.toLowerCase().includes(search.toLowerCase()) ||
      b.description.toLowerCase().includes(search.toLowerCase());

    const matchesDanger = danger === "All" || b.danger === danger;
    const matchesCategory = category === "All" || b.category === category;

    return matchesSearch && matchesDanger && matchesCategory;
  });

  return (
    <div className="p-6 max-w-xl mx-auto space-y-6">
      <h2 className="text-2xl text-emerald-400 font-bold">
        Bug Encyclopedia
      </h2>

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

      {/* Category Tabs */}
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

      {/* BUG GRID */}
      <div className="grid grid-cols-1 gap-4">
        {filtered.map((bug) => (
          <BugCard
            key={bug.name}
            bug={bug}
            onClick={() => onSelectBug(bug)}
          />
        ))}
      </div>
    </div>
  );
}
