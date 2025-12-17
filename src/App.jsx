import React, { useState } from "react";
import BugEncyclopedia from "./components/BugEncyclopedia";
import BugDetail from "./components/BugDetail";
import Dashboard from "./components/Dashboard";
import BottomNav from "./components/BottomNav";

export default function App() {
  // This state controls which bug is being viewed
  const [selectedBug, setSelectedBug] = useState(null);
  // This state controls which tab is active (Home vs Library)
  const [activeTab, setActiveTab] = useState("library");

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      {/* 1. GLOBAL HEADER 
          We hide this when a bug is selected so the Back Button has space */}
      {!selectedBug && (
        <header className="fixed top-0 left-0 w-full z-[100] bg-emerald-700 p-4 shadow-xl">
          <h1 className="text-white font-black text-center text-xl uppercase tracking-tighter">
            PESKY<span className="font-light">®</span>
          </h1>
        </header>
      )}

      {/* 2. MAIN CONTENT AREA */}
      <main className={!selectedBug ? "pt-16 pb-24" : ""}>
        {selectedBug ? (
          /* SHOW BUG DETAILS */
          <BugDetail 
            bug={selectedBug} 
            onBack={() => {
              console.log("Returning to list...");
              setSelectedBug(null);
            }} 
          />
        ) : (
          /* SHOW TABS (DASHBOARD OR LIBRARY) */
          <>
            {activeTab === "home" ? (
              <Dashboard />
            ) : (
              <BugEncyclopedia onSelectBug={(bug) => {
                console.log("Selected Bug:", bug.name);
                setSelectedBug(bug);
              }} />
            )}
          </>
        )}
      </main>

      {/* 3. NAVIGATION 
          Hide the bottom nav when looking at a specific bug for a cleaner look */}
      {!selectedBug && (
        <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
      )}
    </div>
  );
}
