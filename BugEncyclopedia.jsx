import React, { useState, useMemo } from "react";
import { Search, X, Bug as BugIcon } from "lucide-react";
import BugCard from "./BugCard";
// Change: Direct import is more reliable on Vercel
import BUGS_DATA from "../data/bugs.json"; 

export default function BugEncyclopedia({ onSelectBug }) {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  // Automatically generate categories from your JSON data
  const categories = ["All", ...new Set(BUGS_DATA.map((b) => b.category))];

  // Filtering Logic
  const filteredBugs = useMemo(() => {
    return BUGS_DATA.filter((bug) => {
      const matchesSearch = 
        bug.name.toLowerCase().includes(search.toLowerCase()) ||
        bug.description.toLowerCase().includes(search.toLowerCase());
      
      const matchesCategory = 
        activeCategory === "All" || bug.category === activeCategory;
        
      return matchesSearch && matchesCategory;
    });
  }, [search, activeCategory]);

  return (
    <div className="min-h-screen bg-slate-950 pb-20">
      <div className="p-6 space-y-6 max-w-xl mx-auto">
        
        {/* Header */}
        <div className="space-y-2">
          <h2 className="text-3xl font-black text-white tracking-tight">LIBRARY</h2>
          <p className="text-slate-400 text-sm">Identify pests and their bite patterns.</p>
        </div>

        {/* Search Bar */}
        <div className="relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-emerald-400 transition-colors" />
          <input
            type="text"
            placeholder="Search by name or description..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-slate-900 border border-slate-800 text-white pl-12 pr-4 py-4 rounded-2xl focus:outline-none focus:border-emerald-500/50 transition-all placeholder:text-slate-600"
          />
          {search && (
            <button onClick={() => setSearch("")} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500">
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Category Filter Chips */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                activeCategory === cat
                  ? "bg-emerald-600 text-white shadow-lg"
                  : "bg-slate-900 text-slate-400 border border-slate-800"
              }`}
            >
              {cat.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Results List */}
        <div className="grid gap-4">
          {filteredBugs.length > 0 ? (
            filteredBugs.map((bug) => (
              <BugCard 
                key={bug.name} 
                bug={bug} 
                onClick={() => onSelectBug(bug)} 
              />
            ))
          ) : (
            <div className="text-center py-20">
              <BugIcon className="mx-auto text-slate-800 w-12 h-12 mb-4" />
              <p className="text-slate-500 font-medium">No results found.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
