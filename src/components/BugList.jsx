import React from "react";
import { 
  Bug,
  AlertTriangle,
  Wind,
  Droplets 
} from "lucide-react";

export default function BugList() {
  const bugs = [
    {
      name: "Mosquito",
      icon: <Bug className="text-red-400 w-6 h-6" />,
      activity: "Peak at dawn & dusk",
      dislikes: "Wind > 10mph, dry air",
      risk: "High humidity + heat",
    },
    {
      name: "No-See-Ums",
      icon: <Bug className="text-purple-400 w-6 h-6" />,
      activity: "Dawn, dusk, overcast",
      dislikes: "Wind, dry air",
      risk: "Marshes, standing water",
    },
    {
      name: "Biting Gnats",
      icon: <Bug className="text-slate-300 w-6 h-6" />,
      activity: "Midday heat & dusk",
      dislikes: "Strong wind",
      risk: "Moist soil, calm air",
    },
    {
      name: "Deer Ticks",
      icon: <AlertTriangle className="text-orange-400 w-6 h-6" />,
      activity: "All day in shade",
      dislikes: "Dry heat",
      risk: "Tall grass, woods",
    },
    {
      name: "Biting Flies",
      icon: <Bug className="text-indigo-400 w-6 h-6" />,
      activity: "Midday sun",
      dislikes: "Cool shade",
      risk: "Fields, livestock areas",
    },
  ];

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold text-emerald-400">
        Bug Encyclopedia
      </h2>

      <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-2">
        {bugs.map((bug, i) => (
          <div
            key={i}
            className="bg-slate-800 p-4 rounded-xl border border-slate-700 shadow-lg hover:bg-slate-700 transition"
          >
            <div className="flex gap-3 items-center">
              {bug.icon}
              <div>
                <div className="text-xl font-semibold text-white">
                  {bug.name}
                </div>
                <div className="text-slate-300 text-sm mt-1">
                  <div><Droplets className="w-3 h-3 inline" /> Activity: {bug.activity}</div>
                  <div><Wind className="w-3 h-3 inline" /> Dislikes: {bug.dislikes}</div>
                  <div><AlertTriangle className="w-3 h-3 inline" /> Risk: {bug.risk}</div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
