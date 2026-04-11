export function getDensity(count) {
  if (count <= 15) return "Low";
  if (count <= 40) return "Medium";
  return "High";
}