import React from "react";
import { ShieldCheck, Sparkles, Droplet, Wind, Sun, Leaf, Info, AlertCircle } from "lucide-react";

export default function Protection() {
  const strategies = [
    {
      icon: <ShieldCheck className="text-emerald-400" />,
      title: "Proven Repellents",
      desc: "Use EPA-registered repellents containing DEET, Picaridin, or IR3535.",
      color: "border-emerald-500/30"
    },
    {
      icon: <Droplet className="text-sky-400" />,
      title: "Water Management",
      desc: "Drain standing water in saucers and gutters to disrupt breeding cycles.",
      color: "border-sky-500/30"
    },
    {
      icon: <Leaf className="text-green-300" />,
      title: "Barrier Clothing",
      desc: "Wear long sleeves and pants. Light colors are less attractive to mosquitoes.",
      color: "border-green-500/30"
    },
    {
      icon: <Wind className="text-slate-300" />,
      title: "Air Flow",
      desc: "Fans are effective; most biting insects are weak fliers and avoid moving air.",
      color: "border-slate-500/30"
    },
    {
      icon: <Sun className="text-yellow-400" />,
      title: "Peak Hour Awareness",
      desc: "Limit outdoor activity during dawn and dusk when activity spikes.",
      color: "border-yellow-500/30"
    },
    {
      icon: <Sparkles className="text-purple-300" />,
      title: "Gear Treatment",
      desc: "Treat hiking boots, tents, and outer layers with Permethrin spray.",
      color: "border-purple-500/30"
    }
  ];

  return (
    <div className="min-h-screen bg-slate-950 p-6 pb-3
