import React from "react";
import { Terminal, Circle } from "lucide-react";

function LiveLogs({ logs }) {
  return (
    <div className="glass-card p-8 border border-slate-900 bg-slate-900 shadow-2xl overflow-hidden">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3 text-white">
          <Terminal size={20} className="text-indigo-400" />
          <h2 className="text-lg font-bold tracking-tight">System Terminal</h2>
        </div>
        <div className="flex gap-1.5">
          <Circle size={10} fill="#FF5F56" stroke="none" />
          <Circle size={10} fill="#FFBD2E" stroke="none" />
          <Circle size={10} fill="#27C93F" stroke="none" />
        </div>
      </div>

      <div className="h-64 overflow-y-auto space-y-3 pr-4 custom-scrollbar font-mono text-[13px]">
        {(!logs || logs.length === 0) && (
          <div className="text-slate-500 italic animate-pulse">
            {">"} Initializing FlowAI kernel...
          </div>
        )}

        {(logs || []).map((log, i) => {
          const isAlert = log.includes("[ALERT]");
          const isWarn = log.includes("[WARN]");
          const colorClass = isAlert
            ? "text-rose-400"
            : isWarn
              ? "text-amber-400"
              : "text-emerald-400";

          return (
            <div
              key={i}
              className="flex gap-3 group border-b border-white/5 pb-2 last:border-0"
            >
              <span className="text-slate-600 font-bold">0{i + 1}</span>
              <span
                className={`flex-1 ${colorClass} opacity-90 group-hover:opacity-100 transition-opacity`}
              >
                <span className="opacity-50 mr-2">$</span> {log}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default LiveLogs;
