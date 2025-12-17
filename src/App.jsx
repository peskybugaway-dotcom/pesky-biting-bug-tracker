import React, { useState } from "react";
import BugEncyclopedia from "./components/BugEncyclopedia";
import BugDetail from "./components/BugDetail";
import Dashboard from "./components/Dashboard";
import BottomNav from "./components/BottomNav";

export default function App() {
  const [selectedBug, setSelectedBug] = useState(null);
  const [tab, setTab] = useState("dashboard"); 

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-emerald-500/30">
      {/* 1. HEADER: Hidden ONLY when a bug is selected to give more room */}
      {!selectedBug && (
        <header className="fixed top-0 left-0 w-full z-[100] bg-emerald-700 p-4 shadow-xl border-b border-emerald-600">
          <h1 className="text-white font-black text-center text-xl tracking-tighter uppercase">PESKY®</h1>
        </header>
      )}

      {/* 2. MAIN CONTENT AREA */}
      <main className={!selectedBug ? "pt-20 pb-24" : ""}>
        {/* IF A BUG IS SELECTED: Show ONLY the detail page */}
        {selectedBug ? (
          <BugDetail 
            bug={selectedBug} 
            onBack={() => setSelectedBug(null)} 
          />
        ) : (
          /* IF NO BUG IS SELECTED: Show the Tabs */
          <>
            {tab === "dashboard" && <Dashboard />}
            
            {tab === "bugs" && (
              <BugEncyclopedia onSelectBug={(bug) => setSelectedBug(bug)} />
            )}
            
            {/* Simple Placeholders for other tabs */}
            {tab === "map" && <div className="flex items-center justify-center h-[60vh] text-slate-500 font-black text-[10px] tracking-widest uppercase">Map Coming Soon</div>}
            {tab === "protection" && <div className="flex items-center justify-center h-[60vh] text-slate-500 font-black text-[10px] tracking-widest uppercase">Shield Coming Soon</div>}
            {tab === "guide" && <div className="flex items-center justify-center h-[60vh] text-slate-500 font-black text-[10px] tracking-widest uppercase">Guide Coming Soon</div>}
          </>
        )}
      </main>

      {/* 3. BOTTOM NAVIGATION: Hidden when viewing bug details */}
      {!selectedBug && (
        <BottomNav tab={tab} setTab={setTab} />
      )}
    </div>
  );
}
