import React from "react";
import { ShieldAlert, AlertTriangle, Bug } from "lucide-react";

export default function BugCard({ bug, onClick }) {
  const dangerColors = {
    Low: "text-green-500",
    Moderate: "text-yellow-400",
    High: "text-orange-500",
    Severe: "text-red-500"
  };

  const DangerIcon = () => {
    switch (bug.danger) {
      case "Severe":
      case "High":
        return <ShieldAlert className={`w-6 h-6 ${dangerColors[bug.danger]}`} />;
      case "Moderate":
        return <AlertTriangle className={`w-6 h-6 ${dangerColors[bug.danger]}`}/>;
      default:
        return <Bug className="w-6 h-6 text-green-400" />;
    }
  };

  return (
    <div
      onClick={onClick}
      className="
        bg-[#1c231f]/70 border border-[#2e3b34]
        hover:border-emerald-300/60 hover:shadow-lg
        rounded-xl overflow-hidden cursor-pointer
        transition transform hover:scale-[1.02]
      "
    >
      {/* Image */}
      {bug.image && (
        <img
          src={bug.image}
          alt={bug.name}
          className="w-full h-40 object-cover"
        />
      )}

      {/* Info */}
      <div className="p-4 space-y-1">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-emerald-300">{bug.name}</h3>
          <DangerIcon />
        </div>

        <p className="text-sm text-slate-300">{bug.type}</p>

        <p className="text-xs text-slate-400 line-clamp-2">
          {bug.description}
        </p>
      </div>
    </div>
  );
}
