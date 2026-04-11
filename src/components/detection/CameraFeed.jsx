import React from "react";

const CameraFeed = ({ traffic, sensors, logs }) => {

  // 🔹 Camera sensors filter
  const cameras = sensors.filter(s => s.type === "Camera");

  // 🔹 Stats
  const activeCameras = cameras.length;
  const detections = logs.length;
  const accuracy = "97.2%"; // static for now
  const violations = Math.floor(detections * 0.05);

  return (
    <div className="space-y-6">

      {/* 🔥 STATS ROW */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

        <div className="bg-white/5 p-4 rounded-xl">
          <p className="text-sm text-gray-400">Active Cameras</p>
          <h2 className="text-xl font-bold">{activeCameras}</h2>
        </div>

        <div className="bg-white/5 p-4 rounded-xl">
          <p className="text-sm text-gray-400">Detections</p>
          <h2 className="text-xl font-bold">{detections}</h2>
        </div>

        <div className="bg-white/5 p-4 rounded-xl">
          <p className="text-sm text-gray-400">Accuracy</p>
          <h2 className="text-xl font-bold">{accuracy}</h2>
        </div>

        <div className="bg-white/5 p-4 rounded-xl">
          <p className="text-sm text-gray-400">Violations</p>
          <h2 className="text-xl font-bold">{violations}</h2>
        </div>

      </div>

      {/* 🔥 CAMERA GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        {cameras.map((cam) => {

          const vehicles = traffic[cam.road];

          return (
            <div
              key={cam.id}
              className="bg-black/40 border border-white/10 rounded-xl p-4 relative overflow-hidden"
            >

              {/* 🔹 Header */}
              <div className="flex justify-between mb-2">
                <span className="text-sm font-semibold">
                  {cam.id} • Road {cam.road}
                </span>
                <span className="text-xs text-green-400">LIVE</span>
              </div>

              {/* 🔹 Fake camera feed */}
              <div className="h-40 bg-black rounded-md flex items-center justify-center relative">

                {/* Vehicles */}
                <div className="absolute text-green-400 text-sm">
                  {vehicles} vehicles
                </div>

                {/* 🔥 simple animation dots */}
                <div className="absolute inset-0 flex flex-wrap p-2 gap-1 opacity-30">
                  {Array.from({ length: vehicles }).map((_, i) => (
                    <div
                      key={i}
                      className="w-2 h-2 bg-green-400 rounded-full animate-pulse"
                    />
                  ))}
                </div>

              </div>

            </div>
          );
        })}

      </div>

      {/* 🔥 DETECTION LOG */}
      <div className="bg-white/5 p-4 rounded-xl">

        <h3 className="mb-4 font-semibold">Detection Log</h3>

        <div className="max-h-60 overflow-y-auto space-y-2 text-xs font-mono">

          {logs.slice(0, 15).map((log, i) => (
            <div key={i} className="bg-black/30 p-2 rounded">
              {log}
            </div>
          ))}

        </div>

      </div>

    </div>
  );
};

export default CameraFeed;