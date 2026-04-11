import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
  Area,
  AreaChart,
} from "recharts";

const AdvancedCharts = ({ history }) => {
  const data = history.map((item, i) => ({
    time: i,
    A: item.A,
    B: item.B,
    C: item.C,
    D: item.D,
  }));

  return (
    <div className="glass-card p-8 border border-slate-200/50">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h3 className="text-lg font-black text-slate-800 tracking-tight leading-none">
            Traffic Distribution
          </h3>
          <p className="text-sm text-slate-400 mt-2 font-medium">
            Comparative analysis of all 4 roads
          </p>
        </div>
      </div>

      <div className="w-full h-[350px]">
        <ResponsiveContainer>
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorA" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.1} />
                <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorB" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1} />
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
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
            <Legend
              iconType="circle"
              wrapperStyle={{
                paddingTop: "20px",
                fontWeight: "bold",
                fontSize: "12px",
              }}
            />

            <Area
              type="monotone"
              dataKey="A"
              stroke="#10b981"
              strokeWidth={3}
              fill="url(#colorA)"
            />
            <Area
              type="monotone"
              dataKey="B"
              stroke="#3b82f6"
              strokeWidth={3}
              fill="url(#colorB)"
            />
            <Area
              type="monotone"
              dataKey="C"
              stroke="#f59e0b"
              strokeWidth={3}
              fillOpacity={0}
            />
            <Area
              type="monotone"
              dataKey="D"
              stroke="#ef4444"
              strokeWidth={3}
              fillOpacity={0}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AdvancedCharts;
