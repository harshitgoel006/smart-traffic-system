import React from "react";
import TrafficGraph from "./TrafficGraph";
import SignalOverview from "./SignalOverview";

const Dashboard = ({
  traffic,
  history,
  currentGreen,
  signalPhase,
  congestion,
  sensors,
}) => {
  // 🔹 Total Vehicles
  const totalVehicles = Object.values(traffic).reduce((a, b) => a + b, 0);

  // 🔹 Peak Road
  const peakRoad = Object.keys(traffic).reduce((a, b) =>
    traffic[a] > traffic[b] ? a : b,
  );

  // 🔹 Density Function
  const getDensity = (val) => {
    if (val <= 15) return "Low";
    if (val <= 40) return "Medium";
    return "High";
  };

  return (
    <div className="space-y-6">
      {/* 🔥 STEP 2: STATS ROW (NEXT) */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Total Vehicles */}
        <div className="bg-white/5 p-4 rounded-xl">
          <p className="text-sm text-gray-400">Total Vehicles</p>
          <h2 className="text-2xl font-bold">{totalVehicles}</h2>
        </div>

        {/* Sensors */}
        <div className="bg-white/5 p-4 rounded-xl">
          <p className="text-sm text-gray-400">Active Sensors</p>
          <h2 className="text-2xl font-bold">{sensors.length}</h2>
        </div>

        {/* Active Signal */}
        <div className="bg-white/5 p-4 rounded-xl">
          <p className="text-sm text-gray-400">Active Signal</p>
          <h2 className="text-2xl font-bold">{currentGreen.join(" + ")}</h2>
        </div>

        {/* Congestion */}
        <div className="bg-white/5 p-4 rounded-xl">
          <p className="text-sm text-gray-400">Congestion</p>
          <h2 className="text-2xl font-bold">{congestion}%</h2>
        </div>
      </div>

      <TrafficGraph history={history} />
      {/* 🔥 STEP 4: BOTTOM SECTION */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Signal Overview */}
        <SignalOverview
          currentGreen={currentGreen}
          signalPhase={signalPhase}
          traffic={traffic}
        />
      </div>
    </div>
  );
};

export default Dashboard;
