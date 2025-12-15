// src/components/BitePhotos.jsx
import React, { useState } from "react";

export default function BitePhotos({ images = [] }) {
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
              alt="Bite reaction"
            />
          ))}
        </div>
      )}
    </div>
  );
}
