/**
 * Collection of utility functions for svg
 */

export interface IPoint {
  x: number
  y: number
}

export function points(...points: IPoint[]) {
  return points.map(({ x, y }) => `${x},${y}`).join(' ')
}

export function scale(point: IPoint, scale: number): IPoint {
  return {
    x: point.x * scale,
    y: point.y * scale,
  }
}
