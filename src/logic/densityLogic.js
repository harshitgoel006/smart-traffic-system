// densityLogic.js

// Function to classify traffic density
export function getDensity(count) {
  if (count <= 10) {
    return "Low";
  } else if (count <= 30) {
    return "Medium";
  } else {
    return "High";
  }
}