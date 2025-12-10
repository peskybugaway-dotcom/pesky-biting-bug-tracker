import React, { useState } from "react";
import Dashboard from "./components/Dashboard";
import Guide from "./components/Guide";
import Protection from "./components/Protection";
import MapView from "./components/MapView";
import BottomNav from "./components/BottomNav";
import { Bug } from "lucide-react";

export default function App() {
  const [tab, setTab] = useState("dashboard");

  const renderScreen = () => {
    switch (tab) {
      case "dashboard":
        return <Dashboard />;
      case "guide":
        return <Guide />;
      case "protection":
        return <Protection />;
      case "map":
        return <MapView />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen pb-24">

      {/* 🔥 PESKY Branded Header Bar */}
      <header className="fixed top-0 left-0 w-full bg-slate-900/95 backdrop-blur border-b border-slate-700 shadow-lg z-50">
        <div className="max-w-xl mx-auto flex items-center gap-3 p-4">
          <div className="bg-emerald-600 p-2 rounded-lg shadow-md">
            <Bug className="text-white w-6 h-6" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-emerald-400 tracking-wide">
              PESKY® Bug Tracker
            </h1>
            <p className="text-xs text-slate-400 -mt-1">
              Activity Forecast & Risk Engine
            </p>
          </div>
        </div>
      </header>

      {/* Push content below header */}
      <div className="pt-24">{renderScreen()}</div>

      <BottomNav tab={tab} setTab={setTab} />
    </div>
  );
}
