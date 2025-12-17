import React from 'react';
import { Info } from 'lucide-react';

export default function BugGuide() {
    return (
        <div className="p-6 bg-slate-900 border border-emerald-800 rounded-[2rem]">
            <h2 className="text-emerald-400 font-black uppercase flex items-center gap-2 mb-4">
                <Info size={20} /> Field Guide
            </h2>
            <p className="text-slate-400 text-sm">Learn how weather affects bug activity in North Port.</p>
        </div>
    );
}
