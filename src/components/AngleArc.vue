<script setup lang="ts">
defineProps<{
  cx: number;
  cy: number;
  radius: number;
  startAngle: number;
  endAngle: number;
  color: string;
}>();

// Function to calculate the coordinates of a point on a circle
function polarToCartesian(centerX: number, centerY: number, radius: number, angleInDegrees: number) {
  const angleInRadians = (angleInDegrees * Math.PI) / 180.0;
  return {
    x: centerX + radius * Math.cos(angleInRadians),
    y: centerY + radius * Math.sin(angleInRadians)
  };
}

// Function to create the SVG arc path
function createArcPath(x: number, y: number, radius: number, startAngle: number, endAngle: number) {
  // Normalize angles to ensure correct arc direction
  let start = startAngle;
  let end = endAngle;
  
  // Ensure angles are within 0-360 degree range
  start = (start % 360 + 360) % 360;
  end = (end % 360 + 360) % 360;
  
  // Calculate angle difference in a way that handles the -180 to +180 boundary correctly
  let angleDiff = ((end - start + 540) % 360) - 180;
  
  // If angle difference is negative, swap start and end to get the inner angle
  if (angleDiff < 0) {
    const temp = start;
    start = end;
    end = temp;
    angleDiff = -angleDiff;
  }
  
  // If angle difference is greater than 180 degrees, we need the outer angle
  if (angleDiff > 180) {
    const temp = start;
    start = end;
    end = temp;
    angleDiff = 360 - angleDiff;
  }
  
  const startPoint = polarToCartesian(x, y, radius, start);
  const endPoint = polarToCartesian(x, y, radius, end);
  
  // Arc flags
  const largeArcFlag = angleDiff > 180 ? "1" : "0";
  const sweepFlag = "1"; // Always use positive sweep for inner angle
  
  // Create the path data
  const path = [
    "M", startPoint.x, startPoint.y, 
    "A", radius, radius, 0, largeArcFlag, sweepFlag, endPoint.x, endPoint.y
  ].join(" ");
  
  return path;
}
</script>

<template>
  <path 
    :d="createArcPath(cx, cy, radius, startAngle, endAngle)" 
    :stroke="color" 
    fill="none" 
    stroke-width="2"
  />
</template> 