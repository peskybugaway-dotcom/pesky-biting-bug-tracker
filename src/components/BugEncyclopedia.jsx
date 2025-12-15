import React from "react";
import {
  Bug,
  Mosquito,
  Skull,
  AlertTriangle,
  ShieldAlert
} from "lucide-react";

const BUGS = [
  // -------------------------------------------------
  // MOSQUITOES
  // -------------------------------------------------
  {
    name: "Aedes Aegypti (Yellow Fever Mosquito)",
    type: "Mosquito",
    danger: "Severe",
    icon: <Mosquito className="w-6 h-6 text-red-400" />,
    image: "https://i.imgur.com/J1v7C3d.jpeg",
    description:
      "Aggressive day-biting mosquito that spreads Dengue, Zika, and Yellow Fever. Thrives in urban Florida environments and small water containers."
  },
  {
    name: "Aedes Albopictus (Asian Tiger Mosquito)",
    type: "Mosquito",
    danger: "High",
    icon: <Mos
