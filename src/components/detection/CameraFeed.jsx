import React from "react";
import {
  Camera,
  Scan,
  ShieldAlert,
  Cpu,
  Activity,
  Maximize2,
} from "lucide-react";

const CameraFeed = ({ traffic, sensors, logs }) => {
  const cameras = sensors.filter((s) => s.type === "Camera");
  const activeCameras = cameras.length;
  const detections = logs.length;
  const accuracy = "98.4%";
  const violations = Math.floor(detections * 0.03);

  const visionStats = [
    {
      label: "Active Units",
      value: activeCameras,
      icon: <Camera size={18} />,
      color: "text-blue-500",
      bg: "bg-blue-50",
    },
    {
      label: "AI Detections",
      value: detections,
      icon: <Scan size={18} />,
      color: "text-emerald-500",
      bg: "bg-emerald-50",
    },
    {
      label: "Model Accuracy",
      value: accuracy,
      icon: <Cpu size={18} />,
      color: "text-purple-500",
      bg: "bg-purple-50",
    },
    {
      label: "Threats/Violations",
      value: violations,
      icon: <ShieldAlert size={18} />,
      color: "text-rose-500",
      bg: "bg-rose-50",
    },
  ];

  return (
    <div className="space-y-8 animate-slide-up">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {visionStats.map((stat, i) => (
          <div
            key={i}
            className="glass-card p-6 border border-slate-100 shadow-sm"
          >
            <div className="flex justify-between items-start">
              <div
                className={`p-3 rounded-2xl ${stat.bg} ${stat.color} shadow-sm`}
              >
                {stat.icon}
              </div>
              <Activity size={14} className="text-slate-200 animate-pulse" />
            </div>
            <div className="mt-4">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                {stat.label}
              </p>
              <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                {stat.value}
              </h2>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {cameras.map((cam) => {
          const vehicles = traffic[cam.road] || 0;
          return (
            <div
              key={cam.id}
              className="glass-card overflow-hidden border border-slate-200/60 shadow-xl group"
            >
              <div className="p-4 bg-slate-900 flex justify-between items-center text-white">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-rose-500 rounded-full animate-ping"></div>
                  <span className="text-[11px] font-black uppercase tracking-widest">
                    CAM-{cam.id.split("-")[1] || cam.id} // SEC-{cam.road}
                  </span>
                </div>
                <button className="opacity-50 hover:opacity-100 transition-opacity">
                  <Maximize2 size={14} />
                </button>
              </div>

              <div className="relative aspect-video bg-slate-950 flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-scanline opacity-10 pointer-events-none"></div>
                <div className="absolute top-0 left-0 w-full h-1 bg-emerald-500/20 animate-scan pointer-events-none"></div>

                <div className="absolute inset-0 p-6 grid grid-cols-4 grid-rows-3 gap-4 opacity-40">
                  {Array.from({ length: Math.min(vehicles, 12) }).map(
                    (_, i) => (
                      <div
                        key={i}
                        className="border border-emerald-400 rounded-sm relative shadow-[0_0_8px_rgba(52,211,153,0.3)]"
                      >
                        <span className="absolute -top-3 -left-1 text-[8px] font-bold text-emerald-400 bg-slate-900 px-1">
                          VEHICLE
                        </span>
                      </div>
                    ),
                  )}
                </div>

                <div className="z-10 bg-slate-900/80 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
                  <p className="text-xs font-black text-white flex items-center gap-2">
                    <Activity size={12} className="text-emerald-400" />
                    LIVE DENSITY:{" "}
                    <span className="text-emerald-400">{vehicles}</span>
                  </p>
                </div>

                <div className="absolute bottom-4 left-4 font-mono text-[9px] text-white/30">
                  LAT: 28.6139° N <br /> LONG: 77.2090° E
                </div>
              </div>

              <div className="p-4 bg-white flex justify-between items-center">
                <div className="flex flex-col">
                  <span className="text-[10px] font-black text-slate-400 uppercase">
                    Detection Status
                  </span>
                  <span className="text-xs font-bold text-slate-800">
                    Object Identification Active
                  </span>
                </div>
                <div className="px-3 py-1 bg-emerald-50 text-emerald-600 rounded-lg text-[10px] font-black">
                  SECURE
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="glass-card border border-slate-200/60 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center gap-3">
          <div className="p-2 bg-slate-900 rounded-lg text-white">
            <Activity size={18} />
          </div>
          <h3 className="text-lg font-black text-slate-800">
            Detection Event Log
          </h3>
        </div>
        <div className="max-h-80 overflow-y-auto">
          <table className="w-full">
            <thead className="bg-slate-50">
              <tr>
                <th className="text-left px-6 py-3 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  Timestamp
                </th>
                <th className="text-left px-6 py-3 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  Event
                </th>
                <th className="text-left px-6 py-3 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  Confidence
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {logs.slice(0, 20).map((log, i) => (
                <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4 font-mono text-[11px] text-slate-400">
                    {new Date().toLocaleTimeString()}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-1.5 h-1.5 rounded-full ${log.includes("ALERT") ? "bg-rose-500" : "bg-emerald-500"}`}
                      ></div>
                      <span className="text-xs font-bold text-slate-700">
                        {log}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-[10px] font-black text-indigo-600 bg-indigo-50 px-2 py-1 rounded-md">
                      {(95 + Math.random() * 4).toFixed(2)}%
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CameraFeed;
