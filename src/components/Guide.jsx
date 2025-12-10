import React from "react";
import { Sun, CloudRain, Wind, Droplets, ThermometerSun } from "lucide-react";

export default function Guide() {
  return (
    <div className="p-4 max-w-xl mx-auto space-y-6">

      {/* TITLE CARD */}
      <div className="pesky-card">
        <h2 className="text-2xl font-bold text-emerald-400">
          Bug Activity Guide
        </h2>
        <p className="text-slate-300 mt-1 text-sm">
          Understand how weather conditions influence mosquitoes, no-see-ums,
          biting flies, and other pests.
        </p>
      </div>

      {/* SECTION: Temperature */}
      <div className="pesky-card flex gap-4">
        <ThermometerSun className="w-10 h-10 text-amber-400" />
        <div>
          <h3 className="font-bold text-white">Temperature</h3>
          <p className="text-slate-300 text-sm">
            Most biting insects become highly active when temperatures exceed
            <span className="text-amber-300 font-semibold"> 80°F</span>.  
            Peak activity happens around
            <span className="text-red-400 font-semibold"> 88–95°F</span>.
          </p>
        </div>
      </div>

      {/* SECTION: Humidity */}
      <div className="pesky-card flex gap-4">
        <Droplets className="w-10 h-10 text-sky-400" />
        <div>
          <h3 className="font-bold text-white">Humidity</h3>
          <p className="text-slate-300 text-sm">
            High humidity accelerates insect breeding and movement.  
            Risk sharply increases above
            <span className="text-sky-300 font-semibold"> 70% humidity</span>.
          </p>
        </div>
      </div>

      {/* SECTION: Wind */}
      <div className="pesky-card flex gap-4">
        <Wind className="w-10 h-10 text-indigo-400" />
        <div>
          <h3 className="font-bold text-white">Wind Speed</h3>
          <p className="text-slate-300 text-sm">
            Light winds under
            <span className="text-indigo-300 font-semibold"> 5 mph</span>
            allow mosquitoes and no-see-ums to fly freely.  
            Activity drops significantly above
            <span className="text-indigo-300 font-semibold"> 12 mph</span>.
          </p>
        </div>
      </div>

      {/* SECTION: Rain */}
      <div className="pesky-card flex gap-4">
        <CloudRain className="w-10 h-10 text-blue-400" />
        <div>
          <h3 className="font-bold text-white">Rain & Standing Water</h3>
          <p className="text-slate-300 text-sm">
            After rainfall, mosquito populations explode due to new standing
            water breeding sites. Within 48 hours, activity can double.
          </p>
        </div>
      </div>

      {/* SECTION: Day vs Night */}
      <div className="pesky-card flex gap-4">
        <Sun className="w-10 h-10 text-yellow-400" />
        <div>
          <h3 className="font-bold text-white">Time of Day</h3>
          <p className="text-slate-300 text-sm">
            No-see-ums peak near dawn & dusk.  
            Mosquitoes peak at dusk, night, and early morning.  
            Biting flies increase during bright daytime heat.
          </p>
        </div>
      </div>

      {/* SUMMARY CARD */}
      <div className="pesky-card">
        <h3 className="font-bold text-emerald-400 mb-1">Quick Summary</h3>
        <ul className="text-slate-300 text-sm space-y-1">
          <li>• Hot + humid + low wind = **highest risk**</li>
          <li>• Breezy conditions reduce biting significantly</li>
          <li>• After rain, mosquito activity spikes fast</li>
          <li>• No-see-ums thrive in calm, humid conditions</li>
        </ul>
      </div>

    </div>
  );
}
