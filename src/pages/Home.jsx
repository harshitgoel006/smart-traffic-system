import { useState, useEffect } from "react";
import { initialTraffic } from "../data/initialData";
import { sensorsData } from "../data/sensorsData";
import { getSignalDecision } from "../logic/signalLogic";

import {
  LayoutDashboard,
  Database,
  Cctv,
  TrafficCone,
  BarChart3,
  Settings,
} from "lucide-react";

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
    A: 0,
    B: 0,
    C: 0,
    D: 0,
  });

  const [history, setHistory] = useState([]);
  const [logs, setLogs] = useState([]);

  const updateSignal = (emergencyRoad = null) => {
    setSignalPhase("YELLOW");

    setTimeout(() => {
      setExtended(false);

      if (emergencyRoad) {
        const adjacent = {
          A: "C",
          B: "D",
          C: "A",
          D: "B",
        };

        setCurrentGreen([emergencyRoad, adjacent[emergencyRoad]]);
        setTimer(30);
      } else {
        const decision = getSignalDecision(traffic, waitingTime, currentGreen);

        setCurrentGreen(decision.roads);
        setTimer(decision.time);
      }

      setSignalPhase("GREEN");
    }, 2000);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setTraffic((prev) => {
        let updated = { ...prev };

        roads.forEach((r) => {
          updated[r] += Math.floor(Math.random() * 2);
        });

        currentGreen.forEach((r) => {
          updated[r] = Math.max(
            0,
            updated[r] - (3 + Math.floor(Math.random() * 2)),
          );
        });

        roads.forEach((r) => {
          updated[r] = Math.min(updated[r], 120);
        });

        return updated;
      });

      const MIN_TIME = 10;

      setTimer((prev) => {
        const activeTraffic = currentGreen.reduce(
          (sum, r) => sum + traffic[r],
          0,
        );

        const isClear = activeTraffic < 8;

        if (isClear && prev <= MIN_TIME) {
          setExtended(false);
          updateSignal();
          return 0;
        }

        if (prev <= 1) {
          if (activeTraffic > 12 && !extended) {
            setExtended(true);
            return 10;
          }

          setExtended(false);
          updateSignal();
          return 0;
        }

        return prev - 1;
      });

      setWaitingTime((prev) => {
        let updated = { ...prev };

        roads.forEach((r) => {
          if (!currentGreen.includes(r)) updated[r] += 1;
          else updated[r] = 0;
        });

        return updated;
      });

      setHistory((prev) => [...prev.slice(-30), { ...traffic }]);

      const maxRoad = Object.keys(traffic).reduce((a, b) =>
        traffic[a] > traffic[b] ? a : b,
      );

      const maxVal = traffic[maxRoad];

      let msg =
        maxVal > 70
          ? `[ALERT] Heavy traffic on ${maxRoad}`
          : maxVal > 30
            ? `[WARN] Traffic rising on ${maxRoad}`
            : `[INFO] Smooth flow`;

      setLogs((prev) => {
        if (prev[0]?.includes(msg)) return prev;

        return [
          `${new Date().toLocaleTimeString()} ${msg}`,
          ...prev.slice(0, 20),
        ];
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [currentGreen, extended]);

  useEffect(() => {
    const interval = setInterval(() => {
      setSensors((prev) =>
        prev.map((s) => ({
          ...s,
          battery: Math.max(10, s.battery - Math.random() * 0.5),
        })),
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleEmergency = (road) => updateSignal(road);

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
              100,
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
        return <CameraFeed traffic={traffic} sensors={sensors} logs={logs} />;

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
            {
              id: "dashboard",
              label: "Overview",
              icon: <LayoutDashboard size={20} />,
            },
            { id: "data", label: "Sensor Data", icon: <Database size={20} /> },
            { id: "detection", label: "Live Vision", icon: <Cctv size={20} /> },
            {
              id: "signal",
              label: "Smart Control",
              icon: <Settings size={20} />,
            },
            {
              id: "analytics",
              label: "Deep Insights",
              icon: <BarChart3 size={20} />,
            },
          ].map((item) => (
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

      <main className="flex-1 ml-72 p-10">{renderModule()}</main>
    </div>
  );
}

export default Home;
