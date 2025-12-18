+76
-43

import React, { useState, useEffect, useMemo } from 'react';
import { 
  Bug, 
  Wind, 
  Thermometer, 
  Droplets, 
  Sun, 
  AlertTriangle, 
  Shield, 
  Info,
  MapPin,
  Clock,
import {
  Bug,
  Save,
  Loader2,
  Trash2,
  List,
  Upload,
  Download,
  Map
} from 'lucide-react';
import { initializeApp } from 'firebase/app';
import { getAuth, signInAnonymously, signInWithCustomToken, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, setDoc, onSnapshot, collection, addDoc, deleteDoc, query } from 'firebase/firestore';

// --- FIREBASE CONFIGURATION & INITIALIZATION ---
// NOTE: If you don't have these variables set up in Vercel yet, the app will use 'default-app-id'
const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';
const firebaseConfig = typeof __firebase_config !== 'undefined' ? JSON.parse(__firebase_config) : null; 
const initialAuthToken = typeof __initial_auth_token !== 'undefined' ? __initial_auth_token : null;

// --- REUSABLE UI COMPONENTS ---

const Card = ({ children, className = "" }) => (
  <div className={`bg-slate-800/70 backdrop-blur-sm rounded-xl shadow-2xl shadow-black/30 border border-emerald-800 p-6 ${className}`}>
    {children}
  </div>
);

const Badge = ({ children, color = "emerald" }) => {
  const colors = {
    emerald: "bg-emerald-700 text-emerald-100",
    red: "bg-red-800 text-red-100",
    yellow: "bg-yellow-700 text-yellow-100",
    orange: "bg-orange-800 text-orange-100",
    blue: "bg-sky-400 text-sky-950", 
    purple: "bg-purple-700 text-purple-100",
    indigo: "bg-indigo-700 text-indigo-100",
  };
  return (
    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${colors[color] || colors.emerald}`}>
      {children}
    </span>
  );
};
@@ -156,141 +138,192 @@ const MapVisualization = () => {
        <Card className="space-y-6">
            <h2 className="text-xl font-bold text-emerald-300 flex items-center gap-2">
                <Map className="w-6 h-6" /> Regional Hotspots
            </h2>
            <div className="flex justify-center bg-slate-900 p-4 rounded-lg">
                <svg viewBox="0 0 260 180" className="w-full max-w-sm">
                   {Object.entries(US_REGIONS_SVG).map(([name, path]) => (
                       <path key={name} d={path} className="fill-emerald-600 stroke-emerald-900 hover:fill-emerald-400 transition" />
                   ))}
                </svg>
            </div>
        </Card>
    );
};

const BugGuide = ({ riskLevel }) => (
    <Card className="space-y-4">
        <h2 className="text-xl font-bold text-emerald-300">Bug Activity Guide</h2>
        <p className="text-slate-300 text-sm">Understanding the life cycle of bugs like mosquitoes is key to protection. They thrive in heat and standing water. 

[Image of mosquito life cycle]
</p>
        <div className="p-4 bg-slate-900/50 rounded-lg">
            <h3 className="font-bold text-white mb-2">Current Risk: {riskLevel}</h3>
            <ul className="text-xs space-y-2 text-slate-400">
                <li>• Temp > 65°F: Increased Breeding</li>
                <li>• Humidity > 70%: Ideal Survival</li>
                <li>• Wind < 5mph: Peak Activity</li>
                <li>• Temp &gt; 65°F: Increased Breeding</li>
                <li>• Humidity &gt; 70%: Ideal Survival</li>
                <li>• Wind &lt; 5mph: Peak Activity</li>
            </ul>
        </div>
    </Card>
);

const ProtectionTips = () => (
    <Card className="space-y-4">
        <h2 className="text-xl font-bold text-emerald-300">Protection Strategies</h2>
        <div className="grid grid-cols-2 gap-4 text-xs text-slate-300">
            <div>
                <h4 className="font-bold text-white">Dress</h4>
                <p>Wear light colors and long sleeves. </p>
            </div>
            <div>
                <h4 className="font-bold text-white">Environment</h4>
                <p>Remove standing water near your home.</p>
            </div>
        </div>
    </Card>
);

// --- MAIN APPLICATION COMPONENT ---

export default function App() {
  const [temp, setTemp] = useState(82); 
  const [humidity, setHumidity] = useState(75); 
  const [windSpeed, setWindSpeed] = useState(3); 
  const [timeOfDay, setTimeOfDay] = useState(19); 
  const [temp, setTemp] = useState(82);
  const [humidity, setHumidity] = useState(75);
  const [windSpeed, setWindSpeed] = useState(3);
  const [timeOfDay, setTimeOfDay] = useState(19);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [db, setDb] = useState(null);
  const [userId, setUserId] = useState(null);
  const [isAuthReady, setIsAuthReady] = useState(false);
  const [presets, setPresets] = useState([]);
  const [presetName, setPresetName] = useState('');
  const [showPresetManager, setShowPresetManager] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoadingPresets, setIsLoadingPresets] = useState(true);

  const storageKey = 'pesky-bug-presets';

  useEffect(() => {
    if (firebaseConfig) {
      const app = initializeApp(firebaseConfig);
      const firestore = getFirestore(app);
      const auth = getAuth(app);
      setDb(firestore);
      signInAnonymously(auth).then(() => {
          setUserId(auth.currentUser.uid);
          setIsAuthReady(true);
      });
    if (typeof window === 'undefined') return;
    try {
      const stored = localStorage.getItem(storageKey);
      if (stored) {
        setPresets(JSON.parse(stored));
      }
    } catch (err) {
      console.error('Failed to load presets', err);
    } finally {
      setIsLoadingPresets(false);
    }
  }, []);

  const persistPresets = (nextPresets) => {
    setPresets(nextPresets);
    if (typeof window !== 'undefined') {
      localStorage.setItem(storageKey, JSON.stringify(nextPresets));
    }
  };

  const handleSavePreset = () => {
    if (!presetName.trim()) return;
    setIsSaving(true);
    const newPreset = {
      id: crypto.randomUUID(),
      name: presetName.trim(),
      temp: Number(temp),
      humidity: Number(humidity),
      windSpeed: Number(windSpeed)
    };

    const nextPresets = [...presets, newPreset];
    persistPresets(nextPresets);
    setPresetName('');
    setIsSaving(false);
  };

  const handleLoadPreset = (preset) => {
    setTemp(preset.temp);
    setHumidity(preset.humidity);
    setWindSpeed(preset.windSpeed);
    setShowPresetManager(false);
  };

  const handleDeletePreset = (event, presetId) => {
    event.stopPropagation();
    const filtered = presets.filter((preset) => preset.id !== presetId);
    persistPresets(filtered);
  };

  const riskAnalysis = useMemo(() => {
      let score = (temp > 70 ? 40 : 10) + (humidity > 60 ? 30 : 5) - (windSpeed * 2);
      score = Math.max(0, Math.min(100, score));
      let level = "Low";
      if (score > 40) level = "Moderate";
      if (score > 70) level = "High";
      return { score, level };
  }, [temp, humidity, windSpeed]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-950 to-teal-950 text-slate-100 p-4 md:p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        
        {showPresetManager && <PresetManager presets={presets} presetName={presetName} setPresetName={setPresetName} setShowPresetManager={setShowPresetManager} />}
        {showPresetManager && (
          <PresetManager
            presets={presets}
            presetName={presetName}
            setPresetName={setPresetName}
            handleSavePreset={handleSavePreset}
            handleLoadPreset={handleLoadPreset}
            handleDeletePreset={handleDeletePreset}
            isSaving={isSaving}
            isLoadingPresets={isLoadingPresets}
            setShowPresetManager={setShowPresetManager}
          />
        )}

        <header className="flex justify-between items-center border-b border-emerald-800 pb-4">
          <h1 className="text-2xl font-bold flex items-center gap-2"><Bug className="text-emerald-400" /> PESKY Tracker</h1>
          <button onClick={() => setShowPresetManager(true)} className="bg-emerald-600 px-4 py-2 rounded-full text-sm">Add Location</button>
        </header>

        <nav className="flex gap-4">
            <button onClick={() => setActiveTab('dashboard')} className={`px-4 py-2 rounded-full ${activeTab === 'dashboard' ? 'bg-emerald-500' : 'bg-slate-800'}`}>Dashboard</button>
            <button onClick={() => setActiveTab('guide')} className={`px-4 py-2 rounded-full ${activeTab === 'guide' ? 'bg-emerald-500' : 'bg-slate-800'}`}>Guide</button>
            <button onClick={() => setActiveTab('map')} className={`px-4 py-2 rounded-full ${activeTab === 'map' ? 'bg-emerald-500' : 'bg-slate-800'}`}>Map</button>
        </nav>

        {activeTab === 'dashboard' && (
          <div className="grid gap-6">
            <Card className="text-center">
                <h2 className="text-slate-400 uppercase text-xs tracking-widest mb-2">Threat Level</h2>
                <div className="text-6xl font-black text-emerald-400">{riskAnalysis.level}</div>
                <div className="mt-4 h-2 bg-slate-700 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500 transition-all" style={{ width: `${riskAnalysis.score}%` }}></div>
                </div>
            </Card>

            <Card className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                    <label className="flex justify-between text-sm"><span>Temperature</span> <span>{temp}°F</span></label>
                    <input type="range" min="40" max="110" value={temp} onChange={(e) => setTemp(e.target.value)} className="w-full accent-emerald-500" />
                    <input type="range" min="40" max="110" value={temp} onChange={(e) => setTemp(Number(e.target.value))} className="w-full accent-emerald-500" />
                    
                    <label className="flex justify-between text-sm"><span>Humidity</span> <span>{humidity}%</span></label>
                    <input type="range" min="0" max="100" value={humidity} onChange={(e) => setHumidity(e.target.value)} className="w-full accent-emerald-500" />
                    <input type="range" min="0" max="100" value={humidity} onChange={(e) => setHumidity(Number(e.target.value))} className="w-full accent-emerald-500" />
                </div>
                <div className="space-y-4">
                    <label className="flex justify-between text-sm"><span>Wind Speed</span> <span>{windSpeed} mph</span></label>
                    <input type="range" min="0" max="30" value={windSpeed} onChange={(e) => setWindSpeed(e.target.value)} className="w-full accent-emerald-500" />
                    <input type="range" min="0" max="30" value={windSpeed} onChange={(e) => setWindSpeed(Number(e.target.value))} className="w-full accent-emerald-500" />
                </div>
            </Card>
          </div>
        )}

        {activeTab === 'guide' && (
            <div className="space-y-6">
                <BugGuide riskLevel={riskAnalysis.level} />
                <ProtectionTips />
            </div>
        )}

        {activeTab === 'map' && <MapVisualization />}
      </div>
    </div>
  );
}
