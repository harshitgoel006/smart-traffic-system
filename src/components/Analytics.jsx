import { useMemo } from "react";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { BarChart3, TrendingUp, Zap, History } from "lucide-react";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

function Analytics({ history }) {
  // --- LOGIC (UNCHANGED) ---
  const averageTraffic = useMemo(() => {
    if (history.length === 0) return { A: 0, B: 0, C: 0 };
    let totalA = 0, totalB = 0, totalC = 0;
    history.forEach((entry) => {
      totalA += entry.A;
      totalB += entry.B;
      totalC += entry.C;
    });
    return {
      A: (totalA / history.length).toFixed(1),
      B: (totalB / history.length).toFixed(1),
      C: (totalC / history.length).toFixed(1),
    };
  }, [history]);

  const peakTraffic = useMemo(() => {
    if (history.length === 0) return { road: "-", value: 0 };
    let max = 0; let road = "-";
    history.forEach((entry) => {
      if (entry.A > max) { max = entry.A; road = "A"; }
      if (entry.B > max) { max = entry.B; road = "B"; }
      if (entry.C > max) { max = entry.C; road = "C"; }
    });
    return { road, value: max };
  }, [history]);
  // --- END LOGIC ---

  // 📊 Improved Graph Styling
  const chartData = {
    labels: ["Road A", "Road B", "Road C"],
    datasets: [
      {
        label: "Live Load",
        data: history.length
          ? [
              history[history.length - 1].A,
              history[history.length - 1].B,
              history[history.length - 1].C,
            ]
          : [0, 0, 0],
        backgroundColor: [
          "rgba(34, 211, 238, 0.2)", // Cyan
          "rgba(139, 92, 246, 0.2)", // Purple
          "rgba(16, 185, 129, 0.2)", // Emerald
        ],
        borderColor: ["#22d3ee", "#8b5cf6", "#10b981"],
        borderWidth: 2,
        borderRadius: 8,
        hoverBackgroundColor: ["#22d3ee", "#8b5cf6", "#10b981"],
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: "#1e293b",
        titleColor: "#f1f5f9",
        padding: 12,
        cornerRadius: 10,
      },
    },
    scales: {
      y: { 
        grid: { color: "rgba(255, 255, 255, 0.05)" },
        ticks: { color: "#94a3b8" } 
      },
      x: { 
        grid: { display: false },
        ticks: { color: "#94a3b8" } 
      },
    },
  };

  return (
    <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-6 shadow-2xl overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-500/20 rounded-lg text-blue-400">
            <BarChart3 size={20} />
          </div>
          <h2 className="text-xl font-bold tracking-tight text-white">System Analytics</h2>
        </div>
        <div className="flex items-center gap-2 text-slate-400 text-xs font-medium">
          <History size={14} />
          <span>Last 24h Data Cycle</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Side: Graph */}
        <div className="lg:col-span-2 space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-widest text-slate-500 ml-1">Live Load Distribution</h3>
          <div className="bg-black/20 border border-white/5 p-6 rounded-2xl h-[300px] flex items-center justify-center">
            <Bar data={chartData} options={chartOptions} />
          </div>
        </div>

        {/* Right Side: Stats Stack */}
        <div className="space-y-6">
          {/* Average Traffic Section */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-widest text-slate-500 mb-4 flex items-center gap-2">
              <TrendingUp size={14} /> Average Flow
            </h3>
            <div className="grid grid-cols-1 gap-3">
              {['A', 'B', 'C'].map((road) => (
                <div key={road} className="flex items-center justify-between bg-white/5 p-3 rounded-xl border border-white/5 hover:border-white/10 transition-colors">
                  <span className="text-slate-400 font-medium">Road {road}</span>
                  <span className="text-white font-bold">{averageTraffic[road]} <span className="text-[10px] text-slate-500">v/s</span></span>
                </div>
              ))}
            </div>
          </div>

          {/* Peak Traffic Card */}
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
            <div className="relative bg-[#0f172a] p-4 rounded-2xl border border-white/10">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-amber-500/20 rounded-lg text-amber-500">
                  <Zap size={18} />
                </div>
                <h3 className="font-bold text-white uppercase text-xs tracking-widest">Peak Detected</h3>
              </div>
              <div className="mt-2">
                <p className="text-2xl font-black text-amber-500">Road {peakTraffic.road}</p>
                <p className="text-xs text-slate-400 leading-tight">
                  Reached <span className="text-white font-bold">{peakTraffic.value}</span> vehicles during last cycle.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Analytics;