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

  // 🌅 Time of day logic
  useEffect(() => {
    function determineTimeMode() {
      const hour = new Date().getHours();

      if (hour >= 5 && hour < 8) setTimeMode("sunrise");
      else if (hour >= 8 && hour < 17) setTimeMode("day");
      else if (hour >= 17 && hour < 20) setTimeMode("sunset");
      else setTimeMode("night");
    }

    determineTimeMode();
    const timer = setInterval(determineTimeMode, 300000);
    return () => clearInterval(timer);
  }, []);

  // 🎨 Header gradients
  const headerStyles = {
    sunrise: "from-orange-500/60 to-amber-500/40 border-amber-400",
    day: "from-emerald-600/40 to-sky-500/30 border-emerald-500",
    sunset: "from-red-500/60 to-orange-600/40 border-red-500",
    night: "from-indigo-700/40 to-slate-900/40 border-indigo-400",
  };

  // 🎛 Screen routing
  const renderScreen = () => {
    // Show bug detail view if selected
    if (selectedBug) {
      return (
        <BugDetail bug={selectedBug} back={() => setSelectedBug(null)} />
      );
    }

    switch (tab) {
      case "dashboard":
        return <Dashboard />;

      case "guide":
        return <Guide />;

      case "protection":
        return <Protection />;

      case "map":
        return <MapView />;

      case "bugs":
        return (
          <BugEncyclopedia onSelectBug={(bug) => setSelectedBug(bug)} />
        );

      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen pb-24">

      {/* Header */}
      <header
        className={`
          fixed top-0 left-0 w-full 
          backdrop-blur-md shadow-lg z-50
          bg-gradient-to-r ${headerStyles[timeMode]}
          border-b
        `}
      >
        <div className="max-w-xl mx-auto flex items-center gap-3 p-4">
          <div className="bg-emerald-600 p-2 rounded-lg shadow-md">
            <Bug className="text-white w-6 h-6" />
          </div>

          <div>
            <h1 className="text-lg font-bold text-white tracking-wide">
              PESKY® Bug Tracker
            </h1>
            <p className="text-xs text-slate-200 -mt-1">
              {timeMode === "sunrise" && "Sunrise — early bug activity forming"}
              {timeMode === "day" && "Daytime — activity varies"}
              {timeMode === "sunset" && "Sunset — peak insect activity"}
              {timeMode === "night" && "Night — no-see-ums most active"}
            </p>
          </div>
        </div>
      </header>

      {/* Page content below header */}
      <div className="pt-24">
        {renderScreen()}
      </div>

      <BottomNav tab={tab} setTab={setTab} />
    </div>
  );
}
