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
      {!selectedBug && (
        <header className="fixed top-0 left-0 w-full z-[100] bg-emerald-700 p-4 shadow-xl">
          <h1 className="text-white font-black text-center text-xl tracking-tighter uppercase">PESKY®</h1>
        </header>
      )}

      <main className={!selectedBug ? "pt-20 pb-24" : ""}>
        {selectedBug ? (
          <BugDetail bug={selectedBug} onBack={() => setSelectedBug(null)} />
        ) : (
          <div className="animate-in fade-in duration-300">
            {tab === "dashboard" && <Dashboard />}
            {tab === "bugs" && <BugEncyclopedia onSelectBug={(bug) => setSelectedBug(bug)} />}
            {tab === "map" && <div className="p-10 text-center text-slate-500 uppercase font-black text-[10px] tracking-widest">Map Soon</div>}
            {tab === "protection" && <div className="p-10 text-center text-slate-500 uppercase font-black text-[10px] tracking-widest">Shield Soon</div>}
            {tab === "guide" && <div className="p-10 text-center text-slate-500 uppercase font-black text-[10px] tracking-widest">Guide Soon</div>}
          </div>
        )}
      </main>

      {!selectedBug && <BottomNav tab={tab} setTab={setTab} />}
    </div>
  );
}
