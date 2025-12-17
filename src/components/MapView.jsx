import React, { useState, useEffect } from "react";
import { Map as MapIcon, Info, Calendar } from "lucide-react";

export default function MapView() {
  const MONTHS = [
    "January","February","March","April","May","June",
    "July","August","September","October","November","December"
  ];

  const REGION_MONTHLY = {
    January:{ West:"low", Midwest:"low", SouthEast:"low", Northeast:"low", Texas:"low", Florida:"low" },
    February:{ West:"low", Midwest:"low", SouthEast:"low", Northeast:"low", Texas:"low", Florida:"low" },
    March:{ West:"low", Midwest:"low", SouthEast:"moderate", Northeast:"low", Texas:"low", Florida:"moderate" },
    April:{ West:"moderate", Midwest:"low", SouthEast:"high", Northeast:"low", Texas:"moderate", Florida:"high" },
    May:{ West:"moderate", Midwest:"moderate", SouthEast:"severe", Northeast:"moderate", Texas:"moderate", Florida:"severe" },
    June:{ West:"moderate", Midwest:"high", SouthEast:"severe", Northeast:"high", Texas:"severe", Florida:"severe" },
    July:{ West:"high", Midwest:"severe", SouthEast:"severe", Northeast:"high", Texas:"severe", Florida:"severe" },
    August:{ West:"moderate", Midwest:"high", SouthEast:"severe", Northeast:"moderate", Texas:"high", Florida:"severe" },
    September:{ West:"moderate", Midwest:"moderate", SouthEast:"high", Northeast:"moderate", Texas:"moderate", Florida:"high" },
    October:{ West:"low", Midwest:"moderate", SouthEast:"moderate", Northeast:"moderate", Texas:"moderate", Florida:"moderate" },
    November:{ West:"low", Midwest:"low", SouthEast:"low", Northeast:"low", Texas:"low", Florida:"low" },
    December:{ West:"low", Midwest:"low", SouthEast:"low", Northeast:"low", Texas:"low", Florida:"low" },
  };

  const COLORS = {
    low: "fill-emerald-600/60 shadow-emerald-500",
    moderate: "fill-yellow-500/60 shadow-yellow-500",
    high: "fill-orange-500/60 shadow-orange-500",
    severe: "fill-red-600/60 shadow-red-500",
  };

  const [month, setMonth] = useState("");

  // Auto-detect current month on component mount
  useEffect(() => {
    const currentMonth = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(new Date());
    setMonth(currentMonth);
  }, []);

  const regions = {
    West: { d: "M20 20 L80 20 L80 80 L20 80 Z", tx: 50, ty: 50 },
    Midwest: { d: "M85 20 L145 20 L145 80 L85 80 Z", tx: 115, ty: 50 },
    SouthEast: { d: "M150 80 L210 80 L210 140 L150 140 Z", tx: 180, ty: 115 },
    Northeast: { d: "M150 20 L210 20 L210 60 L150 60 Z
