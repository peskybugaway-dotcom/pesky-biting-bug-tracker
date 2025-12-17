import React, { useState } from "react";
import BugEncyclopedia from "./components/BugEncyclopedia";
import BugDetail from "./components/BugDetail";

export default function App() {
  const [selectedBug, setSelectedBug] = useState(null);

  return (
    <div className="min-h-screen bg-slate-950">
      {/* 1. THE HEADER - We hide this when a bug is selected so it doesn't block the back button */}
      {!selectedBug && (
        <header className="fixed top-0 left-0 w-full z-[100] bg-emerald-700 p-4 shadow-xl">
          <h1 className="text-white font-black text-center text-xl uppercase tracking-tighter">
            PESKY<span className="font-light">®</span>
          </h1>
        </header>
      )}

      {/* 2. THE MAIN VIEW LOGIC */}
      <main className={!selectedBug ? "pt-20" : ""}>
        {selectedBug ? (
          <BugDetail 
            bug={selectedBug} 
            onBack={() => setSelectedBug(null)} 
          />
        ) : (
          <BugEncyclopedia onSelectBug={(bug) => setSelectedBug(bug)} />
        )}
      </main>
    </div>
  );
}
