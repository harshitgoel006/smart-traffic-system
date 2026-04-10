import { Car, Clock, Activity, AlertCircle } from "lucide-react";

function Dashboard({ traffic, currentGreen, timer }) {
  // Helper to determine density color
  const getDensityStatus = (count) => {
    if (count > 20) return { label: "High", color: "text-red-400", bg: "bg-red-500/10", border: "border-red-500/20" };
    if (count > 10) return { label: "Medium", color: "text-yellow-400", bg: "bg-yellow-500/10", border: "border-yellow-500/20" };
    return { label: "Low", color: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/20" };
  };

  return (
    <div className="relative overflow-hidden bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-6 shadow-2xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-cyan-500/20 rounded-lg text-cyan-400">
            <Activity size={20} />
          </div>
          <h2 className="text-xl font-bold tracking-tight text-white">Live Traffic Analytics</h2>
        </div>
        
        <div className="flex items-center gap-2 px-3 py-1 bg-white/5 rounded-full border border-white/10">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Real-time Feed</span>
        </div>
      </div>

      {/* Traffic Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {["A", "B", "C"].map((road) => {
          const status = getDensityStatus(traffic[road]);
          const isActive = currentGreen === road;

          return (
            <div 
              key={road}
              className={`relative transition-all duration-500 p-5 rounded-2xl border ${
                isActive 
                ? "bg-emerald-500/10 border-emerald-500/40 shadow-[0_0_20px_rgba(16,185,129,0.1)]" 
                : "bg-white/5 border-white/10"
              }`}
            >
              <div className="flex justify-between items-start mb-3">
                <p className={`text-xs font-bold uppercase tracking-wider ${isActive ? 'text-emerald-400' : 'text-slate-400'}`}>
                  Road {road}
                </p>
                <span className={`text-[10px] px-2 py-0.5 rounded-md font-bold uppercase ${status.bg} ${status.color} border ${status.border}`}>
                  {status.label}
                </span>
              </div>
              
              <div className="flex items-end justify-between">
                <p className="text-4xl font-black text-white leading-none">{traffic[road]}</p>
                <Car size={20} className={isActive ? "text-emerald-400" : "text-slate-600"} />
              </div>

              {isActive && (
                <div className="absolute -top-1 -right-1">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Status Footer Panel */}
      <div className="grid grid-cols-2 gap-4">
        <div className="flex items-center gap-4 bg-white/5 border border-white/10 p-4 rounded-2xl">
          <div className="p-3 bg-emerald-500/20 rounded-xl text-emerald-400">
             <div className="relative">
                <div className="w-3 h-3 bg-emerald-500 rounded-full shadow-[0_0_10px_#10b981]" />
             </div>
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Active Path</p>
            <p className="text-lg font-bold text-white">Road {currentGreen}</p>
          </div>
        </div>

        <div className="flex items-center gap-4 bg-white/5 border border-white/10 p-4 rounded-2xl">
          <div className="p-3 bg-cyan-500/20 rounded-xl text-cyan-400">
            <Clock size={24} className={timer <= 5 ? "animate-bounce text-red-400" : ""} />
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Switching In</p>
            <p className={`text-lg font-bold ${timer <= 5 ? 'text-red-400' : 'text-white'}`}>
              {timer}<span className="text-xs ml-1 opacity-50 font-normal">seconds</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;