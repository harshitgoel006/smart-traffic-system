import { getDensity } from "./densityLogic";

export function getSignalDecision(traffic, waitingTime) {
  const groups = [
    { roads: ["A", "C"], name: "A-C" },
    { roads: ["B", "D"], name: "B-D" }
  ];

  let bestGroup = null;
  let maxPriority = -1;

  groups.forEach(group => {
    const totalTraffic =
      traffic[group.roads[0]] + traffic[group.roads[1]];

    const totalWaiting =
      waitingTime[group.roads[0]] + waitingTime[group.roads[1]];

    const priority = totalTraffic * 2 + totalWaiting * 1.5;

    if (priority > maxPriority) {
      maxPriority = priority;
      bestGroup = group;
    }
  });

  const density = getDensity(
    traffic[bestGroup.roads[0]] +
    traffic[bestGroup.roads[1]]
  );

  let time =
    density === "Low" ? 20 :
    density === "Medium" ? 35 :
    50;

  return {
    roads: bestGroup.roads,
    density,
    time
  };
}