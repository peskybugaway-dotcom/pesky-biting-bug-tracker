import React, { useState, useEffect, useMemo } from 'react';
import {
  Wind,
  Thermometer,
  Droplets,
  Search,
  ShieldAlert,
  Activity,
  Zap,
  ChevronRight,
  Bug,
  Clock,
  Sun,
  Moon
} from 'lucide-react';
import { initializeApp } from 'firebase/app';
import { getAuth, signInAnonymously, signInWithCustomToken, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, setDoc, onSnapshot, collection, addDoc, deleteDoc, query } from 'firebase/firestore';

// --- CONFIGURATION ---
const appId = typeof __app_id !== 'undefined' ? __app_id : 'pesky-tracker-v4';
const firebaseConfig = typeof __firebase_config !== 'undefined' ? JSON.parse(__firebase_config) : null;
const initialAuthToken = typeof __initial_auth_token !== 'undefined' ? __initial_auth_token : null;

// --- BIOLOGICAL ENGINE: RE-ENGINEERED FOR MONOTONIC ACCURACY ---
// LOGIC: As Temp/Humidity increase, score increases. As Wind increases, score decreases.
const INSECT_DATABASE = [
  {
    id: 'noseeum',
    commonName: 'No-See-Um',
    name: 'Ceratopogonidae',
    type: 'Biting',
    dangerLevel: 'Nuisance',
    behavior: 'Extreme sensitivity to air movement. Require near-saturation ground humidity for emergence swarms.',
    calculateThreat: (t, h, w, time) => {
      // 1. Wind Suppression: Absolute flight failure above 5mph.
      // Score is highest at 0mph.
      const wSuppression = Math.max(0, 1 - (w / 5));
      if (wSuppression <= 0) return 0;

      // 2. Humidity Factor: Strictly increasing. They thrive as humidity hits 100%.
      // We use a floor of 40% where activity is effectively 0.
      const hFact = Math.min(100, Math.max(0, (h - 40) * 1.67));

      // 3. Temperature Factor: Strictly increasing up to 105F.
      // Metabolism accelerates as it warms. Activity starts at 60F.
      const tFact = Math.min(100, Math.max(0, (t - 60) * 2.2));

      // 4. Time Multiplier: Peak during light transition (Crepuscular)
      const isPeakTime = (time >= 5 && time <= 8) || (time >= 17 && time <= 21);
      const timeBonus = isPeakTime ? 1.2 : 0.6;

      const baseScore = ((tFact * 0.4) + (hFact * 0.6)) * wSuppression * timeBonus;
      return Math.round(Math.min(100, baseScore));
    }
  },
  {
    id: 'mosq-aedes',
    commonName: 'Aedes Mosquito',
    name: 'Aedes Aegypti',
    type: 'Biting',
    dangerLevel: 'High',
    behavior: 'Aggressive in still, humid heat. Highly sensitive to wind-based flight disruption.',
    calculateThreat: (t, h, w, time) => {
      const wSuppression = Math.max(0, 1 - (w / 15));
      if (wSuppression <= 0) return 0;

      const tFact = Math.min(100, Math.max(0, (t - 45) * 1.6));
      const hFact = h;
      const isPeakTime = (time >= 5 && time <= 8) || (time >= 17 && time <= 20);
      const timeBonus = isPeakTime ? 1.2 : 0.8;

      const baseScore = ((tFact + hFact) / 2) * wSuppression * timeBonus;
      return Math.round(Math.min(100, baseScore));
    }
  },
  {
    id: 'wasp-yellow',
    commonName: 'Yellow Jacket',
    name: 'Vespula Germanica',
    type: 'Stinging',
    dangerLevel: 'Critical',
    behavior: 'Solar-powered hunters. Heat drives aggression and colony metabolic rate.',
    calculateThreat: (t, h, w, time) => {
      if (time < 6 || time > 20) return 0; // Sleep in nest at night
      const tFact = Math.min(100, Math.max(0, (t - 50) * 2.2));
      const hFact = (h * 0.2) + 80; // High baseline
      const wSuppression = Math.max(0.3, 1 - (w / 30));

      const baseScore = ((tFact + hFact) / 2) * wSuppression;
      return Math.round(Math.min(100, baseScore));
    }
  },
  {
    id: 'tick-deer',
    commonName: 'Deer Tick',
    name: 'Ixodes Scapularis',
    type: 'Biting',
    dangerLevel: 'High',
    behavior: 'Questing is purely humidity driven. Wind has no effect on ground-level vectors.',
    calculateThreat: (t, h, w, time) => {
      // Wind is ignored (0 impact)
      const tFact = Math.min(100, Math.max(0, (t - 35) * 1.8));
      const hFact = h < 50 ? 5 : h;

      const baseScore = (tFact * 0.3) + (hFact * 0.7);
      return Math.round(Math.min(100, baseScore));
    }
  },
  {
    id: 'fly-horse',
    commonName: 'Horse Fly',
    name: 'Tabanidae',
    type: 'Biting',
    dangerLevel: 'Moderate',
    behavior: 'Strong flyers active in direct sunlight and extreme heat gradients.',
    calculateThreat: (t, h, w, time) => {
      if (time < 8 || time > 18) return 0;
      const tFact = Math.min(100, Math.max(0, (t - 60) * 2.5));
      const hFact = (h * 0.1) + 90;
      const wSuppression = Math.max(0.5, 1 - (w / 25));

      const baseScore = ((tFact + hFact) / 2) * wSuppression;
      return Math.round(Math.min(100, baseScore));
    }
  }
];

const Card = ({ children, className = "" }) => (
  <div className={`bg-[#0c1111] border border-slate-800/50 rounded-2xl p-6 shadow-2xl relative overflow-hidden ${className}`}>
    {children}
  </div>
);

export default function App() {
  const [temp, setTemp] = useState(85);
  const [humidity, setHumidity] = useState(85);
  const [windSpeed, setWindSpeed] = useState(0);
  const [timeOfDay, setTimeOfDay] = useState(19);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedId, setSelectedId] = useState('noseeum');
  const [user, setUser] = useState(null);
  const [db, setDb] = useState(null);

  useEffect(() => {
    if (firebaseConfig) {
      const app = initializeApp(firebaseConfig);
      const firestore = getFirestore(app);
      const auth = getAuth(app);
      setDb(firestore);

      const initAuth = async () => {
        if (typeof __initial_auth_token !== 'undefined' && __initial_auth_token) {
          await signInWithCustomToken(auth, __initial_auth_token);
        } else {
          await signInAnonymously(auth);
        }
      };
      initAuth();
      const unsubscribe = onAuthStateChanged(auth, setUser);
      return () => unsubscribe();
    }
  }, []);

  const selectedInsect = useMemo(() =>
    INSECT_DATABASE.find(i => i.id === selectedId) || INSECT_DATABASE[0]
  , [selectedId]);

  const metrics = useMemo(() => {
    const score = selectedInsect.calculateThreat(temp, humidity, windSpeed, timeOfDay);

    let level = "Safe";
    let color = "text-emerald-500";
    let glow = "shadow-[0_0_20px_rgba(16,185,129,0.1)]";

    if (score > 25) { level = "Elevated"; color = "text-yellow-500"; glow = "shadow-[0_0_20px_rgba(234,179,8,0.2)]"; }
    if (score > 55) { level = "High Alert"; color = "text-orange-500"; glow = "shadow-[0_0_25px_rgba(249,115,22,0.3)]"; }
    if (score > 80) { level = "CRITICAL"; color = "text-red-600"; glow = "shadow-[0_0_40px_rgba(220,38,38,0.4)]"; }

    return { score, level, color, glow };
  }, [temp, humidity, windSpeed, timeOfDay, selectedInsect]);

  const filteredInsects = INSECT_DATABASE.filter(i =>
    i.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    i.commonName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatTime = (h) => {
    const ampm = h >= 12 ? 'PM' : 'AM';
    const hour = h % 12 || 12;
    return `${hour}:00 ${ampm}`;
  };

  return (
    <div className="min-h-screen bg-[#050707] text-slate-300 p-4 lg:p-8 font-mono">
      <style>{`
        input[type=range] { -webkit-appearance: none; width: 100%; background: transparent; }
        input[type=range]::-webkit-slider-thumb {
          -webkit-appearance: none; height: 18px; width: 18px; border-radius: 50%;
          background: #ef4444; cursor: pointer; margin-top: -6px; border: 2px solid #fff;
          box-shadow: 0 0 10px rgba(239, 68, 68, 0.5);
        }
        input[type=range]::-webkit-slider-runnable-track {
          width: 100%; height: 6px; cursor: pointer; background: #1e293b; border-radius: 3px;
        }
        input[type=range]:focus { outline: none; }
      `}</style>

      <div className="max-w-6xl mx-auto space-y-6">

        {/* HEADER */}
        <div className="flex flex-col md:flex-row justify-between items-center bg-[#0c1111] p-4 rounded-xl border border-slate-800/50 gap-4 shadow-xl">
          <div className="flex items-center gap-3">
            <div className="bg-red-600 p-2 rounded-lg shadow-[0_0_15px_rgba(220,38,38,0.4)]">
              <ShieldAlert className="text-white" size={20} />
            </div>
            <div>
              <h1 className="text-xl font-black text-white uppercase italic tracking-tighter leading-none">PESKY® <span className="text-red-600">TACTICAL</span></h1>
              <p className="text-[8px] text-slate-500 tracking-widest mt-1 uppercase font-bold">Vector Intelligence v4.5 // Precise Ground Analysis</p>
            </div>
          </div>

          <div className="flex bg-black/40 p-1 rounded-lg border border-white/5 shadow-inner">
            {['dashboard', 'lookup'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-2 rounded-md text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === tab ? 'bg-red-600 text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'}`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {activeTab === 'dashboard' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-in fade-in duration-700">

            {/* THREAT DISPLAY */}
            <Card className="lg:col-span-4 flex flex-col items-center justify-center py-12 border-t-4 border-red-600/20">
               <div className="absolute top-4 left-4 flex items-center gap-2">
                 <div className="w-2 h-2 rounded-full bg-red-600 animate-pulse"></div>
                 <span className="text-[8px] font-bold text-red-600 uppercase tracking-widest italic">Live Profile Analysis</span>
               </div>

               <div className="text-center mb-6">
                  <div className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">Selected Vector</div>
                  <div className="text-white font-black text-xl italic uppercase mt-1">{selectedInsect.commonName}</div>
               </div>

               <div className="relative">
                 <div className={`text-[120px] font-black leading-none tracking-tighter transition-all duration-500 ${metrics.color} ${metrics.glow}`}>
                   {metrics.score}
                 </div>
                 <div className="absolute -top-2 -right-6 text-[10px] font-bold text-slate-700 bg-black px-1 border border-slate-800 uppercase tracking-tighter">SCORE</div>
               </div>

               <div className={`mt-6 px-6 py-1.5 rounded-full text-xs font-black uppercase italic tracking-[0.2em] border-2 transition-all duration-500 ${metrics.color} border-current shadow-lg`}>
                 {metrics.level}
               </div>

               <div className="w-full max-w-[200px] h-1.5 bg-slate-900 rounded-full mt-10 overflow-hidden shadow-inner">
                 <div
                   className={`h-full transition-all duration-1000 ${metrics.score > 60 ? 'bg-red-600' : 'bg-emerald-500'}`}
                   style={{ width: `${metrics.score}%` }}
                 ></div>
               </div>
            </Card>

            {/* ENVIRONMENTAL TELEMETRY */}
            <Card className="lg:col-span-5 space-y-8">
               <h2 className="text-xs font-black text-white uppercase tracking-widest border-b border-slate-800 pb-4 flex items-center gap-2">
                 <Activity size={14} className="text-red-600" /> Bio-Ground Conditions
               </h2>

               <div className="space-y-6 py-2">
                  <div className="space-y-4">
                    <div className="flex justify-between text-xs font-bold uppercase tracking-tighter">
                      <span className="flex items-center gap-2 text-slate-400"><Thermometer size={14} className="text-red-500"/> Air Temp</span>
                      <span className="text-white font-black">{temp}°F</span>
                    </div>
                    <input type="range" min="30" max="110" step="1" value={temp} onChange={(e) => setTemp(parseInt(e.target.value))} />
                  </div>

                  <div className="space-y-4">
                    <div className="flex justify-between text-xs font-bold uppercase tracking-tighter">
                      <span className="flex items-center gap-2 text-slate-400"><Droplets size={14} className="text-blue-500"/> Ground Humidity</span>
                      <span className="text-white font-black">{humidity}%</span>
                    </div>
                    <input type="range" min="0" max="100" step="1" value={humidity} onChange={(e) => setHumidity(parseInt(e.target.value))} />
                  </div>

                  <div className="space-y-4">
                    <div className="flex justify-between text-xs font-bold uppercase tracking-tighter">
                      <span className="flex items-center gap-2 text-slate-400"><Wind size={14} className="text-slate-500"/> Wind Suppression</span>
                      <span className="text-white font-black">{windSpeed} MPH</span>
                    </div>
                    {/* Fixed ReferenceError by using Wind component correctly */}
                    <input type="range" min="0" max="40" step="1" value={windSpeed} onChange={(e) => setWindSpeed(parseInt(e.target.value))} />
                  </div>

                  <div className="space-y-4 pt-4 border-t border-slate-800/50">
                    <div className="flex justify-between text-xs font-bold uppercase tracking-tighter">
                      <span className="flex items-center gap-2 text-yellow-500"><Clock size={14} /> Circadian Period</span>
                      <span className="text-white font-black flex items-center gap-2">
                        {timeOfDay >= 6 && timeOfDay <= 18 ? <Sun size={10}/> : <Moon size={10}/>}
                        {formatTime(timeOfDay)}
                      </span>
                    </div>
                    <input
                        type="range" min="0" max="23" step="1" value={timeOfDay}
                        onChange={(e) => setTimeOfDay(parseInt(e.target.value))}
                        className="w-full accent-yellow-500 bg-slate-800 h-1.5 rounded-full appearance-none cursor-pointer"
                    />
                  </div>
               </div>
            </Card>

            {/* BIO-INTEL BRIEF */}
            <Card className="lg:col-span-3 flex flex-col">
              <h2 className="text-xs font-black text-white uppercase tracking-widest border-b border-slate-800 pb-4 mb-6 flex items-center gap-2">
                <Zap size={14} className="text-yellow-500" /> Ground Intelligence
              </h2>

              <div className="space-y-4 flex-1">
                <div className="bg-black/40 p-4 rounded-xl border border-white/5 min-h-[100px]">
                  <div className="text-[8px] font-bold text-slate-500 uppercase mb-2 tracking-widest">Species Dynamics</div>
                  <p className="text-[11px] text-slate-300 italic leading-relaxed font-sans">
                    "{selectedInsect.behavior}"
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-black/40 p-3 rounded-xl border border-white/5">
                    <div className="text-[7px] font-bold text-slate-500 uppercase">Vector Type</div>
                    <div className="text-[10px] font-black text-white uppercase mt-1">{selectedInsect.type}</div>
                  </div>
                  <div className="bg-black/40 p-3 rounded-xl border border-white/5">
                    <div className="text-[7px] font-bold text-slate-500 uppercase">Risk Level</div>
                    <div className={`text-[10px] font-black uppercase mt-1 ${selectedId === 'noseeum' ? 'text-blue-400' : 'text-red-500'}`}>
                      {selectedInsect.dangerLevel}
                    </div>
                  </div>
                </div>

                <div className="mt-auto p-4 border border-red-600/20 bg-red-600/5 rounded-xl text-center shadow-lg">
                   <div className="text-[9px] font-black text-red-600 uppercase mb-1">Defense Protocol</div>
                   <div className="text-[10px] text-white font-bold uppercase">
                     {metrics.score > 75 ? "Full Mesh Jacket Required" : metrics.score > 40 ? "Intensive Repellent Coverage" : "Standard Surveillance"}
                   </div>
                </div>
              </div>
            </Card>
          </div>
        )}

        {activeTab === 'lookup' && (
          <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-red-600 to-orange-600 rounded-2xl blur opacity-10 group-hover:opacity-30 transition"></div>
              <div className="relative">
                <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-600" size={20} />
                <input
                  type="text"
                  placeholder="QUERY BIOLOGICAL DATABASE..."
                  className="w-full bg-[#0c1111] border border-slate-800 rounded-2xl p-6 pl-16 outline-none text-white font-black uppercase tracking-widest text-sm focus:border-red-600 transition-colors"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredInsects.map(insect => (
                <button
                  key={insect.id}
                  onClick={() => { setSelectedId(insect.id); setActiveTab('dashboard'); window.scrollTo(0,0); }}
                  className={`p-6 rounded-2xl border text-left transition-all flex flex-col justify-between group h-full shadow-lg ${selectedId === insect.id ? 'border-red-600 bg-red-600/5 ring-1 ring-red-600' : 'border-slate-800 bg-[#0c1111] hover:border-slate-600'}`}
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className={`px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-tighter ${insect.type === 'Stinging' ? 'bg-orange-600/20 text-orange-400' : 'bg-red-600/20 text-red-500'}`}>
                      {insect.type}
                    </div>
                    <Bug size={14} className="text-slate-800 group-hover:text-red-600 transition-colors" />
                  </div>
                  <div className="text-lg font-black text-white uppercase italic leading-none group-hover:text-red-500 transition-colors mb-1">{insect.commonName}</div>
                  <div className="text-[9px] font-bold text-slate-600 uppercase tracking-widest">{insect.name}</div>

                  <div className="flex justify-between items-center pt-4 border-t border-slate-800/50 mt-6">
                    <span className="text-[9px] font-black text-slate-500 uppercase tracking-[0.2em]">Deploy Profiler</span>
                    <ChevronRight size={14} className="text-slate-700 group-hover:translate-x-1 transition-transform" />
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        <footer className="pt-12 pb-6 border-t border-slate-900 mt-12 opacity-30 flex justify-between items-center">
          <div className="text-[8px] font-black uppercase tracking-[0.4em]">Vector Bio-Systems // v4.5</div>
          <div className="text-[8px] font-black uppercase tracking-[0.4em] text-red-600">PESKY® TACTICAL INTEL</div>
        </footer>
      </div>
    </div>
  );
}
