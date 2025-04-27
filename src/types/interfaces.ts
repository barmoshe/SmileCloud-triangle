/**
 * Common interfaces for SmileCloud Triangle App
 */

// Represents a 2D point with x and y coordinates
export interface Point {
  x: number;
  y: number;
}

// Triangle properties interface
export interface Triangle {
  p1: Point;
  p2: Point;
  p3: Point;
}

// Angle properties for each vertex of the triangle
export interface TriangleAngles {
  A: string; // Angle at p1 (in degrees)
  B: string; // Angle at p2 (in degrees)
  C: string; // Angle at p3 (in degrees)
}

// Interface for arc angles used in the AngleArc component
export interface ArcAngle {
  start: number;
  end: number;
  angle: number;
}

// Interface for all arc angles in a triangle
export interface TriangleArcAngles {
  p1: ArcAngle;
  p2: ArcAngle;
  p3: ArcAngle;
}

// Props for the AngleArc component
export interface AngleArcProps {
  cx: number;
  cy: number;
  radius: number;
  startAngle: number;
  endAngle: number;
  color: string;
} 