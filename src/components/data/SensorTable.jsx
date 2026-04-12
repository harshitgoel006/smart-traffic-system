import React from "react";
import { Battery, Info, SignalHigh, AlertCircle } from "lucide-react";

function SensorTable({ sensors }) {
  return (
    <div className="glass-card border border-slate-200/60 overflow-hidden shadow-xl shadow-slate-200/30">
      <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-indigo-600 rounded-lg text-white">
            <SignalHigh size={18} />
          </div>
          <div>
            <h2 className="text-lg font-black text-slate-800 tracking-tight">
              IoT Sensor Network
            </h2>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              Global Node Registry
            </p>
          </div>
        </div>
        <button className="p-2 text-slate-400 hover:text-indigo-600 transition-colors">
          <Info size={18} />
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-white">
              <th className="text-left px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] border-b border-slate-100">
                Node ID
              </th>
              <th className="text-left px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] border-b border-slate-100">
                Technology
              </th>
              <th className="text-left px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] border-b border-slate-100">
                Sector
              </th>
              <th className="text-left px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] border-b border-slate-100">
                Connectivity
              </th>
              <th className="text-left px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] border-b border-slate-100 w-48">
                Power Level
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-50">
            {(sensors || []).map((s) => {
              const battery = Math.round(s.battery || 0);
              const isLow = battery < 30;
              const status = s.status || "online";

              return (
                <tr
                  key={s.id}
                  className="group hover:bg-slate-50/80 transition-colors"
                >
                  <td className="px-6 py-5">
                    <span className="font-black text-slate-700 tracking-tight">
                      #{s.id}
                    </span>
                  </td>
                  <td className="px-6 py-5">
                    <span className="px-2.5 py-1 bg-slate-100 text-slate-600 rounded-lg text-[10px] font-black uppercase tracking-tighter">
                      {s.type || "Ultrasonic"}
                    </span>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-indigo-400"></div>
                      <span className="text-sm font-bold text-slate-600">
                        Road {s.road}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-2 h-2 rounded-full ${status === "online" ? "bg-emerald-500 animate-pulse" : "bg-rose-500"}`}
                      ></div>
                      <span
                        className={`text-[10px] font-black uppercase tracking-widest ${status === "online" ? "text-emerald-600" : "text-rose-600"}`}
                      >
                        {status}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                      <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden border border-slate-200/50">
                        <div
                          className={`h-full rounded-full transition-all duration-1000 ${
                            battery > 60
                              ? "bg-emerald-500"
                              : battery > 30
                                ? "bg-amber-400"
                                : "bg-rose-500"
                          }`}
                          style={{ width: `${battery}%` }}
                        ></div>
                      </div>
                      <span
                        className={`text-xs font-black min-w-[35px] ${isLow ? "text-rose-600 animate-bounce" : "text-slate-500"}`}
                      >
                        {battery}%
                      </span>
                      {isLow && (
                        <AlertCircle size={14} className="text-rose-500" />
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default SensorTable;
