import React, { useState } from "react";
// We are pointing exactly to the components folder where your updates are
import Dashboard from "./components/Dashboard";
import BugEncyclopedia from "./components/BugEncyclopedia";
import BugDetail from "./components/BugDetail";
import MapVisualization from "./components/MapVisualization";
import BugGuide from "./components/BugGuide";
import BottomNav from "./components/BottomNav";

export default function App() {
  const [selectedBug, setSelectedBug] = useState(null);
  const [activeTab, setActiveTab] = useState("dashboard"); 

  const handleTabChange = (newTab) => {
    setActiveTab(newTab);
    setSelectedBug(null); 
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans">
      {/* PESKY Header */}
      {!selectedBug && (
        <header className="fixed top-0 left-0 w-full z-[100] bg-emerald-700 p-4 shadow-xl">
          <h1 className="text-white font-black text-center text-xl tracking-tighter uppercase italic">PESKY®</h1>
        </header>
      )}

      <main className={!selectedBug ? "pt-20 pb-24" : ""}>
        {selectedBug ? (
          <BugDetail bug={selectedBug} onBack={() => setSelectedBug(null)} />
        ) : (
          <div className="animate-in fade-in duration-500">
            {activeTab === "dashboard" && <Dashboard />}
            {activeTab === "bugs" && <BugEncyclopedia onSelectBug={(bug) => setSelectedBug(bug)} />}
            {activeTab === "map" && <MapVisualization />}
            {activeTab === "guide" && <BugGuide />}
          </div>
        )}
      </main>

      {!selectedBug && <BottomNav tab={activeTab} setTab={handleTabChange} />}
    </div>
  );
}
