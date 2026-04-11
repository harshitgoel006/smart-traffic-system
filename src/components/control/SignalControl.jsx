import React from "react";

const SignalControl = ({
  traffic,
  currentGreen,
  signalPhase,
  timer,
  handleEmergency,
  setTraffic
}) => {

  const roads = ["A", "B", "C", "D"];

  // 🔹 Total vehicles
  const totalVehicles = Object.values(traffic).reduce((a, b) => a + b, 0);

  // 🔹 Mode
  const mode = "AUTO";

  return (
    <div className="space-y-6">

      {/* 🔥 STATS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

        <div className="bg-white/5 p-4 rounded-xl">
          <p className="text-sm text-gray-400">Active Signals</p>
          <h2 className="text-xl font-bold">{currentGreen.length}</h2>
        </div>

        <div className="bg-white/5 p-4 rounded-xl">
          <p className="text-sm text-gray-400">Phase</p>
          <h2 className="text-xl font-bold">{signalPhase}</h2>
        </div>

        <div className="bg-white/5 p-4 rounded-xl">
          <p className="text-sm text-gray-400">Timer</p>
          <h2 className="text-xl font-bold">{timer}s</h2>
        </div>

        <div className="bg-white/5 p-4 rounded-xl">
          <p className="text-sm text-gray-400">Mode</p>
          <h2 className="text-xl font-bold">{mode}</h2>
        </div>

      </div>

      {/* 🚦 TRAFFIC LIGHT VISUAL */}
      <div className="bg-white/5 p-6 rounded-xl">

        <h3 className="mb-4 font-semibold">Intersection Control</h3>

        <div className="grid grid-cols-3 gap-6 text-center items-center">

          {/* Road A */}
          <div className="col-start-2">
            <Light road="A" currentGreen={currentGreen} signalPhase={signalPhase} />
          </div>

          {/* Road D */}
          <div className="row-start-2">
            <Light road="D" currentGreen={currentGreen} signalPhase={signalPhase} />
          </div>

          {/* Center */}
          <div className="row-start-2 col-start-2 text-gray-400">
            Junction
          </div>

          {/* Road B */}
          <div className="row-start-2 col-start-3">
            <Light road="B" currentGreen={currentGreen} signalPhase={signalPhase} />
          </div>

          {/* Road C */}
          <div className="row-start-3 col-start-2">
            <Light road="C" currentGreen={currentGreen} signalPhase={signalPhase} />
          </div>

        </div>

      </div>

      {/* 🔥 PHASE INFO */}
      <div className="bg-white/5 p-4 rounded-xl">

        <h3 className="mb-2 font-semibold">Phase Info</h3>

        <p>Current Active: {currentGreen.join(" + ")}</p>
        <p>Total Vehicles: {totalVehicles}</p>

      </div>

      {/* 🔥 CONTROLS */}
      <div className="bg-white/5 p-4 rounded-xl">

        <h3 className="mb-4 font-semibold">Controls</h3>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">

          {roads.map((r) => (
            <button
              key={r}
              onClick={() => handleEmergency(r)}
              className="bg-red-500/20 hover:bg-red-500/40 text-red-400 px-3 py-2 rounded"
            >
              Emergency {r}
            </button>
          ))}

        </div>

        {/* Manual traffic */}
        <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-3">

          {roads.map((r) => (
            <div key={r} className="flex gap-2">

              <button
                onClick={() =>
                  setTraffic((prev) => ({
                    ...prev,
                    [r]: prev[r] + 5
                  }))
                }
                className="bg-green-500/20 px-2 py-1 rounded"
              >
                + {r}
              </button>

              <button
                onClick={() =>
                  setTraffic((prev) => ({
                    ...prev,
                    [r]: Math.max(0, prev[r] - 5)
                  }))
                }
                className="bg-yellow-500/20 px-2 py-1 rounded"
              >
                - {r}
              </button>

            </div>
          ))}

        </div>

      </div>

    </div>
  );
};

// 🔥 LIGHT COMPONENT
const Light = ({ road, currentGreen, signalPhase }) => {

  const isGreen = currentGreen.includes(road);

  return (
    <div className="flex flex-col items-center gap-1">

      <p className="text-sm">{road}</p>

      <div className="bg-black p-2 rounded flex flex-col gap-1">

        <div className={`w-4 h-4 rounded-full ${
          !isGreen ? "bg-red-500" : "bg-gray-700"
        }`} />

        <div className={`w-4 h-4 rounded-full ${
          signalPhase === "YELLOW" && isGreen ? "bg-yellow-400" : "bg-gray-700"
        }`} />

        <div className={`w-4 h-4 rounded-full ${
          isGreen && signalPhase === "GREEN" ? "bg-green-500" : "bg-gray-700"
        }`} />

      </div>

    </div>
  );
};

export default SignalControl;