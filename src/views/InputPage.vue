<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const x1 = ref<number | string>('');
const y1 = ref<number | string>('');
const x2 = ref<number | string>('');
const y2 = ref<number | string>('');
const x3 = ref<number | string>('');
const y3 = ref<number | string>('');

// Check if all fields have been filled
const allFieldsFilled = computed(() => {
  return [x1.value, y1.value, x2.value, y2.value, x3.value, y3.value].every(val => 
    val !== '' && val !== null && val !== undefined
  );
});

// Check if points might form a straight line
const mightFormStraightLine = computed(() => {
  if (!allFieldsFilled.value) return false;
  
  const px1 = Number(x1.value);
  const py1 = Number(y1.value);
  const px2 = Number(x2.value);
  const py2 = Number(y2.value);
  const px3 = Number(x3.value);
  const py3 = Number(y3.value);
  
  // Calculate area of triangle
  const area = Math.abs(
    (px1 * (py2 - py3) +
     px2 * (py3 - py1) +
     px3 * (py1 - py2)) / 2
  );
  
  // If area is very close to zero, points are collinear (straight line)
  return area < 0.00001;
});

const showTriangle = () => {
  if (mightFormStraightLine.value) {
    if (!confirm("Warning: These points may form a straight line, which is not a valid triangle. Do you want to continue anyway?")) {
      return;
    }
  }
  
  router.push({
    name: 'triangle',
    query: {
      x1: x1.value,
      y1: y1.value,
      x2: x2.value,
      y2: y2.value,
      x3: x3.value,
      y3: y3.value
    }
  });
};
</script>

<template>
  <div class="input-page">
    <h1>Enter Triangle Coordinates</h1>
    
    <div class="coords-grid">
      <div class="point-group">
        <h2>Point 1</h2>
        <div class="input-group">
          <label for="x1">X₁:</label>
          <input id="x1" type="number" v-model="x1" placeholder="0" />
        </div>
        <div class="input-group">
          <label for="y1">Y₁:</label>
          <input id="y1" type="number" v-model="y1" placeholder="0" />
        </div>
      </div>
      
      <div class="point-group">
        <h2>Point 2</h2>
        <div class="input-group">
          <label for="x2">X₂:</label>
          <input id="x2" type="number" v-model="x2" placeholder="0" />
        </div>
        <div class="input-group">
          <label for="y2">Y₂:</label>
          <input id="y2" type="number" v-model="y2" placeholder="0" />
        </div>
      </div>
      
      <div class="point-group">
        <h2>Point 3</h2>
        <div class="input-group">
          <label for="x3">X₃:</label>
          <input id="x3" type="number" v-model="x3" placeholder="0" />
        </div>
        <div class="input-group">
          <label for="y3">Y₃:</label>
          <input id="y3" type="number" v-model="y3" placeholder="0" />
        </div>
      </div>
    </div>
    
    <div v-if="mightFormStraightLine" class="warning-message">
      Warning: These points form a straight line, which is not a valid triangle.
    </div>
    
    <button 
      class="show-triangle-btn" 
      @click="showTriangle" 
      :disabled="!allFieldsFilled"
    >
      Show Triangle
    </button>
  </div>
</template>

<style scoped>
.input-page {
  padding: 20px;
}

h1 {
  text-align: center;
  margin-bottom: 40px;
}

.coords-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 30px;
  justify-content: center;
  margin-bottom: 20px;
}

.point-group {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 20px;
  min-width: 200px;
}

.point-group h2 {
  margin-top: 0;
  margin-bottom: 20px;
  font-size: 1.2rem;
  color: #333;
}

.input-group {
  margin-bottom: 15px;
  display: flex;
  align-items: center;
}

.input-group label {
  width: 40px;
  font-weight: bold;
}

.input-group input {
  flex: 1;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.warning-message {
  background-color: #fff3e0;
  color: #e65100;
  padding: 10px;
  border-radius: 4px;
  text-align: center;
  margin: 0 auto 20px;
  max-width: 500px;
}

.show-triangle-btn {
  display: block;
  margin: 0 auto;
  padding: 12px 24px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.show-triangle-btn:hover:not(:disabled) {
  background-color: #45a049;
}

.show-triangle-btn:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}
</style> 