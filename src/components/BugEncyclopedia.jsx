// src/components/BugEncyclopedia.jsx
import React from "react";

const BUGS = [
  // ------------------------------------------------------------
  // 1. MOSQUITOES
  // ------------------------------------------------------------
  {
    name: "Aedes Aegypti (Yellow Fever Mosquito)",
    type: "Mosquito",
    danger: "Severe",
    riskLevel: 3,
    image: "https://i.imgur.com/J1v7C3d.jpeg",
    description:
      "Aggressive day-biting mosquito. Primary carrier of Dengue, Zika, and Yellow Fever. Thrives around homes and small water containers.",
    facts: [
      "Prefers biting humans over animals.",
      "Lays eggs in bottle caps of water.",
      "Most active during early morning and late afternoon."
    ],
    bitePhotos: ["https://i.imgur.com/vl7N5e6.jpeg"],
    seasonalActivity: { Jan: 1, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 4, Jul: 4, Aug: 4, Sep: 3, Oct: 3, Nov: 2, Dec: 1 },
    activityMap: { Florida: 4, Texas: 4, GulfCoast: 4, Southwest: 3, Midwest: 2, Northeast: 1 },
    products: ["PESKY® Bug Away Spray", "PESKY® After-Bite Gel"]
  },
  {
    name: "Aedes Albopictus (Asian Tiger Mosquito)",
    type: "Mosquito",
    danger: "High",
    riskLevel: 3,
    image: "https://i.imgur.com/KdnWWs6.jpeg",
    description:
      "Highly aggressive mosquito known for ankle-targeting. Strong biter even in daylight.",
    facts: [
      "Striped black and white legs.",
      "Can survive cooler temperatures than most mosquitoes.",
      "Often found in shaded outdoor areas."
    ],
    bitePhotos: ["https://i.imgur.com/y9mdFpW.jpeg"],
    seasonalActivity: { Jan: 1, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 4, Jul: 4, Aug: 4, Sep: 3, Oct: 3, Nov: 2, Dec: 1 },
    activityMap: { Florida: 4, Texas: 4, Southeast: 4, Midwest: 3, Northeast: 2 },
    products: ["PESKY® Bug Away Spray"]
  },
  {
    name: "Culex (House Mosquito)",
    type: "Mosquito",
    danger: "Moderate",
    riskLevel: 2,
    image: "https://i.imgur.com/LZkSKdH.jpeg",
    description:
      "Night-active mosquito known for transmitting West Nile Virus. Prefers stagnant water.",
    facts: ["Lays eggs in rafts floating on water.", "Active at dusk and night."],
    bitePhotos: ["https://i.imgur.com/mY6SVxQ.jpeg"],
    seasonalActivity: { Jan: 1, Feb: 1, Mar: 2, Apr: 2, May: 3, Jun: 4, Jul: 4, Aug: 4, Sep: 3, Oct: 2, Nov: 2, Dec: 1 },
    activityMap: { Florida: 3, Texas: 3, Midwest: 3, Northeast: 2 },
    products: ["PESKY® Bug Away Spray"]
  },

  // ------------------------------------------------------------
  // 2. NO-SEE-UMS / BITING MIDGES
  // ------------------------------------------------------------
  {
    name: "No-See-Um (Ceratopogonidae)",
    type: "Biting Midge",
    danger: "Severe",
    riskLevel: 3,
    image: "https://i.imgur.com/isM4Q3d.jpeg",
    description:
      "Extremely small biting insects causing welts and severe itching. Thrive in coastal Florida.",
    facts: [
      "Small enough to pass through window screens.",
      "Most active at dawn and dusk.",
      "Prefer humid, windless environments."
    ],
    bitePhotos: ["https://i.imgur.com/nlpl6uR.jpeg"],
    seasonalActivity: { Jan: 2, Feb: 2, Mar: 3, Apr: 4, May: 4, Jun: 4, Jul: 4, Aug: 4, Sep: 4, Oct: 3, Nov: 3, Dec: 2 },
    activityMap: { Florida: 4, GulfCoast: 4, Texas: 3 },
    products: ["PESKY® Bug Away Spray", "PESKY® No-See-Um Defense"]
  },
  {
    name: "Sand Fly",
    type: "Midge",
    danger: "High",
    riskLevel: 3,
    image: "https://i.imgur.com/mqUFD1Z.jpeg",
    description:
      "Night-active biting midge capable of spreading parasitic diseases in tropical areas.",
    facts: ["Very quiet flier.", "Often swarm in humid coastal areas."],
    bitePhotos: ["https://i.imgur.com/J0P5iOj.jpeg"],
    seasonalActivity: { Jan: 1, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 4, Jul: 4, Aug: 4, Sep: 4, Oct: 3, Nov: 2, Dec: 1 },
    activityMap: { Florida: 4, Texas: 3, GulfCoast: 4 },
    products: ["PESKY® Bug Away Spray"]
  },

  // ------------------------------------------------------------
  // 3. FLIES
  // ------------------------------------------------------------
  {
    name: "Horsefly",
    type: "Biting Fly",
    danger: "Moderate",
    riskLevel: 2,
    image: "https://i.imgur.com/kPVwzbJ.jpeg",
    description:
      "Powerful biting fly active during full sun. Painful slicing bite.",
    facts: ["Attracted to movement.", "One of the fastest flying insects."],
    bitePhotos: ["https://i.imgur.com/9Uu5yBW.jpeg"],
    seasonalActivity: { Jan: 0, Feb: 0, Mar: 1, Apr: 2, May: 3, Jun: 4, Jul: 4, Aug: 4, Sep: 3, Oct: 2, Nov: 1, Dec: 0 },
    activityMap: { Southeast: 3, Midwest: 3, Northeast: 2 },
    products: ["PESKY® Bug Away Spray"]
  },
  {
    name: "Deer Fly",
    type: "Biting Fly",
    danger: "High",
    riskLevel: 3,
    image: "https://i.imgur.com/7b9AcK8.jpeg",
    description:
      "Fast, aggressive biter targeting humans outdoors. Attracted to sweat & CO₂.",
    facts: ["Common near rivers and forests."],
    bitePhotos: ["https://i.imgur.com/lq6u37g.jpeg"],
    seasonalActivity: { Jan: 0, Feb: 0, Mar: 1, Apr: 2, May: 3, Jun: 4, Jul: 4, Aug: 4, Sep: 3, Oct: 1, Nov: 0, Dec: 0 },
    activityMap: { Southeast: 3, Midwest: 4, Northeast: 3 },
    products: ["PESKY® Bug Away Spray"]
  },

  // ------------------------------------------------------------
  // 4. ANTS
  // ------------------------------------------------------------
  {
    name: "Fire Ant",
    type: "Ant",
    danger: "High",
    riskLevel: 3,
    image: "https://i.imgur.com/IcnqdcP.jpeg",
    description:
      "Aggressive mound-building ants delivering painful stings that form pustules.",
    facts: ["Each ant can sting repeatedly.", "Colonies contain multiple queens."],
    bitePhotos: ["https://i.imgur.com/EHBH8ag.jpeg"],
    seasonalActivity: { Jan: 1, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 4, Jul: 4, Aug: 4, Sep: 3, Oct: 3, Nov: 2, Dec: 1 },
    activityMap: { Southeast: 4, Texas: 4, Florida: 4 },
    products: ["PESKY® Sugar Ant Defense", "PESKY® Bug Away Spray"]
  },
  {
    name: "Carpenter Ant",
    type: "Ant",
    danger: "Low",
    riskLevel: 1,
    image: "https://i.imgur.com/ZGZnQmC.jpeg",
    description:
      "Large black ants known for excavating wood, sometimes seen indoors.",
    facts: ["Rarely bite humans."],
    bitePhotos: [],
    seasonalActivity: { Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 4, Jul: 3, Aug: 3, Sep: 2, Oct: 1, Nov: 1, Dec: 0 },
    activityMap: { Northeast: 3, Midwest: 3, PacificNW: 2 },
    products: ["PESKY® Sugar Ant Defense"]
  },

  // ------------------------------------------------------------
  // 5. TICKS
  // ------------------------------------------------------------
  {
    name: "Deer Tick (Blacklegged Tick)",
    type: "Tick",
    danger: "Severe",
    riskLevel: 3,
    image: "https://i.imgur.com/MBXkVZ0.jpeg",
    description:
      "Primary carrier of Lyme Disease. Prefers humid forests and tall grass.",
    facts: ["Nymph stage is most dangerous.", "Peak spring & fall activity."],
    bitePhotos: ["https://i.imgur.com/PtYwdRZ.jpeg"],
    seasonalActivity: { Jan: 1, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 4, Jul: 3, Aug: 2, Sep: 3, Oct: 3, Nov: 2, Dec: 1 },
    activityMap: { Northeast: 4, Midwest: 4, Southeast: 2 },
    products: ["PESKY® Bug Away Spray"]
  },
  {
    name: "Lone Star Tick",
    type: "Tick",
    danger: "High",
    riskLevel: 3,
    image: "https://i.imgur.com/Z4aIr3a.jpeg",
    description:
      "Known for causing Alpha-Gal Syndrome, a red meat allergy. Very aggressive.",
    facts: ["Named for white 'star' dot on back."],
    bitePhotos: ["https://i.imgur.com/ZfBiUXH.jpeg"],
    seasonalActivity: { Jan: 1, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 4, Jul: 4, Aug: 3, Sep: 3, Oct: 2, Nov: 1, Dec: 1 },
    activityMap: { Southeast: 4, Texas: 4, Midwest: 3 },
    products: ["PESKY® Bug Away Spray"]
  },
  {
    name: "Dog Tick",
    type: "Tick",
    danger: "Moderate",
    riskLevel: 2,
    image: "https://i.imgur.com/Z5fznGm.jpeg",
    description:
      "Common wooded-area tick that can transmit Rocky Mountain Spotted Fever.",
    facts: ["Larger than deer ticks."],
    bitePhotos: ["https://i.imgur.com/Zd7rQ9w.jpeg"],
    seasonalActivity: { Jan: 1, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 4, Jul: 3, Aug: 2, Sep: 2, Oct: 1, Nov: 1, Dec: 1 },
    activityMap: { Northeast: 3, Midwest: 3, Southeast: 2 },
    products: ["PESKY® Bug Away Spray"]
  },

  // ------------------------------------------------------------
  // 6. WASPS & BEES
  // ------------------------------------------------------------
  {
    name: "Paper Wasp",
    type: "Wasp",
    danger: "High",
    riskLevel: 3,
    image: "https://i.imgur.com/QRLZ6gq.jpeg",
    description:
      "Territorial wasps with painful stings. Build umbrella-shaped nests.",
    facts: ["Will defend nests aggressively."],
    bitePhotos: ["https://i.imgur.com/GMg2g9y.jpeg"],
    seasonalActivity: { Jan: 0, Feb: 0, Mar: 1, Apr: 2, May: 3, Jun: 4, Jul: 4, Aug: 4, Sep: 3, Oct: 2, Nov: 1, Dec: 0 },
    activityMap: { Southeast: 4, Midwest: 3, Southwest: 3 },
    products: ["PESKY® After-Bite Gel"]
  },
  {
    name: "Yellow Jacket",
    type: "Wasp",
    danger: "Severe",
    riskLevel: 3,
    image: "https://i.imgur.com/NW542lA.jpeg",
    description:
      "Highly aggressive social wasps that sting repeatedly. Often found around food.",
    facts: ["Responsible for many allergic reactions each year."],
    bitePhotos: ["https://i.imgur.com/kXDRiNR.jpeg"],
    seasonalActivity: { Jan: 0, Feb: 0, Mar: 1, Apr: 2, May: 3, Jun: 4, Jul: 4, Aug: 4, Sep: 3, Oct: 2, Nov: 1, Dec: 0 },
    activityMap: { Southeast: 4, Northeast: 3, Midwest: 3 },
    products: ["PESKY® After-Bite Gel"]
  },

  // ------------------------------------------------------------
  // 7. SPIDERS
  // ------------------------------------------------------------
  {
    name: "Black Widow",
    type: "Spider",
    danger: "Severe",
    riskLevel: 3,
    image: "https://i.imgur.com/9nGQg8c.jpeg",
    description:
      "Venomous spider recognized by its red hourglass marking. Causes neurotoxic reactions.",
    facts: ["Females are far more venomous."],
    bitePhotos: ["https://i.imgur.com/gM2m9iy.jpeg"],
    seasonalActivity: { Jan: 1, Feb: 1, Mar: 1, Apr: 2, May: 3, Jun: 3, Jul: 3, Aug: 3, Sep: 2, Oct: 2, Nov: 1, Dec: 1 },
    activityMap: { Southeast: 3, Southwest: 4, California: 3 },
    products: ["PESKY® After-Bite Gel"]
  },
  {
    name: "Brown Recluse",
    type: "Spider",
    danger: "Severe",
    riskLevel: 3,
    image: "https://i.imgur.com/JM2Upel.jpeg",
    description:
      "Shy but venomous spider known for necrotic bites requiring medical attention.",
    facts: ["Violin-shaped marking on back."],
    bitePhotos: ["https://i.imgur.com/XQG6z9J.jpeg"],
    seasonalActivity: { Jan: 1, Feb: 1, Mar: 2, Apr: 3, May: 3, Jun: 3, Jul: 3, Aug: 3, Sep: 2, Oct: 2, Nov: 1, Dec: 1 },
    activityMap: { Midwest: 4, Southeast: 3 },
    products: ["PESKY® After-Bite Gel"]
  },

  // ------------------------------------------------------------
  // 8. FLEAS
  // ------------------------------------------------------------
  {
    name: "Cat Flea",
    type: "Flea",
    danger: "Moderate",
    riskLevel: 2,
    image: "https://i.imgur.com/9YdYfCX.jpeg",
    description:
      "Common flea that bites both pets and humans. Causes itchy red bumps.",
    facts: ["Responsible for most indoor infestations."],
    bitePhotos: ["https://i.imgur.com/T0owiLX.jpeg"],
    seasonalActivity: { Jan: 2, Feb: 2, Mar: 3, Apr: 4, May: 4, Jun: 4, Jul: 4, Aug: 4, Sep: 3, Oct: 3, Nov: 2, Dec: 2 },
    activityMap: { Southeast: 4, Texas: 4, California: 3 },
    products: ["PESKY® Bug Away Spray", "PESKY® After-Bite Gel"]
  },
  {
    name: "Dog Flea",
    type: "Flea",
    danger: "Moderate",
    riskLevel: 2,
    image: "https://i.imgur.com/1vZeScc.jpeg",
    description:
      "Similar to the cat flea but more common outdoors. Bites humans around ankles.",
    facts: ["Cannot fly — only jump."],
    bitePhotos: ["https://i.imgur.com/LtkFllh.jpeg"],
    seasonalActivity: { Jan: 2, Feb: 2, Mar: 3, Apr: 4, May: 4, Jun: 4, Jul: 4, Aug: 4, Sep: 3, Oct: 3, Nov: 2, Dec: 2 },
    activityMap: { Southeast: 4, Texas: 4, GulfCoast: 3 },
    products: ["PESKY® Bug Away Spray"]
  }
];

// ------------------------------------------------------------
// MAIN COMPONENT
// ------------------------------------------------------------
export default function BugEncyclopedia({ onSelectBug }) {
  return (
    <div className="p-6 max-w-xl mx-auto space-y-6">
      <h2 className="text-2xl text-emerald-400 font-bold">Bug Encyclopedia</h2>

      <div className="grid grid-cols-1 gap-4">
        {BUGS.map((b) => (
          <div
            key={b.name}
            onClick={() => onSelectBug(b)}
            className="pesky-card p-4 cursor-pointer hover:bg-slate-700/50 transition"
          >
            <h3 className="text-lg text-white font-semibold">{b.name}</h3>
            <p className="text-slate-300 text-sm">{b.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
