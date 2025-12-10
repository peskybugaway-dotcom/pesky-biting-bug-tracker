import React from "react";
import { ShieldCheck, Spray, Droplet, Wind, Sun, Leaf } from "lucide-react";

export default function Protection() {
  return (
    <div className="p-4 max-w-xl mx-auto space-y-6">

      {/* TITLE */}
      <div className="pesky-card">
        <h2 className="text-2xl font-bold text-emerald-400">
          Protection & Prevention
        </h2>
        <p className="text-slate-300 text-sm mt-1">
          Smart steps to reduce bites, avoid hot zones, and protect your family.
        </p>
      </div>

      {/* PESKY PRODUCT RECOMMENDATIONS */}
      <div className="pesky-card space-y-3">
        <h3 className="font-bold text-white flex items-center gap-2">
          <Spray className="w-5 h-5 text-emerald-400" /> Recommended Protection
        </h3>

        <ul className="text-slate-300 text-sm space-y-1">
          <li>• <span className="text-emerald-300 font-semibold">PESKY® Bug Away Spray</span> — everyday mosquito & biting fly defense</li>
          <li>• <span className="text-emerald-300 font-semibold">PESKY® No-See-Um Defense</span> — extra strength protection for coastal areas</li>
          <li>• <span className="text-emerald-300 font-semibold">PESKY® Area Defense</span> — patio, campsite, backyard barrier spray</li>
          <li>• <span className="text-emerald-300 font-semibold">PESKY® After-Bite Gel</span> — instant itch relief</li>
        </ul>

        <p className="text-slate-400 text-xs">
          Natural, family-safe formulas designed for Florida & coastal climates.
        </p>
      </div>

      {/* WEATHER-BASED TIPS */}
      <div className="pesky-card space-y-3">
        <h3 className="font-bold text-white flex items-center gap-2">
          <Sun className="w-5 h-5 text-yellow-400" /> Weather & Bug Behavior
        </h3>

        <ul className="text-slate-300 text-sm space-y-1">
          <li>• Hot + humid + calm wind = <span className="text-red-400 font-bold">highest bite risk</span></li>
          <li>• Breezy days (10+ mph) significantly reduce mosquito activity</li>
          <li>• After rainfall, mosquitoes spike within 48 hours</li>
          <li>• No-see-ums peak at sunrise, sunset, and humid nights</li>
        </ul>
      </div>

      {/* BEFORE YOU GO OUT */}
      <div className="pesky-card space-y-3">
        <h3 className="font-bold text-white flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-emerald-400" /> Before You Go Outside
        </h3>

        <ul className="text-slate-300 text-sm space-y-1">
          <li>• Apply Bug Away to exposed skin & clothing</li>
          <li>• Use Area Defense around seating, patios, docks</li>
          <li>• Wear light-colored clothing — insects prefer dark colors</li>
          <li>• Avoid perfume, scented lotions, and fruity body products</li>
          <li>• Bring After-Bite Gel for immediate relief if bitten</li>
        </ul>
      </div>

      {/* HOME & BACKYARD TIPS */}
      <div className="pesky-card space-y-3">
        <h3 className="font-bold text-white flex items-center gap-2">
          <Droplet className="w-5 h-5 text-sky-400" /> Home & Backyard Prevention
        </h3>

        <ul className="text-slate-300 text-sm space-y-1">
          <li>• Remove standing water: buckets, gutters, pots, birdbaths</li>
          <li>• Keep screens repaired; seal window gaps</li>
          <li>• Run outdoor fans — insects struggle in moving air</li>
          <li>• Treat areas with shade + moisture regularly</li>
        </ul>
      </div>

      {/* SEASONAL GUIDANCE */}
      <div className="pesky-card space-y-3">
        <h3 className="font-bold text-white flex items-center gap-2">
          <Leaf className="w-5 h-5 text-emerald-300" /> Seasonal Protection Tips
        </h3>

        <ul className="text-slate-300 text-sm space-y-1">
          <li>• <span className="font-semibold text-emerald-300">Spring:</span> First hatch begins — start regular protection</li>
          <li>• <span className="font-semibold text-emerald-300">Summer:</span> Peak mosquito + no-see-um season — strongest protection needed</li>
          <li>• <span className="font-semibold text-emerald-300">Fall:</span> Activity remains high in warm states (FL, TX, LA, AL)</li>
          <li>• <span className="font-semibold text-emerald-300">Winter:</span> Bites still occur in warm climates (especially Florida)</li>
        </ul>
      </div>

    </div>
  );
}
