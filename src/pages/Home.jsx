import { useState, useEffect } from "react";
import { initialTraffic, initialSignal } from "../data/initialData";
import { getSignalDecision } from "../logic/signalLogic";

// Components
import Dashboard from "../components/Dashboard";
import TrafficControls from "../components/TrafficControls";
import TrafficLights from "../components/TrafficLights";
import Analytics from "../components/Analytics";
import RoadSimulation from "../components/RoadSimulation";

// Icons (Assuming you use lucide-react)
import { Activity } from "lucide-react";

function Home() {
  // 🚗 Traffic Data
  const [traffic, setTraffic] = useState(initialTraffic);

  // 🚦 Signal State
  const [currentGreen, setCurrentGreen] = useState(initialSignal.currentGreen);
  const [timer, setTimer] = useState(initialSignal.time);

  // ⏳ Waiting Time
  const [waitingTime, setWaitingTime] = useState({ A: 0, B: 0, C: 0 });

  // 📊 Analytics Data
  const [history, setHistory] = useState([]);

  // --- LOGIC (UNCHANGED) ---
  function addVehicle(road) {
    setTraffic(prev => ({ ...prev, [road]: prev[road] + 1 }));
  }

  function removeVehicle(road) {
    setTraffic(prev => ({ ...prev, [road]: Math.max(0, prev[road] - 1) }));
  }

  function updateSignal(emergencyRoad = null) {
    if (emergencyRoad) {
      setCurrentGreen(emergencyRoad);
      setTimer(60);
      return;
    }
    const decision = getSignalDecision(traffic, waitingTime);
    setCurrentGreen(decision.road);
    setTimer(decision.time);
    setHistory(prev => [
      ...prev,
      { ...traffic, road: decision.road, density: decision.density, time: decision.time, timestamp: Date.now() }
    ]);
  }

  useEffect(() => {
    if (timer <= 0) {
      updateSignal();
      return;
    }
    const interval = setInterval(() => {
      setTimer(prev => Math.max(0, prev - 1));
    }, 1000);
    return () => clearInterval(interval);
  }, [timer]);

  useEffect(() => {
    const flow = setInterval(() => {
      setTraffic(prev => {
        let updated = { ...prev };
        if (currentGreen === "A") updated.A = Math.max(0, prev.A - 2);
        if (currentGreen === "B") updated.B = Math.max(0, prev.B - 2);
        if (currentGreen === "C") updated.C = Math.max(0, prev.C - 2);
        return updated;
      });
    }, 1000);
    return () => clearInterval(flow);
  }, [currentGreen]);

  useEffect(() => {
    const interval = setInterval(() => {
      setWaitingTime(prev => {
        let updated = { ...prev };
        Object.keys(prev).forEach(road => {
          if (road !== currentGreen) updated[road] += 1;
          else updated[road] = 0;
        });
        return updated;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [currentGreen]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTraffic(prev => ({
        A: prev.A + Math.floor(Math.random() * 3),
        B: prev.B + Math.floor(Math.random() * 3),
        C: prev.C + Math.floor(Math.random() * 3)
      }));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  function handleEmergency(road) {
    updateSignal(road);
  }
  // --- END LOGIC ---

  return (
    <div className="min-h-screen bg-[#020617] text-slate-100 font-sans selection:bg-cyan-500/30">
      {/* Background Glows */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] rounded-full bg-cyan-500/10 blur-[120px]" />
        <div className="absolute top-[20%] -right-[10%] w-[30%] h-[30%] rounded-full bg-purple-500/10 blur-[120px]" />
      </div>

      <div className="relative max-w-7xl mx-auto p-4 md:p-8 space-y-8">
        {/* Header Section */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-8">
          <div>
            <div className="flex items-center gap-2 text-cyan-400 mb-1">
              <Activity size={18} className="animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-widest">System Live</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
              Smart Traffic <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Control Center</span>
            </h1>
          </div>
          
          <div className="flex items-center gap-4 bg-white/5 border border-white/10 p-2 rounded-xl backdrop-blur-md">
             {/* Optional: Add a clock or status pill here */}
             <div className="px-4 py-2 bg-emerald-500/20 rounded-lg border border-emerald-500/20">
                <p className="text-emerald-400 text-xs font-bold uppercase">AI Optimization Active</p>
             </div>
          </div>
        </header>

        {/* Main Dashboard Grid */}
        <main className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Status & Simulation (8 Units) */}
          <div className="lg:col-span-8 space-y-8">
            <Dashboard 
              traffic={traffic} 
              currentGreen={currentGreen} 
              timer={timer} 
            />
            
            <div className="bg-white/5 border border-white/10 rounded-3xl p-1 backdrop-blur-xl">
               <RoadSimulation 
                traffic={traffic} 
                currentGreen={currentGreen} 
              />
            </div>
          </div>

          {/* Right Column: Controls & Lights (4 Units) */}
          <div className="lg:col-span-4 space-y-8">
            <TrafficLights currentGreen={currentGreen} />
            
            <TrafficControls 
              addVehicle={addVehicle} 
              removeVehicle={removeVehicle} 
              handleEmergency={handleEmergency} 
            />
          </div>

          {/* Bottom Row: Analytics (Full Width) */}
          <div className="lg:col-span-12">
            <Analytics history={history} />
          </div>
        </main>

        <footer className="text-center pt-8 text-slate-500 text-sm border-t border-white/5">
          © 2026 SmartTraffic OS • Predictive Signal Routing System
        </footer>
      </div>
    </div>
  );
}

export default Home;