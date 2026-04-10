import { motion, AnimatePresence } from "framer-motion";
import { CarFront, Zap } from "lucide-react";

function RoadSimulation({ traffic, currentGreen }) {
  const roads = ["A", "B", "C"];

  return (
    <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-6 shadow-2xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-indigo-500/20 rounded-lg text-indigo-400">
            <CarFront size={20} />
          </div>
          <h2 className="text-xl font-bold tracking-tight text-white">Neural Road Network</h2>
        </div>
        <div className="flex items-center gap-2 px-3 py-1 bg-indigo-500/10 rounded-full border border-indigo-500/20">
          <Zap size={14} className="text-indigo-400" />
          <span className="text-[10px] font-bold uppercase tracking-widest text-indigo-300">Live Simulation</span>
        </div>
      </div>

      <div className="space-y-6">
        {roads.map((road) => {
          const isGreen = currentGreen === road;

          return (
            <div key={road} className="space-y-2">
              <div className="flex justify-between items-end px-2">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Sector {road}</span>
                <span className={`text-[10px] font-black px-2 py-0.5 rounded ${isGreen ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/10 text-rose-400'}`}>
                  {isGreen ? "SYSTEM_FLOW: ACTIVE" : "SYSTEM_FLOW: HALTED"}
                </span>
              </div>

              {/* Asphalt Lane */}
              <div className="relative bg-[#1e293b] h-20 rounded-2xl border border-white/5 overflow-hidden shadow-inner group">
                {/* Road Texture & Markings */}
                <div className="absolute inset-0 opacity-20 pointer-events-none" 
                     style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 0)', backgroundSize: '24px 24px' }} />
                
                {/* Center Road Line */}
                <div className="absolute top-1/2 left-0 w-full h-[2px] border-t-2 border-dashed border-white/10 -translate-y-1/2" />

                {/* Vehicle Stream */}
                <div className="flex items-center h-full gap-3 px-8 relative z-10">
                  <AnimatePresence>
                    {Array.from({ length: traffic[road] }).map((_, i) => (
                      <motion.div
                        key={`${road}-${i}`}
                        initial={{ opacity: 0, x: -20, scale: 0.8 }}
                        animate={{ 
                          opacity: 1, 
                          x: 0, 
                          scale: 1,
                          filter: isGreen ? "drop-shadow(0 0 8px #22d3ee)" : "none"
                        }}
                        exit={{ opacity: 0, x: 50, scale: 0.5 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        className={`relative w-8 h-4 rounded-md flex-shrink-0 transition-colors duration-500 ${
                          isGreen 
                          ? "bg-gradient-to-r from-cyan-400 to-blue-500" 
                          : "bg-slate-600 border border-white/10"
                        }`}
                      >
                        {/* Car Detail: Headlights */}
                        <div className={`absolute -right-1 top-1 w-1 h-2 rounded-full ${isGreen ? 'bg-white shadow-[0_0_5px_white]' : 'bg-transparent'}`} />
                        
                        {/* Moving Animation */}
                        {isGreen && (
                          <motion.div 
                            animate={{ x: [0, 10, 0] }}
                            transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                            className="absolute inset-0 bg-white/20 rounded-md"
                          />
                        )}
                      </motion.div>
                    ))}
                  </AnimatePresence>

                  {traffic[road] === 0 && (
                    <span className="text-slate-600 text-xs font-medium italic opacity-50">Clear Path...</span>
                  )}
                </div>

                {/* Signal Light at the end of the road */}
                <div className={`absolute right-0 top-0 bottom-0 w-2 transition-colors duration-500 ${isGreen ? 'bg-emerald-500/40 shadow-[0_0_20px_#10b981]' : 'bg-rose-500/40 shadow-[0_0_20px_#f43f5e]'}`} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="mt-8 pt-4 border-t border-white/5 flex justify-center gap-6">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-sm bg-gradient-to-r from-cyan-400 to-blue-500" />
          <span className="text-[10px] text-slate-400 uppercase font-bold tracking-tighter">Moving Vehicle</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-sm bg-slate-600 border border-white/10" />
          <span className="text-[10px] text-slate-400 uppercase font-bold tracking-tighter">Idle Vehicle</span>
        </div>
      </div>
    </div>
  );
}

export default RoadSimulation;