import React from "react";
import { Map } from "lucide-react";

const Heatmap = ({ traffic }) => {
  const getColor = (val) => {
    if (val <= 15) return "bg-emerald-50 text-emerald-700 border-emerald-100";
    if (val <= 40) return "bg-amber-50 text-amber-700 border-amber-100";
    return "bg-rose-50 text-rose-700 border-rose-100";
  };

  return (
    <div className="glass-card p-8 border border-slate-200/50">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-2 bg-slate-900 rounded-lg text-white">
          <Map size={18} />
        </div>
        <h3 className="text-lg font-black text-slate-800 tracking-tight">
          Zone Density Heatmap
        </h3>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {Object.entries(traffic).map(([road, val]) => (
          <div
            key={road}
            className={`relative p-8 rounded-[32px] border-2 transition-all duration-500 overflow-hidden ${getColor(val)}`}
          >
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <h1 className="text-6xl font-black">{road}</h1>
            </div>

            <p className="text-xs font-black uppercase tracking-[0.2em] mb-1 opacity-70">
              Zone {road}
            </p>
            <h2 className="text-4xl font-black tracking-tighter">{val}</h2>
            <p className="text-xs font-bold mt-2 uppercase tracking-widest">
              Vehicles
            </p>

            <div className="mt-6 h-2 w-full bg-black/5 rounded-full overflow-hidden">
              <div
                className="h-full bg-current opacity-60 rounded-full"
                style={{ width: `${Math.min((val / 100) * 100, 100)}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Heatmap;
