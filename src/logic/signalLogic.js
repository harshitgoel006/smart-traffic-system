import { getDensity } from "./densityLogic";

export function getSignalDecision(traffic, waitingTime) {

  const groups = [
    { roads: ["A", "C"], name: "A-C" },
    { roads: ["B", "D"], name: "B-D" }
  ];

  let bestGroup = null;
  let maxPriority = -1;

  // 🔹 Select best group based on traffic + waiting
  groups.forEach(group => {

    const totalTraffic =
      traffic[group.roads[0]] + traffic[group.roads[1]];

    const totalWaiting =
      waitingTime[group.roads[0]] + waitingTime[group.roads[1]];

    // 🔥 Balanced priority
    const priority = totalTraffic * 1.8 + totalWaiting * 1.2;

    if (priority > maxPriority) {
      maxPriority = priority;
      bestGroup = group;
    }

  });

  const totalLoad =
    traffic[bestGroup.roads[0]] +
    traffic[bestGroup.roads[1]];

  const density = getDensity(totalLoad);

  // 🔥 NEW DYNAMIC TIME (REALISTIC)
  let time = 12 + totalLoad * 0.15;

  // 🔒 LIMIT (MOST IMPORTANT)
  time = Math.min(30, Math.max(10, time));

  return {
    roads: bestGroup.roads,
    density,
    time: Math.round(time)
  };
}