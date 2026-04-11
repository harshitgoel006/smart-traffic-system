import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Area,
  AreaChart,
} from "recharts";

const TrafficGraph = ({ history }) => {
  const data = history.map((item, index) => ({
    time: index,
    total: Object.values(item).reduce((a, b) => a + b, 0),
  }));

  return (
    <div className="glass-card p-8 h-full">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h3 className="text-xl font-bold text-slate-800">
            Traffic Flow Analysis
          </h3>
          <p className="text-sm text-slate-400 font-medium">
            Real-time vehicle monitoring
          </p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1 bg-emerald-50 rounded-full">
          <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
          <span className="text-xs font-bold text-emerald-600 uppercase">
            Live Feed
          </span>
        </div>
      </div>

      <div className="w-full h-[320px]">
        <ResponsiveContainer>
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6366f1" stopOpacity={0.1} />
                <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#f1f5f9"
            />
            <XAxis dataKey="time" hide />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#94a3b8", fontSize: 12 }}
            />
            <Tooltip
              contentStyle={{
                borderRadius: "16px",
                border: "none",
                boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)",
              }}
            />
            <Area
              type="monotone"
              dataKey="total"
              stroke="#6366f1"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#colorTotal)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default TrafficGraph;
