import { ShieldCheck, ShieldAlert } from "lucide-react";

function TrafficLights({ currentGreen }) {
  const roads = ["A", "B", "C"];

  return (
    <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-6 shadow-2xl">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-emerald-500/20 rounded-lg text-emerald-400">
          <ShieldCheck size={20} />
        </div>
        <h2 className="text-xl font-bold tracking-tight text-white">Signal Status</h2>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {roads.map((road) => {
          const isGreen = currentGreen === road;

          return (
            <div
              key={road}
              className={`flex flex-col items-center p-4 rounded-2xl border transition-all duration-500 ${
                isGreen 
                ? "bg-emerald-500/5 border-emerald-500/20" 
                : "bg-white/5 border-white/5"
              }`}
            >
              <p className={`text-xs font-bold uppercase tracking-widest mb-4 ${isGreen ? 'text-emerald-400' : 'text-slate-500'}`}>
                Road {road}
              </p>

              {/* Hardware Light Housing */}
              <div className="flex flex-col gap-3 p-3 bg-black/40 rounded-full border border-white/10 shadow-inner">
                {/* Red Light */}
                <div
                  className={`w-8 h-8 rounded-full transition-all duration-700 shadow-inner ${
                    !isGreen 
                    ? "bg-red-600 shadow-[0_0_20px_rgba(220,38,38,0.6)] border border-red-400/50" 
                    : "bg-red-900/30 border border-transparent"
                  }`}
                />

                {/* Yellow Light (Standby) */}
                <div className="w-8 h-8 rounded-full bg-amber-900/20 border border-transparent" />

                {/* Green Light */}
                <div
                  className={`w-8 h-8 rounded-full transition-all duration-700 shadow-inner ${
                    isGreen 
                    ? "bg-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.6)] border border-emerald-300/50" 
                    : "bg-emerald-900/30 border border-transparent"
                  }`}
                />
              </div>

              {/* Status Label */}
              <div className="mt-4 flex flex-col items-center">
                <span className={`text-[10px] font-black uppercase tracking-[0.2em] px-3 py-1 rounded-full ${
                  isGreen 
                  ? "bg-emerald-500/20 text-emerald-400" 
                  : "bg-red-500/10 text-red-400"
                }`}>
                  {isGreen ? "GO" : "STOP"}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default TrafficLights;