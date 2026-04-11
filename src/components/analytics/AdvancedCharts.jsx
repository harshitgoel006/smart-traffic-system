import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend
} from "recharts";

const AdvancedCharts = ({ history }) => {

  const data = history.map((item, i) => ({
    time: i,
    A: item.A,
    B: item.B,
    C: item.C,
    D: item.D
  }));

  return (
    <div className="bg-white/5 p-4 rounded-xl">

      <h3 className="mb-4 font-semibold">Traffic Distribution</h3>

      <div className="w-full h-[300px]">
        <ResponsiveContainer>
          <LineChart data={data}>
            <CartesianGrid stroke="#ffffff10" />
            <XAxis dataKey="time" />
            <YAxis />
            <Tooltip />
            <Legend />

            <Line type="monotone" dataKey="A" stroke="#10b981" />
            <Line type="monotone" dataKey="B" stroke="#3b82f6" />
            <Line type="monotone" dataKey="C" stroke="#f59e0b" />
            <Line type="monotone" dataKey="D" stroke="#ef4444" />

          </LineChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
};

export default AdvancedCharts;