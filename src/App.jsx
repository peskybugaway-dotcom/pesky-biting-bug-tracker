import React, { useState } from "react";
import BugEncyclopedia from "./components/BugEncyclopedia";
import BugDetail from "./components/BugDetail";
import Dashboard from "./components/Dashboard";
import BottomNav from "./components/BottomNav";

export default function App() {
  const [selectedBug, setSelectedBug] = useState(null);
  // This MUST be "dashboard" to match your BottomNav IDs
  const [tab, setTab] = useState("dashboard"); 

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans antialiased">
      {/* 1. TOP HEADER (Hidden when viewing bug details) */}
      {!selectedBug && (
        <header className="fixed top-0 left-0 w-full z-[100] bg-emerald-700 p-4 shadow-xl border-b border-emerald-600">
          <h1 className="text-white font-black text-center text-xl tracking-tighter uppercase">PESKY®</h1>
        </header>
      )}

      {/* 2. MAIN CONTENT AREA */}
      <main className={!selectedBug ? "pt-20 pb-24" : "h-screen overflow-y-auto"}>
        {selectedBug ? (
          /* Show details if a bug is clicked */
          <BugDetail bug={selectedBug} onBack={() => setSelectedBug(null)} />
        ) : (
          /* Switch between tabs based on BottomNav IDs */
          <>
            {tab === "dashboard" && <Dashboard />}
            {tab === "bugs" && (
              <BugEncyclopedia onSelectBug={(bug) => setSelectedBug(bug)} />
            )}
            
            {/* These screens now have a simple label so they aren't blank */}
            {tab === "map" && <div className="flex items-center justify-center h-[60vh] text-slate-500 font-black text-[10px] tracking-widest uppercase">Map Coming Soon</div>}
            {tab === "protection" && <div className="flex items-center justify-center h-[60vh] text-slate-500 font-black text-[10px] tracking-widest uppercase">Protection Coming Soon</div>}
            {tab === "guide" && <div className="flex items-center justify-center h-[60vh] text-slate-500 font-black text-[10px] tracking-widest uppercase">Guide Coming Soon</div>}
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
