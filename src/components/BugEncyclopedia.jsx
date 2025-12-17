import React, { useState, useMemo } from "react";
import { Search, Filter, Bug as BugIcon, X } from "lucide-react";
import BugCard from "./BugCard";
import BUGS_DATA from "../data/bugs.json";

export default function BugEncyclopedia({ onSelectBug }) {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = ["All", "Mosquitoes", "Flies", "Ticks", "No-See-Ums", "Ants"];

  // Filter Logic
  const filteredBugs = useMemo(() => {
    return BUGS_DATA.filter((bug) => {
      const matchesSearch = bug.name.toLowerCase().includes(search.toLowerCase()) ||
                            bug.type.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = activeCategory === "All" || bug.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [search, activeCategory]);

  return (
    <div className="min-h-screen bg-slate-950 pb-20">
      {/* Header & Search Area */}
      <div className="p-6 space-y-6 max-w-xl mx-auto">
        <div className="space-y-2">
          <h2 className="text-3xl font-black text-white tracking-tight">LIBRARY</h2>
          <p className="text-slate-400 text-sm">Identify pests and their bite patterns.</p>
        </div>

        {/* SEARCH BAR */}
        <div className="relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-emerald-400 transition-colors" />
          <input
            type="text"
            placeholder="Search by name or type..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-slate-900 border border-slate-800 text-white pl-12 pr-4 py-4 rounded-2xl focus:outline-none focus:border-emerald-500/50 transition-all placeholder:text-slate-600 shadow-inner"
          />
          {search && (
            <button 
              onClick={() => setSearch("")}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* CATEGORY CHIPS */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full text-[10px] font-black tracking-widest whitespace-nowrap transition-all border ${
                activeCategory === cat 
                  ? "bg-emerald-600 border-emerald-500 text-white shadow-lg shadow-emerald-900/20" 
                  : "bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-600"
              }`}
            >
              {cat.toUpperCase()}
            </button>
          ))}
        </div>

        {/* BUGS GRID - THE CONNECTION FIX */}
        <div className="grid gap-4 mt-4">
          {filteredBugs.length > 0 ? (
            filteredBugs.map((bug) => (
              <BugCard 
                key={bug.id || bug.name} 
                bug={bug} 
                onSelect={onSelectBug} // matches the 'onSelect' prop in BugCard
              />
            ))
          ) : (
            <div className="text-center py-20 bg-slate-900/20 rounded-[2rem] border border-dashed border-slate-800">
              <BugIcon className="w-12 h-12 text-slate-800 mx-auto mb-4" />
              <p className="text-slate-500 font-medium">No pests found matching your search.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
