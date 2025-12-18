import React, { useState } from "react";
// We are pointing exactly to the components folder where your updates are
import Dashboard from "./components/Dashboard";
import BugEncyclopedia from "./components/BugEncyclopedia";
import BugDetail from "./components/BugDetail";
import MapVisualization from "./components/MapVisualization";
import BugGuide from "./components/BugGuide";
import BottomNav from "./components/BottomNav";
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

export default function App() {
  const [selectedBug, setSelectedBug] = useState(null);
  const [activeTab, setActiveTab] = useState("dashboard"); 
// --- FIREBASE CONFIGURATION & INITIALIZATION ---
// NOTE: If you don't have these variables set up in Vercel yet, the app will use 'default-app-id'
const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';
const firebaseConfig = typeof __firebase_config !== 'undefined' ? JSON.parse(__firebase_config) : null; 
const initialAuthToken = typeof __initial_auth_token !== 'undefined' ? __initial_auth_token : null;

// --- REUSABLE UI COMPONENTS ---

  const handleTabChange = (newTab) => {
    setActiveTab(newTab);
    setSelectedBug(null); 
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

const formatTime = (hour) => {
  const ampm = hour >= 12 ? 'PM' : 'AM';
  const h = hour % 12 || 12;
  return `${h}:00 ${ampm}`;
};

// --- SUB-COMPONENTS ---

const PresetManager = ({
    presets,
    presetName,
    setPresetName,
    handleSavePreset,
    handleLoadPreset,
    handleDeletePreset,
    isSaving,
    isLoadingPresets,
    setShowPresetManager
}) => (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <Card className="max-w-xl w-full max-h-[90vh] overflow-y-auto space-y-4">
        <h2 className="text-xl font-bold text-emerald-300 flex items-center gap-2 border-b border-emerald-700/50 pb-3">
          <List className="w-5 h-5" />
          Location Preset Manager
        </h2>
        
        <div className="p-4 bg-slate-700/50 rounded-lg space-y-3">
          <h3 className="font-semibold text-slate-100 flex items-center gap-2"><Upload className="w-4 h-4" /> Save Current Location</h3>
          <div className="flex gap-3">
            <input
              type="text"
              placeholder="Enter State / City / Area Name"
              value={presetName}
              onChange={(e) => setPresetName(e.target.value)} 
              className="flex-grow p-2 rounded-lg bg-slate-800 border border-emerald-700 text-white focus:ring-emerald-500 focus:border-emerald-500"
            />
            <button
              onClick={handleSavePreset}
              disabled={isSaving || !presetName.trim()}
              className="flex items-center gap-2 text-sm font-medium bg-emerald-600 hover:bg-emerald-700 px-3 py-2 rounded-lg shadow-lg transition disabled:bg-slate-700 disabled:cursor-not-allowed"
            >
              {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              Save
            </button>
          </div>
        </div>

        <div className="space-y-3 pt-4">
          <h3 className="font-semibold text-slate-100 flex items-center gap-2"><Download className="w-4 h-4" /> Load Saved Areas ({presets.length})</h3>
          {isLoadingPresets ? (
            <div className="text-center p-4 text-slate-400 flex items-center justify-center gap-2">
              <Loader2 className="w-5 h-5 animate-spin" /> Loading...
            </div>
          ) : (
            <div className="space-y-2">
              {presets.map((preset) => (
                <div 
                  key={preset.id}
                  onClick={() => handleLoadPreset(preset)}
                  className="flex items-center justify-between p-3 bg-slate-700/50 rounded-lg cursor-pointer hover:bg-emerald-800/50 transition border border-slate-700"
                >
                  <div className="flex-grow">
                    <p className="font-medium text-white">{preset.name}</p>
                    <p className="text-xs text-slate-400">
                      {preset.temp}°F | {preset.humidity}% H | {preset.windSpeed} mph
                    </p>
                  </div>
                  <button onClick={(e) => handleDeletePreset(e, preset.id)} className="p-1 text-red-400 hover:text-red-300">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
        <button onClick={() => setShowPresetManager(false)} className="w-full mt-4 bg-slate-700 p-2 rounded-lg">Close</button>
      </Card>
    </div>
);

const US_REGIONS_SVG = {
    'West': 'M30 10 L70 10 L70 40 L30 40 Z',
    'Midwest': 'M70 45 L120 45 L120 75 L70 75 Z',
    'SouthEast': 'M125 80 L180 80 L180 120 L125 120 Z',
    'Northeast': 'M185 10 L220 10 L220 40 L185 40 Z',
    'Texas': 'M70 120 L120 120 L120 170 L70 170 Z',
    'Florida': 'M220 100 L250 100 L250 130 L220 130 Z'
};

const REGION_MONTHLY_ACTIVITY = {
    'January': { 'West': 'low', 'Midwest': 'low', 'SouthEast': 'low', 'Northeast': 'low', 'Texas': 'low', 'Florida': 'low' },
    'July': { 'West': 'high', 'Midwest': 'severe', 'SouthEast': 'severe', 'Northeast': 'high', 'Texas': 'severe', 'Florida': 'severe' },
    // Simplified for this example
};

const MapVisualization = () => {
    const [month, setMonth] = useState('July');
    const activityData = REGION_MONTHLY_ACTIVITY[month] || REGION_MONTHLY_ACTIVITY['January'];

    return (
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
  const [activeTab, setActiveTab] = useState('dashboard');
  const [db, setDb] = useState(null);
  const [userId, setUserId] = useState(null);
  const [isAuthReady, setIsAuthReady] = useState(false);
  const [presets, setPresets] = useState([]);
  const [presetName, setPresetName] = useState('');
  const [showPresetManager, setShowPresetManager] = useState(false);

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
    }
  }, []);

  const riskAnalysis = useMemo(() => {
      let score = (temp > 70 ? 40 : 10) + (humidity > 60 ? 30 : 5) - (windSpeed * 2);
      score = Math.max(0, Math.min(100, score));
      let level = "Low";
      if (score > 40) level = "Moderate";
      if (score > 70) level = "High";
      return { score, level };
  }, [temp, humidity, windSpeed]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans">
      {/* PESKY Header */}
      {!selectedBug && (
        <header className="fixed top-0 left-0 w-full z-[100] bg-emerald-700 p-4 shadow-xl">
          <h1 className="text-white font-black text-center text-xl tracking-tighter uppercase italic">PESKY®</h1>
    <div className="min-h-screen bg-gradient-to-br from-emerald-950 to-teal-950 text-slate-100 p-4 md:p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        
        {showPresetManager && <PresetManager presets={presets} presetName={presetName} setPresetName={setPresetName} setShowPresetManager={setShowPresetManager} />}

        <header className="flex justify-between items-center border-b border-emerald-800 pb-4">
          <h1 className="text-2xl font-bold flex items-center gap-2"><Bug className="text-emerald-400" /> PESKY Tracker</h1>
          <button onClick={() => setShowPresetManager(true)} className="bg-emerald-600 px-4 py-2 rounded-full text-sm">Add Location</button>
        </header>
      )}

      <main className={!selectedBug ? "pt-20 pb-24" : ""}>
        {selectedBug ? (
          <BugDetail bug={selectedBug} onBack={() => setSelectedBug(null)} />
        ) : (
          <div className="animate-in fade-in duration-500">
            {activeTab === "dashboard" && <Dashboard />}
            {activeTab === "bugs" && <BugEncyclopedia onSelectBug={(bug) => setSelectedBug(bug)} />}
            {activeTab === "map" && <MapVisualization />}
            {activeTab === "guide" && <BugGuide />}

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
                    
                    <label className="flex justify-between text-sm"><span>Humidity</span> <span>{humidity}%</span></label>
                    <input type="range" min="0" max="100" value={humidity} onChange={(e) => setHumidity(e.target.value)} className="w-full accent-emerald-500" />
                </div>
                <div className="space-y-4">
                    <label className="flex justify-between text-sm"><span>Wind Speed</span> <span>{windSpeed} mph</span></label>
                    <input type="range" min="0" max="30" value={windSpeed} onChange={(e) => setWindSpeed(e.target.value)} className="w-full accent-emerald-500" />
                </div>
            </Card>
          </div>
        )}
      </main>

      {!selectedBug && <BottomNav tab={activeTab} setTab={handleTabChange} />}
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
