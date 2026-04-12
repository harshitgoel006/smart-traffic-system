import React from "react";
import SensorTable from "./SensorTable";
import { Server, Activity, Database, ShieldCheck, Wifi } from "lucide-react";

const DataCollection = ({ sensors, traffic, logs, history }) => {
  const activeSensors = sensors.length;
  const totalData = history.length;
  const dataRate = Math.min(1000 + totalData * 5, 5000);
  const uptime = "99.8%";

  const networkStats = [
    {
      label: "Active Nodes",
      value: activeSensors,
      icon: <Wifi size={18} />,
      color: "text-emerald-500",
      bg: "bg-emerald-50",
    },
    {
      label: "Data Throughput",
      value: `${dataRate} pkts/s`,
      icon: <Activity size={18} />,
      color: "text-blue-500",
      bg: "bg-blue-50",
    },
    {
      label: "Server Uptime",
      value: uptime,
      icon: <Server size={18} />,
      color: "text-indigo-500",
      bg: "bg-indigo-50",
    },
    {
      label: "Database Sync",
      value: "Active",
      icon: <Database size={18} />,
      color: "text-purple-500",
      bg: "bg-purple-50",
    },
  ];

  return (
    <div className="space-y-8 animate-slide-up">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {networkStats.map((stat, i) => (
          <div
            key={i}
            className="glass-card p-6 flex flex-col gap-4 border border-slate-100 hover:border-indigo-100 transition-colors"
          >
            <div
              className={`w-12 h-12 rounded-2xl ${stat.bg} ${stat.color} flex items-center justify-center shadow-sm`}
            >
              {stat.icon}
            </div>
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
                {stat.label}
              </p>
              <h2 className="text-xl font-black text-slate-900 tracking-tight mt-1">
                {stat.value}
              </h2>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <div className="xl:col-span-2">
          <SensorTable sensors={sensors} />
        </div>

        <div className="xl:col-span-1 space-y-6">
          <div className="glass-card p-6 h-full border border-slate-200/60 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-slate-900 rounded-lg text-white shadow-lg">
                <ShieldCheck size={18} />
              </div>
              <h3 className="text-lg font-black text-slate-800 tracking-tight">
                Security & Auth
              </h3>
            </div>
            <div className="space-y-4">
              <SecurityItem label="SSL Encryption" status="Active" />
              <SecurityItem label="Node Authentication" status="Verified" />
              <SecurityItem label="End-to-End Tunnel" status="Stable" />
            </div>

            <div className="mt-10 p-4 bg-indigo-50 rounded-2xl border border-indigo-100/50">
              <p className="text-xs font-bold text-indigo-700 uppercase tracking-widest mb-2">
                Network Health
              </p>
              <div className="h-2 w-full bg-white rounded-full overflow-hidden shadow-inner">
                <div
                  className="h-full bg-indigo-500 rounded-full"
                  style={{ width: "94%" }}
                ></div>
              </div>
              <p className="text-[10px] text-indigo-400 mt-2 font-medium italic">
                Latency: 12ms (Optimized)
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const SecurityItem = ({ label, status }) => (
  <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100/50">
    <span className="text-xs font-bold text-slate-600">{label}</span>
    <span className="text-[10px] font-black uppercase text-emerald-600 px-2 py-1 bg-emerald-50 rounded-md tracking-tighter">
      {status}
    </span>
  </div>
);

export default DataCollection;
