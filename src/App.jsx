import React, { useState } from "react";
import BugEncyclopedia from "./components/BugEncyclopedia";
import BugDetail from "./components/BugDetail";
import Dashboard from "./components/Dashboard";
import BottomNav from "./components/BottomNav";
import MapVisualization from "./components/MapVisualization";
import BugGuide from "./components/BugGuide";

export default function App() {
  const [selectedBug, setSelectedBug] = useState(null);
  const [tab, setTab] = useState("dashboard"); 

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      {/* Header only shows when not looking at a specific bug */}
      {!selectedBug && (
        <header className="fixed top-0 left-0 w-full z-[100] bg-emerald-700 p-4 shadow-xl">
          <h1 className="text-white font-black text-center text-xl tracking-tighter uppercase">PESKY®</h1>
        </header>
      )}

      <main className={!selectedBug ? "pt-20 pb-24" : ""}>
        {selectedBug ? (
          <BugDetail bug={selectedBug} onBack={() => setSelectedBug(null)} />
        ) : (
          <div className="animate-in fade-in duration-500">
            {/* THIS IS THE LOGIC THAT SWITCHES THE SCREENS */}
            {tab === "dashboard" && <Dashboard />}
            {tab === "bugs" && <BugEncyclopedia onSelectBug={(bug) => setSelectedBug(bug)} />}
            {tab === "map" && <MapVisualization />}
            {tab === "guide" && <BugGuide />}
            
            {/* Placeholder for Protection until we build it */}
            {tab === "protection" && (
              <div className="p-10 text-center text-slate-500 font-bold uppercase text-[10px] tracking-widest">
                Protection Tips Coming Soon
              </div>
            )}
          </div>
        )}
      </main>

      {/* The Bottom Nav must tell the App which tab is active */}
      {!selectedBug && <BottomNav tab={tab} setTab={setTab} />}
    </div>
  );
}
