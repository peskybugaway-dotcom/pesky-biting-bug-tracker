import React, { useState, useEffect } from "react";
import Dashboard from "./components/Dashboard";
import Guide from "./components/Guide";
import Protection from "./components/Protection";
import MapView from "./components/MapView";
import BugEncyclopedia from "./components/BugEncyclopedia";
import BugDetail from "./components/BugDetail";
import BottomNav from "./components/BottomNav";
import { Bug } from "lucide-react";

export default function App() {
  const [tab, setTab] = useState("dashboard");
  const [selectedBug, setSelectedBug] = useState(null);
  const [timeMode, setTimeMode] = useState("day");

  // Reset selected bug when switching tabs to avoid getting "stuck" in detail view
  const handleTabChange = (newTab) => {
    setSelectedBug(null); 
    setTab(newTab);
  };

  // 🌅 Theme Engine based on time of day
  useEffect(() => {
    const determineTimeMode = () => {
      const hour = new Date().getHours();
      if (hour >= 5 && hour < 8) setTimeMode("sunrise");
      else if (hour >= 8 && hour < 17) setTimeMode("day");
      else if (hour >= 17 && hour < 20) setTimeMode("sunset");
      else setTimeMode("night");
    };

    determineTimeMode();
    const timer = setInterval(determineTimeMode, 60000); // Check every minute
    return () => clearInterval(timer);
  }, []);

  const headerStyles = {
    sunrise: "from-orange-600 to-amber-500",
    day: "from-emerald-700 to-sky-600",
    sunset: "from-red-600 to-orange-600",
    night: "from-indigo-900 to-slate-900",
  };

  // 🎛 Navigation & View Logic
  const renderScreen = () => {
    // Priority 1: Show Detailed View if a bug is clicked
    if (selectedBug) {
      console.log("App.jsx is sending this bug to Detail View:", selectedBug);
      return (
        <BugDetail 
          bug={selectedBug} 
          onBack={() => setSelectedBug(null)} 
        />
      );
    }

    // Priority 2: Show the current tab
    switch (tab) {
      case "dashboard":
        return <Dashboard onSelectBug={setSelectedBug} />;
      case "guide":
        return <Guide />;
      case "protection":
        return <Protection />;
      case "map":
        return <MapView />;
      case "bugs":
        return <BugEncyclopedia onSelectBug={setSelectedBug} />;
      default:
        return <Dashboard onSelectBug={setSelectedBug} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 pb-24 selection:bg-emerald-500/30 font-sans antialiased text-slate-200">
      
      {/* Dynamic Header */}
      <header className={`fixed top-0 left-0 w-full z-[100] border-b border-white/10 shadow-2xl transition-colors duration-1000 bg-gradient-to-r ${headerStyles[timeMode]}`}>
        <div className="max-w-xl mx-auto flex items-center gap-3 p-4 backdrop-blur-md">
          <div className="bg-white/20 p-2 rounded-xl border border-white/20 shadow-inner">
            <Bug className="text-white w-6 h-6" />
          </div>
          <div className="flex-1">
            <h1 className="text-lg font-black text-white tracking-tighter uppercase leading-none">
              PESKY<span className="font-light">®</span>
            </h1>
            <p className="text-[10px] font-bold text-white/70 uppercase tracking-[0.2em] mt-1">
              {timeMode} Identification Active
            </p>
          </div>
        </div>
      </header>

      {/* Main Viewport */}
      <main className="pt-24 min-h-screen">
        {renderScreen()}
      </main>

      {/* Bottom Navigation Bar */}
      <BottomNav tab={tab} setTab={handleTabChange} />
    </div>
  );
}
