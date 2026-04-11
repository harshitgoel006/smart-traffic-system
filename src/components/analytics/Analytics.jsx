import React from "react";
import { TrendingUp, BarChart, Target, Zap } from "lucide-react";

const Analytics = ({ traffic, history }) => {
  const peakRoad = Object.keys(traffic).reduce((a, b) =>
    traffic[a] > traffic[b] ? a : b,
  );

  const avgVehicles =
    history.length === 0
      ? 0
      : Math.round(
          history.reduce(
            (sum, item) => sum + Object.values(item).reduce((a, b) => a + b, 0),
            0,
          ) / history.length,
        );

  const totalVehicles = Object.values(traffic).reduce((a, b) => a + b, 0);
  const congestion = Math.min((totalVehicles / 150) * 100, 100);
  const efficiency = Math.max(0, (100 - congestion).toFixed(1));

  const stats = [
    {
      label: "Peak Load Road",
      value: `Road ${peakRoad}`,
      sub: `${traffic[peakRoad]} vehicles`,
      icon: <BarChart size={20} />,
      color: "text-rose-600",
      bg: "bg-rose-50",
    },
    {
      label: "Average Traffic",
      value: avgVehicles,
      sub: "Vehicles/min",
      icon: <TrendingUp size={20} />,
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      label: "Flow Efficiency",
      value: `${efficiency}%`,
      sub: "System Performance",
      icon: <Target size={20} />,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
    },
    {
      label: "Current Density",
      value: totalVehicles,
      sub: "Active Vehicles",
      icon: <Zap size={20} />,
      color: "text-indigo-600",
      bg: "bg-indigo-50",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-slide-up">
      {stats.map((stat, i) => (
        <div
          key={i}
          className="glass-card p-6 border border-slate-100 shadow-sm hover:shadow-md transition-all"
        >
          <div className="flex justify-between items-start mb-4">
            <div className={`p-3 rounded-2xl ${stat.bg} ${stat.color}`}>
              {stat.icon}
            </div>
            <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest leading-none">
              Realtime
            </span>
          </div>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
            {stat.label}
          </p>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">
            {stat.value}
          </h2>
          <p className="text-xs font-medium text-slate-500 mt-1">{stat.sub}</p>
        </div>
      ))}
    </div>
  );
};

export default Analytics;
