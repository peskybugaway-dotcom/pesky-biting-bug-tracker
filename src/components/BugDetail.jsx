import React, { useState } from "react";
import { ArrowLeft, ShieldCheck, Info, Zap, Camera, ExternalLink } from "lucide-react";
import AnimatedRiskGauge from "./AnimatedRiskGauge";

export default function BugDetail({ bug, onBack }) {
  const [activeTab, setActiveTab] = useState("bug"); // State to toggle between bug and bite photos

  if (!bug) return null;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 pb-20">
      {/* 🖼 HERO IMAGE SECTION */}
      <div className="relative h-80 w-full overflow-hidden">
        <img
          src={activeTab === "bug" ? bug.image : (bug.bitePhotos?.[0] || bug.image)}
          alt={bug.name}
          className="w-full h-full object-cover transition-all duration-500 ease-in-out"
        />
        
        {/* Gradient Overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
        
        {/* Navigation - Back Button */}
        <button
          onClick={onBack}
          className="absolute top-6 left-4 p-2 bg-slate-900/80 backdrop-blur-md rounded-full border border-slate-700 z-50 hover:bg-emerald-600 transition-colors"
        >
          <ArrowLeft className="w-6 h-6 text-white" />
        </button>

        {/* 🔄 IMAGE TOGGLE SWITCH */}
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
        
        {/* Title Block */}
        <div className="text
