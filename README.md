# SmileCloud Triangle Calculator

A Vue 3 application for calculating and visualizing triangle interior angles based on three user-defined points.

## Features

- Input interface for entering three 2D points (X₁, Y₁), (X₂, Y₂), (X₃, Y₃)
- Visual representation of the triangle in an SVG canvas
- Automatic calculation of interior angles using the law of cosines
- Visual angle markers and numeric display of angle values
- Responsive design
- Dynamic triangle updates as points are modified
- Error handling for invalid triangle configurations

## Technologies Used

- Vue 3 with TypeScript and Composition API
- Vue Router for navigation
- SVG for triangle rendering
- Vector mathematics for angle calculations
- Vite as the build tool

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## Usage

1. Enter the X and Y coordinates for three points in the input fields
2. The triangle will be automatically rendered in the canvas area
3. Interior angles will be calculated and displayed
4. Modify any coordinate to see the triangle update in real-time

## Project Structure

- `src/components/Triangle.vue` - Main triangle component with rendering logic
- `src/components/PointInput.vue` - Input component for coordinates
- `src/utils/triangleCalculations.ts` - Utility functions for vector math and angle calculations

## License

MIT

## Development

This project was created with Vue 3, TypeScript, and Vite. The application demonstrates practical use of geometric calculations and dynamic SVG rendering.

# Vue 3 + TypeScript + Vite

This template should help get you started developing with Vue 3 and TypeScript in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

Learn more about the recommended Project Setup and IDE Support in the [Vue Docs TypeScript Guide](https://vuejs.org/guide/typescript/overview.html#project-setup).
