import React, { useState } from "react";
import BugEncyclopedia from "./components/BugEncyclopedia";
import BugDetail from "./components/BugDetail";
import Dashboard from "./components/Dashboard";
import BottomNav from "./components/BottomNav";

export default function App() {
  const [selectedBug, setSelectedBug] = useState(null);
  // This must match the ID "dashboard" in your BottomNav.jsx
  const [tab, setTab] = useState("dashboard"); 

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      {/* 1. TOP HEADER (Hidden when viewing bug details) */}
      {!selectedBug && (
        <header className="fixed top-0 left-0 w-full z-[100] bg-emerald-700 p-4 shadow-xl">
          <h1 className="text-white font-black text-center text-xl tracking-tighter">PESKY®</h1>
        </header>
      )}

      {/* 2. MAIN CONTENT AREA */}
      <main className={!selectedBug ? "pt-20 pb-24" : ""}>
        {selectedBug ? (
          /* Show details if a bug is clicked */
          <BugDetail bug={selectedBug} onBack={() => setSelectedBug(null)} />
        ) : (
          /* Otherwise, switch between tabs based on BottomNav */
          <>
            {tab === "dashboard" && <Dashboard />}
            {tab === "bugs" && (
              <BugEncyclopedia onSelectBug={(bug) => setSelectedBug(bug)} />
            )}
            {/* These show simple messages until you build those pages */}
            {tab === "map" && <div className="p-10 text-center text-slate-500">Map coming soon...</div>}
            {tab === "protection" && <div className="p-10 text-center text-slate-500">Protection guide coming soon...</div>}
            {tab === "guide" && <div className="p-10 text-center text-slate-500">Treatment guide coming soon...</div>}
          </>
        )}
      </main>

      {/* 3. BOTTOM NAVIGATION (Hidden when viewing bug details) */}
      {!selectedBug && (
        <BottomNav tab={tab} setTab={setTab} />
      )}
    </div>
  );
}
