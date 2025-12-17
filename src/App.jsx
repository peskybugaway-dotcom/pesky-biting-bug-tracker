import React, { useState, useEffect } from "react";
import BugEncyclopedia from "./components/BugEncyclopedia";
import BugDetail from "./components/BugDetail";
// Import other tabs as you create them
// import Dashboard from "./components/Dashboard";

export default function App() {
  const [tab, setTab] = useState("bugs"); 
  const [selectedBug, setSelectedBug] = useState(null);

  // 1. NAVIGATION LOGIC
  const renderScreen = () => {
    // If a bug is selected, show Detail view.
    // We pass setSelectedBug(null) to the onBack prop to "close" the detail.
    if (selectedBug) {
      return (
        <BugDetail 
          bug={selectedBug} 
          onBack={() => setSelectedBug(null)} 
        />
      );
    }

    // Otherwise, show the main tabs
    switch (tab) {
      case "bugs":
        return <BugEncyclopedia onSelectBug={(bug) => setSelectedBug(bug)} />;
      case "dashboard":
        return (
          <div className="flex flex-col items-center justify-center h-64 text-slate-500">
            <p>Dashboard View</p>
          </div>
        );
      default:
        return <BugEncyclopedia onSelectBug={(bug) => setSelectedBug(bug)} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 font-sans antialiased text-slate-200">
      
      {/* 2. DYNAMIC HEADER (Hide when in Detail view to save space) */}
      {!selectedBug && (
        <header className="fixed top-0 left-0 w-full z-[100] border-b border-white/10 bg-emerald-700 shadow-2xl">
          <div className="max-w-xl mx-auto p-4 text-center">
            <h1 className="text-xl font-black text-white tracking-tighter uppercase">
              PESKY<span className="font-light">®</span>
            </h1>
          </div>
        </header>
      )}

      {/* 3. MAIN CONTENT AREA */}
      <main className={!selectedBug ? "pt-20 pb-24" : ""}>
        {renderScreen()}
      </main>

      {/* 4. BOTTOM NAVIGATION (Hide when in Detail view) */}
      {!selectedBug && (
        <nav className="fixed bottom-0 left-0 w-full bg-slate-900/90 backdrop-blur-lg border-t border-white/5 p-4 z-[100]">
          <div className="max-w-xl mx-auto flex justify-around items-center">
            <button 
              onClick={() => setTab("dashboard")}
              className={`text-[10px] font-black tracking-widest transition-colors ${
                tab === "dashboard" ? "text-emerald-400" : "text-slate-500"
              }`}
            >
              HOME
            </button>
            <button 
              onClick={() => setTab("bugs")}
              className={`text-[10px] font-black tracking-widest transition-colors ${
                tab === "bugs" ? "text-emerald-400" : "text-slate-500"
              }`}
            >
              LIBRARY
            </button>
          </div>
        </nav>
      )}
    </div>
  );
}
