import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { AlertCircle, Zap } from "lucide-react";

const SignalOverview = ({ currentGreen, signalPhase, traffic }) => {
  const green = currentGreen.length;
  const yellow = signalPhase === "YELLOW" ? 1 : 0;
  const red = 4 - green - yellow;

  const peakRoad = Object.keys(traffic).reduce((a, b) =>
    traffic[a] > traffic[b] ? a : b,
  );
  const total = Object.values(traffic).reduce((a, b) => a + b, 0);

  let statusColor = "bg-emerald-100 text-emerald-700";
  let statusText = "Smooth";
  if (total > 80) {
    statusText = "Heavy";
    statusColor = "bg-rose-100 text-rose-700";
  } else if (total > 40) {
    statusText = "Moderate";
    statusColor = "bg-amber-100 text-amber-700";
  }

  const data = [
    { name: "Green", value: green },
    { name: "Yellow", value: yellow },
    { name: "Red", value: red },
  ];

  const COLORS = ["#10b981", "#f59e0b", "#f43f5e"];

  return (
    <div className="glass-card p-6 space-y-6 flex flex-col h-full">
      <div className="flex justify-between items-center">
        <h3 className="font-bold text-slate-800 uppercase tracking-wider text-xs">
          Signal Distribution
        </h3>
        <span
          className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${statusColor}`}
        >
          {statusText}
        </span>
      </div>

      <div className="w-full h-[200px] relative">
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="text-3xl font-black text-slate-800">
            {signalPhase}
          </span>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            Phase
          </span>
        </div>
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={data}
              innerRadius={65}
              outerRadius={85}
              cornerRadius={10}
              paddingAngle={8}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={index} fill={COLORS[index]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-3 gap-2 py-4 border-y border-slate-100">
        {data.map((item, i) => (
          <div key={i} className="text-center">
            <p className="text-xl font-bold" style={{ color: COLORS[i] }}>
              {item.value}
            </p>
            <p className="text-[10px] font-bold text-slate-400 uppercase leading-none">
              {item.name}
            </p>
          </div>
        ))}
      </div>

      <div className="space-y-3">
        <div className="p-4 bg-slate-50 rounded-2xl flex items-center gap-3">
          <AlertCircle size={18} className="text-rose-500" />
          <div className="text-sm">
            <p className="text-slate-500 font-medium leading-none">Peak Road</p>
            <p className="font-bold text-slate-800 mt-1">
              Road {peakRoad} ({traffic[peakRoad]})
            </p>
          </div>
        </div>
        <div className="p-4 bg-indigo-50 rounded-2xl flex items-center gap-3">
          <Zap size={18} className="text-indigo-500" />
          <div className="text-sm">
            <p className="text-slate-500 font-medium leading-none">
              System Flow
            </p>
            <p className="font-bold text-indigo-700 mt-1">
              {total} Active Vehicles
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignalOverview;
