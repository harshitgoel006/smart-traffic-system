import { getDensity } from "./densityLogic";

export function getSignalDecision(traffic, waitingTime, prevGreen) {
  const groups = [
    { roads: ["A", "C"], name: "A-C" },
    { roads: ["B", "D"], name: "B-D" },
  ];

  let bestGroup = null;
  let maxPriority = -1;

  groups.forEach((group) => {
    const totalTraffic = traffic[group.roads[0]] + traffic[group.roads[1]];

    const totalWaiting =
      waitingTime[group.roads[0]] + waitingTime[group.roads[1]];

    let priority = totalTraffic * 2 + totalWaiting * 1.5;

    if (JSON.stringify(group.roads) === JSON.stringify(prevGreen)) {
      priority *= 0.4;
    }

    if (priority > maxPriority) {
      maxPriority = priority;
      bestGroup = group;
    }
  });

  const totalLoad = traffic[bestGroup.roads[0]] + traffic[bestGroup.roads[1]];

  const density = getDensity(totalLoad);

  let time = 12 + totalLoad * 0.2;

  time = Math.min(30, Math.max(10, time));

  return {
    roads: bestGroup.roads,
    density,
    time: Math.round(time),
  };
}
