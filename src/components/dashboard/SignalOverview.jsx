import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer
} from "recharts";

const SignalOverview = ({
  currentGreen,
  signalPhase,
  traffic
}) => {

  // 🔹 Counts
  const green = currentGreen.length;
  const yellow = signalPhase === "YELLOW" ? 1 : 0;
  const red = 4 - green - yellow;

  // 🔹 Peak Road
  const peakRoad = Object.keys(traffic).reduce((a, b) =>
    traffic[a] > traffic[b] ? a : b
  );

  const peakValue = traffic[peakRoad];

  // 🔹 System Status
  const total = Object.values(traffic).reduce((a, b) => a + b, 0);

  let status = "Smooth";
  if (total > 80) status = "Heavy";
  else if (total > 40) status = "Moderate";

  // 🔹 Chart data
  const data = [
    { name: "Green", value: green },
    { name: "Yellow", value: yellow },
    { name: "Red", value: red }
  ];

  const COLORS = ["#10b981", "#f59e0b", "#ef4444"];

  return (
    <div className="bg-white/5 p-5 rounded-xl space-y-4">

      {/* 🔥 HEADER */}
      <div className="flex justify-between items-center">
        <h3 className="font-semibold text-lg">Signal Overview</h3>
        <span className="text-xs text-gray-400">Live</span>
      </div>

      {/* 🔹 SIGNAL STATUS */}
      <div className="flex justify-between text-sm">

        <div>
          <p className="text-gray-400">Phase</p>
          <p className="font-bold">{signalPhase}</p>
        </div>

        <div>
          <p className="text-gray-400">Active</p>
          <p className="font-bold">{currentGreen.join(", ")}</p>
        </div>

      </div>

      {/* 🔹 COUNTS */}
      <div className="flex justify-around text-sm">

        <div className="text-center">
          <p className="text-green-400 text-lg font-bold">{green}</p>
          <p className="text-gray-400">Green</p>
        </div>

        <div className="text-center">
          <p className="text-yellow-400 text-lg font-bold">{yellow}</p>
          <p className="text-gray-400">Yellow</p>
        </div>

        <div className="text-center">
          <p className="text-red-400 text-lg font-bold">{red}</p>
          <p className="text-gray-400">Red</p>
        </div>

      </div>

      {/* 🔹 CHART */}
      <div className="w-full h-[180px]">
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={data}
              innerRadius={45}
              outerRadius={70}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={index} fill={COLORS[index]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* 🔥 INSIGHTS */}
      <div className="bg-white/5 p-3 rounded-lg text-sm space-y-1">

        <p>
          ⚠️ Peak Traffic: <span className="font-bold">{peakRoad}</span> ({peakValue})
        </p>

        <p>
          📊 System Status: <span className="font-bold">{status}</span>
        </p>

      </div>

    </div>
  );
};

export default SignalOverview;