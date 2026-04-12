// import { useState, useEffect } from "react";
// import { initialTraffic } from "../data/initialData";
// import { sensorsData } from "../data/sensorsData";
// import { getSignalDecision } from "../logic/signalLogic";

// // Icons (Lucide React recommended for premium feel)
// import {
//   LayoutDashboard,
//   Database,
//   Cctv,
//   TrafficCone,
//   BarChart3,
//   Settings,
// } from "lucide-react";

// // 📊 Modules
// import Dashboard from "../components/dashboard/Dashboard";
// import DataCollection from "../components/data/DataCollection";
// import CameraFeed from "../components/detection/CameraFeed";
// import SignalControl from "../components/control/SignalControl";
// import Analytics from "../components/analytics/Analytics";
// import AdvancedCharts from "../components/analytics/AdvancedCharts";
// import Heatmap from "../components/analytics/Heatmap";
// import LiveLogs from "../components/analytics/LiveLogs";

// function Home() {
//   const roads = ["A", "B", "C", "D"];
//   const [activeModule, setActiveModule] = useState("dashboard");
//   const [traffic, setTraffic] = useState(initialTraffic);
//   const [sensors, setSensors] = useState(sensorsData);
//   const [currentGreen, setCurrentGreen] = useState(["A", "C"]);
//   const [signalPhase, setSignalPhase] = useState("GREEN");
//   const [timer, setTimer] = useState(20);
//   const [waitingTime, setWaitingTime] = useState({ A: 0, B: 0, C: 0, D: 0 });
//   const [history, setHistory] = useState([]);
//   const [logs, setLogs] = useState([]);

//   // --- Logic remains untouched ---
//   const updateSignal = (emergencyRoad = null) => {
//   setSignalPhase("YELLOW");

//   setTimeout(() => {
//     if (emergencyRoad) {

//       // 🚨 EMERGENCY → road + adjacent
//       const adjacent = {
//         A: "B",
//         B: "C",
//         C: "D",
//         D: "A"
//       };

//       setCurrentGreen([emergencyRoad, adjacent[emergencyRoad]]);
//       setTimer(30);

//     } else {
//       const decision = getSignalDecision(
//         traffic,
//         waitingTime,
//         currentGreen
//       );

//       setCurrentGreen(decision.roads);
//       setTimer(decision.time);
//     }

//     setSignalPhase("GREEN");
//   }, 2000);
// };

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setTraffic((prev) => {
//         let updated = { ...prev };
//         roads.forEach((r) => {
//           updated[r] += Math.floor(Math.random() * 2);
//         });
//         currentGreen.forEach((r) => {
//           updated[r] = Math.max(
//             0,
//             updated[r] - (3 + Math.floor(Math.random() * 2)),
//           );
//         });
//         roads.forEach((r) => {
//           updated[r] = Math.min(updated[r], 120);
//         });
//         return updated;
//       });

//       const MIN_TIME = 10;

// setTimer(prev => {

//   const activeTraffic = currentGreen.reduce(
//     (sum, r) => sum + traffic[r],
//     0
//   );

//   const isClear = activeTraffic < 8;

//   // 🟢 EARLY SWITCH
//   if (isClear && prev <= MIN_TIME) {
//     updateSignal();
//     return 0;
//   }

//   // 🔴 EXTEND TIME (NEW 🔥)
//   if (prev <= 1) {

//     if (activeTraffic > 12) {
//       return 10; // extend
//     }

//     updateSignal();
//     return 0;
//   }

//   return prev - 1;
// });

//       setWaitingTime((prev) => {
//         let updated = { ...prev };
//         roads.forEach((r) => {
//           if (!currentGreen.includes(r)) updated[r] += 1;
//           else updated[r] = 0;
//         });
//         return updated;
//       });

//       setHistory((prev) => [...prev.slice(-30), { ...traffic }]);

//       const maxRoad = Object.keys(traffic).reduce((a, b) =>
//         traffic[a] > traffic[b] ? a : b,
//       );
//       const maxVal = traffic[maxRoad];
//       let msg =
//         maxVal > 70
//           ? `[ALERT] Heavy traffic on ${maxRoad}`
//           : maxVal > 30
//             ? `[WARN] Traffic rising on ${maxRoad}`
//             : `[INFO] Smooth flow`;

//       setLogs((prev) => {
//         if (prev[0]?.includes(msg)) return prev;
//         return [
//           `${new Date().toLocaleTimeString()} ${msg}`,
//           ...prev.slice(0, 20),
//         ];
//       });
//     }, 1000);
//     return () => clearInterval(interval);
//   }, [currentGreen]);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setSensors((prev) =>
//         prev.map((s) => ({
//           ...s,
//           battery: Math.max(10, s.battery - Math.random() * 0.5),
//         })),
//       );
//     }, 5000);
//     return () => clearInterval(interval);
//   }, []);

//   const handleEmergency = (road) => updateSignal(road);

//   const renderModule = () => {
//     switch (activeModule) {
//       case "dashboard":
//         return (
//           <Dashboard
//             traffic={traffic}
//             history={history}
//             currentGreen={currentGreen}
//             signalPhase={signalPhase}
//             congestion={Math.min(
//               (Object.values(traffic).reduce((a, b) => a + b, 0) / 200) * 100,
//               100,
//             ).toFixed(1)}
//             sensors={sensors}
//           />
//         );
//       case "data":
//         return (
//           <DataCollection
//             sensors={sensors}
//             traffic={traffic}
//             logs={logs}
//             history={history}
//           />
//         );
//       case "detection":
//         return <CameraFeed traffic={traffic} sensors={sensors} logs={logs} />;
//       case "signal":
//         return (
//           <SignalControl
//             traffic={traffic}
//             currentGreen={currentGreen}
//             signalPhase={signalPhase}
//             timer={timer}
//             handleEmergency={handleEmergency}
//             setTraffic={setTraffic}
//           />
//         );
//       case "analytics":
//         return (
//           <div className="space-y-6">
//             <Analytics traffic={traffic} history={history} />
//             <AdvancedCharts history={history} />
//             <Heatmap traffic={traffic} />
//             <LiveLogs logs={logs} />
//           </div>
//         );
//       default:
//         return null;
//     }
//   };

//   return (
//     <div className="flex min-h-screen bg-[#F8FAFC] text-slate-800 font-sans">
//       {/* Sidebar - Glassmorphism Light */}
//       <aside className="w-72 bg-white/70 backdrop-blur-xl border-r border-slate-200/60 p-8 flex flex-col fixed h-full">
//         <div className="flex items-center gap-3 mb-12">
//           <div className="p-2 bg-indigo-600 rounded-xl shadow-lg shadow-indigo-200">
//             <TrafficCone size={24} className="text-white" />
//           </div>
//           <h1 className="text-2xl font-black tracking-tight text-slate-900">
//             Flow<span className="text-indigo-600">AI</span>
//           </h1>
//         </div>

//         <nav className="space-y-2 flex-1">
//           {[
//             {
//               id: "dashboard",
//               label: "Overview",
//               icon: <LayoutDashboard size={20} />,
//             },
//             { id: "data", label: "Sensor Data", icon: <Database size={20} /> },
//             { id: "detection", label: "Live Vision", icon: <Cctv size={20} /> },
//             {
//               id: "signal",
//               label: "Smart Control",
//               icon: <Settings size={20} />,
//             },
//             {
//               id: "analytics",
//               label: "Deep Insights",
//               icon: <BarChart3 size={20} />,
//             },
//           ].map((item) => (
//             <button
//               key={item.id}
//               onClick={() => setActiveModule(item.id)}
//               className={`w-full flex items-center gap-4 px-5 py-3.5 rounded-2xl transition-all duration-300 font-medium ${
//                 activeModule === item.id
//                   ? "bg-indigo-50 text-indigo-700 shadow-sm"
//                   : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
//               }`}
//             >
//               <span
//                 className={
//                   activeModule === item.id
//                     ? "text-indigo-600"
//                     : "text-slate-400"
//                 }
//               >
//                 {item.icon}
//               </span>
//               {item.label}
//             </button>
//           ))}
//         </nav>

//         {/* Premium Upgrade Card (UI Filler for lifestyle aesthetic) */}
//         <div className="mt-auto p-5 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-3xl text-white shadow-xl shadow-indigo-100">
//           <p className="text-xs font-semibold opacity-80 mb-1">SYSTEM STATUS</p>
//           <p className="text-sm font-bold">All Nodes Active</p>
//           <div className="mt-4 h-1.5 w-full bg-white/20 rounded-full overflow-hidden">
//             <div className="h-full bg-white w-3/4 animate-pulse"></div>
//           </div>
//         </div>
//       </aside>

//       {/* Main Content */}
//       <main className="flex-1 ml-72 p-10">
//         <header className="flex justify-between items-center mb-10">
//           <div>
//             <h2 className="text-3xl font-bold text-slate-900 capitalize tracking-tight">
//               {activeModule.replace("-", " ")}
//             </h2>
//             <p className="text-slate-500 mt-1 font-medium">
//               Monitoring city traffic in real-time.
//             </p>
//           </div>

//           <div className="flex items-center gap-4">
//             <div className="px-4 py-2 bg-white border border-slate-200 rounded-xl shadow-sm text-sm font-bold text-slate-600">
//               {new Date().toLocaleDateString("en-US", {
//                 weekday: "long",
//                 day: "numeric",
//                 month: "short",
//               })}
//             </div>
//           </div>
//         </header>

//         <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
//           {renderModule()}
//         </div>
//       </main>
//     </div>
//   );
// }

// export default Home;

import { useState, useEffect } from "react";
import { initialTraffic } from "../data/initialData";
import { sensorsData } from "../data/sensorsData";
import { getSignalDecision } from "../logic/signalLogic";

// Icons
import {
  LayoutDashboard,
  Database,
  Cctv,
  TrafficCone,
  BarChart3,
  Settings,
} from "lucide-react";

// Modules
import Dashboard from "../components/dashboard/Dashboard";
import DataCollection from "../components/data/DataCollection";
import CameraFeed from "../components/detection/CameraFeed";
import SignalControl from "../components/control/SignalControl";
import Analytics from "../components/analytics/Analytics";
import AdvancedCharts from "../components/analytics/AdvancedCharts";
import Heatmap from "../components/analytics/Heatmap";
import LiveLogs from "../components/analytics/LiveLogs";

function Home() {
  const roads = ["A", "B", "C", "D"];

  const [activeModule, setActiveModule] = useState("dashboard");
  const [traffic, setTraffic] = useState(initialTraffic);
  const [sensors, setSensors] = useState(sensorsData);

  const [currentGreen, setCurrentGreen] = useState(["A", "C"]);
  const [signalPhase, setSignalPhase] = useState("GREEN");
  const [timer, setTimer] = useState(20);
  const [extended, setExtended] = useState(false);

  const [waitingTime, setWaitingTime] = useState({
    A: 0, B: 0, C: 0, D: 0
  });

  const [history, setHistory] = useState([]);
  const [logs, setLogs] = useState([]);

  // 🚦 SIGNAL UPDATE
  const updateSignal = (emergencyRoad = null) => {
    setSignalPhase("YELLOW");

    setTimeout(() => {
      setExtended(false); // reset extension every cycle

      if (emergencyRoad) {
        const adjacent = {
          A: "B",
          B: "C",
          C: "D",
          D: "A"
        };

        setCurrentGreen([emergencyRoad, adjacent[emergencyRoad]]);
        setTimer(30);

      } else {
        const decision = getSignalDecision(
          traffic,
          waitingTime,
          currentGreen
        );

        setCurrentGreen(decision.roads);
        setTimer(decision.time);
      }

      setSignalPhase("GREEN");
    }, 2000);
  };

  // 🔁 MAIN LOOP (FINAL FIXED)
  useEffect(() => {
    const interval = setInterval(() => {

      // 🚗 TRAFFIC UPDATE
      setTraffic(prev => {
        let updated = { ...prev };

        // Incoming
        roads.forEach(r => {
          updated[r] += Math.floor(Math.random() * 2);
        });

        // Outgoing (green roads)
        currentGreen.forEach(r => {
          updated[r] = Math.max(
            0,
            updated[r] - (3 + Math.floor(Math.random() * 2))
          );
        });

        // Limit
        roads.forEach(r => {
          updated[r] = Math.min(updated[r], 120);
        });

        return updated;
      });

      // 🚦 TIMER LOGIC
      const MIN_TIME = 10;

      setTimer(prev => {

        const activeTraffic = currentGreen.reduce(
          (sum, r) => sum + traffic[r],
          0
        );

        const isClear = activeTraffic < 8;

        // 🟢 EARLY SWITCH
        if (isClear && prev <= MIN_TIME) {
          setExtended(false);
          updateSignal();
          return 0;
        }

        // 🔴 TIMER END
        if (prev <= 1) {

          // 🔥 EXTEND ONLY ONCE
          if (activeTraffic > 12 && !extended) {
            setExtended(true);
            return 10;
          }

          // ✅ FORCE SWITCH
          setExtended(false);
          updateSignal();
          return 0;
        }

        return prev - 1;
      });

      // ⏳ WAITING TIME
      setWaitingTime(prev => {
        let updated = { ...prev };

        roads.forEach(r => {
          if (!currentGreen.includes(r)) updated[r] += 1;
          else updated[r] = 0;
        });

        return updated;
      });

      // 📊 HISTORY
      setHistory(prev => [
        ...prev.slice(-30),
        { ...traffic }
      ]);

      // 🧾 LOGS
      const maxRoad = Object.keys(traffic).reduce((a, b) =>
        traffic[a] > traffic[b] ? a : b
      );

      const maxVal = traffic[maxRoad];

      let msg =
        maxVal > 70
          ? `[ALERT] Heavy traffic on ${maxRoad}`
          : maxVal > 30
          ? `[WARN] Traffic rising on ${maxRoad}`
          : `[INFO] Smooth flow`;

      setLogs(prev => {
        if (prev[0]?.includes(msg)) return prev;

        return [
          `${new Date().toLocaleTimeString()} ${msg}`,
          ...prev.slice(0, 20)
        ];
      });

    }, 1000);

    return () => clearInterval(interval);
  }, [currentGreen, extended]);

  // 🔋 SENSOR UPDATE
  useEffect(() => {
    const interval = setInterval(() => {
      setSensors(prev =>
        prev.map(s => ({
          ...s,
          battery: Math.max(10, s.battery - Math.random() * 0.5)
        }))
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleEmergency = (road) => updateSignal(road);

  // 📦 RENDER MODULE
  const renderModule = () => {
    switch (activeModule) {

      case "dashboard":
        return (
          <Dashboard
            traffic={traffic}
            history={history}
            currentGreen={currentGreen}
            signalPhase={signalPhase}
            congestion={Math.min(
              (Object.values(traffic).reduce((a, b) => a + b, 0) / 200) * 100,
              100
            ).toFixed(1)}
            sensors={sensors}
          />
        );

      case "data":
        return (
          <DataCollection
            sensors={sensors}
            traffic={traffic}
            logs={logs}
            history={history}
          />
        );

      case "detection":
        return (
          <CameraFeed
            traffic={traffic}
            sensors={sensors}
            logs={logs}
          />
        );

      case "signal":
        return (
          <SignalControl
            traffic={traffic}
            currentGreen={currentGreen}
            signalPhase={signalPhase}
            timer={timer}
            handleEmergency={handleEmergency}
            setTraffic={setTraffic}
          />
        );

      case "analytics":
        return (
          <div className="space-y-6">
            <Analytics traffic={traffic} history={history} />
            <AdvancedCharts history={history} />
            <Heatmap traffic={traffic} />
            <LiveLogs logs={logs} />
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="flex min-h-screen bg-[#F8FAFC] text-slate-800 font-sans">

      {/* Sidebar */}
      <aside className="w-72 bg-white/70 backdrop-blur-xl border-r border-slate-200/60 p-8 flex flex-col fixed h-full">

        <div className="flex items-center gap-3 mb-12">
          <div className="p-2 bg-indigo-600 rounded-xl shadow-lg shadow-indigo-200">
            <TrafficCone size={24} className="text-white" />
          </div>
          <h1 className="text-2xl font-black tracking-tight text-slate-900">
            Flow<span className="text-indigo-600">AI</span>
          </h1>
        </div>

        <nav className="space-y-2 flex-1">
          {[
            { id: "dashboard", label: "Overview", icon: <LayoutDashboard size={20} /> },
            { id: "data", label: "Sensor Data", icon: <Database size={20} /> },
            { id: "detection", label: "Live Vision", icon: <Cctv size={20} /> },
            { id: "signal", label: "Smart Control", icon: <Settings size={20} /> },
            { id: "analytics", label: "Deep Insights", icon: <BarChart3 size={20} /> },
          ].map(item => (
            <button
              key={item.id}
              onClick={() => setActiveModule(item.id)}
              className={`w-full flex items-center gap-4 px-5 py-3.5 rounded-2xl transition ${
                activeModule === item.id
                  ? "bg-indigo-50 text-indigo-700"
                  : "text-slate-500 hover:bg-slate-50"
              }`}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </nav>

      </aside>

      {/* Main */}
      <main className="flex-1 ml-72 p-10">
        {renderModule()}
      </main>

    </div>
  );
}

export default Home;