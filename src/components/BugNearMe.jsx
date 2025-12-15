// src/components/BugNearMe.jsx
import React, { useEffect, useState } from "react";

export default function BugNearMe({ bug }) {
  const [risk, setRisk] = useState(null);

  useEffect(() => {
    async function check() {
      try {
        const pos = await new Promise((res, rej) =>
          navigator.geolocation.getCurrentPosition(res, rej)
        );

        const { latitude, longitude } = pos.coords;

        // Fake logic placeholder — can connect to Open-Meteo or NOAA later
        const chance =
          latitude > 25 && latitude < 35 ? "High" :
          latitude >= 35 && latitude < 45 ? "Moderate" :
          "Low";

        setRisk(chance);
      } catch {
        setRisk("Unknown");
      }
    }

    check();
  }, []);

  return (
    <div className="pesky-card p-5 space-y-2">
      <h3 className="text-lg font-bold text-emerald-300">
        Is This Bug Near Me?
      </h3>
      <p className="text-white">
        Likelihood in your current region:{" "}
        <span className="text-emerald-400 font-bold">
          {risk || "Checking..."}
        </span>
      </p>
      <p className="text-xs text-slate-400">
        Uses your GPS + seasonal activity patterns.
      </p>
    </div>
  );
}
