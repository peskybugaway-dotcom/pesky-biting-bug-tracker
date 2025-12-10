import React, { useState } from "react";
import Dashboard from "./components/Dashboard";
import Guide from "./components/Guide";
import Protection from "./components/Protection";
import MapView from "./components/MapView";
import BottomNav from "./components/BottomNav";

export default function App() {
  const [tab, setTab] = useState("dashboard");

  return (
    <div className="min-h-screen pb-24 pt-4 px-4 max-w-xl mx-auto">
      {tab === "dashboard" && <Dashboard />}
      {tab === "guide" && <Guide />}
      {tab === "protection" && <Protection />}
      {tab === "map" && <MapView />}

      <BottomNav tab={tab} setTab={setTab} />
    </div>
  );
}

