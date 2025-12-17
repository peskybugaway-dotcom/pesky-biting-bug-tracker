import React, { useState } from 'react';
import * as Lucide from 'lucide-react';

const US_REGIONS = [
  { id: 'west', name: 'West', path: 'M10 10 H50 V50 H10 Z' },
  { id: 'midwest', name: 'Midwest', path: 'M60 10 H100 V50 H60 Z' },
  { id: 'south', name: 'South', path: 'M60 60 H100 V100 H60 Z' },
  { id: 'northeast', name: 'Northeast', path: 'M110 10 H150 V40 H110 Z' },
  { id: 'florida', name: 'Florida', path: 'M110 60 H140 V90 H110 Z' }
];

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export default function MapVisualization() {
  const [activeMonth, setActiveMonth] = useState('Dec');

  return (
    <div className="bg-slate-900 border border-emerald-500/30 rounded-[2.5rem] p-6 m-4 shadow-2xl">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-emerald-500/10 rounded-xl">
          <Lucide.Map className="text-emerald-400 w-6 h-6" />
        </div>
        <h2 className="text-xl font-black text-white uppercase tracking-tighter">Regional Hotspots</h2>
      </div>

      <div className="flex gap-1 overflow-x-auto pb-4 no-scrollbar">
        {MONTHS.map(m => (
          <button 
            key={m}
            onClick={() => setActiveMonth(m)}
            className={`px-4 py-2 rounded-full text-[10px] font-bold uppercase transition-all flex-shrink-0 ${
              activeMonth === m ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/40' : 'bg-slate-800 text-slate-400'
            }`}
          >
            {m}
          </button>
        ))}
      </div>

      <div className="aspect-square bg-slate-950 rounded-3xl border border-white/5 flex items-center justify-center p-8 mt-4 relative overflow-hidden">
         <svg viewBox="0 0 160 120" className="w-full h-full drop-shadow-2xl">
            {US_REGIONS.map((region) => (
              <path
                key={region.id}
                d={region.path}
                className={`${region.id === 'florida' ? 'fill-red-500' : 'fill-emerald-700'} stroke-slate-950 stroke-2 transition-colors duration-500`}
              />
            ))}
         </svg>
         <div className="absolute bottom-4 left-4 text-[10px] font-bold text-emerald-400 uppercase tracking-widest bg-slate-900/80 px-3 py-1 rounded-full border border-emerald-500/20">
           Live Data: {activeMonth} 2025
         </div>
      </div>
    </div>
  );
}
