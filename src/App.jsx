import React, { useState } from "react";
import BugEncyclopedia from "./components/BugEncyclopedia";
import BugDetail from "./components/BugDetail";
import Dashboard from "./components/Dashboard";
import BottomNav from "./components/BottomNav";

export default function App() {
  const [selectedBug, setSelectedBug] = useState(null);
  const [tab, setTab] = useState("dashboard"); 

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      {/* Restore the header only for non-detail views */}
      {!selectedBug && (
        <header className="fixed top-0 left-0 w-full z-[100] bg-emerald-700 p-4 shadow-xl">
          <h1 className="text-white font-black text-center text-xl tracking-tighter">PESKY®</h1>
        </header>
      )}

      <main className={!selectedBug ? "pt-20 pb-24" : ""}>
        {selectedBug ? (
          <BugDetail bug={selectedBug} onBack={() => setSelectedBug(null)} />
        ) : (
          <>
            {tab === "dashboard" && <Dashboard />}
            {tab === "bugs" && <BugEncyclopedia onSelectBug={(bug) => setSelectedBug(bug)} />}
            {/* Minimal placeholders that won't mess up the layout */}
            {tab !== "dashboard" && tab !== "bugs" && (
              <div className="flex items-center justify-center h-[60vh] text-slate-500 font-bold uppercase tracking-widest text-xs">
                Coming Soon
              </div>
            )}
          </>
        )}
      </main>

      {!selectedBug && <BottomNav tab={tab} setTab={setTab} />}
    </div>
  );
}
