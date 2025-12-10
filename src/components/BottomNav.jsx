import React from "react";

export default function BottomNav({ tab, setTab }) {
  return (
    <div className="fixed bottom-0 left-0 w-full bg-slate-800 p-4 flex justify-around text-white">
      <button onClick={() => setTab("dashboard")}>Dashboard</button>
      <button onClick={() => setTab("guide")}>Guide</button>
      <button onClick={() => setTab("protection")}>Protection</button>
      <button onClick={() => setTab("map")}>Map</button>
    </div>
  );
}
