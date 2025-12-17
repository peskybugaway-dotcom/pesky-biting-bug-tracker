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

  // Handle Tab changes and clear selected bug to prevent "view-locking"
  const handleTabChange = (newTab) => {
    setSelectedBug(null); 
    setTab(newTab);
  };

  // 🌅 Time of day logic for dynamic theme
  useEffect(() => {
    function determineTimeMode() {
      const hour = new Date().getHours();
      if (hour >= 5 && hour < 8) setTimeMode("sunrise");
      else if (hour >= 8 && hour < 17) setTimeMode("day");
      else if (hour >= 17 && hour < 20) setTimeMode("sunset");
      else setTimeMode("night");
    }

    determineTimeMode();
    const timer = setInterval(determineTimeMode, 300000); // Update every 5 mins
    return () => clearInterval(timer);
  }, []);

  // 🎨 Header gradients based on timeMode
  const headerStyles = {
    sunrise: "from-orange-600 to-amber-500 border-amber-400",
    day: "from-emerald-700 to-sky-600 border-emerald-500",
    sunset: "from-red-600 to-orange-600 border-red-500",
    night: "from-indigo-900 to-slate-900 border-indigo-400",
  };

  // 🎛 Main Routing Logic
  const renderScreen = () => {
    // 1. If a bug is clicked, show Detail View regardless of current tab
    if (selectedBug) {
      return (
        <BugDetail 
          bug={selectedBug} 
          onBack={() => setSelectedBug(null)} 
        />
      );
    }

    // 2. Otherwise, show the active tab
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
    <div className="min-h-screen bg-slate-950 pb-24 selection:bg-emerald-500/30">
      
      {/* Header */}
      <header
        className={`
          fixed top-0 left-0 w-full 
          backdrop-blur-xl shadow-2xl z-[100]
          bg-gradient-to-r ${headerStyles[timeMode]}
          border-b border
