import React, { useState } from "react";
import { ArrowLeft, AlertCircle, Send } from "lucide-react";

/* -----------------------------------------------------------
   DATA LOOKUPS
----------------------------------------------------------- */
const severityLevels = {
  Severe: 4,
  High: 3,
  Moderate: 2,
  Low: 1,
};

const seasonalActivity = {
  mosquito: [2, 2, 3, 3, 4, 4, 4, 4, 3, 2, 1, 1],
  noseeum:  [1, 1, 2, 3, 4, 4, 4, 4, 3, 2, 1, 1],
  bitingfly:[0, 0, 1, 2, 4, 4, 4, 3, 2, 1, 0, 0],
  midge:    [1, 1, 2, 3, 4, 4, 4, 4, 3, 2, 1, 1],
  fireant:  [1, 1, 2, 3, 4, 4, 4, 4, 3, 2, 1, 1],
  tick:     [1, 1, 2, 3, 4, 4, 4, 3, 2, 2, 1, 1],
};

const protectionSteps = {
  mosquito: [
    "Use PESKY® Bug Away Spray before going outside",
    "Avoid dusk and dawn if possible",
    "Remove standing water near your home",
  ],
  noseeum: [
    "Apply PESKY® Bug Away Heavy Duty",
    "Increase wind flow with fans",
    "Close windows without micro-screen mesh",
  ],
  bitingfly: [
    "Wear light-colored clothing",
    "Use PESKY® Bug Away Spray",
    "Avoid shiny surfaces outdoors",
  ],
  fireant: [
    "Use PESKY® Ant Defense around mound areas",
    "Do not disturb ant hills",
    "Wear closed shoes in grassy areas",
  ],
  tick: [
    "Apply PESKY® Bug Away to shoes and socks",
    "Avoid tall grass",
    "Shower and check body after hiking",
  ],
};

const similarities = {
  mosquito: ["No-See-Um", "Sand Fly"],
  noseeum: ["Mosquito", "Sand Fly"],
  bitingfly: ["Horsefly", "Deer Fly"],
  fireant: ["Carpenter Ant"],
  tick: ["Deer Tick", "Lone Star Tick"],
};

/* -----------------------------------------------------------
   COMPONENT
----------------------------------------------------------- */
export default function BugDetail({ bug, back }) {
  const key = bug.type.toLowerCase().includes("mosquito")
    ? "mosquito"
    : bug.type.toLowerCase().includes("midge")
    ? "noseeum"
    : bug.type.toLowerCase().includes("fly")
    ? "bitingfly"
    : bug.type.toLowerCase().includes("ant")
    ? "fireant"
    : bug.type.toLowerCase().includes("tick")
    ? "tick"
    : "mosquito";

  const severity = severityLevels[bug.danger] || 1;
  const heatmap = seasonalActivity[key];
  const steps = protectionSteps[key];
  const similars = similarities[key];

  const [messageSent, setMessageSent] = useState(false);

  return (
    <div className="p-6 max-w-xl mx-auto space-y-6">

      {/* Back Button */}
      <button
        onClick={back}
        className="flex items-center gap-2 px-4 py-2 bg-slate-700 
                  hover:bg-slate-600 rounded-full text-white transition"
      >
        <ArrowLeft className="w-4 h-4" />
        Back
      </button>

      {/* MAIN CARD */}
      <div className="pesky-card p-6 space-y-4">
        <h1 className="text-3xl font-bold text-emerald-400">{bug.name}</h1>

        {bug.image && (
          <img
            src={bug.image}
            className="w-full rounded-lg shadow-lg border border-slate-700"
          />
        )}

        <p className="text-slate-300">{bug.description}</p>
      </div>

      {/* 🔥 Bite Severity Meter */}
      <div className="pesky-card p-5 space-y-3">
        <h3 className="text-lg font-bold text-red-400">Bite Severity</h3>

        <div className="flex gap-2">
          {[1, 2, 3, 4].map((lvl) => (
            <div
              key={lvl}
              className={`h-4 flex-1 rounded transition-all ${
                lvl <= severity ? "bg-red-500" : "bg-slate-700"
              }`}
            ></div>
          ))}
        </div>

        <p className="text-sm text-slate-300">
          Severity Level: <span className="text-white">{bug.danger}</span>
        </p>
      </div>

      {/* 🔥 Seasonal Heatmap */}
      <div className="pesky-card p-5">
        <h3 className="text-lg font-bold text-emerald-300 mb-3">Seasonal Activity</h3>

        <div className="grid grid-cols-12 gap-1">
          {heatmap.map((lvl, i) => (
            <div
              key={i}
              className={`h-6 rounded transition-all ${
                ["bg-slate-700", "bg-green-400", "bg-yellow-400", "bg-orange-500", "bg-red-500"][lvl]
              }`}
            ></div>
          ))}
        </div>

        <div className="grid grid-cols-12 text-[10px] text-center mt-1 text-slate-400">
          {["J","F","M","A","M","J","J","A","S","O","N","D"].map((m) => (
            <span key={m}>{m}</span>
          ))}
        </div>
      </div>

      {/* 🔥 Protection Steps */}
      <div className="pesky-card p-5">
        <h3 className="text-lg font-bold text-emerald-300 mb-3">How to Protect Yourself</h3>

        <ul className="list-disc ml-5 space-y-1 text-white">
          {steps.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ul>
      </div>

      {/* 🔥 Similar Insects */}
      <div className="pesky-card p-5">
        <h3 className="text-lg font-bold text-emerald-300 mb-3">Similar Insects</h3>

        {similars.map((name) => (
          <div key={name} className="p-2 bg-slate-700/40 rounded mb-1">
            {name}
          </div>
        ))}
      </div>

      {/* 🔥 Report Sighting */}
      <div className="pesky-card p-5 text-center">
        {!messageSent ? (
          <button
            onClick={() => setMessageSent(true)}
            className="pesky-btn flex items-center gap-2 mx-auto"
          >
            <Send className="w-4 h-4" /> Report Sighting
          </button>
        ) : (
          <p className="text-emerald-400 font-bold">
            ✓ Thank you! Sighting recorded.
          </p>
        )}
      </div>
    </div>
  );
}
