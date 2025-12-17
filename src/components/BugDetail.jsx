import React, { useState } from "react";
import { ArrowLeft, ShieldCheck, Info, Zap, Camera, ExternalLink } from "lucide-react";
import AnimatedRiskGauge from "./AnimatedRiskGauge";

export default function BugDetail({ bug, onBack }) {
  const [activeTab, setActiveTab] = useState("bug");

  if (!bug) return null;

  // Destructure with default values to prevent blank screens
  const { 
    name = "Unknown Species", 
    description = "No description available.", 
    facts = [], 
    riskLevel = 0,
    category = "Pest",
    type = "Unknown",
    products = [],
    image = "/images/fallback-bug.png",
    bitePhotos = []
  } = bug;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 pb-20">
      {/* 🖼 HERO IMAGE SECTION */}
      <div className="relative h-80 w-full overflow-hidden">
        <img
          src={activeTab === "bug" ? image : (bitePhotos[0] || image)}
          alt={name}
          className="w-full h-full object-cover transition-all duration-500 ease-in-out"
        />
        
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
        
        <button
          onClick={onBack}
          className="absolute top-6 left-4 p-2 bg-slate-900/80 backdrop-blur-md rounded-full border border-slate-700 z-50 hover:bg-emerald-600 transition-colors"
        >
          <ArrowLeft className="w-6 h-6 text-white" />
        </button>

        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex bg-slate-900/90 backdrop-blur-xl p-1 rounded-full border border-white/10 shadow-2xl z-20">
          <button 
            onClick={() => setActiveTab("bug")}
            className={`px-6 py-2 rounded-full text-[10px] font-black tracking-widest transition-all ${
              activeTab === 'bug' ? 'bg-emerald-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'
            }`}
          >
            THE BUG
          </button>
          <button 
            onClick={() => setActiveTab("bite")}
            className={`px-6 py-2 rounded-full text-[10px] font-black tracking-widest transition-all ${
              activeTab === 'bite' ? 'bg-red-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'
            }`}
          >
            THE BITE
          </button>
        </div>
      </div>

      {/* 📄 CONTENT BODY */}
      <div className="px-6 -mt-6 relative z-30 space-y-8 max-w-xl mx-auto">
        
        <div className="text-center">
          <p className="text-emerald-400 font-bold tracking-[0.3em] uppercase text-[10px] mb-2">
            {category} • {type}
          </p>
          <h1 className="text-4xl font-black text-white leading-tight tracking-tight">
            {name}
          </h1>
        </div>

        <div className="bg-slate-900/60 border border-slate-800 rounded-[2rem] p-6 flex flex-col items-center shadow-2xl backdrop-blur-sm">
          <AnimatedRiskGauge value={riskLevel} />
          <p className="text-slate-300 text-sm text-center mt-6 leading-relaxed font-medium italic">
            "{description}"
          </p>
        </div>

        {activeTab === "bite" && (
          <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-2xl flex gap-4 items-center animate-in fade-in zoom-in duration-300">
            <div className="bg-red-500/20 p-2 rounded-lg">
              <Camera className="text-red-500 w-5 h-5" />
            </div>
            <p className="text-[11px] text-red-200 leading-tight">
              <span className="font-bold block mb-1 uppercase">Identification Note:</span>
              Bite reactions vary. This image shows a typical localized reaction for this species.
            </p>
          </div>
        )}

        <div className="space-y-4">
          <div className="flex items-center gap-2 text-emerald-400 ml-1">
            <Zap className="w-5 h-5" />
            <h2 className="font-bold uppercase tracking-[0.1em] text-xs">Behavioral Profile</h2>
          </div>
          <div className="grid gap-3">
            {facts.length > 0 ? facts.map((fact, i) => (
              <div key={i} className="flex gap-4 bg-slate-900/40 p-5 rounded-2xl border border-slate-800/50">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 shrink-0 shadow-[0_0_8px_#10b981]" />
                <p className="text-slate-300 text-sm font-medium leading-snug">{fact}</p>
              </div>
            )) : <p className="text-slate-500 text-xs px-5">No specific facts listed for this species.</p>}
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-2 text-indigo-400 ml-1">
            <ShieldCheck className="w-5 h-5" />
            <h2 className="font-bold uppercase tracking-[0.1em] text-xs">Recommended Defense</h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {products.length > 0 ? products.map((product) => (
              <div 
                key={product} 
                className="group flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/30 text-indigo-200 px-4 py-2.5 rounded-xl text-xs font-bold"
              >
                {product}
                <ExternalLink size={12} className="opacity-40" />
              </div>
            )) : <p className="text-slate-500 text-xs">Standard insect repellent recommended.</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
