import React from 'react';
import { Map as MapIcon } from 'lucide-react';

export default function MapVisualization() {
    return (
        <div className="p-6 bg-slate-900 border border-emerald-800 rounded-[2rem] text-center">
            <h2 className="text-emerald-400 font-black uppercase flex items-center justify-center gap-2 mb-4">
                <MapIcon size={20} /> Regional Hotspots
            </h2>
            <div className="aspect-video bg-slate-950 rounded-2xl flex items-center justify-center border border-white/5">
                <p className="text-slate-600 font-bold uppercase text-[10px] tracking-widest">Map Loading...</p>
            </div>
        </div>
    );
}
