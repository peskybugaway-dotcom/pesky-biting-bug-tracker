import React from "react";

export default function Dashboard() {
  return (
    <div className="p-8">
      <div className="bg-emerald-900 border-2 border-emerald-400 p-10 rounded-[3rem] shadow-2xl text-center">
        <h2 className="text-white font-black text-3xl uppercase tracking-tighter mb-4">
          SYSTEM CHECK
        </h2>
        <p className="text-emerald-400 font-bold text-sm uppercase tracking-widest">
          If you see this, Dashboard.jsx is connected correctly.
        </p>
        <div className="mt-8 grid grid-cols-3 gap-4">
          <div className="bg-slate-900 p-4 rounded-2xl border border-white/10">
            <div className="text-white text-2xl font-black">3</div>
          </div>
          <div className="bg-slate-900 p-4 rounded-2xl border border-white/10">
            <div className="text-white text-2xl font-black">1</div>
          </div>
          <div className="bg-slate-900 p-4 rounded-2xl border border-white/10">
            <div className="text-white text-2xl font-black">2</div>
          </div>
        </div>
      </div>
    </div>
  );
}
