<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import AngleArc from '../components/AngleArc.vue';
import type { Point, TriangleAngles, TriangleArcAngles } from '../types/interfaces';

const route = useRoute();
const router = useRouter();

// Get coordinates from query parameters
const p1 = ref<Point>({ x: 0, y: 0 });
const p2 = ref<Point>({ x: 0, y: 0 });
const p3 = ref<Point>({ x: 0, y: 0 });

// Canvas dimensions
const canvasWidth = 500;
const canvasHeight = 500;

// For marker display
const markerRadius = 5;
const arcRadius = 20;

// Check if points form a straight line
const isValidTriangle = computed(() => {
  // Use area of triangle formula to check collinearity
  const area = Math.abs(
    (p1.value.x * (p2.value.y - p3.value.y) +
     p2.value.x * (p3.value.y - p1.value.y) +
     p3.value.x * (p1.value.y - p2.value.y)) / 2
  );
  
  // If area is very close to zero, points are collinear (straight line)
  return area > 0.00001;
});

// Error message for invalid triangle
const errorMessage = computed(() => {
  if (!isValidTriangle.value) {
    return "These points form a straight line. Please go back and enter points that form a valid triangle.";
  }
  return "";
});

onMounted(() => {
  // Parse query parameters
  p1.value = {
    x: Number(route.query.x1 || 0),
    y: Number(route.query.y1 || 0)
  };
  p2.value = {
    x: Number(route.query.x2 || 0),
    y: Number(route.query.y2 || 0)
  };
  p3.value = {
    x: Number(route.query.x3 || 0),
    y: Number(route.query.y3 || 0)
  };
});

// Calculate scaling to fit points on canvas
const scaledPoints = computed(() => {
  // Find min and max values
  const xValues = [p1.value.x, p2.value.x, p3.value.x];
  const yValues = [p1.value.y, p2.value.y, p3.value.y];
  
  const minX = Math.min(...xValues);
  const maxX = Math.max(...xValues);
  const minY = Math.min(...yValues);
  const maxY = Math.max(...yValues);
  
  // Calculate ranges
  const xRange = maxX - minX || 1; // Avoid division by zero
  const yRange = maxY - minY || 1;
  
  // Apply 15% padding to each side
  const paddingPercentage = 0.15;
  const paddingX = xRange * paddingPercentage;
  const paddingY = yRange * paddingPercentage;
  
  const paddedMinX = minX - paddingX;
  const paddedMaxX = maxX + paddingX;
  const paddedMinY = minY - paddingY;
  const paddedMaxY = maxY + paddingY;
  
  // Calculate adjusted ranges
  const paddedXRange = paddedMaxX - paddedMinX;
  const paddedYRange = paddedMaxY - paddedMinY;
  
  // Calculate scale factors (using padded ranges)
  const scaleX = canvasWidth / paddedXRange;
  const scaleY = canvasHeight / paddedYRange;
  
  // Use the smaller scale factor to maintain aspect ratio
  const scale = Math.min(scaleX, scaleY);
  
  // Calculate offset to center the triangle
  const offsetX = -paddedMinX * scale + (canvasWidth - paddedXRange * scale) / 2;
  const offsetY = -paddedMinY * scale + (canvasHeight - paddedYRange * scale) / 2;
  
  // Return scaled points
  return {
    p1: { 
      x: p1.value.x * scale + offsetX, 
      y: canvasHeight - (p1.value.y * scale + offsetY) // Invert Y-axis
    },
    p2: { 
      x: p2.value.x * scale + offsetX, 
      y: canvasHeight - (p2.value.y * scale + offsetY)
    },
    p3: { 
      x: p3.value.x * scale + offsetX, 
      y: canvasHeight - (p3.value.y * scale + offsetY)
    }
  };
});

// Calculate angles
const angles = computed<TriangleAngles>(() => {
  const { p1: sp1, p2: sp2, p3: sp3 } = scaledPoints.value;
  
  // Calculate distances between points (sides of the triangle)
  const a = calculateDistance(sp2, sp3);
  const b = calculateDistance(sp1, sp3);
  const c = calculateDistance(sp1, sp2);
  
  // Calculate angles using the law of cosines (in radians)
  const angleA = Math.acos((b*b + c*c - a*a) / (2 * b * c)) || 0;
  const angleB = Math.acos((a*a + c*c - b*b) / (2 * a * c)) || 0;
  const angleC = Math.acos((a*a + b*b - c*c) / (2 * a * b)) || 0;
  
  // Convert to degrees
  return {
    A: (angleA * 180 / Math.PI).toFixed(1),
    B: (angleB * 180 / Math.PI).toFixed(1),
    C: (angleC * 180 / Math.PI).toFixed(1)
  };
});


// Calculate angles for arc rendering
const arcAngles = computed<TriangleArcAngles>(() => {
  const { p1, p2, p3 } = scaledPoints.value;
  
  // For SVG coordinate system
  return {
    // Angle at p1 between vectors p1->p2 and p1->p3
    p1: {
      start: Math.atan2(p2.y - p1.y, p2.x - p1.x) * 180 / Math.PI,
      end: Math.atan2(p3.y - p1.y, p3.x - p1.x) * 180 / Math.PI,
      angle: parseFloat(angles.value.A)
    },
    // Angle at p2 between vectors p2->p1 and p2->p3
    p2: {
      start: Math.atan2(p1.y - p2.y, p1.x - p2.x) * 180 / Math.PI,
      end: Math.atan2(p3.y - p2.y, p3.x - p2.x) * 180 / Math.PI,
      angle: parseFloat(angles.value.B)
    },
    // Angle at p3 between vectors p3->p1 and p3->p2
    p3: {
      start: Math.atan2(p1.y - p3.y, p1.x - p3.x) * 180 / Math.PI,
      end: Math.atan2(p2.y - p3.y, p2.x - p3.x) * 180 / Math.PI,
      angle: parseFloat(angles.value.C)
    }
  };
});

// Function to calculate distance between two points
function calculateDistance(p1: Point, p2: Point): number {
  return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
}

// Function to go back to input page
const goBack = () => {
  router.push({ name: 'input' });
};
</script>

<template>
  <div class="triangle-page">
    <h1>Triangle Visualization</h1>
    
    <!-- Error message for invalid triangle -->
    <div v-if="!isValidTriangle" class="error-message">
      {{ errorMessage }}
      <button class="back-btn" @click="goBack">Back to Input</button>
    </div>
    
    <div v-else>
      <div class="canvas-container">
        <svg :width="canvasWidth" :height="canvasHeight" class="triangle-canvas">
          <!-- Triangle outline -->
          <polygon 
            :points="`${scaledPoints.p1.x},${scaledPoints.p1.y} ${scaledPoints.p2.x},${scaledPoints.p2.y} ${scaledPoints.p3.x},${scaledPoints.p3.y}`"
            fill="rgba(220, 240, 255, 0.5)"
            stroke="#333"
            stroke-width="2"
          />
          
          <!-- Angle arcs -->
          <AngleArc 
            :cx="scaledPoints.p1.x" 
            :cy="scaledPoints.p1.y" 
            :radius="arcRadius"
            :start-angle="arcAngles.p1.start"
            :end-angle="arcAngles.p1.end"
            color="#ff5555"
          />
          
          <AngleArc 
            :cx="scaledPoints.p2.x" 
            :cy="scaledPoints.p2.y" 
            :radius="arcRadius"
            :start-angle="arcAngles.p2.start"
            :end-angle="arcAngles.p2.end"
            color="#55ff55"
          />
          
          <AngleArc 
            :cx="scaledPoints.p3.x" 
            :cy="scaledPoints.p3.y" 
            :radius="arcRadius"
            :start-angle="arcAngles.p3.start"
            :end-angle="arcAngles.p3.end"
            color="#5555ff"
          />
          
          <!-- Vertices with angle markers -->
          <g v-for="(point, index) in [scaledPoints.p1, scaledPoints.p2, scaledPoints.p3]" :key="index">
            <!-- Vertex point -->
            <circle 
              :cx="point.x" 
              :cy="point.y" 
              :r="markerRadius"
              :fill="index === 0 ? '#ff5555' : (index === 1 ? '#55ff55' : '#5555ff')"
            />
            
            <!-- Angle text -->
            <text 
              :x="point.x + (index === 0 ? -45 : (index === 1 ? 15 : -5))" 
              :y="point.y + (index === 0 ? -15 : (index === 1 ? -15 : 25))"
              fill="#333"
              font-weight="bold"
            >
              {{ index === 0 ? angles.A : (index === 1 ? angles.B : angles.C) }}°
            </text>
          </g>
        </svg>
      </div>
      
      <div class="coordinates-info">
        <div><strong>Point 1:</strong> ({{ p1.x }}, {{ p1.y }})</div>
        <div><strong>Point 2:</strong> ({{ p2.x }}, {{ p2.y }})</div>
        <div><strong>Point 3:</strong> ({{ p3.x }}, {{ p3.y }})</div>
      </div>
      
      <button class="back-btn" @click="goBack">Back to Input</button>
    </div>
  </div>
</template>

<style scoped>
.triangle-page {
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

h1 {
  margin-bottom: 30px;
}

.canvas-container {
  margin-bottom: 30px;
}

.triangle-canvas {
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.coordinates-info {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 30px;
  background-color: #f5f5f5;
  padding: 15px;
  border-radius: 4px;
  min-width: 300px;
}

.back-btn {
  padding: 10px 20px;
  background-color: #2196F3;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s;
}

.back-btn:hover {
  background-color: #0b7dda;
}

.error-message {
  background-color: #ffebee;
  color: #c62828;
  padding: 20px;
  border-radius: 4px;
  text-align: center;
  margin-bottom: 30px;
  max-width: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}
</style> 