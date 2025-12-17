import React, { useState } from "react";
import BugEncyclopedia from "./components/BugEncyclopedia";
import BugDetail from "./components/BugDetail";
import Dashboard from "./components/Dashboard";
import BottomNav from "./components/BottomNav";

export default function App() {
  const [selectedBug, setSelectedBug] = useState(null);
  // This starts the app on the Dashboard
  const [tab, setTab] = useState("dashboard"); 

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      {/* 1. Header (Hidden during detail view) */}
      {!selectedBug && (
        <header className="fixed top-0 left-0 w-full z-[100] bg-emerald-700 p-4 shadow-xl">
          <h1 className="text-white font-black text-center text-xl tracking-tighter">PESKY®</h1>
        </header>
      )}

      {/* 2. Main Content */}
      <main className={!selectedBug ? "pt-20 pb-24" : ""}>
        {selectedBug ? (
          <BugDetail bug={selectedBug} onBack={() => setSelectedBug(null)} />
        ) : (
          <>
            {/* These IDs must match your BottomNav.jsx exactly */}
            {tab === "dashboard" && <Dashboard />}
            {tab === "bugs" && <BugEncyclopedia onSelectBug={(bug) => setSelectedBug(bug)} />}
            
            {/* Simple placeholders so these screens aren't just black/empty */}
            {tab === "map" && <div className="p-10 text-center text-slate-500 font-bold uppercase tracking-widest">Map Section Coming Soon</div>}
            {tab === "protection" && <div className="p-10 text-center text-slate-500 font-bold uppercase tracking-widest">Protection Section Coming Soon</div>}
            {tab === "guide" && <div className="p-10 text-center text-slate-500 font-bold uppercase tracking-widest">Guide Section Coming Soon</div>}
          </>
        )}
      </main>

      {/* 3. Navigation (Hidden during detail view) */}
      {!selectedBug && (
        <BottomNav tab={tab} setTab={setTab} />
      )}
    </div>
  );
}
