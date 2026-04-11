import React from "react";
import { AlertTriangle, Plus, Minus, Zap, Timer, Bot } from "lucide-react";

const SignalControl = ({
  traffic,
  currentGreen,
  signalPhase,
  timer,
  handleEmergency,
  setTraffic,
}) => {
  const roads = ["A", "B", "C", "D"];
  const peakRoad = Object.keys(traffic).reduce((a, b) =>
    traffic[a] > traffic[b] ? a : b,
  );

  let statusColor = "text-emerald-600 bg-emerald-50";
  let statusText = "Smooth Flow";
  if (traffic[peakRoad] > 70) {
    statusText = "Heavy Congestion";
    statusColor = "text-rose-600 bg-rose-50";
  } else if (traffic[peakRoad] > 30) {
    statusText = "Moderate Traffic";
    statusColor = "text-amber-600 bg-amber-50";
  }

  // 🚗 CAR SIMULATION (Improved Visuals)
  const renderCars = (count) => {
    const limit = Math.min(count, 15); // limit visual cars for performance
    return Array.from({ length: limit }).map((_, i) => (
      <div
        key={i}
        className="w-2.5 h-1.5 bg-slate-700 rounded-sm animate-pulse shadow-sm"
        style={{ animationDelay: `${i * 150}ms` }} // staggered animation
      />
    ));
  };

  return (
    <div className="space-y-8 animate-slide-up">
      {/* 🚀 QUICK STATS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <StatCard
          title="Active Signals"
          value={currentGreen.length}
          icon={<Zap size={20} />}
          color="indigo"
        />
        <StatCard
          title="Current Phase"
          value={signalPhase}
          icon={<Activity size={20} />}
          color={signalPhase === "GREEN" ? "emerald" : "amber"}
        />
        <StatCard
          title="Time Remaining"
          value={`${timer}s`}
          icon={<Timer size={20} />}
          color="blue"
        />
        <StatCard
          title="Control Mode"
          value="AI AUTO"
          icon={<Bot size={20} />}
          color="purple"
        />
      </div>

      {/* 🚦 THE INTERSECTION (MAIN FOCUS 🔥) */}
      <div className="glass-card p-8 shadow-xl shadow-slate-100">
        <div className="flex justify-between items-center mb-10">
          <div>
            <h3 className="text-xl font-bold text-slate-900">
              Live Junction View
            </h3>
            <p className="text-sm text-slate-500 font-medium">
              Real-time status of Intersection 01
            </p>
          </div>
          <span
            className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider ${statusColor}`}
          >
            {statusText}
          </span>
        </div>

        {/* Realistic Road Layout */}
        <div className="relative aspect-[4/3] w-full max-w-4xl mx-auto bg-slate-100 rounded-3xl p-4 overflow-hidden border border-slate-200">
          {/* Central Junction Hub */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-1/3 h-1/3 bg-slate-200 rounded-full border-4 border-white shadow-inner flex items-center justify-center">
              <div className="text-center">
                <p className="text-3xl font-black text-slate-800">
                  {timer}
                  <span className="text-xl">s</span>
                </p>
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                  {signalPhase}
                </p>
              </div>
            </div>
          </div>

          {/* Road Tracks (Visual Only) */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/4 h-full bg-slate-200 border-x-4 border-white dashed-lines-v"></div>
          <div className="absolute top-1/2 left-0 -translate-y-1/2 w-full h-1/3 bg-slate-200 border-y-4 border-white dashed-lines-h"></div>

          {/* 🛣️ ROAD BLOCKS (Positioned Absolutely) */}
          <div className="relative grid grid-cols-3 grid-rows-3 gap-4 h-full w-full z-10">
            {/* Road A (Top) */}
            <RoadBlock
              road="A"
              traffic={traffic.A}
              currentGreen={currentGreen}
              signalPhase={signalPhase}
              renderCars={renderCars}
              className="col-start-2 row-start-1 flex-col-reverse"
            />

            {/* Road D (Left) */}
            <RoadBlock
              road="D"
              traffic={traffic.D}
              currentGreen={currentGreen}
              signalPhase={signalPhase}
              renderCars={renderCars}
              className="col-start-1 row-start-2 flex-row-reverse"
            />

            {/* Road B (Right) */}
            <RoadBlock
              road="B"
              traffic={traffic.B}
              currentGreen={currentGreen}
              signalPhase={signalPhase}
              renderCars={renderCars}
              className="col-start-3 row-start-2 flex-row"
            />

            {/* Road C (Bottom) */}
            <RoadBlock
              road="C"
              traffic={traffic.C}
              currentGreen={currentGreen}
              signalPhase={signalPhase}
              renderCars={renderCars}
              className="col-start-2 row-start-3 flex-col"
            />
          </div>
        </div>
      </div>

      {/* 🔥 CONTROL PANELS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Emergency Triggers */}
        <div className="glass-card p-6">
          <div className="flex items-center gap-3 mb-6">
            <AlertTriangle className="text-rose-500" />
            <h3 className="text-lg font-bold text-slate-900">
              Emergency Priority
            </h3>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {roads.map((r) => (
              <button
                key={r}
                onClick={() => handleEmergency(r)}
                className="group flex items-center justify-between gap-3 bg-white hover:bg-rose-50 border border-slate-100 hover:border-rose-100 p-4 rounded-2xl transition-all duration-300 shadow-sm hover:shadow-rose-100"
              >
                <span className="font-bold text-slate-700 group-hover:text-rose-700">
                  Clear Road {r}
                </span>
                <span className="p-2 bg-rose-100 text-rose-600 rounded-lg text-xs font-black">
                  SOS
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Manual Simulation */}
        <div className="glass-card p-6">
          <div className="flex items-center gap-3 mb-6">
            <Plus className="text-indigo-500" />
            <h3 className="text-lg font-bold text-slate-900">
              Traffic Simulation
            </h3>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {roads.map((r) => (
              <div
                key={r}
                className="bg-slate-50 p-4 rounded-2xl flex items-center justify-between border border-slate-100"
              >
                <span className="font-bold text-slate-700">Road {r}</span>
                <div className="flex gap-2">
                  <button
                    onClick={() =>
                      setTraffic((prev) => ({ ...prev, [r]: prev[r] + 5 }))
                    }
                    className="p-2 bg-white hover:bg-emerald-50 text-emerald-600 rounded-xl shadow-sm"
                  >
                    <Plus size={16} />
                  </button>
                  <button
                    onClick={() =>
                      setTraffic((prev) => ({
                        ...prev,
                        [r]: Math.max(0, prev[r] - 5),
                      }))
                    }
                    className="p-2 bg-white hover:bg-amber-50 text-amber-600 rounded-xl shadow-sm"
                  >
                    <Minus size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// 🔹 ROAD BLOCK (Visual Upgrade)
const RoadBlock = ({
  road,
  traffic,
  currentGreen,
  signalPhase,
  renderCars,
  className,
}) => (
  <div className={`flex items-center justify-center gap-4 ${className} p-2`}>
    {/* Traffic Light Visual */}
    <TrafficLight
      road={road}
      currentGreen={currentGreen}
      signalPhase={signalPhase}
    />

    {/* Vehicle Lane */}
    <div className="flex-1 flex flex-col items-center">
      <div className="flex flex-wrap justify-center gap-1.5 p-3 bg-white/40 backdrop-blur-sm rounded-xl min-h-[60px] w-full shadow-inner border border-white/20">
        {renderCars(traffic)}
      </div>
      <p className="text-[11px] mt-2 font-bold text-slate-500 uppercase tracking-wider">
        {road}: {traffic} Vehicles
      </p>
    </div>
  </div>
);

// 🔹 TRAFFIC LIGHT (Realist Glowing Look)
const TrafficLight = ({ road, currentGreen, signalPhase }) => {
  const isGreen = currentGreen.includes(road);

  return (
    <div className="bg-slate-900 p-2.5 rounded-2xl flex flex-col gap-1.5 shadow-xl border border-slate-700">
      {/* Red */}
      <div
        className={`w-5 h-5 rounded-full transition-all duration-300 ${
          !isGreen ? "bg-rose-500 shadow-lg shadow-rose-400/80" : "bg-slate-700"
        }`}
      />
      {/* Yellow */}
      <div
        className={`w-5 h-5 rounded-full transition-all duration-300 ${
          signalPhase === "YELLOW" && isGreen
            ? "bg-amber-400 shadow-lg shadow-amber-300/80"
            : "bg-slate-700"
        }`}
      />
      {/* Green */}
      <div
        className={`w-5 h-5 rounded-full transition-all duration-300 ${
          isGreen && signalPhase === "GREEN"
            ? "bg-emerald-500 shadow-lg shadow-emerald-400/80"
            : "bg-slate-700"
        }`}
      />
    </div>
  );
};

// 🔹 STAT CARD (Reusable)
const StatCard = ({ title, value, icon, color }) => {
  const colors = {
    indigo: "bg-indigo-50 text-indigo-700 shadow-indigo-100",
    emerald: "bg-emerald-50 text-emerald-700 shadow-emerald-100",
    amber: "bg-amber-50 text-amber-700 shadow-amber-100",
    blue: "bg-blue-50 text-blue-700 shadow-blue-100",
    purple: "bg-purple-50 text-purple-700 shadow-purple-100",
  };
  return (
    <div
      className={`glass-card p-6 flex items-center gap-5 hover:translate-y-[-2px] transition-all duration-300 shadow-sm ${colors[color]}`}
    >
      <div className={`p-4 rounded-2xl bg-white shadow-inner`}>{icon}</div>
      <div>
        <p className="text-sm font-medium opacity-80 mb-0.5">{title}</p>
        <h2 className="text-2xl font-black tracking-tight">{value}</h2>
      </div>
    </div>
  );
};

// Just for icon support if you haven't installed lucide-react
import { Activity } from "lucide-react";

export default SignalControl;
