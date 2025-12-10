import React from "react";

export default function PresetManager({
  presets,
  loadPreset,
  deletePreset,
  close
}) {
  return (
    <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">
      <div className="bg-slate-800 p-6 rounded-xl w-80 border border-slate-700 shadow-xl space-y-4">
        <h2 className="text-xl font-bold text-emerald-400">Saved Locations</h2>

        {presets.length === 0 ? (
          <p className="text-slate-300 text-sm">No saved presets.</p>
        ) : (
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {presets.map((p, i) => (
              <div
                key={i}
                className="flex justify-between items-center bg-slate-700 p-2 rounded"
              >
                <div>
                  <div className="text-white font-semibold">{p.name}</div>
                  <div className="text-slate-300 text-xs">
                    {p.temp}°F | {p.humidity}% | {p.wind} mph
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => loadPreset(i)}
                    className="text-emerald-400 text-sm"
                  >
                    Load
                  </button>
                  <button
                    onClick={() => deletePreset(i)}
                    className="text-red-400 text-sm"
                  >
                    X
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        <button
          onClick={close}
          className="w-full mt-2 px-3 py-1 bg-slate-600 hover:bg-slate-500 rounded text-white"
        >
          Close
        </button>
      </div>
    </div>
  );
}
