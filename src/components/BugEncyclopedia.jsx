import { Bug, Mosquito, Skull, AlertTriangle } from "lucide-react";

const BUGS = [
  // -----------------------------
  // MOSQUITOES
  // -----------------------------
  {
    name: "Aedes Aegypti (Yellow Fever Mosquito)",
    type: "Mosquito",
    danger: "Severe",
   icon: <Mosquito className="w-6 h-6 text-red-400" />,
    image: "https://i.imgur.com/J1v7C3d.jpeg",
    description:
      "Aggressive day-biting mosquito. Transmits Dengue, Zika, and Yellow Fever. Prefers urban areas and small water containers."
  },
  {
    name: "Aedes Albopictus (Asian Tiger Mosquito)",
    type: "Mosquito",
    danger: "High",
   icon: <Mosquito className="w-6 h-6 text-red-400" />,
    image: "https://i.imgur.com/KdnWWs6.jpeg",
    description:
      "Very aggressive daytime biter. Known for targeting ankles and outdoor workers. Thrives in humidity."
  },
  {
    name: "Culex (House Mosquito)",
    type: "Mosquito",
    danger: "Moderate",
    icon: <Mosquito className="w-6 h-6 text-red-400" />,
    image: "https://i.imgur.com/LZkSKdH.jpeg",
    description:
      "Active at dusk and night. Prefers standing water. Carrier of West Nile Virus."
  },

  // -----------------------------
  // NO-SEE-UMS / BITING MIDGES
  // -----------------------------
  {
    name: "No-See-Um (Ceratopogonidae)",
    type: "Biting Midge",
    danger: "Severe",
    icon: <Bug className="w-6 h-6 text-pink-400" />,
    image: "https://i.imgur.com/isM4Q3d.jpeg",
    description:
      "Extremely small and extremely aggressive. Thrive in coastal Florida. Bites cause welts and intense itching."
  },
  {
    name: "Sand Fly",
    type: "Midge",
    danger: "High",
    icon: <Bug className="w-6 h-6 text-yellow-400" />,
    image: "https://i.imgur.com/mqUFD1Z.jpeg",
    description:
      "Active at night. Carries parasitic diseases in tropical regions. Swarm behavior in humid environments."
  },

  // -----------------------------
  // FLIES
  // -----------------------------
  {
    name: "Horsefly",
    type: "Biting Fly",
    danger: "Moderate",
    icon: <AlertTriangle className="w-6 h-6 text-yellow-300" />,
    image: "https://i.imgur.com/kPVwzbJ.jpeg",
    description:
      "Painful cutting bite. Attracted to movement and shiny objects. Active in sunlight."
  },
  {
    name: "Deer Fly",
    type: "Biting Fly",
    danger: "High",
    icon: <AlertTriangle className="w-6 h-6 text-orange-300" />,
    image: "https://i.imgur.com/7b9AcK8.jpeg",
    description:
      "Swarm in wooded areas. Fast fliers. Attracted to carbon dioxide and sweat."
  },

  // -----------------------------
  // ANTS
  // -----------------------------
  {
    name: "Fire Ant",
    type: "Ant",
    danger: "High",
    icon: <Skull className="w-6 h-6 text-red-500" />,
    image: "https://i.imgur.com/IcnqdcP.jpeg",
    description:
      "Aggressive mound-building ants. Multiple stings create pustules. Can cause allergic reactions."
  },
  {
    name: "Carpenter Ant",
    type: "Ant",
    danger: "Low",
    icon: <Bug className="w-6 h-6 text-slate-300" />,
    image: "https://i.imgur.com/ZGZnQmC.jpeg",
    description:
      "Do not usually bite unless handled. Can damage wood structures. Large black ants often seen indoors."
  },

  // -----------------------------
  // TICKS
  // -----------------------------
  {
    name: "Deer Tick (Blacklegged Tick)",
    type: "Tick",
    danger: "Severe",
    icon: <Skull className="w-6 h-6 text-red-400" />,
    image: "https://i.imgur.com/MBXkVZ0.jpeg",
    description:
      "Carrier of Lyme Disease. Very small and active in grassy, shaded areas. Peak activity in warm months."
  },
  {
    name: "Lone Star Tick",
    type: "Tick",
    danger: "High",
    icon: <AlertTriangle className="w-6 h-6 text-orange-400" />,
    image: "https://i.imgur.com/Z4aIr3a.jpeg",
    description:
      "Identified by white star on back. Responsible for Alpha-Gal syndrome (red meat allergy). Highly aggressive."
  },
  {
    name: "Dog Tick",
    type: "Tick",
    danger: "Moderate",
    icon: <Bug className="w-6 h-6 text-yellow-400" />,
    image: "https://i.imgur.com/Z5fznGm.jpeg",
    description:
      "Common in wooded areas. Can transmit Rocky Mountain Spotted Fever. Larger than deer ticks."
  }
];

export default function BugEncyclopedia({ onSelectBug }) {
  return (
    <div className="p-6 space-y-6 max-w-xl mx-auto">

      <h2 className="text-2xl font-bold text-emerald-400">Bug Encyclopedia</h2>

      <div className="grid grid-cols-1 gap-4">
        {BUGS.map((b) => (
          <div
            key={b.name}
            onClick={() => onSelectBug(b)}
            className="pesky-card p-4 hover:bg-slate-700/60 cursor-pointer transition"
          >
            <h3 className="text-lg font-semibold text-white">{b.name}</h3>
            <p className="text-sm text-slate-300">{b.description}</p>
          </div>
        ))}
      </div>

    </div>
  );
}
