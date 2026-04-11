import React from "react";

const Heatmap = ({ traffic }) => {

  const getColor = (val) => {
    if (val <= 15) return "bg-green-500/40";
    if (val <= 40) return "bg-yellow-400/40";
    return "bg-red-500/40";
  };

  return (
    <div className="bg-white/5 p-4 rounded-xl">

      <h3 className="mb-4 font-semibold">Traffic Heatmap</h3>

      <div className="grid grid-cols-2 gap-4">

        {Object.entries(traffic).map(([road, val]) => (
          <div
            key={road}
            className={`p-6 rounded-lg text-center ${getColor(val)}`}
          >
            <p className="text-lg font-bold">{road}</p>
            <p>{val} vehicles</p>
          </div>
        ))}

      </div>

    </div>
  );
};

export default Heatmap;