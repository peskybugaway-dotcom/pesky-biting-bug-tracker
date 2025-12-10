import React from "react";
import { Bug, Sunrise, Sunset, Moon, Sun, MapPin, Shield } from "lucide-react";

export default function BugEncyclopedia() {
  const bugs = [
    {
      name: "Mosquito",
      icon: <Bug className="w-6 h-6 text-red-400" />,
      activity: "Sunset & Night",
      severity: "High",
      hotspots: "FL, TX, LA, GA, SC",
      notes:
        "Thrives in warm, humid areas. Rapid population growth 24–48 hours after rainfall.",
      tips: ["Use Bug Away Spray", "Drain standing water", "Use fans outdoors"],
    },
    {
      name: "No-See-Ums (Biting Midges)",
      icon: <Moon className="w-6 h-6 text-purple-400" />,
      activity: "Sunrise, Sunset, Night",
      severity: "Severe",
      hotspots: "Coastal FL, SC, NC, Gulf Coast",
      notes:
        "Extremely small (1–3mm). Peak activity at dawn, dusk, and humid evenings.",
      tips: ["Apply No-See-Um Defense", "Use fine mesh screens", "Avoid beaches at dusk"],
    },
    {
      name: "Horse Fly",
      icon: <Sun className="w-6 h-6 text-yellow-400" />,
      activity: "Daytime",
      severity: "Severe",
      hotspots: "Wetlands, lakes, rivers, Florida marshes",
      notes:
        "Strong fliers and painful biters. Active on bright sunny days, especially near water.",
      tips: ["Use Bug Away", "Wear light clothing", "Avoid reflective surfaces"],
    },
    {
      name: "Sand Flea",
      icon: <MapPin className="w-6 h-6 text-emerald-300" />,
      activity: "Sunrise & Sunset",
      severity: "Moderate",
      hotspots: "Beaches, coastal parks, dunes",
      notes:
        "More common in damp beach areas. Bites appear in clustered patterns on legs/ankles.",
      tips: ["Rinse legs after beach walks", "Use No-See-Um Defense", "Avoid wet sand areas"],
    },
    {
      name: "Black Fly",
      icon: <Sunrise className="w-6 h-6 text-sky-400" />,
      activity: "Morning & Afternoon",
      severity: "High",
      hotspots: "Lakes, rivers, streams (North & Southeast)",
      notes:
        "Small but relentless. They prefer moving water and humid forested areas.",
      tips: ["Use Bug Away", "Wear protective clothing", "Avoid shady, wooded areas"],
    },
  ];

  return (
    <div className="p-4 max-w-xl mx-auto space-y-6 pb-20">

      <div className="pesky-card">
        <h1 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <Bug className="w-6 h-6" /> Bug Encyclopedia
        </h1>
        <p className="text-slate-300 text-sm mt-1">
          Learn how each pest behaves, when they bite, and how to protect yourself.
        </p>
      </div>

      {bugs.map((b, i) => (
        <div key={i} className="pesky-card space-y-2">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-white">{b.name}</h2>
            {b.icon}
          </div>

          <div className="text-slate-300 text-sm">
            <p><strong>Activity:</strong> {b.activity}</p>
            <p><strong>Bite Severity:</strong> {b.severity}</p>
            <p><strong>U.S. Hotspots:</strong> {b.hotspots}</p>
            <p className="mt-1">{b.notes}</p>
          </div>

          <div className="mt-2">
            <h3 className="text-emerald-300 font-semibold flex items-center gap-2">
              <Shield className="w-4 h-4" /> Protection Tips
            </h3>
            <ul className="text-slate-300 text-sm list-disc pl-5 mt-1">
              {b.tips.map((t, j) => (
                <li key={j}>{t}</li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
}
