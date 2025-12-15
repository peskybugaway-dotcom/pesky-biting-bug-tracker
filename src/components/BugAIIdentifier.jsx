// src/components/BugAIIdentifier.jsx
import React, { useState } from "react";
import { UploadCloud } from "lucide-react";

export default function BugAIIdentifier({ onIdentify }) {
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState(null);

  const handleImg = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setPreview(URL.createObjectURL(file));
    setResult("Analyzing...");

    // Fake AI logic — replace with OpenAI Vision API later
    setTimeout(() => {
      setResult("Likely Mosquito (92% confidence)");
      onIdentify && onIdentify("Mosquito");
    }, 1200);
  };

  return (
    <div className="pesky-card p-5 space-y-3">
      <h3 className="text-lg font-bold text-emerald-300">
        AI Bug Identifier
      </h3>

      <label className="flex flex-col items-center p-4 border border-slate-600 rounded-lg cursor-pointer hover:bg-slate-700/30">
        <UploadCloud className="w-6 h-6 text-emerald-400 mb-2" />
        <span className="text-white">Upload Insect Photo</span>
        <input type="file" accept="image/*" hidden onChange={handleImg} />
      </label>

      {preview && (
        <img
          src={preview}
          className="rounded-lg shadow border border-slate-700 mt-2"
        />
      )}

      {result && (
        <p className="text-emerald-300 font-bold">{result}</p>
      )}
    </div>
  );
}
