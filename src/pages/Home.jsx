import { useState, useEffect } from "react";

import { initialTraffic } from "../data/initialData";
import { sensorsData } from "../data/sensorsData";
import { getSignalDecision } from "../logic/signalLogic";

// 📊 Modules
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

  // 🔁 MODULE NAVIGATION
  const [activeModule, setActiveModule] = useState("dashboard");

  // 🔹 CORE STATE
  const [traffic, setTraffic] = useState(initialTraffic);
  const [sensors, setSensors] = useState(sensorsData);

  const [currentGreen, setCurrentGreen] = useState(["A", "C"]);
  const [signalPhase, setSignalPhase] = useState("GREEN");
  const [timer, setTimer] = useState(30);

  const [waitingTime, setWaitingTime] = useState({
    A: 0, B: 0, C: 0, D: 0
  });

  const [history, setHistory] = useState([]);
  const [logs, setLogs] = useState([]);

  // 🚦 SIGNAL UPDATE
  const updateSignal = (emergencyRoad = null) => {
    setSignalPhase("YELLOW");

    setTimeout(() => {
      if (emergencyRoad) {
        setCurrentGreen([emergencyRoad]);
        setTimer(30);
      } else {
        const decision = getSignalDecision(traffic, waitingTime);
        setCurrentGreen(decision.roads);
        setTimer(decision.time);
      }
      setSignalPhase("GREEN");
    }, 2000);
  };

  // 🔁 MAIN LOOP
  useEffect(() => {
    const interval = setInterval(() => {

      // traffic update
      setTraffic(prev => {
        let updated = { ...prev };

        roads.forEach(r => {
          updated[r] += Math.floor(Math.random() * 5);
        });

        currentGreen.forEach(r => {
          updated[r] = Math.max(0, updated[r] - 6);
        });

        return updated;
      });

      // timer logic
      const isClear = currentGreen.every(r => traffic[r] < 10);

      setTimer(prev => {
        if (prev <= 1 || (isClear && prev < 10)) {
          updateSignal();
          return 0;
        }
        return prev - 1;
      });

      // waiting time
      setWaitingTime(prev => {
        let updated = { ...prev };
        roads.forEach(r => {
          if (!currentGreen.includes(r)) updated[r] += 1;
          else updated[r] = 0;
        });
        return updated;
      });

      // history
      setHistory(prev => {
        const last = prev[prev.length - 1];
        if (JSON.stringify(last) === JSON.stringify(traffic)) return prev;
        return [...prev.slice(-30), { ...traffic }];
      });

      // logs
      const maxRoad = Object.keys(traffic).reduce((a, b) =>
        traffic[a] > traffic[b] ? a : b
      );

      const maxVal = traffic[maxRoad];

      let msg =
        maxVal > 40
          ? `[ALERT] Heavy traffic on ${maxRoad}`
          : maxVal > 20
          ? `[WARN] Traffic rising on ${maxRoad}`
          : `[INFO] Smooth flow`;

      setLogs(prev => [
        `${new Date().toLocaleTimeString()} ${msg}`,
        ...prev.slice(0, 20)
      ]);

    }, 1000);

    return () => clearInterval(interval);
  }, [currentGreen]);

  // 🔋 SENSOR BATTERY UPDATE
  useEffect(() => {
    const interval = setInterval(() => {
      setSensors(prev =>
        prev.map(s => {
          let b = Math.max(5, s.battery - Math.random() * 2);
          return { ...s, battery: b };
        })
      );
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  // 🚨 EMERGENCY
  const handleEmergency = (road) => {
    updateSignal(road);
  };

  // 🎯 RENDER MODULE
  const renderModule = () => {

    switch (activeModule) {

      case "dashboard":
        return (
          <Dashboard
            traffic={traffic}
            history={history}
            currentGreen={currentGreen}
            signalPhase={signalPhase}
            congestion={Math.min((Object.values(traffic).reduce((a, b) => a + b, 0) / 150) * 100, 100).toFixed(1)}
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
    <div className="flex min-h-screen bg-[#020617] text-white">

      {/* 🧭 SIDEBAR */}
      <div className="w-64 bg-black/40 p-6 space-y-4 border-r border-white/10">

        <h1 className="text-xl font-bold">Traffic AI</h1>

        {[
          { id: "dashboard", label: "Dashboard" },
          { id: "data", label: "Data Collection" },
          { id: "detection", label: "Detection" },
          { id: "signal", label: "Signal Control" },
          { id: "analytics", label: "Analytics" }
        ].map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveModule(item.id)}
            className={`w-full text-left px-4 py-2 rounded-lg ${
              activeModule === item.id
                ? "bg-emerald-500/20 text-emerald-400"
                : "hover:bg-white/10"
            }`}
          >
            {item.label}
          </button>
        ))}

      </div>

      {/* 📦 CONTENT */}
      <div className="flex-1 p-6 overflow-y-auto">
        {renderModule()}
      </div>

    </div>
  );
}

export default Home;