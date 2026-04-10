import { Plus, Minus, Siren, Settings2 } from "lucide-react";

function TrafficControls({ addVehicle, removeVehicle, handleEmergency }) {
  return (
    <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-6 shadow-2xl">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-purple-500/20 rounded-lg text-purple-400">
          <Settings2 size={20} />
        </div>
        <h2 className="text-xl font-bold tracking-tight text-white">Manual Override</h2>
      </div>

      <div className="space-y-4">
        {["A", "B", "C"].map((road) => (
          <div
            key={road}
            className="group flex items-center justify-between bg-white/5 border border-white/5 p-4 rounded-2xl transition-all hover:bg-white/10 hover:border-white/20"
          >
            <div className="flex flex-col">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">Signal Path</span>
              <span className="text-lg font-bold text-slate-200">Road {road}</span>
            </div>

            <div className="flex items-center gap-2">
              {/* Add Vehicle */}
              <button
                onClick={() => addVehicle(road)}
                className="p-2 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-xl hover:bg-emerald-500 hover:text-white transition-all active:scale-90"
                title="Add Vehicle"
              >
                <Plus size={18} />
              </button>

              {/* Remove Vehicle */}
              <button
                onClick={() => removeVehicle(road)}
                className="p-2 bg-rose-500/10 text-rose-400 border border-rose-500/20 rounded-xl hover:bg-rose-500 hover:text-white transition-all active:scale-90"
                title="Remove Vehicle"
              >
                <Minus size={18} />
              </button>

              {/* Divider */}
              <div className="w-[1px] h-6 bg-white/10 mx-1" />

              {/* Emergency Button */}
              <button
                onClick={() => handleEmergency(road)}
                className="relative p-2 bg-amber-500/10 text-amber-500 border border-amber-500/20 rounded-xl hover:bg-amber-500 hover:text-white transition-all overflow-hidden group/btn active:scale-95 shadow-[0_0_15px_rgba(245,158,11,0.1)] hover:shadow-[0_0_20px_rgba(245,158,11,0.4)]"
                title="Emergency Override"
              >
                <Siren size={18} className="relative z-10 animate-[pulse_2s_infinite]" />
                <span className="absolute inset-0 bg-gradient-to-tr from-amber-600 to-yellow-400 opacity-0 group-hover/btn:opacity-100 transition-opacity" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Info Tip */}
      <div className="mt-6 p-4 rounded-2xl bg-blue-500/5 border border-blue-500/10">
        <p className="text-[11px] leading-relaxed text-slate-400 text-center italic">
          Tip: Use the <span className="text-amber-500 font-bold">Siren</span> button to force an immediate 60s Green Signal for priority vehicles.
        </p>
      </div>
    </div>
  );
}

export default TrafficControls;