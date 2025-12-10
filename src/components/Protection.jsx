import React from "react";

export default function Protection() {
  return (
    <div className="space-y-6 p-4 max-w-xl mx-auto">
      <div className="pesky-card p-4">
        <h2 className="pesky-title">Prevention & Protection</h2>

        <ul className="mt-4 space-y-2 text-slate-300">
          <li>• Use plant-based repellents like PESKY Bug Away</li>
          <li>• Apply No-See-Um Defense in marshy or coastal areas</li>
          <li>• Remove standing water around your home</li>
          <li>• Wear light-colored clothing</li>
          <li>• Avoid being outdoors at dawn or dusk</li>
          <li>• Use After Bite Gel for immediate relief</li>
        </ul>
      </div>

      <div className="pesky-card p-4">
        <h3 className="text-lg font-semibold text-emerald-300">
          Product Suggestions
        </h3>
        <p className="text-slate-300 text-sm mt-2">
          The PESKY product line is optimized for a variety of outdoor 
          environments—from the Florida coastline to mountain trails. Future versions 
          will include smart recommendations based on local weather.
        </p>
      </div>
    </div>
  );
}
