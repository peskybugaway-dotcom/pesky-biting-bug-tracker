import React from "react";
import { LayoutDashboard, BookOpen, ShieldCheck, Map as MapIcon, Bug } from "lucide-react";

export default function BottomNav({ tab, setTab }) {
  const tabs = [
    { id: "dashboard", label: "Home", icon: LayoutDashboard },
    { id: "bugs", label: "Library", icon: Bug },
    { id: "map", label: "Map", icon: MapIcon },
    { id: "protection", label: "Shield", icon: ShieldCheck },
    { id: "guide", label: "Guide", icon: BookOpen },
  ];

  return (
    <nav className="fixed bottom-0 left-0 w-full bg-slate-900/95 backdrop-blur-xl border-t border-white/5 z-[100] pb-safe">
      <div className="max-w-xl mx-auto flex justify-around items-center h-20 px-2 relative">
        
        {tabs.map(({ id, label, icon: Icon }) => {
          const isActive = tab === id;
          
          return (
            <button
              key={id}
              onClick={() => setTab(id)}
              className="relative flex flex-col items-center justify-center w-full h-full transition-all duration-300 active:scale-90"
            >
              {/* Active Indicator Glow */}
              {isActive && (
                <div className="absolute -top-[1px] w-12 h-1 bg-emerald-500 rounded-full shadow-[0_0_15px_#10b981]" />
              )}

              {/* Icon */}
              <Icon 
                className={`w-5 h-5 mb-1 transition-all duration-300 ${
                  isActive ? "text-emerald-400 scale-110" : "text-slate-500"
                }`} 
              />
              
              {/* Label */}
              <span className={`text-[9px] font-black uppercase tracking-[0.15em] transition-colors duration-300 ${
                isActive ? "text-white" : "text-slate-500"
              }`}>
                {label}
              </span>

              {/* Subtle active background pulse */}
              {isActive && (
                <div className="absolute inset-0 bg-emerald-500/5 animate-pulse rounded-2xl" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
