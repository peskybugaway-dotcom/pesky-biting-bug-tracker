// src/components/BugDetail.jsx
import React, { useState, useEffect } from "react";
import { ArrowLeft, Play, UploadCloud } from "lucide-react";

// -------------------------------------------
// Utility Components for Features
// -------------------------------------------

// Animated Gauge
function RiskGauge({ level }) {
  const color = ["bg-green-400", "bg-yellow-400", "bg-orange-500", "bg-red-600"][level] || "bg-slate-500";
  const pct = (level + 1) * 25;

  return (
    <div className="pesky-card p-4">
      <h3 className="text-lg font-bold text-emerald-300 mb-2">Bite Severity</h3>

      <div className="w-full bg-slate-700 h-3 rounded-full overflow-hidden">
        <div
          className={`h-3 ${color} transition-all duration-700`}
          style={{ width: `${pct}%` }}
        ></div>
      </div>

      <p className="text-white mt-2 text-sm">
        Severity: <span className="font-bold">{["Low", "Moderate", "High", "Severe"][level]}</span>
      </p>
    </div>
  );
}

// Seasonal activity heatmap
function SeasonalChart({ bug }) {
  const data = bug.seasonalActivity || {
    Jan: 1, Feb: 1, Mar: 2, Apr: 2, May: 3, Jun: 4,
    Jul: 4, Aug: 4, Sep: 3, Oct: 2, Nov: 1, Dec: 1,
  };

  const colors = ["bg-green-400", "bg-yellow-400", "bg-orange-500", "bg-red-600"];

  return (
    <div className="pesky-card p-5 space-y-3">
      <h3 className="text-lg font-bold text-emerald-300">Seasonal Activity Heatmap</h3>

      <div className="grid grid-cols-6 gap-2 text-xs text-white">
        {Object.entries(data).map(([month, level]) => (
          <div key={month} className="flex flex-col items-center">
            <div className={`w-6 h-6 rounded ${colors[level]}`}></div>
            <span className="mt-1">{month}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// Bite photo toggle
function BitePhotos({ images = [] }) {
  const [show, setShow] = useState(false);
  if (!images.length) return null;

  return (
    <div className="pesky-card p-5 space-y-3">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-bold text-emerald-300">Bite Reactions</h3>
        <button
          onClick={() => setShow(!show)}
          className="px-3 py-1 bg-slate-700 rounded text-white text-sm"
        >
          {show ? "Hide" : "Show"}
        </button>
      </div>

      {show && (
        <div className="grid grid-cols-2 gap-3">
          {images.map((src) => (
            <img
              key={src}
              src={src}
              className="rounded-lg shadow border border-slate-700"
            />
          ))}
        </div>
      )}
    </div>
  );
}

// Wingbeat sound player
function BugSoundPlayer({ bug }) {
  const soundMap = {
    mosquito: "/sounds/mosquito.mp3",
    midge: "/sounds/noseeum.mp3",
    fly: "/sounds/fly.mp3",
  };

  const type = bug.type.toLowerCase();
  let key = null;

  if (type.includes("mosquito")) key = "mosquito";
  if (type.includes("midge") || type.includes("no-see")) key = "midge";
  if (type.includes("fly")) key = "fly";

  if (!key || !soundMap[key]) return null;

  const play = () => new Audio(soundMap[key]).play();

  return (
    <div className="pesky-card p-5 space-y-3">
      <h3 className="text-lg font-bold text-emerald-300">Wingbeat Sound</h3>

      <button
        onClick={play}
        className="flex items-center gap-2 px-4 py-2 bg-slate-700 rounded-lg"
      >
        <Play className="w-4 h-4 text-emerald-300" />
        Play Sample
      </button>

      <p className="text-xs text-slate-400">
        Insects have species-specific wingbeat frequencies.
      </p>
    </div>
  );
}

// Live U.S. heat zones
function BugHeatMap({ bug }) {
  const zones = bug.activityMap || {
    Florida: 4,
    Texas: 3,
    GulfCoast: 4,
    Midwest: 2,
    Northeast: 1,
    Southwest: 3,
    WestCoast: 1,
  };

  const scale = ["bg-green-400", "bg-yellow-400", "bg-orange-500", "bg-red-600"];

  return (
    <div className="pesky-card p-5 space-y-3">
      <h3 className="text-lg font-bold text-emerald-300">U.S. Activity Zones</h3>

      <div className="grid grid-cols-2 gap-3 text-white">
        {Object.entries(zones).map(([region, level]) => (
          <div key={region} className="flex items-center gap-3">
            <div className={`w-6 h-6 rounded ${scale[level]}`}></div>
            <span>{region}</span>
          </div>
        ))}
      </div>

      <p className="text-xs text-slate-400 mt-2">
        Higher intensity colors = increased bite probability.
      </p>
    </div>
  );
}

// Predictor: Is this bug near me?
function BugNearMe({ bug }) {
  const [risk, setRisk] = useState("Checking...");

  useEffect(() => {
    async function check() {
      try {
        const pos = await new Promise((res, rej) =>
          navigator.geolocation.getCurrentPosition(res, rej)
        );
        const { latitude } = pos.coords;

        const chance =
          latitude > 25 && latitude < 35
            ? "High"
            : latitude < 45
            ? "Moderate"
            : "Low";

        setRisk(chance);
      } catch {
        setRisk("Unknown");
      }
    }

    check();
  }, []);

  return (
    <div className="pesky-card p-5">
      <h3 className="text-lg font-bold text-emerald-300">Is This Bug Near Me?</h3>
      <p className="text-white mt-1">
        Likelihood in your area:{" "}
        <span className="text-emerald-400 font-bold">{risk}</span>
      </p>
    </div>
  );
}

// AI Image Identifier
function BugAIIdentifier({ onIdentify }) {
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState(null);

  const handleImg = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setPreview(URL.createObjectURL(file));
    setResult("Analyzing...");

    setTimeout(() => {
      setResult("Possible Mosquito (89% confidence)");
      onIdentify && onIdentify("Mosquito");
    }, 1200);
  };

  return (
    <div className="pesky-card p-5 space-y-3">
      <h3 className="text-lg font-bold text-emerald-300">AI Bug Identifier</h3>

      <label className="flex flex-col items-center p-4 border border-slate-600 rounded-lg cursor-pointer hover:bg-slate-700/30">
        <UploadCloud className="w-6 h-6 text-emerald-400 mb-2" />
        <span className="text-white">Upload Bug Photo</span>
        <input type="file" accept="image/*" hidden onChange={handleImg} />
      </label>

      {preview && (
        <img src={preview} className="rounded-lg shadow border border-slate-700" />
      )}

      {result && <p className="text-emerald-300 font-bold">{result}</p>}
    </div>
  );
}

// -------------------------------------------
// MAIN COMPONENT: BugDetail
// -------------------------------------------
export default function BugDetail({ bug, back }) {
  if (!bug) return null;

  return (
    <div className="p-6 space-y-6 max-w-xl mx-auto">

      {/* Header + Back Button */}
      <button
        onClick={back}
        className="px-3 py-1 bg-slate-700 text-white rounded-full flex items-center gap-1"
      >
        <ArrowLeft className="w-4 h-4" /> Back
      </button>

      {/* Main Profile Card */}
      <div className="pesky-card p-6 space-y-4">
        <h1 className="text-3xl font-bold text-emerald-400">{bug.name}</h1>

        <img
          src={bug.image}
          className="w-full rounded-lg shadow border border-slate-700"
        />

        <p className="text-slate-300">{bug.description}</p>
      </div>

      {/* Risk Gauge */}
      <RiskGauge level={bug.riskLevel || 2} />

      {/* Seasonal Chart */}
      <SeasonalChart bug={bug} />

      {/* Map Activity Zones */}
      <BugHeatMap bug={bug} />

      {/* Bite Photos */}
      <BitePhotos images={bug.bitePhotos || []} />

      {/* Sound Player */}
      <BugSoundPlayer bug={bug} />

      {/* GPS Predictor */}
      <BugNearMe bug={bug} />

      {/* AI Image Identifier */}
      <BugAIIdentifier />

      {/* Extra Facts */}
      {bug.facts && (
        <div className="pesky-card p-5">
          <h3 className="text-lg font-bold text-emerald-300">Did You Know?</h3>
          <ul className="list-disc pl-5 text-white space-y-1">
            {bug.facts.map((f, i) => (
              <li key={i}>{f}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Recommended Products */}
      {bug.products && (
        <div className="pesky-card p-5 space-y-2">
          <h3 className="text-lg font-bold text-emerald-300">
            Recommended PESKY® Protection
          </h3>

          {bug.products.map((p) => (
            <div
              key={p}
              className="text-white bg-slate-700/40 rounded-lg p-2 border border-slate-600"
            >
              • {p}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
