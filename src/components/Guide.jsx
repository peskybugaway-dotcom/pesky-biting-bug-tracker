import React from "react";

export default function Guide() {
  return (
    <div className="space-y-6 p-4 max-w-xl mx-auto">
      <div className="pesky-card p-4">
        <h2 className="pesky-title">Bug Activity Guide</h2>
        <p className="mt-3 text-slate-300 leading-relaxed">
          Warmer temperatures, humidity, and calm wind greatly increase biting 
          insect activity. Use this guide to better understand daily risk and 
          how seasonal changes affect bug behavior.
        </p>
      </div>

      <div className="pesky-card p-4 space-y-3">
        <h3 className="text-lg font-semibold text-emerald-300">What Increases Activity?</h3>
        <ul className="text-slate-300 space-y-1">
          <li>• Temperature above 78°F</li>
          <li>• Humidity above 60%</li>
          <li>• Low wind (under 5 mph)</li>
          <li>• Standing water nearby</li>
          <li>• Dense vegetation or shaded areas</li>
        </ul>
      </div>

      <div className="pesky-card p-4">
        <h3 className="text-lg font-semibold text-emerald-300">Common Biting Pests</h3>
        <p className="text-slate-300 text-sm mt-2">
          Mosquitoes, no-see-ums, biting flies, deer flies, and chiggers all 
          respond differently to environmental conditions. More species will be 
          added to a full bug encyclopedia in the next update.
        </p>
      </div>
    </div>
  );
}
