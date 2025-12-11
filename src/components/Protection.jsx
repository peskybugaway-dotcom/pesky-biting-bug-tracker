import React from "react";
import { ShieldCheck, Sparkles, Droplet, Wind, Sun, Leaf } from "lucide-react";

export default function Protection() {
  return (
    <div className="p-6 space-y-6 max-w-xl mx-auto">

      <h2 className="pesky-title">Prevention & Protection</h2>

      <div className="space-y-4">
        <div className="pesky-card p-4 flex items-center gap-3">
          <ShieldCheck className="text-emerald-400 w-6 h-6" />
          <p className="text-white">Use proven insect repellents.</p>
        </div>

        <div className="pesky-card p-4 flex items-center gap-3">
          <Droplet className="text-sky-400 w-6 h-6" />
          <p className="text-white">Reduce standing water sources.</p>
        </div>

        <div className="pesky-card p-4 flex items-center gap-3">
          <Wind className="text-gray-300 w-6 h-6" />
          <p className="text-white">Wind helps reduce biting insect activity.</p>
        </div>

        <div className="pesky-card p-4 flex items-center gap-3">
          <Sun className="text-yellow-400 w-6 h-6" />
          <p className="text-white">Peak attacks occur at sunrise & sunset.</p>
        </div>

        <div className="pesky-card p-4 flex items-center gap-3">
          <Leaf className="text-green-300 w-6 h-6" />
          <p className="text-white">Wear long sleeves near vegetation.</p>
        </div>

        <div className="pesky-card p-4 flex items-center gap-3">
          <Sparkles className="text-purple-300 w-6 h-6" />
          <p className="text-white">Use protective sprays & treatments.</p>
        </div>
      </div>

    </div>
  );
}
