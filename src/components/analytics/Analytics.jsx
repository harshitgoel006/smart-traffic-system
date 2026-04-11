import React from "react";
import TrafficGraph from "../dashboard/TrafficGraph";

const Analytics = ({ traffic, history }) => {

  // 🔹 Peak Road
  const peakRoad = Object.keys(traffic).reduce((a, b) =>
    traffic[a] > traffic[b] ? a : b
  );

  // 🔹 Avg Vehicles
  const avgVehicles =
    history.length === 0
      ? 0
      : Math.round(
          history.reduce((sum, item) => {
            return sum + Object.values(item).reduce((a, b) => a + b, 0);
          }, 0) / history.length
        );

  // 🔹 Total vehicles
  const totalVehicles = Object.values(traffic).reduce((a, b) => a + b, 0);

  // 🔹 Efficiency
  const congestion = Math.min((totalVehicles / 150) * 100, 100);
  const efficiency = Math.max(0, (100 - congestion).toFixed(1));

  return (
    <div className="space-y-6">

      {/* 🔥 STATS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

        <div className="bg-white/5 p-4 rounded-xl">
          <p className="text-sm text-gray-400">Peak Road</p>
          <h2 className="text-xl font-bold">{peakRoad}</h2>
        </div>

        <div className="bg-white/5 p-4 rounded-xl">
          <p className="text-sm text-gray-400">Avg Vehicles</p>
          <h2 className="text-xl font-bold">{avgVehicles}</h2>
        </div>

        <div className="bg-white/5 p-4 rounded-xl">
          <p className="text-sm text-gray-400">Efficiency</p>
          <h2 className="text-xl font-bold">{efficiency}%</h2>
        </div>

        <div className="bg-white/5 p-4 rounded-xl">
          <p className="text-sm text-gray-400">Data Points</p>
          <h2 className="text-xl font-bold">{history.length}</h2>
        </div>

      </div>

      {/* 🔥 MAIN GRAPH */}
      <TrafficGraph history={history} />

    </div>
  );
};

export default Analytics;