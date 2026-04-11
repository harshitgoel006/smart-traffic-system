import React from "react";
import TrafficGraph from "./TrafficGraph";
import SignalOverview from "./SignalOverview";
import { Users, Wifi, TrafficCone, Activity } from "lucide-react";

const Dashboard = ({
  traffic,
  history,
  currentGreen,
  signalPhase,
  congestion,
  sensors,
}) => {
  const totalVehicles = Object.values(traffic).reduce((a, b) => a + b, 0);

  const stats = [
    {
      label: "Total Vehicles",
      value: totalVehicles,
      icon: <Users size={20} />,
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      label: "Active Sensors",
      value: sensors.length,
      icon: <Wifi size={20} />,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
    },
    {
      label: "Active Signal",
      value: currentGreen.join(" + "),
      icon: <TrafficCone size={20} />,
      color: "text-orange-600",
      bg: "bg-orange-50",
    },
    {
      label: "Congestion Rate",
      value: `${congestion}%`,
      icon: <Activity size={20} />,
      color: "text-purple-600",
      bg: "bg-purple-50",
    },
  ];

  return (
    <div className="space-y-8 animate-slide-up">
      {/* 🚀 STATS ROW */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div
            key={i}
            className="glass-card p-6 flex items-center gap-5 hover:translate-y-[-4px] transition-all duration-300"
          >
            <div className={`p-4 rounded-2xl ${stat.bg} ${stat.color}`}>
              {stat.icon}
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500 mb-1">
                {stat.label}
              </p>
              <h2 className="text-2xl font-black text-slate-800 tracking-tight">
                {stat.value}
              </h2>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Graph */}
        <div className="lg:col-span-2">
          <TrafficGraph history={history} />
        </div>

        {/* Signal Side Panel */}
        <div className="lg:col-span-1">
          <SignalOverview
            currentGreen={currentGreen}
            signalPhase={signalPhase}
            traffic={traffic}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
