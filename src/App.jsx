import React, { useState } from "react";
import BugEncyclopedia from "./components/BugEncyclopedia";
import BugDetail from "./components/BugDetail";
import Dashboard from "./components/Dashboard";
import BottomNav from "./components/BottomNav";

export default function App() {
  const [selectedBug, setSelectedBug] = useState(null);
  const [activeTab, setActiveTab] = useState("home"); // "home" shows Dashboard

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      {/* HEADER: Only show if we aren't looking at a specific bug */}
      {!selectedBug && (
        <header className="fixed top-0 left-0 w-full z-[100] bg-emerald-700 p-4 shadow-xl">
          <h1 className="text-white font-black text-center text-xl tracking-tighter">
            PESKY®
          </h1>
        </header>
      )}

      <main className={!selectedBug ? "pt-20 pb-24" : ""}>
        {selectedBug ? (
          /* 1. DETAIL VIEW (Highest Priority) */
          <BugDetail 
            bug={selectedBug} 
            onBack={() => setSelectedBug(null)} 
          />
        ) : (
          /* 2. TAB SELECTION */
          <>
            {activeTab === "home" ? (
              <Dashboard /> 
            ) : (
              <BugEncyclopedia onSelectBug={(bug) => setSelectedBug(bug)} />
            )}
          </>
        )}
      </main>

      {/* 3. BOTTOM NAV: Controlled by setActiveTab */}
      {!selectedBug && (
        <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
      )}
    </div>
  );
}
