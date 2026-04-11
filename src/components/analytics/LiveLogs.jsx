function LiveLogs({ logs }) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-5">

      <h2 className="text-lg font-bold mb-4">Live Data Stream</h2>

      <div className="h-48 overflow-y-auto space-y-2 text-xs font-mono">

        {/* ✅ fallback logs */}
        {(!logs || logs.length === 0) && (
          <div className="text-slate-500 italic">
            Initializing traffic system...
          </div>
        )}

        {(logs || []).map((log, i) => {
          const isAlert = log.includes("[ALERT]");
          const isWarn = log.includes("[WARN]");
          const isInfo = log.includes("[INFO]");

          return (
            <div
              key={i}
              className={`px-3 py-1 rounded flex justify-between items-center ${
                isAlert
                  ? "bg-red-500/10 text-red-400"
                  : isWarn
                  ? "bg-yellow-500/10 text-yellow-400"
                  : isInfo
                  ? "bg-cyan-500/10 text-cyan-400"
                  : "bg-white/5 text-slate-300"
              }`}
            >
              {/* LOG TEXT */}
              <span>{log}</span>

              {/* TYPE TAG */}
              <span className="text-[10px] opacity-60 ml-2">
                {isAlert ? "ALERT" : isWarn ? "WARN" : "INFO"}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default LiveLogs;