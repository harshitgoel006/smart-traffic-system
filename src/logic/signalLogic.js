import { getDensity } from "./densityLogic";

export function getSignalDecision(traffic, waitingTime) {
  let maxRoad = "A";
  let maxPriority = traffic.A + waitingTime.A;

  ["B", "C"].forEach(road => {
    let priority = traffic[road] + waitingTime[road];

    if (priority > maxPriority) {
      maxPriority = priority;
      maxRoad = road;
    }
  });

  const density = getDensity(traffic[maxRoad]);

  let time = 20;

  if (density === "Medium") time = 40;
  if (density === "High") time = 60;

  return {
    road: maxRoad,
    density,
    time
  };
}