// src/components/BugSoundPlayer.jsx
import React from "react";
import { Play } from "lucide-react";

export default function BugSoundPlayer({ bug }) {
  const audioMap = {
    mosquito: "/sounds/mosquito.mp3",
    noseeum: "/sounds/noseeum.mp3",
    fly: "/sounds/fly.mp3",
  };

  const key = bug.type.toLowerCase().includes("mosquito")
    ? "mosquito"
    : bug.type.toLowerCase().includes("midge")
    ? "noseeum"
    : bug.type.toLowerCase().includes("fly")
    ? "fly"
    : null;

  if (!key || !audioMap[key]) return null;

  const play = () => new Audio(audioMap[key]).play();

  return (
    <div className="pesky-card p-5 space-y-3">
      <h3 className="text-lg font-bold text-emerald-300">
        Wingbeat Sound (ID Pattern)
      </h3>

      <button
        onClick={play}
        className="flex items-center gap-2 px-4 py-2 bg-slate-700 rounded-lg"
      >
        <Play className="w-4 h-4 text-emerald-300" />
        Play Sound
      </button>

      <p className="text-xs text-slate-400">
        Useful for field identification — insects have species-specific
        frequencies.
      </p>
    </div>
  );
}
