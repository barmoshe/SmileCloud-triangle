# Assignment Submission: Triangle Visualization Interface

## Project Overview
This project is a web application that allows users to input three points in a plane and visualizes a triangle based on these points. The application consists of two main pages:

1. **Input Page**: Allows users to enter X and Y coordinates for three points (6 input fields total)
2. **Display Page**: Shows the triangle constructed from the input points, complete with angle markings and calculations

## Functional Requirements Implemented

### Input Page
- Six text input fields for entering X and Y values for three points
- Clear labeling for each input field
- "Show Triangle" button that navigates to the display page with the entered data

### Display Page
- Triangle drawn according to the entered points using SVG
- Each angle is marked with a small arc
- Angle values (in degrees) are displayed inside the triangle
- "Back" button to return to the input page

## Technical Implementation

### Technologies Used
- **Vue 3**: Frontend JavaScript framework with Composition API
- **TypeScript**: For static typing and code reliability
- **Vue Router**: For navigation between pages
- **SVG**: For drawing the triangle and angle markings
- **Modern CSS**: For styling the interface

### Project Structure
- `src/views/InputPage.vue`: Input form for entering the points
- `src/views/TrianglePage.vue`: Triangle display with angle calculations
- `src/router/index.ts`: Routing configuration between pages
- `src/types`: TypeScript type definitions

### Key Functions
- Triangle drawing using SVG based on input coordinates
- Angle calculation using the law of cosines
- Angular arc marking for visual representation of angles
- Data transfer between pages using Vue Router

## How to Run the Application

### System Requirements
- Node.js (version 16 or higher)
- npm (Node.js package manager)
- Modern web browser (Chrome, Firefox, Safari, or Edge)

### Installation Steps

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start development server**:
   ```bash
   npm run dev
   ```

3. **Access the application**:  
   Open your browser and navigate to:
   ```
   http://localhost:5173
   ```

4. **Using the application**:
   - Enter 6 numeric values in the text boxes (X₁, Y₁, X₂, Y₂, X₃, Y₃)
   - Click "Show Triangle" to view the triangle
   - In the display page, you'll see the triangle with calculated angles
   - Click "Back" to return to the input page and modify the points

5. **Build for production** (optional):
   ```bash
   npm run build
   npm run preview
   ```

## Design Considerations
- Clean and intuitive user interface
- Modular and organized code structure
- Robust angle calculations based on vector mathematics
- Responsive design for different screen sizes
- Error handling for invalid inputs

## Project Achievements
- Successfully implemented all required functionality
- Created a visually pleasing interface
- Used modern web development technologies
- Maintained clean, readable, and maintainable code 