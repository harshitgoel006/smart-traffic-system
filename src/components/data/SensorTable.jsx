function SensorTable({ sensors }) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
      <h2 className="text-lg font-bold mb-4">IoT Sensor Network</h2>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="text-slate-400 border-b border-white/10">
            <tr>
              <th className="text-left py-2">Sensor ID</th>
              <th className="text-left py-2">Type</th>
              <th className="text-left py-2">Road</th>
              <th className="text-left py-2">Status</th>
              <th className="text-left py-2">Battery</th>
            </tr>
          </thead>

          <tbody>
            {(sensors || []).map((s) => {
              const battery = Math.round(s.battery || 0);

              const batteryColor =
                battery > 60
                  ? "bg-green-500"
                  : battery > 30
                  ? "bg-yellow-500"
                  : "bg-red-500";

              const status = s.status || "unknown";

              const statusColor =
                status === "online"
                  ? "text-green-400"
                  : status === "warning"
                  ? "text-yellow-400"
                  : "text-red-400";

              return (
                <tr key={s.id} className="border-b border-white/5">
                  <td className="py-2 font-semibold">{s.id}</td>
                  <td>{s.type || "N/A"}</td>
                  <td>Road {s.road}</td>

                  {/* ✅ SAFE STATUS */}
                  <td className={statusColor}>
                    {status.toUpperCase()}
                  </td>

                  {/* 🔋 CLEAN BATTERY */}
                  <td>
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-2 bg-white/10 rounded">
                        <div
                          className={`h-2 rounded ${batteryColor}`}
                          style={{ width: `${battery}%` }}
                        ></div>
                      </div>
                      <span>{battery}%</span>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default SensorTable;