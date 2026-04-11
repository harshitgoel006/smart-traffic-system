import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from "recharts";

const TrafficGraph = ({ history }) => {

  // 🔹 format data
  const data = history.map((item, index) => ({
    time: index,
    total: Object.values(item).reduce((a, b) => a + b, 0)
  }));

  return (
    <div className="bg-white/5 p-4 rounded-xl">

      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold">Real-Time Traffic Flow</h3>
        <span className="text-xs text-gray-400">Live</span>
      </div>

      <div className="w-full h-[250px]">
        <ResponsiveContainer>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />

            <XAxis
              dataKey="time"
              tick={{ fill: "#9ca3af", fontSize: 10 }}
            />

            <YAxis
              tick={{ fill: "#9ca3af", fontSize: 10 }}
            />

            <Tooltip />

            <Line
              type="monotone"
              dataKey="total"
              stroke="#10b981"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
};

export default TrafficGraph;