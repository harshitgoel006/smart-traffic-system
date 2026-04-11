import React from "react";

const DataCollection = ({ sensors, traffic, logs, history }) => {
  // 🔹 Derived Stats
  const activeSensors = sensors.length;
  const totalData = history.length;
  const dataRate = Math.min(1000 + totalData * 5, 5000); // simulated
  const uptime = "99.8%";

  return (
    <div className="space-y-6">
      {/* 🔹 STATS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white/5 p-4 rounded-xl">
          <p className="text-sm text-gray-400">Active Sensors</p>
          <h2 className="text-xl font-bold">{activeSensors}</h2>
        </div>

        <div className="bg-white/5 p-4 rounded-xl">
          <p className="text-sm text-gray-400">Data Rate</p>
          <h2 className="text-xl font-bold">{dataRate}/s</h2>
        </div>

        <div className="bg-white/5 p-4 rounded-xl">
          <p className="text-sm text-gray-400">Uptime</p>
          <h2 className="text-xl font-bold">{uptime}</h2>
        </div>

        <div className="bg-white/5 p-4 rounded-xl">
          <p className="text-sm text-gray-400">Data Points</p>
          <h2 className="text-xl font-bold">{totalData}</h2>
        </div>
      </div>

      {/* 🔹 SENSOR TABLE */}
      <div className="bg-white/5 p-4 rounded-xl overflow-x-auto">
        <h3 className="mb-4 font-semibold">Sensor Network</h3>

        <table className="w-full text-sm">
          <thead className="text-gray-400 border-b border-white/10">
            <tr>
              <th className="text-left py-2">ID</th>
              <th className="text-left py-2">Road</th>
              <th className="text-left py-2">Type</th>
              <th className="text-left py-2">Status</th>
              <th className="text-left py-2">Battery</th>
              <th className="text-left py-2">Vehicles</th>
            </tr>
          </thead>

          <tbody>
            {sensors.map((s) => {
              const vehicles = traffic[s.road];

              let statusColor = "text-green-400";
              if (s.battery < 20) statusColor = "text-red-400";
              else if (s.battery < 50) statusColor = "text-yellow-400";

              return (
                <tr key={s.id} className="border-b border-white/5">
                  <td className="py-2">{s.id}</td>
                  <td>{s.road}</td>
                  <td>{s.type}</td>

                  <td className={statusColor}>
                    {s.battery < 20
                      ? "Critical"
                      : s.battery < 50
                        ? "Warning"
                        : "Online"}
                  </td>

                  <td>{Math.round(s.battery)}%</td>

                  <td>{vehicles}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* 🔹 LIVE STREAM */}
      <div className="bg-white/5 p-4 rounded-xl">
        <h3 className="mb-4 font-semibold">Live Data Stream</h3>

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

export default DataCollection;
